# Service Mesh Pattern / 服务网格模式

- **Category**: architecture
- **Complexity**: advanced
- **Quality**: reliability, observability
- **Abstraction**: system
- **Maturity**: established
- **Author**: William Morgan (Buoyant), 2017, 2016
- **Adopters**: Lyft, Airbnb, eBay, Salesforce, T-Mobile

Dedicated infrastructure for service-to-service communication

_为服务间通信提供专用基础设施层的架构模式_

## When to Use

Apply this framework when:
- When managing dozens or hundreds of microservices and cross-cutting concerns like mTLS, retries, and observability become repetitive in application code
- When zero-trust networking requires mutual TLS between all services without application code changes
- When canary deployments and traffic shifting need fine-grained, infrastructure-level control
- When distributed tracing and metrics need to be collected uniformly across all services

## When NOT to Use

Stop and reconsider if:
- Small deployments with fewer than 10 services where a simple API gateway or load balancer suffices
- Teams without Kubernetes expertise because most service meshes assume container orchestration
- Latency-sensitive applications where the added sidecar proxy hop is unacceptable

## Core Concepts

- Sidecar proxy: A proxy (typically Envoy) deployed alongside each service to handle all network traffic transparently
- Control plane: Centralized management (Istiod, linkerd-control-plane) that configures all sidecar proxies
- Data plane: The collection of sidecar proxies that actually handle request routing and policy enforcement
- Mutual TLS (mTLS): Automatic encryption and identity verification between services without application changes
- Traffic management: Capabilities like canary releases, circuit breaking, retries, and rate limiting managed at infrastructure level

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Service Mesh Pattern to?
- What constraints or existing architecture do you need to work within?
- Has your team used Service Mesh Pattern before? (This is an advanced framework)

## Implementation Steps

1. **Assess readiness**: evaluate whether your microservices count, operational complexity, and team maturity justify a service mesh investment
2. **Select a mesh implementation**: compare options (Istio, Linkerd, Consul Connect) based on feature set, resource overhead, and ecosystem fit
3. **Deploy sidecar proxies**: inject a proxy (e.g., Envoy) alongside each service instance to intercept all inbound and outbound traffic transparently
4. **Configure traffic policies**: set up mutual TLS, retry budgets, circuit breaking, rate limiting, and traffic splitting rules via the mesh control plane
5. **Establish observability**: leverage the mesh's built-in distributed tracing, metrics collection, and access logging for end-to-end service visibility

<details><summary>中文步骤</summary>

1. 评估就绪度：评估微服务数量、运维复杂度和团队成熟度是否足以证明服务网格的投入
2. 选择网格实现：根据功能集、资源开销和生态契合度比较选项（Istio、Linkerd、Consul Connect）
3. 部署边车代理：在每个服务实例旁注入代理（如Envoy），透明拦截所有入站和出站流量
4. 配置流量策略：通过网格控制面设置双向TLS、重试预算、熔断、限流和流量分割规则
5. 建立可观测性：利用网格内置的分布式追踪、指标采集和访问日志实现端到端服务可见性

</details>

## Do

- Do start with observability features first because they provide immediate value with low risk
- Do adopt incrementally by enabling the mesh for a subset of services first because big-bang rollouts are risky
- Do monitor the resource overhead of sidecar proxies because they consume CPU and memory alongside each service
- Do use the mesh for mTLS everywhere because it eliminates an entire class of network security vulnerabilities

## Don't

- Don't adopt a service mesh for fewer than 10 services because the operational overhead outweighs the benefits
- Don't ignore the latency added by sidecar proxies because each hop adds 1-3ms that compounds across call chains
- Don't configure traffic policies without load testing because misconfigured retry budgets can cause retry storms
- Don't assume the mesh replaces application-level resilience because it complements rather than substitutes business logic error handling

## Case Study

**Lyft**: Lyft built Envoy proxy to solve the challenge of managing service-to-service communication across hundreds of microservices written in multiple languages. Before Envoy, each service team implemented its own retry logic, circuit breaking, and observability, leading to inconsistent behavior. By deploying Envoy as a sidecar proxy for every service, Lyft achieved uniform mTLS, distributed tracing, and traffic management. Envoy was later donated to the CNCF and became the data plane for Istio and other service meshes.

## Related Frameworks

- microservices-decomposition (complement)
- circuit-breaker-pattern (related)
- infrastructure-as-code (related)

## Source

https://sdframe.caldis.me/frameworks/service-mesh-pattern
