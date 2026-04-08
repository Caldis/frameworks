# Separation of Concerns / 关注点分离

- **Category**: thinking
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Edsger W. Dijkstra, 1974, 1968
- **Adopters**: Netflix, Linux Kernel, React (UI/State separation), Spring Framework, Django

The foundational principle of modular design: each module should address a single, well-defined concern

_模块化设计的基础原则：每个模块应解决一个定义明确的关注点_

## When to Use

Apply this framework when:
- When a single change to business logic requires modifications in database queries, UI templates, and API controllers simultaneously
- When different team members cannot work on different features without merge conflicts because concerns are tangled together in shared files
- When testing a module requires setting up unrelated infrastructure (e.g., testing business logic requires a running database) because concerns are not isolated
- When onboarding engineers struggle to find where a specific type of logic lives because it is scattered across multiple layers

## When NOT to Use

Stop and reconsider if:
- When building a small script or utility where the overhead of modular separation exceeds the complexity of the entire program
- When concerns are genuinely inseparable in the domain (e.g., real-time physics simulation where rendering and physics must be tightly coupled for performance)
- When the team is in a rapid prototyping phase and premature separation would slow down learning — you can always separate later when boundaries become clear
- When the system has only one concern, such as a single-purpose data transformation pipeline, where separation would create artificial boundaries

## Core Concepts

- Single Responsibility per Module: Each module should have one reason to change — when a concern changes, only the modules responsible for that concern should need modification
- Cohesion and Coupling: Separation of concerns maximizes cohesion (related code together) and minimizes coupling (unrelated code apart), the twin goals of good modular design
- Concern as an Axis of Change: A 'concern' is best identified by what changes together — if business rules and UI always change for different reasons, they are separate concerns
- Layered Independence: Properly separated concerns can evolve independently — you can swap a database layer without touching business logic, or redesign UI without altering domain models

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Separation of Concerns to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify Concerns**: enumerate all distinct responsibilities in the system — business logic, data access, presentation, authentication, logging, error handling, etc.
2. **Map Current Coupling**: audit the existing codebase to find where multiple concerns are interleaved within single modules, classes, or functions
3. **Define Concern Boundaries**: draw clear boundaries between concerns and decide which module owns each concern, creating a responsibility map
4. **Refactor to Isolate**: extract interleaved concerns into dedicated modules with well-defined interfaces, using patterns like middleware, dependency injection, or layered architecture
5. **Enforce Boundaries**: establish architectural rules (via linting, module dependency analysis, or code review checklists) that prevent cross-concern coupling from creeping back

<details><summary>中文步骤</summary>

1. 识别关注点：列出系统中所有不同的职责——业务逻辑、数据访问、展示、认证、日志记录、错误处理等
2. 映射当前耦合：审计现有代码库，找出多个关注点在单个模块、类或函数中交织的位置
3. 定义关注点边界：在关注点之间画出清晰的边界，决定哪个模块拥有每个关注点，创建职责映射
4. 重构以隔离：将交织的关注点提取到具有明确接口的专用模块中，使用中间件、依赖注入或分层架构等模式
5. 执行边界：建立架构规则（通过linting、模块依赖分析或代码审查清单），防止跨关注点耦合再次蔓延

</details>

## Do

- Do identify concerns by asking 'what changes together and why?' rather than by following rigid architectural templates, because real concerns are domain-specific
- Do use dependency injection to wire separated concerns together, because it keeps modules unaware of each other's implementations while allowing collaboration
- Do separate cross-cutting concerns (logging, auth, metrics) using middleware or aspect-oriented techniques rather than scattering them through business logic
- Do enforce separation through automated dependency analysis in CI, because manual discipline erodes over time as deadlines create pressure to take shortcuts

## Don't

- Don't separate concerns so aggressively that simple operations require tracing through 10 layers of indirection, because over-separation creates its own complexity
- Don't treat every function as a separate concern, because the goal is meaningful separation of distinct responsibilities, not maximum granularity
- Don't mix separation of concerns with code organization (file structure), because two concerns can live in the same file if they are logically distinct and small
- Don't ignore the cost of the abstractions needed to separate concerns, because interfaces, adapters, and dependency injection add cognitive overhead that must be justified

## Case Study

**Netflix**: Netflix's migration from a monolithic Java application to a microservices architecture is a large-scale application of separation of concerns. The original monolith interleaved recommendation logic, streaming protocols, user authentication, billing, and content metadata in tightly coupled modules. By separating each into independent services with clear API boundaries, Netflix enabled independent deployment (over 1,000 production changes per day), independent scaling (the recommendation engine scales differently from the streaming CDN), and independent team ownership. The separation was so thorough that when the recommendation algorithm was completely rewritten in 2016, no other service required any changes.

## Related Frameworks

- deep-vs-shallow-modules (complement)
- complexity-budget (complement)
- domain-driven-design (complement)
- design-by-contract (complement)

## Source

https://sdframe.caldis.me/frameworks/separation-of-concerns
