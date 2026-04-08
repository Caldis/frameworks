# Technical Writing as a Practice / 技术写作实践

- **Category**: team
- **Complexity**: beginner
- **Quality**: usability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Divio documentation system (Daniele Procida, 2017); docs-as-code popularized by Anne Gentle (2015), 2010
- **Adopters**: Stripe, Twilio, Cloudflare, Hashicorp, Netlify

Documentation standards, style guides, and docs-as-code workflows for engineering organizations

_工程组织的文档标准、风格指南和文档即代码工作流_

## When to Use

Apply this framework when:
- When engineering teams spend significant time answering the same questions repeatedly because documentation is absent, outdated, or hard to find
- When onboarding new engineers takes weeks longer than expected because institutional knowledge lives in people's heads rather than written documentation
- When the API or platform is becoming a product used by external developers who need documentation as good as the code itself
- When the team has grown past 20 engineers and informal knowledge transfer through conversation no longer scales

## When NOT to Use

Stop and reconsider if:
- Internal proof-of-concept projects with a lifespan under 3 months where the documentation investment will not be recouped before the project is discarded
- Highly experimental research systems where the design changes faster than documentation can be written and maintained
- Proprietary code that will never be shared beyond the immediate team, where informal knowledge transfer through pair programming and code reviews is sufficient
- Automated code where inline comments and self-documenting variable names serve as documentation, and separate prose documentation would be redundant

## Core Concepts

- Diataxis Framework: Four documentation types serving different user needs — Tutorials (learning-oriented, taking the user through a complete example), How-To Guides (task-oriented, solving a specific problem), Explanations (understanding-oriented, discussing concepts), and Reference (information-oriented, describing the system accurately)
- Docs as Code: Treating documentation with the same rigor as code — stored in Git, reviewed in PRs, tested for accuracy, versioned alongside releases, and built/deployed through CI/CD pipelines
- Style Guide: A shared standard for voice, tone, formatting, terminology, and code sample conventions that makes documentation feel consistent regardless of who wrote it
- Documentation Debt: The accumulated deficit of missing, outdated, or inaccurate documentation that creates a hidden tax on every engineer who uses the underdocumented system
- The Documentation Triangle: For every release, three artifacts must be updated — the code, the tests, and the documentation — treating all three as first-class deliverables

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Technical Writing as a Practice to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Adopt a documentation taxonomy (the Divio/Diataxis framework: tutorials, how-to guides, explanations, and reference) and map existing documentation to the four quadrants to identify gaps
2. **Establish a docs-as-code workflow**: store documentation in Git alongside code, use Markdown or AsciiDoc, review documentation in PRs, and publish via static site generators (Docusaurus, MkDocs, Sphinx)
3. Create a style guide (or adopt an existing one: Google Developer Documentation Style Guide, Microsoft Writing Style Guide) and enforce it with automated prose linters (Vale, textlint)
4. **Define documentation ownership**: each service or API has a designated documentation owner responsible for keeping it current; documentation is tracked on the team's definition of done
5. Measure documentation quality quarterly through developer surveys ('Was the documentation sufficient to complete your task?') and track documentation coverage against the API/service inventory

<details><summary>中文步骤</summary>

1. 采用文档分类法（Divio/Diataxis框架：教程、操作指南、解释和参考），将现有文档映射到四个象限以识别差距
2. 建立文档即代码工作流：将文档与代码一起存储在Git中，使用Markdown或AsciiDoc，在PR中审查文档，并通过静态站点生成器（Docusaurus、MkDocs、Sphinx）发布
3. 创建风格指南（或采用现有的：Google开发者文档风格指南、Microsoft写作风格指南），并使用自动化散文代码检查工具（Vale、textlint）强制执行
4. 定义文档所有权：每个服务或API有指定的文档所有者负责保持其最新；文档在团队的完成定义中被跟踪
5. 通过开发者调查每季度衡量文档质量（「文档是否足以完成您的任务？」），并跟踪API/服务清单中的文档覆盖率

</details>

## Do

- Do use the Diataxis framework to separate tutorials from reference documentation because mixing them produces documentation that serves neither learning nor lookup well
- Do enforce documentation updates in the PR review checklist so that documentation debt doesn't accumulate silently with every feature release
- Do run automated link-checking and prose linting in CI because broken links and style inconsistencies are caught at merge time rather than discovered by frustrated readers
- Do invest in documentation search because even the best-written documentation is useless if engineers cannot find it within 30 seconds

## Don't

- Don't assign documentation as a post-release afterthought because it will never be prioritized over the next feature and the documentation debt will compound
- Don't use documentation as a substitute for good API design because if the documentation for an API is long and complex, the API itself is probably too complex
- Don't let documentation ownership become 'everyone's problem' because diffuse ownership is the primary cause of stale, inaccurate documentation
- Don't optimize documentation for the writer's convenience (dumping raw notes, linking to internal Slack threads, assuming tribal knowledge) — optimize it for a reader encountering the topic for the first time

## Case Study

**Stripe**: Stripe has consistently ranked at the top of developer experience benchmarks, with its documentation cited as a primary driver. Stripe's documentation approach embodies every docs-as-code principle: all documentation is stored in a monorepo alongside the API code, reviewed in the same PR workflow as code changes, and built through an automated publishing pipeline. Each API endpoint has dedicated tutorial content, code samples in 8 languages generated from a single source, and a reference section. Stripe employs over 20 technical writers who collaborate directly with engineers rather than receiving finished content to document. Internal research showed that new developers who could complete a working integration in under 30 minutes (possible because of documentation quality) had significantly higher activation rates.

## Related Frameworks

- platform-engineering (complement)
- rfc-process (complement)

## Source

https://sdframe.caldis.me/frameworks/technical-writing-as-a-practice
