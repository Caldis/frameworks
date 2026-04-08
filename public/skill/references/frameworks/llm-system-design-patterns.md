# LLM System Design Patterns / LLM系统设计模式

- **Category**: architecture
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Community-evolved; key contributors include Harrison Chase (LangChain, 2022) and Jerry Liu (LlamaIndex, 2022), 2020
- **Adopters**: Klarna, Notion, Shopify, Stripe, Replit

Architectural patterns for production LLM-powered applications

_面向生产环境的LLM驱动应用架构模式集合_

## When to Use

Apply this framework when:
- When building production applications that integrate LLMs for generation, summarization, or reasoning tasks
- When you need to ground LLM outputs in domain-specific knowledge using retrieval-augmented generation
- When designing multi-step agent workflows that require tool use, planning, and iterative refinement
- When cost, latency, and quality trade-offs require intelligent routing between different model sizes

## When NOT to Use

Stop and reconsider if:
- Deterministic computation tasks where traditional algorithms provide exact, reproducible results
- Highly regulated domains where LLM non-determinism and hallucination risk are unacceptable without human oversight
- Low-latency paths where LLM inference time (hundreds of milliseconds to seconds) exceeds requirements

## Core Concepts

- RAG (Retrieval-Augmented Generation): Enhancing LLM responses by retrieving relevant documents from a vector store before generation
- Prompt chaining: Breaking complex tasks into sequential LLM calls where each step's output feeds the next
- Tool use / function calling: Enabling LLMs to invoke external APIs, databases, or code execution environments
- Model routing: Directing requests to different model sizes based on task complexity to optimize cost and latency
- Guardrails: Input/output validation layers that prevent harmful, off-topic, or hallucinated responses

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying LLM System Design Patterns to?
- What constraints or existing architecture do you need to work within?
- Has your team used LLM System Design Patterns before? (This is an advanced framework)

## Implementation Steps

1. **Select the primary integration pattern**: RAG (retrieval-augmented), fine-tuned model, prompt chaining, or tool-use agent
2. **Design the prompt management layer**: prompt templates, versioning, A/B testing infrastructure, and injection of context
3. **Choose memory and state architecture**: in-context window, external vector store, structured DB, or episodic memory
4. Define latency, cost, and quality trade-offs; implement routing to smaller/faster models for simpler sub-tasks
5. **Build evaluation infrastructure**: automated evals, hallucination detection, guardrails, and human feedback loops for continuous improvement

<details><summary>中文步骤</summary>

1. 选择主要集成模式：RAG（检索增强生成）、微调模型、提示链或工具调用智能体
2. 设计提示管理层：提示模板、版本控制、A/B测试基础设施以及上下文注入
3. 选择记忆与状态架构：上下文窗口内、外部向量存储、结构化数据库或情节记忆
4. 定义延迟、成本和质量权衡；实现路由机制将简单子任务转发给更小更快的模型
5. 构建评估基础设施：自动化评测、幻觉检测、安全护栏和人类反馈循环以持续改进

</details>

## Do

- Do implement structured evaluation pipelines because 'it looks good' is not a reliable quality measure for LLM outputs
- Do version your prompts and treat them as code artifacts because prompt changes directly affect output quality
- Do use RAG before fine-tuning because it is cheaper, faster to iterate, and keeps the knowledge updatable
- Do add guardrails for input validation and output safety because LLMs can be manipulated through prompt injection

## Don't

- Don't send raw user input directly to the LLM because it opens the door to prompt injection attacks
- Don't rely solely on temperature settings for output diversity because structured sampling strategies give more control
- Don't build monolithic prompt chains because a failure in one step cascades and is hard to debug
- Don't skip cost monitoring because LLM API costs can grow exponentially with scale and retries

## Case Study

**Klarna**: Klarna deployed an AI assistant powered by OpenAI that handled two-thirds of all customer service chats within its first month, performing the equivalent work of 700 full-time agents. The system uses RAG to retrieve relevant order data and company policies, prompt chaining for multi-turn conversation management, and guardrails to prevent the AI from making unauthorized commitments. Klarna reported a 25% reduction in repeat inquiries and average resolution time dropping from 11 minutes to under 2 minutes.

## Related Frameworks

- rag-architecture (complement)
- react-framework (related)
- prompt-chaining (related)
- guardrails-framework (related)

## Source

https://sdframe.caldis.me/frameworks/llm-system-design-patterns
