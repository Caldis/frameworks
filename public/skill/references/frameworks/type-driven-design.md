# Type-Driven Design / 类型驱动设计

- **Category**: coding
- **Complexity**: advanced
- **Quality**: reliability, maintainability
- **Abstraction**: code
- **Maturity**: established
- **Author**: John Ousterhout, 2018; Scott Wlaschin, 2018, 1999
- **Adopters**: Jane Street, Meta (Flow/Hack), Microsoft (TypeScript), Jet.com (F#), Mozilla (Rust)

Use the type system to encode business rules and constraints, making invalid states unrepresentable at compile time

_利用类型系统编码业务规则和约束，使无效状态在编译时不可表示_

## When to Use

Apply this framework when:
- Modeling complex business domains where invalid state combinations cause subtle, hard-to-detect bugs
- Building safety-critical systems where runtime errors are unacceptable and correctness must be guaranteed at compile time
- Working in strongly typed languages (Rust, TypeScript, Kotlin, Haskell, F#) where the type system is expressive enough to encode constraints
- Refactoring primitive-obsessed codebases where strings and integers are used to represent domain concepts

## When NOT to Use

Stop and reconsider if:
- Dynamically typed languages (Python, Ruby, JavaScript) where the type system is too weak to encode meaningful constraints
- Rapid prototyping phases where the domain model is still being discovered and types would need constant reshaping
- Small scripts or one-off utilities where the overhead of custom types exceeds the benefit
- Teams with limited experience in advanced type systems where the learning curve would slow delivery

## Core Concepts

- Make Illegal States Unrepresentable: design types so that the compiler rejects invalid combinations of data, eliminating entire categories of runtime errors
- Domain-Specific Types: replacing primitives (string, int) with named types (EmailAddress, CustomerId) that carry meaning and enforce invariants
- Phantom Types: type parameters that exist only at compile time to track state or capabilities without runtime overhead
- Smart Constructor: a constructor that validates input and returns the typed value only if invariants are met, ensuring all instances are valid by construction
- Type-State Pattern: encoding object lifecycle states as distinct types so that operations are only available in valid states

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Type-Driven Design to?
- What constraints or existing architecture do you need to work within?
- Has your team used Type-Driven Design before? (This is an advanced framework)

## Implementation Steps

1. **Model the domain with types**: replace primitive types (strings, integers) with domain-specific types (EmailAddress, OrderId, PositiveInt) that carry meaning and enforce constraints at construction time
2. **Make illegal states unrepresentable**: use union types, enums, or sealed classes to ensure the type system only permits valid combinations of state — for example, an Order that is either Draft, Confirmed, or Shipped, each carrying only the data relevant to that state
3. **Encode state transitions in types**: design the API so that operations are only available on the correct state — a Confirmed order has a ship() method, but a Draft order does not
4. **Use types to enforce preconditions**: replace runtime validation checks with types that guarantee validity at construction — if a function requires a NonEmptyList, callers cannot pass an empty list
5. **Refactor toward richer types**: continuously look for primitives, optionals, or stringly-typed data that could be replaced by more expressive types, narrowing the space of possible bugs

<details><summary>中文步骤</summary>

1. 用类型建模领域：用携带含义并在构造时强制约束的领域特定类型（EmailAddress、OrderId、PositiveInt）替换原始类型（字符串、整数）
2. 使非法状态不可表示：使用联合类型、枚举或密封类确保类型系统只允许有效的状态组合 — 例如，订单只能是草稿、已确认或已发货，每种状态只携带与该状态相关的数据
3. 在类型中编码状态转换：设计 API 使操作仅在正确状态下可用 — 已确认的订单有 ship() 方法，但草稿订单没有
4. 用类型强制前置条件：用在构造时保证有效性的类型替换运行时验证检查 — 如果函数需要 NonEmptyList，调用方就无法传递空列表
5. 向更丰富的类型重构：持续寻找可以用更具表现力的类型替代的原始类型、可选值或字符串化数据，缩小可能的 bug 空间

</details>

## Do

- Do wrap primitives in domain types because a CustomerId should never be accidentally used as an OrderId
- Do model state machines with distinct types for each state because it makes invalid transitions a compile error
- Do use smart constructors that validate on creation because all instances of the type are then guaranteed valid
- Do start small by typing the most error-prone primitives first because incremental adoption is more sustainable

## Don't

- Don't over-type trivial code because wrapping every string in a newtype for a simple script adds friction with no benefit
- Don't ignore ergonomics because if typed APIs are painful to use, developers will work around them
- Don't rely solely on types for validation that also needs runtime enforcement because types alone cannot check external input from users or APIs
- Don't introduce phantom types or advanced type-level programming in teams unfamiliar with them because it creates a steep learning curve

## Case Study

**Jane Street**: Jane Street, one of the largest quantitative trading firms, built their entire trading infrastructure in OCaml using type-driven design. Every financial instrument, currency, and quantity is wrapped in domain-specific types — a Dollar amount cannot be accidentally added to a Euro amount, and a buy order type cannot be passed where a sell order is expected. This approach has prevented costly trading errors that plague firms using stringly-typed or loosely-typed systems. Their open-source libraries (Core, Async) demonstrate this philosophy, and they credit type-driven design with enabling their small engineering team to manage billions of dollars in daily trading volume with remarkably few production bugs.

## Related Frameworks

- design-by-contract (complement)
- domain-driven-design (complement)
- clean-code-principles (complement)
- immutability-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/type-driven-design
