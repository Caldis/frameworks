# SDFrame Framework Catalog

> 300 frameworks across 13 categories.
> Use this to search and filter. Each row: slug | name | category | quality concerns | description.

## Design Thinking / 设计思考 (23)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| design-thinking-ideo | Design Thinking (IDEO/Stanford d.school) | beginner | usability | Human-centered 5-stage empathy-to-test design process |
| domain-driven-design | Domain-Driven Design (DDD) | advanced | maintainability | Model software around core business domain language and logic |
| systems-thinking | Systems Thinking | intermediate | maintainability, reliability | Analyze software as interconnected feedback loops, not parts |
| jobs-to-be-done | Jobs-to-Be-Done (JTBD) | intermediate | usability | Frame user needs as functional, social, emotional 'jobs' |
| first-principles-thinking | First Principles Thinking | intermediate | maintainability | Decompose problems to foundational truths, then rebuild up |
| design-by-contract | Design by Contract (DbC) | intermediate | reliability, testability | Define explicit preconditions, postconditions, invariants per unit |
| cynefin-framework | Cynefin Framework | intermediate | maintainability | Categorize problems into Simple, Complicated, Complex, Chaotic |
| wardley-mapping | Wardley Mapping | advanced | maintainability, scalability | Visualize value chains by evolution stage to drive strategy |
| problem-framing-how-now-wow | Problem Framing (How-Now-Wow Matrix) | beginner | usability | Frame and prioritize ideas by feasibility and originality axes |
| six-thinking-hats | Six Thinking Hats | beginner | maintainability | Parallel thinking method using 6 cognitive perspective modes |
| analogical-thinking | Analogical Thinking | intermediate | maintainability | Transfer structural solutions from source domains to software |
| human-ai-interaction-design | Human-AI Interaction Design (HAI) | advanced | usability, reliability | Design AI-augmented workflows balancing autonomy and control |
| agent-oriented-design-thinking | Agent-Oriented Design Thinking | advanced | reliability, scalability | Design multi-agent systems around roles, goals, and environments |
| trade-off-sliders | Trade-off Sliders Model | beginner | maintainability | Make design trade-offs explicit by ranking competing qualities |
| complexity-budget | Complexity Budget | intermediate | maintainability | Every module gets a complexity budget; exceed it and you must decompose |
| deep-vs-shallow-modules | Deep vs Shallow Modules | intermediate | maintainability, usability | Prefer deep modules (simple interface, complex implementation) over shallow ones (complex interface, simple implementation) |
| bounded-rationality-in-design | Bounded Rationality in Design | intermediate | usability, maintainability | Designers satisfice rather than optimize; design for human cognitive limits rather than ideal rationality |
| separation-of-concerns | Separation of Concerns | beginner | maintainability | The foundational principle of modular design: each module should address a single, well-defined concern |
| leaky-abstractions | Leaky Abstractions | intermediate | reliability, maintainability | All non-trivial abstractions leak; design systems to handle the inevitable failures of abstraction layers |
| worse-is-better | Worse is Better | intermediate | maintainability, portability | Simpler, less correct implementations often win over complex, theoretically correct ones through easier adoption and faster evolution |
| occams-razor-in-design | Occam's Razor in Design | beginner | maintainability | Among competing design solutions, prefer the simplest one that fully satisfies the requirements |
| architectural-kata | Architectural Kata | intermediate | maintainability | Structured practice exercises where architects design systems for fictional scenarios to build architectural intuition and decision-making skills |
| theory-of-constraints | Theory of Constraints (TOC) | intermediate | performance, maintainability | Identify and systematically exploit the binding constraint in a system to maximize throughput, then elevate or break it |

## Architecture Decisions / 架构决策 (23)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| adr | Architecture Decision Records (ADR) | beginner | maintainability | Lightweight docs capturing context and rationale for decisions |
| atam | Architecture Tradeoff Analysis Method (ATAM) | advanced | reliability, performance | Structured method to evaluate architecture against quality goals |
| cap-theorem | CAP Theorem | intermediate | reliability, scalability | Distributed systems can guarantee only 2 of 3: C, A, P |
| c4-model | C4 Model | beginner | maintainability | Four-level hierarchy for visualizing software architecture |
| cqrs-pattern | CQRS Pattern | advanced | performance, scalability | Separate read/write models for optimized scalability |
| eda | Event-Driven Architecture (EDA) | intermediate | scalability, reliability | Systems communicate via asynchronous events for loose coupling |
| microservices-decomposition | Microservices Decomposition Patterns | advanced | scalability, maintainability | Strategies to split monoliths into focused, independent services |
| saga-pattern | Saga Pattern | advanced | reliability | Manage distributed transactions via compensating actions |
| togaf-adm | TOGAF Architecture Development Method (ADM) | advanced | maintainability | Iterative enterprise architecture lifecycle with defined phases |
| qaw | Quality Attribute Workshop (QAW) | intermediate | reliability, usability | Elicit and prioritize quality attribute requirements collaboratively |
| actor-model | Actor Model | intermediate | scalability, reliability | Concurrent computation using message-passing actors |
| dependency-injection | Dependency Injection | beginner | testability, maintainability | Invert control flow by injecting dependencies externally |
| service-mesh-pattern | Service Mesh Pattern | advanced | reliability, observability | Dedicated infrastructure for service-to-service communication |
| llm-system-design-patterns | LLM System Design Patterns | advanced | reliability, scalability | Architectural patterns for production LLM-powered applications |
| layered-architecture | Layered Architecture | beginner | maintainability | Traditional n-tier architecture separating presentation, business logic, and data access into horizontal layers with strict dependency rules |
| modular-monolith | Modular Monolith | intermediate | maintainability, scalability | A single deployable unit with strictly enforced module boundaries, combining monolith simplicity with modular maintainability |
| space-based-architecture | Space-Based Architecture | advanced | scalability, performance | Distributed architecture using in-memory data grids and processing units to achieve high scalability by eliminating the central database bottleneck |
| pipe-and-filter | Pipe and Filter Architecture | intermediate | maintainability, portability | Architecture pattern that decomposes data processing into independent, composable stages connected by data channels |
| architecture-fitness-functions | Architecture Fitness Functions | intermediate | maintainability, reliability | Automated, objective compliance checks that continuously validate whether an architecture meets its defined characteristics |
| decision-matrix | Decision Matrix (Weighted Scoring) | beginner | maintainability | Systematic trade-off evaluation method that scores architecture alternatives against weighted criteria to make objective, transparent decisions |
| cell-based-architecture | Cell-Based Architecture | advanced | reliability, scalability, security | An architectural pattern where a system is divided into independent, self-contained cells that own their data, compute, and network resources, enabling granular scaling, fault isolation, and independent deployability |
| ports-and-adapters | Ports and Adapters (Hexagonal Architecture) | intermediate | maintainability, testability | Alistair Cockburn's architectural pattern that isolates the application core from external technology concerns by defining explicit ports (interfaces) and adapters (technology-specific implementations) |
| evolutionary-architecture | Evolutionary Architecture | advanced | maintainability, scalability, reliability | Neal Ford's approach to designing software systems that support incremental, guided change across all dimensions through fitness functions and architectural coupling analysis |

