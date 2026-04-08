# SLO-as-Practice / SLO实践方法论

- **Category**: observability
- **Complexity**: advanced
- **Quality**: reliability, observability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Google SRE team; codified in Implementing Service Level Objectives (Alex Hidalgo, 2020), 2003
- **Adopters**: Google, The Guardian, Spotify, Atlassian, Honeycomb

Operationalize SLO methodology as a continuous engineering practice for reliability culture

_将SLO方法论运营化为持续的工程实践，构建可靠性文化_

## When to Use

Apply this framework when:
- Organizations that have defined SLIs/SLOs but struggle to operationalize them into daily engineering decisions
- Teams drowning in alerts from threshold-based monitoring who need a more intelligent alerting approach
- Engineering leadership that needs objective data to balance reliability investment against feature velocity
- Post-incident reviews that repeatedly identify lack of reliability prioritization as a root cause

## When NOT to Use

Stop and reconsider if:
- Very early-stage startups where user patterns are unknown and setting meaningful SLOs is premature
- Internal tools used by fewer than 10 people where informal reliability communication is more efficient
- Systems where 100% correctness is legally required and error budgets are philosophically inapplicable
- Organizations without basic monitoring in place -- you need metrics before you can set objectives on them

## Core Concepts

- SLO as a Practice: SLOs are not just numbers in a config file; they are a continuous feedback loop of measuring, alerting, reviewing, and adjusting that shapes engineering culture
- Multi-Window Burn Rate Alerting: Compares error budget consumption across short (1h) and long (6h, 3d) windows to detect both sudden outages and gradual degradation with minimal false positives
- Error Budget as Currency: The error budget is a finite resource that engineering teams 'spend' on risky changes; when it is depleted, the team must shift to reliability work
- SLO Document: A living document per service specifying SLIs, SLO targets, error budget policies, escalation paths, and review cadence -- the contract between product and engineering
- Aspirational vs Achievable SLOs: Teams maintain two tiers -- achievable SLOs that trigger alerts and aspirational SLOs that guide long-term reliability investment

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying SLO-as-Practice to?
- What constraints or existing architecture do you need to work within?
- Has your team used SLO-as-Practice before? (This is an advanced framework)

## Implementation Steps

1. Identify user journeys and map them to measurable SLIs: choose indicators that reflect real user happiness (successful login rate, checkout latency p99, search result relevance)
2. Set SLO targets through stakeholder negotiation: balance user expectations, engineering cost, and business risk rather than defaulting to arbitrary nines
3. Implement SLO-based alerting with multi-window burn rate: alert on budget consumption rate rather than raw threshold breaches to reduce false positives
4. **Establish error budget policies**: define concrete actions at budget thresholds (50% remaining: review, 25%: freeze risky deploys, 0%: all hands on reliability)
5. **Run SLO review meetings monthly**: analyze budget burn trends, adjust targets based on user feedback, and use SLO data to prioritize reliability vs feature work

<details><summary>中文步骤</summary>

1. 识别用户旅程并映射为可度量的SLI：选择反映真实用户满意度的指标（登录成功率、结算延迟p99、搜索结果相关性）
2. 通过利益相关者协商设定SLO目标：平衡用户期望、工程成本和业务风险，而非默认使用任意的几个9
3. 实施基于SLO的多窗口燃烧率告警：对预算消耗速率而非原始阈值触发告警，以减少误报
4. 建立错误预算策略：在预算阈值处定义具体行动（剩余50%：审查，25%：冻结高风险部署，0%：全力投入可靠性）
5. 每月召开SLO回顾会议：分析预算燃烧趋势，根据用户反馈调整目标，并使用SLO数据来确定可靠性与功能工作的优先级

</details>

## Do

- Do start with 2-3 SLOs per service covering the most critical user journeys, because too many SLOs dilute attention and make budget tracking unmanageable
- Do involve product managers in SLO target-setting, because reliability targets must reflect business context not just engineering preference
- Do automate SLO reporting and budget dashboards, because manual tracking guarantees the practice will be abandoned within months
- Do revisit SLO targets quarterly, because user expectations and system capabilities change over time

## Don't

- Don't set SLOs without error budget policies, because SLOs without consequences are just dashboards that nobody acts on
- Don't alert on every SLO violation immediately, because multi-window burn rate alerting is far more actionable than raw threshold alerts
- Don't use SLOs as a performance evaluation tool for individual engineers, because it creates incentives to game the metrics rather than improve reliability
- Don't copy another company's SLO targets, because the right target depends on your users' expectations and your system's architecture

## Case Study

**The Guardian**: The Guardian newspaper's engineering team adopted SLO-as-practice to manage reliability across their content delivery platform serving 150+ million monthly readers. They defined SLOs around article load time (p99 < 3s), content API availability (99.9%), and search relevance. By implementing multi-window burn rate alerts, they reduced alert volume by 90% compared to their previous threshold-based system. Monthly SLO review meetings with product and editorial stakeholders created a shared language for reliability trade-offs, enabling the team to confidently invest in a major platform migration while staying within error budget.

## Related Frameworks

- sli-slo-sla (extends)
- error-budget-policy (complement)
- four-golden-signals (prerequisite)
- dora-metrics (complement)
- on-call-engineering (complement)

## Source

https://sdframe.caldis.me/frameworks/slo-as-practice
