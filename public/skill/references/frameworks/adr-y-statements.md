# Architecture Decision Records (Y-Statements) / 架构决策记录（Y 型陈述）

- **Category**: evolution
- **Complexity**: beginner
- **Quality**: maintainability, observability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Olaf Zimmermann, 2011
- **Adopters**: GitHub, Spotify, Zalando, Shopify, Thoughtworks

Structured decision documentation using the Y-statement format to capture context, decision, and consequences of significant architectural choices

_使用 Y 型陈述格式记录背景、决策和后果，结构化记录重大架构决策_

## When to Use

Apply this framework when:
- When onboarding new team members who need to understand why the current architecture looks the way it does, without having to reconstruct decisions from meeting notes or tribal knowledge
- When a significant architectural decision is being made that will constrain future options — the ADR authoring process forces structured reasoning before commitment
- When working in regulated industries (finance, healthcare) where architecture decisions must be auditable and traceable to requirements or compliance obligations
- When multiple teams share a platform and need a lightweight, asynchronous process for proposing and reviewing architectural decisions without requiring synchronous meetings

## When NOT to Use

Stop and reconsider if:
- Decisions that are purely tactical, reversible within a sprint, and affect only one team's internal implementation — the overhead of an ADR is not justified for low-stakes, easily-changed choices
- Highly experimental or prototype phases where architectural decisions are expected to change weekly — premature decision documentation for volatile designs creates noise rather than clarity
- Very small teams (2-3 engineers) where the entire team participates in every architecture discussion — institutional knowledge is not at risk of being lost and the overhead may exceed the value
- Organizations without a code review culture or repository-based documentation practice — ADRs stored in isolation from the team's workflow will not be discovered or maintained

## Core Concepts

- Y-Statement Format: A sentence template that structures an ADR as: 'In the context of [use case/user story], facing [concern/force], we decided [option], to achieve [quality/goal], accepting [downside/risk]' — each clause is mandatory, preventing incomplete decision records
- Decision Status Lifecycle: ADRs move through Proposed (under discussion), Accepted (in force), Deprecated (still valid but no longer recommended), and Superseded (replaced by a newer ADR with a link) — the lifecycle makes the current validity of each decision explicit
- Alternatives Considered: The most valuable section for future readers; documenting rejected alternatives and their trade-offs prevents teams from re-litigating the same decision space years later when context has been forgotten
- Immutability and Supersedence: ADRs are never edited after acceptance — if a decision changes, the original ADR is marked Superseded and a new ADR documents the new decision and why the old one no longer applies
- Colocation with Code: Storing ADRs in the repository (not in Confluence or a separate wiki) ensures they survive team transitions, appear in git history, and are discoverable when developers read the code they describe

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Architecture Decision Records (Y-Statements) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify decisions that warrant recording: those that are architecturally significant (affect multiple components or teams), hard to reverse, driven by constraints that future developers may not know, or required for compliance/audit purposes
2. Author the ADR using the Y-statement format: 'In the context of [situation], facing [concern], we decided [option], to achieve [quality], accepting [downside]' — filling each clause forces the author to make implicit reasoning explicit
3. Document alternatives considered and their trade-offs in the ADR body, explaining why each alternative was rejected; this is as valuable as the chosen option for future readers trying to understand the decision space
4. Assign status (Proposed, Accepted, Deprecated, Superseded) and link superseding ADRs — an ADR that is never deprecated creates a false impression that the decision is still in force
5. Store ADRs as numbered Markdown files in the repository (e.g., docs/adr/0042-use-postgres-for-session-storage.md), adjacent to the code they describe, so they appear in git blame and code review contexts

<details><summary>中文步骤</summary>

1. 识别值得记录的决策：具有架构意义的（影响多个组件或团队）、难以逆转的、由未来开发者可能不知道的约束驱动的，或合规/审计目的所需的
2. 使用 Y 型陈述格式撰写 ADR：「在 [情境] 的背景下，面对 [关切]，我们决定 [选项]，以实现 [质量]，接受 [缺点]」——填写每个子句迫使作者将隐性推理显式化
3. 在 ADR 正文中记录考虑过的备选方案及其权衡，解释每个备选方案被拒绝的原因；这对于试图理解决策空间的未来读者来说与所选选项同样有价值
4. 分配状态（已提议、已接受、已废弃、已取代）并链接取代 ADR——从未被废弃的 ADR 会给人该决策仍然有效的错误印象
5. 将 ADR 作为带编号的 Markdown 文件存储在仓库中（如 docs/adr/0042-use-postgres-for-session-storage.md），与其描述的代码相邻，使其出现在 git blame 和代码审查上下文中

</details>

## Do

- Do write ADRs at decision time, not retrospectively — the reasoning and context are freshest when the decision is being made; retrospective ADRs often omit the real reasons for the choice
- Do keep ADRs short (one to two pages) — an ADR that requires a 10-page document is really a design document, not a decision record; the Y-statement format enforces brevity by design
- Do link ADRs bidirectionally: from the ADR to the code/PR it informed, and from code comments or PR descriptions back to the ADR that explains the reasoning
- Do treat an ADR as an asynchronous RFC (Request for Comment) for significant decisions — circulate the draft in Proposed status, collect comments, update, and then move to Accepted

## Don't

- Don't write ADRs for implementation details or tactical coding choices — reserve the practice for architecturally significant decisions that constrain the system's structure or quality attributes
- Don't edit an accepted ADR to reflect a changed decision — immutability is fundamental; create a new ADR that supersedes the old one, preserving the full decision history
- Don't store ADRs only in an external wiki (Confluence, Notion) — wikis get abandoned, renamed, or lost during company transitions; the repository is the only durable, co-located home
- Don't allow an ADR backlog to grow without review — unreviewed Proposed ADRs create confusion about which decisions are actually in force; resolve or close stale proposals within a defined SLA

## Case Study

**GitHub**: GitHub adopted ADRs as a core architectural practice after experiencing significant knowledge loss during rapid headcount growth from 300 to 1,800 engineers between 2013 and 2016. The architectural decisions that had enabled GitHub's early scale — Rails monolith structure, MySQL sharding strategy, Resque-based background jobs — were undocumented, causing new teams to repeatedly question and sometimes inadvertently undermine them. After introducing ADRs with the Y-statement format for all significant architectural decisions in 2017, GitHub's platform team reported a 40% reduction in architecture-related discussion overhead in pull requests, as reviewers could link to ADRs rather than re-explaining context. The ADR repository now contains over 300 records spanning GitHub's full architectural evolution.

## Related Frameworks

- fitness-function-driven-development (complement)
- living-documentation (complement)
- domain-driven-design (complement)

## Source

https://sdframe.caldis.me/frameworks/adr-y-statements
