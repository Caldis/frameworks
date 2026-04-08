# Wardley Mapping / 沃德利地图

- **Category**: thinking
- **Complexity**: advanced
- **Quality**: maintainability, scalability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Simon Wardley, 2005
- **Adopters**: UK Government Digital Service, Leading Edge Forum, Canonical (Ubuntu), Red Hat, Thoughtworks, HashiCorp

Visualize value chains by evolution stage to drive strategy

_按演化阶段可视化价值链，以驱动技术与商业战略决策_

## When to Use

Apply this framework when:
- When making build-vs-buy decisions for infrastructure components and you need a principled way to assess which components to commoditize
- When planning a multi-year technology strategy and you need to anticipate which technologies will become commodities
- When a competitor's strategic moves seem surprising and you need a framework to understand the landscape they're operating in
- When allocating engineering resources across teams and you need to distinguish between components that need innovation vs. components that need reliability

## When NOT to Use

Stop and reconsider if:
- When the scope is a single component with no meaningful value chain to map (e.g., choosing a logging library)
- When the team needs to make an immediate tactical decision and doesn't have time for strategic landscape analysis
- When the domain is so novel that no components have evolved past Genesis, making the evolution axis uninformative
- When stakeholders expect quantitative ROI projections and the qualitative nature of Wardley Maps won't satisfy their analytical requirements

## Core Concepts

- Value Chain: A vertical chain from user need (top) to underlying components (bottom), making dependencies explicit and revealing what actually delivers value
- Evolution Axis: Components evolve from Genesis (novel, uncertain) through Custom-Built and Product to Commodity (standardized, utility), and this evolution is inevitable
- Climatic Patterns: Predictable patterns of change (e.g., everything evolves toward commodity, success breeds inertia, higher-order systems create new needs) that enable strategic anticipation
- Gameplay: Deliberate strategic actions (open source a component to accelerate commoditization, use an ecosystem to create lock-in, exploit inertia in competitors) informed by the map

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Wardley Mapping to?
- What constraints or existing architecture do you need to work within?
- Has your team used Wardley Mapping before? (This is an advanced framework)

## Implementation Steps

1. **Anchor on User Need**: place the user at the top and define the visible capability they need (the 'anchor')
2. **Build the Value Chain**: map all components your system needs to deliver that capability, from user-facing to infrastructure
3. **Position by Evolution**: place each component on the x-axis from Genesis → Custom → Product → Commodity based on its maturity
4. **Identify Strategic Moves**: spot components that are over-engineered (custom when commodity exists) or under-invested
5. **Apply Climatic Patterns**: use known evolution patterns (e.g., componentization, inertia, co-evolution) to anticipate change

<details><summary>中文步骤</summary>

1. 锚定用户需求：将用户置于顶部，定义其所需的可见能力（「锚点」）
2. 构建价值链：绘制系统交付该能力所需的所有组件，从面向用户到基础设施
3. 按演化阶段定位：根据成熟度将每个组件放置在X轴上（初创→定制→产品→商品）
4. 识别战略举措：发现过度工程化（已有商品化方案却仍定制）或投资不足的组件
5. 应用气候模式：利用已知演化规律（如组件化、惯性、协同演化）预判变化趋势

</details>

## Do

- Do start with user needs at the top of the map, because every component only has value insofar as it ultimately serves a user need
- Do challenge the evolutionary position of each component with evidence, because misplacing a component (treating a commodity as custom) leads to wasted investment
- Do create maps collaboratively with both business and technical stakeholders, because the most valuable insights emerge from bridging their different perspectives
- Do update maps regularly as the landscape evolves, because a map is a snapshot in time and yesterday's Genesis component may be today's Commodity

## Don't

- Don't create maps in isolation without domain experts, because accurate component positioning requires deep knowledge of both technology maturity and market availability
- Don't treat the evolution axis as a precise measurement, because it's a relative positioning tool for strategic discussion, not a quantitative metric
- Don't map everything at once, because trying to capture the entire organization's value chain in one map creates an unreadable mess — focus on one user need at a time
- Don't use Wardley Maps as a one-time exercise, because their value comes from tracking movement along the evolution axis over time and adjusting strategy accordingly

## Case Study

**UK Government Digital Service (GDS)**: The UK Government Digital Service used Wardley Mapping to transform how the British government procures and builds technology. By mapping the value chains of government digital services, GDS identified that many departments were building custom solutions for components that had already evolved to commodity (e.g., identity verification, hosting, payments). This led to the creation of shared platforms like GOV.UK Pay, GOV.UK Notify, and GOV.UK Verify, saving hundreds of millions of pounds and dramatically improving service delivery speed.

## Related Frameworks

- cynefin-framework (alternative)
- systems-thinking (complement)
- trade-off-sliders (complement)

## Source

https://sdframe.caldis.me/frameworks/wardley-mapping
