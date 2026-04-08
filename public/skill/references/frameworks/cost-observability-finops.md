# Cost Observability (FinOps) / 成本可观测性（FinOps）

- **Category**: observability
- **Complexity**: intermediate
- **Quality**: maintainability, scalability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: FinOps Foundation (J.R. Storment & Mike Fuller, 2019); Cloud Financial Management practices emerging from AWS Cost Explorer (2014)
- **Adopters**: Spotify, Airbnb, Pinterest, Lyft, Snap

Cloud cost monitoring, allocation, and optimization frameworks aligned with the FinOps Foundation model

_与FinOps基金会模型对齐的云成本监控、分配和优化框架_

## When to Use

Apply this framework when:
- When cloud costs are growing faster than revenue or user growth and the organization cannot attribute cost increases to specific teams, features, or products
- When the engineering team receives a monthly cloud bill with no cost attribution data and finance and product teams cannot hold engineering accountable for cost efficiency
- When cost optimization is a strategic priority but there is no mechanism to measure the impact of optimization efforts on actual spend
- When AI/ML workloads are being adopted at scale and GPU and inference costs are creating new, unpredictable cost categories that require dedicated observability

## When NOT to Use

Stop and reconsider if:
- Early-stage startups with cloud bills under $10,000/month where the overhead of implementing cost attribution infrastructure exceeds the potential savings
- Organizations on fixed-price cloud contracts where the marginal cost of individual resource decisions is already absorbed in the contract price
- Teams in the initial months of a major migration project where cost optimization would slow down the migration and optimization should follow after the migration stabilizes
- On-premise or private cloud deployments where the cost model is dominated by CapEx hardware depreciation rather than OpEx per-resource consumption

## Core Concepts

- Cost Attribution: The practice of tagging every cloud resource with metadata (team, service, environment, feature) so that costs can be aggregated and reported at the team and product level
- Unit Economics: Normalizing infrastructure cost against a business metric (users, requests, inferences) to produce a cost-per-unit metric that decouples absolute spend from business growth
- FinOps Lifecycle: The Inform-Optimize-Operate cycle from the FinOps Foundation model — first make costs visible (Inform), then identify and implement savings (Optimize), then embed cost governance in day-to-day engineering (Operate)
- Rightsizing: Matching cloud resource sizes to actual usage patterns by identifying over-provisioned instances, unused reserved capacity, and idle resources that can be downsized or terminated
- Commitment-Based Discounts: Reserved Instances, Savings Plans (AWS), and Committed Use Discounts (GCP) that trade flexibility for cost savings of 30-70% over on-demand pricing

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Cost Observability (FinOps) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Instrument cloud cost data with service, team, environment, and feature tags at every cloud resource so that costs can be attributed to specific teams and products rather than appearing as a single undifferentiated bill
2. Set up a cost observability dashboard aggregating spend by service, team, and environment (production vs. development) with day-over-day and week-over-week cost trends alongside standard infrastructure metrics
3. Establish unit economics metrics (cost per API call, cost per active user, cost per ML inference) that connect infrastructure spend to business value and enable cost efficiency tracking over time
4. Create cost anomaly alerts that trigger when any team's cloud spend increases more than 20% week-over-week without a corresponding increase in business metrics, enabling fast detection of runaway costs
5. Hold monthly FinOps reviews where engineering, product, and finance teams collectively review cost trends, identify optimization opportunities, and prioritize cost reduction initiatives in the product backlog

<details><summary>中文步骤</summary>

1. 在每个云资源上使用服务、团队、环境和功能标签对云成本数据进行仪器化，以便将成本归因于特定团队和产品，而不是作为单一的未区分账单出现
2. 设置成本可观测性仪表板，按服务、团队和环境（生产与开发）聚合支出，并提供逐日和逐周成本趋势以及标准基础设施指标
3. 建立单位经济学指标（每次API调用成本、每个活跃用户成本、每次ML推断成本），将基础设施支出与业务价值连接起来，并随时间跟踪成本效率
4. 创建成本异常告警，当任何团队的云支出在没有相应业务指标增加的情况下环比增加超过20%时触发，以便快速检测失控成本
5. 举行月度FinOps评审，工程、产品和财务团队共同审查成本趋势，识别优化机会，并在产品待办列表中优先排列成本削减举措

</details>

## Do

- Do implement resource tagging standards before deploying any cost observability tooling because without consistent tags, cost attribution is impossible and the tooling will produce unactionable data
- Do set per-team cloud cost budgets with automated alerts at 80% and 100% of monthly budget so that teams have visibility into their own spending before the bill arrives
- Do establish unit cost metrics (cost per API request, cost per active user) and track them as part of each team's OKRs so that cost efficiency is considered alongside feature velocity
- Do involve finance and product stakeholders in monthly FinOps reviews because cost optimization decisions require business context that engineering teams alone do not have

## Don't

- Don't treat cloud cost as solely a finance problem — engineering decisions (instance types, data transfer patterns, retention policies) are the primary levers for cost control and engineers must own them
- Don't optimize for cost at the expense of reliability without explicit business trade-off analysis because cutting costs that undermine availability SLOs will cost more in incident response and customer churn
- Don't enforce rigid cost budgets on teams without giving them the tooling and authority to make the changes needed to stay within budget
- Don't skip cost tagging for development and staging environments because non-production costs often represent 20-40% of total cloud spend and hiding them makes cost attribution inaccurate

## Case Study

**Spotify**: Spotify moved from a single cloud bill to a fully attributed cost model over 18 months, tagging every GCP resource with squad, tribe, and product area labels. By building a FinOps dashboard embedded in their internal developer portal, squad leads could see their real-time cloud spend alongside their service SLOs and deployment frequency. Within 6 months of implementing cost visibility, engineering squads voluntarily right-sized 23% of their compute instances (reducing average instance cost by $340/month per service) and cleaned up $2.1M in abandoned development environments. Spotify credited the visibility-first approach — making engineers the primary owners of cost data, not finance — as the key factor in achieving these savings without top-down mandates.

## Related Frameworks

- slo-as-practice (complement)
- platform-engineering (complement)

## Source

https://sdframe.caldis.me/frameworks/cost-observability-finops
