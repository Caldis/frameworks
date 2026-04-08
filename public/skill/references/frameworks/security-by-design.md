# Security by Design / 安全设计

- **Category**: security
- **Complexity**: intermediate
- **Quality**: security, maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Dan Bergh Johnsson, Daniel Deogun, Daniel Sawano (book); Microsoft SDL (process), 2004
- **Adopters**: Microsoft (SDL), Google (Project Zero drives secure-by-design improvements), CISA (Secure by Design initiative), SAFECode, Cisco (Cisco Secure Development Lifecycle)

Integrate security considerations into every phase of the software development lifecycle from requirements through deployment

_将安全考量集成到从需求到部署的软件开发生命周期的每个阶段_

## When to Use

Apply this framework when:
- Greenfield projects where security can be baked in from day one at minimal marginal cost
- Organizations adopting DevSecOps and shifting security left in the development pipeline
- Products in regulated industries (finance, healthcare, defense) where secure SDLC is mandated
- After security incidents reveal that vulnerabilities were introduced during design or implementation phases

## When NOT to Use

Stop and reconsider if:
- Disposable prototypes built purely to validate a business hypothesis with zero real user data
- When retrofitting security into a massive legacy codebase — start with threat modeling and risk-based prioritization instead of full redesign
- Extremely time-constrained emergency patches where the priority is stopping active exploitation
- Open-source hobby projects with no users and no sensitive data

## Core Concepts

- Secure Defaults: Systems ship with the most secure configuration out of the box; users must explicitly opt into less secure settings
- Input Validation: All data entering the system is treated as untrusted and validated against strict schemas before processing
- Fail-Secure: When a component fails, it denies access rather than failing open — preventing security bypass through error conditions
- Domain-Driven Security: Using the type system and domain primitives to make invalid or insecure states unrepresentable in code
- Shift Left: Moving security activities (threat modeling, SAST, code review) earlier in the SDLC where fixes are cheapest

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Security by Design to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Elicit security requirements alongside functional requirements: define abuse cases, compliance needs, and trust assumptions
2. **Apply secure design patterns**: input validation, secure defaults, fail-secure behavior, and separation of privilege
3. **Implement secure coding practices**: parameterized queries, output encoding, safe memory management, dependency scanning
4. **Integrate security testing into CI/CD**: SAST, DAST, SCA, secrets scanning, and fuzz testing on every build
5. Conduct security reviews (architecture review, code audit, penetration test) at each milestone and feed findings back into the design

<details><summary>中文步骤</summary>

1. 在功能需求旁引出安全需求：定义滥用用例、合规需要和信任假设
2. 应用安全设计模式：输入验证、安全默认值、安全失败行为和权限分离
3. 实施安全编码实践：参数化查询、输出编码、安全内存管理、依赖扫描
4. 将安全测试集成到 CI/CD：SAST、DAST、SCA、密钥扫描和模糊测试在每次构建中运行
5. 在每个里程碑进行安全审查（架构审查、代码审计、渗透测试）并将发现反馈到设计中

</details>

## Do

- Use strong type systems and domain primitives to encode security invariants — let the compiler catch violations
- Automate security gates in CI/CD: fail the build on critical SAST findings or known vulnerable dependencies
- Maintain a security champions program — embed security-minded developers in every team
- Treat security bugs with the same priority as functional bugs — they are not second-class issues

## Don't

- Don't bolt on security as a final phase — the cost of fixing vulnerabilities increases 30x from design to production
- Don't rely solely on penetration testing — it finds symptoms, not root causes in the design
- Don't assume frameworks handle all security — ORM doesn't prevent all injection; HTTPS doesn't prevent all data exposure
- Don't treat security as solely the security team's responsibility — every developer writes security-sensitive code

## Case Study

**Microsoft**: Microsoft's Security Development Lifecycle (SDL), mandated company-wide after Bill Gates' 2002 Trustworthy Computing memo, transformed how the company builds software. By requiring threat modeling, static analysis, fuzz testing, and security reviews at defined checkpoints, Microsoft reduced the vulnerability count in Windows by over 50% between Windows XP and Windows 7. The SDL became the template for secure SDLC practices adopted across the industry.

## Related Frameworks

- threat-modeling-stride (complement)
- owasp-top-10 (complement)
- privacy-by-design (complement)

## Source

https://sdframe.caldis.me/frameworks/security-by-design
