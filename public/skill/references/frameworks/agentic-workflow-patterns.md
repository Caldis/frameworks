# Agentic Workflow Patterns / 智能体工作流模式

- **Category**: ai
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: experimental
- **Author**: Andrew Ng (2024 keynotes); Anthropic, OpenAI, and LangChain agent frameworks, 2023-03
- **Adopters**: Anthropic (Claude Code), OpenAI (Assistants API), Cognition (Devin), LangChain, Microsoft (AutoGen)

Plan-execute-reflect loops for autonomous agents

_用于自主智能体的规划-执行-反思循环_

## When to Use

Apply this framework when:
- Complex multi-step tasks that require dynamic planning and tool orchestration beyond a single prompt-response
- Coding agents that need to write, test, debug, and iterate on code autonomously
- Research and analysis workflows where the agent must search, synthesize, and verify information across sources
- Customer support automation where the agent must navigate multiple systems and decision trees

## When NOT to Use

Stop and reconsider if:
- Simple single-turn tasks (classification, summarization, translation) that don't benefit from multi-step planning
- Latency-critical applications where the overhead of plan-reflect loops is unacceptable
- Tasks with no verifiable intermediate outputs — reflection requires observable signals to be useful
- Environments where autonomous tool execution poses unacceptable security or compliance risks

## Core Concepts

- Plan Phase: The agent decomposes a high-level goal into an ordered sequence of actionable sub-tasks before executing anything
- Execute Phase: Each sub-task is carried out using tools, code execution, or API calls, producing observable intermediate results
- Reflect Phase: The agent evaluates execution outcomes against expectations, detecting errors and identifying necessary plan revisions
- Dynamic Replanning: Unlike static pipelines, agentic workflows can modify their plan mid-execution based on what they learn

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Agentic Workflow Patterns to?
- What constraints or existing architecture do you need to work within?
- Has your team used Agentic Workflow Patterns before? (This is an advanced framework)

## Implementation Steps

1. Decompose the user goal into a structured plan with discrete, verifiable sub-tasks
2. Execute each sub-task using appropriate tools, APIs, or code generation capabilities
3. After each execution step, reflect on the outcome: verify correctness, check for errors, and assess progress
4. Revise the plan dynamically based on reflection outputs — add, reorder, or drop sub-tasks as needed
5. Terminate when all success criteria are met or escalate to a human when confidence is below threshold

<details><summary>中文步骤</summary>

1. 将用户目标分解为包含离散可验证子任务的结构化计划
2. 使用合适的工具、API 或代码生成能力执行每个子任务
3. 每次执行后进行反思：验证正确性、检查错误并评估进展
4. 基于反思输出动态修订计划——根据需要添加、重排或删除子任务
5. 当所有成功标准满足时终止，或在置信度低于阈值时交由人类处理

</details>

## Do

- Build in explicit reflection steps that verify each sub-task's output before proceeding to the next
- Set hard limits on total iterations and token budget to prevent runaway agents that loop indefinitely
- Design clear success criteria and termination conditions so the agent knows when it has completed the task
- Log full plan-execute-reflect traces for debugging, evaluation, and continuous improvement of agent behavior

## Don't

- Don't let agents execute irreversible actions (delete, send, deploy) without human confirmation gates
- Don't skip the reflect phase to save tokens — unverified execution compounds errors across subsequent steps
- Don't use agentic workflows for simple tasks that a single prompt can handle — the overhead is not justified
- Don't hardcode plans — the value of agentic workflows lies in dynamic adaptation, not rigid step sequences

## Case Study

**Anthropic**: Anthropic's Claude Code implements the plan-execute-reflect pattern for autonomous software engineering tasks. When given a complex coding task, Claude Code decomposes it into sub-tasks (understand codebase, plan changes, implement, test, iterate), executes each step with tool use (file read/write, shell commands, search), and reflects on outcomes (checking test results, verifying correctness). This pattern enables Claude Code to handle multi-file refactors, bug fixes, and feature implementations that would require dozens of manual steps.

## Related Frameworks

- react-framework (complement)
- multi-agent-orchestration-pattern (complement)
- prompt-chaining (complement)
- tool-use-design-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/agentic-workflow-patterns
