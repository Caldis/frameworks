# Edge Computing API Patterns / 边缘计算API模式

- **Category**: api
- **Complexity**: advanced
- **Quality**: performance, scalability, reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Cloudflare Workers (2017), AWS Lambda@Edge (2017), Fastly Compute@Edge (2019), 2009
- **Adopters**: Cloudflare, Vercel, Netlify, Shopify, Discord

CDN-edge function design for low-latency API responses and global distribution

_用于低延迟API响应和全球分发的CDN边缘函数设计_

## When to Use

Apply this framework when:
- When global users experience high latency because all API traffic routes to a single geographic origin region
- When authentication, authorization, or request transformation logic can be executed at the CDN edge to reduce load and latency on origin servers
- When building personalization, geolocation routing, or A/B testing that must happen before the response is served without adding a round-trip to the origin
- When AI inference at the edge (small models, embeddings) can answer requests without incurring cross-continent latency to a centralized GPU cluster

## When NOT to Use

Stop and reconsider if:
- APIs that perform complex database transactions or strong-consistency operations that cannot tolerate the eventual-consistency model of edge KV stores
- Compute-intensive workloads (video transcoding, ML model training) that require more CPU and memory than edge runtime limits allow
- APIs that must comply with data residency regulations requiring all data processing to occur in specific geographic regions
- Internal microservice-to-microservice APIs that run within a single data center where network latency is already sub-millisecond

## Core Concepts

- Edge Functions: Lightweight serverless functions deployed to CDN Points of Presence (PoPs) that execute within single-digit milliseconds of the user, before traffic reaches the origin
- Edge Caching: Storing API responses at CDN edge nodes with Cache-Control and Surrogate-Control headers to serve repeat requests from cache rather than forwarding to the origin
- Edge KV Stores: Eventually-consistent key-value stores co-located with edge functions (Cloudflare KV, AWS DynamoDB Global Tables) for low-latency reads of configuration, feature flags, and session data
- Request Routing at the Edge: Using edge functions to implement URL rewrites, A/B testing, geographic routing, and canary deployments without deploying changes to the origin
- Cold Start Elimination: CDN edge runtimes (Cloudflare Workers, Fastly Compute) use V8 isolates or Wasm rather than containers, eliminating cold start latency that characterizes traditional serverless functions

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Edge Computing API Patterns to?
- What constraints or existing architecture do you need to work within?
- Has your team used Edge Computing API Patterns before? (This is an advanced framework)

## Implementation Steps

1. Identify which API handlers are stateless, read-heavy, or geographically latency-sensitive and are candidates for edge deployment (auth token validation, personalization headers, A/B routing, geolocation-based redirects)
2. Deploy edge functions on a CDN edge platform (Cloudflare Workers, AWS Lambda@Edge, Fastly Compute) that executes JavaScript or Wasm close to the user
3. **Use edge-cacheable response patterns**: set appropriate Cache-Control headers, use stale-while-revalidate for non-critical freshness, and vary the cache key on headers like Accept-Language or CF-IPCountry
4. For dynamic data at the edge, use edge KV stores (Cloudflare KV, Durable Objects) for low-latency reads with eventual consistency, reserving strong-consistency writes for origin servers
5. **Implement edge observability**: collect structured logs at the edge, forward traces with injected trace IDs to the origin, and monitor edge cache hit rates and p99 latencies per edge PoP

<details><summary>中文步骤</summary>

1. 识别哪些API处理程序是无状态的、读密集型的或地理位置上对延迟敏感的，是边缘部署的候选（认证令牌验证、个性化头、A/B路由、基于地理位置的重定向）
2. 在CDN边缘平台（Cloudflare Workers、AWS Lambda@Edge、Fastly Compute）上部署边缘函数，在靠近用户的地方执行JavaScript或Wasm
3. 使用边缘可缓存响应模式：设置适当的Cache-Control头，为非关键新鲜度使用stale-while-revalidate，并在Accept-Language或CF-IPCountry等头上变化缓存键
4. 对于边缘的动态数据，使用边缘KV存储（Cloudflare KV、Durable Objects）进行低延迟读取和最终一致性，将强一致性写操作保留给源服务器
5. 实现边缘可观测性：在边缘收集结构化日志，将带有注入追踪ID的追踪转发到源，并监控每个边缘PoP的边缘缓存命中率和p99延迟

</details>

## Do

- Do keep edge functions small and stateless because edge runtimes have strict CPU time, memory, and bundle size limits that don't apply to origin servers
- Do use edge KV stores for read-heavy configuration data (feature flags, rate limit rules, geo-routing tables) because they provide sub-millisecond reads without origin round-trips
- Do propagate trace IDs from edge to origin so that full request traces span both edge and origin processing in your distributed tracing system
- Do monitor cache hit rates per edge PoP because a low cache hit rate at the edge means most traffic still reaches the origin, negating the latency benefit

## Don't

- Don't put stateful or strongly-consistent operations (database writes, payment processing) in edge functions because edge KV stores are eventually consistent and edge-to-DB latency can exceed origin latency
- Don't deploy untested logic to edge functions in production without a gradual rollout because a faulty edge function breaks every user globally, not just in one region
- Don't ignore bundle size limits for edge functions because large dependency trees will exceed the edge runtime limits and fail silently at deploy time
- Don't use edge functions as a shortcut to avoid fixing origin latency because edge caching only helps for cacheable responses — non-cacheable dynamic APIs still hit the origin

## Case Study

**Cloudflare**: Cloudflare built its own API gateway and developer platform (Cloudflare Workers, Pages, D1, KV) entirely on its edge network. Cloudflare's API itself uses edge functions for authentication, rate limiting, and routing — all executed within milliseconds of the user across 300+ PoPs worldwide. A benchmark published in 2023 showed that Cloudflare Workers API responses averaged 8ms globally vs. 120ms for equivalent AWS Lambda (us-east-1) responses for users in Asia-Pacific, demonstrating the latency advantage of edge-first API design. The platform serves over 50 million requests per second from the edge with no origin involved.

## Related Frameworks

- api-gateway-pattern (extends)
- api-first-design (complement)

## Source

https://sdframe.caldis.me/frameworks/edge-computing-api-patterns
