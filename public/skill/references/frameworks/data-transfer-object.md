# Data Transfer Object (DTO) / 数据传输对象（DTO）

- **Category**: coding
- **Complexity**: beginner
- **Quality**: performance, maintainability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Martin Fowler, "Patterns of Enterprise Application Architecture", 2002, 1998
- **Adopters**: Java EE / Spring Framework, .NET / ASP.NET Core (with AutoMapper), NestJS (TypeScript class-validator DTOs), gRPC (Protobuf message definitions), Django REST Framework (Serializers)

A simple object that carries data between processes or layers, containing no business logic — its sole purpose is to reduce the number of method calls by bundling data into a single transfer unit

_在进程或层之间传递数据的简单对象，不包含任何业务逻辑——其唯一目的是通过将数据打包成单一传输单元来减少方法调用次数_

## When to Use

Apply this framework when:
- When calling remote services or crossing process boundaries where each method call is expensive and batching multiple fields into a single round trip reduces network overhead
- When you need to expose only a subset of a domain model to an API consumer — the DTO acts as a projection that hides sensitive fields, computed properties, and ORM-managed relationships
- When different consumers (mobile app, admin dashboard, public API) need different shapes of the same underlying data, requiring separate response DTOs rather than a single bloated domain object
- When decoupling the public API contract from internal domain model refactoring is important — changing a domain entity should not force a breaking API change for consumers
- When validating and deserializing structured input from HTTP bodies, gRPC messages, or message queue payloads before passing data into domain logic

## When NOT to Use

Stop and reconsider if:
- Simple CRUD endpoints in small applications where domain model and API shape are identical and are unlikely to diverge — the mapping boilerplate adds no value when the domain entity and API contract are the same object
- In-process function calls within a single bounded context where both caller and callee are in the same deployment unit — DTOs solve remote call cost; using them locally adds classes without any performance or isolation benefit
- Rapid prototyping and early-stage development where the domain model is changing rapidly — introducing DTO mapping before the model stabilizes creates a maintenance burden that slows down iteration without improving quality
- GraphQL APIs where field selection is handled by the query itself — the GraphQL resolver can project fields directly from domain objects, making a separate DTO layer redundant in most cases

## Core Concepts

- Anemic object: a DTO is intentionally anemic — it holds data fields and possibly simple getters/setters but contains zero business logic; this is a feature, not a violation of OOP principles, because its purpose is transport, not behaviour
- Boundary mapping: explicit code that converts a rich domain object (with business rules, invariants, and ORM associations) to a flat DTO and back; the mapping layer is where field selection, renaming, and format conversion happen
- Serialization contract: DTOs are the objects that get serialized to JSON, XML, Protobuf, or Avro for transmission; their structure defines the wire format and must be evolved carefully to maintain backward compatibility
- Request vs. response DTO: inbound DTOs (requests/commands) carry client-supplied data into the application and are subject to validation; outbound DTOs (responses/views) carry application-computed data to clients and are shaped for consumer convenience
- Projection: a DTO that represents a subset or reshaping of the domain model for a specific use case — similar to a database view but at the application layer

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Data Transfer Object (DTO) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify the data boundary**: locate the interface between two layers or processes (controller ↔ service, service ↔ database, microservice ↔ microservice) where multiple data fields are exchanged repeatedly in a chatty interaction
2. **Define the DTO class**: create a plain object (no business logic, no database references) containing only the fields needed by the consumer of that interface; give it a name that reflects the operation context (CreateOrderRequest, ProductSummaryResponse)
3. **Map between domain model and DTO**: implement explicit mapping code (or use a mapping library such as MapStruct, AutoMapper, or class-transformer) to convert between rich domain objects and thin DTOs at the boundary — never expose domain internals directly
4. **Validate at ingress**: apply input validation to DTOs arriving from external callers (HTTP request bodies, gRPC messages) before mapping them to domain objects; use validation annotations or schema validators to enforce constraints early
5. **Version and evolve DTOs independently**: treat DTOs as a public API contract; add fields with defaults for backward compatibility, deprecate fields explicitly, and use versioned DTO classes or API versioning to prevent breaking existing consumers during evolution

