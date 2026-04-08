# Property-Based Testing / 基于属性的测试

- **Category**: quality
- **Complexity**: advanced
- **Quality**: testability, reliability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Koen Claessen & John Hughes, 2000, 1999
- **Adopters**: Volvo, Ericsson, Spotify, Jet.com, Jane Street

Test invariant properties with auto-generated random inputs

_使用自动生成的随机输入测试不变性质_

## When to Use

Apply this framework when:
- Testing serialization/deserialization round-trips where encode-decode must be lossless
- Validating mathematical or algorithmic invariants (sorting, parsing, compression)
- Exploring edge cases that manual test writers would never think of
- Testing data pipeline transformations where properties like idempotence or commutativity must hold

## When NOT to Use

Stop and reconsider if:
- Simple CRUD operations where properties are trivial and example tests suffice
- UI layout testing where visual correctness cannot be expressed as algebraic properties
- Exploratory prototypes where the properties themselves are not yet understood

## Core Concepts

- Property: A universally quantified statement that must hold true for all valid inputs
- Generator: A composable function that produces random values of a given type for test inputs
- Shrinking: Automatic reduction of a failing input to the minimal case that still fails
- Arbitrary: A typeclass or interface that combines a generator with a shrinker for a type
- Counterexample: A specific input found by the framework that violates the stated property

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Property-Based Testing to?
- What constraints or existing architecture do you need to work within?
- Has your team used Property-Based Testing before? (This is an advanced framework)

## Implementation Steps

1. **Identify properties**: define universal truths about your code (e.g., encode then decode returns original, sort output is always ordered)
2. **Write generators**: create or compose data generators that produce valid random inputs covering edge cases (empty, huge, special chars)
3. **Express the property**: write a test that asserts the property holds for all generated inputs using a PBT library (fast-check, Hypothesis, QuickCheck)
4. **Analyze shrunk failures**: when a property fails, the framework automatically shrinks the input to the minimal failing case for easy debugging
5. **Combine with example tests**: use PBT for invariants and boundary exploration; keep example-based tests for specific documented behaviors

<details><summary>中文步骤</summary>

1. 识别属性：定义代码的普遍真理（如编码后解码返回原始值，排序输出总是有序的）
2. 编写生成器：创建或组合数据生成器，产生覆盖边界情况的有效随机输入（空值、极大值、特殊字符）
3. 表达属性：使用PBT库（fast-check、Hypothesis、QuickCheck）编写断言属性对所有生成输入成立的测试
4. 分析收缩的失败用例：属性失败时，框架自动将输入收缩至最小失败用例以便调试
5. 与示例测试结合：对不变式和边界探索使用PBT；对特定文档化行为保留基于示例的测试

</details>

## Do

- Do start with simple round-trip properties because they are easy to understand and highly effective
- Do compose generators from smaller ones because complex custom generators are error-prone
- Do use shrinking to find minimal failing cases because it dramatically speeds up debugging
- Do combine PBT with example-based tests because each approach catches different kinds of bugs

## Don't

- Don't write overly complex generators because they become a source of bugs themselves
- Don't ignore failing seeds because non-deterministic test failures indicate real property violations
- Don't replace all example tests with PBT because specific documented behaviors need explicit examples
- Don't test properties that are trivially true because they waste computation without providing confidence

## Case Study

**Volvo**: Volvo used Quviq QuickCheck to test the AUTOSAR embedded software standard used in their vehicles. Property-based testing discovered over 200 bugs in the specification and implementations that traditional testing had missed, including critical timing and state machine issues. John Hughes presented this work as evidence of PBT's industrial effectiveness at multiple conferences.

## Related Frameworks

- tdd (complement)
- design-by-contract (complement)
- functional-core-imperative-shell (complement)

## Source

https://sdframe.caldis.me/frameworks/property-based-testing
