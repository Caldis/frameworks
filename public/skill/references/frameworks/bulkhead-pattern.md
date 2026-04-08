# Bulkhead Pattern / 舱壁模式

- **Category**: quality
- **Complexity**: advanced
- **Quality**: reliability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Michael Nygard, 2007
- **Adopters**: Amazon, Netflix, Microsoft Azure, Alibaba Cloud, Uber

Isolate components so a failure in one doesn't sink the whole system

_隔离组件使某一部分的故障不会导致整个系统崩溃_

## When to Use

Apply this framework when:
- Systems with multiple external dependencies where one slow dependency can exhaust shared resources
- Multi-tenant platforms where one tenant's traffic spike must not affect others
- Services with mixed workload priorities (critical vs. best-effort) requiring resource isolation
- Applications experiencing thread pool starvation during dependency outages

## When NOT to Use

Stop and reconsider if:
- Simple applications with a single dependency where isolation adds complexity without benefit
- Low-traffic systems where resource contention is unlikely to occur
- Stateless serverless functions that inherently isolate through per-invocation containers

## Core Concepts

- Failure Domain Isolation: Preventing a failure in one component from consuming resources needed by others
- Thread Pool Bulkhead: Dedicating separate thread pools per dependency so one cannot starve another
- Semaphore Bulkhead: Using counting semaphores to limit concurrent access without dedicated thread pools
- Resource Partitioning: Allocating fixed resource budgets (connections, memory, CPU) per workload or tenant
- Graceful Degradation: Continuing to serve critical functions even when non-critical partitions are overwhelmed

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Bulkhead Pattern to?
- What constraints or existing architecture do you need to work within?
- Has your team used Bulkhead Pattern before? (This is an advanced framework)

## Implementation Steps

1. **Identify failure domains**: map all external dependencies and internal components that could fail independently
2. **Partition resources**: allocate dedicated thread pools, connection pools, or compute instances per dependency or feature
3. **Set limits per partition**: configure max concurrent requests, queue depths, and timeouts for each bulkhead compartment
4. **Implement rejection policies**: define what happens when a bulkhead is full — reject immediately, queue with bounded wait, or shed load
5. **Monitor compartment health**: track utilization, rejection rates, and queue depth per bulkhead to detect and right-size compartments

<details><summary>中文步骤</summary>

1. 识别故障域：映射所有可能独立失败的外部依赖和内部组件
2. 分区资源：为每个依赖或功能分配专用的线程池、连接池或计算实例
3. 为每个分区设限：配置每个舱壁隔间的最大并发请求数、队列深度和超时时间
4. 实现拒绝策略：定义舱壁满时的处理方式——立即拒绝、有界等待排队或负载丢弃
5. 监控隔间健康：追踪每个舱壁的利用率、拒绝率和队列深度以检测并调整隔间大小

</details>

## Do

- Do size bulkheads based on measured traffic patterns because under-provisioned partitions cause unnecessary rejections
- Do combine bulkheads with circuit breakers because they complement each other for comprehensive fault tolerance
- Do implement per-tenant bulkheads in multi-tenant systems because noisy neighbors are a top reliability risk
- Do monitor bulkhead utilization because consistently full bulkheads indicate under-provisioning or dependency issues

## Don't

- Don't create too many fine-grained partitions because overhead and complexity outweigh isolation benefits
- Don't share thread pools across critical and non-critical paths because this defeats the isolation purpose
- Don't set bulkhead limits without load testing because guessed limits are usually wrong
- Don't forget to handle rejection gracefully because rejected requests should return meaningful errors, not stack traces

## Case Study

**Amazon**: Amazon uses bulkhead patterns extensively through their Cell-based Architecture, where each cell is an independent, isolated deployment serving a subset of customers. During the 2021 US-EAST-1 disruption, cells with proper bulkheading continued operating while affected cells were isolated, preventing a total service outage and limiting the blast radius of the failure.

## Related Frameworks

- circuit-breaker-pattern (complement)
- chaos-engineering (complement)
- cell-based-architecture (related)

## Source

https://sdframe.caldis.me/frameworks/bulkhead-pattern
