# MVP (Model-View-Presenter) / MVP（模型-视图-呈现者）

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: testability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Mike Potel / Taligent, 1996
- **Adopters**: Android (early community standard), Google Web Toolkit (GWT), Windows Forms (.NET), Vaadin (Java web)

Evolves MVC by replacing the Controller with a Presenter that holds all UI logic, while the View becomes a passive interface that delegates every user gesture to the Presenter.

_在MVC基础上演进，将控制器替换为持有全部UI逻辑的呈现者，同时视图成为被动接口，将所有用户手势委托给呈现者处理。_

## When to Use

Apply this framework when:
- When UI logic must be fully unit-tested without launching the actual UI — the Presenter's View interface can be mocked trivially
- When working with UI frameworks (Android Activities, Windows Forms) where the View class is difficult to instantiate in tests
- When multiple Views need to share identical UI logic — the same Presenter can back different platform-specific View implementations
- When the team wants to enforce a strict passive-View constraint to prevent ad-hoc logic accumulating in UI components

## When NOT to Use

Stop and reconsider if:
- For simple CRUD screens where the UI logic is trivial — the View interface boilerplate adds more code than it saves in testing effort
- When using reactive frameworks (RxJava, Kotlin Flow, Combine) that naturally enable MVVM with less ceremony than MVP
- For highly dynamic UIs where the View must frequently update its own structure — the passive View constraint becomes a bottleneck

## Core Concepts

- Passive View: the View implements a minimal interface and contains zero logic — it delegates every event to the Presenter and renders exactly what it is told
- Presenter: the mediator between View and Model; it owns all UI decision logic and communicates with the View only through the View interface
- View interface: a contract (Java interface, Swift protocol, .NET interface) that decouples the Presenter from the concrete UI framework class
- Testability by mock: because the Presenter depends only on the View interface, tests replace the real View with a mock object to verify behavior
- One-to-one relationship: each View typically has exactly one Presenter; the Presenter is lifecycle-aware and manages the View's full state

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying MVP (Model-View-Presenter) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the Model**: domain data, persistence, and business rules with no UI dependencies
2. **Define a thin View interface**: declare a minimal contract (interface/protocol) specifying only what the View can display and what events it can fire — no logic lives here
3. **Implement the Presenter**: a plain class that implements the full UI decision logic; it holds a reference to the View interface and the Model, and orchestrates all interactions
4. Implement the concrete View (Activity, Form, Widget): wire all user gestures to Presenter method calls and implement the View interface methods to update the display
5. Write unit tests against the Presenter using a mock View — verify that given a specific user action, the Presenter calls the correct View methods with the correct data

<details><summary>中文步骤</summary>

1. 定义模型：领域数据、持久化和业务规则，不依赖UI
2. 定义精简的视图接口：声明最小化契约（接口/协议），仅指定视图可以显示什么以及可以触发什么事件——这里不存放任何逻辑
3. 实现呈现者：持有完整UI决策逻辑的普通类；持有视图接口和模型的引用，协调所有交互
4. 实现具体视图（Activity、Form、Widget）：将所有用户手势连接到呈现者方法调用，并实现视图接口方法以更新显示
5. 使用模拟视图对呈现者编写单元测试——验证给定特定用户操作时，呈现者用正确数据调用正确的视图方法

</details>

## Do

- Define the View as an interface with the minimum surface area needed — every extra method on the View interface is a method you must mock in tests
- Keep Presenters stateless where possible, or clearly document the state they manage, so that tests can set up known preconditions
- One Presenter per View screen — splitting a large screen into sub-Views each with their own Presenter improves cohesion and makes tests focused
- Inject dependencies (Model, services) into the Presenter constructor so tests can provide substitutes without service locators

## Don't

- Don't let the Presenter hold a direct reference to a concrete View class — this prevents mocking and couples the Presenter to the UI framework
- Don't call View methods from background threads without marshalling back to the UI thread — threading bugs create intermittent, hard-to-reproduce failures
- Don't put navigation logic in the View — navigation belongs in the Presenter or a Router so the routing decision is testable
- Don't skip the View interface because it seems like overhead — skipping it is the single most common mistake that makes MVP code untestable

## Case Study

**Google (Android)**: Google's Android team published the Android MVP sample in 2015 as part of the android-architecture repository to demonstrate how to write testable Android applications. Prior to MVP adoption, Android code was concentrated in Activities that mixed UI, business logic, and data access — making unit testing nearly impossible without Robolectric's slow JVM-based Android simulation. By extracting all UI decisions into plain Java Presenters backed by View interfaces, teams achieved Presenter test suites that ran in under 100ms on the JVM, compared to 30+ seconds with instrumented tests on emulators.

## Related Frameworks

- separation-of-concerns (extends)
- solid-principles (complement)
- observer-pattern (related)

## Source

https://sdframe.caldis.me/frameworks/mvp