## Coding Practices / 编码实践 (39)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| solid-principles | SOLID Principles | intermediate | maintainability | Five OOP design principles for maintainable, flexible code |
| grasp-patterns | GRASP Patterns | intermediate | maintainability | Nine patterns for assigning responsibility to classes properly |
| gof-design-patterns | GoF Design Patterns | intermediate | maintainability | 23 classic creational, structural, behavioral design patterns |
| clean-code-principles | Clean Code Principles | beginner | maintainability | Write readable, simple, expressive code that minimizes surprise |
| ddd-tactical-patterns | DDD Tactical Patterns | advanced | maintainability | Implementation building blocks: entities, value objects, aggregates |
| hexagonal-architecture | Hexagonal Architecture | advanced | testability, maintainability | Isolate core logic from external concerns via ports and adapters |
| functional-core-imperative-shell | Functional Core / Imperative Shell | intermediate | testability, maintainability | Pure logic in the center, side effects only at the boundaries |
| reactive-extensions | Reactive Extensions (Rx) | advanced | performance, scalability | Compose async event streams with observable sequences and operators |
| richardson-maturity-model | Richardson Maturity Model | intermediate | maintainability, usability | Four levels of REST API maturity from RPC to hypermedia |
| event-sourcing-pattern | Event Sourcing Pattern | advanced | reliability, maintainability | Persist state as an immutable append-only sequence of events |
| prompt-engineering-patterns | Prompt Engineering Patterns | beginner | usability, reliability | Structured techniques for crafting effective LLM prompts |
| tool-use-react-pattern | Tool-Use / ReAct Pattern | advanced | reliability | Enable LLM agents to call external tools in reasoning loops |
| conventional-comments | Conventional Comments | beginner | maintainability | Prefixed code review comments for clarity and actionability |
| semantic-versioning | Semantic Versioning (SemVer) | beginner | maintainability, reliability | Version APIs and libraries with MAJOR.MINOR.PATCH semantics |
| contract-testing | Contract Testing | intermediate | reliability, testability | Verify service interactions via shared consumer-provider contracts |
| strangler-fig-at-code-level | Strangler Fig at Code Level | advanced | maintainability | Incrementally replace legacy code modules by wrapping them and redirecting calls to new implementations |
| feature-toggles-at-code-level | Feature Toggles at Code Level | intermediate | maintainability | Control code execution paths using conditional branching to enable or disable features without redeployment |
| immutability-pattern | Immutability Pattern | intermediate | reliability, maintainability | Prefer immutable data structures to eliminate shared mutable state and improve safety, concurrency, and reasoning |
| null-object-pattern | Null Object Pattern | beginner | reliability, maintainability | Eliminate null checks by providing default-behavior objects that implement the expected interface with no-op or safe defaults |
| type-driven-design | Type-Driven Design | advanced | reliability, maintainability | Use the type system to encode business rules and constraints, making invalid states unrepresentable at compile time |
| strategy-pattern | Strategy Pattern | intermediate | maintainability | Encapsulate interchangeable algorithms behind a common interface |
| observer-pattern | Observer Pattern | intermediate | maintainability | Notify dependents automatically when state changes |
| factory-method-pattern | Factory Method Pattern | intermediate | maintainability | Delegate object creation to subclasses |
| abstract-factory-pattern | Abstract Factory Pattern | intermediate | maintainability | Create families of related objects without specifying concrete classes |
| decorator-pattern | Decorator Pattern | intermediate | maintainability | Attach additional responsibilities to objects dynamically |
| adapter-pattern | Adapter Pattern | intermediate | maintainability, portability | Convert one interface to another that clients expect |
| singleton-pattern | Singleton Pattern | beginner | reliability, maintainability | Ensure a class has only one instance with a global access point |
| command-pattern | Command Pattern | intermediate | maintainability, reliability | Encapsulate a request as an object for undo, queue, or logging |
| template-method-pattern | Template Method Pattern | beginner | maintainability | Define algorithm skeleton in base class, let subclasses override specific steps |
| state-pattern | State Pattern | intermediate | maintainability, reliability | Allow object behavior to change automatically when its internal state changes |
| repository-pattern | Repository Pattern | intermediate | maintainability, testability | Mediate between domain model and data mapping layers using a collection-like interface |
| unit-of-work-pattern | Unit of Work Pattern | intermediate | reliability, maintainability | Track object changes during a business transaction and commit them as a single atomic batch |
| data-mapper-pattern | Data Mapper Pattern | advanced | maintainability, testability | Transfer data between in-memory objects and a database while keeping them independent of each other |
| builder-pattern | Builder Pattern | beginner | maintainability, usability | Construct complex objects step by step using a fluent API, separating construction from representation |
| middleware-pipeline-pattern | Middleware / Pipeline Pattern | intermediate | maintainability | Chain processing steps that can inspect, transform, or short-circuit a request as it flows through a pipeline |
| strangler-fig-code-level | Strangler Fig at Code Level | intermediate | maintainability, reliability | Gradually replacing legacy code modules by growing new implementations alongside old ones until the legacy can be safely removed |
| vertical-slice-architecture | Vertical Slice Architecture | intermediate | maintainability, testability | Organizing code by feature rather than by technical layer, grouping all code for a feature — from HTTP handler to database query — in a single cohesive slice |
| specification-pattern | Specification Pattern | intermediate | maintainability, testability | Encapsulating business rules as composable, reusable objects that can be combined with boolean logic to express complex domain predicates |
| flyweight-pattern | Flyweight Pattern | intermediate | performance, maintainability | GoF structural pattern that minimises memory usage by sharing fine-grained objects whose state can be externalised, enabling large numbers of similar objects to be represented efficiently. |

