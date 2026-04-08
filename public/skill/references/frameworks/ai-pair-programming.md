# AI Pair Programming Model / AI 结对编程模型

- **Category**: ai
- **Complexity**: beginner
- **Quality**: maintainability, usability
- **Abstraction**: code
- **Maturity**: emerging
- **Author**: GitHub (Oege de Moor et al.), 2021, 2021-06
- **Adopters**: GitHub (Copilot), Anthropic (Claude Code), Cursor, Google (Gemini Code Assist), Amazon (CodeWhisperer / Q Developer)

Structure developer and AI collaboration in the coding loop

_在编码循环中结构化人类开发者与 AI 的协作方式_

## When to Use

Apply this framework when:
- Day-to-day coding tasks including boilerplate generation, test writing, and refactoring
- Onboarding to unfamiliar codebases where the AI can explain patterns and suggest idioms
- Prototyping and rapid iteration where speed of code generation matters more than perfection
- Learning new languages or frameworks by generating examples and explaining alternatives

## When NOT to Use

Stop and reconsider if:
- Highly regulated codebases with strict IP provenance requirements that prohibit AI-generated code
- Security-sensitive cryptographic implementations where subtle AI errors could be catastrophic
- When the developer lacks sufficient understanding to review AI output critically
- Codebases with proprietary patterns so unique that generic AI models consistently produce incorrect suggestions

## Core Concepts

- Intent-First Prompting: Describing the goal and constraints before requesting code to guide generation quality
- Ghost Text: Inline AI suggestions that appear as the developer types, requiring accept/reject decisions
- Chat-Driven Development: Using a conversational AI sidebar to discuss, plan, and generate code interactively
- Agentic Coding: AI autonomously executing multi-step coding tasks (edit, test, fix) with human approval gates
- Skill Calibration: Regularly assessing which tasks the AI handles well vs. where human expertise is still critical

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying AI Pair Programming Model to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Establish role division**: human owns intent and review; AI owns synthesis and drafting
2. Use intent-first prompting - describe what, why, and constraints before asking for code
3. Review AI output for correctness, security, and style before accepting each chunk
4. Feed failing tests or error messages back to the AI as grounding for refinement
5. **Reflect at session end**: categorize AI contributions and identify skill gaps to address

<details><summary>中文步骤</summary>

1. 明确角色分工：人类负责意图与审查，AI 负责合成与起草
2. 使用意图优先提示——在请求代码前先描述目标、原因和约束
3. 在接受每段代码前审查 AI 输出的正确性、安全性和风格
4. 将失败测试或错误信息反馈给 AI 作为细化的依据
5. 在会话结束时复盘：归类 AI 贡献并识别需补足的技能差距

</details>

## Do

- Always review AI-generated code for security vulnerabilities -- AI can confidently produce insecure patterns
- Provide full context (file imports, types, test expectations) to get higher-quality suggestions
- Use AI for tedious tasks (boilerplate, tests, docs) and reserve your cognitive energy for architecture decisions
- Treat AI output as a first draft -- iterate and refine rather than accepting blindly

## Don't

- Don't accept AI code without understanding it -- you own the code quality and technical debt
- Don't rely on AI for security-critical code paths without independent review and testing
- Don't stop learning fundamentals because the AI can generate code -- understanding trumps generation
- Don't paste secrets or credentials into AI prompts -- they may be logged or used in training

## Case Study

**GitHub**: GitHub reported that Copilot users accepted approximately 30% of AI code suggestions and completed tasks 55% faster in controlled studies. By 2024, over 1.8 million paying developers and 77,000 organizations used Copilot, making it the fastest-adopted developer tool in history. The key insight was that autocomplete-style ghost text minimized workflow disruption.

## Related Frameworks

- human-ai-interaction-design (complement)
- ai-assisted-refactoring (complement)
- conventional-comments (complement)

## Source

https://sdframe.caldis.me/frameworks/ai-pair-programming
