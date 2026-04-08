# Clean Code Principles / 整洁代码原则

- **Category**: coding
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Robert C. Martin, 2008, 1999
- **Adopters**: Basecamp, Pivotal Labs, Thoughtworks, Shopify, GitHub

Write readable, simple, expressive code that minimizes surprise

_编写可读、简洁、表达力强且最小化意外的代码_

## When to Use

Apply this framework when:
- Writing any production code that will be read and maintained by others
- Onboarding new team members who need to understand existing code quickly
- Refactoring legacy code to reduce cognitive load and bug density
- Code reviews where readability and maintainability are primary concerns

## When NOT to Use

Stop and reconsider if:
- Competitive programming or algorithmic contests where execution speed is the only metric
- Quick throwaway scripts that will never be maintained or shared
- Performance-critical hot paths where micro-optimizations require less readable code
- Exploratory data analysis notebooks where iteration speed trumps code structure

## Core Concepts

- Meaningful Names: names should reveal intent, avoid disinformation, and be pronounceable and searchable
- Small Functions: functions should do one thing, do it well, and do it only — ideally under 20 lines
- DRY (Don't Repeat Yourself): every piece of knowledge should have a single, unambiguous representation in the system
- Boy Scout Rule: always leave the codebase cleaner than you found it through incremental improvements
- Comments as Last Resort: well-written code should be self-explanatory; comments should explain 'why', not 'what'

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Clean Code Principles to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Name with intent**: choose variable, function, and class names that reveal purpose; avoid abbreviations and misleading names
2. **Keep functions small and focused**: each function should do one thing, have few parameters, and operate at a single level of abstraction
3. **Eliminate duplication**: extract shared logic into well-named helper functions; apply the DRY principle without over-abstracting
4. **Write self-documenting code**: structure code so it reads like prose; use comments only for 'why' not 'what'
5. **Refactor continuously**: apply the Boy Scout Rule — leave code cleaner than you found it with each commit

<details><summary>中文步骤</summary>

1. 意图命名：选择能揭示目的的变量、函数和类名；避免缩写和误导性名称
2. 保持函数小而专注：每个函数只做一件事，参数少，在单一抽象层级上操作
3. 消除重复：将共享逻辑提取到命名良好的辅助函数中；在不过度抽象的前提下应用DRY原则
4. 编写自文档化代码：组织代码使其如散文般可读；注释只用于解释「为什么」而非「做什么」
5. 持续重构：应用童子军规则——每次提交都让代码比发现时更整洁

</details>

## Do

- Do choose descriptive names even if they are longer because clarity beats brevity
- Do extract functions at different levels of abstraction because it makes the code read like a narrative
- Do write unit tests for every behavior because tests are the best documentation of intent
- Do refactor in small steps because large refactors introduce risk and are hard to review

## Don't

- Don't use magic numbers or strings because they hide intent and create maintenance landmines
- Don't write functions with more than three parameters because they are hard to understand and test
- Don't leave dead code commented out because version control preserves history
- Don't obsess over code aesthetics at the expense of shipping because perfect is the enemy of done

## Case Study

**Basecamp**: Basecamp (formerly 37signals) built their entire Ruby on Rails codebase around Clean Code principles. DHH and the team maintained strict naming conventions and small method sizes, which allowed a team of fewer than 20 programmers to build and maintain a product used by millions. Their emphasis on readable code over clever code became a core tenet of the Rails community.

## Related Frameworks

- solid-principles (complement)
- conventional-comments (complement)
- grasp-patterns (complement)

## Source

https://sdframe.caldis.me/frameworks/clean-code-principles
