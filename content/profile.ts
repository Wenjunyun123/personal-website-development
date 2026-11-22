export type SiteLanguage = "en" | "zh";
export type DeliveryStageKey = "intake" | "issue" | "build" | "verify" | "sync" | "evidence";
export type OperatingLayer = "business" | "agent" | "execution" | "governance" | "evidence";

export const deliveryStageOrder: DeliveryStageKey[] = ["intake", "issue", "build", "verify", "sync", "evidence"];
export const operatingLayerOrder: OperatingLayer[] = ["business", "agent", "execution", "governance", "evidence"];

export const profileCopy = {
  en: {
    nav: { home: "Profile", work: "Projects", system: "System Map" },
    status: "Shanghai · AI Application Delivery Engineer / FDE",
    identity: "Wenjun You",
    chineseName: "游文君",
    role: "AI Application Delivery Engineer (FDE)",
    thesis: "I turn ambiguous business needs into data and knowledge models, interfaces, agents, evaluations, and evidence-backed handoffs.",
    availability: "Open to AI application, FDE, Agent workflow, and plugin delivery opportunities.",
    launch: "Press Enter to inspect the delivery loop",
    viewResume: "View Resume",
    email: "Email Wenjun",
    heroSignals: ["AI application delivery", "Knowledge & data modeling", "Evaluation & acceptance", "Agent workflows"],
    loopKicker: "Flagship system / user-confirmed practice",
    loopTitle: "Lark CLI × GitHub CLI Delivery Loop",
    loopIntro: "A six-stage operating loop that carries a business request from a Lark record into a GitHub implementation, then returns PR, CI, and acceptance evidence to the original record.",
    inputLabel: "Input",
    actionLabel: "Execution",
    proofLabel: "Proof returned",
    loopNote: "The loop is designed around one rule: a task is not complete until its evidence returns to the business surface where it started.",
    projectCta: "Inspect the full project system",
    profileKicker: "$ open profile.yaml",
    profileTitle: "I build the connective tissue between AI capability and real operations.",
    profileIntro: "My work spans enterprise customer service, product knowledge engineering, data migration, product interfaces, Base automation, release governance, and the operational details that make Agent systems dependable.",
    featuredTitle: "Flagship Systems",
    experienceTitle: "Experience Ledger",
    skillsTitle: "Capability Stack",
    honorsTitle: "Education & Signals",
    contactTitle: "Build something that has to work outside the demo.",
    contactCopy: "For AI application, FDE, plugin delivery, or Agent workflow roles, start with the resume or send a concise problem statement.",
    practiceLabel: "Simulated business practice · implementation in progress",
    sourceLabel: "Resume-backed delivery evidence",
    otherProjectsTitle: "Additional delivery tracks",
    mapTitle: "FDE Operating Map",
    mapHint: "Select a layer · inspect the system boundary · follow the evidence",
    layers: "Operating layers",
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    systemLayers: {
      business: ["Business surface", "Events begin in real work", "Requests, tables, owners, thresholds, and permissions define the actual problem."],
      agent: ["Agent reasoning", "AI works inside constraints", "Knowledge, tools, role permissions, and trigger context shape every decision."],
      execution: ["Execution", "CLI turns decisions into action", "Lark CLI, GitHub CLI, Codex, APIs, and automation complete the operational work."],
      governance: ["Governance", "High-risk actions stay reviewable", "Approval gates, least privilege, retries, rollback, and exception handling reduce operational risk."],
      evidence: ["Evidence", "Every loop returns proof", "PR links, CI status, logs, ownership, timing, and acceptance results return to the source record."]
    }
  },
  zh: {
    nav: { home: "个人", work: "项目", system: "系统地图" },
    status: "上海 · AI 应用交付工程师（FDE）",
    identity: "游文君",
    chineseName: "Wenjun You",
    role: "AI 应用交付工程师（FDE）",
    thesis: "我把模糊业务需求拆成数据与知识模型、界面、智能体、自动化与评测验收，再用证据闭环到真实业务。",
    availability: "关注 AI 应用、FDE、Agent 工作流与插件交付机会。",
    launch: "按 Enter 检查交付闭环",
    viewResume: "查看简历",
    email: "邮件联系",
    heroSignals: ["AI 应用交付", "知识与数据建模", "评测与验收", "Agent 工作流"],
    loopKicker: "旗舰系统 / 用户确认实践",
    loopTitle: "飞书 CLI × GitHub CLI 交付闭环",
    loopIntro: "一条六阶段操作链：让业务需求从飞书记录进入 GitHub 实现，再把 PR、CI 与验收证据回写到最初的业务记录。",
    inputLabel: "输入",
    actionLabel: "执行",
    proofLabel: "回写证据",
    loopNote: "这套闭环只有一条完成标准：证据没有回到任务开始的业务界面，任务就不算完成。",
    projectCta: "查看完整项目系统",
    profileKicker: "$ open profile.yaml",
    profileTitle: "我构建 AI 能力与真实业务之间的连接层。",
    profileIntro: "我的实践横跨企业智能客服、产品知识工程、数据迁移、产品界面、飞书 Base 自动化、发布治理，以及让 Agent 系统真正可靠的操作细节。",
    featuredTitle: "旗舰系统",
    experienceTitle: "经历账本",
    skillsTitle: "能力栈",
    honorsTitle: "教育与能力信号",
    contactTitle: "一起构建必须走出演示环境的软件。",
    contactCopy: "如果你在寻找 AI 应用、FDE、插件交付或 Agent 工作流方向的人选，可以先看简历，或直接发来一段明确的问题描述。",
    practiceLabel: "模拟业务项目实践 · 实现与验证中",
    sourceLabel: "简历支撑的交付证据",
    otherProjectsTitle: "其他交付轨道",
    mapTitle: "FDE 操作系统地图",
    mapHint: "选择图层 · 检查系统边界 · 沿证据继续探索",
    layers: "操作图层",
    zoomOut: "缩小",
    zoomIn: "放大",
    systemLayers: {
      business: ["业务界面", "事件从真实工作中发生", "需求、表格、负责人、阈值和权限共同定义真实问题。"],
      agent: ["智能体推理", "AI 在约束中工作", "知识、工具、角色权限和触发上下文共同约束每次判断。"],
      execution: ["执行层", "CLI 把判断变成动作", "飞书 CLI、GitHub CLI、Codex、API 与自动化完成实际操作。"],
      governance: ["治理层", "高风险动作始终可审核", "审批门、最小权限、重试、回滚与异常处理降低运行风险。"],
      evidence: ["证据层", "每个闭环都必须返回证明", "PR 链接、CI 状态、日志、负责人、耗时与验收结果回到原始记录。"]
    }
  }
} as const;

