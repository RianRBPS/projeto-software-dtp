class GrafoRecomendacao {
  constructor() {
    this._nos        = new Map(); // id -> { id, faixa }
    this._adjacencias = new Map(); // id -> [{ id, faixa }]
  }

  adicionarNo(faixa) {
    const no = { id: faixa.id, faixa };
    this._nos.set(faixa.id, no);
    if (!this._adjacencias.has(faixa.id)) {
      this._adjacencias.set(faixa.id, []);
    }
  }

  adicionarAresta(idOrigem, idDestino) {
    const origem  = this._nos.get(idOrigem);
    const destino = this._nos.get(idDestino);
    if (!origem || !destino) return;
    this._adjacencias.get(idOrigem).push(destino);
  }

  buscarNo(faixaId) {
    return this._nos.get(faixaId) ?? null;
  }

  get adjacencias() {
    return this._adjacencias;
  }
}

module.exports = GrafoRecomendacao;
