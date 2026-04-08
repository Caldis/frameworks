# Theory of Constraints (TOC) / 约束理论（TOC）

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: performance, maintainability
- **Abstraction**: organization
- **Maturity**: foundational
- **Author**: Eliyahu M. Goldratt, 1984
- **Adopters**: Intel — applied TOC to semiconductor manufacturing scheduling to reduce cycle times and increase fab throughput in the 1990s, Boeing — used TOC in aircraft manufacturing assembly lines to identify and break constraints in component delivery sequencing, Amazon — applies throughput optimization principles from TOC in their fulfillment center operations and software deployment pipelines, DevOps community — 'The Phoenix Project' and 'The DevOps Handbook' apply TOC to software delivery, making constraint identification central to engineering team improvement, Atlassian — Jira's WIP limits feature in Jira Software and Kanban boards are directly influenced by TOC's subordination principle

Identify and systematically exploit the binding constraint in a system to maximize throughput, then elevate or break it

_识别并系统性地利用系统中的制约因素以最大化吞吐量，然后提升或打破它_

## When to Use

Apply this framework when:
- When a system or workflow has a known bottleneck and you want a principled method to decide where to invest improvement effort rather than distributing it evenly across all steps
- When a software delivery process has a persistent wait state (code review backlog, deployment queue, QA handoff delay) that limits overall feature throughput
- When performance optimization efforts have been spread across many services and individual improvements have not produced system-level throughput gains
- When stakeholders are requesting parallel investments to improve multiple steps simultaneously and you need a framework to argue for focused investment on the constraint

## When NOT to Use

Stop and reconsider if:
- When the system has no measurable throughput metric and optimization goals are ambiguous; TOC requires a clear definition of what throughput means for the system being optimized
- When the system is creative or knowledge work where the 'constraint' is not a process step but a quality of thinking that cannot be accelerated by adding more resources
- When the organization optimizes for resource utilization rather than throughput; TOC deliberately leaves non-constraints with idle capacity, which conflicts with utilization-focused management cultures
- When multiple simultaneous constraints exist (a system near capacity on several steps), because TOC's five-step cycle assumes a single binding constraint that can be isolated and improved

## Core Concepts

- Throughput: the rate at which the system generates value (revenue, features shipped, requests served); TOC optimizes for system throughput, not local efficiency — improving a non-constraint step cannot increase system throughput if the constraint is unchanged
- Constraint (bottleneck): the single step that limits overall throughput; every system has exactly one binding constraint at any given time; all other steps have excess capacity relative to the constraint's output rate
- Inventory and WIP: work-in-progress that accumulates upstream of the constraint is 'inventory' in TOC; excess WIP adds cost, complexity, and lead time without increasing throughput
- The five focusing steps: Identify → Exploit → Subordinate → Elevate → Repeat; this cycle is continuous because breaking one constraint reveals the next one, and the system always has a constraint somewhere

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Theory of Constraints (TOC) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify the constraint**: find the single resource, process step, or policy that limits the system's throughput most — the constraint is the step where work piles up, has the longest queue, or determines the overall system capacity
2. **Exploit the constraint**: maximize the output of the constraint using existing resources before spending on additional capacity — eliminate waste, reduce downtime, and ensure the constraint is never starved by upstream steps
3. **Subordinate everything else**: adjust all non-constraint steps and policies to support the constraint's maximum output; if upstream processes are faster than the constraint, slow them to prevent WIP buildup that overwhelms the constraint
4. **Elevate the constraint**: if exploiting and subordinating are insufficient, invest in additional capacity (people, machines, process redesign) specifically targeted at the constraint — not distributed across all steps
5. **Prevent inertia**: after the constraint is broken and moves to a new location in the system, return to step 1 and identify the new constraint; do not let previous solutions become new constraints through outdated policies or local optimization

<details><summary>中文步骤</summary>

1. 识别约束：找到限制系统吞吐量最多的单一资源、流程步骤或政策——约束是工作积压、队列最长或决定整体系统产能的步骤
2. 充分利用约束：在增加额外产能之前，使用现有资源最大化约束的产出——消除浪费、减少停机时间，确保约束永远不会被上游步骤饿死
3. 将其他一切从属于约束：调整所有非约束步骤和政策以支持约束的最大产出；如果上游流程比约束快，就放慢它们以防止WIP积累压垮约束
4. 提升约束：如果充分利用和从属化仍然不足，专门针对约束投资额外产能（人员、机器、流程重设计）——而非分散在所有步骤
5. 防止惰性：约束被打破并转移到系统新位置后，返回步骤1识别新约束；不要因过时的政策或局部优化让以前的解决方案成为新约束

</details>

## Do

- Do measure throughput at the system level (features delivered per sprint, deployments per day) before and after improvements, because local efficiency gains only matter if they improve system-level throughput
- Do protect the constraint from starvation by ensuring it always has work ready to process; idle constraint time is the most expensive form of waste in a TOC system
- Do reduce WIP limits upstream of the constraint using Kanban-style WIP caps, because accumulating work-in-progress upstream increases context switching, lead time, and coordination cost without increasing output
- Do use buffer management at the constraint: maintain a small upstream buffer to absorb variability in upstream step throughput, preventing constraint idle time from statistical randomness

## Don't

- Don't optimize non-constraints independently of the constraint; improving the throughput of a non-constraint step cannot increase system throughput if the constraint remains unchanged, and may increase WIP and cost
- Don't add resources uniformly across all steps when capacity is needed; investment must be targeted specifically at the constraint to improve system throughput
- Don't treat the constraint as permanent; the five-step cycle must continue after breaking a constraint because the constraint moves to a new location and a new improvement cycle begins
- Don't measure success by local efficiency metrics (individual utilization rates, step-level cycle times) because 100% utilization of non-constraints is a sign of over-production, not efficiency

## Case Study

**Gene Kim / Phoenix Project (DevOps)**: Gene Kim, Kevin Behr, and George Spafford's 'The Phoenix Project' (2013) is explicitly modeled on Goldratt's 'The Goal', applying TOC to an IT organization's software delivery value stream. In the narrative, the constraint is identified as Brent, a single expert engineer who is the bottleneck for every critical deployment and incident resolution. The TOC solution is to identify Brent as the constraint, exploit him by documenting his knowledge (so others can absorb non-critical work), subordinate all other teams to protect Brent's time for constraint work, and elevate by cross-training. This framing directly influenced the DevOps movement's focus on deployment pipeline constraints and DORA metrics.

## Related Frameworks

- architectural-kata (related)
- trade-off-sliders (complement)

## Source

https://sdframe.caldis.me/frameworks/theory-of-constraints
