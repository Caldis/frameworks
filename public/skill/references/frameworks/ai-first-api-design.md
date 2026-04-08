# AI-First API Design / AI 优先 API 设计

- **Category**: ai
- **Complexity**: advanced
- **Quality**: usability, maintainability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Community-evolved pattern; influenced by Anthropic MCP (2024), OpenAI Plugins (2023), and Stripe API design philosophy, 2023-03
- **Adopters**: Stripe, Shopify, Anthropic (MCP), Twilio, Salesforce

Design APIs optimized for consumption by AI agents

_面向 AI 代理消费优化设计 API 接口_

## When to Use

Apply this framework when:
- Building APIs that will be consumed by LLM agents via function calling or MCP
- Creating internal platform APIs where AI assistants will be primary consumers alongside humans
- Designing microservice interfaces in systems where AI orchestrators route between services
- Migrating existing APIs to be compatible with the AI agent ecosystem

## When NOT to Use

Stop and reconsider if:
- Internal microservices that will only ever be consumed by other services, not AI agents
- High-performance binary protocols (gRPC, Protocol Buffers) where human/AI readability is traded for speed
- Legacy systems with no feasible path to adding rich descriptions or structured schemas
- APIs that handle only human-to-human workflows with no AI agent interaction

## Core Concepts

- Self-Describing Endpoint: An API endpoint with rich OpenAPI descriptions that an agent can understand without external documentation
- Capability Manifest: A machine-readable document (like MCP server config) that advertises what an API can do
- Semantic Resource Naming: Using clear, descriptive resource names (/invoices, /customers) instead of opaque IDs or abbreviations
- Affordance Embedding: Including next-possible-actions or HATEOAS-style links in API responses to guide agent navigation
- Error Actionability: Returning structured error responses that tell the agent exactly what to fix (missing field, invalid format, etc.)

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying AI-First API Design to?
- What constraints or existing architecture do you need to work within?
- Has your team used AI-First API Design before? (This is an advanced framework)

## Implementation Steps

1. Expose semantic resource names and self-describing endpoints (OpenAPI + rich descriptions)
2. Return structured, schema-validated JSON responses that avoid ambiguous free-text fields
3. Provide bulk and idempotent operations to reduce agent round-trips and retries
4. Embed task-relevant metadata (next actions, related resources) in responses as hints
5. Publish a machine-readable capability manifest so agents can discover and compose APIs

<details><summary>中文步骤</summary>

1. 暴露语义化资源名称和自描述端点（OpenAPI + 丰富描述）
2. 返回模式验证的结构化 JSON，避免歧义自由文本字段
3. 提供批量操作和幂等操作以减少代理往返请求和重试
4. 在响应中嵌入任务相关元数据（后续动作、关联资源）作为提示
5. 发布机器可读的能力清单，使代理能够发现和组合 API

</details>

## Do

- Write API descriptions as if the consumer has zero prior context -- agents don't read README files
- Return consistent, typed response schemas so agents can reliably parse without error handling hacks
- Include pagination metadata and total counts in list responses for agents to plan their retrieval
- Provide sandbox/test environments where agents can safely explore API capabilities

## Don't

- Don't return HTML or unstructured text in API responses -- agents need structured JSON to act on
- Don't require multi-step authentication flows that agents can't navigate programmatically
- Don't use inconsistent naming conventions across endpoints -- agents rely on naming patterns for discovery
- Don't embed critical information only in documentation -- put it in the OpenAPI spec where agents can see it

## Case Study

**Stripe**: Stripe's API has been widely cited as the gold standard for AI-consumable API design. Its consistent resource naming, rich error messages with fix suggestions, and comprehensive OpenAPI specification made it one of the first APIs that LLM agents could navigate effectively. When ChatGPT Plugins launched, Stripe was among the first integrations, and agents could create payment links, manage subscriptions, and issue refunds with minimal prompt engineering.

## Related Frameworks

- tool-use-design-pattern (complement)
- richardson-maturity-model (extends)
- agent-communication-protocol (complement)

## Source

https://sdframe.caldis.me/frameworks/ai-first-api-design
