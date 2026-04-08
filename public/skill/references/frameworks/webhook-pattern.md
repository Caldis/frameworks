# Webhook Pattern / Webhook模式

- **Category**: api
- **Complexity**: intermediate
- **Quality**: scalability, usability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Jeff Lindsay, 2007 (coined the term); pattern predates the name in early HTTP callback systems
- **Adopters**: Stripe, GitHub, Twilio, Shopify, Slack

Event-driven API integration via HTTP callbacks for real-time notifications

_通过HTTP回调实现事件驱动的API集成，提供实时通知_

## When to Use

Apply this framework when:
- When consumers need real-time notifications of events without continuously polling your API
- When integrating with third-party systems that need to react to state changes in your platform
- When building automation workflows where downstream actions should trigger immediately upon events
- When reducing API load by pushing updates to interested consumers instead of serving repeated polling requests

## When NOT to Use

Stop and reconsider if:
- When consumers cannot expose a publicly accessible HTTP endpoint (e.g., behind strict corporate firewalls)
- When strict ordering guarantees are required, as webhook delivery order is inherently non-deterministic
- When the event volume is extremely high and consumers cannot absorb the throughput, requiring a message queue instead
- When bidirectional communication is needed, as webhooks are unidirectional push-only

## Core Concepts

- Push-Based Delivery: The server proactively sends HTTP POST requests to consumer-registered URLs when events occur, inverting the traditional pull model
- Payload Signing: HMAC signatures (using a shared secret) in request headers allow consumers to verify that webhook payloads originated from the legitimate sender
- Idempotency: Consumers must handle duplicate deliveries gracefully using event IDs, because retry logic can deliver the same event multiple times
- Retry with Backoff: Failed deliveries are retried with exponential backoff to handle transient consumer outages without overwhelming recovering endpoints
- Subscription Management: A self-service API for registering, updating, and deactivating webhook subscriptions with event type filtering

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Webhook Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define the webhook events your system will emit, documenting each event type's payload schema and trigger conditions
2. Build a subscription management API that allows consumers to register callback URLs, select event types, and configure secret tokens for verification
3. Implement the event dispatch system that serializes events, signs payloads with HMAC, and delivers HTTP POST requests to registered callback URLs
4. Add retry logic with exponential backoff for failed deliveries, and implement a dead-letter queue for persistently failing endpoints
5. Provide consumers with a webhook delivery log and replay capability so they can debug missed events and recover from outages

<details><summary>中文步骤</summary>

1. 定义系统将发出的webhook事件，记录每种事件类型的负载模式和触发条件
2. 构建订阅管理API，允许消费者注册回调URL、选择事件类型并配置用于验证的密钥令牌
3. 实现事件分发系统，序列化事件、使用HMAC签名负载，并向注册的回调URL发送HTTP POST请求
4. 为失败的投递添加指数退避的重试逻辑，并为持续失败的端点实现死信队列
5. 为消费者提供webhook投递日志和重放功能，以便调试遗漏事件并从故障中恢复

</details>

## Do

- Do sign every webhook payload with HMAC and document the verification process because unsigned webhooks are trivially spoofable
- Do include a unique event ID in every payload because consumers need it for idempotent processing and deduplication
- Do implement exponential backoff with jitter for retries because synchronized retries to a recovering endpoint cause thundering herd problems
- Do provide a delivery log and manual replay endpoint because consumers need to debug and recover from missed events

## Don't

- Don't send webhook payloads without signatures because it exposes consumers to spoofing and injection attacks
- Don't retry indefinitely without a maximum retry count and dead-letter mechanism because it wastes resources on permanently unreachable endpoints
- Don't include sensitive data (passwords, tokens) in webhook payloads because callback URLs may traverse untrusted networks
- Don't assume consumers process events in order because network conditions and retries can deliver events out of sequence

## Case Study

**Stripe**: Stripe's webhook system delivers billions of events per month to merchants for payment lifecycle events (charge.succeeded, invoice.paid, dispute.created). Each event is signed with HMAC-SHA256 using per-endpoint secrets, and Stripe retries failed deliveries for up to 72 hours with exponential backoff. Their webhook dashboard provides real-time delivery logs with payload inspection and one-click replay. This push-based model eliminated the need for merchants to poll the Stripe API, reducing API call volume by an estimated 80% for event-driven workflows.

## Related Frameworks

- asyncapi (complement)
- api-rate-limiting-throttling (complement)
- api-gateway-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/webhook-pattern
