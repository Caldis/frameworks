# Zero Trust Architecture / 零信任架构

- **Category**: security
- **Complexity**: advanced
- **Quality**: security, reliability
- **Abstraction**: system
- **Maturity**: established
- **Author**: John Kindervag (Forrester Research), 2010
- **Adopters**: Google (BeyondCorp), Microsoft (Azure AD Conditional Access), Cloudflare (Cloudflare Access), Zscaler, US Federal Government (per EO 14028)

Never trust, always verify — eliminate implicit trust from network architecture

_永不信任、持续验证——消除网络架构中的隐式信任_

## When to Use

Apply this framework when:
- Enterprise environments with hybrid cloud and remote workforce where perimeter-based security is insufficient
- Organizations handling sensitive data (financial, healthcare, government) requiring granular access control
- Post-breach remediation where lateral movement was the primary attack vector
- Mergers and acquisitions requiring rapid, secure integration of disparate network environments

## When NOT to Use

Stop and reconsider if:
- Air-gapped networks with no external connectivity where perimeter isolation is physically enforced
- Very small teams (under 10) with a single flat network and no sensitive data — the overhead may exceed the risk
- Legacy OT/ICS environments where devices cannot support modern authentication protocols
- Short-lived experimental environments that will be destroyed before any real data flows through them

## Core Concepts

- Never Trust, Always Verify: Every access request must be authenticated, authorized, and encrypted regardless of network location
- Micro-segmentation: Dividing the network into fine-grained zones so each workload or resource is isolated behind its own access policy
- Policy Decision Point (PDP): The central engine that evaluates context signals (identity, device posture, location, risk score) to allow or deny access
- Policy Enforcement Point (PEP): The gateway that enforces the PDP's decision at the network or application boundary
- Continuous Verification: Ongoing assessment of trust during a session, not just at initial authentication

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Zero Trust Architecture to?
- What constraints or existing architecture do you need to work within?
- Has your team used Zero Trust Architecture before? (This is an advanced framework)

## Implementation Steps

1. **Identify all protect surfaces**: critical data, assets, applications, and services (DAAS)
2. Map transaction flows to understand how subjects access each protect surface
3. Build a Zero Trust policy engine that evaluates identity, device health, context, and behavior for every request
4. Enforce micro-segmentation at the network and application layer so lateral movement is blocked by default
5. Continuously monitor and log all access decisions; feed analytics back into adaptive policies

<details><summary>中文步骤</summary>

1. 识别所有保护面：关键数据、资产、应用和服务（DAAS）
2. 映射事务流以理解主体如何访问各保护面
3. 构建零信任策略引擎，对每个请求评估身份、设备健康状态、上下文和行为
4. 在网络层和应用层实施微分段，默认阻断横向移动
5. 持续监控和记录所有访问决策，将分析结果反馈到自适应策略中

</details>

## Do

- Start with your most critical protect surfaces rather than attempting a full network transformation at once
- Integrate identity-aware proxies and device trust signals into every access decision
- Invest in comprehensive logging and SIEM integration — Zero Trust is only as strong as your visibility
- Treat Zero Trust as a journey with incremental maturity levels, not a single product purchase

## Don't

- Don't assume VPN equals Zero Trust — VPN still grants broad network access once connected
- Don't neglect user experience — overly aggressive verification causes friction and workaround behaviors
- Don't forget east-west traffic — Zero Trust must apply inside the network, not just at the perimeter
- Don't implement Zero Trust without executive sponsorship — it requires cross-team coordination and budget

## Case Study

**Google**: Google pioneered Zero Trust at enterprise scale with BeyondCorp, launched after the 2009 Operation Aurora attacks. By eliminating the privileged corporate network and requiring every request to be authenticated and authorized based on user identity and device state, Google enabled 100,000+ employees to work securely from any network without VPN. BeyondCorp became the template for the entire industry's Zero Trust adoption.

## Related Frameworks

- principle-of-least-privilege (prerequisite)
- defense-in-depth (complement)
- oauth2-openid-connect (complement)

## Source

https://sdframe.caldis.me/frameworks/zero-trust-architecture
