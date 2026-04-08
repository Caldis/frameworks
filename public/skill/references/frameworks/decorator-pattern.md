# Decorator Pattern / 装饰器模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- **Adopters**: Java I/O Streams, Python (built-in @decorator), ASP.NET Core Middleware, Express.js

Attach additional responsibilities to objects dynamically

_动态地为对象添加额外职责，是子类化扩展功能的灵活替代方案_

## When to Use

Apply this framework when:
- You need to add responsibilities to individual objects without affecting others of the same class
- Subclassing would produce an explosion of classes to cover every possible feature combination
- Behaviors need to be layered or stacked in different orders at runtime (e.g., logging + caching + auth on an HTTP handler)

## When NOT to Use

Stop and reconsider if:
- When the component interface is large and implementing it fully in every decorator is burdensome
- When the order of decoration is complex and error-prone, and a Strategy or Chain of Responsibility is clearer
- Simple classes with one or two known extension points where straightforward subclassing is more readable

## Core Concepts

- Wrapping: a decorator holds a reference to the component it wraps and forwards calls to it, adding behavior around the delegation
- Transparent interface: because decorators implement the same interface as the component, clients cannot tell whether they hold a raw component or a stack of decorators
- Open/Closed compliance: new behaviors are added by writing new decorators, never by modifying existing component or decorator code

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Decorator Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the Component interface**: establish the interface that both concrete components and decorators implement, ensuring they are interchangeable
2. **Implement the Concrete Component**: create the base object providing the core behavior to be decorated
3. **Create the abstract Decorator**: implement the Component interface, hold a reference to a Component, and delegate all calls to it by default
4. **Implement Concrete Decorators**: subclass the abstract Decorator and override methods to add behavior before or after delegating to the wrapped component
5. **Compose at runtime**: wrap components in one or more decorators in any order to achieve the desired combination of behaviors

<details><summary>中文步骤</summary>

1. 定义组件接口：建立具体组件和装饰器都实现的接口，确保它们可互换
2. 实现具体组件：创建提供要被装饰的核心行为的基础对象
3. 创建抽象装饰器：实现组件接口，持有组件引用，默认将所有调用委托给它
4. 实现具体装饰器：对抽象装饰器进行子类化，重写方法以在委托给被包装组件前后添加行为
5. 在运行时组合：以任意顺序将组件包装在一个或多个装饰器中，实现所需的行为组合

</details>

## Do

- Do ensure decorators are truly transparent by fully implementing the component interface, including edge-case methods
- Do keep each decorator focused on a single concern (logging, caching, auth) to maintain composability
- Do order decorators intentionally — the sequence matters when behaviors interact (e.g., cache before auth vs after)

## Don't

- Don't use Decorator when the class hierarchy is stable and one or two subclasses would suffice
- Don't create deeply nested decorator stacks without documenting the intended order, as debugging them is difficult
- Don't break the component interface in a decorator by adding public methods that clients are expected to call directly

## Case Study

**Java I/O**: Java's java.io package is the most cited real-world Decorator implementation. Reading a gzip-compressed file over a network uses a chain: new GZIPInputStream(new BufferedInputStream(new FileInputStream(file))). Each wrapper adds one capability — buffering, decompression — to the underlying InputStream. The consuming code reads from InputStream regardless of how many decorators are stacked, demonstrating transparent composability that would have required dozens of subclasses without the pattern.

## Related Frameworks

- solid-principles (complement)
- adapter-pattern (related)
- strategy-pattern (related)

## Source

https://sdframe.caldis.me/frameworks/decorator-pattern
