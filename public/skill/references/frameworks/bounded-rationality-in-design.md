# Bounded Rationality in Design / 设计中的有限理性

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: usability, maintainability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Herbert A. Simon, 1947/1996
- **Adopters**: Amazon, Apple, Google (Material Design), Stripe (Checkout), Duolingo

Designers satisfice rather than optimize; design for human cognitive limits rather than ideal rationality

_设计者满意即可而非追求最优；为人类认知极限而非理想理性而设计_

## When to Use

Apply this framework when:
- When users consistently make suboptimal choices in your product because they are overwhelmed by options or information density
- When designing interfaces for high-stress or time-critical environments (medical, aviation, emergency response) where cognitive overload causes errors
- When A/B tests show that adding more features or options decreases rather than increases user satisfaction or task completion
- When designing AI-assisted decision tools where the system needs to present recommendations within human cognitive processing limits

## When NOT to Use

Stop and reconsider if:
- When the decision has irreversible high-stakes consequences (surgery, legal contracts) where satisficing could lead to catastrophic errors and deliberate analysis is warranted
- When users are domain experts who need full control and visibility, such as professional traders or system administrators
- When regulatory requirements mandate that all options be presented equally and prominently, preventing choice architecture optimization
- When the decision is truly novel and users have no prior reference point to satisfice against, requiring guided exploration instead

## Core Concepts

- Satisficing: People choose the first option that meets their minimum threshold rather than evaluating all options to find the optimum — design should support this behavior, not fight it
- Cognitive Bandwidth: Working memory can hold roughly 4 items simultaneously; any interface that demands more simultaneous considerations will degrade decision quality
- Recognition over Recall: Humans are far better at recognizing correct options when presented than recalling them from memory — interfaces should show rather than demand
- Decision Fatigue: The quality of decisions degrades over a session of repeated choices; high-stakes decisions should be placed early and lower-stakes ones should use smart defaults

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Bounded Rationality in Design to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Map Cognitive Constraints**: identify the cognitive limits users face in your context — working memory capacity (~4 chunks), attention span, decision fatigue, and expertise level
2. **Identify Satisficing Points**: determine where users will 'satisfice' (choose the first good-enough option) rather than exhaustively evaluate all alternatives
3. **Reduce Choice Architecture Complexity**: restructure choices to present fewer, more distinct options with clear differentiators, respecting the limits of comparative evaluation
4. **Design for Recognition over Recall**: use visible cues, defaults, and progressive disclosure so users can recognize correct actions rather than having to remember them
5. **Test with Cognitive Load**: validate designs under realistic cognitive load conditions (multitasking, time pressure, interruptions) rather than in ideal laboratory settings

<details><summary>中文步骤</summary>

1. 映射认知约束：识别用户在特定场景中面对的认知极限——工作记忆容量（约4个组块）、注意力持续时间、决策疲劳和专业水平
2. 识别满意点：确定用户会在哪里「满意即可」（选择第一个足够好的选项）而非穷举评估所有备选方案
3. 降低选择架构复杂度：重构选择以呈现更少、更有区分度的选项和清晰的差异化因素，尊重比较评估的极限
4. 为识别而非回忆而设计：使用可见线索、默认值和渐进式展示，使用户能识别正确操作而非需要记住它们
5. 在认知负荷下测试：在真实认知负荷条件（多任务、时间压力、中断）下验证设计，而非在理想实验室环境中

</details>

## Do

- Do design default options that work well for 80% of users, because most people will accept a good default rather than customizing
- Do limit choices to 3-5 options at each decision point, because more options increase decision time and decrease satisfaction (Hick's Law)
- Do use progressive disclosure to show advanced options only when needed, because revealing everything at once overwhelms bounded cognition
- Do test designs with tired, distracted, and novice users, because they reveal cognitive limit violations that expert testers miss

## Don't

- Don't assume users will read all information before making a decision, because bounded rationality means they will scan, satisfice, and move on
- Don't design for the power user by default, because the vast majority of users operate under more severe cognitive constraints than designers anticipate
- Don't offer unlimited customization as a substitute for good defaults, because choice overload causes decision paralysis rather than empowerment
- Don't rely on user training to overcome poor interface design, because cognitive limits are biological constraints that training cannot eliminate

## Case Study

**Amazon**: Amazon's one-click purchasing is a textbook application of bounded rationality in design. By recognizing that the traditional multi-step checkout process demanded too many sequential decisions (shipping address, payment method, delivery speed, gift wrapping, confirmation), Amazon collapsed the entire flow into a single pre-configured action. This design respects the satisficing behavior of users who have already decided to buy — they want the first good-enough path to completion. The feature, patented in 1999, contributed to a measurable increase in conversion rates because it eliminated the decision fatigue that caused cart abandonment in multi-step flows.

## Related Frameworks

- design-thinking-ideo (complement)
- six-thinking-hats (related)
- trade-off-sliders (related)

## Source

https://sdframe.caldis.me/frameworks/bounded-rationality-in-design
