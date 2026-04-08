# Medallion Architecture / 奖章架构

- **Category**: data
- **Complexity**: intermediate
- **Quality**: scalability, maintainability, reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Databricks (Reza Shiftehfar et al.), 2021, 2019
- **Adopters**: Databricks, Comcast, Shell, H&M Group, HSBC

Bronze/Silver/Gold layered data processing pattern (Databricks, 2021)

_铜/银/金分层数据处理模式（Databricks，2021）_

## When to Use

Apply this framework when:
- When building a data lakehouse on Delta Lake, Apache Iceberg, or Apache Hudi that needs clear separation between raw ingestion, integration, and serving layers
- When multiple downstream consumers (BI, ML, data science) have different quality and latency requirements and a single pipeline cannot serve all of them optimally
- When auditability requires preserving the original raw data alongside transformed versions for regulatory or debugging purposes
- When incremental data processing and data quality need to be enforced systematically across a multi-team data platform

## When NOT to Use

Stop and reconsider if:
- Simple single-source ETL pipelines where a two-layer approach (raw + curated) is sufficient and the three-layer overhead is not justified
- Real-time OLTP systems where sub-second query latency is required and the batch-oriented medallion processing model is incompatible with latency SLAs
- When the organization lacks the engineering maturity to maintain three layers of pipelines; start with a two-layer approach and evolve
- Small datasets that fit in a single database where the complexity of a distributed lakehouse is unnecessary overhead

## Core Concepts

- Bronze layer: the raw landing zone that stores data exactly as received from source systems; immutable append-only storage enabling full replay and re-processing
- Silver layer: the cleaned and integrated layer where business rules are applied, duplicates removed, and schemas normalized; serves as the single source of truth for analytical consumption
- Gold layer: the consumption-ready layer of aggregated, business-domain-specific datasets; optimized for query performance by BI tools and ML feature pipelines
- Delta Lake / table format: ACID-compliant table format (Delta, Iceberg, Hudi) that enables MERGE, schema evolution, and time travel across all three layers

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Medallion Architecture to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Ingest raw data from source systems into the Bronze layer without transformation, preserving the exact source payload including schema, data types, and any malformed records for full auditability
2. Transform Bronze data into the Silver layer by applying cleaning, deduplication, schema normalization, and type casting; join related datasets and enrich records to produce a validated, integrated view
3. Aggregate and model Silver data into the Gold layer, producing business-level tables, star schemas, or aggregated metrics optimized for BI tools, dashboards, and ML feature consumption
4. Enforce data quality checks at each layer boundary: Bronze validates that data arrived; Silver validates schema and business rules; Gold validates business metrics and aggregation accuracy
5. Implement incremental processing using Delta Lake or Iceberg MERGE operations so that each layer is updated efficiently without full re-scans, enabling near-real-time Gold layer freshness

<details><summary>中文步骤</summary>

1. 将来自源系统的原始数据无转换地摄入铜层，保留完整的源负载，包括模式、数据类型和任何格式错误的记录，以实现完整可审计性
2. 通过应用清洗、去重、模式规范化和类型转换将铜层数据转换为银层；连接相关数据集并丰富记录以产生经过验证的集成视图
3. 将银层数据聚合和建模为金层，产生为BI工具、仪表板和ML特征消费优化的业务级表、星型模式或聚合指标
4. 在每个层边界执行数据质量检查：铜层验证数据已到达；银层验证模式和业务规则；金层验证业务指标和聚合准确性
5. 使用Delta Lake或Iceberg MERGE操作实现增量处理，使每层能够高效更新而无需全量重扫，实现近实时金层新鲜度

</details>

## Do

- Do keep the Bronze layer truly raw and append-only because any transformation applied at ingestion time makes it impossible to re-derive the Silver layer from a different transformation logic later
- Do enforce explicit schema on Silver and Gold tables because schema-on-read in Silver causes unpredictable failures in downstream Gold pipelines
- Do partition Gold tables by the query predicates most common in BI tools (e.g., date, region) because partition pruning is the primary performance lever for large Gold tables
- Do use incremental MERGE rather than full refresh for Silver and Gold layers because full refreshes are slow, expensive, and create latency spikes for consumers

## Don't

- Don't skip the Bronze layer and write transformed data directly to Silver because without the raw layer you lose the ability to replay history after discovering a transformation bug
- Don't build Gold tables that replicate the entire Silver layer with minor variations because this creates maintenance sprawl; Gold should aggregate and simplify
- Don't mix streaming and batch processing in the same layer without explicit partition isolation because mixed write patterns cause Delta Lake file compaction issues
- Don't treat the medallion architecture as strictly three layers; hybrid Silver-Gold or additional domain layers are valid when business complexity justifies them

## Case Study

**Comcast**: Comcast migrated its advertising analytics platform to a medallion architecture on Delta Lake, processing over 50 billion ad impression events per day. The Bronze layer captures raw impression, click, and conversion events from 200+ ad servers. The Silver layer joins these events with campaign metadata and applies identity resolution to deduplicate device IDs. The Gold layer produces advertiser-facing campaign performance reports and ML training datasets for bid optimization models. This architecture reduced ad reporting latency from 24 hours to under 2 hours while cutting data platform costs by 40% through Delta Lake's optimized file compaction.

## Related Frameworks

- data-lakehouse (extends)
- data-quality-framework (complement)
- data-lineage (complement)
- slowly-changing-dimensions (complement)

## Source

https://sdframe.caldis.me/frameworks/medallion-architecture
