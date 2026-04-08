# Reactive Extensions (Rx) / 响应式扩展（Rx）

- **Category**: coding
- **Complexity**: advanced
- **Quality**: performance, scalability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Erik Meijer, 2009
- **Adopters**: Netflix, Microsoft, Google (Angular), Trello, SoundCloud

Compose async event streams with observable sequences and operators

_通过可观察序列和操作符组合异步事件流_

## When to Use

Apply this framework when:
- Building real-time UIs that react to multiple asynchronous data sources (WebSocket, user input, timers)
- Implementing complex event processing pipelines with backpressure and error recovery
- Mobile applications where lifecycle-aware subscription management is critical
- Systems that need to compose, merge, and throttle multiple event streams declaratively

## When NOT to Use

Stop and reconsider if:
- Simple request-response APIs where Promises or async/await are sufficient
- Teams unfamiliar with functional reactive programming who would struggle with the learning curve
- Applications with very few asynchronous operations where Rx adds unnecessary complexity
- Batch processing systems where pull-based iteration is more appropriate than push-based streams

## Core Concepts

- Observable: a push-based collection that emits items over time, representing an asynchronous data stream
- Observer/Subscriber: a consumer that reacts to items emitted by an Observable via onNext, onError, and onComplete callbacks
- Operators: composable functions (map, filter, flatMap, debounce, zip) that transform and combine Observable streams
- Schedulers: control which thread or execution context an Observable emits on and an Observer subscribes on
- Backpressure: a mechanism for handling situations where an Observable produces items faster than an Observer can consume them

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Reactive Extensions (Rx) to?
- What constraints or existing architecture do you need to work within?
- Has your team used Reactive Extensions (Rx) before? (This is an advanced framework)

## Implementation Steps

1. **Model data as streams**: represent events, user actions, and async results as Observable sequences rather than callbacks or promises
2. **Apply operators**: use map, filter, merge, switchMap, debounce, and other operators to transform and combine streams declaratively
3. **Manage subscriptions**: subscribe to observables at the UI or service boundary and unsubscribe on component destruction to prevent memory leaks
4. **Handle errors in the stream**: use catchError, retry, and fallback operators to build resilient pipelines without try/catch nesting
5. **Test with marble diagrams**: use virtual time schedulers and marble syntax to write deterministic tests for complex async flows

<details><summary>中文步骤</summary>

1. 将数据建模为流：将事件、用户动作和异步结果表示为Observable序列，而非回调或Promise
2. 应用操作符：使用map、filter、merge、switchMap、debounce等操作符声明式地转换和组合流
3. 管理订阅：在UI或服务边界订阅Observable，在组件销毁时取消订阅以防止内存泄漏
4. 在流中处理错误：使用catchError、retry和降级操作符构建弹性管道，避免try/catch嵌套
5. 用弹珠图测试：使用虚拟时间调度器和弹珠语法为复杂异步流编写确定性测试

</details>

## Do

- Do use marble diagrams for documentation and testing because they visually clarify complex timing behavior
- Do unsubscribe or use takeUntil patterns because leaked subscriptions are the most common Rx bug
- Do choose the right operator for the job because using flatMap when you need switchMap causes subtle bugs
- Do handle errors at the stream level because an unhandled error terminates the entire Observable chain

## Don't

- Don't nest subscribe calls because it defeats the purpose of declarative stream composition
- Don't use Rx for simple one-shot async operations because Promises/async-await are simpler and sufficient
- Don't ignore backpressure in high-throughput scenarios because uncontrolled buffering causes out-of-memory errors
- Don't create hot observables without understanding multicasting because each subscription may trigger a new execution

## Case Study

**Netflix**: Netflix created RxJava to manage the complexity of composing dozens of asynchronous microservice calls in their API layer. By modeling each service call as an Observable and using operators like zip and merge, they could assemble personalized page responses from parallel backend calls. This reactive approach reduced API response latency by 30% and simplified error handling across hundreds of microservices.

## Related Frameworks

- eda (complement)
- actor-model (alternative)
- functional-core-imperative-shell (complement)

## Source

https://sdframe.caldis.me/frameworks/reactive-extensions
