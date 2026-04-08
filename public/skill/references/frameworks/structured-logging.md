# Structured Logging / 结构化日志

- **Category**: observability
- **Complexity**: beginner
- **Quality**: observability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Industry evolution from syslog; formalized by observability community, ~2013, 2001
- **Adopters**: Stripe, Datadog, Cloudflare, Honeycomb, Grafana Labs

Machine-parseable log format patterns that enable reliable querying and correlation at scale

_可机器解析的日志格式模式，支持大规模下的可靠查询和关联分析_

## When to Use

Apply this framework when:
- Any system producing logs that need to be queried, filtered, or correlated across services
- Microservice architectures where unstructured logs from dozens of services become impossible to search manually
- Compliance environments requiring auditable, machine-parseable log records with consistent schemas
- Teams adopting observability practices who need logs to correlate with traces and metrics via shared identifiers

## When NOT to Use

Stop and reconsider if:
- Embedded systems with extreme memory constraints where JSON serialization overhead is prohibitive
- Local development debugging where human-readable plaintext logs are faster to scan visually
- Legacy systems where retrofitting structured logging across the entire codebase is cost-prohibitive and the remaining lifespan is short
- Ultra-high-throughput data pipelines where even minimal logging adds unacceptable latency

## Core Concepts

- Key-Value Logging: Every log entry is a set of typed key-value pairs (JSON, logfmt) rather than a freeform string, enabling precise field-level queries
- Canonical Log Lines: A pattern where a single summary log line per request captures all important dimensions, reducing log volume while maximizing queryability
- Log Levels as Contracts: Structured severity levels (DEBUG, INFO, WARN, ERROR) are enforced consistently and used for alerting thresholds and retention policies
- Contextual Enrichment: Middleware or interceptors automatically inject request-scoped metadata (trace ID, user ID, request path) into every log entry
- Schema Evolution: Structured log schemas must be versioned and backward-compatible, just like API contracts, to prevent downstream parsing failures

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Structured Logging to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Replace unstructured log strings with structured key-value pairs: emit logs as JSON objects with consistent field names (timestamp, level, service, message, trace_id)
2. **Define a logging schema**: standardize field names, types, and required fields across all services in a shared logging library or convention document
3. **Enrich logs with contextual metadata**: attach request ID, user ID, trace ID, deployment version, and environment to every log entry automatically
4. Ship structured logs to a centralized log aggregation platform (ELK, Loki, CloudWatch Logs) via a unified agent or sidecar
5. **Build queryable dashboards and alerts**: use structured fields to filter, group, and aggregate logs without relying on fragile regex patterns

<details><summary>中文步骤</summary>

1. 将非结构化日志字符串替换为结构化键值对：以JSON对象形式输出日志，使用一致的字段名（timestamp、level、service、message、trace_id）
2. 定义日志模式：在共享日志库或约定文档中跨所有服务标准化字段名、类型和必需字段
3. 用上下文元数据丰富日志：自动为每条日志附加请求ID、用户ID、Trace ID、部署版本和环境信息
4. 通过统一代理或Sidecar将结构化日志传送到集中式日志聚合平台（ELK、Loki、CloudWatch Logs）
5. 构建可查询的仪表盘和告警：使用结构化字段过滤、分组和聚合日志，无需依赖脆弱的正则表达式

</details>

## Do

- Do use a shared logging library that enforces schema consistency across all services, because ad-hoc JSON formatting leads to field name drift
- Do include trace ID and span ID in every log entry, because this enables direct navigation from a log line to its parent trace
- Do adopt the canonical log lines pattern for high-throughput services, because one rich line per request is cheaper and more useful than scattered verbose logs
- Do set per-field retention policies, because debug-level logs and high-cardinality fields should expire faster than error logs

## Don't

- Don't log sensitive data (passwords, tokens, PII) in structured fields, because centralized log systems make data leaks searchable at scale
- Don't use string interpolation for log messages in hot paths, because constructing unused log strings wastes CPU even when the log level is disabled
- Don't embed stack traces as a single giant string field, because it prevents structured parsing of exception class, message, and frame data
- Don't allow unbounded log field cardinality (e.g., logging full request bodies), because it explodes index size and query costs in the aggregation backend

## Case Study

**Stripe**: Stripe pioneered the canonical log lines pattern where every API request produces exactly one structured log line containing all relevant dimensions: merchant ID, API version, endpoint, latency, response code, and feature flags active. This approach reduced their log volume by 10x compared to scattered multi-line logging while dramatically improving debugging speed. Engineers can query any combination of dimensions without writing regex, and the pattern became foundational to Stripe's high-cardinality observability strategy described by their engineering blog.

## Related Frameworks

- opentelemetry (complement)
- distributed-tracing (complement)
- four-golden-signals (complement)
- slo-as-practice (complement)

## Source

https://sdframe.caldis.me/frameworks/structured-logging
