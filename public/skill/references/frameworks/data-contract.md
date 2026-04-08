# Data Contract / 数据契约

- **Category**: data
- **Complexity**: intermediate
- **Quality**: reliability, maintainability, testability
- **Abstraction**: organization
- **Maturity**: emerging
- **Author**: Andrew Jones, 2019
- **Adopters**: PayPal, Spotify, JPMC, Airbnb, Mercado Libre, ING Bank

Formal, versioned agreements between data producers and consumers that specify schema, quality expectations, SLAs, and ownership, treating data as a product with explicit interface guarantees.

_数据生产者和消费者之间的正式、版本化协议，规定模式、质量期望、SLA和所有权，将数据视为具有明确接口保证的产品。_

## When to Use

Apply this framework when:
- When data consumers (ML teams, analytics, downstream services) are repeatedly disrupted by silent schema changes or data quality regressions from upstream producer teams
- When implementing a data mesh architecture where domain teams publish data products and need explicit interface contracts to decouple producers from consumers
- When regulatory requirements (SOX, GDPR) demand documented data provenance and quality guarantees that can be audited independently of the producing team
- When the cost of data incidents (broken dashboards, bad model predictions, failed reports) is high enough to justify investing in prevention through formal producer accountability

## When NOT to Use

Stop and reconsider if:
- Early-stage data exploration where schemas are intentionally fluid and imposing contract rigidity would slow down legitimate research and discovery work
- Internal experimental datasets consumed by a single team; the overhead of authoring and maintaining a formal contract is not justified without cross-team consumers
- When the organization lacks the tooling infrastructure to automate contract validation; manual contract checks are too unreliable to provide meaningful quality guarantees
- Real-time streaming pipelines requiring sub-second schema evolution; synchronous contract validation adds latency incompatible with high-throughput event streams

## Core Concepts

- Schema contract: a versioned, machine-readable specification of the dataset's structure (columns, types, nullability, primary keys) that acts as the API contract between a data producer and its consumers
- Quality contract: explicit, measurable data quality obligations including freshness SLA (e.g., data must be no older than 4 hours), completeness (e.g., user_id null rate < 0.1%), and validity rules
- Producer ownership model: the principle that the data producer team — not consumers — is responsible for authoring, versioning, and guaranteeing the contract, shifting accountability upstream
- Semantic versioning for data: applying MAJOR.MINOR.PATCH conventions to data schemas where MAJOR changes (column removal, type change) trigger a mandatory consumer migration workflow

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Data Contract to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define the contract schema using a machine-readable format (YAML or JSON) specifying dataset name, owner, version, column definitions, data types, nullability, and primary key constraints
2. **Encode quality clauses**: freshness SLA (maximum allowed data age), completeness thresholds (minimum non-null percentage per column), validity rules (value ranges, regex patterns, referential integrity)
3. Establish semantic versioning for the contract (MAJOR for breaking changes, MINOR for additive changes) and publish to a contract registry visible to all consuming teams
4. Implement contract validation in the producer's pipeline CI/CD so that schema and quality rule violations block deployment before bad data reaches consumers
5. Monitor contract compliance at runtime with automated data quality checks and publish a contract health dashboard so consumers can assess data reliability before building dependent systems

<details><summary>中文步骤</summary>

1. 使用机器可读格式（YAML或JSON）定义契约模式，指定数据集名称、所有者、版本、列定义、数据类型、可空性和主键约束
2. 编码质量条款：新鲜度SLA（最大允许数据年龄）、完整性阈值（每列最低非空百分比）、有效性规则（值范围、正则表达式模式、引用完整性）
3. 为契约建立语义版本控制（破坏性变更用MAJOR，增量变更用MINOR），并发布到对所有消费团队可见的契约注册表
4. 在生产者的管道CI/CD中实施契约验证，使模式和质量规则违规在坏数据到达消费者之前阻止部署
5. 通过自动化数据质量检查在运行时监控契约合规性，并发布契约健康仪表板，使消费者在构建依赖系统之前能够评估数据可靠性

</details>

## Do

- Do author contracts in a machine-readable format (YAML/JSON) stored in git alongside the producer's pipeline code so that contract changes go through the same review process as code changes
- Do enforce contracts in the producer's CI/CD pipeline as a pre-deployment gate because post-deployment contract violations are already downstream incidents
- Do use semantic versioning and publish breaking change notices at least one sprint before the breaking schema change lands so consumers have time to adapt
- Do start with the highest-impact datasets (those feeding the most downstream consumers or regulatory reports) and expand contract coverage incrementally

## Don't

- Don't treat data contracts as documentation artifacts divorced from enforcement; an unverified contract is just a comment that will drift from reality over time
- Don't require consumers to author contracts on behalf of producers because producer-owned contracts align accountability; consumer-authored contracts create ownership ambiguity
- Don't apply uniform quality thresholds across all datasets; high-traffic production datasets warrant stricter SLAs than internal experimental tables
- Don't block all consumers from a dataset when a contract violation occurs; implement a tiered notification system that alerts consumers while the producer investigates

## Case Study

**PayPal**: PayPal pioneered data contracts at scale after a 2021 data incident where an undocumented schema change to a payments dataset broke 47 downstream dashboards and delayed a regulatory filing. The engineering team, led by Andrew Jones, formalized data contracts as YAML specifications stored in the same Git repository as the producing pipeline. Each contract specifies schema, freshness SLA (payments data must be no older than 1 hour), nullability rates, and consumer registry. PayPal now enforces contracts as a CI/CD gate: any pipeline change that violates a contract is automatically blocked, and the affected consumer teams are notified. The program reduced data-incident-related engineering time by 70% within 18 months.

## Related Frameworks

- data-catalog (complement)
- data-quality-framework (extends)
- schema-registry (complement)
- data-mesh (complement)
- data-lineage-governance (related)

## Source

https://sdframe.caldis.me/frameworks/data-contract
