#!/usr/bin/env python3
"""Add viz_labels and viz_labels_zh to all frameworks in four category files."""
import json
import copy

# ============================================================
# QUALITY (25 frameworks)
# ============================================================
QUALITY_LABELS = {
    "test-pyramid": {
        "viz_type": "pyramid",  # keep
        "viz_labels": ["Unit Tests", "Integration", "E2E"],
        "viz_labels_zh": ["单元测试", "集成测试", "端到端"],
    },
    "testing-trophy": {
        "viz_type": "pyramid",  # keep — trophy shape is a variant of pyramid
        "viz_labels": ["Static", "Unit", "Integration", "E2E"],
        "viz_labels_zh": ["静态分析", "单元测试", "集成测试", "端到端"],
    },
    "tdd": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Red", "Green", "Refactor"],
        "viz_labels_zh": ["红灯", "绿灯", "重构"],
    },
    "bdd": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Given", "When", "Then"],
        "viz_labels_zh": ["前置条件", "触发动作", "预期结果"],
    },
    "property-based-testing": {
        "viz_type": "radar",  # keep
        "viz_labels": ["Properties", "Generators", "Shrinking", "Coverage", "Invariants"],
        "viz_labels_zh": ["属性定义", "生成器", "收缩", "覆盖率", "不变量"],
    },
    "chaos-engineering": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Hypothesize", "Experiment", "Observe", "Improve"],
        "viz_labels_zh": ["建立假设", "注入故障", "观测结果", "持续改进"],
    },
    "circuit-breaker-pattern": {
        "viz_type": "flow",  # keep — state transitions
        "viz_labels": ["Closed", "Open", "Half-Open"],
        "viz_labels_zh": ["关闭态", "断开态", "半开态"],
    },
    "bulkhead-pattern": {
        "viz_type": "matrix",  # keep
        "viz_labels": ["Service A", "Service B", "Service C", "Isolation"],
        "viz_labels_zh": ["服务A", "服务B", "服务C", "隔离舱"],
    },
    "use-method": {
        "viz_type": "matrix",  # keep
        "viz_labels": ["Utilization", "Saturation", "Errors"],
        "viz_labels_zh": ["利用率", "饱和度", "错误率"],
    },
    "red-method": {
        "viz_type": "radar",  # keep
        "viz_labels": ["Rate", "Errors", "Duration"],
        "viz_labels_zh": ["请求速率", "错误率", "响应时延"],
    },
    "four-golden-signals": {
        "viz_type": "radar",  # keep
        "viz_labels": ["Latency", "Traffic", "Errors", "Saturation"],
        "viz_labels_zh": ["延迟", "流量", "错误", "饱和度"],
    },
    "llm-evaluation-framework": {
        "viz_type": "radar",  # keep
        "viz_labels": ["Accuracy", "Safety", "Latency", "Cost", "Coherence"],
        "viz_labels_zh": ["准确性", "安全性", "延迟", "成本", "连贯性"],
    },
    "ai-output-verification": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Generate", "Validate", "Filter", "Deliver"],
        "viz_labels_zh": ["生成", "验证", "过滤", "交付"],
    },
    "agent-reliability-patterns": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Plan", "Execute", "Retry", "Fallback"],
        "viz_labels_zh": ["规划", "执行", "重试", "回退"],
    },
    "prompt-testing": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Write", "Evaluate", "Refine", "Regression"],
        "viz_labels_zh": ["编写提示", "评估输出", "优化提示", "回归测试"],
    },
    "mutation-testing": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Mutate", "Run Tests", "Detect", "Score"],
        "viz_labels_zh": ["变异代码", "运行测试", "检测", "评分"],
    },
    "snapshot-testing": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Render", "Snapshot", "Compare", "Update"],
        "viz_labels_zh": ["渲染", "快照", "对比", "更新"],
    },
    "load-testing-patterns": {
        "viz_type": "matrix",  # keep
        "viz_labels": ["Load Test", "Stress Test", "Spike Test", "Soak Test"],
        "viz_labels_zh": ["负载测试", "压力测试", "峰值测试", "浸泡测试"],
    },
    "error-handling-patterns": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Detect", "Handle", "Recover", "Log"],
        "viz_labels_zh": ["检测", "处理", "恢复", "记录"],
    },
    "observability-driven-development": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Instrument", "Emit", "Query", "Act"],
        "viz_labels_zh": ["埋点", "上报", "查询", "响应"],
    },
    "continuous-testing": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Commit", "Build", "Test", "Report"],
        "viz_labels_zh": ["提交", "构建", "测试", "报告"],
    },
    "visual-regression-testing": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Baseline", "Capture", "Diff", "Approve"],
        "viz_labels_zh": ["基准截图", "当前截图", "差异对比", "审核通过"],
    },
    "pact-contract-testing": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Consumer", "Pact", "Provider", "Verify"],
        "viz_labels_zh": ["消费方", "契约", "提供方", "验证"],
    },
    "fuzz-testing": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Seed", "Mutate", "Execute", "Triage"],
        "viz_labels_zh": ["种子输入", "变异生成", "执行", "问题分类"],
    },
    "accessibility-testing-wcag": {
        "viz_type": "pyramid",  # keep
        "viz_labels": ["A", "AA", "AAA"],
        "viz_labels_zh": ["A级", "AA级", "AAA级"],
    },
}

