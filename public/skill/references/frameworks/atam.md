# Architecture Tradeoff Analysis Method (ATAM) / 架构权衡分析法

- **Category**: architecture
- **Complexity**: advanced
- **Quality**: reliability, performance
- **Abstraction**: system
- **Maturity**: established
- **Author**: Rick Kazman, Mark Klein, Paul Clements / SEI, 2000, 1998
- **Adopters**: NASA, Lockheed Martin, Philips Healthcare, Raytheon, Boeing

Structured method to evaluate architecture against quality goals

_系统评估架构对质量目标的结构化分析方法_

## When to Use

Apply this framework when:
- When evaluating a critical system architecture before committing to implementation
- When multiple quality attributes conflict and explicit trade-off analysis is needed
- When stakeholders need confidence that the architecture meets key business requirements
- When regulatory or safety-critical systems require documented architecture risk assessment

## When NOT to Use

Stop and reconsider if:
- Small projects where the cost of a full ATAM evaluation exceeds the project budget
- Early-stage startups where requirements change too rapidly for formal evaluation to remain relevant
- Systems with a single dominant quality attribute where trade-off analysis adds little value

## Core Concepts

- Utility tree: Hierarchical decomposition of quality attributes into prioritized, testable scenarios
- Sensitivity point: An architectural parameter where a small change significantly affects a quality attribute
- Trade-off point: An architectural decision that affects two or more quality attributes in opposing directions
- Risk and non-risk: Categorization of architectural decisions based on their potential for negative outcomes
- Architectural approach: A specific design strategy or pattern used to address quality requirements

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Architecture Tradeoff Analysis Method (ATAM) to?
- What constraints or existing architecture do you need to work within?
- Has your team used Architecture Tradeoff Analysis Method (ATAM) before? (This is an advanced framework)

## Implementation Steps

1. Present the ATAM process and collect business drivers, key architectural goals, and stakeholder concerns
2. Have the architect present the architecture using multiple views (module, runtime, deployment)
3. Identify architectural approaches and map them to quality attribute utility tree scenarios
4. Analyze each approach for sensitivity points, trade-off points, and risks vs. non-risks
5. Prioritize scenarios and risks, produce a findings report with sensitivity and trade-off point summaries

<details><summary>中文步骤</summary>

1. 介绍ATAM流程，收集业务驱动因素、关键架构目标和利益相关者关切
2. 由架构师使用多个视图（模块、运行时、部署）呈现架构
3. 识别架构方法，将其映射到质量属性效用树场景
4. 分析每种方法的敏感点、权衡点以及风险与非风险项
5. 对场景和风险进行优先级排序，生成包含敏感点和权衡点摘要的分析报告

</details>

## Do

- Do involve a broad set of stakeholders because hidden quality concerns surface only when diverse perspectives are present
- Do build the utility tree collaboratively because stakeholder buy-in on scenario priorities is critical
- Do schedule ATAM early in the lifecycle because it is most cost-effective before major implementation decisions are locked in
- Do document all identified risks even if they seem unlikely because they form a valuable risk registry

## Don't

- Don't skip stakeholder scenario brainstorming because the evaluation team cannot anticipate all quality concerns alone
- Don't treat ATAM as a pass/fail audit because its purpose is to surface risks and trade-offs, not to judge
- Don't run ATAM on an architecture that hasn't been documented because the method requires concrete views to analyze
- Don't rush the utility tree prioritization because incorrect priorities lead to analyzing the wrong scenarios

## Case Study

**NASA Jet Propulsion Laboratory**: NASA JPL used ATAM to evaluate the architecture of the Mars Rover ground control system before the Curiosity mission. The evaluation identified critical trade-offs between real-time telemetry processing performance and fault tolerance. By surfacing these risks early, JPL redesigned the data pipeline to support graceful degradation, which proved essential when communication delays exceeded expected parameters during landing.

## Related Frameworks

- qaw (prerequisite)
- trade-off-sliders (complement)
- adr (complement)

## Source

https://sdframe.caldis.me/frameworks/atam
