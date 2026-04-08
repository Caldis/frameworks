# Self-Healing Systems Pattern / 自愈系统模式

- **Category**: ai
- **Complexity**: advanced
- **Quality**: reliability, observability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: IBM (Autonomic Computing Manifesto), 2001; modern AI-ops formalized by PagerDuty and Shoreline.io, 2022
- **Adopters**: Shoreline.io, PagerDuty, Datadog, Netflix (auto-remediation in Spinnaker), Amazon (AWS Systems Manager)

Use AI agents to detect, diagnose, and remediate failures

_利用 AI 代理自动检测、诊断并修复系统故障_

## When to Use

Apply this framework when:
- Large-scale distributed systems where manual incident response cannot keep pace with failure frequency
- Cloud-native environments with well-instrumented observability stacks (metrics, logs, traces)
- On-call rotation optimization -- automating known, low-risk fixes to reduce alert fatigue
- Infrastructure with predictable failure patterns (disk full, OOM, certificate expiry) suited to automated runbooks

## When NOT to Use

Stop and reconsider if:
- Novel, never-before-seen failure modes where no runbook exists and human judgment is essential
- Small-scale systems where manual remediation is fast enough and the automation overhead isn't justified
- Environments with poor observability -- self-healing requires high-quality signals to diagnose correctly
- Compliance environments where every remediation action must be pre-approved by a human

## Core Concepts

- Autonomic Loop: The self-healing cycle of Monitor, Analyze, Plan, Execute (MAPE-K) from IBM's autonomic computing vision
- Runbook Automation: Codified operational procedures that an AI agent can execute to resolve known failure classes
- Signal Correlation: Aggregating metrics, logs, and traces to identify root causes rather than reacting to individual alerts
- Blast Radius Assessment: Evaluating the potential impact of an automated remediation action before executing it
- Incident Triple: A (failure, action, outcome) record used to evaluate remediation effectiveness and improve the system

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Self-Healing Systems Pattern to?
- What constraints or existing architecture do you need to work within?
- Has your team used Self-Healing Systems Pattern before? (This is an advanced framework)

## Implementation Steps

1. Instrument the system with rich structured logs, metrics, and health-check endpoints
2. Deploy a monitoring agent that correlates signals and classifies failure modes
3. Maintain a runbook knowledge base the agent uses to select remediation actions
4. Execute low-risk remediations automatically; escalate high-risk ones for human approval
5. Record every incident-action-outcome triple to continuously improve the runbook

<details><summary>中文步骤</summary>

1. 为系统配备丰富的结构化日志、指标和健康检查端点
2. 部署监控代理，关联信号并分类故障模式
3. 维护运维手册知识库供代理选择修复动作
4. 自动执行低风险修复操作；将高风险操作升级至人工审批
5. 记录每次故障-动作-结果三元组，持续完善运维手册

</details>

## Do

- Start with well-understood, low-risk remediations (restart service, scale out, clear cache) before automating complex fixes
- Require human approval for destructive or high-blast-radius actions even in automated pipelines
- Record all automated actions with full context for post-incident review and auditing
- Continuously update runbooks based on incident-action-outcome data to improve future remediation

## Don't

- Don't automate remediations you haven't manually validated -- an untested runbook can make incidents worse
- Don't suppress alerts when automation kicks in -- operators need visibility into what's being auto-remediated
- Don't deploy self-healing without a kill switch -- you must be able to disable automation instantly
- Don't conflate symptom treatment with root cause resolution -- restarting a crashing service is a bandaid, not a fix

## Case Study

**Shoreline.io**: Shoreline.io built an AI-driven auto-remediation platform that integrates with PagerDuty and Datadog to automatically diagnose and fix infrastructure issues. When a disk-full alert fires, Shoreline's agent identifies the offending log files, archives them, and clears space -- all within 30 seconds. Customers reported an 80% reduction in mean time to remediation (MTTR) for their top 20 most frequent incident types.

## Related Frameworks

- chaos-engineering (complement)
- circuit-breaker-pattern (extends)
- agent-reliability-patterns (complement)

## Source

https://sdframe.caldis.me/frameworks/self-healing-systems
