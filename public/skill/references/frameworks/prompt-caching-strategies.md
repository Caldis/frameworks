# Prompt Caching Strategies / 提示词缓存策略

- **Category**: ai
- **Complexity**: beginner
- **Quality**: performance, maintainability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: OpenAI, 2024-05
- **Adopters**: Notion, Cursor, Perplexity AI, GitHub Copilot, Anthropic (internal tooling), OpenAI (platform)

Reducing LLM inference costs and latency by reusing KV cache from shared prompt prefixes

_通过复用共享提示词前缀的 KV 缓存，降低大模型推理成本与延迟_

## When to Use

Apply this framework when:
- Chatbot and conversational AI applications with long system prompts repeated verbatim across thousands of turns
- Document Q&A systems where the same large document context is queried many times per session or across users
- Few-shot prompting setups where a fixed set of examples is prepended to every single request
- High-volume API integrations where token costs are a significant operational expense and latency reduction matters

## When NOT to Use

Stop and reconsider if:
- Highly personalised prompts where every request has a unique system prompt — no stable prefix exists to cache
- Single-turn or very low-volume endpoints where the cache write overhead never amortises across enough hits
- Prompts shorter than ~1024 tokens where provider minimum thresholds prevent caching from activating
- Workflows that mutate the system prompt frequently (e.g., A/B testing prompt variations) — constant cache misses negate any benefit

## Core Concepts

- KV Cache: The key-value attention cache computed during LLM prefill; reusing it skips expensive recomputation of shared prefix tokens
- Prefix Stability: The requirement that cached tokens occupy the exact same position in the prompt on every request — any change invalidates the cache
- Cache Write vs Hit Cost: Writing a new cache entry costs slightly more than a standard token; savings accumulate only after sufficient cache hits
- TTL (Time-to-Live): The duration a cached prefix remains valid; Anthropic uses a 5-minute sliding TTL, OpenAI uses 1 hour for eligible prompts
- Cache Breakpoint: A marker (e.g., Anthropic's cache_control) that tells the provider exactly where the cacheable prefix ends and the dynamic content begins

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Prompt Caching Strategies to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the static portions of your prompt (system instructions, documents, few-shot examples) that are shared across many requests
2. Move all static content to the beginning of the prompt so it forms a cacheable prefix before the dynamic user turn
3. Enable provider-level prefix caching (Anthropic cache_control, OpenAI automatic caching) and verify cache hit metrics in API responses
4. Design your turn structure so the cache prefix is reused for at least 2-5 requests to recoup the cache write cost
5. Monitor cache hit rates and TTL behaviour per endpoint; restructure prompts where hit rates are below expectations

<details><summary>中文步骤</summary>

1. 识别提示词中跨请求共享的静态部分（系统指令、文档、少样本示例等）
2. 将所有静态内容移至提示词开头，使其在动态用户轮次之前构成可缓存前缀
3. 启用提供商级前缀缓存（Anthropic cache_control、OpenAI 自动缓存），并在 API 响应中验证缓存命中指标
4. 设计轮次结构，使缓存前缀被至少 2-5 次请求复用，以覆盖缓存写入成本
5. 按端点监控缓存命中率和 TTL 行为，对命中率低于预期的提示词进行重构

</details>

## Do

- Front-load everything static: system prompt, retrieved documents, few-shot examples, then append the user message last
- Aim for a prefix length of at least 1024 tokens — shorter prefixes may not qualify for caching on some providers
- Track the cache_creation_input_tokens and cache_read_input_tokens fields returned by the API to measure actual savings
- Use a deterministic prompt template so that the static prefix bytes are identical across requests — even whitespace differences bust the cache

## Don't

- Don't include timestamps, request IDs, or other dynamic values inside the cached prefix — they invalidate every cache entry
- Don't assume cache hits are free — cache writes cost 1.25× the standard token price on Anthropic; model the break-even point for your traffic pattern
- Don't cache sensitive user data inside a shared prefix — other users' requests may read from the same cache entry
- Don't rely on caching to substitute for context window optimisation — high token counts still incur latency even when cached

## Case Study

**Notion**: Notion's AI team applied prompt caching to their document Q&A feature, where a user's full workspace context (often 50,000+ tokens of notes and pages) was being resent on every follow-up question. By restructuring prompts to place the document corpus before the conversation history and enabling Anthropic's cache_control, they reduced median input token costs for multi-turn sessions by 78% and cut time-to-first-token latency by 40%, directly improving the perceived responsiveness of the AI assistant.

## Related Frameworks

- ai-gateway-pattern (complement)
- context-window-management (complement)
- llm-system-design-patterns (related)

## Source

https://sdframe.caldis.me/frameworks/prompt-caching-strategies
