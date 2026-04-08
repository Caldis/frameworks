# Backpressure Pattern / 背压模式

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: reliability, performance
- **Abstraction**: component
- **Maturity**: established
- **Author**: Concept from networking (TCP flow control); formalized in Reactive Streams (2013-2015), 1988
- **Adopters**: Netflix (RxJava), Akka Streams (Lightbend), Project Reactor (Spring), Apache Flink, Apache Kafka (consumer fetch)

Flow control mechanism where downstream consumers signal upstream producers to slow down

_下游消费者向上游生产者发出减速信号的流量控制机制_

## When to Use

Apply this framework when:
- When a fast producer overwhelms a slow consumer, causing memory exhaustion or cascading failures in the pipeline
- When building real-time streaming data pipelines where data loss is unacceptable but throughput varies unpredictably
- When microservices have asymmetric processing speeds and unbounded message queues risk out-of-memory crashes
- When designing async event-driven systems where the event rate can spike during peak traffic periods

## When NOT to Use

Stop and reconsider if:
- Fire-and-forget telemetry where dropping some data points is preferable to slowing the producer
- Simple request-response APIs where synchronous blocking naturally throttles the caller
- Batch processing systems where the entire dataset is known in advance and can be partitioned statically

## Core Concepts

- Demand signaling: Consumers explicitly request a specific number of items they can handle, preventing producers from pushing more than the consumer can process
- Bounded buffers: Fixed-size queues that block or reject producers when full, converting memory pressure into temporal backpressure
- End-to-end propagation: Backpressure must flow from the slowest stage all the way back to the original source; a single unbounded buffer breaks the chain
- Overflow policies: Strategies for when backpressure is insufficient — drop-head, drop-tail, sample, buffer-to-disk, or reject with HTTP 429/503
- Reactive Streams protocol: A standard (adopted as java.util.concurrent.Flow in JDK 9) defining Publisher, Subscriber, Subscription, and Processor interfaces with non-blocking demand signaling

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Backpressure Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify the bottleneck**: profile the pipeline to find where the slowest consumer or resource constraint creates a mismatch between production and consumption rates
2. **Instrument buffer occupancy**: add metrics to every queue, channel, and buffer in the pipeline to observe fill levels and detect when capacity is approaching limits
3. **Implement the signaling mechanism**: choose between reactive pull-based demand (Reactive Streams), TCP window-based flow control, credit-based systems, or explicit NACK/pause signals
4. **Propagate backpressure end-to-end**: ensure every stage in the pipeline forwards pressure upstream rather than absorbing it locally with unbounded buffers
5. **Define overflow strategies**: decide what happens when backpressure fails to prevent overload — drop newest, drop oldest, sample, or reject with an error to the caller

<details><summary>中文步骤</summary>

1. 识别瓶颈：对管道进行性能分析，找到最慢的消费者或资源约束导致生产与消费速率不匹配的位置
2. 监测缓冲区占用：为管道中每个队列、通道和缓冲区添加指标，观察填充水平并检测何时接近容量限制
3. 实现信号机制：选择响应式拉取需求（Reactive Streams）、TCP窗口流控、基于信用的系统或显式NACK/暂停信号
4. 端到端传播背压：确保管道中每个阶段都将压力向上游传递，而非用无界缓冲区在本地吸收
5. 定义溢出策略：决定背压无法阻止过载时的处理方式——丢弃最新、丢弃最旧、采样或向调用者返回错误

</details>

## Do

- Do propagate backpressure end-to-end through every stage because a single unbounded buffer creates a hidden failure point
- Do monitor buffer fill ratios as leading indicators because they reveal impending overload before out-of-memory errors occur
- Do choose overflow strategies explicitly for each pipeline stage because the right policy depends on whether data loss is acceptable
- Do test backpressure behavior under peak load conditions because backpressure bugs only manifest when the system is under stress

## Don't

- Don't use unbounded queues as a substitute for backpressure because they merely convert a throughput problem into a memory problem
- Don't drop data silently without metrics because undetected data loss undermines system correctness and erodes operator trust
- Don't apply backpressure only at the network edge because internal bottlenecks need their own flow control too
- Don't conflate backpressure with rate limiting because backpressure is adaptive and demand-driven while rate limiting is a fixed policy

## Case Study

**Netflix**: Netflix's streaming platform uses RxJava and Project Reactor extensively, both of which implement Reactive Streams backpressure. When Netflix's personalization service generates recommendation updates, downstream services (like the row-sorting service) can vary in processing capacity by 10x depending on the device type being served. Without backpressure, the recommendation engine would flood slower consumers, causing cascading timeouts. By implementing pull-based demand signaling, each consumer requests only what it can handle, and the recommendation engine automatically adjusts its emission rate. This pattern reduced out-of-memory incidents in the recommendation pipeline by over 90%.

## Related Frameworks

- circuit-breaker-pattern (complement)
- bulkhead-pattern (complement)
- reactive-extensions (complement)

## Source

https://sdframe.caldis.me/frameworks/backpressure-pattern
