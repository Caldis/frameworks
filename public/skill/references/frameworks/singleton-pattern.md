# Singleton Pattern / 单例模式

- **Category**: coding
- **Complexity**: beginner
- **Quality**: reliability, maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- **Adopters**: Log4j / SLF4J, Spring (singleton scope), Node.js module system, Android Application class

Ensure a class has only one instance with a global access point

_确保一个类只有一个实例，并提供一个访问它的全局入口点_

## When to Use

Apply this framework when:
- Exactly one shared resource must exist — e.g., a thread pool, configuration registry, or hardware interface driver
- Global coordination is required and the cost of multiple instances would cause correctness issues (e.g., duplicate caches)
- A legacy codebase cannot use dependency injection and needs a controlled global access point

## When NOT to Use

Stop and reconsider if:
- Domain model objects that represent real-world entities with potentially multiple instances
- Services that need to be substituted with test doubles in unit testing
- Any case where multiple independent instances improve correctness, throughput, or testability

## Core Concepts

- Single instance guarantee: only one object of the class can exist in the process; enforced by private constructor
- Global access point: the static getInstance() method provides a well-known entry to the single instance from anywhere in the codebase
- Lazy vs eager initialization: the instance can be created on first access (lazy) or at class load time (eager), each with different thread-safety implications

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Singleton Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Make the constructor private**: prevent external code from instantiating the class directly using the new keyword
2. **Declare a private static instance field**: hold the single instance inside the class itself
3. **Provide a public static accessor method**: implement getInstance() that creates the instance on first call and returns it on every subsequent call
4. **Handle thread safety**: in multi-threaded environments, use double-checked locking, an initialization-on-demand holder, or language-level guarantees to prevent race conditions
5. Consider dependency injection as an alternative: in modern applications prefer injecting a single shared instance via a DI container rather than relying on a static accessor

<details><summary>中文步骤</summary>

1. 将构造函数设为私有：防止外部代码直接使用 new 关键字实例化类
2. 声明私有静态实例字段：在类内部持有单一实例
3. 提供公共静态访问方法：实现 getInstance()，在第一次调用时创建实例，后续每次调用返回该实例
4. 处理线程安全：在多线程环境中，使用双重检查锁定、按需初始化持有者或语言级保证来防止竞态条件
5. 考虑依赖注入作为替代方案：在现代应用中，优先通过 DI 容器注入单一共享实例，而非依赖静态访问器

</details>

## Do

- Do prefer DI-container-managed singletons over static getInstance() for testability and lifecycle control
- Do use thread-safe initialization (enum singleton in Java, module-level object in Python) to avoid subtle concurrency bugs
- Do limit Singleton to stateless or append-only resources; mutable shared state is a concurrency hazard

## Don't

- Don't use Singleton for domain objects — it makes them impossible to vary, test in isolation, or run concurrently
- Don't store mutable business state in a Singleton because it introduces race conditions and makes tests order-dependent
- Don't use Singleton as a convenient global variable bag — it is an architectural coupling that erodes maintainability over time

## Case Study

**Log4j / SLF4J**: The logging ecosystem (Log4j, Logback, SLF4J) uses a managed Singleton approach for the LoggerFactory. The root logger and its appenders are singletons scoped to the JVM process, ensuring all threads write to the same configured output destinations without creating duplicate file handles or losing log entries. Modern logging frameworks implement this via class-loading guarantees (not double-checked locking), demonstrating the correct, thread-safe form of the pattern.

## Related Frameworks

- solid-principles (related)
- dependency-injection (alternative)
- factory-method-pattern (related)

## Source

https://sdframe.caldis.me/frameworks/singleton-pattern
