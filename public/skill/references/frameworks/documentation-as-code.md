# Documentation as Code / 文档即代码

- **Category**: observability
- **Complexity**: beginner
- **Quality**: maintainability, usability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Anne Gentle (2012); popularized by Write the Docs community and Google technical writing team
- **Adopters**: Google, Stripe, GitLab, Microsoft, Cloudflare

Treat documentation like software: version-controlled, tested, reviewed, and continuously deployed

_将文档视为软件对待：版本控制、测试、审查和持续部署_

## When to Use

Apply this framework when:
- Engineering organizations where documentation chronically falls out of date because it lives separately from the code
- API-driven platforms where accurate, auto-generated API documentation is critical for internal and external consumers
- Teams adopting DevOps or GitOps practices who want documentation to follow the same review, test, and deploy workflow as code
- Open-source projects where documentation quality directly impacts contributor onboarding and community growth

## When NOT to Use

Stop and reconsider if:
- Non-technical audience documentation (marketing content, user guides for non-developers) where a CMS provides a better authoring experience
- Highly visual documentation (design specs, wireframes) where WYSIWYG tools are essential and Markdown is too limiting
- Regulated industries requiring formal document management with approval workflows that exceed what Git provides
- Small personal projects where the overhead of CI pipelines and review workflows for docs is disproportionate

## Core Concepts

- Docs-in-Repo: Documentation lives in the same repository as the code it describes, ensuring it is versioned, branched, and reviewed alongside code changes
- Doc Tests: Automated tests that verify documentation accuracy: code samples compile, API examples return expected responses, and configuration snippets are valid
- Generated Documentation: API references, type documentation, and architecture diagrams automatically extracted from source code, eliminating manual duplication
- Review Workflow: Documentation changes go through the same pull request process as code -- with designated reviewers, CI checks, and approval requirements
- Continuous Deployment: Docs are built and published automatically on every merge, ensuring the published documentation always matches the latest code

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Documentation as Code to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Store documentation alongside source code: put docs in the same repository as the code they describe, using lightweight markup (Markdown, AsciiDoc, reStructuredText)
2. Apply software engineering workflows to docs: require pull request reviews for doc changes, run CI checks (linting, link validation, spell check), and version docs with releases
3. **Automate documentation generation**: extract API docs from code annotations (OpenAPI, JSDoc, docstrings), generate architecture diagrams from code, and build reference docs from types
4. **Deploy docs through CI/CD pipelines**: publish documentation automatically on every merge to main, just like deploying application code, ensuring docs are always current
5. **Test documentation accuracy**: write automated tests that verify code examples compile, API endpoints return expected responses, and configuration samples are valid

<details><summary>中文步骤</summary>

1. 将文档与源代码一起存储：将文档放在其描述代码的同一仓库中，使用轻量级标记语言（Markdown、AsciiDoc、reStructuredText）
2. 将软件工程工作流应用于文档：要求文档变更经过Pull Request审查，运行CI检查（代码检查、链接验证、拼写检查），并随发布进行版本管理
3. 自动化文档生成：从代码注解（OpenAPI、JSDoc、docstring）提取API文档，从代码生成架构图，从类型生成参考文档
4. 通过CI/CD管道部署文档：每次合并到主分支时自动发布文档，就像部署应用代码一样，确保文档始终最新
5. 测试文档准确性：编写自动化测试验证代码示例可编译、API端点返回预期响应、配置示例有效

</details>

## Do

- Do store docs in the same repo as the code they describe, because co-located docs are far more likely to be updated when the code changes
- Do add documentation CI checks (broken link detection, markdown linting, code sample compilation) to catch doc rot early
- Do generate API documentation from code annotations rather than writing it manually, because generated docs cannot drift from the implementation
- Do include documentation updates as a required part of the code review checklist, because docs-as-code only works when the team treats docs as first-class

## Don't

- Don't maintain documentation in a separate wiki disconnected from the code repository, because disconnected docs become stale within weeks
- Don't write documentation only at the end of a project, because retroactive documentation is always incomplete and often inaccurate
- Don't generate docs without human-written conceptual guides, because auto-generated API references without context are useless to newcomers
- Don't skip doc reviews in pull requests, because unreviewed documentation accumulates errors just as unreviewed code accumulates bugs

## Case Study

**Google**: Google's engineering culture treats documentation as a first-class engineering artifact. As described in Software Engineering at Google, every code change that affects behavior is expected to include documentation updates in the same changelist. Google's internal documentation platform (g3doc) renders Markdown docs stored alongside code in their monorepo, automatically checking for freshness and flagging stale pages. They found that documentation written by the same engineer who wrote the code, reviewed in the same code review, was 3x more likely to be accurate than documentation written after the fact by a separate technical writer. This practice scaled to 30,000+ engineers across the company.

## Related Frameworks

- developer-portal-backstage (complement)
- gitops (complement)
- twelve-factor-app (related)

## Source

https://sdframe.caldis.me/frameworks/documentation-as-code
