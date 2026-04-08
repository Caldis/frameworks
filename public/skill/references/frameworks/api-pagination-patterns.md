# API Pagination Patterns / API分页模式

- **Category**: api
- **Complexity**: intermediate
- **Quality**: performance, usability, scalability
- **Abstraction**: component
- **Maturity**: foundational
- **Author**: Relay Cursor Connections Specification (Facebook/Meta, 2015); keyset pagination popularized by Markus Winand (Use The Index, Luke), 2005
- **Adopters**: Stripe, GitHub, Twitter, Shopify, Salesforce

Cursor-based, offset-based, and keyset pagination strategies for large collection APIs

_针对大型集合API的游标分页、偏移分页和键集分页策略_

## When to Use

Apply this framework when:
- When a collection endpoint can return thousands or millions of records and the client needs to retrieve them in batches
- When building real-time or near-real-time feeds where new items are inserted at the top and offset pagination causes duplicates or skips
- When performance profiling shows that deep OFFSET queries (page 500+) are scanning millions of rows and degrading database performance
- When building a public API that serves many diverse clients with different pagination needs (some need page numbers, others need infinite scroll)

## When NOT to Use

Stop and reconsider if:
- Small collections of fewer than a hundred items where full-list responses are acceptable and pagination adds unnecessary complexity
- Search results that require total hit counts and facet aggregations, where specialized search engines (Elasticsearch) handle pagination differently
- Streaming endpoints where data is consumed as a continuous flow rather than discrete pages
- Internal batch jobs that read entire tables, where streaming cursors or database-native bulk export are more appropriate

## Core Concepts

- Offset Pagination: Simple limit/offset or page/page_size model; easy to implement and supports random access but degrades at high page numbers due to full table scans
- Cursor-Based Pagination: An opaque server-generated pointer encodes the position in the result set; stable across inserts/deletes but does not support random page access
- Keyset Pagination: Uses the value of an indexed column as the continuation condition (WHERE created_at < :last_seen); O(log n) performance regardless of depth
- Relay Connection Specification: Standardized cursor pagination for GraphQL with edges, nodes, pageInfo, and startCursor/endCursor fields enabling universal client support
- Hypermedia Links: RFC 5988 Link headers (rel=next, rel=prev, rel=first, rel=last) allow clients to navigate pages without constructing URLs, supporting HATEOAS principles

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying API Pagination Patterns to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Analyze the use case**: choose offset pagination for random-access navigation (page numbers, jump to page), cursor-based for real-time feeds, and keyset for high-performance large datasets
2. For offset pagination, expose page and page_size (or limit/offset) query parameters and return total_count and total_pages in the response envelope
3. For cursor-based pagination, encode the position as an opaque cursor (base64-encoded pointer), returning next_cursor and prev_cursor in the response so clients never construct cursors manually
4. For keyset pagination, use the last seen value of a stable indexed column (created_at + id) as the continuation token, avoiding the performance cliff of deep OFFSET queries
5. Document the pagination model in the OpenAPI spec, include Link headers (RFC 5988) for discoverability, and enforce a maximum page_size limit to prevent abuse

<details><summary>中文步骤</summary>

1. 分析用例：为随机访问导航（页码、跳转到页面）选择偏移分页，为实时信息流选择游标分页，为高性能大数据集选择键集分页
2. 对于偏移分页，暴露page和page_size（或limit/offset）查询参数，并在响应信封中返回total_count和total_pages
3. 对于游标分页，将位置编码为不透明游标（base64编码的指针），在响应中返回next_cursor和prev_cursor，使客户端无需手动构造游标
4. 对于键集分页，使用稳定索引列（created_at + id）的最后可见值作为延续令牌，避免深层OFFSET查询的性能悬崖
5. 在OpenAPI规范中记录分页模型，包含Link头（RFC 5988）以提高可发现性，并强制执行最大page_size限制以防止滥用

</details>

## Do

- Do choose the pagination strategy based on the query pattern: offset for admin UIs with page jumps, cursor for feeds, keyset for large-scale data exports
- Do return a consistent envelope with metadata (total_count, has_next_page, next_cursor) so clients can build pagination controls without extra requests
- Do enforce a maximum page_size limit (e.g., 100 or 1000) because unbounded page sizes allow clients to accidentally trigger full table scans
- Do make cursors opaque (base64-encoded) so that clients treat them as black boxes and you can change their internal format without a breaking change

## Don't

- Don't use offset pagination for large datasets where users never access deep pages because the performance cost is paid even for unused pages
- Don't expose internal database row IDs or timestamps as pagination cursors because it leaks implementation details and makes cursor format migration impossible
- Don't return inconsistent total_count values when the dataset is modified concurrently because it causes client-side pagination controls to show incorrect totals
- Don't skip pagination on endpoints that return collections because unbounded responses will eventually cause timeouts or memory exhaustion

## Case Study

**Stripe**: Stripe's list APIs use cursor-based pagination with a keyset implementation under the hood. Every list endpoint (charges, customers, invoices) returns a data array, a has_more boolean, and a next page cursor encoded as the ID of the last object in the response. When fetching the next page, clients pass starting_after=<last_id>, and Stripe executes a WHERE id > :last_id query on an indexed primary key, delivering consistent sub-millisecond pagination performance regardless of whether the client is on page 1 or page 10,000. This design has scaled to handle hundreds of millions of objects per account without any degradation.

## Related Frameworks

- graphql-schema-design (complement)
- openapi-specification (complement)

## Source

https://sdframe.caldis.me/frameworks/api-pagination-patterns
