# Consistent Hashing / 一致性哈希

- **Category**: distributed
- **Complexity**: intermediate
- **Quality**: scalability, performance
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: David Karger, Eric Lehman, Tom Leighton, et al., 1997
- **Adopters**: Akamai, Apache Cassandra, Amazon DynamoDB, Memcached (ketama), Riak

Distribute data across nodes with minimal redistribution when the cluster changes

_在集群变更时以最小重新分配量将数据分布到各节点_

## When to Use

Apply this framework when:
- When distributing cached data across a cluster of cache servers and nodes are frequently added or removed
- When building a distributed key-value store that must rebalance data with minimal migration on cluster resize
- When implementing client-side load balancing where a consistent mapping from request keys to backend servers is needed
- When designing a CDN or object storage system where content must be distributed across edge nodes predictably

## When NOT to Use

Stop and reconsider if:
- Static clusters that never change size, where simple range or modular partitioning is sufficient and easier to reason about
- Workloads requiring strict ordering or range queries, where hash-based partitioning scatters related keys across nodes
- Single-node systems or systems with a dedicated partitioning coordinator that can use more sophisticated placement algorithms

## Core Concepts

- Hash ring: A circular hash space where the output of the hash function wraps around, so the space has no endpoints and every position has a successor
- Virtual nodes (vnodes): Multiple hash positions per physical node that smooth out distribution imbalances caused by non-uniform hash clustering
- Minimal disruption: When a node joins or leaves, only O(K/N) keys need to move (K total keys, N nodes), compared to O(K) with naive modular hashing
- Replication via ring walking: Data is replicated by storing copies on the next R distinct physical nodes encountered clockwise, providing fault tolerance
- Bounded load extension: Google's 2017 improvement that caps the maximum load on any node to (1+epsilon) times the average, preventing hot spots

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Consistent Hashing to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the hash ring**: map both data keys and node identifiers onto the same circular hash space (typically 0 to 2^32-1) using a uniform hash function
2. **Assign keys to nodes**: each key is assigned to the first node encountered when walking clockwise around the ring from the key's hash position
3. **Add virtual nodes**: map each physical node to multiple positions on the ring (e.g., 100-200 virtual nodes per physical node) to ensure uniform load distribution
4. **Handle node addition**: when a new node joins, it claims a portion of the ring; only the keys in the affected arc need to migrate from the successor node
5. **Handle node removal**: when a node leaves, its keys are redistributed to the next node clockwise on the ring, affecting only a fraction of the total keys

<details><summary>中文步骤</summary>

1. 定义哈希环：使用均匀哈希函数将数据键和节点标识符映射到相同的环形哈希空间（通常为0到2^32-1）
2. 将键分配给节点：每个键被分配给从该键的哈希位置沿环顺时针方向遇到的第一个节点
3. 添加虚拟节点：将每个物理节点映射到环上的多个位置（如每个物理节点100-200个虚拟节点）以确保负载均匀分布
4. 处理节点加入：新节点加入时声明环上的一段弧；只有受影响弧段上的键需要从后继节点迁移
5. 处理节点移除：节点离开时其键重新分配给环上顺时针方向的下一个节点，只影响总键数的一小部分

</details>

## Do

- Do use a sufficient number of virtual nodes per physical node (100+) because too few virtual nodes leads to uneven key distribution
- Do choose a hash function with good uniformity (like xxHash or MurmurHash) because poor distribution creates hot spots regardless of virtual nodes
- Do consider heterogeneous node capacity by assigning more virtual nodes to more powerful machines to achieve proportional load distribution
- Do implement gradual key migration when nodes join because migrating all affected keys at once can cause load spikes on neighboring nodes

## Don't

- Don't use consistent hashing with very small clusters (2-3 nodes) because the overhead is unnecessary and simple partitioning suffices
- Don't forget about replication when implementing consistent hashing because hash ring assignment alone does not provide fault tolerance
- Don't assume consistent hashing eliminates all hot spots because skewed access patterns (a few very popular keys) still concentrate load on specific nodes
- Don't change the hash function after deployment because it invalidates the entire key-to-node mapping and forces a full data migration

## Case Study

**Akamai**: Consistent hashing was originally invented by Karger et al. at MIT in collaboration with Akamai Technologies to solve the web content caching problem. Akamai's CDN needed to distribute cached web objects across thousands of edge servers worldwide, and when servers were added or removed, traditional modular hashing would invalidate nearly all cache entries, causing a thundering herd of requests to origin servers. With consistent hashing, adding or removing a server affects only 1/N of the cached keys, keeping cache hit rates stable during cluster changes. This approach remains fundamental to Akamai's CDN, which serves over 30% of global web traffic.

## Related Frameworks

- sharding-strategies (complement)
- gossip-protocol (complement)
- cap-theorem (prerequisite)

## Source

https://sdframe.caldis.me/frameworks/consistent-hashing
