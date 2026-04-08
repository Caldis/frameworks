# Secrets Management / 密钥管理

- **Category**: security
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Abstraction**: component
- **Maturity**: established
- **Author**: HashiCorp (Mitchell Hashimoto), 2015
- **Adopters**: GitHub, Cloudflare, Shopify, Twilio, HashiCorp (self)

Centralized vault-based secrets lifecycle (HashiCorp Vault, 2015)

_基于集中化保险库的密钥生命周期管理（HashiCorp Vault，2015）_

## When to Use

Apply this framework when:
- When secrets in source code repositories, CI/CD logs, or configuration files have been discovered or are at risk of exposure
- When microservices architecture requires each service to authenticate to databases, message brokers, and APIs with unique credentials that can be individually rotated
- When compliance frameworks (SOC 2, PCI-DSS, ISO 27001) require evidence of secret rotation, access logging, and least-privilege credential management
- When cloud-native deployments need to manage secrets across multiple cloud accounts, Kubernetes namespaces, and deployment environments without credential sprawl

## When NOT to Use

Stop and reconsider if:
- Simple single-developer projects where secrets are managed through personal password managers and the overhead of Vault is disproportionate to the risk
- When the entire application runs within a single cloud provider and that provider's native secrets service (AWS Secrets Manager, GCP Secret Manager) fully meets the requirements
- Short-lived hackathon or prototype projects where the setup cost of a secrets manager exceeds the project lifetime
- When the team lacks the operational expertise to run a highly available Vault cluster — a misconfigured Vault is worse than no Vault

## Core Concepts

- Dynamic secrets: credentials generated on demand with a short TTL, automatically invalidated after expiry; eliminates the long-lived static credential risk entirely
- Vault transit engine: encryption as a service that allows applications to encrypt/decrypt data without ever seeing the encryption key, keeping key material inside the vault
- AppRole / Kubernetes auth: machine identity authentication mechanisms that allow services to authenticate to Vault without a pre-shared secret, bootstrapping the zero-secret problem
- Secret zero problem: the bootstrap challenge of how the first credential used to access the secrets manager is itself managed securely — solved by cloud IAM roles or hardware TPM attestation

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Secrets Management to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Centralize all secrets (API keys, database passwords, TLS certificates, service account credentials) into a dedicated secrets management system (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault) and remove them from source code, configuration files, and CI/CD environment variables
2. Implement dynamic secrets where possible: configure Vault or equivalent to generate short-lived, ephemeral credentials for databases and cloud services on demand, so no long-lived static credentials exist
3. Enforce least-privilege access policies that grant each service and human identity access only to the specific secrets they need, with audit logging of every secret read, write, and rotation event
4. Implement automated secret rotation for static credentials that cannot be replaced with dynamic secrets, with rotation periods aligned to risk level and compliance requirements
5. Integrate secrets injection into the deployment pipeline using environment-specific policies: applications retrieve secrets at startup via the secrets manager API or sidecar agent, never via baked-in config files

<details><summary>中文步骤</summary>

1. 将所有密钥（API密钥、数据库密码、TLS证书、服务账户凭证）集中到专用密钥管理系统（HashiCorp Vault、AWS Secrets Manager、Azure Key Vault）中，并从源代码、配置文件和CI/CD环境变量中删除它们
2. 尽可能实施动态密钥：配置Vault或同类产品按需为数据库和云服务生成短期临时凭证，使长期静态凭证不存在
3. 执行最小权限访问策略，仅授予每个服务和人员身份访问其所需特定密钥的权限，并对每次密钥读取、写入和轮换事件进行审计记录
4. 为无法替换为动态密钥的静态凭证实施自动化密钥轮换，轮换周期与风险级别和合规要求对齐
5. 使用环境特定策略将密钥注入集成到部署管道中：应用程序在启动时通过密钥管理器API或Sidecar代理检索密钥，而非通过内置配置文件

</details>

## Do

- Do enforce secrets-in-code detection in CI/CD using tools like git-secrets, truffleHog, or GitHub secret scanning because secrets committed to repositories are exposed to anyone with repo access
- Do prefer dynamic secrets over static credentials wherever the target system supports them because a credential with a 15-minute TTL cannot be abused even if intercepted
- Do namespace secrets by environment and service in the vault so that a compromised application token cannot read another service's secrets or production secrets from a development context
- Do test secret rotation procedures regularly because untested rotation breaks production when it is triggered under incident pressure

## Don't

- Don't store secrets in environment variables baked into container images because image layers are easily extracted and environment variables are often logged
- Don't use the same Vault token across multiple services because token compromise then affects all services sharing that token
- Don't skip secret rotation because 'it's been working fine' — unrotated credentials are the attack surface for credential stuffing and insider threat scenarios
- Don't make the secrets manager a single point of failure without high-availability configuration because if Vault goes down and applications cannot retrieve secrets they will fail to restart after a crash

## Case Study

**GitHub**: GitHub migrated its internal secrets management to HashiCorp Vault after a 2012 incident where a developer accidentally exposed an AWS access key in a public repository. Vault's AppRole authentication was used to give each GitHub service a unique identity, with dynamic AWS credentials generated per-request with a 15-minute TTL for deployment pipelines. GitHub also integrated Vault with their CI/CD system so that build jobs inject secrets at runtime rather than storing them as build environment variables. After the migration, GitHub reported zero secrets-related production security incidents over a 3-year period.

## Related Frameworks

- zero-trust-architecture (complement)
- security-by-design (complement)
- identity-federation (complement)

## Source

https://sdframe.caldis.me/frameworks/secrets-management
