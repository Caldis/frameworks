# CRDT (Conflict-free Replicated Data Types) / 无冲突复制数据类型

- **Category**: distributed
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Marc Shapiro, Nuno Preguiça, Carlos Baquero, Marek Zawirski, 2011, 2006
- **Adopters**: Figma, Notion, Apple (CloudKit), Redis (CRDT for Redis Enterprise), Riak (Basho)

Data structures that auto-merge without coordination (Shapiro, 2011)

_无需协调即可自动合并的数据结构（Shapiro，2011）_

## When to Use

Apply this framework when:
- When building real-time collaborative editing applications (documents, spreadsheets, whiteboards) where multiple users concurrently modify shared state
- When distributed systems must remain available during network partitions and data must be automatically reconciled upon reconnection without human intervention
- When a multi-region active-active database architecture requires conflict resolution that is provably correct without a centralized coordinator
- When mobile or offline-capable applications need to merge local changes made during disconnection with server-side changes upon sync

## When NOT to Use

Stop and reconsider if:
- Financial or inventory systems where preventing double-spending or overselling requires strong consistency guarantees that CRDTs cannot provide
- Simple leader-follower replication where a single primary handles all writes and conflict-free merging is unnecessary
- When the team lacks the mathematical background to correctly implement and test CRDT merge functions — incorrect implementations create subtle data loss bugs
- Systems with low concurrency where optimistic locking or simple last-write-wins semantics with human conflict resolution is sufficient

## Core Concepts

- Monotonic join semi-lattice: the mathematical structure underlying CRDTs where the state space forms a lattice with a least-upper-bound merge operation that is commutative, associative, and idempotent
- State-based CRDT (CvRDT): replicas periodically exchange full state; the merge function computes the join of two states; requires only eventual message delivery
- Operation-based CRDT (CmRDT): replicas propagate operations that mutate state; requires exactly-once causal delivery but produces smaller network payloads
- Strong Eventual Consistency (SEC): the guarantee that all replicas that have received the same set of updates will have identical state, without requiring synchronous coordination

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying CRDT (Conflict-free Replicated Data Types) to?
- What constraints or existing architecture do you need to work within?
- Has your team used CRDT (Conflict-free Replicated Data Types) before? (This is an advanced framework)

## Implementation Steps

1. Identify the collaborative or distributed data-sharing use case where concurrent modifications by multiple nodes or users must be merged automatically without a coordination round-trip
2. **Select the appropriate CRDT type**: G-Counter or PN-Counter for incrementing counters, G-Set or OR-Set for sets, LWW-Element-Set for last-write-wins semantics, or an RGA (Replicated Growable Array) for text collaboration
3. Implement the CRDT's merge function (join in lattice terms) which must be commutative, associative, and idempotent so that applying the same update multiple times or in any order produces the same result
4. Design the state or operation propagation strategy: state-based CRDTs (CvRDTs) gossip full state snapshots to peers; operation-based CRDTs (CmRDTs) propagate individual operations and require exactly-once delivery guarantees
5. Validate convergence under network partition scenarios by simulating concurrent conflicting updates across replicas and verifying that all replicas reach identical state after reconnection, regardless of the order messages were received

<details><summary>中文步骤</summary>

1. 识别协作或分布式数据共享用例，其中多个节点或用户的并发修改必须自动合并，无需协调往返
2. 选择适当的CRDT类型：G-Counter或PN-Counter用于递增计数器，G-Set或OR-Set用于集合，LWW-Element-Set用于最后写入胜出语义，或RGA（可复制增长数组）用于文本协作
3. 实现CRDT的合并函数（格论中的连接），该函数必须是交换的、结合的和幂等的，使得多次或以任何顺序应用同一更新都产生相同结果
4. 设计状态或操作传播策略：基于状态的CRDT（CvRDT）向对等节点传播完整状态快照；基于操作的CRDT（CmRDT）传播单个操作，并需要精确一次交付保证
5. 通过模拟副本之间的并发冲突更新来验证网络分区场景下的收敛性，验证所有副本在重新连接后达到相同状态，无论消息的接收顺序如何

</details>

## Do

- Do choose the CRDT type that naturally matches the data semantics because forcing application data into a mismatched CRDT produces correct but semantically wrong results
- Do use delta-CRDTs (delta state CRDTs) for large state spaces because shipping full state on every sync generates excessive network bandwidth for large CRDT instances
- Do test convergence properties with property-based testing that generates arbitrary sequences of concurrent operations because CRDTs are easy to implement incorrectly in subtle ways
- Do consider using established CRDT libraries (Automerge, Yjs, redis-crdt) rather than building from scratch because the theoretical simplicity of CRDTs masks substantial implementation complexity

## Don't

- Don't use CRDTs for data that requires strict consistency (financial balances, inventory counts where overselling is unacceptable) because CRDTs guarantee eventual consistency, not strong consistency
- Don't model all application state as CRDTs because not every field needs conflict-free merging and the overhead is unnecessary for state that is never concurrently modified
- Don't confuse operational transformation (OT) with CRDTs because they solve the same collaboration problem with different guarantees — CRDTs are more composable but OT can produce better user intent preservation
- Don't ignore tombstone growth in OR-Sets and similar CRDTs because deleted elements leave tombstones that accumulate indefinitely without periodic garbage collection

## Case Study

**Figma**: Figma uses a custom CRDT-inspired data model for its multiplayer design editor, allowing dozens of designers to simultaneously edit the same design file without merge conflicts. Each design element (frame, shape, text) is represented as a node in a document tree, with properties stored as last-write-wins registers. Operations (move, resize, recolor) are sent as small deltas to a central relay server that broadcasts them to all connected clients. Figma's multiplayer system handles over 1 million concurrent collaborative sessions daily with sub-100ms operation propagation latency, making real-time collaboration indistinguishable from working locally.

## Related Frameworks

- eventual-consistency (extends)
- gossip-protocol (complement)
- consensus-protocols (alternative)
- outbox-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/crdt