# ============================================================
# DEPLOYMENT (20 frameworks)
# ============================================================
DEPLOYMENT_LABELS = {
    "blue-green-deployment": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Blue Env", "Switch", "Green Env", "Rollback"],
        "viz_labels_zh": ["蓝环境", "流量切换", "绿环境", "快速回滚"],
    },
    "canary-deployment": {
        "viz_type": "flow",  # keep — progressive % rollout
        "viz_labels": ["Canary", "Monitor", "Expand", "Full Deploy"],
        "viz_labels_zh": ["金丝雀", "监控", "扩量", "全量发布"],
    },
    "feature-flags": {
        "viz_type": "tree",  # keep
        "viz_labels": ["Flag Store", "Targeting", "Rollout", "Override"],
        "viz_labels_zh": ["标志仓库", "定向规则", "发布比例", "强制覆盖"],
    },
    "gitops": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Commit", "Detect", "Reconcile", "Deploy"],
        "viz_labels_zh": ["代码提交", "变更检测", "状态同步", "部署"],
    },
    "dora-metrics": {
        "viz_type": "radar",  # keep
        "viz_labels": ["Deploy Freq", "Lead Time", "MTTR", "Change Fail Rate"],
        "viz_labels_zh": ["部署频率", "交付前置时间", "故障恢复时间", "变更失败率"],
    },
    "calms-framework": {
        "viz_type": "pyramid",  # consider hexgrid — CALMS pillars are parallel, not hierarchical
        # Changing to radar — 5 equal dimensions
        "viz_type_new": "radar",
        "viz_labels": ["Culture", "Automation", "Lean", "Measurement", "Sharing"],
        "viz_labels_zh": ["文化", "自动化", "精益", "度量", "分享"],
    },
    "three-ways-devops": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Flow", "Feedback", "Learning"],
        "viz_labels_zh": ["流动", "反馈", "持续学习"],
    },
    "infrastructure-as-code": {
        "viz_type": "tree",  # keep
        "viz_labels": ["Code", "Plan", "Apply", "State"],
        "viz_labels_zh": ["声明代码", "变更计划", "执行应用", "状态管理"],
    },
    "twelve-factor-app": {
        "viz_type": "pyramid",  # keep — but hexgrid could also work
        "viz_labels": ["Build", "Release", "Run"],
        "viz_labels_zh": ["构建", "发布", "运行"],
    },
    "sli-slo-sla": {
        "viz_type": "pyramid",  # keep — SLI→SLO→SLA hierarchy
        "viz_labels": ["SLI", "SLO", "SLA"],
        "viz_labels_zh": ["服务指标", "服务目标", "服务协议"],
    },
    "mlops": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Develop", "Train", "Deploy", "Monitor"],
        "viz_labels_zh": ["开发", "训练", "部署", "监控"],
    },
    "llmops": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Prompt", "Evaluate", "Fine-tune", "Deploy"],
        "viz_labels_zh": ["提示工程", "评估", "微调", "部署"],
    },
    "agent-deployment-patterns": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Orchestrate", "Invoke", "Observe", "Scale"],
        "viz_labels_zh": ["编排", "调用", "观测", "扩缩容"],
    },
    "progressive-delivery": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Feature Flag", "Canary", "A/B Test", "Full Release"],
        "viz_labels_zh": ["功能标志", "金丝雀", "A/B测试", "全量发布"],
    },
    "immutable-infrastructure": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Image Build", "Provision", "Replace", "Retire"],
        "viz_labels_zh": ["镜像构建", "预置", "替换", "下线"],
    },
    "chaos-engineering-practices": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Steady State", "Inject", "Observe", "Restore"],
        "viz_labels_zh": ["稳态基准", "注入故障", "观测", "恢复"],
    },
    "platform-as-a-product": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Discover", "Build", "Deliver", "Measure"],
        "viz_labels_zh": ["需求发现", "平台构建", "交付使用", "效果度量"],
    },
    "feature-environments": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Branch", "Spin Up", "Test", "Tear Down"],
        "viz_labels_zh": ["功能分支", "环境创建", "测试验证", "环境销毁"],
    },
    "deployment-stamps-pattern": {
        "viz_type": "matrix",  # keep
        "viz_labels": ["Region A", "Region B", "Stamp Config", "Routing"],
        "viz_labels_zh": ["区域A", "区域B", "印模配置", "路由"],
    },
    "iac-maturity-model": {
        "viz_type": "pyramid",  # keep
        "viz_labels": ["Manual", "Scripted", "Automated", "Policy-Driven"],
        "viz_labels_zh": ["手动操作", "脚本化", "自动化", "策略驱动"],
    },
}

