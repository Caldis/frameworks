# Richardson Maturity Model / Richardson 成熟度模型

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability, usability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Leonard Richardson, 2008, 2000
- **Adopters**: GitHub, Stripe, Twilio, PayPal, Atlassian

Four levels of REST API maturity from RPC to hypermedia

_REST API 从 RPC 到超媒体的四级成熟度模型_

## When to Use

Apply this framework when:
- Evaluating the design quality of existing REST APIs during architecture reviews
- Planning API modernization roadmaps from RPC-style to RESTful design
- Teaching teams about REST best practices with a clear progression model
- Deciding the appropriate level of REST maturity for a new API based on client needs

## When NOT to Use

Stop and reconsider if:
- Internal microservice-to-microservice communication where gRPC or messaging is more efficient
- Real-time bidirectional communication where WebSocket or SSE is more appropriate
- High-performance binary protocols where HTTP overhead is unacceptable
- GraphQL-first architectures where the query language replaces REST resource modeling

## Core Concepts

- Level 0 - The Swamp of POX: one URI, one HTTP method (usually POST), essentially RPC over HTTP
- Level 1 - Resources: individual URIs for each resource, but still using a single HTTP method for all operations
- Level 2 - HTTP Verbs: proper use of GET, POST, PUT, DELETE with correct status codes and idempotency
- Level 3 - Hypermedia Controls (HATEOAS): responses include links that guide clients to available next actions
- Progressive Enhancement: each level builds on the previous, and most practical APIs target Level 2

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Richardson Maturity Model to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Assess current level**: determine if the API is at Level 0 (single URI, single verb), Level 1 (resources), Level 2 (HTTP verbs), or Level 3 (hypermedia)
2. **Introduce proper resources (Level 1)**: model each domain concept as a unique URI (e.g., /orders/123) instead of action-based endpoints
3. **Use HTTP verbs correctly (Level 2)**: map CRUD operations to GET, POST, PUT, DELETE with proper status codes and idempotency semantics
4. **Add hypermedia controls (Level 3)**: include links in responses (HATEOAS) so clients discover available actions dynamically
5. **Validate with consumer tests**: use contract tests to ensure API responses match the expected level of maturity and remain backward-compatible

<details><summary>中文步骤</summary>

1. 评估当前级别：判断API处于0级（单URI单动词）、1级（资源）、2级（HTTP动词）还是3级（超媒体）
2. 引入合理资源（1级）：将每个领域概念建模为唯一URI（如/orders/123），而非基于动作的端点
3. 正确使用HTTP动词（2级）：将CRUD操作映射到GET、POST、PUT、DELETE，配合正确的状态码和幂等语义
4. 添加超媒体控制（3级）：在响应中包含链接（HATEOAS），使客户端动态发现可用操作
5. 通过消费者测试验证：使用契约测试确保API响应符合预期的成熟度级别并保持向后兼容

</details>

## Do

- Do use proper HTTP status codes because they convey semantics that clients and proxies understand
- Do make GET requests safe and idempotent because caching and retries depend on this guarantee
- Do version your API alongside maturity improvements because breaking changes need controlled rollout
- Do document your API's maturity level because it sets clear expectations for consumers

## Don't

- Don't aim for Level 3 HATEOAS by default because most API consumers prefer explicit documentation over link discovery
- Don't use POST for everything just because it works because you lose caching, idempotency, and semantic clarity
- Don't confuse Richardson levels with API quality because a well-designed Level 2 API can be superior to a poorly implemented Level 3
- Don't ignore content negotiation because supporting JSON, XML, or versioned media types improves interoperability

## Case Study

**GitHub**: GitHub's REST API is a well-known example of a Level 3 (HATEOAS) API. Every response includes hypermedia links that guide clients to related resources and available actions. This design allows the GitHub API to evolve without breaking existing integrations, as clients follow links rather than hardcoding URLs. The API serves billions of requests daily from thousands of third-party integrations.

## Related Frameworks

- api-versioning-strategies (complement)
- contract-testing (complement)
- ai-first-api-design (related)

## Source

https://sdframe.caldis.me/frameworks/richardson-maturity-model