export const deliveryStages = {
  en: {
    intake: { index: "01", short: "Lark intake", tool: "Lark CLI", title: "A business request becomes a structured record.", input: "Owner, urgency, acceptance criteria, repository, and business context.", action: "Lark CLI reads the record, validates required fields, and freezes the source task ID.", proof: "A traceable request record with a stable owner and acceptance boundary." },
    issue: { index: "02", short: "Issue", tool: "GitHub CLI", title: "The request enters the engineering system.", input: "Validated Lark task and repository routing rules.", action: "GitHub CLI creates or links an Issue with context, scope, labels, and acceptance checks.", proof: "Issue URL, number, assignee, labels, and source-record backlink." },
    build: { index: "03", short: "Build", tool: "Codex + Git", title: "The implementation runs in a focused branch.", input: "Approved Issue and repository-native commands.", action: "Agent/Codex creates a branch, implements the smallest complete slice, and preserves unrelated work.", proof: "Branch, focused diff, implementation notes, and changed-file inventory." },
    verify: { index: "04", short: "PR / CI", tool: "GitHub CLI", title: "Review and checks decide whether the work is done.", input: "Implementation diff and repository verification seams.", action: "Create PR, run lint/types/tests/build, surface failures, and close review findings.", proof: "PR URL, check results, review state, commit SHA, and residual risk." },
    sync: { index: "05", short: "Sync back", tool: "Lark CLI", title: "Engineering state returns to the business surface.", input: "GitHub PR metadata, CI results, and delivery summary.", action: "Lark CLI updates status, owner, links, blockers, and the next required action.", proof: "The original Lark record reflects the real repository state." },
    evidence: { index: "06", short: "Acceptance", tool: "Human + Agent", title: "The loop closes with evidence, not a verbal claim.", input: "Acceptance criteria, PR artifacts, runtime proof, and business validation.", action: "Record acceptance, exception, rollback, or follow-up and preserve an audit-ready handoff.", proof: "Accepted outcome, timestamp, evidence links, and accountable next owner." }
  },
  zh: {
    intake: { index: "01", short: "飞书受理", tool: "飞书 CLI", title: "业务需求先变成结构化记录。", input: "负责人、紧急程度、验收标准、代码仓库与业务上下文。", action: "飞书 CLI 读取记录、校验必填字段，并固定来源任务 ID。", proof: "一条可追踪、有明确负责人和验收边界的需求记录。" },
    issue: { index: "02", short: "创建 Issue", tool: "GitHub CLI", title: "需求进入工程系统。", input: "已校验的飞书任务与仓库路由规则。", action: "GitHub CLI 创建或关联 Issue，写入上下文、范围、标签和验收检查。", proof: "Issue 链接、编号、负责人、标签与飞书来源反链。" },
    build: { index: "03", short: "分支实现", tool: "Codex + Git", title: "在聚焦分支里完成最小闭环实现。", input: "已确认的 Issue 与仓库原生命令。", action: "Agent/Codex 创建分支、实现最小完整切片，并保护无关改动。", proof: "分支、聚焦 diff、实现说明与变更文件清单。" },
    verify: { index: "04", short: "PR / CI", tool: "GitHub CLI", title: "审核与检查决定工作是否完成。", input: "实现 diff 与仓库验证路径。", action: "创建 PR，运行 lint/types/tests/build，暴露失败并关闭审核意见。", proof: "PR 链接、检查结果、审核状态、commit SHA 与剩余风险。" },
    sync: { index: "05", short: "回写飞书", tool: "飞书 CLI", title: "工程状态返回业务界面。", input: "GitHub PR 元数据、CI 结果与交付摘要。", action: "飞书 CLI 更新状态、负责人、链接、阻塞项和下一步动作。", proof: "原始飞书记录与仓库真实状态保持一致。" },
    evidence: { index: "06", short: "验收归档", tool: "人工 + Agent", title: "用证据关闭闭环，而不是口头宣布完成。", input: "验收标准、PR 产物、运行证据与业务确认。", action: "记录验收、异常、回滚或后续任务，并保存可审计交接。", proof: "验收结果、时间、证据链接与明确的下一责任人。" }
  }
} as const;

