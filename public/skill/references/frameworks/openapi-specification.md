# OpenAPI Specification / OpenAPI规范

- **Category**: api
- **Complexity**: beginner
- **Quality**: usability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Tony Tam / Swagger (2011); donated to OpenAPI Initiative / Linux Foundation (2015)
- **Adopters**: Stripe, Twilio, GitHub, Microsoft, Google

Machine-readable API description standard for RESTful services

_面向RESTful服务的机器可读API描述标准_

## When to Use

Apply this framework when:
- When designing REST APIs that need a single source of truth for documentation, client generation, and testing
- When multiple teams consume your API and need unambiguous, machine-readable interface documentation
- When enforcing API design standards across an organization using automated linting in CI pipelines
- When building developer portals where interactive API exploration (try-it-out) is essential for adoption

## When NOT to Use

Stop and reconsider if:
- GraphQL APIs where the schema itself serves as the specification and OpenAPI adds no value
- Event-driven or asynchronous APIs where AsyncAPI is the appropriate specification standard
- Internal gRPC services where Protocol Buffer definitions already serve as the machine-readable contract
- Extremely experimental APIs that change multiple times per day, where spec maintenance overhead exceeds its benefits

## Core Concepts

- Design-First Approach: Write the OpenAPI specification before implementing the API, using it as a contract between frontend and backend teams
- Path and Operation Objects: Each API endpoint is defined by its URL path and HTTP method, with typed parameters, request bodies, and response schemas
- Components and Reuse: Shared schemas, security schemes, parameters, and response objects are defined once in the components section and referenced via $ref
- Code Generation: Tools like openapi-generator and swagger-codegen produce type-safe client SDKs, server stubs, and mock servers from the specification
- Linting and Governance: Rulesets (e.g., Spectral) enforce naming conventions, pagination standards, and error formats across all API specifications in an organization

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying OpenAPI Specification to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the OpenAPI document structure**: info metadata, server URLs, and global security schemes in YAML or JSON format
2. Describe each API endpoint as a path object with HTTP methods, parameters (path, query, header), and request bodies
3. Define reusable schemas in the components section using JSON Schema for request/response models, reducing duplication
4. Add response definitions for each status code including error responses, linking to component schemas where appropriate
5. Validate the specification using linting tools (Spectral, openapi-generator), then generate documentation, client SDKs, and server stubs

<details><summary>中文步骤</summary>

1. 定义OpenAPI文档结构：以YAML或JSON格式描述info元数据、服务器URL和全局安全方案
2. 将每个API端点描述为路径对象，包含HTTP方法、参数（路径、查询、头部）和请求体
3. 在components部分使用JSON Schema定义可复用的请求/响应模型模式，减少重复
4. 为每个状态码添加响应定义（包括错误响应），在适当处链接到组件模式
5. 使用lint工具（Spectral、openapi-generator）验证规范，然后生成文档、客户端SDK和服务端存根

</details>

## Do

- Do adopt a design-first workflow where the OpenAPI spec is written and reviewed before any code because it catches API design issues before implementation
- Do use $ref extensively for schema reuse because duplicated schemas inevitably drift and cause inconsistencies
- Do integrate Spectral or similar linting into CI because it enforces organizational API standards automatically
- Do include example values for all request and response schemas because they power interactive documentation and mock servers

## Don't

- Don't generate the OpenAPI spec from code as the primary workflow because code-first approaches produce specs that mirror implementation rather than design intent
- Don't ignore the components section and inline all schemas because it leads to massive duplication and maintenance burden
- Don't treat the OpenAPI spec as documentation only because its greatest value is in code generation, testing, and contract enforcement
- Don't skip error response schemas because undocumented error formats force consumers to handle errors through guesswork

## Case Study

**Stripe**: Stripe maintains one of the most comprehensive OpenAPI specifications in the industry, covering every endpoint of their payment API. The specification drives automatic generation of client libraries in 7+ languages, interactive API documentation on their developer portal, and internal contract testing. By treating the OpenAPI spec as the single source of truth, Stripe ensures that documentation, SDKs, and the live API never diverge, which has been a key factor in their industry-leading developer experience.

## Related Frameworks

- consumer-driven-contracts (complement)
- asyncapi (alternative)
- hateoas (complement)

## Source

https://sdframe.caldis.me/frameworks/openapi-specification
