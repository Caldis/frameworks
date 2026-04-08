# Branch by Abstraction / 抽象分支法

- **Category**: evolution
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Paul Hammant, 2007
- **Adopters**: Flickr, Facebook, Google, ThoughtWorks, Atlassian

Replace a component in-place via an abstraction layer without feature branches

_通过抽象层原地替换组件，无需功能分支_

## When to Use

Apply this framework when:
- Replacing a core library or framework dependency (e.g., ORM, logging, HTTP client) without long-lived branches
- Migrating from one database vendor to another while keeping the application deployable
- Swapping out a payment gateway while both old and new providers must remain operational
- Trunk-based development teams that cannot afford long-running feature branches

## When NOT to Use

Stop and reconsider if:
- The component has no clear API boundary and is deeply entangled with other modules
- The replacement will be done in a single commit with trivial scope
- The team is not practicing trunk-based development and prefers long-lived feature branches
- Performance-critical code paths where even a thin abstraction layer introduces unacceptable latency

## Core Concepts

- Abstraction layer: A thin interface or adapter inserted between callers and the component being replaced
- Dark deployment: The new implementation is deployed to production but not yet serving live traffic
- Feature flags: Runtime toggles that control which implementation receives requests
- Trunk-based development: All work happens on the main branch, avoiding merge conflicts from long-lived branches
- Incremental switchover: Traffic shifts gradually, enabling safe rollback at any point

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Branch by Abstraction to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Introduce an abstraction (interface or adapter) over the component to be replaced
2. Make all callers depend on the abstraction rather than the concrete implementation
3. Build the new implementation behind the same abstraction, deploying it to production dark
4. Toggle traffic gradually from the old implementation to the new one using feature flags
5. Remove the old implementation and the abstraction layer once migration is complete

<details><summary>中文步骤</summary>

1. 在待替换组件上引入抽象层（接口或适配器）
2. 使所有调用方依赖抽象而非具体实现
3. 在相同抽象后构建新实现，以暗部署方式发布到生产环境
4. 使用功能开关将流量从旧实现逐步切换至新实现
5. 迁移完成后移除旧实现与抽象层

</details>

## Do

- Keep the abstraction layer as thin as possible — it should only delegate, not contain logic
- Write adapter tests that run against both old and new implementations to ensure behavioral parity
- Use feature flags with kill-switch capability for instant rollback in production
- Communicate the migration timeline clearly so the team doesn't leave both implementations running indefinitely

## Don't

- Don't let the abstraction layer accumulate business logic — it should remain a pure delegation boundary
- Don't skip the step of migrating all callers to the abstraction before building the new implementation
- Don't leave the old implementation in the codebase after migration — dead code breeds confusion
- Don't use this pattern for UI-layer changes where a simple feature flag would suffice

## Case Study

**Flickr**: Flickr used Branch by Abstraction to migrate from their original PHP-based image processing pipeline to a new Java-based service. They introduced an abstraction interface for image transformations, deployed the Java service dark alongside the existing PHP code, and gradually shifted traffic over several weeks. The migration completed with zero user-facing outages and eliminated their long-standing deployment bottleneck.

## Related Frameworks

- strangler-fig-pattern (complement)
- feature-flags (complement)
- hexagonal-architecture (complement)

## Source

https://sdframe.caldis.me/frameworks/branch-by-abstraction
