# Architecture Review Board (ARB) / 架构评审委员会

- **Category**: team
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Enterprise architecture tradition; modernized by ThoughtWorks Technology Radar approach (~2010), 1995
- **Adopters**: Spotify, Google, ThoughtWorks, Capital One, Zalando

A governance body that reviews and guides significant architectural decisions to ensure consistency, quality, and strategic alignment

_审查和指导重大架构决策的治理机构，确保一致性、质量和战略对齐_

## When to Use

Apply this framework when:
- Organizations with 10+ teams where architectural consistency across services is critical
- Environments where costly architectural mistakes (wrong database choice, incompatible API styles) have occurred repeatedly
- Regulated industries where architectural decisions need documented rationale for compliance audits
- Growing organizations transitioning from a single architect to distributed architectural decision-making

## When NOT to Use

Stop and reconsider if:
- Small teams (under 3 teams) where informal architectural discussions in standups or Slack are sufficient
- Fast-moving startups where the overhead of formal reviews would slow down critical time-to-market
- Organizations with a single technology stack where architectural decisions are inherently constrained
- Teams practicing extreme programming with emergent architecture that resists up-front architectural planning

## Core Concepts

- Advisory not gatekeeping: Modern ARBs advise and influence rather than approve or block — they provide guardrails, not gates
- Architecture Decision Records (ADRs): Lightweight documents capturing the context, decision, and consequences of each significant architectural choice
- Rotating membership: Including engineers from delivery teams prevents the ARB from becoming disconnected from implementation reality
- Decision scope: The ARB only reviews decisions above a defined threshold (cross-team impact, new technology, security implications), not every design choice
- Organizational memory: Published ADRs create a searchable history of why architectural decisions were made, preventing repeated debates

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Architecture Review Board (ARB) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Charter the ARB with a clear mandate**: which decisions require review (e.g., new services, technology introductions, major API changes)
2. Compose the board with senior architects and rotating members from stream-aligned teams to avoid ivory-tower syndrome
3. Define a lightweight submission process (RFC or Architecture Decision Record) that teams complete before the review
4. Conduct reviews as collaborative design sessions, not approval gates — the ARB advises, teams decide
5. Publish all decisions and rationale transparently to build organizational architectural knowledge

<details><summary>中文步骤</summary>

1. 为 ARB 制定明确的章程：哪些决策需要评审（如新服务、引入新技术、重大 API 变更）
2. 由资深架构师和来自面向价值流团队的轮换成员组成委员会，避免象牙塔综合症
3. 定义轻量级的提交流程（RFC 或架构决策记录），团队在评审前完成
4. 将评审作为协作设计会议而非审批关卡——ARB 提供建议，团队做出决定
5. 透明发布所有决策和理由，构建组织的架构知识

</details>

## Do

- Keep the review process lightweight — a one-page ADR template is better than a 30-slide architecture deck
- Include rotating members from delivery teams so the ARB stays grounded in real-world implementation constraints
- Publish all ADRs and review outcomes transparently so the entire organization benefits from the architectural reasoning
- Define clear criteria for what requires ARB review and what does not, to avoid becoming a bottleneck

## Don't

- Don't let the ARB become an ivory tower that dictates architecture without understanding delivery realities
- Don't require ARB approval for every technical decision — focus only on high-impact, cross-cutting choices
- Don't staff the ARB exclusively with senior architects — include hands-on engineers who write code daily
- Don't make the ARB a veto gate — if it blocks teams without offering alternatives, it destroys autonomy and trust

## Case Study

**Spotify**: Spotify evolved its architectural governance from a traditional ARB to a more collaborative model around 2016. Instead of a central board that approved or rejected designs, they established 'System Owners' — senior engineers who owned specific architectural domains (data platform, messaging, etc.) and reviewed ADRs asynchronously via pull requests. Any engineer could propose an architectural change by opening an ADR PR and tagging relevant system owners. This approach reduced review latency from weeks to days, increased the number of architecturally significant decisions documented by 4x, and maintained consistency without creating bottlenecks — a model later reinforced by Team Topologies' concept of enabling teams.

## Related Frameworks

- conways-law (complement)
- technical-debt-management-framework (complement)
- team-topologies (complement)
- continuous-architecture (complement)

## Source

https://sdframe.caldis.me/frameworks/architecture-review-board
