# Distributed Tracing / 分布式追踪

- **Category**: observability
- **Complexity**: intermediate
- **Quality**: observability, reliability, performance
- **Abstraction**: system
- **Maturity**: established
- **Author**: Benjamin H. Sigelman et al. (Google Dapper), 2010
- **Adopters**: Uber, Netflix, Airbnb, Lyft, Datadog

Track requests across service boundaries to diagnose latency and failures in distributed systems

_跨服务边界追踪请求，诊断分布式系统中的延迟和故障_

## When to Use

Apply this framework when:
- Microservice architectures where a single user request fans out across multiple services and databases
- Diagnosing latency spikes that span multiple network hops and cannot be isolated to a single service
- Understanding service dependencies and call patterns in complex distributed systems
- Debugging intermittent failures that only occur under specific request paths or data combinations

## When NOT to Use

Stop and reconsider if:
- Monolithic applications where all request processing happens in a single process and a profiler provides better insight
- Batch processing systems where request-oriented tracing does not align with the job-based execution model
- Systems processing fewer than 100 requests per second where simple logging provides sufficient debugging context
- Extremely latency-sensitive hot paths where the overhead of span creation and context propagation is unacceptable

## Core Concepts

- Trace: A directed acyclic graph of spans representing the complete lifecycle of a request as it traverses multiple services
- Span: A named, timed operation within a trace; each span records service, operation, duration, status, and parent span ID to form the tree structure
- Context Propagation: The mechanism of passing trace ID and span ID across process boundaries via HTTP headers (W3C Trace Context, B3) or message metadata
- Sampling: A strategy to reduce trace volume by collecting only a fraction of traces (head-based) or selectively retaining interesting traces (tail-based)
- Trace Waterfall: A visualization showing the timeline of all spans in a trace, revealing sequential vs parallel execution, bottlenecks, and error locations

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Distributed Tracing to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Generate a unique trace ID at the entry point (API gateway, load balancer) and propagate it through all downstream service calls via headers
2. Create spans for each meaningful operation: record service name, operation name, start time, duration, status code, and custom attributes
3. Propagate context across async boundaries: ensure trace context survives message queues, background jobs, and event-driven workflows
4. Send span data to a trace backend (Jaeger, Zipkin, Tempo) and build a service dependency graph from collected traces
5. Analyze trace waterfalls to identify latency bottlenecks, error propagation paths, and unexpected sequential calls that should be parallel

<details><summary>中文步骤</summary>

1. 在入口点（API网关、负载均衡器）生成唯一Trace ID，并通过请求头将其传播到所有下游服务调用
2. 为每个有意义的操作创建Span：记录服务名、操作名、开始时间、持续时间、状态码和自定义属性
3. 跨异步边界传播上下文：确保追踪上下文在消息队列、后台任务和事件驱动工作流中不丢失
4. 将Span数据发送到追踪后端（Jaeger、Zipkin、Tempo），并从收集的追踪中构建服务依赖图
5. 分析追踪瀑布图以识别延迟瓶颈、错误传播路径和应当并行却意外串行的调用

</details>

## Do

- Do propagate trace context through all communication channels including message queues, gRPC, and event buses, because broken context creates orphan spans
- Do add business-relevant attributes to spans (user ID, order ID, feature flag variant) so traces become queryable by business dimensions
- Do implement tail-based sampling in the collector to retain error traces and slow traces while dropping routine ones
- Do set up service dependency maps derived from traces to maintain an always-current architecture diagram

## Don't

- Don't create a span for every function call, because excessive span granularity generates massive data volumes and obscures meaningful signals
- Don't rely solely on head-based sampling at high rates, because it randomly discards error and slow traces that are most valuable for debugging
- Don't forget to trace database queries and cache lookups, because they are often the largest contributors to request latency
- Don't ignore trace data retention policies, because unbounded storage of high-cardinality trace data leads to runaway costs

## Case Study

**Uber**: Uber built Jaeger to trace requests across their 4,000+ microservices. Before Jaeger, debugging a failed ride request required manually correlating logs across dozens of services. With distributed tracing, engineers could visualize the complete request flow from the rider app through dispatch, pricing, driver matching, and payment services. Jaeger helped Uber reduce mean time to resolution (MTTR) for production incidents by over 60%, and the trace-derived service dependency graph became the single source of truth for their microservice architecture.

## Related Frameworks

- opentelemetry (complement)
- structured-logging (complement)
- four-golden-signals (complement)
- red-method (complement)
- circuit-breaker-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/distributed-tracing
