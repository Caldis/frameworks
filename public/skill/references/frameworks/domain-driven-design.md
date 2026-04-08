# Domain-Driven Design (DDD) / 领域驱动设计

- **Category**: thinking
- **Complexity**: advanced
- **Quality**: maintainability
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Eric Evans, 2003
- **Adopters**: Netflix, Spotify, Zalando, Thoughtworks, VMware (Spring Team), Just Eat Takeaway

Model software around core business domain language and logic

_围绕核心业务领域语言与逻辑构建软件模型_

## When to Use

Apply this framework when:
- When your system's core complexity lies in the business rules rather than technical infrastructure
- When multiple teams need to work on the same large system and you need clear ownership boundaries
- When domain experts and developers consistently miscommunicate because they use different terminology
- When a legacy monolith needs to be decomposed into services along meaningful business boundaries

## When NOT to Use

Stop and reconsider if:
- When building a simple CRUD application with minimal business logic where the overhead of domain modeling isn't justified
- When the team has no access to domain experts and cannot establish a meaningful ubiquitous language
- When working on a short-lived prototype or proof of concept where speed of delivery matters more than model accuracy
- When the project is purely technical infrastructure (logging, monitoring, CI/CD) with no business domain to model

## Core Concepts

- Ubiquitous Language: A shared vocabulary between developers and domain experts that is used consistently in code, conversation, and documentation to eliminate translation errors
- Bounded Context: An explicit boundary within which a particular domain model is defined and applicable, preventing one team's model from corrupting another's
- Aggregate: A cluster of domain objects treated as a single unit for data changes, enforcing consistency boundaries within a bounded context
- Context Mapping: The practice of explicitly documenting relationships and integration patterns between bounded contexts to manage dependencies

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Domain-Driven Design (DDD) to?
- What constraints or existing architecture do you need to work within?
- Has your team used Domain-Driven Design (DDD) before? (This is an advanced framework)

## Implementation Steps

1. **Knowledge Crunching**: collaborate with domain experts to extract and refine the core domain model through iterative conversation
2. **Define the Ubiquitous Language**: establish a shared, precise vocabulary used consistently in code, docs, and team discussion
3. **Identify Bounded Contexts**: draw explicit boundaries around each subdomain where a particular model applies without ambiguity
4. **Model the Core Domain**: design entities, value objects, aggregates, and domain events that reflect real business rules
5. **Map Context Relationships**: define integration patterns (Anti-Corruption Layer, Shared Kernel, Open Host) between bounded contexts

<details><summary>中文步骤</summary>

1. 知识提炼：与领域专家协作，通过反复对话提取并精化核心领域模型
2. 定义统一语言：建立在代码、文档和团队讨论中统一使用的精确词汇表
3. 识别限界上下文：为每个子领域划定明确边界，确保模型在边界内无歧义
4. 建模核心领域：设计能够反映真实业务规则的实体、值对象、聚合与领域事件
5. 映射上下文关系：定义限界上下文之间的集成模式（防腐层、共享内核、开放主机等）

</details>

## Do

- Do invest heavily in conversations with domain experts before writing code, because the model quality depends on how well you understand the domain
- Do name classes, methods, and variables using the Ubiquitous Language, because code that speaks the domain's language is self-documenting and catches modeling errors early
- Do keep aggregates small and focused on consistency boundaries, because large aggregates create contention and scalability problems
- Do draw context maps as living documents, because team and system boundaries evolve and stale maps cause integration surprises

## Don't

- Don't apply DDD tactical patterns (entities, value objects, repositories) without first doing strategic design, because patterns without bounded contexts create distributed monoliths
- Don't force every subdomain to use rich domain models, because supporting and generic subdomains often work fine with simpler CRUD approaches
- Don't let the database schema drive your domain model, because persistence is an infrastructure concern that should adapt to the model, not the reverse
- Don't create a single universal model shared across all teams, because different contexts genuinely need different representations of the same concept

## Case Study

**Netflix**: Netflix applied DDD principles when decomposing their monolithic DVD rental system into microservices for streaming. They identified distinct bounded contexts such as content catalog, subscriber management, recommendation engine, and streaming delivery, each with its own ubiquitous language and team ownership. This decomposition enabled teams to deploy independently and scale each context according to its unique load patterns, supporting the company's growth from 20 million to over 200 million subscribers.

## Related Frameworks

- ddd-tactical-patterns (extends)
- cqrs-pattern (complement)
- event-sourcing-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/domain-driven-design
