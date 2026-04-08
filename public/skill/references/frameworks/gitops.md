# GitOps / GitOps

- **Category**: deployment
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Weaveworks / Alexis Richardson, 2017
- **Adopters**: Intuit, Tesla, Alibaba, Red Hat, Palo Alto Networks

Use Git as the single source of truth for infra state

_以Git作为基础设施状态的唯一可信来源_

## When to Use

Apply this framework when:
- Kubernetes-native environments where declarative configuration aligns naturally with the reconciliation model
- Teams that want complete audit trails of every infrastructure change through Git history
- Multi-cluster or multi-environment deployments that need consistent, reproducible configuration
- Organizations requiring compliance and change control via pull request approval workflows

## When NOT to Use

Stop and reconsider if:
- Non-Kubernetes environments where declarative reconciliation operators are unavailable or immature
- Teams with very infrequent infrastructure changes where GitOps tooling overhead is not justified
- Imperative or procedural infrastructure changes (one-time database migrations) that do not fit the declarative model
- Environments with strict air-gap requirements where the operator cannot reach a Git repository

## Core Concepts

- Declarative Desired State: All system configuration is described declaratively in Git, defining what the system should look like rather than how to get there
- Continuous Reconciliation: A GitOps operator continuously compares the desired state in Git with the actual state in the cluster and corrects any drift automatically
- Pull-Based Deployment: Instead of CI pushing changes to the cluster, the cluster-side operator pulls desired state from Git, improving security by not exposing cluster credentials
- Immutable Audit Trail: Every change to infrastructure is captured as a Git commit with author, reviewer, timestamp, and diff, providing complete traceability

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying GitOps to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Store all infrastructure and application configuration declaratively in a Git repository
2. Enforce code review and branch protection so all changes go through pull requests
3. Set up a GitOps operator (Argo CD, Flux) to watch the repo for changes
4. Operator detects drift between desired state in Git and actual cluster state
5. Operator automatically reconciles the cluster to match the Git-declared desired state

<details><summary>中文步骤</summary>

1. 以声明式方式将所有基础设施和应用配置存储在Git仓库中
2. 强制代码审查与分支保护，确保所有变更经过Pull Request流程
3. 配置GitOps控制器（Argo CD、Flux）监听仓库变化
4. 控制器检测Git期望状态与集群实际状态之间的偏差
5. 控制器自动将集群协调至Git声明的期望状态

</details>

## Do

- Do separate application config repositories from application source code repositories, because coupling them creates circular deployment triggers
- Do implement drift detection alerts so the team knows when manual cluster changes bypass the GitOps workflow
- Do use sealed secrets or external secret managers (Vault, AWS Secrets Manager) to avoid storing plaintext secrets in Git
- Do structure repositories with clear environment promotion paths (dev -> staging -> production) using branches or directories

## Don't

- Don't make manual kubectl changes to the cluster and expect them to persist, because the GitOps operator will revert them to match Git state
- Don't store secrets in plaintext in Git repositories, because Git history is permanent and secret rotation becomes impossible
- Don't use push-based CI/CD pipelines that bypass the GitOps operator, because this defeats the single-source-of-truth guarantee
- Don't create monolithic config repositories for dozens of services, because merge conflicts and slow reconciliation loops will bottleneck teams

## Case Study

**Intuit**: Intuit adopted Argo CD as their GitOps platform to manage over 2,500 microservices across multiple Kubernetes clusters serving products like TurboTax and QuickBooks. By requiring all changes to flow through Git pull requests, they achieved full audit compliance for SOX regulations while enabling developers to self-service deployments. Their GitOps adoption reduced deployment lead time by 60% and configuration-related incidents by 40%.

## Related Frameworks

- infrastructure-as-code (complement)
- three-ways-devops (complement)
- dora-metrics (complement)

## Source

https://sdframe.caldis.me/frameworks/gitops
