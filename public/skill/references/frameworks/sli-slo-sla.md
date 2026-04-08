# SLI/SLO/SLA / SLI/SLO/SLA

- **Category**: deployment
- **Complexity**: intermediate
- **Quality**: reliability, observability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Google SRE team, formalized by Ben Treynor Sloss, ~2003
- **Adopters**: Google, Datadog, Uber, Slack, New Relic

Define and measure service reliability through layered objectives

_通过分层目标体系定义和度量服务可靠性_

## When to Use

Apply this framework when:
- Services with external or internal customers who depend on measurable reliability guarantees
- Teams that need to balance shipping new features quickly and maintaining system stability
- Organizations establishing error budget policies to objectively decide when to freeze deployments
- Incident response processes that need clear thresholds for escalation and severity classification

## When NOT to Use

Stop and reconsider if:
- Internal tools with very few users where formal SLOs add overhead without meaningful reliability improvement
- Batch processing systems where request-based SLIs don't apply -- use job success rate metrics instead
- Very early-stage products where usage patterns are unknown and setting meaningful SLOs is premature
- Systems where 100% correctness is non-negotiable (financial transactions, medical devices) and error budgets don't apply

## Core Concepts

- Service Level Indicator (SLI): A quantitative measure of service quality, such as request latency at the 99th percentile or availability as the ratio of successful requests
- Service Level Objective (SLO): A target value or range for an SLI that the service team commits to maintaining
- Error Budget: The inverse of the SLO (1 - SLO) representing the allowable amount of unreliability; teams spend it on risky changes
- Burn Rate: The rate at which the error budget is being consumed; multi-window burn rate alerts detect both fast and slow exhaustion
- Service Level Agreement (SLA): A formal contract with customers that includes consequences when SLOs are breached, typically set looser than internal SLOs

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying SLI/SLO/SLA to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define SLIs (Service Level Indicators)**: choose quantitative measures like availability, latency, throughput
2. **Set SLOs (Service Level Objectives)**: establish target thresholds for each SLI (e.g., 99.9% availability)
3. **Calculate Error Budget**: the allowable failure margin (1 - SLO) available for risk-taking and innovation
4. Monitor SLIs in real time with dashboards; burn rate alerts signal when budget depletes too fast
5. Formalize SLAs (Service Level Agreements) with customers; tie consequences to SLO breaches

<details><summary>中文步骤</summary>

1. 定义SLI（服务水平指标）：选择可量化的度量指标，如可用性、延迟、吞吐量
2. 设定SLO（服务水平目标）：为每个SLI制定目标阈值（例如99.9%可用性）
3. 计算错误预算：可承受的失败裕量（1 - SLO），用于承担风险和推进创新
4. 通过仪表盘实时监控SLI，燃烧率告警在预算消耗过快时发出提示
5. 与客户签订正式SLA，明确违反SLO时的后果与处置机制

</details>

## Do

- Do choose SLIs that reflect what users actually care about (request success rate, page load time) rather than internal system metrics
- Do set SLOs based on user expectations and business impact analysis, not arbitrary five-nines targets
- Do implement error budget policies that clearly define what happens when the budget is exhausted
- Do use multi-window, multi-burn-rate alerting to catch both sudden outages and gradual degradation

## Don't

- Don't set SLOs at 100%, because it is mathematically impossible to achieve and leaves zero room for innovation
- Don't confuse SLOs with SLAs -- SLOs are internal engineering targets while SLAs are customer-facing contracts
- Don't create SLOs for every metric imaginable -- pick 3-5 that truly represent user happiness
- Don't ignore error budget consumption trends, because running hot signals systemic reliability issues

## Case Study

**Google**: Google pioneered the SLI/SLO/error budget model internally for services like Gmail, Search, and Cloud Platform. For Google Cloud, they publish external SLAs backed by financial credits. Internally, when a service exhausts its error budget, the team must shift focus from feature development to reliability improvements. This mechanism enables Google to maintain high reliability across thousands of services while still shipping features at high velocity.

## Related Frameworks

- four-golden-signals (complement)
- dora-metrics (complement)
- chaos-engineering (complement)

## Source

https://sdframe.caldis.me/frameworks/sli-slo-sla
