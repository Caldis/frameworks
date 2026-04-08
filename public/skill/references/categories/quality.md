# Quality Engineering / 质量保障

Testing strategies, reliability patterns, observability, and verification approaches.

测试策略、可靠性模式、可观测性与验证方法。

**25 frameworks** in this category.

## Frameworks

### Test Pyramid / 测试金字塔
- **Slug**: test-pyramid
- **Complexity**: beginner
- **Quality**: testability, reliability
- **Author**: Mike Cohn, 2009
- Balance unit, integration, and E2E tests by cost and speed

### Testing Trophy / 测试奖杯模型
- **Slug**: testing-trophy
- **Complexity**: intermediate
- **Quality**: testability, reliability
- **Author**: Kent C. Dodds, 2018
- Emphasize integration tests as the highest-ROI testing layer

### Test-Driven Development (TDD) / 测试驱动开发
- **Slug**: tdd
- **Complexity**: intermediate
- **Quality**: testability, maintainability
- **Author**: Kent Beck, 1999
- Write failing tests first, then code to pass, then refactor

### Behavior-Driven Development (BDD) / 行为驱动开发
- **Slug**: bdd
- **Complexity**: intermediate
- **Quality**: testability, usability
- **Author**: Dan North, 2006
- Specify behavior in Given-When-Then shared by all stakeholders

### Property-Based Testing / 基于属性的测试
- **Slug**: property-based-testing
- **Complexity**: advanced
- **Quality**: testability, reliability
- **Author**: Koen Claessen & John Hughes, 2000
- Test invariant properties with auto-generated random inputs

### Chaos Engineering / 混沌工程
- **Slug**: chaos-engineering
- **Complexity**: advanced
- **Quality**: reliability
- **Author**: Netflix, 2011
- Inject controlled failures to build confidence in system resilience

### Circuit Breaker Pattern / 熔断器模式
- **Slug**: circuit-breaker-pattern
- **Complexity**: intermediate
- **Quality**: reliability
- **Author**: Michael Nygard, 2007
- Prevent cascading failures by short-circuiting failing calls

### Bulkhead Pattern / 舱壁模式
- **Slug**: bulkhead-pattern
- **Complexity**: advanced
- **Quality**: reliability
- **Author**: Michael Nygard, 2007
- Isolate components so a failure in one doesn't sink the whole system

### USE Method / USE 方法
- **Slug**: use-method
- **Complexity**: intermediate
- **Quality**: observability, performance
- **Author**: Brendan Gregg, 2012
- Check Utilization, Saturation, Errors for every resource

### RED Method / RED 方法
- **Slug**: red-method
- **Complexity**: beginner
- **Quality**: observability, performance
- **Author**: Tom Wilkie, 2018
- Monitor Request rate, Error rate, Duration for each service

### Four Golden Signals / 四大黄金信号
- **Slug**: four-golden-signals
- **Complexity**: beginner
- **Quality**: observability, reliability
- **Author**: Google SRE Team, 2016
- Monitor Latency, Traffic, Errors, Saturation for any service

### LLM Evaluation Framework / 大模型评估框架
- **Slug**: llm-evaluation-framework
- **Complexity**: advanced
- **Quality**: reliability, testability
- **Author**: OpenAI / Anthropic / Google, 2023
- Systematically evaluate LLM output quality and reliability

### AI Output Verification / AI 输出验证
- **Slug**: ai-output-verification
- **Complexity**: intermediate
- **Quality**: reliability, security
- **Author**: Guardrails AI / NeMo Guardrails (NVIDIA), 2023
- Multi-layer checks ensuring AI-generated content is trustworthy

### Agent Reliability Patterns / 智能体可靠性模式
- **Slug**: agent-reliability-patterns
- **Complexity**: advanced
- **Quality**: reliability
- **Author**: Anthropic / LangChain / OpenAI, 2023
- Patterns ensuring AI agents behave predictably in production

### Prompt Testing / 提示词测试
- **Slug**: prompt-testing
- **Complexity**: intermediate
- **Quality**: testability, reliability
- **Author**: Promptfoo (Ian Webster), 2023
- Automated regression testing for LLM prompt changes

### Mutation Testing / 变异测试
- **Slug**: mutation-testing
- **Complexity**: intermediate
- **Quality**: testability
- **Author**: Richard Lipton, 1971
- Test the tests by introducing code mutations and verifying that tests catch them

### Snapshot Testing / 快照测试
- **Slug**: snapshot-testing
- **Complexity**: beginner
- **Quality**: testability
- **Author**: Jest team at Facebook, 2016
- Capture output snapshots for regression detection by comparing current output against stored baselines

### Load Testing Patterns / 负载测试模式
- **Slug**: load-testing-patterns
- **Complexity**: intermediate
- **Quality**: reliability, performance
- **Author**: Michael Nygard, 2007
- Stress, spike, soak testing methodologies to validate system behavior under varying load conditions

### Error Handling Patterns / 错误处理模式
- **Slug**: error-handling-patterns
- **Complexity**: intermediate
- **Quality**: reliability
- **Author**: Michael Nygard, 2007
- Fail-fast, retry, fallback, and dead letter queue patterns for resilient error management

### Observability-Driven Development / 可观测性驱动开发
- **Slug**: observability-driven-development
- **Complexity**: advanced
- **Quality**: observability, reliability
- **Author**: Charity Majors, 2018
- Design for observability from the start, not after — build systems that explain their own behavior

### Continuous Testing / 持续测试
- **Slug**: continuous-testing
- **Complexity**: intermediate
- **Quality**: testability, reliability
- **Author**: Wayne Ariola
- Automated testing at every pipeline stage to provide continuous feedback on software quality throughout the delivery lifecycle

### Visual Regression Testing / 视觉回归测试
- **Slug**: visual-regression-testing
- **Complexity**: intermediate
- **Quality**: testability, reliability
- **Author**: Percy.io
- Screenshot comparison between baseline and current UI to catch unintended visual changes automatically

### Pact Contract Testing / Pact 契约测试
- **Slug**: pact-contract-testing
- **Complexity**: intermediate
- **Quality**: testability, reliability
- **Author**: Ron Holshausen
- Consumer-driven contract verification between services ensuring API compatibility without end-to-end integration environments

### Fuzz Testing / 模糊测试
- **Slug**: fuzz-testing
- **Complexity**: advanced
- **Quality**: security, reliability
- **Author**: Barton Miller
- Automated testing technique that feeds randomly generated, malformed, or unexpected inputs to a program to discover crashes, security vulnerabilities, and undefined behaviour.

### Accessibility Testing (WCAG) / 无障碍测试（WCAG）
- **Slug**: accessibility-testing-wcag
- **Complexity**: intermediate
- **Quality**: usability, reliability
- **Author**: W3C WAI
- Systematic testing approach combining automated scanning and manual evaluation to verify that digital products comply with WCAG accessibility guidelines and are usable by people with disabilities.
