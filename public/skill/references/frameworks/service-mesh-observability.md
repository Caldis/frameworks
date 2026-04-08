# Service Mesh Observability / 服务网格可观测性

- **Category**: observability
- **Complexity**: advanced
- **Quality**: observability, reliability, performance
- **Abstraction**: system
- **Maturity**: established
- **Author**: Lyft / Envoy Proxy team; Istio project (Google, IBM, Lyft), 2016
- **Adopters**: Lyft, Airbnb, Pinterest, Salesforce, T-Mobile

Leveraging the service mesh data plane (Envoy, Linkerd) to automatically capture golden signal telemetry for every service-to-service call without application code changes

_利用服务网格数据平面（Envoy、Linkerd）自动捕获每个服务间调用的黄金信号遥测数据，无需修改应用代码_

## When to Use

Apply this framework when:
- Microservices environments where instrumenting every service individually is operationally impractical or politically difficult
- Polyglot architectures where services span multiple languages and a consistent telemetry approach is needed without per-language SDKs
- Organizations that need mTLS encryption, traffic shaping, and observability from the same infrastructure layer
- Platform teams building internal developer platforms where golden-signal observability must be automatic for all onboarded services

## When NOT to Use

Stop and reconsider if:
- Monolithic applications where all service calls are in-process — the mesh only observes network traffic, not in-process function calls
- Teams without Kubernetes expertise — service meshes introduce significant operational complexity that can outweigh observability benefits for small teams
- Latency-critical paths where the extra 2-5 ms of sidecar overhead is unacceptable (high-frequency trading, real-time gaming)
- Early-stage startups with fewer than 10 services where the setup cost of a mesh exceeds the debugging value it provides

## Core Concepts

- Sidecar Proxy: A co-located proxy container (typically Envoy) intercepts all network traffic to and from the application container, enabling zero-code-change observability, security, and traffic management
- Golden Signals from L7: The mesh proxy automatically tracks request rate, error rate, and latency (RED method) per service pair, plus saturation via connection pool metrics, without any application-side code
- Control Plane Telemetry API: The mesh control plane (Istiod, Linkerd control plane) provides a service topology graph and policy-enforcement telemetry that complements the data-plane metrics
- mTLS-correlated Tracing: Service mesh can correlate distributed traces with mTLS certificate identities, enabling security audits and per-identity traffic analysis alongside performance observability
- Traffic Policy Events: Retries, circuit-breaker state transitions, and outlier ejections emitted by the data plane form an event stream that enriches the observability picture beyond raw request metrics

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Service Mesh Observability to?
- What constraints or existing architecture do you need to work within?
- Has your team used Service Mesh Observability before? (This is an advanced framework)

## Implementation Steps

1. Deploy a service mesh control plane (Istio, Linkerd, or Consul Connect) and inject sidecar proxies into all workloads — the proxies intercept every inbound and outbound connection and emit L4/L7 telemetry automatically
2. **Enable the mesh telemetry pipeline**: configure Envoy access logs, Prometheus metrics scraping, and distributed trace propagation (x-b3-traceid headers or W3C Trace Context) to flow into your observability backends
3. Define service-level traffic policies (retries, timeouts, circuit breaking) in the mesh control plane and correlate these policy events with the telemetry stream to understand how resilience mechanisms affect the four golden signals
4. Build a topology view by consuming the mesh control plane service registry and combining it with real-time traffic metrics to produce a live service dependency map showing error rates and latency per edge
5. Set SLO-aligned alerts on mesh-generated metrics (e.g., istio_requests_total, istio_request_duration_milliseconds_bucket) and create runbooks that map mesh observability signals to specific remediation actions

<details><summary>中文步骤</summary>

1. 部署服务网格控制平面（Istio、Linkerd或Consul Connect）并向所有工作负载注入Sidecar代理——代理拦截所有入站和出站连接，自动发出L4/L7遥测数据
2. 启用网格遥测管道：配置Envoy访问日志、Prometheus指标抓取和分布式追踪传播（x-b3-traceid头或W3C Trace Context）以流入可观测性后端
3. 在网格控制平面定义服务级别流量策略（重试、超时、熔断）并将这些策略事件与遥测流关联，以了解弹性机制如何影响四个黄金信号
4. 通过消费网格控制平面服务注册表并结合实时流量指标，构建拓扑视图，生成显示每条边错误率和延迟的实时服务依赖图
5. 基于网格生成的指标（如istio_requests_total、istio_request_duration_milliseconds_bucket）设置与SLO对齐的告警，并创建将网格可观测性信号映射到具体补救操作的运行手册

</details>

## Do

- Do enable distributed trace context propagation at the mesh level and ensure applications pass through trace headers unchanged, so end-to-end traces span both mesh-generated and application-generated spans
- Do use mesh telemetry as the floor, not the ceiling — add application-level spans for business logic details that the proxy cannot observe
- Do monitor control plane health separately; a degraded Istiod can cause stale configuration that skews traffic policy metrics
- Do implement workload-level RBAC in the mesh and align it with your observability access controls so security and telemetry data share the same identity model

## Don't

- Don't assume sidecar observability replaces application-level tracing — the proxy only sees network-level events; business transaction context requires application instrumentation
- Don't underestimate sidecar resource overhead: each Envoy sidecar consumes 50-100 MB RAM and adds 1-5 ms latency; benchmark before fleet-wide rollout
- Don't ignore cardinality explosions in mesh-generated labels — high-cardinality dimensions (user IDs, request paths) on Prometheus metrics can exhaust memory
- Don't route all telemetry through the mesh itself — observability data should bypass the mesh's own retry/timeout policies to avoid circular failure modes

## Case Study

**Airbnb**: Airbnb adopted Envoy-based service mesh observability as part of their OneWeb platform initiative. By replacing hundreds of bespoke service-to-service monitoring integrations with mesh-generated RED metrics and distributed traces, they reduced the time to diagnose cross-service latency regressions from hours to minutes. Their platform team exposed a self-service Grafana dashboard template backed entirely by Istio metrics, enabling product teams to achieve production-grade observability on day one of service creation without any instrumentation code.

## Related Frameworks

- opentelemetry (related)
- distributed-tracing (related)
- four-golden-signals (related)
- service-mesh-pattern (related)
- slo-as-practice (related)

## Source

https://sdframe.caldis.me/frameworks/service-mesh-observability
