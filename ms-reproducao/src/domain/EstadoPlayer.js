class EstadoPlayer {
  constructor() {
    this.faixaAtualId     = null;
    this.faixaAtualTitulo = null;
    this.posicaoMs        = 0;
    this.statusReproducao = 'PAUSED';
  }
}

module.exports = EstadoPlayer;
