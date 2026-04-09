# Coding Practices / 编码实践

Implementation-level design — structuring code, managing complexity, writing maintainable software.

实现层面的设计——代码结构、复杂性管理、可维护软件编写。

**46 frameworks** in this category.

## Frameworks

### SOLID Principles / SOLID 原则
- **Slug**: solid-principles
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Robert C. Martin, 2000
- Five OOP design principles for maintainable, flexible code

### GRASP Patterns / GRASP 模式
- **Slug**: grasp-patterns
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Craig Larman, 2004
- Nine patterns for assigning responsibility to classes properly

### GoF Design Patterns / GoF 设计模式
- **Slug**: gof-design-patterns
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Gang of Four (Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides), 1994
- 23 classic creational, structural, behavioral design patterns

### Clean Code Principles / 整洁代码原则
- **Slug**: clean-code-principles
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Robert C. Martin, 2008
- Write readable, simple, expressive code that minimizes surprise

### DDD Tactical Patterns / DDD 战术模式
- **Slug**: ddd-tactical-patterns
- **Complexity**: advanced
- **Quality**: maintainability
- **Author**: Eric Evans, 2003
- Implementation building blocks: entities, value objects, aggregates

### Hexagonal Architecture / 六边形架构
- **Slug**: hexagonal-architecture
- **Complexity**: advanced
- **Quality**: testability, maintainability
- **Author**: Alistair Cockburn, 2005
- Isolate core logic from external concerns via ports and adapters

### Functional Core / Imperative Shell / 函数式核心 / 命令式外壳
- **Slug**: functional-core-imperative-shell
- **Complexity**: intermediate
- **Quality**: testability, maintainability
- **Author**: Gary Bernhardt, 2012
- Pure logic in the center, side effects only at the boundaries

### Reactive Extensions (Rx) / 响应式扩展（Rx）
- **Slug**: reactive-extensions
- **Complexity**: advanced
- **Quality**: performance, scalability
- **Author**: Erik Meijer, 2009
- Compose async event streams with observable sequences and operators

### Richardson Maturity Model / Richardson 成熟度模型
- **Slug**: richardson-maturity-model
- **Complexity**: intermediate
- **Quality**: maintainability, usability
- **Author**: Leonard Richardson, 2008
- Four levels of REST API maturity from RPC to hypermedia

### Event Sourcing Pattern / 事件溯源模式
- **Slug**: event-sourcing-pattern
- **Complexity**: advanced
- **Quality**: reliability, maintainability
- **Author**: Greg Young, 2005
- Persist state as an immutable append-only sequence of events

### Prompt Engineering Patterns / 提示工程模式
- **Slug**: prompt-engineering-patterns
- **Complexity**: beginner
- **Quality**: usability, reliability
- **Author**: Jason Wei, Xuezhi Wang et al. (Google Brain), 2022
- Structured techniques for crafting effective LLM prompts

### Tool-Use / ReAct Pattern / 工具使用 / ReAct 模式
- **Slug**: tool-use-react-pattern
- **Complexity**: advanced
- **Quality**: reliability
- **Author**: Shunyu Yao, Jeffrey Zhao et al. (Princeton/Google Brain), 2022
- Enable LLM agents to call external tools in reasoning loops

### Conventional Comments / 约定式评论
- **Slug**: conventional-comments
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Paul Slaughter, 2020
- Prefixed code review comments for clarity and actionability

### Semantic Versioning (SemVer) / 语义化版本控制
- **Slug**: semantic-versioning
- **Complexity**: beginner
- **Quality**: maintainability, reliability
- **Author**: Tom Preston-Werner, 2011
- Version APIs and libraries with MAJOR.MINOR.PATCH semantics

### Contract Testing / 契约测试
- **Slug**: contract-testing
- **Complexity**: intermediate
- **Quality**: reliability, testability
- **Author**: Ian Robinson, Martin Fowler, 2006
- Verify service interactions via shared consumer-provider contracts