## Quality Engineering / 质量保障 (25)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| test-pyramid | Test Pyramid | beginner | testability, reliability | Balance unit, integration, and E2E tests by cost and speed |
| testing-trophy | Testing Trophy | intermediate | testability, reliability | Emphasize integration tests as the highest-ROI testing layer |
| tdd | Test-Driven Development (TDD) | intermediate | testability, maintainability | Write failing tests first, then code to pass, then refactor |
| bdd | Behavior-Driven Development (BDD) | intermediate | testability, usability | Specify behavior in Given-When-Then shared by all stakeholders |
| property-based-testing | Property-Based Testing | advanced | testability, reliability | Test invariant properties with auto-generated random inputs |
| chaos-engineering | Chaos Engineering | advanced | reliability | Inject controlled failures to build confidence in system resilience |
| circuit-breaker-pattern | Circuit Breaker Pattern | intermediate | reliability | Prevent cascading failures by short-circuiting failing calls |
| bulkhead-pattern | Bulkhead Pattern | advanced | reliability | Isolate components so a failure in one doesn't sink the whole system |
| use-method | USE Method | intermediate | observability, performance | Check Utilization, Saturation, Errors for every resource |
| red-method | RED Method | beginner | observability, performance | Monitor Request rate, Error rate, Duration for each service |
| four-golden-signals | Four Golden Signals | beginner | observability, reliability | Monitor Latency, Traffic, Errors, Saturation for any service |
| llm-evaluation-framework | LLM Evaluation Framework | advanced | reliability, testability | Systematically evaluate LLM output quality and reliability |
| ai-output-verification | AI Output Verification | intermediate | reliability, security | Multi-layer checks ensuring AI-generated content is trustworthy |
| agent-reliability-patterns | Agent Reliability Patterns | advanced | reliability | Patterns ensuring AI agents behave predictably in production |
| prompt-testing | Prompt Testing | intermediate | testability, reliability | Automated regression testing for LLM prompt changes |
| mutation-testing | Mutation Testing | intermediate | testability | Test the tests by introducing code mutations and verifying that tests catch them |
| snapshot-testing | Snapshot Testing | beginner | testability | Capture output snapshots for regression detection by comparing current output against stored baselines |
| load-testing-patterns | Load Testing Patterns | intermediate | reliability, performance | Stress, spike, soak testing methodologies to validate system behavior under varying load conditions |
| error-handling-patterns | Error Handling Patterns | intermediate | reliability | Fail-fast, retry, fallback, and dead letter queue patterns for resilient error management |
| observability-driven-development | Observability-Driven Development | advanced | observability, reliability | Design for observability from the start, not after — build systems that explain their own behavior |
| continuous-testing | Continuous Testing | intermediate | testability, reliability | Automated testing at every pipeline stage to provide continuous feedback on software quality throughout the delivery lifecycle |
| visual-regression-testing | Visual Regression Testing | intermediate | testability, reliability | Screenshot comparison between baseline and current UI to catch unintended visual changes automatically |
| pact-contract-testing | Pact Contract Testing | intermediate | testability, reliability | Consumer-driven contract verification between services ensuring API compatibility without end-to-end integration environments |
| fuzz-testing | Fuzz Testing | advanced | security, reliability | Automated testing technique that feeds randomly generated, malformed, or unexpected inputs to a program to discover crashes, security vulnerabilities, and undefined behaviour. |
| accessibility-testing-wcag | Accessibility Testing (WCAG) | intermediate | usability, reliability | Systematic testing approach combining automated scanning and manual evaluation to verify that digital products comply with WCAG accessibility guidelines and are usable by people with disabilities. |

