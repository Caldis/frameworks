# Analogical Thinking / 类比思维

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: foundational
- **Author**: Dedre Gentner, 1983 (Structure-Mapping Theory); broadly rooted in cognitive science
- **Adopters**: Netflix, Google (MapReduce analogy from functional programming), Kubernetes (ship steering/helmsman analogy), Docker (shipping container analogy), Apache Kafka (commit log analogy from databases)

Transfer structural solutions from source domains to software

_将源领域的结构性解决方案迁移到软件设计问题中_

## When to Use

Apply this framework when:
- When the team is stuck on a design problem and exhausted all obvious approaches within the software domain
- When explaining a complex technical architecture to non-technical stakeholders who need intuitive understanding
- When designing a novel system and you want to leverage proven patterns from biology, urban planning, or other mature domains
- When creating developer documentation or API naming and you need metaphors that make abstract concepts immediately graspable

## When NOT to Use

Stop and reconsider if:
- When the problem has a well-known solution within the software domain and cross-domain exploration would add unnecessary complexity
- When precision is required and an analogy's inherent imprecision would lead to specification errors in safety-critical systems
- When the team lacks shared knowledge of the source domain, making the analogy confusing rather than illuminating
- When the problem is primarily a quantitative optimization (latency reduction, memory efficiency) where mathematical analysis is more appropriate than structural analogy

## Core Concepts

- Structure Mapping: Analogical reasoning works by mapping relational structures (not surface features) from a well-understood source domain to a less-understood target domain
- Source Domain Selection: The power of an analogy depends on choosing a source domain with deep structural similarity to the target, not just superficial resemblance
- Analogical Distance: Far analogies (biology to software) tend to produce more creative breakthroughs than near analogies (web app to mobile app), but require more validation
- Analogy Limits: Every analogy eventually breaks down, and identifying where the mapping fails is as important as identifying where it works, because unexamined analogies mislead

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Analogical Thinking to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Abstract the Problem Structure**: strip away domain-specific details to reveal the underlying relational pattern of the problem
2. **Identify Source Domains**: brainstorm non-software domains (biology, logistics, city planning, etc.) that exhibit similar structural patterns
3. **Extract the Structural Mapping**: articulate the precise correspondence between source domain elements and target software elements
4. **Adapt the Solution**: translate the source domain's solution mechanism into software constructs, adjusting for domain differences
5. **Validate the Analogy**: test where the analogy breaks down and ensure those gaps are addressed in the final design

<details><summary>中文步骤</summary>

1. 抽象问题结构：剥离领域特定细节，揭示问题的底层关系模式
2. 识别源领域：在非软件领域（生物学、物流、城市规划等）中寻找具有相似结构模式的案例
3. 提取结构映射：清晰阐明源领域元素与目标软件元素之间的精确对应关系
4. 改造解决方案：将源领域的解决机制转化为软件构件，并针对领域差异进行调整
5. 验证类比有效性：测试类比在何处失效，确保最终设计中这些缺口已被充分处理

</details>

## Do

- Do map the structural relationships precisely, because vague analogies ('it's like a city') are useless — specify exactly which elements correspond to what
- Do seek analogies from distant domains, because cross-domain analogies (biology, logistics, ecology) produce more creative solutions than within-domain comparisons
- Do explicitly document where the analogy breaks down, because every analogy has limits and unexamined breakpoints become hidden design flaws
- Do use analogies to communicate as well as design, because a well-chosen analogy can make a complex architecture immediately understandable to new team members

## Don't

- Don't fall in love with the analogy and force-fit the target domain into the source domain's structure, because the map is not the territory
- Don't use surface-level analogies for design decisions, because similar-sounding domains can have fundamentally different structural properties
- Don't stop at one analogy, because comparing multiple source domains highlights which structural features are robust and which are artifacts of a particular analogy
- Don't assume the analogy communicates the same thing to everyone, because different team members may interpret the same metaphor differently based on their domain knowledge

## Case Study

**Netflix**: Netflix's Chaos Engineering practice originated from an analogy to immunology. Just as the immune system strengthens through controlled exposure to pathogens, Netflix designed Chaos Monkey (2011) to randomly terminate production instances, building system resilience through controlled failure injection. This biological analogy guided the design of increasingly sophisticated tools (Chaos Kong, FIT) that simulate progressively larger failures, directly mirroring how immune systems develop from handling small antigens to mounting complex immune responses.

## Related Frameworks

- first-principles-thinking (complement)
- design-thinking-ideo (related)
- gof-design-patterns (related)

## Source

https://sdframe.caldis.me/frameworks/analogical-thinking
