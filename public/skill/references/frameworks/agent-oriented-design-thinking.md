# Agent-Oriented Design Thinking / 智能体导向设计思维

- **Category**: thinking
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Michael Wooldridge & Nicholas Jennings, 1995; extended by modern AI agent frameworks (LangChain, AutoGen, CrewAI), 2023
- **Adopters**: Microsoft (AutoGen, Copilot), Anthropic (Claude Agent SDK), OpenAI (Assistants API), Google DeepMind (Gemini Agents), LangChain, CrewAI

Design multi-agent systems around roles, goals, and environments

_围绕角色、目标与环境设计多智能体系统的思维框架_

## When to Use

Apply this framework when:
- When building a system where multiple AI components need to collaborate, delegate tasks, and share state to accomplish a complex goal
- When a single monolithic AI model can't handle the full scope of a task and decomposition into specialized agents improves quality
- When designing autonomous workflows (customer support, code generation, research) that require different AI capabilities at different stages
- When you need to add human checkpoints into an AI pipeline and must clearly define where agents hand off to humans and vice versa

## When NOT to Use

Stop and reconsider if:
- When a single AI model with good prompting can handle the entire task, because unnecessary agent decomposition adds latency and cost without improving quality
- When the task requires deterministic, reproducible outputs and agent autonomy introduces unacceptable variability
- When the budget for LLM API calls is constrained, because multi-agent systems multiply token usage across agent conversations
- When the team lacks experience operating AI systems in production and the debugging complexity of multi-agent systems would overwhelm them

## Core Concepts

- Agent Autonomy: Each agent has defined decision-making authority within its scope, acting on goals rather than following rigid scripts, enabling adaptive behavior
- Environment Modeling: Agents perceive and act within an environment (APIs, databases, tools, user interfaces) that must be explicitly modeled to define the agent's capabilities and constraints
- Inter-Agent Communication: Structured protocols (message passing, shared blackboards, pub/sub) for how agents share information, request help, and resolve conflicting goals
- Emergent Behavior Management: In multi-agent systems, individual agents following simple rules can produce unexpected system-level behavior that must be monitored, contained, and corrected

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Agent-Oriented Design Thinking to?
- What constraints or existing architecture do you need to work within?
- Has your team used Agent-Oriented Design Thinking before? (This is an advanced framework)

## Implementation Steps

1. **Define Agent Roles and Goals**: specify each agent's purpose, objectives, and the scope of its autonomous decision-making authority
2. **Model the Environment**: describe the state space agents perceive, including data sources, APIs, tools, and world state representations
3. **Design Agent Communication Protocols**: define how agents share observations, delegate tasks, negotiate, and resolve conflicts
4. **Plan for Emergent Behavior**: identify potential unintended interactions between agents and design containment or correction mechanisms
5. **Establish Evaluation Criteria**: define measurable success metrics for individual agent behavior and overall system outcomes

<details><summary>中文步骤</summary>

1. 定义智能体角色与目标：明确每个智能体的用途、目标以及其自主决策权的范围
2. 建模环境：描述智能体感知的状态空间，包括数据源、API、工具和世界状态表示
3. 设计智能体通信协议：定义智能体如何共享观察、委托任务、协商并解决冲突
4. 规划涌现行为：识别智能体间潜在的非预期交互，并设计遏制或修正机制
5. 建立评估标准：定义可量化的成功指标，覆盖个体智能体行为和整体系统结果

</details>

## Do

- Do define explicit boundaries for each agent's autonomy, because unbounded agents make unpredictable decisions that are difficult to debug or control
- Do design agent communication to be observable and loggable, because debugging multi-agent systems requires tracing the conversation between agents
- Do include kill switches and human escalation paths, because autonomous agents can enter loops or produce harmful outputs that need immediate interruption
- Do test multi-agent interactions with adversarial scenarios, because agents will encounter edge cases where their goals conflict or their environment provides unexpected inputs
- Do start with fewer agents and add complexity gradually, because premature decomposition into many agents creates coordination overhead that outweighs the benefits

## Don't

- Don't give agents more autonomy than the task requires, because excessive autonomy increases the blast radius of agent errors and makes the system harder to reason about
- Don't design agents without clear failure modes and fallback strategies, because in production, AI agents will encounter situations outside their training distribution
- Don't assume agents will cooperate perfectly, because misaligned goals, prompt injection, or unexpected inputs can cause agents to work at cross-purposes
- Don't build multi-agent systems when a single well-prompted agent would suffice, because multi-agent orchestration adds latency, cost, and debugging complexity

## Case Study

**Microsoft (AutoGen)**: Microsoft Research developed AutoGen as an open-source framework for building multi-agent LLM applications, applying agent-oriented design principles to real-world AI workflows. In internal deployments, Microsoft used AutoGen to create agent teams for complex coding tasks: a 'Coder' agent writes code, a 'Reviewer' agent critiques it, and a 'Executor' agent runs tests — mimicking a human development team. This multi-agent approach produced higher-quality code than single-agent generation because each agent's specialized role caught different categories of errors, reducing bugs by 25% compared to single-agent baselines in their benchmarks.

## Related Frameworks

- multi-agent-orchestration-pattern (complement)
- agent-communication-protocol (related)
- react-framework (related)

## Source

https://sdframe.caldis.me/frameworks/agent-oriented-design-thinking
