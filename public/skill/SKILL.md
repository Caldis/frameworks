---
name: sdframe
description: >
  Software design framework knowledge base with 315 curated frameworks
  across 13 categories. Use this skill when users need to: select
  frameworks for a project, compare architectural approaches, implement a specific
  design pattern, or find best practices for reliability, security, performance,
  maintainability, and other quality concerns. Trigger on: architecture decisions,
  design patterns, system design, best practices, framework selection,
  "how should I structure this", technical debt, refactoring strategies,
  "what pattern should I use", code organization, API design.
---

# SDFrame — Software Design Framework Skill

315 curated frameworks for software engineers, architects, and AI agents.
Bilingual (EN/ZH), 13 categories. Source: https://sdframe.caldis.me/

## Two Modes of Operation

Determine which mode based on user intent:

### Mode A: Framework Selection

User is unsure what to use. They say things like "help me choose an architecture",
"what patterns should I use for X", "best practices for building Y".

**Phase 1 — Clarify requirements.** Ask the user one question at a time:

1. Describe your system in 1-2 sentences. What does it do?
2. What quality attributes matter most?
   Options: reliability, security, performance, maintainability, scalability, usability, testability, observability, portability
3. What abstraction level are you working at?
   Options: code, component, system, organization
4. Team experience level? Options: beginner, intermediate, advanced
5. Project stage? Options: greenfield, evolving, legacy migration

**Phase 2 — Search.** Read `references/catalog.md` from this skill.
Filter candidates by the user's answers. Narrow to 5-8 matches.
If you need more context on a category, read `references/categories/{key}.md`.

**Phase 3 — Evaluate.** Read top 3 candidates from
`references/frameworks/{slug}.md`. Compare:
- "When to Use" vs user's described context
- "When NOT to Use" vs user's constraints
- Complexity vs team's experience level

**Phase 4 — Recommend.** Present 2-3 frameworks with:
- Why this framework fits the user's specific situation
- Implementation priority order if using multiple
- Key first step from the framework's Implementation Steps
- Link: https://sdframe.caldis.me/frameworks/{slug}

### Mode B: Framework Application

User has already decided. They say things like "teach me DDD",
"how do I implement CQRS in my project", "apply clean architecture here".

1. Identify the framework slug. Read `references/frameworks/{slug}.md`
2. Follow the "Before You Start" section — ask the user context questions
3. Walk through Implementation Steps one by one, adapting to the user's codebase
4. Reference Do's and Don'ts as guardrails throughout
5. When done, suggest Related Frameworks for complementary practices

## Dimensions for Filtering

### Quality Concerns
reliability, security, performance, maintainability, scalability, usability, testability, observability, portability

### Abstraction Levels
- **code**: single module or function level
- **component**: service or package boundary
- **system**: multi-service or full system
- **organization**: cross-team or organizational

### Complexity
- **beginner**: straightforward to adopt, low learning curve
- **intermediate**: requires some experience, moderate learning curve
- **advanced**: significant expertise needed, steep learning curve

### Maturity
foundational, established, emerging, experimental

### Categories
thinking (23) | Design Thinking | 设计思考
    Mental models, philosophies, and thinking tools for approaching software design problems.
  architecture (31) | Architecture Decisions | 架构决策
    Making and documenting architectural decisions — choosing patterns, evaluating trade-offs.
  coding (45) | Coding Practices | 编码实践
    Implementation-level design — structuring code, managing complexity, writing maintainable software.
  quality (25) | Quality Engineering | 质量保障
    Testing strategies, reliability patterns, observability, and verification approaches.
  deployment (20) | Deployment & Operations | 部署运维
    Deploying, operating, and running software systems in production.
  evolution (21) | Evolution & Iteration | 演进迭代
    How software evolves — refactoring, tech debt, migration, team scaling.
  ai (25) | AI Collaboration | AI 协作
    Frameworks for the AI Agent era — human-AI collaboration, agent architecture, LLM application design.
  data (20) | Data Architecture | 数据架构
    Patterns for data-intensive systems — storage, processing, streaming, and data modeling.
  security (21) | Security & Privacy | 安全与隐私
    Threat modeling, secure design, privacy patterns, and zero-trust architectures.
  distributed (21) | Distributed Systems | 分布式系统
    Patterns for building reliable, scalable systems across multiple nodes.
  api (21) | API Design & Integration | API 设计与集成
    Designing, versioning, and integrating APIs across service boundaries.
  team (21) | Team & Organization | 团队与组织
    How team structure and organizational design shape software architecture.
  observability (21) | Observability & DX | 可观测性与开发者体验
    Understanding system behavior through logging, tracing, metrics, and developer tooling.
