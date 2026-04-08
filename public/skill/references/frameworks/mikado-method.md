# Mikado Method / 米卡多方法

- **Category**: evolution
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Ola Ellnestam & Daniel Brolund, 2014, 2008
- **Adopters**: Ericsson, Agical, Spotify, King (Candy Crush), Klarna

Visualize and untangle large refactorings as a dependency graph of small safe steps

_将大型重构可视化为依赖图，分解为一系列小而安全的步骤_

## When to Use

Apply this framework when:
- A large refactoring that keeps failing because hidden dependencies break things unexpectedly
- Untangling a deeply coupled legacy codebase where each change triggers a cascade of compilation errors
- Planning a multi-sprint refactoring effort where the team needs to see the full dependency map before starting
- Teaching junior developers how to approach large-scale refactoring safely and systematically

## When NOT to Use

Stop and reconsider if:
- Small refactorings with obvious, well-known dependency chains that don't need graphing
- Codebases with comprehensive test coverage where failed attempts are immediately caught and understood
- Throwaway or prototype code where breaking things temporarily is acceptable
- Automated migration tools (e.g., codemods) can handle the refactoring mechanically without dependency analysis

## Core Concepts

- Mikado Graph: A directed acyclic graph where the root is the refactoring goal and children are prerequisites that must be satisfied first
- Naive attempt: Deliberately try the change and let it fail, using the failures to discover hidden dependencies
- Revert-and-recurse: After each failed attempt, revert all changes and apply the same process to each discovered prerequisite
- Leaf-first implementation: Work from the bottom of the graph upward, implementing only leaves that can be done independently
- Safe, small steps: Each leaf implementation is small enough to commit, test, and deploy independently without breaking the system

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Mikado Method to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. State the refactoring goal as a single root node and attempt it naively in the codebase
2. When compilation or tests break, record each blocker as a child node in the Mikado Graph
3. **Revert all changes and recurse**: attempt each leaf node (blocker) the same way
4. Continue building the graph until all leaves are independently achievable without breakage
5. Implement leaves first, working bottom-up through the graph until the root goal is achieved

<details><summary>中文步骤</summary>

1. 将重构目标设为单一根节点，在代码库中直接尝试实现
2. 当编译或测试失败时，将每个阻塞点记录为米卡多图中的子节点
3. 回滚所有变更并递归：用同样方式尝试每个叶节点（阻塞项）
4. 持续构建依赖图，直到所有叶节点均可独立完成而不引发问题
5. 从叶节点开始实现，自底向上逐步完成，直至达成根节点目标

</details>

## Do

- Always revert after a failed naive attempt — the point is to discover dependencies, not to force changes through
- Draw the Mikado Graph on a whiteboard or shared diagram so the whole team can see the plan
- Commit each leaf-level change independently so the main branch stays green throughout the refactoring
- Use the graph as a communication tool in stand-ups to track progress through the refactoring

## Don't

- Don't skip the revert step — pushing through a broken state defeats the purpose of the method
- Don't try to implement non-leaf nodes before their children are complete — you'll break things again
- Don't build a huge graph in one session — discover dependencies incrementally as you work
- Don't use Mikado for simple, well-understood refactorings — the overhead is only justified for complex dependency tangles

## Case Study

**Ericsson**: The Mikado Method originated from real-world work at Ericsson's telecom infrastructure division, where engineers faced massive C++ codebases with deep dependency chains. Traditional refactoring attempts caused cascading build failures across hundreds of files. By systematically using the naive-attempt-revert-graph cycle, the team mapped out the full dependency tree for a major module extraction and completed it over several weeks through safe, incremental leaf-first commits — each one passing CI independently.

## Related Frameworks

- technical-debt-quadrant (complement)
- ai-assisted-refactoring (complement)
- strangler-fig-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/mikado-method
