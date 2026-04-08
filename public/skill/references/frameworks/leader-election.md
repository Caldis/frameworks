# Leader Election / 领导者选举

- **Category**: distributed
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Garcia-Molina (Bully algorithm, 1982); Lamport (Paxos-based election, 1998)
- **Adopters**: Apache Kafka (KRaft), Apache ZooKeeper, etcd, Redis Sentinel, Elasticsearch

Coordinate a single leader node among distributed peers to avoid conflicts

_在分布式对等节点中协调选出单一领导者以避免冲突_

## When to Use

Apply this framework when:
- When exactly one node must coordinate writes or task assignment to prevent conflicts or duplicate work
- When a distributed scheduler or cron-like system needs a single active instance to avoid running duplicate jobs
- When implementing master-slave replication where one node must be the authoritative writer at any given time
- When partitioned data processing requires a single coordinator to assign work units to workers without overlap

## When NOT to Use

Stop and reconsider if:
- Stateless services behind a load balancer where any instance can handle any request without coordination
- Peer-to-peer systems designed for symmetric participation where introducing a leader adds unnecessary centralization
- Systems where brief periods of duplicate processing are acceptable and cheaper than the complexity of leader election

## Core Concepts

- Lease-based leadership: The leader holds a time-bounded lease that must be periodically renewed; if the lease expires, other nodes can claim leadership
- Fencing tokens: Monotonically increasing tokens issued with each new leader that allow storage systems to reject stale writes from former leaders
- Split-brain prevention: Mechanisms to ensure at most one leader is active at any time, even during network partitions, typically requiring a quorum or external lock service
- Graceful handoff: The outgoing leader completes in-flight operations and releases its lease cleanly before the new leader takes over, minimizing disruption
- Leader liveness detection: Heartbeat intervals and timeout thresholds that balance fast failure detection against false positives from temporary network glitches

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Leader Election to?
- What constraints or existing architecture do you need to work within?
- Has your team used Leader Election before? (This is an advanced framework)

## Implementation Steps

1. **Define the leadership scope**: determine what resource or responsibility the leader controls (e.g., write coordination, task scheduling, partition ownership)
2. **Select an election mechanism**: choose between consensus-based election (Raft/ZooKeeper), lease-based election (DynamoDB lock, etcd lease), or bully/ring algorithms for simpler topologies
3. **Implement leader heartbeats**: the leader periodically renews a lease or sends heartbeats so followers can detect leader failure within a bounded time
4. **Handle leader failure**: when the heartbeat or lease expires, remaining nodes initiate a new election using the chosen mechanism to converge on a single new leader
5. **Protect against split-brain**: use fencing tokens, epoch numbers, or distributed locks to ensure that a deposed leader cannot continue acting as leader after a new one is elected

<details><summary>中文步骤</summary>

1. 定义领导权范围：确定领导者控制什么资源或职责（如写协调、任务调度、分区所有权）
2. 选择选举机制：在基于共识的选举（Raft/ZooKeeper）、基于租约的选举（DynamoDB锁、etcd租约）或适用于简单拓扑的霸道/环形算法之间选择
3. 实现领导者心跳：领导者定期续约租约或发送心跳，以便跟随者在有界时间内检测到领导者故障
4. 处理领导者故障：当心跳或租约过期时，剩余节点使用所选机制发起新选举，收敛到单一新领导者
5. 防止脑裂：使用防护令牌、纪元编号或分布式锁确保被废黜的领导者在新领导者选出后无法继续充当领导者

</details>

## Do

- Do use fencing tokens for all leader-gated operations because a network-partitioned former leader may not know it has been replaced
- Do set lease timeouts carefully: too short causes unnecessary re-elections during GC pauses, too long delays failover
- Do implement graceful leader shutdown that releases the lease proactively because it enables faster handoff without waiting for lease expiry
- Do test leader election under network partition scenarios because correctness bugs only surface when split-brain conditions actually occur

## Don't

- Don't rely solely on heartbeat absence to detect leader failure because network delays and GC pauses can cause false positives leading to unnecessary elections
- Don't assume the leader election result is globally visible immediately because propagation delays mean some nodes may still believe the old leader is active
- Don't use leader election when the workload can be partitioned among all nodes because a single leader becomes a throughput bottleneck
- Don't implement your own leader election from scratch when proven implementations exist because subtle correctness bugs in election protocols are notoriously difficult to detect

## Case Study

**Apache Kafka**: Apache Kafka uses leader election to assign a single broker as the leader for each topic partition. Prior to KRaft (Kafka Raft), Kafka relied on Apache ZooKeeper for controller election, where one broker served as the cluster controller responsible for partition leader assignment. When a broker failed, ZooKeeper's session timeout triggered controller failover, which then reassigned partition leaders. This process could take 30+ seconds for large clusters. With the introduction of KRaft in Kafka 3.3 (2022), Kafka eliminated the ZooKeeper dependency by implementing Raft-based leader election internally, reducing controller failover time to under 10 seconds and simplifying the operational model from two distributed systems to one.

## Related Frameworks

- consensus-protocols (extends)
- cap-theorem (prerequisite)
- two-phase-commit (related)

## Source

https://sdframe.caldis.me/frameworks/leader-election
