# Principle of Least Privilege / 最小权限原则

- **Category**: security
- **Complexity**: beginner
- **Quality**: security, reliability
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Jerome Saltzer and Michael Schroeder, 1975
- **Adopters**: AWS (IAM least privilege recommendations), Google Cloud (IAM Recommender), Microsoft (Azure AD PIM), HashiCorp (Vault, Boundary), CyberArk

Grant each subject only the minimum permissions necessary to perform its function, nothing more

_仅授予每个主体执行其功能所需的最小权限，不多不少_

## When to Use

Apply this framework when:
- Designing IAM policies for cloud infrastructure (AWS IAM, Azure RBAC, GCP IAM)
- Configuring service accounts and API keys that access shared resources
- Defining database roles to restrict queries, writes, and schema changes per application tier
- Setting up CI/CD pipeline permissions to limit what build agents can access in production

## When NOT to Use

Stop and reconsider if:
- Personal development environments or sandboxes where broad permissions accelerate experimentation
- Emergency break-glass scenarios where rapid access to all systems is required — but these should be audited and time-limited
- Extremely small projects with a single administrator where role separation is impractical
- When the cost of implementing fine-grained access control exceeds the value of the assets being protected

## Core Concepts

- Need-to-Know: Access to information is restricted to subjects who require it for their current task
- Role-Based Access Control (RBAC): Permissions are assigned to roles, and subjects are assigned to roles, creating an indirection layer
- Just-In-Time (JIT) Access: Elevated privileges are granted temporarily and automatically revoked after a time window
- Privilege Creep: The gradual accumulation of access rights over time as subjects change roles without having old permissions revoked
- Blast Radius: The scope of damage a compromised subject can cause, directly proportional to its granted permissions

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Principle of Least Privilege to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Inventory all subjects (users, services, processes, CI/CD pipelines) and the resources they access
2. Define the minimum permissions each subject needs based on its actual job function or service contract
3. Implement role-based (RBAC) or attribute-based (ABAC) access control and assign the scoped-down roles
4. **Remove standing privileges**: use just-in-time (JIT) access elevation with time-bound approvals for sensitive operations
5. Audit access logs regularly, detect privilege creep, and revoke unused permissions automatically

<details><summary>中文步骤</summary>

1. 盘点所有主体（用户、服务、进程、CI/CD 管道）及其访问的资源
2. 根据实际工作职能或服务契约定义每个主体所需的最小权限
3. 实施基于角色（RBAC）或基于属性（ABAC）的访问控制并分配缩减后的角色
4. 消除常驻权限：对敏感操作使用即时（JIT）访问提升和限时审批
5. 定期审计访问日志，检测权限蠕变，自动撤销未使用的权限

</details>

## Do

- Default to deny-all and explicitly grant only needed permissions — whitelisting over blacklisting
- Use infrastructure-as-code (Terraform, Pulumi) to codify and review IAM policies in pull requests
- Implement automated permission review cycles (quarterly) to catch privilege creep
- Separate duties: ensure no single identity can both deploy code and approve production access

## Don't

- Don't use wildcard permissions (e.g., '*' in AWS IAM) in production — they negate the entire principle
- Don't share service accounts across multiple applications — each service needs its own scoped identity
- Don't grant permanent admin access to developers — use JIT elevation with MFA for administrative tasks
- Don't assume least privilege is a one-time setup — permissions must be continuously reviewed as roles evolve

## Case Study

**Capital One**: The 2019 Capital One breach exposed 106 million customer records because a misconfigured WAF role had excessive IAM permissions, allowing the attacker to access S3 buckets containing sensitive data. The root cause was a violation of least privilege: the WAF's IAM role could list and read arbitrary S3 buckets rather than being scoped to only the resources it needed. Post-breach, Capital One invested heavily in automated IAM policy analysis and JIT access controls.

## Related Frameworks

- zero-trust-architecture (extends)
- oauth2-openid-connect (complement)
- defense-in-depth (complement)

## Source

https://sdframe.caldis.me/frameworks/principle-of-least-privilege
