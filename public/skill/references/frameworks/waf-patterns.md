# Web Application Firewall (WAF) Patterns / Web应用防火墙模式

- **Category**: security
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Perfecto Technologies (first commercial WAF, 1999); OWASP ModSecurity Core Rule Set
- **Adopters**: Cloudflare, AWS (AWS WAF), Akamai, Fastly, Imperva

Application-layer traffic filtering strategies that inspect, filter, and block malicious HTTP/S requests before they reach web applications

_在应用层检查、过滤和拦截恶意HTTP/S请求的流量防护策略，保护Web应用免受注入、跨站脚本等攻击_

## When to Use

Apply this framework when:
- When a web application must be protected against OWASP Top 10 vulnerabilities (SQLi, XSS, SSRF) as a defense-in-depth layer even if the application itself has been hardened
- When a third-party or legacy application cannot be patched quickly and a virtual patch via WAF rule is needed to mitigate a known vulnerability in production
- When compliance frameworks (PCI-DSS Requirement 6.6) mandate a WAF for cardholder data environment web applications
- When bot traffic, credential stuffing, or scraping attacks are causing measurable business impact and application-level rate limiting is insufficient

## When NOT to Use

Stop and reconsider if:
- Internal APIs accessible only from within a private network where the threat model does not include external internet attackers
- When the application does not process untrusted user input and has no web-facing exposure that would benefit from application-layer filtering
- As a replacement for a secure software development lifecycle — WAFs address symptoms of insecure code, not the root cause
- When WAF latency overhead (typically 1-5ms) violates stringent real-time SLAs for latency-sensitive financial or gaming applications

## Core Concepts

- Positive security model: explicitly defining what is allowed (valid request shapes, parameter lengths, character sets) and blocking everything else; precise but high maintenance
- Negative security model: defining patterns of known-bad traffic (SQL injection signatures, XSS payloads) and blocking matches; lower maintenance but blind to zero-days
- Virtual patching: using WAF rules to block exploitation of a known vulnerability in the application layer without modifying the application code, buying time for proper remediation
- Bot management: distinguishing between legitimate bots (search engines, monitoring), malicious bots (credential stuffers, scrapers), and human traffic using behavioral analysis and challenge mechanisms

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Web Application Firewall (WAF) Patterns to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Deploy a WAF in front of web-facing applications by placing it between the internet edge (CDN or load balancer) and the application origin, ensuring all HTTP/HTTPS traffic passes through inspection
2. Configure rule sets starting with managed rule groups (OWASP Core Rule Set, AWS Managed Rules, Cloudflare OWASP) in detection-only mode to observe false positives before enabling blocking mode
3. Tune rules for application-specific traffic patterns: create allow-list rules for known-good paths and parameters, suppress rules that generate high false-positive rates for legitimate traffic, and add custom rules for business logic
4. Implement rate limiting and bot management rules to block credential stuffing, scraping, and DDoS amplification patterns based on IP reputation, request velocity, and behavioral fingerprinting
5. Establish WAF monitoring and alerting pipelines that feed block/allow decisions into a SIEM for correlation with application logs to detect evasion attempts and validate that the WAF is not blocking legitimate users

<details><summary>中文步骤</summary>

1. 通过将WAF放置在互联网边缘（CDN或负载均衡器）和应用源站之间，在面向互联网的应用程序前部署WAF，确保所有HTTP/HTTPS流量通过检查
2. 从在仅检测模式下使用托管规则组（OWASP核心规则集、AWS托管规则、Cloudflare OWASP）开始配置规则集，在启用阻止模式前观察误报
3. 针对应用程序特定流量模式调整规则：为已知良好的路径和参数创建允许列表规则，抑制对合法流量产生高误报率的规则，并为业务逻辑添加自定义规则
4. 实施速率限制和机器人管理规则，根据IP信誉、请求速度和行为指纹阻止凭证填充、爬取和DDoS放大模式
5. 建立WAF监控和告警管道，将阻止/允许决策输入SIEM与应用程序日志关联，以检测规避尝试并验证WAF没有阻止合法用户

</details>

## Do

- Do run in detection-only mode for at least two weeks before switching to blocking mode because poorly tuned WAFs block legitimate users at a rate that can exceed the security benefit
- Do establish a false-positive reporting workflow for application teams so that legitimate traffic blocked by the WAF is quickly triaged and ruled whitelisted
- Do treat WAF as a defense-in-depth layer, not a substitute for secure coding because WAFs cannot protect against business logic flaws, authentication weaknesses, or vulnerabilities introduced by the application's own APIs
- Do keep WAF rule sets updated because new attack techniques emerge continuously and stale rule sets miss recent vulnerability patterns

## Don't

- Don't rely on a WAF as your only security control for web applications because sophisticated attackers study WAF rule patterns and craft payloads that evade signatures
- Don't skip application-layer security testing after deploying a WAF because the WAF creates a false sense of security that defers essential secure code review and penetration testing
- Don't block traffic based on geographic IP restrictions without careful analysis because VPN usage and shared IP ranges cause significant false positives
- Don't set WAF rules to permissive mode in production permanently because permissive mode is a temporary diagnostic state, not a valid long-term configuration

## Case Study

**Cloudflare**: When the Log4Shell vulnerability (CVE-2021-44228) was disclosed in December 2021, Cloudflare deployed a WAF virtual patch rule within 4 hours of the CVE publication, before most organizations had even assessed their exposure. The rule blocked JNDI lookup strings in all HTTP headers and request bodies for all Cloudflare WAF customers. Within 72 hours of deployment, Cloudflare's WAF had blocked over 1 million exploitation attempts against their customers' applications, demonstrating how cloud WAF virtual patching can provide immediate protection for the long tail of organizations unable to patch Java applications quickly.

## Related Frameworks

- defense-in-depth (extends)
- zero-trust-architecture (complement)
- owasp-top-10 (complement)
- penetration-testing-framework (complement)

## Source

https://sdframe.caldis.me/frameworks/waf-patterns
