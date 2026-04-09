# Repository Pattern / 仓储模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Martin Fowler, 2002
- **Adopters**: Spring Data (Java), Entity Framework Core (.NET), Laravel Eloquent (PHP), TypeORM / MikroORM (Node.js)

Mediate between domain model and data mapping layers using a collection-like interface

_使用类集合接口在领域模型与数据映射层之间进行中介，解耦业务逻辑与数据访问_

## When to Use

Apply this framework when:
- Domain logic must be unit-tested without a real database, requiring an abstraction over persistence
- The application may need to switch storage backends (SQL to NoSQL, or file to cloud) without changing domain code
- Centralizing query logic prevents the same complex query from being duplicated across multiple services or controllers

## When NOT to Use

Stop and reconsider if:
- Simple CRUD applications with no domain logic where an Active Record pattern or direct ORM calls are simpler and equally testable
- Read-heavy reporting scenarios where complex JOIN queries benefit from direct SQL or a dedicated CQRS read model rather than repository abstractions
- Microservices that own a single table with trivial access patterns where the repository indirection adds no value

## Core Concepts

- Collection semantics: the repository presents domain objects as if they live in an in-memory collection; callers add, remove, and query without knowing the underlying store
- Domain language interface: method names reflect the ubiquitous language of the domain (findActiveCustomers, not SELECT * FROM customers WHERE active=1)
- Persistence ignorance: domain objects and application services are unaware of the database schema, ORM, or storage technology — only the concrete repository implementation knows

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Repository Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define the repository interface in the domain layer: express data-access needs as domain-language methods (findById, findByEmail, save, remove) without any persistence technology details
2. **Implement a concrete repository**: create an infrastructure-layer class that satisfies the interface using an ORM, query builder, or raw SQL, translating between domain objects and persistence records
3. Use the repository in application services: inject the repository interface into use cases or application services; never let domain logic call persistence APIs directly
4. **Add a Unit of Work if needed**: coordinate multiple repositories under a single transaction boundary so that all domain changes within a use case commit or roll back atomically
5. **Test with in-memory fakes**: implement a lightweight in-memory version of the repository interface for unit tests, exercising domain logic without database dependencies

<details><summary>中文步骤</summary>

1. 在领域层定义仓储接口：用领域语言方法（findById、findByEmail、save、remove）表达数据访问需求，不涉及任何持久化技术细节
2. 实现具体仓储：创建基础设施层类，使用 ORM、查询构建器或原始 SQL 满足接口，在领域对象和持久化记录之间进行转换
3. 在应用服务中使用仓储：将仓储接口注入用例或应用服务；永远不让领域逻辑直接调用持久化 API
4. 如需要则添加工作单元：在单一事务边界下协调多个仓储，使一个用例内的所有领域更改原子性地提交或回滚
5. 使用内存仿冒对象进行测试：为仓储接口实现轻量级内存版本，在不依赖数据库的情况下测试领域逻辑

</details>

## Do

- Do define repository interfaces in the domain layer and implementations in the infrastructure layer to enforce the dependency rule
- Do use repositories per Aggregate root only — querying across aggregate boundaries should go through a dedicated query service or read model
- Do provide in-memory repository fakes alongside production implementations so teams can write fast, database-free unit tests

## Don't

- Don't expose IQueryable or database-specific query builders through the repository interface — it leaks the persistence abstraction into the domain
- Don't create one mega-repository for the entire application; scope each repository to its aggregate root to keep responsibilities focused
- Don't bypass the repository by directly calling an ORM or SQL from application services — it defeats the abstraction and couples domain logic to infrastructure

## Case Study

**Spring Data / Pivotal**: Spring Data's CrudRepository and JpaRepository interfaces are the most widely used Repository pattern implementation in the Java ecosystem. Developers declare an interface extending JpaRepository<Customer, Long>, annotate query methods with @Query or follow naming conventions like findByEmailAndActiveTrue(), and Spring Data generates the full implementation at startup. This eliminates thousands of lines of JDBC/JPA boilerplate, while the interface boundary allows teams to swap Spring Data JPA for Spring Data MongoDB or an in-memory fake without changing a single line of service code.

## Related Frameworks

- unit-of-work-pattern (complement)
- data-mapper-pattern (complement)
- dependency-injection (complement)
- active-record-pattern (alternative)

## Source

https://sdframe.caldis.me/frameworks/repository-pattern
