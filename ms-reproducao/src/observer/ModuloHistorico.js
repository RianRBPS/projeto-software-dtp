const ObservadorEstado = require('./ObservadorEstado');

class ModuloHistorico extends ObservadorEstado {
  constructor() {
    super();
    this._historico = [];
  }

  atualizar(estado) {
    // Registra apenas quando uma nova faixa começa (posicaoMs === 0 e PLAYING)
    if (estado.statusReproducao === 'PLAYING' && estado.posicaoMs === 0 && estado.faixaAtualId) {
      this._historico.push({
        faixaId:  estado.faixaAtualId,
        titulo:   estado.faixaAtualTitulo,
        dataHora: new Date().toISOString(),
      });
    }
  }

  obterHistorico() {
    return [...this._historico];
  }
}

module.exports = ModuloHistorico;
