# Pipe and Filter Architecture / 管道与过滤器架构

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: maintainability, portability
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Doug McIlroy, 1964; formalized by Mary Shaw and David Garlan, 1996
- **Adopters**: Netflix, LinkedIn, Uber, Confluent, Spotify

Architecture pattern that decomposes data processing into independent, composable stages connected by data channels

_将数据处理分解为通过数据通道连接的独立可组合阶段的架构模式_

## When to Use

Apply this framework when:
- When data must flow through a series of transformation, validation, or enrichment steps in a defined sequence
- When individual processing stages need to be developed, tested, and scaled independently
- When building ETL pipelines, data ingestion systems, or stream processing applications
- When processing logic benefits from reusable, composable components that can be rearranged into different pipelines

## When NOT to Use

Stop and reconsider if:
- Interactive applications requiring synchronous request-response patterns where pipeline latency is unacceptable
- Systems where processing steps are tightly interdependent and cannot operate on data independently
- Small applications where the overhead of defining pipes and filters exceeds the benefit of modularity

## Core Concepts

- Filter: An independent processing component that receives input, applies a transformation, and produces output without knowledge of adjacent filters
- Pipe: A connector that transports data between filters, which can be synchronous (function calls) or asynchronous (message queues)
- Composability: Filters can be rearranged, added, or removed to create new processing workflows without modifying existing components
- Backpressure: A flow control mechanism that prevents fast producers from overwhelming slow consumers in the pipeline
- Fan-out and fan-in: Patterns for splitting a pipeline into parallel branches and merging results back together

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Pipe and Filter Architecture to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the end-to-end data processing workflow and break it into discrete transformation stages (filters)
2. **Define the data format for pipes**: establish a uniform or compatible data contract between filters
3. Implement each filter as a self-contained component that reads from an input pipe, transforms data, and writes to an output pipe
4. Connect filters with pipes (queues, streams, or in-memory channels) to form a processing pipeline
5. Add monitoring, error handling, and backpressure mechanisms to ensure pipeline resilience under varying load

<details><summary>中文步骤</summary>

1. 识别端到端的数据处理工作流，将其分解为离散的转换阶段（过滤器）
2. 定义管道的数据格式：在过滤器之间建立统一或兼容的数据契约
3. 将每个过滤器实现为自包含的组件，从输入管道读取、转换数据并写入输出管道
4. 使用管道（队列、流或内存通道）连接过滤器，形成处理流水线
5. 添加监控、错误处理和背压机制，确保流水线在不同负载下的韧性

</details>

## Do

- Do keep filters stateless because stateless filters can be parallelized, restarted, and scaled independently
- Do define a uniform data format between filters because incompatible formats require costly adapter layers
- Do implement backpressure handling because without it, pipeline failures cascade from the slowest filter outward
- Do make filters idempotent because retries after failure should not produce duplicate or corrupted results

## Don't

- Don't share state between filters through side channels because it creates hidden coupling and makes the pipeline non-deterministic
- Don't create overly fine-grained filters because the overhead of serialization and transport between too many stages degrades throughput
- Don't ignore error handling in intermediate filters because a silent failure mid-pipeline corrupts all downstream data
- Don't build circular pipelines because feedback loops in filter chains create debugging nightmares and potential infinite loops

## Case Study

**Netflix**: Netflix's data pipeline platform processes over a trillion events per day using a pipe-and-filter architecture built on Apache Kafka and Apache Flink. Each filter stage handles a specific responsibility: ingestion, deduplication, enrichment with user metadata, aggregation for analytics, and routing to downstream data stores. The composability of the pipeline allows Netflix to add new filters (such as real-time anomaly detection) without disrupting existing processing stages. This architecture processes petabytes of streaming data daily with sub-second latency for real-time analytics.

## Related Frameworks

- eda (complement)
- space-based-architecture (related)
- layered-architecture (related)

## Source

https://sdframe.caldis.me/frameworks/pipe-and-filter
