# RAG Architecture / 检索增强生成架构

- **Category**: ai
- **Complexity**: intermediate
- **Quality**: reliability, performance
- **Abstraction**: system
- **Maturity**: established
- **Author**: Patrick Lewis et al. (Meta AI / UCL), 2020, 2020-05
- **Adopters**: Klarna, Notion AI, Perplexity AI, Databricks, Elastic

Ground LLM responses with retrieved external knowledge

_通过检索外部知识为大模型响应提供事实依据_

## When to Use

Apply this framework when:
- Enterprise knowledge bases where the LLM must answer from proprietary or frequently updated documents
- Customer support bots that need to cite specific policy pages or product documentation
- Legal or compliance use cases requiring traceable source attribution for every claim
- Any domain where hallucination risk is high and factual grounding is non-negotiable

## When NOT to Use

Stop and reconsider if:
- Tasks requiring creative generation or open-ended brainstorming where grounding constrains the output
- Small-context scenarios where all necessary information fits directly in the system prompt
- Real-time streaming applications where retrieval latency is unacceptable
- When the knowledge base is too noisy or unstructured for meaningful similarity matching

## Core Concepts

- Chunking: Splitting source documents into semantically meaningful segments for embedding and retrieval
- Embedding: Converting text chunks into dense vector representations using models like OpenAI Ada or BGE
- Vector Store: A specialized database (Pinecone, Weaviate, Chroma) that indexes embeddings for similarity search
- Retrieval: Finding the top-K most relevant chunks to a query via approximate nearest neighbor search
- Faithfulness: The degree to which the generated answer is supported by and consistent with retrieved context

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying RAG Architecture to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Chunk, embed, and index domain documents into a vector store
2. At query time, embed the user question and retrieve top-K relevant chunks
3. Construct a prompt that injects retrieved context before the question
4. Generate the answer with the LLM, citing source chunks for traceability
5. Evaluate retrieval recall and generation faithfulness; iterate on chunking strategy

<details><summary>中文步骤</summary>

1. 对领域文档进行分块、向量化并写入向量数据库
2. 查询时将用户问题向量化，检索 Top-K 相关片段
3. 构建提示词，将检索内容注入问题前作为上下文
4. 由大模型生成答案并引用来源片段以确保可溯源
5. 评估检索召回率与生成忠实度，迭代优化分块策略

</details>

## Do

- Experiment with chunk sizes (256-1024 tokens) and overlap -- optimal size varies by domain
- Use a re-ranker (Cohere Rerank, cross-encoder) to improve precision after initial retrieval
- Include metadata filters (date, source, category) to narrow retrieval scope before vector search
- Evaluate with RAGAS or similar frameworks that measure both retrieval quality and answer faithfulness

## Don't

- Don't assume bigger chunks are better -- oversized chunks dilute relevance and waste context window
- Don't skip hybrid search -- combining keyword (BM25) with vector search often outperforms either alone
- Don't forget to refresh embeddings when source documents are updated -- stale indexes cause drift
- Don't treat RAG as a substitute for fine-tuning when the task requires deep domain reasoning

## Case Study

**Klarna**: Klarna deployed a RAG-powered customer service assistant that retrieves answers from their internal policy and product documentation. The system handles 2.3 million conversations in its first month, performing the equivalent work of 700 full-time agents with a 25% reduction in repeat inquiries, while maintaining source traceability for compliance.

## Related Frameworks

- llm-system-design-patterns (related)
- context-window-management (complement)
- ai-observability-framework (complement)

## Source

https://sdframe.caldis.me/frameworks/rag-architecture
