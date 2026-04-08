# Test Pyramid / 测试金字塔

- **Category**: quality
- **Complexity**: beginner
- **Quality**: testability, reliability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Mike Cohn, 2009, 2003
- **Adopters**: Google, Microsoft, Spotify, Atlassian, ThoughtWorks

Balance unit, integration, and E2E tests by cost and speed

_按成本与速度平衡单元测试、集成测试和端到端测试_

## When to Use

Apply this framework when:
- Designing a test strategy for a new project or service from scratch
- Auditing an existing test suite that has become slow or flaky
- Onboarding a team to testing best practices with a simple mental model
- Balancing CI pipeline speed against test coverage confidence

## When NOT to Use

Stop and reconsider if:
- Highly UI-driven applications where visual correctness matters more than logic coverage
- Simple CRUD apps with minimal business logic where integration tests provide more value
- Exploratory prototyping phases where tests would be immediately rewritten

## Core Concepts

- Unit Tests: Fast, isolated tests of individual functions or classes with no external dependencies
- Integration Tests: Tests verifying that multiple components, services, or databases work correctly together
- End-to-End Tests: Full-stack tests simulating real user journeys through the entire system
- Pyramid Shape: More unit tests at the base, fewer integration in the middle, fewest E2E at the top
- Cost-Speed Tradeoff: Higher-level tests provide more confidence but are slower, more expensive, and more brittle

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Test Pyramid to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Build a wide base of unit tests**: fast, isolated tests covering business logic, pure functions, and edge cases with high coverage
2. **Add a middle layer of integration tests**: verify that modules, services, and databases work together correctly at boundaries
3. **Write a thin top layer of E2E tests**: cover critical user journeys only, accepting slower execution and higher maintenance cost
4. **Enforce the pyramid shape in CI**: set coverage gates per layer and fail builds when the ratio inverts (too many E2E, too few unit)
5. **Review and rebalance quarterly**: analyze flaky tests, slow suites, and coverage gaps to maintain the pyramid's health over time

<details><summary>中文步骤</summary>

1. 构建宽广的单元测试基础：快速、隔离的测试覆盖业务逻辑、纯函数和边界情况
2. 添加中间层集成测试：验证模块、服务和数据库在边界处正确协作
3. 编写薄顶层端到端测试：仅覆盖关键用户旅程，接受较慢的执行速度和较高的维护成本
4. 在CI中强制金字塔形状：为每层设置覆盖率门槛，比例倒置时构建失败
5. 季度审查与再平衡：分析不稳定测试、慢速套件和覆盖盲区，维持金字塔长期健康

</details>

## Do

- Do keep unit tests fast (under 10ms each) because slow unit tests discourage frequent runs
- Do isolate layers with test doubles so each level validates its own concerns independently
- Do track the ratio of tests per layer because an inverted pyramid signals structural problems
- Do invest in deterministic tests because flaky tests erode team confidence in the entire suite

## Don't

- Don't write E2E tests for every feature because they are slow, brittle, and expensive to maintain
- Don't mock everything in integration tests because over-mocking hides real integration bugs
- Don't ignore flaky tests because they train teams to dismiss legitimate failures
- Don't treat the pyramid as a rigid rule because some architectures need a different shape

## Case Study

**Google**: Google's engineering teams maintain a roughly 70/20/10 split between unit, integration, and E2E tests across their monorepo. This ratio keeps their CI pipeline fast while still catching integration issues. When teams deviated toward too many E2E tests, build times spiked and flaky test rates increased, prompting internal tooling to enforce pyramid ratios.

## Related Frameworks

- testing-trophy (alternative)
- tdd (complement)
- property-based-testing (complement)

## Source

https://sdframe.caldis.me/frameworks/test-pyramid
