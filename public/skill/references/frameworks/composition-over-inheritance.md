# Composition over Inheritance / 组合优于继承

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gang of Four (Gamma, Helm, Johnson, Vlissides), 1994, undefined
- **Adopters**: React / Meta（组件模型）, Go（无类继承）, Rust（trait 组合）, Spring Framework, Unity 游戏引擎

Favor object composition over class inheritance to achieve code reuse and polymorphism. Inheritance creates tight coupling between parent and child classes; composition assembles behavior from interchangeable parts, making systems more flexible and testable.

_为了实现代码复用和多态，应优先采用对象组合而非类继承。继承在父子类之间建立紧耦合；组合则将行为从可互换的部件中组装，使系统更灵活、可测试。_

## When to Use

Apply this framework when:
_No data available._

## When NOT to Use

Stop and reconsider if:
_No data available._

## Core Concepts

- Has-a vs Is-a
- Delegation
- Interface Segregation
- Dependency Injection
- Mixin / Trait Pattern

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Composition over Inheritance to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify behavior that is being shared via inheritance
2. Extract that behavior into a small, focused interface or class (a 「component」)
3. Compose the target class by holding a reference to that component
4. Inject the component via constructor or setter for testability
5. Verify that the composed class can swap implementations at runtime or test time

<details><summary>中文步骤</summary>

1. 识别通过继承共享的行为
2. 将该行为提取为小而专注的接口或类（一个「组件」）
3. 通过持有该组件的引用来组合目标类
4. 通过构造函数或 setter 注入组件以提高可测试性
5. 验证组合类可在运行时或测试时替换实现

</details>

## Do

- Model 「has-a」 relationships with composition, 「is-a」 with inheritance
- Keep composed components small and single-purpose
- Use dependency injection to supply composed parts — aids testability
- Prefer interfaces/protocols over concrete base classes
- Use mixins or traits for horizontal behavior sharing

## Don't

- Don't inherit just to reuse a few methods — extract and compose instead
- Don't create inheritance hierarchies deeper than 2-3 levels
- Don't use composition just to avoid thinking about the domain model
- Don't over-decompose: too many tiny components create their own complexity
- Don't forget that some 「is-a」 relationships are genuine and inheritance is correct

## Case Study

**React (Meta)**: React's component model is the most mainstream example of composition over inheritance in UI development. Prior frameworks like Backbone used inheritance chains; React replaced this with composable functional components. A 「Button」 can compose an 「Icon」 and a 「Label」 without any class hierarchy. React's own documentation explicitly states 「At Facebook, we use React in thousands of components, and we haven't found any use cases where we would recommend creating component inheritance hierarchies.」

## Related Frameworks

- solid-principles (complement)
- gof-design-patterns (extends)
- decorator-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/composition-over-inheritance
