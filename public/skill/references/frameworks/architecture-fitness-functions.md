# Architecture Fitness Functions / 架构适应度函数

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Neal Ford, Rebecca Parsons, Patrick Kua, 2017, 2015
- **Adopters**: ThoughtWorks, Netflix, Spotify, Zalando, ING Bank

Automated, objective compliance checks that continuously validate whether an architecture meets its defined characteristics

_自动化的客观合规检查，持续验证架构是否满足其定义的特征_

## When to Use

Apply this framework when:
- When architectural principles need to be enforced automatically because manual reviews are too slow or inconsistent
- When a system is evolving rapidly and there is a risk of architectural drift as new features are added
- When multiple teams contribute to a shared codebase and consistent architectural standards must be maintained
- When migrating or modernizing a system and you need guardrails to ensure the target architecture is being achieved

## When NOT to Use

Stop and reconsider if:
- Very early-stage prototypes where the architecture is intentionally fluid and constraints would slow exploration
- Small teams with strong shared understanding where the overhead of automated checks exceeds their governance value
- Throwaway systems with a planned short lifespan where architectural longevity is not a concern

## Core Concepts

- Fitness function: An objective, automated assessment that measures how well the architecture meets a specific characteristic
- Atomic fitness function: Tests a single architecture dimension in isolation, such as cyclic dependency detection or response time
- Holistic fitness function: Evaluates a combination of architecture characteristics together, such as deployment pipeline throughput
- Triggered vs. continuous: Some fitness functions run on each commit (triggered) while others monitor production metrics continuously
- Evolutionary architecture: The overarching principle that architecture should support guided, incremental change rather than big upfront design

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Architecture Fitness Functions to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the critical architecture characteristics (e.g., modularity, performance, security) that must be preserved as the system evolves
2. For each characteristic, define a measurable fitness function with a clear threshold or acceptance criterion
3. Implement the fitness functions as automated tests: unit-level (dependency checks), integration-level (latency budgets), or holistic (deployment frequency)
4. Integrate fitness functions into the CI/CD pipeline so they run automatically on every build or deployment
5. Review and update fitness functions regularly as architecture goals evolve, removing obsolete checks and adding new ones

<details><summary>中文步骤</summary>

1. 识别系统演进中必须保持的关键架构特征（如模块性、性能、安全性）
2. 为每个特征定义可度量的适应度函数，带有明确的阈值或验收标准
3. 将适应度函数实现为自动化测试：单元级（依赖检查）、集成级（延迟预算）或全局级（部署频率）
4. 将适应度函数集成到CI/CD管道中，使其在每次构建或部署时自动运行
5. 随着架构目标的演进定期审查和更新适应度函数，移除过时的检查并添加新的

</details>

## Do

- Do start with the most critical architecture characteristics because trying to measure everything at once leads to alert fatigue
- Do make fitness functions fast and deterministic because flaky or slow checks undermine developer trust in the pipeline
- Do treat fitness function thresholds as living documents because acceptable ranges change as the system matures
- Do visualize fitness function trends over time because trends reveal architectural drift before thresholds are breached

## Don't

- Don't write fitness functions that are too strict initially because they block development and get disabled rather than refined
- Don't rely solely on code-level checks because many architecture characteristics (latency, availability) require runtime measurement
- Don't forget to test the fitness functions themselves because a broken fitness function provides false confidence
- Don't use fitness functions as a substitute for architecture discussion because they enforce decisions but do not make them

## Case Study

**ThoughtWorks**: ThoughtWorks, the company where fitness functions originated, uses them extensively in client engagements to prevent architectural erosion during long-running modernization projects. On one large financial services client, they implemented fitness functions using ArchUnit to enforce that no module in the new microservices-ready codebase could depend on legacy shared libraries. They also added latency budget fitness functions that failed the build if any API endpoint exceeded 200ms at the p95 level. Over 18 months, these automated checks caught 47 architectural violations that would have otherwise slipped into production unnoticed.

## Related Frameworks

- adr (complement)
- atam (related)
- continuous-architecture (related)

## Source

https://sdframe.caldis.me/frameworks/architecture-fitness-functions
