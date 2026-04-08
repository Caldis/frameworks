# Contract Testing / 契约测试

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: reliability, testability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Ian Robinson, Martin Fowler, 2006
- **Adopters**: Atlassian, REA Group, ING Bank, Booking.com, SEEK

Verify service interactions via shared consumer-provider contracts

_通过共享的消费者-提供者契约验证服务间交互的正确性_

## When to Use

Apply this framework when:
- Microservice architectures where services are deployed independently by different teams
- API evolution scenarios where providers need confidence they won't break existing consumers
- Replacing slow end-to-end integration tests with fast, focused contract verification
- Organizations adopting consumer-driven development where consumers define the API they need

## When NOT to Use

Stop and reconsider if:
- Monolithic applications where all components are deployed together
- Simple two-service architectures where a shared integration test is sufficient
- Teams without CI/CD pipelines to automate contract verification
- Prototyping phases where APIs change rapidly and contracts would be constantly broken

## Core Concepts

- Consumer Contract: a test written by the consumer that specifies the exact request/response it expects from a provider
- Provider Verification: running consumer contracts against the real provider to ensure it meets all expectations
- Pact Broker: a central repository that stores contracts and tracks compatibility between consumer and provider versions
- Can-I-Deploy: a pre-deployment check that verifies all interacting service versions are compatible based on verified contracts
- Consumer-Driven: the philosophy that consumers define the API contract, and providers must satisfy those needs

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Contract Testing to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define consumer expectations**: in each consumer service, write contract tests that describe the exact requests it makes and responses it expects
2. **Publish contracts to a broker**: use a tool like Pact or Spring Cloud Contract to share consumer contracts with the provider team via a central broker
3. **Verify on the provider side**: run the published contracts against the actual provider implementation to confirm it satisfies all consumer expectations
4. **Integrate into CI/CD**: run contract verification on both consumer and provider pipelines; block deployment if contracts are broken
5. **Evolve contracts safely**: use the broker's compatibility matrix (can-i-deploy) to verify that all deployed versions are mutually compatible before release

<details><summary>中文步骤</summary>

1. 定义消费者期望：在每个消费者服务中编写契约测试，描述其发出的精确请求和期望的响应
2. 将契约发布到代理：使用Pact或Spring Cloud Contract等工具通过中央代理与提供者团队共享消费者契约
3. 在提供者端验证：针对提供者的实际实现运行已发布的契约，确认其满足所有消费者期望
4. 集成到CI/CD：在消费者和提供者的流水线中运行契约验证；契约被破坏时阻止部署
5. 安全演进契约：使用代理的兼容性矩阵（can-i-deploy）在发布前验证所有已部署版本的互兼容性

</details>

## Do

- Do write contracts from the consumer's perspective because they define the actual usage patterns
- Do run provider verification in CI because manual verification is unreliable and easy to skip
- Do use the can-i-deploy check before every deployment because it prevents incompatible versions from reaching production
- Do keep contracts minimal and focused because over-specified contracts become brittle

## Don't

- Don't test implementation details in contracts because contracts should verify behavior, not internal structure
- Don't skip the Pact Broker because without it you lose version tracking and the can-i-deploy safety net
- Don't treat contract tests as a replacement for all integration tests because they verify interactions, not end-to-end flows
- Don't let provider teams write consumer contracts because it defeats the consumer-driven purpose

## Case Study

**Atlassian**: Atlassian adopted Pact-based contract testing across their microservice ecosystem powering Jira, Confluence, and Bitbucket. With over 800 microservices, end-to-end integration testing was too slow and flaky. Contract testing reduced their integration test suite runtime from hours to minutes and cut production API compatibility incidents by 70%. The Pact Broker's can-i-deploy feature became a mandatory gate in their deployment pipeline.

## Related Frameworks

- semantic-versioning (complement)
- api-versioning-strategies (complement)
- richardson-maturity-model (complement)
- design-by-contract (extends)

## Source

https://sdframe.caldis.me/frameworks/contract-testing
