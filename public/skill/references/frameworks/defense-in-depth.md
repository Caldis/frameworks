# Defense in Depth / 纵深防御

- **Category**: security
- **Complexity**: beginner
- **Quality**: security, reliability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Military strategy concept; adapted to information security by NSA and NIST, 1990s
- **Adopters**: US Department of Defense, NIST, AWS (shared responsibility model), JPMorgan Chase, Cloudflare

Layer multiple independent security controls so that no single point of failure compromises the system

_分层部署多个独立安全控制，确保任何单点故障不会导致整个系统沦陷_

## When to Use

Apply this framework when:
- Designing the overall security posture for any non-trivial production system
- When compliance frameworks (SOC 2, ISO 27001, PCI-DSS) require demonstrable layered controls
- After a security incident reveals that a single control was the sole line of defense
- Cloud migration projects where the shared responsibility model demands explicit controls at each layer

## When NOT to Use

Stop and reconsider if:
- Minimal-risk hobby projects where any security control is optional
- When resource constraints force a choice between one strong control or many weak controls — choose one strong control
- Extremely simple systems (static pages, read-only public data) where a single layer of access control suffices
- When adding layers introduces latency or complexity that exceeds the risk being mitigated

## Core Concepts

- Layered Controls: Independent security mechanisms applied at physical, network, host, application, and data layers
- Compensating Controls: Backup security measures that activate when a primary control fails or is bypassed
- Fail-Secure: Designing systems to deny access by default when a security control encounters an error
- Diversity of Defense: Using different technologies and vendors at each layer to prevent a single vulnerability from cascading
- Security Monitoring: Continuous observation at every layer to detect anomalies and trigger incident response

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Defense in Depth to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify all system layers**: physical, network, host, application, data, and human
2. For each layer, define independent security controls (firewalls, WAFs, encryption, access controls, training)
3. Ensure controls at adjacent layers compensate for each other's weaknesses — no two layers rely on the same mechanism
4. Implement monitoring and alerting at each layer to detect failures or bypasses in real time
5. Regularly test the layered defenses via red-team exercises and verify that breaching one layer triggers compensating controls

<details><summary>中文步骤</summary>

1. 识别所有系统层：物理层、网络层、主机层、应用层、数据层和人员层
2. 为每一层定义独立的安全控制（防火墙、WAF、加密、访问控制、培训）
3. 确保相邻层的控制措施互相补偿对方的弱点——任意两层不依赖同一机制
4. 在每一层实施监控和告警，实时检测故障或绕过
5. 通过红队演练定期测试分层防御，验证突破一层后是否触发补偿控制

</details>

## Do

- Ensure each layer provides independent value — if removing one layer doesn't change your risk posture, it's redundant not defense in depth
- Document the purpose and coverage of each control layer for incident responders and auditors
- Include human-layer defenses (security awareness training, phishing simulations) alongside technical controls
- Test layers in isolation and in combination to validate that failures cascade into detection, not into compromise

## Don't

- Don't equate more layers with better security — poorly configured layers create complexity without protection
- Don't rely on a single vendor for all layers — a vulnerability in their stack compromises every layer simultaneously
- Don't neglect the data layer — encryption at rest and in transit is often the last line of defense after all other controls fail
- Don't assume network controls alone constitute defense in depth — application-layer and identity controls are equally critical

## Case Study

**Target**: The 2013 Target data breach exposed 40 million credit card records when attackers compromised an HVAC vendor's credentials and moved laterally to the point-of-sale network. The breach demonstrated catastrophic failure of defense in depth: flat network segmentation, insufficient monitoring between zones, and no data-layer encryption on cardholder data. Post-breach, Target invested over $200 million in layered security controls including network segmentation, endpoint detection, and tokenization.

## Related Frameworks

- threat-modeling-stride (complement)
- zero-trust-architecture (complement)
- security-by-design (complement)

## Source

https://sdframe.caldis.me/frameworks/defense-in-depth
