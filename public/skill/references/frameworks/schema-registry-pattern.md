# Schema Registry Pattern / 模式注册表模式

- **Category**: data
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Confluent (Jay Kreps et al.), 2015
- **Adopters**: LinkedIn, Uber, Cloudflare, Robinhood, Confluent customers (10,000+)

Centralized schema management for data contracts (Confluent, 2015)

_用于数据契约的集中化模式管理体系（Confluent，2015）_

## When to Use

Apply this framework when:
- When multiple producers and consumers share Kafka topics or event streams and schema evolution must not break existing consumers
- When data contracts between microservices need to be enforced automatically rather than relying on developer discipline
- When serialization formats like Avro or Protobuf are used and schema IDs need to be resolved at deserialization time
- When compliance or data governance requires an auditable history of all schema versions ever published to production

## When NOT to Use

Stop and reconsider if:
- Simple request-response REST APIs where OpenAPI specification and HTTP versioning provide sufficient contract management
- Single-team internal pipelines where producer and consumer are the same team and informal coordination is sufficient
- When message volumes are low and human-readable JSON without schema enforcement meets the team's agility needs
- Throwaway event streams used only for debugging or short-lived experiments where schema evolution is not a concern

## Core Concepts

- Schema subject: a named scope (typically a Kafka topic name) under which multiple schema versions are registered and their compatibility enforced
- Compatibility modes: BACKWARD (new schema can read old data), FORWARD (old schema can read new data), FULL (both), NONE (no compatibility checking)
- Schema ID wire format: the compact binary prefix (magic byte + 4-byte schema ID) that Confluent serializers embed in messages, allowing consumers to fetch the schema from the registry at deserialization
- Data contract: a formal agreement between producer and consumer teams about the shape, semantics, and evolution rules of a dataset, enforced by the registry

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Schema Registry Pattern to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Deploy a schema registry service (Confluent Schema Registry, AWS Glue Schema Registry, or Apicurio) that acts as the centralized repository for all schema versions across your data platform
2. Producers register schemas before writing data: the registry assigns a schema ID, validates compatibility with the existing version history, and rejects schemas that violate the configured compatibility mode
3. Serializers embed the schema ID in the message payload (e.g., Avro magic byte + schema ID prefix) so consumers can resolve the exact schema version used to encode each message without out-of-band coordination
4. Configure compatibility rules per subject: BACKWARD compatibility ensures new consumers can read old messages; FORWARD ensures old consumers can read new messages; FULL ensures both directions are safe
5. Integrate schema validation into CI/CD pipelines so that schema changes are reviewed and compatibility-checked before deployment, treating schema changes as a first-class engineering artifact

<details><summary>中文步骤</summary>

1. 部署模式注册表服务（Confluent Schema Registry、AWS Glue Schema Registry或Apicurio），作为数据平台中所有模式版本的集中存储库
2. 生产者在写入数据前注册模式：注册表分配模式ID，验证与现有版本历史的兼容性，并拒绝违反配置兼容性模式的模式
3. 序列化器将模式ID嵌入消息负载（如Avro魔术字节+模式ID前缀），使消费者无需带外协调即可解析用于编码每条消息的确切模式版本
4. 按主题配置兼容性规则：BACKWARD兼容性确保新消费者可读取旧消息；FORWARD确保旧消费者可读取新消息；FULL确保双向安全
5. 将模式验证集成到CI/CD管道中，使模式变更在部署前经过审查和兼容性检查，将模式变更视为一等工程制品

</details>

## Do

- Do set BACKWARD or FULL compatibility as the default because it prevents producers from silently breaking consumers without coordination
- Do treat schema changes as part of the pull request and code review process because catching incompatibilities before deployment is far cheaper than rolling back production
- Do document the semantic meaning of each field in the schema alongside its type because a field named 'amount' without currency and unit context is an incomplete contract
- Do version the schema subject per Kafka topic and environment (dev, staging, prod) to prevent development schema pollution from breaking production consumers

## Don't

- Don't use JSON Schema without a registry because without versioning and compatibility checks any producer can silently break all consumers
- Don't delete or modify registered schema versions because consumers may still rely on those versions to deserialize historical messages
- Don't let producers register schemas at runtime in production without CI/CD validation because unreviewed schema changes are a common source of production incidents
- Don't ignore the schema registry as an operational dependency because if it becomes unavailable all producers and consumers using it will fail to start or process messages

## Case Study

**Linkedin**: LinkedIn uses a schema registry (built on their internal Espresso key-value store) to manage thousands of Avro schemas across over 10,000 Kafka topics that power their feed, notifications, and analytics pipelines. The registry enforces BACKWARD compatibility so that the 300+ microservices consuming any given topic can be deployed independently without coordination windows. Schema evolution incidents dropped by over 80% after the registry was mandated company-wide, compared to the prior JSON-without-schema era.

## Related Frameworks

- change-data-capture (complement)
- data-lineage (complement)
- data-quality-framework (complement)
- stream-processing-patterns (complement)

## Source

https://sdframe.caldis.me/frameworks/schema-registry-pattern
