# Quality Attribute Workshop (QAW) / 质量属性工作坊

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: reliability, usability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Mario Barbacci, Robert Ellison, et al. / SEI, 2003, 2000
- **Adopters**: Philips Healthcare, Lockheed Martin, Bosch, Siemens, US Department of Veterans Affairs

Elicit and prioritize quality attribute requirements collaboratively

_协作式挖掘并优先排序质量属性需求_

## When to Use

Apply this framework when:
- When starting a new project and quality requirements are unclear or unstated
- When stakeholders have conflicting views on which quality attributes matter most
- When feeding scenarios into an ATAM evaluation session
- When transitioning from functional requirements to non-functional architecture design

## When NOT to Use

Stop and reconsider if:
- Projects where quality requirements are already well-defined through existing SLAs and compliance frameworks
- Very small teams where informal conversation achieves the same quality requirement alignment
- Rapid prototyping phases where quality attributes will be revisited once the concept is validated

## Core Concepts

- Quality attribute scenario: A structured description with stimulus, environment, response, and measurable response measure
- Utility tree: A hierarchical grouping of quality attributes into categories with prioritized leaf scenarios
- Stakeholder brainstorming: Open elicitation where diverse perspectives surface hidden quality concerns
- Scenario prioritization: Voting or ranking to identify the most architecturally significant scenarios
- Quality attribute categories: Performance, availability, security, modifiability, usability, and others from the SEI taxonomy

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Quality Attribute Workshop (QAW) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify and invite key stakeholders representing business, operations, security, and development perspectives
2. Present the system mission and business context; allow stakeholders to brainstorm quality attribute concerns freely
3. Structure concerns into quality attribute scenarios using the SEI scenario template (stimulus, environment, response, measure)
4. Prioritize scenarios using voting or weighted ranking; group into utility tree categories (performance, security, etc.)
5. Produce a ranked Quality Attribute Scenario backlog to drive architecture decisions and evaluation sessions

<details><summary>中文步骤</summary>

1. 识别并邀请代表业务、运营、安全和开发视角的关键利益相关者
2. 介绍系统使命和业务背景；允许利益相关者自由头脑风暴质量属性关切
3. 使用SEI场景模板（刺激、环境、响应、度量）将关切结构化为质量属性场景
4. 使用投票或加权排名对场景进行优先级排序；按效用树分类（性能、安全等）
5. 生成有优先级的质量属性场景待办列表，用于驱动架构决策和评估会议

</details>

## Do

- Do invite stakeholders from diverse roles because developers, operators, and business users have different quality priorities
- Do use the SEI scenario template rigorously because vague scenarios cannot drive architecture decisions
- Do limit the workshop to one day because stakeholder fatigue degrades scenario quality
- Do connect QAW output directly to architecture evaluation because scenarios without follow-through are wasted effort

## Don't

- Don't let a single stakeholder dominate brainstorming because it suppresses important minority perspectives
- Don't confuse functional requirements with quality attribute scenarios because QAW focuses on the '-ilities' not features
- Don't skip the prioritization step because treating all scenarios equally makes architecture design impossible
- Don't conduct QAW without a facilitator because untrained facilitation leads to unfocused and unproductive sessions

## Case Study

**Philips Healthcare**: Philips Healthcare used QAW when designing the architecture of their patient monitoring platform that serves hospitals worldwide. The workshop surfaced critical quality attributes around real-time data latency (patient vitals must display within 2 seconds), availability (99.999% uptime for ICU monitors), and regulatory compliance (FDA Class II requirements). These prioritized scenarios directly shaped the decision to use a redundant publish-subscribe architecture with local edge processing.

## Related Frameworks

- atam (extends)
- trade-off-sliders (complement)
- four-golden-signals (complement)

## Source

https://sdframe.caldis.me/frameworks/qaw
