# Canary Analysis / 金丝雀分析

- **Category**: observability
- **Complexity**: advanced
- **Quality**: reliability, performance
- **Abstraction**: system
- **Maturity**: established
- **Author**: Netflix, 2009
- **Adopters**: Netflix, Google, LinkedIn, Intuit, Pinterest, Waze

Automated comparison of canary vs baseline metrics to quantitatively validate deployments before full rollout

_自动比较金丝雀与基线指标，在全量发布前定量验证部署_

## When to Use

Apply this framework when:
- Deploying changes to high-traffic, revenue-critical services where the blast radius of a bad deployment justifies the additional deployment complexity of traffic splitting and automated analysis
- Teams that have experienced production incidents caused by deployments that passed all pre-production tests but introduced subtle regressions only visible at production traffic patterns
- Organizations practicing continuous deployment where human approval of every deployment is a bottleneck — canary analysis automates the go/no-go decision with statistical rigor
- Services with clear, stable SLIs where the baseline metric distributions are well-understood and anomalies are distinguishable from normal variance

## When NOT to Use

Stop and reconsider if:
- Low-traffic services where the canary cannot accumulate enough samples during the bake window to produce statistically valid comparisons — shadow testing or A/B testing with replay traffic may be better alternatives
- Services with highly irregular or bursty traffic patterns where baseline metrics have very high natural variance, making it impossible to distinguish canary regressions from normal fluctuation
- Deployments with strict data migration dependencies where traffic splitting would cause some requests to hit new code with old data schema and others to hit old code — this requires a coordinated migration strategy, not canary analysis

## Core Concepts

- Traffic Splitting: routing a configurable percentage (1-10%) of production traffic to the canary version while the remainder continues to the stable baseline, enabling real-production comparison without full rollout risk
- Statistical Comparison: using Mann-Whitney U tests, effect size analysis, or Bayesian methods to determine whether observed metric differences between canary and baseline are statistically significant or within normal variance
- Bake Time: the duration the canary receives production traffic before analysis is finalized — long enough to collect statistically significant samples across different traffic conditions, typically 30 minutes to 2 hours
- Scoring Model: a weighted formula that aggregates individual metric comparisons into an overall canary health score; critical metrics (error rate) have higher weights than informational metrics
- Automated Rollback: when canary score falls below a configured failure threshold, the deployment system automatically shifts 100% of traffic back to the stable baseline without human intervention, minimizing mean time to recover (MTTR)

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Canary Analysis to?
- What constraints or existing architecture do you need to work within?
- Has your team used Canary Analysis before? (This is an advanced framework)

## Implementation Steps

1. Deploy the canary version to a small percentage of traffic (1-5%) alongside the current baseline, using feature flags, traffic splitting, or a canary deployment controller to ensure both receive comparable request distributions
2. **Define the metrics to compare**: select SLIs that directly reflect user experience (request success rate, P99 latency, error rate by type) and business metrics (conversion rate, checkout completion) for the service under analysis
3. Run automated canary analysis using a tool like Spinnaker's Kayenta or Argo Rollouts to statistically compare canary vs baseline metric distributions over a defined bake time (typically 30-60 minutes)
4. **Apply a scoring model**: each metric comparison produces a pass/fail/warn result; a weighted aggregate score determines whether the canary is promoted, paused, or automatically rolled back
5. **Act on the analysis result**: automatically promote healthy canaries (score above threshold) to 100% of traffic, pause inconclusive canaries for human review, and automatically roll back canaries that score below the failure threshold

<details><summary>中文步骤</summary>

1. 将金丝雀版本部署到一小部分流量（1-5%），与当前基线并行运行，使用功能标志、流量分割或金丝雀部署控制器确保两者接收可比的请求分布
2. 定义要比较的指标：选择直接反映用户体验（请求成功率、P99延迟、按类型的错误率）和业务指标（转化率、结账完成率）的SLI用于分析
3. 使用Spinnaker的Kayenta或Argo Rollouts等工具运行自动化金丝雀分析，在定义的烘焙时间（通常30-60分钟）内对金丝雀与基线指标分布进行统计比较
4. 应用评分模型：每次指标比较产生通过/失败/警告结果；加权综合得分决定金丝雀是晋级、暂停还是自动回滚
5. 根据分析结果采取行动：自动将健康金丝雀（得分高于阈值）晋级到100%流量，暂停不确定的金丝雀供人工审查，自动回滚得分低于失败阈值的金丝雀

</details>

## Do

- Do ensure canary and baseline receive statistically comparable traffic: both should see similar request distributions (same user segments, same API endpoint mix) to avoid comparison bias
- Do set canary traffic percentage high enough to collect meaningful samples within your bake time, but low enough to limit blast radius — 1-5% is typical for high-traffic services
- Do define your canary scoring thresholds based on historical baseline metric variance, not arbitrary percentages — a 5% increase in error rate may be noise for one service and critical for another
- Do automate the rollback decision: the primary value of canary analysis is speed of automated rollback — requiring human approval for rollback defeats the purpose for high-velocity deployment pipelines

## Don't

- Don't use canary analysis as a substitute for pre-production testing — canary analysis catches regressions that only appear at production scale and traffic mix, not issues that should have been caught by unit or integration tests
- Don't compare canary against a single baseline instance — compare against the aggregate of all stable instances to account for instance-level variance and avoid false positives from individual instance noise
- Don't run canary analysis during atypical traffic periods (scheduled maintenance windows, major events, traffic spikes) when baseline metrics are themselves abnormal
- Don't set bake times so short that the canary hasn't experienced enough traffic across different time-of-day patterns to produce statistically valid comparisons

## Case Study

**Netflix**: Netflix's deployment pipeline uses Kayenta to automatically analyze every production deployment before full rollout. When a Netflix recommendation service deployed a change to its ranking algorithm, Kayenta compared 14 metrics (request latency percentiles, error rates, recommendation click-through rate, stream start failures) between the canary (3% of traffic) and the stable baseline over a 60-minute bake window. The canary scored 94/100 (above the 75/100 promotion threshold), and Spinnaker automatically promoted it to 100% without human intervention. In a separate deployment 2 weeks later, a seemingly minor configuration change caused the P99 latency to increase by 340ms in the canary. Kayenta scored this deployment 23/100, triggering automatic rollback within 8 minutes of the degradation starting — before any users filed complaints and before the on-call team had been paged.

## Related Frameworks

- feature-flags (related)
- blue-green-deployment (related)
- sli-slo-sla (related)
- service-level-indicators (complement)
- chaos-engineering (related)
- progressive-delivery (related)

## Source

https://sdframe.caldis.me/frameworks/canary-analysis
