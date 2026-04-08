# Expansion/Contraction Pattern / 扩展/收缩模式

- **Category**: evolution
- **Complexity**: intermediate
- **Quality**: maintainability, reliability, portability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Sam Newman, 2010
- **Adopters**: Booking.com, Stripe, Netflix, Etsy, SoundCloud

Safe API and schema migration technique that introduces new capabilities before removing old ones, allowing all clients to migrate without downtime

_安全的 API 和模式迁移技术，在移除旧能力之前引入新能力，让所有客户端无需停机即可完成迁移_

## When to Use

Apply this framework when:
- When renaming a database column, API field, or service endpoint that is consumed by multiple services or clients that cannot be updated atomically
- When changing the type or structure of a shared API contract (splitting a field into two, merging two endpoints) where a flag-day cutover would require coordinated deployment of multiple teams
- When migrating a database schema in a system that must remain online during the migration, requiring the application to read/write both old and new column formats simultaneously
- When a public API field needs to be removed after deprecation and you need a safe, observable migration path that does not require client downtime

## When NOT to Use

Stop and reconsider if:
- Security-critical changes (removing a vulnerable endpoint, fixing an authentication bypass) that must be deployed immediately without a migration window
- Changes where the old and new forms cannot coexist due to resource constraints (storage cost of maintaining two column formats is prohibitive, or the old behavior is actively insecure)
- New feature additions with no existing consumers — expansion/contraction is a migration pattern for changing existing contracts, not for introducing new capabilities
- Environments where deployment velocity is so high (multiple deploys per hour) that migration windows can be extremely short and consumer migration happens naturally within hours

## Core Concepts

- Parallel Change (Expand): The first phase adds the new form alongside the old without removing anything, creating a temporary period where both forms exist and are valid — a structural backward-compatibility guarantee
- Consumer Migration Window: The period between expansion and contraction during which all consumers are expected to migrate; this window's length is determined by consumer SLAs, communication lead time, and organizational change velocity
- Usage-Based Contraction Gating: Contraction should be triggered by data (zero or near-zero usage of the old form as confirmed by metrics) rather than by calendar date alone, reducing the risk of premature removal
- Database Dual-Write/Dual-Read: When expanding a database schema (splitting a column), the application must write to both old and new columns and read from the new column with fallback to old, until the old column is confirmed empty
- Contract Tests as Migration Proof: Consumer-driven contract tests (Pact) serve as automated proof that consumers have migrated to the new form; a green contract test suite is a precondition for the contraction phase

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Expansion/Contraction Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Expansion phase**: add the new API shape, field, or behavior alongside the existing one without removing anything; both old and new forms are simultaneously supported so no client is broken by the deployment
2. **Migrate consumers**: update all known consumers (internal services, mobile clients, partner integrations) to use the new form, using telemetry to track the percentage of traffic still using the old form
3. **Validate migration completeness**: confirm through API usage metrics and consumer-driven contract tests that traffic on the old form has dropped to zero or acceptable residual levels
4. **Contraction phase**: remove the old form once all consumers have migrated; publish a deprecation notice with the planned removal date before contraction, providing the agreed sunset window
5. **Monitor after contraction**: watch for unexpected 400/404 errors from any consumers that were missed in the migration audit, and maintain a rollback plan for the first 72 hours post-contraction

<details><summary>中文步骤</summary>

1. 扩展阶段：在保留现有 API 形态、字段或行为的同时添加新的形态，不删除任何内容；新旧两种形式同时支持，部署不会破坏任何客户端
2. 迁移消费者：更新所有已知消费者（内部服务、移动客户端、合作伙伴集成）以使用新形式，使用遥测跟踪仍在使用旧形式的流量占比
3. 验证迁移完整性：通过 API 使用指标和消费者驱动的契约测试确认旧形式的流量已降至零或可接受的残余水平
4. 收缩阶段：一旦所有消费者完成迁移，移除旧形式；在收缩之前发布带计划移除日期的废弃通知，提供约定的下线窗口
5. 收缩后监控：观察来自迁移审计中遗漏的消费者产生的意外 400/404 错误，并在收缩后最初 72 小时内维护回滚计划

</details>

## Do

- Do instrument both old and new API forms with request counters from day one of expansion, so you have data-driven confidence that migration is complete before contracting
- Do communicate the expansion and planned contraction date to all known consumers at the start of the expansion phase, giving them the full migration window to plan and execute updates
- Do write a consumer-driven contract test for the new form before contraction — a passing contract test is the strongest automated proof that a consumer has migrated
- Do maintain the dual-write/dual-read pattern in database migrations for at least one full deployment cycle after the last write to the old column, allowing rollback if unexpected consumers appear

## Don't

- Don't skip the instrumentation step and contract the old form based on assumed migration completion — unknown consumers using the old form will generate errors that are difficult to diagnose post-contraction
- Don't make the expansion and contraction happen in the same deployment — the consumer migration window must span at least one release cycle so consumers have time to discover and adopt the new form
- Don't remove the old form while any production traffic is still using it, even if it is less than 1% — unknown consumers may be internal monitoring scripts, scheduled jobs, or partner integrations with infrequent call patterns
- Don't use expansion/contraction for purely additive changes (adding a new optional field) — it is only necessary for changes where the old form will eventually be removed or is actively harmful

## Case Study

**Booking.com**: Booking.com applied the expansion/contraction pattern to migrate their property search API from a legacy flat response model to a structured hierarchical model across 200+ internal consumer services. The expansion phase ran for 8 weeks with both response formats served simultaneously, instrumented with per-consumer call counters. Migration was tracked on a team dashboard showing each consumer's adoption percentage. Contraction was blocked until all 200+ consumers showed 100% usage of the new format, confirmed by automated contract tests. The migration completed without a single client-visible error and without requiring any coordinated deployment freeze, enabling 15 separate engineering teams to migrate on their own schedule.

## Related Frameworks

- strangler-fig-pattern (complement)
- api-versioning-strategies (related)
- branch-by-abstraction (related)

## Source

https://sdframe.caldis.me/frameworks/expansion-contraction-pattern
