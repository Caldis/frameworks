# Feature Branch Strategy / 特性分支策略

- **Category**: evolution
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Vincent Driessen (GitFlow, 2010); various (trunk-based development, ~2000s), 2005
- **Adopters**: Google, Facebook (Meta), GitHub, Microsoft, Atlassian

Git branching models (GitFlow, trunk-based)

_Git 分支模型（GitFlow、主干开发等）_

## When to Use

Apply this framework when:
- Teams collaborating on a shared codebase that need a structured workflow for parallel development
- Projects with formal release cycles requiring release branches and hotfix processes
- Open-source projects where external contributors submit changes via pull requests from forks
- Organizations enforcing code review and CI checks before any code reaches the mainline

## When NOT to Use

Stop and reconsider if:
- Solo developers or very small teams where branching overhead exceeds its coordination benefits
- Experimental or research codebases where rigid branching rules slow down exploration
- Projects with no CI/CD pipeline where branch-based quality gates cannot be enforced automatically
- Monorepo setups that require specialized merge strategies beyond standard Git branching

## Core Concepts

- Feature Branch: A short-lived branch created for a single feature or fix, isolated from mainline until ready to merge
- Trunk-Based Development: A model where all developers commit to a single trunk (main) at least daily, using feature flags for incomplete work
- GitFlow: A structured model with develop, feature, release, and hotfix branches suited to versioned software with scheduled releases
- Branch Protection: Server-side rules that prevent direct pushes and enforce quality gates (reviews, CI) before merge

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Feature Branch Strategy to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Choose a branching model aligned with team size and release cadence (GitFlow, GitHub Flow, trunk-based)
2. Define branch naming conventions, lifecycle policies, and merge/rebase rules
3. **Enforce branch protection rules**: required reviews, CI pass, and no direct pushes to main/trunk
4. Keep feature branches short-lived (hours to days) to minimize merge conflicts and integration risk
5. Merge to mainline via pull request after passing automated tests, code review, and any required approvals

<details><summary>中文步骤</summary>

1. 选择与团队规模和发布节奏匹配的分支模型（GitFlow、GitHub Flow、主干开发）
2. 定义分支命名规范、生命周期策略和合并/变基规则
3. 强制执行分支保护规则：必须评审、CI 通过、禁止直接推送至主分支/主干
4. 保持特性分支短命（数小时到数天），以最小化合并冲突和集成风险
5. 通过拉取请求合并至主线，需通过自动化测试、代码评审和所有必要审批

</details>

## Do

- Keep feature branches as short-lived as possible — ideally merging within 1-2 days to reduce integration risk
- Rebase or merge mainline into feature branches daily to detect conflicts early and keep branches current
- Use branch naming conventions (feature/, fix/, chore/) to communicate intent and enable automation
- Delete branches immediately after merging to keep the repository clean and avoid stale branch accumulation

## Don't

- Don't let feature branches live for weeks — long-lived branches lead to painful merge conflicts and integration surprises
- Don't use GitFlow for continuous deployment — its release branch ceremony adds overhead when you deploy multiple times daily
- Don't skip CI on feature branches — bugs found after merge are much more expensive to fix than bugs caught on the branch
- Don't merge without code review — even small changes benefit from a second pair of eyes for knowledge sharing and quality

## Case Study

**Google**: Google operates one of the largest monorepos in the world with over 80 million commits, using a trunk-based development model. All 25,000+ engineers commit to a single trunk, with changes gated by automated testing and code review. Feature flags manage incomplete work, and short-lived branches (typically hours) ensure continuous integration. This approach enables Google to deploy thousands of changes per day while maintaining code health at scale.

## Related Frameworks

- gitops (complement)
- feature-flags (complement)
- branch-by-abstraction (alternative)

## Source

https://sdframe.caldis.me/frameworks/feature-branch-strategy
