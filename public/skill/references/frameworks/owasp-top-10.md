# OWASP Top 10 / OWASP 十大 Web 应用安全风险

- **Category**: security
- **Complexity**: beginner
- **Quality**: security
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: OWASP Foundation (community-driven, led by Andrew van der Stock et al.), 2003
- **Adopters**: PCI Security Standards Council (references OWASP in PCI-DSS), NIST, US DoD, GitHub (CodeQL rules mapped to OWASP), Snyk

A prioritized framework of the most critical web application security risks with proven mitigation strategies

_最关键 Web 应用安全风险的优先级框架及经过验证的缓解策略_

## When to Use

Apply this framework when:
- As a baseline security checklist for any web application or API project
- When training developers on application security fundamentals
- During security audits and penetration test scoping to ensure coverage of the most common risks
- As a vendor assessment criterion to verify third-party application security posture

## When NOT to Use

Stop and reconsider if:
- Non-web systems (embedded firmware, desktop-only applications) where web-specific risks don't apply
- As the sole security standard — the Top 10 is a starting point, not a comprehensive security program
- When the application has no external attack surface (air-gapped, no user input)
- For compliance certification — use OWASP ASVS or ISO 27001 instead; the Top 10 is an awareness document

## Core Concepts

- Broken Access Control: Failures that allow users to act outside their intended permissions — the #1 risk in the 2021 edition
- Injection: Untrusted data sent to an interpreter as part of a command or query, including SQL, NoSQL, OS, and LDAP injection
- Cryptographic Failures: Weaknesses in encryption, hashing, or key management that expose sensitive data
- Security Misconfiguration: Insecure default settings, open cloud storage, missing security headers, or verbose error messages
- Software and Data Integrity Failures: Code and infrastructure that don't verify integrity — including insecure CI/CD pipelines and unsigned updates

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying OWASP Top 10 to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Familiarize the team with the current OWASP Top 10 categories (Broken Access Control, Cryptographic Failures, Injection, etc.)
2. Integrate OWASP checks into the secure SDLC: code reviews, SAST, DAST, and dependency scanning against each category
3. **Implement category-specific mitigations**: parameterized queries for injection, strong access control for authorization, proper TLS configuration for cryptographic failures
4. Add OWASP-aligned test cases to the CI/CD pipeline to catch regressions automatically
5. Review and update alignment annually as the OWASP Top 10 evolves with new data from the community

<details><summary>中文步骤</summary>

1. 让团队熟悉当前 OWASP Top 10 各类别（访问控制失效、加密故障、注入等）
2. 将 OWASP 检查集成到安全 SDLC 中：代码审查、SAST、DAST 和依赖扫描逐一对照各类别
3. 实施针对各类别的缓解措施：参数化查询防注入、强访问控制防授权问题、正确 TLS 配置防加密故障
4. 在 CI/CD 管道中添加 OWASP 对齐的测试用例以自动捕获回归
5. 随 OWASP Top 10 根据社区新数据演进，每年审查并更新对齐情况

</details>

## Do

- Automate OWASP Top 10 checks with SAST/DAST tools integrated into CI/CD pipelines
- Use the OWASP Application Security Verification Standard (ASVS) as the detailed testing counterpart to the Top 10
- Train every developer on at least the Top 10 categories — security is a whole-team responsibility
- Map each Top 10 category to specific coding standards and pull-request review checklists

## Don't

- Don't treat the OWASP Top 10 as an exhaustive security program — it covers only the most common risks, not all risks
- Don't rely solely on automated scanners — many OWASP categories (broken access control, business logic flaws) require manual review
- Don't ignore the 'moved off the list' categories — removal from the Top 10 doesn't mean the vulnerability no longer exists
- Don't use the Top 10 as a penetration test methodology — it's a risk awareness framework, not a testing guide

## Case Study

**Equifax**: The 2017 Equifax breach, which exposed 147 million records, was caused by an unpatched Apache Struts vulnerability (CVE-2017-5638) — a classic OWASP Top 10 injection flaw (A03:2021). The vulnerability had a known patch available for two months before exploitation. This incident became the canonical example of why organizations must systematically address OWASP Top 10 risks, leading to $700 million in settlements and sweeping changes to vulnerability management practices industry-wide.

## Related Frameworks

- threat-modeling-stride (complement)
- security-by-design (complement)
- defense-in-depth (complement)

## Source

https://sdframe.caldis.me/frameworks/owasp-top-10
