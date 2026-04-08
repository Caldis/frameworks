# Star Schema / 星型模式

- **Category**: data
- **Complexity**: intermediate
- **Quality**: performance, usability
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Ralph Kimball, 1996
- **Adopters**: Walmart, Amazon, Target, Netflix, Airbnb

Dimensional modeling with fact and dimension tables for analytics

_以事实表和维度表进行维度建模的分析架构_

## When to Use

Apply this framework when:
- When building a data warehouse or mart for business intelligence and ad-hoc analytical queries
- When query simplicity and performance for aggregate operations are more important than storage efficiency
- When BI tools like Tableau, Power BI, or Looker need intuitive, join-friendly schema structures
- When business users need self-service analytics with predictable, understandable data models

## When NOT to Use

Stop and reconsider if:
- When the use case is primarily OLTP with heavy insert/update workloads that require normalized schemas
- When data relationships are highly complex and graph-like rather than dimensional
- When schema flexibility is needed and the data structure changes frequently (consider schema-on-read approaches instead)
- When real-time streaming analytics are needed and pre-aggregated materialized views are more appropriate

## Core Concepts

- Fact tables: central tables containing quantitative measures (metrics) and foreign keys referencing dimension tables, representing business events at a specific grain
- Dimension tables: wide, denormalized tables containing descriptive attributes that provide the 'who, what, where, when, why' context for analyzing facts
- Grain declaration: explicitly defining what each row in a fact table represents to prevent ambiguity in aggregation and drill-down queries
- Slowly changing dimensions: strategies (Type 1, 2, 3) for tracking how dimension attributes change over time while preserving historical accuracy

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Star Schema to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the business process to model and define the grain: the most atomic level of detail each fact table row represents
2. Design the central fact table containing quantitative measures (revenue, quantity, duration) and foreign keys to all relevant dimensions
3. Build dimension tables with descriptive attributes (customer name, product category, date hierarchy) that provide context for slicing and filtering facts
4. Denormalize dimension tables into flat, wide structures to optimize join performance and simplify queries for analysts and BI tools
5. Load the star schema using ETL/ELT pipelines with surrogate keys, slowly changing dimension handling, and incremental fact loading strategies

<details><summary>中文步骤</summary>

1. 识别要建模的业务过程并定义粒度：每行事实表代表的最原子级别的细节
2. 设计中心事实表，包含定量度量（收入、数量、持续时间）和所有相关维度的外键
3. 构建维度表，包含描述性属性（客户名、产品类别、日期层次），为事实的切片和过滤提供上下文
4. 将维度表反规范化为扁平宽结构，以优化连接性能并简化分析师和BI工具的查询
5. 使用ETL/ELT管道加载星型模式，包括代理键、缓慢变化维度处理和增量事实加载策略

</details>

## Do

- Do declare the grain of every fact table explicitly because ambiguous grain leads to incorrect aggregations and double-counting
- Do denormalize dimension tables fully because normalized dimensions (snowflake schema) add join complexity with minimal storage savings in analytical workloads
- Do use surrogate keys in dimension tables because natural keys change and cause referential integrity issues
- Do design conformed dimensions shared across multiple fact tables because they enable cross-process analysis and consistent reporting

## Don't

- Don't normalize dimension tables into snowflake schema for analytical workloads because it forces multi-table joins that slow BI queries
- Don't mix grain levels in a single fact table because it makes aggregation unreliable and confuses business users
- Don't skip slowly changing dimension handling because losing historical dimension values makes historical analysis inaccurate
- Don't create operational (OLTP-style) schemas for analytical purposes because they are optimized for transactional writes, not analytical reads

## Case Study

**Walmart**: Walmart's enterprise data warehouse uses Kimball-style star schemas to model its retail operations across 10,000+ stores. Fact tables capture point-of-sale transactions at the item-store-day grain, while conformed dimensions for product, store, and time enable cross-departmental analytics. This design allows supply chain, marketing, and finance teams to query the same data with consistent results using standard BI tools.

## Related Frameworks

- data-vault-2 (alternative)
- data-lakehouse (related)
- polyglot-persistence (related)

## Source

https://sdframe.caldis.me/frameworks/star-schema
