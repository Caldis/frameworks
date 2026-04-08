# Evaluation-Driven Development / 评估驱动开发

- **Category**: ai
- **Complexity**: advanced
- **Quality**: reliability, maintainability, performance
- **Abstraction**: system
- **Maturity**: emerging
- **Author**: Hamel Husain, 2022-11
- **Adopters**: Duolingo, Anthropic, OpenAI, Weights & Biases, Braintrust, Scale AI

Building AI applications by writing eval suites before features, using test results to guide iteration

_通过在编写功能前先构建评估套件来开发 AI 应用，并以测试结果驱动迭代_

## When to Use

Apply this framework when:
- Any AI feature that will be shipped to real users where quality regressions are costly or damaging to trust
- Teams iterating on prompts or fine-tuned models where intuition-based evaluation slows down or misleads development
- Regulated domains (healthcare, legal, finance) where you must demonstrate that your AI meets a defined quality threshold
- Long-lived AI products where model upgrades, provider migrations, or prompt changes need safe rollout verification

## When NOT to Use

Stop and reconsider if:
- Pure research or exploratory prototyping where the problem definition itself is still being discovered — premature evals create false precision
- Ultra-low-stakes internal tools where the cost of building and maintaining an eval suite exceeds the cost of the occasional bad output
- Highly novel task domains with no existing labelled examples and no clear ground truth — invest in data collection first
- As a replacement for alignment and safety work — evals measure performance on known dimensions but cannot guarantee safety against unknown failure modes

## Core Concepts

- Golden Dataset: A curated, human-labelled set of representative input-output pairs that defines acceptable behaviour for the AI feature
- LLM-as-Judge: Using a powerful LLM (GPT-4, Claude Opus) as an automated evaluator that scores candidate outputs against a rubric
- Eval Threshold: A quantitative pass/fail bar (e.g., BLEU ≥ 0.7, judge score ≥ 4/5, hallucination rate < 2%) that must be met before shipping
- Regression Suite: A growing corpus of previously-failing examples added to the eval set to prevent reintroduction of known bugs
- Slice Analysis: Breaking down eval scores by input category, language, topic, or user segment to surface hidden failure modes

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Evaluation-Driven Development to?
- What constraints or existing architecture do you need to work within?
- Has your team used Evaluation-Driven Development before? (This is an advanced framework)

## Implementation Steps

1. Define the success criteria for the AI feature in measurable terms before writing a single prompt or training a single model
2. Build a labelled golden dataset of input-output pairs that covers edge cases, failure modes, and distribution shift scenarios
3. Implement automated eval runners (LLM-as-judge, unit assertions, human spot-checks) that score every candidate prompt or model against the dataset
4. Only ship a new prompt version, model, or feature when it passes all eval thresholds — treat a failing eval as a failing test
5. Continuously expand the eval suite with production failures and edge cases discovered after deployment; re-run evals before every release

<details><summary>中文步骤</summary>

1. 在编写任何提示词或训练任何模型之前，用可量化的标准定义 AI 功能的成功标准
2. 构建带标注的黄金数据集，覆盖边缘情况、失败模式和分布偏移场景
3. 实现自动化评估运行器（大模型作为评审、单元断言、人工抽查），对每个候选提示词或模型在数据集上打分
4. 只有在通过所有评估阈值后才上线新版提示词、模型或功能——将评估失败视同测试失败处理
5. 持续用上线后发现的生产故障和边缘情况扩充评估套件；每次发布前重新运行评估

</details>

## Do

- Start with a small golden dataset of 50-100 examples and grow it iteratively — a small high-quality set beats a large noisy one
- Combine automated evals (fast, cheap, consistent) with periodic human spot-checks (catches subtle issues automated judges miss)
- Make eval runs part of your CI/CD pipeline so every pull request that changes a prompt gets automatically evaluated
- Use slice analysis to audit evals across languages, user types, and edge cases — aggregate scores hide important failure clusters

## Don't

- Don't treat evals as a one-time pre-launch checklist — production failures must feed back into the eval suite continuously
- Don't use LLM-as-judge as your only evaluator for your own model — the judge may share the same blind spots as the model being evaluated
- Don't optimise blindly for a single metric — teams that overfit their prompts to an eval benchmark often degrade real-world quality
- Don't skip writing evals because the task seems too subjective — even creative tasks can have measurable quality dimensions (coherence, factuality, tone)

## Case Study

**Duolingo**: Duolingo's AI team adopted Evaluation-Driven Development when building their AI-powered language tutoring features for Duolingo Max. Before shipping any new exercise type or conversation scenario, the team assembled expert linguist panels to create golden datasets of expected dialogue flows, then built automated LLM-as-judge pipelines to score candidate outputs for grammatical correctness, pedagogical appropriateness, and cultural sensitivity. This approach allowed them to iterate 10× faster than pure human review while catching critical errors — including a model that inappropriately simplified responses for advanced learners — before they reached any users. The eval infrastructure became the team's primary quality gate for all subsequent model upgrades.

## Related Frameworks

- llm-evaluation-framework (extends)
- rag-architecture (complement)
- ai-observability-framework (complement)

## Source

https://sdframe.caldis.me/frameworks/evaluation-driven-development
