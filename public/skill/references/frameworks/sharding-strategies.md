# Sharding Strategies / 分片策略

- **Category**: distributed
- **Complexity**: advanced
- **Quality**: scalability, performance
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Concept from database research (1980s-1990s); formalized in modern context by Kleppmann (2017), 1986
- **Adopters**: Slack, Pinterest, Vitess/YouTube, Instagram, MongoDB Atlas

Horizontal data partitioning patterns for distributing load across multiple database nodes

_将数据水平分区到多个数据库节点以分散负载的模式_

## When to Use

Apply this framework when:
- When a single database instance cannot handle the write throughput or storage volume required by the application
- When query latency is degraded by the sheer size of tables and indexes on a single node, even after vertical scaling
- When multi-tenant applications need data isolation guarantees where each tenant's data resides on a dedicated shard
- When geographic data locality is required to minimize latency by placing shards close to their primary user base

## When NOT to Use

Stop and reconsider if:
- Datasets that fit comfortably on a single database node with acceptable query performance
- Workloads dominated by cross-entity analytical queries where sharding would require constant scatter-gather operations
- Early-stage products where the data model is still evolving and premature sharding would lock in a suboptimal partition scheme

## Core Concepts

- Hash-based sharding: Apply a hash function to the shard key and assign data to shards by hash range; ensures uniform distribution but prevents efficient range queries
- Range-based sharding: Assign contiguous key ranges to each shard; supports range queries but risks hot spots if access patterns cluster around certain ranges
- Directory-based sharding: A lookup table maps each key to its shard; maximally flexible but introduces the directory as a single point of failure and bottleneck
- Cross-shard queries: Queries that span multiple shards require scatter-gather coordination, which is significantly more expensive than single-shard queries
- Shard rebalancing: The process of redistributing data across shards when adding or removing nodes, which must be done without downtime using techniques like logical sharding or dual-write migration

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Sharding Strategies to?
- What constraints or existing architecture do you need to work within?
- Has your team used Sharding Strategies before? (This is an advanced framework)

## Implementation Steps

1. **Analyze access patterns**: identify the most common queries, their selectivity, and which fields they filter on to determine the optimal shard key
2. **Choose a sharding strategy**: select hash-based sharding for uniform distribution, range-based sharding for range queries, or directory-based sharding for complex routing
3. **Define the shard key**: select a high-cardinality field (e.g., user_id, tenant_id) that distributes writes evenly and keeps related data co-located for common query patterns
4. **Implement query routing**: build a routing layer (application-level, proxy, or coordinator) that directs each query to the correct shard(s) based on the shard key
5. **Plan for rebalancing**: design the migration strategy for splitting hot shards or redistributing data when adding nodes, using techniques like consistent hashing or logical sharding

<details><summary>中文步骤</summary>

1. 分析访问模式：识别最常见的查询、其选择性以及过滤的字段，以确定最优分片键
2. 选择分片策略：选择基于哈希的分片实现均匀分布、基于范围的分片支持范围查询，或基于目录的分片实现复杂路由
3. 定义分片键：选择高基数字段（如user_id、tenant_id），确保写入均匀分布且相关数据对常见查询模式保持共置
4. 实现查询路由：构建路由层（应用级、代理或协调器），根据分片键将每个查询定向到正确的分片
5. 规划重新平衡：设计分割热分片或在添加节点时重新分配数据的迁移策略，使用一致性哈希或逻辑分片等技术

</details>

## Do

- Do choose a shard key with high cardinality and uniform distribution because low-cardinality keys create unbalanceable hot shards
- Do co-locate related data on the same shard whenever possible because cross-shard joins are orders of magnitude slower than local joins
- Do implement logical sharding from the start (many logical shards per physical node) because it makes future physical rebalancing a matter of reassigning logical shards rather than splitting data
- Do plan for the scatter-gather query pattern because some queries will inevitably span multiple shards and need a coordination layer

## Don't

- Don't shard prematurely because sharding adds significant operational complexity; exhaust vertical scaling and read replicas first
- Don't choose a shard key based on write patterns alone because read-heavy queries that span all shards will create a scatter-gather bottleneck
- Don't forget about secondary indexes because global secondary indexes in a sharded system require cross-shard coordination or eventual consistency
- Don't assume you can change the shard key later without a full data migration because the shard key determines the physical data layout

## Case Study

**Slack**: Slack shards its MySQL databases by workspace (team_id), ensuring that all messages, channels, and metadata for a single workspace reside on the same shard. This design eliminates cross-shard queries for the most common access pattern — loading messages in a channel for a specific workspace. When Slack grew from hundreds to millions of workspaces, they implemented a logical sharding layer called Bedrock that maps workspace IDs to physical shards. When a physical shard becomes too hot, Bedrock moves logical shards to a new physical node with zero-downtime migration using dual-write and cutover. This approach allowed Slack to scale from a single MySQL instance to thousands of shards while maintaining sub-100ms query latencies for workspace-scoped operations.

## Related Frameworks

- consistent-hashing (complement)
- cap-theorem (prerequisite)
- eventual-consistency (related)

## Source

https://sdframe.caldis.me/frameworks/sharding-strategies
