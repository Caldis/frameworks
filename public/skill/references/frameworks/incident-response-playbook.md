# Incident Response Playbook / 事件响应手册

- **Category**: security
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Abstraction**: organization
- **Maturity**: foundational
- **Author**: SANS Institute, 1991
- **Adopters**: US-CERT, Microsoft DART, CrowdStrike Services, Mandiant, PwC Cybersecurity, Goldman Sachs

SANS Institute's six-step structured process for handling cybersecurity incidents from preparation through post-incident lessons learned

_SANS研究所的六步结构化流程，用于处理从准备到事后经验总结的网络安全事件_

## When to Use

Apply this framework when:
- Before an incident occurs — playbooks must be built and tested in tabletop exercises before they are needed under pressure
- When a security alert is confirmed as a genuine incident requiring coordinated organizational response beyond individual analyst actions
- In regulated environments (finance, healthcare, critical infrastructure) where documented incident handling procedures are required for compliance
- When standing up a new security operations center (SOC) that needs standardized procedures for consistent incident handling across shifts and analysts

## When NOT to Use

Stop and reconsider if:
- A rigid six-step playbook may not fit nation-state APT scenarios where multiple simultaneous intrusion vectors require parallel workstreams rather than sequential phases — use adaptive IR frameworks for advanced threats
- For low-severity events (single user phishing click, no credential compromise) — a lightweight security ticket workflow is more appropriate than full IR activation to avoid alert fatigue
- Without legal counsel involvement in playbook design — incident response decisions (public disclosure, law enforcement notification, ransom consideration) carry significant legal obligations that vary by jurisdiction

## Core Concepts

- Dwell Time: The duration between initial compromise and detection, a critical metric revealing detection capability gaps — the industry average is 21 days, top-tier SOCs achieve under 1 day
- Chain of Custody: The documented, unbroken record of who accessed forensic evidence and when, required for evidence admissibility in legal proceedings
- Indicators of Compromise (IoC): Artifacts of intrusion (IP addresses, file hashes, registry keys, domain names) used to detect and attribute attack activity across the environment
- Tabletop Exercise: A discussion-based simulation where team members walk through an incident scenario to test plan completeness, communication paths, and decision authority without real-world system impact
- RACI Matrix for IR: A responsibility assignment defining who is Responsible, Accountable, Consulted, and Informed for each step of the playbook, preventing coordination failures under pressure

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Incident Response Playbook to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Preparation**: Establish incident response team (IRT) with defined roles, communication trees, and legal/HR contacts; deploy SIEM, EDR, and forensic tooling; run tabletop exercises quarterly to validate playbooks
2. **Identification**: Detect anomalous events through SIEM correlation rules, EDR alerts, threat intelligence feeds, or user reports; triage to confirm the event is a security incident and classify severity (P1-P4)
3. **Containment**: Implement short-term containment (isolate affected systems, revoke compromised credentials) followed by long-term containment (patch, rebuild, segment network) without destroying forensic evidence
4. **Eradication**: Remove the root cause — malware, backdoors, unauthorized accounts, misconfigured services — and validate that all affected systems are clean through forensic verification
5. **Recovery**: Restore services in a controlled sequence, monitor for signs of re-infection, verify business functions, and declare the incident closed only after sustained clean monitoring period

<details><summary>中文步骤</summary>

1. 准备：建立具有明确角色、通信树和法律/HR联系人的事件响应团队（IRT）；部署SIEM、EDR和取证工具；每季度进行桌面演练以验证手册
2. 识别：通过SIEM关联规则、EDR告警、威胁情报源或用户报告检测异常事件；分类确认该事件为安全事件并分类严重程度（P1-P4）
3. 遏制：实施短期遏制（隔离受影响系统、撤销被入侵凭证），然后是长期遏制（修补、重建、网络分段），同时不破坏取证证据
4. 根除：删除根本原因——恶意软件、后门、未授权账户、配置错误的服务——并通过取证验证确认所有受影响系统已清除
5. 恢复：按受控顺序恢复服务，监控再感染迹象，验证业务功能，仅在持续干净的监控期后宣布事件关闭

</details>

## Do

- Conduct tabletop exercises at least quarterly with realistic scenarios (ransomware, insider threat, supply chain compromise) and include legal, PR, and HR in the exercise — incidents are not just technical events
- Pre-authorize containment actions (isolate a server, revoke a service account) to specific roles so responders don't lose hours seeking approval during an active incident
- Preserve forensic evidence before containment where possible — memory dumps, network captures, and log snapshots taken before isolation are often more valuable than post-containment forensics
- Maintain a war room communication channel (Slack #incident-response, Teams bridge) separate from production systems so a compromised environment doesn't impede communication

## Don't

- Don't skip the Preparation phase and try to build the playbook during an active incident because decisions made under pressure without pre-defined procedures are error-prone and legally risky
- Don't communicate breach details over potentially compromised channels (corporate email, Slack) during containment because attackers monitoring those channels gain advance warning of response actions
- Don't eradicate before completing forensic preservation because destroying the attacker's artifacts before imaging affected systems permanently loses evidence needed for root cause analysis and attribution
- Don't declare incidents closed prematurely — many attackers establish persistence mechanisms that survive initial eradication; monitor for at least 30 days post-recovery for sophisticated threats

## Case Study

**Equifax**: The 2017 Equifax breach, which exposed 147 million individuals' data, became the canonical case study for incident response failure. Equifax's IR process failed at multiple phases: a misconfigured security scanner missed the Apache Struts vulnerability for 78 days (Identification failure); once detected, the incident was not escalated to the executive team for six days (Communication failure); and eradication was incomplete, with the attacker maintaining access during initial remediation attempts. The subsequent Congressional investigation found that Equifax lacked a formal, tested incident response playbook. Post-breach, Equifax invested $1.4B in security overhaul including a formal IR program with quarterly tabletop exercises, pre-authorized containment procedures, and an external forensics retainer.

## Related Frameworks

- nist-cybersecurity-framework (complement)
- defense-in-depth (complement)
- threat-modeling-stride (complement)
- data-loss-prevention (related)

## Source

https://sdframe.caldis.me/frameworks/incident-response-playbook
