# Immutable Infrastructure / 不可变基础设施

- **Category**: deployment
- **Complexity**: intermediate
- **Quality**: reliability, security
- **Abstraction**: system
- **Maturity**: established
- **Author**: Chad Fowler, 2013 (blog post: 'Trash Your Servers and Burn Your Code')
- **Adopters**: Netflix, Google, HashiCorp, Heroku, AWS (Elastic Beanstalk)

Never patch; replace with new images

_永不修补，用全新镜像替换_

## When to Use

Apply this framework when:
- Environments requiring strict auditability and reproducibility (finance, healthcare, regulated industries)
- Cloud-native architectures where instances are ephemeral and auto-scaled
- Teams experiencing configuration drift across long-lived servers that causes production incidents
- Security-sensitive systems where patching in place leaves uncertain intermediate states

## When NOT to Use

Stop and reconsider if:
- Legacy environments where in-place patching is the only viable option due to licensing or hardware constraints
- Development or debugging workflows where developers need to iterate rapidly on running instances
- Stateful systems (databases, file servers) where data persistence across replacements requires special handling
- Extremely resource-constrained edge devices where rebuilding and redeploying images is impractical

## Core Concepts

- No In-Place Mutation: Running instances are never modified — all changes require building and deploying a new image
- Image as Artifact: The deployable unit is a versioned, tested image stored in a registry, not a set of scripts run on a live server
- Reproducibility: Any deployment can be exactly recreated from the image tag, eliminating 'works on my machine' and snowflake servers
- Disposability: Instances are cattle, not pets — they can be destroyed and recreated at any time without manual intervention

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Immutable Infrastructure to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Build a machine or container image from a declarative specification (Dockerfile, Packer template, AMI builder)
2. Version-tag and store the image in an artifact registry with full provenance metadata
3. Deploy by replacing running instances with new image versions, never modifying live instances
4. Validate the new deployment through health checks and smoke tests before draining old instances
5. Decommission old images after a retention period; audit the registry for drift or orphaned artifacts

<details><summary>中文步骤</summary>

1. 从声明式规范（Dockerfile、Packer 模板、AMI 构建器）构建机器或容器镜像
2. 对镜像进行版本标记并存储在制品仓库中，附带完整的来源元数据
3. 通过用新镜像版本替换运行中的实例进行部署，永不修改在线实例
4. 在排空旧实例前通过健康检查和冒烟测试验证新部署
5. 保留期后退役旧镜像；审计仓库以发现漂移或孤立制品

</details>

## Do

- Invest in fast image build pipelines — slow builds are the #1 adoption blocker for immutable infrastructure
- Tag every image with the commit SHA and build timestamp for complete traceability
- Use multi-stage builds to minimize image size and reduce the attack surface
- Externalize all configuration and secrets from images using environment variables or secret managers

## Don't

- Don't SSH into running containers or instances to apply hotfixes — this violates the core immutability principle
- Don't bake secrets or credentials into images — they become visible in layer history and registries
- Don't skip vulnerability scanning of base images — an immutable image is only as secure as its layers
- Don't keep unlimited old image versions — storage costs grow quickly without a retention policy

## Case Study

**Netflix**: Netflix pioneered immutable infrastructure at scale with their Bakery system, which bakes AMIs (Amazon Machine Images) for every deployment. By 2015, Netflix was deploying thousands of immutable AMIs per day across AWS, eliminating configuration drift that had previously caused unpredictable production failures. The Bakery pipeline — combined with Spinnaker for orchestration — became the gold standard for immutable deployment at cloud scale.

## Related Frameworks

- infrastructure-as-code (complement)
- gitops (complement)
- blue-green-deployment (complement)

## Source

https://sdframe.caldis.me/frameworks/immutable-infrastructure
