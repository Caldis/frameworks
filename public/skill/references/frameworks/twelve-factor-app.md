# Twelve-Factor App / 十二要素应用

- **Category**: deployment
- **Complexity**: intermediate
- **Quality**: scalability, portability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Adam Wiggins / Heroku, 2011
- **Adopters**: Heroku (Salesforce), Netflix, Spotify, Shopify, Airbnb

12 principles for building scalable, maintainable cloud services

_构建可扩展、可维护云服务的12条原则_

## When to Use

Apply this framework when:
- Building new cloud-native applications or SaaS services that will run on PaaS or container platforms
- Modernizing legacy monoliths to prepare them for containerization and cloud deployment
- Evaluating application architecture readiness for horizontal scaling and multi-environment deployment
- Onboarding new developers to cloud-native best practices with a concise, memorable checklist

## When NOT to Use

Stop and reconsider if:
- Desktop or mobile applications that inherently require local state and filesystem access
- High-performance computing or GPU-bound workloads where statelessness conflicts with long-running computation
- Legacy enterprise applications with deep dependencies on specific OS features or middleware
- Embedded systems or IoT devices where environment variables and attached backing services are impractical

## Core Concepts

- Codebase: One codebase tracked in version control, with many deploys to different environments from the same artifact
- Config in Environment: Store configuration that varies between environments in environment variables, strictly separated from code
- Backing Services as Attached Resources: Treat databases, message queues, and caches as pluggable resources swappable without code changes
- Stateless Processes: Application processes should be stateless and share-nothing, storing persistent data in backing services
- Dev/Prod Parity: Keep development, staging, and production environments as similar as possible to reduce deployment surprises

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Twelve-Factor App to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Audit the codebase**: one codebase in version control, with all dependencies explicitly declared and isolated
2. Externalize all configuration into environment variables; never commit secrets or environment-specific config to code
3. Treat backing services (databases, queues, caches) as attached resources swappable via config
4. Enforce strict separation of build, release, and run stages; build once, deploy the artifact to many environments
5. Design for disposability and horizontal scale: stateless processes, fast startup, graceful shutdown, dev/prod parity

<details><summary>中文步骤</summary>

1. 审计代码库：单一代码库纳入版本控制，所有依赖显式声明并隔离
2. 将所有配置外部化为环境变量；不将密钥或环境特定配置提交到代码
3. 将后端服务（数据库、队列、缓存）视为可通过配置替换的附加资源
4. 严格分离构建、发布和运行阶段；一次构建，将制品部署到多个环境
5. 为可处置性和水平扩展而设计：无状态进程、快速启动、优雅关闭、开发与生产环境对等

</details>

## Do

- Do explicitly declare and isolate all dependencies, because implicit dependencies cause deployment failures across environments
- Do use environment variables for all environment-specific configuration, because this enables the same build artifact to deploy anywhere
- Do design processes to be stateless and disposable with fast startup, because this enables horizontal scaling
- Do treat logs as event streams written to stdout, because centralized log aggregation works best without self-managed log files

## Don't

- Don't store state in local filesystem or in-memory between requests, because horizontal scaling will lose that data
- Don't embed environment-specific configuration in source code, because this prevents deploying the same artifact to multiple environments
- Don't create long-running background workers tightly coupled to the web process, because they should scale independently
- Don't rely on sticky sessions at the load balancer level, because this couples users to specific instances and prevents true statelessness

## Case Study

**Heroku**: Heroku itself is the canonical case study, having developed the Twelve-Factor methodology from observing patterns across hundreds of thousands of applications deployed on their platform. Applications that adhered to twelve-factor principles consistently achieved higher uptime, faster scaling response, and easier debugging. The methodology became the intellectual foundation for an entire generation of PaaS and container platforms.

## Related Frameworks

- infrastructure-as-code (complement)
- gitops (complement)
- calms-framework (complement)

## Source

https://sdframe.caldis.me/frameworks/twelve-factor-app
