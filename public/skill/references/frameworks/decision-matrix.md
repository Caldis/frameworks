# Decision Matrix (Weighted Scoring) / 决策矩阵（加权评分法）

- **Category**: architecture
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: foundational
- **Author**: Stuart Pugh, 1991; adapted for software architecture by Bass, Clements, and Kazman
- **Adopters**: Capital One, ThoughtWorks, McKinsey, Accenture, Deloitte

Systematic trade-off evaluation method that scores architecture alternatives against weighted criteria to make objective, transparent decisions

_针对加权标准对架构备选方案进行评分的系统化权衡评估方法，以做出客观透明的决策_

## When to Use

Apply this framework when:
- When multiple architecture options exist and stakeholders need a transparent, objective comparison framework
- When subjective debates about technology choices are stalling decision-making progress
- When the decision involves many criteria with different levels of importance to different stakeholders
- When you need an auditable record of how and why a particular architecture was chosen

## When NOT to Use

Stop and reconsider if:
- When there are fewer than two viable alternatives, making a comparison matrix unnecessary overhead
- When the decision is time-critical and the overhead of formal evaluation outweighs the risk of a quick judgment
- When all options are roughly equivalent and the decision should be based on team preference or experimentation rather than analysis

## Core Concepts

- Criteria definition: Identifying the measurable dimensions against which architecture alternatives will be evaluated
- Weight assignment: Quantifying the relative importance of each criterion based on stakeholder priorities and business context
- Scoring consistency: Using a uniform rating scale and clear rubrics to ensure scores are comparable across evaluators
- Sensitivity analysis: Testing how changes in weights or scores affect the final ranking to identify fragile conclusions
- Decision transparency: Making the entire evaluation process visible and reproducible so stakeholders trust the outcome

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Decision Matrix (Weighted Scoring) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. List all candidate architecture alternatives and define the evaluation criteria (e.g., scalability, cost, team expertise, time-to-market)
2. Assign weights to each criterion based on business priorities, ensuring weights sum to 100% or a consistent scale
3. Score each alternative against every criterion using a consistent rating scale (e.g., 1-5 or 1-10)
4. Calculate weighted scores by multiplying each rating by its criterion weight and summing across all criteria per alternative
5. **Analyze the results**: review the rankings, perform sensitivity analysis on key weights, and document the decision rationale

<details><summary>中文步骤</summary>

1. 列出所有候选架构方案并定义评估标准（如可扩展性、成本、团队专业知识、上市时间）
2. 根据业务优先级为每个标准分配权重，确保权重总和为100%或一致的量表
3. 使用一致的评分量表（如1-5或1-10）为每个方案在每个标准上评分
4. 计算加权分数：将每个评分乘以其标准权重，并按方案汇总所有标准的分数
5. 分析结果：审查排名，对关键权重进行敏感性分析，并记录决策理由

</details>

## Do

- Do involve diverse stakeholders in weight assignment because individual bias skews the outcome toward one perspective
- Do perform sensitivity analysis on the top-weighted criteria because small weight changes can flip the final ranking
- Do document the rationale behind both weights and scores because the reasoning is as valuable as the numbers
- Do revisit the decision matrix when major requirements change because stale evaluations lead to suboptimal choices

## Don't

- Don't let one person assign all weights alone because it introduces unchecked bias into the evaluation
- Don't use the matrix to justify a predetermined conclusion because stakeholders will lose trust in the process
- Don't over-refine scores with false precision because the difference between a 7.2 and a 7.3 is meaningless noise
- Don't ignore qualitative factors that resist scoring because some critical considerations (team morale, organizational politics) are hard to quantify

## Case Study

**Capital One**: Capital One used a weighted decision matrix when evaluating its move from on-premise data centers to cloud infrastructure, comparing AWS, Azure, and Google Cloud across 12 criteria including cost, security compliance, developer tooling, managed services breadth, and talent availability. Each criterion was weighted by a cross-functional committee of architects, security officers, and business leaders. The matrix revealed that while Azure scored highest on enterprise integration, AWS dominated on managed services and talent pool. Sensitivity analysis showed the decision was robust across reasonable weight variations. The transparent process helped Capital One justify its AWS-first strategy to regulators and internal stakeholders.

## Related Frameworks

- atam (complement)
- trade-off-sliders (related)
- adr (related)

## Source

https://sdframe.caldis.me/frameworks/decision-matrix
