# Outbox Pattern / 发件箱模式

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Chris Richardson (microservices.io); popularized by Udi Dahan and Greg Young in CQRS/event sourcing contexts, 2010
- **Adopters**: Uber, Netflix, Shopify, Red Hat (Debezium), Eventuate.io

Reliable event publishing from database transactions

_从数据库事务中可靠地发布事件_

## When to Use

Apply this framework when:
- When a microservice must atomically update its database and publish a domain event without using distributed transactions, preventing the dual-write problem
- When message broker publish failures (network partition, broker unavailability) must not cause data inconsistencies between the service database and the event log
- When event-driven architectures require guaranteed at-least-once event delivery even if the publishing service crashes immediately after committing a transaction
- When implementing the Saga pattern where each saga step must reliably publish the event that triggers the next step in the compensating transaction chain

## When NOT to Use

Stop and reconsider if:
- When the message broker and database can participate in an XA distributed transaction and the operational overhead of XA is acceptable
- Simple single-service applications without downstream event consumers where the overhead of maintaining an outbox table is unnecessary
- When event loss is acceptable (fire-and-forget telemetry, non-critical notifications) and the complexity of the outbox pattern is not justified by the reliability requirement
- Greenfield services where an event streaming architecture with event sourcing (Kafka as the system of record) eliminates the dual-write problem entirely at the architecture level

## Core Concepts

- Dual-write problem: the impossibility of atomically updating a database and publishing to a message broker in two separate operations — one will succeed and the other can fail, creating inconsistency
- Transactional outbox: a staging table within the same database that acts as a durable event queue, allowing a single database transaction to atomically commit both the business state and the event record
- Message relay: a background process that polls or tails the outbox table and publishes events to the broker, decoupling the business transaction from the publish operation
- At-least-once delivery: the guarantee that every event in the outbox will eventually be published to the broker, potentially more than once; consumers must handle duplicates

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Outbox Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Add an outbox table to the service's database schema alongside the primary business entities; the table stores pending domain events with columns for event type, payload, destination topic, and publication status
2. Modify the service's transactional write path to insert domain events into the outbox table within the same database transaction as the business entity mutation, guaranteeing atomicity between state change and event recording
3. Deploy a message relay process (Debezium CDC connector, polling relay, or Transactional Outbox relay) that reads unpublished events from the outbox table and publishes them to the message broker (Kafka, SQS, RabbitMQ)
4. Mark events as published after successful broker acknowledgment; implement at-least-once delivery semantics since the relay may publish an event, crash before marking it, and republish on restart
5. Consumers must be idempotent to handle duplicate events produced by the at-least-once relay; use deduplication keys or idempotent operations to ensure duplicate publications have no additional effect

<details><summary>中文步骤</summary>

1. 在服务的数据库模式中，在主要业务实体旁边添加发件箱表；该表存储待处理的领域事件，包含事件类型、负载、目标主题和发布状态的列
2. 修改服务的事务写入路径，在与业务实体变更相同的数据库事务中将领域事件插入发件箱表，保证状态变更和事件记录之间的原子性
3. 部署消息中继进程（Debezium CDC连接器、轮询中继或事务性发件箱中继），从发件箱表读取未发布的事件并将其发布到消息代理（Kafka、SQS、RabbitMQ）
4. 成功获得代理确认后将事件标记为已发布；实施至少一次交付语义，因为中继可能发布事件、在标记前崩溃，并在重启时重新发布
5. 消费者必须是幂等的以处理至少一次中继产生的重复事件；使用去重键或幂等操作确保重复发布没有额外影响

</details>

## Do

- Do use CDC-based outbox relay (Debezium) rather than polling where possible because CDC has lower database load and sub-second relay latency compared to polling intervals of seconds or minutes
- Do include a correlation ID in every outbox event so that distributed traces can be reconstructed across service boundaries from the originating request to the eventual event consumer
- Do partition the outbox table by service or aggregate type to prevent a high-volume event stream from a single aggregate from blocking events of other types
- Do set a maximum event age and alert when events remain unpublished beyond it because stuck events in the outbox indicate a relay failure that may cause business-critical delays

## Don't

- Don't use the outbox as a long-term event store because it is a short-lived staging area — events should be published within seconds and the outbox should be trimmed regularly
- Don't skip consumer idempotency because at-least-once delivery is a fundamental outbox guarantee and consumers that process duplicates non-idempotently will produce incorrect results
- Don't implement the outbox in a separate database from the business entity because the entire point of the pattern is to use a single database transaction to atomically write both
- Don't forget to monitor outbox table growth because an accumulating backlog indicates a relay outage or broker connectivity issue that requires immediate attention

## Case Study

**Uber**: Uber uses the Outbox Pattern across many of its microservices to ensure reliable event publishing without distributed transactions. In their trip dispatch service, when a driver accepts a trip, the service atomically updates the trip state in its PostgreSQL database and inserts a TripAccepted domain event into the outbox table in the same transaction. A Debezium CDC relay reads the outbox events from the PostgreSQL WAL and publishes them to Apache Kafka topics consumed by the rider notification service, pricing engine, and analytics pipeline. This design ensures that a TripAccepted event is always published exactly once — even if the trip service crashes between committing the trip state and publishing the event — eliminating ghost trips and missed notifications.

## Related Frameworks

- change-data-capture (complement)
- saga-pattern (complement)
- idempotency-pattern (complement)
- crdt (related)

## Source

https://sdframe.caldis.me/frameworks/outbox-pattern
