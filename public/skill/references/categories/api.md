# API Design & Integration / API 设计与集成

Designing, versioning, and integrating APIs across service boundaries.

API 的设计、版本管理与跨服务边界集成。

**21 frameworks** in this category.

## Frameworks

### GraphQL Schema Design / GraphQL 模式设计
- **Slug**: graphql-schema-design
- **Complexity**: intermediate
- **Quality**: usability, maintainability, performance
- **Author**: Lee Byron, Dan Schafer, Nick Schrock / Facebook, 2015
- Query language and type system for APIs enabling precise data fetching

### gRPC & Protocol Buffers / gRPC与Protocol Buffers
- **Slug**: grpc-protocol-buffers
- **Complexity**: intermediate
- **Quality**: performance, scalability, maintainability
- **Author**: Google, 2015 (built on internal Stubby RPC framework)
- High-performance RPC framework using HTTP/2 and binary serialization

### API Gateway Pattern / API网关模式
- **Slug**: api-gateway-pattern
- **Complexity**: intermediate
- **Quality**: scalability, security, maintainability
- **Author**: Microservices community, formalized by Chris Richardson (~2015)
- Single entry point that routes, aggregates, and secures microservices APIs

### Backend for Frontend (BFF) / 服务于前端的后端（BFF）
- **Slug**: bff-pattern
- **Complexity**: intermediate
- **Quality**: usability, maintainability
- **Author**: Sam Newman / ThoughtWorks, 2015
- Dedicated backend services tailored to specific client types

### Consumer-Driven Contracts / 消费者驱动契约
- **Slug**: consumer-driven-contracts
- **Complexity**: intermediate
- **Quality**: testability, maintainability
- **Author**: Ian Robinson, 2006; tooling popularized by Pact (2013, DiUS/Beth Skurrie)
- API testing approach where consumers define the expectations providers must satisfy

### OpenAPI Specification / OpenAPI规范
- **Slug**: openapi-specification
- **Complexity**: beginner
- **Quality**: usability, maintainability
- **Author**: Tony Tam / Swagger (2011); donated to OpenAPI Initiative / Linux Foundation (2015)
- Machine-readable API description standard for RESTful services

### Webhook Pattern / Webhook模式
- **Slug**: webhook-pattern
- **Complexity**: intermediate
- **Quality**: scalability, usability
- **Author**: Jeff Lindsay, 2007 (coined the term); pattern predates the name in early HTTP callback systems
- Event-driven API integration via HTTP callbacks for real-time notifications

### API Rate Limiting & Throttling / API限流与节流
- **Slug**: api-rate-limiting-throttling
- **Complexity**: intermediate
- **Quality**: reliability, scalability, security
- **Author**: Web infrastructure community; formalized in IETF RFC 6585 (2012, HTTP 429 status code)
- Protect APIs from overuse by controlling request rates per client

### HATEOAS / 超媒体驱动应用状态（HATEOAS）
- **Slug**: hateoas
- **Complexity**: advanced
- **Quality**: usability, maintainability
- **Author**: Roy Fielding, 2000 (as a constraint of REST in his doctoral dissertation)
- Hypermedia-driven API navigation where responses contain links to available actions

### AsyncAPI / AsyncAPI异步API规范
- **Slug**: asyncapi
- **Complexity**: intermediate
- **Quality**: usability, maintainability
- **Author**: Fran Mendez, 2017
- Specification standard for describing event-driven and asynchronous APIs

### API-First Design / API优先设计
- **Slug**: api-first-design
- **Complexity**: intermediate
- **Quality**: usability, maintainability, testability
- **Author**: Kin Lane (API Evangelist), popularized by Twilio and Stripe engineering blogs, ~2012
- Design the API contract before implementation using a Swagger-first workflow

### API Pagination Patterns / API分页模式
- **Slug**: api-pagination-patterns
- **Complexity**: intermediate
- **Quality**: performance, usability, scalability
- **Author**: Relay Cursor Connections Specification (Facebook/Meta, 2015); keyset pagination popularized by Markus Winand (Use The Index, Luke)
- Cursor-based, offset-based, and keyset pagination strategies for large collection APIs

### API Error Handling Standards / API错误处理标准
- **Slug**: api-error-handling-standards
- **Complexity**: beginner
- **Quality**: usability, maintainability, reliability
- **Author**: Mark Nottingham & Erik Wilde, IETF RFC 7807, 2016
- RFC 7807 Problem Details and structured error responses for consistent API error communication

### API Deprecation Lifecycle / API弃用生命周期
- **Slug**: api-deprecation-lifecycle
- **Complexity**: intermediate
- **Quality**: maintainability, usability, reliability
- **Author**: IETF RFC 8594 (Wilde, 2019); deprecation practices pioneered by Stripe, Twilio, and Salesforce
- Sunset headers, versioned migration paths, and deprecation policies for retiring API versions

### Edge Computing API Patterns / 边缘计算API模式
- **Slug**: edge-computing-api-patterns
- **Complexity**: advanced
- **Quality**: performance, scalability, reliability
- **Author**: Cloudflare Workers (2017), AWS Lambda@Edge (2017), Fastly Compute@Edge (2019)
- CDN-edge function design for low-latency API responses and global distribution

### API Versioning Strategies / API 版本管理策略
- **Slug**: api-versioning-strategies
- **Complexity**: intermediate
- **Quality**: maintainability, reliability, usability
- **Author**: Troy Hunt
- URL path, header, and query parameter techniques for evolving APIs without breaking clients

### REST Maturity Model / REST 成熟度模型
- **Slug**: rest-maturity-model
- **Complexity**: beginner
- **Quality**: maintainability, usability, reliability
- **Author**: Leonard Richardson
- Leonard Richardson's four-level model measuring REST compliance from plain HTTP to hypermedia-driven APIs

### API Security Patterns / API 安全模式
- **Slug**: api-security-patterns
- **Complexity**: advanced
- **Quality**: security, reliability, observability
- **Author**: OWASP Foundation
- OAuth2 scopes, API keys, JWT validation, and CORS hardening to protect API surfaces from unauthorized access

### Event-Driven API Design / 事件驱动 API 设计
- **Slug**: event-driven-api-design
- **Complexity**: advanced
- **Quality**: performance, scalability, reliability
- **Author**: Clemens Vasters
- Server-Sent Events, WebSocket, and MQTT patterns for real-time, asynchronous API communication

### API Composition Pattern / API 组合模式
- **Slug**: api-composition-pattern
- **Complexity**: intermediate
- **Quality**: performance, scalability, reliability
- **Author**: Chris Richardson
- Aggregating multiple microservice APIs into a unified interface to fulfill client queries without requiring cross-service joins on the client side

### GraphQL Federation / GraphQL联邦
- **Slug**: graphql-federation
- **Complexity**: advanced
- **Quality**: maintainability, scalability, performance
- **Author**: Apollo Graph, Inc. (Matt DeBergalis, Trevor Scheer et al.)
- A composition model for GraphQL where multiple independently deployed subgraph services contribute to a unified supergraph, enabling teams to own their schema slice while consumers see a single coherent API
