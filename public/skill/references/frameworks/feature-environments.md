# Feature Environments / 功能环境

- **Category**: deployment
- **Complexity**: intermediate
- **Quality**: reliability, usability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Vercel, 2016
- **Adopters**: Vercel, Netlify, Heroku, Shopify, GitHub, Stripe

Ephemeral full-stack environments provisioned per pull request or branch

_为每个拉取请求或分支自动创建临时全栈环境_

## When to Use

Apply this framework when:
- Frontend and full-stack teams that want product managers and designers to review changes without running code locally
- Projects with complex integration dependencies where local development environment setup is costly and error-prone
- Teams practicing trunk-based development where frequent PRs need isolated validation before merge
- Organizations that want to shift QA and stakeholder review earlier in the development cycle

## When NOT to Use

Stop and reconsider if:
- Applications with extremely expensive infrastructure stacks where provisioning a full environment per PR is cost-prohibitive
- Monoliths with long build times where environment provisioning exceeds 15 minutes, creating more friction than value
- Teams with very low PR volume where the overhead of building and maintaining the ephemeral environment pipeline exceeds the review benefit
- Regulated environments where ephemeral environments cannot meet compliance requirements for data residency or access control

## Core Concepts

- Ephemeral Namespace Isolation: Each PR gets a dedicated namespace, subdomain, or cluster namespace that is fully isolated from staging and production
- Infrastructure-on-Demand: Environments are created and destroyed programmatically by CI events, treating compute as a disposable resource
- Shift-Left Review: Product stakeholders, designers, and QA can validate running software early, catching requirement gaps before merging
- Hermetic Test Execution: E2E and integration tests run against a realistic stack that mirrors production, eliminating environment parity bugs

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Feature Environments to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Configure CI/CD to automatically provision a named environment on pull request open, using the branch name as a namespace or subdomain
2. Deploy the full application stack (frontend, backend, database seed) into the isolated environment within the CI pipeline
3. Post the environment URL as a PR comment so reviewers and QA can access it without local setup
4. Run automated tests (smoke, E2E, visual regression) against the ephemeral environment as part of the PR checks
5. Automatically tear down the environment on PR close or merge to reclaim infrastructure resources

<details><summary>中文步骤</summary>

1. 配置 CI/CD 在拉取请求打开时使用分支名作为命名空间或子域名自动创建命名环境
2. 在 CI 流水线中将完整应用栈（前端、后端、数据库种子）部署到隔离环境
3. 将环境 URL 作为 PR 评论发布，使审查者和 QA 无需本地设置即可访问
4. 在 PR 检查中对临时环境执行自动化测试（冒烟测试、E2E 测试、视觉回归测试）
5. 在 PR 关闭或合并时自动销毁环境以回收基础设施资源

</details>

## Do

- Do seed ephemeral databases with anonymized production snapshots or realistic fixtures so that reviewers test against representative data
- Do set TTLs and maximum lifetime limits on environments to prevent zombie environments that consume resources indefinitely
- Do cache container image layers and dependency installs aggressively to keep provisioning time under 2 minutes
- Do post the environment URL and a teardown timestamp directly in the PR comment so reviewers know both where to test and how long they have

## Don't

- Don't give ephemeral environments access to production databases or secrets — use isolated seed data to prevent accidental data mutation
- Don't run ephemeral environments against shared staging backends, because concurrent PRs will interfere with each other's test state
- Don't ignore environment provisioning failures in CI — a silent environment creation error means reviewers test against stale or nonexistent deployments
- Don't skip environment teardown automation — manual cleanup creates a long tail of forgotten environments that silently inflate cloud bills

## Case Study

**Vercel**: Vercel made feature environments a core product differentiator by giving every Git push to a non-production branch its own unique preview URL. When a PR is opened on a Next.js project hosted on Vercel, a full deployment is triggered within 30–60 seconds, the URL is posted as a GitHub status check, and the deployment is automatically cleaned up on PR merge. This workflow became so popular that it effectively set the industry standard for frontend preview environments, with Netlify, Cloudflare Pages, and AWS Amplify all shipping equivalent capabilities within two years.

## Related Frameworks

- gitops (complement)
- progressive-delivery (complement)
- blue-green-deployment (alternative)
- infrastructure-as-code (complement)

## Source

https://sdframe.caldis.me/frameworks/feature-environments
