class EstrategiaSelecao {
  // buffer: Array<Faixa>, historico: Array<Faixa> → Faixa | null
  selecionarProxima(buffer, historico) {
    throw new Error('selecionarProxima() não implementado');
  }
}

module.exports = EstrategiaSelecao;
