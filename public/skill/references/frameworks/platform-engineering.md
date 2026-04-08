# Platform Engineering / 平台工程

- **Category**: team
- **Complexity**: advanced
- **Quality**: maintainability, usability, scalability
- **Abstraction**: organization
- **Maturity**: emerging
- **Author**: Evan Bottcher (ThoughtWorks), ~2018; formalized in Team Topologies (Skelton & Pais, 2019)
- **Adopters**: Spotify, Netflix, Zalando, Mercado Libre, Deutsche Telekom

Build and operate an internal developer platform as a product, enabling stream-aligned teams to self-serve infrastructure and tooling

_将内部开发者平台作为产品来构建和运营，使面向价值流的团队能够自助使用基础设施和工具_

## When to Use

Apply this framework when:
- Organizations where each team spends significant time on undifferentiated infrastructure work
- Scaling beyond 10 stream-aligned teams that all need consistent CI/CD, monitoring, and deployment
- Reducing cognitive load on product teams by abstracting away Kubernetes, cloud, and networking complexity
- Accelerating onboarding so new engineers can deploy to production within their first week

## When NOT to Use

Stop and reconsider if:
- Organizations with fewer than 5 engineering teams — the overhead of a dedicated platform team is not justified
- Early-stage startups where infrastructure needs are simple and a PaaS like Heroku or Vercel suffices
- Environments where teams have radically different technology stacks that resist standardization
- Organizations that lack executive support for sustained investment in internal tooling

## Core Concepts

- Platform as a Product: The internal platform is built with product management rigor — user research, roadmaps, SLOs, and feedback loops — not just as an infrastructure project
- Golden Paths: Opinionated, well-supported default workflows that cover 80% of use cases, while still allowing teams to go off-path when needed
- Self-Service: Developers provision environments, deploy services, and access logs through APIs and portals without filing tickets or waiting for ops teams
- Thin Platform: The platform abstracts complexity but does not hide it entirely — developers can still inspect and understand the underlying infrastructure when debugging
- Cognitive Load Reduction: The primary metric of platform success is how much mental overhead it removes from stream-aligned teams, as defined in Team Topologies

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Platform Engineering to?
- What constraints or existing architecture do you need to work within?
- Has your team used Platform Engineering before? (This is an advanced framework)

## Implementation Steps

1. Identify the most common developer pain points: slow environment setup, deployment friction, observability gaps
2. Form a dedicated platform team that treats internal developers as their customers
3. Build a thin, self-service platform layer (golden paths) that abstracts infrastructure complexity
4. Measure platform success through adoption rates, developer satisfaction, and time-to-first-deploy for new services
5. Iterate on platform capabilities based on continuous user research with stream-aligned teams

<details><summary>中文步骤</summary>

1. 识别最常见的开发者痛点：环境搭建缓慢、部署摩擦、可观测性缺口
2. 组建专门的平台团队，将内部开发者视为客户
3. 构建轻量、自助的平台层（黄金路径），抽象基础设施复杂性
4. 通过采纳率、开发者满意度和新服务首次部署时间衡量平台成效
5. 基于对面向价值流团队的持续用户调研，迭代平台能力

</details>

## Do

- Treat internal developers as real customers: conduct user interviews, track NPS, and maintain a public roadmap
- Start with the highest-friction developer workflow and build the first golden path there
- Provide an escape hatch — let teams customize or bypass the platform when their use case genuinely requires it
- Staff the platform team with experienced engineers who understand both infrastructure and developer workflows

## Don't

- Don't build a 'ticket ops' platform where developers still need to file requests and wait — that is not self-service
- Don't mandate platform adoption through policy instead of value — teams should choose the platform because it is genuinely better
- Don't over-abstract: a platform that hides too much makes debugging impossible and frustrates experienced engineers
- Don't treat the platform as a one-time project — it requires continuous product investment like any customer-facing product

## Case Study

**Spotify**: Spotify built Backstage, an open-source internal developer portal, starting in 2016 to solve the problem of fragmented tooling across 300+ engineering teams. Backstage provides a unified service catalog, software templates, and plugin architecture that standardizes how teams create, discover, and manage services. By 2020, Spotify reported that new engineers could deploy to production in their first week (previously it took over a month). They open-sourced Backstage in 2020, and it became a CNCF Incubating project in 2022, adopted by hundreds of organizations worldwide.

## Related Frameworks

- team-topologies (complement)
- inner-source (complement)
- developer-experience-framework (complement)
- amazon-two-pizza-teams (complement)

## Source

https://sdframe.caldis.me/frameworks/platform-engineering
