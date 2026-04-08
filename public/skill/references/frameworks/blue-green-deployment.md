# Blue-Green Deployment / 蓝绿部署

- **Category**: deployment
- **Complexity**: intermediate
- **Quality**: reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Daniel Quinlan / early web ops community, ~2005
- **Adopters**: LinkedIn, Amazon, Netflix, Etsy, Facebook

Zero-downtime releases via two identical prod environments

_通过两套相同生产环境实现零停机发布_

## When to Use

Apply this framework when:
- Applications requiring zero-downtime deployments with instant rollback capability
- Regulated environments where full pre-production validation is mandatory before traffic switch
- Monolithic applications where partial rollout (canary) is impractical
- Systems where database schema changes are backward-compatible

## When NOT to Use

Stop and reconsider if:
- Microservices with independent release cadences where coordinating two full environments per service is cost-prohibitive
- Applications with non-backward-compatible database migrations that prevent both environments from sharing the same data layer
- Teams that need gradual percentage-based traffic shifting (use canary deployment instead)
- Stateful workloads where in-memory session data cannot survive an environment switch

## Core Concepts

- Environment Parity: Blue and Green environments must be identical in infrastructure, configuration, and capacity to ensure reliable switchover
- Atomic Switchover: Traffic routing is changed at the load balancer level, providing an all-or-nothing cutover with no partial states
- Instant Rollback: The previous environment remains intact and warm, allowing a sub-second rollback by reversing the router switch
- Idle Cost Tradeoff: Maintaining two full production environments doubles infrastructure cost during deployment windows

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Blue-Green Deployment to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Maintain two identical production environments: Blue (live) and Green (idle)
2. Deploy new version to the idle Green environment and run full test suite
3. Perform smoke tests and validation on Green without affecting live traffic
4. Switch router/load balancer to redirect all traffic from Blue to Green
5. Keep Blue on standby for instant rollback; decommission after stability confirmed

<details><summary>中文步骤</summary>

1. 维护两套相同的生产环境：蓝（当前运行）和绿（闲置）
2. 将新版本部署到闲置的绿色环境并执行完整测试套件
3. 在绿色环境上执行冒烟测试和验证，不影响线上流量
4. 切换路由器/负载均衡器，将所有流量从蓝色切换到绿色
5. 保留蓝色环境待命以便快速回滚，稳定后再下线

</details>

## Do

- Do run comprehensive smoke tests on the Green environment before switching traffic, because post-switch failures are visible to all users instantly
- Do keep database migrations backward-compatible so both Blue and Green can operate against the same schema simultaneously
- Do automate the switchover and rollback process through CI/CD pipelines to eliminate human error under pressure
- Do monitor the new environment closely for at least one full traffic cycle before decommissioning the old one

## Don't

- Don't allow configuration drift between Blue and Green environments, because asymmetry causes false-positive test results
- Don't perform destructive database migrations during blue-green switches, because rollback becomes impossible if the schema is incompatible
- Don't skip warming up the Green environment's caches and connections, because cold-start latency spikes will degrade user experience
- Don't leave the idle environment running indefinitely without cost review, because it doubles your infrastructure spend

## Case Study

**LinkedIn**: LinkedIn adopted blue-green deployments for its main site in 2013 to eliminate multi-hour maintenance windows during weekly releases. By maintaining two identical production tiers behind their load balancers, they reduced deployment downtime from hours to under 30 seconds per release. This pattern also allowed them to validate each release with production traffic patterns before committing to the switchover.

## Related Frameworks

- canary-deployment (alternative)
- feature-flags (complement)
- gitops (complement)

## Source

https://sdframe.caldis.me/frameworks/blue-green-deployment
