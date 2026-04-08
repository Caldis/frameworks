# Consensus Protocols (Raft/Paxos) / 共识协议（Raft/Paxos）

- **Category**: distributed
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Leslie Lamport (Paxos, 1998); Diego Ongaro & John Ousterhout (Raft, 2014), 1989
- **Adopters**: etcd/Kubernetes, CockroachDB, TiKV/TiDB, Consul (HashiCorp), Apache ZooKeeper (ZAB)

Algorithms for achieving agreement among distributed nodes despite failures

_在节点可能故障的分布式系统中达成一致的算法_

## When to Use

Apply this framework when:
- When building a replicated log or replicated state machine that must tolerate node failures without data loss
- When implementing a distributed coordination service like a lock manager, configuration store, or membership registry
- When strong consistency guarantees are required and the system can tolerate the latency of quorum writes
- When you need automatic leader failover without manual intervention in a clustered database or message broker

## When NOT to Use

Stop and reconsider if:
- High-throughput write-heavy workloads where eventual consistency is acceptable and quorum latency is a bottleneck
- Single-node or embedded systems where there is no replication requirement
- Systems where availability during network partitions is more important than consistency, favoring AP designs instead

## Core Concepts

- Quorum: A majority of nodes (e.g., 3 of 5) must agree before a value is committed, ensuring any two quorums overlap
- Term/epoch: A monotonically increasing logical clock that partitions time into leadership periods, preventing stale leaders from issuing writes
- Log replication: The leader maintains an ordered log of commands and ensures all followers converge to the same log sequence
- Safety property: Once a log entry is committed, no future leader can overwrite it, guaranteeing linearizable reads and writes
- Liveness property: As long as a majority of nodes are reachable and can communicate, the system will eventually elect a leader and make progress

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Consensus Protocols (Raft/Paxos) to?
- What constraints or existing architecture do you need to work within?
- Has your team used Consensus Protocols (Raft/Paxos) before? (This is an advanced framework)

## Implementation Steps

1. **Define the replicated state machine**: identify what state must be consistently replicated across all nodes in the cluster
2. **Elect a leader**: use randomized timeouts (Raft) or proposal numbers (Paxos) to select a single node responsible for coordinating writes
3. **Replicate log entries**: the leader appends client requests to its log and sends AppendEntries RPCs to followers, waiting for a majority quorum to acknowledge
4. **Commit and apply**: once a majority of nodes have persisted the entry, the leader marks it committed and all nodes apply it to their state machines
5. **Handle leader failure**: when followers detect a missing heartbeat, they increment the term, start a new election, and the cluster converges on a new leader

<details><summary>中文步骤</summary>

1. 定义复制状态机：确定集群中所有节点需要一致复制的状态内容
2. 选举领导者：使用随机超时（Raft）或提案编号（Paxos）选出一个负责协调写入的节点
3. 复制日志条目：领导者将客户端请求追加到日志中，并向跟随者发送AppendEntries RPC，等待多数派确认
4. 提交并应用：一旦多数节点持久化了该条目，领导者将其标记为已提交，所有节点将其应用到状态机
5. 处理领导者故障：当跟随者检测到心跳缺失时，递增任期号，发起新选举，集群收敛到新领导者

</details>

## Do

- Do deploy an odd number of nodes (3, 5, 7) because even numbers increase the chance of split votes without improving fault tolerance
- Do persist log entries and term metadata to stable storage before responding because in-memory-only state leads to data loss on restart
- Do implement pre-vote protocol extensions because they prevent disruptive elections from partitioned nodes rejoining the cluster
- Do benchmark your quorum latency under realistic network conditions because consensus adds round-trip overhead to every write

## Don't

- Don't run consensus across wide-area networks without accounting for latency because cross-datacenter round trips can make quorum writes unacceptably slow
- Don't use consensus for high-throughput data that tolerates eventual consistency because the overhead of quorum writes is unnecessary
- Don't ignore log compaction and snapshotting because unbounded log growth will exhaust disk space and slow down follower recovery
- Don't assume consensus alone solves all distributed problems because it handles replication but not sharding, load balancing, or schema evolution

## Case Study

**etcd / Kubernetes**: Kubernetes relies on etcd, a distributed key-value store implementing the Raft consensus protocol, as its single source of truth for all cluster state. Every API server write (pod scheduling, config changes, secret updates) is committed through Raft to an etcd cluster of typically 3 or 5 nodes. This design ensures that even if a minority of etcd nodes fail, the cluster state remains consistent and recoverable. When CoreOS (later acquired by Red Hat) originally built etcd in 2013, they chose Raft over Paxos specifically for its understandability, which allowed a broader contributor base to verify correctness.

## Related Frameworks

- cap-theorem (prerequisite)
- leader-election (complement)
- two-phase-commit (alternative)

## Source

https://sdframe.caldis.me/frameworks/consensus-protocols
