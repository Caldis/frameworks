# Feature Flag Observability / 功能开关可观测性

- **Category**: observability
- **Complexity**: intermediate
- **Quality**: observability, reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: LaunchDarkly, Split.io, and progressive delivery community, ~2017, 2013
- **Adopters**: LaunchDarkly, Split.io, Spotify, Atlassian, Booking.com

Monitoring feature rollout impact by correlating flag state with system and business metrics

_通过关联功能开关状态与系统和业务指标来监控功能发布的影响_

## When to Use

Apply this framework when:
- Progressive delivery workflows where features are rolled out incrementally and must be monitored for impact at each stage
- A/B testing and experimentation programs that need statistical rigor in measuring feature impact on business metrics
- Services with multiple concurrent feature flags where interactions between flags can cause unexpected behavior
- Regulated environments where every feature change must be auditable with before/after metric evidence

## When NOT to Use

Stop and reconsider if:
- Simple boolean kill-switches that are either fully on or fully off with no gradual rollout
- Feature flags used only in development/staging environments where production observability is irrelevant
- Systems with very low traffic where statistical comparison between flag cohorts lacks sufficient sample size
- Short-lived feature flags that will be removed within a single sprint before meaningful metric data accumulates

## Core Concepts

- Flag-Aware Telemetry: Every trace, metric, and log entry carries the active feature flag variants as attributes, enabling filtering and grouping by flag state across all observability tools
- Metric Correlation: Statistical comparison of key metrics (error rate, latency, conversion) between flag-on and flag-off cohorts to isolate feature impact from background noise
- Automated Guardrails: Predefined metric thresholds per flag that trigger automatic rollback when a feature causes degradation beyond acceptable limits
- Flag Interaction Detection: Monitoring for unexpected metric changes when multiple flags are active simultaneously, since flag combinations can produce emergent behaviors not seen in isolation
- Experimentation Analytics: Applying statistical significance testing (chi-squared, t-test) to flag variant metrics to distinguish real feature impact from random variation

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Feature Flag Observability to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Instrument feature flag evaluations**: emit telemetry events for every flag evaluation including flag name, variant, user segment, and evaluation context
2. Attach flag state to observability signals: add active feature flag variants as attributes on traces, metrics, and logs so all telemetry becomes flag-aware
3. **Build comparative dashboards**: display key metrics (error rate, latency, conversion rate) split by flag variant to detect impact in real time
4. **Set automated rollback triggers**: define metric thresholds per flag that automatically disable a flag variant when it degrades system health beyond tolerance
5. **Analyze flag lifecycle impact**: after full rollout, compare before/after metrics to validate the feature's value and generate evidence for stakeholder reviews

<details><summary>中文步骤</summary>

1. 对功能开关评估进行埋点：为每次开关评估发出遥测事件，包含开关名、变体、用户分组和评估上下文
2. 将开关状态附加到可观测性信号：将激活的功能开关变体作为属性添加到追踪、指标和日志中，使所有遥测具备开关感知能力
3. 构建比较仪表盘：按开关变体拆分显示关键指标（错误率、延迟、转化率），实时检测影响
4. 设置自动回滚触发器：为每个开关定义指标阈值，当系统健康度下降超过容忍范围时自动禁用该开关变体
5. 分析开关生命周期影响：全量发布后比较前后指标以验证功能价值，为利益相关者审查生成证据

</details>

## Do

- Do emit flag evaluation events as first-class telemetry so every observability query can be filtered by flag variant
- Do define rollback thresholds before enabling a flag, because deciding what constitutes failure during an incident is too late
- Do monitor flag interactions when multiple flags are active, because two individually safe flags can produce harmful combinations
- Do track flag staleness and enforce cleanup, because unmonitored long-lived flags accumulate risk and observability blind spots

## Don't

- Don't roll out feature flags without metric baselines, because you cannot detect regression without knowing what normal looks like
- Don't rely on manual dashboard watching for flag rollouts, because automated guardrails catch problems faster than human monitoring at 2am
- Don't ignore the observability cost of high-cardinality flag attributes, because attaching 50 flag variants to every span explodes storage and query costs
- Don't treat feature flag observability as optional for 'small' flags, because small changes cause big incidents when they hit unexpected code paths

## Case Study

**LaunchDarkly**: LaunchDarkly's own platform exemplifies feature flag observability. When rolling out their real-time streaming architecture to replace polling-based flag delivery, they used their own flag-aware metrics to monitor latency, error rates, and flag evaluation consistency across both variants. By attaching flag state to every trace via OpenTelemetry, they detected a 15ms latency regression in the streaming path that only affected customers with more than 500 flags. The automated guardrail paused the rollout at 5% traffic, giving the team time to optimize the streaming protocol before resuming. Without flag-correlated observability, this long-tail performance issue would have reached 100% of customers.

## Related Frameworks

- feature-flags (extends)
- opentelemetry (complement)
- canary-deployment (complement)
- slo-as-practice (complement)
- red-method (complement)

## Source

https://sdframe.caldis.me/frameworks/feature-flag-observability
