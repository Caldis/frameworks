# Error Budget Policy / 错误预算策略

- **Category**: observability
- **Complexity**: intermediate
- **Quality**: reliability, observability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Google SRE team (Ben Treynor Sloss), ~2003; formalized in SRE Book
- **Adopters**: Google, Netflix, Uber, Dropbox, LinkedIn

Managing reliability vs velocity trade-offs through quantified error budgets and escalation policies

_通过量化的错误预算和升级策略管理可靠性与开发速度的权衡_

## When to Use

Apply this framework when:
- Teams locked in perpetual conflict between product managers pushing features and SREs demanding stability
- Organizations that need an objective, data-driven mechanism to decide when to freeze deploys vs ship faster
- Services where past incidents trace back to shipping too many risky changes without reliability investment
- Engineering leadership seeking to quantify the cost of unreliability in terms product teams understand

## When NOT to Use

Stop and reconsider if:
- Small teams without dedicated SRE function where the policy overhead exceeds the coordination benefit
- Systems with legal zero-tolerance requirements for errors where error budgets are conceptually inapplicable
- Pre-product-market-fit startups where speed is existential and any deployment friction could be fatal
- Organizations lacking basic SLO measurement infrastructure -- you cannot enforce budgets you cannot measure

## Core Concepts

- Error Budget: The mathematically derived tolerance for unreliability (1 - SLO); a 99.9% SLO yields a 0.1% error budget, approximately 43 minutes per month
- Burn Rate: The speed at which the error budget is being consumed; a burn rate of 2x means the budget will exhaust in half the window period
- Policy Tiers: Predefined escalation levels triggered at specific budget consumption percentages, ranging from increased review to full deployment freezes
- Budget Replenishment: Error budgets reset at the start of each rolling window (typically 30 days), giving teams a fresh allocation to spend on innovation
- Override Authority: A documented exception process for cases where business-critical launches must proceed despite an exhausted budget, with mandatory post-mortems

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Error Budget Policy to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Calculate the error budget from SLO targets: if the SLO is 99.9% availability, the error budget is 0.1% of total requests (or ~43 minutes of downtime per 30-day window)
2. **Define budget consumption tracking**: instrument real-time dashboards showing remaining budget as a percentage, burn rate, and projected exhaustion date
3. **Establish tiered policy actions**: specify what happens at each threshold (e.g., 50% consumed: weekly review, 75%: halt risky deploys, 100%: reliability-only sprint)
4. **Create an escalation matrix**: define who has authority to override the policy, under what circumstances, and what documentation is required
5. Run retrospectives when budgets are exhausted or replenished: analyze what consumed the budget, whether the policy actions were effective, and adjust thresholds for the next period

<details><summary>中文步骤</summary>

1. 根据SLO目标计算错误预算：若SLO为99.9%可用性，错误预算为总请求的0.1%（或30天窗口内约43分钟停机时间）
2. 定义预算消耗追踪：构建实时仪表盘显示剩余预算百分比、燃烧率和预计耗尽日期
3. 建立分级策略行动：规定每个阈值处的行动（如消耗50%：每周审查，75%：暂停高风险部署，100%：纯可靠性冲刺）
4. 创建升级矩阵：定义谁有权覆盖策略、在什么情况下以及需要什么文档记录
5. 在预算耗尽或补充时进行回顾：分析什么消耗了预算、策略行动是否有效，并为下一周期调整阈值

</details>

## Do

- Do make the error budget policy a written, signed document agreed upon by engineering, product, and management before incidents occur
- Do automate budget tracking and alerting so that policy actions are triggered by data, not by someone remembering to check a dashboard
- Do include positive incentives for teams with remaining budget (more experimental deployments, hack time) alongside the restrictive actions for exhaustion
- Do treat error budget policy violations (shipping despite exhaustion without override) as a process failure warranting retrospective

## Don't

- Don't set error budget policies without executive buy-in, because a policy that product leadership can ignore at will provides no value
- Don't make the budget window too short (e.g., 7 days), because short windows are too volatile and trigger false deployment freezes from single incidents
- Don't use error budgets to punish teams, because it creates incentives to hide incidents or inflate SLO targets to make budgets artificially large
- Don't apply the same policy rigidity to all services, because a 0.1% budget for a payment service has different business impact than 0.1% for a recommendations widget

## Case Study

**Google**: Google's internal error budget policy is the canonical example: when a service like Gmail exhausts its error budget, the development team must halt feature launches and dedicate the next sprint to reliability improvements -- fixing flaky tests, addressing tech debt, and hardening infrastructure. This policy resolved a decades-old organizational tension by making reliability investment automatic rather than political. Teams that consistently stay within budget earn more autonomy for risky experiments, creating a positive feedback loop. The model's success at Google led to widespread industry adoption after the SRE Book's publication in 2016.

## Related Frameworks

- slo-as-practice (extends)
- sli-slo-sla (prerequisite)
- on-call-engineering (complement)
- dora-metrics (complement)
- chaos-engineering (complement)

## Source

https://sdframe.caldis.me/frameworks/error-budget-policy
