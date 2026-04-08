# Developer Onboarding Framework / 开发者入职框架

- **Category**: team
- **Complexity**: intermediate
- **Quality**: usability, maintainability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Kate Heddleston, 2009
- **Adopters**: Stripe, Airbnb, Shopify, Netlify, GitHub

Structured ramp-up program for new engineers combining role clarity, progressive autonomy, and embedded social integration

_为新工程师设计的结构化成长计划，融合角色清晰度、渐进式自主权和融入团队社交_

## When to Use

Apply this framework when:
- When the team is hiring more than 2-3 engineers per year and onboarding is informal, inconsistent, and dependent on whoever has bandwidth to help
- When new engineers consistently take 3+ months to make independent contributions, suggesting the path to productivity is unclear or blocked
- When attrition in the first 6 months is higher than expected and exit interviews reveal onboarding confusion or social isolation as contributing factors
- When the team is distributed across timezones and new hires cannot rely on informal corridor conversations to fill knowledge gaps

## When NOT to Use

Stop and reconsider if:
- Micro-teams of fewer than 5 engineers where pair programming and direct collaboration serve as natural onboarding and formal programs add unnecessary overhead
- Short-term contractors or consultants engaged for a specific, bounded task who do not need deep system context
- Teams where the onboarding culture is intentionally steep as a self-selection mechanism — though this is rarely a justifiable design choice at scale
- Experimental projects with a lifespan under 6 months where the onboarding investment will not be recouped

## Core Concepts

- 30/60/90-Day Plan: A role-specific roadmap defining what a new engineer should learn, build, and own at each milestone — transforming onboarding from a passive process into an active progression with clear success criteria
- Onboarding Buddy: A dedicated peer (distinct from the manager) who provides psychological safety for 'silly questions', navigates social dynamics, and offers unfiltered context about team culture — protected time for the buddy is essential
- First Contribution Fast: The practice of engineering onboarding so a new hire ships a real change to production within the first week — building system confidence, establishing toolchain access, and creating a sense of belonging
- Context Before Code: Presenting architectural intent (ADRs, diagrams, runbooks) before raw implementation because understanding why a system is designed as it is dramatically accelerates reading and modifying code correctly
- Onboarding as a Product: Treating the onboarding process as an internal product with owners, feedback loops, and continuous improvement cycles — the 90-day retrospective feeds directly into the next version of the onboarding doc

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Developer Onboarding Framework to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Create a written onboarding document (30/60/90-day plan) per role before the engineer joins, specifying expected milestones, assigned buddy, first task backlog, and system access checklist — so Day 1 is productive rather than administrative
2. Assign a dedicated onboarding buddy (a peer, not the manager) who is available for questions without judgment for the first 30 days and whose own velocity is formally protected during this period
3. Structure the first week as guided exploration: new hire ships a small, real change to production (a bug fix, a doc update, a minor feature) within 5 working days to build system confidence and establish commit access
4. Introduce the codebase through context maps — architecture diagrams, ADRs, team-authored runbooks — before asking the engineer to read raw code, so they understand intent before implementation
5. Run retrospective check-ins at 30, 60, and 90 days to identify gaps in tooling, documentation, or social integration, and feed findings back into the onboarding document for the next hire

<details><summary>中文步骤</summary>

1. 在工程师入职前，为每个角色创建书面入职文档（30/60/90 天计划），指定预期里程碑、指定伙伴、第一批任务积压和系统访问清单——确保第一天就能高效工作而非埋头行政事务
2. 指定专属入职伙伴（同级同事而非经理），在前 30 天随时可无顾虑地提问，且其自身的工作进度在此期间受到正式保护
3. 将第一周构建为引导式探索：新员工在入职 5 个工作日内将一个小型真实变更发布到生产环境（修复 bug、更新文档、小功能），以建立系统信心并完成提交权限配置
4. 通过上下文地图引导熟悉代码库——架构图、ADR、团队编写的操作手册——而非直接阅读原始代码，使其在理解意图后再看实现
5. 在 30、60 和 90 天进行回顾性检查，识别工具、文档或社交融入方面的差距，并将发现反馈回入职文档，供下一位新员工使用

</details>

## Do

- Do create the 30/60/90-day plan before the engineer joins, not during their first week, because improvising onboarding structure in real time signals disorganization and reduces new hire confidence
- Do protect the onboarding buddy's sprint capacity — if helping new hires competes with their own delivery goals, buddy relationships become resentful rather than supportive
- Do ensure the new hire ships something real to production within the first week because a working deployment end-to-end is the most effective way to verify that all toolchain access and processes are correctly configured
- Do treat onboarding documentation as a living product — run a retrospective after every new hire's 90 days and update the document with what was missing or confusing

## Don't

- Don't assign onboarding as a manager's responsibility alone — managers lack time for deep technical mentoring and new hires need a peer-level relationship without the power dynamic
- Don't front-load the first week with presentations, company all-hands, and HR compliance training at the expense of getting the engineer into the actual development workflow
- Don't skip the architectural context stage by pointing new hires directly at the codebase — reading unfamiliar code without knowing the intent leads to cargo-cult modifications and embedded misunderstandings
- Don't treat onboarding as complete at 30 days — most engineers need 3-6 months to reach full independent contribution velocity, and abandoning structured support too early leaves them floundering

## Case Study

**Stripe**: Stripe's engineering onboarding program, described in multiple public engineering talks (2018-2022), is regarded as one of the most effective in the industry. New engineers are given a curated 'getting started' codebase path, assigned a dedicated onboarding mentor for 60 days (separate from their team lead), and are expected to close a real customer-facing bug within their first five working days. The onboarding document is version-controlled in the same monorepo as the codebase. Internal data showed that engineers who completed the full structured onboarding program reached independent review-level contributions 40% faster than those who went through ad-hoc onboarding during a period of rapid growth. Stripe credits structured onboarding as a key factor in maintaining code quality standards as headcount scaled from 200 to 4000+ engineers.

## Related Frameworks

- engineering-ladder (complement)
- technical-mentorship-program (related)
- developer-experience-framework (complement)
- rfc-process (related)

## Source

https://sdframe.caldis.me/frameworks/developer-onboarding-framework
