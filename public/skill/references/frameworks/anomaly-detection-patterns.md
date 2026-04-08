# Anomaly Detection Patterns / 异常检测模式

- **Category**: observability
- **Complexity**: advanced
- **Quality**: reliability, performance, maintainability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Chandola, Banerjee & Kumar (2009, ACM Computing Surveys); productized by Datadog Watchdog (2018) and Netflix Argos
- **Adopters**: Netflix, Datadog, LinkedIn, Uber, Amazon

ML-based and statistical anomaly detection for metrics, logs, and traces in production systems

_生产系统中针对指标、日志和追踪的基于ML和统计的异常检测_

## When to Use

Apply this framework when:
- When threshold-based alerting is producing excessive false positives because traffic patterns vary by time of day, day of week, or seasonal events
- When incidents are being missed because the failure mode produces gradual degradation that never crosses a fixed threshold until it becomes catastrophic
- When the system has enough historical data (6+ months) to establish stable seasonal baselines for detection
- When the observability platform has metrics from hundreds of services and manual threshold management is no longer feasible

## When NOT to Use

Stop and reconsider if:
- New services with fewer than 4-6 weeks of production data where baselines cannot be reliably established
- Services with highly irregular traffic patterns that have no repeating seasonality, where seasonal models will produce constant false positives
- Simple services with a single critical metric (e.g., queue depth) where a threshold alert is more interpretable and equally effective
- Teams that are not yet ready to investigate and tune false positives because unmaintained anomaly detectors quickly become noise generators that are silently ignored

## Core Concepts

- Point Anomaly: A single data point that deviates significantly from expected values — the simplest case, detectable with Z-score or IQR methods on stable metrics
- Contextual Anomaly: A data point that is anomalous only given its temporal context — e.g., 50 RPS is normal at 3am but anomalous at 2pm for the same service
- Seasonal Decomposition (STL): Separates a time series into trend, seasonal, and residual components; anomalies are detected in the residual component after removing expected patterns
- Isolation Forest: An ensemble tree-based method that isolates anomalies by randomly partitioning feature space; anomalous points require fewer partitions to isolate
- Sensitivity Tuning: The threshold on anomaly score above which an alert is fired; lower thresholds increase recall (catch more anomalies) but decrease precision (more false positives)

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Anomaly Detection Patterns to?
- What constraints or existing architecture do you need to work within?
- Has your team used Anomaly Detection Patterns before? (This is an advanced framework)

## Implementation Steps

1. Define what constitutes an anomaly for each signal type: point anomalies (single outlier values), contextual anomalies (normal value at abnormal time), and collective anomalies (pattern of individually normal values that together are abnormal)
2. Select the appropriate detection algorithm for each metric's characteristics: Z-score or moving average for stable metrics, seasonal decomposition (STL) for time-series with known periodicity, and Isolation Forest or LSTM for multivariate or complex patterns
3. Train baselines during representative traffic periods and tune sensitivity (false positive vs. false negative trade-off) per signal, erring toward fewer high-confidence alerts over many low-confidence ones
4. Integrate anomaly scores into the alerting pipeline as a supplementary signal alongside threshold-based alerts, not as a replacement, to catch regressions that don't cross fixed thresholds
5. Continuously validate the detector by correlating anomaly detections with confirmed incidents and tracking false positive rate; retrain models when traffic patterns change (new features, seasonality shifts)

<details><summary>中文步骤</summary>

1. 为每种信号类型定义什么构成异常：点异常（单个离群值）、上下文异常（在异常时间的正常值）和集体异常（单独正常值组合在一起的异常模式）
2. 为每个指标的特征选择适当的检测算法：对于稳定指标使用Z分数或移动平均，对于已知周期性的时间序列使用季节分解（STL），对于多变量或复杂模式使用Isolation Forest或LSTM
3. 在代表性流量期间训练基线，并为每个信号调整敏感度（误报与漏报权衡），倾向于较少的高置信度告警而不是许多低置信度告警
4. 将异常分数作为补充信号集成到告警流水线中，与基于阈值的告警并行，而不是替代，以捕获不超过固定阈值的回归
5. 通过将异常检测与已确认的事故关联并跟踪误报率来持续验证检测器；当流量模式变化时重新训练模型（新功能、季节性变化）

</details>

## Do

- Do combine anomaly detection with threshold-based alerts because anomaly detection catches gradual regressions while thresholds catch sudden catastrophic failures — they complement each other
- Do validate anomaly detectors on historical incident data before enabling them in production to measure precision and recall against known events
- Do separate anomaly detection models per service or metric category because a single global model will be dominated by high-traffic services and miss anomalies in low-traffic ones
- Do set a minimum data requirement (e.g., 4+ weeks of stable history) before enabling anomaly detection to prevent models from training on insufficient or misleading baselines

## Don't

- Don't treat anomaly detection as a replacement for SLO-based alerting because SLOs directly measure user impact while anomaly detection finds statistical deviations that may not matter to users
- Don't deploy anomaly detection without human review of initial alerts because newly trained models always have a burn-in period of high false positive rates
- Don't apply anomaly detection to metrics with fewer than a few hundred data points because statistical models require sufficient data to establish meaningful baselines
- Don't ignore seasonality when building detection models because a model unaware of weekly traffic patterns will fire alerts every Monday morning when traffic ramps up

## Case Study

**Netflix**: Netflix developed its Argos anomaly detection system to monitor thousands of microservice metrics simultaneously. Before Argos, SREs maintained thousands of manual thresholds that became obsolete with every traffic pattern change. Argos applies a robust PCA decomposition to separate expected variance from anomalous variance, reducing alert noise by 72% while catching 15% more incidents than threshold-based alerting alone. The system processes over 2 million metric data points per minute across Netflix's microservice fleet and automatically surfaces the top anomalies ranked by impact score, allowing on-call engineers to investigate the most important signals first.

## Related Frameworks

- structured-logging (complement)
- slo-as-practice (complement)
- feature-flag-observability (complement)

## Source

https://sdframe.caldis.me/frameworks/anomaly-detection-patterns
