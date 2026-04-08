# Event-Driven Architecture (EDA) / 事件驱动架构

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: scalability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Concept has roots in publish-subscribe systems; popularized by Gregor Hohpe and Bobby Woolf, 2003, 1987
- **Adopters**: LinkedIn, Netflix, Uber, Airbnb, Shopify

Systems communicate via asynchronous events for loose coupling

_系统通过异步事件通信，实现松耦合_

## When to Use

Apply this framework when:
- When multiple services need to react to the same business event independently
- When you need to decouple producers from consumers to allow independent deployment and scaling
- When building real-time data pipelines that process streams of events
- When system components have different processing speeds and need buffering via queues

## When NOT to Use

Stop and reconsider if:
- Simple request-response interactions where synchronous communication is more straightforward
- Systems requiring strict real-time consistency where eventual consistency is unacceptable
- Small monolithic applications where the overhead of an event broker is unjustified

## Core Concepts

- Event: An immutable record of something that happened in the system, carrying relevant data
- Event broker: Infrastructure (Kafka, RabbitMQ, SNS/SQS) that routes events from producers to consumers
- Choreography: Services react to events autonomously without a central coordinator
- Orchestration: A central component directs the flow by sending commands and listening for events
- Idempotency: Consumers must handle duplicate event delivery gracefully using idempotency keys

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Event-Driven Architecture (EDA) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify domain events**: meaningful state changes that other parts of the system need to react to
2. Design event schemas with versioning strategy; choose event broker (Kafka, RabbitMQ, EventBridge)
3. Implement event producers that publish events on state change and consumers that subscribe to relevant topics
4. Define event choreography vs. orchestration: decide where coordination logic lives (in events vs. a central saga)
5. **Establish observability**: event tracing, dead-letter queues, idempotency keys, and replay capabilities for resilience

<details><summary>中文步骤</summary>

1. 识别领域事件：系统其他部分需要响应的有意义的状态变更
2. 设计带有版本策略的事件模式；选择事件代理（Kafka、RabbitMQ、EventBridge）
3. 实现在状态变更时发布事件的生产者和订阅相关主题的消费者
4. 定义事件编排与事件协调：决定协调逻辑的归属（事件本身还是中央Saga）
5. 建立可观测性：事件追踪、死信队列、幂等键和回放能力以保障弹性

</details>

## Do

- Do define a clear event schema registry and versioning strategy because schema evolution is inevitable
- Do implement dead-letter queues for every consumer because unprocessable events need a safe landing zone
- Do design events as facts about what happened rather than commands because it preserves loose coupling
- Do build replay capability because it enables recovery from consumer bugs and supports new projections

## Don't

- Don't put too much data in events because large event payloads create coupling and bandwidth issues
- Don't assume ordered delivery across partitions because most brokers only guarantee order within a partition
- Don't create circular event dependencies because they cause infinite loops and are extremely hard to debug
- Don't skip correlation IDs because without them tracing a business transaction across services is nearly impossible

## Case Study

**LinkedIn**: LinkedIn built Apache Kafka to solve their data integration challenge of connecting hundreds of microservices. Before Kafka, point-to-point integrations created a brittle mesh of dependencies. By moving to an event-driven architecture with Kafka as the central nervous system, LinkedIn processes over 7 trillion messages per day. This architecture enabled features like real-time activity feeds, recommendation engines, and monitoring systems to all consume the same event streams independently.

## Related Frameworks

- cqrs-pattern (complement)
- event-sourcing-pattern (complement)
- saga-pattern (extends)
- microservices-decomposition (complement)

## Source

https://sdframe.caldis.me/frameworks/eda
