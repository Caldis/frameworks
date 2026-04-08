# DevSecOps Pipeline / DevSecOps流水线

- **Category**: security
- **Complexity**: advanced
- **Quality**: security, maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Shannon Lietz, 2012
- **Adopters**: Netflix, Etsy, Capital One, Spotify, Atlassian, GitLab

The integration of security tooling and culture into every stage of a CI/CD pipeline so that security is automated, continuous, and developer-owned rather than a final gate

_将安全工具和文化集成到CI/CD流水线的每个阶段，使安全成为自动化、持续且由开发人员负责的工作，而非最终关卡_

## When to Use

Apply this framework when:
- When a team deploys multiple times per day and traditional security review gates create unacceptable bottlenecks in the delivery pipeline
- After a production security incident caused by a vulnerability that existed in code for weeks or months before discovery
- When building cloud-native or microservices architectures where the attack surface changes with every deployment
- In organizations adopting platform engineering — security tooling becomes a product offering of the internal developer platform

## When NOT to Use

Stop and reconsider if:
- For systems with very infrequent releases (quarterly or annual) where the overhead of pipeline security tooling exceeds the risk reduction — manual security reviews are more cost-effective
- When the team lacks the DevOps maturity for CI/CD itself — implement basic pipeline practices before layering security automation on top
- In air-gapped classified environments where commercial security scanning SaaS tools cannot be used and open-source alternatives require significant maintenance overhead

## Core Concepts

- Shift-Left Security: Moving security activities earlier in the SDLC so defects are caught at their cheapest fix point (design/code) rather than post-deployment
- Security as Code: Expressing security policies, compliance rules, and infrastructure hardening as version-controlled code that is tested and deployed like any other software artifact
- Continuous Compliance: Automated verification that every deployment meets defined security and regulatory requirements, producing audit trails without manual evidence collection
- Developer Security Champions: Developers embedded in teams with additional security training who act as first-line security reviewers, reducing bottlenecks on central security teams
- Software Composition Analysis (SCA): Automated scanning of open-source dependencies for known CVEs, license compliance issues, and transitive vulnerabilities in the dependency graph

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying DevSecOps Pipeline to?
- What constraints or existing architecture do you need to work within?
- Has your team used DevSecOps Pipeline before? (This is an advanced framework)

## Implementation Steps

1. **Shift-Left Planning**: Embed security requirements in user stories, run automated dependency vulnerability scanning (SCA) on every pull request, and configure secret detection to block credentials from entering source control
2. **Secure Build**: Integrate SAST tools (Semgrep, Checkmarx, SonarQube) into the CI pipeline as blocking quality gates with developer-visible feedback within minutes of commit
3. **Container and Infrastructure Security**: Scan container images with tools like Trivy or Snyk in the registry pipeline, enforce policy-as-code (OPA, Conftest) for Kubernetes manifests and Terraform before deployment
4. **Dynamic and Runtime Testing**: Run DAST (OWASP ZAP, Burp Suite API) against staging environments in the CD pipeline, enable runtime application self-protection (RASP) and cloud workload protection in production
5. **Continuous Feedback and Governance**: Aggregate findings into a security dashboard (Defect Dojo, Veracode), route high-severity findings to developer queues, track mean time to remediation, and conduct blameless security post-mortems

<details><summary>中文步骤</summary>

1. 左移规划：在用户故事中嵌入安全需求，在每个拉取请求上运行自动化依赖漏洞扫描（SCA），配置密钥检测以阻止凭证进入源代码管理
2. 安全构建：将SAST工具（Semgrep、Checkmarx、SonarQube）集成到CI流水线中作为阻塞质量门控，在提交后数分钟内向开发人员提供可见反馈
3. 容器和基础设施安全：在注册表流水线中使用Trivy或Snyk等工具扫描容器镜像，在部署前对Kubernetes清单和Terraform强制执行策略即代码（OPA、Conftest）
4. 动态和运行时测试：在CD流水线的暂存环境中运行DAST（OWASP ZAP、Burp Suite API），在生产中启用运行时应用程序自我保护（RASP）和云工作负载保护
5. 持续反馈和治理：将发现汇总到安全仪表板（Defect Dojo、Veracode），将高严重性发现路由到开发人员队列，跟踪平均修复时间，并进行无指责安全事后审查

</details>

## Do

- Start with secret detection and dependency scanning as they deliver immediate value with near-zero false positives and prevent the most common production incidents
- Tune SAST tools per-project to reduce false-positive rates below 10% before enabling them as blocking gates — high noise kills developer trust
- Give developers fix guidance alongside findings because a vulnerability alert without a remediation path creates anxiety, not security improvement
- Measure developer experience metrics (time to fix, false-positive rate, pipeline overhead) alongside security metrics to maintain developer buy-in

## Don't

- Don't add every available security scanner at once — pipeline sprawl with conflicting tool outputs overwhelms developers and slows delivery without security benefit
- Don't treat all findings as equally urgent — a CVSS 9.8 in a production API deserves different SLA treatment than a CVSS 3.2 in a development dependency
- Don't skip the cultural transformation — tooling without developer security ownership reverts to a security-team-as-gatekeeper model that DevSecOps was designed to replace
- Don't ignore runtime security in favor of pre-deployment scanning only because attackers exploit running systems, not source code

## Case Study

**Netflix**: Netflix's Security Monkey and later Repokid projects exemplify their DevSecOps philosophy of automating security at scale. With 700+ microservices deploying thousands of times weekly, manual security review is impossible. Netflix built Security Monkey to continuously audit AWS IAM policies and S3 bucket permissions, automatically flagging and eventually auto-remediating policy drift. Their Repokid tool uses machine learning on CloudTrail logs to detect and remove unused IAM permissions, enforcing least-privilege automatically over time. This automated, developer-owned approach enabled Netflix to maintain a strong security posture across millions of lines of code without a security team that scales with the engineering headcount.

## Related Frameworks

- security-development-lifecycle (related)
- owasp-top-10 (complement)
- threat-modeling-stride (complement)
- defense-in-depth (complement)

## Source

https://sdframe.caldis.me/frameworks/devsecops-pipeline
