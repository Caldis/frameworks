# Visual Regression Testing / 视觉回归测试

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: testability, reliability
- **Abstraction**: component
- **Maturity**: emerging
- **Author**: Percy.io, 2012
- **Adopters**: Shopify (Polaris), Atlassian, GitHub, Storybook community, Stripe

Screenshot comparison between baseline and current UI to catch unintended visual changes automatically

_通过对比基准截图与当前 UI 截图自动捕获意外视觉变更_

## When to Use

Apply this framework when:
- When shipping UI components that must remain visually consistent across browser updates, dependency changes, and CSS refactors
- When maintaining a design system or component library where visual regressions in shared components can affect hundreds of consumer screens simultaneously
- When your release process includes manual visual QA that you want to automate to reduce review time and human error
- When teams work across different operating systems and browsers that can subtly affect rendering and you need cross-environment baseline comparison

## When NOT to Use

Stop and reconsider if:
- Backend services, APIs, or data processing pipelines where there is no visual output to compare
- Highly dynamic UIs with real-time data, animations, or user-generated content that make stable baselines impossible without extensive mocking
- Very early-stage projects with rapidly changing designs where maintaining baselines costs more than the regressions they would catch

## Core Concepts

- Pixel-level diffing: comparing rendered screenshots pixel-by-pixel and highlighting any differences; sensitive but prone to false positives from anti-aliasing, font hinting, and sub-pixel rendering variation
- Perceptual hashing: converting images to compact perceptual fingerprints (pHash, dHash) that are tolerant of minor rendering variations while still detecting structural visual changes
- Baseline management: the process of capturing, storing, reviewing, and updating reference screenshots that define the approved visual state of each component or page
- Component-level vs. page-level testing: testing individual components in isolation (via Storybook) provides more stable baselines than full-page screenshots, which are affected by dynamic content and state
- AI-powered visual matching: services like Applitools use machine learning to distinguish intentional design changes from unintentional regressions, reducing false positive rates in complex UIs

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Visual Regression Testing to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Capture baseline screenshots**: render each component or page in a controlled environment (headless browser, Storybook) and store reference images that represent the approved visual state
2. Run visual comparisons on every pull request: re-render the same components after code changes and use pixel-diff or perceptual hashing algorithms to detect changes above a configured tolerance threshold
3. **Review and triage visual diffs**: present detected changes to developers as annotated diff images highlighting changed pixels; require explicit approval to update baselines for intentional changes
4. **Integrate into CI as a blocking check**: configure the visual testing job as a required status check so PRs with unapproved visual changes cannot be merged until a designated reviewer approves the diff
5. **Maintain baseline hygiene**: version-control baseline images alongside code, automate stale baseline cleanup, and re-capture baselines on dependency upgrades (browser versions, rendering libraries) that cause non-functional pixel shifts

<details><summary>中文步骤</summary>

1. 捕获基准截图：在受控环境（无头浏览器、Storybook）中渲染每个组件或页面，存储代表已批准视觉状态的参考图像
2. 在每个拉取请求上运行视觉比较：代码变更后重新渲染相同组件，使用像素差异或感知哈希算法检测超过配置容差阈值的变更
3. 审查和分类视觉差异：以带注释的差异图像（高亮变更像素）形式向开发者呈现检测到的变更；要求显式批准以更新有意变更的基准
4. 作为阻止性检查集成到 CI：将视觉测试作业配置为必需的状态检查，使带有未批准视觉变更的 PR 在指定审阅者批准差异前无法合并
5. 维护基准卫生：将基准图像与代码一起版本控制，自动清理过期基准，并在导致非功能性像素偏移的依赖升级（浏览器版本、渲染库）时重新捕获基准

</details>

## Do

- Do test components in isolation via Storybook rather than full pages wherever possible — isolated components produce stable, deterministic baselines free of dynamic content noise
- Do configure a pixel-difference tolerance (typically 0.1-0.5%) to account for sub-pixel rendering differences across platforms rather than requiring pixel-perfect matches
- Do store baseline images in version control alongside the code they test so that baseline history is tied to code history and rollbacks are consistent
- Do run visual tests in a fixed, reproducible browser environment (pinned browser version, fixed viewport, deterministic fonts) to prevent environment drift from causing false positives

## Don't

- Don't apply visual regression testing to every page without component isolation — full-page screenshots with dynamic data (dates, counts, user content) generate constant false positives
- Don't auto-approve baseline updates in CI without human review — silent auto-updates are how visual regressions slip undetected into the approved baseline
- Don't use visual regression as a substitute for functional testing — it catches layout and style changes but not behavioral regressions, missing logic bugs entirely
- Don't neglect cross-browser baseline maintenance — Chrome and Firefox render fonts and shadows differently, requiring separate baseline sets if cross-browser fidelity is a requirement

## Case Study

**Shopify**: Shopify's Polaris design system team uses visual regression testing extensively to protect the consistency of their shared component library across hundreds of Shopify products. They run Percy on every Storybook story for all 100+ Polaris components on each pull request. Before adopting visual testing, CSS refactors frequently introduced subtle regressions in border radii, spacing, or color contrast that passed code review but were only caught by QA engineers — sometimes after the regression had propagated to merchant-facing pages. After adopting Percy, the time to detect and fix visual regressions dropped from days to the same pull request cycle, and the design system team reduced their manual visual review effort by approximately 70%.

## Related Frameworks

- snapshot-testing (complement)
- test-pyramid (complement)
- continuous-testing (complement)
- bdd (related)

## Source

https://sdframe.caldis.me/frameworks/visual-regression-testing