### Strangler Fig at Code Level / 代码级绞杀者模式
- **Slug**: strangler-fig-at-code-level
- **Complexity**: advanced
- **Quality**: maintainability
- **Author**: Martin Fowler, 2004; Michael Feathers, 2004
- Incrementally replace legacy code modules by wrapping them and redirecting calls to new implementations

### Feature Toggles at Code Level / 代码级功能开关
- **Slug**: feature-toggles-at-code-level
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Martin Fowler, 2010; Pete Hodgson, 2017
- Control code execution paths using conditional branching to enable or disable features without redeployment

### Immutability Pattern / 不可变性模式
- **Slug**: immutability-pattern
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Author**: John Ousterhout, 2018; Rich Hickey, 2007
- Prefer immutable data structures to eliminate shared mutable state and improve safety, concurrency, and reasoning

### Null Object Pattern / 空对象模式
- **Slug**: null-object-pattern
- **Complexity**: beginner
- **Quality**: reliability, maintainability
- **Author**: Bobby Woolf, 1998; Martin Fowler, 2018
- Eliminate null checks by providing default-behavior objects that implement the expected interface with no-op or safe defaults

### Type-Driven Design / 类型驱动设计
- **Slug**: type-driven-design
- **Complexity**: advanced
- **Quality**: reliability, maintainability
- **Author**: John Ousterhout, 2018; Scott Wlaschin, 2018
- Use the type system to encode business rules and constraints, making invalid states unrepresentable at compile time

### Strategy Pattern / 策略模式
- **Slug**: strategy-pattern
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- Encapsulate interchangeable algorithms behind a common interface

### Observer Pattern / 观察者模式
- **Slug**: observer-pattern
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- Notify dependents automatically when state changes

### Factory Method Pattern / 工厂方法模式
- **Slug**: factory-method-pattern
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- Delegate object creation to subclasses

### Abstract Factory Pattern / 抽象工厂模式
- **Slug**: abstract-factory-pattern
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- Create families of related objects without specifying concrete classes

### Decorator Pattern / 装饰器模式
- **Slug**: decorator-pattern
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- Attach additional responsibilities to objects dynamically

### Adapter Pattern / 适配器模式
- **Slug**: adapter-pattern
- **Complexity**: intermediate
- **Quality**: maintainability, portability
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- Convert one interface to another that clients expect

### Singleton Pattern / 单例模式
- **Slug**: singleton-pattern
- **Complexity**: beginner
- **Quality**: reliability, maintainability
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- Ensure a class has only one instance with a global access point

### Command Pattern / 命令模式
- **Slug**: command-pattern
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- Encapsulate a request as an object for undo, queue, or logging

### Template Method Pattern / 模板方法模式
- **Slug**: template-method-pattern
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- Define algorithm skeleton in base class, let subclasses override specific steps

### State Pattern / 状态模式
- **Slug**: state-pattern
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- Allow object behavior to change automatically when its internal state changes

### Repository Pattern / 仓储模式
- **Slug**: repository-pattern
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Author**: Martin Fowler, 2002
- Mediate between domain model and data mapping layers using a collection-like interface

### Unit of Work Pattern / 工作单元模式
- **Slug**: unit-of-work-pattern
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Author**: Martin Fowler, 2002
- Track object changes during a business transaction and commit them as a single atomic batch

### Data Mapper Pattern / 数据映射器模式
- **Slug**: data-mapper-pattern
- **Complexity**: advanced
- **Quality**: maintainability, testability
- **Author**: Martin Fowler, 2002
- Transfer data between in-memory objects and a database while keeping them independent of each other

### Builder Pattern / 构建器模式
- **Slug**: builder-pattern
- **Complexity**: beginner
- **Quality**: maintainability, usability
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- Construct complex objects step by step using a fluent API, separating construction from representation

