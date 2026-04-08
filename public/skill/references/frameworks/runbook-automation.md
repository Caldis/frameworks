# Runbook Automation / 运维手册自动化

- **Category**: observability
- **Complexity**: intermediate
- **Quality**: reliability, observability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Google SRE team; formalized in Site Reliability Engineering book (2016), 2003
- **Adopters**: Google, Amazon, PagerDuty, Shoreline.io, Datadog

Codified incident response procedures that reduce toil and human error during incidents

_将事故响应流程代码化，减少事故期间的重复劳动和人为失误_

## When to Use

Apply this framework when:
- On-call teams spending more than 50% of their time on repetitive, manual remediation tasks (toil)
- Incident response procedures that are well-understood and follow a deterministic decision tree
- Organizations where manual runbook execution during 3am incidents leads to high error rates
- Services with recurring failure modes (disk full, certificate expiry, connection pool exhaustion) that follow the same fix pattern

## When NOT to Use

Stop and reconsider if:
- Novel or rare failure modes that have not been seen before and lack a known remediation procedure
- Procedures involving irreversible destructive actions (data deletion, key rotation) where human verification is essential
- Small-scale systems where the investment in building and maintaining automation exceeds the toil it would save
- Organizations without a blameless incident culture, where automation failures would be punished rather than learned from

## Core Concepts

- Toil: Repetitive, manual, automatable operational work that scales linearly with service size and provides no enduring value -- the primary target for runbook automation
- Auto-Remediation: Automated workflows triggered directly by alerts that execute predefined fix steps without human intervention for known failure patterns
- Safety Guards: Dry-run modes, blast radius limits, rollback triggers, and human approval gates that prevent automated runbooks from making incidents worse
- Runbook-as-Code: Version-controlled, tested, and reviewed automation scripts stored alongside the service code they operate on, following software engineering best practices
- Escalation Ladder: When automation fails or encounters an unknown condition, it stops and escalates to a human with full context rather than retrying blindly

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Runbook Automation to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Audit existing manual runbooks**: catalog all incident response procedures and classify them by frequency, complexity, and risk of human error
2. **Prioritize automation candidates**: start with high-frequency, low-risk procedures (restart service, clear cache, scale up) that consume the most on-call toil
3. Codify runbooks as executable scripts or workflows: use infrastructure automation tools (Ansible, Terraform, custom scripts) with safety guards (dry-run mode, blast radius limits, approval gates)
4. Integrate automated runbooks with alerting: connect alerts to auto-remediation workflows so common issues self-heal without paging humans
5. **Continuously validate and iterate**: test runbook automations regularly against staging, track mean time to remediation (MTTR), and update scripts as the system evolves

<details><summary>中文步骤</summary>

1. 审计现有手动运维手册：编目所有事故响应流程，按频率、复杂度和人为失误风险分类
2. 确定自动化候选者优先级：从消耗最多值班人工的高频率、低风险流程开始（重启服务、清除缓存、扩容）
3. 将运维手册编码为可执行脚本或工作流：使用基础设施自动化工具（Ansible、Terraform、自定义脚本）并加入安全防护（试运行模式、爆炸半径限制、审批门控）
4. 将自动化运维手册与告警集成：连接告警与自动修复工作流，使常见问题在不呼叫人员的情况下自愈
5. 持续验证和迭代：定期在预发布环境测试运维手册自动化，追踪平均修复时间（MTTR），随系统演进更新脚本

</details>

## Do

- Do start by automating the simplest and most frequent runbooks first, because quick wins build organizational trust in automation
- Do include blast radius limits in every automated runbook (e.g., only restart 10% of pods at a time), because unconstrained automation can amplify incidents
- Do version-control runbook automation alongside the service code, because runbooks must evolve with the system they remediate
- Do log every automated action with full context, because post-incident review requires a complete audit trail of what the automation did

## Don't

- Don't automate procedures that require human judgment or context-dependent decisions, because automation cannot reason about novel failure modes
- Don't skip dry-run testing of automated runbooks, because an untested automation script in production is more dangerous than a manual runbook
- Don't let auto-remediation mask chronic problems, because repeatedly auto-fixing the same issue hides the need for a proper root cause fix
- Don't build automation without an escalation path, because automation must know when to stop and ask for help rather than retrying indefinitely

## Case Study

**Google**: Google SRE's toil budget principle mandates that SREs spend no more than 50% of their time on operational toil. When the Gmail team found that disk-related alerts accounted for 30% of on-call pages, they automated the entire remediation workflow: detect disk pressure, migrate affected shards, provision new storage, and validate service health -- all without human intervention. This single automation reduced on-call pages by 25% and freed engineers to work on proactive reliability improvements. The success pattern was replicated across Google, with automated runbooks now handling over 60% of common incident types.

## Related Frameworks

- on-call-engineering (complement)
- error-budget-policy (complement)
- slo-as-practice (complement)
- infrastructure-as-code (complement)
- chaos-engineering (complement)

## Source

https://sdframe.caldis.me/frameworks/runbook-automation
