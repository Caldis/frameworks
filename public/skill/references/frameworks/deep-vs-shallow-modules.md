# Deep vs Shallow Modules / 深模块与浅模块

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: maintainability, usability
- **Abstraction**: code
- **Maturity**: established
- **Author**: John Ousterhout, 2018, 1972
- **Adopters**: Unix/Linux Kernel, Go Standard Library, Java Collections Framework, Redis, SQLite

Prefer deep modules (simple interface, complex implementation) over shallow ones (complex interface, simple implementation)

_优先选择深模块（简单接口、复杂实现）而非浅模块（复杂接口、简单实现）_

## When to Use

Apply this framework when:
- When your codebase has many small classes or functions that each do very little, forcing callers to orchestrate numerous tiny pieces
- When developers complain that using an internal API requires understanding too many parameters and configuration options
- When you notice that module interfaces mirror their implementations, providing no real abstraction benefit
- When refactoring a system and deciding how to draw module boundaries for maximum developer productivity

## When NOT to Use

Stop and reconsider if:
- When building a thin adapter or integration layer whose sole purpose is to translate between two APIs, where the module is inherently shallow by design
- When performance requirements demand that callers have fine-grained control over implementation behavior, making a deep abstraction a bottleneck
- When the team is building a DSL or configuration system where expressiveness at the interface is the primary value proposition
- When prototyping rapidly and the overhead of designing deep interfaces would slow down exploration disproportionately

## Core Concepts

- Information Hiding: The primary purpose of a module is to hide implementation details behind a simple interface, reducing the knowledge callers need
- Interface-to-Implementation Ratio: A deep module provides a high ratio of hidden complexity to exposed interface, giving callers maximum benefit per abstraction
- Shallow Module Anti-Pattern: Modules that expose nearly as much complexity as they hide add abstraction layers without reducing overall system complexity
- Default-Rich Interfaces: Deep modules provide sensible defaults so that the common case requires minimal configuration, while still allowing advanced customization

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Deep vs Shallow Modules to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify Module Boundaries**: map the system's current module structure and catalog each module's public interface (methods, parameters, return types, exceptions)
2. **Measure Depth Ratio**: for each module, compare the interface complexity (number of public methods, parameters, configuration options) against the implementation complexity it hides
3. **Flag Shallow Modules**: identify modules where the interface is nearly as complex as the implementation — these are shallow modules that push complexity onto their callers
4. **Redesign for Depth**: merge shallow modules or expand their scope so that each module's simple interface hides significant implementation complexity, providing more value per abstraction
5. **Validate with Caller Simplicity**: confirm that callers of the redesigned modules are simpler than before — if caller code hasn't gotten simpler, the deepening hasn't achieved its purpose

<details><summary>中文步骤</summary>

1. 识别模块边界：映射系统当前的模块结构，编目每个模块的公共接口（方法、参数、返回类型、异常）
2. 衡量深度比：为每个模块比较接口复杂度（公共方法数量、参数、配置选项）与其隐藏的实现复杂度
3. 标记浅模块：识别接口几乎与实现一样复杂的模块——这些浅模块将复杂度推给了调用者
4. 为深度重新设计：合并浅模块或扩展其范围，使每个模块的简单接口隐藏显著的实现复杂度，提供更高的抽象价值
5. 用调用者简化来验证：确认重新设计后模块的调用者比之前更简单——如果调用者代码没有变简单，深化就没有达到目的

</details>

## Do

- Do design interfaces around common use cases, providing sensible defaults that make the simple case trivial and the complex case possible
- Do measure module depth by asking 'how much does a caller need to know to use this correctly?' — less is deeper
- Do consider merging clusters of shallow modules into a single deep module when they are always used together
- Do look at the Unix file I/O API (open, read, write, close) as the canonical example of deep module design

## Don't

- Don't equate small classes with good design, because many tiny classes with pass-through methods create shallow module sprawl that increases total system complexity
- Don't create wrapper classes that merely forward calls to an underlying implementation, because they add an abstraction layer that hides nothing
- Don't expose implementation details through your interface (e.g., requiring callers to manage internal state), because that defeats the purpose of having a module boundary
- Don't over-parameterize interfaces to handle every possible case, because a 15-parameter constructor is a shallow interface that pushes complexity onto every caller

## Case Study

**Unix/POSIX**: The Unix file system API is the textbook example of deep module design. The interface consists of just five calls — open(), read(), write(), close(), and lseek() — yet it hides enormous implementation complexity: file system types (ext4, NFS, ZFS), block allocation, caching, journaling, permissions, locking, and device driver interactions. A developer writing a program that reads a file needs to know almost nothing about these internals. This deep design has remained stable for over 50 years and has been implemented across hundreds of operating systems, proving that a well-designed deep interface can absorb decades of implementation evolution without changing its surface.

## Related Frameworks

- complexity-budget (complement)
- leaky-abstractions (related)
- separation-of-concerns (related)
- design-by-contract (related)

## Source

https://sdframe.caldis.me/frameworks/deep-vs-shallow-modules
