# Diário de Desenvolvimento — DTP Projeto de Software

## Sobre o Projeto

**Disciplina:** Projeto de Software  
**Tema escolhido:** Opção B — Streaming de Música  
**Microserviços:** Catálogo + Reprodução  
**Stack:** A definir (Java / Python / Node.js)  
**Entregáveis:** Código-fonte (GitHub), Relatório Técnico (PDF), Apresentação (3–5 min)

---

## 2026-05-18

### O que foi feito

- Leitura completa do documento DTP e mapeamento de todos os requisitos
- Criado `TODO.md` com checklist completo de todas as fases e entregas
- Escolhido o **Tema B — Streaming de Música**
- Identificadas as classes conceituais do domínio para a Fase I:
  - `Usuario`, `Player`, `EstadoPlayer`, `FilaReproducao`
  - `Faixa`, `Album`, `Artista`
  - `GrafoRecomendacao`, `HistoricoReproducao`, `DispositivoUsuario`
- Gerado arquivo `fase1-diagrama-analise.puml` com o Diagrama de Classes de Análise no padrão Larman

### Decisões tomadas

- **Ferramenta de diagramação:** PlantUML (exportar via plantuml.com ou extensão VS Code)
- **Padrão Larman respeitado:** sem métodos, sem modificadores de acesso, sem tipos de dados de linguagem — apenas atributos conceituais e associações com multiplicidade e verbos

### Como renderizar o diagrama

1. Abrir [https://www.plantuml.com/plantuml](https://www.plantuml.com/plantuml)
2. Colar o conteúdo de `fase1-diagrama-analise.puml`
3. Exportar como PNG para incluir no relatório PDF

### Pendente

- [ ] Revisar o diagrama com a equipe e validar se todas as classes estão corretas

---

## 2026-06-07

### O que foi feito

- Gerado `fase2-diagrama-componentes.puml` — Diagrama de Componentes com arquitetura de microserviços
- Gerado `fase3-dcd-padroes.puml` — Diagrama de Classes de Projeto completo com os 3 padrões GoF

### Fase II — Arquitetura de Microserviços

Dois containers Docker em rede interna `dtp-net`:

| Container | Porta | Responsabilidade | Memória |
|---|---|---|---|
| `ms-catalogo` | 8080 | Faixas, Albums, Artistas, GrafoRecomendacao | `List<Faixa>`, `List<Album>`, `List<Artista>`, `GrafoRecomendacao` |
| `ms-reproducao` | 8081 | Player, FilaReproducao, EstadoPlayer, HistoricoReproducao | `Player`, `FilaReproducao`, `EstadoPlayer`, `HistoricoReproducao` |

Comunicação:
- `ms-reproducao` → `ms-catalogo`: HTTP GET síncrono para buscar faixas
- `ms-reproducao` → `ModuloTelemetria` e `ModuloHistorico`: HTTP POST assíncrono (Observer RN03)

### Fase III — Design Detalhado (DCD com GoF)

| RN | Padrão | Classes criadas |
|---|---|---|
| RN01 | **Iterator** | `<<interface>> FaixaIterator`, `AlbumIterator`, `GrafoIterator`, `CacheIterator`; `FilaReproducao` usa a interface |
| RN02 | **Strategy** | `<<interface>> EstrategiaSelecao`, `ModoSequencial`, `ModoShuffle`, `ModoSmartMix`; `Player` troca a estratégia em runtime |
| RN03 | **Observer** | `<<interface>> ObservadorEstado`, `ModuloTelemetria`, `ModuloHistorico`; `Player` é o Subject |

### Decisões de design

- **Observer adotou modelo Push:** o `Player` envia o `EstadoPlayer` completo para cada observer no `notificarObservadores()`. Justificativa: reduz round-trips de rede entre microserviços e simplifica a interface do observer — cada módulo recebe tudo que precisa sem precisar fazer uma requisição adicional ao subject. Trade-off: maior acoplamento de dados na interface, mas aceitável dado o tamanho reduzido do `EstadoPlayer`.
- **Iterator**: o cliente (`FilaReproducao`) só conhece a interface `FaixaIterator` — nunca manipula `List<Faixa>`, `List<NoGrafo>` ou qualquer estrutura interna das fontes.
- **Strategy**: `Player.definirEstrategia()` permite trocar o algoritmo em tempo de execução sem reiniciar o container (requisito da apresentação).

### Como renderizar os diagramas

1. Abrir [https://www.plantuml.com/plantuml](https://www.plantuml.com/plantuml)
2. Colar o conteúdo de cada `.puml`
3. Exportar como PNG para o relatório

### Pendente

- [ ] Revisar os diagramas com a equipe
- [ ] Iniciar Fase IV — Implementação (escolher linguagem: Java / Python / Node.js)
- [ ] Criar `Dockerfile` por microserviço e `docker-compose.yml`

---

## Progresso Geral

| Fase | Entregável | Status |
|------|-----------|--------|
| I — Modelagem Conceitual | `fase1-diagrama-analise.puml` | ✅ Concluído |
| II — Arquitetura | `fase2-diagrama-componentes.puml` | ✅ Concluído |
| III — Design Detalhado | `fase3-dcd-padroes.puml` | ✅ Concluído |
| IV — Implementação | Código-fonte + Dockerfiles + docker-compose.yml | Pendente |
| Relatório | PDF com diagramas + defesas técnicas | Pendente |
| Apresentação | Demo ao vivo 3–5 min | Pendente |
