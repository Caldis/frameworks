# API Deprecation Lifecycle / API弃用生命周期

- **Category**: api
- **Complexity**: intermediate
- **Quality**: maintainability, usability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: IETF RFC 8594 (Wilde, 2019); deprecation practices pioneered by Stripe, Twilio, and Salesforce, 2000
- **Adopters**: Salesforce, Stripe, Twilio, GitHub, Google Cloud

Sunset headers, versioned migration paths, and deprecation policies for retiring API versions

_用于停用API版本的日落头、版本化迁移路径和弃用策略_

## When to Use

Apply this framework when:
- When introducing a new API version that breaks backward compatibility and existing consumers need time to migrate
- When removing a field, endpoint, or behavior that has active consumers and cannot be removed without a coordinated migration
- When the organization has a published API versioning policy that commits to minimum deprecation notice periods for external consumers
- When building an API platform where consumers include third-party developers who cannot be force-upgraded on the provider's schedule

## When NOT to Use

Stop and reconsider if:
- Internal APIs consumed by a single team where direct code changes are faster and less risky than a formal deprecation process
- Alpha or beta APIs explicitly labeled as unstable where consumers accept that breaking changes can occur without notice
- APIs with no active consumers as tracked by analytics, where immediate removal is safe and more responsible than maintaining dead code
- Undocumented private endpoints that were never part of the public API contract and were not intended for consumer use

## Core Concepts

- Deprecation Header: HTTP response header (Deprecation: <timestamp>) indicating the date a resource was deprecated; clients and monitoring tools can detect it automatically
- Sunset Header: RFC 8594 HTTP response header (Sunset: <HTTP-date>) announcing the date after which the resource will be unavailable, giving consumers a concrete deadline
- Versioned Migration Paths: Explicit documentation mapping each deprecated element to its replacement across version boundaries, with migration scripts where applicable
- Deprecation Notice Period: The minimum time between announcing deprecation and enforcing the sunset — typically 6 months for external APIs, 3 months for internal, and 2 years for major platforms
- Consumer Tracking: Using API analytics to identify which consumers are still using deprecated resources so that targeted outreach can drive migration before the sunset date

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying API Deprecation Lifecycle to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Announce deprecation with a minimum notice period (typically 6-12 months for public APIs) via developer portal, email, and Deprecation + Sunset HTTP headers on every response
2. Publish a migration guide that maps every deprecated endpoint, field, and behavior to its replacement in the new version, with code examples in all supported languages
3. Add Deprecation and Sunset headers (IETF RFC 8594) to all deprecated endpoints so that monitoring tools, API gateways, and SDK clients can detect and alert on deprecated usage
4. Track consumer adoption of the new version using API analytics; proactively reach out to consumers still on the deprecated version as the sunset date approaches
5. On the sunset date, return HTTP 410 Gone for deprecated endpoints with a Problem Details body linking to the migration guide, and remove the deprecated code after a final grace period

<details><summary>中文步骤</summary>

1. 通过开发者门户、邮件以及每个响应上的Deprecation + Sunset HTTP头，以最短通知期（公共API通常为6-12个月）宣布弃用
2. 发布迁移指南，将每个已弃用的端点、字段和行为映射到新版本中的替代品，并提供所有支持语言的代码示例
3. 向所有已弃用端点添加Deprecation和Sunset头（IETF RFC 8594），使监控工具、API网关和SDK客户端能够检测并告警已弃用的使用
4. 使用API分析跟踪消费者对新版本的采用；在日落日期临近时，主动联系仍在使用已弃用版本的消费者
5. 在日落日期，对已弃用端点返回HTTP 410 Gone，并在问题详情主体中链接到迁移指南，在最终宽限期后删除已弃用代码

</details>

## Do

- Do add Deprecation and Sunset headers to every deprecated endpoint response so that automated SDK clients can log warnings without any manual documentation lookup
- Do give at least 6 months notice for external API deprecations because third-party developers need time to prioritize and plan migration work
- Do publish a specific sunset date rather than 'eventually' because indefinite timelines are ignored and only hard deadlines motivate migration
- Do track active consumers of deprecated endpoints using API analytics and send personal outreach to teams still using them 60 days before sunset

## Don't

- Don't remove a deprecated endpoint without first verifying through analytics that all consumers have migrated because silent removal causes production outages
- Don't use vague deprecation notices ('will be removed in a future version') because they create no urgency and are ignored until production breaks
- Don't maintain deprecated endpoints indefinitely without a sunset date because the maintenance burden accumulates and security vulnerabilities are not patched
- Don't skip backward-compatible migration paths because consumers cannot migrate if the new version requires rewriting significant amounts of integration code

## Case Study

**Salesforce**: Salesforce manages one of the most complex API deprecation lifecycles in the industry, supporting hundreds of API versions simultaneously for its enterprise customers. Salesforce commits to a minimum three-version support window for its platform APIs — when a version is deprecated, it remains available for three subsequent annual releases before being retired. Every Salesforce API response includes a version header, and the developer portal prominently displays the support matrix with exact end-of-life dates. This policy allowed enterprise customers to plan multi-year migration roadmaps without the risk of unexpected API removals, and is credited with driving Salesforce's customer retention in regulated industries.

## Related Frameworks

- openapi-specification (complement)
- api-first-design (complement)
- api-gateway-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/api-deprecation-lifecycle
