# Identity Federation / 身份联合

- **Category**: security
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: OASIS (SAML 2.0, 2005); OpenID Foundation (OIDC, 2014)
- **Adopters**: Salesforce, Microsoft (Azure AD), Google (Google Workspace), Okta, AWS IAM Identity Center

Cross-domain identity and SSO patterns (SAML, OIDC federation)

_跨域身份和单点登录模式（SAML、OIDC联合）_

## When to Use

Apply this framework when:
- When employees need seamless access to dozens of SaaS applications using their corporate identity without separate passwords for each service
- When B2B integrations require partner organizations to authenticate their users using the partner's own IdP without creating accounts in your system
- When regulatory compliance requires centralized identity governance with unified access logging, provisioning, and deprovisioning across all applications
- When a microservices architecture needs a consistent identity layer so services can verify the identity and claims of callers from any trusted IdP

## When NOT to Use

Stop and reconsider if:
- Consumer-facing applications where social login (Google, Apple, Facebook OAuth) covers the use case and enterprise SAML federation is unnecessary complexity
- Very small organizations with only 2-3 applications where per-application credentials and a password manager are sufficient
- When the integration target only supports proprietary authentication mechanisms that do not implement SAML or OIDC
- Applications with stringent latency requirements where the additional SSO redirect round-trip is unacceptable for the user experience

## Core Concepts

- Identity Provider (IdP): the authoritative system that authenticates users and issues identity assertions (Okta, Azure AD, Google Workspace, Auth0)
- Service Provider (SP): the application that relies on the IdP for authentication and consumes identity assertions to authorize access
- SAML assertion: a signed XML document issued by the IdP containing user identity attributes, authentication method, and validity timestamps
- JWT / ID token: a signed JSON Web Token issued by an OIDC-compatible IdP containing claims about the authenticated user, used by modern applications as the identity assertion

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Identity Federation to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define the trust relationship between Identity Providers (IdP) and Service Providers (SP): the IdP authenticates the user and asserts their identity; the SP trusts the IdP's assertion and grants access based on the claimed attributes
2. Select the federation protocol based on the integration scenario: SAML 2.0 for enterprise SSO with legacy applications, OpenID Connect (OIDC) for modern web and mobile apps, and OAuth 2.0 for delegated API authorization
3. Establish the trust anchor by exchanging metadata: for SAML, exchange XML metadata containing signing certificates and endpoint URLs; for OIDC, register the client application with the IdP and configure the discovery endpoint
4. Map IdP attributes to application roles and permissions: define attribute mappings that translate IdP claims (groups, email, department) to the application's authorization model, applying least-privilege principles
5. Test federation flows end-to-end including SSO initiation, attribute assertion validation, session management, and Single Logout (SLO) to ensure that user sessions are cleanly terminated across all federated services when logging out

<details><summary>中文步骤</summary>

1. 定义身份提供者（IdP）和服务提供者（SP）之间的信任关系：IdP对用户进行身份验证并断言其身份；SP信任IdP的断言并根据声明的属性授予访问权限
2. 根据集成场景选择联合协议：SAML 2.0用于遗留应用程序的企业SSO，OpenID Connect（OIDC）用于现代Web和移动应用程序，OAuth 2.0用于委托API授权
3. 通过交换元数据建立信任锚：对于SAML，交换包含签名证书和端点URL的XML元数据；对于OIDC，向IdP注册客户端应用程序并配置发现端点
4. 将IdP属性映射到应用程序角色和权限：定义将IdP声明（组、电子邮件、部门）转换为应用程序授权模型的属性映射，应用最小权限原则
5. 端到端测试联合流程，包括SSO启动、属性断言验证、会话管理和单点注销（SLO），确保注销时所有联合服务的用户会话被干净终止

</details>

## Do

- Do validate SAML assertion signatures and OIDC token signatures using the IdP's published public keys because unsigned or improperly validated assertions are trivially forgeable
- Do enforce attribute-based access control by mapping IdP group claims to application roles because authentication proves identity, not authorization, and the mapping is the application's responsibility
- Do implement Single Logout (SLO) correctly because failing to propagate logouts means a user's session persists in every federated SP after they log out of the IdP
- Do set short token validity periods and implement token refresh flows because long-lived tokens increase the window of exposure if an ID token is compromised

## Don't

- Don't trust SAML assertions without verifying the InResponseTo field against the AuthnRequest ID because this allows replay attacks that reuse valid assertions from previous sessions
- Don't store IdP session cookies or OIDC tokens in localStorage because they are accessible to JavaScript and vulnerable to XSS-based token theft
- Don't implement custom federation code when production-hardened libraries (passport.js, Spring Security SAML, Keycloak) exist because protocol implementation errors are a common source of identity vulnerabilities
- Don't grant excessive claims in the IdP group-to-role mapping because over-privileged federated identities undermine the least-privilege principle

## Case Study

**Salesforce**: Salesforce deployed SAML 2.0 identity federation across its enterprise SaaS platform in the late 2000s, allowing corporate customers to use their existing Active Directory identities to access Salesforce without creating separate accounts. The integration uses customer-controlled SAML IdPs (Okta, Azure AD, Ping) to authenticate users, with Salesforce acting as the SP and mapping SAML attributes to Salesforce profiles and permission sets. This eliminated over 95% of Salesforce-specific password reset requests at large enterprise customers, while providing centralized audit logs for compliance. The pattern has since been extended to Salesforce's full portfolio including Marketing Cloud, MuleSoft, and Tableau using OIDC.

## Related Frameworks

- zero-trust-architecture (complement)
- secrets-management (complement)

## Source

https://sdframe.caldis.me/frameworks/identity-federation
