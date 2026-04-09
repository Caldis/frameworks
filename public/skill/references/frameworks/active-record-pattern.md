# Active Record Pattern / 活动记录模式

- **Category**: coding
- **Complexity**: beginner
- **Quality**: usability, maintainability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Martin Fowler, 2002
- **Adopters**: Ruby on Rails, Laravel (Eloquent), Django ORM, Castle ActiveRecord, Sequelize

Domain object that wraps a database row and encapsulates CRUD logic within itself

_将数据库行封装并在对象内部实现 CRUD 逻辑的领域对象模式_

## When to Use

Apply this framework when:
- Building CRUD-heavy applications where domain logic is thin and closely mirrors the database schema
- Rapid prototyping or small-to-medium web applications where development speed outweighs architectural purity
- Teams that want a single cohesive object to serve as both domain model and persistence layer without a separate repository layer
- Applications using convention-over-configuration frameworks such as Rails or Laravel where Active Record is the idiomatic approach

## When NOT to Use

Stop and reconsider if:
- Complex domains with deep business rules that do not align cleanly with a single table — Data Mapper with a dedicated domain layer is more appropriate
- Microservices or shared libraries where exposing database-coupled objects across service boundaries introduces unwanted coupling
- Applications requiring multiple persistence backends (e.g., storing parts of an entity in a document store and a relational DB simultaneously)
- Highly concurrent write-heavy systems where fine-grained transaction control and optimistic locking need explicit, visible management

## Core Concepts

- Table-per-class mapping: each Active Record class maps directly to one database table with no intermediate mapping layer
- Self-contained persistence: the domain object owns its own SQL or query-builder calls, eliminating the need for a separate DAO or repository class
- Lifecycle callbacks: hooks executed automatically at create, update, and delete events allow cross-cutting concerns like validation and auditing to live on the model
- Finder methods: class-level query methods return pre-hydrated objects, encapsulating SQL behind a domain-friendly API
- Convention over configuration: naming conventions (plural table name, id primary key) eliminate boilerplate mapping configuration

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Active Record Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Map a class to a database table**: each class property corresponds to a column, and each instance represents exactly one row in that table
2. **Embed persistence methods on the object**: implement save(), find(), update(), and delete() directly on the domain class so callers never touch SQL directly
3. **Use class-level finders for queries**: expose static or class methods like User.findByEmail() that translate to SQL SELECT and return hydrated objects
4. **Leverage lifecycle callbacks**: hook before_save, after_create, and similar callbacks on the class to enforce validation, timestamps, and side-effects
5. **Migrate schema changes alongside code**: keep database migrations versioned next to the model files so schema and behaviour evolve together

<details><summary>中文步骤</summary>

1. 将类映射到数据库表：每个类属性对应一列，每个实例代表该表中的一行
2. 在对象上内嵌持久化方法：直接在领域类上实现 save()、find()、update() 和 delete()，调用方无需直接接触 SQL
3. 使用类级别查询方法：暴露 User.findByEmail() 等静态或类方法，将其转换为 SQL SELECT 并返回填充好的对象
4. 利用生命周期回调：在类上挂载 before_save、after_create 等回调，以强制验证、时间戳和副作用
5. 随代码一起迁移模式变更：将数据库迁移文件版本化并置于模型文件旁，使模式与行为同步演进

</details>

## Do

- Do use Active Record for straightforward CRUD where the domain model closely reflects the table structure
- Do leverage lifecycle callbacks for validation and automatic timestamp management rather than duplicating logic in service layers
- Do rely on framework-provided migration tooling to keep schema and model in sync across environments
- Do add scopes or named query methods to encapsulate common filters instead of scattering raw queries across the codebase

## Don't

- Don't use Active Record for complex domains with rich business rules — the coupling between persistence and behaviour becomes a maintenance burden
- Don't write business logic inside lifecycle callbacks because it becomes invisible to callers and hard to test in isolation
- Don't share Active Record objects across service boundaries as DTOs because it leaks persistence details and schema changes cascade unexpectedly
- Don't let models accumulate hundreds of methods — extract service objects or use Data Mapper when a model grows beyond a single responsibility

## Case Study

**Shopify**: Shopify's core monolith is built on Ruby on Rails and uses ActiveRecord throughout. Each core entity — Order, Product, Customer, Variant — is an Active Record model mapped directly to a database table. This allowed Shopify to move extremely fast in its early years, shipping new merchant features weekly. As the platform scaled to millions of merchants, the team learned to discipline Active Record usage: models were forbidden from calling other models' persistence methods directly, and background jobs were kept out of callbacks. These constraints preserved the productivity benefits while avoiding the worst coupling pitfalls of naive Active Record usage.

## Related Frameworks

- repository-pattern (alternative)
- data-mapper-pattern (alternative)
- data-transfer-object (complement)

## Source

https://sdframe.caldis.me/frameworks/active-record-pattern
