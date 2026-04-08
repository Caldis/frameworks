# Design Thinking / 设计思考

Mental models, philosophies, and thinking tools for approaching software design problems.

用于思考软件设计问题的心智模型、设计哲学和思维工具。

**23 frameworks** in this category.

## Frameworks

### Design Thinking (IDEO/Stanford d.school) / 设计思维（IDEO/斯坦福模型）
- **Slug**: design-thinking-ideo
- **Complexity**: beginner
- **Quality**: usability
- **Author**: David Kelley / Tim Brown (IDEO) & Hasso Plattner Institute of Design at Stanford, 2005
- Human-centered 5-stage empathy-to-test design process

### Domain-Driven Design (DDD) / 领域驱动设计
- **Slug**: domain-driven-design
- **Complexity**: advanced
- **Quality**: maintainability
- **Author**: Eric Evans, 2003
- Model software around core business domain language and logic

### Systems Thinking / 系统思维
- **Slug**: systems-thinking
- **Complexity**: intermediate
- **Quality**: maintainability, reliability
- **Author**: Donella Meadows / Jay Forrester (MIT), 1950s-1990s
- Analyze software as interconnected feedback loops, not parts

### Jobs-to-Be-Done (JTBD) / 待完成任务理论
- **Slug**: jobs-to-be-done
- **Complexity**: intermediate
- **Quality**: usability
- **Author**: Clayton Christensen / Tony Ulwick, 1990s-2003
- Frame user needs as functional, social, emotional 'jobs'

### First Principles Thinking / 第一性原理思维
- **Slug**: first-principles-thinking
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Aristotle (classical origin); popularized in tech by Elon Musk, 2002-present
- Decompose problems to foundational truths, then rebuild up

### Design by Contract (DbC) / 契约式设计
- **Slug**: design-by-contract
- **Complexity**: intermediate
- **Quality**: reliability, testability
- **Author**: Bertrand Meyer, 1986
- Define explicit preconditions, postconditions, invariants per unit

### Cynefin Framework / 库内文框架
- **Slug**: cynefin-framework
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Dave Snowden, 1999
- Categorize problems into Simple, Complicated, Complex, Chaotic

### Wardley Mapping / 沃德利地图
- **Slug**: wardley-mapping
- **Complexity**: advanced
- **Quality**: maintainability, scalability
- **Author**: Simon Wardley, 2005
- Visualize value chains by evolution stage to drive strategy

### Problem Framing (How-Now-Wow Matrix) / 问题框架化（如何-现在-哇矩阵）
- **Slug**: problem-framing-how-now-wow
- **Complexity**: beginner
- **Quality**: usability
- **Author**: The Gamestorming community / Dave Gray, Sunni Brown, James Macanufo, 2010
- Frame and prioritize ideas by feasibility and originality axes

### Six Thinking Hats / 六顶思考帽
- **Slug**: six-thinking-hats
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Edward de Bono, 1985
- Parallel thinking method using 6 cognitive perspective modes

### Analogical Thinking / 类比思维
- **Slug**: analogical-thinking
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Dedre Gentner, 1983 (Structure-Mapping Theory); broadly rooted in cognitive science
- Transfer structural solutions from source domains to software

### Human-AI Interaction Design (HAI) / 人机交互设计（AI时代）
- **Slug**: human-ai-interaction-design
- **Complexity**: advanced
- **Quality**: usability, reliability
- **Author**: Microsoft Research / Saleema Amershi et al., 2019
- Design AI-augmented workflows balancing autonomy and control

### Agent-Oriented Design Thinking / 智能体导向设计思维
- **Slug**: agent-oriented-design-thinking
- **Complexity**: advanced
- **Quality**: reliability, scalability
- **Author**: Michael Wooldridge & Nicholas Jennings, 1995; extended by modern AI agent frameworks (LangChain, AutoGen, CrewAI), 2023
- Design multi-agent systems around roles, goals, and environments

### Trade-off Sliders Model / 权衡滑块模型
- **Slug**: trade-off-sliders
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Kent Beck (Extreme Programming) / SEI Architecture Trade-off Analysis Method (ATAM), late 1990s
- Make design trade-offs explicit by ranking competing qualities

### Complexity Budget / 复杂度预算
- **Slug**: complexity-budget
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: John Ousterhout, 2018
- Every module gets a complexity budget; exceed it and you must decompose

### Deep vs Shallow Modules / 深模块与浅模块
- **Slug**: deep-vs-shallow-modules
- **Complexity**: intermediate
- **Quality**: maintainability, usability
- **Author**: John Ousterhout, 2018
- Prefer deep modules (simple interface, complex implementation) over shallow ones (complex interface, simple implementation)

### Bounded Rationality in Design / 设计中的有限理性
- **Slug**: bounded-rationality-in-design
- **Complexity**: intermediate
- **Quality**: usability, maintainability
- **Author**: Herbert A. Simon, 1947/1996
- Designers satisfice rather than optimize; design for human cognitive limits rather than ideal rationality

### Separation of Concerns / 关注点分离
- **Slug**: separation-of-concerns
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: Edsger W. Dijkstra, 1974
- The foundational principle of modular design: each module should address a single, well-defined concern

### Leaky Abstractions / 抽象泄漏
- **Slug**: leaky-abstractions
- **Complexity**: intermediate
- **Quality**: reliability, maintainability
- **Author**: Joel Spolsky, 2002
- All non-trivial abstractions leak; design systems to handle the inevitable failures of abstraction layers

### Worse is Better / 更差即更好
- **Slug**: worse-is-better
- **Complexity**: intermediate
- **Quality**: maintainability, portability
- **Author**: Richard P. Gabriel, 1989
- Simpler, less correct implementations often win over complex, theoretically correct ones through easier adoption and faster evolution

### Occam's Razor in Design / 奥卡姆剃刀原则（设计应用）
- **Slug**: occams-razor-in-design
- **Complexity**: beginner
- **Quality**: maintainability
- **Author**: William of Ockham (c. 1287-1347); design application by various authors
- Among competing design solutions, prefer the simplest one that fully satisfies the requirements

### Architectural Kata / 架构卡塔
- **Slug**: architectural-kata
- **Complexity**: intermediate
- **Quality**: maintainability
- **Author**: Ted Neward, 2009
- Structured practice exercises where architects design systems for fictional scenarios to build architectural intuition and decision-making skills

### Theory of Constraints (TOC) / 约束理论（TOC）
- **Slug**: theory-of-constraints
- **Complexity**: intermediate
- **Quality**: performance, maintainability
- **Author**: Eliyahu M. Goldratt, 1984
- Identify and systematically exploit the binding constraint in a system to maximize throughput, then elevate or break it
