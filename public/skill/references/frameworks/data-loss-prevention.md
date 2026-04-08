# Data Loss Prevention (DLP) / 数据防泄漏（DLP）

- **Category**: security
- **Complexity**: advanced
- **Quality**: security
- **Abstraction**: system
- **Maturity**: established
- **Author**: Gartner, 2003
- **Adopters**: Morgan Stanley, Bank of America, Pfizer, Lockheed Martin, US Department of Defense, Deutsche Bank

A strategy and toolset for detecting, monitoring, and preventing the unauthorized transmission of sensitive data outside organizational boundaries

_检测、监控和防止敏感数据未经授权传输到组织边界之外的策略和工具集_

## When to Use

Apply this framework when:
- In regulated industries (finance, healthcare, legal) where data residency and exfiltration prevention are mandated by PCI-DSS, HIPAA, GDPR, or SOX
- When insider threat is a significant risk — departing employees, contractors with broad access, or mergers and acquisitions where data sovereignty matters
- After a data breach investigation reveals exfiltration occurred via email, USB, or cloud sync without detection
- When a cloud migration moves sensitive data to SaaS platforms (Salesforce, O365) requiring CASB-integrated DLP to maintain visibility

## When NOT to Use

Stop and reconsider if:
- As a replacement for a data minimization strategy — the best DLP control is not collecting sensitive data in the first place
- For organizations processing only non-sensitive, publicly available data where classification overhead exceeds any risk reduction value
- As the only insider threat control — DLP must be layered with privileged access management (PAM), zero-trust network access, and HR process controls

## Core Concepts

- Data Classification: The categorization of data by sensitivity, regulatory obligation, and business value, which determines the DLP policy applied to each data asset
- Content Inspection: Deep examination of data in motion (network), at rest (storage), and in use (endpoint) using regular expressions, data fingerprinting, and ML classifiers
- Contextual Analysis: Evaluating not just content but context — who is sending, to where, via what channel, at what time — to reduce false positives and catch anomalous behavior
- CASB (Cloud Access Security Broker): A security policy enforcement point between cloud service users and providers that extends DLP visibility to SaaS and IaaS environments
- Insider Threat Integration: Combining DLP telemetry with user behavior analytics (UEBA) to distinguish accidental data handling mistakes from malicious exfiltration attempts

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Data Loss Prevention (DLP) to?
- What constraints or existing architecture do you need to work within?
- Has your team used Data Loss Prevention (DLP) before? (This is an advanced framework)

## Implementation Steps

1. **Data Discovery and Classification**: Inventory all data stores (databases, file shares, cloud storage, endpoints) and classify content by sensitivity level (public, internal, confidential, restricted) using automated scanning and pattern matching
2. **Policy Definition**: Define DLP rules aligned to business risk — patterns for PII (SSN, credit card, passport), PHI, intellectual property, and source code, specifying monitor, alert, or block actions by data type and channel
3. **Channel Coverage**: Deploy DLP controls across all exfiltration vectors — email (O365 DLP, Proofpoint), endpoint (Symantec DLP, CrowdStrike), cloud (CASB — Netskope, MCAS), and network (proxy inspection)
4. **Incident Response Integration**: Route DLP alerts to a SIEM with enriched context (user risk score, data sensitivity, destination), define escalation workflows, and integrate with HR and legal for insider-threat cases
5. **Tuning and Governance**: Measure false-positive rates per policy, tune regex patterns and ML classifiers, conduct quarterly reviews of classification schema against evolving data landscape, and report DLP effectiveness to security leadership

<details><summary>中文步骤</summary>

1. 数据发现和分类：清点所有数据存储（数据库、文件共享、云存储、端点）并使用自动扫描和模式匹配按敏感级别（公开、内部、机密、受限）对内容进行分类
2. 策略定义：定义与业务风险对齐的DLP规则——PII（社会安全号、信用卡、护照）、PHI、知识产权和源代码的模式，按数据类型和渠道指定监控、告警或阻止操作
3. 渠道覆盖：在所有泄漏向量上部署DLP控制——电子邮件（O365 DLP、Proofpoint）、端点（Symantec DLP、CrowdStrike）、云（CASB——Netskope、MCAS）和网络（代理检查）
4. 事件响应集成：将DLP告警路由到带有丰富上下文（用户风险评分、数据敏感性、目的地）的SIEM，定义升级工作流，并与HR和法律部门集成处理内部威胁案例
5. 调优和治理：测量每个策略的误报率，调整正则表达式模式和ML分类器，对照不断演变的数据格局进行季度分类模式审查，并向安全领导层报告DLP有效性

</details>

## Do

- Start with monitor-only mode for all new policies for 30 days to measure false-positive rates before enabling blocking actions that could disrupt legitimate workflows
- Involve business data owners in classification schema design because IT-defined classification schemas frequently misalign with how business units actually use and value data
- Integrate DLP alerts into user awareness at the point of violation — a real-time educational pop-up is more effective than a security team email days later
- Build a dedicated DLP tuning team rather than treating DLP as a set-and-forget tool, as data patterns and workflows evolve constantly

## Don't

- Don't attempt to classify and protect all data at once — a phased approach starting with the highest-sensitivity data (PCI, PHI, IP) prevents program failure from scope overload
- Don't rely solely on regex-based detection for modern DLP because attackers obfuscate sensitive data (steganography, encoding) and ML-based contextual analysis is essential
- Don't deploy endpoint DLP without change management and employee communication — covert monitoring without transparency creates legal risk in many jurisdictions
- Don't treat DLP as a substitute for encryption — DLP detects exfiltration attempts but encryption ensures data is useless if exfiltrated

## Case Study

**Morgan Stanley**: In 2019, Morgan Stanley faced a significant insider threat incident when a financial advisor exfiltrated data belonging to approximately 900 clients before departing. The bank's DLP system detected the anomalous bulk download from a wealth management system and flagged it within hours, enabling rapid legal response. The incident led Morgan Stanley to overhaul its DLP program with enhanced UEBA integration, tighter controls on bulk data exports, and a dedicated insider threat team. The UEBA-DLP integration reduced mean time to detect insider exfiltration from 78 days (industry average) to under 48 hours for high-risk departing employees, and the program became a benchmark for financial services sector DLP implementation.

## Related Frameworks

- defense-in-depth (complement)
- nist-cybersecurity-framework (complement)
- zero-trust-architecture (related)
- threat-modeling-stride (complement)

## Source

https://sdframe.caldis.me/frameworks/data-loss-prevention
