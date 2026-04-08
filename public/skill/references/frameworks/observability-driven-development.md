# Observability-Driven Development / 可观测性驱动开发

- **Category**: quality
- **Complexity**: advanced
- **Quality**: observability, reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Charity Majors, 2018, 2010
- **Adopters**: Honeycomb, Google, Slack, GitHub, Lightstep

Design for observability from the start, not after — build systems that explain their own behavior

_从一开始就为可观测性设计，而非事后补救——构建能解释自身行为的系统_

## When to Use

Apply this framework when:
- Starting a new service or system where observability can be designed in from the architecture phase
- Operating distributed microservices where request paths cross multiple services and debugging requires correlated traces
- After experiencing production incidents where lack of telemetry made root cause analysis slow or impossible
- Building platforms that other teams depend on, where SLOs and error budgets govern reliability contracts

## When NOT to Use

Stop and reconsider if:
- Tiny single-process applications where simple logging and error output provide sufficient operational visibility
- Short-lived scripts or batch jobs where execution is deterministic and debugging relies on input-output validation
- Very early prototypes where operational concerns are irrelevant and shipping speed is the only priority

## Core Concepts

- Three Pillars: Logs (discrete events), metrics (aggregated measurements), and traces (request-scoped causal chains) as complementary observability signals
- Structured Logging: Emitting log events as key-value pairs or JSON instead of unstructured text, enabling machine parsing and querying
- Distributed Tracing: Propagating trace IDs across service boundaries to reconstruct the full lifecycle of a request through the system
- SLI/SLO: Service Level Indicators measure what users experience; Service Level Objectives define acceptable thresholds for those indicators
- High Cardinality: The ability to query telemetry by any combination of dimensions (user ID, request ID, feature flag) to debug unique issues

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Observability-Driven Development to?
- What constraints or existing architecture do you need to work within?
- Has your team used Observability-Driven Development before? (This is an advanced framework)

## Implementation Steps

1. Define observability requirements during design: identify what questions operators will need to answer and what signals will provide those answers
2. Instrument code with structured logging, metrics, and distributed traces from day one, treating observability as a first-class feature
3. **Establish SLIs and SLOs early**: define service level indicators and objectives that drive alerting, dashboards, and capacity decisions
4. Build dashboards and runbooks alongside features: every new feature ships with the monitoring needed to operate it in production
5. **Practice observability in development**: use the same tools locally that run in production so developers build intuition for system behavior

<details><summary>中文步骤</summary>

1. 在设计阶段定义可观测性需求：确定运维人员需要回答的问题以及提供这些答案的信号
2. 从第一天起用结构化日志、指标和分布式追踪检测代码，将可观测性视为一等特性
3. 尽早建立SLI和SLO：定义驱动告警、仪表盘和容量决策的服务水平指标和目标
4. 将仪表盘和运行手册与功能一起构建：每个新功能都附带在生产中运维所需的监控
5. 在开发中实践可观测性：在本地使用与生产中运行的相同工具，使开发者建立对系统行为的直觉

</details>

## Do

- Do instrument code during development because retrofitting observability into running systems is 10x more expensive and error-prone
- Do use structured logging everywhere because unstructured log messages cannot be efficiently queried, aggregated, or correlated
- Do propagate trace context across all service boundaries because broken trace chains make distributed debugging impossible
- Do define SLOs before launching because without explicit reliability targets there is no objective basis for operational decisions

## Don't

- Don't add observability as an afterthought because post-hoc instrumentation misses critical paths and creates blind spots
- Don't alert on every metric because alert fatigue causes teams to ignore real incidents hidden among noise
- Don't collect telemetry without retention policies because unbounded storage costs grow exponentially and degrade query performance
- Don't treat logs, metrics, and traces as independent systems because correlated signals provide 10x more diagnostic value than isolated ones

## Case Study

**Honeycomb**: Honeycomb, founded by Charity Majors, practices observability-driven development as their core engineering philosophy. Every feature is designed with high-cardinality instrumentation from the start, enabling engineers to ask arbitrary questions about production behavior without pre-defining dashboards. When a customer reported intermittent slow queries, an engineer used trace-level analysis to identify that a specific combination of tenant size, query complexity, and time-of-day caused cache eviction storms — a root cause that traditional monitoring would have taken days to identify but was found in under 30 minutes with proper observability.

## Related Frameworks

- error-budget-policy (complement)
- chaos-engineering (complement)
- twelve-factor-app (complement)

## Source

https://sdframe.caldis.me/frameworks/observability-driven-development
