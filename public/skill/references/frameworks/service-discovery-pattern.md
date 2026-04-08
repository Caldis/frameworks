# Service Discovery Pattern / 服务发现模式

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Chris Richardson, 2012
- **Adopters**: Netflix (Eureka), HashiCorp Consul users, Kubernetes (kube-dns + Services), Spring Cloud Gateway, Istio service mesh

DNS-based and registry-based mechanisms for services to locate each other dynamically in elastic infrastructure

_服务在弹性基础设施中动态定位彼此的基于 DNS 和注册表的机制_

## When to Use

Apply this framework when:
- When running microservices on dynamic cloud infrastructure where instance IPs change on every restart, scaling event, or deployment
- When you have multiple service instances behind a load balancer and need clients to discover healthy instances without hard-coded configuration
- When deploying to container orchestration platforms (Kubernetes, Nomad, ECS) that natively provide service discovery primitives
- When different versions of a service must be routed to different clients during canary or blue-green deployments

## When NOT to Use

Stop and reconsider if:
- Small-scale deployments with a fixed set of services on static infrastructure where DNS entries or configuration files are sufficient and the registry adds operational complexity without benefit
- Monolithic applications where all components run in the same process and inter-component communication is in-process, not network-based
- Serverless or FaaS architectures where the platform handles routing transparently and service discovery is abstracted away by the function runtime

## Core Concepts

- Service registry: a centralized or distributed database (Consul, Eureka, etcd, ZooKeeper) that stores the network locations of all available service instances with their metadata and health status
- Client-side discovery: the consuming service queries the registry directly and applies its own load balancing algorithm; provides flexibility but couples every client to the registry API
- Server-side discovery: a load balancer or API gateway queries the registry and routes traffic; decouples clients from the registry but adds a central routing hop
- Self-registration vs. third-party registration: in self-registration, instances register on startup; in third-party registration, an orchestrator (Kubernetes, Registrator) handles registration and deregistration
- DNS-SD: DNS Service Discovery uses SRV records to encode service name, protocol, port, and priority, enabling DNS resolvers to serve as the service registry without custom client libraries

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Service Discovery Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Choose a discovery strategy**: client-side discovery (client queries registry and load-balances itself), server-side discovery (router or load balancer queries registry on behalf of client), or DNS-based (services resolved via DNS SRV records)
2. **Implement service registration**: on startup, each service instance registers its address, port, health check endpoint, and metadata (version, region, tags) with the service registry
3. **Configure health checking**: define liveness and readiness probes that the registry polls at a configured interval; failing checks cause the registry to deregister the instance and stop routing traffic to it
4. **Consume the registry in clients**: use a discovery client library (Consul client, Eureka client, Kubernetes service DNS) to resolve logical service names to physical addresses, applying load balancing on the returned set
5. Handle deregistration and graceful shutdown: ensure instances deregister before terminating; implement a grace period so in-flight requests complete before the instance is removed from the registry

<details><summary>中文步骤</summary>

1. 选择发现策略：客户端侧发现（客户端查询注册表并自行负载均衡）、服务器侧发现（路由器或负载均衡器代表客户端查询注册表），或基于 DNS（通过 DNS SRV 记录解析服务）
2. 实现服务注册：启动时，每个服务实例将其地址、端口、健康检查端点和元数据（版本、区域、标签）注册到服务注册表
3. 配置健康检查：定义注册表按配置间隔轮询的活性和就绪探针；检查失败会导致注册表注销实例并停止向其路由流量
4. 在客户端消费注册表：使用发现客户端库（Consul 客户端、Eureka 客户端、Kubernetes 服务 DNS）将逻辑服务名解析为物理地址，对返回集应用负载均衡
5. 处理注销和优雅关闭：确保实例在终止前注销；实现宽限期使进行中的请求在实例从注册表移除前完成

</details>

## Do

- Do implement health checks at the application level, not just the process level, so the registry deregisters instances that are running but not serving traffic correctly
- Do cache discovery results locally with a short TTL so that a registry outage does not immediately cascade into a full service outage
- Do tag instances with version, environment, and capability metadata so consumers can implement fine-grained routing without separate configuration
- Do test deregistration and failover paths in staging by deliberately crashing instances and verifying traffic shifts to healthy instances within your SLA

## Don't

- Don't hard-code service IP addresses or ports in configuration files — this defeats the purpose of service discovery and creates drift as instances change
- Don't set health check intervals too long (more than 10 seconds) because stale registry entries cause traffic to be routed to failed instances for extended periods
- Don't run a single-node service registry without HA configuration — the registry itself must be highly available or it becomes a single point of failure for the entire service mesh
- Don't skip connection draining before deregistration — abrupt removal causes in-flight requests to fail with connection reset errors visible to end users

## Case Study

**Netflix**: Netflix operates Eureka, their home-built service registry, across their global microservices fleet of thousands of instances. Every service registers with its regional Eureka cluster on startup and sends heartbeats every 30 seconds. Eureka's self-preservation mode is a particularly notable design: when it detects that more than 15% of expected heartbeats are missing (indicating a network partition rather than mass failure), it stops evicting instances from the registry rather than cascading into a blank slate. This design decision kept Netflix services discoverable and partially functional during several major AWS networking events where a registry that aggressively evicted instances would have caused complete service unavailability.

## Related Frameworks

- service-discovery (alternative)
- gossip-protocol (related)
- circuit-breaker-with-retry (complement)
- sidecar-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/service-discovery-pattern
