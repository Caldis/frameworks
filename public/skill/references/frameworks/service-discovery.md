# Service Discovery / 服务发现

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Netflix (Eureka, 2012); HashiCorp (Consul, 2014); Kubernetes (CoreDNS-based, 2015)
- **Adopters**: Airbnb, Lyft, Shopify, HashiCorp customers, Kubernetes ecosystem

Dynamic registration and lookup of service instances (Consul, etcd)

_服务实例的动态注册与查找（Consul、etcd）_

## When to Use

Apply this framework when:
- When microservices are deployed on dynamic infrastructure where IP addresses change on every deployment, container restart, or auto-scaling event
- When a service mesh is not in use and services must directly discover the network locations of their dependencies without hard-coded configuration
- When the number of service instances varies dynamically based on load and clients must route only to currently healthy instances
- When multi-datacenter or multi-cloud deployments require services to discover peers across network segments with different address spaces

## When NOT to Use

Stop and reconsider if:
- Monolithic applications where all components run in the same process or on a fixed set of known servers with static IP addresses
- Small deployments with a fixed number of service instances where a static load balancer configuration is sufficient and the overhead of a service registry is not justified
- When a service mesh (Istio, Linkerd) is already in use because the mesh sidecar handles service discovery transparently without a separate registry client in the application
- Serverless or FaaS architectures where the platform manages instance routing and developers do not need to implement service discovery

## Core Concepts

- Service registry: the centralized (or distributed) store that maintains the mapping from service name to healthy instance network addresses
- Client-side discovery: the calling service queries the registry directly, selects an instance using a load-balancing algorithm (round-robin, least-connections), and makes the request directly to the chosen instance
- Server-side discovery: the calling service sends requests to a stable proxy (load balancer, API gateway, or service mesh sidecar) that performs registry lookup and routing, hiding infrastructure dynamism from the application
- Health check: a mechanism by which the registry (or a sidecar) periodically probes service instances (HTTP endpoint, TCP ping, or script) and removes those that fail

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Service Discovery to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Choose a service registry (Consul, etcd, ZooKeeper, Eureka, or Kubernetes Service + CoreDNS) and deploy it as a highly available cluster with at least 3 nodes to survive node failures without losing the registry
2. **Implement service registration**: when a service instance starts, it registers its network address (IP, port, protocol) and health check endpoint with the registry; on shutdown, it deregisters to remove stale entries
3. Configure health checks in the registry so that the registry actively monitors instance health and automatically removes instances that fail checks, preventing traffic from routing to unhealthy endpoints
4. Implement service lookup in client services using either client-side discovery (the client queries the registry and load-balances across healthy instances) or server-side discovery (the client sends requests to a load balancer or service mesh proxy that performs registry lookup)
5. **Test failure scenarios**: kill a service instance and verify that the registry removes it within the health check timeout and that clients stop routing traffic to the dead instance within the acceptable failover window

<details><summary>中文步骤</summary>

1. 选择服务注册表（Consul、etcd、ZooKeeper、Eureka或Kubernetes Service + CoreDNS）并将其部署为至少3个节点的高可用集群，以在节点故障后存活而不丢失注册表
2. 实施服务注册：当服务实例启动时，向注册表注册其网络地址（IP、端口、协议）和健康检查端点；关闭时注销以删除过期条目
3. 在注册表中配置健康检查，使注册表主动监控实例健康状况，并自动删除未通过检查的实例，防止流量路由到不健康的端点
4. 在客户端服务中使用客户端发现（客户端查询注册表并在健康实例间负载均衡）或服务器端发现（客户端向执行注册表查找的负载均衡器或服务网格代理发送请求）来实施服务查找
5. 测试故障场景：终止服务实例并验证注册表在健康检查超时内删除它，以及客户端在可接受的故障转移窗口内停止路由流量到死亡实例

</details>

## Do

- Do deploy the service registry as a clustered, highly available service with at least 3 nodes because the registry is a critical infrastructure dependency that every service relies on
- Do implement graceful deregistration in shutdown hooks so that instances remove themselves from the registry before stopping, minimizing the window where the registry routes to a dead instance
- Do tune health check intervals and failure thresholds to balance detection speed against false-positive deregistrations because overly sensitive health checks deregister healthy instances under load
- Do cache registry lookups with a short TTL in client services because querying the registry on every request creates a bottleneck at the registry and adds latency to every service call

## Don't

- Don't hard-code service instance addresses in configuration files or environment variables because they change with every deployment and become stale immediately
- Don't skip health checks on registered services because the registry will route traffic to instances that are up but serving errors if health checks are absent
- Don't make the service registry a single point of failure by running it as a single instance — a registry outage means no service can discover any other service
- Don't use service discovery for databases or stateful services that require sticky connections because round-robin instance selection breaks connection pooling and stateful session affinity

## Case Study

**Airbnb**: Airbnb runs a service discovery infrastructure built on Consul, managing over 5,000 service instances across multiple AWS availability zones. When an Airbnb service deploys a new version, the old instances deregister and new instances register with Consul automatically via their deployment system. Consul's health checks probe each instance's /health endpoint every 10 seconds, removing failed instances within 30 seconds. Client services use a local Consul agent for cached lookups, making service resolution sub-millisecond. During Airbnb's 2020 AWS availability zone failures, Consul's multi-datacenter federation automatically shifted traffic to healthy availability zones with under 2 minutes of detection-to-failover latency.

## Related Frameworks

- consensus-protocols (complement)
- leader-election (complement)
- circuit-breaker-with-retry (complement)
- bulkhead-service-level (complement)

## Source

https://sdframe.caldis.me/frameworks/service-discovery
