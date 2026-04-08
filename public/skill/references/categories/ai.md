# AI Collaboration / AI 协作

Frameworks for the AI Agent era — human-AI collaboration, agent architecture, LLM application design.

AI 智能体时代的框架——人机协作、智能体架构、大模型应用设计。

**25 frameworks** in this category.

## Frameworks

### ReAct Framework / ReAct 推理-行动框架
- **Slug**: react-framework
- **Complexity**: intermediate
- **Quality**: reliability
- **Author**: Shunyu Yao et al., 2022
- Interleave reasoning traces and actions in LLM agents

### RAG Architecture / 检索增强生成架构
- **Slug**: rag-architecture
- **Complexity**: intermediate
- **Quality**: reliability, performance
- **Author**: Patrick Lewis et al. (Meta AI / UCL), 2020
- Ground LLM responses with retrieved external knowledge

### Multi-Agent Orchestration Pattern / 多代理编排模式
- **Slug**: multi-agent-orchestration-pattern
- **Complexity**: advanced
- **Quality**: scalability, reliability
- **Author**: Qian Chen et al. (Tsinghua / Microsoft Research), 2023
- Coordinate specialized AI agents via an orchestrator layer

### Human-in-the-Loop Design / 人机协同回路设计
- **Slug**: human-in-the-loop
- **Complexity**: intermediate
- **Quality**: reliability, security
- **Author**: DARPA / Weng et al., 2003 (concept); modern AI-HITL formalized by Monarch (Google), 2020
- Insert human checkpoints into automated AI workflows

### Prompt Chaining Pattern / 提示词链模式
- **Slug**: prompt-chaining
- **Complexity**: beginner
- **Quality**: reliability, maintainability
- **Author**: Harrison Chase (LangChain) / Wu Tongshuang et al., 2022
- Decompose complex tasks into sequential prompt stages

### AI Pair Programming Model / AI 结对编程模型
- **Slug**: ai-pair-programming
- **Complexity**: beginner
- **Quality**: maintainability, usability
- **Author**: GitHub (Oege de Moor et al.), 2021
- Structure developer and AI collaboration in the coding loop

### Guardrails Framework / AI 护栏框架
- **Slug**: guardrails-framework
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Author**: Shreya Rajpal (Guardrails AI), 2023; NVIDIA NeMo Guardrails team, 2023
- Enforce input/output constraints on LLM-powered systems

### Context Window Management Pattern / 上下文窗口管理模式
- **Slug**: context-window-management
- **Complexity**: intermediate
- **Quality**: performance, reliability
- **Author**: Community-evolved pattern; formalized by LangChain (ConversationBufferWindowMemory, 2022) and Anthropic (long context research, 2023)
- Strategically manage LLM context to maximize coherence

### Tool-Use Design Pattern / 工具使用设计模式
- **Slug**: tool-use-design-pattern
- **Complexity**: intermediate
- **Quality**: reliability, usability
- **Author**: Timo Schick et al. (Meta AI), 2023; OpenAI Function Calling team, 2023
- Design agent-callable tools with reliable interfaces

### AI-First API Design / AI 优先 API 设计
- **Slug**: ai-first-api-design
- **Complexity**: advanced
- **Quality**: usability, maintainability
- **Author**: Community-evolved pattern; influenced by Anthropic MCP (2024), OpenAI Plugins (2023), and Stripe API design philosophy
- Design APIs optimized for consumption by AI agents

### Self-Healing Systems Pattern / 自愈系统模式
- **Slug**: self-healing-systems
- **Complexity**: advanced
- **Quality**: reliability, observability
- **Author**: IBM (Autonomic Computing Manifesto), 2001; modern AI-ops formalized by PagerDuty and Shoreline.io, 2022
- Use AI agents to detect, diagnose, and remediate failures

### AI Observability Framework / AI 系统可观测性框架
- **Slug**: ai-observability-framework
- **Complexity**: intermediate
- **Quality**: observability, reliability
- **Author**: Arize AI (founding team), 2020; LangSmith (LangChain), 2023
- Trace, monitor, and explain LLM system behavior in prod

