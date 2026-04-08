# DORA Metrics / DORA指标

- **Category**: deployment
- **Complexity**: beginner
- **Quality**: reliability, performance
- **Abstraction**: organization
- **Maturity**: established
- **Author**: Nicole Forsgren, Jez Humble, Gene Kim, 2018, 2014
- **Adopters**: Spotify, Google, Microsoft, Capital One, Target

Four elite metrics measuring software delivery performance

_衡量软件交付效能的四项精英指标_

## When to Use

Apply this framework when:
- Organizations seeking data-driven insights into their software delivery performance
- Teams starting a DevOps transformation that need objective baselines and measurable improvement targets
- Engineering leadership communicating delivery health to business stakeholders with standardized benchmarks
- Continuous improvement programs that need quantifiable evidence of process changes' impact

## When NOT to Use

Stop and reconsider if:
- Very early-stage startups where optimizing delivery metrics is premature compared to finding product-market fit
- Hardware or embedded systems with fundamentally different release cadences where daily deployment is physically impossible
- Organizations that will weaponize the metrics for punitive team comparisons rather than improvement
- One-time delivery projects where ongoing delivery metrics have no long-term value

## Core Concepts

- Deployment Frequency: How often code is deployed to production, reflecting the team's ability to deliver small, frequent batches of value
- Lead Time for Changes: The elapsed time from code commit to production deployment, measuring the efficiency of the delivery pipeline
- Change Failure Rate: The percentage of deployments that cause a failure in production, indicating the quality and stability of releases
- Mean Time to Restore (MTTR): How quickly the team can recover from a production failure, reflecting operational resilience and incident response maturity
- Elite Performance: DORA research shows elite performers deploy on-demand, with lead times under one hour, change failure rates below 5%, and MTTR under one hour

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying DORA Metrics to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Instrument CI/CD pipelines to capture Deployment Frequency per environment
2. Track Lead Time for Changes from first commit to production deployment
3. Measure Change Failure Rate as the percentage of deployments causing incidents
4. Record Mean Time to Restore (MTTR) from incident detection to full recovery
5. Benchmark against DORA elite/high/medium/low tiers and set quarterly improvement targets

<details><summary>中文步骤</summary>

1. 在CI/CD流水线中埋点，采集每个环境的部署频率
2. 跟踪从首次提交到生产部署的变更前置时间
3. 以导致故障的部署比例衡量变更失败率
4. 记录从故障检测到完全恢复的平均修复时间（MTTR）
5. 对照DORA精英/高/中/低等级进行基准对比，制定季度改进目标

</details>

## Do

- Do measure all four metrics together as a balanced scorecard, because optimizing one in isolation leads to dysfunction
- Do automate metric collection from CI/CD systems and incident management tools to ensure accuracy and reduce manual reporting burden
- Do use metrics as team-level improvement signals rather than individual performance evaluations, because punitive use destroys psychological safety
- Do benchmark against your own historical trends first before comparing to industry tiers, because context matters more than absolute numbers

## Don't

- Don't use DORA metrics as a weapon to compare or rank teams competitively, because this incentivizes gaming the metrics rather than genuine improvement
- Don't rely on self-reported surveys when automated instrumentation is available, because subjective estimates are consistently inaccurate
- Don't set arbitrary DORA tier targets without understanding current constraints, because unrealistic goals demoralize teams
- Don't ignore the correlation between metrics -- high deployment frequency with high change failure rate signals systemic quality issues

## Case Study

**Spotify**: Spotify adopted DORA metrics across its 200+ autonomous squads to create a unified language for delivery performance without imposing top-down mandates. Each squad tracks their own four metrics on internal dashboards and uses them to identify bottlenecks during retrospectives. Over two years, squads that actively tracked DORA metrics improved their lead time by an average of 45% and reduced change failure rates by 30%.

## Related Frameworks

- three-ways-devops (complement)
- calms-framework (complement)
- sli-slo-sla (complement)

## Source

https://sdframe.caldis.me/frameworks/dora-metrics
