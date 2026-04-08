# OAuth 2.0 / OpenID Connect / OAuth 2.0 / OpenID Connect 授权与身份框架

- **Category**: security
- **Complexity**: intermediate
- **Quality**: security, usability
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Eran Hammer, Dick Hardt et al. (IETF); OpenID Foundation, 2007
- **Adopters**: Google, Microsoft (Azure AD / Entra ID), Okta / Auth0, GitHub, Salesforce

Delegated authorization and federated identity for secure API and application access

_用于安全 API 和应用访问的委托授权与联合身份框架_

## When to Use

Apply this framework when:
- Building APIs that need delegated third-party access without sharing user credentials
- Implementing single sign-on (SSO) across multiple applications or microservices
- Mobile and SPA applications that require secure token-based authentication
- Integrating with external identity providers (Google, Microsoft, Apple) for federated login

## When NOT to Use

Stop and reconsider if:
- Internal machine-to-machine communication where mutual TLS (mTLS) is simpler and more appropriate
- Simple single-application systems with no third-party integrations where session-based auth suffices
- Extremely constrained IoT devices that cannot perform HTTP redirects or handle token management
- When you need transaction-level authorization — OAuth scopes are coarse; consider UMA or RAR for fine-grained control

## Core Concepts

- Authorization Grant: A credential representing the resource owner's consent, exchanged for an access token (e.g., authorization code, client credentials)
- Access Token: A short-lived credential that the client presents to access protected resources on behalf of the user
- Refresh Token: A long-lived credential used to obtain new access tokens without requiring the user to re-authenticate
- ID Token (OIDC): A JWT containing identity claims about the authenticated user, issued alongside the access token in OpenID Connect flows
- Scopes: Named permissions that limit what an access token can do, enabling the principle of least privilege at the API level

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying OAuth 2.0 / OpenID Connect to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Register the client application with the authorization server and obtain client credentials
2. Redirect the resource owner to the authorization endpoint with the appropriate grant type and scopes
3. The authorization server authenticates the user and issues an authorization code (or token directly for implicit flows)
4. The client exchanges the authorization code for an access token (and optionally a refresh token and ID token via OpenID Connect)
5. The client presents the access token to the resource server; the server validates the token and enforces scope-based access control

<details><summary>中文步骤</summary>

1. 在授权服务器注册客户端应用并获取客户端凭据
2. 使用适当的授权类型和作用域将资源所有者重定向到授权端点
3. 授权服务器认证用户并颁发授权码（隐式流直接颁发令牌）
4. 客户端用授权码换取访问令牌（可选地通过 OpenID Connect 获取刷新令牌和 ID 令牌）
5. 客户端向资源服务器出示访问令牌；服务器验证令牌并执行基于作用域的访问控制

</details>

## Do

- Always use PKCE (Proof Key for Code Exchange) for public clients — it prevents authorization code interception attacks
- Validate tokens server-side using the authorization server's JWKS endpoint or introspection endpoint
- Keep access token lifetimes short (minutes) and use refresh tokens for long-lived sessions
- Restrict scopes to the minimum required — over-scoped tokens magnify the blast radius of a token leak

## Don't

- Don't use the implicit grant flow — it exposes tokens in the URL fragment and is deprecated in OAuth 2.1
- Don't store tokens in localStorage — use httpOnly secure cookies or in-memory storage to limit XSS exposure
- Don't treat the access token as proof of identity — use the ID token from OpenID Connect for authentication
- Don't skip the state parameter — without it the flow is vulnerable to CSRF attacks

## Case Study

**Okta**: Okta built its entire identity platform on OAuth 2.0 and OpenID Connect, serving over 18,000 enterprise customers by 2023. By providing a standards-based authorization server with pre-built integrations for thousands of applications, Okta reduced enterprise SSO deployment time from months to days. Their acquisition of Auth0 in 2021 further cemented OAuth/OIDC as the universal developer-facing identity protocol.

## Related Frameworks

- zero-trust-architecture (complement)
- principle-of-least-privilege (prerequisite)
- security-by-design (complement)

## Source

https://sdframe.caldis.me/frameworks/oauth2-openid-connect
