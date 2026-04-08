# Functional Core / Imperative Shell / 函数式核心 / 命令式外壳

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: testability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Gary Bernhardt, 2012
- **Adopters**: Shopify, Stripe, GitHub, Jane Street, Nubank

Pure logic in the center, side effects only at the boundaries

_纯逻辑居于核心，副作用仅存在于边界层_

## When to Use

Apply this framework when:
- Applications with complex business logic that needs thorough testing without infrastructure dependencies
- Codebases with tangled side effects that make unit testing slow and flaky
- Multi-language systems where the pure core can be shared or ported across platforms
- Data pipelines where transformation logic should be independent of I/O mechanisms

## When NOT to Use

Stop and reconsider if:
- Highly interactive UI applications where state management is inherently stateful
- Systems dominated by I/O with very little business logic (e.g., proxy servers)
- Legacy codebases where extracting pure functions would require a massive rewrite
- Real-time systems where the overhead of data copying affects latency requirements

## Core Concepts

- Pure Functions: functions that always return the same output for the same input and produce no side effects
- Imperative Shell: the thin boundary layer that performs all I/O, state mutations, and external communications
- Data In, Data Out: the pure core communicates through plain data structures, not interfaces or service objects
- Testability by Design: pure functions can be tested with simple assertions; no mocks, stubs, or test doubles needed
- Push Effects to the Edges: move all side-effectful code as far outward as possible so the core remains pure

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Functional Core / Imperative Shell to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify side effects**: catalog all I/O, database calls, network requests, and mutations in the current codebase
2. **Extract pure functions**: move all decision-making and transformation logic into pure functions with no side effects
3. **Design the imperative shell**: create a thin outer layer that reads input, calls the pure core, and writes output
4. **Pass data, not dependencies**: the pure core receives plain data and returns plain data — no injected services or callbacks
5. **Test the core exhaustively**: unit-test pure functions with simple input/output assertions; integration-test only the shell

<details><summary>中文步骤</summary>

1. 识别副作用：编目当前代码库中所有I/O、数据库调用、网络请求和状态变更
2. 提取纯函数：将所有决策和转换逻辑移入无副作用的纯函数中
3. 设计命令式外壳：创建薄外层，负责读取输入、调用纯核心并写出结果
4. 传递数据而非依赖：纯核心接收普通数据并返回普通数据——不注入服务或回调
5. 穷尽测试核心：用简单的输入输出断言对纯函数做单元测试；仅对外壳做集成测试

</details>

## Do

- Do pass all needed data as function arguments because implicit state access breaks purity
- Do return new data structures from pure functions instead of mutating inputs because immutability prevents bugs
- Do keep the shell as thin as possible because the less imperative code you have, the fewer integration tests you need
- Do use value objects to pass structured data between shell and core because they enforce type safety

## Don't

- Don't inject services or repositories into the pure core because it reintroduces side-effect dependencies
- Don't perform logging or metrics collection inside pure functions because those are side effects
- Don't let the shell grow to contain business logic because it should only orchestrate I/O and delegation
- Don't test pure functions with mocks because they should be testable with plain input/output assertions

## Case Study

**Shopify**: Shopify's checkout system uses the Functional Core / Imperative Shell pattern in its Ruby codebase. All pricing, discount, and tax calculation logic lives in pure functions that receive cart data and return pricing results. The imperative shell handles payment gateway calls and database persistence. This separation enabled Shopify to achieve sub-100ms test suites for pricing logic and confidently handle Black Friday traffic spikes.

## Related Frameworks

- hexagonal-architecture (complement)
- clean-code-principles (complement)
- property-based-testing (complement)

## Source

https://sdframe.caldis.me/frameworks/functional-core-imperative-shell
