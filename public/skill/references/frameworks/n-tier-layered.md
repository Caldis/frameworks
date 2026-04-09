# N-Tier / Layered Architecture / N层/分层架构

- **Category**: architecture
- **Complexity**: beginner
- **Quality**: maintainability, scalability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: 1990s enterprise computing; formalized by Microsoft and Sun Microsystems, 1992
- **Adopters**: Java EE / Jakarta EE, .NET / ASP.NET MVC, PHP Laravel / Symfony, Python Django, Stack Overflow

Organizes software into horizontal layers — typically Presentation, Business Logic, and Data Access — where each layer depends only on the layer directly below it, establishing clear separation of concerns across the entire application.

_将软件组织为水平层次——通常是表示层、业务逻辑层和数据访问层——其中每层仅依赖其正下方的层，在整个应用程序中建立清晰的关注点分离。_

## When to Use

Apply this framework when:
- When building a standard business application — CRUD-heavy systems, content management, or transactional backends — where simplicity and team familiarity matter
- When the team is new to software architecture and needs a pattern with clear, enforceable rules that are easy to communicate
- When using enterprise frameworks (Java EE, Spring, ASP.NET, PHP Laravel) that are built around layered conventions
- When organizational separation of concerns maps naturally to layers — e.g., separate teams own the UI, services, and database schemas

## When NOT to Use

Stop and reconsider if:
- When the application has fundamentally different scalability requirements per component — e.g., a read-heavy reporting service alongside a write-heavy transaction processor; microservices or CQRS fit better
- When business logic is domain-rich and complex — layered architecture tends to produce anemic domain models; Clean Architecture or DDD is more appropriate
- When deployment agility is critical — a layered monolith requires coordinated deployments; teams needing independent deploy cadences should consider modular or service-based decomposition

## Core Concepts

- Horizontal layers: each layer groups related responsibilities — Presentation (what users see), Business Logic (what the system does), Data Access (how data is stored)
- Layer contract: each layer exposes a well-defined API surface to the layer above and hides its implementation — swapping a layer should not affect layers above it
- Strict vs. relaxed layering: strict layering forbids skipping layers; relaxed layering allows a layer to call any layer below it for performance reasons
- Physical vs. logical tiers: layers are a logical separation; tiers are the physical deployment — a two-tier deployment can implement a three-layer logical design
- Sinkholes anti-pattern: when a layer simply passes a request through to the layer below without adding value, the architecture becomes unnecessarily complex for its benefit

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying N-Tier / Layered Architecture to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the layers appropriate to the application: minimally Presentation (UI/API), Business Logic (domain/service), and Data Access (repository/ORM); large enterprise systems may add Security, Integration, and Messaging layers
2. Define the contract between adjacent layers: each layer exposes a service interface to the layer above; the implementation details of each layer are hidden from higher layers
3. **Implement each layer independently**: Presentation handles HTTP requests and view rendering; Business Logic applies rules and orchestrates operations; Data Access manages persistence
4. Enforce the constraint that each layer may only call the layer immediately below it — Presentation must not access Data Access directly, bypassing Business Logic
5. Deploy and scale layers independently where needed: web tier can be scaled horizontally while the database tier uses vertical scaling

<details><summary>中文步骤</summary>

1. 确定适合应用程序的层次：最小为表示层（UI/API）、业务逻辑层（领域/服务）和数据访问层（仓储/ORM）；大型企业系统可能添加安全、集成和消息传递层
2. 定义相邻层之间的契约：每层向其上方的层暴露服务接口；每层的实现细节对高层隐藏
3. 独立实现每层：表示层处理HTTP请求和视图渲染；业务逻辑层应用规则并协调操作；数据访问层管理持久化
4. 强制执行每层只能调用其正下方层的约束——表示层不得绕过业务逻辑层直接访问数据访问层
5. 在需要时独立部署和扩展各层：Web层可以水平扩展，而数据库层使用垂直扩展

</details>

## Do

- Define explicit service interfaces between layers so each layer can be tested with a mock of the layer below — this is the key to making a layered application testable
- Keep each layer focused on a single concern — a Business Logic layer that also builds SQL queries or HTML is no longer a proper layer
- Document which layer owns each responsibility explicitly at project start — ambiguity leads to logic leaking across layers as the team grows
- Use dependency injection to supply lower-layer implementations to higher layers — avoid static method calls across layer boundaries which create untestable coupling

## Don't

- Don't allow the Presentation layer to query the database directly — this shortcut erodes the architecture and creates security and maintainability risks
- Don't create a single shared domain model that all layers reference — this shared kernel becomes a change magnet that couples all layers to each other
- Don't mistake physical deployment tiers for logical layers — a monolith deployed as a single process can still have three clean logical layers
- Don't keep adding layers for every new concern — excessive layering (six or more layers) creates sinkhole anti-patterns where most calls pass through unchanged

## Case Study

**Stack Overflow**: Stack Overflow famously runs on a classic three-tier layered architecture — ASP.NET MVC presentation layer, C# service layer with business logic, and a SQL Server data layer via Dapper — rather than adopting microservices. This deliberate simplicity, with strict layer discipline, allowed a team of fewer than 20 developers to serve over 100 million monthly visitors. The transparency of the layered model enabled rapid diagnosis of performance bottlenecks (which were almost always in the data layer) and simplified capacity planning. Their architecture has been cited repeatedly as evidence that layered monoliths, when carefully maintained, can dramatically outperform distributed alternatives in developer productivity.

## Related Frameworks

- layered-architecture (related)
- separation-of-concerns (extends)
- solid-principles (related)

## Source

https://sdframe.caldis.me/frameworks/n-tier-layered
