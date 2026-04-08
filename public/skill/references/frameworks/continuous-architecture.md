# Continuous Architecture / 持续架构

- **Category**: evolution
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Murat Erder & Pierre Pureur, 2015, 2010
- **Adopters**: Spotify, Capital One, Netflix, ING Bank, ThoughtWorks

Evolve architecture incrementally in sync with delivery rather than big up-front design

_与交付节奏同步地增量演进架构，取代前期大设计_

## When to Use

Apply this framework when:
- An agile organization that needs architectural guidance without reverting to waterfall-style big design up front
- A rapidly growing system where requirements change faster than a fixed architecture can accommodate
- Teams adopting cloud-native infrastructure and needing architecture that evolves with cloud capabilities
- Organizations integrating AI/ML components where architectural assumptions shift as models and capabilities improve

## When NOT to Use

Stop and reconsider if:
- Safety-critical systems (medical devices, avionics) where regulatory compliance requires extensive up-front design documentation
- Fixed-scope contract projects where the architecture is contractually specified before development begins
- Very short-lived projects (under 3 months) where the overhead of ADRs and fitness functions exceeds their benefit
- Teams with no agile delivery practices — continuous architecture assumes iterative, incremental delivery

## Core Concepts

- Architecture Decision Records (ADRs): Lightweight, version-controlled documents that capture the context, decision, and consequences of each architectural choice
- Architectural runway: Just enough planned architecture to support the next few sprints, not a complete blueprint
- Last responsible moment: Defer architectural decisions until the cost of not deciding outweighs the benefit of waiting for more information
- Fitness functions: Automated checks that continuously verify the live system conforms to architectural intent
- Architecture as code: Treating architectural constraints as executable specifications embedded in CI/CD pipelines

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Continuous Architecture to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Establish lightweight Architecture Decision Records (ADRs) to capture decisions as they are made
2. Embed architectural reviews as a routine part of sprint planning and retrospectives
3. **Define architectural runways**: maintain just-enough design ahead of the development queue
4. Use fitness functions to monitor whether the live system still matches architectural intent
5. Revisit and update ADRs when new information, scale demands, or AI capabilities shift priorities

<details><summary>中文步骤</summary>

1. 建立轻量级架构决策记录（ADR），在决策作出时即时捕获
2. 将架构评审作为迭代计划和回顾会议的常规环节
3. 定义架构跑道：在开发队列前方维持恰到好处的设计储备
4. 使用适应度函数监控线上系统是否仍与架构意图保持一致
5. 当新信息、规模需求或 AI 能力改变优先级时，及时重审和更新 ADR

</details>

## Do

- Write ADRs for every significant architectural decision — even if the decision is 'we chose not to change'
- Keep the architectural runway 1-2 sprints ahead, not 6 months ahead
- Embed architects in delivery teams rather than isolating them in an ivory tower review board
- Use fitness functions to make architectural constraints executable and automatically enforced

## Don't

- Don't fall back to big up-front design disguised as 'architectural planning' — keep it lightweight
- Don't skip ADRs for 'obvious' decisions — they provide invaluable context for future team members
- Don't treat architecture as a one-time activity — it must continuously evolve with the system
- Don't let the architectural runway grow too far ahead of delivery — unused design becomes waste

## Case Study

**Spotify**: Spotify adopted continuous architecture principles as part of their famous squad/tribe/chapter model. Each squad makes its own architectural decisions, documented as lightweight ADRs in their repositories. A chapter of architects across squads ensures alignment on cross-cutting concerns. This approach allowed Spotify to evolve from a monolith to hundreds of microservices without ever pausing delivery for a 'big redesign', enabling them to scale from 10 million to over 500 million users.

## Related Frameworks

- adr (complement)
- architectural-fitness-functions (complement)
- three-ways-devops (complement)

## Source

https://sdframe.caldis.me/frameworks/continuous-architecture
