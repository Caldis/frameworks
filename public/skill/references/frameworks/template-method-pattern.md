# Template Method Pattern / 模板方法模式

- **Category**: coding
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- **Adopters**: JUnit (TestCase lifecycle), Java AWT / Swing, Spring (JdbcTemplate), Android Activity lifecycle

Define algorithm skeleton in base class, let subclasses override specific steps

_在基类中定义算法骨架，允许子类覆盖特定步骤而不改变算法整体结构_

## When to Use

Apply this framework when:
- Multiple subclasses share the same algorithm structure but differ in one or more concrete steps
- You want to enforce a fixed sequence of operations while allowing flexibility at specific extension points
- Eliminating code duplication across related classes by pulling the invariant parts into a common base

## When NOT to Use

Stop and reconsider if:
- When behavior varies along multiple independent dimensions simultaneously — use Strategy objects composed together instead
- When the algorithm steps have no natural fixed ordering and callers need full control over sequencing
- When the codebase favors functional programming where higher-order functions achieve the same result without inheritance

## Core Concepts

- Template method: the invariant algorithm skeleton defined in the base class as a final method that orchestrates calls to primitive operations
- Primitive operations: abstract or hook methods that represent the variable parts of the algorithm; subclasses override these to specialize behavior
- Hollywood Principle: the base class calls subclass methods, not the other way around — high-level components control flow and low-level components fill in details

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Template Method Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the abstract base class**: declare the template method as a final (non-overridable) method that calls a sequence of primitive operations in the correct order
2. **Identify primitive operations**: split the algorithm into steps — mark required steps as abstract methods and optional steps as hook methods with default implementations
3. **Implement concrete subclasses**: override only the primitive operations that differ, leaving the overall algorithm structure untouched in the base class
4. Apply hook methods for optional behavior: provide empty or no-op hook implementations in the base class so subclasses can optionally extend behavior at defined extension points
5. **Favor composition if variability grows**: when the number of overridable steps proliferates, consider replacing inheritance with Strategy objects injected into a single template class

<details><summary>中文步骤</summary>

1. 定义抽象基类：将模板方法声明为 final（不可覆盖）方法，按正确顺序调用一系列基本操作
2. 识别基本操作：将算法拆分为步骤——将必须实现的步骤标记为抽象方法，可选步骤标记为带默认实现的钩子方法
3. 实现具体子类：只覆盖不同的基本操作，保持基类中的整体算法结构不变
4. 使用钩子方法实现可选行为：在基类中提供空的或无操作的钩子实现，使子类可以在定义的扩展点选择性地扩展行为
5. 当可变性增长时倾向组合：当可覆盖步骤数量激增时，考虑用注入单一模板类的策略对象替代继承

</details>

## Do

- Do declare the template method final to prevent subclasses from accidentally breaking the algorithm invariant
- Do minimize the number of abstract steps to reduce the implementation burden on concrete subclasses
- Do document the intended contract of each primitive operation so subclass authors understand what invariants they must preserve

## Don't

- Don't override the template method in subclasses — doing so defeats the entire purpose of the pattern and leads to divergent algorithm variants
- Don't create deep inheritance hierarchies using Template Method because they become brittle and hard to understand as the hierarchy grows
- Don't use Template Method when the varying behavior is unrelated to a shared algorithm structure — Strategy composition is more appropriate

## Case Study

**JUnit**: JUnit's TestCase class is a textbook Template Method implementation. The runBare() method is the template — it calls setUp(), then run(), then tearDown() in a guaranteed sequence regardless of what happens inside the test. Test authors override only setUp() and tearDown() with their specific fixture logic, while JUnit controls the lifecycle. This allowed thousands of test classes to implement consistent setup/teardown behavior without duplicating the error-handling and lifecycle management code that JUnit provides centrally.

## Related Frameworks

- strategy-pattern (alternative)
- solid-principles (complement)
- factory-method-pattern (related)

## Source

https://sdframe.caldis.me/frameworks/template-method-pattern
