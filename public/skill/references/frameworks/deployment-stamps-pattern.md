# Deployment Stamps Pattern / 部署印章模式

- **Category**: deployment
- **Complexity**: advanced
- **Quality**: reliability, security
- **Abstraction**: system
- **Maturity**: established
- **Author**: Microsoft Azure, 2010
- **Adopters**: Microsoft Azure, GitHub, Salesforce, SAP, Workday, Twilio

Scale by deploying multiple isolated copies of the application stack per tenant or region

_通过为每个租户或地区部署多个隔离的应用栈副本来扩展规模_

## When to Use

Apply this framework when:
- SaaS applications requiring strong data isolation between enterprise customers for compliance or contractual reasons
- Global services where latency requirements mandate co-locating compute and data near each customer region
- Systems that must scale beyond the limits of a single database or infrastructure stack without re-architecting the application
- Applications with highly variable per-tenant load profiles where noisy-neighbor effects on a shared stack would degrade SLAs

## When NOT to Use

Stop and reconsider if:
- Consumer SaaS with millions of end-user accounts where per-user stamp isolation is economically infeasible
- Applications with strong cross-tenant data sharing requirements where isolation prevents legitimate data access patterns
- Small teams without the platform engineering maturity to build, operate, and version the stamp provisioning pipeline
- Systems with uniform, predictable load where a single well-scaled stack is more cost-effective than many small stamps

## Core Concepts

- Stamp Unit: A stamp is the smallest independently deployable unit of the full application stack; it is self-contained and shares no mutable state with other stamps
- Template Consistency: Every stamp is provisioned from the same IaC template, ensuring configuration parity and eliminating stamp-specific drift
- Tenant-to-Stamp Routing: A routing layer maps each tenant or region identifier to its assigned stamp; this layer is the only shared component
- Blast Radius Containment: Incidents, performance degradation, or failed deployments on one stamp are fully contained and do not propagate to other stamps

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Deployment Stamps Pattern to?
- What constraints or existing architecture do you need to work within?
- Has your team used Deployment Stamps Pattern before? (This is an advanced framework)

## Implementation Steps

1. Define the stamp unit — the full set of resources (compute, database, cache, networking) that constitutes one isolated deployment
2. Templatize the stamp using infrastructure-as-code so that each stamp is provisioned identically from the same template
3. Build a routing layer (geo-DNS, tenant lookup service) that maps each customer or region to their assigned stamp
4. Deploy new stamps for new tenants or regions; scale within a stamp until it reaches its defined capacity ceiling
5. Operate stamps independently — updates, incidents, and capacity changes on one stamp do not affect others

<details><summary>中文步骤</summary>

1. 定义印章单元——构成一个隔离部署的完整资源集合（计算、数据库、缓存、网络）
2. 使用基础设施即代码对印章进行模板化，使每个印章从相同模板以相同方式创建
3. 构建路由层（地理 DNS、租户查找服务）将每个客户或地区映射到其分配的印章
4. 为新租户或地区部署新印章；在印章内扩展直到达到其定义的容量上限
5. 独立运营印章——一个印章上的更新、事故和容量变更不影响其他印章

</details>

## Do

- Do automate stamp provisioning end-to-end from IaC templates so that a new stamp can be deployed in minutes without manual steps
- Do implement a centralized stamp registry that tracks which tenant maps to which stamp, their capacity utilization, and health status
- Do version stamp templates independently from application code so infrastructure changes can be applied across stamps in controlled waves
- Do design stamps to be horizontally scalable within their bounds so you can right-size before provisioning a new stamp

## Don't

- Don't allow stamps to share mutable state (databases, caches, message queues) — shared state defeats the isolation guarantee and reintroduces noisy-neighbor risk
- Don't manually configure individual stamps — every deviation from the template becomes undocumented drift that causes future incidents
- Don't over-provision stamps from day one — use capacity modeling to right-size the stamp unit and grow the number of stamps rather than the size
- Don't use the stamps pattern as a substitute for good application architecture — it scales isolation, not poorly-written code

## Case Study

**GitHub**: GitHub uses a stamps-like deployment model for GitHub Enterprise Server, where each enterprise customer runs their own isolated stack — compute, storage, and networking — deployed from the same release artifact. This architecture ensures that a performance problem or infrastructure incident at one enterprise installation has zero impact on other customers. GitHub also uses this pattern internally for its own reliability zones, with independent stacks per region that can absorb a full zone failure without cross-zone blast radius.

## Related Frameworks

- infrastructure-as-code (complement)
- gitops (complement)
- blue-green-deployment (complement)
- platform-engineering (complement)

## Source

https://sdframe.caldis.me/frameworks/deployment-stamps-pattern
