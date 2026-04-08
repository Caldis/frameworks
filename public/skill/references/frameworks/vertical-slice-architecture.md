# Vertical Slice Architecture / 垂直切片架构

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Jimmy Bogard, 2004
- **Adopters**: Headspring (Accenture), JetBrains, Microsoft (internal services), Stack Overflow, Ardalis (Steve Smith), Contoso (reference implementations)

Organizing code by feature rather than by technical layer, grouping all code for a feature — from HTTP handler to database query — in a single cohesive slice

_按功能而非技术层次组织代码，将一个功能的所有代码——从HTTP处理器到数据库查询——组合在单一的内聚切片中_

## When to Use

Apply this framework when:
- Applications where adding a new feature requires touching files across many technical layers (controller, service, repository, DTO, mapper) creating high coordination cost and merge conflict frequency
- Teams that find traditional layered architecture creates excessive abstraction and ceremony for CRUD-heavy applications where most features have simple data access patterns
- Codebases where features are largely independent and cross-feature coupling is a code smell — vertical slices make dependencies visible and explicit rather than hidden in shared service layers
- Environments where feature teams own end-to-end slices and need to minimize the coordination cost of changing any single feature without affecting others

## When NOT to Use

Stop and reconsider if:
- Highly domain-complex applications where DDD bounded contexts with rich aggregates, domain events, and deep invariants provide more value than the simplicity of flat feature folders
- Libraries and frameworks (not applications) where the organizational unit is the public API surface area, not user-facing features
- Small applications with 10-20 features where any organizational structure provides sufficient clarity and the overhead of setting up a mediator pattern exceeds the benefit

## Core Concepts

- Feature Cohesion: all code implementing a single user-facing feature lives together in one location — command object, validator, handler, and persistence logic — making each feature independently understandable and modifiable
- Minimal Shared Layers: instead of universal Services or Repository layers, share only true cross-cutting concerns (auth, logging, error handling) through middleware, behaviors, and pipeline decorators
- CQRS Alignment: vertical slices align naturally with Command Query Responsibility Segregation — commands and queries are the natural slice boundaries, each with its own handler and data access strategy
- Mediator Pattern: a command/query bus (MediatR in .NET) decouples the HTTP entry point from the handler implementation, enabling cross-cutting behaviors (validation, logging, caching) to be applied as pipeline behaviors
- Integration-First Testing: testing the full vertical slice from HTTP request to database response gives high confidence tests that are resilient to internal refactoring, compared to unit tests of individual layers

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Vertical Slice Architecture to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the slices**: identify the discrete features or use cases in your application (CreateOrder, GetProductCatalog, UserLogin) — each becomes a self-contained vertical slice with its own handler, validation, business logic, and data access code
2. **Co-locate everything for a feature**: place the command/query object, handler, validator, and any DTOs in a single folder or file rather than splitting them across Controllers, Services, and Repositories directories
3. Use MediatR (or equivalent mediator/command bus): dispatch commands and queries through a mediator so that the HTTP layer sends a message and doesn't directly depend on the handler implementation, enabling independent handler evolution
4. **Share carefully**: create shared abstractions only for true cross-cutting concerns (authentication, logging, error handling) using middleware and behaviors — resist the urge to build shared service layers that couple all features
5. **Test each slice independently**: write integration tests that test the full vertical slice from handler input to database output, validating the behavior of each feature as a unit without mocking internal implementation details

<details><summary>中文步骤</summary>

1. 定义切片：识别应用中的离散功能或用例（CreateOrder、GetProductCatalog、UserLogin）——每个都成为包含自己的处理器、验证、业务逻辑和数据访问代码的自包含垂直切片
2. 共置一个功能的所有内容：将命令/查询对象、处理器、验证器和任何DTO放在单一文件夹或文件中，而非将它们拆分到Controllers、Services和Repositories目录中
3. 使用MediatR（或等效的中介器/命令总线）：通过中介器分派命令和查询，使HTTP层发送消息而不直接依赖处理器实现，实现处理器的独立演化
4. 谨慎共享：仅为真正的横切关注点（认证、日志、错误处理）使用中间件和行为创建共享抽象——抵制构建将所有功能耦合在一起的共享服务层的冲动
5. 独立测试每个切片：编写从处理器输入到数据库输出测试完整垂直切片的集成测试，将每个功能的行为作为单元进行验证，无需模拟内部实现细节

</details>

## Do

- Do treat each slice as potentially having different internal structure — a simple read query might be a single function, while a complex write command might use a full domain model; don't force uniformity across slices
- Do use the mediator pipeline for cross-cutting behaviors (validation, authorization, logging, transactions) so these apply consistently to all handlers without each handler needing to call them explicitly
- Do write slice-level integration tests rather than isolated unit tests for each layer — testing the full slice from input to output gives confidence that the feature works end-to-end
- Do start with feature-folder organization even if you don't adopt the full CQRS/MediatR stack — co-locating related files is the core principle and can be applied independently of the tooling

## Don't

- Don't create a SharedService layer that multiple slices depend on — this reintroduces the coupling that vertical slices are designed to eliminate; if logic is truly shared, promote it to a domain concept
- Don't confuse vertical slices with microservices — slices are a code organization pattern within a single deployable unit; they are about developer experience and maintainability, not deployment topology
- Don't apply vertical slices mechanically to every project — highly domain-complex applications (rich domain models with deep invariants) may benefit from traditional DDD layering within each slice
- Don't skip defining the slice boundaries carefully — if slice boundaries don't align with actual user-facing features, you end up with arbitrary code groupings that don't reduce coupling

## Case Study

**Headspring (now Accenture)**: Headspring, the consulting firm where Jimmy Bogard worked, applied Vertical Slice Architecture across multiple enterprise client projects. In a large insurance claims processing system with 200+ features, they replaced a traditional N-Tier architecture (Controllers → Services → Repositories) with feature folders, each containing the command/query, validator, handler, and any supporting types. The result was that a developer could understand a complete feature by reading a single folder rather than tracing code through 6 layers across 6 directories. Adding a new feature required touching exactly one new folder. Feature development velocity increased because teams stopped stepping on each other's changes — slice isolation meant that two developers could work on different features with zero merge conflicts in shared service layers. Code review complexity dropped as each PR contained one complete, self-contained behavior change.

## Related Frameworks

- solid-principles (related)
- domain-driven-design (related)
- hexagonal-architecture (related)

## Source

https://sdframe.caldis.me/frameworks/vertical-slice-architecture
