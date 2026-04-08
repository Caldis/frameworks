# Mob/Ensemble Programming / 群体编程 / 集合编程

- **Category**: team
- **Complexity**: beginner
- **Quality**: maintainability, usability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Woody Zuill, ~2012, 1975
- **Adopters**: Hunter Industries, Cucumber, Shopify, Unruly Media, LEGO

The whole team works together on one task at one computer, with a rotating driver and navigators providing real-time collaboration

_整个团队在一台电脑上共同完成一项任务，轮换驾驶员和领航员进行实时协作_

## When to Use

Apply this framework when:
- Complex, ambiguous problems where diverse perspectives significantly improve the solution quality
- Onboarding new team members who need to absorb team practices, codebase knowledge, and domain context quickly
- Critical path work where defects would be very costly and real-time review provides higher quality than async code review
- Teams with knowledge silos where expertise is concentrated in one or two people and needs to be distributed

## When NOT to Use

Stop and reconsider if:
- Routine, well-understood tasks where individual work is more efficient and mob programming adds overhead without quality benefit
- Teams larger than 6 people — beyond this size, navigators cannot all contribute meaningfully and engagement drops
- Remote teams without reliable, low-latency screen-sharing tools — network lag makes the Driver experience frustrating
- Highly independent tasks that do not benefit from real-time collaboration (e.g., documentation, data entry, configuration)

## Core Concepts

- Driver-Navigator pattern: The Driver operates the keyboard but does not make design decisions — Navigators provide the thinking while the Driver translates it to code
- Strong-style pairing: 'For an idea to go from your head into the computer, it must go through someone else's hands' — Llewellyn Falco's principle that ensures knowledge transfer
- Whole-team ownership: Because everyone participates in writing every line of code, there is no individual code ownership and no knowledge silos
- Continuous code review: With multiple Navigators watching every keystroke, defects are caught in real-time rather than in post-hoc reviews
- Brooks's communication insight: Mob programming inverts Brooks's Law — instead of n*(n-1)/2 communication channels creating overhead, the single shared context eliminates miscommunication

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Mob/Ensemble Programming to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Gather the full team (3-6 people) at one workstation with a large shared display or screen-sharing tool
2. Designate one person as the Driver (types code) and everyone else as Navigators (direct the approach and design)
3. Rotate the Driver role on a fixed timer (typically every 10-15 minutes) to maintain engagement and shared ownership
4. Navigators discuss design, catch errors, and guide the Driver at the highest level of abstraction they can follow
5. Use retrospectives after each session to adjust rotation intervals, team composition, and facilitation practices

<details><summary>中文步骤</summary>

1. 将整个团队（3-6 人）聚集在一个工作站前，使用大型共享显示器或屏幕共享工具
2. 指定一人为驾驶员（键入代码），其他人为领航员（指导方法和设计）
3. 按固定计时器（通常每 10-15 分钟）轮换驾驶员角色，以保持参与度和共同所有权
4. 领航员讨论设计、发现错误，并在驾驶员能跟上的最高抽象层面进行指导
5. 每次会议后使用回顾来调整轮换间隔、团队组成和引导实践

</details>

## Do

- Keep rotation intervals short (10-15 minutes) to maintain energy and prevent the Driver from zoning out
- Start with well-defined, time-boxed sessions (2-3 hours) rather than all-day mob programming to avoid fatigue
- Use mob programming selectively for high-value work: complex design, critical bugs, or knowledge transfer — not routine tasks
- Create psychological safety so junior team members feel comfortable navigating and voicing ideas to senior colleagues

## Don't

- Don't use mob programming for simple, well-understood tasks where one person would be equally effective — it is wasteful for routine work
- Don't let one dominant personality monopolize navigation — the facilitator must ensure all voices are heard
- Don't skip the Driver rotation — without rotation, mob programming degrades into one person coding while others watch passively
- Don't force mob programming on unwilling teams — the practice requires buy-in and psychological safety to be effective

## Case Study

**Hunter Industries**: Hunter Industries, a mid-sized irrigation equipment manufacturer in San Marcos, California, is where mob programming originated. In 2012, Woody Zuill's development team of 7 people began working together at a single workstation after a 'code retreat' exercise. Rather than returning to individual work, they continued the practice full-time. Over the next two years, the team reported a dramatic reduction in defects (virtually zero production bugs), elimination of code review bottlenecks, and a 10x improvement in onboarding speed for new developers. Brooks's predicted communication overhead paradoxically decreased because the shared context eliminated the need for status meetings, handoff documentation, and async coordination. The practice spread industry-wide after Zuill's 2014 Agile conference presentation.

## Related Frameworks

- team-topologies (complement)
- blameless-postmortems (complement)
- spotify-model (complement)
- engineering-ladder (complement)

## Source

https://sdframe.caldis.me/frameworks/mob-ensemble-programming
