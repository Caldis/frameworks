# Sidecar Pattern / Sidecar 容器模式

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: reliability, observability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Microsoft Azure, 2016
- **Adopters**: Airbnb (Envoy sidecar mesh), Lyft (Envoy originator), Google (Istio + Envoy), Microsoft (Dapr sidecar runtime), Uber (M3 metrics via sidecar)

Deploying helper containers alongside the primary service container to handle cross-cutting concerns without modifying application code

_在主服务容器旁部署辅助容器，无需修改应用代码即可处理横切关注点_

## When to Use

Apply this framework when:
- When multiple heterogeneous services written in different languages need the same cross-cutting capabilities (logging, tracing, mTLS) without duplicating code across each service
- When you want platform teams to own and upgrade infrastructure concerns (service mesh proxy, secrets agent) independently of application release cycles
- When adopting a service mesh (Istio, Linkerd) that requires an Envoy or linkerd-proxy sidecar injected into each pod
- When running legacy applications that cannot be modified to add observability or security features but can be wrapped by a sidecar in a container

## When NOT to Use

Stop and reconsider if:
- Single-process monoliths where all services share a process and cross-cutting concerns are better addressed by middleware or aspect-oriented programming
- Serverless functions where the execution model is event-driven and ephemeral, making a long-running sidecar process impractical and cost-inefficient
- Resource-constrained edge or IoT deployments where the memory and CPU overhead of running an additional proxy container is prohibitive

## Core Concepts

- Network namespace sharing: containers in the same Kubernetes Pod share a network namespace, allowing the sidecar to intercept all inbound and outbound traffic via iptables rules without application-level changes
- Transparent proxy injection: service meshes like Istio inject the Envoy sidecar via a mutating admission webhook, automatically installing the proxy for every new Pod without developer action
- Ambassador sub-pattern: the sidecar acts as an outbound proxy, handling retries, circuit breaking, and load balancing on behalf of the application — the application makes simple calls to localhost
- Adapter sub-pattern: the sidecar transforms the primary container's output (log format, metrics format) into a standard format consumed by the platform — decoupling the app from the platform contract
- Init container sequencing: Kubernetes init containers run before the main container and can pre-configure the sidecar or inject configuration secrets before the application starts receiving traffic

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Sidecar Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify cross-cutting concerns to offload: select capabilities that apply to many services (TLS termination, service mesh proxying, log shipping, metrics collection, config sync) and are better handled outside application code
2. Package the sidecar as a separate container image: the sidecar should be independently versioned, replaceable, and maintained by a different team (e.g., platform team) than the business logic container
3. **Co-locate in a shared Pod or task**: deploy the sidecar and primary container as a unit (Kubernetes Pod, ECS task group) so they share network namespace, localhost access, and optionally volumes
4. **Configure communication via localhost**: because sidecar and primary share network namespace, the primary calls the sidecar on localhost (e.g., Envoy proxy on 127.0.0.1:15001) with zero network hop overhead
5. **Implement lifecycle coordination**: ensure the sidecar starts before or concurrently with the primary container, handles graceful shutdown in the correct order, and does not block primary container liveness checks

<details><summary>中文步骤</summary>

1. 识别要卸载的横切关注点：选择适用于许多服务的能力（TLS 终止、服务网格代理、日志传输、指标收集、配置同步），这些能力在应用代码外处理更好
2. 将 sidecar 打包为单独的容器镜像：sidecar 应独立版本控制、可替换，并由与业务逻辑容器不同的团队（如平台团队）维护
3. 在共享 Pod 或任务中共同部署：将 sidecar 和主容器作为一个单元部署（Kubernetes Pod、ECS 任务组），共享网络命名空间、localhost 访问和可选的卷
4. 通过 localhost 配置通信：因为 sidecar 和主容器共享网络命名空间，主容器通过 localhost 调用 sidecar（如 127.0.0.1:15001 上的 Envoy 代理），零网络跳转开销
5. 实现生命周期协调：确保 sidecar 在主容器之前或同时启动，以正确顺序处理优雅关闭，且不阻塞主容器的活性检查

</details>

## Do

- Do ensure the sidecar and primary container have independent resource limits so a runaway sidecar cannot starve the application of CPU or memory
- Do version and release the sidecar image independently from the application image so platform teams can roll out security patches without coordinating application releases
- Do handle sidecar startup order explicitly using init containers or readiness gates to prevent the primary service from accepting traffic before the proxy is ready
- Do test sidecar failure modes independently: verify that the primary container behaves gracefully when the sidecar crashes, restarts, or is temporarily unavailable

## Don't

- Don't put business logic in the sidecar — it should contain only infrastructure concerns; mixing application logic into the sidecar defeats the separation of concerns that makes the pattern valuable
- Don't ignore the CPU and memory overhead of the sidecar — each Envoy proxy in a large service mesh consumes 50-100 MB and measurable CPU, which multiplies across thousands of pods
- Don't couple the sidecar version lifecycle to the application lifecycle — if upgrades are coordinated, you lose the ability to patch infrastructure independently
- Don't use the sidecar pattern for single-service deployments without a clear growth plan — the added complexity is only justified when the cross-cutting concern spans multiple services

## Case Study

**Airbnb**: Airbnb migrated their service-to-service communication to an Envoy-based sidecar mesh called SmartStack 2.0 (Synapse + Nerve replaced by Envoy). Prior to the migration, each service team had to maintain custom retry logic, timeouts, and circuit breakers in application code. After injection of Envoy sidecars across their Kubernetes fleet, these policies were centralized in xDS configuration managed by the platform team. During a 2019 incident, the platform team was able to adjust timeout policies across 200 services simultaneously by pushing a single xDS config update — a change that would have required 200 separate deployments under the previous approach.

## Related Frameworks

- sidecar-pattern (alternative)
- service-discovery-pattern (complement)
- circuit-breaker-with-retry (complement)
- twelve-factor-app (related)

## Source

https://sdframe.caldis.me/frameworks/sidecar-container-pattern
