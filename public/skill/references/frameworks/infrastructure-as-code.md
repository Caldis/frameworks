# Infrastructure as Code / 基础设施即代码

- **Category**: deployment
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Mark Burgess (CFEngine, 1993) / Luke Kanies (Puppet, 2005) / modern era: Mitchell Hashimoto (Terraform, 2014)
- **Adopters**: Segment (Twilio), HashiCorp, Shopify, Stripe, Cloudflare

Manage and provision infrastructure through machine-readable config

_通过机器可读配置文件管理和供应基础设施_

## When to Use

Apply this framework when:
- Any environment with more than a handful of servers or cloud resources that need consistent, repeatable provisioning
- Multi-environment setups (dev/staging/prod) where manual configuration drift causes deployment issues
- Teams requiring audit trails for every infrastructure change for compliance or regulatory requirements
- Disaster recovery scenarios where entire environments must be recreatable from code within predictable timeframes

## When NOT to Use

Stop and reconsider if:
- One-off experimental environments that will be deleted within hours and don't justify the overhead of writing IaC
- Legacy systems with infrastructure so complex and undocumented that the initial IaC migration cost is prohibitive
- Fully managed serverless architectures where the infrastructure layer is abstracted away by the platform
- Teams with zero version control or code review culture -- IaC without process rigor is worse than manual provisioning

## Core Concepts

- Declarative Configuration: Define the desired end-state of infrastructure (what), and let the tool determine how to achieve it, rather than scripting step-by-step procedures
- Idempotency: IaC operations can be applied multiple times and always produce the same result, making it safe to re-run after failures
- State Management: Tools like Terraform maintain a state file that maps declared resources to actual cloud resources, enabling drift detection
- Immutable Infrastructure: Instead of updating servers in place, destroy and recreate them from code, eliminating configuration drift
- Module Reuse: Encapsulate common infrastructure patterns into reusable modules shared across teams and environments

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Infrastructure as Code to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Choose an IaC tool (Terraform, Pulumi, CloudFormation) matching your cloud/on-prem stack
2. Write declarative or imperative configuration files defining all infrastructure resources
3. Store IaC code in version control with the same branching and review process as application code
4. **Integrate IaC into CI/CD**: run plan/diff on PRs and apply on merge to main
5. Use modules and remote state to promote reuse and manage environment-specific configurations

<details><summary>中文步骤</summary>

1. 选择与云/本地环境匹配的IaC工具（Terraform、Pulumi、CloudFormation）
2. 编写声明式或命令式配置文件，定义所有基础设施资源
3. 将IaC代码存入版本控制系统，采用与应用代码相同的分支和审查流程
4. 将IaC集成到CI/CD流水线：在PR时执行plan/diff，合并主干时执行apply
5. 使用模块和远程状态（remote state）提升复用性，管理特定环境配置

</details>

## Do

- Do treat IaC code with the same rigor as application code: code review, automated testing, and CI/CD pipelines
- Do use remote state backends (S3, GCS, Terraform Cloud) with state locking to prevent concurrent apply conflicts
- Do modularize infrastructure code to avoid monolithic configurations that are hard to reason about
- Do implement policy-as-code (OPA, Sentinel) to enforce security and compliance guardrails before infrastructure changes are applied

## Don't

- Don't manually modify cloud resources outside of IaC, because this creates drift that the state file cannot track
- Don't store Terraform state files in local filesystems or Git, because concurrent access causes corruption and secrets leak
- Don't write monolithic Terraform configurations with hundreds of resources, because plan times become unacceptably long
- Don't hardcode environment-specific values in modules, because this breaks reusability across environments

## Case Study

**Segment**: Segment (now part of Twilio) managed their entire AWS infrastructure across 130+ microservices using Terraform. When they migrated from a monorepo to a polyrepo Terraform structure in 2019, they created reusable modules for common patterns like ECS services, RDS databases, and VPCs. This enabled individual teams to spin up fully-compliant, production-ready infrastructure in minutes instead of days, reducing infrastructure provisioning time by 90%.

## Related Frameworks

- gitops (complement)
- three-ways-devops (complement)
- service-mesh-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/infrastructure-as-code
