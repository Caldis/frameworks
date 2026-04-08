# Sidecar Pattern / 边车模式

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: maintainability, scalability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Microsoft Azure Architecture Center (formalized 2016); popularized by Envoy/Istio (2016-2017), 2013
- **Adopters**: Lyft (Envoy), Google (Istio), Airbnb, Stripe, Shopify

Attach auxiliary processes alongside primary services for cross-cutting concerns

_在主服务旁部署辅助进程以处理横切关注点_

## When to Use

Apply this framework when:
- When multiple services written in different languages need the same cross-cutting capabilities without duplicating libraries in each language
- When platform teams want to enforce consistent networking policies (mTLS, retries, rate limiting) across all services transparently
- When the application team should not need to understand or maintain infrastructure concerns like service mesh configuration
- When migrating legacy applications to a service mesh where modifying application code is impractical

## When NOT to Use

Stop and reconsider if:
- Monolithic applications where cross-cutting concerns are handled within the application framework itself
- Extremely latency-sensitive paths where even the sub-millisecond overhead of a local proxy is unacceptable
- Small deployments with only a few services where the operational complexity of managing sidecars outweighs the benefits

## Core Concepts

- Co-location: The sidecar runs in the same network namespace and scheduling unit (e.g., Kubernetes pod) as the primary, sharing localhost and lifecycle
- Transparent interception: Traffic is redirected through the sidecar via iptables or CNI plugins so the application communicates normally without awareness of the proxy
- Polyglot support: Because the sidecar operates at the network layer, it provides uniform capabilities regardless of the primary service's programming language
- Separation of concerns: Application developers focus on business logic while platform engineers manage the sidecar configuration and upgrades
- Control plane / data plane split: A centralized control plane pushes configuration to distributed sidecar data planes, enabling fleet-wide policy changes

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Sidecar Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify cross-cutting concerns**: determine which capabilities (logging, monitoring, TLS termination, service discovery, circuit breaking) should be extracted from the application code
2. **Design the sidecar contract**: define how the primary service and sidecar communicate — shared localhost network, Unix domain sockets, or shared filesystem volumes
3. Deploy the sidecar as a co-located process: configure the orchestrator (e.g., Kubernetes pod) to schedule the sidecar container alongside the primary container with shared lifecycle
4. **Route traffic through the sidecar**: use iptables rules, init containers, or transparent proxying so that inbound and outbound traffic flows through the sidecar without application code changes
5. **Manage sidecar lifecycle independently**: update, configure, and version the sidecar proxy separately from the application, enabling platform-wide policy changes without redeploying services

<details><summary>中文步骤</summary>

1. 识别横切关注点：确定哪些能力（日志、监控、TLS终止、服务发现、熔断）应从应用代码中提取
2. 设计边车契约：定义主服务与边车的通信方式——共享localhost网络、Unix域套接字或共享文件系统卷
3. 将边车作为共置进程部署：配置编排器（如Kubernetes Pod）将边车容器与主容器共同调度，共享生命周期
4. 将流量路由通过边车：使用iptables规则、init容器或透明代理，使入站和出站流量在无需修改应用代码的情况下经过边车
5. 独立管理边车生命周期：独立于应用更新、配置和版本化边车代理，实现无需重新部署服务即可进行平台级策略变更

</details>

## Do

- Do keep the sidecar lightweight and single-purpose because a bloated sidecar adds latency and resource overhead to every pod
- Do version and release the sidecar independently from the application because coupling their release cycles defeats the purpose of separation
- Do provide escape hatches for bypassing the sidecar because some traffic (e.g., health probes, localhost debugging) should not be intercepted
- Do monitor sidecar resource consumption separately because sidecar CPU and memory usage can be significant at scale

## Don't

- Don't put business logic in the sidecar because it should contain only infrastructure concerns; mixing concerns creates tight coupling
- Don't assume zero-cost proxying because each sidecar adds at least one network hop of latency and consumes CPU for TLS handshakes and header parsing
- Don't deploy sidecars without a control plane because managing hundreds of independently configured sidecars becomes operationally intractable
- Don't ignore sidecar startup ordering because if the sidecar is not ready before the application starts, initial requests will fail

## Case Study

**Lyft**: Lyft built Envoy as an internal sidecar proxy to solve the challenge of operating a polyglot microservices fleet (Python, Go, C++) with consistent observability and resilience. Before Envoy, each language ecosystem maintained its own HTTP client library with inconsistent retry logic, timeout handling, and metrics emission. By deploying Envoy as a sidecar in every pod, Lyft achieved uniform distributed tracing, automatic retries with circuit breaking, and consistent latency metrics across all services regardless of language. Envoy handles over 3 million requests per second at Lyft and was donated to the CNCF, becoming the foundation for Istio and other service mesh implementations.

## Related Frameworks

- service-mesh-pattern (complement)
- hexagonal-architecture (complement)
- bulkhead-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/sidecar-pattern
