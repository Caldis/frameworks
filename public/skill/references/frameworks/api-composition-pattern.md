# API Composition Pattern / API 组合模式

- **Category**: api
- **Complexity**: intermediate
- **Quality**: performance, scalability, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Chris Richardson, 2014
- **Adopters**: Amazon, Netflix, Uber, Airbnb, LinkedIn

Aggregating multiple microservice APIs into a unified interface to fulfill client queries without requiring cross-service joins on the client side

_将多个微服务 API 聚合为统一接口，让客户端无需进行跨服务联结即可满足查询需求_

## When to Use

Apply this framework when:
- When a client UI screen needs to display data owned by multiple microservices (e.g., an order detail page that joins order, customer, inventory, and payment data)
- When the alternative — having the client make multiple sequential API calls — creates unacceptable latency due to the number of round-trips and network overhead
- When a mobile or web client has limited processing power or bandwidth and benefits from server-side aggregation that reduces payload size and number of requests
- When implementing a Backend for Frontend (BFF) layer that tailors the API surface to specific client types (mobile, web, partner)

## When NOT to Use

Stop and reconsider if:
- When the data needed for a client request lives in a single service — composition adds unnecessary infrastructure and latency overhead
- When the query requires write operations across multiple services — use the Saga pattern for distributed transaction coordination instead
- When all consuming clients are internal services that can tolerate multiple service calls — composition is primarily valuable for external clients with constrained network bandwidth or processing capacity
- When the services being composed have fundamentally incompatible SLAs — composing a 99.9% service with a 99% service yields a composite SLA of approximately 98.9%, which may be unacceptable

## Core Concepts

- Fan-Out/Fan-In: The composer fans out a single client request into multiple parallel sub-requests to individual microservices, then fans in by merging all sub-responses into a single unified response
- Partial Failure Tolerance: Designing the composite response to degrade gracefully when a sub-service is unavailable — returning cached, null, or indicator values rather than propagating the error to the entire response
- Data Join on Shared Keys: Combining data from multiple services using shared domain identifiers (order_id, customer_id) to produce a denormalized view that would require a database join in a monolithic architecture
- Timeout Budget: The composite operation must complete within a wall-clock timeout that accounts for the slowest sub-request; implementing per-sub-request timeouts prevents a single slow service from blocking the entire composition
- Idempotent Sub-Requests: Sub-requests should be read-only (GET operations) when possible; if writes are required as part of composition, the Saga pattern must be used to coordinate distributed transactions safely

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying API Composition Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify the client query that requires data from multiple microservices and cannot be efficiently fulfilled by a single service without introducing tight coupling between services
2. Implement a Composer service (or API Gateway policy) that accepts the client request, fans out parallel sub-requests to the involved microservices, and waits for all responses with a defined timeout
3. **Merge and transform the responses**: join data on shared identifiers, filter fields to match the client's required schema, apply business rules (e.g., aggregate totals, derive computed fields), and produce a unified response
4. **Handle partial failures**: define a fallback strategy for each sub-request (return cached data, return null, return an error indicator in the response) so a single service outage does not void the entire composite response
5. **Optimize for performance**: parallelize independent sub-requests, cache sub-responses where freshness allows, and expose the composite endpoint through the API gateway with response caching and rate limiting

<details><summary>中文步骤</summary>

1. 识别需要来自多个微服务数据的客户端查询，该查询无法由单个服务高效满足，否则会引入服务间的紧密耦合
2. 实现一个组合器服务（或 API 网关策略），接收客户端请求，向涉及的微服务并行发出子请求，并在定义的超时时间内等待所有响应
3. 合并和转换响应：通过共享标识符联结数据、过滤字段以匹配客户端所需模式、应用业务规则（如聚合总计、推导计算字段），并生成统一响应
4. 处理部分失败：为每个子请求定义回退策略（返回缓存数据、返回 null、在响应中返回错误指示器），使单个服务中断不会使整个组合响应失效
5. 优化性能：并行化独立子请求，在允许新鲜度的地方缓存子响应，并通过 API 网关将组合端点暴露给外部，配置响应缓存和速率限制

</details>

## Do

- Do parallelize all independent sub-requests — sequential composition multiplies latency and defeats the purpose of aggregation; use async/await or Promise.all patterns to execute concurrent sub-requests
- Do define a per-sub-request timeout that is shorter than the composite timeout so a slow downstream service is cut off before it causes the entire composition to time out
- Do version the composite API independently from individual microservice APIs — internal service changes should not require clients to update their composite endpoint calls
- Do cache sub-responses for reference data (product catalog, user profiles) that does not change per-request, reducing downstream service load on frequently composed queries

## Don't

- Don't use API Composition for write operations that must be atomic across services — use the Saga pattern with compensating transactions for distributed write coordination
- Don't compose more than 5-7 sub-services in a single composite request — deep fan-out increases latency variance, failure probability, and debugging complexity
- Don't expose the composer's internal service topology to clients through error messages — return client-friendly error codes and log internal sub-request failures separately
- Don't implement composition logic in the client — server-side composition keeps the network topology private, reduces client complexity, and allows the composition strategy to evolve without client changes

## Case Study

**Amazon**: Amazon's product detail page is the canonical example of API Composition at scale. Displaying a single product page requires aggregating data from dozens of internal microservices: product catalog, pricing engine, inventory, review service, recommendation engine, seller profile, and fulfillment estimates. Amazon's internal framework composes these in parallel, with each sub-service returning its section of the page independently. Services that fail or exceed their timeout budget return a placeholder or cached value rather than breaking the page. This approach allows Amazon to deploy over 1,000 distinct microservices that each evolve independently while composing seamlessly into the product detail experience that serves billions of page views daily.

## Related Frameworks

- api-gateway-pattern (complement)
- bff-pattern (complement)
- saga-pattern (related)

## Source

https://sdframe.caldis.me/frameworks/api-composition-pattern
