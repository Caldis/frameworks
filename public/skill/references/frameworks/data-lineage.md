# Data Lineage / 数据血缘

- **Category**: data
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Industry-wide practice; standardized by OpenLineage (Astronomer/Linux Foundation, 2021), 2012
- **Adopters**: ING Bank, LinkedIn (DataHub), Netflix (Metacat), Airbnb (Dataportal), Lyft (Amundsen)

Tracking data origin, transformations, and consumption across pipelines

_追踪数据在管道中的来源、转换过程和消费情况_

## When to Use

Apply this framework when:
- When data quality issues in downstream reports need to be traced back to their root cause in source systems or intermediate transformations
- When regulatory compliance (GDPR, CCPA, BCBS 239) requires demonstrating where personal or financial data originates and how it is processed
- When schema changes in source systems need impact analysis to identify which downstream pipelines, models, and dashboards will break
- When a data mesh or data lakehouse architecture spans many teams and datasets, making manual tracking of data provenance infeasible

## When NOT to Use

Stop and reconsider if:
- Small single-pipeline projects where all transformations are visible in one place and lineage tracking adds overhead without benefit
- Pure real-time streaming pipelines where event-level lineage generates prohibitive metadata volume and sampling-based observability is sufficient
- When the organization has not yet established basic data catalog and data ownership practices, as lineage without governance context provides limited value
- Throwaway analytics scripts and ad-hoc queries where the cost of instrumenting lineage outweighs the benefit

## Core Concepts

- Column-level lineage: tracking data flow at the column granularity so that a single field in a report can be traced through all joins, aggregations, and transformations to the source column
- Operational lineage: metadata about pipeline runs including execution time, row counts, and job IDs captured alongside structural lineage
- OpenLineage: an open standard for lineage metadata collection providing a common API that tools like Airflow, Spark, and dbt emit events to
- Impact analysis: using the lineage graph in reverse (downstream traversal) to predict which datasets and consumers are affected by an upstream change

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Data Lineage to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Instrument data pipelines to capture lineage metadata: record source datasets, transformation logic, output datasets, execution timestamps, and job identifiers at each processing step
2. Store lineage metadata in a dedicated lineage graph (directed acyclic graph) where nodes represent datasets or transformation steps and edges represent data flow relationships
3. Integrate lineage capture with orchestration tools (Airflow, dbt, Spark) using native hooks or OpenLineage-compatible APIs to automate metadata collection without manual instrumentation
4. Build a lineage UI or API that allows data consumers, data owners, and compliance teams to trace any dataset upstream to its origin and downstream to all its consumers
5. **Use lineage for impact analysis**: when a source schema changes or a data quality issue is detected, automatically identify all downstream datasets, dashboards, and models that are affected

<details><summary>中文步骤</summary>

1. 对数据管道进行埋点以捕获血缘元数据：在每个处理步骤记录源数据集、转换逻辑、输出数据集、执行时间戳和作业标识符
2. 将血缘元数据存储在专用血缘图（有向无环图）中，其中节点代表数据集或转换步骤，边代表数据流关系
3. 使用原生钩子或兼容OpenLineage的API将血缘捕获与编排工具（Airflow、dbt、Spark）集成，实现自动化元数据采集
4. 构建血缘UI或API，允许数据消费者、数据所有者和合规团队将任何数据集追溯到其上游来源和所有下游消费者
5. 使用血缘进行影响分析：当源模式变更或检测到数据质量问题时，自动识别所有受影响的下游数据集、仪表板和模型

</details>

## Do

- Do capture lineage at the column level wherever possible because table-level lineage is insufficient for regulatory compliance and root cause analysis
- Do use OpenLineage-compatible tooling to avoid vendor lock-in and enable lineage aggregation across heterogeneous pipeline tools
- Do store lineage in a graph database or dedicated lineage store rather than a relational table because traversal queries are natural graph operations
- Do automate lineage capture through instrumentation rather than manual documentation because manual lineage goes stale immediately after the first pipeline change

## Don't

- Don't conflate data lineage with data catalog documentation because lineage is runtime-captured provenance, not manually authored descriptions
- Don't capture only successful pipeline runs because failed runs and partial writes can cause data quality issues that require lineage to diagnose
- Don't expose raw lineage graphs to business users without a purpose-built UI because raw DAG structures are incomprehensible to non-engineers
- Don't rely solely on static code analysis for lineage because dynamic SQL generation and runtime table routing cannot be resolved statically

## Case Study

**ING Bank**: ING Bank implemented column-level data lineage across its enterprise data platform to satisfy BCBS 239 regulatory requirements for risk data aggregation and reporting. By instrumenting Spark jobs and dbt models with OpenLineage, ING can trace any figure in a regulatory capital report back to its source transaction in the core banking system, through every join and aggregation, in under five minutes. This replaced a previously manual documentation process that took compliance teams weeks per report.

## Related Frameworks

- data-mesh (complement)
- data-quality-framework (complement)
- schema-registry-pattern (complement)
- medallion-architecture (complement)

## Source

https://sdframe.caldis.me/frameworks/data-lineage
