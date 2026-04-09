# Onion Architecture / 洋葱架构

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Jeffrey Palermo, 2008
- **Adopters**: .NET enterprise community, Java Spring community, ThoughtWorks client projects

Structures applications as concentric rings around a Domain Model core, where all dependencies flow inward and infrastructure lives in the outermost ring, making the domain model completely independent of persistence and UI concerns.

_将应用程序构建为围绕领域模型核心的同心环，所有依赖指向内部，基础设施位于最外层环，使领域模型完全独立于持久化和UI关注点。_

## When to Use

Apply this framework when:
- When domain logic is complex and must remain insulated from framework churn — changing the ORM or web framework should not touch domain code
- When practicing Domain-Driven Design and needing an architectural pattern that enforces the domain model's primacy
- When the team needs to test domain and application logic in isolation from databases and external services
- When building .NET enterprise applications where the pattern has strong tooling and community support

## When NOT to Use

Stop and reconsider if:
- For microservices with thin business logic where a simple three-layer structure (API, Service, Repository) provides sufficient separation
- When the team is not practicing DDD — the Onion Architecture's ring structure maps naturally to DDD concepts; without DDD fluency the rings tend to collapse
- For frontend applications — the pattern is server-side focused and does not translate cleanly to UI component architectures

## Core Concepts

- Domain Model at the core: the innermost ring contains pure domain objects — no framework dependencies, no infrastructure imports, maximum stability
- Inward dependency rule: every ring depends only on rings closer to the center, never on rings farther out
- Repository interfaces inward: repository interfaces are defined inside the Domain Services ring; concrete implementations live in the outermost Infrastructure ring
- Application Services ring: thin orchestration layer that calls domain services and repositories to fulfill use cases; does not contain business rules
- Infrastructure at the periphery: everything that touches the outside world (databases, file systems, external APIs, UI) is isolated in the outermost ring and can be replaced independently

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Onion Architecture to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Place the Domain Model at the core**: pure domain objects (entities, value objects, aggregates) with no dependencies on any outer ring or external library
2. **Wrap with Domain Services**: interfaces and services that operate on the Domain Model but remain framework-independent; repository interfaces are defined here
3. **Add Application Services**: orchestration logic that coordinates domain objects to fulfill use cases; this ring depends on Domain Model and Domain Services but not on infrastructure
4. **Implement the Infrastructure ring**: concrete implementations of repository interfaces, ORM mappings, external API clients, and UI frameworks — all pointing inward
5. **Wire via dependency injection**: the application entry point (e.g., startup class) instantiates infrastructure implementations and injects them into application services through the interfaces defined in inner rings

<details><summary>中文步骤</summary>

1. 将领域模型置于核心：纯领域对象（实体、值对象、聚合），不依赖任何外层环或外部库
2. 用领域服务包裹：在领域模型上操作但保持框架无关的接口和服务；仓储接口在此处定义
3. 添加应用服务：协调领域对象以完成用例的编排逻辑；此环依赖领域模型和领域服务，但不依赖基础设施
4. 实现基础设施环：仓储接口的具体实现、ORM映射、外部API客户端和UI框架——全部指向内部
5. 通过依赖注入连接：应用程序入口点（例如启动类）实例化基础设施实现，并通过内层环定义的接口将其注入应用服务

</details>

## Do

- Define all repository and service interfaces inside the Domain Services ring, never in the Infrastructure ring, so that domain code never imports from infrastructure
- Keep the Domain Model ring free of all annotations and framework-specific base classes — a pure POCO/POJO domain model can be tested without bootstrapping the framework
- Use dependency injection containers configured at the application entry point to bind infrastructure implementations to inner-ring interfaces
- Separate Application Services (use case orchestration) from Domain Services (business rules applied to domain objects) — conflating them erodes the ring structure

## Don't

- Don't place Entity Framework or Hibernate entity classes in the Domain Model ring — ORM-decorated entities couple the domain to the persistence framework
- Don't skip the Application Services ring and call domain objects directly from the UI or API layer — this bypasses authorization, validation, and orchestration logic
- Don't allow infrastructure concerns (connection strings, retry policies) to bleed into application services — infrastructure configuration belongs in the outermost ring
- Don't treat Onion Architecture as simply renaming N-Tier layers — the critical difference is the direction of dependencies and where interfaces are defined

## Case Study

**ThoughtWorks**: ThoughtWorks consultants adopted Onion Architecture on a large UK insurance platform migration project, replacing a fragile N-Tier monolith where business rules were scattered across stored procedures, service classes, and UI code. By restructuring around a domain model core, the team isolated all premium calculation and policy validation rules in a pure domain ring that could be unit-tested in milliseconds without database or web server dependencies. After six months, the domain ring had 94% unit test coverage with test suites running in 8 seconds, enabling confident refactoring of the 12-year-old business rules.

## Related Frameworks

- hexagonal-architecture (related)
- domain-driven-design (complement)
- solid-principles (prerequisite)

## Source

https://sdframe.caldis.me/frameworks/onion-architecture
