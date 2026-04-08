# DDD Tactical Patterns / DDD 战术模式

- **Category**: coding
- **Complexity**: advanced
- **Quality**: maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Eric Evans, 2003
- **Adopters**: Zalando, SoundCloud, Klarna, Just Eat Takeaway, Vrbo

Implementation building blocks: entities, value objects, aggregates

_领域驱动设计的实现构建块：实体、值对象、聚合_

## When to Use

Apply this framework when:
- Building complex business domains with intricate rules and workflows
- Systems where the domain model is the primary source of competitive advantage
- Projects with domain experts actively collaborating with developers
- Microservice boundaries need to enforce strong consistency within aggregates

## When NOT to Use

Stop and reconsider if:
- Simple CRUD applications with minimal business logic
- Projects without access to domain experts for collaborative modeling
- Teams unfamiliar with DDD who would misapply patterns and create accidental complexity
- Read-heavy reporting systems where a query-optimized model is more appropriate

## Core Concepts

- Entity: an object defined by its identity rather than its attributes, whose lifecycle is tracked across state changes
- Value Object: an immutable object defined entirely by its attributes, with no conceptual identity (e.g., Money, DateRange)
- Aggregate: a cluster of entities and value objects treated as a single unit for data changes, with an Aggregate Root as the entry point
- Domain Event: a record of something meaningful that happened in the domain, used to communicate between bounded contexts
- Repository: an abstraction that mediates between the domain and data mapping layers, providing collection-like access to aggregates

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying DDD Tactical Patterns to?
- What constraints or existing architecture do you need to work within?
- Has your team used DDD Tactical Patterns before? (This is an advanced framework)

## Implementation Steps

1. **Define Entities**: identify objects with unique identity that persists across state changes; implement equality by identity, not attributes
2. **Design Value Objects**: model concepts defined solely by their attributes (Money, Address); make them immutable and enforce equality by value
3. **Establish Aggregates**: group related entities and value objects under an aggregate root that enforces consistency boundaries and invariants
4. **Implement Domain Events**: capture meaningful state changes as event objects that can be published to other bounded contexts or projections
5. **Use Repositories and Factories**: encapsulate persistence behind repository interfaces and complex object creation behind factory methods

<details><summary>中文步骤</summary>

1. 定义实体：识别具有跨状态变更持续存在的唯一标识的对象；按标识而非属性实现相等性
2. 设计值对象：对仅由属性定义的概念建模（金额、地址）；使其不可变，按值实现相等性
3. 建立聚合：将相关实体和值对象组织在聚合根下，由聚合根强制一致性边界和不变式
4. 实现领域事件：将有意义的状态变更捕获为事件对象，可发布到其他限界上下文或投影
5. 使用仓储与工厂：将持久化封装在仓储接口后，将复杂对象创建封装在工厂方法后

</details>

## Do

- Do keep aggregates small because large aggregates create contention and performance problems
- Do make value objects immutable because mutability introduces subtle bugs in equality and hashing
- Do use ubiquitous language in code because domain experts should be able to read your class names
- Do enforce invariants at the aggregate root because consistency boundaries must be explicit

## Don't

- Don't reference other aggregates by direct object reference because it breaks consistency boundaries — use IDs instead
- Don't create anemic domain models that are just data bags with external service logic because it defeats the purpose of DDD
- Don't skip event modeling because domain events are the primary mechanism for cross-aggregate communication
- Don't apply DDD tactical patterns to simple CRUD domains because the overhead is not justified

## Case Study

**Zalando**: Zalando, Europe's largest online fashion platform, restructured its order management system using DDD tactical patterns. Each bounded context (inventory, payment, shipping) was modeled with distinct aggregates, and domain events enabled eventual consistency across contexts. This allowed Zalando to scale to processing over 500,000 orders per day with independent team deployments.

## Related Frameworks

- domain-driven-design (extends)
- event-sourcing-pattern (complement)
- cqrs-pattern (complement)
- hexagonal-architecture (complement)

## Source

https://sdframe.caldis.me/frameworks/ddd-tactical-patterns