## Deployment & Operations / 部署运维 (20)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| blue-green-deployment | Blue-Green Deployment | intermediate | reliability | Zero-downtime releases via two identical prod environments |
| canary-deployment | Canary Deployment | intermediate | reliability | Gradually roll out changes to a small user subset first |
| feature-flags | Feature Flags | beginner | maintainability | Decouple code deployment from feature release via toggles |
| gitops | GitOps | intermediate | reliability, maintainability | Use Git as the single source of truth for infra state |
| dora-metrics | DORA Metrics | beginner | reliability, performance | Four elite metrics measuring software delivery performance |
| calms-framework | CALMS Framework | beginner | maintainability | Five DevOps pillars: Culture, Automation, Lean, Measurement, Sharing |
| three-ways-devops | Three Ways of DevOps | beginner | reliability, maintainability | Flow, Feedback, and Continual Learning as DevOps foundations |
| infrastructure-as-code | Infrastructure as Code | intermediate | reliability, maintainability | Manage and provision infrastructure through machine-readable config |
| twelve-factor-app | Twelve-Factor App | intermediate | scalability, portability | 12 principles for building scalable, maintainable cloud services |
| sli-slo-sla | SLI/SLO/SLA | intermediate | reliability, observability | Define and measure service reliability through layered objectives |
| mlops | MLOps | advanced | reliability, maintainability | Apply DevOps practices to ML model lifecycle in production |
| llmops | LLMOps | advanced | reliability, maintainability | Operationalize LLM-based apps with prompt, eval, and cost management |
| agent-deployment-patterns | Agent Deployment Patterns | advanced | reliability, security | Patterns for reliably deploying autonomous AI agents in production |
| progressive-delivery | Progressive Delivery | advanced | reliability | Combine canary, feature flags, and observability for controlled rollouts |
| immutable-infrastructure | Immutable Infrastructure | intermediate | reliability, security | Never patch; replace with new images |
| chaos-engineering-practices | Chaos Engineering Practices | advanced | reliability | Operational practices for controlled failure injection: GameDays, blast radius control, and resilience validation |
| platform-as-a-product | Platform as a Product | advanced | usability, maintainability | Treat internal platforms like products with users and roadmaps |
| feature-environments | Feature Environments | intermediate | reliability, usability | Ephemeral full-stack environments provisioned per pull request or branch |
| deployment-stamps-pattern | Deployment Stamps Pattern | advanced | reliability, security | Scale by deploying multiple isolated copies of the application stack per tenant or region |
| iac-maturity-model | Infrastructure as Code Maturity Model | intermediate | maintainability, reliability | Staged progression from manual infrastructure to fully automated self-service IaC |

## Evolution & Iteration / 演进迭代 (21)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| strangler-fig-pattern | Strangler Fig Pattern | intermediate | maintainability | Incrementally replace a legacy system by routing traffic to new modules |
| branch-by-abstraction | Branch by Abstraction | intermediate | maintainability | Replace a component in-place via an abstraction layer without feature branches |
| parallel-run | Parallel Run | advanced | reliability | Run old and new implementations simultaneously and compare outputs for safety |
| technical-debt-quadrant | Technical Debt Quadrant | beginner | maintainability | Classify tech debt by deliberate/inadvertent and reckless/prudent axes |
| architectural-fitness-functions | Architectural Fitness Functions | advanced | maintainability, reliability | Automated tests that continuously verify architectural characteristics stay intact |
| conways-law | Conway's Law | beginner | maintainability | Systems mirror the communication structure of the organizations that build them |
| inverse-conway-maneuver | Inverse Conway Maneuver | advanced | maintainability, scalability | Deliberately restructure teams to produce the desired system architecture |
| team-topologies | Team Topologies | intermediate | maintainability, scalability | Four team types and three interaction modes for fast, sustainable software delivery |
| database-migration-patterns | Database Migration Patterns | intermediate | reliability, maintainability | Safe techniques for evolving database schemas without downtime or data loss |
| ai-assisted-refactoring | AI-Assisted Refactoring | intermediate | maintainability | Use LLMs to identify, plan, and execute code refactoring at scale |
| continuous-architecture | Continuous Architecture | intermediate | maintainability | Evolve architecture incrementally in sync with delivery rather than big up-front design |
| evolutionary-agent-systems | Evolutionary Agent Systems | advanced | reliability, scalability | Iteratively evolve AI agent architectures using feedback, eval, and capability staging |
| mikado-method | Mikado Method | intermediate | maintainability | Visualize and untangle large refactorings as a dependency graph of small safe steps |
| evolutionary-database-design | Evolutionary Database Design | intermediate | maintainability, reliability | Incremental schema changes (Sadalage & Fowler) |
| feature-branch-strategy | Feature Branch Strategy | beginner | maintainability | Git branching models (GitFlow, trunk-based) |
| deprecation-strategy | Deprecation Strategy | intermediate | maintainability | Systematic approach to retiring old APIs/features |
| living-documentation | Living Documentation | intermediate | maintainability, testability | Generate docs from tests and code (Martraire, 2019) |
| fitness-function-driven-development | Fitness Function-Driven Development | advanced | maintainability, reliability, testability | Automated architecture governance using executable fitness functions that continuously verify architectural characteristics are preserved during system evolution |
| expansion-contraction-pattern | Expansion/Contraction Pattern | intermediate | maintainability, reliability, portability | Safe API and schema migration technique that introduces new capabilities before removing old ones, allowing all clients to migrate without downtime |
| adr-y-statements | Architecture Decision Records (Y-Statements) | beginner | maintainability, observability | Structured decision documentation using the Y-statement format to capture context, decision, and consequences of significant architectural choices |
| monolith-decomposition-patterns | Monolith Decomposition Patterns | advanced | maintainability, scalability, reliability | A catalog of proven strategies for systematically extracting microservices from a monolithic codebase while maintaining system stability and team velocity throughout the migration |

