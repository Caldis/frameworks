# Accessibility Testing (WCAG) / 无障碍测试（WCAG）

- **Category**: quality
- **Complexity**: intermediate
- **Quality**: usability, reliability
- **Abstraction**: component
- **Maturity**: established
- **Author**: W3C WAI, 1999
- **Adopters**: BBC, GOV.UK (UK Government Digital Service), Deque Systems (axe-core), Microsoft, Apple, Salesforce

Systematic testing approach combining automated scanning and manual evaluation to verify that digital products comply with WCAG accessibility guidelines and are usable by people with disabilities.

_结合自动化扫描和手动评估的系统性测试方法，用于验证数字产品符合 WCAG 无障碍指南且对残障人士可用。_

## When to Use

Apply this framework when:
- All public-facing digital products and services, especially those subject to accessibility legislation (ADA in the US, EN 301 549 in the EU, AODA in Canada) where WCAG compliance is a legal requirement
- Products serving users in sectors with higher-than-average rates of disability — government services, healthcare, education, financial services — where accessibility failures directly exclude vulnerable populations
- Design system and component library development where embedding accessibility testing early prevents downstream WCAG regressions across all consuming applications
- Continuous delivery pipelines where automated axe-core scanning in CI provides ongoing regression protection between manual audit cycles

## When NOT to Use

Stop and reconsider if:
- Internal tools with a strictly controlled user base of non-disabled employees where the cost of full WCAG AA compliance exceeds the business value — though WCAG AA is recommended as a baseline for all digital products
- Proof-of-concept prototypes and throwaway code where accessibility investment would be wasted before the prototype is validated and discarded
- Highly specialised technical tooling (developer IDEs, 3D modelling applications, specialised scientific visualisations) where WCAG AA compliance is aspirational but the interaction model may not fully map to current WCAG success criteria
- As a one-time compliance audit substitute for ongoing testing — accessibility is not a binary achieved state; it requires continuous testing integration to prevent regressions with every UI change

## Core Concepts

- POUR Principles: WCAG 2.x is organised around four principles — Perceivable (information must be presentable in ways users can perceive), Operable (UI components must be navigable), Understandable (content and operation must be comprehensible), Robust (content must be parsable by assistive technologies)
- Conformance Levels: WCAG defines three levels — Level A (minimum, most critical failures), Level AA (standard compliance target mandated by most regulations), Level AAA (enhanced, not required for full site conformance) — most legal requirements reference AA
- Automated vs Manual Coverage: automated tools reliably detect approximately 30-40% of WCAG failures; the remaining 60-70% require manual testing, screen reader verification, and user testing because they involve subjective usability judgment that tools cannot make
- Accessible Name and Description: the accessible name is what assistive technology announces for an interactive element — computed from label elements, aria-label, aria-labelledby, or button text; missing or incorrect accessible names are the single most common WCAG failure category

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Accessibility Testing (WCAG) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. Run automated accessibility scanning tools (axe-core, Lighthouse, WAVE) during development and in CI to detect WCAG failures that are automatable — contrast ratios, missing ARIA labels, keyboard trap detection, and image alt text
2. Supplement automated scanning with manual keyboard navigation testing: verify that all interactive elements are reachable by Tab/Shift-Tab, that focus order is logical, and that no keyboard traps exist
3. Test with screen readers (NVDA and JAWS on Windows, VoiceOver on macOS and iOS, TalkBack on Android) to verify that page structure, headings, forms, and dynamic content updates are announced correctly
4. Conduct user testing with participants who have disabilities including visual, motor, cognitive, and hearing impairments — automated tools detect only 30-40% of WCAG failures; user testing discovers the remainder
5. Document findings against specific WCAG 2.1 success criteria, prioritise by severity (blocker versus advisory), fix and retest, and integrate automated checks as a permanent CI gate to prevent regressions

<details><summary>中文步骤</summary>

1. 在开发期间和 CI 中运行自动化无障碍扫描工具（axe-core、Lighthouse、WAVE）以检测可自动化的 WCAG 失败——对比度比率、缺失 ARIA 标签、键盘陷阱检测和图像替代文本
2. 用手动键盘导航测试补充自动化扫描：验证所有交互元素可通过 Tab/Shift-Tab 到达，焦点顺序合理，且不存在键盘陷阱
3. 使用屏幕阅读器（Windows 上的 NVDA 和 JAWS、macOS 和 iOS 上的 VoiceOver、Android 上的 TalkBack）测试，验证页面结构、标题、表单和动态内容更新是否正确播报
4. 与包括视觉、运动、认知和听觉障碍参与者进行用户测试——自动化工具仅能检测 30-40% 的 WCAG 失败；用户测试发现其余问题
5. 对照特定的 WCAG 2.1 成功标准记录发现，按严重性（阻塞性与建议性）优先处理，修复并重新测试，并将自动化检查作为永久 CI 关卡以防止回退

</details>

## Do

- Do integrate axe-core or Lighthouse CI as a mandatory CI gate that blocks merges on WCAG AA violations — catching regressions at the PR level costs seconds, fixing them post-release costs hours
- Do write automated component tests that verify accessible names for all interactive elements using testing-library queries like getByRole and getByLabelText — role-based queries that match screen reader semantics
- Do test with real screen readers on real devices rather than relying solely on browser accessibility tree inspection — virtual buffer mode in JAWS and NVDA produces different reading experiences than the raw DOM accessibility tree
- Do include users with disabilities in usability testing at least once per major product cycle — lived experience finds usability barriers that WCAG checklists do not capture, particularly for cognitive and motor impairments

## Don't

- Do not treat automated scan results as a complete accessibility audit — a clean axe-core report means approximately 30-40% of WCAG criteria are satisfied, not that the product is accessible
- Do not add ARIA attributes to fix accessibility tree issues without understanding their semantics — incorrectly applied ARIA (e.g., role='button' on a div without keyboard event handling) can make accessibility worse than having no ARIA at all
- Do not defer accessibility testing to a final QA phase — accessibility issues in component structure and semantic HTML are architectural decisions that are expensive to retrofit; they must be addressed in design and initial implementation
- Do not assume visual design review covers accessibility — colour contrast, text sizing, and focus indicators are the subset visible to sighted reviewers; the majority of WCAG criteria relate to programmatic semantics invisible to visual inspection

## Case Study

**BBC**: The BBC has one of the most mature accessibility testing programmes in the media industry, driven by a public broadcasting mandate and UK Equality Act obligations. Their accessibility approach combines automated testing (axe-core integrated into their React component library tests and Playwright E2E suite), manual screen reader testing on every major page type with JAWS, NVDA, and VoiceOver as part of their release checklist, and a dedicated accessibility team of specialists who conduct deep audits. The BBC published their Mobile Accessibility Guidelines in 2015 as an open standard extending WCAG for mobile contexts. Their BBC iPlayer video platform underwent a major accessibility overhaul in 2019, adding audio description, signed content, and subtitle customisation after user testing with deaf and visually impaired users revealed that the existing subtitle implementation failed WCAG 1.4.8 for reflow and had screen reader navigation issues in the episode selector. Post-remediation, BBC reported a measurable increase in iPlayer usage from users identifying as disabled.

## Related Frameworks

- continuous-testing (complement)
- testing-trophy (complement)
- bdd (complement)

## Source

https://sdframe.caldis.me/frameworks/accessibility-testing-wcag
