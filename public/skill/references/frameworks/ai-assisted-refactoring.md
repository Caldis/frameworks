# AI-Assisted Refactoring / AI 辅助重构

- **Category**: evolution
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: emerging
- **Author**: Industry practice, 2022, 2021
- **Adopters**: Google, Meta, Shopify, Sourcegraph, Uber

Use LLMs to identify, plan, and execute code refactoring at scale

_利用大语言模型规模化识别、规划和执行代码重构_

## When to Use

Apply this framework when:
- A large legacy codebase with thousands of similar code smells that are tedious to fix manually
- Migrating framework versions (e.g., React class components to hooks) across hundreds of files
- Standardizing coding patterns across a monorepo with contributions from multiple teams
- Identifying and eliminating dead code, unused imports, or deprecated API calls at scale

## When NOT to Use

Stop and reconsider if:
- Security-critical code where AI-introduced subtle bugs could have catastrophic consequences
- Codebases with zero or near-zero test coverage — there is no safety net for AI changes
- One-off refactorings that are faster to do manually than to set up an AI pipeline
- Performance-critical hot paths where AI-generated code may not meet stringent optimization requirements

## Core Concepts

- LLM-driven code analysis: Using large language models to scan codebases for patterns, smells, and improvement opportunities
- AI-generated diffs: LLMs produce specific code changes (diffs) that engineers review before merging
- Human-in-the-loop: Every AI-generated change must be reviewed by a human engineer for correctness and intent
- Test-guarded refactoring: The existing test suite and fitness functions serve as a safety net for AI-generated changes
- Batch refactoring: Applying the same LLM-driven transformation across many files simultaneously for economies of scale

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying AI-Assisted Refactoring to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Feed the target codebase to an LLM and prompt it to identify code smells, duplication, and anti-patterns
2. Generate a prioritized refactoring backlog with risk assessments and estimated effort from LLM output
3. Use LLM-generated diffs or code completions for each refactoring task, reviewed by engineers
4. Run the full test suite and fitness functions after each AI-generated change to catch regressions
5. Track refactoring velocity and code quality metrics over time to measure AI-assistance ROI

<details><summary>中文步骤</summary>

1. 将目标代码库输入 LLM，提示其识别代码异味、重复和反模式
2. 根据 LLM 输出，生成带有风险评估和工作量估算的优先级重构待办清单
3. 使用 LLM 生成的差异或代码补全完成每项重构任务，并由工程师审查
4. 每次 AI 生成变更后运行完整测试套件和适应度函数，捕捉回归问题
5. 持续追踪重构速度和代码质量指标，量化 AI 辅助的投入产出比

</details>

## Do

- Always run the full test suite after every AI-generated change — never merge untested AI output
- Start with mechanical, pattern-based refactorings (renames, import updates) where LLMs are most reliable
- Use AI to generate the initial diff, then have engineers refine it — not the other way around
- Track before/after code quality metrics to quantify the ROI of AI-assisted refactoring

## Don't

- Don't blindly merge AI-generated code without human review — LLMs can introduce subtle bugs
- Don't use AI refactoring on code without test coverage — there's no safety net to catch regressions
- Don't attempt complex architectural refactoring (e.g., extracting microservices) via AI alone
- Don't ignore the context window limitation — LLMs may miss dependencies outside their visible scope

## Case Study

**Google**: Google has used large-scale automated refactoring tooling (Rosie, part of their internal code analysis system) for over a decade. With the advent of LLMs, they integrated AI-assisted code transformation into their internal toolchain to handle migrations like API deprecations and style standardizations across their multi-billion-line monorepo. AI-generated changelists are reviewed by engineers and must pass all automated tests before submission, enabling them to complete refactorings that would previously take months in a fraction of the time.

## Related Frameworks

- mikado-method (complement)
- technical-debt-quadrant (complement)
- ai-pair-programming (complement)

## Source

https://sdframe.caldis.me/frameworks/ai-assisted-refactoring
