# Deployment & Operations / 部署运维

Deploying, operating, and running software systems in production.

软件系统的部署、运行与生产环境运维。

**20 frameworks** in this category.

## Frameworks

### Blue-Green Deployment / 蓝绿部署
- **Slug**: blue-green-deployment
- **Complexity**: intermediate
- **Quality**: reliability
- **Author**: Daniel Quinlan / early web ops community, ~2005
- Zero-downtime releases via two identical prod environments

### Canary Deployment / 金丝雀发布
- **Slug**: canary-deployment
- **Complexity**: intermediate
- **Quality**: reliability
- **Author**: Google / early site reliability engineering teams, ~2004
- Gradually roll out changes to a small user subset first

### Feature Flags / 功能开关
- **Slug**: feature-flags
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Flickr / early continuous deployment pioneers, ~2009
- Decouple code deployment from feature release via toggles

### GitOps / GitOps
- **Slug**: gitops
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Author**: Weaveworks / Alexis Richardson, 2017
- Use Git as the single source of truth for infra state

### DORA Metrics / DORA指标
- **Slug**: dora-metrics
- **Complexity**: beginner
- **Quality**: reliability, performance
- **Author**: Nicole Forsgren, Jez Humble, Gene Kim, 2018
- Four elite metrics measuring software delivery performance

### CALMS Framework / CALMS框架
- **Slug**: calms-framework
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Jez Humble & John Willis, 2010
- Five DevOps pillars: Culture, Automation, Lean, Measurement, Sharing

### Three Ways of DevOps / DevOps三步法
- **Slug**: three-ways-devops
- **Complexity**: beginner
- **Quality**: reliability, maintainability
- **Author**: Gene Kim, 2013
- Flow, Feedback, and Continual Learning as DevOps foundations

### Infrastructure as Code / 基础设施即代码
- **Slug**: infrastructure-as-code
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Author**: Mark Burgess (CFEngine, 1993) / Luke Kanies (Puppet, 2005) / modern era: Mitchell Hashimoto (Terraform, 2014)
- Manage and provision infrastructure through machine-readable config

### Twelve-Factor App / 十二要素应用
- **Slug**: twelve-factor-app
- **Complexity**: intermediate
- **Quality**: scalability, portability
- **Author**: Adam Wiggins / Heroku, 2011
- 12 principles for building scalable, maintainable cloud services

### SLI/SLO/SLA / SLI/SLO/SLA
- **Slug**: sli-slo-sla
- **Complexity**: intermediate
- **Quality**: reliability, observability
- **Author**: Google SRE team, formalized by Ben Treynor Sloss, ~2003
- Define and measure service reliability through layered objectives

### MLOps / MLOps
- **Slug**: mlops
- **Complexity**: advanced
- **Quality**: reliability, maintainability
- **Author**: D. Sculley et al. (Google), 2015; term MLOps coined ~2018
- Apply DevOps practices to ML model lifecycle in production

### LLMOps / LLMOps
- **Slug**: llmops
- **Complexity**: advanced
- **Quality**: reliability, maintainability
- **Author**: Emerging from AI/ML ops community, ~2023; influenced by Chip Huyen, Hamel Husain, and teams at Anthropic, OpenAI, and Google
- Operationalize LLM-based apps with prompt, eval, and cost management

### Agent Deployment Patterns / Agent部署模式
- **Slug**: agent-deployment-patterns
- **Complexity**: advanced
- **Quality**: reliability, security
- **Author**: Emerging from AI engineering community, ~2024; influenced by practices at Anthropic, OpenAI, Google DeepMind, and LangChain
- Patterns for reliably deploying autonomous AI agents in production

### Progressive Delivery / 渐进式交付
- **Slug**: progressive-delivery
- **Complexity**: advanced
- **Quality**: reliability
- **Author**: James Governor (RedMonk), 2018
- Combine canary, feature flags, and observability for controlled rollouts

### Immutable Infrastructure / 不可变基础设施
- **Slug**: immutable-infrastructure
- **Complexity**: intermediate
- **Quality**: reliability, security
- **Author**: Chad Fowler, 2013 (blog post: 'Trash Your Servers and Burn Your Code')
- Never patch; replace with new images

### Chaos Engineering Practices / 混沌工程实践
- **Slug**: chaos-engineering-practices
- **Complexity**: advanced
- **Quality**: reliability
- **Author**: Netflix (Casey Rosenthal, Nora Jones), 2011-2017
- Operational practices for controlled failure injection: GameDays, blast radius control, and resilience validation

### Platform as a Product / 平台即产品
- **Slug**: platform-as-a-product
- **Complexity**: advanced
- **Quality**: usability, maintainability
- **Author**: Evan Bottcher (ThoughtWorks), 2018; expanded by Team Topologies (Skelton & Pais, 2019)
- Treat internal platforms like products with users and roadmaps

### Feature Environments / 功能环境
- **Slug**: feature-environments
- **Complexity**: intermediate
- **Quality**: reliability, usability
- **Author**: Vercel
- Ephemeral full-stack environments provisioned per pull request or branch

### Deployment Stamps Pattern / 部署印章模式
- **Slug**: deployment-stamps-pattern
- **Complexity**: advanced
- **Quality**: reliability, security
- **Author**: Microsoft Azure
- Scale by deploying multiple isolated copies of the application stack per tenant or region

### Infrastructure as Code Maturity Model / 基础设施即代码成熟度模型
- **Slug**: iac-maturity-model
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Author**: Kief Morris
- Staged progression from manual infrastructure to fully automated self-service IaC
