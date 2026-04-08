# Abstract Factory Pattern / 抽象工厂模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- **Adopters**: Java Swing (PLAF), AWS SDK, Qt Framework, IntelliJ Plugin API

Create families of related objects without specifying concrete classes

_在不指定具体类的情况下创建一系列相关或相互依赖的对象_

## When to Use

Apply this framework when:
- A system must be independent of how its products are created and composed, and must work with multiple product families
- You want to enforce consistency across a family of related products (e.g., all UI widgets must match the same theme)
- You need to swap entire product families at runtime — e.g., switching between a cloud provider's SDK implementations

## When NOT to Use

Stop and reconsider if:
- When the application only has one product family and no plans to support others
- Small projects where the interface hierarchy adds more boilerplate than it saves
- When dependency injection containers already manage multi-implementation selection, making an explicit factory redundant

## Core Concepts

- Abstract Factory: the interface declaring creation methods for all product types in a family
- Concrete Factory: implements the Abstract Factory to produce a coherent set of product variants for one platform or theme
- Product family consistency: the pattern guarantees that products from the same factory are designed to work together

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Abstract Factory Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify product families**: group related product types (e.g., Button + Checkbox for a UI toolkit) into coherent families per platform or variant
2. **Define Abstract Product interfaces**: declare an interface for each product type in the family so clients depend on abstractions
3. **Define the Abstract Factory interface**: declare creation methods for each product type, returning Abstract Product interfaces
4. **Implement Concrete Factories**: create one factory class per product family, implementing all creation methods to produce the matching product variants
5. Configure the application with a Concrete Factory: inject or select the appropriate Concrete Factory at startup; all downstream code uses only the Abstract Factory

<details><summary>中文步骤</summary>

1. 识别产品族：将相关产品类型（如 UI 工具包的按钮和复选框）按平台或变体分组为连贯的产品族
2. 定义抽象产品接口：为族中每种产品类型声明接口，使客户端依赖抽象
3. 定义抽象工厂接口：为每种产品类型声明创建方法，返回抽象产品接口
4. 实现具体工厂：为每个产品族创建一个工厂类，实现所有创建方法以生产匹配的产品变体
5. 用具体工厂配置应用：在启动时注入或选择合适的具体工厂；所有下游代码只使用抽象工厂

</details>

## Do

- Do introduce Abstract Factory only when you genuinely need multiple families; premature abstraction is costly
- Do keep each Concrete Factory cohesive — every product it creates should belong to the same family or theme
- Do inject the Abstract Factory at the application composition root so the rest of the code never knows which family is active

## Don't

- Don't add new product types to an existing Abstract Factory lightly — it forces changes to all Concrete Factories
- Don't use Abstract Factory when Factory Method is sufficient; the added layer of abstraction has a real cost
- Don't let Concrete Factories hold mutable state; they should be stateless creation services

## Case Study

**Java Swing**: Java Swing's Pluggable Look-and-Feel (PLAF) architecture is Abstract Factory in action. The LookAndFeel class acts as the Abstract Factory, declaring creation methods for every UI component (Button, TextField, ScrollBar). Concrete factories like MetalLookAndFeel and WindowsLookAndFeel implement all methods, ensuring every widget produced in a session is visually consistent. Switching the entire UI theme requires changing only a single factory at startup.

## Related Frameworks

- factory-method-pattern (extends)
- solid-principles (complement)
- dependency-injection (complement)

## Source

https://sdframe.caldis.me/frameworks/abstract-factory-pattern
