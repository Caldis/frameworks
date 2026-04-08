# Circuit Breaker Pattern / 熔断器模式

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: reliability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Michael Nygard, 2007
- **Adopters**: Netflix, Amazon, Uber, Alibaba, Capital One

Prevent cascading failures by short-circuiting failing calls

_通过短路失败调用防止级联故障扩散_

## When to Use

Apply this framework when:
- Microservice architectures where one slow or failing service can cascade to bring down the entire system
- Applications calling external third-party APIs with unpredictable reliability
- High-traffic systems where waiting on failing dependencies wastes thread pool resources
- Services with defined fallback behaviors (caches, defaults) that can serve users during degradation

## When NOT to Use

Stop and reconsider if:
- Monolithic applications with no remote dependencies where failures are handled in-process
- Fire-and-forget messaging where failures don't block the caller
- Batch processing systems where retries with backoff are more appropriate than fail-fast

## Core Concepts

- Closed State: Normal operation where requests pass through and failures are counted
- Open State: The circuit is tripped and all requests immediately fail-fast without calling the dependency
- Half-Open State: A limited number of probe requests are allowed to test whether the dependency has recovered
- Fallback: An alternative response strategy used when the circuit is open (cached data, defaults, degraded features)
- Failure Threshold: The number or rate of failures within a time window that triggers the circuit to open

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Circuit Breaker Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Wrap remote calls**: place a circuit breaker around each external dependency call (HTTP, database, third-party API)
2. **Configure thresholds**: set failure count or failure rate thresholds that trigger the circuit to open (e.g., 5 failures in 10 seconds)
3. **Implement the three states**: Closed (normal), Open (fail-fast with fallback), Half-Open (allow a probe request to test recovery)
4. **Design fallback responses**: return cached data, default values, or degraded functionality when the circuit is open
5. **Monitor and alert**: track circuit state transitions, open duration, and fallback invocation rates in dashboards and alerting systems

<details><summary>中文步骤</summary>

1. 包裹远程调用：为每个外部依赖调用（HTTP、数据库、第三方API）放置熔断器
2. 配置阈值：设置触发熔断器打开的失败计数或失败率阈值（如10秒内5次失败）
3. 实现三种状态：关闭（正常）、打开（快速失败并降级）、半开（允许探测请求测试恢复）
4. 设计降级响应：在熔断器打开时返回缓存数据、默认值或降级功能
5. 监控与告警：在仪表盘和告警系统中追踪熔断器状态转换、打开持续时间和降级调用率

</details>

## Do

- Do configure different thresholds per dependency because each downstream has different failure characteristics
- Do implement meaningful fallbacks because a circuit breaker without fallback just changes the error message
- Do log circuit state transitions because they are critical signals for operational awareness
- Do test circuit breaker behavior with chaos engineering because misconfigured breakers can mask problems

## Don't

- Don't use a single circuit breaker for all dependencies because one failing service will trip the breaker for all
- Don't set thresholds too sensitive because transient network blips will trigger unnecessary circuit opens
- Don't forget the half-open state because without it the circuit never recovers automatically
- Don't ignore circuit breaker metrics because a circuit that is always open indicates a deeper systemic problem

## Case Study

**Netflix**: Netflix developed Hystrix as their circuit breaker library after experiencing cascading failures in their microservice architecture. When a single recommendation service slowed down, it consumed all available threads in calling services, eventually taking down the entire streaming experience. Hystrix circuit breakers resolved this by fail-fasting degraded calls and returning cached recommendations instead.

## Related Frameworks

- bulkhead-pattern (complement)
- chaos-engineering (complement)
- saga-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/circuit-breaker-pattern
