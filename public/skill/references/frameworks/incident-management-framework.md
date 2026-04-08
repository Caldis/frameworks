# Incident Management Framework / 事故管理框架

- **Category**: observability
- **Complexity**: intermediate
- **Quality**: reliability, maintainability, usability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Google SRE framework (2003); PagerDuty Incident Response Guide (2016); Atlassian Incident Management handbook (2018)
- **Adopters**: Google, Atlassian, PagerDuty, Stripe, Netflix

Structured incident response process covering detection, triage, resolution, and blameless retrospective

_涵盖检测、分类、解决和无指责复盘的结构化事故响应流程_

## When to Use

Apply this framework when:
- When the team has grown past 5-6 engineers and ad-hoc 'all hands on deck' incident response results in duplicated effort, confused ownership, and unclear resolution
- When post-incident reviews reveal that incidents were resolved slowly because no single person was responsible for coordinating the response
- When customer-facing SLOs are being violated and the organization needs consistent, measurable incident response to reduce MTTR and improve transparency
- When regulatory compliance (SOC 2, ISO 27001, HIPAA) requires documented incident response procedures and evidence of their consistent application

## When NOT to Use

Stop and reconsider if:
- Small startups with fewer than 5 engineers where informal coordination is sufficient and a formal IC structure would add overhead without benefit
- Planned maintenance windows that are not true incidents but may use similar communication channels
- Non-production incidents (development environment failures, CI pipeline outages) that do not affect customers and do not require the full incident response ceremony
- Teams running on a pure infrastructure-as-a-service model with full managed service SLAs where the cloud provider owns incident response for the underlying platform

## Core Concepts

- Incident Commander (IC): The single decision-making authority during an incident who coordinates responders, manages communication, and ensures the response doesn't fragment across multiple competing threads
- Severity Levels (SEV1-SEV4): Standardized impact classification — SEV1 (all users affected, revenue impacted), SEV2 (significant users affected), SEV3 (partial degradation, workaround available), SEV4 (minor impact, monitoring)
- Incident Timeline: A chronological log of every detection, investigation step, action taken, and recovery verification, maintained in real time during the incident to support accurate post-mortem analysis
- Blameless Postmortem: A structured retrospective that identifies systemic factors contributing to an incident without attributing blame to individuals, producing specific, actionable improvements
- On-Call Handoff: A standardized briefing given at shift change during long-running incidents to transfer context, current status, and next actions from the outgoing to the incoming responder

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Incident Management Framework to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Establish incident severity levels (SEV1-SEV4) with explicit criteria (user impact, revenue risk, data loss) and associated response time SLAs so that all engineers classify incidents consistently
2. **Define the Incident Commander role**: one person owns the incident, coordinates responders, manages external communication, and prevents parallel investigation threads from fragmenting focus
3. **Follow the five-phase response cycle**: Detect (alert fires or user report), Triage (confirm severity and assemble responders), Investigate (identify scope and root cause), Resolve (apply fix and verify recovery), and Retrospect (blameless post-incident review)
4. Maintain a live incident timeline in a shared document (PagerDuty, Slack incident channel, Confluence) throughout the incident, recording every action with a timestamp so that the timeline is accurate for the post-mortem
5. Conduct a blameless post-incident review within 5 business days using the five-whys method, identifying systemic contributing factors, and committing to a specific set of action items with owners and due dates

<details><summary>中文步骤</summary>

1. 建立具有明确标准（用户影响、收入风险、数据丢失）和相关响应时间SLA的事故严重性级别（SEV1-SEV4），使所有工程师一致地分类事故
2. 定义事故指挥官角色：一个人拥有事故、协调响应者、管理外部沟通，并防止并行调查线程分散注意力
3. 遵循五阶段响应周期：检测（告警触发或用户报告）、分类（确认严重性并集合响应者）、调查（识别范围和根本原因）、解决（应用修复并验证恢复），以及复盘（无指责事后审查）
4. 在整个事故期间在共享文档（PagerDuty、Slack事故频道、Confluence）中维护实时事故时间线，记录每个带时间戳的行动，以便时间线对事后分析准确
5. 在5个工作日内使用五个为什么方法进行无指责事后审查，识别系统性促成因素，并承诺具有所有者和截止日期的特定行动项目集

</details>

## Do

- Do designate a single Incident Commander who owns the incident end-to-end and has authority to make decisions, even if they are not the most technically expert person in the room
- Do open a dedicated incident Slack channel (or equivalent) immediately upon declaration so that all communication is centralized and the audit trail is preserved
- Do conduct post-incident reviews for every SEV1 and SEV2, and a representative sample of SEV3 incidents, because the patterns in lower-severity incidents predict future SEV1s
- Do track action items from post-mortems in the same project management system as product work and report on their completion rate to leadership quarterly

## Don't

- Don't allow incidents to proceed without a declared Incident Commander because uncoordinated responses cause duplicate work, missed steps, and confused external communication
- Don't delay the post-mortem beyond 5 business days because memory of the incident details fades quickly and the urgency to fix contributing factors dissipates
- Don't use post-mortems to assign individual blame because blame suppresses honest reporting of mistakes, which is the primary source of learning in incident response
- Don't close action items from post-mortems without evidence of completion because unclosed action items are the primary driver of recurring incidents

## Case Study

**Atlassian**: Atlassian experienced a major outage in April 2022 affecting over 400 enterprise customers for up to two weeks. In its public post-mortem, Atlassian documented how its incident management framework was stress-tested at an unprecedented scale. The company credited its Incident Commander model with preventing fragmented response across multiple time zones and teams. The post-mortem identified that an automated script executed a deletion command on a wider scope than intended, and that multiple safeguards failed simultaneously. Atlassian published 8 specific engineering improvements with owners and completion dates, setting a new standard for transparent enterprise incident communication.

## Related Frameworks

- blameless-postmortems (complement)
- runbook-automation (complement)
- on-call-rotation-design (complement)

## Source

https://sdframe.caldis.me/frameworks/incident-management-framework
