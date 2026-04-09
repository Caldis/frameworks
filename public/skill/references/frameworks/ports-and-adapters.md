# Ports and Adapters (Hexagonal Architecture) / 端口与适配器（六边形架构）

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Alistair Cockburn, 2005
- **Adopters**: Netflix, Spotify, Zalando, Sky UK, Thoughtworks, BBVA

Alistair Cockburn's architectural pattern that isolates the application core from external technology concerns by defining explicit ports (interfaces) and adapters (technology-specific implementations)

_Alistair Cockburn的架构模式，通过定义明确的端口（接口）和适配器（特定技术实现），将应用核心与外部技术关注点隔离_

## When to Use

Apply this framework when:
- When the application needs to be driven from multiple clients (HTTP API, CLI, message queue consumer, test harness) without duplicating business logic across each entry point
- For applications with domain logic that must be thoroughly unit-tested in isolation from databases, external APIs, and messaging infrastructure
- When the technology stack is likely to evolve (migrating from REST to gRPC, switching databases) and the business logic must remain stable during infrastructure changes
- In DDD-oriented projects where protecting the domain model from infrastructure concerns is a first-class design objective

## When NOT to Use

Stop and reconsider if:
- For simple CRUD microservices where the domain logic is essentially the database schema — the overhead of ports, adapters, and dependency injection configuration adds friction without testability or flexibility benefit
- In event-sourcing architectures where the persistence model fundamentally shapes the domain model — the forced separation can work against the grain of event-sourced design
- For extremely performance-sensitive hot paths where the indirection layers of interface dispatch and adapter translation add measurable overhead in latency-critical code

## Core Concepts

- Port: A formally defined interface representing an interaction point between the application core and the outside world; driving ports are inbound (triggered by external actors), driven ports are outbound (triggered by the application)
- Adapter: A concrete implementation of a port that translates between the application's domain language and the specific technology protocol (HTTP, SQL, AMQP, gRPC)
- Application Core (Hexagon): The technology-agnostic center containing domain objects, use case orchestration, and business rules; it has zero knowledge of adapter implementations
- Primary/Driving Side: Actors that initiate interactions — users, API consumers, scheduled jobs — connected to the application through driving adapters and ports
- Secondary/Driven Side: Actors that the application drives — databases, external APIs, email services — connected through driven ports and adapters that the application core defines

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Ports and Adapters (Hexagonal Architecture) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the Application Core**: Identify and isolate the domain logic and use cases into a technology-agnostic inner hexagon that contains no references to databases, HTTP frameworks, or external services
2. **Define Driving Ports**: Specify inbound interfaces (use case interfaces, command handlers) that represent the ways the outside world drives the application — these are the left-side ports of the hexagon
3. **Define Driven Ports**: Specify outbound interfaces (repository interfaces, notification services, messaging ports) that represent how the application drives external dependencies — right-side ports
4. **Implement Adapters**: Write concrete implementations for each port — a REST controller adapter drives via the HTTP port, a JPA repository adapter implements the persistence port — keeping adapters thin and free of business logic
5. **Wire with Dependency Injection**: Compose the application by injecting appropriate adapters into the core at startup time, enabling easy swapping of adapters for testing (in-memory adapters) or technology migration (switching databases)

<details><summary>中文步骤</summary>

1. 定义应用核心：将领域逻辑和用例识别并隔离到一个技术无关的内部六边形中，该六边形不包含对数据库、HTTP框架或外部服务的引用
2. 定义驱动端口：指定入站接口（用例接口、命令处理器），表示外部世界驱动应用程序的方式——这些是六边形的左侧端口
3. 定义被驱动端口：指定出站接口（仓储接口、通知服务、消息端口），表示应用程序驱动外部依赖的方式——右侧端口
4. 实现适配器：为每个端口编写具体实现——REST控制器适配器通过HTTP端口驱动，JPA仓储适配器实现持久化端口——保持适配器精简且不含业务逻辑
5. 使用依赖注入连接：通过在启动时将适当的适配器注入核心来组合应用程序，实现轻松交换适配器用于测试（内存适配器）或技术迁移（更换数据库）

</details>

## Do

- Define port interfaces in the domain layer (inner hexagon) and have adapters depend on those interfaces — the dependency arrow always points inward
- Keep adapters thin and free of business logic — an adapter should do nothing more than translate, marshal, and delegate; all decisions live in the core
- Write unit tests against the application core using in-memory adapters — this is the primary payoff of the pattern, enabling fast, reliable tests with no I/O
- Name ports by their business intent (OrderRepository, PaymentGateway) rather than by technology (PostgresRepository, StripeClient) to preserve technology independence

## Don't

- Don't let domain objects leak infrastructure types (JPA annotations, ORM entity markers) — this couples the core to specific technologies and defeats the isolation goal
- Don't create one adapter per class — adapters are boundary implementations, not a one-to-one mapping with every service or repository; group by technology context
- Don't over-apply the pattern to simple CRUD services where the business logic is trivial and the ceremony of ports/adapters adds structural complexity with no isolation benefit
- Don't confuse Ports and Adapters with layered (n-tier) architecture — the key difference is the inversion of dependency direction; in layers, business logic depends on data access; in hexagonal, data access depends on business-defined ports

## Case Study

**Netflix**: Netflix applied Hexagonal Architecture principles to their recommendation engine infrastructure, a system that must be driven by multiple clients (A/B test harness, real-time API calls, batch precomputation jobs) and must integrate with multiple downstream systems (feature store, serving layer, experiment platform). By defining explicit driving ports (RecommendationUseCase interface) and driven ports (FeatureStore, ModelRegistry, ServingLayer), the recommendation team was able to swap the underlying ML model serving infrastructure from their own homegrown system to TorchServe without touching the core recommendation logic. The in-memory adapter pattern enabled them to run the full recommendation logic in unit tests 200x faster than integration tests against real infrastructure, accelerating their experimentation cycle.

## Related Frameworks

- domain-driven-design (complement)
- cell-based-architecture (related)
- clean-architecture (alternative)
- hexagonal-architecture (alternative)
- onion-architecture (alternative)
- n-tier-layered (alternative)

## Source

https://sdframe.caldis.me/frameworks/ports-and-adapters
