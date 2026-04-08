# Monolith Decomposition Patterns / 单体分解模式

- **Category**: evolution
- **Complexity**: advanced
- **Quality**: maintainability, scalability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Sam Newman (Building Microservices); Martin Fowler (StranglerFig, BranchByAbstraction), 2004
- **Adopters**: Amazon, Uber, Twitter, Stack Overflow, Shopify

A catalog of proven strategies for systematically extracting microservices from a monolithic codebase while maintaining system stability and team velocity throughout the migration

_从单体代码库系统化提取微服务的成熟策略目录，在整个迁移过程中保持系统稳定性和团队速度_

## When to Use

Apply this framework when:
- Monoliths where deployment bottlenecks — all teams must coordinate releases — are measurably reducing team autonomy and delivery speed
- Specific bounded contexts within the monolith experiencing scaling problems that cannot be addressed without isolated deployment and resource allocation
- Organizations growing past 50 engineers where Conway's Law pressure makes a single codebase a social coordination problem as much as a technical one
- Acquisitions or platform migrations where the target architecture is services-based and the monolith must be incrementally replaced rather than big-bang rewritten

## When NOT to Use

Stop and reconsider if:
- Monoliths with fewer than 10 engineers where coordination overhead is manageable and the deployment bottleneck does not yet manifest
- Well-structured modular monoliths where internal module boundaries are clean — the right answer may be to preserve the monolith and strengthen its internal structure
- Systems under active business pressure where engineering bandwidth cannot absorb the productivity dip that accompanies any large-scale decomposition
- Teams lacking observability infrastructure — decomposing a monolith without distributed tracing and service-level metrics makes debugging regressions extremely difficult

## Core Concepts

- Seam: A natural boundary within the monolith where code can be separated with minimal changes — identified by analyzing import graphs, database table access patterns, and team ownership clusters
- Anti-Corruption Layer (ACL): An adapter layer that translates between the monolith's data model and the extracted service's model, preventing the old model from leaking into the new service's domain
- Dual-Write / Parallel Run: A transitional phase where both the monolith and the extracted service write to their respective data stores simultaneously, enabling comparison validation before full cutover
- Data Decomposition: The process of separating shared database tables into service-owned schemas, typically via the Database-per-Service pattern, which is often harder and riskier than code extraction
- Seam Catalogue: A living inventory of identified decomposition candidates, ranked by extraction priority, current coupling metrics, and assigned owning team — the primary planning artifact for a decomposition programme

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Monolith Decomposition Patterns to?
- What constraints or existing architecture do you need to work within?
- Has your team used Monolith Decomposition Patterns before? (This is an advanced framework)

## Implementation Steps

1. **Map the decomposition surface**: analyze the monolith's module dependency graph, identify seam boundaries (packages with low coupling to the rest), and rank extraction candidates by business value, team ownership clarity, and change frequency
2. **Select a decomposition pattern per seam**: apply Strangler Fig for greenfield functionality, Branch by Abstraction for in-place refactoring of hot paths, or Parallel Run for high-risk data migrations — match the pattern to the risk and reversibility needs
3. Establish data ownership boundaries before code boundaries: identify which tables belong to each candidate service, implement an anti-corruption layer for cross-boundary data access, and set a timeline for migrating shared tables to owned schemas
4. Extract incrementally with dual-write phases: run extracted services in shadow mode alongside the monolith, compare outputs to validate correctness, then progressively shift traffic using feature flags before retiring the monolith code path
5. **Measure decomposition health**: track monolith code coverage removal rate, inter-service coupling index, deployment frequency per extracted service, and P99 latency delta post-extraction to confirm each extraction delivers tangible improvement

<details><summary>中文步骤</summary>

1. 绘制分解面：分析单体的模块依赖图，识别接缝边界（与其余部分耦合度低的包），并按业务价值、团队所有权清晰度和变更频率对提取候选项排名
2. 为每个接缝选择分解模式：对绿地功能应用绞杀者无花果，对热路径的原地重构应用抽象分支，对高风险数据迁移应用并行运行——根据风险和可逆性需求匹配模式
3. 在代码边界之前建立数据所有权边界：识别哪些表属于每个候选服务，为跨边界数据访问实现防腐层，并设定将共享表迁移到自有模式的时间表
4. 通过双写阶段增量提取：以影子模式运行提取的服务与单体并行，比较输出以验证正确性，然后在停用单体代码路径前使用特性标志逐步转移流量
5. 衡量分解健康状况：追踪单体代码覆盖移除率、服务间耦合指数、每个提取服务的部署频率以及提取后P99延迟增量，以确认每次提取都带来实质性改善

</details>

## Do

- Do decompose data boundaries before or in parallel with code boundaries — a microservice that shares a database with the monolith is a distributed monolith, not a microservice
- Do measure the monolith's seam graph before starting — teams that skip this analysis tend to extract services along team lines rather than domain lines, creating chatty inter-service APIs
- Do use feature flags to control traffic migration to extracted services so you can roll back instantly without a deployment if correctness problems are discovered
- Do define done criteria for each extraction: ownership of the data store, zero cross-database joins, independent deployment pipeline, and team autonomy over technology choices

## Don't

- Don't start with a big-bang rewrite — the historical failure rate of full rewrites is over 80%; incremental extraction preserves working software throughout
- Don't extract services for technical reasons alone (language preference, framework modernity) — only extract when there is a concrete team autonomy or scaling problem to solve
- Don't ignore the distributed systems tax: extracted services introduce network latency, partial failure modes, and distributed transactions that add complexity the monolith did not have
- Don't underestimate the data decomposition problem — shared database tables with foreign keys, triggers, and implicit ownership are the hardest part of most decompositions

## Case Study

**Uber**: Uber's 2016-2019 decomposition of their original Node.js monolith ('God') into domain microservices is one of the most documented large-scale monolith decompositions. They applied Strangler Fig at the API gateway level, routing specific endpoints to new Go-based services while the Node.js monolith continued handling the remainder. Their key learning: database decomposition was 3-5x more effort than code decomposition. Teams that extracted services without migrating data ownership created 'nano-monoliths' — services that still required coordinated deployment due to shared schema dependencies.

## Related Frameworks

- strangler-fig-pattern (related)
- branch-by-abstraction (related)
- parallel-run (related)
- database-migration-patterns (related)
- expansion-contraction-pattern (related)

## Source

https://sdframe.caldis.me/frameworks/monolith-decomposition-patterns
