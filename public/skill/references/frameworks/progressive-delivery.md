# Progressive Delivery / 渐进式交付

- **Category**: deployment
- **Complexity**: advanced
- **Quality**: reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: James Governor (RedMonk), 2018
- **Adopters**: Intuit, Weaveworks, Netflix, Spotify, DoorDash

Combine canary, feature flags, and observability for controlled rollouts

_结合金丝雀发布、特性开关和可观测性实现受控发布_

## When to Use

Apply this framework when:
- High-traffic services where a bad deploy can affect millions of users within minutes
- Teams practicing continuous deployment that need automated safety gates between stages
- Organizations combining multiple deployment strategies (canary + feature flags) under a unified workflow
- Environments where business metrics (conversion, revenue) must be validated alongside technical SLIs

## When NOT to Use

Stop and reconsider if:
- Small internal tools with a handful of users where the overhead of multi-stage rollouts is unjustified
- Batch processing systems that do not serve real-time traffic and cannot be canary-tested
- Environments with insufficient observability infrastructure to support automated canary analysis
- Deployments requiring atomic all-or-nothing cutover (use blue-green instead)

## Core Concepts

- Gated Stages: Each rollout phase requires explicit pass/fail criteria before progressing to the next audience slice
- Automated Analysis: Observability platforms compare canary metrics against baseline in real time to eliminate human judgment delays
- Blast Radius Control: The combination of feature flags and traffic splitting limits the maximum user impact at any given stage
- Unified Rollout Model: Canary deployment, feature flagging, and A/B testing are composed into a single progressive pipeline

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Progressive Delivery to?
- What constraints or existing architecture do you need to work within?
- Has your team used Progressive Delivery before? (This is an advanced framework)

## Implementation Steps

1. Define the release audience using cohort selectors (percentage, region, user segment)
2. Deploy the new version behind feature flags with canary traffic routing enabled
3. Instrument automated analysis of key SLIs (latency, error rate, saturation) during rollout
4. Progressively widen the blast radius in stages, gating each stage on metric thresholds
5. Automatically promote to 100% or trigger rollback based on observability verdicts

<details><summary>中文步骤</summary>

1. 使用群组选择器（百分比、地区、用户分群）定义发布受众
2. 在启用金丝雀流量路由的同时，将新版本部署在特性开关后面
3. 在发布过程中对关键 SLI（延迟、错误率、饱和度）进行自动化分析
4. 分阶段逐步扩大影响半径，每个阶段以指标阈值为门控
5. 基于可观测性判定自动提升到 100% 或触发回滚

</details>

## Do

- Define clear metric thresholds and minimum observation windows before starting any progressive rollout
- Use automated canary analysis tools (Kayenta, Flagger) to remove subjective human judgment from promotion decisions
- Combine technical metrics (error rate, latency) with business metrics (conversion, revenue) for holistic rollout health
- Run progressive delivery in staging first to calibrate analysis sensitivity and avoid false positives in production

## Don't

- Don't skip the baseline measurement phase — without a reliable baseline, canary comparison is meaningless
- Don't set observation windows too short — transient traffic patterns can mask regressions
- Don't ignore the long tail of latency (p99, p999) — median-only analysis misses the most painful user experiences
- Don't treat progressive delivery as a substitute for pre-production testing — it is a safety net, not a test suite

## Case Study

**Intuit**: Intuit adopted progressive delivery for TurboTax during the 2022 tax season, combining Argo Rollouts with custom Kayenta canary analysis. Each release progressed through four stages (1%, 10%, 50%, 100%) with automated SLI checks at each gate. This approach caught a latency regression at the 10% stage that would have impacted millions of users during peak filing, enabling automatic rollback within 3 minutes of detection.

## Related Frameworks

- canary-deployment (extends)
- feature-flags (complement)
- slo-as-practice (complement)
- opentelemetry (complement)

## Source

https://sdframe.caldis.me/frameworks/progressive-delivery