export const profileStats = [
  ["60", "Public add-ons checked", "已读取公开插件"],
  ["62", "Adobe packages audited", "已审计 Adobe 包体"],
  ["16", "Office manifests generated", "批量生成 Office manifests"],
  ["3×", "Product-image throughput", "商品图生成效率"],
  ["−40%", "Manual handling cost", "人工处理成本"],
  ["≥70%", "Usable image rate", "商品图可用率"]
] as const;

export const featuredProjects = [
  {
    number: "01",
    slug: "lark-github-cli-delivery-loop",
    title: "Lark CLI × GitHub CLI Delivery Loop",
    titleZh: "飞书 CLI × GitHub CLI 交付闭环",
    label: "User-confirmed practice",
    labelZh: "用户确认实践",
    summary: "A traceable operating loop from Lark request intake to GitHub Issue, Agent implementation, PR/CI, and evidence written back to the source record.",
    summaryZh: "从飞书需求受理到 GitHub Issue、Agent 实现、PR/CI，再把交付证据回写来源记录的可追踪操作闭环。",
    proof: ["6 delivery stages", "PR + CI evidence", "bidirectional traceability"],
    proofZh: ["6 个交付阶段", "PR + CI 证据", "双向可追踪"]
  },
  {
    number: "02",
    slug: "lark-base-team-agent-commerce-ops",
    title: "Lark Base Team Agent for Commerce Operations",
    titleZh: "飞书多维表格 Team Agent 电商经营实践",
    label: "Simulated practice · in progress",
    labelZh: "模拟业务实践 · 实现中",
    summary: "A verifiable commerce experiment where Base agents monitor ROI, inventory days, and repurchase risk under role-based permissions and human approval.",
    summaryZh: "用模拟电商数据验证 ROI、库存天数与复购风险预警，并把角色权限、人工审批和审计记录纳入同一系统。",
    proof: ["3 event triggers", "4 permission roles", "action-card audit trail"],
    proofZh: ["3 类事件触发器", "4 类权限角色", "动作卡审计链"]
  },
  {
    number: "03",
    slug: "adobe-canva-release-command-center",
    title: "Adobe / Canva Release Governance",
    titleZh: "Adobe / Canva 插件发布治理",
    label: "Resume + GitHub evidence",
    labelZh: "简历 + GitHub 证据",
    summary: "A release-governance system for multi-platform plugin packages, manifests, review risk, source handoff, and queue truth.",
    summaryZh: "面向多平台插件包体、manifest、审核风险、源码交接与发布队列真源的治理系统。",
    proof: ["60 add-ons", "62-package audit", "16 manifests"],
    proofZh: ["60 个 add-ons", "62 个包体审计", "16 个 manifests"]
  }
] as const;

export const teamAgentEvents = [
  ["ROI", "< 2", "Notify the campaign owner and sync management with evidence.", "ROI", "< 2", "圈对应投放负责人，并向管理群同步证据摘要。"],
  ["Inventory days", "< 7", "Notify supply chain with affected SKUs and current sell-through.", "可售天数", "< 7", "通知供应链，附受影响 SKU 与当前销售速度。"],
  ["High-value customer", "30d inactive", "Create an operations follow-up record; outreach requires approval.", "高价值客户", "30 天未复购", "创建运营跟进记录；客户触达前必须人工确认。"]
] as const;

