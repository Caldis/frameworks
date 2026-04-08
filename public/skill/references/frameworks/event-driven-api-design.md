# Event-Driven API Design / 事件驱动 API 设计

- **Category**: api
- **Complexity**: advanced
- **Quality**: performance, scalability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Clemens Vasters, 2006
- **Adopters**: Figma, Slack, Discord, Twitch, AWS IoT

Server-Sent Events, WebSocket, and MQTT patterns for real-time, asynchronous API communication

_服务端推送事件、WebSocket 和 MQTT 模式，用于实时、异步的 API 通信_

## When to Use

Apply this framework when:
- When clients need to react to server-side state changes (order status updates, live price feeds, collaborative editing) without polling
- When building IoT data pipelines where millions of devices publish sensor readings to a backend that must ingest and distribute them with QoS guarantees
- When a microservices-based system needs to decouple producers and consumers of domain events through a message broker, avoiding synchronous request chains
- When AI-generated streaming responses (LLM token streaming) must be delivered to clients as they are produced rather than waiting for the complete response

## When NOT to Use

Stop and reconsider if:
- Simple request-response interactions where the client initiates a query and receives a single response — REST or gRPC is simpler and better supported
- APIs where all communication is initiated by the client and server responses are always complete and synchronous — polling with a short interval is simpler to implement and debug
- Serverless functions (AWS Lambda, Cloudflare Workers) that terminate after a single request-response cycle — persistent connections require long-running processes
- High-security environments where long-lived TCP connections are prohibited by network policy and each request must be individually authenticated

## Core Concepts

- Server-Sent Events (SSE): A unidirectional HTTP/1.1 streaming protocol where the server pushes events to the client over a persistent connection; clients reconnect automatically using the Last-Event-ID header for replay after disconnection
- WebSocket: A full-duplex, bidirectional protocol over a single TCP connection established via an HTTP upgrade handshake; suitable for interactive applications requiring low-latency bidirectional messaging
- MQTT: A lightweight publish-subscribe protocol designed for constrained IoT devices, providing three QoS levels (at most once, at least once, exactly once) and a topic-based routing model
- AsyncAPI: A specification format for event-driven APIs analogous to OpenAPI for REST; describes channels, message schemas, bindings (Kafka, AMQP, WebSocket), and server configurations
- Backpressure: The mechanism by which a consumer signals to a producer that it cannot keep up with the event rate, preventing unbounded queue growth and out-of-memory failures in high-throughput event streams

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Event-Driven API Design to?
- What constraints or existing architecture do you need to work within?
- Has your team used Event-Driven API Design before? (This is an advanced framework)

## Implementation Steps

1. **Identify the real-time requirements**: unidirectional server-to-client pushes (SSE), bidirectional full-duplex messaging (WebSocket), or constrained IoT device messaging with QoS guarantees (MQTT), then select the appropriate protocol
2. **Design the event schema**: define event types, payload structure, and metadata (event_id, event_type, timestamp, correlation_id) using a schema registry (AsyncAPI, Avro, JSON Schema) to enable consumer validation and code generation
3. Implement connection lifecycle management: handle reconnection with exponential backoff (SSE Last-Event-ID replay, WebSocket reconnect logic), define heartbeat/ping intervals to detect stale connections, and document maximum connection durations
4. **Apply backpressure and flow control**: implement per-connection message queues with bounded capacity, use MQTT QoS levels (0, 1, 2) appropriate to message criticality, and expose metrics on queue depth and delivery latency
5. **Secure the event channel**: authenticate the initial connection with the same OAuth2/JWT patterns used for REST, authorize subscription to specific event topics per client scope, and encrypt event payloads for sensitive data

<details><summary>中文步骤</summary>

1. 识别实时需求：单向服务端到客户端推送（SSE）、双向全双工消息（WebSocket），还是带有 QoS 保证的受限 IoT 设备消息（MQTT），然后选择合适的协议
2. 设计事件模式：使用模式注册表（AsyncAPI、Avro、JSON Schema）定义事件类型、载荷结构和元数据（event_id、event_type、timestamp、correlation_id），以支持消费者验证和代码生成
3. 实现连接生命周期管理：使用指数退避处理重连（SSE Last-Event-ID 回放、WebSocket 重连逻辑）、定义心跳/ping 间隔以检测陈旧连接，并记录最大连接持续时间
4. 应用背压和流量控制：为每个连接实现有界容量的消息队列，使用与消息重要性相匹配的 MQTT QoS 级别（0、1、2），并暴露队列深度和传递延迟的指标
5. 保护事件通道：使用与 REST 相同的 OAuth2/JWT 模式对初始连接进行认证，按客户端范围授权订阅特定事件主题，并对敏感数据的事件载荷加密

</details>

## Do

- Do use SSE for unidirectional server-push use cases in web browsers — it works over HTTP/2, benefits from HTTP infrastructure (proxies, load balancers), and has automatic reconnect semantics built into the browser
- Do define event schemas in AsyncAPI or JSON Schema and validate inbound and outbound event payloads against them to catch schema drift before it reaches consumers
- Do implement exponential backoff with jitter for WebSocket and SSE reconnection to prevent thundering herd reconnection storms after a server restart or network partition
- Do expose per-consumer lag metrics (queue depth, delivery latency percentiles) so operations teams can detect backpressure conditions before they cause consumer failures

## Don't

- Don't use WebSocket for simple unidirectional push — SSE is simpler, works through HTTP proxies without configuration, and provides automatic reconnect, while WebSocket requires additional infrastructure support
- Don't send large binary payloads over WebSocket without framing and size limits — a single oversized message can exhaust server memory if not properly bounded
- Don't skip authentication on WebSocket upgrade requests — the initial HTTP handshake must validate credentials because subsequent messages will arrive without request headers
- Don't use MQTT QoS 0 (at most once) for critical messages where message loss is unacceptable — use QoS 1 or 2 based on the required delivery guarantee

## Case Study

**Figma**: Figma's real-time collaborative design editor uses WebSocket connections to synchronize canvas operations between all editors viewing the same file simultaneously. When a user moves an object or edits a shape, the operation is sent over WebSocket, transformed using operational transformation (OT) or CRDT algorithms to merge concurrent edits, and broadcast to all other connected clients within milliseconds. Figma's WebSocket infrastructure handles millions of simultaneous connections and supports collaborative sessions with dozens of concurrent editors without frame drops, demonstrating that WebSocket-based event-driven API design can power professional-grade real-time collaborative applications.

## Related Frameworks

- api-gateway-pattern (complement)
- api-security-patterns (complement)

## Source

https://sdframe.caldis.me/frameworks/event-driven-api-design
