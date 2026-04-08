# NIST Cybersecurity Framework / NIST网络安全框架

- **Category**: security
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Abstraction**: organization
- **Maturity**: foundational
- **Author**: NIST, 2013
- **Adopters**: JPMorgan Chase, Verizon, Intel, Boeing, US Department of Energy, Anthem

A voluntary risk-based framework organizing cybersecurity activities into five concurrent functions: Identify, Protect, Detect, Respond, Recover

_一个基于风险的自愿性框架，将网络安全活动组织为五个并发功能：识别、保护、检测、响应、恢复_

## When to Use

Apply this framework when:
- When an organization needs a common language and structure to communicate cybersecurity risk to executives, boards, and regulators
- During cybersecurity program maturity assessments to identify gaps between current and target security postures
- In critical infrastructure sectors (energy, finance, healthcare) where the framework was originally designed and has regulatory recognition
- When integrating cybersecurity requirements across a complex supply chain with multiple vendors and partners

## When NOT to Use

Stop and reconsider if:
- As a technical implementation guide — CSF describes what to do, not how; supplement it with NIST SP 800-53 or CIS Controls for prescriptive controls
- For very small organizations (under 50 employees) where the overhead of formal profile creation and tier assessment exceeds their entire security budget
- As a substitute for sector-specific regulations (PCI-DSS, HIPAA) — use CSF as a unifying overlay, not a replacement

## Core Concepts

- Framework Core: Five concurrent and continuous functions (Identify, Protect, Detect, Respond, Recover) each subdivided into Categories and Subcategories with informative references
- Implementation Tiers: Four tiers (Partial, Risk Informed, Repeatable, Adaptive) describing the degree to which cybersecurity risk management practices exhibit key characteristics
- Framework Profile: An organization's unique alignment of requirements, objectives, and resources against the Core, representing current state or desired target state
- Risk-Based Approach: Prioritization of cybersecurity investments based on business impact and likelihood of threats rather than compliance checkboxes
- Informative References: Mappings to existing standards (ISO 27001, COBIT, NIST SP 800-53) enabling organizations to use the CSF as a Rosetta Stone across frameworks

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying NIST Cybersecurity Framework to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify**: Develop organizational understanding of systems, assets, data, and capabilities; conduct risk assessments and establish a governance structure for cybersecurity
2. **Protect**: Implement safeguards for critical services — access control, awareness training, data security, maintenance, and protective technology deployment
3. **Detect**: Define activities to identify cybersecurity events through continuous monitoring, anomaly detection, and security event logging
4. **Respond**: Develop and implement response plans, coordinate communications, perform analysis, execute mitigation activities, and conduct post-incident reviews
5. **Recover**: Identify and prioritize recovery activities, implement improvements based on lessons learned, and coordinate restoration of services and communications

<details><summary>中文步骤</summary>

1. 识别：建立对系统、资产、数据和能力的组织理解；进行风险评估并建立网络安全治理结构
2. 保护：为关键服务实施保护措施——访问控制、意识培训、数据安全、维护和保护技术部署
3. 检测：通过持续监控、异常检测和安全事件日志记录定义识别网络安全事件的活动
4. 响应：制定和实施响应计划，协调沟通，执行分析，实施缓解活动，并进行事后审查
5. 恢复：识别和优先处理恢复活动，基于经验教训实施改进，协调服务和通信的恢复

</details>

## Do

- Use the Framework Profile to create a gap analysis between current and target states, then roadmap investments to close prioritized gaps
- Map your existing controls to CSF subcategories before buying new tools — most mature organizations already cover 60-70% of the framework
- Engage executives with Tier assessments rather than technical subcategory details, as Tiers communicate maturity in business language
- Revisit your Framework Profile annually or after major architecture changes to keep the risk picture current

## Don't

- Don't treat CSF as a compliance checklist — it is a risk management tool and every organization's target profile should reflect its unique risk appetite
- Don't attempt to reach Tier 4 (Adaptive) across all functions simultaneously because the resource cost is prohibitive and most organizations benefit more from closing Tier 1 gaps first
- Don't use CSF in isolation from other frameworks — it is explicitly designed to coexist with ISO 27001, SOC 2, and sector-specific regulations
- Don't skip the Identify function to jump to Protect — you cannot protect assets you haven't inventoried and risk-rated

## Case Study

**JPMorgan Chase**: JPMorgan Chase adopted the NIST CSF following the 2014 data breach that exposed 76 million households' data. The bank used the Framework Profile to map their existing security controls across all five functions, identifying critical gaps in the Detect and Respond categories. They created a target profile aligned with Tier 3 (Repeatable) capabilities across all functions and Tier 4 (Adaptive) for their most critical trading and customer-data systems. The CSF provided a shared language that allowed the CISO to present cybersecurity investment needs to the board as business risk rather than technical jargon. JPMC now spends over $600M annually on cybersecurity and credits the structured CSF approach with enabling board-level prioritization of that investment.

## Related Frameworks

- defense-in-depth (complement)
- incident-response-playbook (complement)
- security-development-lifecycle (related)
- zero-trust-architecture (related)

## Source

https://sdframe.caldis.me/frameworks/nist-cybersecurity-framework
