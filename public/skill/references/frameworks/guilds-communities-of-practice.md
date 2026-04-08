# Guilds and Communities of Practice / 行会与实践社区

- **Category**: team
- **Complexity**: beginner
- **Quality**: maintainability, usability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Etienne Wenger, Communities of Practice (1998); popularized in software by the Spotify Model (2012), 1991
- **Adopters**: Spotify, ING Bank, Zalando, Adidas, Google

Cross-team knowledge-sharing groups that build expertise and standards across organizational silos

_跨团队知识共享群体，跨组织孤岛构建专业知识和标准_

## When to Use

Apply this framework when:
- When the organization has grown beyond 3-4 teams and domain expertise is siloed within individual squads rather than shared across the organization
- When the same technical problems (security vulnerabilities, performance issues, accessibility failures) are solved independently by multiple teams with inconsistent outcomes
- When senior engineers are embedded in delivery teams with no mechanism to share their expertise at the organizational level
- When the organization is adopting new technology (AI, observability, platform engineering) and needs a coordinated learning and adoption path across teams

## When NOT to Use

Stop and reconsider if:
- Organizations of fewer than 20-30 engineers where everyone already knows each other and cross-team knowledge sharing happens organically
- High-urgency delivery phases (pre-launch sprints, critical incident recovery) where all capacity must focus on delivery and community activities must pause
- Organizations with highly contractual employment relationships where voluntary after-hours participation is inappropriate or legally ambiguous
- Domains where knowledge sharing requires security clearances or confidentiality that prevents open cross-team discussion

## Core Concepts

- Domain: The shared area of interest or expertise that defines the guild's scope — narrow enough to be coherent but broad enough to span multiple teams
- Community: The group of practitioners who care about the domain and voluntarily participate in the guild's activities, regardless of their squad or reporting line
- Practice: The shared repertoire of tools, standards, patterns, and processes that the guild develops and curates over time
- Voluntary Participation: Guilds are opt-in; mandatory guilds become bureaucratic committees that produce compliance theater rather than genuine knowledge sharing
- Influence Without Authority: Guild leads must influence team behavior through demonstrated expertise and useful artifacts rather than through organizational hierarchy

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Guilds and Communities of Practice to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify a technical or practice domain (frontend, security, data engineering, accessibility) that spans multiple teams and would benefit from cross-team coordination
2. Appoint a guild lead (voluntary or designated) who owns the meeting cadence, agenda, and communication channels; this role rotates periodically to prevent single-point-of-failure
3. **Establish recurring touchpoints**: a monthly meeting for knowledge sharing (demos, post-mortems, book clubs) and an async channel (Slack, Discord) for daily questions and resource sharing
4. **Define the guild's output artifacts**: shared coding standards, reviewed libraries, onboarding guides, and recommended tooling that teams adopt voluntarily
5. Measure the guild's health annually through member satisfaction surveys and track adoption of guild-produced standards to demonstrate value to leadership

<details><summary>中文步骤</summary>

1. 识别跨多个团队的技术或实践领域（前端、安全、数据工程、可访问性），跨团队协调将带来价值
2. 任命行会负责人（自愿或指定），负责会议节奏、议程和沟通渠道；该角色定期轮换以防止单点故障
3. 建立定期接触点：每月知识共享会议（演示、事后分析、读书会）和异步频道（Slack、Discord）用于日常问题和资源分享
4. 定义行会的输出产物：共享编码标准、审查的库、入职指南和推荐工具，团队自愿采用
5. 通过成员满意度调查每年评估行会健康状况，并跟踪行会制定标准的采用情况以向领导层证明价值

</details>

## Do

- Do keep guild membership voluntary because mandatory guilds create attendance compliance rather than genuine engagement
- Do produce concrete, usable artifacts (linting configs, Docker base images, onboarding guides) because abstract knowledge sharing without deliverables doesn't change daily practice
- Do rotate guild leads every 12-18 months because static leadership creates knowledge monopolies and prevents the next generation of experts from developing
- Do give guilds a dedicated time allocation (e.g., 10% of sprint capacity) so that participation doesn't exclusively happen as unpaid overtime

## Don't

- Don't let guilds become toothless talking shops that meet monthly, produce slide decks, and have no impact on how teams actually work
- Don't create guilds for every topic because guild proliferation causes context-switching fatigue and dilutes participation across all guilds
- Don't measure guild success by attendance alone because a 50-person guild with zero adopted standards is less valuable than a 10-person guild whose patterns are used everywhere
- Don't conflate guilds with chapters — chapters own career development and competency within a discipline, guilds focus on cross-team knowledge sharing

## Case Study

**ING Bank**: ING Bank adopted the Spotify model in 2015, organizing its 13,000-person IT department into squads, tribes, chapters, and guilds. The bank's Security Guild became a flagship example: a 200-engineer voluntary community that produced shared security testing frameworks, threat modeling templates, and a weekly vulnerability digest. Within 18 months of the guild's formation, security issue detection rates improved 40% and remediation time dropped from 45 days to 11 days, attributed directly to the shared knowledge and tools the guild produced. ING later expanded the model to non-engineering functions including data science, UX, and product management.

## Related Frameworks

- spotify-model (extends)
- platform-engineering (complement)

## Source

https://sdframe.caldis.me/frameworks/guilds-communities-of-practice
