# Command Pattern / 命令模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- **Adopters**: Microsoft Word / Office, Eclipse IDE, Git (commits as commands), Apache Kafka (log as command store)

Encapsulate a request as an object for undo, queue, or logging

_将请求封装为对象，从而支持撤销、排队或日志记录等操作_

## When to Use

Apply this framework when:
- You need undoable operations — encapsulating each action with an undo() method enables a full undo/redo history
- Operations must be queued, scheduled, or transmitted across a network as serializable objects
- An AI agent needs to plan, validate, and selectively execute or roll back a sequence of actions

## When NOT to Use

Stop and reconsider if:
- Simple request-response flows with no need for undo, queuing, or logging overhead
- High-frequency operations (millions per second) where object allocation per-command is a measurable bottleneck
- Purely functional codebases where immutable data transformations are already first-class and eliminate the need for Command objects

## Core Concepts

- Command object: encapsulates an operation as a first-class object, decoupling the sender from the receiver and the timing of execution
- Invoker: triggers command execution and can maintain a command history for undo/redo, retry, or audit logging
- Receiver: the object that knows how to perform the actual work; commands delegate to it, keeping themselves thin

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Command Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the Command interface**: declare an execute() method (and optionally undo()) that all command objects must implement
2. **Implement Concrete Commands**: create one class per operation, storing the Receiver reference and any parameters needed to carry out the action
3. **Build the Invoker**: hold a Command reference (or queue), call execute() at the appropriate time, and optionally maintain a history stack for undo
4. **Configure the Receiver**: the Receiver contains the actual business logic; Concrete Commands delegate to it rather than implementing the operation themselves
5. **Compose macro commands**: combine multiple Commands into a CompositeCommand to execute complex workflows atomically or with unified undo support

<details><summary>中文步骤</summary>

1. 定义命令接口：声明所有命令对象必须实现的 execute() 方法（以及可选的 undo()）
2. 实现具体命令：为每个操作创建一个类，存储接收者引用和执行操作所需的任何参数
3. 构建调用者：持有命令引用（或队列），在适当时机调用 execute()，并可选地维护用于撤销的历史栈
4. 配置接收者：接收者包含实际的业务逻辑；具体命令委托给它而非自己实现操作
5. 组合宏命令：将多个命令组合成复合命令，以原子方式或统一撤销支持执行复杂工作流

</details>

## Do

- Do implement undo() alongside execute() from the start if reversibility is a requirement — retrofitting it later is painful
- Do keep Command objects immutable and serializable so they can be logged, transmitted, and replayed reliably
- Do use Command queues for rate limiting, retry logic, and background processing to decouple production from consumption

## Don't

- Don't put business logic in the Command itself — delegate to the Receiver and keep the Command as a thin action descriptor
- Don't create a Command class for every single trivial method call; overhead is only justified when queuing, undo, or logging is needed
- Don't neglect failure handling in undo() — a partial undo that leaves the system in an inconsistent state is worse than no undo

## Case Study

**Microsoft Word**: Microsoft Word's undo/redo system is a canonical Command pattern implementation. Every user action — typing a character, changing font size, inserting an image — is encapsulated as a Command object stored in a history stack. Ctrl+Z pops and calls undo(); Ctrl+Y pushes and calls execute() again. This architecture allows Word to maintain a 100-step undo history across arbitrarily complex nested formatting operations, and the same Command objects are reused for macro recording and the Track Changes feature.

## Related Frameworks

- strategy-pattern (related)
- observer-pattern (related)
- solid-principles (complement)

## Source

https://sdframe.caldis.me/frameworks/command-pattern
