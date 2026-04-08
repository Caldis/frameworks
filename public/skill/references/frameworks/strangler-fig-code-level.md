# Strangler Fig at Code Level / 代码层面的绞杀者模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Martin Fowler, 2004
- **Adopters**: LinkedIn, Shopify, Etsy, Booking.com, ThoughtWorks, Amazon

Gradually replacing legacy code modules by growing new implementations alongside old ones until the legacy can be safely removed

_通过在旧实现旁边逐步构建新实现来替换遗留代码模块，直到遗留代码可以安全移除_

## When to Use

Apply this framework when:
- Replacing a legacy module that is deeply embedded in business-critical code where a big-bang rewrite is too risky — the strangler pattern lets you migrate with continuous verification at each step
- Changing the implementation of a module without changing its interface, when downstream callers are too numerous or important to migrate all at once
- Teams practicing continuous delivery who need to keep the codebase always deployable during a multi-week or multi-month migration effort
- Extracting a function from a monolith into a service, where the module boundary in the monolith becomes the anti-corruption layer during the transition

## When NOT to Use

Stop and reconsider if:
- The legacy module has no identifiable interface seam and is deeply entangled with global state, making it impossible to run old and new implementations in parallel without cross-contamination
- The replacement requires a fundamentally different data model or protocol that cannot be hidden behind the existing interface without creating an awkward impedance mismatch
- The module is so small and low-risk that the overhead of implementing a dispatch layer, shadow mode, and incremental migration exceeds the risk of a direct replacement

## Core Concepts

- Seam Identification: finding the natural boundaries in legacy code — function signatures, interfaces, module imports — that can serve as the dispatch point between old and new implementations without requiring changes to callers
- Branch by Abstraction: introducing an abstraction layer (interface, abstract class, or function type) over legacy code so that the new implementation can be developed and tested behind the same contract
- Feature Flag Dispatch: using a runtime or compile-time toggle to route calls between the old and new implementation, enabling incremental rollout and instant rollback if the new implementation shows regressions
- Shadow Mode: running both implementations in parallel but only returning results from the legacy, while logging new implementation outputs for comparison — eliminates risk of behavioral divergence before switching
- Deletion as Completion: the migration is not done until the legacy code is actually deleted; keeping both implementations permanently creates complexity debt; the strangler pattern is complete only when the old code is gone

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Strangler Fig at Code Level to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify the legacy module boundary**: find the seam — a function signature, interface, or module import — that represents the contract between the legacy code and its callers, and treat this boundary as your migration surface
2. Create a parallel new implementation behind the same interface: write the replacement module with the same public API but a new internal implementation, using the Adapter pattern if the legacy interface cannot be changed
3. **Introduce a dispatch mechanism**: add a feature flag, factory function, or routing layer that directs calls to either the old or new implementation based on a configuration toggle or percentage rollout
4. **Migrate callers incrementally**: move one caller at a time to the new implementation, verifying behavior equivalence through side-by-side testing, shadow mode (new runs but results are discarded), or A/B comparison of outputs
5. Delete the legacy code once all callers have been migrated and confidence is established: remove the dispatch mechanism, the old implementation, and all related scaffolding — the strangler fig is complete when the old tree is gone

<details><summary>中文步骤</summary>

1. 识别遗留模块边界：找到接缝——函数签名、接口或模块导入——代表遗留代码与其调用者之间的契约，将此边界作为迁移面
2. 在相同接口后面创建并行的新实现：用相同的公共API但全新的内部实现编写替换模块，如果无法更改遗留接口则使用适配器模式
3. 引入调度机制：添加功能标志、工厂函数或路由层，根据配置开关或百分比推出将调用定向到旧或新实现
4. 增量迁移调用者：每次迁移一个调用者到新实现，通过并排测试、影子模式（新实现运行但结果被丢弃）或输出的A/B比较验证行为等价性
5. 一旦所有调用者都已迁移且建立了信心，删除遗留代码：移除调度机制、旧实现和所有相关脚手架——当旧树消失时，绞杀者模式完成

</details>

## Do

- Do identify a clean seam before starting — if there is no clear interface boundary, create one first using Branch by Abstraction before implementing the new version
- Do use shadow mode (dark launch) for high-risk replacements where both implementations run but only the legacy result is used, allowing silent comparison of outputs before switching
- Do delete legacy code as soon as all callers are migrated — leaving both implementations alive permanently defeats the purpose and creates maintenance burden for future contributors
- Do maintain comprehensive behavior tests for the legacy module before starting the strangler, so you have a regression suite to validate the new implementation against

## Don't

- Don't start a strangler migration without a clear deletion plan — migrations with no end date accumulate both implementations indefinitely, doubling the code that must be understood and maintained
- Don't change the interface while strangling — the whole point of the dispatch layer is that callers don't need to change; if you change the API simultaneously you are doing a rewrite, not a strangler
- Don't underestimate edge cases and implicit contracts in the legacy code — hidden coupling, undocumented side effects, and order-of-operations dependencies are the most common sources of behavioral divergence in strangler migrations
- Don't run both implementations in production indefinitely without a firm migration deadline — the dispatch layer itself becomes technical debt if no team owns removing it

## Case Study

**LinkedIn**: LinkedIn used the Strangler Fig pattern at code level to migrate their monolithic member-profile service from a legacy Oracle-backed Java persistence layer to a new Espresso (distributed document store) backend. Rather than rewriting the profile service in a single release, they introduced a ProfileRepository interface over both backends and a feature-flag-controlled dispatch layer. Individual profile attributes (name, headline, connections count) were migrated one field at a time, running both read paths in shadow mode to compare outputs. The full migration of the 1,400-field profile entity took 14 months and zero production incidents caused by the migration itself. The legacy Oracle profile tables were decommissioned as the last step, eliminating $4M/year in Oracle licensing costs.

## Related Frameworks

- strangler-fig-pattern (related)
- feature-flags (complement)
- adapter-pattern (related)
- branch-by-abstraction (related)
- solid-principles (complement)

## Source

https://sdframe.caldis.me/frameworks/strangler-fig-code-level
