# Raft Consensus Algorithm / Raft 共识算法

- **Category**: distributed
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Diego Ongaro, 2013
- **Adopters**: CockroachDB, etcd/Kubernetes, TiKV/TiDB, Consul (HashiCorp), Dgraph

Understandable consensus protocol using leader election and log replication to achieve fault-tolerant distributed agreement

_通过领导者选举和日志复制实现容错分布式一致性的可理解共识协议_

## When to Use

Apply this framework when:
- When building a replicated state machine that must tolerate minority node failures without data loss or split-brain
- When implementing a distributed coordination service such as a configuration store, distributed lock, or cluster membership registry
- When you need a consensus algorithm that your team can fully understand, audit, and implement correctly
- When deploying a clustered database or message broker that requires automatic leader failover without manual operator intervention
- When the write path can afford quorum latency and strong linearizability guarantees outweigh throughput maximization

## When NOT to Use

Stop and reconsider if:
- High-throughput write-heavy workloads where quorum latency per write is unacceptable and eventual consistency suffices
- Geographically distributed multi-region deployments where cross-region quorum writes introduce hundreds of milliseconds of latency
- Single-node embedded systems or applications with no replication requirement where consensus overhead is pure waste

## Core Concepts

- Leader supremacy: only the current-term leader accepts client writes and replicates them; followers are read-only participants that redirect writes to the leader
- Term monotonicity: every RPC carries a term number; nodes reject messages from lower terms and step down if they see a higher term, preventing stale leaders from corrupting state
- Log matching property: if two logs contain an entry with the same index and term, then the logs are identical in all entries up to that index, enabling safe replication
- Election safety: at most one leader can be elected per term because winning requires votes from a quorum that overlaps with any other potential quorum
- Log compaction via snapshots: once logs grow too large, the state machine state is snapshotted, older log entries are discarded, and lagging followers receive snapshots instead of full log replay

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Raft Consensus Algorithm to?
- What constraints or existing architecture do you need to work within?
- Has your team used Raft Consensus Algorithm before? (This is an advanced framework)

## Implementation Steps

1. **Partition time into terms**: each term begins with a leader election triggered by follower timeout; terms act as logical clocks that prevent stale commands from being accepted
2. **Elect a leader via randomized timeouts**: followers wait a random interval before requesting votes; the first candidate to reach a majority quorum becomes leader for the term
3. Replicate log entries through AppendEntries RPCs: the leader appends a client command to its own log, then broadcasts AppendEntries to all followers and waits for majority acknowledgment
4. **Commit entries once a quorum responds**: when a majority of nodes have written the entry to stable storage, the leader marks it committed, applies it to the state machine, and responds to the client
5. Handle crashes and rejoin with log reconciliation: when a crashed node restarts or a new leader is elected, the leader backtracks its nextIndex for each follower until their logs align, then streams missing entries forward

<details><summary>中文步骤</summary>

1. 将时间划分为任期：每个任期以跟随者超时触发的领导者选举开始；任期作为逻辑时钟，防止过期命令被接受
2. 通过随机超时选举领导者：跟随者等待一个随机间隔后请求投票；第一个获得多数派的候选人成为该任期的领导者
3. 通过 AppendEntries RPC 复制日志条目：领导者将客户端命令追加到自身日志，然后广播 AppendEntries 给所有跟随者，等待多数派确认
4. 获得法定人数响应后提交条目：当多数节点将条目写入稳定存储后，领导者标记其为已提交，应用到状态机并响应客户端
5. 通过日志对账处理崩溃和重新加入：当崩溃节点重启或新领导者选出时，领导者为每个跟随者回溯 nextIndex 直至日志对齐，然后向前传输缺失条目

</details>

## Do

- Do use an odd number of nodes (3, 5, 7) to guarantee a clear majority quorum and avoid split-vote deadlocks
- Do persist the current term, voted-for, and log entries to stable storage before responding to any RPC to ensure correct recovery after crashes
- Do implement leader lease reads or linearizable read index to serve reads without additional log entries when read-heavy workloads dominate
- Do monitor election frequency and leader stability because frequent elections indicate network instability or misconfigured heartbeat intervals

## Don't

- Don't run Raft clusters across wide-area networks without accounting for inter-datacenter latency because quorum writes block on the slowest acknowledgment in the majority
- Don't skip log compaction implementation because unbounded log growth will exhaust disk and make follower recovery prohibitively slow
- Don't assume Raft handles sharding or partitioning — it manages a single replicated log and must be combined with a shard routing layer for horizontal scale
- Don't mix Raft cluster members across significantly different hardware because persistent storage speed differences create chronic follower lag

## Case Study

**CockroachDB**: CockroachDB uses Raft at the core of its range-based replication model. Each key range (default 64 MB) is managed by a separate Raft group of three replicas. When a node fails, the Raft group for affected ranges elects a new leader and continues accepting writes within seconds, with no operator intervention. CockroachDB's engineers specifically chose Raft over Paxos because the algorithm's clean separation of leader election, log replication, and safety invariants made it tractable to implement correctly in a production database — a decision validated by successfully passing Jepsen distributed systems testing.

## Related Frameworks

- consensus-protocols (alternative)
- leader-election (complement)
- two-phase-commit (alternative)
- eventual-consistency (related)

## Source

https://sdframe.caldis.me/frameworks/raft-consensus
