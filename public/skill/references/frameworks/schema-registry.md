# Schema Registry / 模式注册表

- **Category**: data
- **Complexity**: intermediate
- **Quality**: reliability, maintainability, scalability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Confluent, 2015
- **Adopters**: Confluent, Zalando, LinkedIn, Uber, Robinhood, Goldman Sachs

Centralized service for storing, versioning, and enforcing data schemas in streaming and event-driven architectures, ensuring producer-consumer compatibility.

_集中式服务，用于在流式和事件驱动架构中存储、版本化和强制执行数据模式，确保生产者与消费者的兼容性。_

## When to Use

Apply this framework when:
- When building Kafka-based event streaming pipelines where multiple producer and consumer teams evolve independently and schema changes must not break downstream consumers
- When regulatory or audit requirements mandate that the exact schema of every event published to a data stream is recorded, versioned, and retrievable
- When using Avro, Protobuf, or JSON Schema serialization formats that externalize schema from payload, making a central registry essential for deserialization
- When operating a data platform with dozens of topics and teams where ad-hoc schema changes without compatibility checks are a leading cause of production incidents

## When NOT to Use

Stop and reconsider if:
- When using JSON or Avro with schemas embedded in each message payload and the team explicitly prefers schema-on-read flexibility over compatibility enforcement
- Small event-driven systems with fewer than 5 topics and a single team where the overhead of a separate registry service exceeds the benefit
- When all producers and consumers are tightly coupled in a monolith and deploy together; schema versioning adds process overhead without the decoupling benefit
- Prototyping phases where schema stability is not yet required and frequent structural changes are expected; introduce the registry when the schema stabilizes

## Core Concepts

- Schema subjects: named containers (typically one per Kafka topic) that hold all versions of a schema and enforce a configured compatibility policy across those versions
- Compatibility modes: BACKWARD (new schema reads old data), FORWARD (old schema reads new data), FULL (both directions), allowing teams to choose the right trade-off between producer and consumer flexibility
- Schema ID wire format: producers embed only a 4-byte schema ID in each message header rather than the full schema, reducing payload size by 80–95% while enabling consumers to fetch the exact schema for deserialization
- SerDes integration: Confluent's Kafka serializers and deserializers query the registry at startup and cache schemas locally, making schema resolution transparent to application code

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Schema Registry to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Register canonical schemas (Avro, Protobuf, or JSON Schema) for each Kafka topic or event stream using a compatibility-checked API
2. Configure compatibility rules (BACKWARD, FORWARD, FULL, or NONE) per subject so the registry auto-validates new schema versions at registration time
3. Integrate schema serializers/deserializers (SerDes) in producers and consumers so they look up schemas by ID at runtime instead of embedding schema in every message
4. Version and tag schemas alongside service releases so schema evolution is traceable and rollbacks are possible
5. Monitor schema usage dashboards to identify stale schemas, detect consumers blocked by incompatible changes, and track adoption of new schema versions

<details><summary>中文步骤</summary>

1. 使用兼容性检查API为每个Kafka主题或事件流注册规范模式（Avro、Protobuf或JSON Schema）
2. 为每个主题配置兼容性规则（向后、向前、全量或无），使注册表在注册时自动验证新模式版本
3. 在生产者和消费者中集成模式序列化/反序列化器（SerDes），使其在运行时按ID查找模式，而非在每条消息中嵌入模式
4. 将模式与服务发布一起版本化和标记，使模式演进可追溯且回滚成为可能
5. 监控模式使用仪表板，识别过时模式、检测被不兼容变更阻塞的消费者，并跟踪新模式版本的采用情况

</details>

## Do

- Do set FULL compatibility on high-traffic topics shared across many consumer teams because it is the safest policy and prevents both producer and consumer from accidentally breaking each other
- Do version schemas alongside your service's release tags so you can correlate production incidents to specific schema changes in the git history
- Do run schema compatibility checks in CI before merging any producer code changes so incompatible schemas never reach the deployment pipeline
- Do monitor consumer lag per schema version to detect consumers pinned to old schema versions that will be affected by upcoming deprecations

## Don't

- Don't use NONE compatibility mode on shared topics because it removes all guardrails and allows any schema change regardless of consumer impact
- Don't hardcode schema IDs in consumer code because IDs are registry-specific and will differ across environments; always resolve IDs dynamically
- Don't delete schema versions that active consumers depend on; mark them as deprecated and give consumers a migration window before deletion
- Don't store large binary blobs or deeply nested schemas in the registry; extreme schema complexity should be a signal to decompose the event into smaller, focused schemas

## Case Study

**Zalando**: Zalando, Europe's largest online fashion platform, enforces schema governance across 2,000+ Kafka topics using Confluent Schema Registry with FULL compatibility mode. Every event schema is authored in Avro and peer-reviewed via pull request before registration. The schema registry is integrated into Zalando's internal developer platform Nakadi, which exposes event types as REST APIs. When a producer team proposes an incompatible schema change, Nakadi's CI pipeline automatically identifies all consumer teams and opens compatibility-blocking pull requests to coordinate migration. This process has reduced schema-induced production incidents by 90% since 2018.

## Related Frameworks

- schema-registry-pattern (related)
- data-catalog (complement)
- data-lineage (related)
- data-contract (complement)
- stream-processing-patterns (complement)

## Source

https://sdframe.caldis.me/frameworks/schema-registry
