# Model Context Protocol (MCP) / 模型上下文协议（MCP）

- **Category**: ai
- **Complexity**: intermediate
- **Quality**: usability, maintainability
- **Abstraction**: component
- **Maturity**: experimental
- **Author**: Anthropic, 2024, 2024-11
- **Adopters**: Anthropic, Cursor, Sourcegraph, Replit, Zed

Standardized tool integration for LLMs (Anthropic, 2024)

_大模型标准化工具集成协议（Anthropic，2024）_

## When to Use

Apply this framework when:
- Building LLM applications that need to integrate with external tools, databases, and APIs in a standardized way
- Organizations wanting to create reusable tool packages that work across different LLM providers and frameworks
- Agent systems that require dynamic tool discovery and composition at runtime
- Enterprise environments needing a governance layer (auth, audit, rate limiting) between LLMs and external systems

## When NOT to Use

Stop and reconsider if:
- Simple applications with a single, well-defined tool integration that doesn't benefit from protocol abstraction
- Environments where all tool access is internal and a direct function call is simpler than a protocol layer
- Prototypes where the overhead of setting up MCP servers slows down experimentation
- Systems with strict network isolation requirements where running additional server processes is not permitted

## Core Concepts

- MCP Server: A lightweight service that exposes tools, resources, and prompts through a standardized JSON-RPC protocol
- MCP Client: The LLM host application that discovers, connects to, and invokes tools on MCP servers on behalf of the model
- Tools: Executable functions with typed input/output schemas that the LLM can invoke to perform actions in external systems
- Resources: Read-only data sources (files, database queries, API responses) that provide context to the LLM without side effects

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Model Context Protocol (MCP) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define MCP servers that expose tools, resources, and prompts through a standardized JSON-RPC interface
2. Configure the MCP client (LLM host application) to discover and connect to available MCP servers
3. The LLM selects and invokes tools via the MCP protocol, passing structured arguments and receiving typed responses
4. Implement authentication, rate limiting, and access control at the MCP server level for production safety
5. Compose multiple MCP servers to give the LLM access to a rich, extensible ecosystem of tools and data sources

<details><summary>中文步骤</summary>

1. 定义通过标准化 JSON-RPC 接口暴露工具、资源和提示的 MCP 服务器
2. 配置 MCP 客户端（大模型宿主应用）以发现和连接可用的 MCP 服务器
3. 大模型通过 MCP 协议选择和调用工具，传递结构化参数并接收类型化响应
4. 在 MCP 服务器层面实现认证、速率限制和访问控制以确保生产安全
5. 组合多个 MCP 服务器，为大模型提供丰富可扩展的工具和数据源生态系统

</details>

## Do

- Design MCP servers with single-responsibility — one server per domain (GitHub, database, email) for clean composition
- Include comprehensive tool descriptions and parameter documentation so the LLM can select and use tools accurately
- Implement proper error handling and typed responses in MCP servers to help the LLM recover gracefully from failures
- Use MCP's resource primitive for read-only data to clearly separate safe reads from potentially dangerous tool actions

## Don't

- Don't expose destructive operations (delete, overwrite) without requiring explicit user confirmation at the client level
- Don't bundle too many unrelated tools into a single MCP server — it reduces the LLM's tool selection accuracy
- Don't skip authentication and access control in production MCP servers — unauthenticated tool access is a security risk
- Don't assume the LLM will always use tools correctly — validate inputs server-side and return clear error messages

## Case Study

**Anthropic**: Anthropic developed MCP to solve the N-by-M integration problem between LLM applications and external tools. Before MCP, every LLM app had to build custom integrations for each tool. With MCP, Anthropic's Claude Desktop and Claude Code can connect to any MCP server, giving users instant access to GitHub, databases, file systems, and more through a single protocol. The open-source specification attracted contributions from hundreds of developers within weeks of launch, creating the fastest-growing tool integration ecosystem in AI.

## Related Frameworks

- tool-use-design-pattern (extends)
- react-framework (complement)
- agentic-workflow-patterns (complement)
- agent-communication-protocol (complement)

## Source

https://sdframe.caldis.me/frameworks/model-context-protocol-mcp
