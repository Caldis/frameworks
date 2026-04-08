# Parallel Run / 并行运行模式

- **Category**: evolution
- **Complexity**: advanced
- **Quality**: reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Michael Feathers, 2004
- **Adopters**: GitHub, Stripe, Intercom, Shopify, SoundCloud

Run old and new implementations simultaneously and compare outputs for safety

_同时运行新旧实现并对比输出，确保迁移安全性_

## When to Use

Apply this framework when:
- Migrating a financial calculation engine where correctness must be formally verified
- Replacing a fraud detection system where even small discrepancies have major consequences
- Switching to an AI/ML-based recommendation engine and validating it against rule-based logic
- Migrating critical data processing pipelines that must produce bit-identical results

## When NOT to Use

Stop and reconsider if:
- The system under migration has side effects (e.g., sends emails, charges credit cards) that cannot be safely duplicated
- Infrastructure budget cannot support double the compute and storage resources
- Output comparison is meaningless because the new system intentionally produces different results
- The migration scope is trivial and a simple A/B test or feature flag would suffice

## Core Concepts

- Dual execution: Every request is processed by both old and new systems simultaneously in production
- Shadow mode: The new system's output is captured but never shown to users during verification
- Output comparison: Automated diff tooling detects semantic or numeric discrepancies between the two outputs
- Discrepancy resolution: Every mismatch is investigated, categorized, and fixed before cutover
- Confidence threshold: A quantitative bar (e.g., 99.99% match rate) that must be met before decommissioning the old system

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Parallel Run to?
- What constraints or existing architecture do you need to work within?
- Has your team used Parallel Run before? (This is an advanced framework)

## Implementation Steps

1. Deploy both the legacy and new implementations into the same production environment
2. Route all live requests to both systems simultaneously without exposing new results to users
3. Capture and compare outputs from both systems, logging all discrepancies
4. Investigate and resolve every discrepancy until the new system output matches the legacy
5. Decommission the legacy system and promote the new implementation as the sole handler

<details><summary>中文步骤</summary>

1. 将遗留系统与新实现同时部署到同一生产环境
2. 将所有线上请求同时路由至两个系统，不向用户暴露新结果
3. 捕获并比对两系统的输出，记录所有差异
4. 排查并修复每一处差异，直到新系统输出与遗留系统一致
5. 下线遗留系统，将新实现晋升为唯一处理方

</details>

## Do

- Use a library like GitHub Scientist to standardize experiment setup, comparison, and reporting
- Log every discrepancy with full request context so root-cause analysis is efficient
- Set a clear quantitative threshold for cutover confidence before starting the parallel run
- Run the parallel comparison long enough to capture edge cases across business cycles

## Don't

- Don't expose the new system's results to users until the match rate meets the confidence threshold
- Don't ignore low-frequency discrepancies — they often represent critical edge cases
- Don't underestimate the infrastructure cost of running two systems in parallel at production scale
- Don't skip performance testing — the new system may match functionally but degrade latency

## Case Study

**GitHub**: GitHub created the Scientist library in 2013 to safely migrate their core merge algorithm. They ran the old and new merge code paths in parallel on every pull request merge, comparing results without exposing the new output to users. Over several months, they identified and fixed dozens of edge-case discrepancies, ultimately achieving a 100% match rate before switching over. The library was open-sourced in 2016 and has been adopted by hundreds of companies.

## Related Frameworks

- strangler-fig-pattern (complement)
- canary-deployment (complement)
- blue-green-deployment (alternative)

## Source

https://sdframe.caldis.me/frameworks/parallel-run
