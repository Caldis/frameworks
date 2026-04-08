# Tool-Use Design Pattern / 工具使用设计模式

- **Category**: ai
- **Complexity**: intermediate
- **Quality**: reliability, usability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Timo Schick et al. (Meta AI), 2023; OpenAI Function Calling team, 2023, 2023-02
- **Adopters**: OpenAI, Anthropic (Claude / MCP), Google (Gemini Function Calling), LangChain, Vercel AI SDK

Design agent-callable tools with reliable interfaces

_为 AI 代理设计可靠可调用的工具接口_

## When to Use

Apply this framework when:
- Building agents that interact with external systems (databases, APIs, file systems, browsers)
- Tasks requiring capabilities the LLM doesn't have natively (math computation, code execution, web search)
- Production systems where tool invocations must be reliable, logged, and auditable
- Platforms exposing a growing catalog of capabilities to AI agents (plugin systems, MCP servers)

## When NOT to Use

Stop and reconsider if:
- Tasks the model can complete entirely from its training knowledge without external data
- When tool invocation adds latency that degrades the user experience for simple queries
- Environments where external API calls are blocked by network security policies
- Prototypes where hardcoded responses are sufficient and tool infrastructure is overhead

## Core Concepts

- Function Schema: A JSON Schema definition describing a tool's name, parameters, types, and purpose for the model to parse
- Tool Description: The natural-language explanation of when and why to use a tool, written from the model's perspective
- Idempotency: Designing tool handlers so repeated calls with the same parameters produce the same result without side effects
- Parallel Tool Calling: The ability for models to emit multiple tool calls in a single turn to reduce round-trips
- Model Context Protocol (MCP): An emerging standard for exposing tools to AI agents via a unified server interface

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Tool-Use Design Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define each tool as a typed function with a machine-readable JSON Schema description
2. Write tool descriptions from the model's perspective - emphasize when to use and not use
3. Implement idempotent tool handlers with deterministic error messages the model can act on
4. Add a tool-selection evaluation harness to measure call accuracy on representative queries
5. Version and deprecate tools explicitly, updating descriptions to guide migration

<details><summary>中文步骤</summary>

1. 将每个工具定义为带有机器可读 JSON Schema 描述的类型化函数
2. 从模型视角撰写工具描述——强调何时使用以及何时不应使用
3. 实现幂等的工具处理器，返回模型可据此行动的确定性错误信息
4. 构建工具选择评估框架，在代表性查询上度量调用准确率
5. 显式对工具进行版本管理和废弃标注，更新描述以引导迁移

</details>

## Do

- Write tool descriptions that include both when-to-use and when-NOT-to-use guidance for the model
- Return structured error messages that tell the model what went wrong and how to fix the call
- Keep the tool catalog focused -- fewer, well-described tools outperform many vaguely described ones
- Test tool selection accuracy separately from tool execution -- they are distinct failure modes

## Don't

- Don't use ambiguous parameter names like 'data' or 'input' -- use semantically clear names like 'search_query'
- Don't expose destructive operations (delete, overwrite) without confirmation mechanisms
- Don't return large unstructured blobs from tools -- the model wastes context parsing irrelevant output
- Don't assume the model will always call tools correctly -- validate parameters server-side

## Case Study

**OpenAI**: OpenAI's Function Calling API transformed how developers build tool-using agents. By standardizing the JSON Schema format for tool definitions, OpenAI enabled a plugin ecosystem where thousands of third-party tools could be exposed to GPT models. The ChatGPT plugin store (later replaced by GPTs) demonstrated that well-designed tool schemas could enable models to orchestrate complex workflows spanning search, computation, and external APIs.

## Related Frameworks

- react-framework (complement)
- ai-first-api-design (complement)
- tool-use-react-pattern (extends)

## Source

https://sdframe.caldis.me/frameworks/tool-use-design-pattern
