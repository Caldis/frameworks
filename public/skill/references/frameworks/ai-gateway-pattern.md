# AI Gateway Pattern / AI 网关模式

- **Category**: ai
- **Complexity**: intermediate
- **Quality**: performance, reliability, maintainability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Anthropic, 2023-03
- **Adopters**: Grab, Shopify, Cloudflare, Kong, Portkey, Uber

Centralized proxy for LLM API management, rate limiting, caching, and observability

_集中式代理，用于大模型 API 管理、限流、缓存与可观测性_

## When to Use

Apply this framework when:
- Organizations with multiple teams consuming LLM APIs and needing centralized cost governance and quota enforcement
- Production systems requiring provider redundancy — route to a backup model when the primary provider is unavailable
- Any service where prompt caching can deliver significant cost savings by serving repeated or semantically similar queries from cache
- Enterprises with strict compliance requirements that need every LLM request logged and auditable in a single place

## When NOT to Use

Stop and reconsider if:
- Single-model, single-team prototypes where the operational overhead of a gateway exceeds its benefits
- Latency-critical inference paths where adding a network hop is unacceptable — consider co-locating the gateway in the same VPC
- Research and experimentation environments where rigid quotas would slow down exploration
- When your LLM provider already offers native rate limiting, caching, and observability that fully meets your requirements

## Core Concepts

- Semantic Cache: Storing LLM responses keyed by embedding similarity so semantically equivalent prompts hit cache instead of the model
- Provider Fallback: Automatically rerouting requests to an alternative LLM provider when the primary returns an error or exceeds latency thresholds
- Budget Guard: Per-team or per-project spend limits enforced at the gateway layer before tokens are ever sent upstream
- Request Normalization: Translating provider-specific API formats into a unified schema so application code is provider-agnostic
- Audit Log: An immutable, tamper-evident log of every request and response passing through the gateway for compliance and debugging

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying AI Gateway Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Deploy a gateway service (Kong AI Gateway, Portkey, LiteLLM) in front of all LLM provider endpoints
2. Configure routing rules to fan-out requests across providers (OpenAI, Anthropic, Azure) with fallback chains
3. Enable request-level caching using semantic similarity or exact-match keys to reduce duplicate API calls
4. Enforce rate limits, budget caps, and per-team quotas so no single consumer can exhaust shared capacity
5. Instrument the gateway to emit per-request logs, latency metrics, token usage, and cost breakdowns to your observability stack

<details><summary>中文步骤</summary>

1. 在所有大模型提供商端点前部署网关服务（Kong AI Gateway、Portkey、LiteLLM 等）
2. 配置路由规则，将请求分发至多个提供商（OpenAI、Anthropic、Azure）并设置降级链
3. 使用语义相似度或精确匹配键启用请求级缓存，减少重复 API 调用
4. 强制执行限流、预算上限和团队级配额，防止单一消费者耗尽共享容量
5. 对网关进行埋点，将请求日志、延迟指标、Token 用量和费用明细输出至可观测性平台

</details>

## Do

- Version your routing rules as code so provider migrations and fallback changes are reviewable and reversible
- Instrument cache hit rates per route — a rate below 20% suggests the cache key strategy needs tuning
- Set hard token-budget alerts well below your actual limit so you have reaction time before costs spiral
- Test fallback chains in staging by intentionally disabling the primary provider endpoint

## Don't

- Don't cache responses for prompts containing user-specific PII without anonymisation — cache poisoning is a real risk
- Don't route all traffic through a single-region gateway — this creates a latency bottleneck and a single point of failure
- Don't skip authentication at the gateway layer — unauthenticated proxies expose your API keys to anyone who discovers the endpoint
- Don't use overly aggressive semantic similarity thresholds for caching — near-duplicate prompts may need different answers

## Case Study

**Grab**: Grab's AI platform team deployed an internal LLM gateway to serve 40+ product teams across their super-app. The gateway enforced per-squad token budgets, enabled semantic caching that cut API costs by 35% in the first quarter, and provided a unified audit trail required by their financial services regulators. When OpenAI experienced an outage in late 2023, automatic fallback to Azure OpenAI Service kept all customer-facing AI features fully operational with no engineer intervention.

## Related Frameworks

- llm-system-design-patterns (complement)
- ai-observability-framework (complement)
- prompt-caching-strategies (related)

## Source

https://sdframe.caldis.me/frameworks/ai-gateway-pattern
