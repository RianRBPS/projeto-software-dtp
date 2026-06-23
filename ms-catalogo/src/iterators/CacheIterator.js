const FaixaIterator = require('./FaixaIterator');

class CacheIterator extends FaixaIterator {
  constructor(cacheFaixas) {
    super();
    this._cache  = [...cacheFaixas];
    this._indice = 0;
  }

  hasNext() { return this._indice < this._cache.length; }
  next()    { return this.hasNext() ? this._cache[this._indice++] : null; }
  reset()   { this._indice = 0; }
}

module.exports = CacheIterator;
