# AI Observability Framework / AI 系统可观测性框架

- **Category**: ai
- **Complexity**: intermediate
- **Quality**: observability, reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Arize AI (founding team), 2020; LangSmith (LangChain), 2023, 2021
- **Adopters**: LangChain (LangSmith), Arize AI (Phoenix), Helicone, Braintrust, Weights & Biases

Trace, monitor, and explain LLM system behavior in prod

_在生产环境中追踪、监控并解释大模型系统行为_

## When to Use

Apply this framework when:
- Production LLM applications where you need to monitor quality, cost, and latency continuously
- Multi-step agent pipelines where you must trace which step caused a quality degradation
- A/B testing new prompts or models where before/after quality comparison requires metrics
- Regulated environments requiring audit trails of all AI-generated outputs

## When NOT to Use

Stop and reconsider if:
- One-off scripts or experiments where formal observability infrastructure is overkill
- Applications with no production users where monitoring provides no actionable signal
- Prototypes where the cost of observability tooling exceeds the value of the insights
- Systems with strict data sovereignty requirements that prohibit sending traces to third-party platforms

## Core Concepts

- LLM Trace: A structured record of a single LLM call including prompt, completion, model ID, latency, and token counts
- Span: A unit of work within a multi-step agent trace (e.g., retrieval span, LLM span, tool span)
- LLM-as-Judge: Using a separate LLM to evaluate the quality of another model's outputs on dimensions like relevance and faithfulness
- Quality Drift: A gradual degradation in output quality detected via statistical monitoring of evaluation scores over time
- Evaluation Dataset: A curated set of prompt-expected_output pairs used for regression testing after prompt or model changes

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying AI Observability Framework to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Instrument every LLM call with trace IDs linking prompt, model version, and raw output
2. Collect latency, token cost, and quality metrics per call and aggregate into dashboards
3. Implement an LLM-as-judge evaluator that scores output quality on sampled traffic
4. Set up drift alerts when quality or distribution metrics deviate from baseline
5. Store prompt-response pairs in an evaluation dataset for offline regression testing

<details><summary>中文步骤</summary>

1. 为每次大模型调用打上关联提示词、模型版本和原始输出的追踪 ID
2. 收集每次调用的延迟、Token 成本和质量指标并汇总至仪表盘
3. 实现 LLM-as-Judge 评估器，对采样流量的输出质量打分
4. 当质量或分布指标偏离基线时触发漂移告警
5. 将提示词-响应对存入评估数据集，用于离线回归测试

</details>

## Do

- Log full prompt-response pairs, not just metrics -- you'll need the actual text to debug quality issues
- Implement LLM-as-judge evaluation on sampled production traffic for continuous quality monitoring
- Set up cost dashboards broken down by feature, user segment, and model to optimize spend
- Create golden evaluation datasets and run regression tests before deploying prompt changes

## Don't

- Don't log only errors -- quality drift is often subtle and only visible through continuous evaluation
- Don't ignore token cost tracking -- LLM costs can spike unpredictably when usage patterns change
- Don't evaluate solely with automated metrics -- periodically review samples manually for nuanced issues
- Don't store PII in observability logs without proper anonymization and access controls

## Case Study

**LangChain (LangSmith)**: LangChain built LangSmith as a dedicated observability platform for LLM applications after recognizing that traditional APM tools couldn't capture prompt-level traces. LangSmith provides end-to-end tracing of multi-step chains, automatic evaluation scoring, and dataset management. Within a year of launch, over 100,000 developers used LangSmith to debug and optimize their LLM applications, making it the de facto tracing standard for the LangChain ecosystem.

## Related Frameworks

- llmops (complement)
- llm-evaluation-framework (complement)
- four-golden-signals (extends)

## Source

https://sdframe.caldis.me/frameworks/ai-observability-framework
