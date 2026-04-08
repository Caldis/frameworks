# Conway's Law / 康威定律

- **Category**: evolution
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: foundational
- **Author**: Melvin Conway, 1967
- **Adopters**: Microsoft, Amazon, Spotify, Netflix, ThoughtWorks

Systems mirror the communication structure of the organizations that build them

_系统的结构反映构建它的组织的沟通结构_

## When to Use

Apply this framework when:
- Diagnosing why a microservices architecture ended up as a distributed monolith
- Planning an organizational restructuring in tandem with a system redesign
- Explaining to leadership why cross-team dependencies are slowing delivery velocity
- Evaluating whether to split a monolith — the answer depends on whether teams can be split too

## When NOT to Use

Stop and reconsider if:
- Very small teams (fewer than 8 people) where everyone communicates with everyone directly
- Temporary hackathon or prototype projects where organizational structure is intentionally fluid
- Outsourced or contract development where you have no control over team organization
- Highly regulated industries where architecture must follow compliance mandates regardless of org structure

## Core Concepts

- Organizational isomorphism: Software architecture inevitably mirrors the organization's communication graph
- Communication paths: Module boundaries form along the lines of least communication resistance between teams
- Prescriptive application: Instead of observing the law passively, use it actively to shape team structures for desired architecture
- Sociotechnical coupling: Technical decisions and organizational decisions are inseparable — changing one without the other creates friction
- Coordination cost: Cross-team interfaces tend to become the system's most brittle integration points

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Conway's Law to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Map current team communication patterns and organizational boundaries explicitly
2. Audit the existing system architecture and identify how it mirrors team boundaries
3. Detect misalignments where architecture crosses team lines, causing friction and bottlenecks
4. **Use the law prescriptively**: redesign team structures to match the desired target architecture
5. Iterate on both org design and system design together, treating them as co-evolving artifacts

<details><summary>中文步骤</summary>

1. 明确梳理当前团队沟通模式和组织边界
2. 审计现有系统架构，识别其如何映射团队边界
3. 检测架构跨越团队边界导致摩擦和瓶颈的错位之处
4. 将该定律用于规范性指导：重新设计团队结构以匹配目标架构
5. 将组织设计与系统设计作为协同演进的制品，一并持续迭代

</details>

## Do

- Map your organization chart and your system architecture side-by-side to reveal hidden coupling
- Align team ownership with service/module boundaries for faster, more autonomous delivery
- Use Conway's Law diagnostically first before attempting prescriptive reorganization
- Educate non-engineering leadership on the law so they understand the architectural impact of org changes

## Don't

- Don't reorganize teams without simultaneously considering the impact on software architecture
- Don't ignore Conway's Law and assume you can build any architecture with any org structure
- Don't apply it mechanically — team talent, culture, and domain complexity also matter
- Don't use it to justify architectural stagnation — 'our org can't support microservices' is often a solvable problem

## Case Study

**Microsoft**: A 2008 study by Microsoft Research (Nagappan, Murphy & Basili) empirically validated Conway's Law by analyzing Windows Vista. They found that organizational metrics — such as the number of engineers touching a module and the organizational distance between them — were stronger predictors of software defects than code metrics like complexity or coverage. Modules owned by distributed, loosely coordinated teams had significantly higher defect rates.

## Related Frameworks

- inverse-conway-maneuver (complement)
- team-topologies (complement)
- microservices-decomposition (related)

## Source

https://sdframe.caldis.me/frameworks/conways-law