export const experienceItems = [
  {
    period: "2026.09 — 2026.11",
    company: "Guangzhou Negative Entropy Cloud Information Technology",
    companyZh: "广州市负熵云信息科技有限公司",
    role: "AI Application Delivery Engineer · FDE, client onsite",
    roleZh: "AI 应用交付工程师（FDE · 驻场客户现场）",
    summary: "Owned enterprise AI delivery across customer service, product knowledge, data migration, and business dashboards: average customer-service response fell from 74–78s to 52–55s, product-knowledge A/B median from 37s to 27s, and 2,041 migrated production-order records read back with 0 unexplained differences.",
    summaryZh: "驻场客户现场，交付企业智能客服、产品知识、数据迁移与业务看板：客服平均响应 74–78s 降到 52–55s，知识检索 A/B 中位 37→27s，2,041 条生产订单迁移后回读 0 项未解释差异。",
    evidence: ["74–78→52–55s CS avg", "37→27s knowledge A/B", "9.96s query desk", "0 migration differences"],
    bullets: [
      "驻场客户现场，负责企业协同、客服与知识管理场景的多个 AI 应用交付，覆盖智能客服、产品知识查询、证书查询、会议看板和多语言营销；与业务方对齐范围、验收标准和风险边界，从需求拆解、数据/知识建模、接口集成到评测验收和交接文档，独立推进项目落地。",
      "建设并持续优化智能客服“小灰”的 Udesk 外部智能体中间层（NestJS + React + PostgreSQL），补齐 SSE 流式输出、人工转接、幂等、限流、脱敏和观测；把 Webhook 签名校验从 warn 切到 enforce，保留回滚 SQL 与日志核验；配合运行档案与检索顺序优化，把平均响应从 74–78s 降到 52–55s，262 题扩展集保持 99.2% 正确，10 路同题隔日复测中位差 0.4s。",
      "先用逐题 JSONL、断点续跑和统一判定把平台成本与模型质量分开，再用 238 条 trace 定位入口排队（约 12.7–13.0s）、索引切片、46.5KB 上下文截断和二次回读；提出结构化索引、检索过滤、上下文裁剪与模板化文件交付，产品化查询台 UI 验收平均 9.96s、P95 14.46s，总耗时约为旧链路的 18.93%。",
      "完成 889 份产品文档结构化，产出 235 条 QA 与 184 张参数知识卡；受控 A/B 中位 37→27s、P90 51→37s、每题候选文件 9.8→1.1，并用 805 条真实 FAQ 校准知识覆盖，把知识工程从“调提示词”推进到数据抽取、检索粒度和客户口径。",
      "把委外生产订单 9 张表、2,041 条记录、38,819 个单元格、51 个公式字段和 5 条工作流迁入多维表格，保留原表 #N/A/#DIV/0! 与业务口径，全量回读 0 项未解释差异；交付会议经营看板与证书查询智能体，典型证书查询从 68s/3 次调用降到 17–26s/1 次。"
    ]
  },
  {
    period: "2026.03 — 2026.07",
    company: "Shanghai Yichong Technology",
    companyZh: "上海易宠科技有限公司",
    officeKey: "yichong",
    role: "AI Application Frontend Engineer",
    roleZh: "AI 应用开发前端工程师",
    summary: "Delivered Adobe Express, Canva, Office, and Safari plugin surfaces; governed package truth, release review, risk audits, and source handoff.",
    summaryZh: "覆盖 Adobe Express、Canva、Office 与 Safari 插件交付，并治理包体真源、发布审核、风险审计和源码交接。",
    evidence: ["60 public add-ons", "62 packages audited", "16 Office manifests"]
  },
  {
    period: "2025.10 — 2026.03",
    company: "Shanghai Yimu Furniture",
    companyZh: "上海怡沐家具用品有限公司",
    officeKey: "yimu",
    role: "AI Digital Operations Intern",
    roleZh: "AI 数字化运营实习生",
    summary: "Built a Lark Base + AI product-image workflow spanning intake, generation, human QA, state tracking, SOP, and training.",
    summaryZh: "搭建飞书多维表格 + AI 商品主图流程，覆盖需求、生成、人工质检、状态追踪、SOP 与培训。",
    evidence: ["3× throughput", "40% lower manual cost", "≥70% usable rate"]
  },
  {
    period: "2025.07 — 2025.10",
    company: "Shanghai Kaichun Industry · K.AI Lab",
    companyZh: "上海凯淳实业股份有限公司 · K.AI 智能实验室",
    officeKey: "kaytune",
    role: "AI Researcher Intern · Backend",
    roleZh: "AI 研究员实习生 · 后端方向",
    summary: "Built Python/SQL ETL, cleaning, storage, scheduling, and data-quality flows for AI product prototypes.",
    summaryZh: "使用 Python/SQL 构建 ETL、清洗、入库、调度和数据质量流程，支撑 AI 产品原型。",
    evidence: ["~30% processing efficiency gain", "multi-source ETL", "alerting design"]
  }
] as const;

