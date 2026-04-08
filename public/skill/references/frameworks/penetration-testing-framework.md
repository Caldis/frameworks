# Penetration Testing Framework / 渗透测试框架

- **Category**: security
- **Complexity**: advanced
- **Quality**: security
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: PTES (Penetration Testing Execution Standard), 2009; OWASP Testing Guide v1.0, 2004
- **Adopters**: Dropbox, Microsoft (internal red team), Google (Project Zero), Facebook/Meta (Red Team), US DoD (Hack the Pentagon)

Structured offensive security testing methodology (PTES, OWASP Testing Guide)

_结构化攻击性安全测试方法论（PTES、OWASP测试指南）_

## When to Use

Apply this framework when:
- Before major product launches or after significant architectural changes when threat modeling and code review alone are insufficient to validate security posture
- When compliance frameworks (PCI-DSS, SOC 2 Type II, ISO 27001) require annual or continuous penetration testing as a mandatory control
- After a security incident to verify that the attacker's initial access path has been fully closed and no similar vulnerabilities remain
- When a new high-value attack surface is introduced (new public API, new cloud environment, new authentication system) and an adversarial perspective is needed

## When NOT to Use

Stop and reconsider if:
- As a substitute for secure development practices because discovering vulnerabilities after they are built is far more expensive than preventing them during design
- When the scope and rules of engagement cannot be clearly defined because an undefined scope leads to either incomplete testing or accidental out-of-scope impact
- As the first security activity for a new product — threat modeling and secure code review during development are more cost-effective than post-launch penetration testing
- When the development team has no capacity to remediate findings because unactioned penetration test findings accumulate into security debt without improving security posture

## Core Concepts

- Black-box testing: the tester has no prior knowledge of the target system, simulating an external attacker; provides the most realistic adversarial simulation but is the least efficient use of testing time
- White-box testing: the tester has full access to source code, architecture diagrams, and credentials; maximizes coverage and depth but requires more preparation and does not simulate a realistic attacker perspective
- CVSS scoring: the Common Vulnerability Scoring System provides a standardized 0-10 severity score for each finding based on exploitability, impact, and scope, enabling consistent risk prioritization
- Lateral movement: demonstrating how an initial foothold in one system can be used to pivot to other systems in the environment, revealing the blast radius of a successful initial compromise

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Penetration Testing Framework to?
- What constraints or existing architecture do you need to work within?
- Has your team used Penetration Testing Framework before? (This is an advanced framework)

## Implementation Steps

1. **Define scope and rules of engagement**: document target systems, IP ranges, and application URLs that are in scope; establish testing windows, emergency contact procedures, and explicit out-of-scope boundaries to prevent disruption to production
2. Perform reconnaissance and threat intelligence: gather OSINT (open-source intelligence) about the target — exposed services, DNS records, public code repositories, employee profiles, and known CVEs in used technology versions
3. **Enumerate attack surface**: conduct port scanning, service fingerprinting, web crawling, and API discovery to map all entry points; correlate findings with the OWASP Testing Guide categories relevant to the application type
4. **Exploit vulnerabilities**: attempt to exploit identified weaknesses using controlled techniques (no destructive payloads); document proof-of-concept evidence including screenshots, request/response logs, and impact chains showing how a vulnerability leads to data exposure or privilege escalation
5. **Report and remediate**: produce a finding report with CVSS scores, business impact narratives, reproduction steps, and prioritized remediation recommendations; conduct a retest after fixes are applied to verify remediation was effective

<details><summary>中文步骤</summary>

1. 定义范围和参与规则：记录在范围内的目标系统、IP范围和应用程序URL；建立测试窗口、紧急联系程序和明确的范围外边界以防止对生产的干扰
2. 执行侦察和威胁情报：收集目标的OSINT（开源情报）——暴露的服务、DNS记录、公共代码存储库、员工档案和已使用技术版本中的已知CVE
3. 枚举攻击面：进行端口扫描、服务指纹识别、Web爬取和API发现，以映射所有入口点；将发现与与应用程序类型相关的OWASP测试指南类别关联
4. 利用漏洞：尝试使用受控技术（无破坏性载荷）利用已识别的弱点；记录概念验证证据，包括截图、请求/响应日志和显示漏洞如何导致数据泄露或权限提升的影响链
5. 报告和修复：生成包含CVSS评分、业务影响叙述、复现步骤和优先修复建议的发现报告；在应用修复后进行复测以验证修复是否有效

</details>

## Do

- Do obtain written authorization before testing because unauthorized penetration testing is illegal under the Computer Fraud and Abuse Act and equivalent laws regardless of intent
- Do use a gray-box testing approach where possible because it combines the efficiency of knowing the architecture with the adversarial realism of not having application credentials
- Do document every finding with evidence and a reproduction case because a finding without evidence is a claim, and a finding without reproduction steps cannot be reliably remediated
- Do retest all critical and high findings after remediation because verifying that the fix works is as important as finding the vulnerability in the first place

## Don't

- Don't run penetration tests in production without a change management process because even read-only testing can trigger WAF blocks, alerting fatigue, and accidental denial-of-service conditions
- Don't deliver a list of CVEs without business context because security reports that do not translate technical findings into business risk are ignored by decision makers
- Don't treat a clean penetration test report as proof of security because testers can only validate what they tested within their time box; absence of findings is not absence of vulnerabilities
- Don't use automated scanner output as a substitute for manual penetration testing because scanners miss business logic flaws, chained vulnerabilities, and context-specific attack paths

## Case Study

**Dropbox**: Dropbox runs a continuous penetration testing program combining an internal red team with an external bug bounty program on HackerOne. The internal red team focuses on advanced attack chains (social engineering, supply chain compromise, lateral movement from cloud infrastructure) that require deep context about Dropbox's architecture. The external bug bounty program handles the long tail of web application and API vulnerabilities with 4,000+ registered researchers. In 2022, Dropbox paid over $1M in bug bounties with 70% of critical findings coming from external researchers who identified logic flaws the internal team had missed, validating the complementary value of both approaches.

## Related Frameworks

- threat-modeling-stride (complement)
- owasp-top-10 (complement)
- defense-in-depth (complement)
- waf-patterns (complement)

## Source

https://sdframe.caldis.me/frameworks/penetration-testing-framework
