import type { Category } from '../types'

export const categories: Category[] = [
  { key: 'thinking', name: 'Design Thinking', name_zh: '设计思考', slug: 'thinking', colorBg: '#e8f5ee', colorText: '#2d6a4f', description: 'Mental models, philosophies, and thinking tools for approaching software design problems.', description_zh: '用于思考软件设计问题的心智模型、设计哲学和思维工具。' },
  { key: 'architecture', name: 'Architecture Decisions', name_zh: '架构决策', slug: 'architecture', colorBg: '#e8eef8', colorText: '#1a5276', description: 'Making and documenting architectural decisions — choosing patterns, evaluating trade-offs.', description_zh: '架构决策的制定与记录——模式选择、权衡评估、系统宏观结构。' },
  { key: 'coding', name: 'Coding Practices', name_zh: '编码实践', slug: 'coding', colorBg: '#ede8f8', colorText: '#6c3483', description: 'Implementation-level design — structuring code, managing complexity, writing maintainable software.', description_zh: '实现层面的设计——代码结构、复杂性管理、可维护软件编写。' },
  { key: 'quality', name: 'Quality Engineering', name_zh: '质量保障', slug: 'quality', colorBg: '#fce8e8', colorText: '#922b21', description: 'Testing strategies, reliability patterns, observability, and verification approaches.', description_zh: '测试策略、可靠性模式、可观测性与验证方法。' },
  { key: 'deployment', name: 'Deployment & Operations', name_zh: '部署运维', slug: 'deployment', colorBg: '#fdf3e3', colorText: '#7d6608', description: 'Deploying, operating, and running software systems in production.', description_zh: '软件系统的部署、运行与生产环境运维。' },
  { key: 'evolution', name: 'Evolution & Iteration', name_zh: '演进迭代', slug: 'evolution', colorBg: '#e8f8e8', colorText: '#1e8449', description: 'How software evolves — refactoring, tech debt, migration, team scaling.', description_zh: '软件演进——重构策略、技术债务、迁移模式、团队扩展。' },
  { key: 'ai', name: 'AI Collaboration', name_zh: 'AI 协作', slug: 'ai', colorBg: '#f8e8e3', colorText: '#a04000', description: 'Frameworks for the AI Agent era — human-AI collaboration, agent architecture, LLM application design.', description_zh: 'AI 智能体时代的框架——人机协作、智能体架构、大模型应用设计。' },
]

export function getCategoryByKey(key: string) {
  return categories.find(c => c.key === key)
}
