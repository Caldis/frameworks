# Modular Monolith / 模块化单体

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: maintainability, scalability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Simon Brown, 2015; elaborated by Mark Richards and Neal Ford, 2020, 2003
- **Adopters**: Shopify, Basecamp, Gusto, Maersk, GitHub

A single deployable unit with strictly enforced module boundaries, combining monolith simplicity with modular maintainability

_具有严格模块边界的单一可部署单元，结合了单体的简洁性和模块化的可维护性_

## When to Use

Apply this framework when:
- When a team wants modular design benefits without the operational complexity of distributed microservices
- When the application is in early stages and domain boundaries are still being discovered
- When deployment simplicity is valued but long-term maintainability through clear module separation is also critical
- When transitioning from a traditional monolith toward better structure as a stepping stone to potential future decomposition

## When NOT to Use

Stop and reconsider if:
- When different modules have fundamentally different scaling requirements that demand independent horizontal scaling
- When teams are geographically distributed and need fully autonomous deployment pipelines for each component
- When the system requires polyglot persistence or different technology stacks for different modules

## Core Concepts

- Module boundary enforcement: Using technical mechanisms (access modifiers, build rules) to prevent unauthorized cross-module dependencies
- Data ownership: Each module exclusively owns its data store or schema, with no shared tables between modules
- Public API surface: Modules expose only intentional interfaces, hiding implementation details behind encapsulation
- Internal event bus: Modules communicate asynchronously through domain events rather than direct method calls for loose coupling
- Decomposability: The architecture is designed so that any module can be extracted into a separate service if needed in the future

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Modular Monolith to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Decompose the domain into bounded contexts and define each as an independent module with its own public API
2. Enforce module boundaries using compiler-level access controls, build tool configurations, or architecture fitness functions
3. **Ensure each module owns its data**: use separate schemas or table prefixes to prevent direct cross-module database access
4. Define explicit inter-module communication through public interfaces, events, or a mediator rather than shared mutable state
5. Continuously validate module boundaries through automated tests and dependency analysis tools to prevent erosion over time

<details><summary>中文步骤</summary>

1. 将领域分解为限界上下文，并将每个上下文定义为拥有独立公共API的独立模块
2. 使用编译器级别的访问控制、构建工具配置或架构适应度函数来强制模块边界
3. 确保每个模块拥有自己的数据：使用独立schema或表前缀防止跨模块直接访问数据库
4. 通过公共接口、事件或中介者定义明确的模块间通信——绝不通过共享可变状态
5. 通过自动化测试和依赖分析工具持续验证模块边界，防止随时间退化

</details>

## Do

- Do enforce module boundaries with automated tooling because human discipline alone is insufficient to prevent coupling over time
- Do give each module its own database schema because shared tables are the fastest path to hidden coupling
- Do design module APIs as if they were remote service contracts because this makes future extraction straightforward
- Do use domain events for cross-module communication because it preserves loose coupling and module autonomy

## Don't

- Don't allow modules to share domain models because it creates semantic coupling that is extremely hard to untangle
- Don't skip module boundary tests because without automated verification boundaries erode within months
- Don't create a module for every class or small concern because over-modularization adds unnecessary complexity
- Don't use direct database joins across module boundaries because it tightly couples modules at the data layer

## Case Study

**Shopify**: Shopify migrated its massive Ruby on Rails monolith serving millions of merchants into a modular monolith by defining clear module boundaries around domain concepts like orders, inventory, and payments. They used the Packwerk tool to enforce dependency rules at the package level, preventing unauthorized cross-module references. This approach allowed Shopify to improve developer velocity while avoiding the operational overhead of hundreds of microservices. Build times and test isolation improved significantly, and the architecture remains a single deployable unit.

## Related Frameworks

- layered-architecture (complement)
- microservices-decomposition (related)
- c4-model (related)

## Source

https://sdframe.caldis.me/frameworks/modular-monolith
