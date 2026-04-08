# Tool-Use / ReAct Pattern / 工具使用 / ReAct 模式

- **Category**: coding
- **Complexity**: advanced
- **Quality**: reliability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Shunyu Yao, Jeffrey Zhao et al. (Princeton/Google Brain), 2022
- **Adopters**: Anthropic (Claude Code), OpenAI (ChatGPT Plugins), Google (Gemini), LangChain, Microsoft (Copilot)

Enable LLM agents to call external tools in reasoning loops

_使大模型代理能在推理循环中调用外部工具_

## When to Use

Apply this framework when:
- Building AI agents that need to interact with external APIs, databases, or file systems
- Tasks that require combining LLM reasoning with real-time data retrieval
- Complex multi-step workflows where the next action depends on previous tool outputs
- Building coding assistants that need to read, write, and execute code

## When NOT to Use

Stop and reconsider if:
- Simple question-answering tasks where the LLM's parametric knowledge is sufficient
- Latency-critical applications where multiple tool-call round trips are too slow
- Tasks with a fixed, known sequence of steps where a traditional pipeline is more reliable
- Environments where tool execution costs (API calls, compute) are prohibitively expensive

## Core Concepts

- Reasoning Trace: the LLM's explicit thought process about which tool to use and why, visible as intermediate text
- Action: a structured tool call with a specific function name and typed arguments
- Observation: the result returned from a tool execution that feeds back into the next reasoning step
- Tool Schema: a JSON Schema definition of each tool's name, description, parameters, and return type
- Grounding: using tool outputs to anchor LLM responses in real data, reducing hallucination

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Tool-Use / ReAct Pattern to?
- What constraints or existing architecture do you need to work within?
- Has your team used Tool-Use / ReAct Pattern before? (This is an advanced framework)

## Implementation Steps

1. **Define the tool inventory**: catalog each available tool with a typed JSON Schema signature, description, and usage examples
2. **Implement the reasoning loop**: prompt the LLM to think about which tool to call, execute the call, observe the result, and decide next steps
3. **Build robust tool handlers**: make each tool idempotent, return structured responses with clear error messages, and enforce timeouts
4. **Add selection guardrails**: constrain which tools are available per context and validate tool-call arguments before execution
5. **Evaluate tool-use accuracy**: build a benchmark of representative tasks and measure tool selection precision, recall, and end-to-end task success

<details><summary>中文步骤</summary>

1. 定义工具清单：编目每个可用工具及其类型化JSON Schema签名、描述和使用示例
2. 实现推理循环：提示LLM思考调用哪个工具，执行调用，观察结果，并决定下一步
3. 构建健壮的工具处理器：使每个工具幂等，返回结构化响应和清晰的错误信息，并强制执行超时
4. 添加选择护栏：限制每个上下文可用的工具，在执行前验证工具调用参数
5. 评估工具使用准确率：构建代表性任务基准，度量工具选择的精确率、召回率和端到端任务成功率

</details>

## Do

- Do define tool schemas precisely because vague descriptions lead to incorrect tool selection
- Do make tools idempotent because the LLM may retry a tool call if the observation is unclear
- Do limit the number of available tools per context because too many options confuse the model
- Do log the full reasoning trace because it is essential for debugging and improving agent behavior

## Don't

- Don't give tools unrestricted access to sensitive systems because the LLM may call them unexpectedly
- Don't skip argument validation before tool execution because malformed inputs cause silent failures
- Don't let the reasoning loop run indefinitely because infinite loops waste tokens and time — set a max iteration limit
- Don't hardcode tool sequences because the power of ReAct is dynamic tool selection based on observations

## Case Study

**Anthropic**: Anthropic's Claude Code is a production implementation of the ReAct pattern. The agent reasons about which tool to use (file read, code search, bash execution, file edit), executes the tool, observes the result, and decides whether to continue or respond. This reasoning loop allows Claude Code to handle complex multi-file refactoring tasks, debug failing tests, and build features across entire codebases — all through iterative tool use grounded in real code observations.

## Related Frameworks

- react-framework (extends)
- prompt-engineering-patterns (complement)
- prompt-chaining (complement)

## Source

https://sdframe.caldis.me/frameworks/tool-use-react-pattern
