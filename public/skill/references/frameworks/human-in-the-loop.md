# Human-in-the-Loop Design / 人机协同回路设计

- **Category**: ai
- **Complexity**: intermediate
- **Quality**: reliability, security
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: DARPA / Weng et al., 2003 (concept); modern AI-HITL formalized by Monarch (Google), 2020
- **Adopters**: Scale AI, Google (Monarch), Waymo, Tesla, Amazon Mechanical Turk / SageMaker Ground Truth

Insert human checkpoints into automated AI workflows

_在自动化 AI 工作流中插入人工审核节点_

## When to Use

Apply this framework when:
- High-stakes decisions where AI errors carry legal, financial, or safety consequences
- Domains with evolving policies where automated rules alone cannot cover all edge cases
- Model training pipelines that benefit from expert-labeled corrections as feedback signals
- Regulated industries (healthcare, finance, legal) requiring auditable human oversight

## When NOT to Use

Stop and reconsider if:
- Fully autonomous real-time systems where human review latency is physically impossible (e.g., high-frequency trading)
- Low-risk, high-volume tasks where the cost of human review exceeds the cost of occasional errors
- Prototyping phases where rapid iteration matters more than production-grade oversight
- Tasks where model accuracy already exceeds human performance on the same task

## Core Concepts

- Confidence Threshold: A model-reported score below which outputs are routed to human review
- Escalation Path: The defined route from automated decision to human reviewer, including SLAs
- Active Learning: Strategically selecting the most uncertain samples for human labeling to maximize model improvement
- Override Rate: The percentage of AI decisions reversed by humans -- a key calibration metric
- Feedback Loop: The mechanism that converts human corrections into training data for model retraining

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Human-in-the-Loop Design to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Map the workflow and identify high-risk or high-uncertainty decision points
2. Define escalation criteria that trigger human review (confidence threshold, risk score)
3. Design low-friction review UIs that surface AI reasoning alongside the decision
4. Capture human feedback as labeled training signal for continuous model improvement
5. Instrument approval latency and human override rates to tune automation thresholds

<details><summary>中文步骤</summary>

1. 梳理工作流，识别高风险或高不确定性的决策节点
2. 定义触发人工审核的升级条件（置信度阈值、风险评分）
3. 设计低摩擦的审核界面，将 AI 推理过程与决策并排呈现
4. 将人工反馈作为标注训练信号用于持续模型优化
5. 监控审批延迟与人工覆盖率，动态调整自动化阈值

</details>

## Do

- Design review UIs that show the AI's reasoning and confidence, not just the final decision
- Track override rates over time -- a rising rate signals model degradation or policy drift
- Set SLAs for human review turnaround to prevent HITL from becoming a bottleneck
- Use human corrections as high-quality labels to continuously retrain and improve the model

## Don't

- Don't create review fatigue by sending too many low-risk items to humans -- it degrades review quality
- Don't skip the feedback loop -- human reviews that never improve the model are wasted effort
- Don't assume human reviewers are always correct -- build in inter-annotator agreement checks
- Don't make HITL an afterthought -- design it into the system architecture from the start

## Case Study

**Scale AI**: Scale AI built its core business around human-in-the-loop data labeling for AI training. Their platform routes ML model predictions through expert human reviewers who correct labels, creating a virtuous cycle where each correction improves the next model iteration. This approach powers autonomous vehicle training data for Waymo, Toyota, and GM Cruise with 99.5%+ label accuracy.

## Related Frameworks

- human-ai-interaction-design (complement)
- guardrails-framework (complement)
- responsible-ai-design (complement)

## Source

https://sdframe.caldis.me/frameworks/human-in-the-loop
