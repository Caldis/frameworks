# Data Vault 2.0 / Data Vault 2.0

- **Category**: data
- **Complexity**: advanced
- **Quality**: scalability, maintainability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Dan Linstedt, 2000 (formalized as 2.0 in 2013)
- **Adopters**: ING Bank, Pfizer, USAA, DirectTV, Department of Defense (US)

Agile, auditable data warehousing with hubs, links, and satellites

_以Hub、Link和Satellite实现敏捷可审计的数据仓库方法论_

## When to Use

Apply this framework when:
- When multiple source systems with overlapping business keys need to be integrated into a single warehouse
- When full historical auditability and traceability of every data change is a regulatory or business requirement
- When the data warehouse must accommodate frequent source system changes without major rework
- When agile, incremental delivery of warehouse functionality is needed with parallel development across teams

## When NOT to Use

Stop and reconsider if:
- When the organization has a single source system and integration across heterogeneous sources is not needed
- When the team lacks data modeling expertise and the learning curve of Data Vault 2.0 is too steep
- When real-time analytics are the primary use case and the multi-layer architecture adds unacceptable latency
- When data volumes are small and a simple star schema directly loaded from sources is sufficient

## Core Concepts

- Hubs: tables anchored on business keys representing core business entities, providing a stable integration point across source systems
- Links: tables capturing relationships between hubs, modeling the associations and transactions between business entities
- Satellites: tables containing descriptive attributes and context for hubs and links, timestamped to maintain full change history
- Insert-only loading: all data is appended, never updated or deleted in the raw vault, ensuring complete auditability and reproducibility

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Data Vault 2.0 to?
- What constraints or existing architecture do you need to work within?
- Has your team used Data Vault 2.0 before? (This is an advanced framework)

## Implementation Steps

1. Identify business keys from source systems and model them as Hub tables, each representing a core business concept (customer, product, order) with a hash key and load metadata
2. Model relationships between hubs as Link tables that capture associations (customer-places-order) with their own hash keys and load metadata
3. Attach descriptive and contextual attributes to hubs and links as Satellite tables, each timestamped to track the full history of changes
4. Load the raw vault from source systems using pattern-based, parallelizable ETL that inserts without updating, preserving full auditability
5. Build business vault and information marts on top of the raw vault to apply business rules and present data in star schema form for consumption

<details><summary>中文步骤</summary>

1. 从源系统识别业务键并建模为Hub表，每个代表一个核心业务概念（客户、产品、订单），包含哈希键和加载元数据
2. 将Hub之间的关系建模为Link表，捕获关联（客户-下-订单），有自己的哈希键和加载元数据
3. 将描述性和上下文属性作为Satellite表附加到Hub和Link上，每条带时间戳以追踪完整变更历史
4. 使用基于模式的、可并行化的ETL从源系统加载原始库，仅插入不更新，保留完整可审计性
5. 在原始库之上构建业务库和信息集市，应用业务规则并以星型模式形式呈现数据供消费

</details>

## Do

- Do use hash keys for hub and link primary keys because they enable parallel loading and deterministic key generation across distributed systems
- Do keep the raw vault free of business rules because it should be a pure, auditable reflection of source system data
- Do apply business rules in a separate business vault layer because mixing integration and interpretation creates fragile, hard-to-maintain models
- Do generate ETL code from metadata templates because the repetitive hub/link/satellite loading patterns are ideal for automation

## Don't

- Don't expose raw vault tables directly to business users because the hub-link-satellite structure is not intuitive for analysis
- Don't update or delete records in the raw vault because it destroys the audit trail and historical traceability
- Don't skip the information mart layer because business users need star schema or flat table views for their BI tools
- Don't create point-to-point links between satellites because all relationships must flow through properly modeled link tables

## Case Study

**ING Bank**: ING Bank adopted Data Vault 2.0 to integrate data from over 40 source systems across its global banking operations. The hub-link-satellite model allowed regulatory reporting teams to trace every data point back to its source system and exact load timestamp, meeting strict European banking audit requirements. Parallel loading patterns reduced their nightly ETL window from 12 hours to under 3 hours.

## Related Frameworks

- star-schema (alternative)
- data-lakehouse (complement)
- data-mesh (complement)
- database-migration-patterns (complement)

## Source

https://sdframe.caldis.me/frameworks/data-vault-2
