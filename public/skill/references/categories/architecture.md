# Architecture Decisions / 架构决策

Making and documenting architectural decisions — choosing patterns, evaluating trade-offs.

架构决策的制定与记录——模式选择、权衡评估、系统宏观结构。

**31 frameworks** in this category.

## Frameworks

### Architecture Decision Records (ADR) / 架构决策记录
- **Slug**: adr
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Michael Nygard, 2011
- Lightweight docs capturing context and rationale for decisions

### Architecture Tradeoff Analysis Method (ATAM) / 架构权衡分析法
- **Slug**: atam
- **Complexity**: advanced
- **Quality**: reliability, performance
- **Author**: Rick Kazman, Mark Klein, Paul Clements / SEI, 2000
- Structured method to evaluate architecture against quality goals

### CAP Theorem / CAP定理
- **Slug**: cap-theorem
- **Complexity**: intermediate
- **Quality**: reliability, scalability
- **Author**: Eric Brewer, 2000
- Distributed systems can guarantee only 2 of 3: C, A, P

### C4 Model / C4模型
- **Slug**: c4-model
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Simon Brown, 2011
- Four-level hierarchy for visualizing software architecture

### CQRS Pattern / 命令查询职责分离模式
- **Slug**: cqrs-pattern
- **Complexity**: advanced
- **Quality**: performance, scalability
- **Author**: Greg Young, 2010
- Separate read/write models for optimized scalability

### Event-Driven Architecture (EDA) / 事件驱动架构
- **Slug**: eda
- **Complexity**: intermediate
- **Quality**: scalability, reliability
- **Author**: Concept has roots in publish-subscribe systems; popularized by Gregor Hohpe and Bobby Woolf, 2003
- Systems communicate via asynchronous events for loose coupling

### Microservices Decomposition Patterns / 微服务分解模式
- **Slug**: microservices-decomposition
- **Complexity**: advanced
- **Quality**: scalability, maintainability
- **Author**: James Lewis and Martin Fowler, 2014
- Strategies to split monoliths into focused, independent services

### Saga Pattern / Saga 模式
- **Slug**: saga-pattern
- **Complexity**: advanced
- **Quality**: reliability
- **Author**: Hector Garcia-Molina and Kenneth Salem, 1987
- Manage distributed transactions via compensating actions

### TOGAF Architecture Development Method (ADM) / TOGAF架构开发方法
- **Slug**: togaf-adm
- **Complexity**: advanced
- **Quality**: maintainability
- **Author**: The Open Group, 1995
- Iterative enterprise architecture lifecycle with defined phases

### Quality Attribute Workshop (QAW) / 质量属性工作坊
- **Slug**: qaw
- **Complexity**: intermediate
- **Quality**: reliability, usability
- **Author**: Mario Barbacci, Robert Ellison, et al. / SEI, 2003
- Elicit and prioritize quality attribute requirements collaboratively

### Actor Model / Actor 模型
- **Slug**: actor-model
- **Complexity**: intermediate
- **Quality**: scalability, reliability
- **Author**: Carl Hewitt, Peter Bishop, Richard Steiger, 1973
- Concurrent computation using message-passing actors

### Dependency Injection / 依赖注入
- **Slug**: dependency-injection
- **Complexity**: beginner
- **Quality**: testability, maintainability
- **Author**: Martin Fowler, 2004
- Invert control flow by injecting dependencies externally

### Service Mesh Pattern / 服务网格模式
- **Slug**: service-mesh-pattern
- **Complexity**: advanced
- **Quality**: reliability, observability
- **Author**: William Morgan (Buoyant), 2017
- Dedicated infrastructure for service-to-service communication

### LLM System Design Patterns / LLM系统设计模式
- **Slug**: llm-system-design-patterns
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Author**: Community-evolved; key contributors include Harrison Chase (LangChain, 2022) and Jerry Liu (LlamaIndex, 2022)
- Architectural patterns for production LLM-powered applications

### Layered Architecture / 分层架构
- **Slug**: layered-architecture
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Frank Buschmann, Regine Meunier, Hans Rohnert, Peter Sommerlad, Michael Stal, 1996
- Traditional n-tier architecture separating presentation, business logic, and data access into horizontal layers with strict dependency rules

### Modular Monolith / 模块化单体
- **Slug**: modular-monolith
- **Complexity**: intermediate
- **Quality**: maintainability, scalability
- **Author**: Simon Brown, 2015; elaborated by Mark Richards and Neal Ford, 2020
- A single deployable unit with strictly enforced module boundaries, combining monolith simplicity with modular maintainability

### Space-Based Architecture / 基于空间的架构
- **Slug**: space-based-architecture
- **Complexity**: advanced
- **Quality**: scalability, performance
- **Author**: Mark Richards, 2006; formalized in Richards & Ford, 2020
- Distributed architecture using in-memory data grids and processing units to achieve high scalability by eliminating the central database bottleneck

