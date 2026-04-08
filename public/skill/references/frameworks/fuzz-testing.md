# Fuzz Testing / 模糊测试

- **Category**: quality
- **Complexity**: advanced
- **Quality**: security, reliability
- **Abstraction**: component
- **Maturity**: established
- **Author**: Barton Miller, 1990
- **Adopters**: Google (OSS-Fuzz, ClusterFuzz), Microsoft (Security Risk Detection), Apple (libFuzzer in Xcode), Mozilla (Firefox fuzzing), OpenSSF, LLVM/Clang project

Automated testing technique that feeds randomly generated, malformed, or unexpected inputs to a program to discover crashes, security vulnerabilities, and undefined behaviour.

_向程序输入随机生成、畸形或意外数据的自动化测试技术，用于发现崩溃、安全漏洞和未定义行为。_

## When to Use

Apply this framework when:
- Libraries and services that parse untrusted external data — file formats, network protocols, serialization formats, APIs — where unexpected input can trigger memory corruption, crashes, or security vulnerabilities
- Security-critical codebases in C, C++, or Rust where memory safety bugs (buffer overflows, use-after-free, integer overflows) carry high severity and traditional unit testing cannot exhaustively cover the input space
- Before releasing a new parser, codec, or protocol implementation to production where the cost of a post-release CVE or crash significantly exceeds the investment in pre-release fuzzing
- Continuous integration pipelines for open-source projects and critical infrastructure where OSS-Fuzz integration or ClusterFuzz can run fuzzing at scale between releases

## When NOT to Use

Stop and reconsider if:
- Pure business logic and domain rule validation where all inputs are structured, pre-validated, and the attack surface consists of logical correctness rather than parsing or memory safety
- Systems written in memory-safe languages (Python, JavaScript, Java, Go with GC) where the primary vulnerability class being targeted is not applicable and fuzzing discovers logic bugs more slowly than directed testing
- UI and end-to-end workflows where the state space is too large and input space too structured for random mutation to exercise meaningful code paths — BDD and scenario-based testing are more appropriate
- Early-stage prototypes where the code structure changes frequently enough that maintaining fuzz harnesses and seed corpora represents overhead disproportionate to code stability

## Core Concepts

- Coverage-Guided Fuzzing: the fuzzer instruments the binary to measure which code paths each input exercises; mutations that increase code coverage are retained in the corpus, enabling the fuzzer to progressively discover deeper and rarer code paths through feedback-driven mutation
- Fuzz Harness: a thin wrapper function that translates raw fuzzer-provided bytes into a structured call to the target function; the quality of the harness determines the fuzzing depth — a poor harness limits the fuzzer to shallow input parsing
- Corpus and Seed Inputs: a corpus of valid example inputs bootstraps coverage by giving the fuzzer a starting point that already exercises non-trivial code paths; seed quality directly affects time-to-first-crash on complex parsers
- Sanitizers: fuzz testing is most effective when combined with AddressSanitizer (ASan), UndefinedBehaviourSanitizer (UBSan), and MemorySanitizer — these instrument the binary to detect memory safety violations that do not cause immediate crashes, dramatically increasing bug discovery rate

## Before You Start

Ask the user about their specific context:
- What is the scope of the system you are applying Fuzz Testing to?
- What constraints or existing architecture do you need to work within?
- Has your team used Fuzz Testing before? (This is an advanced framework)

## Implementation Steps

1. **Define the fuzzing target**: identify the parsing, deserialization, or input-processing functions that consume untrusted external input and are most likely to contain memory safety bugs or crash paths
2. **Choose a fuzzing strategy and tool**: coverage-guided fuzzers (AFL++, libFuzzer, Jazzer) are most effective for complex input formats; generation-based fuzzers (Hypothesis, Atheris) are better for structured protocols and API fuzzing
3. **Write a fuzz harness**: a small entry-point function that accepts raw bytes from the fuzzer engine and feeds them to the target function; the harness must not crash on arbitrary input — crashes indicate bugs, not expected harness behaviour
4. Run the fuzzer with an initial corpus of valid example inputs to seed coverage; let it run for an extended period (hours to days) to allow the feedback-driven mutation engine to explore deep code paths
5. **Triage discovered crashes**: reproduce each crash with the minimised input, identify the root cause (buffer overflow, use-after-free, integer overflow, panic), file a bug with the crash input attached, and add the crashing input to the regression corpus

