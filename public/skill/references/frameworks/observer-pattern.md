# Observer Pattern / 观察者模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- **Adopters**: Vue.js, Angular (EventEmitter), RxJS, Redux

Notify dependents automatically when state changes

_当对象状态发生变化时自动通知所有依赖方_

## When to Use

Apply this framework when:
- One object's state change should trigger updates in an unknown or variable number of other objects
- You want to decouple the producer of events from the consumers without forcing them to know about each other
- Building reactive UIs, event-driven agent environments, or real-time data feeds where multiple components react to changes

## When NOT to Use

Stop and reconsider if:
- Simple synchronous pipelines where direct method calls are clearer and the set of dependents is fixed
- Performance-critical tight loops where notification overhead is measurable
- When event ordering guarantees are critical and the broadcast model introduces non-determinism

## Core Concepts

- Subject (Observable): maintains a list of observers and broadcasts notifications on state change
- Observer: the interface or callback that subjects invoke when notifying, decoupling it from concrete implementations
- Push vs Pull: subjects can push state in the notification payload (push model) or observers can query state after being pinged (pull model)

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Observer Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the Subject interface**: expose methods to attach, detach, and notify observers, keeping the subject independent of concrete observer types
2. **Define the Observer interface**: declare an update method that subjects will call, carrying relevant state or event data
3. **Implement the Concrete Subject**: maintain a list of observers, manage state, and call notify whenever a meaningful state change occurs
4. **Implement Concrete Observers**: register with the subject and react to notifications by reading subject state or the pushed event payload
5. **Manage subscription lifecycle**: ensure observers unsubscribe when no longer needed to prevent memory leaks and stale notifications

<details><summary>中文步骤</summary>

1. 定义主题接口：暴露注册、注销和通知观察者的方法，使主题独立于具体观察者类型
2. 定义观察者接口：声明主题将调用的 update 方法，携带相关状态或事件数据
3. 实现具体主题：维护观察者列表，管理状态，并在有意义的状态变更时调用通知方法
4. 实现具体观察者：向主题注册，通过读取主题状态或推送的事件负载对通知做出响应
5. 管理订阅生命周期：确保观察者在不再需要时取消订阅，防止内存泄漏和陈旧通知

</details>

## Do

- Do use weak references or explicit unsubscribe to prevent memory leaks when observers outlive their subjects
- Do keep observer update methods fast and non-blocking; offload heavy work to background threads or queues
- Do consider passing event data in the notification rather than forcing observers to call back into the subject

## Don't

- Don't create cascading notification chains where one observer triggers another subject's notification — it causes hard-to-trace update storms
- Don't notify observers in a non-deterministic order when observers depend on each other's effects
- Don't use Observer for simple one-to-one callbacks; a direct method call or delegate is simpler

## Case Study

**Vue.js**: Vue.js 3's reactivity system is a direct application of the Observer pattern. Each reactive data property is a Subject; component render functions and computed properties are Observers automatically registered via dependency tracking during a getter trap. When a property changes, only the components that actually read that property are notified and re-rendered, achieving fine-grained reactivity without manual subscription management.

## Related Frameworks

- strategy-pattern (related)
- command-pattern (related)

## Source

https://sdframe.caldis.me/frameworks/observer-pattern