## AI Collaboration / AI 协作 (25)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| react-framework | ReAct Framework | intermediate | reliability | Interleave reasoning traces and actions in LLM agents |
| rag-architecture | RAG Architecture | intermediate | reliability, performance | Ground LLM responses with retrieved external knowledge |
| multi-agent-orchestration-pattern | Multi-Agent Orchestration Pattern | advanced | scalability, reliability | Coordinate specialized AI agents via an orchestrator layer |
| human-in-the-loop | Human-in-the-Loop Design | intermediate | reliability, security | Insert human checkpoints into automated AI workflows |
| prompt-chaining | Prompt Chaining Pattern | beginner | reliability, maintainability | Decompose complex tasks into sequential prompt stages |
| ai-pair-programming | AI Pair Programming Model | beginner | maintainability, usability | Structure developer and AI collaboration in the coding loop |
| guardrails-framework | Guardrails Framework | intermediate | security, reliability | Enforce input/output constraints on LLM-powered systems |
| context-window-management | Context Window Management Pattern | intermediate | performance, reliability | Strategically manage LLM context to maximize coherence |
| tool-use-design-pattern | Tool-Use Design Pattern | intermediate | reliability, usability | Design agent-callable tools with reliable interfaces |
| ai-first-api-design | AI-First API Design | advanced | usability, maintainability | Design APIs optimized for consumption by AI agents |
| self-healing-systems | Self-Healing Systems Pattern | advanced | reliability, observability | Use AI agents to detect, diagnose, and remediate failures |
| ai-observability-framework | AI Observability Framework | intermediate | observability, reliability | Trace, monitor, and explain LLM system behavior in prod |
| responsible-ai-design | Responsible AI Design Framework | advanced | security, reliability | Embed fairness, safety, and accountability in AI systems |
| agent-communication-protocol | Agent Communication Protocol | advanced | reliability, scalability | Standardize message contracts between autonomous AI agents |
| agentic-workflow-patterns | Agentic Workflow Patterns | advanced | reliability, scalability | Plan-execute-reflect loops for autonomous agents |
| model-context-protocol-mcp | Model Context Protocol (MCP) | intermediate | usability, maintainability | Standardized tool integration for LLMs (Anthropic, 2024) |
| retrieval-augmented-fine-tuning-raft | Retrieval-Augmented Fine-Tuning (RAFT) | advanced | performance, reliability | Combine RAG with fine-tuning for domain adaptation |
| ai-safety-layers | AI Safety Layers (Defense in Depth for AI) | advanced | security, reliability | Multi-layer AI safety architecture |
| multimodal-pipeline-design | Multimodal Pipeline Design | advanced | performance, reliability | Architecture for processing text, image, audio, and video in unified AI pipelines |
| ai-cost-optimization | AI Cost Optimization | intermediate | performance, maintainability | Systematic strategies for managing and reducing LLM inference costs at production scale |
| semantic-caching | Semantic Caching | intermediate | performance, maintainability | Caching strategy for LLM applications that stores and retrieves responses based on semantic similarity of queries rather than exact string match. |
| ai-red-teaming | AI Red Teaming | advanced | security, reliability | Adversarial testing methodology for AI systems that uses structured attack exercises to discover safety vulnerabilities, harmful outputs, and failure modes before deployment. |
| ai-gateway-pattern | AI Gateway Pattern | intermediate | performance, reliability, maintainability | Centralized proxy for LLM API management, rate limiting, caching, and observability |
| prompt-caching-strategies | Prompt Caching Strategies | beginner | performance, maintainability | Reducing LLM inference costs and latency by reusing KV cache from shared prompt prefixes |
| evaluation-driven-development | Evaluation-Driven Development | advanced | reliability, maintainability, performance | Building AI applications by writing eval suites before features, using test results to guide iteration |

## Data Architecture / 数据架构 (20)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| data-mesh | Data Mesh | advanced | scalability, maintainability | Domain-oriented decentralized data ownership and architecture |
| lambda-architecture | Lambda Architecture | advanced | scalability, performance, reliability | Batch plus speed layers for scalable big data processing |
| kappa-architecture | Kappa Architecture | advanced | scalability, maintainability, performance | Stream-first architecture eliminating the batch layer entirely |
| stream-processing-patterns | Stream Processing Patterns | advanced | performance, scalability, reliability | Patterns for continuous data stream windowing, joining, and semantics |
| change-data-capture | Change Data Capture (CDC) | intermediate | reliability, scalability | Track database changes as real-time event streams for downstream |
| data-lakehouse | Data Lakehouse | intermediate | scalability, performance, maintainability | Unified architecture combining data lake flexibility with warehouse reliability |
| star-schema | Star Schema | intermediate | performance, usability | Dimensional modeling with fact and dimension tables for analytics |
| data-vault-2 | Data Vault 2.0 | advanced | scalability, maintainability, reliability | Agile, auditable data warehousing with hubs, links, and satellites |
| polyglot-persistence | Polyglot Persistence | intermediate | performance, scalability | Use purpose-fit databases for different data access patterns |
| feature-store-pattern | Feature Store Pattern | intermediate | reliability, scalability, maintainability | Centralized ML feature management for training and serving |
| slowly-changing-dimensions | Slowly Changing Dimensions (SCD) | intermediate | maintainability, reliability | Techniques for tracking historical changes in dimension tables (Kimball, 1996) |
| data-lineage | Data Lineage | intermediate | maintainability, reliability | Tracking data origin, transformations, and consumption across pipelines |
| schema-registry-pattern | Schema Registry Pattern | intermediate | maintainability, reliability | Centralized schema management for data contracts (Confluent, 2015) |
| data-quality-framework | Data Quality Framework | intermediate | reliability, maintainability | Systematic validation of data accuracy, completeness, and consistency |
| medallion-architecture | Medallion Architecture | intermediate | scalability, maintainability, reliability | Bronze/Silver/Gold layered data processing pattern (Databricks, 2021) |
| data-catalog | Data Catalog | intermediate | maintainability, observability, security | Centralized metadata management system that enables data discovery, governance, and self-service analytics across an organization. |
| schema-registry | Schema Registry | intermediate | reliability, maintainability, scalability | Centralized service for storing, versioning, and enforcing data schemas in streaming and event-driven architectures, ensuring producer-consumer compatibility. |
| data-lineage-governance | Data Lineage | advanced | observability, maintainability, security | Systematic tracking and visualization of data flow from origin through all transformations to final consumption, enabling impact analysis and regulatory compliance. |
| feature-store | Feature Store | advanced | reliability, scalability, maintainability | Centralized repository that manages the full lifecycle of ML features — from computation and storage to serving — enabling feature reuse, consistency between training and inference, and governance. |
| data-contract | Data Contract | intermediate | reliability, maintainability, testability | Formal, versioned agreements between data producers and consumers that specify schema, quality expectations, SLAs, and ownership, treating data as a product with explicit interface guarantees. |

