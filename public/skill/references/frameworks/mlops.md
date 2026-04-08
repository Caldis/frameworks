# MLOps / MLOps

- **Category**: deployment
- **Complexity**: advanced
- **Quality**: reliability, maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: D. Sculley et al. (Google), 2015; term MLOps coined ~2018
- **Adopters**: Uber, Airbnb, Spotify, Netflix, Lyft

Apply DevOps practices to ML model lifecycle in production

_将DevOps实践应用于机器学习模型的生产全生命周期_

## When to Use

Apply this framework when:
- Organizations deploying ML models to production that need reproducibility, monitoring, and automated retraining
- Teams managing multiple models across different lifecycle stages
- Regulated industries requiring model governance, audit trails, and bias validation
- Data science teams transitioning from notebook-based experimentation to production-grade model serving

## When NOT to Use

Stop and reconsider if:
- One-off data analysis or research projects where models are not deployed to production
- Simple rule-based systems where ML models are not involved
- Very early ML exploration where the team is still evaluating whether ML adds value
- Tiny teams with a single model where MLOps tooling overhead exceeds the benefit

## Core Concepts

- Data Versioning: Track and version datasets alongside code and model artifacts to ensure reproducibility
- Feature Store: A centralized repository of reusable features ensuring consistency between training and serving
- Experiment Tracking: Log hyperparameters, metrics, and artifacts for every training run for reproducible comparisons
- Model Registry: A versioned catalog of trained models with metadata governing promotion from staging to production
- Data Drift Detection: Continuous monitoring of input data distributions to detect when production data diverges from training data

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying MLOps to?
- What constraints or existing architecture do you need to work within?
- Has your team used MLOps before? (This is an advanced framework)

## Implementation Steps

1. Version data, code, and model artifacts together; use a feature store for reproducibility
2. Automate training pipelines triggered by new data or code changes with experiment tracking
3. Validate model quality with offline metrics (AUC, RMSE) and fairness/bias checks before promotion
4. Deploy models via A/B testing or shadow mode; monitor data drift and prediction distribution
5. Trigger automated retraining pipelines when drift or performance degradation is detected

<details><summary>中文步骤</summary>

1. 对数据、代码和模型制品进行联合版本管理，使用特征存储保障可复现性
2. 以新数据或代码变更为触发器自动化训练流水线，并跟踪实验记录
3. 在模型晋升前通过离线指标（AUC、RMSE）和公平性/偏差检查验证质量
4. 通过A/B测试或影子模式部署模型，监控数据漂移和预测分布变化
5. 检测到漂移或性能劣化时触发自动化重训练流水线

</details>

## Do

- Do version data, code, and model artifacts as a unified lineage, because reproducibility requires knowing exactly which data trained which model
- Do automate model validation gates with offline metrics and bias checks before any model reaches production
- Do monitor production model performance continuously, because data drift causes silent accuracy degradation
- Do implement automated retraining pipelines triggered by drift detection, because model freshness directly impacts prediction quality

## Don't

- Don't deploy models without a rollback strategy, because ML models can degrade subtly
- Don't train on production data without proper data governance, because PII leakage has severe legal consequences
- Don't ignore training-serving skew, because feature computation differences cause silent prediction errors
- Don't let data scientists deploy directly from notebooks to production, because notebooks lack testing and monitoring

## Case Study

**Uber**: Uber built Michelangelo, their internal MLOps platform, to manage the full lifecycle of thousands of ML models powering ride pricing, ETA predictions, fraud detection, and driver matching. Michelangelo provides a feature store, automated training pipelines, a model registry, and real-time serving infrastructure. By standardizing the ML workflow, Uber reduced model development-to-production time from months to days.

## Related Frameworks

- llmops (extends)
- dora-metrics (complement)
- canary-deployment (complement)

## Source

https://sdframe.caldis.me/frameworks/mlops