### Pipe and Filter Architecture / 管道与过滤器架构
- **Slug**: pipe-and-filter
- **Complexity**: intermediate
- **Quality**: maintainability, portability
- **Author**: Doug McIlroy, 1964; formalized by Mary Shaw and David Garlan, 1996
- Architecture pattern that decomposes data processing into independent, composable stages connected by data channels

### Architecture Fitness Functions / 架构适应度函数
- **Slug**: architecture-fitness-functions
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Author**: Neal Ford, Rebecca Parsons, Patrick Kua, 2017
- Automated, objective compliance checks that continuously validate whether an architecture meets its defined characteristics

### Decision Matrix (Weighted Scoring) / 决策矩阵（加权评分法）
- **Slug**: decision-matrix
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Stuart Pugh, 1991; adapted for software architecture by Bass, Clements, and Kazman
- Systematic trade-off evaluation method that scores architecture alternatives against weighted criteria to make objective, transparent decisions

### Cell-Based Architecture / 单元化架构
- **Slug**: cell-based-architecture
- **Complexity**: advanced
- **Quality**: reliability, scalability, security
- **Author**: WSO2
- An architectural pattern where a system is divided into independent, self-contained cells that own their data, compute, and network resources, enabling granular scaling, fault isolation, and independent deployability

### Ports and Adapters (Hexagonal Architecture) / 端口与适配器（六边形架构）
- **Slug**: ports-and-adapters
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Author**: Alistair Cockburn
- Alistair Cockburn's architectural pattern that isolates the application core from external technology concerns by defining explicit ports (interfaces) and adapters (technology-specific implementations)

### Evolutionary Architecture / 演进式架构
- **Slug**: evolutionary-architecture
- **Complexity**: advanced
- **Quality**: maintainability, scalability, reliability
- **Author**: Neal Ford
- Neal Ford's approach to designing software systems that support incremental, guided change across all dimensions through fitness functions and architectural coupling analysis

### MVC (Model-View-Controller) / MVC（模型-视图-控制器）
- **Slug**: mvc
- **Complexity**: beginner
- **Quality**: maintainability, testability
- **Author**: Trygve Reenskaug, 1979, Xerox PARC
- Separates an application into three interconnected components — Model (data/logic), View (UI), and Controller (input handling) — to decouple presentation from business logic.

### MVVM (Model-View-ViewModel) / MVVM（模型-视图-视图模型）
- **Slug**: mvvm
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Author**: John Gossman, 2005, Microsoft (WPF team)
- Separates UI from business logic by introducing a ViewModel that exposes data streams and commands for two-way data binding, enabling declarative view construction and high testability.

### MVP (Model-View-Presenter) / MVP（模型-视图-呈现者）
- **Slug**: mvp
- **Complexity**: intermediate
- **Quality**: testability, maintainability
- **Author**: Mike Potel / Taligent, 1996
- Evolves MVC by replacing the Controller with a Presenter that holds all UI logic, while the View becomes a passive interface that delegates every user gesture to the Presenter.

### Clean Architecture / 整洁架构
- **Slug**: clean-architecture
- **Complexity**: advanced
- **Quality**: maintainability, testability, portability
- **Author**: Robert C. Martin (Uncle Bob), 2012
- Organizes code into concentric dependency rings — Entities, Use Cases, Interface Adapters, Frameworks — where the Dependency Rule mandates all source-code dependencies point inward, making the system independent of UI, database, and frameworks.

### Onion Architecture / 洋葱架构
- **Slug**: onion-architecture
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Author**: Jeffrey Palermo, 2008
- Structures applications as concentric rings around a Domain Model core, where all dependencies flow inward and infrastructure lives in the outermost ring, making the domain model completely independent of persistence and UI concerns.

### N-Tier / Layered Architecture / N层/分层架构
- **Slug**: n-tier-layered
- **Complexity**: beginner
- **Quality**: maintainability, scalability
- **Author**: 1990s enterprise computing; formalized by Microsoft and Sun Microsystems
- Organizes software into horizontal layers — typically Presentation, Business Logic, and Data Access — where each layer depends only on the layer directly below it, establishing clear separation of concerns across the entire application.

### Microkernel (Plugin) Architecture / 微内核（插件）架构
- **Slug**: microkernel-architecture
- **Complexity**: intermediate
- **Quality**: maintainability, portability
- **Author**: OS design lineage (Mach microkernel, 1985, Carnegie Mellon); applied to software architecture by Richards and Ford (2015)
- Separates a minimal stable core system from interchangeable plug-in modules, enabling feature extension without modifying the core — the core provides services and a registry; plugins contribute functionality through a defined contract.

### Flux / Unidirectional Data Flow / Flux / 单向数据流
- **Slug**: flux-unidirectional
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Author**: Facebook (Jing Chen, Bill Fisher), 2014
- Enforces a strict one-way data cycle — Action → Dispatcher → Store → View → Action — eliminating the cascading update problems of two-way binding by making state changes predictable and traceable.
