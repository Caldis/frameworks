# Actor Model / Actor 模型

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: scalability, reliability
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Carl Hewitt, Peter Bishop, Richard Steiger, 1973
- **Adopters**: Ericsson, WhatsApp, Discord, Microsoft (Orleans), Lightbend (Akka)

Concurrent computation using message-passing actors

_通过消息传递的 Actor 实现并发计算模型_

## When to Use

Apply this framework when:
- When building highly concurrent systems that need to manage millions of lightweight concurrent entities
- When designing fault-tolerant systems that must self-heal from component failures
- When shared-memory concurrency (locks, mutexes) becomes too error-prone or bottlenecked
- When building distributed systems that need location-transparent communication between components

## When NOT to Use

Stop and reconsider if:
- Simple sequential programs that don't require concurrency or distribution
- CPU-bound computations that benefit more from parallel data processing than message-passing
- Systems with very strict latency requirements where message routing overhead is unacceptable

## Core Concepts

- Actor: A fundamental unit of computation that encapsulates state, behavior, and a mailbox for receiving messages
- Message passing: Actors communicate exclusively through asynchronous, immutable messages with no shared state
- Supervision tree: Hierarchical fault handling where parent actors define recovery strategies for child actor failures
- Location transparency: Actors communicate through addresses that abstract away whether the target is local or remote
- Let it crash: Rather than defensive error handling everywhere, let actors fail and rely on supervisors to restart them

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Actor Model to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify concurrency boundaries**: map system components that need to operate independently and communicate asynchronously
2. **Design actors**: define each actor's state, behavior, and the set of messages it can receive and send
3. **Implement message passing**: use an actor framework (Akka, Orleans, Erlang/OTP) to handle mailboxes, scheduling, and delivery guarantees
4. **Design supervision hierarchies**: define parent-child relationships where supervisors decide restart, stop, or escalate strategies on child failure
5. **Test for message ordering and deadlocks**: verify that the system handles out-of-order delivery, mailbox overflow, and actor lifecycle correctly

<details><summary>中文步骤</summary>

1. 识别并发边界：映射需要独立运行并异步通信的系统组件
2. 设计Actor：定义每个Actor的状态、行为以及可接收和发送的消息集合
3. 实现消息传递：使用Actor框架（Akka、Orleans、Erlang/OTP）处理邮箱、调度和投递保证
4. 设计监督层级：定义父子关系，由监督者决定子Actor失败时的重启、停止或升级策略
5. 测试消息顺序和死锁：验证系统正确处理乱序投递、邮箱溢出和Actor生命周期

</details>

## Do

- Do keep actor state private and communicate only through messages because shared state defeats the concurrency model
- Do design fine-grained actors with single responsibilities because coarse-grained actors become concurrency bottlenecks
- Do use supervision hierarchies to handle failures because actors will crash and need systematic recovery
- Do make messages immutable and serializable because they may cross thread, process, or network boundaries

## Don't

- Don't block inside actors with synchronous I/O because it defeats the asynchronous concurrency model
- Don't create too few, too large actors because it reintroduces the bottleneck problems actors solve
- Don't rely on message ordering between different actors because the model guarantees order only between a specific sender-receiver pair
- Don't expose actor internal state through shared references because it creates race conditions

## Case Study

**Ericsson (WhatsApp)**: WhatsApp used Erlang/OTP's actor model to build its messaging backend, enabling a team of just 50 engineers to support 900 million users at the time of the Facebook acquisition. Each user connection was represented as a lightweight Erlang process (actor) consuming only about 2KB of memory. The supervision tree architecture meant that individual connection failures were isolated and automatically restarted without affecting other users, achieving 99.99% uptime.

## Related Frameworks

- eda (complement)
- reactive-extensions (related)
- agent-communication-protocol (related)

## Source

https://sdframe.caldis.me/frameworks/actor-model
