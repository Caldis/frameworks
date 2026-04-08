# Consumer-Driven Contracts / 消费者驱动契约

- **Category**: api
- **Complexity**: intermediate
- **Quality**: testability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Ian Robinson, 2006; tooling popularized by Pact (2013, DiUS/Beth Skurrie)
- **Adopters**: Atlassian, ING Bank, DiUS, Spotify, REA Group

API testing approach where consumers define the expectations providers must satisfy

_消费者定义期望、提供者必须满足的API测试方法_

## When to Use

Apply this framework when:
- When multiple independent teams build services that depend on each other's APIs and need confidence in compatibility
- When integration tests are too slow, brittle, or expensive to run against live downstream services
- When deploying microservices independently requires assurance that API changes won't break existing consumers
- When evolving a shared API that serves many consumers, each with different usage patterns

## When NOT to Use

Stop and reconsider if:
- Monolithic applications where all components are deployed together and internal API compatibility is guaranteed by the build
- Rapidly prototyping a new service where the API surface is changing daily and contracts would need constant rewriting
- When there is only one consumer per provider, making direct integration tests simpler and equally effective
- Third-party APIs where you have no influence over the provider's implementation and cannot share contracts

## Core Concepts

- Consumer Contracts: Each consumer defines a lightweight test that captures exactly what it needs from the provider — no more, no less
- Provider Verification: The provider runs all consumer contracts as tests against its own codebase, ensuring it satisfies every consumer's expectations
- Contract Broker: A shared registry (e.g., Pact Broker) stores and versions contracts, enabling providers to discover consumer expectations without direct communication
- Can-I-Deploy: An automated check in CI/CD that verifies whether a specific version of a service is compatible with all its consumers before deployment
- Postel's Law in Practice: Providers are liberal in what they accept and conservative in what they produce, guided by actual consumer usage rather than assumed usage

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Consumer-Driven Contracts to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Each consumer team writes contract tests that specify the exact requests they send and the response shape they expect from the provider
2. Contracts are published to a shared broker (e.g., Pact Broker) where providers can discover all consumer expectations
3. The provider team runs all published consumer contracts against their implementation to verify compatibility
4. When contract verification fails, the provider team and affected consumer team collaborate to resolve the incompatibility before deployment
5. Integrate contract verification into CI/CD pipelines so that breaking changes are caught before they reach production

<details><summary>中文步骤</summary>

1. 每个消费者团队编写契约测试，指定其发送的确切请求和期望从提供者获得的响应结构
2. 契约发布到共享代理（如Pact Broker），提供者可在此发现所有消费者期望
3. 提供者团队针对其实现运行所有已发布的消费者契约以验证兼容性
4. 当契约验证失败时，提供者团队与受影响的消费者团队协作，在部署前解决不兼容问题
5. 将契约验证集成到CI/CD流水线中，确保在到达生产环境之前捕获破坏性变更

</details>

## Do

- Do write contracts from the consumer's perspective, specifying only what the consumer actually uses, because over-specifying creates false coupling
- Do integrate contract verification into both consumer and provider CI pipelines because manual verification is error-prone and unsustainable
- Do version contracts and use the can-i-deploy check before every deployment because it prevents incompatible services from reaching production
- Do start with the most critical service boundaries because retrofitting contracts everywhere at once is overwhelming

## Don't

- Don't let consumers over-specify contracts by asserting on fields they don't use because it creates brittle tests that break on benign provider changes
- Don't use consumer-driven contracts as a replacement for end-to-end integration tests because they verify interface compatibility, not business workflow correctness
- Don't ignore contract test failures in CI because a green build with failing contracts means broken consumers in production
- Don't let contracts become stale by failing to update them when consumer behavior changes because outdated contracts provide false confidence

## Case Study

**Atlassian**: Atlassian adopted Pact-based consumer-driven contracts across its microservices powering Jira and Confluence. With over 200 services and dozens of teams, integration testing had become a multi-hour bottleneck in their CI pipeline. By shifting to consumer-driven contracts, each service could verify API compatibility in under 2 minutes without standing up dependent services. This reduced their integration test feedback cycle from hours to minutes and eliminated 70% of integration-related production incidents.

## Related Frameworks

- openapi-specification (complement)
- api-gateway-pattern (complement)
- grpc-protocol-buffers (complement)

## Source

https://sdframe.caldis.me/frameworks/consumer-driven-contracts