### Middleware / Pipeline Pattern / 中间件/管道模式
- **Slug**: middleware-pipeline-pattern
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Community practice; popularized by TJ Holowaychuk (Express.js / Koa), 2010s
- Chain processing steps that can inspect, transform, or short-circuit a request as it flows through a pipeline

### Strangler Fig at Code Level / 代码层面的绞杀者模式
- **Slug**: strangler-fig-code-level
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Author**: Martin Fowler
- Gradually replacing legacy code modules by growing new implementations alongside old ones until the legacy can be safely removed

### Vertical Slice Architecture / 垂直切片架构
- **Slug**: vertical-slice-architecture
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Author**: Jimmy Bogard
- Organizing code by feature rather than by technical layer, grouping all code for a feature — from HTTP handler to database query — in a single cohesive slice

### Specification Pattern / 规格模式
- **Slug**: specification-pattern
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Author**: Eric Evans
- Encapsulating business rules as composable, reusable objects that can be combined with boolean logic to express complex domain predicates

### Flyweight Pattern / 享元模式
- **Slug**: flyweight-pattern
- **Complexity**: intermediate
- **Quality**: performance, maintainability
- **Author**: Gang of Four
- GoF structural pattern that minimises memory usage by sharing fine-grained objects whose state can be externalised, enabling large numbers of similar objects to be represented efficiently.

### Data Transfer Object (DTO) / 数据传输对象（DTO）
- **Slug**: data-transfer-object
- **Complexity**: beginner
- **Quality**: performance, maintainability
- **Author**: Martin Fowler, "Patterns of Enterprise Application Architecture", 2002
- A simple object that carries data between processes or layers, containing no business logic — its sole purpose is to reduce the number of method calls by bundling data into a single transfer unit

### DRY (Don't Repeat Yourself) / DRY 原则（不要重复自己）
- **Slug**: dry-principle
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Andy Hunt & Dave Thomas, 1999
- Every piece of knowledge must have a single, unambiguous, authoritative representation within a system. When you find yourself writing the same code in two places, extract it into one canonical source.

### KISS (Keep It Simple, Stupid) / KISS 原则（保持简单，不要复杂）
- **Slug**: kiss-principle
- **Complexity**: beginner
- **Quality**: maintainability, usability
- **Author**: Kelly Johnson, Lockheed Skunk Works, 1960s
- Most systems work best if they are kept simple rather than made complicated. Complexity is the enemy of reliability. Design the simplest thing that could possibly work, and resist the temptation to add cleverness.

### YAGNI (You Aren't Gonna Need It) / YAGNI 原则（你不会用到它的）
- **Slug**: yagni-principle
- **Complexity**: beginner
- **Quality**: maintainability, performance
- **Author**: Ron Jeffries, Extreme Programming community, late 1990s
- Always implement things when you actually need them, never when you just foresee that you might need them. Premature generalization is as harmful as premature optimization.

### Composition over Inheritance / 组合优于继承
- **Slug**: composition-over-inheritance
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Author**: Gang of Four (Gamma, Helm, Johnson, Vlissides), 1994
- Favor object composition over class inheritance to achieve code reuse and polymorphism. Inheritance creates tight coupling between parent and child classes; composition assembles behavior from interchangeable parts, making systems more flexible and testable.

### Law of Demeter (Principle of Least Knowledge) / 迪米特得法则（最少知识原则）
- **Slug**: law-of-demeter
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Author**: Karl Lieberherr, Ian Holland, Arthur Riel — Northeastern University, 1987
- A module should not know about the internal workings of the objects it manipulates. An object should only call methods on: itself, its parameters, objects it creates, and its direct component objects — never on objects returned by those calls.

### Active Record Pattern / 活动记录模式
- **Slug**: active-record-pattern
- **Complexity**: beginner
- **Quality**: usability, maintainability
- **Author**: Martin Fowler, 2002
- Domain object that wraps a database row and encapsulates CRUD logic within itself
