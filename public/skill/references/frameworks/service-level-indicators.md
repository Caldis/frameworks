# Service Level Indicators (SLI) / 服务级别指标

- **Category**: observability
- **Complexity**: intermediate
- **Quality**: reliability, observability, performance
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Google SRE, 2003
- **Adopters**: Google, Spotify, LinkedIn, Dropbox, PagerDuty, Atlassian

Quantitative measures of service behavior that define the precise metrics used to assess whether a service is meeting its reliability commitments

_服务行为的量化度量，定义用于评估服务是否满足可靠性承诺的精确指标_

## When to Use

Apply this framework when:
- Establishing reliability commitments with product and business stakeholders that are grounded in measurable user experience data rather than infrastructure uptime proxies
- SRE teams needing a shared language with development teams for reliability trade-offs — SLIs make the cost of unreliability concrete and quantifiable
- Services experiencing user complaints that do not correlate with any existing infrastructure alert, indicating that current metrics do not capture actual user experience
- Before defining SLOs or error budgets, which require well-specified SLIs as their foundation

## When NOT to Use

Stop and reconsider if:
- Internal batch processing systems with no direct user interaction where response-time SLIs are meaningless and throughput or completion-rate SLIs better reflect the system's purpose
- Very early-stage systems where instrumentation infrastructure does not yet exist and the cost of adding it exceeds the value of measurement at that stage
- Systems with inherently variable behavior (scientific computing, ML training jobs) where SLI measurement windows and thresholds cannot be meaningfully defined

## Core Concepts

- SLI Definition: a carefully defined quantitative measure of some aspect of the level of service provided — the ratio of good events to total events over a measurement window
- Request/Response SLIs: the most common category — availability (fraction of successful requests), latency (fraction of requests faster than a threshold), and error rate (fraction of failed requests)
- User-Centric Measurement: SLIs must be measured as close to the user as possible; internal CPU or memory metrics are lagging indicators that often fail to capture user-perceived degradation
- Measurement Windows: SLIs are typically calculated over rolling windows (28 days, 30 days) to smooth out short-term noise while still reflecting recent service health trends
- SLI → SLO Pipeline: each SLI feeds exactly one SLO target; the SLO converts the SLI ratio into a commitment (99.9% of requests succeed), and the gap between actual and target becomes the error budget

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Service Level Indicators (SLI) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the user-facing behaviors that matter most: for each critical user journey (checkout, login, search), define what 'working correctly' means in measurable terms — latency, availability, correctness, or throughput
2. Choose SLI metrics that are close to the user experience: prefer request success rates and P99 latency measured at the load balancer or client over internal system metrics like CPU utilization
3. **Define SLI formulas precisely**: an availability SLI might be 'the proportion of HTTP requests that return a 2xx or 4xx status code within 2 seconds over a rolling 28-day window'
4. **Instrument and validate**: ensure your monitoring system can actually measure the defined SLI with sufficient granularity and that the metric correlates with real user experience degradation
5. **Attach SLIs to SLOs**: every SLI must have a corresponding SLO target (e.g., SLI = request success rate, SLO = success rate ≥ 99.9%) and feed into an error budget calculation

<details><summary>中文步骤</summary>

1. 识别最重要的面向用户的行为：对于每个关键用户旅程（结账、登录、搜索），以可衡量的术语定义「正常工作」的含义——延迟、可用性、正确性或吞吐量
2. 选择贴近用户体验的SLI指标：优先选择在负载均衡器或客户端测量的请求成功率和P99延迟，而非CPU利用率等内部系统指标
3. 精确定义SLI公式：可用性SLI可能是「在28天滚动窗口内，2秒内返回2xx或4xx状态码的HTTP请求比例」
4. 埋点并验证：确保监控系统能够以足够的粒度实际测量定义的SLI，并且该指标与真实用户体验的降级相关联
5. 将SLI与SLO关联：每个SLI必须有对应的SLO目标（例如SLI=请求成功率，SLO=成功率≥99.9%），并纳入错误预算计算

</details>

## Do

- Do define SLIs from the user's perspective: measure what the user experiences (did their request succeed? was it fast enough?) rather than what the infrastructure experiences (is CPU below 80%?)
- Do keep SLI definitions simple and unambiguous: a good SLI can be expressed as a single sentence with a clear numerator, denominator, and measurement window
- Do validate that your SLI actually correlates with user-reported issues by retrospectively checking whether past incidents would have caused SLI degradation
- Do limit the number of SLIs per service to 3-5 key indicators — too many SLIs dilute focus and make it unclear which metric to act on during an incident

## Don't

- Don't use internal system metrics (CPU, memory, disk) as SLIs — they are implementation details that don't directly measure user experience and often fail to trigger when users are actually impacted
- Don't set SLI measurement points deep inside the system (database query time) without also measuring at the service entry point — internal SLIs miss the compounding effects of the full request path
- Don't conflate SLI (what you measure) with SLO (what you commit to) — defining them separately allows the same SLI measurement to be used for different SLO targets across environments
- Don't change SLI definitions retroactively to make historical data look better — SLI instability destroys trust in the measurement and makes error budget calculations meaningless

## Case Study

**Google**: Google's Search infrastructure team defined their primary SLI as the proportion of search queries that return a valid results page with at least one result in under 200ms, measured at the global load balancer — not at any individual backend component. This single SLI captured the end-to-end user experience across the entire search stack. When a backend ranking service degraded, the SLI immediately showed impact even when all individual component health checks appeared green. The SLI definition allowed Google to set a 99.99% SLO for search latency, and the corresponding error budget of 4.38 minutes/month gave the SRE team a quantitative basis for negotiating feature freeze during high-risk release windows.

## Related Frameworks

- sli-slo-sla (related)
- four-golden-signals (complement)
- red-method (related)
- use-method (related)
- opentelemetry (related)

## Source

https://sdframe.caldis.me/frameworks/service-level-indicators
