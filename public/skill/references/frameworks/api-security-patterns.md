# API Security Patterns / API 安全模式

- **Category**: api
- **Complexity**: advanced
- **Quality**: security, reliability, observability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: OWASP Foundation, 2007
- **Adopters**: Cloudflare, Okta, Auth0, Google, Microsoft

OAuth2 scopes, API keys, JWT validation, and CORS hardening to protect API surfaces from unauthorized access

_通过 OAuth2 范围、API 密钥、JWT 验证和 CORS 强化保护 API 表面免受未授权访问_

## When to Use

Apply this framework when:
- When designing any API that exposes sensitive data, financial operations, or user-delegated actions to external consumers
- When a security audit or penetration test has identified authentication weaknesses (missing authorization checks, overly permissive CORS, weak token validation)
- When integrating with third-party systems that require standardized token-based authentication (OAuth2/OIDC)
- When compliance frameworks (PCI-DSS, HIPAA, SOC 2) mandate documented API authentication and authorization controls

## When NOT to Use

Stop and reconsider if:
- Fully internal APIs within a trusted service mesh that already enforces mTLS at the infrastructure level — adding application-layer OAuth2 on top adds overhead without security benefit
- Development and testing environments where the overhead of full OAuth2 flows slows iteration — use simplified API key auth with environment-specific secrets instead
- Static public data APIs (public transit schedules, weather data) with no personalization or sensitive data where authentication adds friction without protecting anything
- APIs in air-gapped or highly controlled internal networks where network-level controls already provide the required isolation

## Core Concepts

- OAuth2 Scopes and Least Privilege: Defining permission scopes at the resource-action level (e.g., accounts:read) and issuing tokens with only the scopes needed for the specific client integration, minimizing blast radius if a token is compromised
- JWT Validation Chain: The full validation sequence — signature verification, claim checks (exp, iss, aud), algorithm restriction — must all pass before a request is authorized; skipping any step creates exploitable vulnerabilities
- BOLA (Broken Object Level Authorization): The most prevalent API vulnerability, where an API returns data for any ID in the URL without checking that the authenticated user owns or has permission to access that object
- CORS Policy Hardening: Cross-Origin Resource Sharing misconfiguration (wildcard origins with credentials, overly permissive methods) allows malicious web pages to make authenticated API calls on behalf of browser users
- mTLS for Service-to-Service: Mutual TLS authentication, where both client and server present certificates, provides cryptographic proof of identity for high-security internal API communication in zero-trust environments

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying API Security Patterns to?
- What constraints or existing architecture do you need to work within?
- Has your team used API Security Patterns before? (This is an advanced framework)

## Implementation Steps

1. Classify all API endpoints by sensitivity and select the appropriate authentication mechanism: API keys for server-to-server integrations, OAuth2 client credentials for machine-to-machine flows, OAuth2 authorization code + PKCE for user-delegated access, and mTLS for high-security service mesh communication
2. Implement fine-grained OAuth2 scopes that follow the principle of least privilege: define scopes at the resource and action level (e.g., orders:read, orders:write, payments:create) and enforce scope checks in every protected handler
3. **Validate JWTs rigorously**: verify the signature with the issuer's public key, check the exp, nbf, iss, and aud claims, reject tokens with algorithm: none, and implement token revocation via a fast-lookup denylist or short expiry windows
4. **Harden CORS configuration**: explicitly whitelist allowed origins (avoid wildcard * for credentialed requests), restrict allowed methods and headers, and set the Access-Control-Max-Age header to reduce preflight request frequency
5. Apply OWASP API Security Top 10 mitigations: enforce object-level authorization on every resource (BOLA), implement rate limiting and quota enforcement, validate all input payloads with strict schemas, and log all authentication events for audit and anomaly detection

<details><summary>中文步骤</summary>

1. 按敏感程度对所有 API 端点分类，选择合适的认证机制：API 密钥用于服务间集成，OAuth2 客户端凭证用于机器对机器流程，OAuth2 授权码 + PKCE 用于用户授权访问，mTLS 用于高安全性服务网格通信
2. 实施细粒度的 OAuth2 范围遵循最小权限原则：在资源和操作级别定义范围（如 orders:read、orders:write、payments:create），并在每个受保护的处理程序中执行范围检查
3. 严格验证 JWT：使用颁发者的公钥验证签名，检查 exp、nbf、iss 和 aud 声明，拒绝 algorithm: none 的令牌，并通过快速查找黑名单或短过期窗口实现令牌吊销
4. 强化 CORS 配置：明确白名单允许的来源（避免对凭证请求使用通配符 *），限制允许的方法和头部，设置 Access-Control-Max-Age 头部以减少预检请求频率
5. 应用 OWASP API 安全 Top 10 缓解措施：对每个资源执行对象级授权（BOLA）、实施速率限制和配额执行、用严格模式验证所有输入载荷，以及记录所有认证事件用于审计和异常检测

</details>

## Do

- Do validate the full JWT claim set — signature, expiry, issuer, and audience — on every request, using a well-maintained library rather than writing custom JWT validation code
- Do implement object-level authorization checks in every API handler that returns or modifies a specific resource, not just at the route/controller level
- Do rotate API keys and client secrets periodically and provide a self-service key rotation mechanism so clients can rotate without downtime
- Do log every authentication failure, token validation error, and authorization rejection with structured fields (client_id, endpoint, error_code) for security monitoring and incident response

## Don't

- Don't use HTTP Basic Auth or API keys in query parameters for anything beyond low-sensitivity internal tooling — both are easily leaked in logs, browser history, and referrer headers
- Don't trust client-supplied claims (user_id, role, is_admin) in JWT payloads without verifying them against your authorization database — JWT payload data is readable by anyone with the token
- Don't configure CORS with Access-Control-Allow-Origin: * combined with Access-Control-Allow-Credentials: true — browsers block this combination, and if somehow accepted it would allow any site to make credentialed requests
- Don't skip rate limiting on authentication endpoints (login, token exchange) — credential stuffing and brute-force attacks specifically target unthrottled auth endpoints

## Case Study

**Cloudflare**: Cloudflare's API security implementation serves as a reference for the industry. The Cloudflare API uses OAuth2 with fine-grained permission tokens that scope access to specific zones, account resources, and action types. In 2022, Cloudflare publicly documented their migration from coarse-grained API keys to token-based authentication with 180+ distinct permission scopes. After the migration, Cloudflare reported a significant reduction in over-privileged token usage and eliminated a class of account takeover incidents where a single leaked API key had provided complete account access.

## Related Frameworks

- api-gateway-pattern (complement)
- zero-trust-architecture (extends)

## Source

https://sdframe.caldis.me/frameworks/api-security-patterns
