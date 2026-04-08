# Database Migration Patterns / 数据库迁移模式

- **Category**: evolution
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Pramod Sadalage & Scott Ambler, 2006, 2003
- **Adopters**: GitHub, Shopify, Stripe, Airbnb, SoundCloud

Safe techniques for evolving database schemas without downtime or data loss

_无停机、无数据丢失地演进数据库模式的安全技术集合_

## When to Use

Apply this framework when:
- Deploying schema changes in a zero-downtime production environment with rolling deployments
- Splitting a shared database as part of a monolith-to-microservices decomposition
- Migrating from one database vendor to another while keeping the application live
- Renaming columns, changing data types, or restructuring tables in a system with multiple consuming applications

## When NOT to Use

Stop and reconsider if:
- Development or test environments where downtime during migration is perfectly acceptable
- Greenfield projects with no existing data — just create the schema directly
- Embedded databases or single-user applications where concurrent access is not a concern
- Schema changes are so trivial (e.g., adding a nullable column) that no special pattern is needed

## Core Concepts

- Expand-Contract (Parallel Change): Add new structures, migrate data, then remove old structures in separate deployments
- Version-controlled migrations: Every schema change is a numbered, sequential, idempotent script stored in source control
- Backward compatibility: Both old and new application code must work against the database during the migration window
- Blue-green database: Maintaining two schema versions simultaneously so deployments can be rolled back safely
- Data migration vs. schema migration: Separating structural changes from data transformation for clarity and safety

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Database Migration Patterns to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Version-control all schema changes as incremental migration scripts (Flyway, Liquibase)
2. **Apply expand-contract**: add new columns/tables first, migrate data, then remove old structures
3. Use backward-compatible migrations so old and new application code can run simultaneously
4. Test migrations in a production-equivalent staging environment before applying to production
5. Automate rollback scripts for every migration and validate them in CI before merging

<details><summary>中文步骤</summary>

1. 将所有模式变更以增量迁移脚本形式纳入版本控制（Flyway、Liquibase）
2. 应用扩展-收缩模式：先新增列/表，迁移数据，再删除旧结构
3. 保持向后兼容的迁移，使新旧应用代码可同时运行
4. 在等同于生产环境的预发布环境中测试迁移，再应用至生产
5. 为每次迁移自动化回滚脚本，并在合并前通过 CI 验证

</details>

## Do

- Always use the expand-contract pattern for destructive changes (column drops, renames, type changes)
- Test every migration on a production-sized dataset — small test databases hide performance problems
- Include rollback scripts for every forward migration and test them automatically in CI
- Separate data migrations from schema migrations to keep each change small and reviewable

## Don't

- Don't apply destructive schema changes (DROP COLUMN, ALTER TYPE) in a single deployment step
- Don't skip testing migrations against production-sized data — 'works on my laptop' is not enough
- Don't mix application logic changes with schema migrations in the same deployment
- Don't assume your ORM handles migrations safely — always review the generated SQL

## Case Study

**GitHub**: GitHub developed gh-ost (GitHub Online Schema Transmogrifier) to handle zero-downtime schema migrations on their massive MySQL databases. Traditional ALTER TABLE operations would lock tables for hours, causing outages. gh-ost creates a shadow table, streams changes via the binary log, and performs an atomic cutover. It has been used to migrate tables with billions of rows across GitHub's production infrastructure without any user-facing downtime.

## Related Frameworks

- strangler-fig-pattern (complement)
- branch-by-abstraction (complement)
- api-versioning-strategies (complement)

## Source

https://sdframe.caldis.me/frameworks/database-migration-patterns
