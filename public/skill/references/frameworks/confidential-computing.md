# Confidential Computing / 机密计算

- **Category**: security
- **Complexity**: advanced
- **Quality**: security
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Confidential Computing Consortium (Linux Foundation); Intel, AMD, Arm, 2015
- **Adopters**: Signal (Secure Value Recovery), Microsoft (Azure Confidential Computing), Google Cloud (Confidential VMs and GKE Nodes), Fortanix, Anjuna Security

Protect data in use by performing computation within hardware-based trusted execution environments (TEEs)

_通过在基于硬件的可信执行环境（TEE）中执行计算来保护使用中的数据_

## When to Use

Apply this framework when:
- Multi-party computation scenarios where mutually distrustful parties need to process shared data without revealing it to each other
- Cloud workloads processing highly sensitive data where the cloud provider must be excluded from the trust boundary
- AI/ML inference on private data (healthcare, finance) where model inputs must be protected even from the infrastructure operator
- Key management and cryptographic operations where private keys must never exist in unencrypted memory accessible to the host OS

## When NOT to Use

Stop and reconsider if:
- Workloads with no confidentiality requirements — the performance overhead of TEEs (5-30%) is unjustified
- When the threat model only includes external network attackers and not privileged insiders or infrastructure compromise
- On hardware that lacks TEE support — software-only emulation provides no real security guarantee
- Simple data-at-rest protection needs where standard disk encryption (LUKS, BitLocker) is sufficient

## Core Concepts

- Trusted Execution Environment (TEE): A hardware-isolated processing area where code and data are protected from the host OS, hypervisor, and other tenants
- Remote Attestation: A cryptographic protocol that allows a remote party to verify the identity, integrity, and configuration of a TEE before entrusting it with sensitive data
- Trusted Computing Base (TCB): The minimal set of hardware and software components that must be trusted — smaller TCB means smaller attack surface
- Memory Encryption: Hardware-level encryption of the TEE's memory pages, preventing physical and software-based memory snooping attacks
- Sealed Storage: Data encrypted to a specific TEE's identity so that only that enclave (or an authorized successor) can decrypt it

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Confidential Computing to?
- What constraints or existing architecture do you need to work within?
- Has your team used Confidential Computing before? (This is an advanced framework)

## Implementation Steps

1. Identify workloads that process sensitive data in memory and are vulnerable to privileged-attacker threats (rogue admins, compromised hypervisors)
2. **Select a TEE platform**: Intel SGX enclaves, Intel TDX, AMD SEV-SNP confidential VMs, or Arm CCA
3. Design the application to partition sensitive processing into the enclave/TEE and keep the trusted computing base (TCB) minimal
4. **Implement remote attestation**: cryptographically verify the TEE's identity, firmware version, and code measurements before sending sensitive data
5. Deploy, monitor, and maintain the confidential workload: handle attestation failures, manage sealed storage, and update enclave code with re-attestation

<details><summary>中文步骤</summary>

1. 识别在内存中处理敏感数据且易受特权攻击者威胁（恶意管理员、被入侵的虚拟机管理程序）的工作负载
2. 选择 TEE 平台：Intel SGX 安全飞地、Intel TDX、AMD SEV-SNP 机密虚拟机或 Arm CCA
3. 设计应用将敏感处理分区到飞地/TEE 中，保持可信计算基（TCB）最小化
4. 实施远程证明：在发送敏感数据前加密验证 TEE 的身份、固件版本和代码度量
5. 部署、监控和维护机密工作负载：处理证明失败、管理密封存储并通过重新证明更新飞地代码

</details>

## Do

- Always verify remote attestation before sending sensitive data to a TEE — attestation is the foundation of trust
- Minimize the trusted computing base: smaller enclave code means fewer bugs and a smaller attack surface
- Use well-audited TEE SDKs (Open Enclave, Gramine, Enarx) rather than building enclave runtimes from scratch
- Plan for side-channel mitigations: constant-time algorithms, ORAM access patterns, and compiler-level defenses

## Don't

- Don't assume TEEs are invulnerable — side-channel attacks (Spectre, Foreshadow, Plundervolt) have repeatedly broken SGX guarantees
- Don't put the entire application inside the enclave — only the security-sensitive processing belongs there
- Don't skip firmware and microcode updates — TEE security depends on patches for known hardware vulnerabilities
- Don't treat attestation as a one-time check — re-attest periodically and after any TEE restart or migration

## Case Study

**Signal**: Signal implemented Secure Value Recovery (SVR) using Intel SGX enclaves to protect user PIN-derived keys on the server side. By running the PIN verification and key derivation inside an enclave, Signal ensures that even a compromised server or a rogue Signal employee cannot extract the encryption keys protecting users' message history and contacts. Remote attestation allows Signal clients to verify the enclave's integrity before submitting their PIN, achieving end-to-end security for the cloud-assisted recovery process.

## Related Frameworks

- zero-trust-architecture (complement)
- defense-in-depth (extends)
- privacy-by-design (complement)

## Source

https://sdframe.caldis.me/frameworks/confidential-computing