# ============================================================
# EVOLUTION (21 frameworks)
# ============================================================
EVOLUTION_LABELS = {
    "strangler-fig-pattern": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Legacy", "Facade", "New Service", "Decommission"],
        "viz_labels_zh": ["遗留系统", "外观层", "新服务", "下线旧系统"],
    },
    "branch-by-abstraction": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Abstraction", "Old Impl", "New Impl", "Switch"],
        "viz_labels_zh": ["抽象层", "旧实现", "新实现", "切换"],
    },
    "parallel-run": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Input", "Old Path", "New Path", "Compare"],
        "viz_labels_zh": ["输入", "旧路径", "新路径", "结果对比"],
    },
    "technical-debt-quadrant": {
        "viz_type": "quadrant",  # change from matrix to quadrant — it's a 2x2 with axes
        "viz_type_new": "quadrant",
        "viz_labels": ["Reckless", "Prudent", "Deliberate", "Inadvertent"],
        "viz_labels_zh": ["鲁莽", "谨慎", "刻意", "无意"],
    },
    "architectural-fitness-functions": {
        "viz_type": "radar",  # keep
        "viz_labels": ["Scalability", "Security", "Reliability", "Performance", "Maintainability"],
        "viz_labels_zh": ["可扩展性", "安全性", "可靠性", "性能", "可维护性"],
    },
    "conways-law": {
        "viz_type": "venn",  # keep
        "viz_labels": ["Team Structure", "System Design"],
        "viz_labels_zh": ["团队结构", "系统设计"],
    },
    "inverse-conway-maneuver": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Target Arch", "Org Design", "Team Align", "System"],
        "viz_labels_zh": ["目标架构", "组织设计", "团队对齐", "系统演进"],
    },
    "team-topologies": {
        "viz_type": "tree",  # keep
        "viz_labels": ["Stream-Aligned", "Platform", "Enabling", "Subsystem"],
        "viz_labels_zh": ["流动对齐团队", "平台团队", "赋能团队", "复杂子系统"],
    },
    "database-migration-patterns": {
        "viz_type": "timeline",  # keep
        "viz_labels": ["Schema v1", "Expand", "Migrate Data", "Contract"],
        "viz_labels_zh": ["初始模式", "扩展字段", "迁移数据", "收缩旧字段"],
    },
    "ai-assisted-refactoring": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Analyze", "Suggest", "Apply", "Verify"],
        "viz_labels_zh": ["分析代码", "AI建议", "应用变更", "验证"],
    },
    "continuous-architecture": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Decide", "Implement", "Evaluate", "Adapt"],
        "viz_labels_zh": ["架构决策", "实施", "评估", "适应演进"],
    },
    "evolutionary-agent-systems": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Deploy", "Observe", "Retrain", "Evolve"],
        "viz_labels_zh": ["部署", "观测", "重训练", "演化"],
    },
    "mikado-method": {
        "viz_type": "tree",  # keep
        "viz_labels": ["Goal", "Prerequisite", "Leaf Node", "Revert"],
        "viz_labels_zh": ["目标变更", "前置条件", "叶子节点", "回滚"],
    },
    "evolutionary-database-design": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Migration", "Backward Compat", "Deploy", "Cleanup"],
        "viz_labels_zh": ["数据迁移", "向后兼容", "部署", "清理旧字段"],
    },
    "feature-branch-strategy": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Branch", "Develop", "Review", "Merge"],
        "viz_labels_zh": ["功能分支", "开发", "代码审查", "合并"],
    },
    "deprecation-strategy": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Announce", "Warn", "Sunset", "Remove"],
        "viz_labels_zh": ["宣告废弃", "警告期", "日落期", "移除"],
    },
    "living-documentation": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Code", "Generate", "Publish", "Review"],
        "viz_labels_zh": ["代码", "生成文档", "发布", "审阅"],
    },
    "fitness-function-driven-development": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Define", "Automate", "Measure", "Evolve"],
        "viz_labels_zh": ["定义函数", "自动化", "度量", "架构演化"],
    },
    "expansion-contraction-pattern": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Expand", "Dual Support", "Migrate", "Contract"],
        "viz_labels_zh": ["扩展阶段", "双写兼容", "迁移阶段", "收缩阶段"],
    },
    "adr-y-statements": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Context", "Decision", "Consequences", "Status"],
        "viz_labels_zh": ["背景", "决策", "后果", "状态"],
    },
    "monolith-decomposition-patterns": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Identify", "Extract", "Route", "Decommission"],
        "viz_labels_zh": ["识别边界", "提取服务", "路由切换", "下线模块"],
    },
}

