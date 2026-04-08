# Data Catalog / 数据目录

- **Category**: data
- **Complexity**: intermediate
- **Quality**: maintainability, observability, security
- **Abstraction**: system
- **Maturity**: established
- **Author**: Alation, 2012
- **Adopters**: LinkedIn, Airbnb, Shopify, ING Bank, Lyft, Netflix

Centralized metadata management system that enables data discovery, governance, and self-service analytics across an organization.

_集中式元数据管理系统，支持组织内的数据发现、治理和自助分析。_

## When to Use

Apply this framework when:
- When an organization has dozens or hundreds of data sources and analysts spend significant time locating trustworthy datasets rather than analyzing them
- When data governance obligations (GDPR, CCPA, HIPAA) require documented data inventories, sensitivity classifications, and lineage trails
- When implementing a data mesh or data platform where domain teams need to publish, discover, and subscribe to each other's data products
- When onboarding new data engineers or analysts who need to understand what data exists, who owns it, and how it has been used

## When NOT to Use

Stop and reconsider if:
- Small teams with fewer than 10 data sources where informal documentation (a shared wiki or README files) provides sufficient discoverability without catalog overhead
- When data assets are entirely managed by a single team with no cross-team sharing; the catalog's collaboration features provide no value in a single-owner environment
- Highly regulated environments where metadata itself (column names, schema structure) is classified; a public-facing catalog may expose sensitive system architecture
- When the organization lacks the data stewardship culture to curate and maintain metadata; a poorly maintained catalog is worse than no catalog

## Core Concepts

- Technical metadata: schema definitions, column types, row counts, partition keys, and storage statistics automatically harvested from source systems
- Business metadata: human-authored glossary terms, dataset descriptions, ownership assignments, and domain classifications that give technical assets business context
- Data lineage integration: linking catalog entries to upstream sources and downstream consumers so impact analysis and root-cause investigation are possible
- Collaborative curation: crowdsourced ratings, usage-based popularity signals, and expert endorsements that surface high-quality datasets to new consumers

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Data Catalog to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Ingest metadata from all data sources (databases, data lakes, BI tools, pipelines) through automated crawlers and manual annotations
2. Build a unified metadata store with technical metadata (schema, partitions, statistics), business metadata (owners, definitions, tags), and operational metadata (lineage, usage metrics)
3. Enable semantic search and browse so data consumers can discover datasets by keyword, domain, owner, or data classification
4. **Implement governance workflows**: ownership assignment, access requests, sensitivity tagging (PII, GDPR), and data quality certification
5. Continuously update metadata via change-event subscriptions so the catalog reflects the real-time state of the data landscape

<details><summary>中文步骤</summary>

1. 通过自动爬虫和人工标注从所有数据源（数据库、数据湖、BI工具、管道）摄取元数据
2. 构建统一元数据存储，包含技术元数据（模式、分区、统计）、业务元数据（所有者、定义、标签）和运营元数据（血缘、使用指标）
3. 启用语义搜索和浏览，使数据消费者可以按关键词、领域、所有者或数据分类发现数据集
4. 实施治理工作流：所有权分配、访问申请、敏感度标记（个人信息、GDPR）和数据质量认证
5. 通过变更事件订阅持续更新元数据，使目录反映数据全景的实时状态

</details>

## Do

- Do automate metadata ingestion through crawlers and API integrations because manual-only catalogs quickly become stale and lose user trust
- Do assign clear dataset owners and make ownership visible in the catalog because undiscoverable ownership is the primary reason data governance programs fail
- Do integrate usage analytics (query frequency, most-accessed columns, last queried) so the catalog surfaces popular and recently validated datasets prominently
- Do tag datasets with sensitivity classifications at ingestion time because retrofitting PII tags across thousands of existing assets is prohibitively expensive

## Don't

- Don't deploy a data catalog as a purely IT-driven project without data consumer buy-in because adoption requires analysts and data scientists to actively contribute business metadata
- Don't treat the catalog as a static inventory; without continuous metadata refresh the catalog drifts from reality and users stop trusting it
- Don't ignore social features like comments, ratings, and endorsements because quantitative usage signals alone cannot capture domain-specific trust
- Don't attempt to catalog every field in every dataset on day one; start with the highest-traffic tables and expand coverage iteratively

## Case Study

**LinkedIn**: LinkedIn built DataHub, an open-source metadata platform that catalogs over 500,000 datasets, 300,000 pipelines, and 100,000 ML features across its data ecosystem. DataHub uses a push-based architecture where each data system (Kafka, Hadoop, Presto, Pinot) emits metadata change events to a central metadata graph. This graph-based approach enables real-time impact analysis: engineers can instantly see all downstream dashboards and ML models affected when a schema change is proposed. LinkedIn reports that DataHub reduced mean time to discover a trusted dataset from days to under 10 minutes.

## Related Frameworks

- data-lineage (complement)
- data-mesh (complement)
- data-quality-framework (complement)
- data-lineage-governance (related)

## Source

https://sdframe.caldis.me/frameworks/data-catalog
