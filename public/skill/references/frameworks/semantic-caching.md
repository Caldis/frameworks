# Semantic Caching / 语义缓存

- **Category**: ai
- **Complexity**: intermediate
- **Quality**: performance, maintainability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: GPTCache, 2022
- **Adopters**: Grab, Notion, Perplexity AI, Cohere, LangChain, Cloudflare

Caching strategy for LLM applications that stores and retrieves responses based on semantic similarity of queries rather than exact string match.

_LLM 应用的缓存策略，基于查询的语义相似度而非精确字符串匹配来存储和检索响应。_

## When to Use

Apply this framework when:
- LLM applications with high query repetition rates such as customer support bots, FAQ assistants, or domain-specific Q&A systems where many users ask semantically similar questions
- Production AI systems with significant monthly inference spend where a 20-40% cache hit rate would produce meaningful cost reduction without compromising response quality
- Latency-sensitive LLM applications where returning cached responses in milliseconds versus waiting seconds for inference provides a material user experience improvement
- Multi-tenant SaaS platforms where different users frequently ask equivalent questions about shared knowledge domains

## When NOT to Use

Stop and reconsider if:
- Creative writing, code generation, and open-ended generation tasks where every query intentionally produces a unique response and caching would return stale outputs
- Highly personalised applications where every response must be tailored to the specific user context, history, or preferences that differ between users asking equivalent questions
- Low-volume or low-repetition query distributions where the embedding computation and vector store overhead exceeds the inference cost savings from cache hits
- Applications requiring guaranteed freshness such as financial data queries, medical information retrieval, or legal research where cached answers from even hours ago may be materially incorrect

## Core Concepts

- Embedding-Based Similarity: queries are converted to dense vector embeddings using a small fast model; similarity is measured in embedding space, not by string comparison, enabling matches for paraphrased or reworded questions
- Similarity Threshold: a configurable cosine or dot-product similarity threshold controls the precision-recall trade-off — lower thresholds increase hit rate but risk returning slightly off-topic cached answers
- Vector Store Integration: cached query embeddings are stored in a vector database (FAISS, Qdrant, Redis with vector module) to enable sub-millisecond approximate nearest-neighbour lookup at scale
- Cache Scope and Isolation: caches can be scoped globally (all users share one cache), per user (personalised caches), or per session (conversational context isolation) depending on query personalisation requirements

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Semantic Caching to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Embed each incoming query using a lightweight embedding model to produce a vector representation of the query's semantic meaning
2. Perform an approximate nearest-neighbour search against a vector store containing embeddings of previously answered queries to find semantically similar cached entries
3. If a cached entry is found above a configured similarity threshold (e.g., cosine similarity > 0.92), return the cached LLM response without calling the inference endpoint
4. If no sufficiently similar cache entry exists, route the query to the LLM, store the response along with its query embedding in the cache for future retrieval
5. Monitor cache hit rate, similarity threshold performance, and response quality degradation to tune the similarity threshold and eviction policies over time

<details><summary>中文步骤</summary>

1. 使用轻量级嵌入模型对每条传入查询进行嵌入，生成查询语义含义的向量表示
2. 对包含已回答查询嵌入的向量存储执行近似最近邻搜索，查找语义相似的缓存条目
3. 如果找到相似度超过配置阈值（如余弦相似度 > 0.92）的缓存条目，则直接返回缓存的 LLM 响应，无需调用推理端点
4. 如果不存在足够相似的缓存条目，将查询路由至 LLM，并将响应连同查询嵌入一起存储到缓存供未来检索
5. 监控缓存命中率、相似度阈值性能和响应质量退化情况，随时间调整相似度阈值和淘汰策略

</details>

## Do

- Do evaluate cache hit quality with human review on a sample of served cached responses before enabling semantic caching in production — a high hit rate with poor quality is worse than no caching
- Do segment cache namespaces by domain or use-case to prevent cross-domain semantic collisions where queries about different topics map to similar embeddings
- Do set cache TTL (time-to-live) policies based on knowledge freshness requirements — FAQ caches can have longer TTLs than caches for queries about rapidly changing information
- Do monitor the embedding model and similarity threshold combination together — swapping the embedding model invalidates all cached entries and requires cache warming

## Don't

- Do not apply semantic caching to personalised or user-context-sensitive queries without strict namespace isolation — returning one user's cached answer to another user's query can expose private information
- Do not use a similarity threshold below 0.85 for factual question-answering applications — overly permissive thresholds cause semantic cache to serve subtly wrong answers to mismatched queries
- Do not cache responses for queries containing real-time data dependencies such as current prices, live status, or today's date — cached responses become stale and incorrect
- Do not skip embedding the cached response alongside the query — without response-side validation, cache entries degrade silently when the underlying LLM model is updated and responses change

## Case Study

**Grab**: Grab, Southeast Asia's superapp, implemented semantic caching for their AI-powered customer support platform serving tens of millions of queries per month. Before semantic caching, their support bot made an LLM inference call for every unique query, resulting in significant monthly costs. After deploying GPTCache with a FAISS backend and a cosine similarity threshold of 0.90, they observed a 38% cache hit rate on their top support categories (ride cancellation, payment issues, driver queries). Cached responses were returned in under 20 milliseconds versus 1.8 seconds average for inference calls, improving p95 response time significantly. To ensure quality, they ran a weekly human evaluation of 200 randomly sampled cached responses and maintained a per-domain cache to prevent cross-category semantic drift. The net result was a 35% reduction in monthly LLM inference spend with no measurable degradation in CSAT scores.

## Related Frameworks

- ai-cost-optimization (complement)
- llm-evaluation-framework (complement)

## Source

https://sdframe.caldis.me/frameworks/semantic-caching
