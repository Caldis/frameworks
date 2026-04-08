# Feature Store Pattern / 特征存储模式

- **Category**: data
- **Complexity**: intermediate
- **Quality**: reliability, scalability, maintainability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Uber Michelangelo team (Hermann, Del Balso et al.), 2017
- **Adopters**: Uber, Airbnb, Spotify, Doordash, Gojek

Centralized ML feature management for training and serving

_集中化ML特征管理，统一训练与在线服务_

## When to Use

Apply this framework when:
- When multiple ML models across teams share common features and redundant computation wastes resources
- When training-serving skew causes model accuracy degradation in production
- When feature engineering is the bottleneck in ML development and data scientists spend most of their time on data preparation
- When feature lineage, versioning, and quality monitoring are required for model governance and reproducibility

## When NOT to Use

Stop and reconsider if:
- When you have only one or two ML models that do not share features and the overhead of a feature store is not justified
- When all features are simple direct database lookups with no transformation logic that could cause training-serving skew
- When the organization is in early ML adoption and simpler feature management through version-controlled scripts is sufficient
- When models do not require real-time serving and batch prediction with offline features meets all requirements

## Core Concepts

- Feature registry: a centralized catalog where features are defined, versioned, documented, and discoverable across the organization
- Offline-online duality: the same features are materialized into an offline store for batch training and an online store for real-time serving with consistent semantics
- Training-serving consistency: identical feature transformation logic is used during training and inference, eliminating the training-serving skew that degrades model quality
- Point-in-time correctness: features for training datasets are computed as of the event timestamp to prevent data leakage and ensure temporal validity

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Feature Store Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define features as reusable, versioned entities with clear ownership, descriptions, data types, and lineage tracked in a feature registry
2. Build feature pipelines that compute features from raw data sources using batch (Spark) or real-time (Flink, Kafka) transformations and write them to the feature store
3. Materialize features into both an offline store (data warehouse or lake) for training and an online store (Redis, DynamoDB) for low-latency serving
4. Ensure training-serving consistency by using the same feature definitions and transformation logic for both model training datasets and real-time inference requests
5. Enable feature discovery, sharing, and monitoring by providing a catalog with search, usage metrics, data quality checks, and drift detection

<details><summary>中文步骤</summary>

1. 将特征定义为可复用、版本化的实体，在特征注册表中追踪清晰的所有权、描述、数据类型和血缘
2. 构建特征管道，使用批处理（Spark）或实时（Flink、Kafka）转换从原始数据源计算特征并写入特征存储
3. 将特征物化到离线存储（数据仓库或湖）用于训练和在线存储（Redis、DynamoDB）用于低延迟服务
4. 通过对模型训练数据集和实时推理请求使用相同的特征定义和转换逻辑来确保训练-服务一致性
5. 通过提供带搜索、使用指标、数据质量检查和漂移检测的目录来实现特征发现、共享和监控

</details>

## Do

- Do enforce point-in-time correctness when generating training datasets because temporal data leakage silently corrupts model quality
- Do version features and track lineage because reproducibility of ML experiments depends on knowing exactly which feature definitions were used
- Do monitor feature data quality and distribution drift in production because degraded features silently degrade model predictions
- Do design features to be reusable across multiple models because the primary value of a feature store is shared computation

## Don't

- Don't let data scientists compute features in ad-hoc notebooks and deploy them to production without the feature store because it creates training-serving skew
- Don't skip the online store for real-time serving models because fetching features from the offline store at serving time introduces unacceptable latency
- Don't treat the feature store as a data warehouse replacement because it is specifically designed for ML feature lifecycle management
- Don't ignore feature freshness requirements because stale features in the online store produce predictions based on outdated information

## Case Study

**Uber**: Uber's Michelangelo platform introduced the feature store concept to solve the problem of thousands of ML models needing consistent access to shared features like trip distance, driver rating, and surge multiplier. By centralizing feature computation, Uber eliminated redundant feature pipelines across teams, ensured training-serving parity, and reduced the time to deploy a new ML model from months to weeks.

## Related Frameworks

- mlops (complement)
- data-lakehouse (complement)
- data-mesh (complement)
- stream-processing-patterns (complement)

## Source

https://sdframe.caldis.me/frameworks/feature-store-pattern