# ============================================================
# AI (25 frameworks)
# ============================================================
AI_LABELS = {
    "react-framework": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Reason", "Act", "Observe"],
        "viz_labels_zh": ["推理", "行动", "观察"],
    },
    "rag-architecture": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Chunk", "Embed", "Retrieve", "Augment", "Generate"],
        "viz_labels_zh": ["分块", "向量化", "检索", "增强", "生成"],
    },
    "multi-agent-orchestration-pattern": {
        "viz_type": "tree",  # keep
        "viz_labels": ["Orchestrator", "Planner", "Worker", "Tool"],
        "viz_labels_zh": ["编排器", "规划器", "执行Agent", "工具"],
    },
    "human-in-the-loop": {
        "viz_type": "flow",  # keep
        "viz_labels": ["AI Output", "Human Review", "Approve", "Correct"],
        "viz_labels_zh": ["AI输出", "人工审核", "批准", "纠错"],
    },
    "prompt-chaining": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Prompt 1", "Output 1", "Prompt 2", "Final Output"],
        "viz_labels_zh": ["提示1", "输出1", "提示2", "最终输出"],
    },
    "ai-pair-programming": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Write", "Suggest", "Accept", "Iterate"],
        "viz_labels_zh": ["编写代码", "AI建议", "采纳", "迭代"],
    },
    "guardrails-framework": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Input Guard", "LLM", "Output Guard", "Response"],
        "viz_labels_zh": ["输入护栏", "大模型", "输出护栏", "响应"],
    },
    "context-window-management": {
        "viz_type": "pyramid",  # keep
        "viz_labels": ["System", "History", "Retrieved", "User Input"],
        "viz_labels_zh": ["系统提示", "历史对话", "检索内容", "用户输入"],
    },
    "tool-use-design-pattern": {
        "viz_type": "tree",  # keep
        "viz_labels": ["Agent", "Tool Router", "Tool A", "Tool B"],
        "viz_labels_zh": ["Agent", "工具路由", "工具A", "工具B"],
    },
    "ai-first-api-design": {
        "viz_type": "matrix",  # keep
        "viz_labels": ["Schema", "Context", "Actions", "Auth"],
        "viz_labels_zh": ["模式定义", "上下文", "可执行动作", "鉴权"],
    },
    "self-healing-systems": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Monitor", "Detect", "Diagnose", "Remediate"],
        "viz_labels_zh": ["监控", "检测", "诊断", "自动修复"],
    },
    "ai-observability-framework": {
        "viz_type": "radar",  # keep
        "viz_labels": ["Traces", "Metrics", "Evals", "Costs", "Safety"],
        "viz_labels_zh": ["链路追踪", "指标", "评估", "成本", "安全"],
    },
    "responsible-ai-design": {
        "viz_type": "radar",  # keep
        "viz_labels": ["Fairness", "Transparency", "Privacy", "Safety", "Accountability"],
        "viz_labels_zh": ["公平性", "透明度", "隐私", "安全", "问责"],
    },
    "agent-communication-protocol": {
        "viz_type": "matrix",  # keep
        "viz_labels": ["Message", "Protocol", "Agent A", "Agent B"],
        "viz_labels_zh": ["消息", "协议", "Agent A", "Agent B"],
    },
    "agentic-workflow-patterns": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Plan", "Execute", "Reflect", "Adapt"],
        "viz_labels_zh": ["规划", "执行", "反思", "适应"],
    },
    "model-context-protocol-mcp": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Client", "MCP Server", "Resource", "Tool"],
        "viz_labels_zh": ["客户端", "MCP服务器", "资源", "工具"],
    },
    "retrieval-augmented-fine-tuning-raft": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Dataset", "Distract Docs", "Fine-tune", "Evaluate"],
        "viz_labels_zh": ["训练数据", "干扰文档", "微调", "评估"],
    },
    "ai-safety-layers": {
        "viz_type": "pyramid",  # keep
        "viz_labels": ["Model Safety", "App Guard", "Infra", "Human"],
        "viz_labels_zh": ["模型安全", "应用护栏", "基础设施", "人工监管"],
    },
    "multimodal-pipeline-design": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Input", "Encode", "Fuse", "Generate"],
        "viz_labels_zh": ["多模态输入", "编码", "模态融合", "生成输出"],
    },
    "ai-cost-optimization": {
        "viz_type": "matrix",  # keep
        "viz_labels": ["Model Size", "Caching", "Batching", "Routing"],
        "viz_labels_zh": ["模型规模", "缓存策略", "批量处理", "智能路由"],
    },
    "semantic-caching": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Query", "Embed", "Cache Hit", "LLM Call"],
        "viz_labels_zh": ["查询", "向量化", "缓存命中", "模型调用"],
    },
    "ai-red-teaming": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Attack", "Evaluate", "Harden", "Retest"],
        "viz_labels_zh": ["攻击尝试", "评估漏洞", "加固防护", "回归测试"],
    },
    "ai-gateway-pattern": {
        "viz_type": "flow",  # keep
        "viz_labels": ["Client", "Gateway", "Auth/Rate", "Model"],
        "viz_labels_zh": ["客户端", "AI网关", "鉴权限流", "模型服务"],
    },
    "prompt-caching-strategies": {
        "viz_type": "matrix",  # keep
        "viz_labels": ["Static Cache", "Dynamic Cache", "Prefix", "TTL"],
        "viz_labels_zh": ["静态缓存", "动态缓存", "前缀缓存", "过期策略"],
    },
    "evaluation-driven-development": {
        "viz_type": "cycle",  # keep
        "viz_labels": ["Define Evals", "Build", "Run Evals", "Improve"],
        "viz_labels_zh": ["定义评估", "构建", "运行评估", "持续改进"],
    },
}

