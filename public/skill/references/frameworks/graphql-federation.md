# GraphQL Federation / GraphQL联邦

- **Category**: api
- **Complexity**: advanced
- **Quality**: maintainability, scalability, performance
- **Abstraction**: system
- **Maturity**: established
- **Author**: Apollo Graph, Inc. (Matt DeBergalis, Trevor Scheer et al.), 2012
- **Adopters**: Netflix, Expedia, GitHub, Wayfair, Shopify

A composition model for GraphQL where multiple independently deployed subgraph services contribute to a unified supergraph, enabling teams to own their schema slice while consumers see a single coherent API

_GraphQL的组合模型，多个独立部署的子图服务共同组成统一的超图，使团队能够拥有其模式切片，同时消费者看到单一连贯的API_

## When to Use

Apply this framework when:
- Large organizations with multiple teams that need to contribute to a shared GraphQL API without stepping on each other's changes
- Migrating from a monolithic GraphQL schema to team-owned services while preserving a unified client-facing API surface
- Product applications requiring complex cross-domain queries (e.g., a checkout page fetching user, product, inventory, and pricing data in one request)
- Organizations adopting a platform engineering model where a central API team provides the routing layer and individual product teams own their subgraphs

## When NOT to Use

Stop and reconsider if:
- Small teams with a single GraphQL service — federation introduces router infrastructure and composition tooling overhead that is not justified without multiple schema owners
- Teams new to GraphQL — learn core GraphQL patterns (schema design, resolvers, N+1 with DataLoader) before adding federation complexity
- Read-heavy APIs with simple, non-relational data where REST or tRPC is simpler to operate and reason about
- Organizations without a schema registry discipline — federation without enforced schema governance leads to accidental breaking changes that damage client trust

## Core Concepts

- Supergraph / Subgraph: The supergraph is the unified schema clients query; it is composed from multiple subgraphs — independently deployable services each owning a slice of the overall type system
- Entity and @key Directive: An entity is a type that can be resolved across subgraphs by its primary key. The @key directive declares which fields uniquely identify an entity, enabling the router to fetch entity fields from their authoritative subgraph
- Composition: The process of merging subgraph schemas into a valid supergraph schema. Composition rules enforce type compatibility, catch redefinition conflicts, and ensure every field has exactly one resolver
- Query Planning: The router analyzes an incoming query against the supergraph schema and generates a query plan — a directed acyclic graph of fetch operations to individual subgraphs — optimized to minimize round trips
- Schema Registry: A versioned store of subgraph schemas with automated composition validation, used to enforce schema governance and prevent breaking changes from reaching production without compatibility checks

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying GraphQL Federation to?
- What constraints or existing architecture do you need to work within?
- Has your team used GraphQL Federation before? (This is an advanced framework)

## Implementation Steps

1. Decompose the domain into bounded subgraphs: identify service boundaries (users, products, orders) and assign each team ownership of the GraphQL types and resolvers within their domain, starting with a thin supergraph across two or three services
2. Annotate types with federation directives: use @key to declare entity primary keys, @extends to reference types owned by other subgraphs, and @external to mark fields resolved elsewhere — these directives encode the composition rules
3. Deploy a GraphQL Router (Apollo Router, Cosmo Router) in front of all subgraphs: the router reads the composed supergraph schema, plans query execution across subgraphs, and handles entity resolution fetches transparently to clients
4. Establish a schema registry with composition validation: push each subgraph schema to a central registry (Apollo GraphOS, Cosmo) before deployment; the registry runs composition checks to catch breaking changes and merge conflicts before they reach production
5. **Implement federated authorization**: use per-subgraph auth middleware or router-level policy enforcement to apply consistent access control across the unified graph without exposing inter-service trust boundaries to clients

<details><summary>中文步骤</summary>

1. 将领域分解为有界子图：识别服务边界（用户、产品、订单）并将每个团队分配为其领域内GraphQL类型和解析器的所有者，从跨两三个服务的薄超图开始
2. 用联邦指令注解类型：使用@key声明实体主键，@extends引用其他子图拥有的类型，@external标记在其他地方解析的字段——这些指令编码了组合规则
3. 在所有子图前部署GraphQL路由器（Apollo Router、Cosmo Router）：路由器读取组合的超图模式，跨子图规划查询执行，并对客户端透明地处理实体解析获取
4. 建立带有组合验证的模式注册表：在部署前将每个子图模式推送到中央注册表（Apollo GraphOS、Cosmo）；注册表运行组合检查以在进入生产前捕获破坏性变更和合并冲突
5. 实施联邦授权：使用每个子图的认证中间件或路由器级策略执行，在统一图上应用一致的访问控制，而不向客户端暴露服务间信任边界

</details>

## Do

- Do start with a thin supergraph (2-3 subgraphs) and grow incrementally, because federation complexity compounds quickly with the number of subgraphs and cross-entity references
- Do run schema composition in CI before any subgraph deployment, so breaking changes are caught before they reach the router and affect clients
- Do version entity keys carefully — changing a @key field is a breaking change that requires coordinated migration across all subgraphs that reference that entity
- Do monitor query plan complexity; deeply nested cross-subgraph queries can generate N+1 fetch patterns that degrade performance under load

## Don't

- Don't create circular entity references between subgraphs — they create query plan deadlocks and make schema evolution extremely difficult
- Don't allow subgraphs to duplicate business logic for shared entities — the canonical resolver for each field should live in exactly one subgraph
- Don't expose the federation internals (subgraph URLs, entity keys) to external clients — the router is the only entry point and should abstract all composition details
- Don't skip performance testing of query plans across subgraph boundaries — a query innocent-looking in isolation can generate dozens of subgraph fetches at scale

## Case Study

**Netflix**: Netflix adopted Apollo Federation to unify the GraphQL APIs of over 30 studio and streaming microservices behind a single supergraph consumed by their user-facing applications. Before federation, each product team maintained a separate GraphQL endpoint, forcing client teams to orchestrate multi-API calls and stitch responses manually. After migrating to federation, a single studio operations query that previously required 7 API calls was reduced to 1 federated query. Schema change coordination time dropped from 2-week release trains to continuous deployment with automated composition checks.

## Related Frameworks

- graphql-schema-design (related)
- bff-pattern (related)
- api-gateway-pattern (related)
- consumer-driven-contracts (related)
- api-first-design (related)

## Source

https://sdframe.caldis.me/frameworks/graphql-federation
