# Supply Chain Security (SLSA) / 软件供应链安全（SLSA）

- **Category**: security
- **Complexity**: advanced
- **Quality**: security, reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Google; Linux Foundation / OpenSSF, 2020-12
- **Adopters**: Google, GitHub (Artifact Attestations), npm (provenance for packages), Kubernetes (SLSA L3 for releases), OpenSSF / Linux Foundation

Ensure the integrity and provenance of software artifacts through verifiable supply chain levels

_通过可验证的供应链级别确保软件制品的完整性和来源_

## When to Use

Apply this framework when:
- Organizations with complex dependency trees (hundreds of open-source libraries) needing to verify artifact provenance
- CI/CD pipelines producing artifacts consumed by external customers or deployed to critical infrastructure
- After a supply chain attack (SolarWinds, Log4Shell, xz-utils) motivates investment in provenance verification
- Regulated environments requiring Software Bill of Materials (SBOM) and artifact traceability

## When NOT to Use

Stop and reconsider if:
- Single-developer personal projects with no external consumers of the build artifacts
- Early prototyping phases where the dependency set changes daily and provenance verification adds friction without risk reduction
- Environments where all software is built and consumed entirely within a physically secured enclave with no external dependencies
- When the team has not yet adopted basic CI/CD — establish a consistent build pipeline first before adding supply chain verification

## Core Concepts

- Provenance: Verifiable metadata describing who built an artifact, from what source, using which build platform, and what process was followed
- SLSA Levels: A graduated maturity model (L1: documented build; L2: hosted build with signed provenance; L3: hardened build platform; L4: hermetic, reproducible, two-person review)
- Software Bill of Materials (SBOM): A machine-readable inventory of all components and dependencies in a software artifact
- Hermetic Build: A build process that is fully isolated from the network and external state, ensuring reproducibility
- Sigstore: An open-source project providing keyless signing, transparency logs (Rekor), and certificate authority (Fulcio) for artifact attestation

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Supply Chain Security (SLSA) to?
- What constraints or existing architecture do you need to work within?
- Has your team used Supply Chain Security (SLSA) before? (This is an advanced framework)

## Implementation Steps

1. **Establish source integrity**: require code review, enforce branch protection, and sign commits in version control
2. **Secure the build process**: use hermetic, reproducible builds on isolated infrastructure with build provenance attestations
3. Generate and distribute SLSA provenance metadata (who built what, from which source, on which builder) as signed attestations
4. Verify provenance at every consumption point: package registries, container registries, and deployment pipelines must check attestations
5. Progress through SLSA levels (L1-L4) incrementally, adding automation and hardening at each level

<details><summary>中文步骤</summary>

1. 建立源代码完整性：要求代码审查、强制分支保护并在版本控制中签名提交
2. 保护构建过程：使用隔离基础设施上的封闭、可复现构建并生成构建来源证明
3. 生成并分发 SLSA 来源元数据（谁在哪个构建器上从哪个源代码构建了什么）作为签名证明
4. 在每个消费点验证来源：包注册中心、容器注册中心和部署管道必须检查证明
5. 逐步提升 SLSA 级别（L1-L4），在每个级别增加自动化和加固

</details>

## Do

- Start with SLSA Level 1 (documented build process) and progress incrementally — perfection is not required to gain value
- Generate SBOMs automatically during builds and publish them alongside release artifacts
- Use Sigstore or equivalent tooling for artifact signing — keyless signing removes the key management burden
- Pin dependencies by hash (not just version) and verify checksums in CI to detect tampering

## Don't

- Don't assume your CI/CD platform is inherently trusted — build infrastructure itself is an attack surface
- Don't rely on dependency version pinning alone — versions can be republished with different content on some registries
- Don't ignore transitive dependencies — most supply chain attacks target deep, overlooked dependencies
- Don't treat SBOM generation as compliance theater — if no one consumes the SBOM for policy decisions, it's just a file

## Case Study

**Google**: Google developed SLSA from its internal Binary Authorization for Borg (BAB) system, which has protected Google's production workloads since 2013 by requiring cryptographic provenance verification before any binary can run. When open-sourced as SLSA in 2021, the framework provided the industry with a graduated path toward the same supply chain integrity guarantees. Google mandates SLSA Level 3 for all internal production software and contributed Sigstore to make artifact signing accessible to the entire open-source ecosystem.

## Related Frameworks

- security-by-design (extends)
- owasp-top-10 (complement)
- defense-in-depth (complement)

## Source

https://sdframe.caldis.me/frameworks/supply-chain-security-slsa
