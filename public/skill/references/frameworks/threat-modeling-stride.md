# Threat Modeling (STRIDE) / 威胁建模（STRIDE）

- **Category**: security
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Loren Kohnfelder & Praerit Garg (Microsoft), 1999; popularized by Adam Shostack
- **Adopters**: Microsoft, Google (variation: process for attack simulation and threat analysis), OWASP, Intel, SAFECode

Systematic identification and mitigation of security threats using the STRIDE taxonomy

_使用 STRIDE 分类法系统识别和缓解安全威胁_

## When to Use

Apply this framework when:
- During architecture and design phases to proactively identify security weaknesses before code is written
- When onboarding a new system or microservice into a security review program
- Before major releases to validate that new features don't introduce unmitigated threats
- In compliance-driven environments (PCI-DSS, HIPAA) that require documented risk assessments

## When NOT to Use

Stop and reconsider if:
- Throwaway prototypes or hackathon projects where security analysis overhead is unjustified
- Purely static content sites with no user input, authentication, or sensitive data
- When the team lacks basic security vocabulary — invest in training first before formal threat modeling
- Extremely small scripts or CLI utilities with no network exposure and no privilege boundaries

## Core Concepts

- STRIDE: Six-category threat taxonomy — Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege
- Data Flow Diagram (DFD): Visual decomposition of the system into processes, data stores, external entities, and data flows
- Trust Boundary: A logical border where the level of trust changes, marking where threats are most likely to materialize
- Threat Tree: Hierarchical decomposition of a high-level threat into specific attack paths and preconditions
- Mitigation Mapping: The practice of linking each identified threat to one or more concrete security controls

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Threat Modeling (STRIDE) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Decompose the system into components and draw a data flow diagram (DFD) with trust boundaries
2. Apply STRIDE categories (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) to each element
3. Enumerate concrete threats for every DFD element crossed with each STRIDE category
4. Rate each threat using DREAD or CVSS scoring to prioritize mitigation efforts
5. Define mitigations (authentication, integrity checks, logging, encryption, rate limiting, authorization) and map them to threats

<details><summary>中文步骤</summary>

1. 将系统分解为组件，绘制带信任边界的数据流图（DFD）
2. 对每个元素应用 STRIDE 六类威胁（仿冒、篡改、抵赖、信息泄露、拒绝服务、权限提升）
3. 针对 DFD 各元素与每个 STRIDE 类别交叉枚举具体威胁
4. 使用 DREAD 或 CVSS 评分对威胁进行优先级排序
5. 定义缓解措施（认证、完整性校验、日志记录、加密、限流、授权）并映射到对应威胁

</details>

## Do

- Start threat modeling early in design — retrofitting is far more expensive than proactive analysis
- Involve cross-functional participants (developers, architects, QA, operations) to surface diverse threat perspectives
- Keep data flow diagrams up to date as the architecture evolves across sprints
- Use the threat model as a living document that feeds into backlog items and test plans

## Don't

- Don't treat threat modeling as a one-time checkbox exercise — threats evolve as the system changes
- Don't attempt to enumerate every conceivable threat in one session — focus on high-risk trust boundaries first
- Don't skip the data flow diagram — without it STRIDE analysis becomes unstructured guesswork
- Don't confuse threat modeling with penetration testing — modeling is design-time, pen-testing is runtime validation

## Case Study

**Microsoft**: Microsoft mandated STRIDE-based threat modeling across all product teams as part of the Security Development Lifecycle (SDL) starting in 2004. After integrating threat modeling into the Windows Vista development cycle, the team identified and mitigated over 100 high-severity threats before release, contributing to a 45% reduction in security bulletins compared to Windows XP's equivalent post-release period.

## Related Frameworks

- defense-in-depth (complement)
- security-by-design (complement)
- owasp-top-10 (complement)

## Source

https://sdframe.caldis.me/frameworks/threat-modeling-stride
