# API-First Design / API优先设计

- **Category**: api
- **Complexity**: intermediate
- **Quality**: usability, maintainability, testability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Kin Lane (API Evangelist), popularized by Twilio and Stripe engineering blogs, ~2012, 2011
- **Adopters**: Stripe, Twilio, Adyen, Shopify, Box

Design the API contract before implementation using a Swagger-first workflow

_在实现之前先设计API契约，采用Swagger优先工作流_

## When to Use

Apply this framework when:
- When multiple teams (frontend, mobile, backend) need to work in parallel and cannot afford sequential dependency
- When building a public or partner API where the contract must be stable and well-documented before any consumer integrates
- When the organization wants to treat APIs as products with versioned, discoverable contracts rather than implementation byproducts
- When integrating with third-party systems that require a formalized API spec for compliance or procurement approval

## When NOT to Use

Stop and reconsider if:
- Rapid internal prototyping where the API surface changes multiple times per day and maintaining a spec creates more friction than value
- Small single-team projects where the frontend and backend developer are the same person and implicit coordination is sufficient
- Legacy system wrapping where the API shape is dictated entirely by existing database or service contracts with no design latitude
- Exploratory research APIs where the goal is to discover the right API shape through iteration rather than upfront specification

## Core Concepts

- Contract as Source of Truth: The OpenAPI or AsyncAPI spec is the canonical definition; implementation must conform to the spec, not vice versa
- Spec-First Workflow: The spec is authored, reviewed, and agreed upon before a single line of implementation code is written
- Mock-Driven Development: Mock servers generated from the spec allow consumer teams to develop and test against a realistic API before the backend is ready
- Design-Time Linting: Automated spec validators (Spectral, Redocly) enforce style guides and breaking-change rules as part of the CI pipeline
- Parallel Development: Frontend and backend teams can work simultaneously once the contract is frozen, reducing end-to-end delivery time

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying API-First Design to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define the API contract in OpenAPI (Swagger) or AsyncAPI specification before writing any implementation code, treating the spec as the single source of truth
2. Review and validate the contract with all stakeholders — frontend, backend, QA, and product — using mock servers generated from the spec
3. Generate server stubs and client SDKs from the specification so that implementation is constrained to match the agreed contract
4. Set up contract linting rules (Spectral, Redocly) and integrate spec validation into CI to prevent unauthorized contract drift
5. Publish the finalized spec to the developer portal and proceed with parallel frontend and backend implementation against the shared contract

<details><summary>中文步骤</summary>

1. 在编写任何实现代码之前，先用OpenAPI（Swagger）或AsyncAPI规范定义API契约，将规范视为唯一真实来源
2. 使用从规范生成的模拟服务器，与所有利益相关方——前端、后端、QA和产品——评审并验证契约
3. 从规范生成服务端桩代码和客户端SDK，使实现受约束以符合已商定的契约
4. 设置契约代码检查规则（Spectral、Redocly）并将规范验证集成到CI中，防止未经授权的契约偏移
5. 将最终规范发布到开发者门户，并开始基于共享契约并行进行前端和后端实现

</details>

## Do

- Do treat the spec as a living document under version control so that changes are reviewed, approved, and tracked like code changes
- Do generate mock servers automatically from the spec so that consumer teams can integrate and test without waiting for backend completion
- Do enforce spec linting in CI with tools like Spectral to catch style violations and breaking changes before they merge
- Do involve consumers (frontend, mobile, external partners) in spec review because they surface usability issues before implementation locks them in

## Don't

- Don't write the spec after the implementation because it becomes a documentation exercise that never accurately reflects the actual API behavior
- Don't freeze the spec too early without consumer input because a contract that doesn't reflect actual client needs forces workarounds
- Don't skip design-time validation because undocumented edge cases in the spec propagate silently into generated SDKs and client code
- Don't treat API-First as a heavyweight process requiring formal approval gates for every minor change — use automated linting instead

## Case Study

**Stripe**: Stripe built its entire developer platform around an API-First philosophy, maintaining a machine-readable OpenAPI specification as the source of truth for all its payment APIs. Every SDK (Python, Ruby, Node.js, Java, Go, .NET) is generated directly from the spec, ensuring that documentation, code samples, and client libraries are always synchronized with the live API. When Stripe introduces a new endpoint or modifies a resource shape, the change flows automatically through the spec into regenerated SDKs and the developer documentation, eliminating the documentation lag that plagues most API providers.

## Related Frameworks

- openapi-specification (complement)
- consumer-driven-contracts (complement)
- bff-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/api-first-design
