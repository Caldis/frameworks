# RFC Process / RFC流程

- **Category**: team
- **Complexity**: beginner
- **Quality**: maintainability, usability
- **Abstraction**: system
- **Maturity**: established
- **Author**: Popularized by Rust language team (2014) and React team (2017); inspired by IETF RFC process (1969)
- **Adopters**: Rust Foundation, React / Meta, Ember.js, Swift (Apple), Shopify

Lightweight request-for-comments process for transparent technical decision-making

_用于透明技术决策的轻量级意见征集流程_

## When to Use

Apply this framework when:
- When a technical decision will affect multiple teams or cannot be easily reversed once implemented
- When the team needs a structured way to gather diverse perspectives before committing to an architectural direction
- When junior engineers need a safe, asynchronous way to propose improvements without requiring real-time advocacy skills
- When the organization has had recurring problems with decisions made in small groups without broader input leading to downstream rework

## When NOT to Use

Stop and reconsider if:
- Urgent production incidents where decisions must be made in minutes, not weeks, and the RFC process creates dangerous delay
- Small decisions (library patch version bumps, variable naming, minor refactors) where the RFC overhead exceeds the decision complexity
- Exploration and research phases where the goal is to learn, not commit, and forcing premature decisions stifles experimentation
- Organizations with fewer than 5 engineers where synchronous conversation is more efficient than asynchronous written deliberation

## Core Concepts

- Asynchronous Decision-Making: RFC enables thoughtful deliberation across time zones and schedules without requiring synchronous meetings for every technical choice
- Written Culture: Decisions are made through written argument rather than verbal persuasion, which benefits introverts, non-native speakers, and remote team members equally
- Decision Record: The final RFC serves as a durable, searchable record of why a decision was made, preventing the 'why did we do it this way?' problem months later
- Shepherd Model: A designated individual or small committee ensures the RFC reaches a decision rather than dying in an infinite comment cycle
- Alternatives Considered: The RFC format requires documenting rejected alternatives with reasons, preventing the same rejected ideas from being re-proposed without new information

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying RFC Process to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Author drafts an RFC document using a standard template (motivation, proposed solution, alternatives considered, drawbacks, unresolved questions) and opens it as a pull request or shared document
2. The RFC enters a comment period (typically 1-4 weeks) during which any stakeholder can read, comment, ask questions, or propose amendments to the draft
3. The author revises the RFC based on feedback, addressing objections and updating the alternatives and unresolved questions sections
4. A designated shepherd (tech lead, architect, or committee) evaluates the feedback and makes a final decision: accept, reject, or send back for revision with specific changes required
5. Accepted RFCs are merged into the RFC repository and serve as the authoritative record of the decision; rejected RFCs are closed with a documented rationale

<details><summary>中文步骤</summary>

1. 作者使用标准模板（动机、提议的解决方案、已考虑的替代方案、缺点、未解决的问题）起草RFC文档，并作为拉取请求或共享文档打开
2. RFC进入评论期（通常为1-4周），在此期间任何利益相关方都可以阅读、评论、提问或提议修改草案
3. 作者根据反馈修改RFC，解决异议并更新替代方案和未解决问题部分
4. 指定的推进者（技术负责人、架构师或委员会）评估反馈并做出最终决定：接受、拒绝或要求特定修改后重新提交
5. 被接受的RFC合并到RFC仓库，作为决策的权威记录；被拒绝的RFC以记录的理由关闭

</details>

## Do

- Do keep RFC documents short (1-3 pages) because long documents are not read; extract detail into appendices or linked documents
- Do set a clear comment deadline so that stakeholders know when to engage and the RFC doesn't linger in review indefinitely
- Do require authors to document rejected alternatives with specific reasons because it prevents re-hashing of already-explored options in future discussions
- Do store merged RFCs in a searchable repository (Git, Confluence, Notion) so that future engineers can understand the reasoning behind current decisions

## Don't

- Don't require RFCs for every decision because the overhead will cause engineers to bypass the process for non-trivial choices to avoid bureaucracy
- Don't let RFCs become approval theater where the decision is made before the RFC is written and comments are ignored
- Don't allow RFC comment periods to drag on indefinitely without a shepherd closing the discussion because stalled RFCs create organizational paralysis
- Don't make RFC authorship gatekept to senior engineers because it defeats the purpose of creating a democratic, inclusive decision process

## Case Study

**Rust Language Team**: The Rust programming language team has used an RFC process since 2014 for all significant language, library, and tooling changes. Every feature in Rust — from async/await to the ownership model refinements — was first proposed, debated, and approved through a public RFC on GitHub. The process has enabled a globally distributed community of contributors to make high-quality decisions without centralized authority. As of 2024, the Rust RFC repository contains over 3,000 RFCs spanning 10 years of language evolution, serving as an unparalleled historical record of why Rust is designed the way it is.

## Related Frameworks

- architecture-review-board (complement)
- engineering-ladder (complement)

## Source

https://sdframe.caldis.me/frameworks/rfc-process
