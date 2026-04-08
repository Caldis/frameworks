# Continuous Testing / 持续测试

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: testability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Wayne Ariola, 2006
- **Adopters**: Etsy, Google, Amazon, Netflix, Spotify

Automated testing at every pipeline stage to provide continuous feedback on software quality throughout the delivery lifecycle

_在每个流水线阶段自动化测试，在交付生命周期中持续提供软件质量反馈_

## When to Use

Apply this framework when:
- When a team is adopting continuous delivery or continuous deployment and needs quality signals at every pipeline stage rather than only at release time
- When deployment frequency is increasing and manual testing cycles can no longer keep pace with the release cadence
- When production incidents frequently originate from regressions that a faster feedback loop would have caught before deployment
- When multiple teams contribute to a shared codebase and you need automated quality gates to prevent integration failures from reaching downstream stages

## When NOT to Use

Stop and reconsider if:
- Very early prototyping phases where requirements are too unstable to justify maintaining a test suite that will be completely rewritten
- One-off scripts or data migration utilities with extremely short lifespans where the investment in pipeline infrastructure exceeds the risk reduction benefit
- Projects with extremely low release frequency (once a year) where the infrastructure overhead of continuous testing does not justify the cycle time reduction

## Core Concepts

- Shift-left testing: moving test execution earlier in the pipeline so defects are detected and fixed when the cost of change is lowest — at commit time, not production time
- Quality gate: a defined threshold (coverage percentage, performance benchmark, security score) that the pipeline enforces as a binary pass/fail before stage promotion
- Test impact analysis: static or dynamic analysis that determines which tests are affected by a code change so only relevant tests run, reducing pipeline cycle time
- Environment parity: test environments at each pipeline stage must faithfully replicate production configuration, data volumes, and infrastructure to prevent environment-specific defects from escaping
- Continuous feedback loop: test results are published to developer dashboards and notification channels within minutes of commit so that the team can act on quality regressions immediately

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Continuous Testing to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Map tests to pipeline stages**: assign unit tests to the commit stage, integration and contract tests to the integration stage, performance and security tests to the pre-production stage, and smoke tests to the production stage
2. Instrument every pipeline stage with quality gates: define pass/fail thresholds (coverage minimum, error rate maximum, performance budget) that must be met before progressing to the next stage
3. **Shift tests left**: run the fastest and cheapest tests as early as possible in the pipeline so developers receive feedback within minutes of committing, not hours
4. **Parallelize test execution**: split test suites across concurrent workers and use test impact analysis to run only the tests affected by each code change, reducing pipeline duration
5. Treat test failures as deployment blockers: configure the pipeline to fail fast on any test stage regression and enforce a team norm that no new work is started until the pipeline is green

<details><summary>中文步骤</summary>

1. 将测试映射到流水线阶段：将单元测试分配到提交阶段，将集成和契约测试分配到集成阶段，将性能和安全测试分配到预生产阶段，将冒烟测试分配到生产阶段
2. 在每个流水线阶段设置质量门：定义进入下一阶段前必须满足的通过/失败阈值（最低覆盖率、最大错误率、性能预算）
3. 将测试左移：尽早在流水线中运行最快、最廉价的测试，使开发者在提交后数分钟内而非数小时后收到反馈
4. 并行化测试执行：将测试套件分散到并发工作节点，并使用测试影响分析只运行受每次代码变更影响的测试，减少流水线持续时间
5. 将测试失败视为部署阻止器：将流水线配置为在任何测试阶段回归时快速失败，并强制团队规范：在流水线变为绿色之前不启动新工作

</details>

## Do

- Do define quality gates with objective, measurable thresholds rather than subjective criteria so the pipeline can enforce them automatically without human judgment
- Do maintain a fast commit stage (under 10 minutes) by restricting it to unit tests and static analysis — move slower tests to later pipeline stages where they run in parallel
- Do track test flakiness as a first-class metric: quarantine flaky tests immediately because they erode trust in the entire pipeline and cause teams to ignore legitimate failures
- Do integrate security scanning (SAST, dependency audit) as a pipeline stage gate rather than a post-release activity so vulnerabilities are caught before they reach production

## Don't

- Don't treat test failures as optional or allow the pipeline to continue with known failures — a broken pipeline that teams work around teaches engineers to ignore quality signals
- Don't run all tests at every stage — this maximizes feedback time and pipeline cost; stage-appropriate test selection is essential for sustainable continuous testing
- Don't skip environment parity for lower pipeline stages — tests that pass in an under-resourced environment and fail in production provide false confidence rather than real quality assurance
- Don't conflate continuous testing with continuous integration — CI ensures code integrates cleanly; continuous testing ensures quality is validated continuously at every pipeline stage

## Case Study

**Etsy**: Etsy is widely cited as an early continuous delivery pioneer deploying to production over 50 times per day. Their continuous testing practice assigns different test suites to each pipeline stage: unit tests run on every commit and must complete within 8 minutes; integration tests covering critical buyer and seller flows run in parallel on dedicated workers; and a canary stage deploys the change to 1% of traffic with automated error rate monitoring acting as a production quality gate. When error rates exceed the baseline by more than 0.1%, the canary is automatically rolled back without human intervention. This architecture allowed Etsy to maintain sub-hour time-to-production for most changes while keeping incident rates lower than competitors deploying quarterly.

## Related Frameworks

- test-pyramid (complement)
- tdd (complement)
- chaos-engineering (complement)
- load-testing-patterns (related)

## Source

https://sdframe.caldis.me/frameworks/continuous-testing
