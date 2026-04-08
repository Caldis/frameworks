# Unit of Work Pattern / 工作单元模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Martin Fowler, 2002
- **Adopters**: Entity Framework Core (.NET), Hibernate / JPA (Java), SQLAlchemy (Python), Doctrine ORM (PHP)

Track object changes during a business transaction and commit them as a single atomic batch

_在业务事务期间跟踪对象变更，并将其作为单一原子批次提交到数据库_

## When to Use

Apply this framework when:
- A single business operation modifies multiple domain objects or aggregates that must all succeed or fail together
- You need to batch database writes for performance, reducing round-trips from N individual inserts to one transaction
- Preventing partial updates that would leave the system in an inconsistent state if an error occurs mid-operation

## When NOT to Use

Stop and reconsider if:
- Event-sourced systems where the write model stores immutable events rather than mutable entity state, making change tracking irrelevant
- Read-only query services that never modify state and have no need for transaction coordination
- Simple single-entity operations where a single repository save within its own transaction is sufficient

## Core Concepts

- Change tracking: the UoW maintains three lists — new objects (to INSERT), dirty objects (to UPDATE), and removed objects (to DELETE) — populated as domain operations mutate state
- Identity map: a cache keyed by entity ID within the UoW scope ensures the same database row is loaded only once per transaction, preventing conflicting in-memory copies
- Atomic commit: all registered changes are flushed inside a single database transaction; if the transaction fails the UoW discards the identity map and change lists

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Unit of Work Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Open a Unit of Work**: begin a new UoW instance at the start of each business operation, representing a single logical transaction boundary
2. **Register changes**: as domain operations occur, register new, dirty (modified), and removed objects with the UoW rather than writing to the database immediately
3. **Coordinate repositories**: repositories created within the same UoW share its identity map and change tracker to ensure consistency across aggregate boundaries
4. **Commit atomically**: when the business operation completes successfully, call commit() to flush all changes in a single database transaction — insert new, update dirty, delete removed
5. **Roll back on failure**: if any step throws, call rollback() to discard all tracked changes and leave the database in its pre-operation state

<details><summary>中文步骤</summary>

1. 打开工作单元：在每个业务操作开始时创建一个新的 UoW 实例，代表单一的逻辑事务边界
2. 注册变更：随着领域操作的发生，将新建的、脏的（已修改的）和已删除的对象注册到 UoW，而非立即写入数据库
3. 协调仓储：在同一 UoW 内创建的仓储共享其身份映射和变更跟踪器，确保跨聚合边界的一致性
4. 原子提交：当业务操作成功完成时，调用 commit() 在单一数据库事务中刷新所有变更——插入新建、更新脏的、删除已删除的
5. 失败时回滚：如果任何步骤抛出异常，调用 rollback() 丢弃所有跟踪的变更，使数据库保持操作前的状态

</details>

## Do

- Do scope each Unit of Work to a single business request or use case — long-lived UoW sessions accumulate stale state and lock database rows unnecessarily
- Do let the application service control commit/rollback so that transaction boundaries align with business operation boundaries, not individual repository calls
- Do combine Unit of Work with the Repository pattern so repositories share the same UoW session and changes are flushed together

## Don't

- Don't use a single UoW for an entire user session or HTTP request that spans multiple unrelated business operations — this creates large, hard-to-debug transactions
- Don't call commit() multiple times within a single UoW; design the boundary so one business operation maps to one commit
- Don't expose the UoW directly to domain objects — domain logic should not know or care about transaction management

## Case Study

**Entity Framework / Microsoft**: Entity Framework Core's DbContext is the most widely used Unit of Work implementation in the .NET ecosystem. When an ASP.NET controller action updates a customer's address and creates an order in the same request, both operations are performed on in-memory entity objects tracked by a single DbContext. Only when SaveChanges() is called does EF Core analyze the change tracker, generate the minimal SQL (UPDATE + INSERT), and execute both statements inside a single transaction. If the INSERT fails, the entire transaction rolls back, leaving no partial state — exactly the atomicity guarantee Unit of Work provides.

## Related Frameworks

- repository-pattern (complement)
- data-mapper-pattern (complement)
- solid-principles (complement)

## Source

https://sdframe.caldis.me/frameworks/unit-of-work-pattern
