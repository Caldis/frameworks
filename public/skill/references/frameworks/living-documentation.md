# Living Documentation / 活文档

- **Category**: evolution
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Cyrille Martraire, 2019, 2011
- **Adopters**: Société Générale, Spotify, ThoughtWorks, GOV.UK, Zalando

Generate docs from tests and code (Martraire, 2019)

_从测试和代码生成文档（Martraire，2019）_

## When to Use

Apply this framework when:
- Projects where documentation is perpetually outdated because it is maintained separately from code
- Domain-rich applications where business rules embedded in code need to be visible to non-developers
- Teams practicing BDD or specification-by-example that want to maximize the value of their executable specs
- APIs and libraries where consumers need always-current reference documentation

## When NOT to Use

Stop and reconsider if:
- Projects with minimal domain complexity where simple README files are sufficient documentation
- Teams without existing test automation — living documentation requires a mature test suite as its foundation
- Contexts where the primary audience is end-users, not developers or analysts — user-facing docs require different formats
- Codebases in rapid prototyping phases where the code itself is too volatile for generated docs to be useful

## Core Concepts

- Executable Specification: Tests that are written in a human-readable format (Gherkin, annotated unit tests) and double as system documentation
- Single Source of Truth: Documentation is generated from code and tests, eliminating the drift between what the docs say and what the code does
- Knowledge Augmentation: Annotations and naming conventions in code carry domain knowledge that documentation generators can harvest automatically
- Evergreen Documentation: Because docs are regenerated on every CI build, they are always current — stale documentation is structurally impossible

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Living Documentation to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Write executable specifications (BDD scenarios, annotated tests) that serve as both tests and documentation
2. Annotate domain code with metadata (custom annotations, docstrings, tags) that documentation generators can extract
3. Configure automated documentation generation in the CI/CD pipeline, producing output on every commit
4. Publish generated documentation to a developer portal or wiki that is always in sync with the latest code
5. Review documentation coverage as part of code review — untested behavior is undocumented behavior

<details><summary>中文步骤</summary>

1. 编写可执行规范（BDD 场景、带注解的测试），同时充当测试和文档
2. 用元数据（自定义注解、文档字符串、标签）标注领域代码，供文档生成器提取
3. 在 CI/CD 流水线中配置自动化文档生成，每次提交都产生输出
4. 将生成的文档发布到与最新代码始终同步的开发者门户或 Wiki
5. 将文档覆盖率作为代码评审的一部分——未测试的行为就是未记录的行为

</details>

## Do

- Name tests and specifications using domain language so generated docs are meaningful to non-technical stakeholders
- Integrate documentation generation into CI/CD so docs are rebuilt and published on every merge to main
- Use BDD/Gherkin scenarios for business-critical flows — they serve as both acceptance tests and stakeholder-readable docs
- Treat documentation coverage as a quality metric alongside test coverage

## Don't

- Don't maintain separate documentation that duplicates what tests already describe — it will inevitably drift
- Don't generate documentation that nobody reads — validate that the output format and location match how consumers access docs
- Don't write tests solely for documentation purposes — every executable spec must also be a real, meaningful test
- Don't ignore the readability of generated docs — invest in formatting, navigation, and search for the output

## Case Study

**Société Générale**: Société Générale's Corporate & Investment Banking division adopted living documentation for their trade processing platform, generating business-readable documentation from 3,000+ BDD scenarios. Business analysts could review the generated docs to verify that regulatory rules were correctly implemented without reading code. This approach reduced documentation maintenance effort by 60% and eliminated compliance audit findings related to documentation-code discrepancies.

## Related Frameworks

- bdd (complement)
- domain-driven-design (complement)
- gitops (complement)
- openapi-specification (complement)

## Source

https://sdframe.caldis.me/frameworks/living-documentation