<details><summary>中文步骤</summary>

1. 识别数据边界：定位两层或两个进程之间的接口（控制器 ↔ 服务、服务 ↔ 数据库、微服务 ↔ 微服务），在那里多个数据字段在频繁的交互中被反复交换
2. 定义 DTO 类：创建一个普通对象（无业务逻辑、无数据库引用），仅包含该接口消费者所需的字段；给它一个反映操作上下文的名称（CreateOrderRequest、ProductSummaryResponse）
3. 在领域模型和 DTO 之间映射：实现显式映射代码（或使用 MapStruct、AutoMapper、class-transformer 等映射库）在边界处在富领域对象和精简 DTO 之间转换——永远不要直接暴露领域内部
4. 在入口处验证：在将来自外部调用者的 DTO（HTTP 请求体、gRPC 消息）映射到领域对象之前，对其应用输入验证；使用验证注解或模式验证器尽早强制约束
5. 独立地对 DTO 进行版本控制和演进：将 DTO 视为公共 API 契约；为向后兼容添加带默认值的字段，明确弃用字段，并使用版本化 DTO 类或 API 版本控制，以防止在演进过程中破坏现有消费者

</details>

## Do

- Do name DTOs after the operation context rather than the domain entity: use OrderCreationRequest and OrderSummaryResponse instead of OrderDTO — the operation name communicates intent and makes it obvious which direction the data flows
- Do keep DTOs flat and serialization-friendly: avoid nested domain objects or lazy-loaded ORM collections; map everything to primitives, value types, or explicit nested DTO classes before the boundary
- Do validate DTO input at the entry point using declarative validators (Bean Validation annotations in Java, class-validator in TypeScript, Pydantic in Python) before mapping to domain objects — fail fast with descriptive error messages
- Do use a dedicated mapping layer or library: centralize all DTO ↔ domain mappings in assembler classes, mapper functions, or a mapping library rather than embedding mapping logic in controllers or service methods

## Don't

- Don't add business logic or validation rules to DTOs: a DTO that enforces invariants, calculates derived fields, or calls services has become a domain object in disguise — move all logic to domain entities or application services
- Don't reuse the same DTO for multiple unrelated operations: a single UserDTO shared between registration, profile update, and admin audit endpoints accumulates fields from all contexts, resulting in a nullable field soup that confuses every consumer
- Don't skip the mapping layer by returning domain entities or ORM models directly from APIs: this exposes internal structure, leaks ORM-managed fields (like database IDs, version columns, audit timestamps), and couples the API contract to database schema changes
- Don't create DTOs for purely in-process method calls within the same layer: DTOs solve the remote call cost problem; adding them to local service-to-service calls in the same process adds boilerplate with no performance or decoupling benefit

## Case Study

**Spring Framework / Java EE ecosystem**: The J2EE (Java EE) pattern catalog documented the Transfer Object (later renamed Data Transfer Object) in response to a pervasive performance problem discovered by enterprise Java developers in the late 1990s: Entity EJBs exposed fine-grained remote interfaces where fetching an Order with 10 fields required 10 separate RMI calls, each incurring network round-trip overhead. Sun Microsystems and ThoughtWorks consultants, observing this anti-pattern across dozens of projects, codified the solution — bundle all required fields into a single serializable Transfer Object returned by a coarse-grained Session Facade — and published it in the J2EE Patterns catalog (2001) and Fowler's PoEAA (2002). The pattern subsequently propagated through the Spring Framework's layered architecture recommendations, becoming the standard way to structure controller request/response objects in Spring MVC applications, NestJS decorators, and gRPC Protobuf message definitions — all of which are DTOs under different names.

## Related Frameworks

- repository-pattern (complement)
- data-mapper-pattern (complement)
- solid-principles (related)
- clean-code-principles (related)

## Source

https://sdframe.caldis.me/frameworks/data-transfer-object
