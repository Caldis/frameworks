# DRY (Don't Repeat Yourself) / DRY 原则（不要重复自己）

- **Category**: coding
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Andy Hunt & Dave Thomas, 1999, undefined
- **Adopters**: Ruby on Rails（核心设计哲学）, Django, Spring Boot, Terraform, GraphQL

Every piece of knowledge must have a single, unambiguous, authoritative representation within a system. When you find yourself writing the same code in two places, extract it into one canonical source.

_系统中的每一条知识都必须有唯一、明确、权威性的表述。当你在两个地方写相同的代码时，就应该将其提取为唯一的权威来源。_

## When to Use

Apply this framework when:
_No data available._

## When NOT to Use

Stop and reconsider if:
_No data available._

## Core Concepts

- Single Source of Truth
- Abstraction
- Knowledge Duplication vs Code Duplication
- Canonical Representation
- Rule of Three

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying DRY (Don't Repeat Yourself) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify duplicated logic, data, or knowledge across the codebase
2. Find the canonical location or create a single source of truth
3. Extract the duplication into a shared abstraction (function, class, constant, template)
4. Update all call sites to reference the single source
5. Verify tests still pass; ensure the abstraction is not over-generalized

<details><summary>中文步骤</summary>

1. 识别代码库中重复的逻辑、数据或知识
2. 找到权威位置，或创建唯一信源
3. 将重复部分提取为共享抽象（函数、类、常量、模板）
4. 更新所有调用处引用唯一来源
5. 验证测试仍通过；确保抽象没有过度泛化

</details>

## Do

- Extract shared logic into well-named functions or modules
- Use configuration or constants for repeated values
- Apply templates or code generation to eliminate structural duplication
- Review for duplication at the knowledge level, not just syntactic level
- Follow the Rule of Three: abstract on the third repetition

## Don't

- Don't abstract too early — duplication is cheaper than the wrong abstraction
- Don't merge unrelated things just because they look similar
- Don't apply DRY across microservice boundaries at the cost of coupling
- Don't confuse DRY with removing all redundancy — tests intentionally repeat setup
- Don't DRY-up accidental duplication that may diverge in the future

## Case Study

**Ruby on Rails**: Ruby on Rails embodies DRY through its convention-over-configuration philosophy. The ActiveRecord ORM eliminates duplicated SQL and model definitions; Action Pack routes map URLs to controllers without repetitive wiring; Rails generators produce standard scaffolding so developers never manually repeat boilerplate. The result: a new Rails app has almost no duplicated setup code compared to raw PHP or early Java web apps.

## Related Frameworks

- solid-principles (complement)
- clean-code-principles (complement)
- functional-core-imperative-shell (related)

## Source

https://sdframe.caldis.me/frameworks/dry-principle
