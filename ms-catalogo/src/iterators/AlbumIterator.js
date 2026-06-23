const FaixaIterator = require('./FaixaIterator');

class AlbumIterator extends FaixaIterator {
  constructor(faixas) {
    super();
    this._faixas = faixas;
    this._indice = 0;
  }

  hasNext() { return this._indice < this._faixas.length; }
  next()    { return this.hasNext() ? this._faixas[this._indice++] : null; }
  reset()   { this._indice = 0; }
}

module.exports = AlbumIterator;
