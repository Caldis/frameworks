# Clean Architecture / 整洁架构

- **Category**: architecture
- **Complexity**: advanced
- **Quality**: maintainability, testability, portability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Robert C. Martin (Uncle Bob), 2012
- **Adopters**: Nubank, Android community (standard pattern), .NET community (Clean Architecture template), Go microservices community

Organizes code into concentric dependency rings — Entities, Use Cases, Interface Adapters, Frameworks — where the Dependency Rule mandates all source-code dependencies point inward, making the system independent of UI, database, and frameworks.

_将代码组织为同心依赖环——实体、用例、接口适配器、框架——依赖规则规定所有源代码依赖指向内部，使系统独立于UI、数据库和框架。_

## When to Use

Apply this framework when:
- When the application must remain testable without any external infrastructure — databases, web servers, or UI frameworks should be optional at test time
- When the team anticipates replacing or upgrading the database, web framework, or UI technology during the system's lifetime
- When domain rules are complex enough to justify the overhead — Clean Architecture pays dividends when business logic has many rules and variations
- When building a long-lived enterprise application where multiple teams need clear, enforced boundaries between concerns

## When NOT to Use

Stop and reconsider if:
- For simple CRUD microservices where the business logic is thin and the value of the pattern's indirection layers is negative
- For quick prototypes or MVPs where time-to-market matters more than long-term maintainability
- For teams unfamiliar with dependency inversion — misapplied Clean Architecture creates complexity without the promised testability benefits

## Core Concepts

- The Dependency Rule: source code dependencies must always point inward — outer rings know about inner rings, never the reverse
- Entities: enterprise-wide business rules encapsulated as objects; the most stable, rarely-changing core of the system
- Use Cases: application-specific business rules that define the system's behavior; they direct data flow to and from Entities
- Interface Adapters: the translation layer — Controllers convert web requests to Use Case inputs; Presenters convert Use Case outputs to View models; Gateways implement Repository interfaces defined by Use Cases
- Dependency Inversion at the boundary: inner rings define interfaces (Repository, Presenter interface); outer rings provide implementations — control flows inward but dependency points outward, toward the inner ring's interface

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Clean Architecture to?
- What constraints or existing architecture do you need to work within?
- Has your team used Clean Architecture before? (This is an advanced framework)

## Implementation Steps

1. **Identify the core Entities**: business objects and rules that exist independent of any application — these form the innermost ring and have zero external dependencies
2. **Define Use Cases (Interactors)**: application-specific business rules that orchestrate Entities; each Use Case captures one piece of user-facing functionality and depends only on Entities
3. **Define Interface Adapters**: Controllers, Presenters, and Gateways that convert data between the format convenient for Use Cases and the format required by external systems (DB, web, UI)
4. Place all external concerns (frameworks, drivers, UI) in the outermost ring: these are implementation details that can be swapped without affecting any inner ring
5. Enforce the Dependency Rule mechanically: use dependency inversion (interfaces defined in inner rings, implemented in outer rings) to ensure no inner ring ever imports from an outer ring

<details><summary>中文步骤</summary>

1. 识别核心实体：独立于任何应用程序存在的业务对象和规则——这些形成最内层环，零外部依赖
2. 定义用例（交互器）：协调实体的应用程序特定业务规则；每个用例捕获一项面向用户的功能，仅依赖实体
3. 定义接口适配器：控制器、呈现者和网关，在用例方便的格式和外部系统（数据库、Web、UI）所需格式之间转换数据
4. 将所有外部关注点（框架、驱动程序、UI）放在最外层环：这些是可以在不影响任何内层环的情况下替换的实现细节
5. 机械地强制执行依赖规则：使用依赖倒置（在内层环中定义接口，在外层环中实现）确保内层环永远不从外层环导入

</details>

## Do

- Define all repository and external service interfaces inside the Use Case ring — the Use Case owns the contract, the outer ring provides the implementation
- Pass simple data structures (DTOs, primitives) across ring boundaries rather than rich domain objects — this prevents leaking inner-ring types into outer rings
- Write Use Case unit tests that supply all dependencies as in-memory fakes — a Use Case test that touches a real database or network is not a unit test
- Use package/module naming that reflects the ring — e.g., domain, application, infrastructure — so that import direction violations are immediately visible

## Don't

- Don't let framework annotations (Spring @Entity, JPA annotations) leak into the Entity ring — this couples your most stable code to your most volatile dependency
- Don't create a single monolithic Use Case class that handles an entire feature area — each Use Case should do one thing and express one business intention
- Don't cross ring boundaries in tests to save setup time — testing an outer ring object by letting it call into the real inner ring defeats the isolation purpose
- Don't apply Clean Architecture to small scripts or microservices with trivial logic — the indirection overhead outweighs the benefits for simple CRUD operations

## Case Study

**Nubank**: Nubank, the Brazilian fintech serving over 90 million customers, adopted Clean Architecture across its Clojure and Kotlin microservices to enforce strict separation between rapidly-changing business rules and stable infrastructure choices. By placing all financial calculation and compliance rules in the innermost Entity and Use Case rings, Nubank's engineering team was able to replace their persistence layer (migrating from Datomic to PostgreSQL for specific services) without touching business logic code. Their Use Case test suites run in under 5 seconds with in-memory repositories, enabling a TDD workflow that catches business rule regressions before any infrastructure is involved.

## Related Frameworks

- hexagonal-architecture (related)
- solid-principles (prerequisite)
- domain-driven-design (complement)

## Source

https://sdframe.caldis.me/frameworks/clean-architecture
