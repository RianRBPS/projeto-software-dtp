const express = require('express');

const AlbumIterator  = require('./src/iterators/AlbumIterator');
const GrafoIterator  = require('./src/iterators/GrafoIterator');
const CacheIterator  = require('./src/iterators/CacheIterator');
const GrafoRecomendacao = require('./src/repository/GrafoRecomendacao');

const app  = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

// ── Estado em memória ────────────────────────────────────────────────
const faixas   = new Map();
const albums   = new Map();
const artistas = new Map();
const grafo    = new GrafoRecomendacao();

// ── Faixas ───────────────────────────────────────────────────────────
app.get('/faixas', (_, res) => {
  res.json([...faixas.values()]);
});

app.get('/faixas/:id', (req, res) => {
  const faixa = faixas.get(req.params.id);
  if (!faixa) return res.status(404).json({ erro: 'Faixa não encontrada' });
  res.json(faixa);
});

app.post('/faixas', (req, res) => {
  const faixa = req.body;
  if (!faixa.id || !faixa.titulo) {
    return res.status(400).json({ erro: 'id e titulo são obrigatórios' });
  }
  faixas.set(faixa.id, faixa);
  grafo.adicionarNo(faixa);
  res.status(201).json(faixa);
});

// ── Artistas ─────────────────────────────────────────────────────────
app.get('/artistas', (_, res) => {
  res.json([...artistas.values()]);
});

app.post('/artistas', (req, res) => {
  const artista = req.body;
  if (!artista.id || !artista.nome) {
    return res.status(400).json({ erro: 'id e nome são obrigatórios' });
  }
  artistas.set(artista.id, artista);
  res.status(201).json(artista);
});

// ── Albums ───────────────────────────────────────────────────────────
app.get('/albums', (_, res) => {
  res.json([...albums.values()]);
});

app.post('/albums', (req, res) => {
  const album = req.body;
  if (!album.id || !album.titulo) {
    return res.status(400).json({ erro: 'id e titulo são obrigatórios' });
  }
  albums.set(album.id, album);
  res.status(201).json(album);
});

// ── Iterator de álbum — cliente usa SOMENTE FaixaIterator ────────────
app.get('/albums/:id/iterator', (req, res) => {
  const album = albums.get(req.params.id);
  if (!album) return res.status(404).json({ erro: 'Album não encontrado' });

  const iterator = new AlbumIterator(album.faixas ?? []);
  const resultado = [];
  while (iterator.hasNext()) {
    resultado.push(iterator.next());
  }
  res.json(resultado);
});

// ── Iterator de cache — drena lista avulsa de faixas ────────────────
app.post('/cache/iterator', (req, res) => {
  const { faixaIds } = req.body;
  if (!Array.isArray(faixaIds)) {
    return res.status(400).json({ erro: 'faixaIds deve ser um array' });
  }
  const cacheFaixas = faixaIds
    .map(id => faixas.get(id))
    .filter(Boolean);

  const iterator = new CacheIterator(cacheFaixas);
  const resultado = [];
  while (iterator.hasNext()) {
    resultado.push(iterator.next());
  }
  res.json(resultado);
});

// ── Iterator do grafo — BFS de recomendações ─────────────────────────
app.post('/recomendacoes/aresta', (req, res) => {
  const { idOrigem, idDestino } = req.body;
  grafo.adicionarAresta(idOrigem, idDestino);
  res.status(201).json({ mensagem: 'Aresta adicionada' });
});

app.get('/recomendacoes/:faixaId/iterator', (req, res) => {
  const no = grafo.buscarNo(req.params.faixaId);
  if (!no) return res.status(404).json({ erro: 'Faixa não encontrada no grafo' });

  const iterator = new GrafoIterator(grafo.adjacencias, no);
  const resultado = [];
  while (iterator.hasNext()) {
    resultado.push(iterator.next());
  }
  res.json(resultado);
});

// ── Health check ─────────────────────────────────────────────────────
app.get('/health', (_, res) => res.json({ status: 'ok', servico: 'ms-catalogo' }));

app.listen(PORT, () => {
  console.log(`ms-catalogo rodando na porta ${PORT}`);
});
