# MVVM (Model-View-ViewModel) / MVVM（模型-视图-视图模型）

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Abstraction**: component
- **Maturity**: established
- **Author**: John Gossman, 2005, Microsoft (WPF team)
- **Adopters**: Microsoft (WPF, UWP, Xamarin), SwiftUI (Apple), Vue.js, Angular, Knockout.js

Separates UI from business logic by introducing a ViewModel that exposes data streams and commands for two-way data binding, enabling declarative view construction and high testability.

_通过引入ViewModel将UI与业务逻辑分离，ViewModel暴露数据流和命令用于双向数据绑定，从而实现声明式视图构建和高度可测试性。_

## When to Use

Apply this framework when:
- When building rich-client applications (desktop or mobile) with complex UI state that maps naturally to observable data streams
- When the testing strategy requires verifying UI behavior without running the full UI stack — ViewModels are plain classes testable in milliseconds
- When using a framework with first-class data binding support such as WPF, SwiftUI, Angular, or Vue.js
- When the same ViewModel needs to drive multiple Views — e.g., a phone layout and a tablet layout backed by the same presentation logic

## When NOT to Use

Stop and reconsider if:
- For simple read-only displays with no user interaction — the ViewModel and binding overhead is disproportionate
- In frameworks without data binding support, where implementing the binding infrastructure manually negates the pattern's advantages
- For server-rendered web applications where state lives on the server — MVVM is fundamentally a client-side pattern

## Core Concepts

- ViewModel: the pivot of the pattern — a plain, UI-framework-agnostic class that exposes the view's state as observable properties
- Data binding: the mechanism by which View elements automatically reflect ViewModel property changes and ViewModel commands receive View events
- Command pattern: user actions (button clicks, form submissions) are exposed as command objects on the ViewModel, keeping the View passive
- Observable properties: property-change notifications (INotifyPropertyChanged, @Observable, reactive streams) allow the View to react without polling
- Separation from Model: the ViewModel adapts Model data for display — formatting, aggregation, filtering — keeping raw domain objects out of the View

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying MVVM (Model-View-ViewModel) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the Model layer**: domain entities, repositories, and business logic with no awareness of the UI
2. **Define the ViewModel**: a presentation-layer class that exposes observable properties and commands; it queries the Model and transforms data into a format the View can bind to directly
3. **Define the View**: a declarative UI that binds to ViewModel properties using the data-binding framework; the View contains no logic beyond rendering and user gesture forwarding
4. **Establish two-way data binding**: ViewModel properties update the View automatically; user interactions in the View invoke ViewModel commands that update the Model
5. **Test the ViewModel in isolation**: write unit tests that set ViewModel inputs and assert on output properties without instantiating any UI components

<details><summary>中文步骤</summary>

1. 定义模型层：领域实体、仓储和业务逻辑，不感知UI
2. 定义视图模型：表示层类，暴露可观察属性和命令；查询模型并将数据转换为视图可直接绑定的格式
3. 定义视图：声明式UI，使用数据绑定框架绑定到视图模型属性；视图除渲染和用户手势转发外不包含任何逻辑
4. 建立双向数据绑定：视图模型属性自动更新视图；视图中的用户交互调用视图模型命令来更新模型
5. 隔离测试视图模型：编写单元测试，设置视图模型输入并对输出属性进行断言，无需实例化任何UI组件

</details>

## Do

- Keep ViewModels free of any import from UI frameworks — a ViewModel that imports UIKit or WPF types is immediately harder to unit-test
- Expose commands rather than event handlers from the ViewModel so that the View remains a passive, bindable shell
- Use one ViewModel per logical screen or component — god ViewModels that serve many unrelated Views accumulate unmanageable state
- Validate input inside the ViewModel, not in the View, so validation logic is exercisable in unit tests

## Don't

- Don't reference the View from the ViewModel — this breaks testability and creates circular dependencies
- Don't put navigation logic directly in the View — navigation decisions belong in the ViewModel or a dedicated Router so they can be tested
- Don't use MVVM in simple screens where a straightforward MVC or direct state management is sufficient — the binding overhead adds complexity without payoff
- Don't let data binding become bidirectional for write-heavy forms without explicit validation gating — unconstrained two-way binding leads to cascading update loops

## Case Study

**Microsoft**: Microsoft introduced MVVM to solve a fundamental problem with WPF development: UI designers working in Blend and developers writing C# code were constantly stepping on each other's work. By introducing ViewModels as the design-test boundary, the WPF team enabled a clean Blend-to-Visual-Studio handoff where designers manipulated XAML Views while developers wrote testable ViewModel classes. This workflow was later adopted by the Windows Phone platform and became the dominant mobile architecture pattern across the Microsoft ecosystem, reducing UI-related bug rates by enabling ViewModel-level unit testing without requiring device simulators.

## Related Frameworks

- separation-of-concerns (extends)
- observer-pattern (complement)
- solid-principles (complement)
- mvc (alternative)
- mvp (alternative)
- flux-unidirectional (alternative)

## Source

https://sdframe.caldis.me/frameworks/mvvm
