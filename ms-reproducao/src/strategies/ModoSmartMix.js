const EstrategiaSelecao = require('./EstrategiaSelecao');

class ModoSmartMix extends EstrategiaSelecao {
  selecionarProxima(buffer, historico) {
    if (buffer.length === 0) return null;

    const atual = historico.at(-1);
    if (!atual || atual.bpm == null) return buffer.shift();

    let melhor    = buffer[0];
    let menorDiff = Math.abs(melhor.bpm - atual.bpm);

    for (const faixa of buffer) {
      const diff = Math.abs(faixa.bpm - atual.bpm);
      if (diff < menorDiff) {
        melhor    = faixa;
        menorDiff = diff;
      }
    }

    buffer.splice(buffer.indexOf(melhor), 1);
    return melhor;
  }
}

module.exports = ModoSmartMix;
