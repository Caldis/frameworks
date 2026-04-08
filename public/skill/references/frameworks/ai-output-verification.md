# AI Output Verification / AI 输出验证

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: reliability, security
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Guardrails AI / NeMo Guardrails (NVIDIA), 2023, 2022
- **Adopters**: Microsoft, Google, Anthropic, Amazon, Salesforce

Multi-layer checks ensuring AI-generated content is trustworthy

_多层检查确保AI生成内容的可信度与正确性_

## When to Use

Apply this framework when:
- Production AI applications where incorrect outputs could cause financial, legal, or safety harm
- Customer-facing AI features where hallucinated content damages brand trust
- Regulated industries (healthcare, finance) where AI outputs must be auditable and verifiable
- RAG-based systems where generated answers must be traceable to source documents

## When NOT to Use

Stop and reconsider if:
- Creative writing or brainstorming use cases where factual grounding is not required
- Internal developer tools where the cost of occasional errors is low and human review is built in
- Prototype or demo environments where verification overhead is not justified

## Core Concepts

- Schema Validation: Structural verification ensuring AI output matches expected format, types, and required fields
- Factual Grounding: Cross-referencing generated claims against authoritative source documents to detect hallucinations
- Output Guardrails: Automated filters that block or modify outputs violating safety, policy, or quality rules
- PII Detection: Scanning generated content for personally identifiable information that should not be exposed
- Human-in-the-Loop: Routing a sample of outputs to human reviewers for quality assurance and model improvement

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying AI Output Verification to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Schema validation**: verify that AI output conforms to the expected structure (JSON schema, type checks, required fields)
2. **Factual grounding check**: cross-reference generated claims against retrieved source documents or knowledge bases
3. **Consistency verification**: compare the output against the input constraints and previously generated outputs for logical coherence
4. **Safety and policy filtering**: run the output through toxicity classifiers, PII detectors, and domain-specific policy rules
5. **Human spot-check sampling**: randomly route a percentage of outputs to human reviewers and use disagreements to improve automated checks

<details><summary>中文步骤</summary>

1. 模式验证：验证AI输出符合预期结构（JSON Schema、类型检查、必填字段）
2. 事实依据检查：将生成的声明与检索的源文档或知识库交叉参照
3. 一致性验证：将输出与输入约束和先前生成的输出进行对比，检查逻辑连贯性
4. 安全与策略过滤：通过毒性分类器、PII检测器和领域特定策略规则过滤输出
5. 人工抽查：随机将一定比例的输出路由给人工审阅者，利用分歧改进自动化检查

</details>

## Do

- Do implement verification as a pipeline with multiple independent layers because no single check catches everything
- Do ground-check factual claims against source documents because hallucinations are the top production risk for LLMs
- Do log all verification failures for analysis because patterns in failures drive systematic improvements
- Do include adversarial inputs in your test suite because users will probe boundaries in unexpected ways

## Don't

- Don't deploy AI features without output verification because unverified outputs will hallucinate in production
- Don't rely solely on the LLM to self-verify because models are poor judges of their own hallucinations
- Don't treat verification as a one-time setup because new failure modes emerge as usage patterns evolve
- Don't block all outputs on strict rules because overly aggressive filtering degrades user experience

## Case Study

**Bing Chat (Microsoft)**: After Microsoft launched Bing Chat (now Copilot) in early 2023, several high-profile hallucination incidents prompted them to build robust output verification layers. They implemented factual grounding checks against Bing search results, citation verification, and safety classifiers. These multi-layer checks significantly reduced hallucination rates and inappropriate responses in subsequent releases.

## Related Frameworks

- llm-evaluation-framework (complement)
- guardrails-framework (complement)
- prompt-testing (complement)

## Source

https://sdframe.caldis.me/frameworks/ai-output-verification
