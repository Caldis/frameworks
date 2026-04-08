# Jobs-to-Be-Done (JTBD) / 待完成任务理论

- **Category**: thinking
- **Complexity**: intermediate
- **Quality**: usability
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Clayton Christensen / Tony Ulwick, 1990s-2003, 1991
- **Adopters**: Intercom, Basecamp, Spotify, Shopify, Microsoft, Autodesk

Frame user needs as functional, social, emotional 'jobs'

_将用户需求框架化为功能性、社会性、情感性「任务」_

## When to Use

Apply this framework when:
- When your product roadmap is driven by feature requests rather than understanding why users need those features
- When you're trying to understand why customers switch from a competitor's product to yours (or vice versa)
- When you need to identify innovation opportunities in an established market where demographic segmentation isn't revealing actionable insights
- When your team debates features but can't articulate what progress users are trying to make in their lives

## When NOT to Use

Stop and reconsider if:
- When building commodity infrastructure where the 'job' is universal and well-understood (e.g., DNS resolution, basic file storage)
- When the product requirement is precisely specified by regulation or technical standards, leaving no room for job-based discovery
- When operating in a pure B2B context where the 'buyer' and 'user' are so different that job analysis requires two separate tracks that may conflict
- When the project scope is a minor UI polish or bug fix where the job has already been identified and validated

## Core Concepts

- The Job: The progress a person is trying to make in a particular circumstance — not the product they buy, but the underlying need the product is 'hired' to fulfill
- Hiring and Firing: Customers 'hire' products to do jobs and 'fire' them when they fail, providing a lens to understand adoption and churn beyond satisfaction scores
- Struggling Moments: Specific moments when existing solutions fail to help users make progress, representing the highest-value innovation opportunities
- Circumstance-Based Segmentation: Grouping users by the circumstances in which they encounter a job, rather than by demographics, which reveals more actionable patterns

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Jobs-to-Be-Done (JTBD) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Identify the Job**: define the core progress the user is trying to make in a specific circumstance (not the feature they want)
2. **Unpack Job Dimensions**: separate the functional job (task), emotional job (feeling), and social job (perception by others)
3. **Write Job Statements**: craft statements in the form 'When [situation], I want to [motivation], so I can [outcome]'
4. **Discover Struggling Moments**: find where and why users struggle to get the job done with existing solutions
5. **Map Solution Fit**: design or evaluate features by how well they help users hire your software to complete each job

<details><summary>中文步骤</summary>

1. 识别任务：定义用户在特定情境下试图实现的核心进展（而非他们想要的功能）
2. 拆解任务维度：区分功能性任务（要做什么）、情感性任务（感受如何）和社会性任务（他人如何看待）
3. 撰写任务陈述：采用「当[情境]时，我想要[动机]，以便[结果]」的格式撰写陈述
4. 发现挣扎时刻：找出用户在完成任务时与现有方案的挣扎点及其原因
5. 映射方案契合度：通过功能帮助用户「雇佣」软件完成任务的程度来设计或评估功能

</details>

## Do

- Do interview users about the specific circumstances in which they last 'hired' or 'fired' a solution, because circumstantial context reveals the real job better than abstract questions
- Do separate functional, emotional, and social dimensions when writing job statements, because products that address only functional needs often lose to those that also address emotional and social dimensions
- Do focus on the job's stability over time, because while solutions change rapidly, the underlying jobs humans need done remain remarkably constant
- Do look for non-consumption (people who aren't using any solution), because non-consumers often reveal the largest innovation opportunities

## Don't

- Don't confuse the job with the solution, because 'I want a faster horse' describes a solution while 'I need to get across town reliably in under 20 minutes' describes the job
- Don't rely solely on what users say they want, because people are poor at predicting their own behavior — observe what they actually do in struggling moments
- Don't segment customers by demographics alone, because a 25-year-old and a 55-year-old may hire the same product for the same job in the same circumstance
- Don't write job statements that are too broad ('I want to be happy') or too narrow ('I want button X to be blue'), because useful jobs are specific enough to act on but broad enough to inspire solutions

## Case Study

**Intercom**: Intercom adopted JTBD as their core product strategy framework after co-founder Des Traynor recognized their customers weren't buying 'a messaging tool' but hiring Intercom for specific jobs like 'onboard new users to reduce churn' and 'qualify inbound leads without adding headcount.' By reorganizing their product roadmap around these jobs rather than feature requests, Intercom focused development on the outcomes customers actually valued, helping them grow from a startup to a $1.3B valuation while maintaining strong product-market fit.

## Related Frameworks

- design-thinking-ideo (complement)
- problem-framing-how-now-wow (related)

## Source

https://sdframe.caldis.me/frameworks/jobs-to-be-done
