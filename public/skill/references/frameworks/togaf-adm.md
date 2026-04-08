# TOGAF Architecture Development Method (ADM) / TOGAF架构开发方法

- **Category**: architecture
- **Complexity**: advanced
- **Quality**: maintainability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: The Open Group, 1995
- **Adopters**: US Department of Defense, Capgemini, Infosys, Accenture, Deutsche Bank

Iterative enterprise architecture lifecycle with defined phases

_具有明确阶段的迭代式企业架构生命周期方法_

## When to Use

Apply this framework when:
- When an enterprise needs a structured approach to align IT architecture with business strategy
- When managing large-scale digital transformation programs across multiple business units
- When governance and compliance requirements demand formal architecture review processes
- When building an enterprise architecture practice from scratch in a large organization

## When NOT to Use

Stop and reconsider if:
- Startups and small companies where lightweight architecture practices like ADRs and C4 suffice
- Purely agile product teams that need fast iteration without formal governance gates
- Projects with a single system where enterprise-level architecture planning is overkill

## Core Concepts

- Architecture Development Method: An iterative cycle of phases from Vision through Migration and Governance
- Architecture Repository: A structured store of architecture assets, standards, reference models, and governance records
- Architecture Building Blocks: Reusable architecture components that can be combined into solutions
- Gap analysis: Systematic comparison of baseline and target architectures to identify required changes
- Transition architecture: Intermediate states between current and target architecture that are deployable and valuable

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying TOGAF Architecture Development Method (ADM) to?
- What constraints or existing architecture do you need to work within?
- Has your team used TOGAF Architecture Development Method (ADM) before? (This is an advanced framework)

## Implementation Steps

1. **Establish Architecture Vision**: define scope, stakeholders, constraints, and high-level target architecture statement
2. Develop Business, Information Systems (Data + Application), and Technology Architecture baselines and targets
3. Perform gap analysis between baseline and target for each domain; identify work packages
4. **Create Migration Plan**: prioritize work packages, define transition architectures, and roadmap sequencing
5. **Govern implementation**: establish Architecture Board oversight, compliance reviews, and update the Architecture Repository

<details><summary>中文步骤</summary>

1. 建立架构愿景：定义范围、利益相关者、约束条件和高层次目标架构声明
2. 开发业务架构、信息系统架构（数据+应用）和技术架构的基线与目标
3. 对每个领域进行基线与目标的差距分析；识别工作包
4. 制定迁移计划：对工作包排定优先级，定义过渡架构和路线图顺序
5. 治理实施：建立架构委员会监督、合规审查，并更新架构知识库

</details>

## Do

- Do tailor TOGAF to your organization's size and culture because the full framework is designed to be adapted
- Do maintain the Architecture Repository as a living asset because it is the institutional memory of architectural decisions
- Do engage business stakeholders early in the Vision phase because IT-only architecture fails to deliver business value
- Do use transition architectures because big-bang migrations carry excessive risk

## Don't

- Don't apply TOGAF rigidly without tailoring because the overhead will crush agility in smaller organizations
- Don't treat ADM phases as a strict waterfall because the method is designed to be iterative and adaptive
- Don't create architecture artifacts that nobody reads because documentation without consumers is waste
- Don't skip the Requirements Management phase because it anchors all ADM iterations to actual business needs

## Case Study

**US Department of Defense**: The US Department of Defense adopted TOGAF as the basis for its enterprise architecture practice across military branches. Using the ADM cycle, DoD created baseline and target architectures for its IT consolidation initiative, reducing data center count from over 2,000 to fewer than 800. The Architecture Repository became the authoritative source for technology standards and reference architectures, enabling interoperability across Army, Navy, and Air Force systems.

## Related Frameworks

- c4-model (complement)
- adr (complement)
- wardley-mapping (alternative)

## Source

https://sdframe.caldis.me/frameworks/togaf-adm
