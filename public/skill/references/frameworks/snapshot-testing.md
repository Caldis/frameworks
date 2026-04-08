# Snapshot Testing / 快照测试

- **Category**: quality
- **Complexity**: beginner
- **Quality**: testability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Jest team at Facebook, 2016, 2010
- **Adopters**: Facebook, Airbnb, Shopify, Stripe, Vercel

Capture output snapshots for regression detection by comparing current output against stored baselines

_通过将当前输出与存储的基线进行比较，捕获输出快照以检测回归_

## When to Use

Apply this framework when:
- Testing UI component rendering to catch unintended visual or structural changes across releases
- Validating serialized data formats like JSON or XML outputs where exact structure matters
- Detecting regressions in CLI tool output where users depend on stable formatting
- Guarding API response schemas against accidental changes that could break downstream consumers

## When NOT to Use

Stop and reconsider if:
- Highly dynamic outputs where the content changes frequently by design, making snapshots constantly stale
- Complex stateful interactions where behavior matters more than output shape and snapshot diffs are misleading
- Early-stage prototyping where UI and data formats are changing rapidly and snapshot maintenance creates drag

## Core Concepts

- Snapshot File: A stored representation of expected output, committed to version control alongside test code
- Snapshot Diff: The comparison between current output and the stored baseline, highlighting any changes
- Inline Snapshot: A snapshot stored directly within the test file rather than in a separate snapshot file
- Snapshot Update: The deliberate act of regenerating baselines when intentional changes are made to output
- Snapshot Bloat: The accumulation of large or orphaned snapshot files that slow tests and obscure meaningful diffs

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Snapshot Testing to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify outputs suitable for snapshotting: rendered UI components, serialized data structures, API responses, or CLI outputs
2. **Generate initial snapshots**: run the test suite to capture baseline outputs and commit the snapshot files to version control
3. **Write snapshot assertions in tests**: compare current output against the stored snapshot and fail on any diff
4. Review snapshot diffs carefully during code review: treat snapshot updates as production changes that require explicit approval
5. Update snapshots intentionally when changes are expected: use the update flag deliberately, never blindly accept all snapshot changes

<details><summary>中文步骤</summary>

1. 识别适合快照的输出：渲染的UI组件、序列化数据结构、API响应或CLI输出
2. 生成初始快照：运行测试套件以捕获基线输出并将快照文件提交到版本控制
3. 在测试中编写快照断言：将当前输出与存储的快照进行比较，有差异则失败
4. 在代码审查中仔细审查快照差异：将快照更新视为需要明确批准的生产变更
5. 在预期变更时有意更新快照：刻意使用更新标志，永远不要盲目接受所有快照变更

</details>

## Do

- Do review snapshot diffs with the same rigor as code changes because unreviewed snapshot updates hide regressions
- Do keep snapshots small and focused because large snapshots make diffs unreadable and reviews perfunctory
- Do use inline snapshots for small outputs because they keep the expected value co-located with the test logic
- Do delete orphaned snapshot files because stale snapshots waste CI time and confuse new team members

## Don't

- Don't blindly update all snapshots when tests fail because this defeats the purpose of regression detection entirely
- Don't snapshot non-deterministic output like timestamps or random IDs because they cause false failures on every run
- Don't use snapshots as a substitute for specific assertions because snapshots test shape not behavior
- Don't let snapshot files grow unbounded because massive snapshots slow down test execution and version control operations

## Case Study

**Facebook**: Facebook developed snapshot testing within Jest to manage the rapid pace of React component changes across thousands of engineers. Before snapshots, UI regressions frequently slipped through code review because reviewers could not visualize rendering changes from code diffs alone. After adopting snapshot testing, unintended UI changes became visible in pull request diffs, reducing UI regression reports by 40% and significantly improving code review quality for frontend changes.

## Related Frameworks

- test-pyramid (complement)
- mutation-testing (related)

## Source

https://sdframe.caldis.me/frameworks/snapshot-testing
