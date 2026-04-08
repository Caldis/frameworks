# USE Method / USE 方法

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: observability, performance
- **Abstraction**: system
- **Maturity**: established
- **Author**: Brendan Gregg, 2012
- **Adopters**: Netflix, Facebook, LinkedIn, Joyent, Cloudflare

Check Utilization, Saturation, Errors for every resource

_对每项资源检查利用率、饱和度和错误率_

## When to Use

Apply this framework when:
- Diagnosing performance problems when you do not know where the bottleneck is
- Capacity planning to identify which resources are approaching saturation
- Setting up monitoring dashboards for infrastructure and server resources
- Post-incident analysis to systematically identify the root cause of resource-related outages

## When NOT to Use

Stop and reconsider if:
- Application-layer request debugging where RED Method provides more relevant signals
- User experience monitoring where latency and error rates matter more than resource utilization
- Serverless architectures where underlying resources are abstracted away from the operator

## Core Concepts

- Utilization: The percentage of time a resource is busy or the proportion of its capacity being used
- Saturation: The extent to which work is queued waiting for a resource, indicating capacity has been exceeded
- Errors: Error events per resource that may indicate hardware degradation or misconfiguration
- Resource List: A comprehensive enumeration of all system resources to ensure nothing is overlooked
- Functional Block Diagram: A visual map of system components and their resources used to guide the USE analysis

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying USE Method to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Enumerate all resources**: list every hardware and software resource (CPU, memory, disk, network, thread pools, connection pools)
2. **For each resource, measure Utilization**: the percentage of time or capacity the resource is actively busy serving work
3. **Measure Saturation**: the degree to which extra work is queued or waiting because the resource is at capacity
4. **Measure Errors**: count error events related to each resource (disk I/O errors, network timeouts, OOM kills, connection refused)
5. **Iterate systematically**: work through the full resource list using USE for each; this methodical sweep avoids overlooking bottlenecks

<details><summary>中文步骤</summary>

1. 枚举所有资源：列出每项硬件和软件资源（CPU、内存、磁盘、网络、线程池、连接池）
2. 对每项资源测量利用率：资源积极忙于服务工作的时间或容量百分比
3. 测量饱和度：因资源达到容量上限而有额外工作排队或等待的程度
4. 测量错误：统计每项资源相关的错误事件（磁盘I/O错误、网络超时、OOM终止、连接拒绝）
5. 系统化迭代：对完整资源列表逐一使用USE方法；这种系统性扫描避免遗漏瓶颈

</details>

## Do

- Do create a complete resource checklist before starting because missing a resource means missing a potential bottleneck
- Do check errors first for each resource because error diagnosis is often the fastest path to finding issues
- Do measure saturation alongside utilization because high utilization alone does not always indicate a problem
- Do use the method iteratively because new resources are added as systems evolve

## Don't

- Don't skip resources because the bottleneck is often in the resource you least suspect
- Don't confuse utilization with saturation because a resource at 90% utilization may have zero saturation
- Don't only look at averages because averages hide spikes and tail latency problems
- Don't apply USE to request-based workloads because the RED Method is better suited for that

## Case Study

**Netflix**: Netflix's performance engineering team adopted the USE Method as their standard approach for diagnosing performance issues across their cloud infrastructure. When a streaming service experienced intermittent latency spikes, systematic USE analysis revealed that network interface saturation on specific instance types was the root cause, not the CPU or memory bottlenecks initially suspected.

## Related Frameworks

- red-method (alternative)
- four-golden-signals (alternative)
- sli-slo-sla (complement)

## Source

https://sdframe.caldis.me/frameworks/use-method
