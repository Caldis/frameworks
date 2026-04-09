# Law of Demeter (Principle of Least Knowledge) / 迪米特得法则（最少知识原则）

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Karl Lieberherr, Ian Holland, Arthur Riel — Northeastern University, 1987, undefined
- **Adopters**: Java 最佳实践（Spring、JPA）, C# / .NET, Python, Ruby on Rails, AWS SDK v2

A module should not know about the internal workings of the objects it manipulates. An object should only call methods on: itself, its parameters, objects it creates, and its direct component objects — never on objects returned by those calls.

_模块不应该了解其操作对象的内部运作。一个对象只应调用：它自身、它的参数、它创建的对象以及它直接的组件对象的方法——而不是这些调用返回的对象。_

## When to Use

Apply this framework when:
_No data available._

## When NOT to Use

Stop and reconsider if:
_No data available._

## Core Concepts

- Coupling
- Encapsulation
- Tell, Don't Ask
- Information Hiding
- Structural Coupling

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Law of Demeter (Principle of Least Knowledge) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Review each method call chain (a.b().c().d()) and flag violations
2. Identify what knowledge is being reached through the chain
3. Add a method to the intermediate object that performs the required operation internally
4. Have the caller invoke that new method instead of traversing the chain
5. Verify the caller no longer knows about the internal structure

<details><summary>中文步骤</summary>

1. 审查每个方法调用链（a.b().c().d()）并标记违规
2. 识别通过调用链访问了什么知识
3. 向中间对象添加一个在内部执行所需操作的方法
4. 让调用方调用该新方法而非遍历调用链
5. 验证调用方不再知道内部结构

</details>

## Do

- Add 「tell」 methods to intermediate objects that encapsulate the traversal
- Use the 「Tell, Don't Ask」 principle to command objects rather than query their internals
- Keep object graphs shallow — deep graphs signal design problems
- Design APIs that return value objects or DTOs instead of exposing internal references
- Write unit tests that expose chain violations by requiring complex mock setups

## Don't

- Don't write 「train wrecks」: a.getB().getC().doSomething()
- Don't expose internal collections directly — return views or copies
- Don't violate LoD just for convenience in scripts or one-off code
- Don't confuse LoD with avoiding all chaining — fluent builders on the same object are fine
- Don't add trivial delegate methods just to satisfy the law — use judgment

## Case Study

**Amazon (AWS SDK)**: The AWS SDK v2 for Java was redesigned with LoD in mind. The v1 SDK exposed deeply nested configuration objects, leading to call chains like client.getConfig().getCredentials().getAWSAccessKeyId(). SDK v2 replaced this with immutable builder objects and explicit credential providers, so callers interact only with the top-level client. This made the SDK far easier to mock in unit tests and eliminated coupling to internal AWS service structures.

## Related Frameworks

- solid-principles (complement)
- clean-code-principles (complement)
- strategy-pattern (related)

## Source

https://sdframe.caldis.me/frameworks/law-of-demeter
