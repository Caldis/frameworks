# Change Data Capture (CDC) / 变更数据捕获

- **Category**: data
- **Complexity**: intermediate
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Database community / Popularized by Debezium (Red Hat), 2015, 2012
- **Adopters**: Shopify, Airbnb, Zalando, WePay, Convoy

Track database changes as real-time event streams for downstream

_将数据库变更作为实时事件流捕获并传递给下游系统_

## When to Use

Apply this framework when:
- When microservices need to keep local read models synchronized with a source database without tight coupling
- When replacing batch ETL with real-time data replication to a data warehouse or data lake
- When building event-driven architectures that react to database state changes as they happen
- When search indices, caches, or materialized views must stay in near-real-time sync with the primary datastore

## When NOT to Use

Stop and reconsider if:
- When the source database does not expose a transaction log or the log format is proprietary and unsupported
- When data freshness requirements are measured in hours or days and batch ETL is simpler and sufficient
- When the target system can directly query the source database without needing a separate copy
- When compliance rules prohibit reading database transaction logs due to sensitive data exposure concerns

## Core Concepts

- Log-based capture: reading the database's write-ahead log or binary log to detect changes without modifying the application or adding triggers
- Event ordering: preserving the exact transaction order so downstream systems can replay changes and maintain consistency
- Schema evolution: handling source schema changes gracefully so downstream consumers are not broken by column additions or type changes
- Snapshot plus streaming: performing an initial full snapshot of existing data, then switching to streaming incremental changes going forward

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Change Data Capture (CDC) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Configure a CDC connector (e.g., Debezium) to read the database's transaction log (WAL, binlog, or oplog) without impacting production query performance
2. Publish change events to a durable message broker like Apache Kafka, preserving the original transaction order and including before/after snapshots of each row
3. Transform and enrich change events in a stream processing layer to match downstream consumer schemas and business rules
4. Route transformed events to target systems: data warehouses, search indices, caches, or other microservices that need synchronized data
5. Monitor CDC pipeline health including replication lag, schema drift detection, and connector failure alerting to ensure data consistency

<details><summary>中文步骤</summary>

1. 配置CDC连接器（如Debezium）读取数据库事务日志（WAL、binlog或oplog），不影响生产查询性能
2. 将变更事件发布到持久消息代理（如Apache Kafka），保留原始事务顺序并包含每行的变更前后快照
3. 在流处理层转换和丰富变更事件，以匹配下游消费者的模式和业务规则
4. 将转换后的事件路由到目标系统：数据仓库、搜索索引、缓存或需要同步数据的其他微服务
5. 监控CDC管道健康状况，包括复制延迟、模式漂移检测和连接器故障告警，确保数据一致性

</details>

## Do

- Do use log-based CDC over trigger-based or polling approaches because log reading has minimal impact on source database performance
- Do handle schema evolution by using a schema registry and backward-compatible serialization formats like Avro
- Do monitor replication lag between the source database and downstream consumers because growing lag indicates pipeline issues
- Do plan for initial snapshot strategy because CDC connectors need to bootstrap existing data before streaming incremental changes

## Don't

- Don't use trigger-based CDC in high-throughput OLTP systems because triggers add write latency to every transaction
- Don't ignore schema changes in the source database because unhandled schema drift will break downstream consumers
- Don't assume CDC guarantees exactly-once delivery because at-least-once is the default for most connectors and idempotency must be handled downstream
- Don't expose raw CDC events directly to business consumers because internal database schemas leak implementation details

## Case Study

**Shopify**: Shopify uses Debezium-based CDC to stream changes from its MySQL databases into Apache Kafka, enabling real-time synchronization of merchant data across its microservices architecture. This replaced brittle batch ETL jobs and reduced data propagation latency from hours to seconds, enabling features like real-time inventory updates and instant order status notifications for millions of merchants.

## Related Frameworks

- kappa-architecture (complement)
- stream-processing-patterns (complement)
- saga-pattern (complement)
- eda (complement)

## Source

https://sdframe.caldis.me/frameworks/change-data-capture
