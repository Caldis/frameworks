# Builder Pattern / 构建器模式

- **Category**: coding
- **Complexity**: beginner
- **Quality**: maintainability, usability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- **Adopters**: OkHttp / Retrofit (Square), Lombok @Builder (Java), SwiftUI (view modifiers), Apache HttpClient

Construct complex objects step by step using a fluent API, separating construction from representation

_使用流式 API 逐步构建复杂对象，将构建过程与对象表示分离，支持多种表示形式_

## When to Use

Apply this framework when:
- A class has four or more constructor parameters, especially when several are optional, making call sites ambiguous and error-prone
- The same construction process should produce different representations (e.g., HTML vs PDF report builders)
- Object initialization requires a specific sequence of steps or validation logic that must not be bypassed

## When NOT to Use

Stop and reconsider if:
- Value objects with only one or two fields where a plain constructor with named parameters is more readable
- Mutable objects that change state frequently after construction — Builder is optimized for producing final, immutable products
- Performance-critical tight loops where the extra Builder object allocation per product is a measurable bottleneck

## Core Concepts

- Step-by-step construction: the Builder accumulates configuration through a series of named setter calls, making each parameter's purpose explicit at the call site
- Fluent interface: each setter returns the Builder instance, enabling a readable method-chain syntax that reads like natural language (new PersonBuilder().name("Alice").age(30).build())
- Separation of construction and representation: the Builder isolates complex assembly logic from the product class itself, allowing multiple Builder implementations to produce different product variants

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Builder Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify the complex object**: target classes with many constructor parameters (especially optional ones), telescoping constructors, or objects that require multi-step initialization
2. **Create the Builder class**: implement a separate Builder (often a static inner class) with a setter method for each configurable attribute, each returning the Builder itself for chaining
3. **Add validation in build()**: implement a terminal build() method that validates that required fields are set, assembles the final immutable object, and throws if preconditions are violated
4. **Make the target object immutable**: construct the target class so it only accepts a fully built Builder instance, storing all values as final fields accessible via getters
5. **Introduce a Director (optional)**: add a Director class for commonly used configurations so clients can produce standard products (e.g., buildMinimalConfig(), buildProductionConfig()) without repeating steps

<details><summary>中文步骤</summary>

1. 识别复杂对象：针对具有许多构造函数参数（尤其是可选参数）、伸缩式构造函数或需要多步初始化的类
2. 创建构建器类：实现一个单独的 Builder（通常是静态内部类），为每个可配置属性提供 setter 方法，每个方法返回 Builder 本身以支持链式调用
3. 在 build() 中添加验证：实现终结方法 build()，验证必填字段已设置，组装最终不可变对象，如违反前置条件则抛出异常
4. 使目标对象不可变：构造目标类使其只接受完全构建的 Builder 实例，将所有值存储为可通过 getter 访问的 final 字段
5. 引入 Director（可选）：为常用配置添加 Director 类，使客户端可以生产标准产品（如 buildMinimalConfig()、buildProductionConfig()）而无需重复步骤

</details>

## Do

- Do make the built product immutable by storing all fields as final and providing only getters — the Builder is the sole mutation point
- Do validate field combinations in build() rather than in individual setters, so validation runs once against the complete configuration
- Do provide sensible defaults for optional fields in the Builder so callers only need to specify what differs from the norm

## Don't

- Don't use Builder for simple objects with one or two required fields — it adds unnecessary ceremony where a plain constructor is clearer
- Don't allow the Builder to be reused after build() is called without a clear reset; reuse leads to accidental shared state between product instances
- Don't skip the terminal build() validation step — returning a partially configured object silently is worse than a clear exception at construction time

## Case Study

**OkHttp / Square**: OkHttp, the widely used Android and Java HTTP client, uses Builder throughout its API. OkHttpClient is constructed via OkHttpClient.Builder with chainable calls to set timeouts, interceptors, cache, SSL certificates, and proxy configuration. Request objects are built via Request.Builder with URL, method, headers, and body. Neither OkHttpClient nor Request can be constructed directly — only the Builder exposes setters, and build() produces immutable instances. This design made OkHttp's API self-documenting, prevented half-initialized client objects, and enabled Square's team to add new configuration options across major versions without breaking existing call sites.

## Related Frameworks

- factory-method-pattern (related)
- solid-principles (complement)
- strategy-pattern (related)

## Source

https://sdframe.caldis.me/frameworks/builder-pattern
