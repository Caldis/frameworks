# CRDTs (Conflict-free Replicated Data Types) / 无冲突复制数据类型（CRDT）

- **Category**: distributed
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Marc Shapiro, 2007
- **Adopters**: Riak (Basho), Figma, Apple iCloud, Redis Enterprise, SoundCloud (Roshi)

Eventual consistency without coordination using algebraic data structures that merge automatically

_使用可自动合并的代数数据结构实现无需协调的最终一致性_

## When to Use

Apply this framework when:
- When multiple nodes or users must write to the same data concurrently without requiring coordination or locks
- When network partitions must not block writes — all nodes should accept mutations and merge later
- When building collaborative real-time applications such as shared documents, multiplayer games, or distributed configuration stores
- When the data type has a natural monotone lattice structure (counters, sets, maps, sequences) that maps cleanly to a CRDT variant
- When you want to eliminate distributed transactions for specific data types and accept the constraints of the merge semantics

## When NOT to Use

Stop and reconsider if:
- Financial systems, inventory management, or any domain where concurrent writes must respect strong business invariants that cannot be expressed as a lattice join
- Simple single-writer or leader-replica architectures where coordination is cheap and CRDT complexity adds no benefit
- Data with complex relational integrity constraints (foreign keys, uniqueness) that cannot be expressed as monotone lattice operations

## Core Concepts

- Lattice: A partially ordered set with a join (least upper bound) operation; CRDT state forms a lattice where the merge function computes the join of two states
- Commutativity, associativity, idempotency (CAI): The three algebraic properties a merge function must satisfy to guarantee convergence regardless of message delivery order or duplication
- State-based vs. operation-based: State-based (CvRDT) replicas exchange full snapshots and apply merge; operation-based (CmRDT) replicas broadcast operations that require exactly-once or causal delivery
- Causal consistency: Operation-based CRDTs often rely on causal broadcast so that a remove operation is never applied before the add it references, preventing phantom deletions
- Delta CRDTs: An optimization that propagates only the state delta since the last sync rather than the full state, dramatically reducing bandwidth for large state-based CRDTs

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying CRDTs (Conflict-free Replicated Data Types) to?
- What constraints or existing architecture do you need to work within?
- Has your team used CRDTs (Conflict-free Replicated Data Types) before? (This is an advanced framework)

## Implementation Steps

1. Identify data types that require multi-writer concurrent updates: shopping carts, collaborative text, counters, presence sets, or configuration flags under concurrent modification
2. **Choose the appropriate CRDT variant**: G-Counter for monotone increments, PN-Counter for increment/decrement, OR-Set for add-wins semantics, or sequence CRDTs (RGA, LSEQ) for ordered text
3. **Implement the merge function**: define a join operation that is commutative, associative, and idempotent so any two replicas converge to the same state regardless of message order or duplicates
4. **Propagate state or operations**: use state-based CRDTs that gossip full state snapshots or operation-based CRDTs that broadcast individual ops over a reliable causal delivery channel
5. **Monitor divergence and convergence**: track vector clocks or version vectors to detect out-of-order delivery, measure replica lag, and validate that all nodes eventually reach the same state

<details><summary>中文步骤</summary>

1. 识别需要多写入方并发更新的数据类型：购物车、协作文本、计数器、在线状态集合，或并发修改下的配置标志
2. 选择适当的 CRDT 变体：G-Counter 用于单调递增，PN-Counter 用于增减操作，OR-Set 用于添加优先语义，序列 CRDT（RGA、LSEQ）用于有序文本
3. 实现合并函数：定义满足交换律、结合律和幂等性的 join 操作，使任意两个副本无论消息顺序或重复如何都能收敛到相同状态
4. 传播状态或操作：使用基于状态的 CRDT（gossip 完整状态快照）或基于操作的 CRDT（通过可靠因果传递通道广播单个操作）
5. 监控分歧与收敛：追踪向量时钟或版本向量以检测乱序投递，衡量副本滞后，验证所有节点最终达到相同状态

</details>

## Do

- Do choose the semantics carefully before selecting a CRDT: add-wins vs. remove-wins sets have different user-visible behavior that must match your product requirements
- Do use delta CRDTs for state-based designs in bandwidth-constrained environments to avoid sending full state snapshots on every sync
- Do combine CRDTs with version vectors or hybrid logical clocks so you can track causality and detect stale state during reconciliation
- Do test your merge function algebraically with property-based testing to verify commutativity, associativity, and idempotency for all inputs

## Don't

- Don't use CRDTs for financial transactions or any domain requiring strict linearizability — CRDT semantics can silently merge conflicting writes in ways that violate business invariants
- Don't ignore the garbage collection problem: OR-Sets and sequence CRDTs accumulate tombstones that must be periodically pruned to prevent unbounded memory growth
- Don't assume operation-based CRDTs work correctly over unreliable transports — they require causal or exactly-once delivery; using them over UDP without ordering guarantees causes corruption
- Don't hand-roll complex CRDTs in production without formal verification or an established library — subtle violations of the CAI properties cause hard-to-reproduce divergence bugs

## Case Study

**Figma**: Figma's multiplayer editing engine uses CRDT-inspired data structures to allow dozens of designers to simultaneously edit the same file without locks or coordination. Each design object (frame, layer, property) is modeled as an independent CRDT — changes to position, color, and hierarchy are represented as operation logs that merge deterministically. When a user goes offline and edits a shared component, their changes are buffered locally and merged with the server state on reconnect without conflicts. This architecture allows Figma to support real-time collaboration across 50+ simultaneous cursors in a single file, a capability that would require complex distributed locking under traditional approaches.

## Related Frameworks

- eventual-consistency (complement)
- gossip-protocol (complement)
- cap-theorem (related)
- consensus-protocols (alternative)

## Source

https://sdframe.caldis.me/frameworks/crdts
