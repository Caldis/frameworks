# Agent Communication Protocol / 代理通信协议模式

- **Category**: ai
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: FIPA (Foundation for Intelligent Physical Agents), 1996; modern: Agent Protocol (e2b), 2023; Anthropic MCP, 2024
- **Adopters**: Anthropic (MCP), Google (A2A Protocol), e2b.dev (Agent Protocol), Microsoft (AutoGen), Fetch.ai

Standardize message contracts between autonomous AI agents

_标准化自主 AI 代理之间的消息契约_

## When to Use

Apply this framework when:
- Multi-agent systems where agents from different frameworks or vendors must interoperate
- Enterprise deployments where agent-to-agent communication needs auditability and reliability guarantees
- Marketplaces or ecosystems where third-party agents connect to a shared platform
- Systems requiring asynchronous, durable communication between long-running agents

## When NOT to Use

Stop and reconsider if:
- Single-agent systems with no need for inter-agent communication
- Tightly coupled agent pairs where direct function calls are simpler than message passing
- Rapid prototypes where protocol overhead slows down experimentation
- Homogeneous agent deployments where all agents share the same framework and internal communication suffices

## Core Concepts

- Message Envelope: A standardized wrapper containing sender, receiver, intent, payload, timestamp, and correlation ID
- Capability Registry: A shared directory where agents publish their available skills and the message schemas they accept
- Intent: A typed action descriptor (e.g., request, inform, propose, confirm) that classifies the purpose of a message
- Idempotency Key: A unique identifier ensuring that retried messages don't cause duplicate side effects
- Schema Versioning: A backward-compatible evolution strategy for message formats as agents are updated independently

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Agent Communication Protocol to?
- What constraints or existing architecture do you need to work within?
- Has your team used Agent Communication Protocol before? (This is an advanced framework)

## Implementation Steps

1. **Define a canonical message envelope**: sender, receiver, intent, payload, correlation ID
2. Adopt or implement a shared registry where agents advertise their capabilities and schemas
3. Use async message queues for decoupled agent communication to avoid tight coupling
4. Implement acknowledgment and retry semantics with idempotency keys for reliability
5. Version all message schemas and enforce backward-compatibility rules as agents evolve

<details><summary>中文步骤</summary>

1. 定义规范消息信封：发送方、接收方、意图、载荷、关联 ID
2. 采用或实现共享注册中心，供代理广播自身能力和消息模式
3. 使用异步消息队列进行松耦合的代理通信，避免强依赖
4. 实现带有幂等键的确认与重试语义以保障可靠性
5. 对所有消息模式进行版本管理，并在代理演进时强制向后兼容

</details>

## Do

- Use correlation IDs to trace request-response chains across multi-agent conversations
- Design messages as immutable events -- append-only logs make debugging and replay easy
- Implement schema validation at both sender and receiver to catch contract violations early
- Plan for backward compatibility from day one -- agents will be updated at different times

## Don't

- Don't rely on natural language for inter-agent messaging -- use structured schemas to prevent misinterpretation
- Don't assume all agents are online simultaneously -- design for async communication with message persistence
- Don't create custom protocols when an established standard (MCP, Agent Protocol, A2A) fits your use case
- Don't skip authentication between agents -- unauthorized agent communication is a security risk

## Case Study

**Anthropic**: Anthropic's Model Context Protocol (MCP) standardized how AI agents communicate with tool servers, creating a universal interface that replaced fragmented custom integrations. Within months of release, MCP was adopted by Cursor, Windsurf, Replit, and dozens of other developer tools. The protocol's simple JSON-RPC-based design and capability negotiation mechanism enabled any tool to be exposed to any MCP-compatible agent without custom glue code.

## Related Frameworks

- multi-agent-orchestration-pattern (complement)
- actor-model (complement)
- eda (complement)

## Source

https://sdframe.caldis.me/frameworks/agent-communication-protocol
