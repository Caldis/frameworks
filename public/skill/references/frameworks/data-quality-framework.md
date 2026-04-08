# Data Quality Framework / 数据质量框架

- **Category**: data
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Thomas C. Redman (1992); operationalized by DAMA International DMBOK
- **Adopters**: Intuit, Airbnb, Lyft, Shopify, Etsy

Systematic validation of data accuracy, completeness, and consistency

_系统性验证数据准确性、完整性和一致性的方法体系_

## When to Use

Apply this framework when:
- When downstream business decisions, ML models, or regulatory reports depend on data that could be corrupted by upstream system defects
- When data pipelines span multiple systems and teams, creating opportunities for data corruption at each handoff
- When SLA breaches or model accuracy degradation are caused by silent data quality issues that are detected only after business impact
- When data mesh or data product patterns require producers to publish quality guarantees to consumers as part of their data product contract

## When NOT to Use

Stop and reconsider if:
- Exploratory data science environments where data is inherently messy and the cost of quality enforcement exceeds the benefit
- Real-time streaming pipelines where synchronous quality checks add latency that violates SLA requirements; use async anomaly detection instead
- When the organization has not yet established data ownership — quality frameworks without accountable owners produce alerts that no one acts on
- Throwaway prototypes and one-time data migrations where ongoing quality monitoring is unnecessary

## Core Concepts

- Data quality dimensions: the measurable characteristics of data — accuracy (correct values), completeness (no missing values), consistency (no contradictions), timeliness (freshness), uniqueness (no duplicates), validity (conforms to format/range rules)
- Expectations as code: expressing data quality rules as version-controlled, executable assertions that run in CI/CD and pipeline jobs rather than ad-hoc manual checks
- Data observability: continuous monitoring of data health metrics (freshness, volume, distribution, schema) with anomaly detection to catch quality issues before they propagate
- Shift-left quality: validating data quality at the earliest possible pipeline stage (ingestion) rather than at the consumption point to minimize the blast radius of quality failures

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Data Quality Framework to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define data quality dimensions relevant to the business context: accuracy, completeness, consistency, timeliness, uniqueness, and validity; assign ownership and SLOs for each critical dataset
2. Instrument data pipelines with quality checks at ingestion, transformation, and serving layers using declarative frameworks (dbt tests, Great Expectations, Soda) that express expectations as code
3. Publish quality metrics to a data observability platform with alerting so that data owners are notified of SLO breaches before downstream consumers are impacted
4. **Implement quarantine patterns**: route records that fail quality checks to a quarantine table with failure annotations rather than silently dropping them, preserving auditability
5. Close the feedback loop by routing quality alerts to data producers and establishing data quality SLAs in data contracts, making quality a shared responsibility between producers and consumers

<details><summary>中文步骤</summary>

1. 定义与业务背景相关的数据质量维度：准确性、完整性、一致性、及时性、唯一性和有效性；为每个关键数据集分配所有权和SLO
2. 使用声明式框架（dbt tests、Great Expectations、Soda）在摄入、转换和服务层对数据管道进行质量检查埋点，将期望表达为代码
3. 将质量指标发布到数据可观测性平台并设置告警，使数据所有者在下游消费者受影响前收到SLO违规通知
4. 实施隔离模式：将未通过质量检查的记录路由到带有失败注释的隔离表，而非静默丢弃，保留可审计性
5. 通过将质量告警路由给数据生产者并在数据契约中建立数据质量SLA来形成反馈闭环，使质量成为生产者和消费者的共同责任

</details>

## Do

- Do define quality rules in collaboration with data consumers because they know which quality failures have business impact and which are acceptable anomalies
- Do run quality checks in the pipeline, not just on a schedule, because schedule-based checks detect failures hours after the bad data has already propagated
- Do monitor data distributions and volumes in addition to schema checks because statistical anomalies (e.g., sudden 50% drop in row count) often signal upstream issues before column-level checks fire
- Do track quality metrics over time and build quality dashboards because point-in-time pass/fail is insufficient for understanding quality trends and SLO achievement

## Don't

- Don't treat data quality as a one-time remediation project because data quality degrades continuously and requires ongoing monitoring
- Don't block all pipeline progress on quality failures because blocking every issue stops data delivery entirely; use severity tiers to quarantine critical failures and warn on minor ones
- Don't write quality checks only for known failure modes because unexpected quality issues are the most damaging; include statistical distribution monitoring for unknown unknowns
- Don't assign data quality responsibility solely to a central data team because data producers closest to the source are best positioned to understand and fix quality issues

## Case Study

**Intuit**: Intuit built a company-wide data quality platform called DataQA that runs over 500,000 quality checks daily across their tax, payments, and small business data products. Using Great Expectations integrated into their Airflow pipelines, Intuit detects data quality issues before they reach the models powering TurboTax recommendations and QuickBooks insights. After implementing the framework, Intuit reduced data-quality-related model prediction errors by 35% and cut the mean time to detect a data quality incident from 4 hours to under 15 minutes.

## Related Frameworks

- data-lineage (complement)
- schema-registry-pattern (complement)
- data-mesh (complement)
- medallion-architecture (complement)

## Source

https://sdframe.caldis.me/frameworks/data-quality-framework
