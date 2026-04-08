# Synthetic Monitoring / 合成监控

- **Category**: observability
- **Complexity**: intermediate
- **Quality**: reliability, performance
- **Abstraction**: system
- **Maturity**: established
- **Author**: Catchpoint, 2000
- **Adopters**: Shopify, Amazon, Cloudflare, Datadog, Catchpoint, New Relic

Proactive testing of user journeys by scripting interactions from external locations to detect failures before real users are impacted

_通过从外部地点脚本化用户交互来主动测试用户旅程，在真实用户受到影响之前检测故障_

## When to Use

Apply this framework when:
- Monitoring critical user journeys that have low natural traffic volume — synthetic tests ensure these paths are continuously exercised even during off-peak hours
- Detecting geographic or ISP-specific outages before real users in affected regions encounter them and before support tickets start arriving
- Establishing a baseline availability SLI for external-facing services where you need an objective, external perspective on service availability rather than relying solely on internal metrics
- Validating that deployments haven't broken critical flows immediately after release, providing faster feedback than waiting for real user error rates to climb

## When NOT to Use

Stop and reconsider if:
- Internal-only services with no external-facing endpoints where external probe locations have no network path to reach the service
- Highly dynamic single-page applications with frequent A/B test UI changes where maintaining synthetic scripts becomes more expensive than the coverage they provide
- Services with strict security constraints that prohibit external systems from making authenticated requests against production endpoints

## Core Concepts

- Transaction Monitoring: scripted multi-step user flows (login → add to cart → checkout) that run on a schedule from multiple locations, asserting that each step completes within acceptable time and produces the expected result
- API Monitoring: HTTP-level checks that verify endpoint availability, response time, status codes, and response body content, providing fast and lightweight coverage for backend services
- Real Browser Testing: executing scripts in a full browser engine (Chrome headless, Firefox) to capture client-side JavaScript performance, rendering issues, and third-party dependency failures
- Multi-location Probing: running the same script from geographically distributed probe nodes (cloud regions, ISP vantage points) to distinguish local outages from global failures and measure regional latency
- Alert Correlation: combining synthetic monitor failures with APM traces and log events to accelerate root cause analysis — a synthetic failure timestamp narrows the search window for correlated anomalies

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Synthetic Monitoring to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the critical user journeys to monitor: prioritize flows that directly affect revenue or user retention (login, checkout, core API health checks) rather than trying to cover every page
2. Write interaction scripts using headless browser tools (Playwright, Selenium, Puppeteer) or API test scripts that mimic real user behavior including authentication, form submissions, and assertions on response content
3. Deploy monitors from multiple geographic locations to detect regional failures, CDN issues, and latency variations that affect specific user populations but not global availability metrics
4. **Configure alert thresholds**: set failure alerts (3 consecutive failures from 2+ locations) and latency alerts (P95 > 2x baseline) with clear runbooks describing what to check when each monitor fails
5. Integrate synthetic monitor results into your SLO dashboards as an external availability signal, complementing real-user monitoring with proactive coverage for low-traffic paths and off-peak hours

<details><summary>中文步骤</summary>

1. 识别要监控的关键用户旅程：优先监控直接影响收入或用户留存的流程（登录、结账、核心API健康检查），而非试图覆盖每个页面
2. 使用无头浏览器工具（Playwright、Selenium、Puppeteer）或API测试脚本编写交互脚本，模拟真实用户行为，包括认证、表单提交和响应内容断言
3. 从多个地理位置部署监控器，以检测影响特定用户群但不影响全局可用性指标的区域性故障、CDN问题和延迟变化
4. 配置告警阈值：设置故障告警（来自2个以上地点的连续3次失败）和延迟告警（P95>基线2倍），并附有清晰的运行手册描述每个监控器失败时应检查的内容
5. 将合成监控结果作为外部可用性信号集成到SLO仪表盘中，用主动覆盖低流量路径和非高峰时段来补充真实用户监控

</details>

## Do

- Do run synthetic monitors from at least 3 geographically distinct locations so that a single probe node failure doesn't trigger false positive alerts
- Do write synthetic scripts that use dedicated test accounts with predictable data states rather than real user accounts, to avoid polluting production data or triggering business-side workflows
- Do configure monitors to run frequently enough to detect issues promptly (every 1-5 minutes for critical paths) but not so frequently that you generate excessive API load or cost
- Do version-control your synthetic monitor scripts alongside application code so changes to the application UI or API are reflected in updated monitor scripts through the same review process

## Don't

- Don't rely solely on synthetic monitoring as your availability signal — synthetic tests probe a subset of user journeys from scripted paths; real user monitoring (RUM) captures the long tail of actual usage patterns
- Don't write brittle scripts that depend on specific UI element positions or text content that changes frequently — use stable data attributes or API contracts as assertion targets
- Don't alert on a single synthetic failure from a single location — transient network issues cause false positives; require multiple consecutive failures from multiple locations before paging on-call
- Don't neglect to update synthetic scripts when the application changes — stale scripts that test deprecated flows provide false confidence and miss regressions in the new implementation

## Case Study

**Shopify**: During Black Friday 2021, Shopify's platform team used synthetic monitoring to continuously exercise the end-to-end checkout flow for multiple merchant store types from 12 geographic probe locations. When a payment gateway integration began experiencing elevated latency in the EU-West region at 2:47 AM EST — well before European merchants' peak traffic — the synthetic monitors triggered an alert within 4 minutes of degradation onset. The on-call SRE used the synthetic transaction trace (which captured the exact HTTP exchange at the payment step) to identify that a third-party payment provider's EU endpoint was returning slow responses. The team activated a backup payment routing configuration before EU merchants opened for business, preventing what would have been a €2M+ revenue impact during the critical trading window.

## Related Frameworks

- service-level-indicators (complement)
- sli-slo-sla (related)
- distributed-tracing (complement)
- chaos-engineering (related)

## Source

https://sdframe.caldis.me/frameworks/synthetic-monitoring
