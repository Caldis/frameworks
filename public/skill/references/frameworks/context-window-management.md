# Context Window Management Pattern / 上下文窗口管理模式

- **Category**: ai
- **Complexity**: intermediate
- **Quality**: performance, reliability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Community-evolved pattern; formalized by LangChain (ConversationBufferWindowMemory, 2022) and Anthropic (long context research, 2023), 2022-10
- **Adopters**: OpenAI (ChatGPT), Anthropic (Claude), LangChain, Google (Gemini), Cohere

Strategically manage LLM context to maximize coherence

_战略性管理大模型上下文以最大化对话连贯性_

## When to Use

Apply this framework when:
- Multi-turn conversational agents where history accumulates beyond the context window limit
- RAG systems that must balance retrieved context against conversation history and system prompt
- Complex agentic workflows where tool outputs and reasoning traces fill the context rapidly
- Cost-sensitive applications where reducing token usage directly reduces API spend

## When NOT to Use

Stop and reconsider if:
- Short, single-turn interactions that never approach context limits
- Use cases where the entire relevant context easily fits within the window with room to spare
- Offline batch processing where context can be partitioned rather than compressed
- When using models with extremely large native windows (1M+ tokens) and cost is not a concern

## Core Concepts

- Token Budget: The allocation of context window capacity across system prompt, history, retrieval, and output reserve
- Sliding Window: Keeping only the N most recent conversation turns and discarding older ones
- Summary Compression: Using an LLM to condense older conversation history into a shorter summary
- Priority Tiering: Ranking context segments by importance to decide eviction order when space runs out
- Lost-in-the-Middle Effect: The empirical finding that models attend less to information placed in the middle of long contexts

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Context Window Management Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Profile token usage across system prompt, history, retrieved context, and output budget
2. Implement a sliding-window or summary-compression strategy for long conversation history
3. Assign priority tiers to context segments (system > recent turns > retrieved > background)
4. Prune low-priority segments first when approaching the token limit
5. Benchmark coherence and task performance across window sizes to calibrate the strategy

<details><summary>中文步骤</summary>

1. 分析系统提示词、历史记录、检索上下文和输出预算各自的 Token 占用
2. 对长对话历史实现滑动窗口或摘要压缩策略
3. 为上下文片段分配优先级层级（系统 > 近期轮次 > 检索内容 > 背景知识）
4. 接近 Token 上限时优先裁剪低优先级片段
5. 在不同窗口大小下基准测试连贯性和任务性能以校准策略

</details>

## Do

- Always reserve output token budget -- filling 100% of context leaves no room for the response
- Place the most important information at the beginning and end of the context (avoid the lost-in-the-middle zone)
- Measure actual token usage in production to understand real allocation patterns before optimizing
- Use structured metadata tags to mark context segments so they can be selectively pruned

## Don't

- Don't assume larger context windows eliminate the need for management -- cost and attention degradation still apply
- Don't summarize aggressively without preserving key facts -- lossy compression can cause hallucination
- Don't treat all conversation turns as equal priority -- recent turns and system prompts matter most
- Don't ignore the cost implications -- 100K context calls are 10x more expensive than 10K calls

## Case Study

**ChatGPT (OpenAI)**: OpenAI's ChatGPT implements a sophisticated context management strategy combining sliding window history with automatic summarization. When conversations exceed the context limit, earlier turns are compressed into summaries while the system prompt and recent messages are preserved at full fidelity. This approach enabled ChatGPT to maintain coherent multi-hour conversations while keeping inference costs predictable.

## Related Frameworks

- rag-architecture (complement)
- prompt-chaining (complement)
- llm-system-design-patterns (related)

## Source

https://sdframe.caldis.me/frameworks/context-window-management
