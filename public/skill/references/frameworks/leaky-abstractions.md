# Leaky Abstractions / 抽象泄漏

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Joel Spolsky, 2002, 1992
- **Adopters**: Heroku, AWS (Lambda/Serverless), Microsoft (Entity Framework), Ruby on Rails (ActiveRecord), Docker

All non-trivial abstractions leak; design systems to handle the inevitable failures of abstraction layers

_所有非平凡抽象都会泄漏；设计系统时应考虑抽象层不可避免的失效_

## When to Use

Apply this framework when:
- When adopting a new abstraction layer (ORM, framework, cloud service) and you need to plan for the cases where it won't perfectly hide the underlying system
- When debugging production issues that trace back to abstraction layers behaving unexpectedly under edge conditions
- When designing an API or framework that will be used by developers who may not understand the underlying implementation
- When evaluating whether to build a custom abstraction vs using an existing one, weighing the leak surface of each option

## When NOT to Use

Stop and reconsider if:
- When working with trivial abstractions (simple wrapper functions, type aliases) where the abstraction is thin enough that leaks are inconsequential
- When the abstraction maps perfectly to the domain and there is no impedance mismatch (e.g., mathematical abstractions in numerical computing)
- When the team controls both sides of the abstraction and can modify it freely, reducing the cost of encountered leaks to near zero
- When the project is so short-lived that the probability of encountering an abstraction leak during its lifetime is negligible

## Core Concepts

- Law of Leaky Abstractions: All non-trivial abstractions, to some degree, are leaky — the underlying complexity they hide will eventually surface in edge cases, performance characteristics, or error modes
- Abstraction Cost Awareness: Abstractions are not free; they trade one kind of complexity (implementation detail) for another (learning the abstraction's model and its failure modes)
- Escape Hatch Design: Good abstractions provide clean escape hatches so that when leaks occur, users can drop to a lower level without abandoning the entire abstraction
- Two-Level Understanding: Effective use of leaky abstractions requires understanding both the abstraction and the underlying system — you can work at the high level most of the time but must be prepared to reason at the low level

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Leaky Abstractions to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify Abstraction Layers**: catalog all major abstractions in your system — ORMs, network protocols, file systems, cloud services, frameworks — and the implementation details they claim to hide
2. **Predict Leak Points**: for each abstraction, identify the scenarios where the underlying reality will surface — network latency in RPC frameworks, SQL specifics in ORMs, file system semantics differences across OS platforms
3. **Design Escape Hatches**: provide clean mechanisms for users to bypass the abstraction when it leaks, such as raw SQL access through an ORM or custom HTTP handling in a REST framework
4. **Document Known Leaks**: explicitly document the cases where the abstraction is known to leak, so users encounter documentation rather than mysterious bugs
5. **Monitor for New Leaks**: instrument abstraction boundaries to detect unexpected leak patterns in production (unusual error types, performance anomalies, fallback activations)

<details><summary>中文步骤</summary>

1. 识别抽象层：编目系统中所有主要抽象——ORM、网络协议、文件系统、云服务、框架——以及它们声称隐藏的实现细节
2. 预测泄漏点：为每个抽象识别底层现实会浮现的场景——RPC框架中的网络延迟、ORM中的SQL特性、跨操作系统平台的文件系统语义差异
3. 设计逃生口：提供清洁的机制让用户在抽象泄漏时绕过它，如通过ORM访问原始SQL或在REST框架中自定义HTTP处理
4. 记录已知泄漏：明确记录抽象已知泄漏的情况，使用户遇到文档而非神秘的错误
5. 监控新泄漏：在抽象边界设置检测，发现生产中意外的泄漏模式（异常错误类型、性能异常、降级激活）

</details>

## Do

- Do learn the layer below every abstraction you use, because when it leaks (and it will), you need mental models of both levels to debug effectively
- Do provide escape hatches in abstractions you build, because users will inevitably encounter cases your abstraction doesn't cover and they need a clean way out
- Do document known leak points explicitly in your API documentation, because 'here be dragons' warnings save users hours of confused debugging
- Do monitor abstraction boundaries in production for anomalous error rates, because new leak patterns often emerge under load or edge conditions you didn't test

## Don't

- Don't treat abstractions as airtight contracts, because the entire point of the law is that they will leak — defensive design anticipates this
- Don't add more abstraction layers to fix a leaky abstraction, because stacking leaky abstractions compounds the debugging difficulty exponentially
- Don't blame users for needing to understand the underlying system, because requiring two-level understanding is a consequence of abstraction physics, not user failure
- Don't build abstractions that hide failure modes, because the most dangerous leaks are the ones that silently corrupt data or degrade performance without visible errors

## Case Study

**Heroku**: Heroku's Platform-as-a-Service abstracted away server management, promising developers they could 'just push code.' But as applications scaled, the abstraction leaked in predictable ways: dyno cycling caused unpredictable request latency, the shared routing layer created noisy-neighbor performance issues, and the filesystem's ephemeral nature surprised developers who expected persistent local storage. Heroku responded well by documenting these leaks explicitly in their architecture documentation and providing escape hatches (dedicated dynos, external storage services, custom buildpacks). Companies that succeeded on Heroku were those whose engineers understood the underlying infrastructure model despite the abstraction, confirming Spolsky's law.

## Related Frameworks

- deep-vs-shallow-modules (complement)
- separation-of-concerns (prerequisite)
- complexity-budget (complement)
- design-by-contract (complement)

## Source

https://sdframe.caldis.me/frameworks/leaky-abstractions
