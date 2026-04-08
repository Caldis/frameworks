# Two-Phase Commit (2PC) / 两阶段提交（2PC）

- **Category**: distributed
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Jim Gray, 1978
- **Adopters**: Google Spanner, PostgreSQL (prepared transactions), Oracle Database (XA), MySQL (XA), Microsoft SQL Server (MSDTC)

Atomic commit protocol ensuring all-or-nothing transaction outcomes across distributed participants

_确保分布式参与者之间事务要么全部提交要么全部回滚的原子提交协议_

## When to Use

Apply this framework when:
- When multiple databases or resource managers must commit or abort as a single atomic unit, such as in XA transactions
- When financial or regulatory requirements demand that cross-system updates are either fully applied or fully rolled back
- When coordinating writes across heterogeneous data stores (e.g., a relational database and a message queue) that must remain consistent
- When the number of participants is small and the transaction duration is short, minimizing the window for blocking

## When NOT to Use

Stop and reconsider if:
- Microservice architectures where service autonomy and independent deployability are more important than cross-service atomicity
- High-throughput systems where lock contention from the prepare phase would create unacceptable performance bottlenecks
- Systems spanning multiple organizations or trust boundaries where no single coordinator can be trusted by all parties

## Core Concepts

- Atomicity: The fundamental guarantee that either all participants commit or all abort — no partial outcomes are possible
- Blocking problem: If the coordinator fails after sending PREPARE but before sending the decision, participants holding locks are blocked indefinitely until the coordinator recovers
- Write-ahead logging: Both coordinator and participants durably log their decisions before sending messages, enabling recovery after crashes
- Presumed abort: An optimization where the coordinator does not log ABORT decisions; if a participant asks and finds no commit record, it aborts by default
- XA standard: The X/Open DTP model that defines the 2PC interface (xa_prepare, xa_commit, xa_rollback) for interoperability between transaction managers and resource managers

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Two-Phase Commit (2PC) to?
- What constraints or existing architecture do you need to work within?
- Has your team used Two-Phase Commit (2PC) before? (This is an advanced framework)

## Implementation Steps

1. **Phase 1 — Prepare**: The coordinator sends a PREPARE message to all participants, asking each to vote on whether it can commit the transaction
2. **Participant vote**: Each participant performs all transaction work (writes to WAL, acquires locks) and responds with VOTE-COMMIT if ready or VOTE-ABORT if not
3. **Coordinator decision**: If all participants vote COMMIT, the coordinator writes a COMMIT decision to its own durable log; if any participant votes ABORT, the coordinator decides ABORT
4. **Phase 2 — Commit/Abort**: The coordinator sends the decision (COMMIT or ABORT) to all participants, who apply or roll back accordingly and acknowledge
5. **Recovery**: If the coordinator crashes between phases, participants that voted COMMIT remain in a blocked (in-doubt) state until the coordinator recovers and resends the decision

<details><summary>中文步骤</summary>

1. 阶段一——准备：协调者向所有参与者发送PREPARE消息，要求每个参与者投票决定是否能提交事务
2. 参与者投票：每个参与者执行所有事务工作（写入WAL、获取锁），如果准备好则回复VOTE-COMMIT，否则回复VOTE-ABORT
3. 协调者决策：如果所有参与者投票COMMIT，协调者将COMMIT决定写入自己的持久化日志；如果任何参与者投票ABORT，协调者决定ABORT
4. 阶段二——提交/回滚：协调者将决定（COMMIT或ABORT）发送给所有参与者，参与者相应地应用或回滚并确认
5. 恢复：如果协调者在两个阶段之间崩溃，已投票COMMIT的参与者将保持阻塞（不确定）状态，直到协调者恢复并重发决定

</details>

## Do

- Do keep the prepare-to-commit window as short as possible because participants hold locks during this entire period, blocking other transactions
- Do implement robust recovery procedures for the coordinator because its failure is the most dangerous scenario in 2PC
- Do use 2PC only within a single trust boundary because coordinating 2PC across organizational boundaries creates unacceptable operational coupling
- Do monitor in-doubt transaction counts because even rare coordinator failures can leave orphaned locks that block entire tables

## Don't

- Don't use 2PC across microservice boundaries in most cases because the blocking nature and tight coupling contradicts microservice autonomy
- Don't hold expensive resources (like database connections or row locks) during the prepare phase longer than necessary because it degrades overall system throughput
- Don't assume 2PC provides consensus because it only guarantees atomicity; a coordinator failure still blocks the protocol unlike true consensus algorithms
- Don't mix 2PC with long-running business processes because the lock duration becomes unbounded and starves concurrent operations

## Case Study

**Google Spanner**: Google Spanner uses a variant of 2PC combined with Paxos to achieve globally distributed ACID transactions. Each Spanner shard is a Paxos group, and cross-shard transactions use 2PC where each participant shard commits through its own Paxos group. This hybrid eliminates 2PC's blocking problem: if the coordinator fails, the Paxos group that replicated the coordinator's state elects a new coordinator and completes the protocol. Spanner's TrueTime API (GPS + atomic clocks) provides globally synchronized timestamps that order transactions without the traditional 2PC lock contention. This architecture enables Google to run globally consistent transactions with single-digit millisecond latencies for workloads like Google Ads and Google Play, something previously considered impossible for geographically distributed systems.

## Related Frameworks

- saga-pattern (alternative)
- eventual-consistency (alternative)
- consensus-protocols (extends)

## Source

https://sdframe.caldis.me/frameworks/two-phase-commit
