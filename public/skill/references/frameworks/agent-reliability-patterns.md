# Agent Reliability Patterns / 智能体可靠性模式

- **Category**: quality
- **Complexity**: advanced
- **Quality**: reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Anthropic / LangChain / OpenAI, 2023, 2022
- **Adopters**: Anthropic, OpenAI, Google DeepMind, LangChain, Replit

Patterns ensuring AI agents behave predictably in production

_确保AI智能体在生产环境中行为可预测的模式集合_

## When to Use

Apply this framework when:
- Deploying autonomous AI agents that perform multi-step tasks with real-world side effects
- Building agent systems that interact with external APIs, databases, or file systems
- Production environments where agent failures must be contained and recovered from gracefully
- Cost-sensitive deployments where runaway agent loops can generate massive API bills

## When NOT to Use

Stop and reconsider if:
- Simple single-turn LLM calls that do not involve tool use or multi-step reasoning
- Fully supervised human-in-the-loop workflows where every agent action requires approval
- Offline batch inference where failures can be retried without real-time reliability concerns

## Core Concepts

- Bounded Execution: Hard limits on step count, time, and token usage to prevent infinite agent loops
- Checkpointing: Persisting agent state at decision points to enable resume-from-failure without restarting
- Idempotent Tool Calls: Designing tools so that retrying the same call produces the same result without duplicate side effects
- Deterministic Fallbacks: Pre-defined simpler strategies activated when the primary agent path fails
- Loop Detection: Monitoring for repetitive agent behaviors that indicate the agent is stuck in an unproductive cycle

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Agent Reliability Patterns to?
- What constraints or existing architecture do you need to work within?
- Has your team used Agent Reliability Patterns before? (This is an advanced framework)

## Implementation Steps

1. **Implement bounded execution**: set max step limits, wall-clock timeouts, and token budgets to prevent runaway agent loops
2. **Add checkpoint and resume**: persist agent state at key decision points so failed runs can be retried from the last checkpoint
3. **Design deterministic fallbacks**: when an agent step fails or times out, fall back to a simpler strategy or escalate to a human
4. **Use idempotent tool calls**: ensure all tools the agent invokes can be safely retried, with deduplication keys preventing duplicate side effects
5. **Monitor agent behavior**: track step counts, tool call success rates, loop detection, and cost per task to identify reliability regressions

<details><summary>中文步骤</summary>

1. 实现有界执行：设置最大步数限制、挂钟超时和Token预算以防止智能体失控循环
2. 添加检查点与恢复：在关键决策点持久化智能体状态，使失败的运行可从最后检查点重试
3. 设计确定性降级：当智能体步骤失败或超时时，降级到更简单的策略或升级给人类处理
4. 使用幂等工具调用：确保智能体调用的所有工具可安全重试，用去重键防止重复副作用
5. 监控智能体行为：追踪步数、工具调用成功率、循环检测和每任务成本以识别可靠性回归

</details>

## Do

- Do set hard budget limits (steps, tokens, time) because unconstrained agents will eventually enter infinite loops
- Do make all tool calls idempotent because agent retries are inevitable and must not cause duplicate actions
- Do implement human escalation paths because agents will encounter situations beyond their reliable capability
- Do log every agent decision and tool call because debugging agent failures requires full execution traces

## Don't

- Don't give agents unlimited tool access because broad permissions amplify the impact of agent errors
- Don't skip loop detection because a stuck agent wastes resources and may cause unintended side effects
- Don't deploy agents without monitoring because silent failures accumulate cost and erode user trust
- Don't assume agent behavior is deterministic because LLM-based agents can take different paths on identical inputs

## Case Study

**Anthropic**: Anthropic developed agent reliability patterns while building Claude's tool-use capabilities, discovering that bounded execution and checkpointing were essential after observing agents entering loops during complex multi-step tasks. Their internal agent framework enforces token budgets, implements retry-with-backoff for tool calls, and includes automatic human escalation when confidence drops below thresholds.

## Related Frameworks

- circuit-breaker-pattern (extends)
- agent-deployment-patterns (complement)
- chaos-engineering (complement)

## Source

https://sdframe.caldis.me/frameworks/agent-reliability-patterns
