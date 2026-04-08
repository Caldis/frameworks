# Gossip Protocol / Gossip协议

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: scalability, reliability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Alan Demers, Dan Greene, Carl Hauser, et al. (Xerox PARC, 1987)
- **Adopters**: Apache Cassandra, HashiCorp Consul, Amazon DynamoDB, ScyllaDB, Redis Cluster

Epidemic-style information dissemination for decentralized cluster communication

_以流行病传播方式在去中心化集群中进行信息扩散_

## When to Use

Apply this framework when:
- When cluster membership information must propagate to all nodes without a centralized membership service
- When the system needs a decentralized failure detector that works without a single point of failure
- When metadata (configuration, schema versions, feature flags) must eventually reach all nodes in a large cluster
- When building peer-to-peer systems where no node has a privileged role and information must spread organically

## When NOT to Use

Stop and reconsider if:
- When strong consistency and total ordering of events is required, because gossip provides only best-effort dissemination
- Small clusters (under 5 nodes) where a centralized membership service is simpler and equally reliable
- When propagation latency must be bounded and deterministic, because gossip convergence is probabilistic

## Core Concepts

- Epidemic dissemination: Information spreads like a disease — each informed node infects a few others per round, achieving O(log N) convergence time for N nodes
- Fanout: The number of random peers each node contacts per gossip round; higher fanout speeds convergence but increases network traffic
- Cramer-von Mises convergence: Mathematical guarantee that all nodes receive the update with high probability after O(log N) rounds with constant fanout
- SWIM protocol: Scalable Weakly-consistent Infection-style Membership protocol that combines gossip with direct and indirect probes for efficient failure detection
- Anti-entropy: A complementary mechanism where nodes periodically do full state reconciliation (using Merkle trees) to repair any inconsistencies that gossip missed

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Gossip Protocol to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Bootstrap the protocol**: each node maintains a partial membership list of known peers and seeds the list from a configuration file or DNS-based discovery
2. **Select gossip targets**: at each gossip interval (e.g., every 1 second), each node randomly selects a fixed number of peers (fanout, typically 2-3) to exchange state with
3. **Exchange state digests**: nodes send compact digests of their known state (version vectors, heartbeat counters, or Bloom filters) to detect what the peer is missing
4. **Reconcile differences**: after comparing digests, nodes exchange only the delta — new or updated entries — bringing both nodes closer to a shared view of the cluster
5. **Detect failures**: use the accumulated heartbeat information to mark nodes as suspected or confirmed down after a configurable number of missed gossip rounds

<details><summary>中文步骤</summary>

1. 引导协议：每个节点维护已知对等节点的部分成员列表，从配置文件或基于DNS的发现初始化该列表
2. 选择gossip目标：在每个gossip间隔（如每1秒），每个节点随机选择固定数量的对等节点（扇出，通常2-3个）进行状态交换
3. 交换状态摘要：节点发送其已知状态的紧凑摘要（版本向量、心跳计数器或布隆过滤器）以检测对方缺少的内容
4. 协调差异：比较摘要后，节点仅交换增量——新的或更新的条目——使两个节点更接近集群的共享视图
5. 检测故障：使用累积的心跳信息，在可配置数量的gossip轮次未收到响应后将节点标记为疑似或确认宕机

</details>

## Do

- Do tune the gossip interval and fanout based on cluster size because defaults optimized for 10 nodes may not work for 10,000 nodes
- Do use compact state digests (Bloom filters, version vectors) because sending full state on every gossip round wastes bandwidth at scale
- Do combine gossip with anti-entropy reconciliation because gossip alone can leave a small probability of nodes missing updates indefinitely
- Do implement suspicion mechanisms (like SWIM's indirect probe) because immediately marking a node as dead on one missed heartbeat leads to flapping

## Don't

- Don't use gossip for data that requires strong consistency because gossip provides only eventual convergence with no ordering guarantees
- Don't set the gossip interval too aggressively in large clusters because the O(N * fanout) messages per interval can create significant network overhead
- Don't assume gossip propagation is instantaneous because in a 1000-node cluster with 1-second intervals, full propagation may take 10+ seconds
- Don't gossip large payloads (e.g., entire database snapshots) because gossip is designed for small metadata, not bulk data transfer

## Case Study

**Apache Cassandra**: Apache Cassandra uses a gossip protocol for cluster membership, failure detection, and schema dissemination. Every second, each Cassandra node selects up to three peers to exchange gossip state, including heartbeat counters, datacenter/rack topology, schema versions, and load information. This decentralized approach means Cassandra has no single point of failure for cluster coordination — any node can serve as a contact point for clients. When a node fails, gossip-based failure detection (using a phi-accrual failure detector built on gossip heartbeats) propagates the failure information across the cluster within seconds, allowing the remaining nodes to take over the failed node's token ranges without a centralized coordinator.

## Related Frameworks

- consistent-hashing (complement)
- eventual-consistency (extends)
- leader-election (alternative)

## Source

https://sdframe.caldis.me/frameworks/gossip-protocol
