# Blameless Postmortems / 无指责事后复盘

- **Category**: team
- **Complexity**: beginner
- **Quality**: reliability, maintainability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: John Allspaw, 2012; rooted in Sidney Dekker's Just Culture and safety science, 2004
- **Adopters**: Etsy, Google, PagerDuty, Netflix, Atlassian

Conduct structured incident reviews focused on systemic learning rather than individual blame

_进行结构化的事故复盘，聚焦于系统性学习而非个人指责_

## When to Use

Apply this framework when:
- After any production incident that caused user impact or SLA breach, regardless of severity
- Organizations trying to build a learning culture where engineers feel safe to take risks and report failures
- Teams experiencing repeated incidents from the same root causes, indicating failure to learn from past events
- Environments transitioning from a blame-oriented culture that suppresses incident reporting

## When NOT to Use

Stop and reconsider if:
- Incidents caused by deliberate malicious action (security breaches) where accountability, not blamelessness, is the appropriate response
- Organizations where leadership has not genuinely committed to blame-free culture — superficial adoption breeds cynicism
- Trivial issues that do not warrant the overhead of a formal postmortem process (use lightweight retros instead)
- Contexts where regulatory compliance requires formal root cause attribution to specific individuals or roles

## Core Concepts

- Blamelessness: The explicit agreement that individuals will not be punished for honest mistakes — this is what makes people willing to share the full truth about what happened
- Systems thinking: Incidents are caused by systemic factors (missing guardrails, poor observability, flawed processes), not individual failures
- Counterfactual reasoning avoidance: Avoid 'if only X had done Y' statements — they are unfalsifiable and prevent systemic improvement
- Action items over apologies: The postmortem's value is measured by the quality and completion rate of remediation items, not by who apologized
- Organizational memory: Published postmortems become a searchable knowledge base that prevents institutional amnesia about past incidents

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Blameless Postmortems to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Document the incident timeline with objective facts: what happened, when, and what actions were taken
2. Gather all participants and stakeholders for a facilitated review within 48 hours of incident resolution
3. Analyze contributing factors using techniques like the '5 Whys' or fault tree analysis, focusing on systems not individuals
4. Identify actionable remediation items with clear owners and deadlines, prioritized by impact
5. Publish the postmortem internally for organizational learning and track remediation completion

<details><summary>中文步骤</summary>

1. 用客观事实记录事故时间线：发生了什么、何时发生、采取了什么行动
2. 在事故解决后 48 小时内召集所有参与者和利益相关者进行有引导的复盘
3. 使用「5 个为什么」或故障树分析等技术分析促成因素，关注系统而非个人
4. 识别可执行的补救项，明确负责人和截止日期，按影响优先排序
5. 在组织内部发布事后复盘报告以促进学习，并跟踪补救完成情况

</details>

## Do

- Facilitate the postmortem with a neutral party who was not directly involved in the incident
- Document the timeline with precise timestamps and objective facts before the meeting to ground the discussion
- Follow up rigorously on action items — a postmortem without completed remediation is organizational theater
- Celebrate postmortems as learning events, not punishment rituals — some teams award 'best postmortem' recognition

## Don't

- Don't allow the postmortem to devolve into finger-pointing — the facilitator must redirect 'who' questions to 'what' and 'why' questions
- Don't skip the postmortem for 'small' incidents — small failures are the cheapest learning opportunities
- Don't let action items languish in a backlog forever — set deadlines and review completion weekly
- Don't confuse blameless with accountability-free — the process is blame-free, but systemic issues must still be fixed

## Case Study

**Etsy**: Etsy, under CTO John Allspaw (2011-2015), became the poster child for blameless postmortems in software engineering. When a database engineer accidentally dropped a production table in 2012, instead of punishment, Allspaw facilitated a blameless postmortem that revealed the deployment tooling lacked safeguards against destructive operations. The resulting action items — adding confirmation prompts, read-only replicas for queries, and automated backups — prevented similar incidents. Allspaw published the approach on Etsy's engineering blog, and it became the foundation for modern incident management practices industry-wide. Etsy reported that their incident recurrence rate dropped by over 50% within a year of adopting consistent blameless postmortems.

## Related Frameworks

- technical-debt-management-framework (complement)
- developer-experience-framework (complement)
- team-topologies (complement)

## Source

https://sdframe.caldis.me/frameworks/blameless-postmortems
