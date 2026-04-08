# Mutation Testing / 变异测试

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: testability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Richard Lipton, 1971
- **Adopters**: Netflix, Airbnb, ING Bank, Sky, Info Support

Test the tests by introducing code mutations and verifying that tests catch them

_通过引入代码变异来测试测试本身，验证测试能否捕获这些变异_

## When to Use

Apply this framework when:
- After achieving high code coverage but still experiencing production bugs that tests should have caught
- When evaluating whether a test suite provides genuine confidence or merely exercises code paths without meaningful assertions
- During quality audits to quantify the real effectiveness of existing tests beyond line coverage metrics
- When building safety-critical or financial systems where test thoroughness directly impacts risk

## When NOT to Use

Stop and reconsider if:
- Rapid prototyping phases where code changes too fast for mutation analysis to provide actionable feedback
- Legacy codebases with minimal existing tests where writing basic tests should take priority over mutation analysis
- Performance-sensitive CI pipelines where mutation testing overhead would unacceptably delay feedback loops

## Core Concepts

- Mutant: A small syntactic change to the source code (e.g., replacing + with -, flipping a boolean, removing a method call)
- Mutation Score: The ratio of killed mutants to total mutants, measuring how effectively the test suite detects faults
- Killed Mutant: A mutant that causes at least one test to fail, proving the test suite detects that specific fault
- Survived Mutant: A mutant that passes all tests, revealing a gap in test coverage or assertion quality
- Equivalent Mutant: A mutant that produces identical behavior to the original code, which cannot be killed and must be excluded from scoring

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Mutation Testing to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Select a mutation testing tool appropriate for your language: Stryker for JS/TS, PIT for Java, mutmut for Python, or similar
2. Run the mutation tool against your codebase: it generates mutants by applying small syntactic changes (flip operators, remove calls, change constants)
3. **Analyze the mutation score**: the percentage of mutants killed by your existing tests — surviving mutants indicate gaps in test quality
4. Strengthen tests to kill surviving mutants: write targeted assertions that cover the specific logic the mutant altered
5. Integrate mutation testing into CI as a quality gate: set a minimum mutation score threshold and fail builds that drop below it

<details><summary>中文步骤</summary>

1. 选择适合你语言的变异测试工具：JS/TS用Stryker，Java用PIT，Python用mutmut等
2. 对代码库运行变异工具：通过应用小型语法变更（翻转运算符、移除调用、更改常量）生成变异体
3. 分析变异分数：现有测试杀死的变异体百分比——存活的变异体表明测试质量存在缺口
4. 加强测试以杀死存活的变异体：编写针对变异体所改变的特定逻辑的定向断言
5. 将变异测试集成到CI中作为质量门禁：设置最低变异分数阈值，低于阈值则构建失败

</details>

## Do

- Do start with critical business logic modules because mutation testing on the entire codebase can be prohibitively slow
- Do use mutation score as a complement to coverage because high coverage with low mutation score reveals weak assertions
- Do configure mutant operators relevant to your domain because not all mutation types apply equally to every codebase
- Do run mutation tests incrementally on changed files because full runs are expensive and slow feedback loops

## Don't

- Don't chase 100% mutation score because equivalent mutants and diminishing returns make it impractical and wasteful
- Don't run mutation tests on generated code or boilerplate because mutations there rarely reveal meaningful test gaps
- Don't treat mutation testing as a replacement for code review because it tests mechanical correctness not design quality
- Don't ignore performance implications because mutation testing can multiply test execution time by 10x-100x

## Case Study

**Netflix**: Netflix applied mutation testing to their critical payment processing and subscription management services. After achieving 90% line coverage, they discovered a mutation score of only 62%, revealing that many tests were exercising code without asserting meaningful outcomes. By systematically killing surviving mutants, they improved fault detection and reduced payment-related production incidents by 35% over two quarters.

## Related Frameworks

- test-pyramid (complement)
- tdd (complement)
- property-based-testing (complement)

## Source

https://sdframe.caldis.me/frameworks/mutation-testing
