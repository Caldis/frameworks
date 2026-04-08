# RED Method / RED 方法

- **Category**: quality
- **Complexity**: beginner
- **Quality**: observability, performance
- **Abstraction**: system
- **Maturity**: established
- **Author**: Tom Wilkie, 2018, 2015
- **Adopters**: Grafana Labs, Weaveworks, Google, Shopify, Cloudflare

Monitor Request rate, Error rate, Duration for each service

_对每个服务监控请求率、错误率和持续时间_

## When to Use

Apply this framework when:
- Monitoring microservices where request-centric metrics provide the most actionable signals
- Building SRE dashboards that need to answer 'is this service healthy?' at a glance
- Establishing baseline monitoring for any new service deployed to production
- Debugging production issues where you need to quickly identify which service is degraded

## When NOT to Use

Stop and reconsider if:
- Infrastructure and hardware monitoring where resource utilization matters more than request metrics
- Batch processing or streaming systems that do not follow a request-response pattern
- Storage systems where disk and memory metrics are more relevant than request-level signals

## Core Concepts

- Rate: The number of requests per second a service is handling, indicating demand and throughput
- Errors: The count or percentage of requests that fail, indicating service correctness issues
- Duration: The distribution of request latency (p50, p95, p99), indicating service performance
- Service-Centric Monitoring: Focusing on the work a service does (requests) rather than the resources it uses
- Percentile Latency: Using percentiles instead of averages to expose tail latency and worst-case user experience

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying RED Method to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify all services**: list every microservice, API endpoint, and background worker that handles requests
2. **Measure Rate**: instrument each service to emit requests-per-second metrics broken down by endpoint and status code
3. **Measure Errors**: track the number and percentage of requests that result in errors (5xx, timeouts, business errors)
4. **Measure Duration**: capture request latency distributions (p50, p95, p99) to understand both typical and tail performance
5. **Build dashboards and alerts**: create per-service RED dashboards; set alerts on error rate spikes and latency degradation

<details><summary>中文步骤</summary>

1. 识别所有服务：列出每个处理请求的微服务、API端点和后台工作器
2. 测量速率：为每个服务埋点，按端点和状态码分类发出每秒请求数指标
3. 测量错误：追踪导致错误的请求数量和百分比（5xx、超时、业务错误）
4. 测量持续时间：捕获请求延迟分布（p50、p95、p99）以理解典型和尾部性能
5. 构建仪表盘和告警：创建每服务RED仪表盘；对错误率飙升和延迟劣化设置告警

</details>

## Do

- Do track latency distributions (percentiles) because averages hide tail latency affecting real users
- Do separate error types (client vs server, transient vs permanent) because they require different responses
- Do set up RED dashboards for every service before going to production because retroactive instrumentation is harder
- Do correlate RED metrics with deployment events because many degradations are caused by code changes

## Don't

- Don't use only averages for duration because they conceal p99 spikes that affect user experience
- Don't ignore rate changes because sudden drops in request rate often indicate upstream failures
- Don't alert on every metric independently because correlated alerts (rate drops + error spikes) are more actionable
- Don't apply RED to infrastructure resources because USE Method is designed for that purpose

## Case Study

**Grafana Labs**: Grafana Labs uses the RED Method internally to monitor their own Grafana Cloud platform, which serves millions of dashboards and alerts. By standardizing on RED metrics across all microservices, their SRE team can diagnose cross-service issues in minutes. When a spike in error rates was detected in their alerting pipeline, RED dashboards immediately pinpointed the degraded service and specific endpoint.

## Related Frameworks

- use-method (alternative)
- four-golden-signals (alternative)
- dora-metrics (complement)

## Source

https://sdframe.caldis.me/frameworks/red-method
