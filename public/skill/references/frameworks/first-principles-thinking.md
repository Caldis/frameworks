# First Principles Thinking / 第一性原理思维

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: foundational
- **Author**: Aristotle (classical origin); popularized in tech by Elon Musk, 2002-present, ~350 BC
- **Adopters**: SpaceX, Tesla, Amazon, Stripe, Dyson, Anduril

Decompose problems to foundational truths, then rebuild up

_将问题分解至基本真理，再从底层重新构建解决方案_

## When to Use

Apply this framework when:
- When industry best practices haven't changed in years and you suspect there's a fundamentally better approach hidden beneath convention
- When cost reduction targets are 10x, not 10%, and incremental optimization of existing approaches cannot reach the goal
- When your team is stuck in 'we've always done it this way' thinking and needs a structured method to break free from legacy assumptions
- When evaluating whether to build vs. buy and the market solutions all share the same architectural assumptions you question

## When NOT to Use

Stop and reconsider if:
- When making routine, low-stakes decisions where the cost of first-principles analysis exceeds the potential benefit
- When working in a domain with well-established, empirically validated best practices that have already been optimized to near-theoretical limits
- When time-to-market is critical and an adequate existing solution can be adopted and iterated upon faster than a ground-up redesign
- When the problem is primarily a coordination or communication challenge, not a fundamental design problem

## Core Concepts

- Fundamental Truths: Irreducible facts (physics, mathematics, logic) that remain true regardless of context, convention, or opinion — the bedrock upon which novel solutions can be built
- Assumption Identification: The disciplined practice of surfacing every hidden assumption in current thinking, separating genuine constraints from inherited conventions
- Reasoning by First Principles vs. Analogy: Instead of reasoning by analogy ('others do it this way, so we should too'), first principles reasoning builds solutions from ground truth
- Constraint Spectrum: Recognizing that constraints exist on a spectrum from immutable (laws of physics) to purely conventional (industry habits), and most assumed constraints are actually soft

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying First Principles Thinking to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Question Assumptions**: list every assumption baked into the current approach and mark which ones are truly constraints vs. conventions
2. **Decompose to Fundamentals**: keep asking 'why?' and 'what is actually required?' until you reach irreducible physical or logical facts
3. **Enumerate Constraints**: distinguish hard constraints (physics, math, regulation) from soft constraints (habit, legacy, preference)
4. **Reconstruct from Scratch**: design the solution using only the fundamental truths, ignoring prior art and existing patterns
5. **Validate and Benchmark**: compare your reconstructed design against the original to quantify improvement and identify overlooked factors

<details><summary>中文步骤</summary>

1. 质疑假设：列出当前方案中内嵌的所有假设，并区分哪些是真正的约束，哪些只是惯例
2. 分解至基本要素：持续追问「为什么」和「真正需要什么」，直至抵达不可再分的物理或逻辑事实
3. 枚举约束条件：区分硬约束（物理、数学、法规）与软约束（习惯、遗留、偏好）
4. 从零重新构建：仅利用基本事实设计解决方案，忽略现有的模式和先例
5. 验证与对标：将重构设计与原方案对比，量化改进幅度并识别被忽视的因素

</details>

## Do

- Do write down every assumption explicitly before starting decomposition, because unexamined assumptions are invisible prisons for thinking
- Do verify your 'fundamental truths' are actually fundamental and not just deeply ingrained assumptions, because false bedrock leads to flawed reconstruction
- Do timebox the decomposition phase, because the value of first principles thinking comes from reconstruction, not infinite decomposition
- Do involve people from outside the domain in questioning assumptions, because domain experts have the deepest blind spots about their own conventions

## Don't

- Don't use first principles thinking for every decision, because most daily decisions are efficiently handled by analogy and pattern matching
- Don't confuse 'ignoring prior art' with 'ignoring prior learning', because understanding why things are done a certain way is essential before deciding to do them differently
- Don't skip the validation step, because elegant first-principles designs can overlook practical constraints that incrementalists discovered the hard way
- Don't fall into the trap of assuming your decomposition is complete, because missing a fundamental constraint can invalidate the entire reconstruction

## Case Study

**SpaceX**: When founding SpaceX in 2002, Elon Musk faced launch costs of $65 million per flight. Instead of accepting industry pricing, he decomposed a rocket to its raw materials — aerospace-grade aluminum, titanium, copper, carbon fiber — and found the materials cost was only about 2% of the typical rocket price. By questioning every inherited assumption about rocket manufacturing (including the assumption that rockets must be expendable), SpaceX developed the Falcon 9 with reusable first stages, ultimately reducing launch costs to roughly $2,700 per kilogram to orbit.

## Related Frameworks

- analogical-thinking (complement)
- six-thinking-hats (related)

## Source

https://sdframe.caldis.me/frameworks/first-principles-thinking
