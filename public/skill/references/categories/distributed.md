# Distributed Systems / 分布式系统

Patterns for building reliable, scalable systems across multiple nodes.

跨多节点构建可靠、可扩展系统的模式。

**22 frameworks** in this category.

## Frameworks

### Consensus Protocols (Raft/Paxos) / 共识协议（Raft/Paxos）
- **Slug**: consensus-protocols
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Author**: Leslie Lamport (Paxos, 1998); Diego Ongaro & John Ousterhout (Raft, 2014)
- Algorithms for achieving agreement among distributed nodes despite failures

### Eventual Consistency / 最终一致性
- **Slug**: eventual-consistency
- **Complexity**: intermediate
- **Quality**: scalability, performance, reliability
- **Author**: Werner Vogels, 2008
- Embrace temporary inconsistency across replicas in exchange for higher availability

### Backpressure Pattern / 背压模式
- **Slug**: backpressure-pattern
- **Complexity**: intermediate
- **Quality**: reliability, performance
- **Author**: Concept from networking (TCP flow control); formalized in Reactive Streams (2013-2015)
- Flow control mechanism where downstream consumers signal upstream producers to slow down

### Sidecar Pattern / 边车模式
- **Slug**: sidecar-pattern
- **Complexity**: intermediate
- **Quality**: maintainability, scalability
- **Author**: Microsoft Azure Architecture Center (formalized 2016); popularized by Envoy/Istio (2016-2017)
- Attach auxiliary processes alongside primary services for cross-cutting concerns

### Leader Election / 领导者选举
- **Slug**: leader-election
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Author**: Garcia-Molina (Bully algorithm, 1982); Lamport (Paxos-based election, 1998)
- Coordinate a single leader node among distributed peers to avoid conflicts

### Consistent Hashing / 一致性哈希
- **Slug**: consistent-hashing
- **Complexity**: intermediate
- **Quality**: scalability, performance
- **Author**: David Karger, Eric Lehman, Tom Leighton, et al., 1997
- Distribute data across nodes with minimal redistribution when the cluster changes

### Gossip Protocol / Gossip协议
- **Slug**: gossip-protocol
- **Complexity**: intermediate
- **Quality**: scalability, reliability
- **Author**: Alan Demers, Dan Greene, Carl Hauser, et al. (Xerox PARC, 1987)
- Epidemic-style information dissemination for decentralized cluster communication

### Two-Phase Commit (2PC) / 两阶段提交（2PC）
- **Slug**: two-phase-commit
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Author**: Jim Gray, 1978
- Atomic commit protocol ensuring all-or-nothing transaction outcomes across distributed participants

### Sharding Strategies / 分片策略
- **Slug**: sharding-strategies
- **Complexity**: advanced
- **Quality**: scalability, performance
- **Author**: Concept from database research (1980s-1990s); formalized in modern context by Kleppmann (2017)
- Horizontal data partitioning patterns for distributing load across multiple database nodes

### Idempotency Pattern / 幂等性模式
- **Slug**: idempotency-pattern
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Author**: Concept from mathematics and HTTP specification (RFC 7231); applied to distributed systems by Helland (2012) and Kleppmann (2017)
- Design operations to be safely retried without causing duplicate effects

### CRDT (Conflict-free Replicated Data Types) / 无冲突复制数据类型
- **Slug**: crdt
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Author**: Marc Shapiro, Nuno Preguiça, Carlos Baquero, Marek Zawirski, 2011
- Data structures that auto-merge without coordination (Shapiro, 2011)

### Outbox Pattern / 发件箱模式
- **Slug**: outbox-pattern
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Author**: Chris Richardson (microservices.io); popularized by Udi Dahan and Greg Young in CQRS/event sourcing contexts
- Reliable event publishing from database transactions

### Service Discovery / 服务发现
- **Slug**: service-discovery
- **Complexity**: intermediate
- **Quality**: reliability, scalability
- **Author**: Netflix (Eureka, 2012); HashiCorp (Consul, 2014); Kubernetes (CoreDNS-based, 2015)
- Dynamic registration and lookup of service instances (Consul, etcd)

### Circuit Breaker with Retry / 带重试的断路器
- **Slug**: circuit-breaker-with-retry
- **Complexity**: intermediate
- **Quality**: reliability, performance
- **Author**: Michael Nygard (circuit breaker pattern, 2007); Polly (.NET) and Hystrix (Netflix, 2012) as implementations
- Combined retry + circuit breaker for resilient communication

### Bulkhead at Service Level / 服务级隔离舱
- **Slug**: bulkhead-service-level
- **Complexity**: intermediate
- **Quality**: reliability, performance
- **Author**: Michael Nygard (2007); popularized by Netflix Hystrix thread pool isolation (2012)
- Isolating service resources to prevent cascading failures (different from code-level bulkhead in quality.json)

### Raft Consensus Algorithm / Raft 共识算法
- **Slug**: raft-consensus
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Author**: Diego Ongaro
- Understandable consensus protocol using leader election and log replication to achieve fault-tolerant distributed agreement

### CRDTs (Conflict-free Replicated Data Types) / 无冲突复制数据类型（CRDT）
- **Slug**: crdts
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Author**: Marc Shapiro
- Eventual consistency without coordination using algebraic data structures that merge automatically

### Gossip Protocol / Gossip 协议
- **Slug**: gossip-epidemic-protocol
- **Complexity**: intermediate
- **Quality**: reliability, scalability
- **Author**: Alan Demers
- Epidemic-style information dissemination achieving reliable cluster-wide propagation without central coordination

### Service Discovery Pattern / 服务发现模式
- **Slug**: service-discovery-pattern
- **Complexity**: intermediate
- **Quality**: reliability, scalability
- **Author**: Chris Richardson
- DNS-based and registry-based mechanisms for services to locate each other dynamically in elastic infrastructure

### Sidecar Pattern / Sidecar 容器模式
- **Slug**: sidecar-container-pattern
- **Complexity**: intermediate
- **Quality**: reliability, observability
- **Author**: Microsoft Azure
- Deploying helper containers alongside the primary service container to handle cross-cutting concerns without modifying application code

### Publish-Subscribe Pattern / 发布-订阅模式
- **Slug**: publish-subscribe-pattern
- **Complexity**: intermediate
- **Quality**: scalability, maintainability
- **Author**: CORBA Event Service specification (OMG, 1994); popularized through JMS (Java Message Service, 1998) and academic distributed systems literature of the 1980s–1990s
- Decoupled messaging pattern where publishers emit events to named topics and subscribers receive only the messages matching their subscriptions, eliminating direct coupling between producers and consumers

### Retry Pattern / 重试模式
- **Slug**: retry-pattern
- **Complexity**: beginner
- **Quality**: reliability
- **Author**: Distributed systems best practice; formalized by Microsoft Azure patterns, 2014
- Automatically re-attempt a failed operation with configurable delay and limits to handle transient faults
