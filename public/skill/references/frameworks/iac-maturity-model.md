# Infrastructure as Code Maturity Model / 基础设施即代码成熟度模型

- **Category**: deployment
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Kief Morris, 2006
- **Adopters**: HashiCorp, Monzo, Spotify, Thoughtworks, Atlassian, Cloudflare

Staged progression from manual infrastructure to fully automated self-service IaC

_从手动基础设施到完全自动化自服务 IaC 的阶段性演进_

## When to Use

Apply this framework when:
- Organizations beginning or deepening an IaC adoption journey who need a roadmap to guide investment and measure progress
- Platform engineering teams building a developer self-service layer who want to articulate the maturity levels to leadership
- Engineering managers conducting infrastructure capability audits before a cloud migration or re-platforming initiative
- Teams struggling with IaC drift, snowflake servers, or inconsistent environments who need a structured improvement path

## When NOT to Use

Stop and reconsider if:
- Proof-of-concept or hackathon environments where the overhead of IaC setup outweighs the short lifecycle of the infrastructure
- Organizations with a single engineer managing infrastructure where formalized maturity levels add bureaucratic overhead without team benefit
- Legacy infrastructure with undocumented, bespoke configurations where a maturity model assessment is premature before a discovery audit
- Environments locked to a single cloud provider's proprietary tooling where generic IaC maturity models may not map cleanly

## Core Concepts

- Maturity Levels: Typically five stages from Level 0 (fully manual) through Level 4 (dynamic self-service), each with defined characteristics and exit criteria
- Idempotency Principle: IaC at maturity means running the same script repeatedly produces the same outcome; drift is impossible by design
- Module Abstraction: Higher maturity levels abstract infrastructure complexity into reusable, versioned modules that encode organizational standards
- Policy as Code: Advanced maturity incorporates automated compliance validation (Open Policy Agent, Sentinel) into the IaC pipeline

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Infrastructure as Code Maturity Model to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Assess current state**: audit how infrastructure is provisioned today — manual console, scripts, partial IaC, or full automation
2. Define target maturity level and identify the gaps between current and desired state for each infrastructure domain
3. Introduce declarative IaC tooling (Terraform, Pulumi, CloudFormation) for net-new resources while coexisting with manual legacy
4. Build CI/CD pipelines that plan, validate, and apply infrastructure changes automatically on merge
5. **Evolve toward self-service**: platform teams publish reusable modules; product teams consume them without infrastructure knowledge

<details><summary>中文步骤</summary>

1. 评估当前状态：审计当前基础设施的配置方式——手动控制台、脚本、部分 IaC 或完全自动化
2. 定义目标成熟度级别，识别每个基础设施域当前状态与期望状态之间的差距
3. 对净新资源引入声明式 IaC 工具（Terraform、Pulumi、CloudFormation），同时与手动遗留系统共存
4. 构建在合并时自动计划、验证和应用基础设施变更的 CI/CD 流水线
5. 向自服务演进：平台团队发布可复用模块；产品团队无需基础设施知识即可使用

</details>

## Do

- Do start by codifying one well-understood, low-risk infrastructure domain (e.g., DNS records or S3 buckets) to prove the workflow before expanding scope
- Do enforce IaC linting and static analysis (tflint, checkov) in CI to catch configuration errors and security misconfigurations before apply
- Do use remote state backends with state locking to prevent concurrent apply operations from corrupting infrastructure state
- Do build a module registry with versioned, documented modules so that teams consume approved patterns rather than writing ad-hoc resources

## Don't

- Don't import existing manually-created resources into IaC state without first auditing and documenting their configuration, because undocumented resources become IaC liabilities
- Don't apply infrastructure changes directly from developer workstations in production — all changes must flow through CI/CD with plan review
- Don't treat IaC maturity as a binary milestone — incremental progress is more sustainable than attempting a big-bang migration of all infrastructure at once
- Don't confuse configuration management (Ansible, Chef) with infrastructure provisioning (Terraform, Pulumi) — they solve different problems at different layers

## Case Study

**Monzo**: Monzo, the UK digital bank, progressed from a manual AWS console-based setup in 2015 to a fully automated Terraform-based IaC platform by 2019. Their journey followed the maturity model closely: starting with scripts, moving to Terraform modules managed by a central platform team, and eventually enabling product engineers to self-provision infrastructure via an internal catalog. By Level 4, Monzo engineers could spin up a new microservice with a complete networking, IAM, and observability stack in under 10 minutes via a self-service portal.

## Related Frameworks

- infrastructure-as-code (extends)
- gitops (complement)
- platform-engineering (complement)
- deployment-stamps-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/iac-maturity-model
