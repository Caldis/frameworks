# API Gateway Pattern / API网关模式

- **Category**: api
- **Complexity**: intermediate
- **Quality**: scalability, security, maintainability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Microservices community, formalized by Chris Richardson (~2015), 2013
- **Adopters**: Netflix, Amazon, Uber, Alibaba, Stripe

Single entry point that routes, aggregates, and secures microservices APIs

_作为微服务API的单一入口点，负责路由、聚合和安全防护_

## When to Use

Apply this framework when:
- When a microservices architecture needs a unified entry point to decouple clients from internal service topology
- When cross-cutting concerns like authentication, logging, and rate limiting should be centralized rather than duplicated in each service
- When clients need aggregated responses from multiple backend services in a single API call
- When internal services use different protocols (gRPC, AMQP) and clients need a consistent HTTP/REST interface

## When NOT to Use

Stop and reconsider if:
- Monolithic applications with a single backend where a gateway adds unnecessary latency and operational overhead
- Simple service-to-service communication where a service mesh (Istio, Linkerd) handles routing and resilience at the infrastructure layer
- Extremely latency-sensitive paths where even a single additional network hop is unacceptable
- Small teams with fewer than five services where the operational cost of maintaining a gateway exceeds its benefits

## Core Concepts

- Reverse Proxy: The gateway acts as a reverse proxy, hiding the internal service topology and providing a stable external API surface
- Request Routing: Incoming requests are routed to the appropriate backend service based on URL paths, headers, or query parameters
- Cross-Cutting Concerns: Authentication, authorization, rate limiting, logging, and CORS are handled once at the gateway instead of in each service
- Response Aggregation: The gateway can fan out a single client request to multiple services and compose their responses into one payload
- Protocol Translation: The gateway translates between external protocols (HTTP/REST) and internal protocols (gRPC, WebSocket, message queues)

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying API Gateway Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Identify all client types and their API consumption patterns, then define the gateway's routing table mapping external paths to internal services
2. Implement cross-cutting concerns at the gateway layer: authentication, rate limiting, request/response transformation, and TLS termination
3. Configure request routing and load balancing rules, including path-based routing, header-based routing, and service discovery integration
4. Add response aggregation for composite endpoints that combine data from multiple backend services into a single client response
5. Set up monitoring, circuit breakers, and fallback responses at the gateway to prevent cascading failures from backend service outages

<details><summary>中文步骤</summary>

1. 识别所有客户端类型及其API消费模式，然后定义网关的路由表，将外部路径映射到内部服务
2. 在网关层实现横切关注点：认证、限流、请求/响应转换和TLS终止
3. 配置请求路由和负载均衡规则，包括基于路径的路由、基于头部的路由和服务发现集成
4. 为组合端点添加响应聚合，将多个后端服务的数据合并为单个客户端响应
5. 在网关设置监控、熔断器和降级响应，防止后端服务故障引发级联失败

</details>

## Do

- Do keep the gateway stateless and thin because a fat gateway with business logic becomes a distributed monolith
- Do implement circuit breakers at the gateway level because backend service failures should degrade gracefully rather than cascading to all clients
- Do use declarative configuration for routing rules because imperative gateway logic is hard to audit, test, and version
- Do deploy the gateway with high availability and auto-scaling because it is a single point of failure for all API traffic

## Don't

- Don't put business logic in the gateway because it creates tight coupling and turns the gateway into a distributed monolith
- Don't use a single gateway for all client types when they have vastly different needs — consider BFF pattern instead
- Don't skip monitoring gateway latency because the gateway adds a network hop and any performance degradation affects every request
- Don't hardcode service URLs in the gateway because it defeats the purpose of service discovery and dynamic routing

## Case Study

**Netflix**: Netflix built Zuul as its API gateway to handle over 50 billion API requests per day across its streaming platform. Zuul provides dynamic routing, monitoring, resiliency, and security for over 1,000 backend microservices. By centralizing authentication, rate limiting, and canary routing at the gateway layer, Netflix reduced per-service boilerplate by thousands of lines of code and gained the ability to perform zero-downtime traffic shifts during deployments.

## Related Frameworks

- bff-pattern (complement)
- api-rate-limiting-throttling (complement)
- graphql-schema-design (complement)

## Source

https://sdframe.caldis.me/frameworks/api-gateway-pattern
