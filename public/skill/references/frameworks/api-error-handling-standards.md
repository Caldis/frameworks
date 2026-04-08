# API Error Handling Standards / API错误处理标准

- **Category**: api
- **Complexity**: beginner
- **Quality**: usability, maintainability, reliability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Mark Nottingham & Erik Wilde, IETF RFC 7807, 2016, 2012
- **Adopters**: Zalando, Microsoft Azure, ASP.NET Core, Spring Boot, Adyen

RFC 7807 Problem Details and structured error responses for consistent API error communication

_RFC 7807问题详情与结构化错误响应，用于一致的API错误通信_

## When to Use

Apply this framework when:
- When building any HTTP API that needs to communicate errors to clients in a consistent, machine-parseable format
- When multiple API services need a unified error format so that client error-handling code can be shared across services
- When API consumers include non-technical integrators who need clear, actionable error messages to resolve integration problems
- When the API is public or partner-facing and error contract stability is as important as the happy-path contract

## When NOT to Use

Stop and reconsider if:
- Binary protocols (gRPC, Thrift) that have their own error status code mechanisms and don't use HTTP response bodies for errors
- Internal service-to-service communication where both sides share the same codebase and typed exceptions are more expressive than JSON error bodies
- Streaming APIs where the error format is dictated by the streaming protocol (SSE, WebSocket) rather than HTTP response status
- Legacy APIs where clients already depend on a non-standard error format and migration risk outweighs the benefit of standardization

## Core Concepts

- RFC 7807 Problem Details: Standardized JSON body for HTTP error responses with type (URI), title (human summary), status (HTTP code), detail (specific explanation), and instance (URI of the occurrence)
- Semantic HTTP Status Codes: Using HTTP status codes according to their RFC-defined semantics rather than always returning 200 with an error flag in the body
- Machine-Readable Error Codes: Short stable string codes (INVALID_EMAIL_FORMAT, INSUFFICIENT_FUNDS) that clients can switch on for programmatic handling independent of human-readable messages
- Validation Error Extensions: Field-level error details (field path, constraint violated, provided value) appended to the Problem Details body as a custom extension
- Error Traceability: Including a trace_id or request_id in every error response so that clients can correlate API errors with server-side logs for debugging

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying API Error Handling Standards to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Adopt RFC 7807 Problem Details as the standard error response format, returning application/problem+json with type, title, status, detail, and instance fields
2. Create a canonical error type registry mapping each error condition to a unique URI-based type identifier so that clients can handle errors programmatically
3. **Map HTTP status codes semantically**: 400 for malformed requests, 401 for unauthenticated, 403 for unauthorized, 404 for not found, 409 for conflicts, 422 for validation errors, 429 for rate limits, 500 for server faults
4. Add machine-readable error extensions to the Problem Details body (field-level validation errors, error codes, trace IDs) while keeping the human-readable detail field concise
5. Document all error responses in the OpenAPI spec with response schemas, test error scenarios in contract tests, and publish an error catalog in the developer documentation

<details><summary>中文步骤</summary>

1. 采用RFC 7807问题详情作为标准错误响应格式，返回application/problem+json，包含type、title、status、detail和instance字段
2. 创建规范错误类型注册表，将每种错误条件映射到基于URI的唯一类型标识符，使客户端能够以编程方式处理错误
3. 语义化映射HTTP状态码：400用于格式错误请求，401用于未认证，403用于未授权，404用于未找到，409用于冲突，422用于验证错误，429用于速率限制，500用于服务器故障
4. 向问题详情主体添加机器可读的错误扩展（字段级验证错误、错误代码、追踪ID），同时保持人类可读的detail字段简洁
5. 在OpenAPI规范中记录所有错误响应及响应模式，在契约测试中测试错误场景，并在开发者文档中发布错误目录

</details>

## Do

- Do always include a machine-readable error code alongside the human-readable detail so that client code can handle errors programmatically without parsing strings
- Do include a trace_id in every error response so that on-call engineers can correlate client-reported errors with distributed traces in seconds
- Do return field-level validation errors as structured extensions (not a flat string) so that form clients can display errors next to the relevant input
- Do document every error response in the OpenAPI spec so that SDK generators produce typed error classes and clients know what to expect

## Don't

- Don't return HTTP 200 with an error flag in the body because it breaks HTTP-layer tools (CDNs, proxies, monitoring) that rely on status codes for routing and alerting
- Don't expose internal stack traces or database error messages in API error responses because they reveal exploitable implementation details
- Don't use the same error type URI for different error conditions because it forces clients to parse the detail string to distinguish errors
- Don't omit error documentation from the OpenAPI spec because undocumented errors are invisible to SDK generators and developer portal users

## Case Study

**Zalando**: Zalando, the European e-commerce platform, published its REST API Guidelines (open-sourced on GitHub) which mandated RFC 7807 Problem Details for all internal and external APIs. By standardizing error responses across hundreds of microservices, Zalando enabled a shared error-handling middleware in its API gateway that automatically enriched errors with trace IDs, correlated them with Zipkin traces, and forwarded structured error metrics to its observability platform. Client teams reported a 60% reduction in integration debugging time because errors were self-describing and immediately traceable.

## Related Frameworks

- openapi-specification (complement)
- api-first-design (complement)

## Source

https://sdframe.caldis.me/frameworks/api-error-handling-standards
