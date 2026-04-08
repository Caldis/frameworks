# Continuous Profiling / 持续性能分析

- **Category**: observability
- **Complexity**: advanced
- **Quality**: performance, reliability, maintainability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Brendan Gregg (flamegraph inventor, 2011); Go pprof (Google, 2012); Pyroscope (2020)
- **Adopters**: Shopify, Google, Datadog, Grafana Labs, Cloudflare

Always-on production profiling using pprof, Pyroscope, and Datadog Continuous Profiler

_使用pprof、Pyroscope和Datadog持续性能分析器进行始终开启的生产性能分析_

## When to Use

Apply this framework when:
- When distributed traces show high latency but don't point to a specific external call — the bottleneck is CPU-bound computation within a service rather than downstream I/O
- When infrastructure costs are rising unexpectedly and the team needs to identify which functions are consuming the most CPU or memory across the fleet
- When a performance regression is suspected after a deployment but APM metrics and logs don't provide sufficient resolution to identify the changed code path
- When optimizing ML inference or data processing pipelines where function-level CPU profiling can identify the top-5 hot paths that dominate runtime

## When NOT to Use

Stop and reconsider if:
- Serverless functions with execution durations under 100ms where profiling overhead per invocation exceeds the function's runtime
- Services with fewer than 5 RPS where sampling profilers produce too few samples to generate statistically meaningful flamegraphs
- Organizations that have not yet established basic metrics and tracing observability, where profiling would address symptoms before identifying the root cause signals
- Early-stage prototypes where the code is rewritten frequently and profile data becomes stale before engineers can act on it

## Core Concepts

- Flamegraph: A visualization of stack traces where the x-axis represents the total time spent in a function (width) and the y-axis represents the call stack depth; the widest frames are the biggest performance contributors
- Sampling Profiler: Interrupts the process at a fixed frequency (e.g., 100Hz), captures the current call stack, and aggregates samples over time; produces statistically accurate profiles with minimal overhead (~1-5%)
- Instrumentation Profiler: Injects timing code into every function call; produces exact measurements but incurs significant overhead (10-100x slowdown) that makes it unsuitable for production use
- Differential Flamegraph: A comparison of two flamegraphs (before vs. after a deployment) where blue frames represent performance improvements and red frames represent regressions
- Always-On Profiling: Unlike traditional profiling triggered during incidents, continuous profiling collects profiles at all times so that data is available retrospectively when investigating an issue

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Continuous Profiling to?
- What constraints or existing architecture do you need to work within?
- Has your team used Continuous Profiling before? (This is an advanced framework)

## Implementation Steps

1. Select a continuous profiling platform compatible with your language runtime: pprof for Go/C++, async-profiler for JVM, py-spy for Python, perf for native code, or a managed service (Pyroscope, Datadog Continuous Profiler, Grafana Phlare)
2. Instrument the application with a low-overhead sampling profiler (typically 1-10% CPU overhead) using sampling rates of 100Hz or lower so that profiling data can be collected continuously in production without significant performance impact
3. Attach profile metadata (service name, version, environment, region, pod ID) to each profile so that flamegraphs can be filtered and compared across deployments, versions, and infrastructure dimensions
4. Integrate profile data with your existing observability stack: correlate high-latency traces with CPU profiles collected at the same time window, and link profiling dashboards from your APM tool
5. Use differential flamegraph comparison between two time windows or versions to identify performance regressions introduced by recent deployments

<details><summary>中文步骤</summary>

1. 选择与您的语言运行时兼容的持续性能分析平台：Go/C++使用pprof，JVM使用async-profiler，Python使用py-spy，原生代码使用perf，或使用托管服务（Pyroscope、Datadog持续性能分析器、Grafana Phlare）
2. 使用低开销采样性能分析器（通常1-10%的CPU开销）对应用程序进行仪器化，使用100Hz或更低的采样率，以便可以在生产中持续收集性能分析数据而不产生显著性能影响
3. 将配置文件元数据（服务名称、版本、环境、区域、Pod ID）附加到每个配置文件，以便可以跨部署、版本和基础设施维度过滤和比较火焰图
4. 将配置文件数据与现有可观测性栈集成：将高延迟追踪与同一时间窗口收集的CPU配置文件关联，并从APM工具链接性能分析仪表板
5. 使用两个时间窗口或版本之间的差分火焰图比较，以识别最近部署引入的性能回归

</details>

## Do

- Do attach deployment metadata (version, commit SHA, environment) to profiles so that differential flamegraphs can immediately isolate the code change responsible for a regression
- Do correlate profiles with traces by linking high-latency trace spans to CPU profiles collected in the same time window using trace ID as the correlation key
- Do store profiles with sufficient retention (30+ days) to enable retrospective investigation of production incidents without requiring a live reproduction
- Do review profiling data during capacity planning cycles to identify optimization opportunities that can defer infrastructure scaling

## Don't

- Don't use instrumentation profilers (full function tracing) in production because the overhead will cause the profiler to become the primary performance bottleneck
- Don't profile only during incidents because you need historical baselines to understand what 'normal' looks like for meaningful comparison
- Don't discard profiling data after 7 days because performance regressions are often not noticed until weeks after a deployment when the cumulative cost becomes visible
- Don't treat profiling as a reactive tool used only by performance engineers — instrument all production services by default and democratize access to flamegraphs for all engineers

## Case Study

**Shopify**: Shopify deployed continuous profiling across its Ruby on Rails monolith using Datadog Continuous Profiler, attaching profile data to every deployment event. After a Black Friday traffic spike caused unexpected CPU saturation, engineers used differential flamegraphs to compare profiles from the week before and after the previous major release. The analysis revealed that a seemingly innocuous change to the cart serialization logic had increased CPU usage by 18% due to a missing memoization. The fix was deployed within 4 hours of identifying the flamegraph regression. Without always-on profiling, the investigation would have required reproducing the issue in a load test environment, which Shopify estimated would take 2-3 days.

## Related Frameworks

- distributed-tracing (complement)
- opentelemetry (complement)
- slo-as-practice (complement)

## Source

https://sdframe.caldis.me/frameworks/continuous-profiling
