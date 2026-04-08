# Technical Debt Quadrant / 技术债务象限

- **Category**: evolution
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Martin Fowler, 2009, 1992
- **Adopters**: Spotify, ThoughtWorks, Atlassian, Pivotal Labs, Etsy

Classify tech debt by deliberate/inadvertent and reckless/prudent axes

_按有意/无意与鲁莽/谨慎两轴对技术债务分类_

## When to Use

Apply this framework when:
- A team needs a shared language to discuss and prioritize different kinds of technical debt
- Sprint retrospectives keep surfacing vague complaints about code quality without actionable categories
- Engineering leadership needs to communicate the business impact of technical debt to non-technical stakeholders
- Deciding whether to take on tactical shortcuts during a tight product deadline

## When NOT to Use

Stop and reconsider if:
- The codebase is brand new with minimal accumulated shortcuts — classification overhead is unnecessary
- The team is in pure prototype/exploration mode where debt is expected and intentionally disposable
- A single monolithic debt item dominates everything — no need for a classification framework
- Stakeholders only care about debt quantity, not debt type (though this itself is a problem to fix)

## Core Concepts

- Deliberate vs. Inadvertent: Whether the team knowingly took on the debt or stumbled into it through lack of knowledge
- Reckless vs. Prudent: Whether the debt was taken carelessly or as a calculated trade-off with a repayment plan
- Reckless-Deliberate: 'We know this is wrong but ship it anyway' — highest urgency to fix
- Prudent-Inadvertent: 'Now we know how we should have done it' — natural learning, address when revisiting that area
- Interest payments: The ongoing cost of working around technical debt — slower delivery, more bugs, higher onboarding time

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Technical Debt Quadrant to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Audit the codebase and collect all known shortcuts, workarounds, and design smells
2. **Classify each item on two axes**: deliberate vs. inadvertent and reckless vs. prudent
3. Prioritize reckless-inadvertent debt for immediate remediation as it carries highest risk
4. Schedule prudent-deliberate debt paydown as part of regular sprint capacity allocation
5. Document decisions to take on deliberate debt with explicit repayment plans and owners

<details><summary>中文步骤</summary>

1. 审计代码库，收集所有已知的快捷方式、变通方案和设计异味
2. 按两轴对每项进行分类：有意 vs. 无意，鲁莽 vs. 谨慎
3. 优先修复「鲁莽-无意」象限的债务，因其风险最高
4. 将「谨慎-有意」债务的偿还纳入常规迭代容量规划
5. 记录主动承担技术债务的决策，明确偿还计划与负责人

</details>

## Do

- Use the quadrant in sprint retros to categorize newly discovered debt and agree on priority
- Track prudent-deliberate debt in a visible backlog with clear owners and target payoff dates
- Allocate a fixed percentage (e.g., 15-20%) of sprint capacity to debt paydown every iteration
- Connect debt items to business metrics (velocity, incident rate) to justify remediation investment

## Don't

- Don't treat all technical debt as equally urgent — the quadrant exists precisely to differentiate
- Don't use 'technical debt' as a catch-all excuse without classifying the specific type and impact
- Don't ignore inadvertent debt — it signals gaps in team knowledge that need coaching or training
- Don't let prudent-deliberate debt accumulate without repayment — interest compounds over time

## Case Study

**Spotify**: Spotify adopted the Technical Debt Quadrant in their squad-based engineering culture to give autonomous teams a shared vocabulary for debt prioritization. Each squad categorized their debt using the quadrant during quarterly planning, and reckless-inadvertent items were flagged for immediate attention. This approach reduced their mean incident recovery time by 30% over two years, as the most dangerous hidden debt was systematically surfaced and addressed.

## Related Frameworks

- mikado-method (complement)
- continuous-architecture (complement)
- architectural-fitness-functions (complement)

## Source

https://sdframe.caldis.me/frameworks/technical-debt-quadrant