### Responsible AI Design Framework / 负责任 AI 设计框架
- **Slug**: responsible-ai-design
- **Complexity**: advanced
- **Quality**: security, reliability
- **Author**: Microsoft (Responsible AI Standard, 2022); Google (AI Principles, 2018); EU AI Act (2024)
- Embed fairness, safety, and accountability in AI systems

### Agent Communication Protocol / 代理通信协议模式
- **Slug**: agent-communication-protocol
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Author**: FIPA (Foundation for Intelligent Physical Agents), 1996; modern: Agent Protocol (e2b), 2023; Anthropic MCP, 2024
- Standardize message contracts between autonomous AI agents

### Agentic Workflow Patterns / 智能体工作流模式
- **Slug**: agentic-workflow-patterns
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Author**: Andrew Ng (2024 keynotes); Anthropic, OpenAI, and LangChain agent frameworks
- Plan-execute-reflect loops for autonomous agents

### Model Context Protocol (MCP) / 模型上下文协议（MCP）
- **Slug**: model-context-protocol-mcp
- **Complexity**: intermediate
- **Quality**: usability, maintainability
- **Author**: Anthropic, 2024
- Standardized tool integration for LLMs (Anthropic, 2024)

### Retrieval-Augmented Fine-Tuning (RAFT) / 检索增强微调（RAFT）
- **Slug**: retrieval-augmented-fine-tuning-raft
- **Complexity**: advanced
- **Quality**: performance, reliability
- **Author**: Tianjun Zhang et al. (UC Berkeley), 2024
- Combine RAG with fine-tuning for domain adaptation

### AI Safety Layers (Defense in Depth for AI) / AI 安全层（AI 纵深防御）
- **Slug**: ai-safety-layers
- **Complexity**: advanced
- **Quality**: security, reliability
- **Author**: Industry convergence: Anthropic (Constitutional AI), NIST (AI RMF), OWASP (LLM Top 10), 2023-2024
- Multi-layer AI safety architecture

### Multimodal Pipeline Design / 多模态流水线设计
- **Slug**: multimodal-pipeline-design
- **Complexity**: advanced
- **Quality**: performance, reliability
- **Author**: Google DeepMind
- Architecture for processing text, image, audio, and video in unified AI pipelines

### AI Cost Optimization / AI 成本优化
- **Slug**: ai-cost-optimization
- **Complexity**: intermediate
- **Quality**: performance, maintainability
- **Author**: a16z
- Systematic strategies for managing and reducing LLM inference costs at production scale

### Semantic Caching / 语义缓存
- **Slug**: semantic-caching
- **Complexity**: intermediate
- **Quality**: performance, maintainability
- **Author**: GPTCache
- Caching strategy for LLM applications that stores and retrieves responses based on semantic similarity of queries rather than exact string match.

### AI Red Teaming / AI 红队测试
- **Slug**: ai-red-teaming
- **Complexity**: advanced
- **Quality**: security, reliability
- **Author**: Microsoft
- Adversarial testing methodology for AI systems that uses structured attack exercises to discover safety vulnerabilities, harmful outputs, and failure modes before deployment.

### AI Gateway Pattern / AI 网关模式
- **Slug**: ai-gateway-pattern
- **Complexity**: intermediate
- **Quality**: performance, reliability, maintainability
- **Author**: Anthropic
- Centralized proxy for LLM API management, rate limiting, caching, and observability

### Prompt Caching Strategies / 提示词缓存策略
- **Slug**: prompt-caching-strategies
- **Complexity**: beginner
- **Quality**: performance, maintainability
- **Author**: OpenAI
- Reducing LLM inference costs and latency by reusing KV cache from shared prompt prefixes

### Evaluation-Driven Development / 评估驱动开发
- **Slug**: evaluation-driven-development
- **Complexity**: advanced
- **Quality**: reliability, maintainability, performance
- **Author**: Hamel Husain
- Building AI applications by writing eval suites before features, using test results to guide iteration
