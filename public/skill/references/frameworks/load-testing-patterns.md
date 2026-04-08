# Load Testing Patterns / 负载测试模式

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: reliability, performance
- **Abstraction**: system
- **Maturity**: established
- **Author**: Michael Nygard, 2007
- **Adopters**: Amazon, Google, Netflix, Uber, Cloudflare

Stress, spike, soak testing methodologies to validate system behavior under varying load conditions

_压力测试、尖峰测试、浸泡测试方法论，验证系统在不同负载条件下的行为_

## When to Use

Apply this framework when:
- Before major launches or marketing events that will significantly increase traffic volume
- After architectural changes like database migrations, service splits, or infrastructure moves
- When establishing SLAs or SLOs that require empirical evidence of system capacity
- During capacity planning to determine scaling limits and cost projections for growth

## When NOT to Use

Stop and reconsider if:
- Internal tools with a small, predictable user base where load is never a realistic concern
- Early MVPs where functional correctness is the primary risk and performance optimization is premature
- Batch processing systems with fixed workloads where throughput is inherently bounded and predictable

## Core Concepts

- Stress Testing: Gradually increasing load beyond normal capacity to find the system's breaking point and failure modes
- Spike Testing: Applying sudden, extreme load increases to test auto-scaling, queuing, and graceful degradation under bursts
- Soak Testing: Running sustained load for extended periods to detect memory leaks, connection pool exhaustion, and resource degradation
- Baseline Profile: The established normal performance characteristics (latency, throughput, error rate) used as comparison benchmarks
- Think Time: Realistic pauses between user actions in test scripts that prevent artificial concurrency inflation

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Load Testing Patterns to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Define performance baselines**: establish normal traffic patterns, acceptable response times, throughput targets, and error rate thresholds
2. **Design load test scenarios**: create stress tests (gradual ramp to breaking point), spike tests (sudden traffic surges), and soak tests (sustained load over hours)
3. **Build realistic test scripts**: use production traffic patterns, representative data sets, and proper think times to avoid artificial load profiles
4. Execute tests in a production-like environment: match infrastructure, data volume, and network topology to avoid misleading results
5. Analyze results and establish regression gates: compare against baselines, identify bottlenecks, and integrate performance thresholds into CI/CD

<details><summary>中文步骤</summary>

1. 定义性能基线：建立正常流量模式、可接受的响应时间、吞吐量目标和错误率阈值
2. 设计负载测试场景：创建压力测试（逐步增加到断裂点）、尖峰测试（突然流量激增）和浸泡测试（持续数小时的负载）
3. 构建真实的测试脚本：使用生产流量模式、代表性数据集和适当的思考时间，避免人为的负载配置
4. 在类生产环境中执行测试：匹配基础设施、数据量和网络拓扑以避免误导性结果
5. 分析结果并建立回归门禁：与基线比较、识别瓶颈，并将性能阈值集成到CI/CD中

</details>

## Do

- Do use production-like data volumes because testing against empty databases produces dangerously optimistic results
- Do include think times in test scripts because removing them creates unrealistic concurrency that masks true capacity
- Do test individual services in isolation and the full system together because bottlenecks shift depending on the scope
- Do run soak tests for at least 4-8 hours because memory leaks and connection pool issues often take hours to manifest

## Don't

- Don't run load tests against production without circuit breakers because uncontrolled load can cause real outages
- Don't assume linear scaling because most systems hit non-linear bottlenecks at specific concurrency thresholds
- Don't test only happy paths because error handling under load often consumes more resources than normal operations
- Don't ignore client-side metrics because server response times alone miss network latency and rendering bottlenecks

## Case Study

**Amazon**: Amazon runs comprehensive load testing before every Prime Day using a combination of stress, spike, and soak tests across their entire microservice fleet. In preparation for Prime Day 2022, they simulated traffic 3x above projected peak, discovering that their recommendation service's connection pool configuration would exhaust under sustained spike load. Fixing this pre-production issue prevented an estimated $12M in lost revenue from degraded product recommendations during the actual event.

## Related Frameworks

- chaos-engineering (complement)
- sli-slo-sla (complement)
- circuit-breaker-pattern (complement)

## Source

https://sdframe.caldis.me/frameworks/load-testing-patterns
