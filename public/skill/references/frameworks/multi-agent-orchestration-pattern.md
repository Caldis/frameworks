# Multi-Agent Orchestration Pattern / 多代理编排模式

- **Category**: ai
- **Complexity**: advanced
- **Quality**: scalability, reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Qian Chen et al. (Tsinghua / Microsoft Research), 2023, 2023-07
- **Adopters**: Microsoft (AutoGen), CrewAI, LangGraph (LangChain), ChatDev (Tsinghua), Camel-AI

Coordinate specialized AI agents via an orchestrator layer

_通过编排层协调多个专职 AI 代理协同工作_

## When to Use

Apply this framework when:
- Complex tasks that require diverse expertise, e.g. a coding agent, a testing agent, and a review agent
- Workflows where different sub-tasks benefit from different models or tool configurations
- Research or analysis pipelines where debate or consensus among agents improves output quality
- Production systems that need to scale sub-tasks independently across parallel agents

## When NOT to Use

Stop and reconsider if:
- Simple tasks where a single well-prompted agent with tools is sufficient
- Latency-critical paths where multi-agent round-trips add unacceptable delay
- Early-stage prototypes where the added complexity of agent coordination hinders iteration speed
- Cost-constrained scenarios where multiplying LLM calls across agents exceeds budget

## Core Concepts

- Orchestrator: A supervisory agent that decomposes tasks, routes them to specialists, and merges results
- Specialist Agent: A purpose-built agent with a narrow tool set and system prompt optimized for one sub-task
- Task Graph: The DAG of dependencies between sub-tasks that determines execution order and parallelism
- Shared Memory: A common state store (blackboard) agents read from and write to for coordination
- Debate Protocol: A pattern where multiple agents critique each other's outputs to improve accuracy

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Multi-Agent Orchestration Pattern to?
- What constraints or existing architecture do you need to work within?
- Has your team used Multi-Agent Orchestration Pattern before? (This is an advanced framework)

## Implementation Steps

1. Decompose the overall task into sub-tasks with clear input/output contracts
2. Assign each sub-task to a specialized agent with the appropriate model and tools
3. Implement an orchestrator agent that routes tasks and aggregates results
4. Define inter-agent communication schemas (structured JSON messages or function calls)
5. Add circuit-breakers and fallback paths to handle agent failures gracefully

<details><summary>中文步骤</summary>

1. 将整体任务分解为具有明确输入输出契约的子任务
2. 为每个子任务指定配备合适模型与工具的专职代理
3. 实现负责任务路由和结果聚合的编排代理
4. 定义代理间通信模式（结构化 JSON 消息或函数调用）
5. 添加熔断器与降级路径以优雅处理代理故障

</details>

## Do

- Start with the simplest topology (linear handoff) and add complexity only when single-agent fails
- Give each agent a clearly scoped system prompt -- blurry roles cause redundant or conflicting work
- Use structured message schemas between agents to avoid natural-language parsing errors
- Implement observability at the orchestrator level so you can trace the full multi-agent execution

## Don't

- Don't default to multi-agent when a single agent with good tools can solve the problem -- added coordination cost is real
- Don't let agents communicate in unstructured free text -- it compounds errors across handoffs
- Don't create circular dependencies between agents without explicit loop-breaking conditions
- Don't ignore the token cost multiplier -- N agents each consuming context can be N times more expensive

## Case Study

**Microsoft**: Microsoft built AutoGen to power internal multi-agent workflows for code generation and data analysis. In production pilots, a three-agent setup (coder, critic, executor) reduced code review iteration cycles by 40% compared to single-agent generation. AutoGen's conversation-driven architecture became the reference implementation for enterprise multi-agent systems.

## Related Frameworks

- react-framework (complement)
- agent-communication-protocol (complement)
- agent-oriented-design-thinking (prerequisite)

## Source

https://sdframe.caldis.me/frameworks/multi-agent-orchestration-pattern
