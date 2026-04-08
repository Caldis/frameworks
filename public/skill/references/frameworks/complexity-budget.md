# Complexity Budget / 复杂度预算

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: John Ousterhout, 2018
- **Adopters**: Google, Stripe, Stanford CS 190, JetBrains, Microsoft

Every module gets a complexity budget; exceed it and you must decompose

_每个模块拥有复杂度预算；超出时必须进行分解_

## When to Use

Apply this framework when:
- When a codebase has grown organically and certain modules have become 'god classes' that no single developer can fully comprehend
- When code review discussions repeatedly flag the same modules as hard to understand or risky to change
- When onboarding time for new engineers is excessive because key modules require too much context to work with safely
- When bug density is concentrated in a few complex modules and you need a principled strategy for simplification

## When NOT to Use

Stop and reconsider if:
- When the codebase is small enough that every developer can hold the entire system in their head, making formal budgets unnecessary overhead
- When you are in an early prototyping phase where rapid experimentation matters more than long-term modularity
- When the team is building a throwaway script or short-lived automation where maintenance costs will never materialize
- When decomposition would require breaking a performance-critical hot path into multiple modules, introducing unacceptable latency

## Core Concepts

- Complexity as a Finite Resource: Treating complexity like a budget forces teams to make conscious allocation decisions rather than letting complexity accumulate invisibly
- Cognitive Load as the True Cost: The real cost of complexity is not lines of code but the mental effort required for a developer to understand and safely modify a module
- Strategic Decomposition: Splitting modules is not about making things smaller for its own sake, but about ensuring each piece can be understood independently
- Incremental Complexity Creep: Without budgets, each small addition seems harmless, but the cumulative effect makes modules incomprehensible over time

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Complexity Budget to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Inventory Complexity Sources**: for each module, enumerate all sources of complexity — interface size, number of special cases, hidden dependencies, and cognitive load required to understand it
2. **Assign Budgets**: establish a maximum acceptable complexity threshold for each module based on its role (leaf modules get smaller budgets, orchestration modules get slightly more)
3. **Measure Against Budget**: evaluate each module against its budget using proxies such as lines of code per method, cyclomatic complexity, number of parameters, and depth of abstraction layers
4. **Decompose Over-Budget Modules**: when a module exceeds its budget, split it by extracting cohesive sub-responsibilities into new deep modules with simple interfaces
5. **Track Budget Over Time**: integrate complexity metrics into CI/CD so that budget violations surface as warnings, preventing gradual complexity creep across releases

<details><summary>中文步骤</summary>

1. 盘点复杂度来源：为每个模块列出所有复杂度来源——接口大小、特殊情况数量、隐藏依赖和理解所需的认知负荷
2. 分配预算：根据模块角色为其建立最大可接受的复杂度阈值（叶子模块获得更小的预算，编排模块稍多）
3. 对照预算衡量：使用每个方法的代码行数、圈复杂度、参数数量和抽象层深度等代理指标评估每个模块
4. 分解超预算模块：当模块超出预算时，将内聚的子职责提取到具有简单接口的新深模块中
5. 持续跟踪预算：将复杂度指标集成到CI/CD中，使预算违规作为警告浮现，防止跨版本的渐进式复杂度蔓延

</details>

## Do

- Do set budgets relative to the module's role, because an orchestration layer legitimately needs more complexity than a utility function
- Do treat interface complexity and implementation complexity separately, because a simple interface can justifiably hide significant internal complexity
- Do revisit budgets when requirements change significantly, because new features may legitimately require reallocating complexity across modules
- Do use the budget as a conversation starter in code reviews, not a rigid gate, because judgment about when to decompose requires context

## Don't

- Don't set a single universal budget for all modules, because different roles in the architecture have legitimately different complexity needs
- Don't decompose modules purely based on size metrics, because a long but linear function may be less complex than a short function with deep nesting and hidden state
- Don't ignore the complexity cost of decomposition itself, because splitting a module into too many pieces creates coordination complexity that can exceed the original problem
- Don't let complexity budgets become a bureaucratic checkbox, because the goal is developer understanding, not metric compliance

## Case Study

**Google**: Google's internal code health guidelines explicitly track complexity per module as part of their readability review process. When the Google Maps rendering engine grew to over 50,000 lines in a single module, the team applied complexity budgeting to decompose it into 12 focused sub-modules (tile management, label placement, route rendering, etc.), each with a clear interface contract. Post-decomposition, the time to onboard new engineers to the rendering pipeline dropped from 3 months to 6 weeks, and the bug rate in rendering-related changes fell by 40% because developers could reason about each sub-module independently.

## Related Frameworks

- deep-vs-shallow-modules (complement)
- separation-of-concerns (complement)
- domain-driven-design (prerequisite)

## Source

https://sdframe.caldis.me/frameworks/complexity-budget
