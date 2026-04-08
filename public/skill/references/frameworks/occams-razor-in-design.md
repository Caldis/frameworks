# Occam's Razor in Design / 奥卡姆剃刀原则（设计应用）

- **Category**: thinking
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: William of Ockham (c. 1287-1347); design application by various authors, c.1323
- **Adopters**: Amazon Web Services — S3's flat key-value model, SQS's at-least-once queue, and Lambda's stateless function model all embody parsimonious design, Unix/Linux — each tool does one thing well; pipes compose simple tools into complex workflows rather than building monolithic complex tools, JSON — replaced XML for most REST APIs by being a simpler, less expressive format that was sufficient for the majority of use cases, SQLite — deliberately omits features like network access, user management, and stored procedures to remain the simplest embeddable relational database, Go programming language — designed with explicit parsimony (no generics until 1.18, no exceptions, no inheritance) based on Google's experience that simplicity improves large-team maintainability

Among competing design solutions, prefer the simplest one that fully satisfies the requirements

_在相互竞争的设计方案中，优先选择能完全满足需求的最简单方案_

## When to Use

Apply this framework when:
- When evaluating multiple architectural approaches that all satisfy requirements and you need a principled way to choose between them
- When a proposed solution introduces abstractions, patterns, or infrastructure that are not required by any current or near-term requirement
- When reviewing code or design proposals where added complexity is justified by theoretical future scenarios rather than demonstrated present need
- When debugging a system by choosing the simplest explanation for observed behavior before testing more complex hypotheses

## When NOT to Use

Stop and reconsider if:
- When 'simplicity' conflicts with safety in safety-critical domains (aviation, medical devices, financial clearing); correctness and fault tolerance requirements justify complexity that Occam's Razor would otherwise prune
- When simplicity is being used to avoid necessary complexity that the problem domain genuinely imposes (e.g., arguing that distributed systems should be 'simpler' when the requirements demand distribution)
- When the team is using the principle to resist learning or adopting established patterns that are more complex than familiar approaches but are well-justified
- When evaluating solutions at different abstraction levels; the razor applies within a given abstraction level, not across levels (a database is 'more complex' than a text file, but the complexity is justified by its functional capabilities)

## Core Concepts

- Parsimony principle: the razor does not mean 'always choose the simplest solution' but 'do not multiply entities beyond necessity' — a more complex solution is justified only when simpler alternatives genuinely fail to meet requirements
- Entity multiplication: in software design, 'entities' are abstractions, services, dependencies, configuration points, and moving parts; each additional entity adds cognitive overhead, failure modes, and maintenance cost
- Sufficiency threshold: Occam's Razor applies after a solution crosses the sufficiency threshold (satisfies all requirements); among sufficient solutions, prefer the simplest — it does not justify choosing an insufficient simple solution over a sufficient complex one
- Explanatory power: in debugging and root cause analysis, Occam's Razor favors the hypothesis that explains all observed symptoms with the fewest independent assumptions, guiding investigation toward the most likely root cause first

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Occam's Razor in Design to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Enumerate all candidate solutions to the design problem without filtering, including both simple and complex options, to ensure the simplest solution is visible and not prematurely discarded
2. Identify the minimum set of requirements that any solution must satisfy: functional requirements (what it must do), non-functional requirements (performance, reliability), and constraints (team skill, timeline)
3. For each candidate solution, verify it satisfies all minimum requirements and identify any additional assumptions, dependencies, or entities it introduces beyond what the problem strictly requires
4. **Apply Occam's Razor**: select the solution that satisfies all requirements while introducing the fewest additional entities, assumptions, and moving parts — not the most elegant solution, but the most parsimonious one
5. Document which requirements the chosen solution satisfies and which optional complexity was deliberately omitted, so future teams understand what was simplified and can revisit when complexity becomes justified

<details><summary>中文步骤</summary>

1. 在不过滤的情况下列举设计问题的所有候选方案，包括简单和复杂的选项，确保最简单的方案可见且不被过早丢弃
2. 识别任何方案必须满足的最小需求集合：功能需求（必须做什么）、非功能需求（性能、可靠性）和约束条件（团队技能、时间线）
3. 对每个候选方案验证其是否满足所有最小需求，并识别其引入的超出问题严格所需的额外假设、依赖或实体
4. 应用奥卡姆剃刀：选择在满足所有需求的同时引入最少额外实体、假设和活动部件的方案——不是最优雅的方案，而是最简约的方案
5. 记录所选方案满足的需求以及被刻意省略的可选复杂性，使未来的团队了解什么被简化了，并在复杂性变得合理时可以重新审视

</details>

## Do

- Do require that any added complexity demonstrate a concrete, present requirement it satisfies, not a hypothetical future scenario, because most hypothetical requirements never materialize
- Do use the razor as a tiebreaker between solutions that all satisfy requirements, not as a way to justify choosing an insufficient solution because it is simpler
- Do apply the razor recursively: after choosing the simplest solution, look for simplifications within the chosen solution that preserve all requirements
- Do count dependencies, configuration parameters, and abstractions as entities that must be justified, not just classes and services

## Don't

- Don't conflate Occam's Razor with 'simpler is always better'; a simple solution that fails to meet a required non-functional property (latency, fault tolerance) is not parsimonious, it is incomplete
- Don't apply the razor to rule out legitimate complexity driven by genuine requirements such as security, compliance, or reliability constraints that the domain actually imposes
- Don't use the razor as a rhetorical device to dismiss architectural concerns without engaging with them; 'this is too complex' is not an application of Occam's Razor without a simpler sufficient alternative
- Don't apply the razor only at design time; revisit it during code review and refactoring to remove complexity that was once necessary but is no longer justified by current requirements

## Case Study

**Amazon Web Services**: Amazon's S3 API design is a canonical example of Occam's Razor applied to cloud service design. When designing S3 in 2006, Amazon chose the simplest possible object storage model: buckets containing flat key-value pairs with no directory hierarchy, no transactions, and eventually-consistent reads. Every feature request for POSIX filesystem semantics, atomic operations, or strong consistency was rejected as unnecessary complexity for the primary use case of durable object storage. This parsimonious design scaled to trillions of objects and enabled S3 to become the foundational storage primitive for the entire cloud industry.

## Related Frameworks

- worse-is-better (complement)
- complexity-budget (complement)
- first-principles-thinking (complement)
- trade-off-sliders (related)

## Source

https://sdframe.caldis.me/frameworks/occams-razor-in-design
