# Microkernel (Plugin) Architecture / 微内核（插件）架构

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: maintainability, portability
- **Abstraction**: system
- **Maturity**: established
- **Author**: OS design lineage (Mach microkernel, 1985, Carnegie Mellon); applied to software architecture by Richards and Ford (2015)
- **Adopters**: Eclipse IDE, Visual Studio Code, Webpack, WordPress, Google Chrome

Separates a minimal stable core system from interchangeable plug-in modules, enabling feature extension without modifying the core — the core provides services and a registry; plugins contribute functionality through a defined contract.

_将最小稳定核心系统与可互换插件模块分离，使功能扩展无需修改核心——核心提供服务和注册表；插件通过定义的契约贡献功能。_

## When to Use

Apply this framework when:
- When the system must support extensibility by third parties who should not have access to the core codebase — IDEs, editors, CMS platforms
- When different customers or deployments need different feature sets assembled from a common component catalog
- When the core functionality is stable and well-understood but the peripheral feature set is expected to grow or change frequently
- When wanting to enforce the Open-Closed Principle at an architectural level — the core is closed for modification, open for extension via plugins

## When NOT to Use

Stop and reconsider if:
- For simple applications with a fixed, well-known feature set that will not need third-party extensibility — the plugin infrastructure adds complexity without payoff
- When tight integration between features is required — the loose coupling between plugins makes cross-plugin workflows awkward and difficult to optimize
- When performance is critical and the plugin dispatch overhead (registry lookups, interface calls) is not acceptable — highly optimized systems often need direct coupling

## Core Concepts

- Core system: the minimal, stable host application that provides the plugin registry, lifecycle management, and shared services that plugins depend on
- Plugin contract: the versioned interface (API, extension point, manifest schema) that defines how plugins register themselves and what services they must provide
- Plugin registry: the mechanism by which the core discovers and manages plugins — file-system scanning, dependency injection containers, OSGi bundles, or a remote registry
- Isolation: plugins should not share mutable state or import each other's classes directly — communication happens through the core's mediation layer
- Versioned contracts: the plugin contract must be versioned to allow the core to evolve without breaking existing plugins — semantic versioning of extension APIs

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Microkernel (Plugin) Architecture to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the core system**: the minimal set of functionality required for the system to run — plugin registry, service locator, inter-plugin communication bus, and any essential baseline services
2. **Define the plugin contract**: an interface or API specification that all plugins must implement to register with and be invoked by the core — this contract must be stable and versioned
3. **Implement the plugin registry**: a mechanism for the core to discover, load, and activate plugins at startup or runtime — this may be class-path scanning, a manifest file, or a service registry
4. **Develop plugins as isolated modules**: each plugin implements the defined contract, carries its own dependencies, and performs a specific feature — plugins must not depend on other plugins directly
5. **Define inter-plugin communication**: if plugins need to collaborate, they do so through the core's message bus or extension points — never through direct plugin-to-plugin imports

<details><summary>中文步骤</summary>

1. 定义核心系统：系统运行所需的最小功能集——插件注册表、服务定位器、插件间通信总线和任何基本基线服务
2. 定义插件契约：所有插件必须实现才能向核心注册并被调用的接口或API规范——此契约必须稳定且有版本控制
3. 实现插件注册表：核心在启动或运行时发现、加载和激活插件的机制——这可能是类路径扫描、清单文件或服务注册表
4. 将插件开发为隔离模块：每个插件实现定义的契约，携带自己的依赖项，并执行特定功能——插件不得直接依赖其他插件
5. 定义插件间通信：如果插件需要协作，通过核心的消息总线或扩展点进行——永不通过直接的插件到插件导入

</details>

## Do

- Design the plugin contract for stability from the beginning — breaking changes to the contract require coordinated updates across all plugins, which is expensive
- Give each plugin its own classloader or process sandbox where possible to prevent one plugin's dependency conflicts from affecting others
- Version the plugin API semantically and provide compatibility layers for deprecated extension points so that older plugins continue to work across core upgrades
- Build an integration test suite that verifies each plugin against the core contract — regression-test the contract, not just the plugin implementations

## Don't

- Don't allow plugins to communicate directly with each other — plugin-to-plugin coupling defeats the extensibility goal and creates hidden dependency graphs
- Don't put significant business logic in the core — the core should be minimal; business logic belongs in plugins which can be independently versioned and replaced
- Don't neglect plugin lifecycle management — plugins that are not properly initialized, paused, or shut down leak resources and create unstable system states
- Don't design the plugin API in a rush — a poorly designed, leaked plugin contract is extremely difficult to evolve because it is effectively a public API commitment

## Case Study

**Microsoft (VS Code)**: Visual Studio Code launched in 2016 with a microkernel architecture centered on the Language Server Protocol (LSP). The core VS Code provides editor infrastructure — text rendering, file management, the extension host process — while all language intelligence (IntelliSense, diagnostics, refactoring) is delivered through the extension API. By 2024, the VS Code Marketplace hosts over 50,000 extensions built by third parties. Critically, each extension runs in a separate Node.js process (the Extension Host), preventing a misbehaving extension from crashing the editor core. This isolation model enabled Microsoft to ship language support for over 200 programming languages without any core code changes.

## Related Frameworks

- separation-of-concerns (extends)
- ports-and-adapters (related)
- modular-monolith (related)

## Source

https://sdframe.caldis.me/frameworks/microkernel-architecture
