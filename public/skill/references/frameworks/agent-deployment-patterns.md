# Agent Deployment Patterns / Agent部署模式

- **Category**: deployment
- **Complexity**: advanced
- **Quality**: reliability, security
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Emerging from AI engineering community, ~2024; influenced by practices at Anthropic, OpenAI, Google DeepMind, and LangChain, 2023
- **Adopters**: Klarna, Anthropic, OpenAI, Replit, Cognition (Devin)

Patterns for reliably deploying autonomous AI agents in production

_在生产环境中可靠部署自主AI Agent的架构模式_

## When to Use

Apply this framework when:
- Deploying autonomous AI agents that make multi-step decisions with real-world tool access
- Production systems where agent failures can have financial, security, or reputational consequences
- Organizations needing to audit and trace every decision an agent makes for compliance
- Teams scaling from prototype agents to production-grade systems serving real users with SLOs

## When NOT to Use

Stop and reconsider if:
- Simple single-turn LLM interactions that don't involve multi-step reasoning or tool use
- Environments with no tolerance for non-deterministic behavior
- Internal prototypes or demos where production reliability and safety are not concerns
- Use cases where a traditional deterministic workflow engine is sufficient

## Core Concepts

- Execution Boundary: Define clear limits on what an agent can do -- tools, max steps, memory scope, and cost ceiling per invocation
- Human-in-the-Loop Checkpoints: Critical or irreversible actions require human approval before the agent proceeds
- Agent Observability: End-to-end tracing of the full reasoning chain -- each thought, tool call, tool response, retry, and final answer
- Kill Switch: The ability to instantly halt a running agent across all instances when anomalous behavior is detected
- Shadow Mode: Deploy new agent versions in parallel with production agents, comparing decisions without serving real users

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Agent Deployment Patterns to?
- What constraints or existing architecture do you need to work within?
- Has your team used Agent Deployment Patterns before? (This is an advanced framework)

## Implementation Steps

1. **Define the agent's execution boundary**: tools available, max steps, memory scope, and human-in-the-loop checkpoints
2. Containerize the agent runtime with pinned LLM versions and tool dependencies for reproducibility
3. **Implement guardrails**: input validation, output filtering, cost caps, and rate limiting per agent instance
4. **Deploy with observability**: trace multi-step reasoning chains, tool calls, retries, and final outputs end-to-end
5. Use staged rollout (shadow -> canary -> full) and maintain kill-switch capability to halt runaway agents

<details><summary>中文步骤</summary>

1. 定义Agent的执行边界：可用工具、最大步骤数、记忆范围及人工介入检查点
2. 将Agent运行时容器化，固定LLM版本和工具依赖以保障可复现性
3. 实施护栏机制：输入验证、输出过滤、成本上限及每个Agent实例的速率限制
4. 部署可观测性能力：端到端追踪多步推理链、工具调用、重试和最终输出
5. 采用分阶段发布（影子→金丝雀→全量），并保留可立即停止失控Agent的熔断开关

</details>

## Do

- Do set hard cost and step limits per agent invocation, because LLM-powered agents can enter infinite reasoning loops
- Do implement human-in-the-loop approval for irreversible actions, because autonomous agents will eventually make mistakes
- Do trace the full reasoning chain for every agent run, because debugging agent failures without traces is nearly impossible
- Do deploy new agent versions in shadow mode first to compare decisions against the current production version

## Don't

- Don't give agents unrestricted tool access in production, because prompt injection with broad permissions can cause catastrophic damage
- Don't deploy agents without a kill switch, because runaway agents can accumulate massive costs within minutes
- Don't skip evaluation on edge cases and adversarial inputs, because agents are more unpredictable than traditional software
- Don't treat agent deployments like stateless service deployments, because agents carry reasoning state across steps

## Case Study

**Klarna**: Klarna deployed an AI customer service agent powered by OpenAI that handles the equivalent of 700 full-time human agents, resolving two-thirds of customer support conversations in its first month of operation in 2024. They implemented strict execution boundaries, human escalation paths for complex cases, and comprehensive tracing of every conversation. The deployment followed a staged rollout: shadow mode for two months, then 5% of conversations, then gradual scaling to full production, with kill-switch capability active throughout.

## Related Frameworks

- agent-reliability-patterns (complement)
- llmops (complement)
- canary-deployment (complement)

## Source

https://sdframe.caldis.me/frameworks/agent-deployment-patterns
