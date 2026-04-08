# Runtime Application Self-Protection (RASP) / 运行时应用自我保护（RASP）

- **Category**: security
- **Complexity**: intermediate
- **Quality**: security, reliability, observability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Gartner (Joseph Feiman coined the term RASP in 2012); commercial implementations by Contrast Security, Sqreen
- **Adopters**: Capital One, Société Générale, Cisco, Hulu, Wayfair

A security technology that instruments application runtimes to detect and block attacks from within the running application context, with access to call stacks, data flows, and execution context that perimeter controls cannot see

_在运行中的应用程序上下文内部检测和阻止攻击的安全技术，可访问外围控制无法看到的调用栈、数据流和执行上下文_

## When to Use

Apply this framework when:
- Applications exposed to the internet that handle sensitive data and cannot patch known vulnerabilities immediately due to release cycle constraints
- Regulated industries (finance, healthcare) where compliance frameworks (PCI-DSS, HIPAA) require real-time attack detection and evidence of active controls inside the application layer
- Zero-day vulnerability periods where a RASP agent can block exploitation of a newly disclosed library vulnerability before a patched version is deployed
- Applications that cannot be fully covered by network-layer WAF rules due to encrypted payloads, WebSocket traffic, or complex application-specific attack surfaces

## When NOT to Use

Stop and reconsider if:
- Applications with extremely tight latency SLOs (sub-millisecond P99) where even 1-2% RASP overhead is unacceptable
- Languages or runtimes for which mature RASP agents do not exist (many Go, Rust, Elixir services) — immature agents introduce more risk than they mitigate
- Serverless functions with very short execution durations where agent initialization overhead exceeds function execution time
- Teams without a security operations capability to triage RASP alerts — deploying RASP without alert handling creates alert fatigue and eventually agent misconfiguration

## Core Concepts

- In-Process Instrumentation: RASP agents operate inside the application process and hook into language runtime APIs (JVMTI, .NET Profiler) to intercept security-sensitive operations at the point of execution, not at the network boundary
- Taint Tracking: RASP engines mark user-supplied data as 'tainted' at entry points (HTTP parameters, headers, cookies) and detect when tainted data reaches dangerous sinks (SQL query builders, file path constructors, OS command executors) without sanitization
- Context-Aware Detection: Because RASP has access to the full call stack at the point of a potential attack, it can distinguish between legitimate application behavior and injected payloads with far lower false-positive rates than pattern-matching WAFs
- Blocking vs. Detection Mode: In blocking mode, the RASP agent terminates the offending request and returns an error; in detection mode, it logs the attack event and passes the request through — allowing teams to validate accuracy before enabling enforcement
- Defense in Depth Position: RASP is an inner ring of defense that complements perimeter controls (WAF, API gateway), not a replacement. It is most effective when integrated into a layered security architecture

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Runtime Application Self-Protection (RASP) to?
- What constraints or existing architecture do you need to work within?

## Implementation Steps

1. **Instrument the application runtime**: integrate a RASP agent (via JVM agent, .NET profiler API, native library injection, or language-specific module) that hooks into security-sensitive operations such as SQL query execution, file system access, deserialization, and OS command execution
2. **Define detection rules for RASP sensors**: configure which runtime events constitute attack indicators — SQL injection (tainted input in query string), path traversal (user-controlled file path segments), SSRF (user-controlled URL in outbound HTTP calls) — and set initial sensor mode to 'detect only'
3. **Validate detection accuracy in staging**: run the RASP agent against automated test suites and penetration test payloads in a non-production environment; tune false positive thresholds before enabling blocking mode to avoid impacting legitimate traffic
4. Enable blocking mode for high-confidence sensors: switch SQL injection, command injection, and deserialization sensors to block mode in production; leave lower-confidence sensors in detect-only mode and route alerts to SIEM for human triage
5. Integrate RASP telemetry into the security operations workflow: pipe RASP attack events into your SIEM/SOAR platform, correlate with WAF and network IDS signals, and define escalation playbooks for each attack category detected by the runtime agent

<details><summary>中文步骤</summary>

1. 对应用运行时进行埋点：集成RASP代理（通过JVM代理、.NET分析器API、原生库注入或特定语言模块），钩入安全敏感操作，如SQL查询执行、文件系统访问、反序列化和操作系统命令执行
2. 为RASP传感器定义检测规则：配置哪些运行时事件构成攻击指标——SQL注入（查询字符串中的污点输入）、路径遍历（用户控制的文件路径段）、SSRF（出站HTTP调用中用户控制的URL）——并将初始传感器模式设置为「仅检测」
3. 在预发布环境验证检测准确性：在非生产环境中对自动化测试套件和渗透测试载荷运行RASP代理；在启用阻止模式以避免影响合法流量之前，调整误报阈值
4. 对高置信度传感器启用阻止模式：在生产中将SQL注入、命令注入和反序列化传感器切换到阻止模式；将低置信度传感器保留在仅检测模式并将告警路由到SIEM进行人工分类
5. 将RASP遥测集成到安全运营工作流：将RASP攻击事件输入SIEM/SOAR平台，与WAF和网络IDS信号关联，并为运行时代理检测到的每个攻击类别定义升级剧本

</details>

## Do

- Do start RASP in detection-only mode and run it through a full regression and load test before enabling blocking — a false positive in blocking mode can take down production traffic
- Do correlate RASP events with WAF and SIEM data to build a complete picture of attacker behavior; RASP events that reach the runtime often indicate WAF bypasses worth investigating
- Do measure the RASP agent's performance overhead in production-representative load tests; accept up to 5% overhead as reasonable, escalate to the vendor if overhead exceeds 10%
- Do use RASP as a compensating control during zero-day vulnerability windows — it buys time to test and deploy patches without leaving systems fully exposed

## Don't

- Don't treat RASP as a substitute for secure coding practices — it is a safety net for exploitation attempts, not a license to write vulnerable code
- Don't enable blocking mode for all sensors simultaneously in production — start with the highest-confidence, lowest-false-positive sensors (SQL injection, command injection) and expand gradually
- Don't ignore RASP agent updates — the agent's detection rules must stay current with new attack patterns; an outdated RASP agent provides a false sense of security
- Don't underestimate the vendor lock-in risk — RASP agents are deeply integrated with the application runtime; migrating between vendors requires re-testing all detection and blocking rules

## Case Study

**Capital One**: Capital One deployed Contrast Security's RASP agent across their Java-based banking microservices following the 2019 Capital One breach (caused by a misconfigured WAF, not an application vulnerability). As a compensating control during the Log4Shell (CVE-2021-44228) zero-day in December 2021, their RASP agents detected and blocked JNDI lookup injection attempts in real time across their application fleet within hours of the CVE publication — before patched Log4j versions were validated and deployed. Their security team credited RASP detection telemetry with providing definitive proof that no successful exploitation occurred during the vulnerability window.

## Related Frameworks

- waf-patterns (related)
- defense-in-depth (related)
- owasp-top-10 (related)
- security-by-design (related)
- threat-modeling-stride (related)

## Source

https://sdframe.caldis.me/frameworks/runtime-application-self-protection
