# Space-Based Architecture / 基于空间的架构

- **Category**: architecture
- **Complexity**: advanced
- **Quality**: scalability, performance
- **Abstraction**: system
- **Maturity**: established
- **Author**: Mark Richards, 2006; formalized in Richards & Ford, 2020, 2004
- **Adopters**: Ticketmaster, GigaSpaces, Bloomberg, Goldman Sachs, eBay

Distributed architecture using in-memory data grids and processing units to achieve high scalability by eliminating the central database bottleneck

_使用内存数据网格和处理单元消除中央数据库瓶颈，实现高可扩展性的分布式架构_

## When to Use

Apply this framework when:
- When the application must handle extreme spikes in concurrent users, such as concert ticket sales or flash sales
- When the central database is the primary bottleneck and traditional scaling strategies have been exhausted
- When ultra-low latency is required and data can be served from in-memory grids rather than disk-based stores
- When the system needs elastic scaling that responds to load changes in seconds rather than minutes

## When NOT to Use

Stop and reconsider if:
- Applications with low or predictable traffic that do not justify the operational complexity of distributed in-memory grids
- Systems requiring strong transactional consistency where eventual consistency is unacceptable
- Budget-constrained projects where the high memory and infrastructure costs of in-memory data grids are prohibitive

## Core Concepts

- Processing unit: A self-contained deployment unit with business logic, in-memory data, and optional async persistence bundled together
- Virtualized middleware: The infrastructure layer that handles routing, session management, data replication, and unit orchestration
- In-memory data grid: Distributed caching technology that replicates data across processing units for fast local access
- Data pump: Asynchronous component that writes in-memory data changes to the persistent store without blocking user requests
- Elastic scaling: The ability to add or remove processing units dynamically based on real-time load metrics

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Space-Based Architecture to?
- What constraints or existing architecture do you need to work within?
- Has your team used Space-Based Architecture before? (This is an advanced framework)

## Implementation Steps

1. **Identify processing units**: self-contained modules that include business logic, an in-memory data grid, and optional async persistence
2. Deploy a virtualized middleware layer that manages data replication, request routing, and processing unit orchestration
3. Configure the in-memory data grid for data replication across processing units so each unit has a local copy of shared data
4. Implement asynchronous data pumps to persist in-memory state to the database for durability without blocking request processing
5. Add elasticity by configuring the middleware to dynamically spin up or shut down processing units based on load thresholds

<details><summary>中文步骤</summary>

1. 识别处理单元：包含业务逻辑、内存数据网格和可选异步持久化的自包含模块
2. 部署虚拟化中间件层，管理数据复制、请求路由和处理单元编排
3. 配置内存数据网格在处理单元间进行数据复制，使每个单元拥有共享数据的本地副本
4. 实现异步数据泵，将内存状态持久化到数据库以确保持久性，而不阻塞请求处理
5. 通过配置中间件根据负载阈值动态启动或关闭处理单元来增加弹性

</details>

## Do

- Do design processing units to be stateless across requests because it enables seamless horizontal scaling and failover
- Do implement robust data replication monitoring because silent replication failures lead to data inconsistency
- Do use asynchronous data pumps for persistence because synchronous writes to the database reintroduce the bottleneck
- Do test with realistic load spikes because space-based architecture only proves its value under extreme concurrency

## Don't

- Don't use space-based architecture for systems with low concurrency because the complexity is not justified for moderate loads
- Don't assume eventual consistency is acceptable for all operations because some transactions require strong consistency guarantees
- Don't neglect data collision handling because concurrent updates to the same data across processing units cause conflicts
- Don't skip capacity planning for the in-memory grid because memory exhaustion causes cascading failures

## Case Study

**Ticketmaster**: Ticketmaster adopted a space-based architecture to handle the extreme traffic spikes during major concert on-sales, where millions of users simultaneously compete for limited tickets. By deploying processing units with in-memory data grids, Ticketmaster eliminated the database as the bottleneck during peak demand. Each processing unit holds a replicated copy of available inventory, enabling sub-millisecond seat lookups. Asynchronous data pumps persist purchase confirmations to the database. This architecture allowed Ticketmaster to handle over 14 billion API calls per day during peak events while maintaining response times under 50 milliseconds.

## Related Frameworks

- microservices-decomposition (complement)
- eda (related)
- cqrs-pattern (related)

## Source

https://sdframe.caldis.me/frameworks/space-based-architecture
