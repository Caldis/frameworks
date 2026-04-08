# On-Call Engineering / 值班工程实践

- **Category**: observability
- **Complexity**: intermediate
- **Quality**: reliability, observability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Google SRE team; systematized by Ben Treynor Sloss, ~2003
- **Adopters**: Google, PagerDuty, Atlassian, Microsoft, Meta

Sustainable on-call practices, escalation paths, and human-centric incident response

_可持续的值班实践、升级路径和以人为中心的事故响应_

## When to Use

Apply this framework when:
- Any production system that requires human response to incidents outside business hours
- Teams experiencing on-call burnout from excessive pages, unclear escalation, or insufficient support
- Organizations transitioning from 'developers throw code over the wall to ops' to shared production ownership
- Growing engineering teams that need to formalize ad-hoc incident response into a scalable system

## When NOT to Use

Stop and reconsider if:
- Internal tools that are only used during business hours and do not require 24/7 incident response
- Very early-stage products with no paying customers where formal on-call adds overhead without proportional benefit
- Fully serverless architectures managed by a cloud provider where the provider handles infrastructure incidents
- Systems where automated remediation handles all known failure modes and human intervention is genuinely unnecessary

## Core Concepts

- Sustainable Rotation: A minimum of 8 engineers per rotation ensures no one is on-call more than 25% of the time, preventing burnout and maintaining response quality
- Escalation Policy: A time-and-severity-based decision tree that routes pages to the right responder and automatically escalates when initial response does not resolve within defined windows
- Blameless Post-Incident Review: A structured analysis of incidents focused on systemic causes, timeline reconstruction, and actionable improvements -- never on assigning individual blame
- On-Call Compensation: Explicit recognition that on-call work is real work deserving compensation (time off, pay), not an invisible tax on engineers' personal time
- Alert Quality: Every alert must be actionable, unique, and linked to a runbook; non-actionable alerts are noise that degrades on-call health and response effectiveness

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying On-Call Engineering to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Design the on-call rotation**: ensure at least 8 people in the rotation for sustainable coverage, with primary and secondary responders and clear handoff procedures
2. **Define escalation policies**: establish time-based escalation (page secondary after 15min, escalate to management after 30min) and severity-based routing
3. **Equip on-call engineers**: provide runbooks for every alert, one-click access to dashboards, and pre-authorized remediation playbooks so responders can act immediately
4. **Conduct blameless post-incident reviews**: after every significant incident, hold a structured retrospective focused on systemic improvements, not individual blame
5. **Measure and improve on-call health**: track pages per shift, false positive rate, MTTR, sleep interruption frequency, and use these metrics to drive toil reduction

<details><summary>中文步骤</summary>

1. 设计值班轮换：确保轮换中至少8人以实现可持续覆盖，设立主值和副值并明确交接流程
2. 定义升级策略：建立基于时间的升级（15分钟后呼叫副值，30分钟后升级到管理层）和基于严重性的路由
3. 为值班工程师提供装备：为每个告警提供运维手册、一键访问仪表盘和预授权的修复手册，使响应者能立即行动
4. 进行无指责的事后回顾：每次重大事故后举行结构化复盘，聚焦系统性改进而非个人指责
5. 度量并改善值班健康度：追踪每班呼叫数、误报率、MTTR、睡眠中断频率，并用这些指标驱动苦力活减少

</details>

## Do

- Do ensure every alert has a linked runbook that tells the responder exactly what to investigate and how to remediate, because alert without context wastes precious incident time
- Do hold blameless post-incident reviews for every significant incident, because systemic improvements only emerge when people feel safe sharing what went wrong
- Do track on-call health metrics (pages per shift, MTTR, sleep interruptions) and set improvement targets, because what you don't measure you cannot improve
- Do provide explicit on-call compensation (extra pay, comp time, reduced next-week workload), because uncompensated on-call drives attrition

## Don't

- Don't have fewer than 8 people in a rotation, because smaller rotations lead to unsustainable on-call frequency and rapid burnout
- Don't tolerate alert noise -- if an alert fires and the on-call ignores it because it is always a false positive, that alert must be fixed or deleted
- Don't skip post-incident reviews for 'small' incidents, because pattern analysis across many small incidents often reveals systemic issues
- Don't put junior engineers on-call without a shadow period and a senior secondary, because unsupported on-call is both ineffective and psychologically harmful

## Case Study

**PagerDuty**: PagerDuty practices what they preach by running their own platform with sophisticated on-call engineering practices. They maintain an 8-person primary rotation with automatic escalation after 5 minutes. Every alert links to a runbook, and non-actionable alerts are tracked as 'noise budget' similar to an error budget. After implementing their on-call health metrics program, they reduced after-hours pages by 40% over 6 months and improved MTTR from 45 minutes to 15 minutes. Their blameless post-incident review process generates an average of 3 systemic improvements per incident, fed directly into sprint planning.

## Related Frameworks

- runbook-automation (complement)
- error-budget-policy (complement)
- slo-as-practice (complement)
- sli-slo-sla (prerequisite)

## Source

https://sdframe.caldis.me/frameworks/on-call-engineering
