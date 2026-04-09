# Publish-Subscribe Pattern / 发布-订阅模式

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: scalability, maintainability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: CORBA Event Service specification (OMG, 1994); popularized through JMS (Java Message Service, 1998) and academic distributed systems literature of the 1980s–1990s, 1987
- **Adopters**: Apache Kafka (LinkedIn, Confluent), RabbitMQ (Pivotal/VMware), AWS SNS/SQS, Google Cloud Pub/Sub, Redis Pub/Sub

Decoupled messaging pattern where publishers emit events to named topics and subscribers receive only the messages matching their subscriptions, eliminating direct coupling between producers and consumers

_解耦的消息传递模式，发布者将事件发送到命名主题，订阅者仅接收与其订阅匹配的消息，消除生产者与消费者之间的直接耦合_

## When to Use

Apply this framework when:
- When multiple independent services need to react to the same domain events without creating tight coupling between producer and consumer codebases
- When event fan-out is required — a single business event (OrderPlaced) must trigger actions in billing, inventory, notifications, and analytics simultaneously
- When producers and consumers have different scaling characteristics and must be independently deployed and scaled
- When building event-driven architectures that require audit trails, event replay, or temporal decoupling where consumers can process messages at their own pace
- When integrating heterogeneous systems (legacy and modern) that cannot share a direct API contract but can agree on a message schema

## When NOT to Use

Stop and reconsider if:
- Simple two-service integrations with no fan-out need: if only one consumer ever reads a producer's output, the broker overhead adds latency and operational complexity with no decoupling benefit over a direct API call
- Latency-sensitive synchronous workflows where the caller must block for an immediate response — pub/sub introduces queuing latency that makes it unsuitable for user-facing request/response paths under strict SLA requirements
- When message ordering across multiple topics is required — pub/sub brokers provide ordering within a partition or topic, not across topics, making it unsuitable for workflows requiring a guaranteed global event sequence
- Very small-scale systems where a shared database, a simple task queue, or direct service calls would suffice — pub/sub adds broker infrastructure, schema management, and consumer group coordination that may not be justified below a certain scale

## Core Concepts

- Topic (channel/subject): a named logical stream to which publishers write and from which subscribers read; topics act as the coordination point without either side knowing about the other
- Broker: the intermediary infrastructure (Kafka, RabbitMQ, SNS, Redis) that receives published messages, stores or routes them, and delivers them to matching subscribers
- Consumer group: a set of subscriber instances that collectively consume a topic's messages, each message delivered to exactly one member of the group — enabling horizontal scaling of message processing
- Delivery guarantees: at-most-once (fire-and-forget), at-least-once (acknowledge after processing), and exactly-once (idempotent processing or transactional consumers) — each involves different trade-offs in latency, complexity, and correctness
- Message schema and versioning: the contract between publisher and subscriber encoded as a message schema (JSON Schema, Avro, Protobuf); schema evolution must be handled carefully to avoid breaking existing consumers

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Publish-Subscribe Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define topics (or channels/subjects)**: identify the discrete event types or data streams in your system and give each a named topic; keep topics semantically narrow so subscribers can subscribe to exactly the events they care about
2. **Implement publishers**: decouple business logic from transport by having producers publish a message envelope (event type, payload, timestamp, correlation ID) to the broker topic without knowing which, if any, subscribers exist
3. **Configure the message broker**: choose a broker that matches your delivery guarantees (Kafka for ordered, durable, at-least-once; RabbitMQ/fanout for transient fire-and-forget; Redis Pub/Sub for in-memory low-latency); set retention, replication, and partition counts appropriate to your throughput
4. **Register subscribers**: each consumer declares its subscription to one or more topics, specifying a consumer group if competing consumers share load, or independent subscriptions if each consumer needs a full copy of every message
5. **Handle delivery semantics**: implement idempotent message processing in each subscriber so that at-least-once delivery does not corrupt state; use message deduplication keys or consumer offset tracking for exactly-once processing where required

<details><summary>中文步骤</summary>

1. 定义主题（或通道/科目）：识别系统中的离散事件类型或数据流，并为每个主题命名；保持主题语义上的狭窄性，以便订阅者可以精确订阅他们关心的事件
2. 实现发布者：通过让生产者向代理主题发布消息信封（事件类型、载荷、时间戳、关联 ID）来将业务逻辑与传输层解耦，无需知道是否存在订阅者
3. 配置消息代理：选择符合你的投递保证的代理（Kafka 用于有序、持久、至少一次；RabbitMQ/fanout 用于瞬时即发即弃；Redis Pub/Sub 用于内存低延迟）；设置适合你吞吐量的保留期、副本数和分区数
4. 注册订阅者：每个消费者声明其对一个或多个主题的订阅，若竞争消费者共享负载则指定消费者组，若每个消费者需要每条消息的完整副本则使用独立订阅
5. 处理投递语义：在每个订阅者中实现幂等消息处理，使至少一次投递不会破坏状态；在需要精确一次处理时，使用消息去重键或消费者偏移量跟踪

</details>

## Do

- Do design topics around business events rather than technical operations — name topics after domain facts (order.placed, payment.processed) so consumers understand the business intent without reading publisher code
- Do implement idempotent consumers: assign each message a unique ID and check for duplicates before processing, because all practical pub/sub systems deliver at-least-once and re-delivery is inevitable during failures or consumer restarts
- Do version your message schemas explicitly and adopt a compatibility strategy (backward, forward, or full) using a schema registry (Confluent Schema Registry, AWS Glue) to prevent silent data corruption as schemas evolve
- Do set retention policies and dead-letter topics: configure appropriate message TTL and a dead-letter queue to capture unprocessable messages so they can be inspected and replayed without blocking healthy message flow

## Don't

- Don't use pub/sub for request-reply interactions that require a synchronous response — the pattern is fundamentally asynchronous; use gRPC or REST for low-latency request/response and reserve pub/sub for fire-and-forget event notification
- Don't put large payloads directly in messages: message brokers are optimized for routing metadata, not bulk data transfer; store large objects in S3 or a database and include only a reference (claim-check pattern) in the message
- Don't create a single giant topic for all events — coarse-grained topics force consumers to receive and filter messages they don't need, wasting bandwidth and increasing processing cost; design topics to match consumer subscription granularity
- Don't ignore message ordering requirements: partitioned brokers like Kafka guarantee order only within a partition; if consumers require global ordering across all events, a single partition eliminates the scalability benefit of the pattern

## Case Study

**LinkedIn**: LinkedIn built Apache Kafka in 2010–2011 to solve a pub/sub problem at scale: each day, over 1 billion events (page views, searches, ad clicks, profile updates) needed to flow from dozens of producer services to separate consumer systems including Hadoop batch jobs, real-time monitoring, and the social graph update pipeline. The existing ActiveMQ-based system could not sustain the throughput without overwhelming brokers. Kafka's design — append-only partitioned log with consumer-controlled offsets — allowed each consumer group to maintain its own read position independently, enabling the news feed processor, the search indexer, and the analytics pipeline to all consume the same activity stream topics at different speeds and independently replay messages during failures. LinkedIn reported processing over 7 trillion messages per day on Kafka by 2015, a figure that grew to hundreds of trillions per day across the industry as Kafka became the de-facto standard for high-throughput pub/sub.

## Related Frameworks

- outbox-pattern (complement)
- backpressure-pattern (complement)
- cqrs-pattern (complement)
- gossip-protocol (related)

## Source

https://sdframe.caldis.me/frameworks/publish-subscribe-pattern
