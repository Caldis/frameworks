# Immutability Pattern / 不可变性模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: John Ousterhout, 2018; Rich Hickey, 2007, 1966
- **Adopters**: Walmart Labs, Facebook, Netflix, Airbnb, Nubank

Prefer immutable data structures to eliminate shared mutable state and improve safety, concurrency, and reasoning

_优先使用不可变数据结构以消除共享可变状态，提高安全性、并发性和可推理性_

## When to Use

Apply this framework when:
- Building concurrent or multi-threaded systems where shared mutable state causes race conditions
- Designing domain models where objects should not change after creation, such as events, transactions, or value objects
- Implementing undo/redo or time-travel debugging by preserving previous states
- Working in functional programming paradigms where immutability is a foundational principle

## When NOT to Use

Stop and reconsider if:
- High-performance systems processing millions of small objects per second where allocation pressure matters
- Embedded or memory-constrained environments where object duplication is prohibitively expensive
- Legacy codebases deeply built around mutable state where introducing immutability would require a full rewrite
- Simple CRUD applications where the overhead of immutable patterns provides no meaningful benefit

## Core Concepts

- Immutable Object: an object whose state cannot be changed after construction; any 'modification' produces a new object
- Value Object: a domain concept defined by its attributes rather than identity, naturally suited to immutability
- Persistent Data Structure: a data structure that preserves its previous versions when modified, using structural sharing to maintain efficiency
- Copy-on-Write: a strategy where data is shared by default and only copied when a mutation is requested, balancing performance and immutability
- Mutable Boundary: the thin outer layer of a system (I/O, database, UI) where mutation is contained, keeping the core logic free of side effects

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Immutability Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Default to immutable declarations**: use const, final, readonly, or val by default; only use mutable bindings when mutation is explicitly required
2. **Design immutable data types**: create classes or records where all fields are set at construction time and no setters or mutating methods are exposed
3. **Use transformation over mutation**: instead of modifying an object in place, produce a new object with the desired changes using copy-on-write or builder patterns
4. **Leverage persistent data structures**: for collections that change frequently, use persistent (structural sharing) data structures to avoid the cost of full copies
5. **Isolate mutable boundaries**: when mutation is unavoidable (I/O, caches, buffers), confine it to clearly marked boundaries and keep the core logic purely immutable

<details><summary>中文步骤</summary>

1. 默认使用不可变声明：默认使用 const、final、readonly 或 val；仅在明确需要变更时使用可变绑定
2. 设计不可变数据类型：创建所有字段在构造时设定且不暴露 setter 或变更方法的类或记录
3. 用转换替代变更：不要就地修改对象，而是使用写时复制或构建器模式产生包含所需更改的新对象
4. 利用持久化数据结构：对于频繁变化的集合，使用持久化（结构共享）数据结构以避免完整复制的成本
5. 隔离可变边界：当变更不可避免时（I/O、缓存、缓冲区），将其限制在明确标记的边界内，保持核心逻辑纯不可变

</details>

## Do

- Do default to immutable declarations in every language you work in because mutable state should be a conscious choice, not the default
- Do use builder or 'with' patterns when constructing modified copies because they keep immutable APIs ergonomic
- Do leverage persistent data structures for frequently updated collections because they avoid the overhead of full copies
- Do document mutable boundaries explicitly because the team needs to know where side effects live

## Don't

- Don't make everything immutable blindly in performance-critical code because excessive copying can degrade throughput
- Don't expose mutable internals from an otherwise immutable object because a single leaked reference breaks the guarantee
- Don't ignore the cost of deep copying large object graphs because structural sharing or copy-on-write should be used instead
- Don't forget to make collections immutable too because an immutable object with a mutable list field is not truly immutable

## Case Study

**Walmart Labs**: Walmart Labs adopted immutability as a core principle in their React/Redux frontend architecture serving walmart.com. By treating the Redux store as an immutable state tree and using Immutable.js for all data structures, they eliminated an entire class of bugs caused by accidental state mutation in event handlers. Time-travel debugging became trivial, and their server-side rendering pipeline became thread-safe without locks. The migration reduced frontend bugs by 40% in the first quarter after adoption.

## Related Frameworks

- functional-core-imperative-shell (complement)
- solid-principles (complement)
- clean-code-principles (complement)
- error-handling-patterns (complement)

## Source

https://sdframe.caldis.me/frameworks/immutability-pattern
