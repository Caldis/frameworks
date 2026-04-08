# Security Development Lifecycle (SDL) / 安全开发生命周期（SDL）

- **Category**: security
- **Complexity**: advanced
- **Quality**: security, reliability
- **Abstraction**: organization
- **Maturity**: foundational
- **Author**: Steve Lipner, 2002
- **Adopters**: Microsoft, Adobe, Cisco, SAP, Siemens, US Department of Defense (DoD)

Microsoft's structured process for integrating security and privacy practices at every phase of software development

_微软在软件开发每个阶段融入安全与隐私实践的结构化流程_

## When to Use

Apply this framework when:
- When building software that handles sensitive user data, financial transactions, or critical infrastructure components
- In regulated industries (healthcare, finance, government) where documented security processes are required for compliance audits
- When onboarding a development organization to systematic security practices for the first time
- Before a major product launch where a security breach would cause significant reputational or financial damage

## When NOT to Use

Stop and reconsider if:
- For throwaway prototypes or research spikes where the code will never reach production and security overhead would waste exploration time
- In very early-stage startups (pre-product-market-fit) where the overhead of formal SDL phases would prevent shipping at all — adopt a lightweight version first
- When the system handles only non-sensitive, publicly available data with no user authentication — full SDL overhead exceeds the actual risk

## Core Concepts

- Bug Bar: A minimum severity threshold that determines which security bugs must be fixed before release, providing consistent risk acceptance criteria
- Attack Surface Reduction: Systematically minimizing the code and interfaces exposed to untrusted input, thereby reducing the number of pathways an attacker can exploit
- Banned Functions: A list of APIs and library functions with known security weaknesses (e.g., strcpy, gets) that developers are prohibited from using
- Final Security Review (FSR): A gate-based review performed by a security team before every product release to confirm all SDL requirements have been met
- Trusted Computing Base (TCB): The subset of system components that must be correct for the security policy to be enforced, kept as small as possible

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Security Development Lifecycle (SDL) to?
- What constraints or existing architecture do you need to work within?
- Has your team used Security Development Lifecycle (SDL) before? (This is an advanced framework)

## Implementation Steps

1. **Training**: Provide all team members with core security education covering attack patterns, secure coding standards, and privacy fundamentals before development begins
2. **Requirements**: Define security and privacy requirements alongside functional requirements, establish bug bars, and identify compliance obligations (GDPR, HIPAA, PCI-DSS)
3. **Design**: Perform threat modeling using STRIDE, define the attack surface, apply security design principles (least privilege, defense in depth, secure defaults)
4. **Implementation**: Use approved tools and banned function lists, enforce static analysis (SAST) gates, conduct mandatory peer code reviews with security checklist
5. **Verification & Release**: Execute dynamic analysis (DAST) and fuzzing, conduct penetration testing, perform final security review, document incident response plan before shipping

<details><summary>中文步骤</summary>

1. 培训：在开发开始前为所有团队成员提供核心安全教育，涵盖攻击模式、安全编码标准和隐私基础
2. 需求：与功能需求并行定义安全和隐私需求，建立缺陷基准，识别合规义务（GDPR、HIPAA、PCI-DSS）
3. 设计：使用STRIDE进行威胁建模，定义攻击面，应用安全设计原则（最小权限、纵深防御、安全默认值）
4. 实现：使用经批准的工具和禁止函数列表，强制执行静态分析（SAST）门控，进行带安全检查表的强制同行代码审查
5. 验证与发布：执行动态分析（DAST）和模糊测试，进行渗透测试，执行最终安全审查，在发布前记录事件响应计划

</details>

## Do

- Integrate SDL requirements as acceptance criteria in user stories so security is a first-class definition of done, not a separate audit
- Automate as much of SDL as possible — static analysis, dependency scanning, and secret detection run every commit, making security invisible friction
- Use metrics (mean time to fix security bugs, SAST false-positive rate) to continuously improve the SDL process itself
- Train developers on the specific vulnerabilities most relevant to your stack rather than generic security awareness content

## Don't

- Don't treat SDL as a one-time checklist at the end of a project because late-stage security fixes cost 30x more than design-phase fixes
- Don't assign SDL compliance solely to a security team because security is a shared responsibility that requires developer ownership
- Don't skip threat modeling for 'small' features because attackers routinely exploit seemingly minor changes that alter trust boundaries
- Don't implement SDL without executive sponsorship because security process adoption fails without organizational authority to enforce bug bars

## Case Study

**Microsoft**: After the 2002 Trustworthy Computing initiative, Microsoft halted Windows Server 2003 development for 60 days to train 8,500 developers on secure coding and conduct the first company-wide SDL review. The result was a 45% reduction in security bulletins between Windows XP and Windows Vista, and a 91% reduction in critical vulnerabilities in Windows Server 2003 compared to Windows Server 2000. Microsoft later open-sourced the SDL process and tooling, enabling organizations like Adobe, Cisco, and SAP to adopt it. The SDL became the template for NIST SP 800-218 (Secure Software Development Framework) and ISO/IEC 27034.

## Related Frameworks

- threat-modeling-stride (complement)
- owasp-top-10 (complement)
- defense-in-depth (complement)
- devsecops-pipeline (related)

## Source

https://sdframe.caldis.me/frameworks/security-development-lifecycle
