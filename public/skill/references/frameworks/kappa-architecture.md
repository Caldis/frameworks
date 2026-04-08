# Kappa Architecture / Kappa 架构

- **Category**: data
- **Complexity**: advanced
- **Quality**: scalability, maintainability, performance
- **Abstraction**: system
- **Maturity**: established
- **Author**: Jay Kreps, 2014, 2011
- **Adopters**: LinkedIn, Confluent, Uber, The New York Times, Wix

Stream-first architecture eliminating the batch layer entirely

_以流为核心、完全消除批处理层的数据架构_

## When to Use

Apply this framework when:
- When your use case is primarily real-time and batch recomputation adds unnecessary complexity
- When you want a single processing codebase to reduce maintenance and eliminate semantic drift between layers
- When your event log can be retained long enough to enable full reprocessing when logic changes
- When your stream processing framework supports exactly-once semantics and stateful operations

## When NOT to Use

Stop and reconsider if:
- When log retention costs are prohibitive for the data volumes and retention periods required
- When complex analytical queries require full-dataset joins that are impractical in a streaming context
- When existing batch infrastructure is well-established and the team lacks streaming expertise
- When regulatory requirements mandate periodic full recomputation from source systems rather than log replay

## Core Concepts

- Immutable event log: all data enters as an append-only log that can be replayed from any point in time
- Single processing layer: one stream processing engine handles both real-time and historical reprocessing
- Log replay for reprocessing: when business logic changes, replay the event log through an updated processor instead of maintaining a separate batch system
- Materialized views: stream results are written into purpose-built serving stores optimized for specific query patterns

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Kappa Architecture to?
- What constraints or existing architecture do you need to work within?
- Has your team used Kappa Architecture before? (This is an advanced framework)

## Implementation Steps

1. Ingest all data as immutable events into a durable, replayable log such as Apache Kafka with configurable retention
2. Process all data through a single stream processing layer using frameworks like Apache Flink, Kafka Streams, or Apache Beam
3. Materialize stream processing results into serving stores (databases, caches, search indices) optimized for query patterns
4. When logic changes or reprocessing is needed, deploy a new version of the stream processor and replay the log from the desired offset
5. Retire the old materialized views once the new processor has caught up, achieving zero-downtime schema evolution

<details><summary>中文步骤</summary>

1. 将所有数据作为不可变事件摄入持久化、可重放的日志（如Apache Kafka），配置合适的保留策略
2. 通过单一流处理层使用Apache Flink、Kafka Streams或Apache Beam等框架处理所有数据
3. 将流处理结果物化到针对查询模式优化的服务存储（数据库、缓存、搜索索引）
4. 当逻辑变更或需要重处理时，部署新版本流处理器并从期望偏移量重放日志
5. 新处理器追上进度后淘汰旧的物化视图，实现零停机模式演进

</details>

## Do

- Do size your event log retention to cover the longest reprocessing window you anticipate because insufficient retention breaks the replay mechanism
- Do use a framework with exactly-once processing guarantees because at-least-once can produce incorrect materialized views
- Do version your stream processing jobs so old and new versions can run in parallel during migrations
- Do monitor consumer lag closely because growing lag indicates the stream processor cannot keep up with input volume

## Don't

- Don't assume infinite log retention is free because storage costs and compaction strategies must be planned
- Don't use Kappa when you genuinely need periodic full-dataset recomputation that exceeds your log retention window
- Don't neglect state management in stream processors because stateful operations require checkpointing and recovery
- Don't ignore backpressure signals because unhandled backpressure leads to cascading failures

## Case Study

**LinkedIn**: LinkedIn pioneered the Kappa Architecture pattern through its creation of Apache Kafka and its internal stream processing infrastructure. By replacing batch ETL pipelines with Kafka-based streaming, LinkedIn unified its activity tracking, metrics, and feed generation into a single real-time processing paradigm. This reduced infrastructure complexity by eliminating the dual batch-speed codebases and enabled sub-second data freshness for features like 'Who Viewed Your Profile'.

## Related Frameworks

- lambda-architecture (alternative)
- eda (complement)
- change-data-capture (complement)
- stream-processing-patterns (complement)

## Source

https://sdframe.caldis.me/frameworks/kappa-architecture