# Map of viz_type overrides
VIZ_TYPE_OVERRIDES = {
    "quality": {},
    "deployment": {
        "calms-framework": "radar",
    },
    "evolution": {
        "technical-debt-quadrant": "quadrant",
    },
    "ai": {},
}

ALL_LABELS = {
    "quality": QUALITY_LABELS,
    "deployment": DEPLOYMENT_LABELS,
    "evolution": EVOLUTION_LABELS,
    "ai": AI_LABELS,
}


def add_viz_labels(filepath, category):
    with open(filepath, encoding="utf-8") as f:
        data = json.load(f)

    labels_map = ALL_LABELS[category]
    overrides = VIZ_TYPE_OVERRIDES[category]
    modified = 0
    missing = []

    new_data = []
    for fw in data:
        slug = fw["slug"]
        if slug not in labels_map:
            missing.append(slug)
            new_data.append(fw)
            continue

        info = labels_map[slug]

        # Build new ordered dict with viz_labels inserted after viz_type
        new_fw = {}
        for key, val in fw.items():
            new_fw[key] = val
            if key == "viz_type":
                # Apply viz_type override if present
                if slug in overrides:
                    new_fw["viz_type"] = overrides[slug]
                    print(f"  CHANGED viz_type for {slug}: {val} -> {overrides[slug]}")
                new_fw["viz_labels"] = info["viz_labels"]
                new_fw["viz_labels_zh"] = info["viz_labels_zh"]

        new_data.append(new_fw)
        modified += 1

    print(f"{filepath}: modified {modified}/{len(data)} frameworks")
    if missing:
        print(f"  MISSING labels for: {missing}")

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(new_data, f, ensure_ascii=False, indent=2)
        f.write("\n")

    # Validate
    with open(filepath, encoding="utf-8") as f:
        json.load(f)  # Will raise if invalid
    print(f"  JSON validation OK")


if __name__ == "__main__":
    files = [
        ("data/frameworks/quality.json", "quality"),
        ("data/frameworks/deployment.json", "deployment"),
        ("data/frameworks/evolution.json", "evolution"),
        ("data/frameworks/ai.json", "ai"),
    ]
    for filepath, category in files:
        print(f"\n=== Processing {filepath} ===")
        add_viz_labels(filepath, category)