## Security & Privacy / 安全与隐私 (21)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| threat-modeling-stride | Threat Modeling (STRIDE) | intermediate | security, reliability | Systematic identification and mitigation of security threats using the STRIDE taxonomy |
| zero-trust-architecture | Zero Trust Architecture | advanced | security, reliability | Never trust, always verify — eliminate implicit trust from network architecture |
| oauth2-openid-connect | OAuth 2.0 / OpenID Connect | intermediate | security, usability | Delegated authorization and federated identity for secure API and application access |
| defense-in-depth | Defense in Depth | beginner | security, reliability | Layer multiple independent security controls so that no single point of failure compromises the system |
| privacy-by-design | Privacy by Design | intermediate | security, maintainability | Embed privacy protections into the design and architecture of systems from the outset, not as an afterthought |
| owasp-top-10 | OWASP Top 10 | beginner | security | A prioritized framework of the most critical web application security risks with proven mitigation strategies |
| principle-of-least-privilege | Principle of Least Privilege | beginner | security, reliability | Grant each subject only the minimum permissions necessary to perform its function, nothing more |
| security-by-design | Security by Design | intermediate | security, maintainability | Integrate security considerations into every phase of the software development lifecycle from requirements through deployment |
| supply-chain-security-slsa | Supply Chain Security (SLSA) | advanced | security, reliability | Ensure the integrity and provenance of software artifacts through verifiable supply chain levels |
| confidential-computing | Confidential Computing | advanced | security | Protect data in use by performing computation within hardware-based trusted execution environments (TEEs) |
| security-champions-program | Security Champions Program | intermediate | security | Embedding security advocates within development teams |
| secrets-management | Secrets Management | intermediate | security, reliability | Centralized vault-based secrets lifecycle (HashiCorp Vault, 2015) |
| waf-patterns | Web Application Firewall (WAF) Patterns | intermediate | security, reliability | Application-layer traffic filtering strategies that inspect, filter, and block malicious HTTP/S requests before they reach web applications |
| identity-federation | Identity Federation | intermediate | security, reliability | Cross-domain identity and SSO patterns (SAML, OIDC federation) |
| penetration-testing-framework | Penetration Testing Framework | advanced | security | Structured offensive security testing methodology (PTES, OWASP Testing Guide) |
| security-development-lifecycle | Security Development Lifecycle (SDL) | advanced | security, reliability | Microsoft's structured process for integrating security and privacy practices at every phase of software development |
| nist-cybersecurity-framework | NIST Cybersecurity Framework | intermediate | security, reliability | A voluntary risk-based framework organizing cybersecurity activities into five concurrent functions: Identify, Protect, Detect, Respond, Recover |
| devsecops-pipeline | DevSecOps Pipeline | advanced | security, maintainability | The integration of security tooling and culture into every stage of a CI/CD pipeline so that security is automated, continuous, and developer-owned rather than a final gate |
| data-loss-prevention | Data Loss Prevention (DLP) | advanced | security | A strategy and toolset for detecting, monitoring, and preventing the unauthorized transmission of sensitive data outside organizational boundaries |
| incident-response-playbook | Incident Response Playbook | intermediate | security, reliability | SANS Institute's six-step structured process for handling cybersecurity incidents from preparation through post-incident lessons learned |
| runtime-application-self-protection | Runtime Application Self-Protection (RASP) | intermediate | security, reliability, observability | A security technology that instruments application runtimes to detect and block attacks from within the running application context, with access to call stacks, data flows, and execution context that perimeter controls cannot see |

## Distributed Systems / 分布式系统 (20)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| consensus-protocols | Consensus Protocols (Raft/Paxos) | advanced | reliability, scalability | Algorithms for achieving agreement among distributed nodes despite failures |
| eventual-consistency | Eventual Consistency | intermediate | scalability, performance, reliability | Embrace temporary inconsistency across replicas in exchange for higher availability |
| backpressure-pattern | Backpressure Pattern | intermediate | reliability, performance | Flow control mechanism where downstream consumers signal upstream producers to slow down |
| sidecar-pattern | Sidecar Pattern | intermediate | maintainability, scalability | Attach auxiliary processes alongside primary services for cross-cutting concerns |
| leader-election | Leader Election | advanced | reliability, scalability | Coordinate a single leader node among distributed peers to avoid conflicts |
| consistent-hashing | Consistent Hashing | intermediate | scalability, performance | Distribute data across nodes with minimal redistribution when the cluster changes |
| gossip-protocol | Gossip Protocol | intermediate | scalability, reliability | Epidemic-style information dissemination for decentralized cluster communication |
| two-phase-commit | Two-Phase Commit (2PC) | advanced | reliability, scalability | Atomic commit protocol ensuring all-or-nothing transaction outcomes across distributed participants |
| sharding-strategies | Sharding Strategies | advanced | scalability, performance | Horizontal data partitioning patterns for distributing load across multiple database nodes |
| idempotency-pattern | Idempotency Pattern | intermediate | reliability, maintainability | Design operations to be safely retried without causing duplicate effects |
| crdt | CRDT (Conflict-free Replicated Data Types) | advanced | reliability, scalability | Data structures that auto-merge without coordination (Shapiro, 2011) |
| outbox-pattern | Outbox Pattern | intermediate | reliability, maintainability | Reliable event publishing from database transactions |
| service-discovery | Service Discovery | intermediate | reliability, scalability | Dynamic registration and lookup of service instances (Consul, etcd) |
| circuit-breaker-with-retry | Circuit Breaker with Retry | intermediate | reliability, performance | Combined retry + circuit breaker for resilient communication |
| bulkhead-service-level | Bulkhead at Service Level | intermediate | reliability, performance | Isolating service resources to prevent cascading failures (different from code-level bulkhead in quality.json) |
| raft-consensus | Raft Consensus Algorithm | advanced | reliability, scalability | Understandable consensus protocol using leader election and log replication to achieve fault-tolerant distributed agreement |
| crdts | CRDTs (Conflict-free Replicated Data Types) | advanced | reliability, scalability | Eventual consistency without coordination using algebraic data structures that merge automatically |
| gossip-epidemic-protocol | Gossip Protocol | intermediate | reliability, scalability | Epidemic-style information dissemination achieving reliable cluster-wide propagation without central coordination |
| service-discovery-pattern | Service Discovery Pattern | intermediate | reliability, scalability | DNS-based and registry-based mechanisms for services to locate each other dynamically in elastic infrastructure |
| sidecar-container-pattern | Sidecar Pattern | intermediate | reliability, observability | Deploying helper containers alongside the primary service container to handle cross-cutting concerns without modifying application code |

