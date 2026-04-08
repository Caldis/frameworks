# Architectural Kata / 架构卡塔

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Ted Neward, 2009
- **Adopters**: O'Reilly Media — 'Fundamentals of Software Architecture' course by Neal Ford and Mark Richards uses katas as the primary hands-on learning mechanism, ThoughtWorks — uses architectural katas in internal architecture community of practice workshops and new hire technical onboarding, NFJS (No Fluff Just Stuff) — the conference series where Ted Neward originated the kata format; continues to feature kata workshops, Corporate architecture guilds at Netflix, Spotify, and Zalando use kata formats for quarterly architecture practice sessions, Coding bootcamps (General Assembly, Hack Reactor) adapted kata formats for senior cohorts to introduce system design thinking

Structured practice exercises where architects design systems for fictional scenarios to build architectural intuition and decision-making skills

_架构师为虚构场景设计系统的结构化练习，用于培养架构直觉和决策能力_

## When to Use

Apply this framework when:
- When onboarding engineers to architecture responsibilities and you need a low-stakes environment to practice architectural decision-making
- When a team has been writing code for years but lacks experience making and defending system-level design decisions
- When preparing for architecture review boards, technical interviews, or staff+ engineering promotions that require demonstrating architectural thinking
- When a team is about to make a real high-stakes architectural decision and wants to warm up their thinking by practicing on a similar fictional scenario first

## When NOT to Use

Stop and reconsider if:
- When the team is under immediate deadline pressure for a real system; kata exercises require dedicated uninterrupted time and a learning mindset, not a delivery mindset
- When participants have fewer than 2 years of software engineering experience; architectural katas require enough implementation experience to reason about trade-offs between real system properties
- When the organizational culture does not support open critique and intellectual disagreement; katas require psychological safety to challenge and be challenged without status games
- When you need to make a real architectural decision quickly; katas are deliberate practice, not a decision-making process for real systems

## Core Concepts

- Deliberate practice for architecture: architectural skills are developed through repeated cycles of design, presentation, and critique on varied problem domains — the kata format structures this deliberate practice cycle
- Architectural characteristics: the first step of any kata is identifying which '-ilities' (scalability, availability, security, maintainability, performance) are most important for the scenario, because these drive all subsequent trade-off decisions
- Trade-off articulation: the kata format forces architects to explicitly state trade-offs rather than design by instinct; a good kata presentation names what was sacrificed to achieve each architectural goal
- Safe failure environment: katas are fictional, so the cost of a wrong decision is learning, not a production incident; this psychological safety allows architects to take design risks they would avoid in high-stakes real contexts

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Architectural Kata to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Select or create a kata scenario**: a concise description of a fictional business problem with users, scale requirements, and constraints — similar to a product brief but designed to make architectural trade-offs explicit and interesting
2. Form small groups (3-5 architects or engineers) and independently design the architecture for the given scenario within a time-boxed period (typically 45-90 minutes), documenting key decisions and their rationale
3. Present the architectural design to peer groups or the broader audience, explicitly defending each major decision: which architectural characteristics were prioritized, which trade-offs were made, and what alternatives were considered
4. **Receive and give structured critique**: reviewers challenge design decisions with 'what happens when X?' questions, and the presenting team must defend choices or acknowledge valid concerns they missed
5. Conduct a debrief comparing different groups' architectures for the same scenario, discussing which approaches addressed requirements better and what the architectural lessons are that generalize beyond the specific kata

<details><summary>中文步骤</summary>

1. 选择或创建卡塔场景：对虚构业务问题的简明描述，包含用户、规模需求和约束条件——类似于产品简报，但旨在使架构权衡明确且有趣
2. 组成小组（3-5名架构师或工程师），在限定时间内（通常45-90分钟）独立为给定场景设计架构，记录关键决策及其依据
3. 向同组或更广泛的受众展示架构设计，明确捍卫每个主要决策：优先考虑了哪些架构特性、做出了哪些权衡、考虑了哪些替代方案
4. 接受和给予结构化的批评：审查者用「如果X会怎样？」的问题挑战设计决策，展示团队必须捍卫选择或承认他们遗漏的有效关切
5. 进行复盘，比较不同小组对同一场景的架构，讨论哪些方法更好地满足了需求，以及超越特定卡塔的可推广架构经验

</details>

## Do

- Do time-box the design phase strictly (45-90 minutes) because open-ended design time leads to over-engineering; the kata's value comes from making decisions under realistic constraints
- Do require each group to explicitly list the architectural characteristics they prioritized before presenting the design, because prioritization is the highest-leverage architectural decision
- Do ask 'what would break this architecture?' after each presentation because stress-testing designs for failure modes is more valuable than critiquing aesthetic choices
- Do run the same kata scenario with multiple groups and compare approaches, because the diversity of valid solutions reveals the design space and demonstrates that architecture involves genuine trade-offs rather than single right answers

## Don't

- Don't critique kata designs for implementation details (code style, specific library choices) because the practice targets system-level decision-making, not implementation decisions
- Don't let groups spend more than 10 minutes on requirements clarification; ambiguity in kata scenarios is intentional because real architectural decisions are always made under incomplete information
- Don't declare one group's design the 'winner'; the point is to learn from the diversity of approaches and understand which trade-offs different designs make
- Don't use kata scenarios that are too narrowly scoped to a single domain or too abstractly philosophical; the best katas have 3-5 distinct architectural tensions that require explicit trade-off decisions

## Case Study

**O'Reilly Media / ThoughtWorks**: O'Reilly's online learning platform runs Architectural Kata workshops as part of their 'Fundamentals of Software Architecture' course led by Neal Ford and Mark Richards. In live course sessions, hundreds of engineers are divided into groups of 4-5, given a kata scenario such as 'design a nationwide road warrior trip tracking system for 2 million users', and have 45 minutes to design and present an architecture. The format has become one of the most popular exercises in the course, with learners reporting that defending their designs under peer questioning dramatically accelerates architectural intuition compared to reading about patterns alone.

## Related Frameworks

- occams-razor-in-design (related)
- theory-of-constraints (related)
- first-principles-thinking (complement)
- trade-off-sliders (complement)

## Source

https://sdframe.caldis.me/frameworks/architectural-kata
