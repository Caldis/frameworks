# Spotify Model / Spotify 模型

- **Category**: team
- **Complexity**: advanced
- **Quality**: maintainability, usability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Henrik Kniberg & Anders Ivarsson, 2012
- **Adopters**: Spotify, ING Bank, Zalando, Gilt, Elsevier

Organize engineering around autonomous squads grouped into tribes, with cross-cutting chapters and guilds for alignment

_围绕自治小队组织工程团队，小队按业务线归入部落，通过跨部门的分会与公会实现对齐_

## When to Use

Apply this framework when:
- Scaling an engineering organization beyond 50 engineers while preserving startup-like autonomy
- Reducing cross-team dependencies that slow down delivery in a growing product company
- Fostering a strong engineering culture where teams choose their own tools and practices
- Organizations transitioning from rigid hierarchical structures to mission-driven teams

## When NOT to Use

Stop and reconsider if:
- Small organizations (under 30 engineers) where the overhead of tribes and chapters exceeds the coordination benefit
- Highly regulated industries requiring strict hierarchical approval chains that conflict with squad autonomy
- Organizations without mature engineering culture — the model assumes high trust and psychological safety
- Teams with deeply coupled codebases where true squad autonomy over independent deployments is impossible

## Core Concepts

- Squad: The basic unit of delivery — a small, autonomous, cross-functional team with end-to-end ownership of a product area or mission
- Tribe: A collection of squads (up to ~100 people) working in a related business area, led by a tribe lead who fosters collaboration
- Chapter: A functional grouping within a tribe (e.g., all iOS developers) for skill sharing, mentoring, and line management
- Guild: A lightweight, voluntary community of practice spanning the entire organization, enabling cross-pollination of knowledge
- Alignment vs. Autonomy: The model explicitly balances organizational alignment (what to build) with squad autonomy (how to build it)

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Spotify Model to?
- What constraints or existing architecture do you need to work within?
- Has your team used Spotify Model before? (This is an advanced framework)

## Implementation Steps

1. Form small cross-functional squads (6-8 people) each owning a specific mission or product area
2. Group related squads into tribes (≤100 people) sharing a common business domain
3. Establish chapters as functional groupings (e.g., backend, QA) within a tribe for skill development and line management
4. Create guilds as voluntary communities of interest that span the entire organization
5. Empower squad autonomy for decisions on tools, processes, and technical approach while aligning on tribe-level goals

<details><summary>中文步骤</summary>

1. 组建小型跨职能小队（6-8 人），每个小队负责特定的使命或产品领域
2. 将相关小队归入部落（≤100 人），共享相同的业务领域
3. 在部落内建立分会，按职能分组（如后端、QA），用于技能发展和直线管理
4. 创建公会，作为跨组织的自愿兴趣社区
5. 赋予小队在工具、流程和技术方案上的自主决策权，同时在部落层面保持目标对齐

</details>

## Do

- Adapt the model to your organization's culture rather than copying it verbatim from the whitepaper
- Invest in strong chapter leads who balance people management with technical excellence across squads
- Define clear squad missions and measurable outcomes to prevent squads from becoming siloed feature factories
- Use guilds actively to share practices, not just as inactive Slack channels

## Don't

- Don't cargo-cult the Spotify model — even Spotify itself admitted the paper described an aspiration, not reality
- Don't create squads without clear missions, because autonomy without purpose leads to fragmentation
- Don't neglect cross-squad coordination — tribal alignment mechanisms are as important as squad autonomy
- Don't assume the model works at all scales — organizations under 30 engineers rarely need this complexity

## Case Study

**ING Bank**: ING Bank Netherlands underwent a massive agile transformation in 2015 inspired by the Spotify model. They reorganized 3,500 employees into roughly 350 squads grouped into 13 tribes, eliminating traditional department boundaries. Within two years, ING reported a 30% improvement in time-to-market for new features, though they publicly acknowledged needing to adapt the model significantly — adding product owners per tribe and stronger cross-tribe dependency management that the original Spotify whitepaper did not address.

## Related Frameworks

- team-topologies (alternative)
- conways-law (prerequisite)
- amazon-two-pizza-teams (alternative)
- inverse-conway-maneuver (related)

## Source

https://sdframe.caldis.me/frameworks/spotify-model
