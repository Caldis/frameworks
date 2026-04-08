# Circuit Breaker with Retry / 带重试的断路器

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: reliability, performance
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Michael Nygard (circuit breaker pattern, 2007); Polly (.NET) and Hystrix (Netflix, 2012) as implementations
- **Adopters**: Netflix, Amazon, Alibaba (Sentinel), Microsoft (Polly/.NET), Spring Cloud (Resilience4j)

Combined retry + circuit breaker for resilient communication

_结合重试与断路器实现弹性通信_

## When to Use

Apply this framework when:
- When a microservice makes synchronous HTTP or gRPC calls to downstream dependencies that may be temporarily unavailable, slow, or returning errors intermittently
- When retry storms from many callers simultaneously retrying a failing service would overwhelm the dependency rather than allowing it to recover
- When graceful degradation is required so that a failed dependency causes the calling service to return a degraded response rather than failing entirely
- When a critical downstream service is known to experience periodic maintenance windows or traffic-related slowdowns that should not cascade into the calling service

## When NOT to Use

Stop and reconsider if:
- Internal in-process method calls that do not cross network boundaries because the overhead of a circuit breaker is unnecessary for calls that cannot fail due to network issues
- Asynchronous message-based communication where at-least-once delivery and consumer retries already handle transient failures at the messaging layer
- Database connections within a single service where connection pooling and timeout configuration provide sufficient resilience without circuit breaker complexity
- When the downstream service is the organization's own service with very high availability SLAs — invest in improving the service's reliability rather than masking its failures with a circuit breaker

## Core Concepts

- Closed state: the circuit is functioning normally; requests flow through; failures are counted against the threshold
- Open state: the failure threshold has been breached; all requests fail immediately without attempting the downstream call, preventing further load on an already-struggling dependency
- Half-open state: after a configured timeout, the circuit allows a single probe request through; if it succeeds the circuit closes; if it fails the circuit reopens for another timeout period
- Exponential backoff with jitter: retry delays that grow exponentially with each attempt and add random jitter to prevent thundering herd — many callers retrying simultaneously at the same interval

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Circuit Breaker with Retry to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Instrument all inter-service calls with a retry policy: configure a maximum retry count (e.g., 3 attempts), a retry delay strategy (fixed, exponential backoff, or jitter), and the specific exception types that should trigger a retry versus those that should fail immediately
2. Wrap the retry-capable call with a circuit breaker: configure a failure threshold (e.g., 50% failure rate over 30 seconds) that trips the breaker to open state, a timeout for the half-open probe attempt, and the success count required to close the breaker
3. Ensure the circuit breaker wraps the entire retry sequence, not each individual attempt: the breaker tracks failures of the final result after all retries are exhausted, not intermediate retry failures
4. Implement a fallback strategy for open circuit state: return a cached value, a degraded default response, or propagate a clear error to the caller indicating the dependency is unavailable
5. Monitor the circuit breaker state, failure rate, and retry exhaustion metrics in a dashboard; alert when a circuit enters open state for more than a configurable threshold because open circuits indicate dependency health problems requiring investigation

<details><summary>中文步骤</summary>

1. 用重试策略对所有服务间调用进行埋点：配置最大重试次数（如3次尝试）、重试延迟策略（固定、指数退避或抖动）以及应触发重试的特定异常类型与应立即失败的类型
2. 用断路器包装具有重试能力的调用：配置使断路器跳闸为打开状态的失败阈值（如30秒内50%失败率）、半开探测尝试的超时和关闭断路器所需的成功次数
3. 确保断路器包装整个重试序列，而非每次单独尝试：断路器在所有重试耗尽后追踪最终结果的失败，而非中间重试失败
4. 为断路器打开状态实施回退策略：返回缓存值、降级默认响应，或向调用方传播明确的错误，指示依赖项不可用
5. 在仪表板中监控断路器状态、失败率和重试耗尽指标；当断路器进入打开状态超过可配置阈值时发出告警，因为打开的断路器表明需要调查的依赖项健康问题

</details>

## Do

- Do configure separate circuit breakers for each downstream dependency because a shared breaker allows one failing dependency to block calls to all other healthy dependencies
- Do use jitter in retry delays because without jitter all retrying clients synchronize their retry timing and create a thundering herd that can overwhelm a recovering service
- Do set the circuit breaker timeout based on the dependency's expected recovery time rather than an arbitrary default because too-short timeouts cause premature circuit closure before the dependency has recovered
- Do test the circuit breaker behavior under load with chaos engineering tools (Chaos Monkey, Gremlin) because untested circuit breakers fail in unexpected ways under production conditions

## Don't

- Don't retry non-idempotent operations (POST, DELETE with side effects) without idempotency keys because each retry may duplicate the business action
- Don't set retry counts too high because aggressive retries amplify load on a struggling service and delay the circuit breaker from tripping when a dependency is genuinely down
- Don't share a circuit breaker thread pool across all callers because a slow dependency that exhausts the pool will block all other requests in the service, regardless of their target
- Don't disable circuit breakers in production to 'fix' a broken integration because the circuit breaker is revealing a dependency problem — disabling it causes cascading failure instead of graceful degradation

## Case Study

**Netflix**: Netflix's Hystrix library powered circuit breaking across hundreds of microservices in their video streaming platform. The most famous application is their API gateway, which calls dozens of downstream services (recommendations, user profiles, billing, content catalog) to assemble the home screen. Each dependency is wrapped in its own Hystrix command with a dedicated thread pool. When the recommendations service degrades during peak traffic, Hystrix trips its circuit and the API gateway falls back to a curated editorial list instead of crashing the entire home screen. Netflix reported that during their 2012 Christmas peak, over 3.5 billion Hystrix fallback calls were executed, keeping the service available for millions of users while individual dependencies experienced failures.

## Related Frameworks

- bulkhead-service-level (complement)
- service-discovery (complement)
- idempotency-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/circuit-breaker-with-retry
