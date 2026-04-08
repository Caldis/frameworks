# GraphQL Schema Design / GraphQL 模式设计

- **Category**: api
- **Complexity**: intermediate
- **Quality**: usability, maintainability, performance
- **Abstraction**: component
- **Maturity**: established
- **Author**: Lee Byron, Dan Schafer, Nick Schrock / Facebook, 2015, 2012
- **Adopters**: GitHub, Shopify, Facebook, Twitter, Airbnb

Query language and type system for APIs enabling precise data fetching

_用于API的查询语言与类型系统，支持精确数据获取_

## When to Use

Apply this framework when:
- When multiple client types (web, mobile, IoT) need different data shapes from the same API
- When frontend teams suffer from over-fetching or under-fetching with REST endpoints
- When the API aggregates data from multiple microservices and clients need a unified query interface
- When rapid frontend iteration requires schema evolution without coordinating backend deployments

## When NOT to Use

Stop and reconsider if:
- Simple CRUD APIs with a single client type where REST is sufficient and GraphQL adds unnecessary complexity
- File upload or streaming scenarios where GraphQL's request-response model is a poor fit
- Public APIs where caching at the HTTP layer (CDN, reverse proxy) is critical, since GraphQL POST requests bypass standard HTTP caching
- Teams without frontend-backend collaboration maturity, where schema negotiation becomes a bottleneck

## Core Concepts

- Type System: Every field and argument has a declared type, enabling compile-time validation and auto-generated documentation
- Declarative Data Fetching: Clients specify exactly the fields they need in a single request, eliminating over-fetching and under-fetching
- Resolver Architecture: Each field in the schema maps to a resolver function that knows how to fetch or compute its value from any data source
- Introspection: The schema is self-documenting; clients can query the schema itself to discover available types, fields, and relationships
- Schema-First Design: The schema serves as a contract between frontend and backend teams, enabling parallel development

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying GraphQL Schema Design to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define the domain model as a strongly-typed schema using SDL (Schema Definition Language) with clear object types, enums, and interfaces
2. Design queries around client use-cases rather than mirroring database tables, grouping related fields into cohesive types
3. Implement resolvers for each field, ensuring they follow the single-responsibility principle and delegate to data sources
4. Add pagination (cursor-based or offset), filtering, and sorting arguments to list fields following the Relay Connection specification
5. Validate the schema against client requirements, document all types with descriptions, and publish the schema for frontend teams

<details><summary>中文步骤</summary>

1. 使用SDL（模式定义语言）定义领域模型为强类型模式，包含清晰的对象类型、枚举和接口
2. 围绕客户端用例而非数据库表镜像来设计查询，将相关字段分组为内聚的类型
3. 为每个字段实现解析器，确保遵循单一职责原则并委托给数据源
4. 按照Relay连接规范为列表字段添加分页（游标或偏移）、过滤和排序参数
5. 根据客户端需求验证模式，为所有类型添加描述文档，并向前端团队发布模式

</details>

## Do

- Do design types around business domain concepts rather than database tables because it decouples the API from storage implementation
- Do use DataLoader or equivalent batching to solve the N+1 query problem because naive resolvers will degrade performance exponentially
- Do add field-level descriptions to the schema because introspection-driven tools depend on them for developer experience
- Do implement query complexity analysis and depth limiting because unbounded queries can be weaponized for denial-of-service

## Don't

- Don't expose database IDs directly as GraphQL IDs because it leaks implementation details and makes ID migration painful
- Don't create deeply nested types without pagination because clients can construct exponentially expensive queries
- Don't treat GraphQL mutations as simple REST replacements because mutations should model domain actions, not CRUD operations
- Don't skip schema versioning strategy because breaking changes to live schemas will disrupt all connected clients

## Case Study

**GitHub**: GitHub migrated from REST API v3 to GraphQL API v4 in 2016 to address the problem of clients needing dozens of REST calls to render a single page. With GraphQL, mobile and web clients could request exactly the data they needed in a single round-trip. GitHub reported that GraphQL reduced API response payload sizes by up to 90% for some endpoints, and the self-documenting schema eliminated the need for separate API documentation maintenance.

## Related Frameworks

- bff-pattern (complement)
- api-gateway-pattern (complement)
- openapi-specification (alternative)

## Source

https://sdframe.caldis.me/frameworks/graphql-schema-design
