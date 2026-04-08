# Six Thinking Hats / 六顶思考帽

- **Category**: thinking
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Edward de Bono, 1985
- **Adopters**: DuPont, Prudential, IBM, Siemens, NASA, British Airways

Parallel thinking method using 6 cognitive perspective modes

_采用六种认知视角模式的平行思维决策方法_

## When to Use

Apply this framework when:
- When meetings devolve into adversarial debates where people argue positions rather than exploring the problem from multiple angles
- When a design review is dominated by a few vocal critics and quieter team members' perspectives (optimism, creativity, data) go unheard
- When a team needs to make a consequential architectural decision and wants to ensure all cognitive angles are systematically covered
- When post-mortems become blame sessions and you need a structured way to separate factual analysis from emotional reactions

## When NOT to Use

Stop and reconsider if:
- When the decision is trivial and doesn't warrant the overhead of a structured multi-perspective exercise
- When only one or two people are involved, because the method's primary value is in coordinating group cognition
- When the team needs deep analytical investigation rather than broad perspective exploration
- When cultural norms make it unsafe to express Red Hat (emotional) or Black Hat (critical) views openly, undermining the method's core mechanism

## Core Concepts

- Parallel Thinking: All participants wear the same 'hat' simultaneously, thinking in the same direction together, eliminating adversarial argument and ego-driven debate
- Cognitive Mode Separation: Deliberately separating data (White), emotion (Red), caution (Black), optimism (Yellow), creativity (Green), and process (Blue) prevents them from muddling each other
- Legitimate Emotional Input: The Red Hat gives explicit permission to express feelings and intuition without justification, acknowledging that emotion is a valid input to decision-making
- Structured Exploration: By sequencing hats deliberately, a facilitator ensures every perspective gets airtime regardless of team dynamics or personality dominance

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Six Thinking Hats to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Set the Focus Question**: define the decision or design problem that all participants will examine together
2. **White Hat (Data)**: present all known facts, data, and information gaps without interpretation
3. Red Hat (Emotion) + Black Hat (Caution) + Yellow Hat (Optimism): surface gut reactions, risks, and benefits in dedicated turns
4. **Green Hat (Creativity)**: generate alternative ideas and creative possibilities without criticism
5. **Blue Hat (Process)**: synthesize all perspectives, identify consensus, and define next actions

<details><summary>中文步骤</summary>

1. 设定焦点问题：定义所有参与者将共同检视的决策或设计问题
2. 白帽（数据）：不加诠释地呈现所有已知事实、数据和信息缺口
3. 红帽（情感）+黑帽（谨慎）+黄帽（乐观）：在专项轮次中分别表达直觉反应、风险与收益
4. 绿帽（创意）：在无批判氛围下生成替代创意与创造性可能性
5. 蓝帽（流程）：综合所有视角，识别共识，定义后续行动

</details>

## Do

- Do enforce one hat at a time for all participants, because parallel thinking only works when everyone explores the same cognitive mode simultaneously
- Do use a designated facilitator wearing the Blue Hat, because someone needs to manage hat transitions and ensure balanced time allocation
- Do explicitly invite Red Hat contributions from everyone, because people often suppress intuition in technical discussions and gut feelings can surface important risks
- Do timebox each hat to 3-5 minutes, because time pressure forces concise contributions and prevents any single perspective from dominating the session

## Don't

- Don't allow participants to wear different hats simultaneously, because mixing critique (Black) with ideation (Green) kills creative ideas before they're fully formed
- Don't skip the Red Hat, because unexpressed emotional resistance to a decision will surface later as passive resistance or sabotage
- Don't use Six Thinking Hats for every small decision, because the structured format adds overhead that's only justified for decisions with significant consequences
- Don't let the Black Hat dominate, because risk-averse cultures naturally over-index on caution and the Black Hat can become a tool for blocking rather than informing

## Case Study

**DuPont**: DuPont adopted Six Thinking Hats across their organization in the early 2000s as part of their innovation and decision-making culture reform. Previously, their senior leadership meetings were characterized by lengthy adversarial debates. After implementing the method, DuPont reported that typical meeting durations dropped from multiple hours to under 45 minutes for the same agenda items, while the quality of decisions improved because all perspectives (data, risk, emotion, creativity) were systematically explored rather than the loudest voice winning.

## Related Frameworks

- problem-framing-how-now-wow (complement)
- first-principles-thinking (alternative)
- trade-off-sliders (complement)

## Source

https://sdframe.caldis.me/frameworks/six-thinking-hats
