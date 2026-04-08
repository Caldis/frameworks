# Trade-off Sliders Model / 权衡滑块模型

- **Category**: thinking
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Kent Beck (Extreme Programming) / SEI Architecture Trade-off Analysis Method (ATAM), late 1990s, 1996
- **Adopters**: Spotify, Atlassian, ThoughtWorks, Pivotal (now VMware Tanzu), Netflix, Stripe

Make design trade-offs explicit by ranking competing qualities

_通过排列相互竞争的质量属性，将设计权衡显式化_

## When to Use

Apply this framework when:
- When architects and product managers keep making inconsistent decisions because there's no shared understanding of which qualities matter most
- When a team faces a design choice where improving one quality attribute (e.g., performance) would degrade another (e.g., maintainability) and they need a principled tiebreaker
- When onboarding new team members who need to quickly understand why past design decisions prioritized certain attributes over others
- When scaling a system and the original implicit trade-offs (favoring development speed over operational reliability, for example) are no longer appropriate

## When NOT to Use

Stop and reconsider if:
- When the project has a single dominant quality requirement (e.g., regulatory compliance) that overrides all other considerations, making a ranking exercise unnecessary
- When the team is so small (1-2 people) that trade-offs are managed through informal conversation and a formal exercise would be overhead
- When the project is a short experiment or spike where the investment in quality attribute analysis won't pay off before the work is discarded
- When stakeholders are unable or unwilling to commit to rankings and the exercise would produce a meaningless consensus of 'everything is important'

## Core Concepts

- Explicit Trade-offs: Making quality attribute priorities visible and documented, rather than leaving them as implicit assumptions that different team members interpret differently
- Force-Ranking: Requiring stakeholders to rank attributes eliminates the common dysfunction of declaring everything equally important, which is the same as declaring nothing important
- Slider Positions as Decision Heuristics: Once slider positions are set, they serve as fast heuristics for everyday design decisions without requiring a full stakeholder meeting each time
- Temporal Validity: Trade-off positions are valid for a phase of the project, not forever — what matters in an MVP differs from what matters in a mature production system

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Trade-off Sliders Model to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Enumerate Quality Attributes**: list all relevant system qualities (performance, security, maintainability, cost, scalability, etc.) for the project
2. **Force-Rank the Attributes**: have key stakeholders independently rank qualities from most to least critical, then consolidate into a shared ranking
3. **Set Slider Positions**: assign a relative priority score (1-5) to each attribute, explicitly acknowledging what is sacrificed at each end
4. **Apply to Design Decisions**: when facing a design choice, evaluate each option against the slider positions to find the best-fit solution
5. **Revisit Periodically**: re-run the sliders exercise at major milestones to reflect evolved business priorities and technical context

<details><summary>中文步骤</summary>

1. 枚举质量属性：列出项目所有相关的系统质量（性能、安全、可维护性、成本、可扩展性等）
2. 强制排序属性：让关键干系人独立排序质量属性（最重要到最次要），再整合为共识排序
3. 设定滑块位置：为每个属性赋予相对优先级分值（1-5），明确标注每端所牺牲的内容
4. 应用于设计决策：面对设计选择时，根据滑块位置评估每个方案以找到最优契合方案
5. 定期重新审视：在重要里程碑重新进行滑块练习，以反映业务优先级和技术背景的演变

</details>

## Do

- Do force stakeholders to rank rather than rate attributes, because ranking eliminates the 'everything is priority 1' problem that rating systems allow
- Do document the reasoning behind slider positions, because future team members need to understand why security was ranked above velocity, not just that it was
- Do include both technical and business stakeholders in the ranking exercise, because engineering-only rankings miss business context and business-only rankings miss technical feasibility
- Do use the sliders as a living reference in architecture decision records, because linking design decisions back to slider positions makes trade-off reasoning traceable

## Don't

- Don't allow stakeholders to declare all attributes equally important, because in practice resources are finite and trade-offs are inevitable — equal ranking is an abdication of decision-making
- Don't set sliders once and forget them, because as the product matures from MVP to scale-up, the relative importance of quality attributes shifts dramatically
- Don't use sliders to avoid making hard decisions, because sliders inform decisions but a team still needs to commit to a specific design path based on the priorities
- Don't include too many attributes (more than 7-8), because cognitive overload defeats the purpose of having clear, actionable priorities

## Case Study

**Spotify**: Spotify's engineering culture explicitly used trade-off slider thinking when building their microservices platform. Teams were given clear organizational priorities: developer velocity ranked above operational efficiency, and autonomy ranked above consistency. This explicit trade-off led to their decision to let squads choose their own technology stacks (prioritizing autonomy and velocity) even at the cost of some cross-team inconsistency. The clarity of these trade-off positions enabled over 250 independent squads to make locally optimal decisions that aligned with organizational strategy.

## Related Frameworks

- atam (complement)
- qaw (complement)
- cynefin-framework (complement)

## Source

https://sdframe.caldis.me/frameworks/trade-off-sliders
