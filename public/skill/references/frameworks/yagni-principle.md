# YAGNI (You Aren't Gonna Need It) / YAGNI 原则（你不会用到它的）

- **Category**: coding
- **Complexity**: beginner
- **Quality**: maintainability, performance
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Ron Jeffries, Extreme Programming community, late 1990s, undefined
- **Adopters**: Basecamp / 37signals, ThoughtWorks, Pivotal Labs, Shopify, Stack Overflow

Always implement things when you actually need them, never when you just foresee that you might need them. Premature generalization is as harmful as premature optimization.

_只在真正需要时才实现功能，不要因为预见未来可能需要就提前实现。过早泛化与过早优化同样有害。_

## When to Use

Apply this framework when:
_No data available._

## When NOT to Use

Stop and reconsider if:
_No data available._

## Core Concepts

- Incremental Development
- Premature Generalization
- Cost of Unused Code
- Iterative Delivery
- Extreme Programming (XP)

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying YAGNI (You Aren't Gonna Need It) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify what the current story or requirement actually specifies
2. Implement only that requirement — nothing more
3. Resist adding hooks, extension points, or config flags 「for later」
4. **Review your PR**: is every line driven by a real, current requirement?
5. Trust that the codebase will be refactorable when the need actually arises

<details><summary>中文步骤</summary>

1. 确认当前用户故事或需求实际指定了什么
2. 只实现该需求 —— 不多不少
3. 抗拒为「日后」添加钩子、扩展点或配置开关
4. 审查你的 PR：每一行是否都有真实的当前需求驱动？
5. 相信当需求真正来临时代码库可以重构

</details>

## Do

- Implement only what the current requirement demands
- Delete speculative code when cleaning up branches
- Use feature flags to defer decisions rather than building unused paths
- Communicate trade-offs to stakeholders: 「we can add X when we need it」
- Review PRs for 「just in case」 code and flag it

## Don't

- Don't add plugin systems, strategy hooks, or 「extensible」 layers before they're requested
- Don't write adapter code for hypothetical future data sources
- Don't generalize to N cases when only 1 or 2 are needed today
- Don't keep dead code paths 「in case we need them later」
- Don't confuse YAGNI with avoiding good architecture — basic layering is not premature

## Case Study

**Basecamp (37signals)**: Basecamp (formerly 37signals) built its project management product by religiously following YAGNI. Their book 「Getting Real」 documents how features were only built when customers demanded them, not anticipated. The result was a lean product that shipped faster, had fewer bugs, and cost less to maintain. Competitor products loaded with 「maybe useful」 features were harder to learn and slower to develop.

## Related Frameworks

- solid-principles (complement)
- clean-code-principles (complement)
- gof-design-patterns (related)

## Source

https://sdframe.caldis.me/frameworks/yagni-principle
