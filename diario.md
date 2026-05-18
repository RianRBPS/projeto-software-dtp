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
- [ ] Iniciar Fase II — Diagrama de Componentes / Implantação

---

## Próximas Sessões

| Fase | Entregável | Status |
|------|-----------|--------|
| I — Modelagem Conceitual | Diagrama de Classes de Análise | Em andamento |
| II — Arquitetura | Diagrama de Componentes/Implantação | Pendente |
| III — Design Detalhado | Diagrama de Classes de Projeto (DCD) com Iterator, Strategy, Observer | Pendente |
| IV — Implementação | Código-fonte + Dockerfiles + docker-compose.yml | Pendente |
| Relatório | PDF com diagramas + defesas técnicas | Pendente |
| Apresentação | Demo ao vivo 3–5 min | Pendente |
