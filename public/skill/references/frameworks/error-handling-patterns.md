# Error Handling Patterns / 错误处理模式

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: reliability
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Michael Nygard, 2007, 2003
- **Adopters**: Uber, Netflix, Stripe, Amazon, LinkedIn

Fail-fast, retry, fallback, and dead letter queue patterns for resilient error management

_快速失败、重试、回退和死信队列模式，用于弹性错误管理_

## When to Use

Apply this framework when:
- Building distributed systems where network failures, timeouts, and partial outages are inevitable
- Designing message processing pipelines where individual message failures should not halt the entire queue
- Creating user-facing APIs that must degrade gracefully rather than return raw errors to clients
- Operating services with strict SLA requirements where unhandled errors directly impact availability metrics

## When NOT to Use

Stop and reconsider if:
- Simple synchronous scripts or CLI tools where errors should immediately terminate execution and print a message
- Stateless pure functions where errors are return values and traditional exception handling adds unnecessary complexity
- Systems in early prototype phase where resilience engineering is premature and slows iteration speed

## Core Concepts

- Fail-Fast: Immediately reporting an error when a precondition is not met, rather than proceeding with an operation doomed to fail later
- Retry with Backoff: Automatically reattempting a failed operation with increasing delays between attempts to allow transient issues to resolve
- Fallback: Providing an alternative response or behavior when the primary operation fails, maintaining partial functionality
- Dead Letter Queue: A separate queue where messages that cannot be processed after exhausting retries are stored for manual inspection and replay
- Idempotency: Designing operations so that retrying them produces the same result, preventing duplicate side effects from retry logic

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Error Handling Patterns to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Classify errors by recoverability**: distinguish transient errors (network timeouts, rate limits) from permanent errors (invalid input, missing resources) to select the right handling strategy
2. Implement fail-fast for unrecoverable errors: validate inputs early, throw immediately on invariant violations, and avoid wasting resources on doomed operations
3. Add retry with exponential backoff for transient failures: use jitter to prevent thundering herds and set maximum retry limits to avoid infinite loops
4. Design fallback strategies for degraded operation: serve cached data, return default values, or switch to backup services when primary paths fail
5. Route persistently failing messages to dead letter queues: capture unprocessable messages for investigation without blocking the main processing pipeline

<details><summary>中文步骤</summary>

1. 按可恢复性分类错误：区分暂时性错误（网络超时、速率限制）和永久性错误（无效输入、缺失资源）以选择正确的处理策略
2. 对不可恢复错误实施快速失败：尽早验证输入，在违反不变量时立即抛出，避免在注定失败的操作上浪费资源
3. 为暂时性故障添加指数退避重试：使用抖动防止惊群效应，设置最大重试限制避免无限循环
4. 设计降级操作的回退策略：当主路径失败时提供缓存数据、返回默认值或切换到备用服务
5. 将持续失败的消息路由到死信队列：捕获无法处理的消息以供调查，同时不阻塞主处理管道

</details>

## Do

- Do classify errors as transient or permanent at the point of occurrence because the correct handling strategy depends entirely on this distinction
- Do add jitter to retry delays because synchronized retries from multiple clients create thundering herd problems that worsen outages
- Do make retried operations idempotent because non-idempotent retries can cause duplicate charges, messages, or state mutations
- Do log every error with sufficient context because debugging production errors without request IDs, timestamps, and stack traces wastes hours

## Don't

- Don't catch and swallow exceptions silently because hidden errors accumulate into mysterious system degradation
- Don't retry permanent errors because retrying a 400 Bad Request or 404 Not Found wastes resources and delays actual error handling
- Don't use unbounded retries because infinite retry loops can amplify failures and consume all available resources
- Don't return raw internal errors to users because stack traces and internal messages expose security vulnerabilities and confuse end users

## Case Study

**Uber**: Uber implemented a layered error handling strategy across their ride-matching pipeline after a cascading failure caused a 15-minute outage during peak hours. They introduced fail-fast validation at API gateways, retry with exponential backoff and jitter for inter-service calls, cached fallbacks for pricing estimates, and dead letter queues for failed payment events. This architecture reduced cascading failures by 80% and ensured that payment events were never lost, even during partial outages.

## Related Frameworks

- circuit-breaker-pattern (complement)
- bulkhead-pattern (complement)
- chaos-engineering (related)

## Source

https://sdframe.caldis.me/frameworks/error-handling-patterns
