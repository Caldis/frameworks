# Cynefin Framework / 库内文框架

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Dave Snowden, 1999
- **Adopters**: Spotify, IBM, UK Government Digital Service, Australian Tax Office, Lego, Ericsson

Categorize problems into Simple, Complicated, Complex, Chaotic

_将问题归类为简单、繁杂、复杂、混沌四个领域以选择对策_

## When to Use

Apply this framework when:
- When your team applies the same process to every problem regardless of its nature, leading to overengineering simple tasks or underestimating complex ones
- When stakeholders demand a detailed upfront plan for a problem that is inherently emergent and unpredictable
- When a production incident occurs and you need to quickly decide whether to apply known fixes or enter experimental investigation mode
- When choosing between agile, waterfall, or hybrid methodologies and you need a principled basis for the choice

## When NOT to Use

Stop and reconsider if:
- When the team needs a specific actionable methodology rather than a meta-framework for choosing methodologies
- When all problems in the project clearly fall within a single domain and domain classification adds no value
- When stakeholders want quantitative risk analysis and the qualitative nature of Cynefin doesn't satisfy their decision-making needs
- When the organization lacks psychological safety for safe-to-fail experiments, making Complex domain practices impractical

## Core Concepts

- Four Domains + Disorder: Clear (obvious cause-effect), Complicated (discoverable cause-effect requiring expertise), Complex (cause-effect only visible in retrospect), and Chaotic (no perceivable cause-effect), plus Disorder when you don't know which domain applies
- Probe-Sense-Respond: The strategy for Complex domains — run safe-to-fail experiments, observe what emerges, and amplify what works rather than planning upfront
- Domain Dynamics: Problems can shift between domains (e.g., complacency in the Clear domain causes a cliff-edge fall into Chaos), requiring continuous monitoring
- Contextual Appropriateness: There is no single 'best' management approach — the optimal response depends entirely on which domain the problem inhabits

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Cynefin Framework to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Categorize the Problem Domain**: assess whether the situation is Simple (known), Complicated (expert-solvable), Complex (emergent), or Chaotic (novel/crisis)
2. **Select the Response Pattern**: apply best practice (Simple), good practice with analysis (Complicated), or probe-sense-respond (Complex)
3. **Handle Disorder**: if the domain is unclear, break the problem into smaller parts and classify each part separately
4. **Manage Domain Transitions**: watch for situations moving between domains (e.g., a Complex system becoming Chaotic under load)
5. **Document Domain Reasoning**: record why a problem was classified in a domain to inform future architectural decisions

<details><summary>中文步骤</summary>

1. 归类问题领域：判断当前情况属于简单（已知）、繁杂（专家可解）、复杂（涌现）还是混沌（新颖/危机）
2. 选择响应模式：简单领域用最佳实践，繁杂领域用专家分析，复杂领域用探测-感知-响应
3. 处理无序状态：若领域不明确，将问题拆分为更小部分并分别归类
4. 管理领域转换：监控问题在领域间的迁移（如复杂系统在负载下转变为混沌）
5. 记录领域推理：记录问题被归类到某领域的原因，以指导未来的架构决策

</details>

## Do

- Do use Cynefin as a sense-making tool before choosing a process methodology, because the domain should drive the approach rather than the other way around
- Do design safe-to-fail experiments for Complex domain problems, because small probes with bounded downside reveal patterns that analysis cannot
- Do reassess domain classification regularly, because problems move between domains as context changes and yesterday's Complex problem may be today's Complicated one
- Do teach the entire team to recognize domain signals, because frontline engineers often detect domain shifts (e.g., from Complicated to Chaotic) before managers do

## Don't

- Don't treat Cynefin domains as permanent labels, because a problem's domain classification can change as understanding deepens or conditions shift
- Don't apply best practices to Complex domain problems, because in complexity there are no repeatable best practices — only emergent patterns to discover
- Don't spend time analyzing during a Chaotic crisis, because Chaotic situations demand immediate action to stabilize before any analysis is possible
- Don't dismiss the Disorder zone, because the most dangerous state is not knowing which domain you're in and defaulting to comfortable but inappropriate responses

## Case Study

**Spotify**: Spotify used Cynefin thinking to shape their engineering culture and organizational model. They recognized that music recommendation algorithms operated in the Complex domain (requiring probe-sense-respond experimentation with A/B tests), while payment processing was Complicated (requiring expert analysis and good practices), and basic infrastructure provisioning was Clear (requiring standard operating procedures). This domain-aware approach led to their famous Squad/Tribe/Chapter/Guild model, where different teams used different processes matched to their problem domain.

## Related Frameworks

- systems-thinking (complement)
- trade-off-sliders (complement)
- wardley-mapping (alternative)

## Source

https://sdframe.caldis.me/frameworks/cynefin-framework
