# KISS (Keep It Simple, Stupid) / KISS 原则（保持简单，不要复杂）

- **Category**: coding
- **Complexity**: beginner
- **Quality**: maintainability, usability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Kelly Johnson, Lockheed Skunk Works, 1960s, undefined
- **Adopters**: Google 搜索, Basecamp, Unix/Linux 生态系统, Go 编程语言, SQLite

Most systems work best if they are kept simple rather than made complicated. Complexity is the enemy of reliability. Design the simplest thing that could possibly work, and resist the temptation to add cleverness.

_大多数系统保持简单比过度设计更有效。复杂性是可靠性的敌人。设计最简单可能工作的方案，抗拒过度巧妙的诱惑。_

## When to Use

Apply this framework when:
_No data available._

## When NOT to Use

Stop and reconsider if:
_No data available._

## Core Concepts

- Simplicity
- Cognitive Load
- Minimal Design
- Readability
- Occam's Razor in Engineering

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying KISS (Keep It Simple, Stupid) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the minimum requirement**: what must this actually do?
2. Design the simplest solution that satisfies those requirements
3. Remove any element that is not essential to the core requirement
4. Ask 「would a new team member understand this in 5 minutes?」
5. Prefer standard patterns over custom cleverness

<details><summary>中文步骤</summary>

1. 定义最小需求：这个实际上需要做什么？
2. 设计满足这些需求的最简单方案
3. 删除不是核心需求必需的任何元素
4. 问「新团队成员能在 5 分钟内理解这个吗？」
5. 优先使用标准模式而非自定义巧妙设计

</details>

## Do

- Start with the simplest possible implementation
- Prefer standard library solutions over custom implementations
- Write code that reads like prose — minimize indirection
- Limit function parameters; prefer small, focused functions
- Question every layer of abstraction: does it genuinely reduce complexity?

## Don't

- Don't add flexibility 「just in case」 — build for now, refactor later
- Don't use complex design patterns when a plain function would suffice
- Don't mistake terseness for simplicity — one-liners can be hard to read
- Don't build framework-like abstractions inside application code
- Don't let tooling complexity (CI, Docker) negate the simplicity gains in code

## Case Study

**Google Search**: Google Search launched in 1998 with a single text box on a white page — a radical departure from Yahoo and AltaVista's crowded portal homepages. This KISS-driven design reduced cognitive load, focused user intent, and became iconic. Internally, Google's PageRank algorithm was also conceptually simple: count links as votes. The combination of simple UI and simple-to-explain algorithm built the world's dominant search engine.

## Related Frameworks

- clean-code-principles (complement)
- solid-principles (related)
- functional-core-imperative-shell (complement)

## Source

https://sdframe.caldis.me/frameworks/kiss-principle
