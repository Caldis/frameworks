# AI Safety Layers (Defense in Depth for AI) / AI 安全层（AI 纵深防御）

- **Category**: ai
- **Complexity**: advanced
- **Quality**: security, reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Industry convergence: Anthropic (Constitutional AI), NIST (AI RMF), OWASP (LLM Top 10), 2023-2024, 2022-12
- **Adopters**: Anthropic, OpenAI, Google DeepMind, Microsoft, Guardrails AI

Multi-layer AI safety architecture

_多层 AI 安全架构_

## When to Use

Apply this framework when:
- Any production LLM application that interacts with end users or processes sensitive data
- Enterprise AI deployments subject to regulatory requirements (EU AI Act, HIPAA, SOC 2)
- Agentic systems with tool access that can take real-world actions (send emails, modify data, execute code)
- Customer-facing AI products where brand reputation depends on safe, reliable model behavior

## When NOT to Use

Stop and reconsider if:
- Internal research and experimentation environments where safety constraints would impede model evaluation
- Non-interactive batch processing where the model has no exposure to adversarial user input
- Toy projects and demos where the overhead of multi-layer safety is disproportionate to the risk
- Fully sandboxed environments with no access to sensitive data or external systems

## Core Concepts

- Defense in Depth: No single safety layer is sufficient — multiple independent layers ensure that if one fails, others catch the threat
- Input Guardrails: Pre-processing filters that detect and block prompt injection, jailbreaks, and malicious inputs before they reach the model
- Output Guardrails: Post-processing checks that filter harmful content, detect PII leakage, and verify factual accuracy of generated responses
- Operational Safety: Runtime controls including rate limiting, audit logging, human-in-the-loop gates, and continuous adversarial testing

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying AI Safety Layers (Defense in Depth for AI) to?
- What constraints or existing architecture do you need to work within?
- Has your team used AI Safety Layers (Defense in Depth for AI) before? (This is an advanced framework)

## Implementation Steps

1. **Define the threat model**: prompt injection, jailbreaks, data leakage, harmful content, and unauthorized actions
2. **Implement input guardrails**: content filters, prompt validation, and injection detection before the LLM processes any request
3. **Apply model-level safety**: system prompts with safety instructions, Constitutional AI training, and output classifiers
4. **Add output guardrails**: content filtering, PII detection, hallucination checks, and citation verification on generated responses
5. **Deploy operational safety**: rate limiting, audit logging, human-in-the-loop for high-risk actions, and continuous red-teaming

<details><summary>中文步骤</summary>

1. 定义威胁模型：提示注入、越狱攻击、数据泄露、有害内容和未授权操作
2. 实施输入防护：内容过滤、提示验证和注入检测，在大模型处理请求之前执行
3. 应用模型层安全：带安全指令的系统提示词、Constitutional AI 训练和输出分类器
4. 添加输出防护：对生成响应进行内容过滤、PII 检测、幻觉检查和引用验证
5. 部署运维安全：速率限制、审计日志、高风险操作的人机协同和持续红队测试

</details>

## Do

- Implement independent safety layers at input, model, output, and operational levels — defense in depth requires redundancy
- Red-team your system regularly with adversarial prompts to discover bypass vectors before attackers do
- Log all LLM interactions for audit and incident investigation, with appropriate data retention policies
- Keep safety classifiers and guardrail rules updated as new attack techniques emerge — AI safety is an arms race

## Don't

- Don't rely solely on the model's built-in safety training — it can be bypassed and must be supplemented with external guardrails
- Don't treat AI safety as a one-time setup — threats evolve continuously and safety systems must be maintained actively
- Don't skip output validation because the input was clean — the model can generate harmful content from benign inputs
- Don't deploy agentic AI with tool access without human-in-the-loop gates for irreversible actions

## Case Study

**Anthropic**: Anthropic implements a comprehensive multi-layer safety architecture for Claude. The system includes input classifiers that detect prompt injection and jailbreak attempts, Constitutional AI training that teaches the model to self-critique and revise harmful outputs, output filters that catch residual harmful content, and operational controls including rate limiting and usage monitoring. This layered approach enables Claude to be deployed in high-stakes enterprise environments while maintaining strong safety properties — no single layer is trusted to be sufficient alone.

## Related Frameworks

- responsible-ai-design (complement)
- guardrails-framework (complement)
- llm-evaluation-framework (complement)
- human-in-the-loop (complement)

## Source

https://sdframe.caldis.me/frameworks/ai-safety-layers
