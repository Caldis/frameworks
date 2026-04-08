# Layered Architecture / 分层架构

- **Category**: architecture
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: system
- **Maturity**: foundational
- **Author**: Frank Buschmann, Regine Meunier, Hans Rohnert, Peter Sommerlad, Michael Stal, 1996, 1968
- **Adopters**: SAP, Oracle, IBM, Microsoft, Salesforce

Traditional n-tier architecture separating presentation, business logic, and data access into horizontal layers with strict dependency rules

_将表现层、业务逻辑层和数据访问层分离为水平层次，并设定严格依赖规则的传统N层架构_

## When to Use

Apply this framework when:
- When building traditional enterprise applications with clear separation between UI, business rules, and data storage
- When the team is relatively small and needs a straightforward, well-understood architecture pattern
- When the application has moderate complexity and does not require independent deployment of components
- When regulatory or organizational standards mandate a clear separation of concerns between tiers

## When NOT to Use

Stop and reconsider if:
- Highly distributed systems requiring independent scaling of individual components
- Real-time event-driven applications where synchronous layer traversal introduces unacceptable latency
- Microservices environments where teams need autonomous deployment and technology heterogeneity

## Core Concepts

- Layer isolation: Each layer encapsulates a specific concern and communicates only through well-defined interfaces
- Top-down dependency: Dependencies flow strictly downward from presentation to data, never upward
- Closed layers: Requests must pass through each layer sequentially without skipping, enforcing separation
- Open layers: Optional variant where certain layers can be bypassed for performance-critical paths
- Layer cohesion: Each layer groups related functionality together, making the system easier to understand and maintain

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Layered Architecture to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the logical layers required for your system (typically presentation, business logic, persistence, and database)
2. **Define strict dependency rules**: each layer may only depend on the layer directly below it, never upward or across
3. Design interfaces between layers so that each layer exposes a well-defined API to the layer above
4. Implement each layer as an independent module with its own internal structure and responsibilities
5. Validate layer isolation by ensuring no circular dependencies exist and that changes in one layer do not ripple through others

<details><summary>中文步骤</summary>

1. 识别系统所需的逻辑层（通常为表现层、业务逻辑层、持久化层和数据库层）
2. 定义严格的依赖规则：每一层只能依赖其直接下层，不可向上或跨层依赖
3. 设计层间接口，使每一层向上层暴露明确定义的API
4. 将每一层实现为独立模块，拥有各自的内部结构和职责
5. 验证层隔离性，确保不存在循环依赖，且一层的变更不会波及其他层

</details>

## Do

- Do enforce strict layer boundaries with compiler or build-tool checks because accidental cross-layer dependencies erode the architecture over time
- Do use dependency inversion at layer boundaries because it allows layers to be tested and replaced independently
- Do keep layers thin and focused because bloated layers become monolithic sub-systems that are hard to change
- Do document which layers are open versus closed because ambiguity leads to inconsistent layer bypass decisions

## Don't

- Don't create a sinkhole anti-pattern where requests pass through layers without any processing because it indicates unnecessary layering
- Don't allow the presentation layer to access the database directly because it defeats the purpose of separation
- Don't put business logic in the presentation or persistence layers because it creates tight coupling and duplication
- Don't add layers just for symmetry because unnecessary layers add latency and complexity without value

## Case Study

**SAP**: SAP's ERP system has historically been built on a layered architecture with a clear separation between the UI layer (SAP GUI/Fiori), the application server (ABAP business logic), and the database layer (initially Oracle/DB2, later HANA). This layered approach allowed SAP to migrate its database layer from traditional RDBMS to the in-memory HANA platform without rewriting the business logic or UI layers. The migration preserved decades of business rules while delivering 10-100x performance improvements in analytical queries.

## Related Frameworks

- modular-monolith (complement)
- c4-model (related)
- hexagonal-architecture (related)

## Source

https://sdframe.caldis.me/frameworks/layered-architecture
