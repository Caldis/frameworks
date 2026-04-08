# AI Cost Optimization / AI 成本优化

- **Category**: ai
- **Complexity**: intermediate
- **Quality**: performance, maintainability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: a16z, 2020
- **Adopters**: Notion, Jasper, Cursor, Perplexity AI, Cohere, Scale AI

Systematic strategies for managing and reducing LLM inference costs at production scale

_在生产规模下系统性管理和降低大模型推理成本的策略_

## When to Use

Apply this framework when:
- Production AI applications with significant monthly LLM spend where cost is becoming a margin concern
- Systems with heterogeneous request types where some tasks can be handled by smaller, cheaper models without quality loss
- Applications with high query repetition rates where semantic caching can dramatically reduce redundant inference calls
- Teams preparing to scale from prototype to production who want to right-size inference costs before traffic grows

## When NOT to Use

Stop and reconsider if:
- Early-stage AI products in the quality discovery phase where cost optimization introduces risk before the product has found its quality bar
- Applications with inherently unique, non-cacheable queries (e.g., real-time analysis of live data streams) where caching and batching strategies have negligible impact
- Safety-critical AI applications where model downgrading carries unacceptable quality risk that outweighs cost savings
- Teams spending under $1,000/month on LLM inference where optimization engineering effort exceeds projected savings over any reasonable payback period

## Core Concepts

- Model Tiering: Match request complexity to model capability — use small fast models (GPT-4o-mini, Claude Haiku) for classification and extraction; reserve frontier models for complex reasoning
- Semantic Caching: Store LLM response embeddings and retrieve cached answers for semantically similar future queries, bypassing inference for repeated or near-identical requests
- Context Window Economy: Every input token has a cost; prompt compression, RAG, and conversation summarization reduce the average context length per request
- Batch Inference: Non-real-time workloads can use asynchronous batch APIs at 50–80% lower cost per token than synchronous endpoints

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying AI Cost Optimization to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Instrument your LLM usage**: capture token counts, model tier, latency, and cost per request to establish a baseline cost profile
2. Classify requests by complexity and route to the cheapest model tier that meets the quality threshold for each task type
3. Reduce input token volume through prompt compression, context summarization, and retrieval-augmented generation over full context injection
4. Cache deterministic or near-deterministic LLM responses using semantic caching to eliminate redundant inference calls
5. Evaluate output quality vs. cost tradeoffs continuously using automated eval frameworks to ensure cost reduction does not degrade user outcomes

<details><summary>中文步骤</summary>

1. 对 LLM 使用情况进行监控：捕获每次请求的 Token 数、模型层级、延迟和成本，建立成本基线
2. 按复杂度对请求分类，并路由到满足每种任务类型质量阈值的最低成本模型层级
3. 通过提示词压缩、上下文摘要和检索增强生成替代完整上下文注入来减少输入 Token 量
4. 使用语义缓存对确定性或近确定性的 LLM 响应进行缓存，消除冗余推理调用
5. 使用自动化评估框架持续评估输出质量与成本的权衡，确保降低成本不会降低用户体验

</details>

## Do

- Do measure cost per user outcome (e.g., cost per successful task completion) rather than cost per API call, because optimizing raw token spend can inadvertently increase total cost via higher retry rates
- Do establish quality floor metrics before cost optimization so you have a defensible threshold below which cost cuts are blocked
- Do test model downgrades on a representative sample of production traffic before full rollout, because benchmark performance does not always predict production quality
- Do use prompt caching for system prompts and long static context that is reused across many requests, because this is typically the highest-ROI optimization available

## Don't

- Don't optimize LLM costs before you understand your usage profile — premature optimization targets the wrong bottlenecks and wastes engineering time
- Don't cache non-deterministic or personalized responses, because stale cached answers to user-specific queries degrade response quality and can expose one user's data to another
- Don't switch to a cheaper model without running an A/B evaluation on real traffic — lab benchmarks systematically underestimate quality gaps on production query distributions
- Don't neglect infrastructure costs (embedding generation, vector DB storage, reranking) when calculating total AI system cost — inference is often not the largest line item

## Case Study

**Notion**: Notion reduced their AI feature inference costs by over 80% between 2023 and 2024 through a combination of model routing, prompt compression, and caching. They implemented a complexity classifier that routes simple autocomplete and summarization requests to GPT-3.5-class models while reserving GPT-4-class models for complex drafting and Q&A. Prompt compression using LLMLingua reduced their average context length by 40%. A semantic cache for their AI search feature achieved a 35% cache hit rate in production, eliminating over a third of all inference calls. These combined optimizations allowed Notion to offer unlimited AI features at no additional charge while maintaining profitability.

## Related Frameworks

- prompt-chaining (complement)
- llm-evaluation-framework (complement)
- multimodal-pipeline-design (complement)

## Source

https://sdframe.caldis.me/frameworks/ai-cost-optimization
