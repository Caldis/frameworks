# Testing Trophy / 测试奖杯模型

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: testability, reliability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Kent C. Dodds, 2018, 2017
- **Adopters**: PayPal, Shopify, Vercel, Netflix, GitHub

Emphasize integration tests as the highest-ROI testing layer

_强调集成测试作为投资回报率最高的测试层级_

## When to Use

Apply this framework when:
- Building modern JavaScript/TypeScript web applications with component-based frameworks
- Teams already using static typing and linting who want to optimize their test investment
- Projects where integration bugs cause more production incidents than unit-level logic errors
- Frontend-heavy applications with significant UI interaction logic

## When NOT to Use

Stop and reconsider if:
- Backend systems with complex algorithmic logic where unit tests are more valuable than integration tests
- Projects without static typing where the base layer of the trophy is effectively missing
- Systems with expensive integration test environments where unit tests are more cost-effective

## Core Concepts

- Static Analysis: Type checkers and linters as the zero-cost base layer catching bugs at compile time
- Integration Tests: The highest-ROI layer testing real interactions between components and services
- Confidence Coefficient: The idea that each test should maximize confidence per dollar of maintenance cost
- Testing Classification: Distinguishing tests by the type of confidence they provide, not just scope
- Write Tests Not Too Many Mostly Integration: Kent C. Dodds's guiding principle summarizing the approach

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Testing Trophy to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Start with static analysis**: use TypeScript, ESLint, and formatters as the wide base of the trophy to catch errors before runtime
2. **Invest heavily in integration tests**: test real component interactions, API calls, and database queries — the trophy's widest bulge
3. **Write focused unit tests**: cover complex algorithms and pure utility functions, but don't unit-test simple wiring or framework glue
4. **Add a small cap of E2E tests**: cover only the most critical happy paths and smoke tests with tools like Playwright or Cypress
5. **Optimize for confidence per test dollar**: measure defect escape rate per layer and shift investment toward the layer catching the most bugs

<details><summary>中文步骤</summary>

1. 从静态分析开始：使用TypeScript、ESLint和格式化工具作为奖杯的宽基座，在运行前捕获错误
2. 大量投入集成测试：测试真实的组件交互、API调用和数据库查询——奖杯最宽的部分
3. 编写聚焦的单元测试：覆盖复杂算法和纯工具函数，但不对简单装配或框架胶水做单元测试
4. 添加少量端到端测试：仅用Playwright或Cypress覆盖最关键的正向路径和冒烟测试
5. 优化每测试美元的置信度：衡量每层的缺陷逃逸率，将投入转向捕获最多bug的层级

</details>

## Do

- Do test components the way users interact with them because implementation-detail tests break on refactors
- Do invest in static analysis tooling because it catches entire categories of bugs for free
- Do write integration tests that span real component boundaries because that is where most bugs live
- Do use Testing Library's guiding principles to write tests that resemble how software is used

## Don't

- Don't write excessive unit tests for simple component wiring because they add maintenance cost without proportional confidence
- Don't test implementation details because such tests break on every refactor without catching real bugs
- Don't skip static analysis because it is the cheapest and fastest bug-catching layer available
- Don't rely solely on E2E tests because they are too slow and flaky for broad coverage

## Case Study

**PayPal**: At PayPal, Kent C. Dodds championed the Testing Trophy approach during his tenure, shifting the frontend team from heavy Enzyme unit tests to React Testing Library integration tests. This reduced test maintenance burden by roughly 40% while improving defect detection rates, as integration tests caught more cross-component bugs that unit tests had missed.

## Related Frameworks

- test-pyramid (alternative)
- tdd (complement)
- contract-testing (complement)

## Source

https://sdframe.caldis.me/frameworks/testing-trophy
