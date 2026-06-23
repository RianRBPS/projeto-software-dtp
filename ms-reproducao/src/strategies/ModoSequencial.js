const EstrategiaSelecao = require('./EstrategiaSelecao');

class ModoSequencial extends EstrategiaSelecao {
  selecionarProxima(buffer, _historico) {
    return buffer.length > 0 ? buffer.shift() : null;
  }
}

module.exports = ModoSequencial;
