# CQRS Pattern / 命令查询职责分离模式

- **Category**: architecture
- **Complexity**: advanced
- **Quality**: performance, scalability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Greg Young, 2010, 1988
- **Adopters**: Microsoft, Axon, EventStore, Walmart, Booking.com

Separate read/write models for optimized scalability

_分离读写模型以实现优化的可扩展性_

## When to Use

Apply this framework when:
- When read and write workloads have vastly different scaling requirements
- When complex domain logic on the write side doesn't align with the data shapes needed for queries
- When you need highly optimized read models for dashboards, reports, or search-heavy features
- When combined with Event Sourcing to build audit trails and temporal queries

## When NOT to Use

Stop and reconsider if:
- Simple CRUD applications where read and write models are nearly identical
- Small-scale systems where the operational overhead of maintaining two models exceeds the benefits
- Domains where strong real-time consistency between reads and writes is a hard requirement

## Core Concepts

- Command model: Write-optimized model focused on enforcing business rules and maintaining invariants
- Query model: Read-optimized projections denormalized for specific UI or API consumption patterns
- Eventual consistency: Read models are asynchronously updated and may lag behind the write model
- Event propagation: Domain events bridge the write and read sides, serving as the synchronization mechanism
- Task-based UI: User interfaces designed around commands (actions) rather than CRUD operations

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying CQRS Pattern to?
- What constraints or existing architecture do you need to work within?
- Has your team used CQRS Pattern before? (This is an advanced framework)

## Implementation Steps

1. Identify domains where read and write workloads have fundamentally different performance, scaling, or consistency requirements
2. **Design the Command model**: create a write-optimized domain model that enforces invariants and emits domain events on state changes
3. **Design the Query model**: build read-optimized projections (denormalized views, materialized tables) tailored to specific query patterns
4. **Connect models via events**: use domain events or a message bus to asynchronously update read projections when the write model changes
5. **Handle eventual consistency**: implement strategies for stale-read tolerance in the UI, version stamps, and read-your-own-writes where needed

<details><summary>中文步骤</summary>

1. 识别读写负载在性能、扩展或一致性需求上有本质差异的领域
2. 设计命令模型：创建写优化的领域模型，强制执行不变式并在状态变更时发出领域事件
3. 设计查询模型：构建针对特定查询模式优化的读视图（非规范化视图、物化表）
4. 通过事件连接模型：使用领域事件或消息总线在写模型变更时异步更新读投影
5. 处理最终一致性：为UI中的陈旧读取容忍度、版本戳和必要时的读己之写实现策略

</details>

## Do

- Do start with a single database and logical separation before introducing physical read/write stores because premature splitting adds complexity
- Do design read models for specific use cases because one-size-fits-all projections defeat the purpose of CQRS
- Do implement idempotent event handlers because events may be delivered more than once
- Do combine with Event Sourcing when you need a complete audit trail and temporal query capabilities

## Don't

- Don't apply CQRS to every bounded context because most CRUD-heavy modules don't benefit from the added complexity
- Don't ignore eventual consistency in the UI because users will be confused if they write data and don't see it immediately
- Don't build synchronous projections because it couples the write and read paths, negating CQRS benefits
- Don't skip monitoring the projection lag because undetected delays can cause significant user experience issues

## Case Study

**Microsoft Azure DevOps**: Microsoft applied CQRS in Azure DevOps (formerly VSTS) to handle the extreme asymmetry between read and write workloads in work item tracking. The write model enforces complex workflow rules and permissions, while multiple denormalized read models serve dashboards, queries, and reports. This separation allowed the read side to scale independently to handle millions of queries per minute during peak usage without impacting the consistency guarantees of the write path.

## Related Frameworks

- event-sourcing-pattern (complement)
- eda (prerequisite)
- domain-driven-design (prerequisite)
- saga-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/cqrs-pattern
