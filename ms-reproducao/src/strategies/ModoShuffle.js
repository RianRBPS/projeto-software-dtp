const EstrategiaSelecao = require('./EstrategiaSelecao');

class ModoShuffle extends EstrategiaSelecao {
  constructor() {
    super();
    this._tocadas = new Set();
  }

  selecionarProxima(buffer, _historico) {
    const disponiveis = buffer.filter(f => !this._tocadas.has(f.id));
    if (disponiveis.length === 0) {
      this._tocadas.clear();
      return null;
    }
    const escolhida = disponiveis[Math.floor(Math.random() * disponiveis.length)];
    this._tocadas.add(escolhida.id);
    buffer.splice(buffer.indexOf(escolhida), 1);
    return escolhida;
  }
}

module.exports = ModoShuffle;
