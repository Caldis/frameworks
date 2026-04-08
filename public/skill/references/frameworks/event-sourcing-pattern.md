# Event Sourcing Pattern / 事件溯源模式

- **Category**: coding
- **Complexity**: advanced
- **Quality**: reliability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Greg Young, 2005
- **Adopters**: LMAX Exchange, Walmart, Capital One, Jet.com, EventStore Ltd

Persist state as an immutable append-only sequence of events

_将状态持久化为不可变的追加事件序列而非当前快照_

## When to Use

Apply this framework when:
- Systems requiring a complete audit trail of every state change for compliance or debugging
- Financial systems where transaction history must be immutable and reconstructable
- Domains with complex temporal queries (what was the state at time T?)
- Event-driven architectures where derived read models need to be rebuilt from source events

## When NOT to Use

Stop and reconsider if:
- Simple CRUD applications where current state is the only concern
- Systems with very high write volumes where event storage costs become prohibitive
- Teams without experience in event-driven architecture who would struggle with eventual consistency
- Domains where regulatory requirements mandate data deletion (right to be forgotten) incompatible with immutable logs

## Core Concepts

- Event Store: an append-only log that persists domain events in order, serving as the single source of truth
- Event Replay: reconstructing an entity's current state by sequentially applying all its past events
- Projections: read-optimized materialized views built by processing the event stream into query-friendly data structures
- Snapshotting: periodically persisting the current aggregate state to optimize replay performance for long event streams
- Temporal Queries: the ability to reconstruct the state of the system at any point in time by replaying events up to that moment

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Event Sourcing Pattern to?
- What constraints or existing architecture do you need to work within?
- Has your team used Event Sourcing Pattern before? (This is an advanced framework)

## Implementation Steps

1. **Model domain events**: define immutable event types that capture every meaningful state change (OrderPlaced, ItemShipped, PaymentReceived)
2. **Build the event store**: implement an append-only log (EventStoreDB, Kafka, or custom) that stores events with sequence numbers and metadata
3. **Reconstruct state by replay**: load an entity's current state by replaying its event stream from the beginning or from a snapshot
4. **Create projections**: build read-optimized views by subscribing to the event stream and materializing data into query-friendly shapes
5. **Implement snapshotting**: periodically save aggregate state snapshots to avoid replaying the full event history for long-lived entities

<details><summary>中文步骤</summary>

1. 建模领域事件：定义不可变的事件类型，捕获每个有意义的状态变更（订单创建、物品发货、收款完成）
2. 构建事件存储：实现追加式日志（EventStoreDB、Kafka或自定义），存储带序列号和元数据的事件
3. 通过回放重建状态：从头或从快照开始回放实体的事件流以加载其当前状态
4. 创建投影：通过订阅事件流并将数据物化为查询友好的形态来构建读优化视图
5. 实现快照：定期保存聚合状态快照，避免对长期存活的实体回放完整事件历史

</details>

## Do

- Do design events as immutable facts about what happened because they are the source of truth
- Do version your event schemas because event structure will evolve and old events must remain readable
- Do implement snapshotting for aggregates with long histories because replay performance degrades linearly
- Do separate write and read models because event-sourced writes are append-only and reads need materialized views

## Don't

- Don't delete or modify events because immutability is the foundational guarantee of event sourcing
- Don't use event sourcing for simple CRUD domains because the complexity overhead is not justified
- Don't forget to handle event schema evolution because breaking changes to events can corrupt the entire stream
- Don't build a single monolithic projection because different read concerns need different optimized views

## Case Study

**LMAX Exchange**: LMAX Exchange, a high-frequency trading platform, built its entire trading engine on event sourcing. Every order, trade, and market movement is captured as an immutable event. The system can replay the full trading day in minutes for audit purposes, and the event-sourced architecture enables LMAX to process over 6 million transactions per second with consistent latency under 1 millisecond.

## Related Frameworks

- cqrs-pattern (complement)
- eda (complement)
- ddd-tactical-patterns (complement)
- domain-driven-design (prerequisite)

## Source

https://sdframe.caldis.me/frameworks/event-sourcing-pattern
