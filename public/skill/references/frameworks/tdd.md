# Test-Driven Development (TDD) / 测试驱动开发

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: testability, maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Kent Beck, 1999
- **Adopters**: Pivotal Labs, ThoughtWorks, 8th Light, Industrial Logic, Spotify

Write failing tests first, then code to pass, then refactor

_先写失败测试，再编写代码使之通过，最后重构_

## When to Use

Apply this framework when:
- Implementing well-understood business logic where requirements can be expressed as clear assertions
- Refactoring legacy code where you need a safety net of tests before making changes
- Developing library or API code where correctness and contracts are paramount
- Coaching developers on incremental design and YAGNI thinking

## When NOT to Use

Stop and reconsider if:
- Rapid prototyping where requirements are unknown and code will be thrown away
- Exploratory UI design where visual outcomes are subjective and hard to assert
- Highly concurrent or distributed systems where deterministic unit testing is difficult

## Core Concepts

- Red-Green-Refactor: The three-step cycle of writing a failing test, making it pass, then improving the code
- Baby Steps: Making the smallest possible increment in each cycle to maintain continuous progress
- Emergent Design: Letting the architecture emerge from the refactoring step rather than up-front big design
- YAGNI: Only writing code needed to pass the current test, avoiding speculative features
- Triangulation: Using multiple test cases to drive toward a general solution instead of hard-coding

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Test-Driven Development (TDD) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Red**: write a small, focused test that describes the next behavior increment; run it and confirm it fails for the right reason
2. **Green**: write the minimum amount of production code needed to make the failing test pass — no more, no less
3. **Refactor**: improve the code's structure, naming, and duplication while keeping all tests green; apply clean code principles
4. **Repeat the cycle**: pick the next simplest behavior, write a failing test, make it pass, and refactor — in cycles of 1-5 minutes
5. **Build a regression suite**: as TDD cycles accumulate, the test suite becomes a living specification and safety net for future changes

<details><summary>中文步骤</summary>

1. 红灯：编写一个小而专注的测试描述下一个行为增量；运行并确认它因正确的原因失败
2. 绿灯：编写刚好使失败测试通过所需的最少生产代码——不多不少
3. 重构：在保持所有测试通过的前提下改善代码结构、命名和重复；应用整洁代码原则
4. 重复循环：选择下一个最简单的行为，编写失败测试，使其通过并重构——以1-5分钟为周期
5. 构建回归套件：随TDD周期累积，测试套件成为活的规格说明和未来变更的安全网

</details>

## Do

- Do write the test before the production code because the test-first discipline drives better design
- Do keep cycles short (1-5 minutes) because long cycles lose the feedback benefit of TDD
- Do refactor aggressively in the green phase because skipping refactoring leads to test-passing spaghetti
- Do test behavior not implementation because behavior tests survive refactoring

## Don't

- Don't write multiple failing tests at once because it breaks the one-step-at-a-time discipline
- Don't skip the refactor step because accumulated technical debt defeats the purpose of TDD
- Don't test private methods directly because it couples tests to implementation details
- Don't pursue 100% coverage as a goal because it leads to low-value tests and false confidence

## Case Study

**Pivotal Labs**: Pivotal Labs (now part of VMware Tanzu) built their entire consulting practice around TDD and pair programming. Their client engagements consistently showed that TDD-practiced teams delivered code with 40-60% fewer production defects compared to non-TDD teams. The discipline also reduced debugging time significantly, as most bugs were caught within minutes of introduction.

## Related Frameworks

- test-pyramid (complement)
- bdd (complement)
- clean-code-principles (complement)

## Source

https://sdframe.caldis.me/frameworks/tdd
