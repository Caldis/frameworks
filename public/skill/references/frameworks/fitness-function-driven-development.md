# Fitness Function-Driven Development / 适应度函数驱动开发

- **Category**: evolution
- **Complexity**: advanced
- **Quality**: maintainability, reliability, testability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Neal Ford, 2009
- **Adopters**: ThoughtWorks, Netflix, Spotify, Zalando, Wealthfront

Automated architecture governance using executable fitness functions that continuously verify architectural characteristics are preserved during system evolution

_使用可执行适应度函数进行自动化架构治理，持续验证架构特性在系统演进过程中得以保留_

## When to Use

Apply this framework when:
- When architectural drift is a recurring problem — teams unknowingly introduce circular dependencies, performance regressions, or coupling violations during feature development
- When architecture principles exist in documents but are not enforced — fitness functions translate human-readable principles into machine-checkable rules
- When migrating a monolith to microservices and you need guardrails to prevent the new architecture from regressing toward the same coupling patterns
- When operating in regulated industries where compliance rules (data residency, encryption at rest, audit logging) must be continuously verified rather than periodically audited

## When NOT to Use

Stop and reconsider if:
- Early-stage startups or prototypes where the architecture is intentionally fluid and premature governance would constrain experimentation needed to find product-market fit
- Small codebases with a single team where direct architectural communication and lightweight code review substitute effectively for automated governance
- Systems at the end of their lifecycle where the investment in fitness function infrastructure will not be amortized before the system is replaced
- Teams without CI/CD pipelines — fitness functions require automated execution infrastructure; manual checks are not a viable substitute

## Core Concepts

- Fitness Function: An objective, executable function that evaluates a specific architectural characteristic — analogous to a test that targets architecture rather than behavior, running automatically in the CI/CD pipeline
- Architectural Characteristics: The '-ilities' (maintainability, scalability, security, performance, deployability) that define the system's structural quality and must be preserved as the codebase evolves
- Incremental Change with Feedback: Fitness functions enable teams to make small, frequent changes to the architecture while receiving immediate automated feedback when those changes violate architectural principles
- Guided Evolution: The set of active fitness functions defines the 'fitness landscape' — the boundary within which the architecture is free to evolve while still meeting its non-functional requirements
- Cyclic Dependency Detection: One of the most common and valuable fitness functions is automated detection of package/module cyclic dependencies (using ArchUnit, Dependency Cruiser, or NDepend), which are a leading indicator of architectural decay

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Fitness Function-Driven Development to?
- What constraints or existing architecture do you need to work within?
- Has your team used Fitness Function-Driven Development before? (This is an advanced framework)

## Implementation Steps

1. Identify the architectural characteristics (coupling thresholds, cyclic dependency limits, performance SLOs, security compliance rules) that must be preserved as the system evolves, drawing from ADRs, architecture principles documents, and non-functional requirements
2. Implement each characteristic as an executable fitness function: coupling metrics as JDepend/ArchUnit rules, performance SLOs as load test assertions in CI, security posture as automated vulnerability scan thresholds, and data residency as policy-as-code rules
3. Classify fitness functions by execution cadence: atomic (run on every commit in the CI pipeline), triggered (run on a schedule or deployment event), and continual (run as production synthetic monitors)
4. Integrate fitness function results into the deployment pipeline as hard gates — failing fitness functions block promotion to the next environment, treating architectural violations as build failures
5. Review and evolve fitness function thresholds at each architectural review: retiring obsolete functions, tightening thresholds as the system matures, and adding new functions when new architectural risks are identified

<details><summary>中文步骤</summary>

1. 识别系统演进中必须保留的架构特性（耦合阈值、循环依赖限制、性能 SLO、安全合规规则），从 ADR、架构原则文档和非功能性需求中提取
2. 将每个特性实现为可执行的适应度函数：耦合指标作为 JDepend/ArchUnit 规则、性能 SLO 作为 CI 中的负载测试断言、安全态势作为自动化漏洞扫描阈值、数据驻留作为策略即代码规则
3. 按执行频率对适应度函数分类：原子型（每次提交在 CI 流水线中运行）、触发型（按计划或部署事件运行）和持续型（作为生产合成监控运行）
4. 将适应度函数结果作为硬性门禁集成到部署流水线中——适应度函数失败会阻止晋升到下一个环境，将架构违规视为构建失败
5. 在每次架构审查时审视并演进适应度函数阈值：退役过时函数、随系统成熟收紧阈值，以及在识别到新架构风险时添加新函数

</details>

## Do

- Do start with the highest-risk architectural characteristics first — coupling thresholds and dependency direction are quick wins that immediately surface structural decay
- Do treat fitness function failures as build failures with the same urgency as failing unit tests — an architectural violation that is not blocked becomes a permanent regression
- Do version-control fitness function rules alongside the production code so that threshold changes are reviewed and auditable in pull requests
- Do run atomic fitness functions in the CI pipeline (seconds to minutes) and reserve heavier functions (load tests, full security scans) for scheduled or pre-release gates to avoid developer workflow friction

## Don't

- Don't create fitness functions for trivial or cosmetic concerns (code style, comment density) — fitness functions are for architectural invariants, not style guides, which belong in linters
- Don't set thresholds so strict they fail on day one — start permissive to establish a baseline and tighten incrementally; a fitness function that always fails is ignored
- Don't silently suppress fitness function failures in the pipeline without a documented exception process — unchecked suppressions accumulate into untracked architectural debt
- Don't make all fitness functions atomic/blocking — over-gating the CI pipeline with slow checks destroys developer productivity; classify and run at the appropriate cadence

## Case Study

**ThoughtWorks**: ThoughtWorks applied fitness function-driven development on a large-scale financial services platform migration from a 10-year-old monolith to a microservices architecture. The team implemented 47 fitness functions covering coupling thresholds (maximum 5 inbound dependencies per service), performance SLOs (p95 < 200ms for payment APIs), data residency (no EU personal data in non-EU regions), and security posture (no high-severity CVEs in container images). Fitness functions caught 12 architectural violations during the 18-month migration that would have required costly rollbacks if discovered in production, including a circular dependency chain between 5 services that emerged when two squads independently refactored their service boundaries in the same sprint.

## Related Frameworks

- adr-y-statements (complement)
- living-documentation (complement)
- strangler-fig-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/fitness-function-driven-development
