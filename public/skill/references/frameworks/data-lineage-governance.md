# Data Lineage / 数据血缘

- **Category**: data
- **Complexity**: advanced
- **Quality**: observability, maintainability, security
- **Abstraction**: system
- **Maturity**: established
- **Author**: Apache Atlas, 2015
- **Adopters**: ING Bank, Airbnb, WeWork, Spotify, Danske Bank, Astronomer

Systematic tracking and visualization of data flow from origin through all transformations to final consumption, enabling impact analysis and regulatory compliance.

_系统地追踪和可视化数据从起源经过所有转换到最终消费的流动，支持影响分析和法规合规。_

## When to Use

Apply this framework when:
- When GDPR, CCPA, or BCBS 239 compliance requires demonstrating exactly which source systems contributed to a regulatory report and how the data was transformed
- When a data quality incident occurs and the team needs to rapidly identify all downstream dashboards, ML models, and reports consuming data from the corrupted source
- When planning schema changes or decommissioning a dataset and need to assess the full blast radius before executing the change
- When building a data mesh where domain teams need visibility into cross-domain data dependencies to avoid uncoordinated breaking changes

## When NOT to Use

Stop and reconsider if:
- Small teams with fewer than 20 pipelines where a simple data flow diagram maintained in Confluence provides sufficient lineage visibility without the engineering cost
- Real-time OLTP systems where data lineage tracking adds latency to transaction processing; use async audit logs instead
- When all data transformations happen inside a single SQL warehouse or dbt project; native lineage tools in those platforms are sufficient without a separate lineage service
- Early-stage startups where data infrastructure is volatile and lineage graphs would be outdated within weeks; invest in lineage when the data architecture stabilizes

## Core Concepts

- Dataset-level lineage: a directed acyclic graph (DAG) where nodes are datasets or tables and edges represent ETL jobs or SQL queries that produced the destination from its sources
- Column-level lineage: fine-grained tracking of individual column derivations through transformations, enabling precise impact analysis when a single upstream column changes
- OpenLineage: an open standard (Astronomer, 2021, now Linux Foundation) that defines a vendor-neutral event spec for emitting lineage from Airflow, Spark, dbt, Flink, and other engines
- Impact analysis vs. root-cause analysis: downstream traversal (what breaks if I change X) vs. upstream traversal (where did this bad data come from) — the two primary lineage use cases

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Data Lineage to?
- What constraints or existing architecture do you need to work within?
- Has your team used Data Lineage before? (This is an advanced framework)

## Implementation Steps

1. Instrument data pipelines, ETL jobs, and query engines to emit lineage events (source, transformation, destination) at execution time using open standards like OpenLineage
2. Collect and store lineage events in a graph database where nodes represent datasets or jobs and edges represent data flow or transformation relationships
3. Build column-level lineage by parsing SQL and transformation code to trace individual field derivations through multi-hop pipelines
4. Expose lineage graphs through a visualization layer that shows upstream dependencies and downstream impact for any selected dataset or column
5. Integrate lineage with data catalog entries, data quality alerts, and incident management so root-cause analysis automatically surfaces the affected lineage path

<details><summary>中文步骤</summary>

1. 使用OpenLineage等开放标准对数据管道、ETL作业和查询引擎进行插桩，在执行时发出血缘事件（源、转换、目标）
2. 在图数据库中收集和存储血缘事件，其中节点代表数据集或作业，边代表数据流或转换关系
3. 通过解析SQL和转换代码构建列级血缘，以跟踪多跳管道中的各个字段派生
4. 通过可视化层展示血缘图，显示任何选定数据集或列的上游依赖和下游影响
5. 将血缘与数据目录条目、数据质量告警和事件管理集成，使根本原因分析自动显示受影响的血缘路径

</details>

## Do

- Do adopt OpenLineage as your lineage emission standard from the start because vendor-specific lineage APIs create lock-in and prevent cross-tool lineage stitching
- Do capture column-level lineage from SQL engines and dbt models because dataset-level lineage alone cannot support regulatory column-to-report tracing requirements
- Do store lineage as a graph database (Neo4j, Amazon Neptune) rather than relational tables because multi-hop traversal queries are prohibitively expensive in SQL at scale
- Do integrate lineage alerts into your data quality monitoring so that when an upstream dataset fails validation, all downstream consumers receive automatic impact notifications

## Don't

- Don't rely solely on static code parsing for lineage because dynamic SQL, stored procedures, and runtime-generated queries are invisible to static analysis
- Don't attempt to capture lineage retroactively for existing pipelines by reading logs; instrument pipelines going forward and accept a lineage coverage gap for legacy systems
- Don't expose raw lineage graphs to business users without abstraction because hundreds of nodes and edges overwhelm non-technical stakeholders; build purpose-specific views
- Don't conflate lineage with data catalog; lineage is a dynamic, runtime-derived graph while a catalog is a curated, human-enriched metadata store — they complement each other

## Case Study

**ING Bank**: ING Bank implemented end-to-end data lineage across 15,000 data assets to satisfy European Banking Authority (EBA) BCBS 239 data risk reporting requirements. Using Apache Atlas as the metadata backbone, ING mapped column-level lineage from operational databases through 300+ ETL pipelines to 120 regulatory reports. When the EBA requested proof of data origin for capital adequacy ratios, ING's lineage system produced a complete audit trail from source transaction records to the final reported figure in under 4 hours — a process that previously required 3 weeks of manual investigation. The lineage system now detects 85% of pipeline failures through downstream impact propagation before business users notice.

## Related Frameworks

- data-catalog (complement)
- data-quality-framework (complement)
- medallion-architecture (complement)
- data-contract (complement)

## Source

https://sdframe.caldis.me/frameworks/data-lineage-governance
