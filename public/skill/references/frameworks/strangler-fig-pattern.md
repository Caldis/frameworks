# Strangler Fig Pattern / 绞杀榕模式

- **Category**: evolution
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Martin Fowler, 2004
- **Adopters**: The Guardian, Netflix, Shopify, GOV.UK, Amazon

Incrementally replace a legacy system by routing traffic to new modules

_通过逐步将流量路由至新模块，渐进式替换遗留系统_

## When to Use

Apply this framework when:
- Migrating a monolithic legacy system to microservices without a full rewrite
- Replacing an aging e-commerce platform while keeping it live for customers
- Gradually moving from an on-premises system to cloud-native services
- Modernizing a mainframe backend one domain at a time

## When NOT to Use

Stop and reconsider if:
- The legacy system is small enough that a clean rewrite can be completed in a single sprint
- There is no clear boundary or API surface to intercept between consumers and the legacy system
- The legacy system has no automated tests and its behavior cannot be reliably verified against the new system
- Organizational urgency demands an immediate cutover rather than gradual migration

## Core Concepts

- Facade/Proxy: An interception layer that sits between consumers and the legacy system, enabling transparent traffic routing
- Incremental migration: Replace one vertical slice of functionality at a time rather than attempting a big-bang rewrite
- Traffic routing: Gradually shift requests from old to new implementation using load balancers, API gateways, or URL rewrites
- Asset capture: Each migrated slice permanently removes a piece of legacy code, like a strangler fig enveloping its host tree
- Rollback safety: The facade can instantly revert traffic to the legacy path if the new implementation exhibits issues

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Strangler Fig Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the legacy system boundary and map all entry points (APIs, events, UI routes)
2. Build a facade or proxy layer that intercepts all requests to the legacy system
3. Incrementally implement new functionality behind the facade, feature by feature
4. Redirect traffic from the facade to the new implementation one slice at a time
5. Retire legacy code once all traffic has been migrated and verified stable

<details><summary>中文步骤</summary>

1. 识别遗留系统边界，映射所有入口点（API、事件、UI 路由）
2. 构建外观层或代理层，拦截所有流向遗留系统的请求
3. 在外观层后面逐项功能地增量实现新功能
4. 逐片将流量从外观层重定向至新实现
5. 所有流量迁移并验证稳定后，退役遗留代码

</details>

## Do

- Start with the highest-value, most well-understood slice to build team confidence early
- Invest in comprehensive monitoring and diff-comparison between old and new paths
- Keep the facade layer thin and stateless so it does not become a bottleneck itself
- Celebrate each retired legacy module to maintain team momentum

## Don't

- Don't attempt to migrate everything at once — the whole point is incremental progress
- Don't let the facade grow into a 'smart' middleware with business logic
- Don't neglect the legacy system's maintenance during migration — it's still serving live traffic
- Don't skip writing tests for the new implementation just because the legacy system 'already works'

## Case Study

**The Guardian**: The Guardian newspaper migrated its website from a legacy Java CMS to a modern Scala/Node.js stack between 2011 and 2014 using the Strangler Fig pattern. They placed an Nginx proxy in front of the old system and routed one section at a time (sports, then news, then opinion) to the new stack. The migration was invisible to readers, and the legacy CMS was fully decommissioned without a single day of downtime.

## Related Frameworks

- branch-by-abstraction (complement)
- parallel-run (complement)
- microservices-decomposition (related)

## Source

https://sdframe.caldis.me/frameworks/strangler-fig-pattern
