# Three Ways of DevOps / DevOps三步法

- **Category**: deployment
- **Complexity**: beginner
- **Quality**: reliability, maintainability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Gene Kim, 2013
- **Adopters**: Nordstrom, Nike, Capital One, Target, CSG International

Flow, Feedback, and Continual Learning as DevOps foundations

_以流动、反馈、持续学习为核心的DevOps基础原则_

## When to Use

Apply this framework when:
- Organizations seeking a foundational mental model for why DevOps practices work together
- Teams experiencing slow delivery pipelines, poor visibility into failures, or repeated incidents
- DevOps coaches and leaders who need a narrative framework to explain the philosophy behind specific practices
- Value stream mapping exercises where the goal is to identify which Way is weakest and needs investment

## When NOT to Use

Stop and reconsider if:
- Teams looking for specific prescriptive tooling recommendations rather than a philosophical framework
- Organizations that need a maturity assessment model with scoring (use CALMS or DORA instead)
- Contexts where the manufacturing metaphors (Theory of Constraints, Lean) don't resonate with the audience
- Very small teams already practicing continuous delivery who need advanced patterns rather than foundational philosophy

## Core Concepts

- First Way - Flow: Accelerate the left-to-right flow of work from Development to Operations by reducing batch sizes, eliminating waste, and making work visible
- Second Way - Feedback: Create right-to-left feedback loops at every stage so that problems are detected and corrected at their source before propagating downstream
- Third Way - Continual Learning: Foster a culture of experimentation, mastery, and knowledge sharing where failures become learning opportunities and improvements are systemic
- Systems Thinking: The Three Ways encourage optimizing the entire value stream rather than local silos, recognizing that local optimization often harms global throughput
- Theory of Constraints: Inspired by Goldratt's work, the Three Ways focus on identifying and elevating the constraint in the delivery pipeline

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Three Ways of DevOps to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **First Way - Flow**: optimize end-to-end delivery pipeline from dev to ops, minimizing batch size and WIP
2. Map the value stream and eliminate handoffs, queues, and rework that slow throughput
3. **Second Way - Feedback**: build fast feedback loops at every stage with automated testing and monitoring
4. Create telemetry and alerting so problems are detected and fixed at the source quickly
5. **Third Way - Continual Learning**: institutionalize blameless retrospectives, experimentation, and knowledge sharing

<details><summary>中文步骤</summary>

1. 第一步——流动：优化从开发到运维的端到端交付流水线，最小化批次大小和在制品数量
2. 绘制价值流图，消除拖慢吞吐量的交接、排队和返工环节
3. 第二步——反馈：在每个阶段通过自动化测试和监控构建快速反馈环路
4. 建立遥测和告警体系，在源头快速发现并修复问题
5. 第三步——持续学习：将无责任回顾、实验文化和知识共享制度化

</details>

## Do

- Do work on all three Ways simultaneously rather than sequentially, because Flow without Feedback creates fast but fragile pipelines
- Do use value stream mapping to visualize where work waits in queues, because most lead time is wait time, not work time
- Do invest in production telemetry and monitoring as a feedback mechanism, because you cannot improve what you cannot see
- Do celebrate learning from failures in blameless post-mortems, because fear of blame suppresses the Continual Learning loop

## Don't

- Don't focus only on the First Way (Flow/speed) and ignore quality feedback loops, because deploying fast without catching defects amplifies risk
- Don't treat the Three Ways as abstract philosophy without connecting them to concrete practices like CI/CD, monitoring, and blameless post-mortems
- Don't optimize individual team handoffs without looking at the end-to-end value stream, because local optimizations create upstream and downstream bottlenecks
- Don't skip the Third Way (Continual Learning) because it seems less urgent -- culture is the foundation

## Case Study

**Nordstrom**: Nordstrom's technology division applied the Three Ways during their 2015-2017 DevOps transformation. For Flow, they moved from biweekly releases to continuous deployment. For Feedback, they implemented full-stack observability with real-time dashboards visible to all teams. For Continual Learning, they established Game Day exercises simulating production failures. The result was a 3x improvement in deployment frequency and a 60% reduction in change failure rate.

## Related Frameworks

- calms-framework (complement)
- dora-metrics (complement)
- continuous-architecture (complement)

## Source

https://sdframe.caldis.me/frameworks/three-ways-devops
