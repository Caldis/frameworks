# Inner Source / 内部开源

- **Category**: team
- **Complexity**: intermediate
- **Quality**: maintainability, usability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Tim O'Reilly, 2000; formalized by PayPal (Danese Cooper, ~2014)
- **Adopters**: Microsoft, PayPal, Bloomberg, Bosch, SAP

Apply open-source development practices within an organization to break down silos and improve code reuse

_在组织内部应用开源开发实践，打破部门壁垒，提升代码复用_

## When to Use

Apply this framework when:
- Multiple teams duplicating similar functionality because they cannot contribute to each other's codebases
- Shared libraries or platform components that evolve too slowly because only one team owns them
- Organizations wanting to improve engineering culture by promoting transparency and collaboration
- Large enterprises seeking to reduce bottlenecks on central platform teams via distributed contribution

## When NOT to Use

Stop and reconsider if:
- Organizations with strong intellectual property barriers between divisions that prevent code sharing
- Very early-stage startups where everyone already works in the same codebase and formal contribution processes add unnecessary overhead
- Teams with security-critical code that requires restricted access and cannot be opened to broad internal audiences
- Environments lacking basic DevOps maturity (CI/CD, code review tooling) needed to support distributed contribution

## Core Concepts

- Trusted Committer: A designated reviewer from the owning team who ensures external contributions meet quality standards and project direction
- Contribution guidelines: Explicit documentation (CONTRIBUTING.md, coding standards, PR templates) that lowers the barrier for cross-team contributions
- Transparent development: All code, issues, roadmaps, and design decisions are visible to the entire organization, mimicking open-source transparency
- Guest contributors: Engineers from consuming teams who submit patches to fix bugs or add features they need, rather than waiting on the owning team
- Community over hierarchy: Decisions are made through code review and technical merit rather than organizational reporting lines

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Inner Source to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify candidate projects with broad internal consumers and establish them as inner-source repositories
2. Define contribution guidelines, code review standards, and a CONTRIBUTING.md for each inner-source project
3. Designate trusted committers from the owning team who review and merge external contributions
4. Encourage teams to submit pull requests to shared codebases instead of forking or duplicating functionality
5. Measure adoption through contribution metrics: cross-team PRs, contributor diversity, and reuse rates

<details><summary>中文步骤</summary>

1. 识别拥有广泛内部消费者的候选项目，将其建立为内部开源仓库
2. 为每个内部开源项目定义贡献指南、代码评审标准和 CONTRIBUTING.md
3. 从拥有团队中指定受信任的提交者，负责评审和合并外部贡献
4. 鼓励团队向共享代码库提交拉取请求，而非分叉或重复实现功能
5. 通过贡献指标衡量采纳情况：跨团队 PR 数量、贡献者多样性和复用率

</details>

## Do

- Invest in excellent documentation and onboarding guides for each inner-source project to reduce contributor friction
- Recognize and reward cross-team contributions in performance reviews to incentivize participation
- Start with 2-3 high-visibility pilot projects before attempting organization-wide inner-source adoption
- Ensure trusted committers have dedicated time for reviewing external contributions, not just their own team's work

## Don't

- Don't mandate inner-source without cultural readiness — forced transparency in a low-trust environment backfires
- Don't neglect the trusted committer role — without timely reviews, contributors lose motivation and revert to forking
- Don't assume inner-source eliminates the need for owning teams — someone must still set direction and maintain quality
- Don't ignore the overhead: reviewing external PRs takes real time, and owning teams need staffing for this

## Case Study

**Microsoft**: Microsoft's inner-source adoption accelerated after Satya Nadella's cultural transformation beginning in 2014. By 2018, over 40,000 engineers contributed to inner-source repositories across Azure, Office, and Windows divisions. The 1ES (One Engineering System) initiative standardized tooling that made cross-team contributions frictionless. Teams reported 40% faster resolution of cross-cutting bugs because consuming teams could fix issues themselves rather than filing tickets and waiting. The shift was credited as a key enabler of Microsoft's transition from the infamous 'stack ranking' culture to a collaborative growth mindset.

## Related Frameworks

- platform-engineering (complement)
- conways-law (related)
- team-topologies (complement)
- amazon-two-pizza-teams (complement)

## Source

https://sdframe.caldis.me/frameworks/inner-source