<details><summary>中文步骤</summary>

1. 定义模糊测试目标：识别消耗不可信外部输入的解析、反序列化或输入处理函数，这些函数最有可能包含内存安全漏洞或崩溃路径
2. 选择模糊测试策略和工具：覆盖率引导的模糊器（AFL++、libFuzzer、Jazzer）对复杂输入格式最有效；基于生成的模糊器（Hypothesis、Atheris）更适合结构化协议和 API 模糊测试
3. 编写模糊测试驱动：一个小型入口函数，接受来自模糊器引擎的原始字节并将其输入目标函数；驱动不能因任意输入而崩溃——崩溃表示存在 bug，而非预期的驱动行为
4. 使用有效示例输入的初始语料库运行模糊器以播种覆盖率；让其运行较长时间（数小时至数天），允许反馈驱动的变异引擎探索深层代码路径
5. 对发现的崩溃进行分类：用最小化输入复现每个崩溃，识别根本原因（缓冲区溢出、释放后使用、整数溢出、panic），提交附带崩溃输入的 bug，并将崩溃输入添加到回归语料库

</details>

## Do

- Do always run fuzzers with memory safety sanitizers enabled (AddressSanitizer, UndefinedBehaviourSanitizer) — without sanitizers, many memory corruption bugs cause no visible crash and go undetected
- Do minimise crashing inputs using the fuzzer's corpus minimisation tool before filing bugs — a 3-byte reproducer is far more useful for debugging than a 50KB input that triggers the same crash
- Do maintain a seed corpus of valid, structurally diverse example inputs and commit it to source control — seed quality has the largest single impact on time-to-discover-first-unique-bug on complex parsers
- Do integrate fuzzing into CI with a time-limited run (5-10 minutes) to catch regressions, supplemented by long overnight or continuous cloud-based fuzzing campaigns for deeper exploration

## Don't

- Do not fuzz without a harness that properly initialises all global and thread-local state — uninitialised state causes false positive crashes that mislead triage and waste debugging time
- Do not treat a crash as confirmed until you have reproduced it deterministically with the minimised input on a clean build — transient crashes from race conditions or heap ASLR interference require special handling
- Do not limit fuzzing to only the happy-path entry points — the most security-critical bugs are found in error handling, boundary conditions, and rarely-exercised code paths that only receive malformed inputs
- Do not discard crashing inputs after fixing the bug — add them to the regression corpus so future fuzzing campaigns continue from the known boundary rather than rediscovering the same fixed bug

## Case Study

**Google**: Google launched OSS-Fuzz in 2016 to provide continuous free fuzzing infrastructure for critical open-source projects integrated into the broader software supply chain. By 2024, OSS-Fuzz had fuzzed over 1,000 open-source projects and found over 10,000 vulnerabilities and bugs, including critical CVEs in OpenSSL, libpng, FFmpeg, FreeType, and dozens of other widely deployed libraries. Google's internal fuzzing infrastructure, ClusterFuzz, runs tens of billions of test cases per day across Chrome and Android. In Chrome specifically, fuzzing has been credited with finding approximately 25% of all security bugs before they reach users. The Chrome security team maintains over 1,500 fuzz targets covering parser, codec, and IPC code, and all new Chrome security-sensitive code is required to have an associated fuzz harness as a condition of code review approval.

## Related Frameworks

- property-based-testing (related)
- continuous-testing (complement)
- chaos-engineering (related)

## Source

https://sdframe.caldis.me/frameworks/fuzz-testing
