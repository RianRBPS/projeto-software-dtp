# DTP — Projeto de Software: O que precisa ser feito

## Informações Gerais

- **Equipe:** 2 ou 3 integrantes (individual ou 4+ não aceitos)
- **Entregáveis:** Código-fonte (GitHub), Relatório Técnico (PDF), Apresentação Prática
- **Linguagens permitidas:** Java, Python ou JavaScript (Node.js)
- **Persistência:** Somente em memória (listas, mapas, etc.) — sem banco de dados
- **Infra:** Docker (Dockerfile por serviço + `docker-compose.yml`)

---

## Tema Escolhido

> Selecionar uma das opções abaixo e preencher:

- [ ] **Opção A** — Smart Grid (Medição + Tarifação)
- [ ] **Opção B** — Streaming de Música (Catálogo + Reprodução)
- [ ] **Opção C** — Smart Warehouse (Inventário + Operações)

---

## Regras de Negócio (por opção)

### Opção A — Smart Grid
- **RN01 (Iterator):** Árvore hierárquica Subestações → Transformadores → Medidores; varredura transparente que oculta a estrutura interna (vetor linear ou árvore)
- **RN02 (Strategy):** Motor de tarifação intercambiável em runtime — Posto Horário (+150% no pico), Injeção Reversa (crédito solar), Bandeira Hídrica (multiplicador por variável de ambiente)
- **RN03 (Observer):** Anomalia de leitura dispara alerta simultâneo para Módulo de Segurança (isola transformador) e Módulo de Notificações (avisa usuário)

### Opção B — Streaming de Música
- **RN01 (Iterator):** Fila de reprodução unificada sobre origens diferentes (lista de álbum, grafo de recomendações, cache de busca) — consumidor agnóstico à estrutura
- **RN02 (Strategy):** Modo Sequencial, Modo Shuffle (sem repetir no ciclo), Modo Smart Mix (próxima música com BPM mais próximo)
- **RN03 (Observer):** Mudança de estado do player (música, ms, play/pause) notifica assincronamente Telemetria de Dispositivos e Histórico em Tempo Real

### Opção C — Smart Warehouse
- **RN01 (Iterator):** Layout 3D (Zonas → Corredores → Prateleiras → Slots); varredura para auditoria sem expor geometria XYZ ou tipo de estrutura interna
- **RN02 (Strategy):** Put-Away intercambiável — FIFO (validade/giro), Controle Ambiental (restrição por classe de risco), Densidade Máxima (otimiza volume)
- **RN03 (Observer):** Sensor fora do limite publica evento; Serviço de Operações bloqueia movimentações da zona; Módulo de Brigada simula evacuação de robôs

---

## Fases de Desenvolvimento

### Fase I — Modelagem Conceitual (Análise de Domínio)
- [ ] Criar Diagrama de Classes de Análise (Larman)
  - Apenas classes conceituais, atributos e associações com multiplicidade e verbos
  - **Proibido:** assinaturas de métodos, modificadores de acesso (+/-), tipos de dados de linguagem

### Fase II — Modelagem de Arquitetura (Microserviços)
- [ ] Criar Diagrama de Componentes ou Implantação UML
  - Mínimo 2 microserviços isolados
  - Evidenciar isolamento de memória de cada serviço
  - Mostrar protocolo de comunicação síncrona/assíncrona (REST/HTTP) entre containers

### Fase III — Design Detalhado (Padrões GoF)
- [ ] Criar Diagrama de Classes de Projeto (DCD) — evolução do Modelo de Domínio
  - Incluir tipos de dados, visibilidade, herança, interfaces e assinaturas completas
  - **RN01 → Iterator:** estrutura de coleção com iterador encapsulado
  - **RN02 → Strategy:** algoritmos intercambiáveis via interface comum
  - **RN03 → Observer:** subject + observers desacoplados

### Fase IV — Implementação e Conteinerização
- [ ] Implementar código fiel ao DCD da Fase III
- [ ] Criar `Dockerfile` para cada microserviço
- [ ] Criar `docker-compose.yml` com rede interna e portas HTTP expostas
- [ ] Garantir que **nenhum dado** é escrito em disco (só em memória)

---

## Relatório Técnico (PDF)

- [ ] Incluir os diagramas das Fases I, II e III
- [ ] **Demonstração dinâmica do Strategy:** mostrar criação e troca de nova estratégia em runtime sem reiniciar o container
- [ ] **Defesa científica do Observer (Push vs. Pull):** justificar a abordagem adotada com análise de acoplamento, tráfego de rede e evolução a longo prazo
- [ ] **Encapsulamento do Iterator:** mostrar no código que o cliente usa apenas a interface do iterador, sem acesso à coleção interna

---

## Apresentação Prática

- [ ] Duração: **mínimo 3 min, máximo 5 min** (penalidade por não cumprir)
- [ ] Ir direto aos pontos técnicos — sem introduções comerciais
- [ ] Demonstrar ao vivo:
  - [ ] Troca de Strategy em tempo de execução
  - [ ] Disparo e recepção de evento Observer
  - [ ] Consumo via interface do Iterator

---

## Entrega no GitHub

- [ ] Repositório com código-fonte completo
- [ ] `Dockerfile` por microserviço
- [ ] `docker-compose.yml` na raiz
- [ ] `README.md` com instruções de execução (`docker compose up`)
