# Gossip Protocol / Gossip 协议

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Alan Demers, 1987
- **Adopters**: Apache Cassandra, Amazon DynamoDB, HashiCorp Consul, Riak, Bitcoin / blockchain P2P networks

Epidemic-style information dissemination achieving reliable cluster-wide propagation without central coordination

_无需中央协调、以流行病方式实现可靠集群范围信息传播的协议_

## When to Use

Apply this framework when:
- When you need to propagate state or membership information across a large cluster without a central coordinator or single point of failure
- When eventual consistency of metadata is acceptable and O(log N) convergence time is sufficient
- When building a peer-to-peer overlay, distributed hash table, or service mesh that requires decentralized health and membership tracking
- When the network topology is dynamic with frequent node joins and leaves and you need a self-healing propagation mechanism

## When NOT to Use

Stop and reconsider if:
- When strong consistency or guaranteed delivery ordering is required — use consensus protocols or message queues with ordering guarantees instead
- Very small clusters (fewer than 5 nodes) where the overhead of gossip exceeds the benefit and simple broadcast or direct notification is more efficient
- Latency-critical control planes where failure detection must happen in milliseconds rather than gossip convergence time

## Core Concepts

- Epidemiological model: gossip borrows from SIR disease-spread models where nodes are Susceptible (haven't seen the message), Infected (spreading it), or Removed (stopped spreading after k rounds)
- Convergence bound: with fanout f and N nodes, gossip reaches all nodes in O(log N / log f) rounds with high probability, making it highly scalable without central infrastructure
- SWIM failure detector: Scalable Weakly-consistent Infection-style Membership uses gossip to disseminate node up/down events detected via direct and indirect pings, replacing expensive heartbeat floods
- Anti-entropy gossip: periodic full-state comparison between random pairs to repair divergence not covered by incremental gossip, typically using Merkle trees for efficient delta detection
- Rumor mongering vs. anti-entropy: rumor mongering spreads new updates quickly with low message count; anti-entropy repairs lingering divergence but requires more bandwidth per exchange

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Gossip Protocol to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define the message payload and propagation goal: determine what information each node must spread (membership updates, failure detections, configuration changes) and the convergence time target
2. **Select a gossip variant**: push gossip (sender initiates and pushes state to random peers), pull gossip (receiver queries random peers for their state), or push-pull (exchange in both directions per round)
3. **Configure fanout and interval**: choose the number of peers contacted per gossip round (fanout) and the interval between rounds; fanout of log(N) provides reliable propagation in O(log N) rounds
4. **Implement failure detection integration**: combine gossip with a SWIM-style failure detector that piggybacks liveness probes on gossip messages to spread node up/down status with low overhead
5. **Add entropy reduction**: use Merkle trees or digest-based comparison so nodes only exchange differing state, preventing redundant full-state transfers as cluster size grows

<details><summary>中文步骤</summary>

1. 定义消息载荷和传播目标：确定每个节点必须传播的信息（成员更新、故障检测、配置变更）和收敛时间目标
2. 选择 gossip 变体：推送 gossip（发送方主动将状态推送给随机对等节点），拉取 gossip（接收方查询随机对等节点的状态），或推拉（每轮双向交换）
3. 配置扇出和间隔：选择每轮 gossip 联系的对等节点数（扇出）和轮次间隔；log(N) 的扇出可在 O(log N) 轮内可靠传播
4. 集成故障检测：将 gossip 与 SWIM 风格的故障检测器结合，将活性探测搭载在 gossip 消息上传播节点上线/下线状态，开销极低
5. 添加熵减少机制：使用 Merkle 树或基于摘要的比较，使节点只交换不同的状态，防止集群规模增长时产生冗余的全状态传输

</details>

## Do

- Do tune fanout based on cluster size: use log(N) peers per round to balance convergence speed against message overhead, and increase fanout only when you need faster convergence
- Do combine gossip with a consistent hash ring or ring topology so nodes have a stable peer list to gossip with even during churn
- Do piggyback metadata on gossip messages (SWIM-style) to avoid separate heartbeat floods — this dramatically reduces per-node bandwidth consumption at scale
- Do implement message deduplication and seen-message filtering using bloom filters or a bounded history buffer to prevent infinite message amplification

## Don't

- Don't use gossip for data that requires strong consistency — gossip provides probabilistic dissemination with no delivery guarantee or ordering, only eventual convergence
- Don't gossip large payloads: gossip is designed for small state deltas and membership vectors; large messages negate the bandwidth advantage over broadcast
- Don't rely solely on gossip for failure detection in latency-sensitive paths — gossip convergence time means failure information may take multiple rounds to reach all nodes
- Don't neglect network partitions in gossip-based systems — a partition creates two gossip islands that diverge silently; reconciliation must be handled explicitly on partition heal

## Case Study

**Apache Cassandra**: Apache Cassandra uses gossip as its primary mechanism for cluster membership, node health monitoring, and schema propagation. Every second, each node contacts up to three random peers to exchange endpoint state — including generation number, heartbeat version, load, schema version, and rack/datacenter topology. This gossip state is then used by the token ring to route requests correctly and by the hinted handoff system to detect which nodes are unavailable. When a new node bootstraps into a 1,000-node ring, it gossips its token ranges to a seed node, and that information propagates cluster-wide in approximately log(1000) ≈ 10 rounds — roughly 10 seconds — without any central registry.

## Related Frameworks

- eventual-consistency (complement)
- crdts (complement)
- service-discovery (complement)
- consensus-protocols (related)

## Source

https://sdframe.caldis.me/frameworks/gossip-epidemic-protocol
