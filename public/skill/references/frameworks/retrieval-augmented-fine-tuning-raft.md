# Retrieval-Augmented Fine-Tuning (RAFT) / 检索增强微调（RAFT）

- **Category**: ai
- **Complexity**: advanced
- **Quality**: performance, reliability
- **Abstraction**: component
- **Maturity**: experimental
- **Author**: Tianjun Zhang et al. (UC Berkeley), 2024, 2020
- **Adopters**: UC Berkeley, Microsoft Research, Anyscale, Databricks, Together AI

Combine RAG with fine-tuning for domain adaptation

_结合检索增强生成与微调实现领域适配_

## When to Use

Apply this framework when:
- Domain-specific applications (legal, medical, financial) where both retrieval accuracy and domain knowledge matter
- Enterprise RAG systems where pure retrieval produces too many irrelevant results that confuse the LLM
- Use cases requiring high factual accuracy with citation — the model must distinguish relevant from irrelevant context
- Scenarios where pure fine-tuning hallucinates on recent or niche information that wasn't in training data

## When NOT to Use

Stop and reconsider if:
- General-purpose chatbots where domain specialization is not needed and pure RAG is sufficient
- Rapidly changing domains where the fine-tuning cycle cannot keep pace with data updates
- Teams without the compute budget or MLOps infrastructure to manage fine-tuning pipelines
- Use cases where the base model's zero-shot performance with RAG already meets quality requirements

## Core Concepts

- Oracle Documents: The relevant retrieved documents that contain the answer — the model must learn to identify and cite these
- Distractor Documents: Irrelevant retrieved documents mixed into training examples to teach the model robustness against retrieval noise
- Chain-of-Thought Citation: The model is trained to produce reasoning traces that explicitly reference relevant passages, improving verifiability
- Hybrid Knowledge: RAFT combines parametric knowledge (from fine-tuning) with non-parametric knowledge (from retrieval) for superior domain performance

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Retrieval-Augmented Fine-Tuning (RAFT) to?
- What constraints or existing architecture do you need to work within?
- Has your team used Retrieval-Augmented Fine-Tuning (RAFT) before? (This is an advanced framework)

## Implementation Steps

1. Prepare a domain-specific corpus and generate question-answer pairs with supporting and distractor documents
2. Fine-tune the LLM on examples that include both relevant (oracle) and irrelevant (distractor) retrieved documents
3. Train the model to cite chain-of-thought reasoning from the relevant documents while ignoring distractors
4. Evaluate the fine-tuned model on held-out domain questions, comparing against pure RAG and pure fine-tuning baselines
5. Deploy the RAFT model with a production RAG pipeline, benefiting from both parametric knowledge and retrieval grounding

<details><summary>中文步骤</summary>

1. 准备领域特定语料库，生成包含支持文档和干扰文档的问答对
2. 使用同时包含相关（正例）和不相关（干扰）检索文档的示例微调大模型
3. 训练模型从相关文档中引用思维链推理，同时忽略干扰文档
4. 在保留的领域问题上评估微调模型，与纯 RAG 和纯微调基线进行比较
5. 将 RAFT 模型与生产 RAG 流水线一起部署，同时受益于参数知识和检索锚定

</details>

## Do

- Include a mix of oracle-only and oracle-plus-distractor examples during training to build robust retrieval discrimination
- Train the model to produce explicit chain-of-thought citations that trace answers back to specific retrieved passages
- Evaluate RAFT models against both pure RAG and pure fine-tuning baselines to quantify the hybrid benefit
- Use domain experts to validate training QA pairs — garbage-in training data produces garbage-out RAFT models

## Don't

- Don't skip distractor documents in training — a model trained only on oracle documents fails when real retrieval returns noise
- Don't use RAFT as a substitute for good retrieval — poor retrieval quality undermines even a well-fine-tuned model
- Don't fine-tune on stale domain data — RAFT models inherit the biases and gaps of their training corpus
- Don't ignore the cost of fine-tuning iteration — RAFT requires more compute than pure RAG, so validate the ROI first

## Case Study

**UC Berkeley**: UC Berkeley researchers demonstrated RAFT on domain-specific benchmarks including PubMed (medical), HotpotQA (multi-hop reasoning), and Gorilla API documentation. The RAFT-trained Llama-7B model outperformed both standard RAG with GPT-3.5 and domain-fine-tuned models on PubMed QA by 15-20%, while maintaining the ability to cite specific passages. This proved that teaching models to read retrieval results during fine-tuning produces substantially better domain specialists than either approach alone.

## Related Frameworks

- rag-architecture (extends)
- prompt-chaining (complement)
- llm-evaluation-framework (complement)

## Source

https://sdframe.caldis.me/frameworks/retrieval-augmented-fine-tuning-raft
