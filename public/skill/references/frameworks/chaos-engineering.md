# Chaos Engineering / 混沌工程

- **Category**: quality
- **Complexity**: advanced
- **Quality**: reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Netflix, 2011, 2010
- **Adopters**: Netflix, Amazon, Google, Microsoft, Slack

Inject controlled failures to build confidence in system resilience

_注入受控故障以增强对系统韧性的信心_

## When to Use

Apply this framework when:
- Distributed systems where failures are inevitable and resilience must be validated proactively
- After major architectural changes to verify that new fault-tolerance mechanisms actually work
- Before peak traffic events (Black Friday, product launches) to uncover hidden weaknesses
- Organizations transitioning from monolith to microservices where failure modes multiply

## When NOT to Use

Stop and reconsider if:
- Systems without adequate monitoring and observability to measure experiment impact
- Early-stage startups where uptime matters more than resilience validation
- Monolithic systems with no redundancy where any failure causes total outage

## Core Concepts

- Steady State Hypothesis: A measurable definition of normal system behavior used as the experiment baseline
- Blast Radius: The scope of impact of a chaos experiment, starting small and gradually expanding
- Abort Conditions: Automated safety mechanisms that halt experiments when impact exceeds acceptable thresholds
- Game Days: Scheduled team exercises where chaos experiments are run with the whole team observing and responding
- Failure Injection: Deliberately introducing faults like latency, errors, or resource constraints into a running system

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Chaos Engineering to?
- What constraints or existing architecture do you need to work within?
- Has your team used Chaos Engineering before? (This is an advanced framework)

## Implementation Steps

1. **Define steady state**: establish measurable indicators of normal system behavior (latency p99, error rate, throughput) as your baseline
2. **Hypothesize impact**: predict what will happen when a specific failure is injected (e.g., 'losing one AZ won't increase error rate above 0.1%')
3. **Design the experiment**: choose the failure mode (network partition, pod kill, CPU spike, dependency latency) and the blast radius
4. **Run in production**: execute the experiment during business hours with automatic abort conditions if steady state degrades beyond thresholds
5. **Learn and harden**: analyze results, fix discovered weaknesses, update runbooks, and repeat experiments to verify fixes

<details><summary>中文步骤</summary>

1. 定义稳态：建立正常系统行为的可衡量指标（p99延迟、错误率、吞吐量）作为基线
2. 假设影响：预测注入特定故障后的结果（如「丢失一个可用区不会使错误率超过0.1%」）
3. 设计实验：选择故障模式（网络分区、Pod终止、CPU峰值、依赖延迟）和影响范围
4. 在生产环境运行：在业务时间执行实验，设置稳态超出阈值时自动中止的条件
5. 学习与加固：分析结果，修复发现的弱点，更新运维手册，重复实验验证修复效果

</details>

## Do

- Do start with small blast radius experiments because production chaos must be safe and controlled
- Do define abort conditions before every experiment because uncontrolled chaos is just an outage
- Do run experiments during business hours because that is when real failures happen and teams are available
- Do share findings widely because chaos experiments create organizational learning about system behavior

## Don't

- Don't run chaos experiments without monitoring in place because you cannot measure what you cannot observe
- Don't start in production without first practicing in staging because premature production chaos risks real outages
- Don't chaos-test without stakeholder buy-in because surprise outages destroy trust in the practice
- Don't treat chaos engineering as one-time because systems change and new weaknesses emerge continuously

## Case Study

**Netflix**: Netflix pioneered chaos engineering with Chaos Monkey, which randomly terminated production EC2 instances to force engineers to build resilient services. During the 2011 AWS US-East outage that took down Reddit, Quora, and others, Netflix remained operational because their systems had been hardened through continuous chaos experiments. This event validated the approach and inspired industry-wide adoption.

## Related Frameworks

- circuit-breaker-pattern (complement)
- bulkhead-pattern (complement)
- sli-slo-sla (complement)

## Source

https://sdframe.caldis.me/frameworks/chaos-engineering
