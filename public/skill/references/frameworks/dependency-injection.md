# Dependency Injection / 依赖注入

- **Category**: architecture
- **Complexity**: beginner
- **Quality**: testability, maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Martin Fowler, 2004, 1994
- **Adopters**: Google (Angular), Pivotal (Spring), Microsoft (.NET), JetBrains (IntelliJ), NestJS

Invert control flow by injecting dependencies externally

_通过外部注入依赖来反转控制流，降低模块耦合度_

## When to Use

Apply this framework when:
- When classes have hard-coded dependencies that make unit testing with mocks impossible
- When you need to swap implementations at runtime or between environments (e.g., test vs. production)
- When building modular applications where components should be independently replaceable
- When applying SOLID principles, particularly the Dependency Inversion Principle

## When NOT to Use

Stop and reconsider if:
- Simple scripts or small programs where the overhead of a DI framework exceeds the coupling problem it solves
- Performance-critical hot paths where the indirection of DI containers adds measurable latency
- Functional programming codebases where higher-order functions and closures naturally invert dependencies

## Core Concepts

- Constructor injection: Dependencies are provided through the constructor, making them explicit and required
- Composition root: The single place in the application where the entire dependency graph is assembled
- Interface segregation: Consumers depend on narrow abstractions rather than concrete classes
- Lifetime management: Controlling whether dependencies are singletons, scoped, or created fresh each time
- Service locator anti-pattern: Using a global registry to look up dependencies, which hides them from the API surface

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Dependency Injection to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify tight couplings**: find classes or modules that directly instantiate their dependencies, making them hard to test and swap
2. **Extract interfaces**: define abstractions (interfaces or protocols) for each dependency so consumers depend on contracts, not implementations
3. Configure a DI container or use constructor injection to wire dependencies at application startup or composition root
4. **Manage object lifetimes**: decide scoping for each dependency — singleton, scoped (per-request), or transient (per-use)
5. **Validate the dependency graph**: use the container's diagnostic tools or tests to detect circular dependencies, missing registrations, and captive dependencies

<details><summary>中文步骤</summary>

1. 识别紧耦合：找到直接实例化其依赖的类或模块，这使得它们难以测试和替换
2. 提取接口：为每个依赖定义抽象（接口或协议），使消费方依赖契约而非实现
3. 配置DI容器或使用构造函数注入，在应用启动时或组合根处装配依赖
4. 管理对象生命周期：为每个依赖决定作用域——单例、作用域（每请求）或瞬态（每次使用）
5. 验证依赖图：使用容器的诊断工具或测试检测循环依赖、缺失注册和捕获依赖

</details>

## Do

- Do prefer constructor injection because it makes dependencies explicit, required, and visible in the API
- Do configure the DI container at a single composition root because scattered configuration creates confusion
- Do register dependencies by interface rather than concrete type because it preserves the abstraction benefit
- Do validate the container at startup because failing fast on missing registrations prevents runtime surprises

## Don't

- Don't inject the DI container itself into classes because it creates a Service Locator anti-pattern
- Don't use property injection for required dependencies because they can be left null, causing runtime failures
- Don't create deep dependency chains because they make the system hard to understand and debug
- Don't register everything as singleton by default because incorrect lifetime scoping causes subtle concurrency bugs

## Case Study

**Google (Angular)**: Google designed Angular's dependency injection system as a core framework feature, making it the first major frontend framework with built-in hierarchical DI. Angular's injector tree mirrors the component tree, allowing services to be scoped at module, component, or application level. This design enabled teams at Google to build large-scale web applications where components could be independently tested with mock services and swapped without modifying consuming code.

## Related Frameworks

- solid-principles (complement)
- hexagonal-architecture (related)
- clean-code-principles (related)

## Source

https://sdframe.caldis.me/frameworks/dependency-injection
