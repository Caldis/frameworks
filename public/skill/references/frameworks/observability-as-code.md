# Observability-as-Code / 可观测性即代码

- **Category**: observability
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Hashicorp, 2014
- **Adopters**: Monzo, Grafana Labs, Datadog, HashiCorp, Shopify, Atlassian

Defining monitoring, alerts, and dashboards as version-controlled code to ensure reproducible, auditable observability infrastructure

_将监控、告警和仪表盘定义为版本控制代码，确保可观测性基础设施的可复现性和可审计性_

## When to Use

Apply this framework when:
- Teams managing many microservices where manual dashboard and alert creation creates inconsistency and configuration drift across services
- Organizations practicing GitOps where infrastructure changes require peer review and audit trails — extending this discipline to observability configs
- Platform engineering teams who need to provision standard observability for dozens or hundreds of services with minimal per-service manual effort
- Post-incident reviews reveal that missing or stale alerts failed to catch issues, motivating a code-review process for alert rule changes

## When NOT to Use

Stop and reconsider if:
- Small teams with fewer than 5 services where the overhead of setting up Terraform providers and GitOps pipelines exceeds the benefit of version-controlled observability
- Organizations in the early stages of observability maturity where establishing basic instrumentation and alerting is more urgent than codifying existing gaps
- Exploratory debugging phases where engineers need to rapidly iterate on dashboard design in the UI before the visualization requirements are stable enough to codify

## Core Concepts

- Infrastructure-as-Code for Observability: treating dashboards, alert rules, SLO configs, and log queries as first-class infrastructure artifacts stored in Git and applied via automated pipelines
- GitOps Workflow: all observability changes go through version-controlled pull requests, enabling peer review, change history, rollback, and audit trails for every monitoring configuration change
- Templated Observability: using Terraform modules, Jsonnet, or Grafonnet to generate consistent dashboards from service metadata, eliminating per-service manual dashboard creation
- Environment Promotion: observability configurations follow the same promotion lifecycle as application code, ensuring dashboards and alerts are in sync with deployed service versions
- Self-Service Provisioning: service teams define their observability requirements in code and the platform automatically applies them, removing bottlenecks from central platform teams

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Observability-as-Code to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Codify dashboards and alert rules using tools like Terraform, Pulumi, or vendor-specific providers (Grafana-as-code, Datadog Terraform provider) so every observability artifact lives in source control
2. **Establish a GitOps workflow**: all changes to monitors, dashboards, and SLO definitions go through pull requests with peer review and CI validation before being applied to production
3. Use templating and modules to DRY up common observability patterns — a single Terraform module can generate standard latency/error/saturation dashboards for every microservice from a variables map
4. Integrate observability provisioning into service scaffolding so new services automatically get baseline dashboards, alert rules, and log queries without manual setup by platform teams
5. **Apply environment promotion**: observability configs progress from dev → staging → prod in lockstep with service deployments, preventing dashboards from drifting out of sync with the services they monitor

<details><summary>中文步骤</summary>

1. 使用Terraform、Pulumi或厂商特定提供商（Grafana-as-code、Datadog Terraform提供商）将仪表盘和告警规则代码化，使所有可观测性制品都纳入源码管理
2. 建立GitOps工作流：对监控器、仪表盘和SLO定义的所有变更都通过拉取请求经同行评审和CI验证后才应用到生产环境
3. 使用模板化和模块化来消除常见可观测性模式的重复——单个Terraform模块可以从变量映射为每个微服务生成标准的延迟/错误/饱和度仪表盘
4. 将可观测性配置集成到服务脚手架中，使新服务无需平台团队手动配置即可自动获得基线仪表盘、告警规则和日志查询
5. 应用环境晋级：可观测性配置与服务部署同步从开发→预发布→生产逐级推进，防止仪表盘与其监控的服务脱节

</details>

## Do

- Do store observability configs in the same repository as the service they monitor so that dashboard changes are reviewed alongside application code changes in the same pull request
- Do use modules and templates aggressively to ensure all services get the same baseline dashboards and reduce the cost of maintaining hundreds of individual dashboard files
- Do validate observability configs in CI — run terraform plan or equivalent before merging to catch syntax errors and unintended resource deletions before they reach production
- Do treat alert rule changes with the same rigor as production code changes, requiring at least one reviewer who understands the alert's purpose and threshold rationale

## Don't

- Don't allow engineers to create dashboards or alerts directly in the observability UI without committing them to code — UI-only configs are invisible to code review and will be lost in a disaster recovery scenario
- Don't create a single monolithic dashboard file per service — break observability code into focused, reusable modules (latency module, error module, saturation module) that can be combined
- Don't hardcode environment-specific values (thresholds, URLs, team names) in templates — parameterize them so the same module works across dev, staging, and production
- Don't skip testing alert rules — write unit tests for threshold logic and integration tests that fire synthetic metrics to verify alerts trigger correctly before deploying to production

## Case Study

**Monzo**: Monzo, the UK challenger bank, manages over 1,500 microservices and codified their entire Grafana dashboard estate using Jsonnet templates stored in a central observability repository. Every service registers its metadata (name, team, SLOs) in a service catalog, and a CI pipeline automatically generates and deploys standard RED-method dashboards for each service. When Monzo's SRE team wants to add a new panel to all service dashboards, they make a single template change that propagates to all 1,500+ dashboards in one deployment. This approach eliminated 'ghost dashboards' (UI-only configs that existed nowhere in code), reduced dashboard creation time from hours to under 5 minutes per service, and gave every on-call engineer confidence that the dashboards they see in production are current and authoritative.

## Related Frameworks

- opentelemetry (complement)
- sli-slo-sla (complement)
- four-golden-signals (related)
- infrastructure-as-code (related)
- gitops (related)

## Source

https://sdframe.caldis.me/frameworks/observability-as-code
