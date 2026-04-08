# State Pattern / 状态模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- **Adopters**: XState / Stately, Unity (game AI state machines), Apache Commons SCXML, Redux (reducer as state machine)

Allow object behavior to change automatically when its internal state changes

_允许对象在内部状态改变时自动改变其行为，使其看起来像改变了类_

## When to Use

Apply this framework when:
- An object's behavior depends heavily on its current state and must change at runtime as state transitions occur
- Large switch/if-else blocks handling state-dependent logic are becoming hard to maintain and extend
- Modeling workflows, protocol parsers, UI wizards, or game characters with distinct operational modes

## When NOT to Use

Stop and reconsider if:
- Objects with only one or two states where a simple boolean or enum is sufficient and self-documenting
- When state transitions are rare and the complexity of multiple state classes outweighs the maintenance benefit
- Stateless services or pure functions that have no mutable internal state to manage

## Core Concepts

- Context: the object whose behavior varies; it delegates all state-dependent requests to the current State object and holds a reference that can be swapped at runtime
- State interface: defines the contract for all behaviors that differ across states, ensuring the Context can treat all states uniformly
- Concrete States: encapsulate the behavior and transition logic for one specific state, replacing large conditionals with focused, single-responsibility classes

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying State Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify the states**: enumerate all distinct states the context object can be in and the transitions between them
2. **Define the State interface**: declare all context-behavior methods that vary by state; every concrete state must implement this interface
3. **Implement Concrete State classes**: one class per state, each implementing the behavior appropriate to that state and triggering transitions by calling context.setState() when conditions are met
4. **Configure the Context class**: hold a reference to the current State object, delegate behavior calls to it, and expose setState() so state objects can drive transitions
5. **Initialize and transition**: set the initial state in the Context constructor and let the state machine run by having concrete states or the context trigger transitions in response to events

<details><summary>中文步骤</summary>

1. 识别状态：枚举上下文对象可能处于的所有不同状态及其转换关系
2. 定义状态接口：声明所有随状态变化的上下文行为方法；每个具体状态必须实现此接口
3. 实现具体状态类：每个状态一个类，各自实现该状态下的适当行为，并在满足条件时通过调用 context.setState() 触发转换
4. 配置上下文类：持有对当前状态对象的引用，将行为调用委托给它，并暴露 setState() 使状态对象能驱动转换
5. 初始化和转换：在上下文构造函数中设置初始状态，让状态机运行，由具体状态或上下文响应事件触发转换

</details>

## Do

- Do let State objects know about each other or use named state constants on the Context to keep transitions explicit and auditable
- Do keep each Concrete State class small and focused on one state's behavior to preserve single-responsibility
- Do use State pattern alongside event logging to create an audit trail of every state transition for debugging and monitoring

## Don't

- Don't scatter transition logic across both State classes and the Context — choose one location and keep it consistent
- Don't create a new State object on every transition if State objects are stateless — share flyweight instances to avoid allocation overhead
- Don't use State pattern for simple two-state toggles; a boolean field is clearer and less over-engineered

## Case Study

**XState / Stately**: XState, the JavaScript state machine library, applies the State pattern at scale in frontend applications. A traffic-light component modeled in XState has explicit states (red, yellow, green) with guarded transitions, entry/exit actions, and parallel states for pedestrian signals. Netflix uses XState to manage the complex state of their video player — buffering, playing, paused, error, ad-break — ensuring that user interactions like clicking play during buffering produce predictable, testable outcomes rather than ad hoc if/else chains.

## Related Frameworks

- strategy-pattern (related)
- command-pattern (related)
- observer-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/state-pattern
