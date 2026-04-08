# Engineering Metrics Dashboard / 工程指标仪表板

- **Category**: team
- **Complexity**: intermediate
- **Quality**: maintainability, reliability, usability
- **Abstraction**: system
- **Maturity**: established
- **Author**: DORA research (Nicole Forsgren et al., 2018); SPACE framework (Forsgren et al., 2021, ACM Queue), 2014
- **Adopters**: Google, Microsoft, Capital One, Nordstrom, ING Bank

DORA metrics, developer satisfaction, and quality metrics unified in the SPACE framework

_在SPACE框架中统一的DORA指标、开发者满意度和质量指标_

## When to Use

Apply this framework when:
- When engineering leadership needs objective data to justify investments in developer tooling, platform engineering, or technical debt reduction
- When the organization is scaling rapidly and delivery performance needs to be tracked across multiple teams without relying on anecdotal evidence
- When there is disagreement between engineering and product/business about whether engineering capacity is being used effectively
- When attrition surveys cite developer experience as a concern and leadership wants to track whether investments in DX are yielding measurable improvement

## When NOT to Use

Stop and reconsider if:
- Early-stage startups where the engineering team is fewer than 5 people and the overhead of measurement exceeds its benefit
- Research and innovation teams where the goal is exploration rather than delivery throughput, and DORA metrics would incentivize the wrong behaviors
- Organizations where metrics data is consistently used punitively, because introducing metrics in a low-trust environment will cause gaming rather than improvement
- Short-duration project teams (under 6 months) where there is insufficient time to establish baselines and observe trend improvements

## Core Concepts

- DORA Metrics: Four evidence-backed metrics from the DevOps Research and Assessment program — Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Time to Restore Service — that predict organizational performance
- SPACE Framework: Five dimensions of developer productivity (Satisfaction and wellbeing, Performance, Activity, Communication and collaboration, Efficiency and flow) that together provide a holistic view beyond throughput metrics
- Elite Performers Benchmark: DORA research defines four performance bands; Elite teams deploy multiple times per day with <1h lead time, <15% change failure rate, and <1h MTTR — a target for continuous improvement
- Leading vs Lagging Indicators: PR cycle time and build duration are leading indicators that predict future DORA metrics; MTTR and change failure rate are lagging indicators of actual production outcomes
- Goodhart's Law Risk: When a measure becomes a target, it ceases to be a good measure — engineering metrics must be used for learning and improvement, not as performance evaluation for individual engineers

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Engineering Metrics Dashboard to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Select the metric framework**: DORA (Deployment Frequency, Lead Time for Changes, Change Failure Rate, Time to Restore Service) plus SPACE dimensions (Satisfaction, Performance, Activity, Communication, Efficiency)
2. Instrument the delivery pipeline to collect DORA metrics automatically: connect CI/CD, incident management, and version control systems to a metrics aggregation platform (LinearB, Jellyfish, Sleuth, or custom)
3. Survey developers quarterly using validated satisfaction instruments (Developer Experience Index, DevEx survey) to capture the subjective SPACE dimensions that pipeline data cannot measure
4. Build a dashboard visible to teams, managers, and leadership that shows trends over time (not just current snapshots) and highlights leading indicators like PR cycle time alongside lagging indicators like MTTR
5. Hold a monthly metrics review with the team to interpret trends, set improvement targets for the next quarter, and connect metric improvements to engineering investments

<details><summary>中文步骤</summary>

1. 选择指标框架：DORA（部署频率、变更前置时间、变更失败率、服务恢复时间）加上SPACE维度（满意度、性能、活动、沟通、效率）
2. 对交付流水线进行仪器化以自动收集DORA指标：将CI/CD、事故管理和版本控制系统连接到指标聚合平台（LinearB、Jellyfish、Sleuth或自定义）
3. 使用经过验证的满意度工具（开发者体验指数、DevEx调查）每季度调查开发者，捕获流水线数据无法衡量的主观SPACE维度
4. 构建对团队、管理者和领导层可见的仪表板，显示随时间的趋势（而不仅仅是当前快照），并突出显示PR周期时间等先导指标以及MTTR等滞后指标
5. 与团队进行月度指标回顾，解读趋势，为下一季度设定改进目标，并将指标改进与工程投资联系起来

</details>

## Do

- Do measure DORA metrics at the team level, not the individual level, because they are systems-level indicators of team and organizational performance
- Do combine quantitative pipeline metrics with qualitative developer surveys because throughput metrics without satisfaction data miss half the picture
- Do share dashboards transparently with teams rather than only with management because teams improve faster when they can see their own metrics
- Do use metrics to identify systemic investment opportunities (slow CI, flaky tests, manual deployments) rather than to evaluate individual engineers

## Don't

- Don't use DORA metrics as a performance management tool for individual engineers because it drives gaming behavior and destroys the trust needed for honest reporting
- Don't track activity metrics (commits per day, PRs merged) as proxies for productivity because they incentivize quantity over quality and discourage large, impactful changes
- Don't compare metrics across teams without controlling for domain complexity because a team maintaining a legacy payment system will have different metrics than a team building a new microservice
- Don't treat metrics as a substitute for direct conversation with engineers about what is slowing them down

## Case Study

**Puppet / DORA State of DevOps**: The DORA State of DevOps research program, spanning 2014-2023 with over 33,000 survey respondents across industries, validated that elite software delivery performance (high deployment frequency, low change failure rate, fast MTTR) is statistically correlated with better organizational outcomes — higher profitability, market share growth, and employee satisfaction. Companies that adopted DORA metrics and tracked them as team health indicators, rather than management KPIs, consistently outperformed their peers. The research also found that psychological safety — the ability for engineers to report failures without fear — was the strongest predictor of both high DORA performance and innovation outcomes.

## Related Frameworks

- blameless-postmortems (complement)

## Source

https://sdframe.caldis.me/frameworks/engineering-metrics-dashboard
