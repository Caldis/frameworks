# Data Lakehouse / 数据湖仓一体

- **Category**: data
- **Complexity**: intermediate
- **Quality**: scalability, performance, maintainability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Databricks (Armbrust, Ghodsi, Zaharia et al.), 2020, 2017
- **Adopters**: Databricks, Netflix, Apple, CERN, Comcast

Unified architecture combining data lake flexibility with warehouse reliability

_结合数据湖灵活性与数据仓库可靠性的统一架构_

## When to Use

Apply this framework when:
- When maintaining separate data lake and data warehouse systems creates data duplication and governance gaps
- When both SQL analytics and machine learning workloads need to operate on the same datasets
- When you need ACID transactions and schema enforcement on cloud object storage data
- When cost efficiency requires decoupling storage from compute while maintaining warehouse-grade query performance

## When NOT to Use

Stop and reconsider if:
- When a traditional data warehouse meets all your needs and the added complexity of managing open table formats is not justified
- When your workloads are exclusively SQL analytics with no ML or unstructured data requirements
- When real-time sub-second query latency is critical and a purpose-built OLAP database outperforms lakehouse query engines
- When organizational maturity cannot support the operational overhead of managing object storage, table formats, and compute engines separately

## Core Concepts

- Open table formats: Delta Lake, Apache Iceberg, or Apache Hudi add a transactional metadata layer atop open file formats on object storage
- Storage-compute separation: data remains in cheap cloud object storage while multiple compute engines (Spark, Presto, Flink) query it independently
- ACID on the lake: transaction logs enable atomicity, consistency, isolation, and durability for data lake operations including concurrent writes
- Unified governance: a single catalog and permission model governs both analytical and ML access to the same physical data

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Data Lakehouse to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Store all raw data in open file formats (Parquet, ORC) on cloud object storage (S3, ADLS, GCS) to maintain data lake flexibility and cost efficiency
2. Add a transactional metadata layer using Delta Lake, Apache Iceberg, or Apache Hudi to provide ACID transactions, schema enforcement, and time travel on lake data
3. Implement a unified catalog (e.g., Unity Catalog, AWS Glue, Hive Metastore) so both BI tools and ML frameworks discover and access the same governed datasets
4. Optimize query performance through data clustering, Z-ordering, file compaction, and partition pruning to match traditional data warehouse speed
5. Enforce governance policies including row-level security, column masking, lineage tracking, and audit logging directly on lakehouse tables

<details><summary>中文步骤</summary>

1. 以开放文件格式（Parquet、ORC）将所有原始数据存储在云对象存储（S3、ADLS、GCS）上，保持数据湖的灵活性和成本效益
2. 使用Delta Lake、Apache Iceberg或Apache Hudi添加事务元数据层，为湖上数据提供ACID事务、模式强制和时间旅行
3. 实现统一目录（如Unity Catalog、AWS Glue、Hive Metastore），使BI工具和ML框架能发现和访问相同的治理数据集
4. 通过数据聚类、Z-ordering、文件压缩和分区裁剪优化查询性能，以匹配传统数据仓库速度
5. 在湖仓表上直接实施治理策略，包括行级安全、列掩码、血缘追踪和审计日志

</details>

## Do

- Do choose an open table format (Iceberg, Delta, Hudi) to avoid vendor lock-in because the format is the foundation of your lakehouse
- Do implement a unified catalog so BI and ML workloads operate on the same governed data without ETL duplication
- Do tune file sizes and clustering strategies because small files on object storage severely degrade query performance
- Do enable time travel and versioning because it provides rollback capability and reproducible ML training datasets

## Don't

- Don't simply dump unmanaged files into a data lake and call it a lakehouse because the transactional metadata layer is what differentiates a lakehouse from a data swamp
- Don't ignore file compaction and maintenance operations because without them the lakehouse degrades into a slow, fragmented mess
- Don't assume all query engines perform equally on lakehouse tables because engine-format compatibility varies significantly
- Don't skip governance setup because a lakehouse without access controls inherits the worst aspects of ungoverned data lakes

## Case Study

**Databricks / CERN**: CERN adopted a Delta Lake-based lakehouse architecture to manage petabytes of particle physics data from the Large Hadron Collider. By unifying their data lake and analytical warehouse, physicists can run both SQL queries for reporting and Spark ML pipelines for anomaly detection on the same ACID-compliant datasets. This eliminated the need for costly data duplication between separate lake and warehouse systems.

## Related Frameworks

- star-schema (complement)
- data-mesh (complement)
- data-vault-2 (alternative)
- feature-store-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/data-lakehouse