export type ExperienceTimelineKind = "education" | "award" | "internship" | "work";

export const experienceTimeline = [
  {
    period: "2022.09",
    kind: "education" as ExperienceTimelineKind,
    kindLabel: "Education",
    kindLabelZh: "教育",
    title: "Freshman year · the undergraduate chapter begins",
    titleZh: "大一 · 本科阶段从这里开始",
    organization: "Shanghai Sanda University",
    organizationZh: "上海杉达学院",
    summary: "E-commerce undergraduate, later extending the curriculum with an Integrated Circuit Application Technology minor.",
    summaryZh: "进入电子商务本科，并以集成电路应用技术辅修补充工程与硬件视角。",
    evidence: [
      ["2022.09 — 2026.06", "2022.09 — 2026.06"],
      ["Major GPA 3.28 · top 15%", "主修 GPA 3.28 · 前 15%"],
      ["Minor GPA 3.5 · top 5%", "辅修 GPA 3.5 · 前 5%"]
    ]
  },
  {
    period: "2024",
    kind: "award" as ExperienceTimelineKind,
    kindLabel: "Award",
    kindLabelZh: "获奖",
    title: "Integrated Circuit Innovation Competition · Loongson Cup",
    titleZh: "集成电路创新大赛 · 龙芯杯",
    organization: "Level-1 Certification",
    organizationZh: "一级认证",
    summary: "The first dated competition milestone in the resume, connecting the business major with hands-on computing systems work.",
    summaryZh: "简历中首个有明确年份的竞赛节点，把电子商务主修与计算系统实践连接起来。",
    evidence: [["Level-1 certified", "一级认证"]]
  },
  {
    period: "2025",
    kind: "award" as ExperienceTimelineKind,
    kindLabel: "Awards",
    kindLabelZh: "获奖",
    title: "Three competition results across AI, chips, and writing",
    titleZh: "AI、芯片与写作三个方向的竞赛结果",
    organization: "National and provincial competitions",
    organizationZh: "全国及省级竞赛",
    summary: "AIGC IoT Cup First Prize, Phytium Cup Second Prize, and Provincial Second Prize in the undergraduate group of the National English Writing Competition.",
    summaryZh: "全国大学生高新技术竞赛 AIGC 物联杯一等奖、集成电路创新大赛飞腾杯二等奖、全国英语作文大赛本科组省二等奖。",
    evidence: [
      ["AIGC IoT Cup · 1st", "AIGC 物联杯 · 一等奖"],
      ["Phytium Cup · 2nd", "飞腾杯 · 二等奖"],
      ["English Writing · Provincial 2nd", "英语作文 · 省二等奖"]
    ]
  },
  {
    period: "UNDERGRAD",
    periodZh: "本科期间",
    kind: "award" as ExperienceTimelineKind,
    kindLabel: "Award archive",
    kindLabelZh: "荣誉补录",
    title: "Two scholarships and an AI public-welfare poster award",
    titleZh: "两次校级奖学金与 AI 公益海报创意设计大赛二等奖",
    organization: "Resume-recorded · exact dates not stated",
    organizationZh: "简历已记录 · 原始材料未注明具体年份",
    summary: "Kept in the undergraduate timeline without inventing a month or year that the source resume does not provide.",
    summaryZh: "原始简历没有提供具体年份，因此归入本科阶段，不擅自补造日期。",
    evidence: [
      ["University scholarship × 2", "校级奖学金 × 2"],
      ["AI public-welfare poster · 2nd", "AI 公益海报大赛 · 二等奖"]
    ]
  },
  {
    period: "2025.07 — 10",
    kind: "internship" as ExperienceTimelineKind,
    kindLabel: "Internship 01",
    kindLabelZh: "实习 01",
    title: "AI Researcher · Backend",
    titleZh: "AI 研究员 · 后端方向",
    organization: "Shanghai Kaichun Industry · K.AI Lab",
    organizationZh: "上海凯淳实业股份有限公司 · K.AI 智能实验室",
    summary: "Built Python/SQL ETL, cleaning, storage, scheduling, and data-quality flows for AI prototypes.",
    summaryZh: "使用 Python/SQL 构建多源 ETL、清洗、入库、调度与数据质量流程，支撑 AI 产品原型。",
    evidence: [["~30% processing efficiency gain", "数据处理效率约提升 30%"], ["Multi-source ETL", "多源 ETL"]]
  },
  {
    period: "2025.10 — 2026.03",
    kind: "internship" as ExperienceTimelineKind,
    kindLabel: "Internship 02",
    kindLabelZh: "实习 02",
    title: "AI Digital Operations Intern",
    titleZh: "AI 数字化运营实习生",
    organization: "Shanghai Yimu Furniture · E-commerce Operations",
    organizationZh: "上海怡沐家具用品有限公司 · 电商运营部",
    summary: "Turned Lark Base and AI image generation into an operating loop with intake, human QA, state tracking, SOPs, and training.",
    summaryZh: "把飞书多维表格与 AI 商品主图生成做成涵盖受理、人工质检、状态追踪、SOP 和培训的运营闭环。",
    evidence: [["3× throughput", "约 3 倍效率"], ["40% lower manual cost", "人工成本降低 40%"], ["≥70% usable rate", "可用率 ≥70%"]]
  },
  {
    period: "2026.03 — 07",
    kind: "internship" as ExperienceTimelineKind,
    kindLabel: "Internship 03",
    kindLabelZh: "实习 03",
    title: "AI Application Frontend Engineer",
    titleZh: "AI 应用开发前端工程师",
    organization: "Shanghai Yichong Technology",
    organizationZh: "上海易宠科技有限公司",
    summary: "Delivered Adobe Express, Canva, Office, and Safari plugin surfaces while governing package truth, release risk, and source handoff.",
    summaryZh: "交付 Adobe Express、Canva、Office 与 Safari 插件，同时治理包体真源、发布风险与源码交接。",
    evidence: [["60 public add-ons", "60 个公开 add-on"], ["62-package audit", "62 个包体审计"], ["16 Office manifests", "16 个 Office manifests"]]
  },
  {
    period: "2026.09 — 2026.11",
    kind: "work" as ExperienceTimelineKind,
    kindLabel: "Work",
    kindLabelZh: "工作",
    title: "AI Application Delivery Engineer · FDE",
    titleZh: "AI 应用交付工程师 · FDE",
    organization: "Guangzhou Negative Entropy Cloud Information Technology",
    organizationZh: "广州市负熵云信息科技有限公司",
    summary: "Onsite with the client, delivered enterprise customer service, product knowledge, data migration, and business dashboards from scoping and integration to evaluation, acceptance, and handoff.",
    summaryZh: "驻场客户现场，交付企业智能客服、产品知识工程、数据迁移与业务看板，覆盖需求拆解、接口集成、评测验收与交接。",
    evidence: [
      ["9.96s avg / 14.46s P95", "9.96s 平均 / 14.46s P95"],
      ["18.93% of old chain", "旧链路总耗时 18.93%"],
      ["37→27s knowledge A/B", "知识查询 A/B 37→27s"],
      ["0 migration differences", "迁移 0 项未解释差异"]
    ]
  }
] as const;

