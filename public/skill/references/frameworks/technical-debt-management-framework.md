# Technical Debt Management Framework / 技术债务管理框架

- **Category**: team
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Ward Cunningham, 1992 (debt metaphor); Martin Fowler, 2009 (Technical Debt Quadrant), 1975
- **Adopters**: Spotify, Google, Shopify, Atlassian, ThoughtWorks

A systematic approach to identifying, quantifying, prioritizing, and paying down technical debt across an engineering organization

_在工程组织中系统性地识别、量化、优先排序和偿还技术债务的方法_

## When to Use

Apply this framework when:
- Engineering velocity is declining despite stable team size, suggesting accumulated debt is creating drag
- Teams spend more than 30% of their time on unplanned rework, workarounds, or fighting fragile systems
- Product leadership needs a data-driven argument for investing in technical improvements over new features
- Post-acquisition or post-rapid-growth phases where shortcuts taken during growth need systematic remediation

## When NOT to Use

Stop and reconsider if:
- Pre-product-market-fit startups where the codebase may be thrown away — speed to learning matters more than code quality
- One-off projects or prototypes with a defined end date where long-term maintenance is not a concern
- Teams already practicing continuous refactoring (e.g., TDD with aggressive refactoring) where debt rarely accumulates
- Situations where the system is scheduled for decommission — paying down debt on a system being replaced is wasteful

## Core Concepts

- Debt as a financial metaphor: Technical debt accrues 'interest' — the longer it remains, the more ongoing cost it imposes through slower development, more incidents, and harder onboarding
- Fowler's Quadrant: Debt is classified along two axes — deliberate/inadvertent and reckless/prudent — helping teams distinguish strategic shortcuts from careless code
- Capacity allocation: Rather than occasional 'tech debt sprints', sustainable teams reserve a consistent percentage of each iteration for debt reduction
- Cost of delay: The most effective prioritization metric — debt items that cause daily developer friction should be fixed before items with only occasional impact
- Brooks's Law of System Entropy: As described in The Mythical Man-Month, without active maintenance, software systems tend toward increasing disorder and reduced conceptual integrity

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Technical Debt Management Framework to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Create a shared tech debt inventory**: catalog known debt items with their type (code, architecture, infrastructure, test), impact, and estimated remediation cost
2. **Quantify debt impact using metrics**: developer friction (time lost), incident correlation, deployment frequency impact, and customer-facing effects
3. **Prioritize using a cost-of-delay model**: rank debt items by the ongoing cost of not fixing them versus the one-time cost of remediation
4. Allocate a consistent capacity budget (typically 15-20% of sprint capacity) dedicated to debt reduction each iteration
5. Track debt trends over time with a tech debt dashboard and report progress to stakeholders quarterly

<details><summary>中文步骤</summary>

1. 创建共享的技术债务清单：按类型（代码、架构、基础设施、测试）、影响和估计修复成本记录已知债务项
2. 使用指标量化债务影响：开发者摩擦（浪费的时间）、事故相关性、部署频率影响和面向客户的效果
3. 使用延迟成本模型优先排序：按不修复的持续成本与一次性修复成本的比值对债务项排名
4. 每个迭代分配固定的容量预算（通常为冲刺容量的 15-20%）专门用于债务削减
5. 通过技术债务仪表板追踪债务趋势，每季度向利益相关者报告进展

</details>

## Do

- Make tech debt visible to product stakeholders using business impact metrics (incidents caused, features delayed), not just engineering jargon
- Allocate a consistent 15-20% of sprint capacity to debt reduction every iteration, rather than scheduling sporadic 'debt sprints'
- Tie debt remediation to incidents — every postmortem should identify whether technical debt was a contributing factor
- Track debt trends quarterly to demonstrate whether the organization is gaining or losing ground

## Don't

- Don't treat all technical debt as equally urgent — reckless debt and prudent debt require different responses
- Don't promise zero tech debt — some debt is a deliberate, rational tradeoff for speed to market
- Don't let tech debt become a catch-all label — vague items like 'refactor everything' are not actionable debt items
- Don't schedule debt reduction only when there is 'spare time' — it will never happen because spare time does not exist

## Case Study

**Spotify**: Spotify implemented a systematic tech debt management approach in 2017 after teams reported that accumulated debt was slowing feature delivery by an estimated 25%. They introduced a 'Tech Health' scoring system where each squad assessed their codebase on a traffic-light scale (green/yellow/red) across dimensions like test coverage, deployment ease, and code clarity. Red scores triggered automatic allocation of 20% sprint capacity to remediation. Within 18 months, the percentage of red-scored components dropped from 34% to 12%, and the Accelerate metrics (deploy frequency and lead time) improved by 40% across the organization. The approach was cited in internal talks as making the case for sustained platform investment.

## Related Frameworks

- technical-debt-quadrant (complement)
- blameless-postmortems (complement)
- architecture-review-board (complement)
- continuous-architecture (complement)

## Source

https://sdframe.caldis.me/frameworks/technical-debt-management-framework