## API Design & Integration / API 设计与集成 (21)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| graphql-schema-design | GraphQL Schema Design | intermediate | usability, maintainability, performance | Query language and type system for APIs enabling precise data fetching |
| grpc-protocol-buffers | gRPC & Protocol Buffers | intermediate | performance, scalability, maintainability | High-performance RPC framework using HTTP/2 and binary serialization |
| api-gateway-pattern | API Gateway Pattern | intermediate | scalability, security, maintainability | Single entry point that routes, aggregates, and secures microservices APIs |
| bff-pattern | Backend for Frontend (BFF) | intermediate | usability, maintainability | Dedicated backend services tailored to specific client types |
| consumer-driven-contracts | Consumer-Driven Contracts | intermediate | testability, maintainability | API testing approach where consumers define the expectations providers must satisfy |
| openapi-specification | OpenAPI Specification | beginner | usability, maintainability | Machine-readable API description standard for RESTful services |
| webhook-pattern | Webhook Pattern | intermediate | scalability, usability | Event-driven API integration via HTTP callbacks for real-time notifications |
| api-rate-limiting-throttling | API Rate Limiting & Throttling | intermediate | reliability, scalability, security | Protect APIs from overuse by controlling request rates per client |
| hateoas | HATEOAS | advanced | usability, maintainability | Hypermedia-driven API navigation where responses contain links to available actions |
| asyncapi | AsyncAPI | intermediate | usability, maintainability | Specification standard for describing event-driven and asynchronous APIs |
| api-first-design | API-First Design | intermediate | usability, maintainability, testability | Design the API contract before implementation using a Swagger-first workflow |
| api-pagination-patterns | API Pagination Patterns | intermediate | performance, usability, scalability | Cursor-based, offset-based, and keyset pagination strategies for large collection APIs |
| api-error-handling-standards | API Error Handling Standards | beginner | usability, maintainability, reliability | RFC 7807 Problem Details and structured error responses for consistent API error communication |
| api-deprecation-lifecycle | API Deprecation Lifecycle | intermediate | maintainability, usability, reliability | Sunset headers, versioned migration paths, and deprecation policies for retiring API versions |
| edge-computing-api-patterns | Edge Computing API Patterns | advanced | performance, scalability, reliability | CDN-edge function design for low-latency API responses and global distribution |
| api-versioning-strategies | API Versioning Strategies | intermediate | maintainability, reliability, usability | URL path, header, and query parameter techniques for evolving APIs without breaking clients |
| rest-maturity-model | REST Maturity Model | beginner | maintainability, usability, reliability | Leonard Richardson's four-level model measuring REST compliance from plain HTTP to hypermedia-driven APIs |
| api-security-patterns | API Security Patterns | advanced | security, reliability, observability | OAuth2 scopes, API keys, JWT validation, and CORS hardening to protect API surfaces from unauthorized access |
| event-driven-api-design | Event-Driven API Design | advanced | performance, scalability, reliability | Server-Sent Events, WebSocket, and MQTT patterns for real-time, asynchronous API communication |
| api-composition-pattern | API Composition Pattern | intermediate | performance, scalability, reliability | Aggregating multiple microservice APIs into a unified interface to fulfill client queries without requiring cross-service joins on the client side |
| graphql-federation | GraphQL Federation | advanced | maintainability, scalability, performance | A composition model for GraphQL where multiple independently deployed subgraph services contribute to a unified supergraph, enabling teams to own their schema slice while consumers see a single coherent API |

