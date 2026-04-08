# LLM Evaluation Framework / 大模型评估框架

- **Category**: quality
- **Complexity**: advanced
- **Quality**: reliability, testability
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: OpenAI / Anthropic / Google, 2023, 2020
- **Adopters**: Anthropic, OpenAI, Google DeepMind, Microsoft, Braintrust

Systematically evaluate LLM output quality and reliability

_系统化评估大语言模型输出的质量与可靠性_

## When to Use

Apply this framework when:
- Deploying LLM-powered features to production where output quality must be measurable and tracked
- Comparing model versions or providers to make data-driven upgrade decisions
- Building RAG pipelines where retrieval and generation quality both need monitoring
- Establishing quality gates in CI/CD for prompt engineering workflows

## When NOT to Use

Stop and reconsider if:
- Simple rule-based systems where deterministic output validation is sufficient
- One-off exploratory uses of LLMs where systematic evaluation adds overhead without ongoing value
- Early prototyping phases where the evaluation criteria themselves are not yet defined

## Core Concepts

- Golden Dataset: A curated set of input-output pairs used as ground truth for evaluation
- LLM-as-Judge: Using a language model to evaluate another model's output against defined criteria
- Faithfulness: The degree to which generated content is grounded in provided source material without hallucination
- Evaluation Rubric: A structured scoring guide defining what constitutes good, acceptable, and poor output
- Regression Testing: Running evaluations on every change to detect quality degradation before deployment

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying LLM Evaluation Framework to?
- What constraints or existing architecture do you need to work within?
- Has your team used LLM Evaluation Framework before? (This is an advanced framework)

## Implementation Steps

1. **Build golden datasets**: curate labeled examples with expected outputs covering core use cases, edge cases, and known failure modes
2. **Define quality dimensions**: establish metrics for accuracy, relevance, faithfulness (no hallucination), format compliance, and safety
3. **Implement automated evaluators**: use LLM-as-judge, embedding similarity, regex validators, and custom rubrics to score each dimension
4. **Run regression suites**: execute evaluations automatically on every prompt change, model upgrade, or RAG pipeline modification
5. **Analyze and iterate**: review score trends, investigate regressions, and use failure analysis to drive prompt, retrieval, or model improvements

<details><summary>中文步骤</summary>

1. 构建黄金数据集：整理覆盖核心用例、边界情况和已知故障模式的标注示例及期望输出
2. 定义质量维度：建立准确性、相关性、忠实度（无幻觉）、格式合规性和安全性的指标
3. 实现自动化评估器：使用LLM作为裁判、嵌入相似度、正则验证器和自定义评分准则对每个维度打分
4. 运行回归套件：在每次提示词变更、模型升级或RAG管道修改时自动执行评估
5. 分析与迭代：审查分数趋势，调查回归问题，利用失败分析驱动提示词、检索或模型改进

</details>

## Do

- Do build diverse golden datasets because biased test sets produce misleading evaluation scores
- Do evaluate multiple quality dimensions because a model can be accurate but unsafe or unfaithful
- Do version evaluations alongside prompts because evaluation criteria must evolve with the application
- Do include adversarial test cases because edge cases and attacks reveal real-world failure modes

## Don't

- Don't rely solely on LLM-as-Judge because model judges have their own biases and failure modes
- Don't use a single metric because reducing quality to one number hides important failure dimensions
- Don't evaluate only happy paths because production failures occur on unexpected and adversarial inputs
- Don't skip human evaluation entirely because automated metrics can miss nuanced quality issues

## Case Study

**Anthropic**: Anthropic built extensive evaluation frameworks for Claude, including automated benchmarks across helpfulness, harmlessness, and honesty dimensions. Their evaluation suite runs thousands of test cases on every model iteration, enabling rapid detection of capability regressions and safety issues. This systematic approach allows them to ship model updates with high confidence that quality has not degraded.

## Related Frameworks

- ai-output-verification (complement)
- prompt-testing (complement)
- ai-observability-framework (complement)

## Source

https://sdframe.caldis.me/frameworks/llm-evaluation-framework
