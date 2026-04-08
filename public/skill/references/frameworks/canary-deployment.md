# Canary Deployment / 金丝雀发布

- **Category**: deployment
- **Complexity**: intermediate
- **Quality**: reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Google / early site reliability engineering teams, ~2004
- **Adopters**: Netflix, Google, Facebook, Uber, Lyft

Gradually roll out changes to a small user subset first

_先向小部分用户灰度发布变更，再逐步全量推送_

## When to Use

Apply this framework when:
- High-traffic services where a full rollout failure would impact millions of users
- Deployments requiring real production traffic validation before full promotion
- Services with well-defined SLIs that can be automatically compared between canary and baseline
- Teams practicing progressive delivery and wanting automated rollback based on metrics

## When NOT to Use

Stop and reconsider if:
- Low-traffic services where the canary subset is too small to produce statistically significant metric comparisons
- Deployments involving breaking API changes that cannot coexist with the previous version
- Systems lacking sufficient observability to compare canary and baseline health signals
- Batch processing systems where there is no continuous request stream to analyze

## Core Concepts

- Progressive Traffic Shifting: Gradually increase the percentage of traffic routed to the new version in controlled increments (1% -> 5% -> 25% -> 100%)
- Automated Analysis: Use statistical comparison of canary vs. baseline metrics to make promotion/rollback decisions without human judgment
- Blast Radius Containment: Only a small subset of users is exposed to potential issues, limiting the impact of defective releases
- Metric-Driven Promotion: Deployment progression is gated by objective health signals rather than time-based schedules

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Canary Deployment to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Deploy the new version alongside the stable version in production
2. Route a small percentage (1-5%) of real traffic to the canary instance
3. **Monitor key metrics**: error rates, latency, and business KPIs for the canary
4. Incrementally increase traffic percentage if metrics remain healthy
5. Promote canary to 100% or roll back automatically based on threshold alerts

<details><summary>中文步骤</summary>

1. 在生产环境中将新版本与稳定版本并行部署
2. 将少量真实流量（1-5%）路由到金丝雀实例
3. 监控金丝雀的关键指标：错误率、延迟及业务KPI
4. 若指标正常则逐步提高流量比例
5. 依据阈值告警决定将金丝雀全量推送或自动回滚

</details>

## Do

- Do define clear success/failure metrics and thresholds before starting the canary, because ad-hoc evaluation leads to subjective decisions
- Do ensure canary and baseline receive comparable traffic samples to avoid skewed comparisons
- Do automate the rollback process so that metric breaches trigger instant traffic drain from the canary
- Do allow sufficient bake time at each traffic tier to capture slow-burning issues like memory leaks

## Don't

- Don't route all sticky sessions to the canary, because this biases the sample and hides issues that affect fresh users
- Don't promote based solely on absence of errors -- also check latency percentiles and business metrics, because silent degradation is common
- Don't run canary analysis for too short a period, because some defects only manifest under sustained load or time-dependent conditions
- Don't ignore infrastructure-level differences between canary and baseline instances, because CPU/memory asymmetry skews results

## Case Study

**Netflix**: Netflix built and open-sourced Kayenta in 2017 as their automated canary analysis platform integrated with Spinnaker. Every production deployment at Netflix goes through canary analysis, where a new build serves a small percentage of traffic while Kayenta statistically compares hundreds of metrics against a baseline. This system catches roughly 80% of production-impacting issues before they reach general availability, enabling Netflix to deploy hundreds of times per day with confidence.

## Related Frameworks

- blue-green-deployment (alternative)
- feature-flags (complement)
- dora-metrics (complement)

## Source

https://sdframe.caldis.me/frameworks/canary-deployment
