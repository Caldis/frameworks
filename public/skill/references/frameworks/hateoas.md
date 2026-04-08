# HATEOAS / 超媒体驱动应用状态（HATEOAS）

- **Category**: api
- **Complexity**: advanced
- **Quality**: usability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Roy Fielding, 2000 (as a constraint of REST in his doctoral dissertation)
- **Adopters**: PayPal, Amazon, GitHub, Spring HATEOAS, FoxyCart

Hypermedia-driven API navigation where responses contain links to available actions

_超媒体驱动的API导航，响应中包含可用操作的链接_

## When to Use

Apply this framework when:
- When building long-lived APIs where URL structures may evolve but clients should not break
- When API workflows involve complex state machines and clients need guidance on valid next actions
- When reducing client-server coupling is a priority, allowing the server to change URL patterns without client updates
- When building APIs for exploration and discoverability, where navigating from a single entry point should reveal all capabilities

## When NOT to Use

Stop and reconsider if:
- Internal microservice APIs where clients and servers are deployed together and URL coupling is acceptable
- High-performance APIs where the overhead of generating and transmitting links in every response is unacceptable
- Simple CRUD APIs with flat resource structures where hypermedia navigation adds no value over documented URL patterns
- Mobile or bandwidth-constrained clients where the additional payload size from links degrades performance

## Core Concepts

- Hypermedia as the Engine: API responses embed links that tell clients what actions are available, making the API self-describing and navigable
- Link Relations (rel): Standardized or custom relation types (e.g., 'self', 'next', 'payment') give semantic meaning to each link independent of its URL
- Dynamic Link Availability: Links in responses change based on resource state and user permissions — a canceled order shows no 'refund' link
- Media Types: Hypermedia formats like HAL (application/hal+json), JSON:API, and Siren define how links are structured within JSON responses
- Maturity Level 3: In Richardson's REST Maturity Model, HATEOAS represents the highest level of REST compliance, beyond resources and HTTP verbs

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying HATEOAS to?
- What constraints or existing architecture do you need to work within?
- Has your team used HATEOAS before? (This is an advanced framework)

## Implementation Steps

1. Design resource representations that include hypermedia links indicating available state transitions and related resources
2. Choose a hypermedia media type (HAL, JSON:API, Siren, or Collection+JSON) that provides a standard structure for embedding links
3. Implement link generation in API responses that dynamically reflects the current resource state and the authenticated user's permissions
4. Build clients that discover available actions by following links in responses rather than hardcoding URL patterns
5. Document the link relations (rel types) and media types so consumers understand the meaning of each link without needing to know URL structure

<details><summary>中文步骤</summary>

1. 设计资源表示，包含指示可用状态转换和相关资源的超媒体链接
2. 选择超媒体媒体类型（HAL、JSON:API、Siren或Collection+JSON），提供嵌入链接的标准结构
3. 在API响应中实现链接生成，动态反映当前资源状态和认证用户的权限
4. 构建客户端通过跟随响应中的链接发现可用操作，而非硬编码URL模式
5. 文档化链接关系（rel类型）和媒体类型，使消费者无需了解URL结构即可理解每个链接的含义

</details>

## Do

- Do include a 'self' link in every resource representation because it provides an unambiguous canonical URL for each resource
- Do use standardized link relation types from IANA where possible because custom rel types reduce interoperability
- Do make link availability conditional on resource state because it guides clients on valid transitions and prevents invalid operations
- Do choose an established hypermedia format (HAL, JSON:API, Siren) rather than inventing your own because standard tooling and client libraries already exist

## Don't

- Don't include links without documenting their relation types because undocumented links are meaningless to client developers
- Don't require clients to construct URLs from templates or documentation because it defeats the purpose of hypermedia-driven discovery
- Don't add HATEOAS links as an afterthought to an existing API because retrofitting hypermedia requires rethinking resource design holistically
- Don't expect all clients to use hypermedia navigation because many teams will hardcode URLs despite the links being available

## Case Study

**PayPal**: PayPal's REST API is one of the most prominent real-world implementations of HATEOAS. Every API response includes a links array with HATEOAS links that guide consumers through payment workflows. For example, after creating a payment, the response includes 'approve', 'execute', and 'self' links. The client follows the 'approve' link to redirect the user, then the 'execute' link to complete the payment. This approach allows PayPal to change URL structures, add new payment steps, or modify workflows without breaking existing integrations.

## Related Frameworks

- openapi-specification (complement)
- graphql-schema-design (alternative)
- consumer-driven-contracts (complement)

## Source

https://sdframe.caldis.me/frameworks/hateoas
