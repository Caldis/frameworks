# Systems Thinking / 系统思维

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Donella Meadows / Jay Forrester (MIT), 1950s-1990s, 1956
- **Adopters**: Amazon, Toyota, World Bank, NASA, Shell, Intel

Analyze software as interconnected feedback loops, not parts

_将软件视为相互关联的反馈回路而非孤立部件进行分析_

## When to Use

Apply this framework when:
- When a production system exhibits surprising emergent behavior that can't be explained by looking at individual components
- When fixing one problem in your architecture keeps creating new problems elsewhere (whack-a-mole symptoms)
- When scaling decisions have second-order effects on team structure, deployment, and operational costs
- When planning a platform migration and you need to understand cascading dependencies across services

## When NOT to Use

Stop and reconsider if:
- When the problem is genuinely linear and isolated with no significant feedback effects or cross-component dependencies
- When you need an immediate tactical fix and the system analysis would take longer than the fix itself
- When the team lacks the time or expertise to build and validate system models, risking analysis paralysis
- When the scope is a single well-bounded function or algorithm with no external interactions to model

## Core Concepts

- Feedback Loops: Reinforcing loops amplify change (growth or collapse) while balancing loops resist change (stabilization), and most system behavior emerges from their interaction
- Stocks and Flows: Stocks are accumulations (queues, caches, data stores) that change over time through inflows and outflows, and their delays often cause counterintuitive behavior
- Leverage Points: Places in the system where a small intervention produces disproportionately large effects, ranked from shallow (parameter tweaks) to deep (paradigm shifts)
- Emergence: System-level properties that arise from component interactions but cannot be predicted from studying components in isolation

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Systems Thinking to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify the System Boundary**: define what is inside vs. outside the system and where key interfaces lie
2. **Map Stocks and Flows**: identify accumulations (data stores, queues, state) and the flows that increase or decrease them
3. **Trace Feedback Loops**: find reinforcing loops (growth/decay) and balancing loops (stabilization) within the system
4. **Identify Leverage Points**: locate places in the system where small changes produce large, lasting effects
5. **Simulate and Validate**: build causal loop diagrams or simple simulations to test mental models against observed behavior

<details><summary>中文步骤</summary>

1. 界定系统边界：明确系统内外的范围以及关键接口所在位置
2. 绘制存量与流量：识别系统中的积累要素（数据存储、队列、状态）及其增减流量
3. 追踪反馈回路：发现系统内的增强回路（增长/衰减）和调节回路（稳定化）
4. 识别杠杆点：找到系统中以小改动产生持久大影响的关键位置
5. 模拟与验证：构建因果回路图或简单仿真，对照观察行为检验心智模型

</details>

## Do

- Do draw causal loop diagrams before proposing solutions, because visualizing feedback structures reveals non-obvious dynamics
- Do look for delays in the system (queue backlogs, cache staleness, deployment pipelines), because delays are the most common source of system oscillation
- Do identify which loops are dominant under different conditions, because the same system behaves differently at different scales or loads
- Do consider the system boundary carefully, because drawing it too narrow misses critical external feedback and drawing it too wide makes analysis intractable

## Don't

- Don't assume linear cause-and-effect in complex systems, because feedback loops create non-linear dynamics where effects can amplify or counteract their causes
- Don't optimize a single component without considering system-wide effects, because local optimization often degrades global performance
- Don't ignore time delays between actions and consequences, because delayed feedback is the primary reason well-intentioned changes produce opposite results
- Don't treat the system model as complete truth, because all models are simplifications and must be validated against observed behavior

## Case Study

**Amazon**: Amazon applied systems thinking to understand and amplify its marketplace flywheel: more sellers lead to more selection, which attracts more customers, which attracts more sellers (a reinforcing loop), while higher volume drives lower costs, enabling lower prices (a second reinforcing loop). By identifying these feedback loops, Amazon strategically invested in fulfillment infrastructure as the leverage point that accelerated both loops simultaneously, fueling decades of compounding growth.

## Related Frameworks

- cynefin-framework (complement)
- wardley-mapping (complement)
- conways-law (related)

## Source

https://sdframe.caldis.me/frameworks/systems-thinking
