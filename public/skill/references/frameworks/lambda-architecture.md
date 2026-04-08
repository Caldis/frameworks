# Lambda Architecture / Lambda 架构

- **Category**: data
- **Complexity**: advanced
- **Quality**: scalability, performance, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Nathan Marz, 2011
- **Adopters**: Twitter, LinkedIn, Yahoo, Netflix, Airbnb

Batch plus speed layers for scalable big data processing

_批处理加速度层的可扩展大数据处理架构_

## When to Use

Apply this framework when:
- When you need both comprehensive historical analytics and low-latency real-time results
- When data correctness requires periodic full recomputation to fix upstream errors
- When existing batch infrastructure must coexist with new real-time requirements
- When fault tolerance demands that real-time views can always be reconstructed from immutable raw data

## When NOT to Use

Stop and reconsider if:
- When the operational overhead of maintaining two processing systems is not justified by your scale
- When stream processing alone can provide both correctness and low latency for your use case
- When your team lacks the expertise to maintain synchronized batch and speed layer logic
- When data volumes are small enough that a simple database with incremental updates suffices

## Core Concepts

- Immutable master dataset: all data is stored in raw, append-only form as the single source of truth
- Batch layer: periodically reprocesses the entire dataset to produce accurate, comprehensive views
- Speed layer: processes only recent data in real-time to provide low-latency approximate views
- Serving layer: merges batch and speed layer outputs to answer queries with both completeness and freshness

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Lambda Architecture to?
- What constraints or existing architecture do you need to work within?
- Has your team used Lambda Architecture before? (This is an advanced framework)

## Implementation Steps

1. Ingest all raw data immutably into a master dataset that serves as the system's append-only source of truth
2. Build a batch layer that periodically recomputes comprehensive batch views from the entire master dataset using frameworks like Hadoop or Spark
3. Build a speed layer that processes only recent data in real-time using stream processors like Storm or Flink to compensate for batch layer latency
4. Merge batch views and real-time views at query time in a serving layer that exposes a unified interface to consumers
5. Continuously validate that speed layer results converge with batch layer results and that eventual consistency is maintained

<details><summary>中文步骤</summary>

1. 将所有原始数据不可变地摄入主数据集，作为系统的追加式真实数据源
2. 构建批处理层，使用Hadoop或Spark等框架定期从整个主数据集重新计算全量批视图
3. 构建速度层，使用Storm或Flink等流处理器仅实时处理最近数据，以弥补批处理层的延迟
4. 在服务层查询时合并批视图和实时视图，向消费者暴露统一接口
5. 持续验证速度层结果与批处理层结果的收敛性，确保最终一致性

</details>

## Do

- Do keep the master dataset immutable and append-only because it enables full recomputation and error correction
- Do design batch and speed layers to produce eventually consistent results because divergence erodes consumer trust
- Do automate batch view recomputation on a regular schedule because stale batch views negate the architecture's benefits
- Do monitor latency gaps between speed and batch layers because large gaps indicate system health issues

## Don't

- Don't maintain two completely different codebases for batch and speed logic because it doubles maintenance burden and introduces semantic drift
- Don't skip the serving layer merge logic because consumers should not need to understand the dual-layer internals
- Don't use Lambda when a single stream processing layer can meet your latency and correctness requirements
- Don't ignore the operational complexity of running two parallel processing systems

## Case Study

**Twitter**: Twitter used Lambda Architecture to power its real-time analytics and trending topics. The batch layer processed the full tweet history using Hadoop for accurate aggregate metrics, while the speed layer used Apache Storm to detect trending topics within seconds. This dual approach allowed Twitter to serve both precise historical dashboards and real-time trend detection at scale.

## Related Frameworks

- kappa-architecture (alternative)
- stream-processing-patterns (complement)
- cap-theorem (complement)

## Source

https://sdframe.caldis.me/frameworks/lambda-architecture
