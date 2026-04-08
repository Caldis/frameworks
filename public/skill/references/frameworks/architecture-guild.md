# Architecture Guild / 架构公会

- **Category**: team
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Spotify, 2012
- **Adopters**: Spotify, ING Bank, Zalando, ASOS, Klarna

Cross-team community of practice for architecture alignment, decision review, and technical standard-setting without centralized command

_跨团队架构对齐、决策评审和技术标准制定的实践社区，无需集中式指挥_

## When to Use

Apply this framework when:
- When architectural decisions are being made independently by multiple teams without cross-team visibility, leading to duplication, divergence, or incompatible patterns
- When a formal Architecture Review Board exists but is perceived as a slow bureaucratic gate — a guild provides the alignment without the bottleneck
- When senior engineers with architectural expertise are distributed across teams and have no forum for cross-team learning and standard-setting
- When the organization is transitioning from monolith to microservices and needs a coordination mechanism for emerging distributed system patterns

## When NOT to Use

Stop and reconsider if:
- Engineering organizations under 30 engineers where a single weekly architecture discussion in the all-hands is sufficient and a separate guild adds overhead
- Highly regulated industries where architecture decisions require formal traceability and approval — an ARB provides the accountability that a voluntary guild cannot
- Organizations where engineers lack psychological safety to challenge decisions in a cross-team forum — a guild without trust becomes a venue for political maneuvering rather than technical alignment
- Companies where the architectural approach is deliberately monolithic and all engineers work in the same codebase — guild coordination value only materializes in distributed or multi-team architectures

## Core Concepts

- Community of Practice (CoP): A voluntary, cross-functional group united by shared craft interest rather than organizational reporting lines — guilds derive their authority from expertise and trust, not hierarchy
- Advisory vs Binding Authority: Architecture guilds work best when they have advisory authority for most decisions (recommendations teams can override with explicit justification) and binding authority only for foundational cross-cutting concerns (security standards, data contracts, API versioning policies)
- Architectural Drift: The gradual divergence of team-level architectural decisions from agreed patterns when there is no alignment forum — guilds prevent drift by creating a regular venue for comparing and reconciling approaches
- Enabling Constraint: Architectural principles set by a guild function as enabling constraints — they reduce the decision space to prevent locally-optimal but globally-incoherent choices, while still leaving teams freedom to solve problems creatively within the boundaries
- Distributed Architecture Ownership: The alternative to centralized architecture control — authority is distributed to teams, but coherence is maintained through shared principles, voluntary coordination, and mutual review rather than top-down mandates

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Architecture Guild to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Establish the guild charter**: define scope (what architectural decisions require guild involvement), membership criteria (senior engineers and architects from each domain), meeting cadence (bi-weekly), and decision authority (advisory vs binding by decision type)
2. Distinguish guild scope from the Architecture Review Board — guilds are voluntary communities of practice focused on ongoing alignment and knowledge sharing; an ARB is a formal governance gate; clearly defining the boundary prevents duplication and confusion
3. Create a lightweight architectural decision intake process: teams propose cross-cutting decisions via a short RFC or ADR draft, the guild reviews asynchronously first, then discusses in the bi-weekly session — avoiding the bottleneck of routing every decision through a committee
4. Maintain a shared architectural principles document (5-10 high-level principles that guide decisions, not prescribe solutions) that the guild owns and updates annually — making implicit team norms explicit and debatable
5. Run periodic architecture landscape sessions where teams present their current system maps and upcoming decisions — building cross-team visibility, surfacing conflicts early, and creating learning opportunities for less-experienced engineers to observe how architectural thinking works

<details><summary>中文步骤</summary>

1. 建立公会章程：定义范围（哪些架构决策需要公会参与）、成员资格标准（每个领域的高级工程师和架构师）、会议节奏（每两周一次）以及决策权限（按决策类型区分顾问性或约束性）
2. 区分公会范围与架构评审委员会——公会是专注于持续对齐和知识共享的自愿实践社区；ARB 是正式的治理门禁；清晰定义边界防止重复和混乱
3. 创建轻量级架构决策接收流程：团队通过简短的 RFC 或 ADR 草稿提出跨切面决策，公会先异步审查，然后在双周会议中讨论——避免将每个决策路由通过委员会的瓶颈
4. 维护共享架构原则文档（5-10 条指导决策的高层原则，而非规定解决方案），公会负责并每年更新——使隐性团队规范显性化和可讨论
5. 定期举办架构全景会议，各团队展示其当前系统地图和即将到来的决策——建立跨团队可见性，及早发现冲突，并为经验较少的工程师创造观察架构思维如何运作的学习机会

</details>

## Do

- Do give the guild a clear charter that specifies which decisions require guild involvement and which are fully within team authority — ambiguity leads to either bypassing the guild or creating unnecessary bottlenecks
- Do keep guild membership permeable — any engineer with relevant expertise should be able to participate in a review, even if they are not a standing member, because this builds organizational alignment beyond the core group
- Do publish guild decisions and architectural principles openly (internal wiki, ADR repository) so teams can self-serve alignment without queuing up for the next guild meeting
- Do rotate the guild chair or facilitator role regularly to prevent it from becoming a de facto architecture authority concentrated in one person

## Don't

- Don't create a guild that duplicates the Architecture Review Board — if both exist, define clearly which handles governance (ARB) and which handles learning and alignment (guild)
- Don't make guild attendance mandatory for engineers without adjusting their sprint capacity — treating the guild as just another meeting without protecting time for it signals that architectural alignment is not a real priority
- Don't let the guild become an approval bottleneck by requiring guild sign-off for every architectural decision — apply guild review proportionally to decision scope and reversibility
- Don't allow the guild to become a talking shop without outputs — every session should produce at least one artifact: an updated ADR, a revised principle, a shared decision log entry, or a recorded architecture talk

## Case Study

**Spotify**: Spotify's architecture guild, part of the squad/tribe/chapter/guild model documented in 2012, became one of the most widely referenced examples of distributed architecture governance. The guild operated as a voluntary community of senior engineers and architects across all tribes, meeting bi-weekly to review RFC proposals, share architectural learnings, and maintain Spotify's internal technology radar. Rather than approving or rejecting decisions, the guild's primary artifact was a living architectural principles document and a technology radar that tracked adopted, experimental, and deprecated patterns. Teams could make independent decisions but were expected to contribute learnings back to the guild. This model enabled Spotify to maintain coherent architecture across 100+ autonomous squads without a centralized architecture function, a balance that became a case study in the Team Topologies community.

## Related Frameworks

- architecture-review-board (related)
- guilds-communities-of-practice (complement)
- adr (complement)
- rfc-process (related)

## Source

https://sdframe.caldis.me/frameworks/architecture-guild
