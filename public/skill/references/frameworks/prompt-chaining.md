# Prompt Chaining Pattern / 提示词链模式

- **Category**: ai
- **Complexity**: beginner
- **Quality**: reliability, maintainability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Harrison Chase (LangChain) / Wu Tongshuang et al., 2022, 2022-04
- **Adopters**: Anthropic, LangChain, DSPy (Stanford), OpenAI, Dust.tt

Decompose complex tasks into sequential prompt stages

_将复杂任务分解为顺序执行的提示词阶段_

## When to Use

Apply this framework when:
- Complex generation tasks that benefit from separation into planning, drafting, and refinement stages
- Structured extraction pipelines where each stage narrows or enriches the data
- Content workflows (translate, summarize, then format) where each step has clear quality gates
- Any task where a single prompt fails to produce reliable output due to complexity

## When NOT to Use

Stop and reconsider if:
- Simple single-turn tasks (classification, short extraction) where one prompt suffices
- Ultra-low-latency requirements where sequential LLM calls are too slow
- Exploratory or creative tasks where rigid stage boundaries constrain the model's output
- When the token cost of multiple calls significantly exceeds budget for the use case

## Core Concepts

- Stage: A single prompt call with a defined input schema and output schema
- Gate: A validation check between stages that decides whether to proceed, retry, or abort
- Schema Contract: The typed interface between stages ensuring one stage's output matches the next stage's expected input
- Chain Debugging: The practice of logging every stage's I/O to isolate where quality degrades
- Prompt Regression Testing: Running a fixed set of inputs through the chain to detect quality changes after prompt edits

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Prompt Chaining Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Break the end-to-end task into discrete, independently testable prompt stages
2. Define the output schema of each stage as the typed input of the next
3. Validate and sanitize intermediate outputs before passing them downstream
4. Add a gating step that checks quality criteria before continuing the chain
5. Log each stage's input/output pair for debugging and prompt regression testing

<details><summary>中文步骤</summary>

1. 将端到端任务拆分为独立可测试的离散提示词阶段
2. 将每个阶段的输出模式定义为下一阶段的类型化输入
3. 在传递给下游前对中间输出进行验证和清洗
4. 添加质量门控步骤，满足标准后再继续执行链路
5. 记录每个阶段的输入输出对，用于调试与提示词回归测试

</details>

## Do

- Keep each stage focused on a single transformation -- one stage, one job
- Define typed output schemas (JSON Schema or Pydantic) for every stage to catch format errors early
- Add retry logic with backoff at each stage rather than restarting the entire chain on failure
- Test each stage independently before assembling the full chain

## Don't

- Don't chain more than 5-7 stages -- longer chains accumulate errors and latency exponentially
- Don't pass raw unvalidated output between stages -- one bad stage poisons the entire downstream
- Don't ignore intermediate results -- they're your best debugging tool when the final output is wrong
- Don't over-engineer chains for tasks a single well-crafted prompt can handle

## Case Study

**Anthropic**: Anthropic's internal content moderation pipeline uses a three-stage prompt chain: Stage 1 classifies content risk, Stage 2 extracts specific policy violations with citations, and Stage 3 generates a human-readable review summary. This chained approach improved classification accuracy by 15% over single-prompt methods and made the moderation reasoning auditable end-to-end.

## Related Frameworks

- react-framework (complement)
- prompt-engineering-patterns (complement)
- guardrails-framework (complement)

## Source

https://sdframe.caldis.me/frameworks/prompt-chaining
