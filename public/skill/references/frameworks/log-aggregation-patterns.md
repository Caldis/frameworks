# Log Aggregation Patterns / 日志聚合模式

- **Category**: observability
- **Complexity**: intermediate
- **Quality**: observability, security, maintainability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Jay Kreps, 2004
- **Adopters**: Airbnb, Uber, Netflix, Wikimedia Foundation, Elastic (ELK Stack), Grafana Labs (Loki)

Centralized collection, parsing, and querying of logs from distributed services using platforms like ELK, Loki, and Datadog

_使用ELK、Loki和Datadog等平台对分布式服务的日志进行集中收集、解析和查询_

## When to Use

Apply this framework when:
- Operating distributed systems with more than 3-4 services where correlating events across individual service logs becomes impractical without centralized search
- Compliance and audit requirements mandate centralized, tamper-evident log storage with defined retention periods and access controls
- Incident response times are slow because engineers spend hours SSH-ing into individual servers to grep through logs rather than querying a central log store
- Security operations teams need to detect patterns across log sources (failed logins across multiple services, unusual API access patterns) that are impossible to see in siloed logs

## When NOT to Use

Stop and reconsider if:
- Single-service monolithic applications where application logs are accessible on one or a few hosts and the operational overhead of a log aggregation stack outweighs the convenience benefit
- Strictly air-gapped environments where regulations prohibit sending log data to any external or centralized system, requiring per-host log analysis tooling instead
- Ultra-low-latency systems where the overhead of structured JSON logging and log shipper processes is a measurable performance bottleneck on the critical path

## Core Concepts

- Log Shipper: a lightweight agent (Filebeat, Fluentd, Promtail, Vector) deployed alongside each service that tails log output, applies parsing and enrichment, and forwards logs to the central aggregation backend with minimal overhead
- Index vs Label-based Storage: Elasticsearch indexes log content for full-text search (high cost, high flexibility); Loki uses label-indexed streams (low cost, queried by metadata first then content) — the choice drives cost and query patterns
- Structured Logging: emitting logs as JSON objects with typed fields rather than freeform strings, enabling precise filtering (level=ERROR AND service=checkout AND user_id=12345) without fragile regex parsing
- Log Correlation: embedding trace_id and span_id in every log line enables jumping from a log event to its parent distributed trace in Jaeger/Zipkin, turning logs from isolated events into a navigable signal
- Retention Tiering: hot storage (7-30 days, fast query) → warm storage (30-90 days, slower) → cold/archive (compliance retention, rarely queried) — matching query frequency to storage cost

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Log Aggregation Patterns to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Standardize log format across all services: adopt structured JSON logging with consistent fields (timestamp, level, service, trace_id, request_id, user_id) so logs can be parsed and queried without custom per-service rules
2. Choose and deploy a log aggregation stack: ELK (Elasticsearch + Logstash + Kibana) for full-text search and analytics, Loki for label-based querying with lower storage cost, or a managed platform like Datadog Logs for operational simplicity
3. Configure log shippers on each host or container (Filebeat, Fluentd, Promtail, Vector) to tail log files or consume stdout and forward to the central aggregation system with service metadata enrichment
4. Define log retention policies by log category: security and audit logs typically require 1-7 years; application debug logs can be retained for 7-30 days; balance queryability with storage cost
5. **Correlate logs with traces and metrics**: inject trace IDs into every log line and configure your observability backend to pivot from a log entry to its associated distributed trace for rapid incident diagnosis

<details><summary>中文步骤</summary>

1. 跨所有服务标准化日志格式：采用带有一致字段（timestamp、level、service、trace_id、request_id、user_id）的结构化JSON日志，使日志无需自定义按服务规则即可解析和查询
2. 选择并部署日志聚合技术栈：ELK（Elasticsearch+Logstash+Kibana）用于全文搜索和分析，Loki用于基于标签的查询且存储成本更低，或使用Datadog日志等托管平台以降低运维复杂度
3. 在每台主机或容器上配置日志采集器（Filebeat、Fluentd、Promtail、Vector），以跟踪日志文件或消费stdout，并通过服务元数据丰富后转发到中央聚合系统
4. 按日志类别定义日志保留策略：安全和审计日志通常需要保留1-7年；应用调试日志可保留7-30天；在可查询性与存储成本之间取得平衡
5. 将日志与追踪和指标关联：在每条日志行中注入Trace ID，并配置可观测性后端以从日志条目跳转到其关联的分布式追踪，用于快速事故诊断

</details>

## Do

- Do enforce structured JSON logging as a service standard — require it in code review and lint for freeform log strings; unstructured logs become ungrepable liabilities at scale
- Do inject a correlation ID (trace_id or request_id) at the request entry point and propagate it through all downstream service calls so any log line can be used to find all related events
- Do set log levels deliberately: use DEBUG for development, INFO for significant application events, WARN for recoverable issues, ERROR for failures requiring attention — and configure production to ship only INFO and above by default
- Do test your log aggregation pipeline in a staging environment that mirrors production load, as high-cardinality label explosions in Loki or large index mappings in Elasticsearch often only surface at production volume

## Don't

- Don't log sensitive data (passwords, tokens, PII, card numbers) even at DEBUG level — build automated PII detection into your log shipper pipeline as a safety net for accidental data leakage
- Don't use high-cardinality values (user IDs, request IDs) as Loki labels or Elasticsearch field names that are indexed — they cause label explosion or mapping explosion that degrades query performance and increases cost
- Don't treat all logs equally in retention policy — storing debug-level logs for years is expensive and rarely valuable; define tiered retention policies based on log category and compliance requirement
- Don't skip centralized log sampling for very high-volume debug logging paths — 100% log capture at millions of requests per second is prohibitively expensive; sample at the shipper level for non-critical paths

## Case Study

**Airbnb**: Airbnb migrated from host-based log tailing to a centralized ELK-based log aggregation platform as their microservices architecture grew to over 200 services. The migration standardized log format to structured JSON across all services and deployed Filebeat sidecars in their Kubernetes pods. The key outcome was incident response: before centralization, identifying the root cause of a checkout failure required 45-90 minutes of log correlation across 8+ services. After deploying centralized log search with trace ID correlation, the same investigation took under 10 minutes. Airbnb also implemented automated log-based anomaly detection that caught 3 silent data integrity issues in 6 months that had no corresponding metric alerts — bugs that were writing incorrect data to the database without failing loudly enough to trigger error rate SLOs.

## Related Frameworks

- opentelemetry (complement)
- distributed-tracing (complement)
- structured-logging (related)
- four-golden-signals (related)
- observability-as-code (related)

## Source

https://sdframe.caldis.me/frameworks/log-aggregation-patterns
