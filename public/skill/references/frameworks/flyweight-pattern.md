# Flyweight Pattern / 享元模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: performance, maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gang of Four, 1990
- **Adopters**: Java JDK (Integer cache, String intern), JavaScript V8 engine (hidden classes), Microsoft Word (glyph rendering), Unity (sprite atlas sharing), Unreal Engine (static mesh instances), Apache POI (cell style sharing)

GoF structural pattern that minimises memory usage by sharing fine-grained objects whose state can be externalised, enabling large numbers of similar objects to be represented efficiently.

_GoF 结构型模式，通过共享可外化状态的细粒度对象来最小化内存使用，使大量相似对象得以高效表示。_

## When to Use

Apply this framework when:
- Applications that create large numbers of fine-grained objects — thousands or millions — where memory footprint is a critical constraint and many objects share common state
- Rendering engines, text editors, game engines, and CAD applications where visual elements (glyphs, sprites, tiles) are repeated many times with only position and colour varying
- Systems where object creation cost (memory allocation, GC pressure) is measurably degrading performance and profiling confirms that object count is the root cause
- Domain models with many instances of value-like objects (e.g., product SKUs, currency instances, tax codes) where identity equality is not required and shared instances are semantically correct

## When NOT to Use

Stop and reconsider if:
- Applications with relatively few objects where the memory savings do not justify the architectural overhead of separating intrinsic from extrinsic state and routing all creation through a factory
- Objects with mostly unique state where the intrinsic state is too fine-grained to enable sharing — if every instance has different intrinsic state, the Flyweight Factory becomes a plain object cache with no sharing benefit
- Performance-critical paths where passing extrinsic state as a parameter on every operation call introduces function call overhead that outweighs the memory savings
- Mutable objects where the shared state must be modified independently per client — mutability and sharing are fundamentally incompatible in Flyweight

## Core Concepts

- Intrinsic vs Extrinsic State: intrinsic state is stored inside the flyweight and is immutable and shared; extrinsic state is context-dependent and must be passed to the flyweight operations by the caller — this separation is the structural foundation of the pattern
- Flyweight Factory: a factory or registry that ensures only one flyweight instance exists per unique intrinsic state; clients always go through the factory rather than directly instantiating flyweights to guarantee sharing
- Shared Identity: because flyweights are shared, they must not be treated as having object identity — two references to the same flyweight represent different logical objects that happen to share implementation; equality checks on flyweight identity are a common bug
- Memory-Time Trade-off: the pattern trades CPU time (extrinsic state must be computed or passed at every operation call) for memory (fewer objects on the heap); this trade-off is only worthwhile when object count is the dominant memory consumer

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Flyweight Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Analyse the large collection of objects to separate intrinsic state (immutable, shareable, context-independent — e.g., the glyph shape of a character) from extrinsic state (context-dependent — e.g., the position and colour of each character on screen)
2. Create a Flyweight interface that defines the operation method accepting extrinsic state as a parameter, so shared flyweight objects do not store it internally
3. Implement Concrete Flyweight classes that store only intrinsic state; multiple client contexts can share the same Concrete Flyweight instance without conflict
4. Build a Flyweight Factory that maintains a pool of existing flyweight instances keyed by their intrinsic state — the factory returns an existing instance when the key matches, or creates and caches a new one
5. Replace direct object instantiation in client code with factory calls; pass extrinsic state as arguments to flyweight operations at call time rather than storing it in each flyweight instance

<details><summary>中文步骤</summary>

1. 分析大量对象集合，将内部状态（不可变、可共享、与上下文无关——如字符的字形）与外部状态（依赖上下文——如每个字符在屏幕上的位置和颜色）分离
2. 创建 Flyweight 接口，定义接受外部状态作为参数的操作方法，使共享的享元对象不在内部存储外部状态
3. 实现只存储内部状态的具体 Flyweight 类；多个客户端上下文可以共享同一具体享元实例而不产生冲突
4. 构建 Flyweight 工厂，维护以内部状态为键的现有享元实例池——当键匹配时工厂返回现有实例，否则创建并缓存新实例
5. 在客户端代码中用工厂调用替换直接对象实例化；在调用时将外部状态作为参数传递给享元操作，而不是将其存储在每个享元实例中

</details>

## Do

- Do profile memory usage before applying Flyweight — the pattern adds significant architectural complexity and is only justified when object count is measurably consuming too much heap memory
- Do make flyweight intrinsic state truly immutable — any mutation of shared state causes subtle, hard-to-debug corruption that affects all clients sharing the same flyweight instance
- Do design the Flyweight Factory as a thread-safe singleton when flyweights are shared across concurrent threads — double-checked locking or ConcurrentHashMap-based caching prevents race conditions on the factory
- Do document which fields are intrinsic and which are extrinsic clearly in code and tests — confusion about the intrinsic/extrinsic boundary is the most common source of flyweight bugs

## Don't

- Do not apply Flyweight prematurely as an optimisation strategy — it dramatically increases code complexity through the intrinsic/extrinsic split and factory indirection; use it only after profiling confirms memory pressure from excessive object count
- Do not share flyweights across isolation boundaries in multi-tenant systems without careful access control — shared flyweight instances can become a cross-tenant data leakage vector if extrinsic state is accidentally stored inside them
- Do not confuse Flyweight with Singleton — Singleton allows exactly one instance of an object regardless of state; Flyweight allows one instance per unique intrinsic state value, so multiple flyweight instances can exist
- Do not store extrinsic state in flyweight fields as an optimisation shortcut — this defeats the sharing guarantee and gradually converts flyweights into regular heavyweight objects as the codebase evolves

## Case Study

**Java JDK / OpenJDK**: The Java Development Kit implements the Flyweight pattern implicitly in several core library features. Integer.valueOf(int) in Java 5+ caches Integer instances for values between -128 and 127, the range most frequently used in loops and indexing — rather than creating a new Integer object for every boxing operation, the JVM returns a shared flyweight instance from a pre-populated cache array. For String, Java maintains a string intern pool: String.intern() returns the canonical flyweight instance for any given string value. These JVM-level flyweights have a measurable impact at scale: in high-throughput services processing millions of short integer counters or repeated string tokens, the Integer cache alone can reduce GC pressure by eliminating tens of millions of short-lived allocations per second, meaningfully reducing pause times in applications running on JVMs with concurrent garbage collectors.

## Related Frameworks

- singleton-pattern (related)

## Source

https://sdframe.caldis.me/frameworks/flyweight-pattern
