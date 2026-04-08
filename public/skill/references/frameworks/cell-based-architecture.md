# Cell-Based Architecture / 单元化架构

- **Category**: architecture
- **Complexity**: advanced
- **Quality**: reliability, scalability, security
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: WSO2, 2018
- **Adopters**: Slack, DoorDash, WSO2, Amazon Web Services, Zalando, Shopify

An architectural pattern where a system is divided into independent, self-contained cells that own their data, compute, and network resources, enabling granular scaling, fault isolation, and independent deployability

_将系统划分为独立、自包含的单元（cell）的架构模式，每个单元拥有自己的数据、计算和网络资源，实现细粒度扩展、故障隔离和独立部署能力_

## When to Use

Apply this framework when:
- In large-scale SaaS platforms serving thousands of tenants where a noisy-neighbor incident in one tenant should not degrade the experience of others
- When blast-radius reduction is a primary architectural goal — large distributed systems where a single deployment or failure can cascade across the entire platform
- For geographically distributed systems with data-residency requirements (GDPR, China data localization) where cells map to regions with isolated data stores
- When different customer segments require different SLAs, resource quotas, or compliance profiles that cannot be enforced in a shared architecture

## When NOT to Use

Stop and reconsider if:
- For single-tenant applications or platforms with fewer than a few hundred customers where the operational complexity of managing a cell fleet exceeds any resilience benefit
- When your data model requires frequent cross-tenant joins or aggregations that cannot be pre-computed — cell isolation forces data locality that makes cross-cell queries expensive or impossible
- Early-stage products where the architecture should optimize for rapid iteration speed rather than operational resilience at scale

## Core Concepts

- Cell: The fundamental deployment unit — a self-contained cluster of services, data stores, and infrastructure that processes a defined subset of the overall traffic
- Cell Router: A stateless, highly available layer that routes requests to the appropriate cell based on cell-affinity criteria without knowledge of internal cell topology
- Blast Radius Containment: The property that a failure, security incident, or bad deployment within one cell cannot directly affect the operation of other cells
- Cell Affinity: The binding between a user, tenant, or request and a specific cell, maintained by the router and preserved across requests to ensure consistent data locality
- Cell Blueprint (Golden Path): A version-controlled infrastructure-as-code template defining the canonical structure of a cell, enabling fleet-wide upgrades through template versioning

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Cell-Based Architecture to?
- What constraints or existing architecture do you need to work within?
- Has your team used Cell-Based Architecture before? (This is an advanced framework)

## Implementation Steps

1. **Cell Boundary Definition**: Identify natural business or tenant partitions (geographic region, customer segment, product line) that can be served independently and will not share state with other cells
2. **Cell Blueprint Design**: Define the standard template for a cell — its services, databases, message queues, API gateway, and internal networking — so every cell is a consistent deployable unit
3. **Cell Router**: Build a stateless routing layer (DNS-based, API gateway, or service mesh) that maps incoming requests to the correct cell based on cell affinity (tenant ID, region, user hash)
4. **Cell Lifecycle Automation**: Implement infrastructure-as-code templates (Terraform, Helm) to provision, upgrade, scale, and decommission cells independently without coordination across the cell fleet
5. **Observability per Cell**: Deploy isolated monitoring stacks per cell (or cell-aware dashboards in a shared platform) so failures, latency spikes, and capacity issues are diagnosed at cell granularity

<details><summary>中文步骤</summary>

1. 单元边界定义：识别可独立服务且不与其他单元共享状态的自然业务或租户分区（地理区域、客户细分、产品线）
2. 单元蓝图设计：定义单元的标准模板——其服务、数据库、消息队列、API网关和内部网络——使每个单元成为一致的可部署单元
3. 单元路由器：构建无状态路由层（基于DNS、API网关或服务网格），根据单元亲和性（租户ID、区域、用户哈希）将传入请求映射到正确的单元
4. 单元生命周期自动化：实施基础设施即代码模板（Terraform、Helm）以独立地供应、升级、扩展和退役单元，无需跨单元舰队协调
5. 每单元可观测性：为每个单元部署隔离的监控栈（或共享平台中的单元感知仪表板），以便在单元粒度诊断故障、延迟峰值和容量问题

</details>

## Do

- Design cells to be stateless at the routing layer — cell affinity state lives in the router or a shared cell-mapping service, never in cells themselves
- Version your cell blueprint separately from the services running inside cells, enabling you to upgrade the cell infrastructure (k8s version, observability agent) independently of application code
- Plan for cell rebalancing from the start — as tenant distribution changes over time, you need automated or semi-automated tooling to migrate tenants between cells without downtime
- Treat the cell boundary as a security boundary — network policies, IAM roles, and encryption keys should be scoped to individual cells to limit lateral movement in breach scenarios

## Don't

- Don't share databases or message queues across cells because cross-cell data dependencies break the blast-radius guarantee and create cascading failure paths
- Don't start with too many small cells — the operational overhead of managing dozens of cells before traffic warrants it consumes engineering capacity better spent elsewhere
- Don't build cells that communicate synchronously with each other during request processing because this reintroduces tight coupling and the distributed monolith failures cell-based architecture is designed to prevent
- Don't use cell-based architecture when your product has a single tenant or very few customers — the added complexity is not justified until multi-tenancy isolation becomes a real availability or compliance requirement

## Case Study

**Slack**: Slack adopted cell-based architecture (which they call "sharding") as their user base scaled past 10 million daily active users. Each cell (shard) contains a subset of Slack workspaces and owns all the services needed to serve those workspaces — message storage, real-time WebSocket handlers, search indexing, and notification delivery. When a viral incident caused one workspace to generate 100x normal traffic, the blast radius was limited to the cell containing that workspace, protecting the other 99% of users. Slack's engineering team reported that cell isolation enabled them to conduct disruptive infrastructure upgrades (Kubernetes migration, database engine changes) on individual cells during off-peak hours without maintenance windows affecting all users simultaneously.

## Related Frameworks

- ports-and-adapters (related)

## Source

https://sdframe.caldis.me/frameworks/cell-based-architecture
