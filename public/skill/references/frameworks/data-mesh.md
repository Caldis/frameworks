# Data Mesh / 数据网格

- **Category**: data
- **Complexity**: advanced
- **Quality**: scalability, maintainability
- **Abstraction**: organization
- **Maturity**: emerging
- **Author**: Zhamak Dehghani, 2019
- **Adopters**: Zalando, JPMorgan Chase, Netflix, Intuit, ThoughtWorks

Domain-oriented decentralized data ownership and architecture

_面向领域的去中心化数据所有权与架构_

## When to Use

Apply this framework when:
- When a centralized data team has become a bottleneck for multiple business domains
- When domain teams need autonomous control over their analytical and operational data
- When organizational scale demands distributed ownership matching Conway's Law
- When data quality suffers because producers are disconnected from consumers

## When NOT to Use

Stop and reconsider if:
- Small organizations with a single domain where centralized data management is simpler and sufficient
- Early-stage startups that lack the organizational maturity to sustain distributed data ownership
- When data volumes and team count are small enough that a central data team is not a bottleneck
- Highly regulated environments where centralized control is legally mandated

## Core Concepts

- Domain ownership: data is owned and served by the domain that produces it, not by a central data team
- Data as a product: each dataset is treated as a product with discoverability, quality, SLOs, and documentation
- Self-serve data platform: a shared infrastructure layer that enables domain teams to build and publish data products without deep infrastructure expertise
- Federated computational governance: global policies enforced through automation and platform capabilities rather than centralized gatekeepers

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Data Mesh to?
- What constraints or existing architecture do you need to work within?
- Has your team used Data Mesh before? (This is an advanced framework)

## Implementation Steps

1. Decompose monolithic data platforms by identifying domain boundaries and assigning data ownership to the teams closest to the business context
2. **Treat data as a product**: each domain team publishes discoverable, documented, and quality-assured data products with SLOs
3. Build a self-serve data infrastructure platform that abstracts away storage, processing, and governance complexity for domain teams
4. Implement federated computational governance by codifying global interoperability standards, security policies, and compliance rules as platform capabilities
5. Establish a data product catalog and mesh-wide observability so consumers can discover, trust, and compose data products across domains

<details><summary>中文步骤</summary>

1. 通过识别领域边界将单体数据平台解耦，将数据所有权分配给最接近业务上下文的团队
2. 将数据视为产品：每个领域团队发布可发现、有文档、有质量保障且带SLO的数据产品
3. 构建自助式数据基础设施平台，为领域团队抽象存储、处理和治理的复杂性
4. 实施联邦式计算治理，将全局互操作标准、安全策略和合规规则编码为平台能力
5. 建立数据产品目录和网格范围的可观测性，使消费者能够跨领域发现、信任和组合数据产品

</details>

## Do

- Do align data product boundaries with business domain boundaries because misalignment creates confusion about ownership
- Do invest in a self-serve platform before asking domains to own their data because without it domain teams will drown in infrastructure complexity
- Do define global interoperability standards (schemas, SLOs, metadata) because mesh-wide discoverability depends on consistency
- Do start with a single domain pilot before scaling because mesh adoption requires organizational learning

## Don't

- Don't simply rename existing data lake tables as 'data products' because data mesh requires genuine domain ownership and product thinking
- Don't skip governance because decentralization without standards leads to data chaos and duplication
- Don't force every team to adopt mesh simultaneously because a phased rollout reduces organizational resistance
- Don't neglect cross-domain data quality contracts because consumers need trust guarantees across boundaries

## Case Study

**Zalando**: Zalando adopted Data Mesh to decentralize its analytics infrastructure across 200+ autonomous product teams. Each team publishes data products through a self-serve platform built on AWS and Apache Kafka. This eliminated the central data team bottleneck and reduced the average time to deliver a new analytical dataset from weeks to days.

## Related Frameworks

- domain-driven-design (complement)
- microservices-decomposition (complement)
- team-topologies (complement)
- polyglot-persistence (complement)

## Source

https://sdframe.caldis.me/frameworks/data-mesh
