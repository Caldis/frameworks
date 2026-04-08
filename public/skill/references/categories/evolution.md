# Evolution & Iteration / 演进迭代

How software evolves — refactoring, tech debt, migration, team scaling.

软件演进——重构策略、技术债务、迁移模式、团队扩展。

**21 frameworks** in this category.

## Frameworks

### Strangler Fig Pattern / 绞杀榕模式
- **Slug**: strangler-fig-pattern
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Martin Fowler, 2004
- Incrementally replace a legacy system by routing traffic to new modules

### Branch by Abstraction / 抽象分支法
- **Slug**: branch-by-abstraction
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Paul Hammant, 2007
- Replace a component in-place via an abstraction layer without feature branches

### Parallel Run / 并行运行模式
- **Slug**: parallel-run
- **Complexity**: advanced
- **Quality**: reliability
- **Author**: Michael Feathers, 2004
- Run old and new implementations simultaneously and compare outputs for safety

### Technical Debt Quadrant / 技术债务象限
- **Slug**: technical-debt-quadrant
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Martin Fowler, 2009
- Classify tech debt by deliberate/inadvertent and reckless/prudent axes

### Architectural Fitness Functions / 架构适应度函数
- **Slug**: architectural-fitness-functions
- **Complexity**: advanced
- **Quality**: maintainability, reliability
- **Author**: Neal Ford, Rebecca Parsons & Patrick Kua, 2017
- Automated tests that continuously verify architectural characteristics stay intact

### Conway's Law / 康威定律
- **Slug**: conways-law
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Melvin Conway, 1967
- Systems mirror the communication structure of the organizations that build them

### Inverse Conway Maneuver / 逆康威策略
- **Slug**: inverse-conway-maneuver
- **Complexity**: advanced
- **Quality**: maintainability, scalability
- **Author**: Jonny LeRoy & Matt Simons, 2010
- Deliberately restructure teams to produce the desired system architecture

### Team Topologies / 团队拓扑
- **Slug**: team-topologies
- **Complexity**: intermediate
- **Quality**: maintainability, scalability
- **Author**: Matthew Skelton & Manuel Pais, 2019
- Four team types and three interaction modes for fast, sustainable software delivery

### Database Migration Patterns / 数据库迁移模式
- **Slug**: database-migration-patterns
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Author**: Pramod Sadalage & Scott Ambler, 2006
- Safe techniques for evolving database schemas without downtime or data loss

### AI-Assisted Refactoring / AI 辅助重构
- **Slug**: ai-assisted-refactoring
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Industry practice, 2022
- Use LLMs to identify, plan, and execute code refactoring at scale

### Continuous Architecture / 持续架构
- **Slug**: continuous-architecture
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Murat Erder & Pierre Pureur, 2015
- Evolve architecture incrementally in sync with delivery rather than big up-front design

### Evolutionary Agent Systems / 演进式智能体系统
- **Slug**: evolutionary-agent-systems
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Author**: Industry practice, 2023
- Iteratively evolve AI agent architectures using feedback, eval, and capability staging

### Mikado Method / 米卡多方法
- **Slug**: mikado-method
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Ola Ellnestam & Daniel Brolund, 2014
- Visualize and untangle large refactorings as a dependency graph of small safe steps

### Evolutionary Database Design / 演进式数据库设计
- **Slug**: evolutionary-database-design
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Author**: Pramod Sadalage & Martin Fowler, 2002-2016
- Incremental schema changes (Sadalage & Fowler)

### Feature Branch Strategy / 特性分支策略
- **Slug**: feature-branch-strategy
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Vincent Driessen (GitFlow, 2010); various (trunk-based development, ~2000s)
- Git branching models (GitFlow, trunk-based)

### Deprecation Strategy / 弃用策略
- **Slug**: deprecation-strategy
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Industry practice formalized across Google, Stripe, and major API providers, ~2010s
- Systematic approach to retiring old APIs/features

### Living Documentation / 活文档
- **Slug**: living-documentation
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Author**: Cyrille Martraire, 2019
- Generate docs from tests and code (Martraire, 2019)

### Fitness Function-Driven Development / 适应度函数驱动开发
- **Slug**: fitness-function-driven-development
- **Complexity**: advanced
- **Quality**: maintainability, reliability, testability
- **Author**: Neal Ford
- Automated architecture governance using executable fitness functions that continuously verify architectural characteristics are preserved during system evolution

### Expansion/Contraction Pattern / 扩展/收缩模式
- **Slug**: expansion-contraction-pattern
- **Complexity**: intermediate
- **Quality**: maintainability, reliability, portability
- **Author**: Sam Newman
- Safe API and schema migration technique that introduces new capabilities before removing old ones, allowing all clients to migrate without downtime

### Architecture Decision Records (Y-Statements) / 架构决策记录（Y 型陈述）
- **Slug**: adr-y-statements
- **Complexity**: beginner
- **Quality**: maintainability, observability
- **Author**: Olaf Zimmermann
- Structured decision documentation using the Y-statement format to capture context, decision, and consequences of significant architectural choices

### Monolith Decomposition Patterns / 单体分解模式
- **Slug**: monolith-decomposition-patterns
- **Complexity**: advanced
- **Quality**: maintainability, scalability, reliability
- **Author**: Sam Newman (Building Microservices); Martin Fowler (StranglerFig, BranchByAbstraction)
- A catalog of proven strategies for systematically extracting microservices from a monolithic codebase while maintaining system stability and team velocity throughout the migration
