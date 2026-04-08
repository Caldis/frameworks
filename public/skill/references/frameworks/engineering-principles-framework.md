# Engineering Principles Framework / 工程原则框架

- **Category**: team
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: foundational
- **Author**: Various; formalized by Stripe, Netflix, and Basecamp engineering blogs (2013-2018)
- **Adopters**: Stripe, Netflix, Basecamp, Spotify, Monzo

A structured practice of defining, publishing, and evolving explicit engineering principles that guide daily technical decisions across an organization

_定义、发布和演进明确工程原则的结构化实践，引导组织内日常技术决策_

## When to Use

Apply this framework when:
- Engineering organizations scaling past 50 engineers where informal cultural transmission of technical values becomes unreliable
- Post-merger or multi-office teams that need to establish shared technical norms across diverse engineering cultures
- Organizations experiencing recurring architectural inconsistencies or technology sprawl that indicate absence of agreed decision criteria
- Teams introducing engineering managers from non-technical backgrounds who need explicit codified guidance on what good engineering looks like

## When NOT to Use

Stop and reconsider if:
- Startups with fewer than 20 engineers where shared context is maintained through direct communication and principles can feel bureaucratic
- Crisis situations requiring immediate decisive action — consulting principles during an incident is a symptom of insufficient runbooks, not a substitute
- Teams with extremely high turnover where investing in principle documentation yields diminishing returns relative to direct onboarding
- Organizations where leadership regularly overrides engineering decisions regardless of stated principles — publishing principles in a low-trust environment creates cynicism

## Core Concepts

- Principle vs. Rule: Principles are durable heuristics that guide judgment in novel situations; rules are binary mandates. Good engineering principles leave room for context-sensitive application
- Explicit Over Implicit: Writing down the values that experienced engineers already hold makes them transferable, debatable, and evolvable — rather than locked in the heads of founding engineers
- Rationale as First-Class Content: Every principle must carry its 'why' — the failure mode it prevents or the value it promotes — so engineers can apply it correctly in unforeseen situations
- Principle Citation in Artifacts: Engineering artifacts (ADRs, tech specs, PRs) that reference principles by name create an auditable trail of how stated values drive actual decisions
- Living Document: Principles drift from reality if not revisited; an annual cadence with a public changelog signals that the organization takes the document seriously rather than treating it as shelfware

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Engineering Principles Framework to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Gather input across seniority levels**: run structured workshops where engineers at all levels articulate the implicit heuristics they already apply when making technical choices — capture these as candidate principles in raw form
2. **Synthesize and deduplicate**: group similar heuristics, identify tensions between them, and draft 8-15 concise principles with a name, one-sentence statement, rationale paragraph, and two example applications each
3. **Ratify through deliberation**: circulate the draft to all engineering teams for a 2-week review, resolve conflicts through async RFC discussion, then publish the v1 doc in a prominent location (engineering handbook, internal site)
4. **Embed principles in decision artifacts**: require ADRs, tech specs, and code review comments to cite relevant principles by name, creating a living record of how principles shape real decisions
5. **Review and evolve annually**: schedule a yearly retrospective to assess whether each principle is helping or hindering; retire stale ones, add new ones that capture emerging consensus, and publish a changelog

<details><summary>中文步骤</summary>

1. 跨级别收集意见：开展结构化工作坊，让各级工程师阐述他们在做技术选择时已经应用的隐性启发法——以原始形式收集这些内容作为候选原则
2. 整合与去重：对相似启发法进行分组，识别它们之间的张力，起草8-15条简洁原则，每条包含名称、单句陈述、理由段落和两个应用示例
3. 通过审议批准：将草稿发给所有工程团队进行2周审查，通过异步RFC讨论解决冲突，然后在显著位置（工程手册、内部网站）发布v1文档
4. 在决策产物中嵌入原则：要求ADR、技术规范和代码审查评论按名称引用相关原则，创建原则如何影响实际决策的活体记录
5. 每年回顾和演进：安排年度回顾评估每条原则是否有助或有碍；淘汰过时的，添加体现新兴共识的新原则，并发布变更日志

</details>

## Do

- Do involve engineers at all levels in principle authorship — principles authored exclusively by VPs will be ignored by ICs who had no voice in shaping them
- Do keep the list short (under 15 principles) so the full set is memorizable and each principle carries weight
- Do include concrete examples for each principle that show both correct and incorrect application in realistic scenarios
- Do track which principles are most frequently cited in ADRs as a leading indicator of which ones are actually influencing decisions

## Don't

- Don't write principles as aspirational slogans without rationale — "Move fast" or "Be excellent" gives engineers no guidance when two values conflict
- Don't treat principles as immutable — an organization that never updates its principles likely stopped believing in them long ago
- Don't create principles by committee vote — authority-by-consensus produces anodyne statements that offend no one and guide no one
- Don't confuse principles with coding standards — linting rules and style guides are separate artifacts that operate at a different level of abstraction

## Case Study

**Monzo**: Monzo published their engineering principles openly on their blog in 2019 with a set of 9 principles including 'We build for reliability over convenience' and 'We default to transparency'. Each principle included explicit anti-patterns and historical examples from Monzo's own codebase. Within 18 months of publication, internal surveys showed that 78% of engineers could recall at least 5 principles unprompted, and code review culture shifted measurably toward citing principles when requesting changes rather than invoking personal preference.

## Related Frameworks

- adr (related)
- rfc-process (related)
- engineering-ladder (related)
- decision-log-practice (related)
- architecture-review-board (related)

## Source

https://sdframe.caldis.me/frameworks/engineering-principles-framework
