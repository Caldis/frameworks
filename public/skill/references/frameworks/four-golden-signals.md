# Four Golden Signals / 四大黄金信号

- **Category**: quality
- **Complexity**: beginner
- **Quality**: observability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Google SRE Team, 2016, 2003
- **Adopters**: Google, Dropbox, Twitter, Uber, Stripe

Monitor Latency, Traffic, Errors, Saturation for any service

_对任何服务监控延迟、流量、错误率和饱和度_

## When to Use

Apply this framework when:
- Establishing foundational monitoring for any production service regardless of architecture
- Training new SRE or DevOps team members on what to monitor first
- Creating on-call dashboards that need to surface problems quickly for incident responders
- Defining SLIs when you need a starting point for service level indicators

## When NOT to Use

Stop and reconsider if:
- Low-level hardware debugging where OS-level metrics (USE Method) provide more granular signals
- Client-side performance monitoring where Web Vitals and user experience metrics are more appropriate
- Offline batch processing where request-oriented signals do not apply

## Core Concepts

- Latency: The time it takes to service a request, differentiated between success and failure responses
- Traffic: A measure of demand being placed on the system (requests per second, I/O rates, sessions)
- Errors: The rate of requests that fail either explicitly (HTTP 5xx) or implicitly (wrong content, policy violations)
- Saturation: How full the service is, measuring the most constrained resource and predicting impending capacity limits
- Signal Correlation: Analyzing all four signals together to distinguish between load, code, and infrastructure issues

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Four Golden Signals to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Instrument Latency**: measure the time it takes to serve a request, separating successful and failed request latencies
2. **Track Traffic**: measure the demand on your system — requests per second, transactions per minute, or messages consumed
3. **Monitor Errors**: count the rate of requests that fail, distinguishing explicit errors (500s) from implicit ones (wrong content, slow responses)
4. **Measure Saturation**: track how close the service is to capacity — CPU usage, memory pressure, queue depths, thread pool exhaustion
5. **Correlate signals**: build dashboards that show all four signals together so you can quickly identify whether an issue is load, code, or resource-related

<details><summary>中文步骤</summary>

1. 埋点延迟：测量服务请求的处理时间，区分成功请求和失败请求的延迟
2. 追踪流量：衡量系统承受的需求——每秒请求数、每分钟事务数或消费的消息数
3. 监控错误：统计失败请求的速率，区分显式错误（500）和隐式错误（内容错误、响应过慢）
4. 测量饱和度：追踪服务距离容量上限的距离——CPU使用率、内存压力、队列深度、线程池耗尽
5. 关联信号：构建同时展示四个信号的仪表盘，以快速判断问题源于负载、代码还是资源

</details>

## Do

- Do separate latency for successful and failed requests because failed requests can be artificially fast
- Do track saturation proactively because it predicts future problems before they cause incidents
- Do build a single dashboard showing all four signals per service because correlation enables faster diagnosis
- Do define explicit error budgets for each signal because thresholds without budgets lead to alert fatigue

## Don't

- Don't monitor only latency and errors because saturation and traffic provide essential context for interpreting them
- Don't use averages exclusively because they hide the tail latency experienced by the worst-affected users
- Don't create separate unrelated dashboards for each signal because the power is in seeing them correlated
- Don't treat all errors equally because client errors (4xx) and server errors (5xx) have very different implications

## Case Study

**Google**: Google developed the Four Golden Signals from over a decade of running production services at massive scale. The approach proved its value during a Gmail latency incident where traffic metrics showed normal request rates but saturation metrics revealed thread pool exhaustion on a specific cluster. Without the saturation signal, the team would have spent hours chasing code-level bugs instead of the resource constraint.

## Related Frameworks

- red-method (alternative)
- use-method (alternative)
- sli-slo-sla (complement)

## Source

https://sdframe.caldis.me/frameworks/four-golden-signals
