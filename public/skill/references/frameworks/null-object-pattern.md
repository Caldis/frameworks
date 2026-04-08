# Null Object Pattern / 空对象模式

- **Category**: coding
- **Complexity**: beginner
- **Quality**: reliability, maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Bobby Woolf, 1998; Martin Fowler, 2018
- **Adopters**: JetBrains, Google (Guava), Apache Commons, Spring Framework, Eclipse Foundation

Eliminate null checks by providing default-behavior objects that implement the expected interface with no-op or safe defaults

_通过提供实现预期接口的默认行为对象（无操作或安全默认值）来消除空值检查_

## When to Use

Apply this framework when:
- Code littered with repetitive null checks for the same type, reducing readability and increasing cyclomatic complexity
- Providing default or guest behavior in systems with optional collaborators, such as a NullLogger or GuestUser
- Legacy codebases where null returns from methods cause frequent NullPointerException or TypeError crashes
- Simplifying test code by using Null Objects as safe stand-ins instead of complex mocking setups

## When NOT to Use

Stop and reconsider if:
- When null genuinely indicates an error condition that should throw an exception or halt execution
- Languages with robust built-in null safety (Kotlin, Rust, Swift) where Option/Optional types are more idiomatic
- Simple scripts or small programs where a few null checks are clearer than introducing a new class
- Cases where the absence of a value has distinct business meaning that must be explicitly handled

## Core Concepts

- Null Object: a concrete implementation of an interface that provides neutral, do-nothing behavior as a stand-in for null
- Polymorphic Dispatch: using the type system to route calls to the Null Object's methods instead of guarding with conditionals
- Default Behavior: the safe, side-effect-free actions the Null Object performs, such as returning empty strings, empty lists, or zero
- Special Case Pattern: Martin Fowler's generalization where any special condition (not just null) is handled by a dedicated object rather than conditionals
- Sentinel Value Elimination: replacing magic null values with typed objects that communicate intent and prevent errors

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Null Object Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify pervasive null checks**: locate code where null or nil checks are scattered throughout to guard against missing collaborators or absent data
2. **Define the interface or base type**: ensure the object being checked for null implements a clear interface or abstract type that defines the expected behavior
3. **Create the Null Object class**: implement the interface with a class that provides safe, neutral default behavior — methods return empty collections, zero values, or simply do nothing
4. **Replace null returns with Null Objects**: modify factories, repositories, or lookup methods to return the Null Object instead of null when no real object is found
5. **Remove the null checks**: with the Null Object in place, delete the defensive null checks from calling code, simplifying control flow and reducing cyclomatic complexity

<details><summary>中文步骤</summary>

1. 识别普遍的空值检查：定位代码中为防范缺失的协作者或数据而散布的 null 或 nil 检查
2. 定义接口或基类型：确保被检查空值的对象实现了定义预期行为的清晰接口或抽象类型
3. 创建空对象类：用提供安全、中性默认行为的类实现接口 — 方法返回空集合、零值或简单地什么都不做
4. 用空对象替换空值返回：修改工厂、仓库或查找方法，在找不到真实对象时返回空对象而非 null
5. 移除空值检查：有了空对象之后，从调用代码中删除防御性空值检查，简化控制流并降低圈复杂度

</details>

## Do

- Do make the Null Object implement the same interface as the real object because polymorphism is what makes the pattern work
- Do make the Null Object a singleton when possible because there is no reason to create multiple instances of identical default behavior
- Do name Null Objects clearly (e.g., NullLogger, GuestUser, MissingCustomer) because the name should communicate its role
- Do consider using language-level null safety features (Optional, Option) alongside Null Objects because they complement each other

## Don't

- Don't hide errors behind Null Objects because sometimes a null indicates a genuine bug that should fail loudly
- Don't use Null Objects when the absence of a value carries important business meaning because silently swallowing it masks logic errors
- Don't proliferate Null Object classes for every type in the system because it creates unnecessary boilerplate
- Don't let the Null Object perform side effects because its purpose is to be inert and safe

## Case Study

**JetBrains**: JetBrains uses the Null Object Pattern extensively throughout the IntelliJ IDEA codebase. For example, PsiElement (the core AST node interface) has a NullPsiElement that is returned when resolution fails, avoiding thousands of null checks in code inspections and refactoring tools. Similarly, their VirtualFile abstraction uses a NullVirtualFile to represent absent files. This pattern allowed IntelliJ's plugin ecosystem to remain stable even when plugins encounter missing elements, because the Null Objects provide safe defaults rather than throwing NullPointerExceptions.

## Related Frameworks

- design-by-contract (complement)
- clean-code-principles (complement)
- solid-principles (complement)
- error-handling-patterns (complement)

## Source

https://sdframe.caldis.me/frameworks/null-object-pattern
