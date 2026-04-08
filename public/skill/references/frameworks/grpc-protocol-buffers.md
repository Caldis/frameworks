# gRPC & Protocol Buffers / gRPC与Protocol Buffers

- **Category**: api
- **Complexity**: intermediate
- **Quality**: performance, scalability, maintainability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Google, 2015 (built on internal Stubby RPC framework), 2001
- **Adopters**: Google, Netflix, Square, Cisco, CoreOS

High-performance RPC framework using HTTP/2 and binary serialization

_基于HTTP/2和二进制序列化的高性能RPC框架_

## When to Use

Apply this framework when:
- When low-latency, high-throughput inter-service communication is critical in a microservices architecture
- When services are built in multiple programming languages and need a shared contract with code generation
- When bidirectional streaming is required for real-time data flows between client and server
- When payload size and bandwidth efficiency matter, such as mobile clients on constrained networks

## When NOT to Use

Stop and reconsider if:
- Public developer-facing APIs where ease of testing with curl and browser tools is a priority
- Simple request-response services where the overhead of proto compilation and code generation is unjustified
- Environments where firewall or proxy infrastructure does not support HTTP/2
- Teams without polyglot service needs, where REST with OpenAPI provides sufficient contract enforcement

## Core Concepts

- Protocol Buffers: A language-neutral, platform-neutral binary serialization format that is 3-10x smaller and faster than JSON
- HTTP/2 Transport: Multiplexed streams over a single TCP connection with header compression, enabling concurrent RPCs without head-of-line blocking
- Code Generation: The protoc compiler generates type-safe client stubs and server interfaces from .proto files, eliminating manual serialization code
- Streaming Modes: Four communication patterns — unary, server streaming, client streaming, and bidirectional streaming — cover all real-time use cases
- Deadlines and Cancellation: Built-in propagation of timeouts and cancellation signals across the entire call chain prevents resource leaks in distributed systems

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying gRPC & Protocol Buffers to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Define service contracts and message types in .proto files using Protocol Buffer IDL (Interface Definition Language)
2. Generate client and server stubs from .proto files using the protoc compiler for your target languages
3. Implement the server-side service logic by overriding the generated stub methods with business logic
4. Configure gRPC channels with appropriate load balancing, TLS, and deadline/timeout policies
5. Deploy and monitor the service using gRPC health checking protocol and observability interceptors for tracing and metrics

<details><summary>中文步骤</summary>

1. 使用Protocol Buffer IDL（接口定义语言）在.proto文件中定义服务契约和消息类型
2. 使用protoc编译器为目标语言从.proto文件生成客户端和服务端存根
3. 通过在生成的存根方法中实现业务逻辑来完成服务端逻辑
4. 配置gRPC通道，设置适当的负载均衡、TLS以及截止时间/超时策略
5. 使用gRPC健康检查协议和可观测性拦截器（追踪与指标）部署并监控服务

</details>

## Do

- Do use proto3 syntax and follow the Protocol Buffer style guide because consistent naming and conventions simplify cross-team collaboration
- Do set explicit deadlines on every RPC call because missing deadlines cause cascading timeouts across the entire service mesh
- Do version .proto files carefully using reserved fields and field number preservation because binary compatibility depends on stable field numbers
- Do implement gRPC interceptors for cross-cutting concerns (auth, logging, tracing) because they provide a clean middleware pattern

## Don't

- Don't expose gRPC directly to browser clients without a proxy because browsers cannot natively speak HTTP/2 trailers required by gRPC
- Don't use gRPC for public-facing APIs where developer ergonomics and curl-testability matter because JSON/REST is far more accessible
- Don't ignore backward compatibility when evolving .proto files because removing or renumbering fields breaks all existing clients
- Don't skip implementing health checks because orchestrators like Kubernetes depend on them for readiness and liveness probes

## Case Study

**Netflix**: Netflix migrated its inter-service communication from REST/JSON to gRPC in 2019 to reduce latency in its microservices architecture of over 700 services. The binary serialization of Protocol Buffers reduced payload sizes by approximately 60%, and HTTP/2 multiplexing eliminated the connection overhead that had plagued their REST-based service mesh. Netflix reported a 30-40% reduction in inter-service latency and significant CPU savings from avoiding JSON parsing at scale.

## Related Frameworks

- api-gateway-pattern (complement)
- consumer-driven-contracts (complement)
- asyncapi (related)

## Source

https://sdframe.caldis.me/frameworks/grpc-protocol-buffers
