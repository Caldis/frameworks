# Design by Contract (DbC) / 契约式设计

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: reliability, testability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Bertrand Meyer, 1986, 1969
- **Adopters**: Eiffel Software, Microsoft Research, Bloomberg, AdaCore, JetBrains, Google (Guava Preconditions)

Define explicit preconditions, postconditions, invariants per unit

_为每个软件单元定义明确的前置条件、后置条件与不变式_

## When to Use

Apply this framework when:
- When building mission-critical software (financial transactions, medical devices, infrastructure) where correctness is non-negotiable
- When designing public APIs or libraries consumed by other teams who need clear guarantees about input/output behavior
- When debugging is consuming excessive time because failure causes are far from failure symptoms in the call chain
- When onboarding new developers to a codebase and you need code that explicitly documents its own usage rules

## When NOT to Use

Stop and reconsider if:
- When building a rapid prototype where design is expected to change daily and contracts would create excessive maintenance burden
- When working in a dynamically typed scripting environment with no assertion infrastructure, making contracts impractical to enforce
- When the performance overhead of runtime contract checking is unacceptable in the production hot path and the team lacks the discipline to separate development-time from production-time checks
- When the codebase is primarily glue code or configuration with trivial logic that doesn't benefit from formal contract specification

## Core Concepts

- Preconditions: Obligations the caller must satisfy before invoking a routine — if violated, the caller has a bug, not the routine
- Postconditions: Guarantees the routine promises to deliver upon normal completion — if violated, the routine has a bug, not the caller
- Class Invariants: Properties that must be true for all instances of a class between public method calls, defining what makes an object 'valid'
- Blame Assignment: Contracts create clear responsibility boundaries — a violated precondition is the caller's fault, a violated postcondition is the supplier's fault, eliminating ambiguity in bug attribution

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Design by Contract (DbC) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define Preconditions**: specify what callers must guarantee to be true before invoking each function or service
2. **Define Postconditions**: specify what the function or service guarantees to be true upon successful completion
3. **Define Class Invariants**: state properties that must hold for every object or module in any observable state
4. **Encode Contracts in Code**: express contracts as assertions, type annotations, or formal specs (e.g., OpenAPI, type guards)
5. **Enforce at Runtime and Test Time**: run contract checks in development; use property-based tests to fuzz contract boundaries

<details><summary>中文步骤</summary>

1. 定义前置条件：明确调用者在调用每个函数或服务前必须保证为真的条件
2. 定义后置条件：明确函数或服务在成功完成后保证为真的条件
3. 定义类不变式：声明对象或模块在任何可观测状态下都必须成立的属性
4. 在代码中编码契约：通过断言、类型注解或形式规范（如OpenAPI、类型守卫）表达契约
5. 在运行时和测试时强制执行：开发中运行契约检查；使用基于属性的测试对契约边界进行模糊测试

</details>

## Do

- Do make contracts as precise and machine-checkable as possible, because vague contracts in comments are ignored while assertions in code are enforced
- Do use contracts to clarify the boundary between caller and callee responsibility, because ambiguous boundaries are where the worst bugs hide
- Do keep contracts focused on 'what' not 'how', because contracts specify observable guarantees, not implementation details
- Do run contract checks in development and testing but consider disabling expensive checks in production, because contracts are primarily a design and debugging tool

## Don't

- Don't use contracts as a substitute for input validation on trust boundaries, because contracts assume trusted callers while external input is inherently untrusted
- Don't over-specify contracts to the point where implementation flexibility is eliminated, because overly tight contracts create brittle coupling between caller and callee
- Don't silently swallow contract violations, because a violated contract indicates a program bug that should be surfaced immediately, not papered over
- Don't apply DbC to trivially simple getters and setters, because the overhead of writing and maintaining contracts should be proportional to the complexity of the behavior

## Case Study

**Microsoft (Midori Project)**: Microsoft's experimental Midori operating system project (2008-2015) was built from the ground up using Design by Contract principles in a language derived from C# with first-class contract support. Every API surface had machine-checked preconditions, postconditions, and invariants. The team reported that this approach eliminated entire categories of runtime errors and dramatically reduced debugging time, with contracts catching defects at compile time that would have been expensive production bugs in a traditional system.

## Related Frameworks

- property-based-testing (complement)
- contract-testing (related)
- clean-code-principles (related)

## Source

https://sdframe.caldis.me/frameworks/design-by-contract
