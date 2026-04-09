# Flux / Unidirectional Data Flow / Flux / 单向数据流

- **Category**: architecture
- **Complexity**: intermediate
- **Quality**: maintainability, testability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Facebook (Jing Chen, Bill Fisher), 2014
- **Adopters**: Facebook / Meta, React + Redux ecosystem, Vuex (Vue.js), NgRx (Angular), Elm (inspired by Flux)

Enforces a strict one-way data cycle — Action → Dispatcher → Store → View → Action — eliminating the cascading update problems of two-way binding by making state changes predictable and traceable.

_强制执行严格的单向数据循环——动作→调度器→存储→视图→动作——通过使状态变更可预测和可追踪，消除双向绑定的级联更新问题。_

## When to Use

Apply this framework when:
- When a complex client-side application has shared state that multiple UI components read and mutate, leading to synchronization bugs with two-way binding
- When debugging complex UI bugs that stem from unclear data flow — Flux's action log makes the sequence of state changes fully auditable
- When using React or a similar component-based framework where unidirectional data flow is the idiomatic state management approach
- When the team needs to implement time-travel debugging or undo/redo — the action log is a natural event source for replaying state

## When NOT to Use

Stop and reconsider if:
- For simple applications with local component state only — React's useState hook or Vue's reactive data handles this without the Flux overhead
- When the team is not using a component-based UI framework — Flux's View layer assumes a component model; it does not translate well to server-rendered HTML
- For applications with predominantly server-side state — Flux manages client-side state; server state libraries (React Query, SWR) are a better fit for data fetching

## Core Concepts

- Unidirectional flow: data moves in one direction only — Action → Dispatcher → Store → View → Action — eliminating the feedback loops that make bidirectional binding hard to debug
- Actions: the only mechanism for changing state — explicit, serializable objects that describe what happened, never how the state should change
- Dispatcher: the global event bus that serializes all Actions and broadcasts them to every registered Store — enforcing that only one Action is processed at a time
- Stores: stateful modules that own specific slices of application state; they respond to Actions by computing new state and notifying Views
- Single source of truth: each piece of application state lives in exactly one Store — Views derive their display state from Stores rather than maintaining their own copies

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Flux / Unidirectional Data Flow to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define Actions**: plain data objects (or objects with a type string) that describe what happened in the system — user interactions, API responses, timer events
2. **Implement a Dispatcher**: a singleton registry that receives all Actions and broadcasts them sequentially to all registered Stores — no action may dispatch another action synchronously
3. **Implement Stores**: modules that hold application state and business logic; each Store registers with the Dispatcher, handles the Actions it cares about, and emits a change event when its state updates
4. **Implement Views**: React components or UI elements that subscribe to Store change events, re-render from Store state, and emit new Actions in response to user gestures
5. **Close the loop**: user interaction → View emits Action → Dispatcher broadcasts → Stores update → Views re-render; debug by inspecting the Action log for the full state history

<details><summary>中文步骤</summary>

1. 定义动作：描述系统中发生了什么的普通数据对象（或带有类型字符串的对象）——用户交互、API响应、定时器事件
2. 实现调度器：接收所有动作并将其顺序广播到所有注册存储的单例注册表——任何动作不得同步分发另一个动作
3. 实现存储：持有应用程序状态和业务逻辑的模块；每个存储向调度器注册，处理其关心的动作，并在状态更新时发出变更事件
4. 实现视图：订阅存储变更事件、从存储状态重新渲染、并响应用户手势发出新动作的React组件或UI元素
5. 闭合循环：用户交互→视图发出动作→调度器广播→存储更新→视图重新渲染；通过检查动作日志获取完整状态历史来调试

</details>

## Do

- Keep Actions as plain, serializable data objects with a type field — this makes them loggable, replayable, and easy to test
- Make Store update logic pure and synchronous — asynchronous operations belong in Action creators or middleware, not inside Store handlers
- Define all possible Actions as an explicit set (string enum or constant map) so that typos in action type strings are caught at development time
- Derive computed state in Views (or selectors) rather than storing redundant derived data in Stores — storing derived data creates synchronization bugs

## Don't

- Don't dispatch Actions from within a Store's Action handler — the Dispatcher enforces that only one Action is in-flight at a time; nested dispatches throw errors
- Don't let Views mutate Store state directly — all state changes must go through the Action → Dispatcher → Store cycle, even for local UI state
- Don't create one mega-Store for all application state — split Stores by domain boundary (UserStore, CartStore, NotificationStore) to limit the scope of re-renders
- Don't perform async operations (API calls, timers) inside the Dispatcher's callback chain — use Action creators with async/await or middleware for side effects

## Case Study

**Facebook**: Facebook developed Flux to solve a specific, devastating bug in Facebook Chat: messages would be marked as read, but an unread count badge would persist showing incorrect counts. Root cause analysis revealed MVC's bidirectional data flow allowed controller updates to trigger cascading model updates, which triggered further controller updates — creating an unpredictable cycle of state changes. By replacing the bidirectional flow with a strict Action → Dispatcher → Store → View cycle, Facebook engineers made the data flow explicit and debuggable. After Flux adoption, the Chat unread count bug was eliminated and the team reported a significant reduction in state-synchronization bugs across the Facebook web application.

## Related Frameworks

- observer-pattern (extends)
- eda (related)
- separation-of-concerns (complement)
- mvc (alternative)
- mvvm (alternative)
- mvp (alternative)

## Source

https://sdframe.caldis.me/frameworks/flux-unidirectional
