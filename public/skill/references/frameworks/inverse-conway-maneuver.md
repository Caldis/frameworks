# Inverse Conway Maneuver / 逆康威策略

- **Category**: evolution
- **Complexity**: advanced
- **Quality**: maintainability, scalability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Jonny LeRoy & Matt Simons, 2010
- **Adopters**: ING Bank, Adidas, Spotify, Zalando, Sky UK

Deliberately restructure teams to produce the desired system architecture

_主动重组团队结构，以引导产出期望的系统架构_

## When to Use

Apply this framework when:
- Transitioning from a monolith to microservices and needing teams aligned to service boundaries
- Building a new platform layer and forming a dedicated platform team before writing platform code
- Merging two acquired companies and designing a unified architecture through deliberate team composition
- Preparing for a major scale-up where the current org structure will produce the wrong architecture

## When NOT to Use

Stop and reconsider if:
- The organization is too small for team structure to meaningfully constrain architecture
- Leadership is unwilling to make organizational changes — the maneuver requires real restructuring
- The target architecture is not yet well understood — restructuring teams around a vague blueprint is wasteful
- The existing architecture is working well and there is no strategic need to change it

## Core Concepts

- Prescriptive org design: Intentionally shape team structure to produce the desired software architecture
- Team-first architecture: Design teams before designing systems — the org chart is the first architecture diagram
- Bounded ownership: Each team owns a well-defined architectural component with clear API boundaries
- Architecture blueprint: The target architecture serves as the template for team structure, not the other way around
- Feedback loop: Continuously verify that the code structure emerging from team interactions matches the target architecture

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Inverse Conway Maneuver to?
- What constraints or existing architecture do you need to work within?
- Has your team used Inverse Conway Maneuver before? (This is an advanced framework)

## Implementation Steps

1. Define the target software architecture (e.g., bounded microservices, platform layers)
2. Model teams around the desired architecture boundaries before writing any new code
3. **Establish clear team APIs**: explicit ownership, stable interfaces, and interaction modes
4. Spin up new teams or reorganize existing ones to align with the architecture blueprint
5. Monitor whether the emerging code structure matches the intended architecture over 2-3 quarters

<details><summary>中文步骤</summary>

1. 定义目标软件架构（如：有界微服务、平台层次）
2. 在编写任何新代码之前，围绕期望的架构边界进行团队建模
3. 建立清晰的团队 API：明确所有权、稳定接口和交互模式
4. 新建团队或重组现有团队，使其与架构蓝图对齐
5. 在 2-3 个季度内监控涌现的代码结构是否符合预期架构

</details>

## Do

- Start with a clear target architecture diagram before touching the org chart
- Get executive sponsorship — org restructuring requires top-down support to succeed
- Pair the maneuver with Team Topologies to provide a concrete vocabulary for team types and interactions
- Monitor team health and delivery metrics for 2-3 quarters after restructuring to verify results

## Don't

- Don't restructure teams without a clearly defined target architecture — you'll just create different chaos
- Don't ignore the human impact — frequent reorgs destroy morale if not handled with empathy and clarity
- Don't expect instant results — it takes 2-3 quarters for the new structure to produce architectural change
- Don't forget to also change tooling and processes — team structure alone won't fix misaligned CI/CD pipelines

## Case Study

**ING Bank**: ING Bank Netherlands applied the Inverse Conway Maneuver in 2015 when they restructured their IT organization from project-based teams into autonomous squads and tribes aligned with customer journeys. Each squad owned a specific microservice domain end-to-end. Within two years, their deployment frequency increased from quarterly releases to multiple deployments per day, and their architecture naturally evolved from a tangled monolith into well-bounded services.

## Related Frameworks

- conways-law (extends)
- team-topologies (complement)
- microservices-decomposition (complement)

## Source

https://sdframe.caldis.me/frameworks/inverse-conway-maneuver