export const githubSnapshot = {
  verifiedAt: "2026-07-13",
  profileUrl: "https://github.com/Wenjunyun123",
  publicRepositories: 37,
  contributionsLastYear: 933,
  authoredIssues: 7,
  verifiedBugReports: 5,
  mergedPullRequests: 6,
  codeContributions: 2,
  documentationContributions: 4
} as const;

export const githubMergedContributions = [
  {
    repo: "usewhale/Whale",
    number: 266,
    mergedAt: "2026-06-09",
    kind: "code",
    title: "Background task commands for the TUI",
    titleZh: "为 TUI 增加后台任务命令",
    impact: "Added /ps and /stop <task_id>, reused the task registry and cancellation path, and added focused test coverage.",
    impactZh: "新增 /ps 与 /stop <task_id>，复用任务注册与取消链路，并补齐聚焦测试。",
    proof: "+381 / −3 · 9 files · maintainer approved",
    proofZh: "+381 / −3 · 9 个文件 · 维护者审核通过",
    url: "https://github.com/usewhale/Whale/pull/266"
  },
  {
    repo: "Hmbown/CodeWhale",
    number: 1282,
    mergedAt: "2026-05-09",
    kind: "code",
    title: "Preserve documentation anchor offsets",
    titleZh: "修复文档锚点被导航栏遮挡",
    impact: "Lowered the global selector specificity so page-level scroll offsets work as intended.",
    impactZh: "降低全局选择器优先级，让页面级滚动偏移能够生效。",
    proof: "+2 / −2 · 1 file · fixes #1278",
    proofZh: "+2 / −2 · 1 个文件 · 修复 #1278",
    url: "https://github.com/Hmbown/CodeWhale/pull/1282"
  },
  {
    repo: "open-webui/docs",
    number: 1292,
    mergedAt: "2026-06-14",
    kind: "docs",
    title: "mcpo Docker quickstart",
    titleZh: "补充 mcpo Docker 快速启动路径",
    impact: "Added a no-build Docker run and Compose path that takes users from zero to a working mcpo service.",
    impactZh: "补充免构建的 Docker run 与 Compose 路径，让用户可以从零启动 mcpo 服务。",
    proof: "+37 / −1 · 1 file",
    proofZh: "+37 / −1 · 1 个文件",
    url: "https://github.com/open-webui/docs/pull/1292"
  },
  {
    repo: "qdrant/landing_page",
    number: 2403,
    mergedAt: "2026-06-09",
    kind: "docs",
    title: "Clarify Raft quorum for small clusters",
    titleZh: "澄清小型集群的 Raft 法定人数要求",
    impact: "Clarified that high availability requires at least three voting nodes, avoiding unsafe two-node assumptions.",
    impactZh: "明确高可用至少需要三个投票节点，避免对双节点部署形成错误预期。",
    proof: "+2 · 1 file · maintainer approved",
    proofZh: "+2 · 1 个文件 · 维护者审核通过",
    url: "https://github.com/qdrant/landing_page/pull/2403"
  },
  {
    repo: "HKUDS/LightRAG",
    number: 3333,
    mergedAt: "2026-06-25",
    kind: "docs",
    title: "Repair broken documentation links and typos",
    titleZh: "修复失效文档链接与环境变量拼写",
    impact: "Replaced local absolute links with repository-safe paths and corrected environment wording.",
    impactZh: "把本地绝对链接改成仓库内可用路径，并修正环境相关拼写。",
    proof: "+5 / −5 · 3 files",
    proofZh: "+5 / −5 · 3 个文件",
    url: "https://github.com/HKUDS/LightRAG/pull/3333"
  },
  {
    repo: "Fechin/reference",
    number: 775,
    mergedAt: "2026-06-26",
    kind: "docs",
    title: "Normalize GitHub capitalization",
    titleZh: "统一文档中的 GitHub 品牌拼写",
    impact: "Corrected GitHub capitalization across four public documentation files.",
    impactZh: "统一四个公开文档文件中的 GitHub 品牌拼写。",
    proof: "+8 / −8 · 4 files",
    proofZh: "+8 / −8 · 4 个文件",
    url: "https://github.com/Fechin/reference/pull/775"
  }
] as const;

