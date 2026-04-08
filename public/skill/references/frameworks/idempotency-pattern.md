# Idempotency Pattern / 幂等性模式

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Concept from mathematics and HTTP specification (RFC 7231); applied to distributed systems by Helland (2012) and Kleppmann (2017), 1999
- **Adopters**: Stripe, PayPal, Shopify, Square, AWS (SQS deduplication)

Design operations to be safely retried without causing duplicate effects

_将操作设计为可安全重试且不产生重复效果_

## When to Use

Apply this framework when:
- When network failures or timeouts cause clients to retry requests, and duplicate execution would cause data corruption or financial loss
- When at-least-once message delivery semantics require deduplication at the consumer to achieve effectively-once processing
- When designing payment or order APIs where a duplicate charge or double order creation would be a critical business error
- When building webhook receivers that may receive the same event notification multiple times from an external provider

## When NOT to Use

Stop and reconsider if:
- Read-only GET endpoints that are naturally idempotent and need no special handling
- Fire-and-forget telemetry ingestion where occasional duplicates are acceptable and the deduplication overhead is not justified
- Internal service calls within a single transaction boundary where the database already provides atomicity guarantees

## Core Concepts

- Idempotency key: A client-generated unique identifier (typically a UUID) sent with each request that allows the server to detect and deduplicate retries
- At-least-once to effectively-once: Combining at-least-once delivery with server-side idempotency achieves the effect of exactly-once processing without the complexity of true exactly-once protocols
- Natural vs. artificial idempotency: Some operations are naturally idempotent (SET x=5) while others require artificial idempotency (tracking that a specific payment was already processed)
- Idempotency window: The time period during which the server retains idempotency records; retries after the window has expired may be processed as new operations
- Side-effect isolation: External side effects (sending emails, calling third-party APIs) must be guarded separately because the idempotency store only protects the local state change

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Idempotency Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Assign a unique idempotency key**: the client generates a UUID or deterministic key for each logical operation and includes it in every request and retry
2. **Check for prior execution**: before processing, the server looks up the idempotency key in a durable store to determine if this operation has already been processed
3. **Execute and store the result**: if the key is new, process the operation, persist the result alongside the idempotency key in the same transaction, and return the response
4. **Return the cached result for duplicates**: if the key already exists, skip processing and return the previously stored response, ensuring the client sees the same outcome
5. **Expire old keys**: implement a TTL-based cleanup policy for idempotency records because storing them indefinitely would consume unbounded storage

<details><summary>中文步骤</summary>

1. 分配唯一幂等键：客户端为每个逻辑操作生成UUID或确定性键，并在每次请求和重试中包含该键
2. 检查是否已执行：处理前，服务器在持久化存储中查找幂等键以确定该操作是否已被处理
3. 执行并存储结果：如果键是新的，处理操作，在同一事务中将结果与幂等键一起持久化，返回响应
4. 对重复请求返回缓存结果：如果键已存在，跳过处理并返回先前存储的响应，确保客户端看到相同结果
5. 过期旧键：为幂等记录实现基于TTL的清理策略，因为无限期存储会消耗无界的存储空间

</details>

## Do

- Do store the idempotency key and result in the same atomic transaction as the business operation because separate stores can become inconsistent after crashes
- Do let the client generate the idempotency key because server-generated keys cannot be correlated with retries of the same logical operation
- Do return the same HTTP status code and response body for duplicate requests because clients rely on consistent responses to determine success
- Do set a reasonable TTL for idempotency records (e.g., 24-72 hours) because indefinite retention creates unbounded storage growth

## Don't

- Don't treat all API endpoints as automatically idempotent because POST operations with side effects need explicit idempotency key handling
- Don't use timestamps or sequential IDs as idempotency keys because they are not unique across distributed clients and can collide
- Don't forget to handle the race condition where two identical requests arrive simultaneously because both may pass the 'key not found' check concurrently
- Don't assume idempotency keys protect against different operations because a key is bound to a specific operation — changing the request body with the same key should be rejected

## Case Study

**Stripe**: Stripe pioneered the industry-standard approach to API idempotency with their Idempotency-Key header. When a client creates a payment intent, it includes an Idempotency-Key header with a client-generated UUID. Stripe stores this key alongside the payment result in a database. If a network timeout occurs and the client retries with the same key, Stripe returns the original response without charging the customer again. Stripe's implementation handles a subtle edge case: if a retry arrives while the original request is still processing, Stripe returns a 409 Conflict rather than processing it in parallel, preventing race conditions. This pattern has been adopted across the payments industry, with companies like PayPal, Square, and Adyen implementing similar idempotency key mechanisms inspired by Stripe's design.

## Related Frameworks

- saga-pattern (complement)
- eventual-consistency (complement)
- two-phase-commit (complement)

## Source

https://sdframe.caldis.me/frameworks/idempotency-pattern
