# Evolutionary Database Design / 演进式数据库设计

- **Category**: evolution
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Pramod Sadalage & Martin Fowler, 2002-2016
- **Adopters**: ThoughtWorks, Spotify, Shopify, GitHub, Stripe

Incremental schema changes (Sadalage & Fowler)

_增量式模式变更（Sadalage & Fowler）_

## When to Use

Apply this framework when:
- Applications with continuous delivery pipelines that deploy multiple times per day
- Systems where database changes must not cause downtime or break running application instances
- Teams migrating from manual DBA-controlled schema changes to developer-owned database evolution
- Microservices architectures where each service owns its database schema independently

## When NOT to Use

Stop and reconsider if:
- Greenfield projects with no existing data where schema can be freely redesigned without migration overhead
- Analytical/data warehouse schemas designed for batch ETL rather than continuous deployment
- Systems using schema-less databases (document stores) where schema evolution is handled at the application layer
- One-time data migrations where there is no ongoing need for incremental schema evolution

## Core Concepts

- Migration as Code: Database changes are first-class code artifacts — versioned, reviewed, tested, and deployed through the same pipeline as application code
- Expand-Contract Pattern: A two-phase approach where the schema is first expanded to support both old and new formats, then contracted to remove the old format after migration
- Backward Compatibility: Every migration must allow the previous application version to function correctly, enabling zero-downtime deployments
- Transition Period: The window during which both old and new schema elements coexist, requiring careful data synchronization and dual-write strategies

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Evolutionary Database Design to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Treat every database change as a versioned migration script stored in version control alongside application code
2. **Use expand-contract pattern**: add new columns/tables first, migrate data, then remove old structures
3. Automate migration execution in CI/CD pipelines with tools like Flyway, Liquibase, or Alembic
4. Ensure every migration is backward-compatible so the previous application version can coexist during deployment
5. Monitor migration performance and data integrity in production; maintain rollback scripts for every migration

<details><summary>中文步骤</summary>

1. 将每个数据库变更视为版本化的迁移脚本，与应用代码一同存储在版本控制中
2. 使用扩展-收缩模式：先添加新列/表，迁移数据，再移除旧结构
3. 使用 Flyway、Liquibase 或 Alembic 等工具在 CI/CD 流水线中自动执行迁移
4. 确保每次迁移向后兼容，使上一版本的应用在部署期间可以共存
5. 在生产环境中监控迁移性能和数据完整性；为每次迁移维护回滚脚本

</details>

## Do

- Version every migration script with a sequential or timestamp-based identifier for ordering
- Test migrations against a production-like dataset — empty-database tests miss performance and data-integrity issues
- Use the expand-contract pattern for every breaking change to maintain backward compatibility during deployment
- Include both up and down migration scripts so any change can be rolled back safely

## Don't

- Don't apply migrations manually in production — always use automated tooling through CI/CD pipelines
- Don't make destructive changes (DROP COLUMN, DROP TABLE) in the same migration as constructive ones
- Don't skip the transition period — removing old schema elements before all consumers have migrated causes outages
- Don't store migration state outside the database — use a dedicated migrations table for single-source-of-truth tracking

## Case Study

**ThoughtWorks**: ThoughtWorks pioneered evolutionary database design across dozens of enterprise client projects from 2002 onward. On a major retail banking transformation, the team managed over 400 incremental schema migrations across 18 months without a single deployment-related outage. By enforcing the expand-contract pattern and automated migration testing in CI, they enabled daily deployments on a database serving 12 million customer accounts.

## Related Frameworks

- strangler-fig-pattern (complement)
- branch-by-abstraction (complement)
- gitops (complement)
- api-versioning-strategies (complement)

## Source

https://sdframe.caldis.me/frameworks/evolutionary-database-design
