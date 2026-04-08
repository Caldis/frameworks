# Chaos Engineering Practices / 混沌工程实践

- **Category**: deployment
- **Complexity**: advanced
- **Quality**: reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Netflix (Casey Rosenthal, Nora Jones), 2011-2017
- **Adopters**: Netflix, Amazon, Google, Gremlin, Shopify

Operational practices for controlled failure injection: GameDays, blast radius control, and resilience validation

_受控故障注入的运维实践：GameDay 演练、爆炸半径控制与韧性验证_

## When to Use

Apply this framework when:
- Production systems where unknown failure modes pose significant business risk
- Organizations building confidence in disaster recovery and failover mechanisms
- Teams that have mature monitoring and incident response but lack proactive resilience validation
- Pre-event hardening (before peak traffic seasons, major launches, or compliance audits)

## When NOT to Use

Stop and reconsider if:
- Systems with no monitoring or observability — you cannot learn from chaos you cannot observe
- Early-stage startups where basic reliability engineering (CI/CD, testing, monitoring) is not yet in place
- Environments with no rollback capability where injected failures could cause unrecoverable damage
- Highly regulated systems where unplanned outages, even controlled ones, violate compliance requirements

## Core Concepts

- Steady-State Hypothesis: A measurable definition of normal system behavior that experiments aim to disprove under failure conditions
- Blast Radius Control: Limiting the scope of chaos experiments through targeted injection, short durations, and automated kill switches
- GameDay: A structured, time-boxed event where teams deliberately inject failures and practice incident response in a controlled setting
- Resilience Regression: Without recurring chaos experiments, systems silently lose resilience as code and infrastructure change over time

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Chaos Engineering Practices to?
- What constraints or existing architecture do you need to work within?
- Has your team used Chaos Engineering Practices before? (This is an advanced framework)

## Implementation Steps

1. Define steady-state hypotheses based on business-critical SLIs and expected system behavior
2. Design experiments with explicit blast radius limits (scope, duration, rollback triggers)
3. Run GameDay exercises where cross-functional teams inject failures in production or pre-production
4. Observe system behavior under failure, comparing actual outcomes against steady-state hypotheses
5. Document findings, fix weaknesses, and schedule recurring chaos experiments to prevent regression

<details><summary>中文步骤</summary>

1. 基于业务关键 SLI 和预期系统行为定义稳态假设
2. 设计带有明确爆炸半径限制（范围、持续时间、回滚触发器）的实验
3. 运行 GameDay 演练，跨职能团队在生产或预生产环境中注入故障
4. 观察故障下的系统行为，将实际结果与稳态假设进行比较
5. 记录发现、修复弱点并安排定期混沌实验以防止回归

</details>

## Do

- Start with the smallest possible blast radius and expand gradually as team confidence grows
- Always have a clear rollback plan and kill switch before starting any chaos experiment
- Involve on-call engineers and SREs in GameDay planning to build real incident response muscle memory
- Document every experiment's hypothesis, execution, findings, and follow-up actions in a shared runbook

## Don't

- Don't run chaos experiments without stakeholder buy-in — surprise failures erode organizational trust
- Don't inject failures during known peak traffic or business-critical windows without explicit approval
- Don't treat chaos engineering as a one-time exercise — resilience degrades continuously and must be tested regularly
- Don't skip the hypothesis step — running random failures without a measurable hypothesis yields noise, not insight

## Case Study

**Amazon**: Amazon runs regular GameDay exercises across its retail and AWS infrastructure, simulating region-level failures and dependency outages. During a 2019 GameDay, teams discovered that a critical payment service had an undocumented dependency on a caching layer that would cause cascading failures during an AZ outage. The finding was fixed before Prime Day, preventing what could have been a multi-million dollar incident during peak shopping hours.

## Related Frameworks

- chaos-engineering (extends)
- slo-as-practice (complement)
- on-call-engineering (complement)
- runbook-automation (complement)
- progressive-delivery (complement)

## Source

https://sdframe.caldis.me/frameworks/chaos-engineering-practices
