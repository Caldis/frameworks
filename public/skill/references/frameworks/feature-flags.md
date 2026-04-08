# Feature Flags / 功能开关

- **Category**: deployment
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Flickr / early continuous deployment pioneers, ~2009
- **Adopters**: GitHub, Netflix, Google, LaunchDarkly, Etsy

Decouple code deployment from feature release via toggles

_通过开关将代码部署与功能发布解耦_

## When to Use

Apply this framework when:
- Trunk-based development workflows where all developers commit to the main branch and features must be hidden until ready
- A/B testing and experimentation where different user segments receive different experiences
- Gradual feature rollouts that need to be decoupled from code deployment cadence
- Emergency kill-switch scenarios where a problematic feature must be disabled without redeploying

## When NOT to Use

Stop and reconsider if:
- Very small teams with infrequent releases where the overhead of flag management exceeds the deployment risk
- Performance-critical hot paths where even microsecond flag evaluation overhead is unacceptable
- Systems with strict regulatory requirements that prohibit deploying unreleased code to production
- Short-lived projects or prototypes where the lifecycle management overhead is not justified

## Core Concepts

- Release Toggle: A short-lived flag used to hide incomplete features in production until they are ready for launch
- Experiment Toggle: A flag used for A/B testing, where different user segments receive different feature variants to measure impact
- Ops Toggle: A long-lived flag used as a circuit breaker to gracefully degrade features under load or during incidents
- Permission Toggle: A flag that gates features based on user entitlements, subscriptions, or role-based access
- Flag Debt: The technical debt accumulated when feature flags are not cleaned up after rollout, leading to dead code paths and complexity

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Feature Flags to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the feature to gate and define the flag's targeting rules (user, segment, env)
2. Wrap new feature code behind a conditional flag check in the codebase
3. Deploy code to production with the flag disabled; verify no impact
4. Gradually enable the flag for internal users, then beta users, then general audience
5. Remove the flag and dead code paths once the feature is fully rolled out

<details><summary>中文步骤</summary>

1. 确定要管控的功能，定义开关的目标规则（用户、分组、环境）
2. 在代码库中用条件判断将新功能代码包裹在开关检查之后
3. 以开关关闭状态部署到生产环境，验证无影响
4. 依次为内部用户、Beta用户、全体用户逐步开启开关
5. 功能完全上线后移除开关及已废弃的代码路径

</details>

## Do

- Do establish a flag lifecycle policy with clear ownership and expiry dates, because abandoned flags become permanent technical debt
- Do use a centralized flag management system with audit logs, because scattered flags in config files are impossible to govern
- Do test both flag-on and flag-off code paths in CI, because untested paths are the most common source of flag-related incidents
- Do keep flag evaluation fast and cached, because flags in hot paths affect request latency for every user

## Don't

- Don't create nested flag dependencies (flag A depends on flag B), because combinatorial complexity makes behavior unpredictable
- Don't use feature flags as a long-term configuration mechanism, because they lack the governance and validation of proper config management
- Don't skip the cleanup phase after a flag is fully rolled out, because stale flags accumulate and make the codebase harder to understand
- Don't store sensitive targeting rules in client-side flag SDKs, because they are visible to end users in browser code

## Case Study

**GitHub**: GitHub uses a custom feature flag system called Flipper to control the rollout of every major feature. When launching GitHub Copilot, they used feature flags to gradually enable the feature for internal staff, then waitlisted beta users, then paying customers, monitoring usage patterns and error rates at each stage. This approach allowed them to iterate on the product in production without impacting the broader user base, and to instantly disable Copilot features during early reliability issues.

## Related Frameworks

- canary-deployment (complement)
- blue-green-deployment (complement)
- branch-by-abstraction (complement)

## Source

https://sdframe.caldis.me/frameworks/feature-flags
