class FilaReproducao {
  constructor() {
    this._buffer   = [];
    this._iterator = null;
  }

  carregarFonte(iterator) {
    this._iterator = iterator;
    this._buffer   = [];
    while (this._iterator.hasNext()) {
      this._buffer.push(this._iterator.next());
    }
  }

  obterBuffer() { return this._buffer; }
  tamanho()     { return this._buffer.length; }
  esvaziar()    { this._buffer = []; this._iterator = null; }
}

module.exports = FilaReproducao;
