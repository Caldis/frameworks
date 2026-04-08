# Factory Method Pattern / 工厂方法模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- **Adopters**: Java JDBC, Spring Framework, Angular, .NET HttpClientFactory

Delegate object creation to subclasses

_将对象的创建委托给子类决定，使父类无需依赖具体产品类_

## When to Use

Apply this framework when:
- A class cannot anticipate the exact type of objects it must create, deferring the decision to subclasses
- You want to give subclasses control over which objects they create while sharing the surrounding template logic
- Frameworks need to create objects whose type is unknown to the framework itself but known to its users

## When NOT to Use

Stop and reconsider if:
- When there is only one product type and no anticipated need for variation
- When the overhead of subclassing Creators is not justified by the complexity of the creation logic
- When dependency injection already manages object creation centrally, making factories redundant

## Core Concepts

- Creator: the class that declares the factory method, often providing default implementation or a template method that calls it
- Concrete Creator: overrides the factory method to produce a specific product, encapsulating instantiation details
- Product polymorphism: the creator's logic works against the Product interface, making it independent of which concrete product is made

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Factory Method Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the Product interface**: declare the interface or abstract class that all created objects must conform to
2. Declare the Creator with a factory method: write an abstract or virtual method in the Creator that returns a Product, leaving the concrete type unspecified
3. **Implement Concrete Creators**: subclass the Creator and override the factory method to instantiate and return the appropriate Concrete Product
4. **Use the product through its interface**: write the Creator's template business logic against the Product interface, not the concrete type
5. **Register or select creators dynamically**: optionally use a registry or configuration to choose which Concrete Creator to instantiate at runtime

<details><summary>中文步骤</summary>

1. 定义产品接口：声明所有创建对象必须符合的接口或抽象类
2. 在创建者中声明工厂方法：在创建者中编写抽象或虚方法，返回产品类型，不指定具体类型
3. 实现具体创建者：对创建者进行子类化，重写工厂方法以实例化并返回相应的具体产品
4. 通过接口使用产品：基于产品接口编写创建者的模板业务逻辑，而非依赖具体类型
5. 动态注册或选择创建者：可选地使用注册表或配置在运行时选择实例化哪个具体创建者

</details>

## Do

- Do define the factory method on an interface or abstract class so callers depend on the abstraction
- Do use the factory method to encapsulate all construction complexity — validation, configuration, dependency wiring
- Do prefer factory functions over factory classes in languages with first-class functions to reduce boilerplate

## Don't

- Don't use Factory Method when a simple constructor is sufficient; it adds indirection without benefit
- Don't make the factory method do heavy work like I/O or network calls; it should assemble, not execute
- Don't confuse Factory Method with Static Factory Method — the GoF pattern requires subclassing for variation

## Case Study

**Java JDBC**: Java's JDBC API is a textbook Factory Method implementation. DriverManager.getConnection() is the factory method — callers pass a connection URL, and the registered Driver (Concrete Creator) determines which Connection implementation to instantiate. Application code depends only on the java.sql.Connection interface, enabling transparent switching between MySQL, PostgreSQL, and Oracle drivers without changing a single line of business logic.

## Related Frameworks

- abstract-factory-pattern (related)
- solid-principles (complement)
- dependency-injection (complement)

## Source

https://sdframe.caldis.me/frameworks/factory-method-pattern
