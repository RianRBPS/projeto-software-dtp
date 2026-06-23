const EstadoPlayer   = require('../domain/EstadoPlayer');
const ModoSequencial = require('../strategies/ModoSequencial');

class Player {
  constructor() {
    this._estado     = new EstadoPlayer();
    this._fila       = null;
    this._estrategia = new ModoSequencial();
    this._observers  = [];   // Array<ObservadorEstado>
    this._historico  = [];   // Array<Faixa> — usado pelo SmartMix
  }

  // ── Gestão de Observers ──────────────────────────────────────────────
  registrar(observer) {
    this._observers.push(observer);
  }

  remover(observer) {
    this._observers = this._observers.filter(o => o !== observer);
  }

  _notificarObservadores() {
    const snapshot = { ...this._estado };   // modelo Push: envia estado completo
    for (const o of this._observers) {
      o.atualizar(snapshot);
    }
  }

  // ── Gestão de Estratégia e Fila ──────────────────────────────────────
  definirEstrategia(estrategia) {
    this._estrategia = estrategia;
  }

  definirFila(fila) {
    this._fila = fila;
  }

  // ── Operações do Player ──────────────────────────────────────────────
  play() {
    this._estado.statusReproducao = 'PLAYING';
    this._notificarObservadores();
    return { ...this._estado };
  }

  pause() {
    this._estado.statusReproducao = 'PAUSED';
    this._notificarObservadores();
    return { ...this._estado };
  }

  avancar() {
    const buffer  = this._fila?.obterBuffer() ?? [];
    const proxima = this._estrategia.selecionarProxima(buffer, this._historico);

    if (proxima) {
      this._historico.push(proxima);
      this._estado.faixaAtualId     = proxima.id;
      this._estado.faixaAtualTitulo = proxima.titulo;
      this._estado.posicaoMs        = 0;
      this._estado.statusReproducao = 'PLAYING';
      this._notificarObservadores();
    }

    return { ...this._estado };
  }

  obterEstado() {
    return { ...this._estado };
  }
}

module.exports = Player;
