# Data Mapper Pattern / 数据映射器模式

- **Category**: coding
- **Complexity**: advanced
- **Quality**: maintainability, testability
- **Abstraction**: code
- **Maturity**: foundational
- **Author**: Martin Fowler, 2002
- **Adopters**: Hibernate (Java), SQLAlchemy (Python), Doctrine ORM (PHP), Entity Framework Core (.NET)

Transfer data between in-memory objects and a database while keeping them independent of each other

_在内存对象与数据库之间传输数据，同时保持两者相互独立，领域对象对持久化完全无知_

## When to Use

Apply this framework when:
- Domain objects are complex and their structure diverges significantly from the relational schema (impedance mismatch)
- Domain objects must remain free of persistence concerns so they can be tested, serialized, or reused in non-database contexts
- The database schema is legacy or independently owned and cannot be changed to match the object model

## When NOT to Use

Stop and reconsider if:
- Simple applications where domain classes map one-to-one with tables and Active Record or table gateway is significantly simpler
- Read-only reporting or analytics queries where raw SQL with a thin result mapper is more performant and easier to optimize
- Microservices with a single, small schema that owns fewer than a dozen entities, where the indirection of a full mapper adds little value

## Core Concepts

- Persistence ignorance: domain objects know nothing about the database — no SQL, no annotations, no base ORM classes — making them pure expressions of business rules
- Bidirectional translation: the mapper reads rows and constructs domain objects (hydration), and reads domain objects to produce SQL (dehydration), keeping both sides clean
- Impedance mismatch resolution: the mapper bridges structural differences between the relational world (tables, joins, foreign keys) and the object world (inheritance, associations, value objects)

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Data Mapper Pattern to?
- What constraints or existing architecture do you need to work within?
- Has your team used Data Mapper Pattern before? (This is an advanced framework)

## Implementation Steps

1. Design persistence-ignorant domain objects: model domain classes using only business logic and in-memory state, with no database annotations, base class inheritance, or SQL awareness
2. **Create the Mapper class**: implement a dedicated class (or ORM mapping configuration) responsible for SELECT, INSERT, UPDATE, DELETE and for translating between database rows and domain objects
3. **Map columns to fields**: define explicit mappings from table columns to object properties, handling type conversions, naming differences, and value object composition
4. **Handle identity and lazy loading**: the mapper manages object identity (avoiding duplicate in-memory instances for the same row) and can support lazy-loading of associations via proxies
5. **Integrate with Unit of Work**: register loaded and mutated objects with a Unit of Work so the mapper's write operations are batched into a single transaction on commit

<details><summary>中文步骤</summary>

1. 设计持久化无知的领域对象：使用仅包含业务逻辑和内存状态的领域类，没有数据库注解、基类继承或 SQL 意识
2. 创建映射器类：实现专用类（或 ORM 映射配置），负责 SELECT、INSERT、UPDATE、DELETE 以及在数据库行和领域对象之间进行转换
3. 将列映射到字段：定义从表列到对象属性的显式映射，处理类型转换、命名差异和值对象组合
4. 处理标识和懒加载：映射器管理对象标识（避免同一行在内存中有重复实例），并可通过代理支持关联的懒加载
5. 与工作单元集成：将加载的和变更的对象注册到工作单元，使映射器的写操作在提交时批处理到单一事务中

</details>

## Do

- Do keep domain classes free of any persistence annotations or base class requirements — pure POJOs/POCOs enable the highest degree of testability
- Do version and test the mapping configurations independently to catch schema-migration regressions before they reach production
- Do consider using a micro-ORM with explicit SQL for read models where the full Data Mapper overhead is unnecessary

## Don't

- Don't let the mapper bleed into the domain layer — mapping concerns (RowMapper, ResultSetExtractor) belong exclusively in the infrastructure layer
- Don't use Data Mapper for simple, table-per-class CRUD entities where Active Record provides the same isolation with far less ceremony
- Don't hand-write mappers when a mature ORM covers your schema — manual mappers require significant effort to maintain through schema changes

## Case Study

**Hibernate / Red Hat**: Hibernate is the most influential Data Mapper implementation, used by millions of Java applications. A Customer domain class has no SQL, no base class, and no Hibernate imports — it is a plain Java object. Hibernate's mapping configuration (XML or JPA annotations in a separate orm.xml) translates between the CUSTOMERS table and the Customer class, handling the one-to-many relationship to Orders, lazy-loading Address as a value object, and managing the identity map to ensure that loading Customer#42 twice in the same session returns the same Java object. This separation allowed Netflix and LinkedIn to evolve domain models and database schemas independently during rapid growth.

## Related Frameworks

- repository-pattern (complement)
- unit-of-work-pattern (complement)
- solid-principles (complement)

## Source

https://sdframe.caldis.me/frameworks/data-mapper-pattern
