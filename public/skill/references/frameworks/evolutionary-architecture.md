# Evolutionary Architecture / 演进式架构

- **Category**: architecture
- **Complexity**: advanced
- **Quality**: maintainability, scalability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Neal Ford, 2015
- **Adopters**: Thoughtworks, Netflix, Spotify, Etsy, AutoTrader UK, HSBC

Neal Ford's approach to designing software systems that support incremental, guided change across all dimensions through fitness functions and architectural coupling analysis

_Neal Ford提出的软件系统设计方法，通过适应度函数和架构耦合分析支持在所有维度上的增量、有指导的变化_

## When to Use

Apply this framework when:
- For long-lived systems (5+ years) where the requirements, technology landscape, and organizational structure will inevitably change in ways that cannot be fully anticipated at design time
- In organizations practicing continuous delivery where the architecture must accommodate frequent, small-batch changes without accumulating structural debt
- When transitioning from monolith to microservices and needing structured, measured migration paths rather than speculative big-bang decomposition
- For platform engineering teams building internal developer platforms where fitness functions codify architectural standards that all consuming teams must meet

## When NOT to Use

Stop and reconsider if:
- For short-lived throwaway systems (prototypes, event-specific apps) where the investment in fitness function infrastructure exceeds the system's expected lifespan
- When the primary architectural constraint is raw performance rather than changeability — highly optimized systems often require tight coupling by design and resist the modularity that enables evolution
- For very small teams (2-3 developers) where the overhead of defining, instrumenting, and maintaining fitness functions is disproportionate to the coordination benefit they provide

## Core Concepts

- Fitness Function: An objective, automated metric that evaluates one architectural characteristic (performance, security, coupling, deployability) — analogous to a genetic algorithm's fitness function, determining whether a change improves or degrades architecture
- Architectural Coupling: The degree to which components are bound together in ways that prevent independent evolution — high afferent coupling (many dependents) and inappropriate cross-domain coupling are primary evolutionary obstacles
- Incremental Change: The principle that architectural change should happen in small, validated steps with each step evaluated against fitness functions, preventing the accumulation of unvalidated architectural debt
- Cyclic Dependencies: Dependency graphs where A depends on B which depends on A, the most destructive coupling pattern for evolutionary architectures because it forces coordinated deployment and prevents independent evolution
- Architecture Quantum: The smallest independently deployable unit that includes all the structural elements required for the system to function — identifying quanta reveals the natural boundaries for evolutionary decomposition

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Evolutionary Architecture to?
- What constraints or existing architecture do you need to work within?
- Has your team used Evolutionary Architecture before? (This is an advanced framework)

## Implementation Steps

1. **Define Fitness Functions**: Identify measurable criteria (deployment frequency, coupling metrics, test coverage, performance SLAs, security scan thresholds) that define what「fit」means for your architecture, and automate their evaluation in CI/CD
2. Identify Architectural Coupling Dimensions: Map afferent and efferent coupling across modules, measure cyclomatic complexity, identify inappropriate coupling between business domains that resist evolutionary change
3. **Establish Incremental Change Mechanisms**: Implement techniques enabling safe incremental change — feature flags, strangler fig pattern, branch by abstraction, parallel runs — that allow evolution without big-bang rewrites
4. **Guided Change with Fitness Functions**: As features are added or architecture evolves, fitness functions serve as automated guardrails — a failed fitness function in CI is an architectural regression, not just a test failure
5. **Continuous Architecture Review**: Replace periodic architecture review boards with continuous automated fitness function monitoring and lightweight architecture decision records (ADRs) that capture the 「why」behind each evolutionary step

<details><summary>中文步骤</summary>

1. 定义适应度函数：识别定义架构「适合」含义的可测量标准（部署频率、耦合指标、测试覆盖率、性能SLA、安全扫描阈值），并在CI/CD中自动化评估
2. 识别架构耦合维度：映射模块间的传入和传出耦合，测量圈复杂度，识别阻碍演进变化的业务领域间不当耦合
3. 建立增量变更机制：实施支持安全增量变化的技术——特性标志、绞杀者模式、通过抽象分支、并行运行——允许演进而无需大爆炸式重写
4. 用适应度函数指导变更：随着功能添加或架构演进，适应度函数充当自动化护栏——CI中失败的适应度函数是架构退化，而非仅仅是测试失败
5. 持续架构审查：用持续的自动化适应度函数监控和轻量级架构决策记录（ADR）取代定期架构审查委员会，捕获每个演进步骤背后的「原因」

</details>

## Do

- Start fitness functions from existing quality attributes — if you already measure deployment frequency, test coverage, and p99 latency, those are your first fitness functions with minimal new instrumentation
- Make fitness functions executable in CI so architectural degradation is caught at the same point as functional regressions — treat an architecture fitness failure as a build-breaking defect
- Use coupling visualization tools (Structure101, JDepend, dependency-cruiser) to make the current coupling state visible before planning evolutionary steps
- Combine fitness functions with Architecture Decision Records (ADRs) — fitness functions enforce the decision; ADRs explain why the decision was made and what tradeoffs were accepted

## Don't

- Don't design for imagined future requirements — evolutionary architecture means designing for changeability, not speculating about specific changes and over-engineering for them
- Don't treat fitness functions as a bureaucratic compliance checklist — each fitness function should protect a concrete architectural property that has caused or could cause a real business problem
- Don't attempt a full architecture migration in a single large project — evolutionary architecture demands incremental steps; a multi-year 「we'll rewrite everything」 plan is the antithesis of evolutionary thinking
- Don't neglect the organizational dimension — Conway's Law means team structure determines architecture; evolving the architecture without evolving the team topology creates an uphill battle against communication-driven coupling

## Case Study

**Thoughtworks**: Thoughtworks applied evolutionary architecture principles to a large European bank's core banking platform migration — a 15-year-old monolith serving 8 million customers. Rather than a big-bang rewrite, the team defined fitness functions covering: deployment frequency (target: daily from quarterly), test coverage (target: >80% from 23%), module coupling (ArchUnit rules preventing cross-domain imports), and performance regression detection (p95 latency gates in the pipeline). The strangler fig pattern incrementally extracted 12 bounded contexts over 18 months. Each extracted service had its own fitness function suite. By month 12, deployment frequency had increased from quarterly to weekly, with daily deployments achieved by month 18. The fitness functions prevented three architectural regressions that would have reintroduced cross-domain coupling in the new microservices.

## Related Frameworks

- domain-driven-design (complement)
- ports-and-adapters (complement)

## Source

https://sdframe.caldis.me/frameworks/evolutionary-architecture
