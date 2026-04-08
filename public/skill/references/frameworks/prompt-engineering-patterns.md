# Prompt Engineering Patterns / 提示工程模式

- **Category**: coding
- **Complexity**: beginner
- **Quality**: usability, reliability
- **Abstraction**: code
- **Maturity**: emerging
- **Author**: Jason Wei, Xuezhi Wang et al. (Google Brain), 2022, 2020
- **Adopters**: Notion, GitHub (Copilot), Anthropic, OpenAI, Vercel (v0)

Structured techniques for crafting effective LLM prompts

_构建高效大模型提示词的结构化技术模式集合_

## When to Use

Apply this framework when:
- Integrating LLMs into production applications that require consistent, high-quality outputs
- Building AI-powered features where output format and quality need to be controllable
- Reducing hallucination and improving factual accuracy in LLM-generated content
- Creating reusable prompt templates that can be versioned and shared across teams

## When NOT to Use

Stop and reconsider if:
- Tasks that require deterministic, reproducible results every time (use traditional algorithms instead)
- Safety-critical systems where LLM hallucination is an unacceptable risk
- Simple rule-based logic that is more reliably implemented with conventional code
- Applications where latency and cost of LLM inference are prohibitive

## Core Concepts

- System Prompt: instructions that set the AI's role, constraints, and behavioral guidelines before user interaction
- Few-Shot Learning: providing exemplar input-output pairs within the prompt to guide the model's response pattern
- Chain-of-Thought (CoT): instructing the model to show its reasoning steps before producing a final answer
- Structured Output: constraining the model to respond in a specific format (JSON, XML, markdown) for programmatic parsing
- Prompt Versioning: treating prompts as code artifacts with version control, testing, and iterative improvement

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Prompt Engineering Patterns to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the persona and context**: set a clear system prompt that establishes the AI's role, expertise level, and behavioral constraints
2. **Use structured output formats**: specify JSON schemas, markdown templates, or typed response formats to get parseable, consistent results
3. **Apply few-shot examples**: include 2-5 representative input-output examples that demonstrate the desired quality, style, and edge cases
4. **Add chain-of-thought instructions**: prompt the model to reason step-by-step before producing a final answer to improve accuracy on complex tasks
5. **Iterate and evaluate**: A/B test prompt variants against a golden dataset; track quality metrics and version prompts like code

<details><summary>中文步骤</summary>

1. 定义角色与上下文：设定清晰的系统提示词，建立AI的角色、专业水平和行为约束
2. 使用结构化输出格式：指定JSON Schema、Markdown模板或类型化响应格式以获得可解析、一致的结果
3. 应用少样本示例：包含2-5个代表性输入输出示例，展示期望的质量、风格和边界情况
4. 添加思维链指令：提示模型在给出最终答案前逐步推理，以提高复杂任务的准确性
5. 迭代与评估：对比测试提示词变体与黄金数据集；追踪质量指标，像管理代码一样管理提示词版本

</details>

## Do

- Do be explicit about output format and constraints because ambiguity leads to unpredictable responses
- Do provide few-shot examples for complex tasks because they dramatically improve output consistency
- Do use chain-of-thought for reasoning tasks because it reduces errors on multi-step problems
- Do version and test prompts systematically because small wording changes can cause large behavior shifts

## Don't

- Don't write vague prompts and expect the model to guess your intent because LLMs amplify ambiguity
- Don't include contradictory instructions because the model will inconsistently follow one or the other
- Don't skip evaluation because a prompt that works on one example may fail on edge cases
- Don't hardcode prompts in application code because they need to evolve independently of business logic

## Case Study

**Notion**: Notion's AI writing assistant uses sophisticated prompt engineering patterns to deliver context-aware writing suggestions. By combining system prompts that define the writing style, few-shot examples of high-quality rewrites, and structured output for formatting, Notion AI can generate, summarize, and translate content while maintaining the user's document context. This approach powered Notion AI's adoption by over 30 million users within its first year.

## Related Frameworks

- prompt-chaining (complement)
- tool-use-design-pattern (complement)
- llm-system-design-patterns (related)

## Source

https://sdframe.caldis.me/frameworks/prompt-engineering-patterns
