# Amazon Two-Pizza Teams / 亚马逊两个披萨团队

- **Category**: team
- **Complexity**: intermediate
- **Quality**: maintainability, scalability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Jeff Bezos, ~2002
- **Adopters**: Amazon, Netflix, Google, Uber, Twilio

Limit team size to what two pizzas can feed (~6-10 people) to maximize ownership and minimize communication overhead

_将团队规模限制在两个披萨能喂饱的人数（约 6-10 人），以最大化责任归属感并最小化沟通开销_

## When to Use

Apply this framework when:
- Organizations experiencing coordination bottlenecks as teams grow beyond 10 people
- Building a microservices architecture where each service needs a clear owning team
- Scaling a fast-growing startup while preserving speed and accountability
- Environments where 'you build it, you run it' operational ownership is desired

## When NOT to Use

Stop and reconsider if:
- Tightly coupled monolithic systems where meaningful service decomposition is not yet feasible
- Organizations too small to have more than 2-3 teams — the overhead of inter-team contracts exceeds the benefit
- Research-heavy environments where exploratory work requires fluid, cross-cutting collaboration
- Contexts where shared domain expertise is critical and splitting it across teams would dilute knowledge

## Core Concepts

- Small team size: Brooks's Law shows communication overhead grows quadratically with team size — two-pizza teams stay under the threshold where coordination costs dominate
- Full ownership: Each team owns the entire lifecycle of their service, from design through production operations and on-call
- Service-oriented architecture: The organizational pattern is inseparable from the technical architecture — small teams map to small, decoupled services
- Single-threaded leadership: Each two-pizza team has one leader whose sole focus is that team's mission, avoiding divided attention
- API-as-contract: Teams communicate through well-defined service interfaces, reducing the need for face-to-face coordination

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Amazon Two-Pizza Teams to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Decompose the product or platform into independently deliverable service boundaries
2. Assign each service boundary to a small team of 6-10 people with full-stack capability
3. **Grant each team end-to-end ownership**: build, deploy, operate, and support their service
4. Define a clear 'fitness function' or set of metrics each team is accountable for
5. Minimize inter-team dependencies by designing service APIs as team contracts

<details><summary>中文步骤</summary>

1. 将产品或平台分解为可独立交付的服务边界
2. 为每个服务边界分配一个 6-10 人的小型全栈团队
3. 赋予每个团队端到端的所有权：构建、部署、运维和支持其服务
4. 为每个团队定义明确的「适应度函数」或其负责的指标集
5. 通过将服务 API 设计为团队契约来最小化团队间依赖

</details>

## Do

- Ensure each team has the full-stack capability to deliver independently without waiting on other teams
- Define clear service boundaries and APIs before forming teams, so team structure reflects architecture (Inverse Conway)
- Give teams real ownership by making them responsible for operational metrics, not just shipping features
- Keep the team's mission focused — a two-pizza team with a sprawling mandate is worse than a large team

## Don't

- Don't split teams artificially just to hit the size target — the service boundary must be meaningful
- Don't create two-pizza teams without supporting platform infrastructure, or each team will reinvent the wheel
- Don't ignore Brooks's corollary: splitting work across too many small teams creates its own integration overhead
- Don't forget that two-pizza teams still need cross-team alignment mechanisms like architecture reviews or RFCs

## Case Study

**Amazon**: Amazon's own transformation from a monolithic bookstore application to a services-based architecture in the early 2000s was driven by the two-pizza team mandate. By 2006, Amazon had decomposed into hundreds of small teams, each owning a distinct service. This organizational structure directly enabled the creation of AWS — teams that built internal infrastructure services realized they could offer them externally. The model is credited by former VP Charlie Bell as foundational to Amazon's ability to scale from $4B to $500B+ in revenue while maintaining engineering velocity.

## Related Frameworks

- conways-law (prerequisite)
- team-topologies (complement)
- spotify-model (alternative)
- inverse-conway-maneuver (related)

## Source

https://sdframe.caldis.me/frameworks/amazon-two-pizza-teams
