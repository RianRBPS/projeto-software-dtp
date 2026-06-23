const EstrategiaSelecao = require('./EstrategiaSelecao');

// Nova estratégia adicionada após a modelagem inicial —
// demonstra o princípio Open/Closed: Player e demais classes
// não foram modificados para suportar este novo comportamento.
class ModoCronologico extends EstrategiaSelecao {
  selecionarProxima(buffer, _historico) {
    if (buffer.length === 0) return null;
    buffer.sort((a, b) => (a.anoLancamento ?? 0) - (b.anoLancamento ?? 0));
    return buffer.shift();
  }
}

module.exports = ModoCronologico;
