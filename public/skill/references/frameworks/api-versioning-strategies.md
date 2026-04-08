# API Versioning Strategies / API 版本管理策略

- **Category**: api
- **Complexity**: intermediate
- **Quality**: maintainability, reliability, usability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Troy Hunt, 2000
- **Adopters**: Stripe, Twilio, GitHub, Salesforce, Microsoft Azure

URL path, header, and query parameter techniques for evolving APIs without breaking clients

_通过 URL 路径、请求头和查询参数等技术演进 API，同时避免破坏已有客户端_

## When to Use

Apply this framework when:
- When a public API serves third-party developers or partners who cannot be forced to upgrade in lockstep with server releases
- When introducing breaking changes (renaming fields, changing response structures, removing endpoints) that would silently corrupt existing client integrations
- When different client segments (mobile apps, legacy enterprise systems, new web frontends) need to migrate at different speeds
- When regulatory or contractual obligations require a stable, versioned API surface for a defined period

## When NOT to Use

Stop and reconsider if:
- Internal APIs consumed only by services you own and deploy together — use consumer-driven contract tests instead of versioning to coordinate changes
- APIs under active development before any external consumers exist — stabilize the design first, then introduce versioning when you publish
- APIs where all consumers can be updated atomically (e.g., a single-page app and its BFF) — prefer feature flags and backward-compatible evolution
- GraphQL APIs where field-level deprecation and query flexibility already provide a finer-grained compatibility mechanism than endpoint versioning

## Core Concepts

- URL Path Versioning: Embedding the version in the resource path (/v1/users) makes the version explicit, cache-friendly, and easy to route at the gateway, but couples the version to the URL structure
- Header Versioning: Using a custom request header (API-Version: 2024-01-15) or the Accept header (application/vnd.example.v2+json) keeps URLs clean but requires header-aware clients and CDN configurations
- Query Parameter Versioning: Adding a version query parameter (?api-version=2) is simple to implement but can pollute cache keys and is less semantically clean than path versioning
- Semantic Versioning Contract: Distinguishing breaking changes (require a new version) from additive/backward-compatible changes (can be added to the current version) minimizes unnecessary version proliferation
- Sunset Policy: A formal lifecycle policy defining support windows, deprecation notices, and sunset dates ensures clients have predictable migration timelines and avoids surprise API removals

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying API Versioning Strategies to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Choose a versioning scheme based on client type and change frequency: URL path (/v1/resources) for public APIs with broad client diversity, custom request headers (API-Version: 2024-01) for header-aware clients, or query parameters (?version=1) for simple integrations
2. Establish a version lifecycle policy specifying how long each version will be supported (e.g., two concurrent versions, 12-month deprecation notice) and communicate it clearly in API documentation
3. Implement version routing at the API gateway or controller layer, mapping version identifiers to the correct handler implementations, keeping business logic version-agnostic where possible
4. Use semantic versioning semantics to distinguish breaking changes (major version bump) from additive changes (backward-compatible additions do not require a new version) and document the change log per version
5. Sunset old versions using HTTP 410 Gone responses and Deprecation/Sunset headers, monitor traffic to deprecated endpoints, and notify clients in advance before retiring a version

<details><summary>中文步骤</summary>

1. 根据客户端类型和变更频率选择版本方案：URL 路径（/v1/resources）适合客户端多样的公共 API；自定义请求头（API-Version: 2024-01）适合支持头部的客户端；查询参数（?version=1）适合简单集成场景
2. 制定版本生命周期策略，明确每个版本的支持时长（如同时维护两个版本、12 个月废弃通知期），并在 API 文档中清晰传达
3. 在 API 网关或控制器层实现版本路由，将版本标识符映射到对应处理实现，尽量保持业务逻辑与版本无关
4. 用语义版本语义区分破坏性变更（主版本递增）和向后兼容的新增内容（无需新版本），并按版本维护变更日志
5. 通过 HTTP 410 Gone 响应和 Deprecation/Sunset 头部废弃旧版本，监控废弃端点的流量，并在下线前提前通知客户端

</details>

## Do

- Do publish and commit to a versioning lifecycle policy before you launch the first public version, because retrofitting deprecation timelines is much harder than establishing them upfront
- Do use the HTTP Deprecation and Sunset response headers on all deprecated endpoints so client SDKs and monitoring tools can detect and surface upcoming retirements automatically
- Do version the API at the coarsest granularity that avoids breaking changes — prefer additive evolution within a version over creating a new version for every non-breaking change
- Do maintain a versioned changelog and migration guide so clients can understand exactly what changed and how to upgrade

## Don't

- Don't version every minor change — additive, backward-compatible changes (new optional fields, new endpoints) should be added to the current version without bumping the version number
- Don't maintain more than two or three simultaneous major versions in production because each version multiplies testing, documentation, and operational burden indefinitely
- Don't silently deprecate an API version by simply stopping to maintain it — always communicate deprecation timelines and respond to requests with proper Deprecation headers
- Don't mix versioning strategies (URL path in some endpoints, headers in others) within the same API surface — pick one and apply it consistently

## Case Study

**Stripe**: Stripe's API versioning strategy is widely cited as a gold standard. Stripe uses date-based version identifiers (e.g., 2023-10-16) and permanently pins each API key to the version current at the time of the key's creation. This means a developer's integration never breaks due to a Stripe API update — Stripe runs all versions simultaneously and uses automated changelog generation to document every change. As of 2024, Stripe maintains over 10 years of backward-compatible API versions, enabling customers with decade-old integrations to continue operating without modification.

## Related Frameworks

- openapi-specification (complement)
- api-gateway-pattern (complement)
- expansion-contraction-pattern (related)

## Source

https://sdframe.caldis.me/frameworks/api-versioning-strategies
