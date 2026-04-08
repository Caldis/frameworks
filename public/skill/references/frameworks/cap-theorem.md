# CAP Theorem / CAP定理

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Eric Brewer, 2000
- **Adopters**: Amazon, Apache Cassandra, Google Spanner, CockroachDB, Riak

Distributed systems can guarantee only 2 of 3: C, A, P

_分布式系统只能同时保证一致性、可用性、分区容错性中的两个_

## When to Use

Apply this framework when:
- When designing a distributed database or data store and choosing replication strategy
- When evaluating the behavior of a system during network failures or partitions
- When deciding between strong consistency and high availability for a distributed service
- When selecting between CP systems like ZooKeeper and AP systems like Cassandra

## When NOT to Use

Stop and reconsider if:
- Single-node or non-distributed systems where partition tolerance is irrelevant
- Systems where you need a nuanced consistency model beyond the binary CP/AP classification
- Real-time financial transaction systems that require linearizable consistency without compromise

## Core Concepts

- Consistency: Every read receives the most recent write or an error across all nodes
- Availability: Every request receives a non-error response, without guarantee it contains the most recent write
- Partition tolerance: The system continues operating despite arbitrary message loss or delay between nodes
- PACELC extension: When partitioned choose A or C; Else (no partition) choose between Latency and Consistency
- Eventual consistency: A relaxed consistency model where all replicas converge to the same state over time

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying CAP Theorem to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the distributed system's core requirements: what data consistency guarantees are needed by clients
2. Determine realistic network partition scenarios and their likelihood in your deployment environment
3. **Choose the CP or AP trade-off**: decide whether consistency or availability is sacrificed during partition events
4. Select data stores, protocols, and replication strategies that implement the chosen trade-off (e.g., etcd for CP, Cassandra for AP)
5. **Design compensating mechanisms**: conflict resolution, eventual consistency patterns, or client retry logic to handle the chosen trade-off

<details><summary>中文步骤</summary>

1. 明确分布式系统的核心需求：客户端需要什么级别的数据一致性保证
2. 评估网络分区的实际场景及其在当前部署环境中的发生概率
3. 选择CP或AP权衡：决定在分区事件发生时牺牲一致性还是可用性
4. 选择实现该权衡的数据存储、协议和复制策略（如CP选etcd，AP选Cassandra）
5. 设计补偿机制：冲突解决、最终一致性模式或客户端重试逻辑来应对所选权衡

</details>

## Do

- Do treat CAP as a spectrum rather than a binary choice because real systems can tune consistency levels per operation
- Do consider the PACELC extension because it covers the common case where no partition exists
- Do design for partition tolerance first because network partitions are inevitable in distributed systems
- Do use conflict resolution strategies like vector clocks or CRDTs when choosing AP designs

## Don't

- Don't interpret CAP as 'pick exactly two' because partition tolerance is not optional in real distributed systems
- Don't assume CAP applies to single-node systems because it only describes distributed system behavior during partitions
- Don't ignore the latency dimension because CAP doesn't address the consistency-latency trade-off in normal operations
- Don't apply CAP to classify systems statically because the same system may behave as CP or AP depending on configuration

## Case Study

**Amazon DynamoDB**: Amazon designed DynamoDB as an AP system to ensure the shopping cart is always available, even during network partitions. During partition events, DynamoDB accepts conflicting writes and resolves them later using vector clocks and application-level reconciliation. This design choice directly supported Amazon's business requirement that a customer should never see an error when adding items to their cart, even if it means showing slightly stale data.

## Related Frameworks

- cqrs-pattern (complement)
- saga-pattern (complement)
- eda (complement)

## Source

https://sdframe.caldis.me/frameworks/cap-theorem
