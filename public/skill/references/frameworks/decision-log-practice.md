# Decision Log Practice / 决策日志实践

- **Category**: team
- **Complexity**: beginner
- **Quality**: maintainability, usability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Michael Nygard, 2005
- **Adopters**: Spotify, Zalando, GitHub, ThoughtWorks, Netflix

Systematically recording, storing, and reviewing team decisions to create organizational memory, reduce repeated debates, and enable async alignment

_系统性地记录、存储和回顾团队决策，创建组织记忆，减少重复争论，实现异步对齐_

## When to Use

Apply this framework when:
- When the team repeatedly reopens the same debates because there is no record of why a previous decision was made and what alternatives were considered
- When onboarding new engineers takes longer than expected because system design rationale is undocumented and must be extracted through interviews with long-tenured team members
- When post-incident reviews frequently surface 'we don't know why this was built this way' as a contributing factor
- When the team is distributed across timezones and asynchronous context-sharing is essential for effective collaboration

## When NOT to Use

Stop and reconsider if:
- Startups in the first 6 months where the system is small enough to be understood by everyone on the team without written records
- Research or prototype projects where decisions are intentionally provisional and the system will be rebuilt or discarded — spending time on decision records for throwaway code is waste
- Teams where decision-making is so centralized that only one person makes architectural decisions — decision logging adds value when it distributes context to a team, not when it documents a single person's choices
- Organizations where the primary bottleneck is decision velocity, not decision quality — adding logging requirements to already-slow decision processes will worsen the bottleneck before improving it

## Core Concepts

- Architecture Decision Record (ADR): A short, structured document capturing a single architectural decision — the context that drove it, the decision itself, the alternatives considered, and the consequences expected — stored in the repository alongside the code it affects
- Organizational Memory: The accumulated institutional knowledge of why systems are built the way they are; without decision records, this knowledge lives only in the heads of long-tenured engineers and is lost when they leave
- Decision Traceability: The ability to trace from a current code or configuration artifact back to the decision that created it, the context that justified it, and the alternatives that were rejected — critical for change impact analysis and incident investigation
- Decision Hygiene: The practice of keeping the decision record current — marking decisions as superseded when circumstances change, adding outcome notes when initial assumptions are validated or refuted, and archiving rather than deleting deprecated decisions
- Reversibility Classification: Classifying decisions on a spectrum from fully reversible (cheap to change) to near-irreversible (prohibitively expensive to reverse) — high-reversibility decisions need less formal documentation; low-reversibility decisions warrant thorough ADRs

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Decision Log Practice to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Choose a decision record format proportional to decision scope: lightweight Decision Log (title, context, decision, date, owner) for operational choices; full ADR (Architecture Decision Record) format for technical choices with significant downstream impact; formal RFC for cross-team proposals requiring broad input
2. Establish a single canonical location for all decision records (a Git repository, a Notion database, or a Confluence space) with a consistent naming convention and indexed by date, team, and topic — accessibility and searchability are the primary value drivers
3. Define a lightweight decision intake trigger: decisions that affect more than one team, decisions that will be hard to reverse, and decisions that establish a pattern others will follow are candidates for formal recording — not every choice needs a log entry
4. Build decision review into the team rhythm: a quarterly 'decision archaeology' session reviews past decisions, identifies which assumptions have been invalidated, and flags records that should be updated, superseded, or deprecated
5. **Link decisions to downstream artifacts**: ADRs linked in code comments near affected areas, RFCs linked in Jira epics, and decision records linked in post-incident reviews — creating a traceable chain from context to implementation

<details><summary>中文步骤</summary>

1. 选择与决策范围相称的记录格式：对操作性选择使用轻量级决策日志（标题、背景、决策、日期、负责人）；对具有重大下游影响的技术选择使用完整的 ADR（架构决策记录）格式；对需要广泛输入的跨团队提案使用正式 RFC
2. 为所有决策记录建立单一规范位置（Git 存储库、Notion 数据库或 Confluence 空间），采用一致的命名约定，按日期、团队和主题建立索引——可访问性和可搜索性是主要价值驱动因素
3. 定义轻量级决策接收触发器：影响多个团队的决策、难以撤销的决策，以及建立他人将遵循模式的决策是正式记录的候选项——不是每个选择都需要日志条目
4. 将决策审查纳入团队节奏：每季度「决策考古」会议回顾过去决策，识别哪些假设已被证伪，并标记应更新、取代或废弃的记录
5. 将决策与下游产物链接：ADR 链接在受影响区域附近的代码注释中，RFC 链接在 Jira 史诗中，决策记录链接在事后审查中——创建从背景到实现的可追溯链条

</details>

## Do

- Do store ADRs in the same Git repository as the code they relate to because co-location creates discoverability through search, enables PR-linked review, and ensures decisions are versioned alongside the artifacts they govern
- Do write decision records at the time of the decision, not retrospectively — retrospective ADRs are often incomplete because the full context is lost, and they are frequently never written at all
- Do include the alternatives considered and why they were rejected in every ADR because the rejected options are often as instructive as the chosen one — future engineers need to understand why option B was not selected before re-proposing it
- Do define explicit triggers for when a new decision record is required — the worst decision logging culture is one where some teams write ADRs for everything and others write none, resulting in inconsistent organizational memory

## Don't

- Don't write ADRs that describe what was decided without explaining why — the 'why' and 'alternatives considered' sections are the primary value of the document; a decision without context is just a policy statement
- Don't require lengthy ADRs for operational decisions — a 5-paragraph ADR for a variable naming convention or tool configuration choice adds friction without value; reserve the format for genuinely consequential decisions
- Don't let decision records become an approval process — ADRs are documentation artifacts, not sign-off gates; coupling decision logging to formal approval slows decision-making and discourages teams from logging smaller decisions
- Don't neglect decision hygiene — a repository of outdated, superseded ADRs that are never marked as deprecated is worse than no decision log because it actively misleads engineers about the current state of the system

## Case Study

**Spotify**: Spotify's engineering organization adopted ADR-based decision logging as part of their architecture guild practice. Each squad was expected to log architectural decisions in a shared GitHub repository using a lightweight ADR template that captured context, decision, status, and consequences. The guild maintained a searchable index of all ADRs across squads, enabling cross-team pattern recognition — when multiple squads independently converged on similar database caching approaches, the guild surfaced the pattern, created a shared ADR, and established it as a recommended practice. During a major platform migration (from monolith to microservices, 2014-2016), decision logs were credited in retrospectives as a key factor in the migration's coherence — engineers joining midway could reconstruct the reasoning behind design choices without interviewing the original authors.

## Related Frameworks

- adr (complement)
- rfc-process (complement)
- architecture-guild (related)
- blameless-postmortems (related)

## Source

https://sdframe.caldis.me/frameworks/decision-log-practice
