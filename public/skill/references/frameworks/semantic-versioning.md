# Semantic Versioning (SemVer) / 语义化版本控制

- **Category**: coding
- **Complexity**: beginner
- **Quality**: maintainability, reliability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Tom Preston-Werner, 2011, 2009
- **Adopters**: npm, Rust (Cargo), Go modules, Maven Central, PyPI

Version APIs and libraries with MAJOR.MINOR.PATCH semantics

_使用主版本.次版本.补丁版本语义对API和库进行版本控制_

## When to Use

Apply this framework when:
- Publishing libraries or SDKs consumed by external developers who need dependency stability
- Managing API versions for public or partner-facing services
- Automating release pipelines where version numbers drive deployment decisions
- Any shared package in a monorepo or package registry where consumers need predictable upgrade paths

## When NOT to Use

Stop and reconsider if:
- Internal applications or services that are not consumed as versioned dependencies
- Continuously deployed services where every commit is a release and version numbers are timestamps or commit hashes
- Monorepo packages that are always released together and share a single version number
- Marketing or product version numbers that serve branding rather than technical compatibility purposes

## Core Concepts

- MAJOR version: incremented for incompatible API changes that require consumers to modify their code
- MINOR version: incremented for new functionality added in a backward-compatible manner
- PATCH version: incremented for backward-compatible bug fixes that do not add new features
- Pre-release identifiers: suffixes like -alpha.1, -beta.2, -rc.1 that indicate unstable versions
- Public API contract: the explicitly defined surface (functions, types, endpoints) that the version number protects

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Semantic Versioning (SemVer) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Understand the contract**: MAJOR for breaking changes, MINOR for backward-compatible features, PATCH for backward-compatible bug fixes
2. **Define your public API surface**: explicitly document which interfaces, endpoints, or exports constitute the versioned contract
3. **Automate version bumps**: use commit message conventions (Conventional Commits) and tools (semantic-release) to compute the next version
4. **Communicate changes**: maintain a CHANGELOG that maps each version to its features, fixes, and breaking changes with migration guides
5. **Enforce in CI**: validate that breaking changes trigger MAJOR bumps; use contract tests to detect unintentional API surface changes

<details><summary>中文步骤</summary>

1. 理解契约：MAJOR用于破坏性变更，MINOR用于向后兼容的新功能，PATCH用于向后兼容的缺陷修复
2. 定义公共API面：明确记录哪些接口、端点或导出构成版本化契约
3. 自动化版本升级：使用提交消息约定（Conventional Commits）和工具（semantic-release）计算下一个版本
4. 传达变更：维护CHANGELOG，将每个版本映射到其功能、修复和破坏性变更，附带迁移指南
5. 在CI中强制执行：验证破坏性变更触发MAJOR升级；使用契约测试检测非预期的API面变更

</details>

## Do

- Do define your public API explicitly because unclear API boundaries lead to accidental breaking changes
- Do use Conventional Commits to automate version bumps because manual versioning is error-prone
- Do maintain a CHANGELOG because consumers need to understand what changed before upgrading
- Do start at 0.y.z during initial development because the 0.x convention signals instability

## Don't

- Don't bump MAJOR for internal changes that don't affect the public API because it creates unnecessary upgrade friction
- Don't release breaking changes as MINOR or PATCH because it silently breaks consumer builds
- Don't use SemVer for artifacts without a defined public API (like applications) because the contract is meaningless
- Don't skip version numbers because gaps confuse consumers and suggest missing releases

## Case Study

**npm (Node.js)**: npm, the Node.js package registry, adopted Semantic Versioning as the standard for all published packages. The package.json dependency resolution system (^, ~, ranges) is built directly on SemVer semantics. This enabled npm to support over 2 million packages with automated dependency updates via tools like Dependabot and Renovate, while giving developers confidence that PATCH and MINOR updates won't break their builds.

## Related Frameworks

- api-versioning-strategies (complement)
- contract-testing (complement)
- conventional-comments (complement)

## Source

https://sdframe.caldis.me/frameworks/semantic-versioning
