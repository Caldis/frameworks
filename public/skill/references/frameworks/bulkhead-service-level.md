# Bulkhead at Service Level / 服务级隔离舱

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: reliability, performance
- **Abstraction**: component
- **Maturity**: established
- **Author**: Michael Nygard (2007); popularized by Netflix Hystrix thread pool isolation (2012)
- **Adopters**: Amazon, Netflix, Microsoft (Azure Service Fabric), Uber, Istio service mesh users

Isolating service resources to prevent cascading failures (different from code-level bulkhead in quality.json)

_隔离服务资源以防止级联故障（区别于quality.json中代码级别的隔离舱）_

## When to Use

Apply this framework when:
- When a single slow or failing downstream dependency can exhaust the service's shared thread pool and make all other API endpoints unresponsive
- When a multi-tenant service must guarantee fair resource allocation so that a noisy tenant does not starve resources for others
- When different API endpoints have vastly different latency profiles and fast, latency-sensitive endpoints share a thread pool with slow batch endpoints
- When a service has multiple integration points with third-party APIs that have independent failure modes and rate limits

## When NOT to Use

Stop and reconsider if:
- Single-threaded or event-loop based services (Node.js, asyncio) where thread pool isolation is not applicable — use semaphore-based concurrency limits and async timeout instead
- Monolithic applications where all components share the same process and true resource isolation requires OS-level process or container boundaries
- When all downstream dependencies have identical performance characteristics and there is no differentiation needed between fast and slow paths
- When the service only calls a single downstream dependency and there is no multi-tenancy to isolate — the complexity of bulkhead partitioning is not justified

## Core Concepts

- Resource partition: a dedicated, bounded allocation of a resource type (threads, connections, memory) assigned to a specific consumer, dependency, or tenant, preventing cross-partition interference
- Thread pool isolation: assigning a dedicated thread pool to each downstream dependency call; if the dependency blocks, only its pool is exhausted, not the service's main execution pool
- Semaphore isolation: limiting the number of concurrent in-flight requests to a dependency using a semaphore rather than a separate thread pool; lower overhead than thread isolation but no timeout enforcement
- Shed load: when a bulkhead's queue reaches capacity, new requests are immediately rejected with an explicit error (503 or rate limit response) rather than queuing indefinitely and causing latency to grow unbounded

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Bulkhead at Service Level to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the critical resource pools in the service that can be exhausted by a single misbehaving dependency or tenant: thread pools, connection pools, memory limits, and rate-limited API quotas
2. Partition resource pools by consumer or dependency: assign dedicated thread pools to each downstream dependency call (Hystrix semaphore/thread isolation), or partition connection pools by calling service identity
3. Set capacity limits on each bulkhead partition: define the maximum concurrent requests, maximum queue depth, and timeout for each pool so that no single consumer can exceed its allocation even if it sends unlimited requests
4. Implement tenant-level bulkheads for multi-tenant services: allocate separate rate limits, request queues, and processing resources per tenant so that a high-volume tenant cannot starve resources for other tenants
5. Monitor bulkhead utilization, queue depth, and rejection rates per partition in observability tooling; tune partition sizes based on observed traffic patterns and ensure that the sum of all partition limits does not exceed total resource capacity

<details><summary>中文步骤</summary>

1. 识别服务中可能被单个行为异常的依赖项或租户耗尽的关键资源池：线程池、连接池、内存限制和受速率限制的API配额
2. 按消费者或依赖项划分资源池：为每个下游依赖项调用分配专用线程池（Hystrix信号量/线程隔离），或按调用服务身份划分连接池
3. 设置每个隔离舱分区的容量限制：为每个池定义最大并发请求数、最大队列深度和超时，使任何单个消费者即使发送无限请求也无法超过其分配
4. 为多租户服务实施租户级隔离舱：按租户分配单独的速率限制、请求队列和处理资源，使高流量租户无法使其他租户的资源饥饿
5. 在可观测性工具中监控每个分区的隔离舱利用率、队列深度和拒绝率；根据观察到的流量模式调整分区大小，并确保所有分区限制之和不超过总资源容量

</details>

## Do

- Do size bulkhead partitions based on measured traffic data rather than intuition because over-partitioning wastes resources while under-partitioning creates artificial bottlenecks
- Do return meaningful rejection errors (503 Service Unavailable with Retry-After) when bulkhead capacity is exceeded so clients can implement appropriate backoff
- Do combine bulkheads with circuit breakers because bulkheads limit the blast radius of a failure while circuit breakers prevent repeated attempts against a known-failed dependency
- Do test bulkhead behavior with load tests that simulate tenant isolation scenarios and third-party API slowdowns to verify that partitions behave correctly under stress

## Don't

- Don't create too many small partitions because context switching between many small thread pools introduces overhead that can degrade performance more than the isolation benefit provides
- Don't set partition limits so large that they effectively share resources — a bulkhead that allows 95% of total threads defeats the isolation purpose
- Don't implement bulkheads only at the thread pool level because network connection pools, database connection pools, and outbound API rate limits also need partitioning for true isolation
- Don't confuse bulkhead rejection (immediate fail-fast) with throttling (delayed processing) because bulkhead rejections are intentional load shedding, not queuing — clients must retry with backoff

## Case Study

**Amazon**: Amazon's retail website uses bulkhead isolation to prevent slow third-party integrations from degrading the core shopping experience. The product detail page aggregates data from dozens of internal and external services (reviews, inventory, pricing, recommendations, seller data). Each data source is assigned a dedicated connection pool and thread pool with a strict timeout. When a third-party seller data API experiences latency spikes during peak events like Prime Day, its bulkhead is exhausted and the page falls back to cached seller information, leaving all other page components (price, add-to-cart, reviews) fully functional. Amazon reports that bulkhead isolation prevents over 99% of third-party API degradations from impacting their core conversion metrics.

## Related Frameworks

- circuit-breaker-with-retry (complement)
- service-discovery (complement)
- consistent-hashing (related)

## Source

https://sdframe.caldis.me/frameworks/bulkhead-service-level
