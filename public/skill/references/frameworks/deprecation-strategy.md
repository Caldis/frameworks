# Deprecation Strategy / 弃用策略

- **Category**: evolution
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Industry practice formalized across Google, Stripe, and major API providers, ~2010s, 2011
- **Adopters**: Stripe, Google, Twilio, GitHub, AWS

Systematic approach to retiring old APIs/features

_系统性地退役旧 API 和功能的方法_

## When to Use

Apply this framework when:
- Public APIs with external consumers who need advance notice and migration support
- Internal platforms where multiple teams depend on shared services that need to evolve
- SDK and library maintainers who must remove features without breaking downstream consumers
- Organizations accumulating technical debt from features that should have been retired years ago

## When NOT to Use

Stop and reconsider if:
- Internal-only APIs with a single consumer team that can coordinate changes directly without formal deprecation
- Experimental or alpha APIs where consumers understand features may be removed without notice
- One-time migration projects where the old system will be fully decommissioned in a single cutover
- APIs with zero external consumers where the overhead of formal deprecation exceeds the coordination benefit

## Core Concepts

- Sunset Date: A published, non-negotiable date after which the deprecated feature will be removed entirely
- Migration Path: A documented, tested alternative that covers all use cases of the deprecated feature
- Deprecation Warning: Runtime signals (HTTP Sunset header, compiler warnings, log messages) that alert consumers to upcoming removal
- Usage Tracking: Monitoring deprecated feature consumption to identify migration stragglers and measure progress toward sunset

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Deprecation Strategy to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Announce deprecation with a clear timeline, migration guide, and sunset date communicated through multiple channels
2. **Provide a migration path**: new API, data export tools, or replacement feature that covers existing use cases
3. Add runtime deprecation warnings (HTTP headers, log messages, SDK warnings) to track usage of deprecated features
4. **Monitor deprecation metrics**: track the decline in deprecated feature usage and identify blocking consumers
5. Remove the deprecated feature on the sunset date, with a final grace period and direct outreach to remaining consumers

<details><summary>中文步骤</summary>

1. 通过多渠道宣布弃用，明确时间线、迁移指南和日落日期
2. 提供迁移路径：覆盖现有用例的新 API、数据导出工具或替代功能
3. 添加运行时弃用警告（HTTP 头、日志消息、SDK 警告）以跟踪弃用功能的使用情况
4. 监控弃用指标：跟踪弃用功能使用量的下降并识别阻塞的消费者
5. 在日落日期移除弃用功能，设置最终宽限期并直接联系剩余消费者

</details>

## Do

- Announce deprecation at least 6-12 months before sunset for public APIs — more for critical infrastructure
- Provide migration tooling (codemods, scripts, SDK helpers) that automate as much of the migration as possible
- Use the HTTP Sunset header (RFC 8594) to give API consumers a machine-readable deprecation signal
- Track deprecated feature usage metrics on a dashboard and proactively reach out to top consumers

## Don't

- Don't deprecate without providing a clear, documented migration path — deprecation without an alternative is abandonment
- Don't silently remove features — always announce, warn at runtime, and give consumers time to migrate
- Don't extend sunset dates repeatedly — this trains consumers to ignore deprecation notices entirely
- Don't deprecate too many things at once — migration fatigue causes consumers to disengage and fall behind

## Case Study

**Stripe**: Stripe manages one of the most developer-friendly deprecation processes in the industry. Every API version is supported for years, with clear deprecation timelines published in their API changelog. When deprecating the 2019-02-19 API version, Stripe provided per-account migration dashboards showing exactly which endpoints needed updating, automated test mode switching to the new version, and dedicated migration support for high-volume merchants. This approach achieved 98% voluntary migration before the sunset date.

## Related Frameworks

- api-versioning-strategies (complement)
- strangler-fig-pattern (complement)
- semantic-versioning (complement)

## Source

https://sdframe.caldis.me/frameworks/deprecation-strategy