export const githubVerifiedBugs = [
  {
    repo: "freestylefly/wesight",
    number: 20,
    reportedAt: "2026-06-01",
    grade: "A",
    title: "Updater installs and opens the wrong application",
    titleZh: "版本更新后安装并打开了错误的应用",
    outcome: "Owner confirmed the asset-selection root cause, shipped commit 9a8a641, and released v2026.6.2.",
    outcomeZh: "维护者确认资产筛选根因，以 commit 9a8a641 修复，并发布 v2026.6.2。",
    status: "FIXED",
    statusZh: "已修复",
    url: "https://github.com/freestylefly/wesight/issues/20"
  },
  {
    repo: "freestylefly/wesight",
    number: 19,
    reportedAt: "2026-06-01",
    grade: "B",
    title: "macOS package appears damaged under Gatekeeper",
    titleZh: "macOS 包被 Gatekeeper 判定为“已损坏”",
    outcome: "Owner accepted the signing/notarization issue and added the workaround to both English and Chinese READMEs.",
    outcomeZh: "维护者确认签名/公证问题，并把临时解决方式补入中英文 README。",
    status: "ACKNOWLEDGED",
    statusZh: "已确认",
    url: "https://github.com/freestylefly/wesight/issues/19"
  },
  {
    repo: "openai/codex",
    number: 25573,
    reportedAt: "2026-06-01",
    grade: "B",
    title: "Context usage circle lost exact hover values",
    titleZh: "上下文用量圆环无法悬停显示精确数值",
    outcome: "Independently reproduced by another user; a later Codex release restored the behavior.",
    outcomeZh: "有其他用户独立复现，后续 Codex 版本恢复了该行为。",
    status: "FIXED",
    statusZh: "已修复",
    url: "https://github.com/openai/codex/issues/25573"
  },
  {
    repo: "openai/codex",
    number: 24530,
    reportedAt: "2026-05-26",
    grade: "B−",
    title: "Computer Use service cannot spawn on Intel macOS",
    titleZh: "Intel macOS 无法启动 Computer Use 服务",
    outcome: "Included reproducible spawn logs plus x64 package and hash evidence; independently matched by related reports.",
    outcomeZh: "提交了可复现的 spawn 日志、x64 包体与哈希证据，并有同类报告交叉印证。",
    status: "VALIDATED",
    statusZh: "已验证",
    url: "https://github.com/openai/codex/issues/24530"
  },
  {
    repo: "google-gemini/gemini-cli",
    number: 8096,
    reportedAt: "2025-09-09",
    grade: "B",
    title: "Windows CLI requires login in every terminal session",
    titleZh: "Windows CLI 每个新终端都要求重新登录",
    outcome: "Project automation classified it as an authentication-flow bug at P2; it later closed stale, not fixed.",
    outcomeZh: "项目自动化明确判定为 P2 认证流程 Bug；最终因 stale 关闭，并非已修复。",
    status: "CONFIRMED",
    statusZh: "已确认",
    url: "https://github.com/google-gemini/gemini-cli/issues/8096"
  }
] as const;

