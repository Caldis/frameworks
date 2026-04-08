# Worse is Better / 更差即更好

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: maintainability, portability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Richard P. Gabriel, 1989
- **Adopters**: Unix/Linux, C Language, HTTP/HTML (early web), JSON, Go Language

Simpler, less correct implementations often win over complex, theoretically correct ones through easier adoption and faster evolution

_更简单但不够正确的实现往往通过更容易的采纳和更快的演进击败复杂的理论正确实现_

## When to Use

Apply this framework when:
- When your team is debating whether to ship a pragmatic solution now or invest months in a theoretically superior architecture
- When a competitor is gaining market share with an inferior-but-available product while your team perfects a better design
- When designing a public API or protocol where simplicity of adoption matters more than covering every edge case in v1
- When evaluating open-source tools and the simpler, less feature-complete option has a larger community and faster iteration cycle

## When NOT to Use

Stop and reconsider if:
- When building safety-critical systems where 'good enough' correctness has life-or-death consequences and regulatory compliance demands formal verification
- When the domain requires mathematical precision (cryptography, financial settlement, scientific computing) where an incorrect implementation is worse than no implementation
- When your users are technical experts who will reject a simplified system that doesn't meet their professional standards (compilers, databases, operating system kernels for specialized hardware)
- When you are building infrastructure that other systems will depend on for decades, where early simplicity trade-offs compound into systemic limitations

## Core Concepts

- Simplicity as Survival Advantage: Simpler systems are easier to port, easier to learn, and easier to adapt — this adaptability is a stronger evolutionary advantage than theoretical correctness
- The Viral Spread of Good-Enough: A system that is 50% as capable but available today will acquire users who then contribute improvements, eventually surpassing a system that is 100% capable but still in development
- Interface vs Implementation Simplicity: Gabriel distinguishes two strategies — 'the right thing' (simple interface, complex implementation) vs 'worse is better' (simple implementation, potentially rougher interface). The simpler implementation wins on adoption.
- Worse is Better as Market Dynamics: The principle is not about celebrating mediocrity but about recognizing that markets select for adoption speed and iteration velocity, not architectural purity

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Worse is Better to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define 'Good Enough'**: for each feature, explicitly define the minimum correctness and completeness threshold that delivers real user value, distinguishing essential correctness from theoretical perfection
2. **Prioritize Simplicity of Implementation**: when facing a design choice between a complete-but-complex solution and a simple-but-limited one, default to simplicity unless the missing completeness causes real harm
3. **Ship and Observe**: release the simpler version to real users quickly, using actual usage patterns to determine which missing capabilities genuinely matter vs which were hypothetical requirements
4. **Evolve Incrementally**: add completeness and correctness incrementally based on observed need, letting real-world feedback guide investment rather than upfront architectural speculation
5. **Resist Second-System Syndrome**: when the simple system succeeds and pressure mounts for a 'proper' redesign, evaluate whether the simple system's limitations actually cause problems or merely offend engineering aesthetics

<details><summary>中文步骤</summary>

1. 定义「足够好」：为每个功能明确定义提供真实用户价值的最低正确性和完整性阈值，区分本质正确性和理论完美
2. 优先考虑实现简洁性：当面对完整但复杂的方案和简单但有限的方案之间的设计选择时，默认选择简洁性，除非缺失的完整性造成实际伤害
3. 发布并观察：快速将更简单的版本发布给真实用户，用实际使用模式来确定哪些缺失能力真正重要，哪些是假设性需求
4. 渐进式演进：基于观察到的需求逐步增加完整性和正确性，让现实世界的反馈指导投入而非前期架构推测
5. 抵制第二系统综合征：当简单系统成功且「正式」重新设计的压力增大时，评估简单系统的局限性是否真正导致问题还是仅仅冒犯了工程美学

</details>

## Do

- Do explicitly define what 'good enough' means for each release, because without a threshold, worse-is-better becomes an excuse for carelessness
- Do ship the simplest version that delivers genuine value, then iterate based on real user feedback rather than hypothetical requirements
- Do preserve simplicity of the core implementation even as features are added, because the simplicity is what enabled the system's success in the first place
- Do study Unix, C, HTTP, and JSON as exemplars of worse-is-better systems that won through simplicity and adaptability

## Don't

- Don't use worse-is-better as justification for shipping broken or harmful software, because the principle is about simplicity trade-offs, not quality abandonment
- Don't apply worse-is-better to safety-critical systems (medical devices, aviation, financial infrastructure) where 'good enough' correctness can cause catastrophic harm
- Don't ignore technical debt that accumulates in worse-is-better systems, because the simplicity advantage erodes if the codebase becomes unmaintainable over time
- Don't conflate worse-is-better with anti-intellectualism, because the principle requires deep understanding of trade-offs to apply correctly

## Case Study

**Unix/C**: Unix and C are Gabriel's original examples of worse-is-better triumphing. When compared to Multics and Lisp, Unix and C were objectively less capable: C had no garbage collection, no type safety, and manual memory management; Unix had a simpler but less orthogonal design than Multics. However, C was small enough to port to new hardware in weeks rather than years, and Unix was simple enough for a single person to understand the entire kernel. This portability and comprehensibility created a viral adoption loop: Unix spread to every university and hardware platform, accumulating contributions from thousands of developers. By the time 'better' systems like Multics were ready, Unix had already won through sheer ecosystem momentum, proving that implementation simplicity and rapid portability can outweigh theoretical superiority.

## Related Frameworks

- first-principles-thinking (complement)
- trade-off-sliders (related)
- complexity-budget (related)

## Source

https://sdframe.caldis.me/frameworks/worse-is-better
