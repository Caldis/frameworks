# Feature Toggles at Code Level / 代码级功能开关

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Martin Fowler, 2010; Pete Hodgson, 2017
- **Adopters**: Etsy, Netflix, Facebook, Google, LaunchDarkly

Control code execution paths using conditional branching to enable or disable features without redeployment

_使用条件分支控制代码执行路径，无需重新部署即可启用或禁用功能_

## When to Use

Apply this framework when:
- Practicing trunk-based development where long-lived feature branches are avoided
- Releasing partially complete features to production safely hidden behind a flag
- Performing A/B testing or gradual rollouts by toggling features for specific user segments
- Enabling operations teams to disable problematic features instantly without a code deployment

## When NOT to Use

Stop and reconsider if:
- Simple applications with a single deployment target and no need for gradual rollout
- Code paths where the toggle conditional would add more complexity than the feature itself
- Performance-critical hot paths where even a simple conditional check is unacceptable overhead
- Teams without the discipline to clean up expired toggles, as toggle debt will degrade the codebase

## Core Concepts

- Release Toggle: a short-lived flag that hides incomplete features in production until they are ready for launch
- Experiment Toggle: a flag used for A/B testing that routes different users to different code paths to measure outcomes
- Ops Toggle: a long-lived flag that allows operations to degrade or disable features under load without redeploying
- Toggle Router: the decision engine that evaluates toggle state based on configuration, user context, or percentage rollout
- Toggle Debt: the technical debt that accumulates when expired toggles and their conditional branches are not cleaned up

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Feature Toggles at Code Level to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define toggle points**: identify the exact locations in your code where behavior should diverge based on a feature flag, keeping them at the highest possible level
2. **Implement toggle infrastructure**: create a simple toggle router or use a library that reads flag values from configuration, environment variables, or a remote service
3. **Guard new code paths**: wrap the new feature code behind conditional checks that consult the toggle router, keeping the old path as the default fallback
4. **Test both paths**: write tests that exercise the code with the toggle on and off to ensure both branches behave correctly
5. **Clean up expired toggles**: once a feature is fully rolled out, remove the toggle and its conditional branching to prevent toggle debt accumulation

<details><summary>中文步骤</summary>

1. 定义开关点：确定代码中行为应基于功能标志产生分歧的精确位置，尽量将其放在最高层级
2. 实现开关基础设施：创建简单的开关路由器或使用从配置、环境变量或远程服务读取标志值的库
3. 保护新代码路径：将新功能代码包裹在查询开关路由器的条件检查后面，保持旧路径作为默认回退
4. 测试两条路径：编写在开关打开和关闭状态下都执行代码的测试，确保两个分支行为正确
5. 清理过期开关：功能完全上线后，移除开关及其条件分支以防止开关债务累积

</details>

## Do

- Do place toggle points at the highest level possible because deeply nested toggles make code harder to reason about
- Do set expiration dates for release toggles because forgotten flags become permanent complexity
- Do test both toggle states in your test suite because untested paths will break silently in production
- Do use a toggle naming convention because consistent names make it easy to search for and audit active flags

## Don't

- Don't nest multiple toggles in the same code path because the combinatorial explosion of states becomes untestable
- Don't use toggles as a permanent branching mechanism because they should be temporary by design
- Don't store toggle state only in code because it eliminates the ability to change flags without redeployment
- Don't skip toggle cleanup after rollout because accumulated toggle debt degrades codebase readability

## Case Study

**Etsy**: Etsy pioneered the use of code-level feature toggles as part of their continuous deployment culture. With over 50 deployments per day, feature flags allowed engineers to merge incomplete features to trunk and deploy safely. Their internal 'Feature' API let developers toggle features per user, per percentage, or per employee group. When a new search ranking algorithm caused unexpected results, the ops team disabled it within seconds via a toggle without rolling back the deployment. Etsy's disciplined toggle cleanup process ensured that expired flags were removed within two weeks of full rollout.

## Related Frameworks

- strangler-fig-at-code-level (complement)
- branch-by-abstraction (complement)
- feature-branch-strategy (alternative)
- clean-code-principles (complement)

## Source

https://sdframe.caldis.me/frameworks/feature-toggles-at-code-level
