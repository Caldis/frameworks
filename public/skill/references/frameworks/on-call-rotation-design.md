# On-Call Rotation Design / 值班轮换设计

- **Category**: team
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: SRE practices (Google, 2003); PagerDuty escalation model (2010); Charity Majors and Alice Goldfuss advocacy for sustainable on-call
- **Adopters**: Google, Netflix, Stripe, Atlassian, PagerDuty

Fair, sustainable on-call schedules and escalation policies that protect engineer wellbeing

_保护工程师福祉的公平、可持续值班计划和升级策略_

## When to Use

Apply this framework when:
- When a service has production SLOs that require human intervention within minutes and must be monitored 24/7
- When the team is growing past 6-8 engineers and informal 'ping the person who built it' escalation is creating burnout for individual contributors
- When incident response times are inconsistent because there is no defined first-responder and anyone might respond (or no one does)
- When on-call burn rate is causing attrition and engineers cite on-call burden as a primary reason for leaving the organization

## When NOT to Use

Stop and reconsider if:
- Internal tooling or development services with no user-facing SLOs where an 8x5 support model with next-business-day response is acceptable
- Services in early development where stability is not yet expected and alerting produces more noise than signal
- Teams of fewer than 4 engineers where sustainable rotation is impossible and alternative architectures (using managed services to reduce operational burden) should be prioritized
- Non-critical internal services where the cost of a 24/7 on-call rotation exceeds the cost of occasional downtime

## Core Concepts

- Primary and Secondary On-Call: A two-tier model where primary handles the initial alert and secondary acts as backup if primary doesn't acknowledge within the timeout period
- Escalation Policy: A defined sequence of contacts and timeouts that ensure an alert is never silently dropped — it always reaches a human who can act on it
- MTTA and MTTR: Mean Time to Acknowledge (MTTA) measures responsiveness; Mean Time to Resolve (MTTR) measures effectiveness; both are tracked per on-call rotation
- Alert Fatigue: The cumulative effect of too many low-signal alerts that trains responders to ignore pages, leading to missed critical incidents
- Sustainable On-Call: The principle that on-call should consume less than 25% of an engineer's working time (SRE guideline) to allow focus on improvement work

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying On-Call Rotation Design to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define the service ownership scope for the on-call rotation: which services, alerts, and runbooks belong to the on-call engineer and what constitutes a page-worthy incident
2. **Design the rotation schedule**: determine the rotation length (weekly is most common), the number of engineers in the pool (minimum 4-6 to allow reasonable frequency), and whether a secondary on-call provides backup
3. **Set escalation policies**: define how long the primary on-call has to acknowledge an alert before it escalates to the secondary, and from secondary to team lead, with explicit timeouts
4. Establish on-call compensation and working norms: time-off in lieu (TOIL) for disturbed nights, a hard limit on night pages per on-call shift, and a mandatory rest period after a severe incident
5. Run a quarterly on-call retrospective reviewing alert volume, false positive rate, mean time to acknowledge (MTTA), and engineer satisfaction to drive continuous improvement

<details><summary>中文步骤</summary>

1. 定义值班轮换的服务所有权范围：哪些服务、告警和运行手册属于值班工程师，什么构成值得呼叫的事件
2. 设计轮换计划：确定轮换长度（每周最为常见）、轮换池中的工程师数量（至少4-6人以保证合理频率），以及是否由二线值班提供备份
3. 设定升级策略：定义一线值班工程师在告警升级到二线之前有多长时间确认，以及从二线升级到团队负责人的时间，包含明确的超时时间
4. 建立值班补偿和工作规范：因被打扰的夜晚给予调休（TOIL），每个值班班次的夜间呼叫硬性上限，以及严重事故后的强制休息期
5. 运行季度值班回顾，审查告警量、误报率、平均确认时间（MTTA）和工程师满意度，以推动持续改进

</details>

## Do

- Do ensure the on-call rotation pool has at least 4-6 engineers so that no individual is on-call more than one week in four
- Do compensate engineers for on-call time through explicit pay, time-off in lieu, or reduced sprint commitments because unpaid on-call creates resentment and attrition
- Do conduct post-incident reviews for every severity-1 incident and track the actionable improvements through to completion to prevent recurring pages
- Do set a maximum number of night pages per on-call shift (e.g., 5 per week) as a hard organizational commitment, not a guideline

## Don't

- Don't put engineers on-call for services they didn't build and haven't been properly trained on because it creates dangerous guesswork during incidents
- Don't treat on-call as a rite of passage or proof of seniority because it normalizes unsustainable practices and drives away excellent engineers who have alternatives
- Don't ignore alert volume as a metric because teams that normalize high alert volumes are training themselves for alert fatigue and missed critical incidents
- Don't allow on-call engineers to stay on a page without escalation indefinitely; set hard timeouts because delayed escalation extends incident duration

## Case Study

**Google SRE**: Google's Site Reliability Engineering team codified on-call best practices that became the industry standard. Their model limits on-call burden to 25% of an SRE's working time (including both the on-call shift and follow-up work), with the remainder dedicated to engineering improvements. Google's SRE book documented that when on-call load exceeded 25%, SRE teams experienced measurable increases in burnout, errors, and attrition. The escalation policy model — primary acknowledges within 5 minutes or secondary is paged, secondary within 10 minutes or management is called — has been adopted by PagerDuty, Opsgenie, and Incident.io as the default template for new customers.

## Related Frameworks

- blameless-postmortems (complement)
- runbook-automation (complement)
- engineering-metrics-dashboard (complement)

## Source

https://sdframe.caldis.me/frameworks/on-call-rotation-design
