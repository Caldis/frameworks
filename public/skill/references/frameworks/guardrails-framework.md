# Guardrails Framework / AI 护栏框架

- **Category**: ai
- **Complexity**: intermediate
- **Quality**: security, reliability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Shreya Rajpal (Guardrails AI), 2023; NVIDIA NeMo Guardrails team, 2023, 2023-01
- **Adopters**: NVIDIA (NeMo Guardrails), Guardrails AI, Microsoft (Azure AI Content Safety), Anthropic, OpenAI (Moderation API)

Enforce input/output constraints on LLM-powered systems

_对大模型驱动系统强制执行输入输出约束_

## When to Use

Apply this framework when:
- Customer-facing LLM applications where brand safety and content policy compliance are critical
- Systems handling sensitive data (PII, PHI, financial data) that must enforce data loss prevention
- Applications vulnerable to prompt injection attacks that need input sanitization layers
- Regulated deployments requiring auditable evidence that AI outputs comply with policy rules

## When NOT to Use

Stop and reconsider if:
- Internal research or experimentation environments where safety constraints hinder exploration
- Creative writing applications where content policy guardrails may stifle legitimate artistic expression
- Performance-critical streaming use cases where any added latency is unacceptable
- When the LLM is operating in a fully sandboxed environment with no external-facing output

## Core Concepts

- Input Validator: A pre-processing layer that screens prompts for injection patterns, PII, or policy violations before they reach the model
- Output Validator: A post-processing layer that checks model responses for hallucination, toxicity, format errors, or off-topic content
- Fallback Response: A safe, pre-defined response returned when guardrails detect a violation
- Topical Rail: A constraint that keeps the model within a defined topic boundary and rejects off-topic queries
- Canary Token: A synthetic marker injected into context to detect if the model leaks system prompt content

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Guardrails Framework to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Enumerate risk categories relevant to the application (PII, toxicity, hallucination, injection)
2. Implement input validators that reject or rewrite unsafe or malformed prompts
3. Add output validators that check factual grounding, format compliance, and policy rules
4. Route policy violations to fallback responses or human escalation queues
5. Collect violation logs and retrain or tune guardrail classifiers on production data

<details><summary>中文步骤</summary>

1. 列举应用相关的风险类别（个人信息、有害内容、幻觉、注入攻击）
2. 实现输入验证器，拒绝或改写不安全或格式错误的提示词
3. 添加输出验证器，检查事实依据、格式合规性和策略规则
4. 将策略违规路由至降级响应或人工升级队列
5. 收集违规日志并在生产数据上重新训练或调整护栏分类器

</details>

## Do

- Layer multiple guardrails (input + output + topical) -- no single check catches everything
- Log all guardrail triggers with full context for auditing and classifier improvement
- Test guardrails adversarially using red-team prompt injection datasets
- Keep guardrail latency under 200ms to avoid degrading user experience

## Don't

- Don't rely solely on the LLM's own judgment for safety -- it can be jailbroken or misled
- Don't hardcode guardrail rules -- policies change and guardrails need to be updatable without redeployment
- Don't block legitimate queries with overly aggressive rules -- high false-positive rates erode user trust
- Don't skip input validation assuming the UI already sanitizes -- APIs can be called directly

## Case Study

**NVIDIA**: NVIDIA developed NeMo Guardrails to secure enterprise LLM deployments across its customer base. Using Colang, a purpose-built DSL, enterprises define conversational rails that prevent topic drift, data leakage, and prompt injection. Early adopters reported a 90% reduction in off-topic model responses and were able to deploy customer-facing chatbots that previously failed compliance review.

## Related Frameworks

- responsible-ai-design (complement)
- ai-output-verification (complement)
- human-in-the-loop (complement)

## Source

https://sdframe.caldis.me/frameworks/guardrails-framework
