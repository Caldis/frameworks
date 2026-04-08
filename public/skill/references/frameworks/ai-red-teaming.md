# AI Red Teaming / AI 红队测试

- **Category**: ai
- **Complexity**: advanced
- **Quality**: security, reliability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Microsoft, 2018
- **Adopters**: Microsoft, OpenAI, Google DeepMind, Anthropic, Meta AI, Hugging Face

Adversarial testing methodology for AI systems that uses structured attack exercises to discover safety vulnerabilities, harmful outputs, and failure modes before deployment.

_AI 系统的对抗性测试方法，通过结构化攻击演练在部署前发现安全漏洞、有害输出和失效模式。_

## When to Use

Apply this framework when:
- Before releasing any LLM-powered product to the public, especially applications in sensitive domains such as healthcare, finance, legal services, or content moderation
- When integrating third-party LLMs into existing products where the model's safety boundaries and failure modes are not fully understood by the deploying team
- After significant model updates, fine-tuning runs, or system prompt changes that could alter safety properties established in previous red team exercises
- When regulatory or compliance requirements mandate pre-deployment adversarial safety testing, such as EU AI Act high-risk system assessments

## When NOT to Use

Stop and reconsider if:
- Purely deterministic rule-based AI systems with no generative components where traditional software security testing and input validation are more appropriate than LLM-specific red teaming
- Internal-only AI tools with restricted access and no user-facing interface where the attack surface is limited to trusted internal actors with existing access controls
- Very early research prototypes where the model architecture and training are still being fundamentally redesigned and red team findings will be rendered obsolete by the next training run
- As a substitute for ongoing monitoring and incident response — red teaming before deployment identifies known vulnerabilities but cannot predict all emergent failure modes in production

## Core Concepts

- Threat Modelling for AI: unlike traditional software security, AI threat models must include harms from model outputs (disinformation, harmful content, bias) in addition to system intrusion — the attack surface includes the model itself, not just the application infrastructure
- Prompt Injection: adversarial inputs that cause the model to ignore its system prompt or safety guidelines — including direct injection (user crafts malicious input) and indirect injection (malicious content in retrieved documents overrides instructions)
- Jailbreaking: crafting prompts that cause a safety-trained model to violate its intended constraints, typically through role-play, hypothetical framing, or token-level manipulation
- Automated Red Teaming: using one LLM to generate adversarial prompts against another LLM at scale, enabling broader coverage of the attack space than manual human red teaming alone

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying AI Red Teaming to?
- What constraints or existing architecture do you need to work within?
- Has your team used AI Red Teaming before? (This is an advanced framework)

## Implementation Steps

1. **Define the threat model**: identify the harms the AI system could cause (disinformation, harmful content generation, data exfiltration, bias amplification) and the adversarial actors who might exploit it
2. Assemble a diverse red team combining domain experts, security researchers, ethicists, and ideally members of communities that could be harmed by model failures
3. **Conduct structured attack exercises**: test prompt injection, jailbreaks, role-play exploits, indirect prompt injection, data poisoning surface areas, and edge-case inputs that probe the model's safety boundaries
4. Document all discovered failure modes with severity ratings, reproducible prompts, and example outputs; categorise findings by harm type (safety, fairness, privacy, security)
5. Triage findings with the model and product team: determine which failures require model retraining or RLHF updates, which require system-level mitigations (output filters, rate limiting), and which are acceptable residual risks with disclosure

<details><summary>中文步骤</summary>

1. 定义威胁模型：识别 AI 系统可能造成的危害（虚假信息、有害内容生成、数据泄露、偏见放大）以及可能加以利用的对抗性行为者
2. 组建多元化的红队，结合领域专家、安全研究人员、伦理学家，以及理想情况下可能受模型失效危害的社区成员
3. 开展结构化攻击演练：测试提示注入、越狱、角色扮演利用、间接提示注入、数据投毒攻击面，以及探测模型安全边界的边缘案例输入
4. 记录所有发现的失效模式，包括严重性评级、可复现的提示词和示例输出；按危害类型（安全、公平、隐私、安全性）对发现进行分类
5. 与模型和产品团队对发现进行分类处置：确定哪些失效需要模型重新训练或 RLHF 更新，哪些需要系统级缓解措施（输出过滤、速率限制），哪些是可接受的残余风险需要披露

</details>

## Do

- Do include diverse red teamers with different backgrounds, expertise, and lived experiences — model failures often affect specific communities disproportionately and homogeneous teams miss these failure modes
- Do document all discovered failures with reproducible prompts and complete model outputs, not just summaries — detailed documentation is essential for tracking fixes and regression testing
- Do run red team exercises iteratively throughout the model development lifecycle, not only as a final gate before release — early findings are cheaper to fix and prevent safety regressions during training
- Do combine automated red teaming (using LLM-based attack generation tools like Garak or PyRIT) with human red teaming — automation provides scale, humans provide creativity and cultural context that automated attacks miss

## Don't

- Do not treat red teaming as a one-time checkbox exercise before launch — AI systems exhibit emergent failure modes that appear only in production contexts and require ongoing adversarial monitoring post-deployment
- Do not limit red team scope to only the most obvious harm categories — novel LLM misuse scenarios (indirect prompt injection via RAG, multimodal attacks, agentic misuse) require explicit inclusion in the threat model
- Do not share red team findings publicly or in full detail before mitigations are deployed — detailed jailbreak prompts and attack vectors published prematurely enable exploitation before defences are in place
- Do not conflate red teaming with standard QA testing — red teaming requires adversarial mindset and creative exploration of the attack surface, not verification that features work as specified

## Case Study

**Microsoft**: Microsoft established one of the first dedicated AI red teams in 2018 and has since conducted over 100 red team engagements across products including Copilot, Bing Chat, Azure OpenAI Service, and GitHub Copilot. In their published methodology, they describe a structured process of threat modelling, attack taxonomy development, and hybrid human-automated red teaming. For the Bing Chat integration (2023), the red team discovered that the model could be manipulated through indirect prompt injection via web page content retrieved by the search grounding feature — a novel attack vector not present in standard chatbot threat models. This finding led to architectural mitigations including output filtering for injected instructions and retrieval content sanitisation before inclusion in the context window. Microsoft also open-sourced PyRIT (Python Risk Identification Toolkit), their internal automated red teaming framework, enabling the broader AI safety community to scale adversarial testing.

## Related Frameworks

- llm-evaluation-framework (complement)
- ai-cost-optimization (related)

## Source

https://sdframe.caldis.me/frameworks/ai-red-teaming
