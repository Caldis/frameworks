# Team Topologies / 团队拓扑

- **Category**: evolution
- **Complexity**: intermediate
- **Quality**: maintainability, scalability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Matthew Skelton & Manuel Pais, 2019, 2013
- **Adopters**: Adidas, PureGym, uSwitch, Nationwide Building Society, Condé Nast

Four team types and three interaction modes for fast, sustainable software delivery

_通过四种团队类型与三种交互模式实现快速可持续的软件交付_

## When to Use

Apply this framework when:
- Scaling engineering from 3-5 teams to 10+ teams and needing a coherent organizational model
- Reducing cross-team dependencies that are slowing down delivery across multiple product streams
- Designing a platform engineering organization to support self-service developer experience
- Diagnosing cognitive overload in teams that own too many domains or too much infrastructure

## When NOT to Use

Stop and reconsider if:
- Organizations with fewer than 3 teams — the overhead of formal topology classification is not justified
- Teams that are fully cross-functional and self-sufficient with no cognitive load issues
- Short-term project-based work where teams disband after delivery
- The organizational culture resists any form of team classification or prescribed interaction modes

## Core Concepts

- Stream-aligned team: The primary team type, organized around a flow of work from a business domain or user journey
- Platform team: Provides self-service internal capabilities that reduce cognitive load for stream-aligned teams
- Enabling team: Helps stream-aligned teams adopt new technologies or practices, then steps back
- Complicated-subsystem team: Owns components requiring deep specialist knowledge that would overload a stream-aligned team
- Cognitive load: The core constraint — team topology must be designed to keep each team's cognitive load manageable

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Team Topologies to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Classify all existing teams into the four types: Stream-aligned, Platform, Enabling, Complicated-subsystem
2. **Identify current interaction modes**: Collaboration, X-as-a-Service, or Facilitating
3. Detect anti-patterns such as overloaded stream-aligned teams or absent platform teams
4. Redesign team interactions to minimize cognitive load and maximize flow for stream-aligned teams
5. Set trigger conditions (team size, cognitive load signals) for evolving team topology over time

<details><summary>中文步骤</summary>

1. 将现有团队分类为四种类型：流式对齐团队、平台团队、赋能团队、复杂子系统团队
2. 识别当前交互模式：协作、X即服务或促进
3. 检测反模式，如过载的流式对齐团队或缺失的平台团队
4. 重新设计团队交互方式，最小化认知负荷，最大化流式对齐团队的交付流
5. 设定触发条件（团队规模、认知负荷信号），驱动团队拓扑随时间持续演进

</details>

## Do

- Start by assessing each team's cognitive load — this is the fundamental constraint to optimize for
- Ensure most teams are stream-aligned — platform and enabling teams exist to support them, not the reverse
- Define explicit interaction modes between every pair of teams and review them quarterly
- Use team topology evolution triggers (growing team size, rising lead time) to know when to restructure

## Don't

- Don't create platform teams too early — wait until the need is clear from cognitive load signals
- Don't let enabling teams become permanent dependencies — they should upskill and move on
- Don't force-fit every team into one of four types — some teams may be transitioning between types
- Don't apply the framework without executive buy-in — team topology changes require organizational authority

## Case Study

**Adidas**: Adidas adopted Team Topologies to restructure their engineering organization during their digital transformation in 2020. They reorganized over 30 teams into stream-aligned squads mapped to customer journeys (browse, purchase, returns), supported by a platform team providing a shared Kubernetes-based developer platform. The restructuring reduced their average lead time for changes from weeks to days and eliminated most cross-team handoffs that had been blocking releases.

## Related Frameworks

- conways-law (complement)
- inverse-conway-maneuver (complement)
- calms-framework (complement)
- spotify-model (alternative)
- amazon-two-pizza-teams (alternative)

## Source

https://sdframe.caldis.me/frameworks/team-topologies
