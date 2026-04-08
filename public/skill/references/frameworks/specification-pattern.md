# Specification Pattern / 规格模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Eric Evans, 1997
- **Adopters**: Ardalis (Steve Smith), Microsoft (internal DDD projects), NopCommerce, eShopOnWeb (Microsoft reference), JetBrains Rider (domain logic), Umbraco CMS

Encapsulating business rules as composable, reusable objects that can be combined with boolean logic to express complex domain predicates

_将业务规则封装为可组合、可复用的对象，通过布尔逻辑组合来表达复杂的领域谓词_

## When to Use

Apply this framework when:
- Business rules that are duplicated across multiple locations (domain validation, query filters, UI conditionals) and need a single canonical definition that can be reused without copy-paste
- Complex eligibility or filtering logic that is currently expressed as hard-to-read boolean chains in service methods or repository queries
- Domain-rich applications where business rules should be named, documented, and discoverable as first-class domain concepts rather than anonymous lambda expressions
- Systems where business rules are frequently added or changed and need to be testable in isolation without spinning up the full application or database

## When NOT to Use

Stop and reconsider if:
- Simple CRUD applications where business rules are few, stable, and not duplicated — the overhead of the Specification pattern exceeds its organizational benefit for trivial data validation
- Scripts and one-off data processing jobs where no code reuse across contexts is required and named domain concepts add no value
- Performance-critical hot paths where the expression tree compilation overhead of database-translatable specifications introduces measurable latency on every request

## Core Concepts

- Specification as Domain Object: a specification is a first-class domain concept — a named business rule (EligibleForLoyaltyReward, PastDueInvoice) that is explicit, documented, and discoverable rather than hidden in anonymous predicates
- Composability: specifications support boolean composition (And, Or, Not) so complex rules are expressed by combining atomic specifications rather than writing nested boolean expressions, keeping each rule independently readable
- Dual-Use Specification: a well-implemented specification can be used both for in-memory validation (IsSatisfiedBy(entity)) and for database query generation (ToExpression() → IQueryable<T>.Where(spec)) using expression trees
- Rule Centralization: by encoding each business rule in exactly one specification class, changes to the rule (eligibility threshold changes, new exceptions) propagate automatically everywhere the specification is used
- Separation of What from How: specifications separate what the business rule is from how it is applied — the same EligibleForDiscountSpec can drive domain validation, database filtering, and UI rendering without any of these contexts knowing about each other

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Specification Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify business rules that are duplicated across the codebase or mixed into query logic and UI validation — these are the candidates for extraction into explicit Specification objects
2. Define a Specification interface with a single IsSatisfiedBy(entity) method (or an expression property for database-pushable specs) that encapsulates one cohesive business rule
3. Implement concrete specifications for each atomic rule: PremiumCustomerSpec, ActiveAccountSpec, EligibleForDiscountSpec — each class encodes one well-named business concept
4. Implement composition operators on the Specification base class: And(), Or(), Not() — so complex rules can be expressed as new PremiumCustomerSpec().And(new ActiveAccountSpec()) rather than inline boolean logic
5. **Apply specifications consistently**: use them in domain validation, in query filters (translating specs to database predicates via expression trees), and in UI to drive conditional visibility, ensuring the rule is defined once and used everywhere

<details><summary>中文步骤</summary>

1. 识别在代码库中重复或混入查询逻辑和UI验证的业务规则——这些是提取为显式Specification对象的候选
2. 定义带有单一IsSatisfiedBy(entity)方法（或用于数据库可推送规格的表达式属性）的Specification接口，封装一个内聚的业务规则
3. 为每个原子规则实现具体规格：PremiumCustomerSpec、ActiveAccountSpec、EligibleForDiscountSpec——每个类编码一个命名良好的业务概念
4. 在Specification基类上实现组合运算符：And()、Or()、Not()——使复杂规则可以表达为new PremiumCustomerSpec().And(new ActiveAccountSpec())，而非内联布尔逻辑
5. 一致地应用规格：在领域验证、查询过滤器（通过表达式树将规格转换为数据库谓词）和UI中使用它们来驱动条件可见性，确保规则定义一次随处使用

</details>

## Do

- Do give each specification a meaningful domain name that a business stakeholder would recognize — PremiumCustomerSpecification is better than CustomerTypeEqualsThreeSpecification
- Do implement specifications as expression trees (not just in-memory predicates) when they need to be applied as database query filters — in-memory-only specs that must load all records to filter are a performance anti-pattern
- Do compose specifications using And/Or/Not operators rather than creating new mega-specifications that duplicate the logic of existing specs — composition is the primary value of the pattern
- Do test specifications in isolation with unit tests covering both the positive case (entities that satisfy the spec) and negative cases (entities that don't), including edge cases at boundary conditions

## Don't

- Don't put business logic inside specifications beyond the single rule they represent — a specification that checks 5 unrelated conditions is a rule engine, not a specification, and should be decomposed
- Don't use specifications for infrastructure concerns (is the database available? is the cache warm?) — specifications are for domain business rules about domain entities, not for infrastructure state checks
- Don't make specifications depend on external services, repositories, or I/O — a specification that calls a database or API to evaluate its predicate cannot be composed efficiently and makes testing require mocking infrastructure
- Don't over-apply the pattern to every boolean check in the codebase — simple one-off predicates that are used in exactly one place don't benefit from being extracted into a named specification class

## Case Study

**Ardalis / Microsoft**: Steve Smith (Ardalis), a Microsoft MVP, developed and open-sourced the Ardalis.Specification library for .NET after working on large enterprise applications where business eligibility rules were scattered as anonymous LINQ predicates across hundreds of repository methods. In one insurance application case study, the rule 'a policy is eligible for renewal' was duplicated in 14 places across the codebase — repository queries, domain services, API controllers, and Blazor component visibility conditions — with subtle variations in 3 of those locations. After extracting it into a single PolicyEligibleForRenewalSpec with expression tree support, the team eliminated all duplicates. When the business changed the eligibility criteria (adding a payment status check), the change was made in one file and propagated automatically to all 14 usage sites with zero regressions.

## Related Frameworks

- domain-driven-design (complement)
- solid-principles (related)
- repository-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/specification-pattern
