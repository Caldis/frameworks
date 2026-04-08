# Developer Portal (Backstage) / 开发者门户（Backstage）

- **Category**: observability
- **Complexity**: advanced
- **Quality**: usability, observability, maintainability
- **Abstraction**: organization
- **Maturity**: emerging
- **Author**: Spotify (Stefan Ålund, Niklas Ek), 2020, 2016
- **Adopters**: Spotify, Netflix, Expedia, HP, IKEA

Centralized developer experience platform unifying service catalog, docs, and tooling

_统一服务目录、文档和工具链的集中式开发者体验平台_

## When to Use

Apply this framework when:
- Organizations with 50+ services where developers spend significant time finding information about other teams' services
- Engineering teams where onboarding a new developer takes weeks because tooling, docs, and service ownership are scattered
- Platform engineering teams building an internal developer platform and needing a unified frontend layer
- Companies standardizing service creation through golden-path templates to enforce best practices without manual review

## When NOT to Use

Stop and reconsider if:
- Small teams (fewer than 20 developers) where everyone already knows all the services and a portal adds unnecessary infrastructure
- Organizations with fewer than 10 services where a simple wiki or README provides sufficient service documentation
- Teams without dedicated platform engineering capacity to maintain and evolve the portal as a product
- Companies where all development happens in a single monorepo with excellent code search (the repo itself serves as the catalog)

## Core Concepts

- Software Catalog: A centralized registry of all software components (services, libraries, pipelines, websites) with ownership, lifecycle, and dependency metadata that answers 'who owns this and what depends on it'
- Golden Path Templates: Scaffolding templates that generate new services pre-configured with CI/CD, monitoring, logging, and security best practices, reducing setup from days to minutes
- Plugin Architecture: An extensible system where teams contribute plugins for their tools (Kubernetes, Grafana, PagerDuty, GitHub), creating a composable developer experience
- TechDocs: Documentation-as-code rendered directly in the portal alongside the service it describes, eliminating the 'where are the docs' problem
- Scorecards: Automated assessments that track each service's compliance with engineering standards (has SLOs, has runbooks, tests pass, docs updated) and surface gaps

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Developer Portal (Backstage) to?
- What constraints or existing architecture do you need to work within?
- Has your team used Developer Portal (Backstage) before? (This is an advanced framework)

## Implementation Steps

1. Deploy Backstage as the single entry point for developer tooling: set up the core platform with authentication, plugin architecture, and organizational branding
2. **Build the software catalog**: register every service, library, and data pipeline with ownership metadata, lifecycle stage, and dependency information
3. **Integrate existing tools via plugins**: connect CI/CD (GitHub Actions, Jenkins), observability (Grafana, PagerDuty), cloud resources (Kubernetes, AWS), and documentation (TechDocs)
4. **Create software templates**: build golden-path templates for new services, libraries, and pipelines that embed organizational standards from day one
5. **Measure developer experience**: track portal adoption metrics (active users, template usage, time-to-first-deploy for new services) and iterate based on developer feedback

<details><summary>中文步骤</summary>

1. 将Backstage部署为开发者工具的单一入口：搭建核心平台，配置认证、插件架构和组织品牌
2. 构建软件目录：注册每个服务、库和数据管道，包含所有权元数据、生命周期阶段和依赖信息
3. 通过插件集成现有工具：连接CI/CD（GitHub Actions、Jenkins）、可观测性（Grafana、PagerDuty）、云资源（Kubernetes、AWS）和文档（TechDocs）
4. 创建软件模板：为新服务、库和管道构建「黄金路径」模板，从第一天起嵌入组织标准
5. 度量开发者体验：追踪门户采用指标（活跃用户、模板使用率、新服务首次部署时间），并根据开发者反馈迭代

</details>

## Do

- Do start with the software catalog as the foundation, because knowing what exists and who owns it is the prerequisite for all other developer experience improvements
- Do invest in golden-path templates that embed your organization's standards, because templates scale best practices without requiring enforcement through review
- Do measure developer experience quantitatively (time-to-first-deploy, onboarding time, search success rate) because feelings-based DX assessment doesn't drive improvement
- Do treat the portal as a product with a dedicated team, because an unmaintained developer portal becomes another abandoned internal tool within 6 months

## Don't

- Don't build a portal without solving the service catalog problem first, because a pretty frontend over scattered, inaccurate data is worse than no portal
- Don't mandate portal adoption without providing compelling value first, because forced migration without clear benefits breeds resentment and workarounds
- Don't try to build everything custom -- start with Backstage's plugin ecosystem, because the community has already solved most common integration challenges
- Don't let the software catalog become stale -- automate catalog registration from CI/CD and enforce ownership metadata as a deployment gate

## Case Study

**Spotify**: Spotify built Backstage to solve their developer experience crisis: with 2,000+ microservices owned by 200+ teams, developers were spending up to 60% of their cognitive load just finding the right information, dashboards, and documentation. After deploying Backstage with a comprehensive software catalog and golden-path templates, they reduced new service setup time from 3 days to 15 minutes and cut onboarding time for new engineers by 55%. The internal TechDocs integration ensured documentation lived alongside code and stayed current. Spotify's decision to open-source Backstage in 2020 made it the de facto standard for internal developer portals across the industry.

## Related Frameworks

- documentation-as-code (complement)
- dora-metrics (complement)
- opentelemetry (complement)
- slo-as-practice (complement)

## Source

https://sdframe.caldis.me/frameworks/developer-portal-backstage
