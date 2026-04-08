# Strategy Pattern / 策略模式

- **Category**: coding
- **Complexity**: intermediate
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Gamma, Helm, Johnson, Vlissides, 1994
- **Adopters**: Netflix, Spring Framework, Java Collections (Comparator), scikit-learn

Encapsulate interchangeable algorithms behind a common interface

_将可互换的算法封装在统一接口后，使算法可独立于使用方变化_

## When to Use

Apply this framework when:
- Multiple variants of an algorithm exist and you want to switch between them at runtime without conditionals
- You need to isolate business rules or policies so they can be tested and replaced independently
- An AI agent needs to select different planning, search, or scoring strategies dynamically

## When NOT to Use

Stop and reconsider if:
- When there is truly only one algorithm and no realistic chance of needing to swap it
- Simple scripts or small utilities where the overhead of interface + multiple classes is disproportionate
- When a language supports first-class functions, a plain function parameter is often cleaner than a Strategy class

## Core Concepts

- Strategy interface: the contract that all algorithm variants implement, enabling polymorphic substitution
- Context: the object that holds a strategy reference and delegates the variable part of its behavior to it
- Composition over inheritance: behavior varies by swapping whole objects rather than by subclassing Context

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Strategy Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define the Strategy interface**: declare a single method (or small set) that all algorithm variants must implement, establishing the contract
2. **Implement Concrete Strategies**: create one class per algorithm variant, each encapsulating its logic behind the shared interface
3. **Build the Context class**: hold a reference to a Strategy interface and delegate the algorithm call to it, keeping Context free of conditional logic
4. **Inject or swap strategies at runtime**: pass the desired strategy via constructor or setter so callers can change behavior without modifying Context
5. **Test strategies independently**: unit-test each concrete strategy in isolation, then test Context with mock strategies to verify delegation

<details><summary>中文步骤</summary>

1. 定义策略接口：声明所有算法变体必须实现的单一方法（或小型方法集），建立契约
2. 实现具体策略：为每种算法变体创建一个类，各自将逻辑封装在共享接口后
3. 构建上下文类：持有策略接口的引用，并将算法调用委托给它，使上下文不含条件判断逻辑
4. 在运行时注入或切换策略：通过构造函数或 setter 传入所需策略，调用方无需修改上下文即可改变行为
5. 独立测试各策略：对每个具体策略进行单元测试，再用模拟策略测试上下文以验证委托行为

</details>

## Do

- Do keep the strategy interface small and focused so each variant is easy to implement and test
- Do inject strategies via constructors to make dependencies explicit and enable straightforward unit testing
- Do use Strategy whenever you find yourself writing if-else or switch on a type enum to pick an algorithm

## Don't

- Don't use Strategy for a single algorithm with no anticipated variation because the indirection adds complexity without benefit
- Don't allow strategies to reach into the Context's internals because it creates hidden coupling between the two
- Don't create a new Strategy subclass for trivial one-line variants in languages with lambdas — pass a function instead

## Case Study

**Netflix**: Netflix's streaming playback engine uses the Strategy pattern to select adaptive bitrate (ABR) algorithms. Different strategies (buffer-based, throughput-based, reinforcement-learning-based) implement a common ABR interface. The playback Context selects the appropriate strategy based on device type and network conditions at runtime, allowing Netflix to A/B test new algorithms without touching the core player code.

## Related Frameworks

- solid-principles (complement)
- command-pattern (related)
- dependency-injection (complement)

## Source

https://sdframe.caldis.me/frameworks/strategy-pattern
