# Microservices Decomposition Patterns / 微服务分解模式

- **Category**: architecture
- **Complexity**: advanced
- **Quality**: scalability, maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: James Lewis and Martin Fowler, 2014, 2011
- **Adopters**: Netflix, Amazon, Uber, Spotify, SoundCloud

Strategies to split monoliths into focused, independent services

_将单体应用拆分为职责明确的独立服务的策略集合_

## When to Use

Apply this framework when:
- When a monolith's deployment frequency is bottlenecked by team coordination overhead
- When different parts of the system have vastly different scaling requirements
- When teams need to independently develop, deploy, and scale their owned services
- When migrating gradually from a legacy monolith using the Strangler Fig approach

## When NOT to Use

Stop and reconsider if:
- Early-stage startups where the domain model is still being discovered and boundaries will shift
- Small teams (fewer than 8 developers) where microservices overhead exceeds coordination benefits
- Systems with very tight latency requirements where inter-service network calls add unacceptable delay

## Core Concepts

- Decompose by Business Capability: Align service boundaries with what the business does (e.g., payments, inventory)
- Decompose by Subdomain: Use DDD bounded contexts to find natural service boundaries
- Strangler Fig Pattern: Incrementally replace monolith functionality by routing traffic to new services
- Database per Service: Each microservice owns its data store to ensure loose coupling
- API Gateway: A single entry point that routes, aggregates, and translates client requests to internal services

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Microservices Decomposition Patterns to?
- What constraints or existing architecture do you need to work within?
- Has your team used Microservices Decomposition Patterns before? (This is an advanced framework)

## Implementation Steps

1. Analyze the monolith using domain analysis or dependency graphs to identify natural seams and hot spots
2. **Apply decomposition strategy**: Decompose by Business Capability, Subdomain, or Strangler Fig for incremental migration
3. Define service APIs and contracts first (API-first), then extract service logic and its data store
4. **Implement inter-service communication**: synchronous REST/gRPC or asynchronous messaging based on coupling tolerance
5. Validate each extracted service with independent deployment, monitoring, and rollback before continuing extraction

<details><summary>中文步骤</summary>

1. 使用领域分析或依赖关系图分析单体应用，识别自然接缝和热点
2. 应用分解策略：按业务能力、子域或绞杀者模式进行增量迁移
3. 先定义服务API和契约（API优先），再提取服务逻辑及其数据存储
4. 根据耦合容忍度选择服务间通信方式：同步REST/gRPC或异步消息
5. 对每个提取的服务进行独立部署、监控和回滚验证，再继续后续提取

</details>

## Do

- Do start with a well-structured modular monolith before decomposing because clear boundaries make extraction easier
- Do define service boundaries using domain-driven design because business alignment prevents arbitrary splits
- Do automate deployment pipelines for each service because manual deployment negates microservices benefits
- Do implement contract testing between services because integration breakage is the top microservices risk

## Don't

- Don't decompose a monolith you don't understand because you'll replicate its problems in distributed form
- Don't create nano-services by splitting too finely because excessive network calls destroy performance
- Don't share databases between services because it creates hidden coupling that defeats service independence
- Don't skip investing in observability because debugging distributed systems without tracing is nearly impossible

## Case Study

**Netflix**: Netflix migrated from a monolithic Java application to over 700 microservices between 2011 and 2016. The migration used the Strangler Fig pattern, gradually replacing monolith endpoints with new services. Each service owned its data and communicated via REST and asynchronous messaging. This transformation enabled Netflix to deploy hundreds of times per day, scale individual services based on demand, and achieve 99.99% availability for its streaming platform serving 200+ million subscribers.

## Related Frameworks

- domain-driven-design (prerequisite)
- eda (complement)
- service-mesh-pattern (extends)
- strangler-fig-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/microservices-decomposition
