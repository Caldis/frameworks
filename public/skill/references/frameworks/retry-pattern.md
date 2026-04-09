# Retry Pattern / 重试模式

- **Category**: distributed
- **Complexity**: beginner
- **Quality**: reliability
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Distributed systems best practice; formalized by Microsoft Azure patterns, 2014, 1990s
- **Adopters**: AWS SDK, Azure SDK, Spring Retry, Polly (.NET), Resilience4j

Automatically re-attempt a failed operation with configurable delay and limits to handle transient faults

_对失败操作以可配置的延迟和次数限制自动重试，以应对瞬时故障_

## When to Use

Apply this framework when:
- Calling remote services over a network where transient failures (timeouts, connection resets, 503s) are expected and recoverable
- Integrating with third-party APIs that enforce rate limits and return 429 Too Many Requests responses
- Accessing cloud-managed resources (databases, object stores, message brokers) that may experience brief unavailability during maintenance or scaling
- Any idempotent operation where repeating the call produces the same outcome and does not create duplicate side-effects

## When NOT to Use

Stop and reconsider if:
- Non-idempotent operations that create side-effects on each call (e.g., payment processing, email sending) unless an idempotency key mechanism is in place
- Permanent error conditions such as authentication failures, invalid input, or resource-not-found where retrying wastes resources without any chance of recovery
- Real-time latency-sensitive paths (e.g., live audio/video streams, HFT order execution) where the added latency of even one retry exceeds acceptable response-time budgets
- When the downstream service is clearly overloaded and not recovering — use a circuit breaker to halt all calls rather than continuing to retry and amplifying the overload

## Core Concepts

- Transient fault detection: distinguishing recoverable errors (timeouts, throttling, 5xx) from permanent failures (4xx, schema errors) that should never be retried
- Exponential backoff: doubling the wait interval between attempts so that retries back off progressively and reduce load on a stressed service
- Jitter: randomising delay intervals so that many concurrent clients do not synchronise their retries and create a thundering herd
- Retry budget: a hard cap on attempt count and elapsed time that guarantees the retry loop terminates and preserves overall system latency
- Idempotency: the property of an operation that it can be executed multiple times without changing the result beyond the first successful execution

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Retry Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Classify the error**: determine whether the failure is transient (network blip, throttling, temporary unavailability) or permanent (bad request, not found) — only retry transient errors
2. **Choose a retry strategy**: select immediate retry for very short blips, fixed-delay retry for simple backoff, or exponential backoff with jitter to reduce thundering-herd pressure on recovering services
3. **Set a retry budget**: define a maximum attempt count and a total timeout ceiling so that retry loops cannot run indefinitely or cascade into overall request timeouts
4. **Add jitter to delays**: introduce randomised variance (±30%) into wait intervals so that multiple clients retrying simultaneously do not synchronise and overwhelm a recovering service
5. **Log and surface retry metrics**: emit a counter for each retry attempt and an event on final failure so operations teams can distinguish transient noise from systemic degradation

<details><summary>中文步骤</summary>

1. 对错误分类：判断故障是瞬时性的（网络抖动、限流、临时不可用）还是永久性的（请求错误、资源不存在）——只对瞬时性错误重试
2. 选择重试策略：对极短抖动使用立即重试，对简单退避使用固定延迟重试，或使用带抖动的指数退避以减轻对恢复中服务的羊群压力
3. 设置重试预算：定义最大重试次数和总超时上限，防止重试循环无限运行或级联导致整体请求超时
4. 为延迟添加抖动：在等待间隔中引入随机变化（±30%），防止多个客户端同步重试并压垮正在恢复的服务
5. 记录并暴露重试指标：为每次重试发出计数器、为最终失败发出事件，使运维团队能区分瞬时噪声与系统性降级

</details>

## Do

- Do retry only on transient, idempotent operations because retrying non-idempotent calls risks duplicate side-effects such as duplicate charges or duplicate messages
- Do use exponential backoff with jitter because it reduces thundering-herd load on recovering services far better than fixed-interval retry
- Do cap total retry duration as well as attempt count because unbounded retries can cause cascading timeouts across dependent services
- Do pair retry with a circuit breaker so that after a threshold of consecutive failures the circuit opens and stops retrying until the downstream recovers

## Don't

- Don't retry non-idempotent writes (e.g., POST create-order) without first verifying idempotency keys because duplicate processing causes data corruption
- Don't use fixed-interval retry without jitter in high-concurrency systems because all clients will synchronise retries and amplify load on an already-struggling service
- Don't set an unlimited retry count because it masks systemic failures and starves the caller of resources while the downstream remains unavailable
- Don't retry on 4xx client errors (bad request, unauthorised, not found) because these indicate a logic problem that more retries cannot fix

## Case Study

**AWS SDK**: Every AWS SDK implements the Retry pattern with exponential backoff and jitter as its default error-handling strategy. When a DynamoDB call returns a ProvisionedThroughputExceededException, the SDK automatically retries up to three times using decorrelated jitter backoff. This behaviour is documented in the AWS architecture blog post 'Exponential Backoff And Jitter' (2015), which showed that decorrelated jitter reduced completion time by 28% compared to a naive fixed-interval retry under contention. The SDK's configurable RetryMode (legacy, standard, adaptive) lets teams tune the retry budget to match their application's latency tolerance, demonstrating how a well-implemented retry policy is transparent to application code yet dramatically improves resilience.

## Related Frameworks

- circuit-breaker-pattern (complement)
- circuit-breaker-with-retry (related)
- bulkhead-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/retry-pattern
