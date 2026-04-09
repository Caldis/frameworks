# Hexagonal Architecture / 六边形架构

- **Category**: coding
- **Complexity**: advanced
- **Quality**: testability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Alistair Cockburn, 2005
- **Adopters**: Netflix, Spotify, Mercado Libre, BBVA, Thoughtworks

Isolate core logic from external concerns via ports and adapters

_通过端口与适配器将核心逻辑与外部关注点隔离_

## When to Use

Apply this framework when:
- Building applications that need to support multiple delivery mechanisms (REST, CLI, gRPC, messaging)
- Systems where infrastructure decisions (database, cloud provider) may change over time
- Projects requiring high testability with fast unit tests that don't need infrastructure
- Teams adopting DDD where domain isolation from infrastructure is a priority

## When NOT to Use

Stop and reconsider if:
- Trivial applications with a single database and one delivery mechanism
- Serverless functions where each function is a single-purpose handler with minimal logic
- Teams that lack experience with dependency injection and interface-based design
- Performance-critical systems where the port/adapter indirection introduces unacceptable latency

## Core Concepts

- Domain Core: the innermost layer containing pure business logic with zero external dependencies
- Ports: interfaces that define how the outside world interacts with the domain (inbound) and how the domain reaches external systems (outbound)
- Adapters: concrete implementations that plug into ports, translating between external technology and domain contracts
- Composition Root: the single place (typically application startup) where all ports are wired to their adapters via dependency injection
- Dependency Rule: dependencies always point inward — adapters depend on ports, never the reverse

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Hexagonal Architecture to?
- What constraints or existing architecture do you need to work within?
- Has your team used Hexagonal Architecture before? (This is an advanced framework)

## Implementation Steps

1. **Define the Domain Core**: implement pure business logic with no dependencies on frameworks, databases, or external services
2. **Design Ports**: create inbound ports (use case interfaces the outside world calls) and outbound ports (interfaces the domain needs from the outside)
3. **Implement Adapters**: build concrete adapters for each port — REST controllers for inbound, repository implementations for outbound
4. **Wire at the Composition Root**: connect adapters to ports via dependency injection at application startup, keeping the domain ignorant of infrastructure
5. **Test at each layer**: unit-test the domain through ports with in-memory adapters; integration-test adapters against real infrastructure

<details><summary>中文步骤</summary>

1. 定义领域核心：实现不依赖框架、数据库或外部服务的纯业务逻辑
2. 设计端口：创建入站端口（外部世界调用的用例接口）和出站端口（领域需要的外部接口）
3. 实现适配器：为每个端口构建具体适配器——入站用REST控制器，出站用仓储实现
4. 在组合根装配：在应用启动时通过依赖注入连接适配器与端口，保持领域对基础设施无感知
5. 分层测试：通过端口使用内存适配器对领域进行单元测试；对适配器进行集成测试

</details>

## Do

- Do define ports as interfaces in the domain layer because they represent domain needs, not infrastructure capabilities
- Do keep the domain core free of framework annotations because annotations create hidden dependencies
- Do create separate adapter modules for each external system because it isolates change impact
- Do write domain tests using in-memory adapters because they run in milliseconds and catch logic bugs

## Don't

- Don't let domain objects import infrastructure packages because it violates the dependency rule
- Don't create one mega-adapter that handles multiple external systems because it defeats the purpose of isolation
- Don't skip the port abstraction by having domain code call adapters directly because it reintroduces coupling
- Don't over-architect simple CRUD endpoints with hexagonal layers because the indirection adds no value

## Case Study

**Netflix**: Netflix adopted hexagonal architecture for its content encoding pipeline. The domain core handles transcoding decisions and quality rules, while adapters connect to different cloud storage backends (S3, Google Cloud Storage) and encoding engines. When Netflix migrated parts of its infrastructure, only adapters changed — the core encoding logic remained untouched, saving months of re-testing.

## Related Frameworks

- solid-principles (prerequisite)
- dependency-injection (complement)
- ddd-tactical-patterns (complement)
- clean-code-principles (complement)
- clean-architecture (alternative)
- onion-architecture (alternative)
- n-tier-layered (alternative)
- ports-and-adapters (alternative)

## Source

https://sdframe.caldis.me/frameworks/hexagonal-architecture
