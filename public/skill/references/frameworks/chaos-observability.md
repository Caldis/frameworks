# Chaos Observability / 混沌可观测性

- **Category**: observability
- **Complexity**: advanced
- **Quality**: reliability, testability, maintainability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Netflix Chaos Monkey (2011); chaos engineering principles formalized by Rosenthal, Casey et al. (2017, Chaos Engineering book)
- **Adopters**: Netflix, Gremlin, Amazon, LinkedIn, Microsoft Azure

Observability practices specifically designed for chaos engineering experiments and resilience validation

_专为混沌工程实验和弹性验证设计的可观测性实践_

## When to Use

Apply this framework when:
- When the team has completed basic chaos experiments and wants to validate that observability signals faithfully reflect system behavior during failures
- When conducting chaos experiments in production or staging and need safety mechanisms to automatically abort experiments that cause unexpected customer impact
- When building the organizational confidence to run chaos experiments in production by demonstrating that monitoring coverage is sufficient to detect and respond to emergent failures
- When testing whether the on-call alerting stack (SLO alerts, anomaly detectors) fires appropriately during a specific failure mode before that failure mode occurs organically

## When NOT to Use

Stop and reconsider if:
- Systems without basic distributed tracing and SLO-based alerting, where chaos observability would surface a 'no signal' gap rather than meaningful resilience validation
- Production systems that have never run chaos experiments in staging, where the first chaos experiment should always be in a lower environment
- Regulated financial or healthcare systems where any intentional fault injection requires formal risk assessment and regulatory approval before execution
- Teams in early-stage development where the cost of building chaos observability infrastructure exceeds the maturity level of the system being tested

## Core Concepts

- Steady-State Hypothesis: A pre-defined set of observable system behaviors (SLO metrics, health checks, queue depths) that must remain within acceptable bounds throughout a chaos experiment
- Blast Radius: The intentional scope limitation of a chaos experiment — restricted to a percentage of traffic, a single region, or specific pod labels — to limit customer impact if the experiment reveals unexpected behavior
- Experiment Annotation: A marker injected into the metrics and logging pipeline at experiment start and end, enabling engineers to overlay experiment windows on dashboards and correlate observability signals with fault injection
- Automatic Abort: A safety mechanism that monitors steady-state conditions during the experiment and terminates the experiment if conditions are violated beyond the blast radius, preventing runaway failures
- Observability-First Chaos: The principle that chaos experiments should only be run in systems that already have sufficient observability coverage — you cannot validate resilience if you cannot observe what happens during the failure

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Chaos Observability to?
- What constraints or existing architecture do you need to work within?
- Has your team used Chaos Observability before? (This is an advanced framework)

## Implementation Steps

1. Establish a pre-experiment observability baseline: capture screenshots or snapshots of dashboards (latency percentiles, error rates, saturation metrics) 15 minutes before the chaos experiment starts
2. Define the steady-state hypothesis in observable terms: 'p99 latency remains below 500ms', 'error rate stays under 0.1%', 'all health check endpoints return 200' — these are the abort conditions if violated
3. Instrument the chaos experiment itself with a start event and end event emitted as structured log events or trace spans with experiment_id, target, and fault_type labels so the experiment appears in dashboards
4. Monitor observability signals in real time during the experiment; configure an automatic abort trigger that halts the experiment if any steady-state condition is violated beyond the defined blast radius
5. Conduct a post-experiment analysis comparing the pre-experiment baseline to in-experiment and post-experiment metrics to validate whether the system behaved as expected and whether recovery was complete

<details><summary>中文步骤</summary>

1. 建立实验前可观测性基线：在混沌实验开始前15分钟捕获仪表板的截图或快照（延迟百分位数、错误率、饱和度指标）
2. 以可观测的术语定义稳态假设：「p99延迟保持在500ms以下」、「错误率保持在0.1%以下」、「所有健康检查端点返回200」——如果违反，这些是中止条件
3. 对混沌实验本身进行仪器化，发出带有experiment_id、target和fault_type标签的结构化日志事件或追踪span作为开始事件和结束事件，使实验出现在仪表板中
4. 在实验期间实时监控可观测性信号；配置自动中止触发器，如果任何稳态条件在定义的爆炸半径之外被违反，则停止实验
5. 进行实验后分析，比较实验前基线与实验中和实验后指标，以验证系统是否按预期运行，以及恢复是否完整

</details>

## Do

- Do define and validate the steady-state hypothesis before running the experiment because without a clear definition of 'working correctly', you cannot determine whether the chaos experiment revealed a problem
- Do annotate experiment start and end events in your metrics system so that engineers can overlay the experiment window on any dashboard to correlate signals with the fault injection
- Do start with the smallest possible blast radius (1% of traffic, a single instance) and expand only when you have confidence in your observability coverage and abort mechanisms
- Do treat a chaos experiment that doesn't trigger an alert as valuable negative data — it either validates resilience or reveals a gap in observability coverage

## Don't

- Don't run chaos experiments in systems that lack basic distributed tracing and SLO alerting because you will be unable to detect the impact of fault injection or determine when recovery is complete
- Don't skip the blast radius limitation in production because a full-production chaos experiment without a controlled scope is an uncontrolled incident, not an experiment
- Don't run chaos experiments during high-traffic business hours or before major product launches without executive approval because the blast radius risk is higher during peak load
- Don't treat chaos experiments as a one-time event because system complexity evolves continuously and resilience properties that held 6 months ago may not hold after significant architectural changes

## Case Study

**Netflix**: Netflix's Chaos Engineering team, which invented the discipline, runs thousands of automated chaos experiments per week against its production streaming infrastructure. Their Fault Injection Testing (FIT) platform integrates directly with Netflix's observability stack (Atlas metrics, Edgar tracing) so that every experiment is annotated in dashboards. Engineers can view the exact impact of a fault injection on p99 streaming start time, buffering ratio, and playback errors in real time. The FIT platform enforces automatic experiment abort if error rates exceed 0.1% above baseline, ensuring that experiments never materially impact the 220 million subscribers watching at any given moment. Netflix publishes that 99.99% of FIT experiments are halted within 30 seconds if steady-state conditions are violated.

## Related Frameworks

- slo-as-practice (complement)
- opentelemetry (complement)

## Source

https://sdframe.caldis.me/frameworks/chaos-observability
