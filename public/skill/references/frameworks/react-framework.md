# ReAct Framework / ReAct 推理-行动框架

- **Category**: ai
- **Complexity**: intermediate
- **Quality**: reliability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Shunyu Yao et al., 2022, 2022-10
- **Adopters**: LangChain, LlamaIndex, OpenAI (Assistants API), Google DeepMind, Microsoft Semantic Kernel

Interleave reasoning traces and actions in LLM agents

_在大模型代理中交织推理轨迹与动作执行_

## When to Use

Apply this framework when:
- Building agents that need to call external tools (search, APIs, databases) to answer questions
- Tasks where pure chain-of-thought reasoning is insufficient without grounding in real data
- Interactive problem-solving scenarios requiring iterative refinement based on observations
- Knowledge-intensive QA where the model must decide what to look up and when to stop

## When NOT to Use

Stop and reconsider if:
- Simple classification or generation tasks that don't require external tool calls
- Latency-critical applications where multi-step loops add unacceptable delay
- Tasks where the full context is already available in the prompt and retrieval adds no value
- Scenarios requiring deterministic output -- the non-deterministic loop may produce variable traces

## Core Concepts

- Thought: The model's internal reasoning step that plans the next action or interprets an observation
- Action: A concrete tool invocation emitted by the model (e.g., Search[query], Lookup[term])
- Observation: The external environment's response returned after executing an action
- Trace: The full interleaved sequence of Thought-Action-Observation steps forming the agent's trajectory
- Grounding: Anchoring the model's reasoning in real-world data obtained via tool calls

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying ReAct Framework to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define the agent's task scope and available tool set (APIs, search, code exec)
2. Instrument the LLM prompt to emit Thought / Action / Observation traces
3. Execute each Action against real tools and feed Observation back into context
4. Repeat the Thought-Action-Observation loop until the stopping condition is met
5. Evaluate trace quality and prune or summarize long reasoning chains for efficiency

<details><summary>中文步骤</summary>

1. 定义代理任务范围及可用工具集（API、搜索、代码执行等）
2. 在提示词中要求模型输出 Thought / Action / Observation 三段式轨迹
3. 将每个 Action 发送至真实工具并将 Observation 回写入上下文
4. 循环执行推理-行动-观察，直至达到终止条件
5. 评估轨迹质量，裁剪或摘要过长推理链以降低成本

</details>

## Do

- Keep tool descriptions concise and unambiguous so the model selects the right tool reliably
- Set a maximum iteration limit to prevent runaway loops that burn tokens and time
- Include few-shot examples of complete Thought-Action-Observation traces in the system prompt
- Log full traces for debugging -- they are the primary artifact for understanding agent behavior

## Don't

- Don't give the model too many tools at once -- tool selection accuracy drops sharply past 15-20 tools
- Don't skip observation validation -- feeding raw unstructured HTML into context wastes tokens
- Don't let the agent self-terminate without a verification step -- it may stop prematurely on partial answers
- Don't use ReAct for simple single-step tasks -- the overhead of the loop is unnecessary

## Case Study

**LangChain**: LangChain adopted the ReAct pattern as its default AgentExecutor, enabling thousands of developers to build tool-augmented agents with minimal boilerplate. By standardizing the Thought-Action-Observation loop, LangChain reduced agent development time from weeks to hours and became the most widely used LLM orchestration framework by mid-2023.

## Related Frameworks

- tool-use-design-pattern (complement)
- prompt-chaining (complement)
- multi-agent-orchestration-pattern (extends)

## Source

https://sdframe.caldis.me/frameworks/react-framework
