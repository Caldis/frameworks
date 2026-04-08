# API Rate Limiting & Throttling / API限流与节流

- **Category**: api
- **Complexity**: intermediate
- **Quality**: reliability, scalability, security
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Web infrastructure community; formalized in IETF RFC 6585 (2012, HTTP 429 status code), 2008
- **Adopters**: GitHub, Twitter, Stripe, OpenAI, Cloudflare

Protect APIs from overuse by controlling request rates per client

_通过控制每个客户端的请求速率来保护API免遭过度使用_

## When to Use

Apply this framework when:
- When a public API must protect backend services from abuse, DDoS attacks, and runaway client scripts
- When different client tiers (free, premium, enterprise) need different usage quotas to align with business models
- When shared infrastructure serves multiple tenants and fair resource allocation must be enforced
- When costly downstream operations (database queries, third-party API calls) need protection from traffic spikes

## When NOT to Use

Stop and reconsider if:
- Internal service-to-service communication within a trusted network where circuit breakers and backpressure are more appropriate
- Batch processing pipelines where requests are already controlled by the job scheduler
- Real-time streaming APIs (WebSocket, SSE) where connection-based limits are more relevant than request-based limits
- Early-stage internal APIs with a handful of known consumers where rate limiting adds unnecessary operational complexity

## Core Concepts

- Token Bucket Algorithm: Tokens are added at a fixed rate; each request consumes a token. Allows bursts up to bucket capacity while enforcing average rate over time
- Sliding Window Log: Tracks timestamps of each request in a rolling time window, providing precise rate calculation but with higher memory usage
- Fixed Window Counter: Counts requests in discrete time windows (e.g., per minute). Simple but susceptible to burst-at-boundary edge cases
- Distributed Rate Limiting: Rate counters stored in Redis or similar shared stores ensure consistent enforcement across multiple API server instances
- Quota Headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, and Retry-After headers communicate rate limit status transparently to consumers

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying API Rate Limiting & Throttling to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define rate limit policies based on business tiers: identify limits per API key, user, IP, or organization with different quotas for free and paid plans
2. Choose a rate limiting algorithm appropriate for your use case: token bucket for burst tolerance, sliding window for smooth enforcement, or fixed window for simplicity
3. Implement the rate limiter using a distributed counter store (Redis, Memcached) that tracks request counts with TTL-based expiration
4. Return standard HTTP 429 (Too Many Requests) responses with Retry-After, X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset headers
5. Monitor rate limit metrics, alert on unusual patterns (abuse, DDoS), and provide a self-service dashboard for consumers to track their usage

<details><summary>中文步骤</summary>

1. 基于业务层级定义限流策略：按API密钥、用户、IP或组织识别限制，为免费和付费计划设置不同配额
2. 选择适合用例的限流算法：令牌桶用于突发容忍、滑动窗口用于平滑执行、固定窗口用于简单场景
3. 使用分布式计数存储（Redis、Memcached）实现限流器，通过TTL过期来跟踪请求计数
4. 返回标准HTTP 429（请求过多）响应，包含Retry-After、X-RateLimit-Limit、X-RateLimit-Remaining和X-RateLimit-Reset头部
5. 监控限流指标，对异常模式（滥用、DDoS）告警，并为消费者提供自助仪表板以跟踪使用量

</details>

## Do

- Do return informative 429 responses with Retry-After and rate limit headers because clients need to implement backoff logic based on concrete values
- Do apply rate limits at the API gateway level because it protects all downstream services uniformly without per-service implementation
- Do differentiate rate limits by client tier and endpoint because not all APIs have the same cost and not all clients have the same entitlement
- Do use sliding window or token bucket algorithms for production because fixed window counters allow boundary-burst abuse

## Don't

- Don't return generic 500 or 503 errors when rate limiting because clients cannot distinguish server errors from quota exhaustion
- Don't implement rate limiting only on individual servers without a shared counter because clients will get inconsistent limits across instances
- Don't set rate limits without monitoring and alerting because undetected abuse will degrade service for legitimate users
- Don't apply the same rate limit to all endpoints because expensive operations (search, analytics) should have lower limits than lightweight ones (health check)

## Case Study

**GitHub**: GitHub's REST API enforces a rate limit of 5,000 requests per hour for authenticated users and 60 per hour for unauthenticated requests. Every response includes X-RateLimit-Limit, X-RateLimit-Remaining, and X-RateLimit-Reset headers. For their GraphQL API, GitHub uses a point-based system where each query costs points proportional to its complexity. This tiered approach protects GitHub's infrastructure while allowing legitimate automation tools to operate within generous limits, and the transparent headers enable clients to self-throttle before hitting limits.

## Related Frameworks

- api-gateway-pattern (complement)
- webhook-pattern (complement)
- openapi-specification (complement)

## Source

https://sdframe.caldis.me/frameworks/api-rate-limiting-throttling
