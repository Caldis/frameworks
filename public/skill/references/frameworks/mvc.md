# MVC (Model-View-Controller) / MVC（模型-视图-控制器）

- **Category**: architecture
- **Complexity**: beginner
- **Quality**: maintainability, testability
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Trygve Reenskaug, 1979, Xerox PARC
- **Adopters**: Apple (Cocoa / UIKit), Ruby on Rails, Spring MVC, ASP.NET MVC, Django

Separates an application into three interconnected components — Model (data/logic), View (UI), and Controller (input handling) — to decouple presentation from business logic.

_将应用程序分为三个相互关联的组件——模型（数据/逻辑）、视图（界面）和控制器（输入处理）——以解耦表示层与业务逻辑。_

## When to Use

Apply this framework when:
- When building applications with rich user interfaces that need clean separation between business logic and presentation
- When the same underlying data must be rendered in multiple different views simultaneously
- When working within frameworks that enforce or encourage MVC structure (Rails, Spring MVC, ASP.NET MVC, Django)
- When teams need to work in parallel on UI and backend logic with minimal conflicts

## When NOT to Use

Stop and reconsider if:
- For simple scripts or single-screen utilities where the overhead of three layers adds complexity without benefit
- When building highly reactive UIs with complex two-way data binding, where MVVM provides a more natural fit
- For purely data-processing backend services with no user interface, where layered or hexagonal architecture is more appropriate

## Core Concepts

- Model: encapsulates application data, business rules, and state; completely independent of the UI layer
- View: renders the Model's state visually; ideally contains no logic beyond formatting and display
- Controller: mediates between user input and the Model; translates raw events into domain actions
- Observer relationship: Views subscribe to Model changes via the Observer pattern to stay synchronized without tight coupling
- Unidirectional dependency: Views and Controllers depend on the Model, but the Model depends on neither

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying MVC (Model-View-Controller) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the Model layer**: data structures, business rules, and persistence logic; the Model notifies observers when its state changes
2. **Define the View layer**: all UI rendering and presentation logic, subscribing to Model changes to update the display without containing business logic
3. **Define the Controller layer**: intercepts user input, translates it into commands for the Model or View, and orchestrates the interaction flow
4. **Wire the triad together**: Controllers reference the Model and View; Views observe the Model; Models have no knowledge of Views or Controllers
5. Validate separation by ensuring business logic changes require only Model modifications and UI redesigns require only View modifications

<details><summary>中文步骤</summary>

1. 定义模型层：数据结构、业务规则和持久化逻辑；模型在状态变化时通知观察者
2. 定义视图层：所有UI渲染和表示逻辑，订阅模型变化以更新显示，不包含业务逻辑
3. 定义控制器层：拦截用户输入，将其转化为对模型或视图的命令，并协调交互流程
4. 连接三元组：控制器引用模型和视图；视图观察模型；模型不了解视图或控制器
5. 通过确保业务逻辑变更只需修改模型、UI重设计只需修改视图来验证分离是否彻底

</details>

## Do

- Keep the Model completely ignorant of the View and Controller so it can be tested in isolation without any UI scaffolding
- Place all business validation in the Model, not in Controllers or Views, so that validation is enforced regardless of the entry point
- Use thin Controllers that delegate complex logic to the Model or service layer — fat controllers are a sign that business logic has leaked into the wrong layer
- Allow multiple Views to observe the same Model so data changes propagate consistently without duplication

## Don't

- Don't put database queries or business rules directly in Controllers — this creates untestable, framework-coupled logic
- Don't let Views directly manipulate Model state — all mutations must flow through the Controller
- Don't share mutable state between Views without going through the Model — direct View-to-View communication breaks the pattern
- Don't confuse MVC's Controller with the Front Controller pattern — MVC Controllers handle specific user interactions, not all HTTP routing

## Case Study

**Apple**: Apple's Cocoa framework for macOS and iOS enforces MVC as its primary application architecture pattern. In Cocoa, NSDocument (Model), NSView (View), and NSViewController (Controller) form the triad. By enforcing strict MVC separation, Apple enabled developers to swap entire UI implementations (e.g., migrating from AppKit to SwiftUI views) without touching model layer code. The iOS UIKit framework's adoption of MVC enabled a thriving ecosystem of third-party apps because developers could share Model code between iPhone and iPad view hierarchies with minimal changes.

## Related Frameworks

- separation-of-concerns (extends)
- observer-pattern (complement)
- solid-principles (complement)
- mvvm (alternative)
- mvp (alternative)
- flux-unidirectional (alternative)

## Source

https://sdframe.caldis.me/frameworks/mvc
