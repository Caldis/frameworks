# Architecture Decision Records (ADR) / 架构决策记录

- **Category**: architecture
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Michael Nygard, 2011
- **Adopters**: Spotify, GitHub, GOV.UK, Shopify, ThoughtWorks

Lightweight docs capturing context and rationale for decisions

_轻量级文档，记录架构决策的背景与理由_

## When to Use

Apply this framework when:
- When a team needs to preserve the reasoning behind key architectural choices for future developers
- When multiple stakeholders disagree and a transparent decision log is needed
- When onboarding new team members who need to understand why the system is built a certain way
- When working in regulated industries that require auditable decision trails

## When NOT to Use

Stop and reconsider if:
- Trivial decisions that don't affect system architecture or are easily reversible
- Solo projects where decision context exists only in one person's head and the project has no future maintainers
- Extremely fast-moving prototypes where the entire architecture may be discarded within weeks

## Core Concepts

- Immutability: ADRs are append-only; decisions are never edited, only superseded by new ADRs
- Context capture: Recording the forces, constraints, and environment that shaped the decision
- Status lifecycle: Each ADR transitions through proposed, accepted, deprecated, or superseded states
- Consequence tracking: Explicitly documenting both positive outcomes and accepted trade-offs
- Lightweight format: Markdown files stored alongside code in version control for easy discoverability

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Architecture Decision Records (ADR) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the architectural decision that needs to be made and create a new ADR file with a sequential number and short title
2. **Document the context**: describe the forces at play, constraints, and the problem being addressed
3. List all options considered with their pros and cons, including the status (proposed, accepted, deprecated)
4. Record the decision made, the rationale behind it, and which option was chosen
5. **Capture consequences**: expected outcomes, trade-offs accepted, and follow-up actions or future ADRs triggered

<details><summary>中文步骤</summary>

1. 确定需要记录的架构决策，创建带有序号和简短标题的新ADR文件
2. 记录上下文：描述当前的约束条件、驱动力和需要解决的问题
3. 列出所有考虑过的方案及各自的优缺点，标注当前状态（建议中/已接受/已废弃）
4. 记录最终决策、决策理由以及选择该方案的依据
5. 记录后果：预期结果、已接受的权衡取舍，以及后续行动或触发的新ADR

</details>

## Do

- Do number ADRs sequentially and give them short descriptive titles because it aids navigation and referencing
- Do store ADRs in the same repository as the code because it keeps decisions close to the artifacts they affect
- Do write ADRs at the time of the decision because context and rationale fade from memory quickly
- Do link related ADRs together because it creates a traceable decision graph

## Don't

- Don't edit accepted ADRs retroactively because it destroys the historical record of what was actually decided
- Don't record every minor implementation detail because ADRs should focus on architecturally significant decisions
- Don't skip the context section because without it the decision loses its rationale over time
- Don't use ADRs as a replacement for discussion because they document outcomes, not the debate itself

## Case Study

**Spotify**: Spotify adopted ADRs across its autonomous squad model to solve the problem of architectural knowledge loss when engineers rotated between squads. By storing ADRs in each service repository, new squad members could quickly understand past decisions. This reduced onboarding time for new squad members by roughly 40% and prevented teams from revisiting decisions that had already been thoroughly evaluated.

## Related Frameworks

- continuous-architecture (complement)
- atam (complement)
- c4-model (complement)

## Source

https://sdframe.caldis.me/frameworks/adr
