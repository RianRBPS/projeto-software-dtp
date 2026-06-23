const express = require('express');
const axios   = require('axios');

const Player           = require('./src/player/Player');
const FilaReproducao   = require('./src/domain/FilaReproducao');
const CacheIterator    = require('./src/iterators/CacheIterator');
const ModuloTelemetria = require('./src/observer/ModuloTelemetria');
const ModuloHistorico  = require('./src/observer/ModuloHistorico');
const ModoSequencial   = require('./src/strategies/ModoSequencial');
const ModoShuffle      = require('./src/strategies/ModoShuffle');
const ModoSmartMix     = require('./src/strategies/ModoSmartMix');
const ModoCronologico  = require('./src/strategies/ModoCronologico');

const app     = express();
const PORT    = process.env.PORT    ?? 8081;
const CATALOGO = process.env.CATALOGO_URL ?? 'http://localhost:8080';

app.use(express.json());

// ── Inicialização dos componentes ────────────────────────────────────
const player    = new Player();
const fila      = new FilaReproducao();
const historico = new ModuloHistorico();
const telemetria = new ModuloTelemetria();

player.definirFila(fila);
player.registrar(telemetria);
player.registrar(historico);

// Mapa de estratégias disponíveis
const estrategias = {
  sequencial:  new ModoSequencial(),
  shuffle:     new ModoShuffle(),
  smartmix:    new ModoSmartMix(),
  cronologico: new ModoCronologico(),
};

// ── Fila ─────────────────────────────────────────────────────────────
app.post('/player/fila', async (req, res) => {
  const { faixaIds } = req.body;
  if (!Array.isArray(faixaIds) || faixaIds.length === 0) {
    return res.status(400).json({ erro: 'faixaIds deve ser um array não vazio' });
  }

  try {
    const faixas = await Promise.all(
      faixaIds.map(id =>
        axios.get(`${CATALOGO}/faixas/${id}`).then(r => r.data)
      )
    );
    const iterator = new CacheIterator(faixas);
    fila.carregarFonte(iterator);
    res.json({ mensagem: `Fila carregada com ${fila.tamanho()} faixas` });
  } catch (err) {
    res.status(502).json({ erro: `Falha ao buscar faixas no catálogo: ${err.message}` });
  }
});

app.delete('/player/fila', (_, res) => {
  fila.esvaziar();
  res.json({ mensagem: 'Fila esvaziada' });
});

// ── Controle do Player ───────────────────────────────────────────────
app.post('/player/play', (_, res) => {
  res.json(player.play());
});

app.post('/player/pause', (_, res) => {
  res.json(player.pause());
});

app.post('/player/proximo', (_, res) => {
  res.json(player.avancar());
});

app.get('/player/estado', (_, res) => {
  res.json(player.obterEstado());
});

// ── Troca de Estratégia em runtime (Strategy + Open/Closed) ──────────
app.put('/player/estrategia', (req, res) => {
  const { modo } = req.body;
  const estrategia = estrategias[modo];
  if (!estrategia) {
    return res.status(400).json({
      erro: `Modo '${modo}' desconhecido`,
      modosDisponiveis: Object.keys(estrategias),
    });
  }
  player.definirEstrategia(estrategia);
  res.json({ mensagem: `Estratégia alterada para '${modo}'` });
});

// ── Histórico ────────────────────────────────────────────────────────
app.get('/historico', (_, res) => {
  res.json(historico.obterHistorico());
});

// ── Dispositivos (Telemetria) ────────────────────────────────────────
app.post('/dispositivos', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ erro: 'url é obrigatório' });
  telemetria.adicionarDispositivo(url);
  res.status(201).json({ mensagem: `Dispositivo registrado: ${url}` });
});

// ── Health check ─────────────────────────────────────────────────────
app.get('/health', (_, res) => res.json({ status: 'ok', servico: 'ms-reproducao' }));

app.listen(PORT, () => {
  console.log(`ms-reproducao rodando na porta ${PORT}`);
  console.log(`Catálogo: ${CATALOGO}`);
});
