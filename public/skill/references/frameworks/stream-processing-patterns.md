# Stream Processing Patterns / 流处理模式

- **Category**: data
- **Complexity**: advanced
- **Quality**: performance, scalability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Jay Kreps / Martin Kleppmann, 2014-2017, 2011
- **Adopters**: Uber, Alibaba, Netflix, Spotify, ING Bank

Patterns for continuous data stream windowing, joining, and semantics

_连续数据流窗口化、连接和语义保证的处理模式_

## When to Use

Apply this framework when:
- When building real-time analytics, monitoring, or alerting systems on continuous data feeds
- When event-time processing is critical and events arrive out of order or with variable delay
- When joining multiple data streams or enriching streams with reference data in real-time
- When exactly-once processing semantics are required for financial, billing, or compliance workloads

## When NOT to Use

Stop and reconsider if:
- When batch processing with hourly or daily granularity meets your latency requirements
- When data volumes are low enough that a simple poll-and-process loop is sufficient
- When your team lacks expertise in distributed stream processing and the learning curve is too steep
- When the data source does not provide event timestamps and event-time semantics cannot be established

## Core Concepts

- Windowing: grouping unbounded streams into finite chunks (tumbling, sliding, session windows) for aggregation and analysis
- Event time vs processing time: distinguishing when an event actually occurred from when it was processed, using watermarks to track progress
- Exactly-once semantics: ensuring each event is processed precisely once despite failures, through checkpointing, idempotent sinks, and transactional writes
- Stream joins: combining two or more streams based on keys and time constraints, including stream-stream windowed joins and stream-table enrichment joins

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Stream Processing Patterns to?
- What constraints or existing architecture do you need to work within?
- Has your team used Stream Processing Patterns before? (This is an advanced framework)

## Implementation Steps

1. Define windowing strategies (tumbling, sliding, session, or global) based on the temporal semantics your analytics require
2. Implement stream joins by choosing the correct join type (stream-stream, stream-table, or table-table) and configuring appropriate time bounds and key partitioning
3. Configure exactly-once processing semantics through idempotent writes, transactional producers, or framework-level guarantees like Flink checkpoints
4. Handle late-arriving and out-of-order events using watermarks, allowed lateness thresholds, and side outputs for dropped events
5. Operationalize the pipeline with backpressure handling, state management, checkpoint tuning, and consumer lag monitoring

<details><summary>中文步骤</summary>

1. 根据分析所需的时间语义定义窗口策略（滚动、滑动、会话或全局窗口）
2. 通过选择正确的连接类型（流-流、流-表或表-表）并配置适当的时间边界和键分区来实现流连接
3. 通过幂等写入、事务生产者或框架级保证（如Flink检查点）配置精确一次处理语义
4. 使用水印、允许延迟阈值和旁路输出处理迟到和乱序事件
5. 通过背压处理、状态管理、检查点调优和消费者滞后监控使管道运维化

</details>

## Do

- Do choose event-time semantics over processing-time when correctness matters because processing-time windows produce non-deterministic results
- Do set watermarks and allowed lateness thresholds based on empirical analysis of your data's delay characteristics
- Do design for idempotent sinks because even with exactly-once frameworks, sink-level idempotency provides defense in depth
- Do test stream processing logic with both in-order and out-of-order event sequences because edge cases dominate production failures

## Don't

- Don't use processing-time windows for business metrics because clock skew and variable latency produce incorrect aggregates
- Don't ignore state size growth in windowed aggregations because unbounded state leads to out-of-memory failures
- Don't assume exactly-once means zero duplicates end-to-end because the guarantee applies only within the processing framework boundaries
- Don't skip backpressure configuration because uncontrolled producers will overwhelm slow consumers

## Case Study

**Uber**: Uber built its real-time surge pricing and ETA computation on Apache Flink stream processing patterns. Using event-time windows and stream-table joins, Uber processes millions of trip events per second to compute supply-demand ratios per geofence. Exactly-once semantics ensure pricing accuracy, while watermark-based late event handling prevents stale data from corrupting surge multipliers.

## Related Frameworks

- kappa-architecture (complement)
- lambda-architecture (complement)
- eda (complement)
- change-data-capture (complement)

## Source

https://sdframe.caldis.me/frameworks/stream-processing-patterns
