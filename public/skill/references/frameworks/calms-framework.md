# CALMS Framework / CALMS框架

- **Category**: deployment
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Jez Humble & John Willis, 2010, 2008
- **Adopters**: ING Bank, Target, Ticketmaster, Nordstrom, Nationwide Insurance

Five DevOps pillars: Culture, Automation, Lean, Measurement, Sharing

_DevOps五大支柱：文化、自动化、精益、度量、共享_

## When to Use

Apply this framework when:
- Organizations beginning a DevOps adoption that need a holistic assessment framework beyond just tools
- Teams evaluating their DevOps maturity across cultural, technical, and process dimensions
- Change agents building a business case for DevOps transformation by identifying gaps in all five pillars
- Post-incident reviews seeking root causes that span culture, process, and tooling rather than just technical failures

## When NOT to Use

Stop and reconsider if:
- Organizations looking for a purely technical deployment framework rather than an organizational change model
- Teams that need specific prescriptive practices rather than a high-level assessment framework
- Environments where leadership is unwilling to address cultural issues and only wants tool-level changes
- Very small teams (2-3 people) where silos don't exist and formal frameworks add unnecessary overhead

## Core Concepts

- Culture: Fostering shared responsibility between development and operations through blameless post-mortems, joint on-call, and cross-functional team structures
- Automation: Eliminating manual, error-prone processes in build, test, deployment, and infrastructure provisioning to increase speed and reliability
- Lean: Applying lean manufacturing principles like value-stream mapping, WIP limits, and waste elimination to software delivery workflows
- Measurement: Collecting and acting on metrics across delivery performance, system health, and business outcomes to enable data-driven decisions
- Sharing: Breaking knowledge silos through internal tech talks, shared runbooks, post-incident reports, and cross-team collaboration tools

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying CALMS Framework to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Culture**: break down dev/ops silos, establish shared ownership and blameless post-mortems
2. **Automation**: automate build, test, deploy, and infrastructure provisioning pipelines
3. **Lean**: apply value-stream mapping to identify and eliminate workflow bottlenecks
4. **Measurement**: define and collect metrics across delivery, reliability, and business outcomes
5. **Sharing**: create internal knowledge bases, runbooks, and cross-team learning sessions

<details><summary>中文步骤</summary>

1. 文化：打破开发/运维壁垒，建立共同责任制和无责任事后回顾机制
2. 自动化：自动化构建、测试、部署及基础设施供应流水线
3. 精益：运用价值流图识别并消除工作流程中的瓶颈
4. 度量：定义并收集交付、可靠性和业务成果的指标
5. 共享：建立内部知识库、运维手册，开展跨团队学习交流

</details>

## Do

- Do start with Culture assessment before investing in tools, because automation without cultural change creates cargo-cult DevOps
- Do measure both technical metrics (DORA) and cultural indicators (employee satisfaction, collaboration frequency) for a complete picture
- Do treat the five pillars as interconnected rather than sequential, because weaknesses in one pillar undermine gains in others
- Do use CALMS as a periodic health check rather than a one-time assessment, because organizational maturity evolves continuously

## Don't

- Don't reduce DevOps to just Automation while ignoring Culture and Sharing, because tools alone cannot solve collaboration problems
- Don't implement blameless post-mortems in name only while still punishing engineers for incidents, because the hypocrisy destroys trust
- Don't skip the Lean pillar, because without value-stream analysis you automate waste instead of eliminating it
- Don't treat Sharing as optional documentation -- make it active knowledge transfer through pairing, rotations, and internal conferences

## Case Study

**ING Bank**: ING Bank Netherlands used the CALMS framework to guide their large-scale agile and DevOps transformation starting in 2015. They reorganized 3,500 employees into cross-functional squads and tribes (Culture), built a unified CI/CD platform (Automation), adopted Kanban boards with WIP limits (Lean), implemented DORA metrics dashboards (Measurement), and created an internal engineering blog and guild system (Sharing). Within three years, their release cycle went from quarterly to multiple times per day.

## Related Frameworks

- three-ways-devops (complement)
- dora-metrics (complement)
- team-topologies (complement)

## Source

https://sdframe.caldis.me/frameworks/calms-framework
