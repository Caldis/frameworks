# Backend for Frontend (BFF) / 服务于前端的后端（BFF）

- **Category**: api
- **Complexity**: intermediate
- **Quality**: usability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Sam Newman / ThoughtWorks, 2015
- **Adopters**: SoundCloud, Airbnb, Spotify, Netflix, REA Group

Dedicated backend services tailored to specific client types

_为特定客户端类型量身定制的专用后端服务_

## When to Use

Apply this framework when:
- When mobile and web clients need fundamentally different API response shapes from the same microservices
- When a single general-purpose API gateway has become bloated with client-specific logic
- When different client teams want independent release cadences for their API layer
- When mobile clients on constrained networks need aggressively optimized payloads compared to web clients

## When NOT to Use

Stop and reconsider if:
- When all clients consume the same data shape and a single API or GraphQL layer already serves them well
- When the organization is too small to staff separate teams for each BFF, leading to one team maintaining multiple BFFs
- When the overhead of deploying and monitoring additional services outweighs the flexibility gained
- When downstream services already provide well-designed, client-friendly APIs that need no aggregation

## Core Concepts

- Client Affinity: Each BFF is purpose-built for one client type, so it can optimize data shape, payload size, and protocol for that client's specific needs
- Team Ownership: The frontend team that consumes the BFF also owns it, eliminating cross-team API negotiation and enabling faster iteration
- Aggregation Layer: BFFs fan out requests to multiple downstream microservices and compose responses tailored to the client's UI structure
- Thin Orchestration: BFFs contain presentation logic and data shaping but delegate all business rules to downstream domain services
- Independent Deployment: Each BFF can be deployed, scaled, and versioned independently without affecting other client channels

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Backend for Frontend (BFF) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify distinct client types (web SPA, mobile iOS/Android, third-party) and document their unique data and interaction requirements
2. Create a dedicated BFF service for each client type that acts as an intermediary between the client and downstream microservices
3. Implement client-specific data aggregation, transformation, and formatting in each BFF to optimize payloads for that client's constraints
4. Have each client team own and maintain their respective BFF to ensure it evolves with the client's needs without cross-team coordination
5. **Keep BFFs thin**: they should orchestrate calls to downstream services and shape responses, but never own business logic or persistent state

<details><summary>中文步骤</summary>

1. 识别不同的客户端类型（Web SPA、移动端iOS/Android、第三方），记录其独特的数据和交互需求
2. 为每种客户端类型创建专用的BFF服务，作为客户端和下游微服务之间的中间层
3. 在每个BFF中实现客户端特定的数据聚合、转换和格式化，优化该客户端约束条件下的负载
4. 让每个客户端团队拥有并维护其对应的BFF，确保它随客户端需求演进而无需跨团队协调
5. 保持BFF轻薄：它们应编排对下游服务的调用并塑造响应，但不应拥有业务逻辑或持久状态

</details>

## Do

- Do let the frontend team own the BFF because they best understand the client's data needs and can iterate without backend team dependencies
- Do keep BFFs focused on data aggregation and response shaping because business logic belongs in domain services
- Do share common concerns (auth, logging) via libraries rather than duplicating them across BFFs because consistency matters for cross-cutting concerns
- Do monitor each BFF independently because different client patterns produce different load and error profiles

## Don't

- Don't let BFFs accumulate business logic because they should remain thin orchestration layers, not become new monoliths
- Don't create a BFF for every minor client variation because it leads to an explosion of services that are expensive to maintain
- Don't share a BFF across fundamentally different client types because it recreates the one-size-fits-all problem the pattern was designed to solve
- Don't skip shared libraries for authentication and observability because each BFF reimplementing these independently introduces security and consistency risks

## Case Study

**SoundCloud**: SoundCloud adopted the BFF pattern in 2016 when their single monolithic API could not satisfy the divergent needs of their iOS, Android, and web clients. Each client team built its own BFF that aggregated calls to shared microservices and shaped responses for their specific UI. This allowed the mobile team to ship optimized, smaller payloads while the web team could include richer metadata. Release velocity increased by 40% because client teams no longer blocked on backend API changes.

## Related Frameworks

- api-gateway-pattern (extends)
- graphql-schema-design (complement)
- grpc-protocol-buffers (complement)

## Source

https://sdframe.caldis.me/frameworks/bff-pattern
