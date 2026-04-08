# Architectural Fitness Functions / 架构适应度函数

- **Category**: evolution
- **Complexity**: advanced
- **Quality**: maintainability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Neal Ford, Rebecca Parsons & Patrick Kua, 2017
- **Adopters**: Netflix, ThoughtWorks, Zalando, Intuit, N26

Automated tests that continuously verify architectural characteristics stay intact

_通过自动化测试持续验证架构特性保持完整_

## When to Use

Apply this framework when:
- Protecting performance SLAs as a growing team continuously ships code changes
- Enforcing module boundaries in a monorepo to prevent creeping coupling between domains
- Validating security compliance rules (e.g., no direct DB access from the API layer) automatically in CI
- Ensuring that migration to microservices doesn't inadvertently introduce circular dependencies

## When NOT to Use

Stop and reconsider if:
- A small startup with a simple codebase where manual code review is sufficient
- Purely experimental or throwaway prototypes where architectural integrity is not a priority
- The team lacks CI/CD infrastructure to run automated checks consistently
- Architecture is frozen and no new changes are planned — fitness functions protect evolving systems

## Core Concepts

- Fitness function: An objective function that assesses how well the architecture exhibits a desired characteristic
- Architectural characteristic: A quality attribute (performance, modularity, security) the system must maintain
- Atomic fitness function: Tests a single characteristic in isolation (e.g., no cyclic dependencies)
- Holistic fitness function: Tests emergent behavior across multiple characteristics (e.g., chaos experiments)
- Continuous verification: Fitness functions run automatically in CI/CD, catching architectural drift before it reaches production

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Architectural Fitness Functions to?
- What constraints or existing architecture do you need to work within?
- Has your team used Architectural Fitness Functions before? (This is an advanced framework)

## Implementation Steps

1. Identify the critical architectural characteristics to protect (coupling, latency, security)
2. Define measurable thresholds for each characteristic (e.g., max cyclic dependencies = 0)
3. Implement automated tests or tools (ArchUnit, chaos experiments, load tests) per characteristic
4. Integrate fitness function checks into the CI/CD pipeline as mandatory quality gates
5. Review and evolve the fitness function suite as architectural priorities shift over time

<details><summary>中文步骤</summary>

1. 确定需要保护的关键架构特性（耦合度、延迟、安全性等）
2. 为每项特性定义可量化阈值（如：最大循环依赖数 = 0）
3. 针对每项特性实现自动化测试或工具（ArchUnit、混沌实验、负载测试）
4. 将适应度函数检查集成到 CI/CD 流水线作为强制质量门禁
5. 随架构优先级的变化，持续审视和演进适应度函数套件

</details>

## Do

- Start with the most critical characteristic first — typically the one causing production incidents
- Make fitness functions fast enough to run on every commit, not just nightly builds
- Version your fitness function thresholds alongside the code so they evolve together
- Use ArchUnit or similar tools for structural checks and chaos tests for runtime characteristics

## Don't

- Don't create fitness functions for every possible characteristic — focus on the ones with real risk
- Don't set thresholds too loosely or too tightly — calibrate against current baseline data
- Don't treat fitness functions as static — they must evolve as the architecture's priorities change
- Don't rely only on compile-time checks — runtime characteristics like latency need production-like tests

## Case Study

**Netflix**: Netflix integrated architectural fitness functions into their deployment pipeline to safeguard their microservices architecture. They combined ArchUnit-style dependency checks with chaos engineering experiments (Chaos Monkey, Chaos Kong) to continuously validate both structural and runtime characteristics. This approach caught architectural drift early — for example, detecting when a new service inadvertently created a synchronous dependency chain that violated their latency budget.

## Related Frameworks

- continuous-architecture (complement)
- technical-debt-quadrant (complement)
- test-pyramid (complement)

## Source

https://sdframe.caldis.me/frameworks/architectural-fitness-functions
