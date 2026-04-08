# Data Architecture / 数据架构

Patterns for data-intensive systems — storage, processing, streaming, and data modeling.

数据密集型系统模式——存储、处理、流式计算与数据建模。

**20 frameworks** in this category.

## Frameworks

### Data Mesh / 数据网格
- **Slug**: data-mesh
- **Complexity**: advanced
- **Quality**: scalability, maintainability
- **Author**: Zhamak Dehghani, 2019
- Domain-oriented decentralized data ownership and architecture

### Lambda Architecture / Lambda 架构
- **Slug**: lambda-architecture
- **Complexity**: advanced
- **Quality**: scalability, performance, reliability
- **Author**: Nathan Marz, 2011
- Batch plus speed layers for scalable big data processing

### Kappa Architecture / Kappa 架构
- **Slug**: kappa-architecture
- **Complexity**: advanced
- **Quality**: scalability, maintainability, performance
- **Author**: Jay Kreps, 2014
- Stream-first architecture eliminating the batch layer entirely

### Stream Processing Patterns / 流处理模式
- **Slug**: stream-processing-patterns
- **Complexity**: advanced
- **Quality**: performance, scalability, reliability
- **Author**: Jay Kreps / Martin Kleppmann, 2014-2017
- Patterns for continuous data stream windowing, joining, and semantics

### Change Data Capture (CDC) / 变更数据捕获
- **Slug**: change-data-capture
- **Complexity**: intermediate
- **Quality**: reliability, scalability
- **Author**: Database community / Popularized by Debezium (Red Hat), 2015
- Track database changes as real-time event streams for downstream

### Data Lakehouse / 数据湖仓一体
- **Slug**: data-lakehouse
- **Complexity**: intermediate
- **Quality**: scalability, performance, maintainability
- **Author**: Databricks (Armbrust, Ghodsi, Zaharia et al.), 2020
- Unified architecture combining data lake flexibility with warehouse reliability

### Star Schema / 星型模式
- **Slug**: star-schema
- **Complexity**: intermediate
- **Quality**: performance, usability
- **Author**: Ralph Kimball, 1996
- Dimensional modeling with fact and dimension tables for analytics

### Data Vault 2.0 / Data Vault 2.0
- **Slug**: data-vault-2
- **Complexity**: advanced
- **Quality**: scalability, maintainability, reliability
- **Author**: Dan Linstedt, 2000 (formalized as 2.0 in 2013)
- Agile, auditable data warehousing with hubs, links, and satellites

### Polyglot Persistence / 多语言持久化
- **Slug**: polyglot-persistence
- **Complexity**: intermediate
- **Quality**: performance, scalability
- **Author**: Martin Fowler / Pramod Sadalage, 2011
- Use purpose-fit databases for different data access patterns

### Feature Store Pattern / 特征存储模式
- **Slug**: feature-store-pattern
- **Complexity**: intermediate
- **Quality**: reliability, scalability, maintainability
- **Author**: Uber Michelangelo team (Hermann, Del Balso et al.), 2017
- Centralized ML feature management for training and serving

### Slowly Changing Dimensions (SCD) / 缓慢变化维度
- **Slug**: slowly-changing-dimensions
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Author**: Ralph Kimball, 1996
- Techniques for tracking historical changes in dimension tables (Kimball, 1996)

### Data Lineage / 数据血缘
- **Slug**: data-lineage
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Author**: Industry-wide practice; standardized by OpenLineage (Astronomer/Linux Foundation, 2021)
- Tracking data origin, transformations, and consumption across pipelines

### Schema Registry Pattern / 模式注册表模式
- **Slug**: schema-registry-pattern
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Author**: Confluent (Jay Kreps et al.), 2015
- Centralized schema management for data contracts (Confluent, 2015)

### Data Quality Framework / 数据质量框架
- **Slug**: data-quality-framework
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Author**: Thomas C. Redman (1992); operationalized by DAMA International DMBOK
- Systematic validation of data accuracy, completeness, and consistency

### Medallion Architecture / 奖章架构
- **Slug**: medallion-architecture
- **Complexity**: intermediate
- **Quality**: scalability, maintainability, reliability
- **Author**: Databricks (Reza Shiftehfar et al.), 2021
- Bronze/Silver/Gold layered data processing pattern (Databricks, 2021)

### Data Catalog / 数据目录
- **Slug**: data-catalog
- **Complexity**: intermediate
- **Quality**: maintainability, observability, security
- **Author**: Alation
- Centralized metadata management system that enables data discovery, governance, and self-service analytics across an organization.

### Schema Registry / 模式注册表
- **Slug**: schema-registry
- **Complexity**: intermediate
- **Quality**: reliability, maintainability, scalability
- **Author**: Confluent
- Centralized service for storing, versioning, and enforcing data schemas in streaming and event-driven architectures, ensuring producer-consumer compatibility.

### Data Lineage / 数据血缘
- **Slug**: data-lineage-governance
- **Complexity**: advanced
- **Quality**: observability, maintainability, security
- **Author**: Apache Atlas
- Systematic tracking and visualization of data flow from origin through all transformations to final consumption, enabling impact analysis and regulatory compliance.

### Feature Store / 特征仓库
- **Slug**: feature-store
- **Complexity**: advanced
- **Quality**: reliability, scalability, maintainability
- **Author**: Uber (Michelangelo)
- Centralized repository that manages the full lifecycle of ML features — from computation and storage to serving — enabling feature reuse, consistency between training and inference, and governance.

### Data Contract / 数据契约
- **Slug**: data-contract
- **Complexity**: intermediate
- **Quality**: reliability, maintainability, testability
- **Author**: Andrew Jones
- Formal, versioned agreements between data producers and consumers that specify schema, quality expectations, SLAs, and ownership, treating data as a product with explicit interface guarantees.
