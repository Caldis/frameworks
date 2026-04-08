# Human-AI Interaction Design (HAI) / 人机交互设计（AI时代）

- **Category**: thinking
- **Complexity**: advanced
- **Quality**: usability, reliability
- **Abstraction**: organization
- **Maturity**: emerging
- **Author**: Microsoft Research / Saleema Amershi et al., 2019, 1990
- **Adopters**: GitHub (Copilot), Google (Search AI Overviews, Gemini), Microsoft (Cortana, Copilot for M365), Apple (Siri, Apple Intelligence), Adobe (Firefly), Notion (Notion AI)

Design AI-augmented workflows balancing autonomy and control

_设计平衡自主性与控制权的AI增强型工作流程_

## When to Use

Apply this framework when:
- When building a product that uses AI/ML models and you need to design how users interact with AI-generated outputs
- When users report they don't trust the AI's suggestions or, conversely, when they blindly follow AI output without verification
- When designing AI-assisted workflows in high-stakes domains (healthcare, finance, legal) where human oversight is essential
- When transitioning a manual workflow to an AI-augmented one and you need to decide what stays human-controlled vs. what becomes automated

## When NOT to Use

Stop and reconsider if:
- When the system has no AI/ML component and interactions are purely deterministic, making AI-specific design patterns unnecessary
- When the AI operates entirely in the backend with no user-facing decisions or outputs that need trust calibration
- When building an internal tool for AI/ML engineers who already understand model limitations and don't need guided trust calibration
- When the AI model's accuracy is so high and consequences so low that the overhead of explainability and human review isn't justified

## Core Concepts

- Levels of Automation: A spectrum from full human control to full AI autonomy, with the optimal level depending on task risk, AI reliability, and user expertise
- Trust Calibration: Designing interactions so users develop appropriately calibrated trust — trusting AI when it's reliable and questioning it when it's uncertain
- Explainability by Design: Building explanations of AI reasoning into the interface as a first-class design element, not an afterthought
- Graceful Degradation: Ensuring the system remains useful and safe when the AI component fails, hallucinates, or encounters out-of-distribution inputs

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Human-AI Interaction Design (HAI) to?
- What constraints or existing architecture do you need to work within?
- Has your team used Human-AI Interaction Design (HAI) before? (This is an advanced framework)

## Implementation Steps

1. **Define the Human-AI Task Split**: identify which subtasks the AI handles autonomously, which require human oversight, and which are collaborative
2. **Design Explainability Touchpoints**: specify where and how the AI must surface its reasoning, confidence, and uncertainty to users
3. **Model Trust Calibration**: design mechanisms for users to build appropriate trust — neither over-relying on nor under-using AI output
4. **Handle AI Failure Modes**: design graceful degradation paths for hallucination, low-confidence output, and distribution shift scenarios
5. **Iterate with Human-in-the-Loop Feedback**: build feedback collection into the UX to continuously improve AI behavior from real usage

<details><summary>中文步骤</summary>

1. 定义人机任务分工：识别哪些子任务由AI自主处理、哪些需要人类监督、哪些是协作完成
2. 设计可解释性触点：规定AI在何处以何种方式向用户呈现其推理过程、置信度和不确定性
3. 建模信任校准：设计帮助用户建立适度信任的机制——既不过度依赖也不低估AI输出
4. 处理AI失效模式：为幻觉、低置信度输出和分布偏移场景设计优雅降级路径
5. 通过人在环路反馈迭代：将反馈收集内嵌于用户体验，从真实使用中持续改善AI行为

</details>

## Do

- Do show AI confidence levels when presenting suggestions, because users need calibration signals to know when to trust vs. verify AI output
- Do design clear 'escape hatches' that let users override or ignore AI suggestions easily, because user agency is essential for trust and for handling AI errors
- Do design for AI failure from day one, because AI systems will hallucinate, and users need to be able to recognize, report, and recover from incorrect outputs
- Do collect user feedback on AI outputs (thumbs up/down, corrections, overrides) and feed it back into model improvement, because real-world usage patterns are the best training signal
- Do communicate AI limitations transparently, because users who understand what the AI can and cannot do develop more appropriate usage patterns

## Don't

- Don't present AI output with the same visual authority as human-verified information, because users need visual cues to distinguish AI-generated content from established facts
- Don't automate high-stakes decisions without a human review step, because AI errors in critical domains (healthcare, finance) can cause irreversible harm
- Don't design AI interactions that anthropomorphize the system to the point of creating false trust, because users who believe they're talking to a sentient entity won't appropriately question outputs
- Don't ignore the cold-start problem, because new users have no calibration for the AI's reliability and need guided onboarding to build appropriate trust

## Case Study

**GitHub (Copilot)**: GitHub Copilot applied HAI principles to design an AI pair programming experience that developers would actually trust. Rather than autonomously writing code, Copilot presents suggestions as ghost text that developers explicitly accept, modify, or dismiss — maintaining human agency. The team designed confidence-calibrating interactions: suggestions appear inline (low friction for likely-correct completions) while more uncertain code blocks require explicit tab-acceptance. After launch, GitHub found that developers accepted about 30% of suggestions, indicating healthy trust calibration rather than blind acceptance.

## Related Frameworks

- human-in-the-loop (complement)
- ai-pair-programming (related)
- responsible-ai-design (related)

## Source

https://sdframe.caldis.me/frameworks/human-ai-interaction-design
