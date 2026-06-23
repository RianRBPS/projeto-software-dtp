const FaixaIterator = require('./FaixaIterator');

class GrafoIterator extends FaixaIterator {
  constructor(adjacencias, noInicial) {
    super();
    this._adj      = adjacencias;
    this._inicial  = noInicial;
    this._fila     = [noInicial];
    this._visitados = new Set([noInicial.id]);
  }

  hasNext() { return this._fila.length > 0; }

  next() {
    if (!this.hasNext()) return null;
    const no = this._fila.shift();
    for (const vizinho of (this._adj.get(no.id) ?? [])) {
      if (!this._visitados.has(vizinho.id)) {
        this._visitados.add(vizinho.id);
        this._fila.push(vizinho);
      }
    }
    return no.faixa;
  }

  reset() {
    this._fila      = [this._inicial];
    this._visitados = new Set([this._inicial.id]);
  }
}

module.exports = GrafoIterator;
