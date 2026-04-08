# Slowly Changing Dimensions (SCD) / 缓慢变化维度

- **Category**: data
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Ralph Kimball, 1996
- **Adopters**: Airbnb, Amazon, Walmart, Capital One, Snowflake (dbt snapshots)

Techniques for tracking historical changes in dimension tables (Kimball, 1996)

_在维度表中追踪历史变更的技术体系（Kimball，1996）_

## When to Use

Apply this framework when:
- When dimension attributes change over time and business users need to analyze historical facts against the dimension values that existed at the time of each event
- When regulatory or audit requirements mandate that historical states of master data (customer, product, employee) are preserved and queryable
- When a data warehouse must support 'as-was' reporting showing what a dimension looked like at any point in the past
- When source systems overwrite attribute values without preserving history and the warehouse must compensate for this loss

## When NOT to Use

Stop and reconsider if:
- Operational OLTP systems where historical dimension versioning adds unnecessary complexity and query overhead
- When the dimension attribute changes so frequently (e.g., real-time price) that Type 2 generates millions of rows and a separate temporal table or time-series store is more appropriate
- When no business user has expressed a need to analyze historical facts against past dimension states and the added complexity is pure overhead
- Highly agile early-stage data models where dimension schemas change frequently and SCD infrastructure would need constant rework

## Core Concepts

- Type 1 SCD: overwrite the old value with the new value; no history is preserved; used for correcting errors or attributes where history is irrelevant
- Type 2 SCD: insert a new row with a new surrogate key for each change; full history is preserved via effective date ranges and is_current flags
- Type 3 SCD: add a new column to store the previous value alongside the current value; supports limited one-step history
- Surrogate key: a system-generated integer or hash key assigned to each dimension row, decoupling the warehouse model from source natural keys and enabling multiple historical versions

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Slowly Changing Dimensions (SCD) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify dimension attributes that change over time (e.g., customer address, product category) and classify each as Type 1, 2, or 3 based on historical tracking requirements
2. For Type 2 SCD, add surrogate key, effective_from, effective_to, and is_current columns to the dimension table to represent each historical version as a distinct row
3. Build ETL/ELT pipelines that detect source system changes via CDC or delta loads and apply the correct SCD strategy: overwrite for Type 1, insert new row for Type 2, add attribute column for Type 3
4. Link fact tables to dimension surrogate keys so that historical facts always join to the dimension version that was current at the time of the event, preserving analytical accuracy
5. Monitor SCD pipeline health by tracking dimension table growth rates, detecting unexpected attribute changes, and validating that no overlapping effective date ranges exist for Type 2 rows

<details><summary>中文步骤</summary>

1. 识别随时间变化的维度属性（如客户地址、产品类别），根据历史追踪需求将每个属性分类为类型1、2或3
2. 对于类型2 SCD，在维度表中添加代理键、effective_from、effective_to和is_current列，将每个历史版本表示为独立的行
3. 构建ETL/ELT管道，通过CDC或增量加载检测源系统变更，应用正确的SCD策略：类型1覆盖、类型2插入新行、类型3增加属性列
4. 将事实表关联到维度代理键，使历史事实始终关联到事件发生时当时有效的维度版本，保障分析准确性
5. 通过追踪维度表增长率、检测意外属性变更、验证类型2行的有效日期范围无重叠来监控SCD管道健康状况

</details>

## Do

- Do choose the SCD type based on actual business reporting needs rather than technical convenience because the wrong type loses history that cannot be recovered
- Do use surrogate keys for all Type 2 dimensions because natural keys cannot uniquely identify historical versions of the same entity
- Do close expired Type 2 rows atomically with the insert of the new row to prevent gaps or overlaps in effective date ranges
- Do document the SCD type for each dimension attribute in a data dictionary because undocumented conventions become tribal knowledge that causes reporting errors

## Don't

- Don't apply Type 2 SCD to all dimension attributes indiscriminately because dimension table explosion leads to query performance degradation and storage waste
- Don't forget to update fact table foreign keys when dimension rows are closed and new versions are inserted because stale keys break historical analysis
- Don't mix SCD logic with business transformation logic in the same ETL step because it makes pipelines harder to test and debug
- Don't ignore late-arriving dimension changes where the source change timestamp precedes already-loaded fact records because retroactive corrections require special handling

## Case Study

**Airbnb**: Airbnb's data warehouse uses Type 2 SCD on its host and listing dimensions to support accurate historical analysis of booking revenue. When a host changes their listing's price tier or location, a new dimension row is inserted with a new surrogate key, preserving the state that existed when each booking was made. This allows revenue reports to correctly attribute bookings to the pricing tier that was active at the time of the reservation rather than the current tier, which is essential for accurate year-over-year comparison and cohort analysis.

## Related Frameworks

- star-schema (complement)
- change-data-capture (complement)
- medallion-architecture (complement)

## Source

https://sdframe.caldis.me/frameworks/slowly-changing-dimensions
