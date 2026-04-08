# OpenTelemetry / OpenTelemetry统一可观测性标准

- **Category**: observability
- **Complexity**: intermediate
- **Quality**: observability, reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: CNCF (merger of OpenTracing & OpenCensus), 2019, 2010
- **Adopters**: Shopify, GitHub, eBay, Splunk, Grafana Labs

Unified observability standard for traces, metrics, and logs across services

_跨服务的追踪、指标和日志统一可观测性标准_

## When to Use

Apply this framework when:
- Building or migrating to microservices where cross-service visibility is essential for debugging
- Organizations wanting vendor-neutral instrumentation to avoid lock-in to a single observability backend
- Teams consolidating fragmented telemetry (separate tracing, metrics, and logging libraries) into one standard
- Cloud-native environments on Kubernetes where auto-instrumentation and sidecar collectors reduce manual effort

## When NOT to Use

Stop and reconsider if:
- Simple single-service applications where built-in logging and basic APM provide sufficient visibility
- Teams deeply invested in a vendor-specific SDK (e.g., Datadog native) that already provides superior auto-instrumentation for their stack
- Embedded or IoT systems with extreme resource constraints where the OTel SDK overhead is prohibitive
- Short-lived prototypes where the instrumentation setup time exceeds the project's lifespan

## Core Concepts

- Three Pillars Unification: OpenTelemetry provides a single SDK and API for traces, metrics, and logs, eliminating the need for separate instrumentation libraries
- Semantic Conventions: Standardized attribute naming (http.method, db.system, rpc.service) ensures consistent telemetry across languages and frameworks
- OTLP (OpenTelemetry Protocol): A vendor-neutral wire protocol for transmitting telemetry data efficiently between applications, collectors, and backends
- Collector Pipeline: A standalone agent/gateway that receives, processes, and exports telemetry with pluggable receivers, processors, and exporters
- Context Propagation: Automatically passes trace context (trace ID, span ID) across service boundaries via HTTP headers (W3C Trace Context) or messaging metadata

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying OpenTelemetry to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Instrument applications with OpenTelemetry SDK: add auto-instrumentation agents or manual spans to capture traces, metrics, and logs at service boundaries
2. **Define a consistent resource model**: tag every telemetry signal with service.name, service.version, deployment.environment, and other semantic conventions
3. Configure exporters to send telemetry data to your chosen backend (Jaeger, Prometheus, Grafana, Datadog) via OTLP protocol
4. Deploy the OpenTelemetry Collector as a central pipeline: receive, process (batch, filter, enrich), and export telemetry data with vendor-agnostic routing
5. **Correlate the three signals**: link trace IDs in logs, attach exemplars to metrics, and build dashboards that let you pivot from a metric anomaly to the exact trace and log

<details><summary>中文步骤</summary>

1. 使用OpenTelemetry SDK对应用进行埋点：添加自动埋点代理或手动Span，在服务边界捕获追踪、指标和日志
2. 定义一致的资源模型：为每个遥测信号打上service.name、service.version、deployment.environment等语义约定标签
3. 配置导出器，通过OTLP协议将遥测数据发送到所选后端（Jaeger、Prometheus、Grafana、Datadog）
4. 部署OpenTelemetry Collector作为中心管道：以厂商无关的路由方式接收、处理（批处理、过滤、丰富）和导出遥测数据
5. 关联三大信号：在日志中嵌入Trace ID，为指标附加Exemplar，构建仪表盘实现从指标异常到精确追踪和日志的跳转

</details>

## Do

- Do adopt auto-instrumentation first for quick wins, then add manual spans for business-critical paths that need richer context
- Do use the OpenTelemetry Collector instead of sending directly from apps to backends, because it decouples your application from the export destination
- Do follow semantic conventions strictly, because inconsistent attribute names make cross-service queries unreliable
- Do implement sampling strategies (head-based or tail-based) to control costs while retaining interesting traces

## Don't

- Don't instrument everything at maximum detail from day one, because the telemetry volume and cost will be unmanageable
- Don't mix OpenTelemetry with legacy tracing libraries (Zipkin client, Jaeger client) in the same service, because conflicting context propagation causes broken traces
- Don't skip resource attribute configuration, because telemetry without service identity is impossible to filter or route
- Don't ignore collector health monitoring, because a failing collector silently drops all telemetry data

## Case Study

**Shopify**: Shopify migrated from a patchwork of Datadog APM, StatsD, and custom tracing to OpenTelemetry across their Ruby on Rails monolith and surrounding microservices. By standardizing on OTel's auto-instrumentation and deploying a fleet of OTel Collectors, they reduced instrumentation maintenance burden by 40% and gained the ability to switch between observability backends without changing application code. During Black Friday 2023, correlated traces and metrics enabled their SRE team to identify and resolve a database connection pool bottleneck in under 5 minutes.

## Related Frameworks

- distributed-tracing (complement)
- structured-logging (complement)
- four-golden-signals (complement)
- use-method (alternative)
- red-method (alternative)
- sli-slo-sla (complement)

## Source

https://sdframe.caldis.me/frameworks/opentelemetry
