# LLMOps / LLMOps

- **Category**: deployment
- **Complexity**: advanced
- **Quality**: reliability, maintainability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Emerging from AI/ML ops community, ~2023; influenced by Chip Huyen, Hamel Husain, and teams at Anthropic, OpenAI, and Google, 2022
- **Adopters**: Notion, Anthropic, OpenAI, Shopify, Stripe

Operationalize LLM-based apps with prompt, eval, and cost management

_通过提示、评测与成本管理将大语言模型应用投入生产运营_

## When to Use

Apply this framework when:
- Production LLM applications where prompt changes are as impactful as code changes
- Applications where LLM output quality must be continuously measured against regression benchmarks
- Cost-sensitive deployments where token usage, model selection, and caching must be optimized
- Safety-critical applications requiring continuous monitoring for hallucinations and policy violations

## When NOT to Use

Stop and reconsider if:
- Simple LLM integrations where eval pipelines and prompt registries overhead is unjustified
- Research and experimentation phases where the application is not yet serving real users
- Applications using pre-built LLM APIs with no custom prompts to version or evaluate
- Batch-only LLM usage where real-time monitoring and latency SLOs are irrelevant

## Core Concepts

- Prompt Versioning: Treat prompts as first-class versioned artifacts with change history, A/B testing, and rollback capabilities
- LLM Evaluation Pipelines: Automated testing using reference datasets, judge models, and human-in-the-loop scoring to validate output quality
- Token Economics: Track and optimize token consumption per request, implement semantic caching, and select the smallest adequate model
- Guardrails and Safety: Input/output validation layers that detect and block hallucinations, PII leakage, and jailbreak attempts in real-time
- LLM Observability: End-to-end tracing of LLM calls including prompt templates, retrieved context, model responses, latency, and cost

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying LLMOps to?
- What constraints or existing architecture do you need to work within?
- Has your team used LLMOps before? (This is an advanced framework)

## Implementation Steps

1. Version and manage prompts as first-class artifacts in a prompt registry with change history
2. Build automated LLM evaluation pipelines using reference datasets and judge-model scoring
3. **Implement observability**: trace every LLM call with inputs, outputs, latency, and token costs
4. Gate deployments with eval thresholds; use canary promotion for new model versions or prompts
5. Monitor production for hallucination rates, latency SLOs, cost per request, and safety violations

<details><summary>中文步骤</summary>

1. 将提示词作为一等制品纳入提示词注册中心进行版本管理，保留变更历史
2. 使用参考数据集和裁判模型评分，构建自动化的LLM评测流水线
3. 实现可观测性：对每次LLM调用记录输入、输出、延迟和Token成本
4. 以评测阈值作为部署门控，对新模型版本或提示词采用金丝雀晋升策略
5. 在生产环境监控幻觉率、延迟SLO、单次请求成本及安全违规情况

</details>

## Do

- Do version prompts in a registry with full change history, because a prompt change can alter application behavior dramatically
- Do build automated eval suites that run on every prompt or model change, because manual spot-checking misses subtle regressions
- Do implement semantic caching for common queries to reduce latency and token costs
- Do monitor token costs per endpoint and per user segment, because LLM inference costs can scale non-linearly

## Don't

- Don't treat prompts as just strings that anyone can edit without review, because unreviewed prompt changes are the top cause of LLM incidents
- Don't deploy a new model version without running your eval suite, because even minor version bumps can cause significant output shifts
- Don't rely solely on automated metrics for LLM quality -- incorporate human evaluation for nuanced aspects
- Don't ignore the latency impact of safety guardrails, because synchronous validation adds to LLM response times

## Case Study

**Notion**: Notion built a comprehensive LLMOps pipeline for their Notion AI product, powering AI writing assistance, summarization, and Q&A across millions of workspaces. They implemented prompt versioning with A/B testing, automated evaluation pipelines using model-based judges and human raters, and real-time monitoring of hallucination rates. Their LLMOps practices enabled weekly prompt iterations without quality regressions, while intelligent model routing kept per-request costs within budget.

## Related Frameworks

- mlops (extends)
- prompt-testing (complement)
- ai-observability-framework (complement)

## Source

https://sdframe.caldis.me/frameworks/llmops
