# GoF Design Patterns / GoF 设计模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gang of Four (Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides), 1994, 1987
- **Adopters**: Netflix, Amazon, Google, Microsoft, Apple

23 classic creational, structural, behavioral design patterns

_23种经典的创建型、结构型、行为型设计模式_

## When to Use

Apply this framework when:
- Solving recurring design problems in object-oriented software with proven solutions
- Establishing a shared design vocabulary across a development team
- Decoupling systems by introducing abstraction layers for creation, structure, or behavior
- Evolving a codebase to handle new requirements without rewriting existing modules

## When NOT to Use

Stop and reconsider if:
- Simple CRUD applications where patterns add unnecessary abstraction layers
- Functional programming contexts where higher-order functions replace most behavioral patterns
- One-off scripts or automation tasks where design longevity is irrelevant
- Early-stage prototypes where premature pattern application slows exploration

## Core Concepts

- Creational Patterns: abstract the instantiation process to make systems independent of how objects are created (Factory Method, Abstract Factory, Builder, Prototype, Singleton)
- Structural Patterns: describe how classes and objects are composed to form larger structures (Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy)
- Behavioral Patterns: define how objects interact and distribute responsibility (Strategy, Observer, Command, Iterator, Mediator, State, Template Method, Visitor, Chain of Responsibility, Memento, Interpreter)
- Program to an interface, not an implementation: depend on abstract types so concrete classes can be swapped
- Favor composition over inheritance: assemble behavior by composing objects rather than extending class hierarchies

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying GoF Design Patterns to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify the design problem category**: is it about object creation (Creational), composition (Structural), or interaction (Behavioral)?
2. **Select candidate patterns**: match the problem to patterns like Factory, Strategy, Observer, Decorator, or Adapter based on the forces at play
3. **Study the pattern's structure**: understand participants (classes/interfaces), collaborations, and the consequences (trade-offs) of the pattern
4. **Implement with modern idioms**: adapt the classic pattern to your language's features (closures, generics, protocols) rather than copying Java-era UML
5. **Document pattern usage**: record in code comments or ADRs why the pattern was chosen and what alternatives were considered

<details><summary>中文步骤</summary>

1. 识别设计问题类别：是关于对象创建（创建型）、组合（结构型）还是交互（行为型）？
2. 选择候选模式：根据问题中的力量将其匹配到工厂、策略、观察者、装饰器或适配器等模式
3. 研究模式结构：理解参与者（类/接口）、协作方式以及模式的后果（权衡）
4. 用现代惯用法实现：将经典模式适配到你的语言特性（闭包、泛型、协议），而非照搬Java时代的UML
5. 记录模式使用：在代码注释或ADR中记录选择该模式的原因及考虑过的替代方案

</details>

## Do

- Do learn the intent of each pattern before memorizing its structure because understanding the 'why' prevents misapplication
- Do adapt patterns to your language's idioms because a Python Strategy pattern looks very different from a Java one
- Do combine patterns when needed because real-world problems often require Factory + Strategy or Decorator + Composite
- Do document which pattern you used and why because future maintainers need context to evolve the design

## Don't

- Don't force patterns where a simple function call suffices because over-engineering reduces readability
- Don't use Singleton as a global variable because it hides dependencies and makes testing difficult
- Don't apply patterns preemptively because YAGNI often applies — wait for the need to emerge
- Don't treat the 23 GoF patterns as exhaustive because many modern patterns (Null Object, Service Locator) emerged later

## Case Study

**Netflix**: Netflix extensively uses GoF patterns across its microservice ecosystem. The API Gateway employs the Facade pattern to simplify backend complexity for client devices, while the Hystrix library (now succeeded by Resilience4j) implemented the Command pattern to wrap every service call with circuit-breaking and fallback behavior. This pattern-driven approach has been key to achieving 99.99% availability.

## Related Frameworks

- solid-principles (prerequisite)
- grasp-patterns (complement)
- hexagonal-architecture (related)

## Source

https://sdframe.caldis.me/frameworks/gof-design-patterns
