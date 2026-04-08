# GRASP Patterns / GRASP 模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Craig Larman, 2004, 2001
- **Adopters**: Ericsson, SAP, Oracle, Siemens, IBM

Nine patterns for assigning responsibility to classes properly

_九种将职责正确分配给类的通用模式_

## When to Use

Apply this framework when:
- Deciding which class should own a particular method or behavior
- Teaching junior developers how to think about responsibility assignment in OOP
- Reviewing domain models to identify misplaced logic or god objects
- Designing new classes during iterative object-oriented analysis

## When NOT to Use

Stop and reconsider if:
- Purely functional codebases where objects and classes are not the primary abstraction
- Rapid prototyping where responsibility placement will be revisited soon
- Data-centric CRUD applications where anemic models with service layers are the deliberate choice
- Very small projects with only a handful of classes where the overhead of formal patterns is unnecessary

## Core Concepts

- Information Expert: assign responsibility to the class that has the data needed to fulfill it, reducing data transfer between objects
- Creator: determine which class should create instances of another based on containment, aggregation, or close usage relationships
- Low Coupling: minimize interdependencies between classes so that changes in one class have minimal ripple effects
- High Cohesion: keep each class focused on a narrow, well-defined set of related responsibilities
- Controller: assign the responsibility for handling system events to a non-UI object that coordinates the use case

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying GRASP Patterns to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Apply Information Expert**: assign each responsibility to the class that has the information necessary to fulfill it
2. **Use Creator pattern**: give class B the responsibility to create class A if B contains, aggregates, or closely uses A
3. **Enforce Low Coupling and High Cohesion**: minimize dependencies between classes while keeping related behaviors together
4. **Apply Controller**: assign system event handling to a use-case controller or facade that delegates to domain objects
5. **Use Polymorphism and Indirection**: handle variation through polymorphic dispatch and introduce intermediary objects to reduce direct coupling

<details><summary>中文步骤</summary>

1. 应用信息专家：将每个职责分配给拥有完成该职责所需信息的类
2. 使用创建者模式：如果类B包含、聚合或密切使用类A，则由B负责创建A
3. 强制低耦合与高内聚：最小化类间依赖，同时将相关行为保持在一起
4. 应用控制器：将系统事件处理分配给用例控制器或门面，再委托给领域对象
5. 使用多态与间接：通过多态分派处理变化，引入中介对象减少直接耦合

</details>

## Do

- Do start with Information Expert when unsure where to place a method because it naturally reduces coupling
- Do use Controller pattern to separate UI from business logic because it enables independent testing
- Do evaluate cohesion when a class grows beyond five methods because low cohesion indicates mixed responsibilities
- Do combine GRASP with SOLID because they are complementary and reinforce each other

## Don't

- Don't treat GRASP as rigid rules because they are guidelines requiring contextual judgment
- Don't assign creation responsibility to a class just because it is convenient without evaluating aggregation relationships
- Don't over-apply Indirection by adding unnecessary mediator classes because it increases complexity without benefit
- Don't ignore GRASP when doing domain modeling because it prevents common mistakes in responsibility assignment

## Case Study

**Ericsson**: Ericsson's telecom platform team adopted GRASP patterns when restructuring their legacy billing system. By systematically applying Information Expert and Creator patterns, they reduced the number of cross-module dependencies by 40% and shortened the average time to implement new billing features from three weeks to five days.

## Related Frameworks

- solid-principles (complement)
- gof-design-patterns (complement)
- clean-code-principles (complement)

## Source

https://sdframe.caldis.me/frameworks/grasp-patterns
