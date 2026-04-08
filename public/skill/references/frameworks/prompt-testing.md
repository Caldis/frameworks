# Prompt Testing / 提示词测试

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: testability, reliability
- **Abstraction**: code
- **Maturity**: emerging
- **Author**: Promptfoo (Ian Webster), 2023, 2022
- **Adopters**: Shopify, Vercel, Notion, Stripe, GitHub Copilot

Automated regression testing for LLM prompt changes

_对大模型提示词变更进行自动化回归测试_

## When to Use

Apply this framework when:
- Teams iterating on prompts frequently and needing confidence that changes do not break existing behavior
- Production LLM applications where prompt regressions directly impact user experience
- Multi-prompt pipelines where changes to one prompt can cascade and affect downstream outputs
- Organizations building prompt engineering as a disciplined, measurable practice

## When NOT to Use

Stop and reconsider if:
- One-off prompt usage where the prompt is not maintained or reused over time
- Creative applications where output variability is desired and correctness is subjective
- Very early experimentation where prompts change so rapidly that maintaining tests is counterproductive

## Core Concepts

- Prompt Versioning: Tracking prompt text in version control like code to enable diff, review, and rollback
- Assertion Types: Multiple validation methods including exact match, regex, semantic similarity, and LLM-as-judge
- Regression Suite: A collection of test cases that must pass before any prompt change is deployed
- Quality Scores: Quantitative metrics tracking prompt performance over time across multiple dimensions
- A/B Evaluation: Comparing two prompt versions against the same test cases to measure relative improvement

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Prompt Testing to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Build a test suite**: create a collection of input-expected output pairs that cover normal cases, edge cases, and known failure modes
2. **Define assertions**: use exact match, contains, regex, semantic similarity, or LLM-as-judge to verify each output meets expectations
3. **Version prompts as code**: store prompts in version control alongside their test suites so every change is tracked and reviewable
4. **Run in CI**: execute prompt tests on every PR that modifies prompts; fail the build if quality scores drop below thresholds
5. **Track quality over time**: log evaluation scores per prompt version to detect gradual drift and enable data-driven prompt optimization

<details><summary>中文步骤</summary>

1. 构建测试套件：创建覆盖正常情况、边界情况和已知故障模式的输入-期望输出对集合
2. 定义断言：使用精确匹配、包含、正则、语义相似度或LLM作为裁判来验证每个输出是否符合预期
3. 将提示词作为代码版本化：将提示词及其测试套件存入版本控制，使每次变更可追踪和审查
4. 在CI中运行：对每个修改提示词的PR执行提示词测试；质量分数低于阈值时构建失败
5. 追踪质量趋势：记录每个提示词版本的评估分数以检测渐进漂移，实现数据驱动的提示词优化

</details>

## Do

- Do version prompts alongside their tests because untested prompt changes are the leading cause of LLM regressions
- Do use multiple assertion types because no single check captures all quality dimensions of LLM output
- Do include adversarial and edge case inputs because prompts often fail on inputs the author did not consider
- Do track scores over time because gradual drift is harder to notice than sudden regression

## Don't

- Don't change prompts in production without running regression tests because seemingly minor edits can cause major output changes
- Don't test only with ideal inputs because production users will provide messy, ambiguous, and adversarial inputs
- Don't ignore non-determinism because the same prompt can produce different outputs across runs
- Don't rely solely on exact match assertions because LLM outputs are naturally variable and semantically equivalent answers may differ in phrasing

## Case Study

**Shopify**: Shopify implemented prompt testing for their AI-powered product description generator that serves millions of merchants. After a prompt change inadvertently degraded output quality for non-English products, they built a comprehensive regression suite with 500+ test cases across 12 languages. This caught three subsequent regressions before they reached production, saving significant merchant-facing impact.

## Related Frameworks

- llm-evaluation-framework (complement)
- ai-output-verification (complement)
- prompt-engineering-patterns (complement)

## Source

https://sdframe.caldis.me/frameworks/prompt-testing
