# Platform as a Product / 平台即产品

- **Category**: deployment
- **Complexity**: advanced
- **Quality**: usability, maintainability
- **Abstraction**: organization
- **Maturity**: emerging
- **Author**: Evan Bottcher (ThoughtWorks), 2018; expanded by Team Topologies (Skelton & Pais, 2019)
- **Adopters**: Spotify, Zalando, Mercedes-Benz, DoorDash, Humanitec

Treat internal platforms like products with users and roadmaps

_将内部平台视为拥有用户和路线图的产品来运营_

## When to Use

Apply this framework when:
- Organizations with more than 5-10 product teams that share common infrastructure and tooling needs
- Environments where developer productivity is bottlenecked by inconsistent or manual infrastructure provisioning
- Companies transitioning from project-based IT to product-based engineering teams
- Enterprises where cognitive load on stream-aligned teams is unsustainably high due to infrastructure complexity

## When NOT to Use

Stop and reconsider if:
- Small organizations with fewer than 5 teams where the overhead of a dedicated platform team is unjustified
- Early-stage startups where speed of product iteration matters more than developer experience standardization
- Organizations where all teams use identical, simple tech stacks that don't benefit from platform abstraction
- Environments where executive sponsorship for long-term platform investment is absent

## Core Concepts

- Thinnest Viable Platform: Build the smallest platform that accelerates teams, avoiding the trap of over-engineering a platform nobody asked for
- Golden Paths: Opinionated, well-supported default workflows that handle 80% of use cases, with escape hatches for the remaining 20%
- Developer as Customer: Apply product management practices — user research, satisfaction metrics, roadmapping — to internal platform development
- Platform Team as Enabling Team: The platform team's success is measured by the productivity and autonomy of the teams it serves, not by its own output

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Platform as a Product to?
- What constraints or existing architecture do you need to work within?
- Has your team used Platform as a Product before? (This is an advanced framework)

## Implementation Steps

1. Identify internal developers as the platform's primary customers and conduct user research
2. Define a product vision and roadmap for the platform based on developer pain points and organizational goals
3. Build self-service capabilities with golden paths, documentation, and developer portals
4. Measure platform adoption, developer satisfaction (DevEx surveys), and time-to-production as key metrics
5. Iterate on the platform based on feedback loops, treating feature requests like a product backlog

<details><summary>中文步骤</summary>

1. 将内部开发者视为平台的主要客户并进行用户研究
2. 基于开发者痛点和组织目标为平台制定产品愿景和路线图
3. 构建自助服务能力，包含最佳路径、文档和开发者门户
4. 将平台采用率、开发者满意度（DevEx 调查）和上线时间作为关键指标
5. 基于反馈循环迭代平台，将功能请求作为产品待办事项管理

</details>

## Do

- Conduct regular developer satisfaction surveys and use NPS/CSAT to track platform health
- Start with a thin platform that solves one or two critical pain points and expand based on demand
- Publish a public roadmap and changelog so consuming teams can plan around platform changes
- Staff the platform team with product management and UX skills, not just infrastructure engineers

## Don't

- Don't mandate platform adoption — if the platform is good, teams will choose it; forced adoption breeds resentment
- Don't build the platform in isolation from its users — co-create with embedded stream-aligned team members
- Don't measure platform success by features shipped — measure it by developer productivity and satisfaction
- Don't let the platform become a bottleneck — if teams have to file tickets and wait, you've built a service desk, not a platform

## Case Study

**Spotify**: Spotify built Backstage as an internal developer portal to treat their platform as a product. By 2020, Backstage unified over 100 internal tools behind a single interface with a plugin architecture. Developers could provision infrastructure, view service health, and access documentation from one place. Spotify open-sourced Backstage in 2020, and it was accepted into the CNCF in 2022, becoming the de facto standard for developer portals across the industry.

## Related Frameworks

- team-topologies (complement)
- developer-experience-framework (complement)
- infrastructure-as-code (complement)
- gitops (complement)

## Source

https://sdframe.caldis.me/frameworks/platform-as-a-product
