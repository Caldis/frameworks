# Eventual Consistency / 最终一致性

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: scalability, performance, reliability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Werner Vogels, 2008, 1978
- **Adopters**: Amazon DynamoDB, Apache Cassandra, Riak, CouchDB, Voldemort

Embrace temporary inconsistency across replicas in exchange for higher availability

_以副本间的暂时不一致换取更高的可用性_

## When to Use

Apply this framework when:
- When the system must remain available for writes even during network partitions or node failures
- When data is replicated across geographically distant datacenters and synchronous replication would add unacceptable latency
- When the business domain naturally tolerates stale reads, such as social media feeds, product catalogs, or DNS records
- When write throughput requirements exceed what a single-leader or consensus-based system can handle

## When NOT to Use

Stop and reconsider if:
- Financial ledger systems where double-spending or lost updates are unacceptable
- Distributed locking or leader election where stale reads can cause split-brain scenarios
- Systems where regulatory compliance demands strong consistency and audit trails for every state transition

## Core Concepts

- Convergence guarantee: All replicas will eventually reach the same state if no new updates are made, though the convergence window is unbounded
- Conflict resolution: When concurrent writes occur on different replicas, the system must deterministically resolve conflicts using LWW, vector clocks, or CRDTs
- Read-your-writes consistency: A session guarantee that a client always sees its own previous writes, even if other replicas are still catching up
- Anti-entropy: Background processes (like Merkle tree comparison or read-repair) that detect and fix divergence between replicas
- Tunable consistency: Systems like Cassandra allow per-query consistency levels (ONE, QUORUM, ALL) to balance latency and consistency on a per-operation basis

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Eventual Consistency to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify which data in the system can tolerate temporary inconsistency by classifying operations into strong-consistency-required vs. eventually-consistent
2. **Choose a replication strategy**: asynchronous replication with conflict detection, or anti-entropy protocols that periodically reconcile divergent replicas
3. **Implement a conflict resolution policy**: last-writer-wins (LWW), version vectors, CRDTs, or application-level merge functions depending on data semantics
4. Design read paths with staleness awareness: use read-your-writes consistency, monotonic reads, or causal consistency to meet user-facing expectations
5. **Add observability for convergence lag**: monitor replication delay, conflict rates, and anti-entropy cycle times to detect when the system is slow to converge

<details><summary>中文步骤</summary>

1. 识别系统中哪些数据可以容忍暂时不一致，将操作分类为需要强一致性与可接受最终一致性
2. 选择复制策略：带冲突检测的异步复制，或定期协调分歧副本的反熵协议
3. 实现冲突解决策略：根据数据语义选择最后写入者获胜（LWW）、版本向量、CRDT或应用层合并函数
4. 设计具有过期感知的读取路径：使用读自己写、单调读或因果一致性来满足面向用户的期望
5. 为收敛延迟添加可观测性：监控复制延迟、冲突率和反熵周期时间，检测系统收敛缓慢的情况

</details>

## Do

- Do classify each piece of data by its consistency requirements because treating all data as eventually consistent leads to subtle correctness bugs
- Do implement read-your-writes guarantees at the session level because users who cannot see their own updates lose trust in the system
- Do monitor replication lag continuously because high convergence delays can indicate infrastructure problems or capacity exhaustion
- Do choose conflict resolution strategies that match domain semantics because generic LWW silently drops valid concurrent updates

## Don't

- Don't assume eventually consistent means 'consistent enough' for financial transactions because money transfers require strong consistency to prevent double-spending
- Don't ignore the convergence window in SLA definitions because users may observe stale data during high-replication-lag periods
- Don't use wall-clock timestamps for conflict resolution across nodes because clock skew between machines makes LWW unreliable
- Don't forget to test failure scenarios because eventual consistency bugs typically manifest only under network partitions or high load

## Case Study

**Amazon (DynamoDB)**: Amazon's DynamoDB, descended from the original Dynamo paper (2007), is architected around eventual consistency as the default read mode. During Prime Day 2022, DynamoDB served over 105 million requests per second across globally distributed tables. The eventually consistent read path avoids quorum overhead, delivering single-digit millisecond latency. For the shopping cart — Dynamo's original motivation — Amazon uses a 'last-writer-wins with client-side merge' strategy where the cart is an additive set, so no item is ever silently lost even when concurrent writes conflict across regions.

## Related Frameworks

- cap-theorem (prerequisite)
- consensus-protocols (alternative)
- cqrs-pattern (complement)
- saga-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/eventual-consistency