## Team & Organization / 团队与组织 (21)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| spotify-model | Spotify Model | advanced | maintainability, usability | Organize engineering around autonomous squads grouped into tribes, with cross-cutting chapters and guilds for alignment |
| amazon-two-pizza-teams | Amazon Two-Pizza Teams | intermediate | maintainability, scalability | Limit team size to what two pizzas can feed (~6-10 people) to maximize ownership and minimize communication overhead |
| inner-source | Inner Source | intermediate | maintainability, usability | Apply open-source development practices within an organization to break down silos and improve code reuse |
| platform-engineering | Platform Engineering | advanced | maintainability, usability, scalability | Build and operate an internal developer platform as a product, enabling stream-aligned teams to self-serve infrastructure and tooling |
| engineering-ladder | Engineering Ladder / Career Framework | intermediate | maintainability, usability | Define structured growth paths with clear expectations at each level for individual contributors and engineering managers |
| blameless-postmortems | Blameless Postmortems | beginner | reliability, maintainability | Conduct structured incident reviews focused on systemic learning rather than individual blame |
| architecture-review-board | Architecture Review Board (ARB) | intermediate | maintainability, reliability | A governance body that reviews and guides significant architectural decisions to ensure consistency, quality, and strategic alignment |
| technical-debt-management-framework | Technical Debt Management Framework | intermediate | maintainability | A systematic approach to identifying, quantifying, prioritizing, and paying down technical debt across an engineering organization |
| developer-experience-framework | Developer Experience (DevEx) Framework | intermediate | usability, maintainability | A structured approach to measuring and improving the three dimensions of developer experience: feedback loops, cognitive load, and flow state |
| mob-ensemble-programming | Mob/Ensemble Programming | beginner | maintainability, usability | The whole team works together on one task at one computer, with a rotating driver and navigators providing real-time collaboration |
| rfc-process | RFC Process | beginner | maintainability, usability | Lightweight request-for-comments process for transparent technical decision-making |
| guilds-communities-of-practice | Guilds and Communities of Practice | beginner | maintainability, usability | Cross-team knowledge-sharing groups that build expertise and standards across organizational silos |
| on-call-rotation-design | On-Call Rotation Design | intermediate | reliability, maintainability | Fair, sustainable on-call schedules and escalation policies that protect engineer wellbeing |
| engineering-metrics-dashboard | Engineering Metrics Dashboard | intermediate | maintainability, reliability, usability | DORA metrics, developer satisfaction, and quality metrics unified in the SPACE framework |
| technical-writing-as-a-practice | Technical Writing as a Practice | beginner | usability, maintainability | Documentation standards, style guides, and docs-as-code workflows for engineering organizations |
| engineering-effectiveness | Engineering Effectiveness | intermediate | maintainability, usability, reliability | Measuring and improving developer productivity through evidence-based metrics, tooling investment, and systemic friction removal |
| developer-onboarding-framework | Developer Onboarding Framework | intermediate | usability, maintainability | Structured ramp-up program for new engineers combining role clarity, progressive autonomy, and embedded social integration |
| technical-mentorship-program | Technical Mentorship Program | intermediate | usability, maintainability | Structured mentoring relationships that accelerate engineering growth through deliberate skill pairing, learning goals, and accountability |
| architecture-guild | Architecture Guild | intermediate | maintainability, reliability | Cross-team community of practice for architecture alignment, decision review, and technical standard-setting without centralized command |
| decision-log-practice | Decision Log Practice | beginner | maintainability, usability | Systematically recording, storing, and reviewing team decisions to create organizational memory, reduce repeated debates, and enable async alignment |
| engineering-principles-framework | Engineering Principles Framework | beginner | maintainability | A structured practice of defining, publishing, and evolving explicit engineering principles that guide daily technical decisions across an organization |

## Observability & DX / 可观测性与开发者体验 (21)

| slug | name | complexity | quality | description |
|------|------|-----------|---------|-------------|
| opentelemetry | OpenTelemetry | intermediate | observability, reliability | Unified observability standard for traces, metrics, and logs across services |
| distributed-tracing | Distributed Tracing | intermediate | observability, reliability, performance | Track requests across service boundaries to diagnose latency and failures in distributed systems |
| structured-logging | Structured Logging | beginner | observability, maintainability | Machine-parseable log format patterns that enable reliable querying and correlation at scale |
| slo-as-practice | SLO-as-Practice | advanced | reliability, observability | Operationalize SLO methodology as a continuous engineering practice for reliability culture |
| error-budget-policy | Error Budget Policy | intermediate | reliability, observability | Managing reliability vs velocity trade-offs through quantified error budgets and escalation policies |
| runbook-automation | Runbook Automation | intermediate | reliability, observability | Codified incident response procedures that reduce toil and human error during incidents |
| on-call-engineering | On-Call Engineering | intermediate | reliability, observability | Sustainable on-call practices, escalation paths, and human-centric incident response |
| feature-flag-observability | Feature Flag Observability | intermediate | observability, reliability | Monitoring feature rollout impact by correlating flag state with system and business metrics |
| developer-portal-backstage | Developer Portal (Backstage) | advanced | usability, observability, maintainability | Centralized developer experience platform unifying service catalog, docs, and tooling |
| documentation-as-code | Documentation as Code | beginner | maintainability, usability | Treat documentation like software: version-controlled, tested, reviewed, and continuously deployed |
| anomaly-detection-patterns | Anomaly Detection Patterns | advanced | reliability, performance, maintainability | ML-based and statistical anomaly detection for metrics, logs, and traces in production systems |
| continuous-profiling | Continuous Profiling | advanced | performance, reliability, maintainability | Always-on production profiling using pprof, Pyroscope, and Datadog Continuous Profiler |
| incident-management-framework | Incident Management Framework | intermediate | reliability, maintainability, usability | Structured incident response process covering detection, triage, resolution, and blameless retrospective |
| chaos-observability | Chaos Observability | advanced | reliability, testability, maintainability | Observability practices specifically designed for chaos engineering experiments and resilience validation |
| cost-observability-finops | Cost Observability (FinOps) | intermediate | maintainability, scalability, reliability | Cloud cost monitoring, allocation, and optimization frameworks aligned with the FinOps Foundation model |
| observability-as-code | Observability-as-Code | intermediate | maintainability, reliability | Defining monitoring, alerts, and dashboards as version-controlled code to ensure reproducible, auditable observability infrastructure |
| service-level-indicators | Service Level Indicators (SLI) | intermediate | reliability, observability, performance | Quantitative measures of service behavior that define the precise metrics used to assess whether a service is meeting its reliability commitments |
| synthetic-monitoring | Synthetic Monitoring | intermediate | reliability, performance | Proactive testing of user journeys by scripting interactions from external locations to detect failures before real users are impacted |
| log-aggregation-patterns | Log Aggregation Patterns | intermediate | observability, security, maintainability | Centralized collection, parsing, and querying of logs from distributed services using platforms like ELK, Loki, and Datadog |
| canary-analysis | Canary Analysis | advanced | reliability, performance | Automated comparison of canary vs baseline metrics to quantitatively validate deployments before full rollout |
| service-mesh-observability | Service Mesh Observability | advanced | observability, reliability, performance | Leveraging the service mesh data plane (Envoy, Linkerd) to automatically capture golden signal telemetry for every service-to-service call without application code changes |
