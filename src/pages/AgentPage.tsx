import { useState } from 'react'
import { useI18n } from '../i18n'
import { usePageMeta } from '../hooks/usePageMeta'
import { getAllFrameworks } from '../data/loader'
import { categories } from '../data/categories'
import styles from './AgentPage.module.css'

const BASE = 'https://sdframe.caldis.me'
const SKILL_URL = `${BASE}/skill/SKILL.md`
const CATALOG_URL = `${BASE}/skill/references/catalog.md`

export default function AgentPage() {
  const { locale } = useI18n()
  const zh = locale === 'zh'
  const total = getAllFrameworks().length

  usePageMeta(
    zh ? 'AI Agent 集成' : 'AI Agent Integration',
    zh
      ? `将 ${total} 个软件设计框架知识库接入你的 AI 工具`
      : `Integrate ${total} software design frameworks into your AI tools`
  )

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          {zh ? '接入你的 AI Agent' : 'Plug Into Your AI Agent'}
        </h1>
        <p className={styles.subtitle}>
          {zh
            ? `${total} 个软件设计框架，结构化为 AI 可消费的 Skill 包。不需要安装——给你的 AI 一个 URL 就行。`
            : `${total} software design frameworks, structured as an AI-consumable skill package. No install needed — just give your AI a URL.`}
        </p>
      </div>

      {/* Quick start */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {zh ? '最快上手' : 'Quickstart'}
        </h2>
        <p className={styles.sectionDesc}>
          {zh
            ? '复制下面这句话，粘贴给你的任何 AI 助手：'
            : 'Copy this prompt and paste it to any AI assistant:'}
        </p>
        <CopyBlock
          content={zh
            ? `请阅读 ${SKILL_URL} 作为你的技能指引，然后帮我选择适合我项目的软件设计框架。`
            : `Read ${SKILL_URL} as your skill guide, then help me select software design frameworks for my project.`}
          label={zh ? '复制提示词' : 'Copy prompt'}
        />
      </section>

      {/* Tool-specific guides */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {zh ? '工具集成指南' : 'Tool Integration Guide'}
        </h2>

        <ToolGuide
          name="Claude Code / Claude Desktop"
          icon="C"
          steps={zh ? [
            '在对话中直接发送上面的提示词',
            'Claude 会自动 fetch SKILL.md 并按流程引导你选型',
            '或者：将 SKILL.md 保存到你的 Claude Code skills 目录作为持久 skill',
          ] : [
            'Paste the prompt above directly in your conversation',
            'Claude will fetch SKILL.md and guide you through framework selection',
            'Or: save SKILL.md to your Claude Code skills directory as a persistent skill',
          ]}
        />

        <ToolGuide
          name="Cursor / Windsurf"
          icon=">"
          steps={zh ? [
            '在 Composer 或 Chat 中粘贴提示词',
            'AI 会读取 SKILL.md 并帮你分析项目需求、推荐框架',
            '持久化：将 SKILL.md 内容添加到项目的 .cursorrules 或 AGENTS.md',
          ] : [
            'Paste the prompt in Composer or Chat',
            'The AI will read SKILL.md and help analyze your project needs',
            'Persistent: add SKILL.md content to your .cursorrules or AGENTS.md',
          ]}
        />

        <ToolGuide
          name="ChatGPT / GPT-4"
          icon="G"
          steps={zh ? [
            '开启「浏览」功能，粘贴提示词',
            'GPT 会访问 URL 并按 Skill 流程引导选型',
            '如果浏览不可用：手动复制 SKILL.md 内容作为 system prompt',
          ] : [
            'Enable browsing, paste the prompt',
            'GPT will visit the URL and follow the skill protocol',
            'If browsing unavailable: manually copy SKILL.md content as system prompt',
          ]}
        />

        <ToolGuide
          name={zh ? '其他 AI 工具' : 'Other AI Tools'}
          icon="*"
          steps={zh ? [
            '任何能访问 URL 的 AI 都可以使用',
            '关键 URL: SKILL.md（交互协议）→ catalog.md（索引）→ frameworks/{slug}.md（详情）',
            'AI 不需要一次读取全部 317 个框架——按需逐步加载',
          ] : [
            'Any AI with URL access can use this',
            'Key URLs: SKILL.md (protocol) → catalog.md (index) → frameworks/{slug}.md (details)',
            'The AI loads data progressively — no need to read all 317 frameworks at once',
          ]}
        />
      </section>

      {/* Skill package contents */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {zh ? 'Skill 包内容' : 'Skill Package Contents'}
        </h2>

        <div className={styles.fileList}>
          <FileRow
            path="SKILL.md"
            desc={zh ? '元 Skill — 两种模式的交互协议（选型 + 应用）' : 'Meta skill — two-mode interaction protocol (selection + application)'}
            url={SKILL_URL}
          />
          <FileRow
            path="references/catalog.md"
            desc={zh ? `${total} 个框架索引，支持按维度过滤` : `${total} framework index, filterable by dimensions`}
            url={CATALOG_URL}
          />
          <FileRow
            path="references/categories/*.md"
            desc={zh ? `${categories.length} 个分类概览` : `${categories.length} category overviews`}
            url={`${BASE}/skill/references/categories/`}
          />
          <FileRow
            path="references/frameworks/*.md"
            desc={zh ? `${total} 个框架的完整 Skill reference` : `${total} individual framework skill references`}
            url={`${BASE}/skill/references/frameworks/`}
          />
        </div>
      </section>

      {/* How it works */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {zh ? '工作原理' : 'How It Works'}
        </h2>
        <div className={styles.flow}>
          <FlowStep n={1} title={zh ? '发现' : 'Discover'} desc={zh ? 'AI 读取 SKILL.md，了解自己能做什么' : 'AI reads SKILL.md, learns what it can do'} />
          <span className={styles.flowArrow}>&rarr;</span>
          <FlowStep n={2} title={zh ? '澄清' : 'Clarify'} desc={zh ? 'AI 反问用户：系统类型、质量要求、复杂度' : 'AI asks back: system type, quality needs, complexity'} />
          <span className={styles.flowArrow}>&rarr;</span>
          <FlowStep n={3} title={zh ? '检索' : 'Search'} desc={zh ? '从 catalog.md 按维度过滤候选' : 'Filter candidates from catalog.md by dimensions'} />
          <span className={styles.flowArrow}>&rarr;</span>
          <FlowStep n={4} title={zh ? '推荐' : 'Recommend'} desc={zh ? '读取 top 3 详情，对比后给出方案' : 'Read top 3 details, compare and recommend'} />
        </div>
      </section>
    </div>
  )
}

/* ── Sub-components ── */

function CopyBlock({ content, label }: { content: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className={styles.copyBlock}>
      <pre className={styles.copyText}>{content}</pre>
      <button className={styles.copyBtn} onClick={handleCopy}>
        {copied ? '✓' : label}
      </button>
    </div>
  )
}

function ToolGuide({ name, icon, steps }: { name: string; icon: string; steps: string[] }) {
  return (
    <div className={styles.toolCard}>
      <div className={styles.toolHeader}>
        <span className={styles.toolIcon}>{icon}</span>
        <span className={styles.toolName}>{name}</span>
      </div>
      <ol className={styles.toolSteps}>
        {steps.map((s, i) => <li key={i}>{s}</li>)}
      </ol>
    </div>
  )
}

function FileRow({ path, desc, url }: { path: string; desc: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.fileRow}>
      <code className={styles.filePath}>{path}</code>
      <span className={styles.fileDesc}>{desc}</span>
    </a>
  )
}

function FlowStep({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className={styles.flowStep}>
      <span className={styles.flowN}>{n}</span>
      <span className={styles.flowTitle}>{title}</span>
      <span className={styles.flowDesc}>{desc}</span>
    </div>
  )
}
