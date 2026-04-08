# Polyglot Persistence / 多语言持久化

- **Category**: data
- **Complexity**: intermediate
- **Quality**: performance, scalability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Martin Fowler / Pramod Sadalage, 2011, 2009
- **Adopters**: Netflix, Amazon, Spotify, LinkedIn, eBay

Use purpose-fit databases for different data access patterns

_为不同数据访问模式使用最合适的数据库技术_

## When to Use

Apply this framework when:
- When different parts of your system have fundamentally different data access patterns that no single database optimizes well
- When a microservices architecture requires each service to own its persistence independently
- When performance requirements demand specialized databases (e.g., graph for social networks, time-series for IoT metrics)
- When the one-size-fits-all relational database has become a bottleneck for specific workloads

## When NOT to Use

Stop and reconsider if:
- When a single database technology adequately serves all your data access patterns and adding complexity is not justified
- When the team is small and cannot afford the operational overhead of managing multiple database technologies
- When strong transactional consistency across all data is required and distributed transactions are too complex
- When regulatory requirements mandate a single auditable datastore for all organizational data

## Core Concepts

- Purpose-fit storage: selecting database technology based on the specific data model, query patterns, and consistency needs of each bounded context
- Database-per-service: each microservice owns and encapsulates its database, preventing tight coupling through shared data stores
- Data synchronization: using events, CDC, or sagas to keep data eventually consistent across services that use different database technologies
- Operational complexity trade-off: gaining performance and modeling advantages at the cost of managing multiple database technologies, backup strategies, and operational playbooks

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Polyglot Persistence to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Analyze each service or bounded context to understand its data access patterns: read/write ratio, query complexity, consistency requirements, and data structure
2. Select the optimal database technology for each pattern: relational for transactions, document stores for flexible schemas, graph databases for relationships, key-value for caching, time-series for metrics
3. Define clear data ownership boundaries so each service owns its database and no external service directly accesses another's datastore
4. Implement cross-service data synchronization using event-driven patterns (CDC, events, sagas) rather than shared databases or direct cross-service queries
5. Establish operational standards for each database technology including backup, monitoring, scaling, and security procedures to manage the increased operational surface area

<details><summary>中文步骤</summary>

1. 分析每个服务或限界上下文以理解其数据访问模式：读写比、查询复杂性、一致性要求和数据结构
2. 为每种模式选择最佳数据库技术：关系型用于事务、文档存储用于灵活模式、图数据库用于关系、键值存储用于缓存、时序数据库用于指标
3. 定义清晰的数据所有权边界，每个服务拥有自己的数据库，外部服务不直接访问其数据存储
4. 使用事件驱动模式（CDC、事件、Saga）而非共享数据库或直接跨服务查询来实现跨服务数据同步
5. 为每种数据库技术建立运维标准，包括备份、监控、扩展和安全流程，以管理增加的运维面

</details>

## Do

- Do choose databases based on data access patterns, not technology hype because the wrong database for a workload creates more problems than it solves
- Do keep database choices encapsulated within service boundaries because leaking database specifics creates tight coupling
- Do invest in team training for each database technology adopted because operational expertise is critical for production reliability
- Do start with fewer databases and add specialized ones only when measured performance demands it

## Don't

- Don't adopt a new database technology for every service because the operational overhead grows multiplicatively with each new technology
- Don't share databases between services to avoid the synchronization problem because shared databases create the tightest form of coupling
- Don't ignore the operational tax of running multiple database technologies because each needs its own monitoring, backup, and upgrade procedures
- Don't choose a NoSQL database just to be modern when a relational database meets your needs because unnecessary complexity is the enemy of reliability

## Case Study

**Netflix**: Netflix employs polyglot persistence across its microservices: Cassandra for distributed session and viewing history storage, MySQL for billing and account data requiring ACID transactions, Elasticsearch for content search, EVCache (memcached) for low-latency caching, and a proprietary time-series store for real-time streaming telemetry. Each database is chosen to optimize for the specific access pattern of its owning service.

## Related Frameworks

- microservices-decomposition (complement)
- data-mesh (complement)
- cap-theorem (complement)
- change-data-capture (complement)

## Source

https://sdframe.caldis.me/frameworks/polyglot-persistence
