# Saga Pattern / Saga 模式

- **Category**: architecture
- **Complexity**: advanced
- **Quality**: reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Hector Garcia-Molina and Kenneth Salem, 1987
- **Adopters**: Uber, Airbnb, Stripe, Booking.com, DoorDash

Manage distributed transactions via compensating actions

_通过补偿动作管理分布式事务，保障跨服务数据一致性_

## When to Use

Apply this framework when:
- When a business process spans multiple microservices and requires all-or-nothing semantics
- When distributed transactions (2PC) are not feasible due to latency or service autonomy requirements
- When you need compensating logic to undo partial work in case of failures
- When order processing, booking, or payment flows involve multiple independent services

## When NOT to Use

Stop and reconsider if:
- Operations that can fit within a single ACID transaction boundary
- Systems where the business can tolerate partial completion without compensation
- Extremely low-latency paths where saga coordination overhead is unacceptable

## Core Concepts

- Compensating transaction: A reverse operation that semantically undoes a previously committed local transaction
- Orchestration: A central saga coordinator directs each participant and handles failure routing
- Choreography: Each service listens for events and decides independently whether to proceed or compensate
- Semantic rollback: Unlike database rollback, compensation may not restore exact original state but achieves business equivalence
- Saga execution coordinator (SEC): Tracks saga state and ensures all steps complete or all compensations execute

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Saga Pattern to?
- What constraints or existing architecture do you need to work within?
- Has your team used Saga Pattern before? (This is an advanced framework)

## Implementation Steps

1. **Identify the distributed transaction**: map all services involved and the sequence of local transactions each must perform
2. **Choose orchestration vs. choreography**: use a central saga orchestrator for complex flows, or event-driven choreography for simpler chains
3. **Define compensating actions**: for each step, implement a reverse operation that undoes the effect if a later step fails
4. **Implement idempotency**: ensure each step and its compensation can be safely retried without side effects using idempotency keys
5. **Add observability and timeout handling**: track saga state transitions, set step timeouts, and alert on stuck or failed sagas for manual resolution

<details><summary>中文步骤</summary>

1. 识别分布式事务：映射所有涉及的服务以及每个服务必须执行的本地事务序列
2. 选择编排与协调模式：复杂流程使用中央Saga编排器，简单链路使用事件驱动的协调模式
3. 定义补偿动作：为每个步骤实现反向操作，在后续步骤失败时撤销该步骤的效果
4. 实现幂等性：使用幂等键确保每个步骤及其补偿操作可安全重试而无副作用
5. 添加可观测性和超时处理：追踪Saga状态转换，设置步骤超时，对卡住或失败的Saga发出告警以便人工处理

</details>

## Do

- Do design compensating actions for every forward step before implementation because retrofitting compensations is error-prone
- Do make each step and compensation idempotent because network failures will cause retries
- Do use a saga state machine to track progress because it simplifies debugging and recovery
- Do set timeouts on each saga step because hung steps can block the entire business process

## Don't

- Don't assume compensations will always succeed because they can fail too, requiring retry queues and manual intervention plans
- Don't use sagas for operations that can be done in a single database transaction because the complexity is unnecessary
- Don't ignore the visibility problem because without saga-level tracing, failures are invisible to operations teams
- Don't mix choreography and orchestration in the same saga because it makes the flow extremely hard to reason about

## Case Study

**Uber**: Uber uses the saga pattern to coordinate its ride-booking flow across multiple microservices including matching, pricing, payment, and driver notification. When a ride is requested, each service executes its local transaction and emits an event. If payment fails after a driver has been matched, a compensating action releases the driver back to the available pool and notifies the rider. Uber's saga orchestrator (built on Cadence, later Temporal) processes millions of ride sagas daily with exactly-once semantics.

## Related Frameworks

- eda (prerequisite)
- cqrs-pattern (complement)
- circuit-breaker-pattern (complement)
- microservices-decomposition (complement)

## Source

https://sdframe.caldis.me/frameworks/saga-pattern