export const skillGroups = [
  ["Delivery method", "Discovery · solution design · acceptance criteria · prioritization · delivery docs · SOP / handoff · client communication · risk management", "交付方法", "需求调研 · 方案设计 · 验收标准 · 优先级 · 交付文档 · SOP/交接 · 客户沟通 · 风险管理"],
  ["AI applications", "RAG · Agent / Workflow · Function Calling · Prompt Engineering · eval design · A/B · trace diagnosis · regression", "AI 应用", "RAG · Agent/Workflow · Function Calling · Prompt Engineering · 评测集设计 · A/B · trace 诊断 · 回归"],
  ["Backend & integration", "Node.js / NestJS · Python / FastAPI · REST / Webhook / SSE · PostgreSQL / Drizzle · SQL · ETL · Docker · n8n", "后端与集成", "Node.js/NestJS · Python/FastAPI · REST/Webhook/SSE · PostgreSQL/Drizzle · SQL · ETL · Docker · n8n"],
  ["Frontend & platforms", "React · TypeScript · JavaScript · low-code (Miaoda / Aily) · Base · Feishu · OpenAPI", "前端与平台", "React · TypeScript · JavaScript · 低代码平台（妙搭/Aily）· 多维表格/Base · 飞书生态 · OpenAPI"],
  ["Engineering & governance", "Git / GitHub · CI · lint / types / tests / build · manifest / zip · auth / signatures · multi-tenant identity routing · observability", "工程与治理", "Git/GitHub · CI · lint/types/tests/build · manifest/zip · 权限/验签 · 多租户身份路由 · 可观测性"],
  ["AI coding tools", "Claude Code · Codex · Cursor for codebase understanding, cross-file development, command execution, testing, and delivery", "AI 编程工具", "Claude Code · Codex · Cursor；用于代码库理解、跨文件开发、命令执行、测试验证与交付"]
] as const;

export const otherProjects = [
  ["AI product-image automation", "Lark Base · image generation · human QA · SOP", "AI 商品主图自动化", "飞书 Base · 图像生成 · 人工质检 · SOP"],
  ["n8n automated news briefing agent", "n8n · Docker · Lark Bot · HTTP API", "n8n 自动化新闻早报 Agent", "n8n · Docker · 飞书 Bot · HTTP API"],
  ["AI data engineering pipeline", "Python · SQL · ETL · scheduling · data quality", "AI 数据工程管道", "Python · SQL · ETL · 调度 · 数据质量"]
] as const;

export const educationSignals = {
  education: {
    title: "Shanghai Sanda University · E-commerce",
    titleZh: "上海杉达学院 · 电子商务本科",
    copy: "2022.09—2026.06 · GPA 3.28/4.0 · top 15%; Integrated Circuit Application Technology minor, GPA 3.5/4.0 · top 5%.",
    copyZh: "2022.09—2026.06 · GPA 3.28/4.0 · 专业前 15%；辅修集成电路应用技术，GPA 3.5/4.0 · 专业前 5%。"
  },
  honors: [
    ["2025 AIGC IoT Cup · First Prize", "2025 全国大学生高新技术竞赛 AIGC 物联杯 · 一等奖"],
    ["2025 Integrated Circuit Innovation · Phytium Cup Second Prize", "2025 集成电路创新大赛飞腾杯 · 二等奖"],
    ["2024 Loongson Cup · Level-1 Certification", "2024 集成电路创新大赛龙芯杯 · 一级认证"],
    ["2025 National English Writing Competition · Undergraduate Provincial Second Prize", "2025 全国英语作文大赛本科组省二等奖"],
    ["Shanghai Sanda University · 2026 Outstanding Undergraduate Thesis", "上海杉达学院 · 2026 年优秀本科毕业论文（设计）"]
  ]
} as const;
