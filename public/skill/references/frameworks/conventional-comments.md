# Conventional Comments / 约定式评论

- **Category**: coding
- **Complexity**: beginner
- **Quality**: maintainability
- **Abstraction**: code
- **Maturity**: established
- **Author**: Paul Slaughter, 2020
- **Adopters**: GitLab, Shopify, HashiCorp, DigitalOcean, Sourcegraph

Prefixed code review comments for clarity and actionability

_带前缀的代码评审注释，提升清晰度与可操作性_

## When to Use

Apply this framework when:
- Code reviews where reviewers want to clearly communicate intent and priority of feedback
- Teams experiencing misunderstandings about whether review comments are blocking or advisory
- Open source projects with diverse contributors who need a shared feedback language
- Organizations wanting to measure and improve code review culture with data

## When NOT to Use

Stop and reconsider if:
- Solo developers with no code review process
- Pair programming sessions where feedback is given verbally in real time
- Very small teams where informal communication is sufficient and overhead is unwanted
- Automated CI feedback where structured linter output replaces human comments

## Core Concepts

- Labels: prefixes (suggestion, issue, question, praise, nitpick, thought) that categorize the type of feedback
- Decorators: modifiers like (blocking) and (non-blocking) that communicate urgency and merge requirements
- Structured Body: the explanation that follows the label, providing context, rationale, and optionally a suggested fix
- Praise: explicitly calling out good code encourages positive behavior and makes reviews feel balanced
- Measurability: labeled comments can be aggregated and analyzed to track review patterns and team health

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Conventional Comments to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Learn the label taxonomy**: use prefixes like suggestion:, issue:, question:, praise:, nitpick:, thought: to categorize each comment
2. **Add decorators for urgency**: append (blocking) or (non-blocking) to signal whether the comment must be resolved before merge
3. **Write the comment body**: after the label, provide a clear explanation of what and why, with a suggested fix when possible
4. **Adopt team-wide**: add Conventional Comments guidelines to the team's contributing guide and code review checklist
5. **Measure review quality**: track resolution rates per label type and use feedback to improve review culture over time

<details><summary>中文步骤</summary>

1. 学习标签分类法：使用suggestion:、issue:、question:、praise:、nitpick:、thought:等前缀对每条评论分类
2. 添加紧急度修饰：附加(blocking)或(non-blocking)以标识该评论是否必须在合并前解决
3. 撰写评论正文：在标签后提供清晰的解释（什么和为什么），尽可能附上建议的修复方案
4. 全团队采纳：将约定式评论指南添加到团队贡献指南和代码评审清单中
5. 衡量评审质量：追踪各标签类型的解决率，利用反馈持续改善评审文化

</details>

## Do

- Do always include a label prefix because it immediately communicates the nature of the feedback
- Do mark comments as (non-blocking) when they are suggestions so authors know they can merge without addressing them
- Do use praise: labels generously because positive reinforcement improves team morale and review quality
- Do provide suggested fixes alongside issue: and suggestion: comments because it reduces back-and-forth

## Don't

- Don't leave ambiguous comments without labels because the author cannot tell if it is blocking or optional
- Don't overuse nitpick: for substantive issues because it trains authors to ignore important feedback
- Don't write comment bodies without explaining 'why' because context is essential for learning
- Don't introduce Conventional Comments without team buy-in because inconsistent adoption creates more confusion

## Case Study

**GitLab**: GitLab adopted Conventional Comments across its engineering organization to standardize how feedback is given in merge requests. By labeling every comment with a category and blocking/non-blocking decorator, GitLab reduced average merge request review cycles from 3.2 rounds to 1.8 rounds. The structured format also enabled GitLab to build dashboards tracking review patterns and identify teams that needed coaching.

## Related Frameworks

- clean-code-principles (complement)
- ai-pair-programming (complement)
- semantic-versioning (related)

## Source

https://sdframe.caldis.me/frameworks/conventional-comments
