# REST Maturity Model / REST 成熟度模型

- **Category**: api
- **Complexity**: beginner
- **Quality**: maintainability, usability, reliability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Leonard Richardson, 2008
- **Adopters**: GitHub, Twilio, PayPal, Amazon Web Services, Atlassian

Leonard Richardson's four-level model measuring REST compliance from plain HTTP to hypermedia-driven APIs

_Leonard Richardson 的四级模型，衡量 API 从基础 HTTP 到超媒体驱动的 REST 合规程度_

## When to Use

Apply this framework when:
- When onboarding a team to REST principles and you need a structured progression framework rather than an all-or-nothing standard
- When auditing an existing API to identify specific gaps and prioritize incremental improvements
- When negotiating API design standards across multiple teams or squads and you need a shared vocabulary for quality levels
- When evaluating third-party APIs for integration suitability based on their REST compliance and discoverability

## When NOT to Use

Stop and reconsider if:
- When building event-driven or streaming APIs where HTTP request-response semantics do not fit — use AsyncAPI and event schemas instead
- When the team is already operating at Level 2 consistently — the model has served its purpose and further discussion of levels adds no value
- When evaluating GraphQL or gRPC APIs — the model is specific to REST/HTTP APIs and does not apply to other API paradigms
- When a simple CRUD API with no consumer-facing discoverability needs is being built — Level 2 is sufficient without evaluating Level 3

## Core Concepts

- Level 0 — The Swamp of POX: A single URI used for all operations, typically with XML or JSON payloads describing the operation, equivalent to SOAP or XML-RPC over HTTP
- Level 1 — Resources: Multiple URIs each representing a distinct resource, but using only POST/GET regardless of the intended operation
- Level 2 — HTTP Verbs: Uses the full HTTP verb set (GET, POST, PUT, PATCH, DELETE) semantically aligned to CRUD operations, and returns meaningful HTTP status codes to convey operation outcomes
- Level 3 — Hypermedia Controls (HATEOAS): Responses embed links to related actions and resources, enabling clients to navigate the API entirely through hypermedia without out-of-band documentation

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying REST Maturity Model to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Audit your existing API against the four maturity levels: Level 0 (single URI, all verbs, RPC over HTTP), Level 1 (resource-based URIs), Level 2 (HTTP verbs and status codes), Level 3 (hypermedia/HATEOAS controls)
2. Advance to Level 1 by decomposing the API into resource-based URIs that reflect domain entities (/orders, /customers/{id}) rather than operation names (/getOrder, /createCustomer)
3. Advance to Level 2 by using HTTP verbs semantically (GET for reads, POST for create, PUT/PATCH for update, DELETE for removal) and returning appropriate HTTP status codes (201 Created, 404 Not Found, 409 Conflict)
4. Evaluate whether Level 3 (HATEOAS) is appropriate: add hypermedia links to responses so clients can discover available actions dynamically, reducing client-server coupling and enabling API evolution
5. Document the target maturity level as an API contract and establish linting rules or contract tests to prevent regression to lower levels during iterative development

<details><summary>中文步骤</summary>

1. 对照四个成熟度级别审计现有 API：第 0 级（单一 URI、所有动词、HTTP 上的 RPC）、第 1 级（基于资源的 URI）、第 2 级（HTTP 动词和状态码）、第 3 级（超媒体/HATEOAS 控制）
2. 通过将 API 分解为基于资源的 URI（如 /orders、/customers/{id}）而非操作名称（如 /getOrder、/createCustomer），升级到第 1 级
3. 通过语义化使用 HTTP 动词（GET 用于读取、POST 用于创建、PUT/PATCH 用于更新、DELETE 用于删除）并返回适当的 HTTP 状态码（201 Created、404 Not Found、409 Conflict），升级到第 2 级
4. 评估第 3 级（HATEOAS）是否合适：在响应中添加超媒体链接，让客户端动态发现可用操作，降低客户端-服务端耦合并支持 API 演进
5. 将目标成熟度级别记录为 API 契约，并建立代码检查规则或契约测试，防止迭代开发中退回到更低级别

</details>

## Do

- Do target Level 2 as the baseline for all new APIs — consistent HTTP verbs and status codes provide significant value with modest implementation cost
- Do use HTTP status codes precisely: 201 for created resources with a Location header, 204 for successful deletes, 409 for conflicts, 422 for validation errors
- Do consider Level 3 (HATEOAS) for APIs used by machine clients that need to discover available state transitions at runtime without hardcoding paths
- Do use the model as a diagnostic tool when reviewing legacy APIs to identify which level they operate at and what improvements would advance them

## Don't

- Don't treat the model as a mandatory progression — most production APIs correctly stop at Level 2; Level 3 adds complexity that is only justified for specific use cases
- Don't conflate 'RESTful' with 'uses JSON over HTTP' — an API that ignores HTTP semantics is at Level 0 or 1 regardless of its payload format
- Don't add HATEOAS links for the sake of compliance without understanding how clients will use them — unused hypermedia adds payload weight without benefit
- Don't retrofit an existing Level 0 API to Level 2 without a migration plan — changing URIs and verbs is a breaking change that requires versioning

## Case Study

**GitHub**: GitHub's REST API v3 is a widely studied Level 2 implementation. It uses resource-based URIs (/repos/{owner}/{repo}/pulls), proper HTTP verbs, and precise status codes (201 for created PRs, 204 for deleted resources, 422 for validation errors with structured error bodies). GitHub's API documentation explicitly lists which HTTP methods each endpoint supports and what each status code means. The GitHub REST API powers tens of thousands of developer tools and CI/CD integrations, demonstrating that a well-designed Level 2 API can scale to global adoption without needing HATEOAS.

## Related Frameworks

- openapi-specification (complement)
- api-versioning-strategies (related)
- api-first-design (complement)

## Source

https://sdframe.caldis.me/frameworks/rest-maturity-model
