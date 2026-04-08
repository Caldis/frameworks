# Security & Privacy / 安全与隐私

Threat modeling, secure design, privacy patterns, and zero-trust architectures.

威胁建模、安全设计、隐私模式与零信任架构。

**21 frameworks** in this category.

## Frameworks

### Threat Modeling (STRIDE) / 威胁建模（STRIDE）
- **Slug**: threat-modeling-stride
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Author**: Loren Kohnfelder & Praerit Garg (Microsoft), 1999; popularized by Adam Shostack
- Systematic identification and mitigation of security threats using the STRIDE taxonomy

### Zero Trust Architecture / 零信任架构
- **Slug**: zero-trust-architecture
- **Complexity**: advanced
- **Quality**: security, reliability
- **Author**: John Kindervag (Forrester Research), 2010
- Never trust, always verify — eliminate implicit trust from network architecture

### OAuth 2.0 / OpenID Connect / OAuth 2.0 / OpenID Connect 授权与身份框架
- **Slug**: oauth2-openid-connect
- **Complexity**: intermediate
- **Quality**: security, usability
- **Author**: Eran Hammer, Dick Hardt et al. (IETF); OpenID Foundation
- Delegated authorization and federated identity for secure API and application access

### Defense in Depth / 纵深防御
- **Slug**: defense-in-depth
- **Complexity**: beginner
- **Quality**: security, reliability
- **Author**: Military strategy concept; adapted to information security by NSA and NIST
- Layer multiple independent security controls so that no single point of failure compromises the system

### Privacy by Design / 隐私设计
- **Slug**: privacy-by-design
- **Complexity**: intermediate
- **Quality**: security, maintainability
- **Author**: Ann Cavoukian (Information and Privacy Commissioner of Ontario), 1990s; formalized 2009
- Embed privacy protections into the design and architecture of systems from the outset, not as an afterthought

### OWASP Top 10 / OWASP 十大 Web 应用安全风险
- **Slug**: owasp-top-10
- **Complexity**: beginner
- **Quality**: security
- **Author**: OWASP Foundation (community-driven, led by Andrew van der Stock et al.)
- A prioritized framework of the most critical web application security risks with proven mitigation strategies

### Principle of Least Privilege / 最小权限原则
- **Slug**: principle-of-least-privilege
- **Complexity**: beginner
- **Quality**: security, reliability
- **Author**: Jerome Saltzer and Michael Schroeder, 1975
- Grant each subject only the minimum permissions necessary to perform its function, nothing more

### Security by Design / 安全设计
- **Slug**: security-by-design
- **Complexity**: intermediate
- **Quality**: security, maintainability
- **Author**: Dan Bergh Johnsson, Daniel Deogun, Daniel Sawano (book); Microsoft SDL (process)
- Integrate security considerations into every phase of the software development lifecycle from requirements through deployment

### Supply Chain Security (SLSA) / 软件供应链安全（SLSA）
- **Slug**: supply-chain-security-slsa
- **Complexity**: advanced
- **Quality**: security, reliability
- **Author**: Google; Linux Foundation / OpenSSF
- Ensure the integrity and provenance of software artifacts through verifiable supply chain levels

### Confidential Computing / 机密计算
- **Slug**: confidential-computing
- **Complexity**: advanced
- **Quality**: security
- **Author**: Confidential Computing Consortium (Linux Foundation); Intel, AMD, Arm
- Protect data in use by performing computation within hardware-based trusted execution environments (TEEs)

### Security Champions Program / 安全冠军计划
- **Slug**: security-champions-program
- **Complexity**: intermediate
- **Quality**: security
- **Author**: OWASP Security Champions Playbook; popularized by companies like Spotify and Nokia
- Embedding security advocates within development teams

### Secrets Management / 密钥管理
- **Slug**: secrets-management
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Author**: HashiCorp (Mitchell Hashimoto), 2015
- Centralized vault-based secrets lifecycle (HashiCorp Vault, 2015)

### Web Application Firewall (WAF) Patterns / Web应用防火墙模式
- **Slug**: waf-patterns
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Author**: Perfecto Technologies (first commercial WAF, 1999); OWASP ModSecurity Core Rule Set
- Application-layer traffic filtering strategies that inspect, filter, and block malicious HTTP/S requests before they reach web applications

### Identity Federation / 身份联合
- **Slug**: identity-federation
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Author**: OASIS (SAML 2.0, 2005); OpenID Foundation (OIDC, 2014)
- Cross-domain identity and SSO patterns (SAML, OIDC federation)

### Penetration Testing Framework / 渗透测试框架
- **Slug**: penetration-testing-framework
- **Complexity**: advanced
- **Quality**: security
- **Author**: PTES (Penetration Testing Execution Standard), 2009; OWASP Testing Guide v1.0, 2004
- Structured offensive security testing methodology (PTES, OWASP Testing Guide)

### Security Development Lifecycle (SDL) / 安全开发生命周期（SDL）
- **Slug**: security-development-lifecycle
- **Complexity**: advanced
- **Quality**: security, reliability
- **Author**: Steve Lipner
- Microsoft's structured process for integrating security and privacy practices at every phase of software development

### NIST Cybersecurity Framework / NIST网络安全框架
- **Slug**: nist-cybersecurity-framework
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Author**: NIST
- A voluntary risk-based framework organizing cybersecurity activities into five concurrent functions: Identify, Protect, Detect, Respond, Recover

### DevSecOps Pipeline / DevSecOps流水线
- **Slug**: devsecops-pipeline
- **Complexity**: advanced
- **Quality**: security, maintainability
- **Author**: Shannon Lietz
- The integration of security tooling and culture into every stage of a CI/CD pipeline so that security is automated, continuous, and developer-owned rather than a final gate

### Data Loss Prevention (DLP) / 数据防泄漏（DLP）
- **Slug**: data-loss-prevention
- **Complexity**: advanced
- **Quality**: security
- **Author**: Gartner
- A strategy and toolset for detecting, monitoring, and preventing the unauthorized transmission of sensitive data outside organizational boundaries

### Incident Response Playbook / 事件响应手册
- **Slug**: incident-response-playbook
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Author**: SANS Institute
- SANS Institute's six-step structured process for handling cybersecurity incidents from preparation through post-incident lessons learned

### Runtime Application Self-Protection (RASP) / 运行时应用自我保护（RASP）
- **Slug**: runtime-application-self-protection
- **Complexity**: intermediate
- **Quality**: security, reliability, observability
- **Author**: Gartner (Joseph Feiman coined the term RASP in 2012); commercial implementations by Contrast Security, Sqreen
- A security technology that instruments application runtimes to detect and block attacks from within the running application context, with access to call stacks, data flows, and execution context that perimeter controls cannot see
