# SOLID Principles / SOLID 原则

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Robert C. Martin, 2000, 1988
- **Adopters**: Microsoft, Google, Spotify, Thoughtworks, JetBrains

Five OOP design principles for maintainable, flexible code

_面向对象设计的五大原则，打造可维护、灵活的代码_

## When to Use

Apply this framework when:
- Designing object-oriented systems that need to evolve over time
- Refactoring legacy codebases to improve modularity and testability
- Establishing coding standards for a team working on shared libraries
- Building plugin-based architectures that require extensibility

## When NOT to Use

Stop and reconsider if:
- Throwaway prototypes or spike experiments where speed matters more than design quality
- Very small scripts or single-file utilities with no anticipated future changes
- Performance-critical inner loops where abstraction layers add unacceptable overhead
- Functional programming codebases where SOLID's OOP assumptions do not apply

## Core Concepts

- Single Responsibility Principle: a class should have only one reason to change, aligning each module with a single actor or stakeholder
- Open/Closed Principle: software entities should be open for extension but closed for modification, enabling new behavior without touching existing code
- Liskov Substitution Principle: objects of a superclass should be replaceable with objects of a subclass without breaking program correctness
- Interface Segregation Principle: clients should not be forced to depend on interfaces they do not use
- Dependency Inversion Principle: high-level modules should depend on abstractions, not on low-level concrete implementations

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying SOLID Principles to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Single Responsibility**: ensure each class or module has exactly one reason to change by isolating concerns into separate units
2. **Open/Closed**: design modules that are open for extension (via interfaces, plugins) but closed for modification of existing code
3. **Liskov Substitution**: verify that subtypes can replace their base types without altering the correctness of the program
4. **Interface Segregation**: split large interfaces into smaller, client-specific ones so implementers are not forced to depend on unused methods
5. **Dependency Inversion**: depend on abstractions rather than concrete implementations; inject dependencies through constructors or configuration

<details><summary>中文步骤</summary>

1. 单一职责：确保每个类或模块只有一个变更原因，将关注点隔离到独立单元中
2. 开闭原则：设计对扩展开放（通过接口、插件）但对现有代码修改封闭的模块
3. 里氏替换：验证子类型可以替换其基类型而不改变程序的正确性
4. 接口隔离：将大接口拆分为更小的客户端专用接口，避免实现者依赖未使用的方法
5. 依赖倒置：依赖抽象而非具体实现；通过构造函数或配置注入依赖

</details>

## Do

- Do favor composition over inheritance because it naturally aligns with SRP and reduces tight coupling
- Do define interfaces from the client's perspective because this ensures ISP compliance
- Do inject dependencies through constructors because it makes classes testable and explicit about their needs
- Do apply SOLID incrementally during refactoring because premature abstraction adds unnecessary complexity

## Don't

- Don't create god classes that handle multiple unrelated responsibilities because they become change magnets
- Don't violate LSP by throwing unexpected exceptions in subclasses because callers rely on base type contracts
- Don't build fat interfaces that force implementers to write empty stub methods because it creates confusing APIs
- Don't apply SOLID dogmatically to simple scripts because the overhead outweighs the benefits in small codebases

## Case Study

**Spotify**: Spotify's backend squad model relies heavily on SOLID principles. Each microservice is designed with single responsibility in mind, and dependency inversion allows squads to swap out infrastructure adapters (e.g., switching message brokers) without modifying core domain logic. This architectural discipline enables over 200 squads to deploy independently multiple times per day.

## Related Frameworks

- clean-code-principles (complement)
- grasp-patterns (complement)
- dependency-injection (complement)

## Source

https://sdframe.caldis.me/frameworks/solid-principles
