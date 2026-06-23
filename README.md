# DTP — Streaming de Música

**Disciplina:** Projeto de Software  
**Tema:** Opção B — Streaming de Música  
**Microserviços:** `ms-catalogo` (porta 8080) + `ms-reproducao` (porta 8081)  
**Stack:** Node.js 20 + Express + Docker

---

## Como executar

```bash
docker compose up --build
```

Os dois containers sobem na rede interna `dtp-net`. O `ms-reproducao` aguarda o `ms-catalogo` estar disponível.

---

## Padrões de Projeto implementados

| RN | Padrão | Onde |
|---|---|---|
| RN01 | **Iterator** | `ms-catalogo/src/iterators/` — `AlbumIterator`, `GrafoIterator`, `CacheIterator` |
| RN02 | **Strategy** | `ms-reproducao/src/strategies/` — `ModoSequencial`, `ModoShuffle`, `ModoSmartMix`, `ModoCronologico` |
| RN03 | **Observer** | `ms-reproducao/src/observer/` — `ModuloTelemetria`, `ModuloHistorico` |

---

## Endpoints principais

### ms-catalogo — :8080

| Método | Rota | Descrição |
|---|---|---|
| POST | `/artistas` | Cadastra artista |
| POST | `/faixas` | Cadastra faixa |
| GET  | `/faixas/:id` | Busca faixa por ID |
| POST | `/albums` | Cadastra álbum com lista de faixas |
| GET  | `/albums/:id/iterator` | Drena AlbumIterator → lista de faixas |
| POST | `/cache/iterator` | Drena CacheIterator a partir de IDs |
| POST | `/recomendacoes/aresta` | Adiciona aresta no grafo |
| GET  | `/recomendacoes/:id/iterator` | Drena GrafoIterator (BFS) |

### ms-reproducao — :8081

| Método | Rota | Descrição |
|---|---|---|
| POST | `/player/fila` | Carrega fila com `faixaIds` (busca no catálogo) |
| POST | `/player/play` | Inicia reprodução → notifica observers |
| POST | `/player/pause` | Pausa → notifica observers |
| POST | `/player/proximo` | Avança usando a estratégia configurada |
| PUT  | `/player/estrategia` | Troca estratégia em runtime |
| GET  | `/player/estado` | Estado atual do player |
| GET  | `/historico` | Histórico registrado pelo ModuloHistorico |
| POST | `/dispositivos` | Registra URL de dispositivo na Telemetria |

---

## Demo: troca de Strategy em runtime

```bash
# 1. Cadastrar faixas no catálogo
curl -X POST http://localhost:8080/faixas \
  -H "Content-Type: application/json" \
  -d '{"id":"f1","titulo":"Bohemian Rhapsody","bpm":72,"anoLancamento":1975}'

curl -X POST http://localhost:8080/faixas \
  -H "Content-Type: application/json" \
  -d '{"id":"f2","titulo":"Hotel California","bpm":75,"anoLancamento":1977}'

curl -X POST http://localhost:8080/faixas \
  -H "Content-Type: application/json" \
  -d '{"id":"f3","titulo":"Stairway to Heaven","bpm":82,"anoLancamento":1971}'

# 2. Carregar fila no reprodução
curl -X POST http://localhost:8081/player/fila \
  -H "Content-Type: application/json" \
  -d '{"faixaIds":["f1","f2","f3"]}'

# 3. Tocar no modo Sequencial (padrão)
curl -X POST http://localhost:8081/player/proximo

# 4. Trocar para ModoCronologico em runtime (sem reiniciar container)
curl -X PUT http://localhost:8081/player/estrategia \
  -H "Content-Type: application/json" \
  -d '{"modo":"cronologico"}'

# 5. Próxima faixa agora segue ordem cronológica
curl -X POST http://localhost:8081/player/proximo

# 6. Ver histórico registrado pelo Observer
curl http://localhost:8081/historico
```

---

## Estrutura do repositório

```
├── ms-catalogo/
│   ├── src/
│   │   ├── iterators/       FaixaIterator, AlbumIterator, GrafoIterator, CacheIterator
│   │   └── repository/      GrafoRecomendacao
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── ms-reproducao/
│   ├── src/
│   │   ├── domain/          EstadoPlayer, FilaReproducao
│   │   ├── iterators/       CacheIterator
│   │   ├── strategies/      EstrategiaSelecao, ModoSequencial, ModoShuffle, ModoSmartMix, ModoCronologico
│   │   ├── observer/        ObservadorEstado, ModuloTelemetria, ModuloHistorico
│   │   └── player/          Player
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── README.md
└── docs/                    Diagramas (.puml, .png), Relatório (.html, .pdf)
```
