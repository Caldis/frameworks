# Behavior-Driven Development (BDD) / 行为驱动开发

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: testability, usability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Dan North, 2006, 2003
- **Adopters**: GOV.UK, BBC, Booking.com, Ryanair, Commonwealth Bank of Australia

Specify behavior in Given-When-Then shared by all stakeholders

_用 Given-When-Then 格式描述行为，所有干系人共享理解_

## When to Use

Apply this framework when:
- Projects where miscommunication between business and development causes frequent rework
- Domain-heavy applications where business rules need executable documentation
- Teams with non-technical stakeholders who need to read and validate test specifications
- Regulated industries requiring traceable specification-to-test coverage

## When NOT to Use

Stop and reconsider if:
- Small teams where developers and stakeholders communicate directly and frequently
- Purely technical infrastructure projects without business-facing behavior
- Rapid prototyping phases where specifications change too fast for Gherkin to keep up

## Core Concepts

- Given-When-Then: A structured format for expressing scenarios as context, action, and expected outcome
- Gherkin: A domain-specific language for writing human-readable executable specifications
- Example Mapping: A collaborative workshop technique to discover rules, examples, and open questions
- Living Documentation: Automated scenarios that serve as always-up-to-date system documentation
- Ubiquitous Language: Using the same domain terms in scenarios, code, and conversations with stakeholders

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Behavior-Driven Development (BDD) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Discovery workshop**: collaborate with product, QA, and dev to discover scenarios using Example Mapping (rules, examples, questions)
2. **Write scenarios in Gherkin**: express each behavior as Given [context], When [action], Then [outcome] in a .feature file
3. **Automate step definitions**: implement the Given/When/Then steps in code that drives the system under test (Cucumber, SpecFlow, Behave)
4. **Run as living documentation**: execute BDD scenarios in CI and publish results as human-readable reports that serve as up-to-date specs
5. **Refine continuously**: review scenarios in sprint planning, prune obsolete ones, and add new scenarios for newly discovered edge cases

<details><summary>中文步骤</summary>

1. 发现工作坊：与产品、QA和开发协作，使用示例映射（规则、示例、问题）发现场景
2. 用Gherkin编写场景：将每个行为表达为Given [上下文]、When [动作]、Then [结果]，保存在.feature文件中
3. 自动化步骤定义：用代码实现Given/When/Then步骤以驱动被测系统（Cucumber、SpecFlow、Behave）
4. 作为活文档运行：在CI中执行BDD场景并发布人类可读的报告，作为始终最新的规格说明
5. 持续精化：在迭代计划中评审场景，修剪过时场景，为新发现的边界情况添加新场景

</details>

## Do

- Do involve the whole team in writing scenarios because BDD is a collaboration tool, not just a testing tool
- Do keep scenarios at the business behavior level because technical details belong in step definitions
- Do use Example Mapping before writing Gherkin because it prevents writing scenarios for unclear requirements
- Do prune outdated scenarios regularly because stale scenarios undermine trust in living documentation

## Don't

- Don't write scenarios in isolation without business stakeholders because it defeats the collaboration purpose
- Don't include UI selectors or technical details in Gherkin because it makes scenarios brittle and unreadable
- Don't treat BDD as merely a test automation framework because the real value is in the discovery conversations
- Don't write too many scenarios per feature because it creates a maintenance burden that slows development

## Case Study

**GOV.UK**: The UK Government Digital Service (GDS) adopted BDD with Cucumber for building GOV.UK services. The Given-When-Then scenarios served as a shared language between policy teams and developers, ensuring that government services correctly implemented complex regulatory requirements. This approach reduced requirement misunderstandings by over 50% in their first year of adoption.

## Related Frameworks

- tdd (complement)
- test-pyramid (complement)
- domain-driven-design (complement)

## Source

https://sdframe.caldis.me/frameworks/bdd
