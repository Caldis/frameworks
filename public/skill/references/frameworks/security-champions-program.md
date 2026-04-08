# Security Champions Program / 安全冠军计划

- **Category**: security
- **Complexity**: intermediate
- **Quality**: security
- **Abstraction**: organization
- **Maturity**: established
- **Author**: OWASP Security Champions Playbook; popularized by companies like Spotify and Nokia, 2011
- **Adopters**: Spotify, Nokia, SAP, Etsy, ING Bank

Embedding security advocates within development teams

_在开发团队中嵌入安全倡导者_

## When to Use

Apply this framework when:
- When the central security team cannot scale to review every feature and service across dozens of engineering teams
- When DevSecOps adoption requires security knowledge to be distributed into engineering teams rather than bottlenecked through a security gate
- When security training completion rates are low and developers lack actionable security guidance relevant to their day-to-day work
- When recurring security vulnerabilities in the same categories suggest that developers lack immediate access to security expertise during development

## When NOT to Use

Stop and reconsider if:
- Very small engineering teams (under 10 engineers) where the entire team can be trained in security and a dedicated champion role is redundant
- Organizations where developers are already deeply security-aware and the central security team is well-staffed enough to review all features
- When leadership will not allocate dedicated time for champion activities because an underfunded program creates false assurance without real security improvement
- Crisis response situations where immediate security remediation is needed and building a long-term program is not the priority

## Core Concepts

- Distributed security: embedding security responsibility within each engineering team rather than centralizing it in a security silo, matching security coverage to development velocity
- Security advocate: a developer who acts as a security liaison between their engineering team and the central security organization, bridging the cultural and knowledge gap
- Shift-left: catching security issues during design and development rather than at a final security review gate, reducing remediation cost and time-to-fix
- Community of practice: a cross-team network of security champions who share knowledge, patterns, and tooling, multiplying the impact of the central security team

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Security Champions Program to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify and recruit volunteer security champions from existing engineering teams — target developers with security curiosity rather than requiring prior expertise, aiming for at least one champion per team or squad
2. Define the security champion role with clear expectations: attend monthly security training, perform lightweight threat modeling on their team's new features, triage security findings from SAST/DAST tools, and serve as the first point of contact for security questions
3. Build a security champions community with regular meetings, a dedicated communication channel, and recognition programs so champions feel supported by the central security team and incentivized to continue
4. Equip champions with tooling and training: access to vulnerability databases, secure coding guidelines, threat modeling templates, and a direct escalation path to the security team for complex issues
5. Measure program effectiveness through metrics: number of security issues caught pre-production per team, champion participation rates, training completion, and reduction in security debt over time

<details><summary>中文步骤</summary>

1. 从现有工程团队中识别并招募自愿的安全冠军——针对有安全好奇心的开发者，而非要求具备先验专业知识，目标是每个团队或小队至少有一名冠军
2. 以明确期望定义安全冠军角色：参加每月安全培训、对团队新功能进行轻量级威胁建模、分类SAST/DAST工具的安全发现，以及作为安全问题的第一联系人
3. 通过定期会议、专用通信渠道和认可计划建立安全冠军社区，使冠军感受到中心安全团队的支持并有动力继续
4. 为冠军提供工具和培训：访问漏洞数据库、安全编码指南、威胁建模模板，以及针对复杂问题直接上报安全团队的渠道
5. 通过指标衡量计划效果：每个团队在生产前发现的安全问题数量、冠军参与率、培训完成情况以及安全债务随时间的减少

</details>

## Do

- Do make the security champion role voluntary and recognized because mandatory, unrecognized security responsibilities demotivate developers and produce nominal participation
- Do give champions dedicated time (10-20% of a sprint) for security activities because security work that competes with feature delivery will always lose without protected time
- Do keep champions updated on the current threat landscape because stale security knowledge leads to champions advocating for outdated controls
- Do measure the program impact with concrete metrics and share them with leadership because visible ROI protects the program from cost-cutting when budgets tighten

## Don't

- Don't treat champions as free security auditors who must review every pull request because this burns out champions and creates the same bottleneck as the central security team
- Don't run the program without central security team support because champions need escalation paths, training, and recognition — an unsupported champion quickly becomes a former champion
- Don't make champions responsible for fixing all security bugs in their team because ownership should be with the engineer who introduced the bug, not the security champion
- Don't neglect champion turnover planning because when a champion leaves the team their security knowledge leaves with them; maintain a succession pipeline

## Case Study

**Spotify**: Spotify's security champions program grew to over 400 champions across 150+ engineering squads by 2020. Each chapter (domain group) has at least one champion trained in threat modeling, secure code review, and dependency vulnerability management. Champions run quarterly threat modeling sessions for new features and triage SAST findings from their automated security scanning pipeline. Spotify's security team reports that the program reduced the time from vulnerability discovery to patch from an average of 45 days to under 10 days, with champions resolving 70% of findings without central security team involvement.

## Related Frameworks

- security-by-design (complement)
- threat-modeling-stride (complement)
- owasp-top-10 (complement)
- defense-in-depth (complement)

## Source

https://sdframe.caldis.me/frameworks/security-champions-program
