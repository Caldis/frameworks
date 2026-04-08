# C4 Model / C4模型

- **Category**: architecture
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Simon Brown, 2011, 2006
- **Adopters**: ING Bank, Zalando, Elastic, Swiss Re, Structurizr

Four-level hierarchy for visualizing software architecture

_用于可视化软件架构的四层次模型_

## When to Use

Apply this framework when:
- When communicating software architecture to both technical and non-technical stakeholders
- When onboarding new developers who need to understand system structure at multiple levels
- When creating architecture documentation that stays maintainable and up-to-date
- When replacing ad-hoc whiteboard diagrams with a consistent, hierarchical visualization approach

## When NOT to Use

Stop and reconsider if:
- Hardware-centric systems that need electrical or physical architecture diagrams rather than software views
- Formal model-driven development where UML with code generation is required
- Very small projects where a single whiteboard sketch suffices and maintaining multiple diagram levels is overhead

## Core Concepts

- Context diagram: The highest level showing the system boundary, users, and external dependencies
- Container diagram: Major runtime units (applications, databases, message queues) with technology labels
- Component diagram: Internal building blocks within a container showing responsibilities and relationships
- Code diagram: Lowest level showing classes or modules, typically auto-generated from code
- Abstraction hierarchy: Each level zooms into the previous one, like a map with increasing detail

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying C4 Model to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Draw a Context diagram**: show the system as a box, its users, and external systems it interacts with
2. **Drill into a Container diagram**: decompose the system into containers (apps, services, databases) with technology choices
3. Create Component diagrams for key containers: show the internal components and how they collaborate
4. Optionally add Code-level diagrams (UML class diagrams) for the most critical components
5. Embed diagrams in documentation and ADRs; keep them as living artifacts updated with each architecture change

<details><summary>中文步骤</summary>

1. 绘制上下文图：将系统表示为方框，展示其用户和交互的外部系统
2. 深入绘制容器图：将系统分解为容器（应用、服务、数据库）并标注技术选型
3. 为关键容器创建组件图：展示内部组件及其协作关系
4. 可选地为最关键组件添加代码层级图（UML类图）
5. 将图表嵌入文档和ADR，作为随每次架构变更持续更新的活文档

</details>

## Do

- Do start with Context diagrams because they provide the broadest overview and are accessible to all audiences
- Do add a legend and clear labels to every diagram because C4 relies on explicitness over convention
- Do keep diagrams up to date as architecture evolves because stale diagrams erode trust in documentation
- Do use diagram-as-code tools like Structurizr because they integrate with version control and CI pipelines

## Don't

- Don't create Code-level diagrams for every component because they become stale quickly and add maintenance burden
- Don't mix abstraction levels in a single diagram because it confuses the audience about scope
- Don't use C4 as a replacement for UML in all cases because some domains need more formal behavioral diagrams
- Don't overload diagrams with too many elements because readability drops sharply beyond 15-20 elements per diagram

## Case Study

**ING Bank**: ING Bank adopted the C4 Model to standardize architecture documentation across hundreds of development teams during their large-scale agile transformation. By mandating Context and Container diagrams for every service, they created a navigable catalog of their entire technology landscape. This enabled cross-team dependency analysis and reduced integration issues by giving teams a shared vocabulary for discussing system boundaries.

## Related Frameworks

- adr (complement)
- togaf-adm (alternative)
- microservices-decomposition (complement)

## Source

https://sdframe.caldis.me/frameworks/c4-model
