# Adapter Pattern / 适配器模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability, portability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- **Adopters**: AWS SDK, Spring Data, SLF4J, Jakarta EE Connectors

Convert one interface to another that clients expect

_将一个类的接口转换为客户期望的另一个接口，使原本不兼容的类可以协作_

## When to Use

Apply this framework when:
- Integrating a third-party library or legacy component whose interface is incompatible with your system's expectations
- You want to reuse existing classes without modifying their source code
- Building an anti-corruption layer to translate between external and internal domain models

## When NOT to Use

Stop and reconsider if:
- When you control both interfaces and can simply unify them without an adapter
- When the semantic gap between Adaptee and Target is so large that translation would be complex and error-prone
- When extensive data transformation is required — consider a dedicated mapper or anti-corruption layer with richer logic instead

## Core Concepts

- Target: the interface clients expect; adapters implement this to become drop-in replacements
- Adaptee: the existing class with incompatible interface being wrapped by the adapter
- Object vs Class adapter: object adapters use composition (preferred); class adapters use multiple inheritance (language-dependent)

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Adapter Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify the Target interface**: define the interface that the client code is written against and expects to interact with
2. **Identify the Adaptee**: locate the existing class with a useful but incompatible interface that you cannot or do not want to modify
3. **Create the Adapter class**: implement the Target interface and hold a reference to the Adaptee (object adapter) or inherit from it (class adapter)
4. **Delegate in each Target method**: implement each Target method by translating the call and its parameters into the equivalent Adaptee call
5. **Use the Adapter transparently**: configure or inject the Adapter where the client expects a Target; the client remains unaware of the Adaptee

<details><summary>中文步骤</summary>

1. 确定目标接口：定义客户端代码所针对并期望交互的接口
2. 确定被适配者：找到拥有有用但不兼容接口的现有类，您无法或不想修改它
3. 创建适配器类：实现目标接口，持有被适配者的引用（对象适配器）或继承它（类适配器）
4. 在每个目标方法中委托：通过将调用及其参数转换为等效的被适配者调用来实现每个目标方法
5. 透明使用适配器：在客户端期望目标的地方配置或注入适配器；客户端对被适配者一无所知

</details>

## Do

- Do prefer object adapters (composition) over class adapters (inheritance) for better flexibility and testability
- Do keep the adapter thin — its only job is interface translation, not additional business logic
- Do create an adapter per external system boundary to isolate integration concerns and simplify testing with mock adaptees

## Don't

- Don't put business logic in the adapter; it should only translate, not transform semantics
- Don't create adapters for interfaces that could simply be updated; only adapt what you cannot change
- Don't chain multiple adapters together — it signals a deeper design problem that should be addressed structurally

## Case Study

**AWS SDK**: The AWS SDK for Java uses Adapter extensively in its service client wrappers. The SDK exposes clean, idiomatic Java interfaces (S3Client, DynamoDbClient) that serve as Targets, while internally adapting the raw HTTP request/response cycle of each AWS service API. Application teams depend only on the idiomatic Target interface; when AWS changes the underlying HTTP protocol or authentication mechanism, only the adapter layer changes, insulating all business logic from API churn.

## Related Frameworks

- decorator-pattern (related)
- solid-principles (complement)

## Source

https://sdframe.caldis.me/frameworks/adapter-pattern
