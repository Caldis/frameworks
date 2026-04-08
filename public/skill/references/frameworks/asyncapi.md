# AsyncAPI / AsyncAPI异步API规范

- **Category**: api
- **Complexity**: intermediate
- **Quality**: usability, maintainability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Fran Mendez, 2017
- **Adopters**: Slack, Adidas, SAP, Salesforce, eBay

Specification standard for describing event-driven and asynchronous APIs

_用于描述事件驱动和异步API的规范标准_

## When to Use

Apply this framework when:
- When documenting event-driven architectures that use message brokers (Kafka, RabbitMQ, MQTT, NATS)
- When multiple teams produce and consume events and need a shared contract for message schemas
- When generating type-safe consumer and producer code from a specification to prevent schema drift
- When building developer portals for event-driven APIs that need the same discoverability as REST APIs have with OpenAPI

## When NOT to Use

Stop and reconsider if:
- Synchronous REST or GraphQL APIs where OpenAPI or the GraphQL schema already serves as the specification
- Simple webhook integrations where a lightweight payload schema is sufficient without full AsyncAPI ceremony
- Internal services with a single producer and consumer where direct schema sharing is simpler
- Early prototyping phases where event schemas change so rapidly that maintaining the spec creates friction

## Core Concepts

- Channels: Named communication paths (Kafka topics, AMQP queues, WebSocket paths) where messages are published and consumed
- Operations: Publish and subscribe semantics defined per channel, clarifying whether an application sends or receives messages on each channel
- Message Schemas: Strongly-typed message definitions using JSON Schema or Avro, with headers, payload, and optional correlation IDs for tracing
- Protocol Bindings: Protocol-specific configurations (Kafka consumer groups, MQTT QoS, AMQP exchanges) that extend the generic specification with implementation details
- Code Generation: AsyncAPI Generator produces documentation, client/server code, and mock brokers from the specification, similar to OpenAPI tooling for REST

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying AsyncAPI to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define the AsyncAPI document with info metadata, server connections (Kafka brokers, MQTT brokers, WebSocket URLs), and protocol bindings
2. Describe channels (topics/queues) with their publish and subscribe operations, specifying which messages flow in each direction
3. Define message schemas using JSON Schema or Avro, including headers, payload structure, and correlation IDs for request-reply patterns
4. Add protocol-specific bindings (Kafka partition keys, AMQP routing keys, MQTT QoS levels) to each channel and operation
5. Generate documentation, code, and mock servers from the specification using AsyncAPI Generator, and validate the spec with AsyncAPI Studio

<details><summary>中文步骤</summary>

1. 定义AsyncAPI文档，包含info元数据、服务器连接（Kafka代理、MQTT代理、WebSocket URL）和协议绑定
2. 描述通道（主题/队列）及其发布和订阅操作，指定每个方向的消息流
3. 使用JSON Schema或Avro定义消息模式，包括头部、负载结构和用于请求-回复模式的关联ID
4. 为每个通道和操作添加协议特定绑定（Kafka分区键、AMQP路由键、MQTT QoS级别）
5. 使用AsyncAPI Generator从规范生成文档、代码和模拟服务器，并使用AsyncAPI Studio验证规范

</details>

## Do

- Do adopt a spec-first approach where the AsyncAPI document is written before implementing producers and consumers because it serves as the team contract
- Do define protocol bindings explicitly because generic channel descriptions lose critical details like partition strategies and QoS levels
- Do version your AsyncAPI specs and use schema registries (Confluent Schema Registry, Apicurio) because event schema evolution needs the same rigor as REST API versioning
- Do generate documentation alongside code because event-driven APIs are harder to discover than REST endpoints without proper documentation

## Don't

- Don't use AsyncAPI to describe synchronous request-response APIs because OpenAPI is the appropriate standard for that pattern
- Don't skip message schema definitions because untyped event payloads cause silent consumer failures when producers evolve
- Don't ignore channel naming conventions because inconsistent topic/queue names create confusion across teams and environments
- Don't treat AsyncAPI as documentation only because its greatest value is in code generation and contract testing for event-driven systems

## Case Study

**Slack**: Slack adopted AsyncAPI to document its Events API and real-time messaging infrastructure that delivers billions of events daily. Before AsyncAPI, consumer teams relied on wiki pages and tribal knowledge to understand event schemas for workspace events (message.posted, channel.created, reaction.added). By standardizing on AsyncAPI 2.0 with JSON Schema payloads, Slack enabled automatic generation of type-safe event handlers in multiple languages and reduced event integration onboarding time for partner developers from weeks to days.

## Related Frameworks

- webhook-pattern (complement)
- openapi-specification (complement)
- grpc-protocol-buffers (alternative)

## Source

https://sdframe.caldis.me/frameworks/asyncapi
