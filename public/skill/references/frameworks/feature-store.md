# Feature Store / 特征仓库

- **Category**: data
- **Complexity**: advanced
- **Quality**: reliability, scalability, maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Uber (Michelangelo), 2017
- **Adopters**: Uber, Airbnb, LinkedIn, Twitter, Stripe, DoorDash

Centralized repository that manages the full lifecycle of ML features — from computation and storage to serving — enabling feature reuse, consistency between training and inference, and governance.

_集中式存储库，管理ML特征的完整生命周期——从计算和存储到服务——支持特征复用、训练与推理之间的一致性以及治理。_

## When to Use

Apply this framework when:
- When multiple ML teams are independently computing the same features (e.g., user age, trip count, churn score) from the same raw data sources, creating duplicate computation and inconsistency
- When training-serving skew is a recurring source of model performance degradation because features are computed differently in the batch training pipeline and the real-time inference path
- When regulatory compliance (GDPR right-to-erasure, CCPA) requires point-in-time auditable records of which feature values were used to make a specific ML-driven decision
- When the organization operates more than 10 production ML models and the total cost of per-model feature engineering is significant enough to justify a shared platform

## When NOT to Use

Stop and reconsider if:
- When an organization has fewer than 5 ML models in production; the operational overhead of a feature store exceeds its benefits at this scale
- When all ML models are batch-inference only with no real-time serving requirements; a simple feature engineering pipeline into the data warehouse is sufficient
- When data science teams are small (fewer than 5 people) and informal collaboration is sufficient to avoid duplicate feature engineering without platform overhead
- When ML models use unstructured data (images, text, audio) as primary inputs; feature stores are optimized for tabular entity-based features, not embedding stores

## Core Concepts

- Offline store: the historical feature store backed by a column-oriented data warehouse (BigQuery, Snowflake) or object store (S3 + Parquet) used to generate training datasets at any historical point in time
- Online store: a low-latency key-value store (Redis, DynamoDB, Bigtable) that holds the latest feature values for each entity (user ID, item ID) and serves features to real-time inference engines at p99 < 10ms
- Training-serving skew: the critical problem that arises when feature computation logic differs between training time and inference time, causing the model to see different feature distributions in production than it was trained on
- Point-in-time correct retrieval: the mechanism of joining feature values to training labels using only feature values that existed at or before the label timestamp, preventing data leakage and future information contamination

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Feature Store to?
- What constraints or existing architecture do you need to work within?
- Has your team used Feature Store before? (This is an advanced framework)

## Implementation Steps

1. Define feature transformations as versioned, reusable feature pipelines (using Spark, dbt, or Python) that compute features from raw data sources on a scheduled or streaming basis
2. Store computed features in a dual-store architecture: an offline store (data warehouse or object store) for historical training data, and an online store (Redis, DynamoDB) for low-latency inference serving
3. Register features in a feature registry with metadata (owner, data type, freshness SLA, entity key, computation logic) so data scientists can discover and reuse features without recomputing
4. Enforce point-in-time correct feature retrieval for training datasets so features are fetched as they would have been known at the label timestamp, preventing training-serving skew
5. Monitor feature freshness, drift, and usage metrics to detect stale features, model degradation signals, and unused features consuming compute budget

<details><summary>中文步骤</summary>

1. 将特征转换定义为版本化、可复用的特征管道（使用Spark、dbt或Python），按计划或流式方式从原始数据源计算特征
2. 将计算出的特征存储在双存储架构中：离线存储（数据仓库或对象存储）用于历史训练数据，在线存储（Redis、DynamoDB）用于低延迟推理服务
3. 在特征注册表中注册特征，包含元数据（所有者、数据类型、新鲜度SLA、实体键、计算逻辑），使数据科学家无需重新计算即可发现和复用特征
4. 对训练数据集强制执行时间点正确的特征检索，确保特征按标签时间戳时已知的状态获取，防止训练与服务偏差
5. 监控特征新鲜度、漂移和使用指标，以检测过时特征、模型退化信号和消耗计算预算的未使用特征

</details>

## Do

- Do separate the offline and online store architectures from day one because conflating historical training storage with real-time serving storage leads to unacceptable latency trade-offs
- Do enforce point-in-time correct feature retrieval in all training dataset generation pipelines because even a single data leakage incident can invalidate months of model evaluation metrics
- Do include feature freshness SLAs in the registry and alert when features become stale because a stale feature at inference time is equivalent to missing data from the model's perspective
- Do version feature definitions alongside model versions in the model registry so that model rollbacks automatically revert to the correct feature computation logic

## Don't

- Don't share the same feature pipeline for both training and real-time inference without explicit validation that the logic is identical; code duplication is safer than silent divergence
- Don't store raw events in the feature store; the feature store should contain pre-aggregated features, not raw data — raw event storage belongs in the data lake
- Don't allow data scientists to create ephemeral, undocumented feature transformations outside the feature store; all production features must be registered, tested, and governed
- Don't deploy a feature store before you have at least two models that could share features; the platform overhead is not justified for a single model

## Case Study

**Airbnb**: Airbnb built Zipline, its internal feature store, to serve 150+ ML models used in search ranking, price suggestion, fraud detection, and guest trust scoring. Before Zipline, data scientists spent 60% of their time on feature engineering; after, they reported spending under 20% because most features for a new model already existed in the store. Zipline's point-in-time correct training dataset generation prevented a class of training-serving skew bugs that had caused Airbnb's search ranking model to perform 8% worse in production than in offline evaluation. The platform processes 1.5 million feature computation jobs per day and serves features at p99 latency of 4ms.

## Related Frameworks

- feature-store-pattern (related)
- data-catalog (complement)
- data-lineage-governance (complement)
- data-lakehouse (complement)
- data-mesh (related)

## Source

https://sdframe.caldis.me/frameworks/feature-store
