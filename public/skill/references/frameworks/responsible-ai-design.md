# Responsible AI Design Framework / 负责任 AI 设计框架

- **Category**: ai
- **Complexity**: advanced
- **Quality**: security, reliability
- **Abstraction**: organization
- **Maturity**: emerging
- **Author**: Microsoft (Responsible AI Standard, 2022); Google (AI Principles, 2018); EU AI Act (2024), 2018-06
- **Adopters**: Microsoft, Google, Anthropic, Meta AI, IBM (AI Fairness 360)

Embed fairness, safety, and accountability in AI systems

_在 AI 系统中内嵌公平性、安全性与问责机制_

## When to Use

Apply this framework when:
- AI systems making decisions that affect people's lives (hiring, lending, healthcare, criminal justice)
- Products deployed in regulated markets subject to the EU AI Act or similar legislation
- Consumer-facing AI features where bias or unfair treatment could cause reputational and legal harm
- Any AI system operating at scale where undetected bias compounds into systemic discrimination

## When NOT to Use

Stop and reconsider if:
- Internal research experiments with no deployment path or user-facing impact
- Purely creative AI applications with no decision-making authority over people
- When the overhead of formal assessments would prevent timely response to urgent needs (apply a lighter process instead)
- Systems operating in domains with no disparate impact risk and no regulated data

## Core Concepts

- Model Card: A standardized document describing a model's intended use, performance metrics, limitations, and ethical considerations
- Fairness Metric: A quantitative measure (e.g., demographic parity, equalized odds) that evaluates whether a model treats different groups equitably
- Red Teaming: Adversarial testing by dedicated teams that try to elicit harmful, biased, or policy-violating outputs from the model
- AI Impact Assessment: A structured review of potential harms covering bias, privacy, safety, and misuse before deployment
- Constitutional AI: Anthropic's approach where AI systems are trained to follow a set of principles (a constitution) for safe and helpful behavior

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Responsible AI Design Framework to?
- What constraints or existing architecture do you need to work within?
- Has your team used Responsible AI Design Framework before? (This is an advanced framework)

## Implementation Steps

1. Conduct an AI impact assessment covering bias, privacy, autonomy, and misuse vectors
2. Define measurable fairness metrics and test across demographic and use-case slices
3. **Implement transparency features**: model cards, decision explanations, confidence scores
4. Establish an accountability chain mapping each AI decision to a responsible human owner
5. Run red-team adversarial exercises and publish a responsible-use policy for the system

<details><summary>中文步骤</summary>

1. 开展 AI 影响评估，覆盖偏见、隐私、自主性和滥用向量
2. 定义可量化的公平性指标，在人群和用例切片上进行测试
3. 实现透明度特性：模型卡、决策解释、置信度分数
4. 建立问责链，将每项 AI 决策映射到负责任的人类负责人
5. 开展红队对抗演练，并发布系统的负责任使用政策

</details>

## Do

- Conduct fairness audits across demographic slices before deployment, not after incidents occur
- Publish model cards and system documentation that honestly describe limitations and known failure modes
- Involve diverse stakeholders (legal, ethics, affected communities) in AI impact assessments
- Build mechanisms for affected individuals to contest AI decisions and receive human review

## Don't

- Don't treat responsible AI as a checkbox exercise -- embed it into the development lifecycle, not just the launch review
- Don't assume fairness on aggregate metrics alone -- disaggregate and test across all relevant subgroups
- Don't publish AI principles without enforcement mechanisms -- principles without accountability are performative
- Don't delay responsible AI practices until scale -- biases baked in early are hardest to fix later

## Case Study

**Microsoft**: Microsoft's Responsible AI Standard v2 requires every AI product team to complete an impact assessment, fairness evaluation, and transparency documentation before launch. After the Tay chatbot incident in 2016, Microsoft established an Office of Responsible AI and an AI Ethics & Effects in Engineering and Research (Aether) committee. This framework now governs AI features across Azure, Microsoft 365, and Bing, and has been publicly shared to influence industry practices.

## Related Frameworks

- guardrails-framework (complement)
- human-in-the-loop (complement)
- human-ai-interaction-design (complement)

## Source

https://sdframe.caldis.me/frameworks/responsible-ai-design
