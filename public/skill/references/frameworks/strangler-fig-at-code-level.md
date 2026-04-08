# Strangler Fig at Code Level / 代码级绞杀者模式

- **Category**: coding
- **Complexity**: advanced
- **Quality**: maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Martin Fowler, 2004; Michael Feathers, 2004
- **Adopters**: GitHub, ThoughtWorks, Shopify, Stripe, SoundCloud

Incrementally replace legacy code modules by wrapping them and redirecting calls to new implementations

_通过包装遗留代码模块并将调用重定向到新实现来渐进式替换旧代码_

## When to Use

Apply this framework when:
- Replacing a tangled legacy module that cannot be safely rewritten all at once
- Migrating from an outdated internal library to a modern replacement without halting feature development
- Refactoring a critical code path where a big-bang rewrite carries too much risk
- Transitioning between different design patterns within a codebase incrementally

## When NOT to Use

Stop and reconsider if:
- Small modules that can be safely rewritten and replaced in a single commit
- Code with no callers or very few call sites where a direct swap is simpler
- Prototyping or throwaway code where long-term maintainability is irrelevant
- Situations where the legacy module has no observable side effects and can be unit-tested in isolation

## Core Concepts

- Characterization Tests: tests written to document the existing behavior of legacy code, forming a safety net before any changes are made
- Abstraction Layer: a facade, adapter, or interface placed between callers and the legacy module to enable transparent redirection
- Incremental Replacement: replacing legacy behavior one code path at a time rather than attempting a complete rewrite
- Parallel Running: keeping both old and new implementations available simultaneously so you can compare outputs and roll back if needed
- Legacy Module Retirement: the final step of removing the old code once all traffic has been verified on the new implementation

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Strangler Fig at Code Level to?
- What constraints or existing architecture do you need to work within?
- Has your team used Strangler Fig at Code Level before? (This is an advanced framework)

## Implementation Steps

1. **Identify the legacy module**: select a specific class, function, or module whose behavior you need to replace, and write characterization tests to capture its current behavior
2. **Create the new implementation**: build the replacement module alongside the legacy one, implementing the same interface or contract with improved design
3. **Introduce an abstraction layer**: place an adapter, facade, or routing layer between callers and the legacy module so you can redirect traffic without changing call sites
4. **Incrementally redirect**: route calls from the legacy module to the new implementation one method or code path at a time, verifying behavior with tests after each switch
5. **Remove the legacy module**: once all calls are routed to the new implementation and tests pass, delete the old code and simplify the abstraction layer if it is no longer needed

<details><summary>中文步骤</summary>

1. 识别遗留模块：选择需要替换的特定类、函数或模块，编写特征测试来捕获其当前行为
2. 创建新实现：在遗留模块旁构建替代模块，以改进的设计实现相同的接口或契约
3. 引入抽象层：在调用方与遗留模块之间放置适配器、外观或路由层，使你可以在不更改调用点的情况下重定向流量
4. 渐进式重定向：逐个方法或代码路径地将调用从遗留模块路由到新实现，每次切换后用测试验证行为
5. 移除遗留模块：一旦所有调用都已路由到新实现且测试通过，删除旧代码并在不再需要时简化抽象层

</details>

## Do

- Do write characterization tests before touching legacy code because they are your safety net against behavioral regressions
- Do keep the abstraction layer thin because a heavyweight adapter becomes its own maintenance burden
- Do replace one code path at a time because small increments let you catch problems early and roll back easily
- Do delete the old code promptly after migration because leaving dead code creates confusion and false dependencies

## Don't

- Don't attempt to replace the entire module in one commit because it defeats the purpose of incremental migration
- Don't skip characterization tests because without them you have no way to verify behavioral equivalence
- Don't let the abstraction layer become permanent middleware because it should be temporary scaffolding
- Don't mix functional changes with migration changes because it makes it impossible to isolate the source of defects

## Case Study

**GitHub**: GitHub incrementally replaced its legacy Ruby permission system with a new authorization service over 18 months. They introduced a thin routing layer that checked a feature flag to decide whether to call the old Ruby module or the new service for each permission check. Teams migrated one resource type at a time (repositories, then organizations, then actions), running both systems in parallel and comparing results. The legacy permission code was fully retired without any user-facing disruption.

## Related Frameworks

- strangler-fig-pattern (extends)
- branch-by-abstraction (complement)
- design-by-contract (complement)

## Source

https://sdframe.caldis.me/frameworks/strangler-fig-at-code-level
