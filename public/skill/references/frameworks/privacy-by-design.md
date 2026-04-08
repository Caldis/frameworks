# Privacy by Design / 隐私设计

- **Category**: security
- **Complexity**: intermediate
- **Quality**: security, maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Ann Cavoukian (Information and Privacy Commissioner of Ontario), 1990s; formalized 2009, 1995
- **Adopters**: Apple, Microsoft, Google (Privacy Sandbox), European Union (GDPR mandate), Brave Browser

Embed privacy protections into the design and architecture of systems from the outset, not as an afterthought

_从一开始就将隐私保护嵌入系统的设计和架构中，而非事后补救_

## When to Use

Apply this framework when:
- Any system that collects, processes, or stores personally identifiable information (PII)
- Products subject to GDPR, CCPA, LGPD, or other data protection regulations
- AI/ML pipelines that train on user data and risk unintentional memorization or re-identification
- Healthcare, fintech, or edtech applications where data sensitivity is inherently high

## When NOT to Use

Stop and reconsider if:
- Systems that process zero personal data and have no user interaction (pure infrastructure tooling)
- Open public datasets where all information is already lawfully public and no re-identification risk exists
- Internal-only developer tools with no PII in any data path
- When the 'system' is a purely mathematical algorithm with no data ingestion

## Core Concepts

- Data Minimization: Collect and retain only the personal data strictly necessary for the stated processing purpose
- Purpose Limitation: Personal data must be collected for specified, explicit, and legitimate purposes and not further processed incompatibly
- Privacy-Enhancing Technologies (PETs): Technical measures — pseudonymization, differential privacy, homomorphic encryption — that reduce privacy risk while preserving utility
- Consent and Control: Empowering data subjects with transparent, granular, and revocable choices over their personal data
- Privacy by Default: The strictest privacy settings apply automatically without requiring user action

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Privacy by Design to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Conduct a Privacy Impact Assessment (PIA) at the design phase to identify all personal data flows and processing purposes
2. **Apply data minimization**: collect only the data strictly necessary for each stated purpose
3. Implement privacy-enhancing technologies (PETs): pseudonymization, encryption, differential privacy, or federated processing
4. Design user-facing consent and control mechanisms (granular opt-in, data portability, deletion requests)
5. **Establish ongoing privacy governance**: periodic audits, retention enforcement, breach notification procedures, and DPO oversight

<details><summary>中文步骤</summary>

1. 在设计阶段进行隐私影响评估（PIA），识别所有个人数据流和处理目的
2. 应用数据最小化原则：仅收集每个声明目的所严格必需的数据
3. 实施隐私增强技术（PET）：假名化、加密、差分隐私或联邦处理
4. 设计面向用户的同意和控制机制（细粒度选择加入、数据可携带、删除请求）
5. 建立持续隐私治理：定期审计、保留期执行、泄露通知流程和 DPO 监督

</details>

## Do

- Conduct privacy impact assessments before collecting any new category of personal data
- Implement data retention policies with automated deletion — privacy is not just about collection but also about disposal
- Offer users genuine controls: export, delete, opt-out — not just a privacy policy page
- Use privacy-preserving analytics (differential privacy, k-anonymity) instead of collecting raw granular data

## Don't

- Don't treat consent as a blanket checkbox — GDPR requires specific, informed, and granular consent per purpose
- Don't collect data speculatively 'in case it's useful later' — purpose limitation forbids this
- Don't confuse anonymization with pseudonymization — pseudonymized data is still personal data under GDPR
- Don't defer privacy to a post-launch patch — regulatory fines and reputational damage are far more expensive than upfront design

## Case Study

**Apple**: Apple has embedded Privacy by Design as a core product principle, implementing on-device processing for Siri, Photos facial recognition, and Health data, along with App Tracking Transparency (ATT) requiring explicit opt-in for cross-app tracking. The introduction of ATT in iOS 14.5 (2021) caused an estimated $10 billion revenue impact on Meta's advertising business, demonstrating that privacy-by-design decisions at the platform level reshape entire industry economics.

## Related Frameworks

- security-by-design (complement)
- principle-of-least-privilege (complement)
- defense-in-depth (complement)

## Source

https://sdframe.caldis.me/frameworks/privacy-by-design
