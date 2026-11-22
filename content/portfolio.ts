const existingWork = [
  {
    slug: "feishu-service-desk",
    title: "Feishu IT service desk",
    titleZh: "飞书 IT 服务工单系统",
    period: "2026.10",
    category: "Training project · end-to-end verified",
    categoryZh: "培训实践 · 已做闭环验证",
    summary: "A service workflow connecting issue intake, assignment, resolution, feedback, and an auditable activity log.",
    summaryZh: "从报障受理、自动分派到处理、反馈与日志，把 IT 服务流程放进一个可追踪的多维表格系统。",
    tags: ["Feishu Base", "Automation", "AI fields", "Forms"],
    image: "/portfolio/service-desk.png",
    sections: [
      { title: "The problem", titleZh: "问题", text: "A request is only the start. An IT service workflow also needs a clear owner, state transitions, completion timestamps, feedback, and a way to trace what happened.", textZh: "报障表单只是起点。完整的服务流程还需要负责人、状态流转、结束时间、用户反馈，以及能回查的操作记录。这个项目以制造业 IT 服务为培训场景搭建。" },
      { title: "What I built", titleZh: "我做了什么", text: "I connected ticket intake and feedback forms with ticket, owner, feedback, training, and workflow-log tables. The system includes assignment, start/finish actions, completion updates, feedback linking, and native AI exercises.", textZh: "搭建报障与反馈入口，并关联工单、业务线负责人、服务反馈、培训练习和流程运行日志。围绕自动分派、开始／完成按钮、结束时间回写和反馈关联配置流程，并加入原生 AI 字段练习。" },
      { title: "Engineering decisions", titleZh: "关键判断", text: "State changes are explicit. Completion and feedback are tracked separately. Historical cases cover same-month, cross-month, and six-month boundaries so recurrence logic can be checked against concrete data.", textZh: "把状态变化做成明确动作，将“工单完成”与“反馈已发送”分开记录。为复发统计准备同月、跨月、六个月边界等历史样本，用具体记录核对公式行为。" },
      { title: "Verified outcome", titleZh: "验证结果", text: "Local verification records show a test ticket reaching Completed, with a completion time, a calculated duration, feedback marked as sent, and an AI handling summary. These are training records, not customer operating metrics.", textZh: "本地回读记录确认：闭环实测工单到达“已完成”，具有结束时间、计算后的处理时长、反馈已发送标记及 AI 处理总结。上述结果来自培训测试记录，不代表客户生产运营指标。" }
    ]
  },
  {
    slug: "adobe-canva-release-command-center",
    title: "Plugin delivery & release governance",
    titleZh: "多平台插件交付与发布治理",
    period: "2026.03—07",
    category: "Internship · resume-backed",
    categoryZh: "实习项目 · 既有履历支撑",
    summary: "Making packages, manifests, review status, and handoff evidence consistent across plugin platforms.",
    summaryZh: "围绕 Adobe、Canva、Office 与 Safari 插件，让包体、manifest、审核状态与交接材料保持一致。",
    tags: ["TypeScript", "React", "Adobe Express", "Canva Apps"],
    image: "/portfolio/plugin-delivery.png",
    sources: [
      { label: "Adobe AI Headshot · merged PR #3", url: "https://github.com/YiChongmimi/adobe-ai-headshot/pull/3" },
      { label: "Adobe Image Text Editor · merged PR #3", url: "https://github.com/YiChongmimi/adobe-image-text-editor/pull/3" }
    ],
    sections: [
      { title: "The problem", titleZh: "问题", text: "Multiple plugin platforms mean different manifests, packages, review constraints, and release states. When these drift apart, the next owner cannot reliably tell what is ready to ship.", textZh: "不同插件平台有各自的 manifest、包体、审核要求和发布状态。这些信息一旦分散，后续接手的人就很难判断哪个版本可以提交、还有哪些问题。" },
      { title: "What I built", titleZh: "我做了什么", text: "My work covered TypeScript/React plugin interfaces, package and manifest validation, release-state reconciliation, and structured handoff across Adobe, Canva, Office, and Safari.", textZh: "工作覆盖 TypeScript／React 插件界面、包体与 manifest 检查、发布状态对账和结构化交接，涉及 Adobe、Canva、Office 与 Safari 平台。" },
      { title: "A concrete fix", titleZh: "一个具体的修复", text: "In the Adobe AI Headshot and Image Text Editor plugins, status polling could enter the full login path. I separated initial login from refresh-only status updates, so polling and delayed refreshes no longer call the full login operation.", textZh: "在 Adobe AI Headshot 与 Image Text Editor 插件中，状态轮询可能走进完整登录路径。我将首次登录与仅刷新状态分开，让轮询和延迟刷新不再调用完整登录操作。" },
      { title: "Verified outcome", titleZh: "可核查的结果", text: "Both fixes were merged on June 23, 2026. The Headshot PR records a passing build and static code-path checks, while noting that runtime Adobe Network validation was not performed and unrelated type errors remained. The links below expose the implementation and its validation limits.", textZh: "两项修复于 2026 年 6 月 23 日合并。Headshot 的 PR 记录了构建与静态路径检查通过，同时注明未实测 Adobe Network 面板，且仍有与改动无关的既有类型错误。下方链接可查看实际实现与验证边界。" }
    ]
  }
] as const;

const architectureNotes = [
  {
    slug: "aily-knowledge-and-actions",
    title: "Knowledge is not live business state",
    titleZh: "知识库不等于实时业务数据库",
    period: "2026.10",
    category: "Architecture review",
    categoryZh: "架构评审 · 改进方案",
    summary: "Separating Aily knowledge retrieval from precise, permission-aware business queries and actions.",
    summaryZh: "在 Aily 中区分规范知识、实时业务状态与受控动作，明确对内／对外助手的权限边界。",
    tags: ["Aily", "Knowledge retrieval", "Tool actions", "Permissions"],
    image: "/portfolio/aily-architecture.png",
    sections: [
      { title: "The finding", titleZh: "发现的问题", text: "Connecting operational tables directly as a semantic knowledge source can return stale state, miss exact identifiers, and expose fields beyond an assistant’s intended audience.", textZh: "把工单、订单等状态表直接放进语义知识检索，会遇到状态同步延迟、编号查询不精确和字段权限范围过大的问题。" },
      { title: "The proposal", titleZh: "改进方案", text: "Keep policies and technical references in the knowledge layer. Read current business state with exact record-query tools. Isolate internal and external assistants and authorize actions at the tool boundary.", textZh: "将规范与技术资料留在知识层；当前业务状态通过记录查询工具精确读取。对内、对外助手分别授权，并在工具动作层限定客户身份与可访问字段。" },
      { title: "What makes it dependable", titleZh: "可靠性的关键", text: "Writes follow preview, confirmation, execution, and readback. Approval requests are separate from approval decisions. Closure requires evidence of review, delivery, and customer confirmation.", textZh: "写入遵循预览、确认、执行、回读；“发起审批”与“批准审批”分开；结案前核查复核、交付和客户确认等前置证据。" },
      { title: "Scope", titleZh: "范围说明", text: "This is an architecture review and implementation plan grounded in inspected materials, table structures, and an orchestration screenshot. The review itself is not proof of a completed production deployment.", textZh: "这是一份基于材料、表结构与编排页面核查形成的架构评审和实施规划，不作为整套系统已在生产环境交付的声明。" }
    ]
  }
] as const;

const evaluationNote = {
  slug: "customer-service-evaluation",
  title: "Fixing the evaluator before judging the agent",
  titleZh: "先修测评工具，再判断智能体",
  period: "2026.09—10",
  category: "Engineering tool · delivered fix",
  categoryZh: "工程工具 · 修复包已交接",
  summary: "Separating visible progress from actual answers, and correcting the collector that marked slow replies as missing.",
  summaryZh: "区分握手、等待提示与真正的答案，修正采集窗口和结束判定，让测评结果能反映真实链路表现。",
  tags: ["Playwright", "JavaScript", "Evaluation", "Debugging"],
  image: "/portfolio/customer-service-evaluation.png",
  sections: [
    { title: "The misleading result", titleZh: "误导性的测试结果", text: "Batch tests marked some requests as unanswered even though the production logs showed replies. A later change made every test run to its timeout. Before drawing conclusions about the agent, I investigated how the collector detected an answer and decided to stop.", textZh: "批量测试把部分请求记成“无回复”，但线上日志显示已经回答；调整后又出现每题都跑满等待上限。问题不能直接归咎于模型，需要先检查采集器怎样识别正文、怎样结束等待。" },
    { title: "The fix", titleZh: "具体修复", text: "The delivered patch detects body text across answer bubbles instead of inspecting only the last bubble, measures stability without thinking-text changes resetting it, and keeps an independent idle exit. It aligns script and driver timeouts and enters multiline questions without accidentally sending each line separately.", textZh: "修复包改为检查所有回答气泡中的正文，而非只看最后一个；稳定性只跟踪正文变化，避免思考文案抖动反复重置；保留独立的空闲退出条件，统一脚本与驱动层等待参数，并修正多行题目被拆成多次发送的问题。" },
    { title: "How I use the measurements", titleZh: "怎样使用测量结果", text: "I distinguish connection acknowledgement, first answer text, and total collection time. Reports compare problem categories and test conditions, while accounting for model changes, concurrency, and collector settings. A faster acknowledgement alone does not prove a faster answer.", textZh: "分别记录连接确认、正文首现和采集总耗时，按问题类型与测试条件比较。同时检查模型版本、并发和采集参数，避免把握手更快、窗口更长或测试口径变化写成智能体性能提升。" },
    { title: "Evidence and limits", titleZh: "交付与验证", text: "The October 9 handoff contains the collector, patch, replacement instructions, and validation notes. I checked those artifacts against the service-channel exchange. The recorded mock and two-question live checks support the stopping behavior; they do not establish a production-wide speed or accuracy gain.", textZh: "10 月 9 日交接包包含采集脚本、补丁、替换说明与验证记录，并有服务群交接消息对应。包内记录了模拟场景和两题真实链路验证，支持结束判定的修复；不据此宣称生产环境整体提速或准确率提升。" }
  ]
} as const;

export const portfolioWork = [
  {
    slug: "feishu-customer-service-gateway",
    title: "Enterprise customer service: evaluation, diagnosis, and stability",
    titleZh: "企业级智能客服：评测、诊断与稳定性治理",
    period: "2026.09—11",
    category: "Client delivery · anonymized",
    categoryZh: "客户交付 · 脱敏展示",
    summary: "Built the Udesk middleware and a resumable evaluation system, then used traces to separate model quality from platform and delivery bottlenecks.",
    summaryZh: "建设 Udesk 外部智能体中间层与可恢复评测体系，用 trace 区分模型能力、平台瓶颈与交付问题。",
    tags: ["NestJS", "React", "PostgreSQL", "Udesk", "SSE", "Webhook", "RAG", "Evaluation"],
    image: "/portfolio/customer-service-gateway.png",
    metrics: [["2,245", "题工作流全量"], ["225", "题 Aily 基准"], ["238", "条 trace"], ["225", "题 UI 验收"]],
    sections: [
      { title: "The problem", titleZh: "问题", text: "A working agent is only one part of customer service. Messages still need to cross platforms, preserve the conversation, reach the customer, and leave enough evidence to investigate failures. Webhook/SSE delivery, context truncation, entrance queuing, and file handoff belong to different layers; without evidence, platform problems are easily mistaken for model problems.", textZh: "智能体能回答，不等于客户能顺利收到答案。客服渠道、接入中间件、Aily 和前台展示分属不同环节；Webhook/SSE 回传、上下文截断、入口排队和文件交付也分属不同层。缺少证据时，平台问题很容易被误判成模型问题。" },
      { title: "What I built", titleZh: "我做了什么", text: "I built and continuously improved the Udesk external-agent middleware in NestJS, React, and PostgreSQL: SSE streaming, human handoff, idempotency, rate limiting, masking, and observability. Webhook signature verification moved from warn to enforce, with a rollback SQL and log-verification plan.", textZh: "建设并持续优化智能客服的 Udesk 外部智能体中间层（NestJS + React + PostgreSQL），补齐 SSE 流式输出、人工转接、幂等、限流、脱敏和观测；将 Webhook 签名校验从 warn 切换为 enforce，保留回滚 SQL 与日志核验方案。" },
      { title: "Evaluation system", titleZh: "评测体系", text: "I built a resumable evaluation system with per-question JSONL, checkpoint resume, unified grading, and Base/Excel/HTML reports. It covers three separate sets: 2,245 workflow questions, a 225-question Aily baseline (median 40.4s, P90 61.0s, automatic grading 99.11%), and a 262-question extension set (260/262, 99.2%). This keeps capability level, real usability, and platform limits from being mixed into one number.", textZh: "搭建可恢复的大规模评测体系：逐题 JSONL、断点续跑、统一判定、Base/Excel/HTML 报告；分别建立 2,245 题工作流全量、225 题 Aily 基准（中位 40.4s、P90 61.0s、自动判定 99.11%）和 262 题扩展集（260/262、99.2%）的评测口径，避免把能力水位、真实可用率和平台瓶颈混成一个数字。" },
      { title: "Diagnosis and outcome", titleZh: "诊断与结果", text: "Using 238 traces, I located entrance queuing at roughly 12.7–13.0s, index slicing, 46.5KB context truncation, and a second read-back. I proposed structured indexing, retrieval filtering, context trimming, and templated file delivery. The productized query desk passed a 225-question UI acceptance run at an average of 9.96s, P50 10.87s, P95 14.46s, about 18.93% of the old chain’s total time.", textZh: "基于 238 条 trace 定位入口排队（约 12.7–13.0s）、索引切片、46.5KB 上下文截断和二次回读等瓶颈，提出结构化索引、检索过滤、上下文裁剪与模板化文件交付；产品化查询台 225 题 UI 验收平均 9.96s、P50 10.87s、P95 14.46s，总耗时约为旧链路的 18.93%。" }
    ]
  },
  {
    slug: "product-knowledge-ai-query",
    title: "Product knowledge engineering and an AI query desk",
    titleZh: "产品知识工程与 AI 资料查询台",
    period: "2026.09—11",
    category: "Client delivery · knowledge engineering",
    categoryZh: "客户交付 · 知识工程",
    summary: "Structured 889 product documents into QA and parameter cards, then delivered a query desk with aliases, firmware boundaries, file links, and multi-turn follow-ups.",
    summaryZh: "把 889 份产品文档结构化为 QA 与参数知识卡，交付支持型号别名、固件边界、文件链接和多轮追问的 AI 资料查询台。",
    tags: ["RAG", "Knowledge cards", "Miaoda", "Base", "OpenAPI", "Evaluation"],
    image: "/portfolio/knowledge-query.png",
    metrics: [["889", "份产品文档"], ["235", "条 QA"], ["184", "张知识卡"], ["29", "题 A/B"]],
    sections: [
      { title: "The problem", titleZh: "问题", text: "Product knowledge is scattered across manuals, tables, and firmware notes. Model aliases, version boundaries, and file delivery mean a retrieved passage is not the same as a correct answer.", textZh: "产品资料分散在文档、表格和固件说明里；型号别名、版本边界和文件交付让“检索到”不等于“答得对”。" },
      { title: "Knowledge engineering", titleZh: "知识工程", text: "I parsed 889 product documents into structured knowledge and produced 235 QA pairs plus 184 cards covering model, parameters, interfaces, packing, and cross-model comparison. 805 real FAQs were used to calibrate frequent phrasings and missing table fields.", textZh: "将 889 份产品文档解析为结构化知识，生成 235 条 QA 与 184 张型号/参数/接口/装箱/横比知识卡；用 805 条真实 FAQ 校准高频问法和表格字段遗漏。" },
      { title: "Evaluation", titleZh: "评测", text: "In a controlled 29-question A/B, the median dropped from 37s to 27s, automatic grading rose from 96.6% to 100%, and P90 dropped from 51s to 37s. Six targeted regressions passed 6/6.", textZh: "29 题受控 A/B 中位 37→27s、自动判定 96.6%→100%、P90 51→37s；6 道针对性回归 6/6 通过。" },
      { title: "Delivered", titleZh: "交付结果", text: "I delivered an AI query desk supporting model aliases, firmware boundaries, file links, and multi-turn follow-ups. A 225-question UI acceptance run completed 225/225 executions at an average of 9.96s, P50 10.87s, P95 14.46s. The main remaining defects were file delivery and multi-turn entity inheritance; both were recorded as improvement items.", textZh: "搭建 AI 资料查询台，支持型号别名、固件边界、文件链接和多轮追问；225 题 UI 验收 225/225 执行完成，平均 9.96s、P50 10.87s、P95 14.46s；主要缺陷集中在文件交付与多轮实体继承，已沉淀为改进项。" }
    ]
  },
  {
    slug: "enterprise-data-migration-dashboards",
    title: "Enterprise data migration and business dashboards",
    titleZh: "企业数据迁移与业务看板",
    period: "2026.09—11",
    category: "Client delivery · data systems",
    categoryZh: "客户交付 · 数据系统",
    summary: "Migrated outsourced production orders into Base, then delivered meeting and certificate workflows with reconciliation, permissions, and automated checks.",
    summaryZh: "把委外生产订单迁移到多维表格，并交付会议经营看板与证书查询智能体，覆盖对账、权限和自动化检查。",
    tags: ["Base", "SQL", "Workflow", "Dashboard", "Certificate agent", "Meeting data"],
    image: "/portfolio/data-migration.png",
    metrics: [["9", "张表"], ["2,041", "条记录"], ["38,819", "个单元格"], ["0", "项未解释差异"]],
    sections: [
      { title: "The problem", titleZh: "问题", text: "Outsourced production orders lived in spreadsheets. Formulas, #N/A and #DIV/0! values, and business definitions all had to survive the migration. Meeting and certificate data sat in separate systems.", textZh: "委外生产订单散落在电子表格里，公式、#N/A/#DIV/0! 和业务口径都必须保留；会议与证书数据又分属不同系统。" },
      { title: "Migration", titleZh: "数据迁移", text: "I migrated 9 tables, 2,041 records, 38,819 field cells, 51 formula fields, and 5 workflows. The original #N/A and #DIV/0! values and business definitions were preserved; a full read-back found 0 unexplained differences.", textZh: "将委外生产订单电子表格迁移为多维表格：9 张表、2,041 条记录、38,819 个字段单元格、51 个公式字段、5 条工作流；保留原表 #N/A/#DIV/0! 和业务口径，全量回读 0 项未解释差异。" },
      { title: "Dashboards and agent", titleZh: "看板与智能体", text: "I designed a meeting-operations loop from meeting discovery and transcript reading through permission requests, topic/action extraction, Base, and native dashboards. Across 121 meetings, 25 had readable transcripts and 22 had insufficient permission. I also delivered a certificate query agent; a typical query went from 68s and 3 calls to 17–26s and 1 call, with 28/28, 16/16, 14/14 regressions and 13/13 health checks passing.", textZh: "设计会议经营看板闭环：会议发现→正文读取→权限申请→主题/行动提炼→多维表格→原生仪表盘；121 场会议中发现 25 场可读正文、22 场权限不足；交付证书查询智能体，典型查询 68s/3 次调用→17–26s/1 次，28/28、16/16、14/14 回归与 13/13 健康检查通过。" },
      { title: "Delivered", titleZh: "交付结果", text: "Daily scheduled jobs, deduplication, idempotency, and empty-state guards were added, with 189 automated tests passing. The data, dashboards, and agent form a handoff-ready delivery rather than isolated demos.", textZh: "建立每日计划任务、去重/幂等/空态保护，189 项自动化测试通过；把数据、看板和智能体串成可交接的交付物，而不是彼此孤立的演示。" }
    ]
  }
] as const;

export const portfolioNotes = [...architectureNotes, existingWork[0], existingWork[1], evaluationNote] as const;

export type PortfolioStory = (typeof portfolioWork)[number] | (typeof portfolioNotes)[number];

export const publicContributions = [
  {
    title: "Make unreadable credentials an explicit state",
    titleZh: "把“凭证不可读”变成明确的产品状态",
    summary: "WorkBuddy app-encrypted sessions were being mistaken for signed-out sessions. The merged fix preserves the reason through the reader, limits layer, and UI, and skips the unsupported billing request.",
    summaryZh: "修正 WorkBuddy 应用加密会话被当成未登录的问题，将原因从读取层传到额度层与界面，并跳过无法执行的计费查询。",
    date: "2026-09-23",
    project: "Token Monitor · PR #738",
    url: "https://github.com/Javis603/token-monitor/pull/738"
  },
  {
    title: "Background task commands for the TUI",
    titleZh: "为 Whale TUI 增加后台任务命令",
    summary: "Added /ps and /stop <task_id>, reused the task registry and cancellation path, and added focused test coverage.",
    summaryZh: "新增 /ps 与 /stop <task_id>，复用任务注册与取消链路，并补齐聚焦测试。",
    date: "2026-06-09",
    project: "usewhale/Whale · PR #266",
    url: "https://github.com/usewhale/Whale/pull/266"
  },
  {
    title: "Preserve documentation anchor offsets",
    titleZh: "修复文档锚点被导航栏遮挡",
    summary: "Lowered the global selector specificity so page-level scroll offsets work as intended.",
    summaryZh: "降低全局选择器优先级，让页面级滚动偏移能够生效。",
    date: "2026-05-09",
    project: "Hmbown/CodeWhale · PR #1282",
    url: "https://github.com/Hmbown/CodeWhale/pull/1282"
  },
  {
    title: "mcpo Docker quickstart",
    titleZh: "补充 mcpo Docker 快速启动路径",
    summary: "Added a no-build Docker run and Compose path that takes users from zero to a working mcpo service.",
    summaryZh: "补充免构建的 Docker run 与 Compose 路径，让用户可以从零启动 mcpo 服务。",
    date: "2026-06-14",
    project: "Open WebUI Docs · PR #1292",
    url: "https://github.com/open-webui/docs/pull/1292"
  }
] as const;

export const otherDeliveries = [
  {
    title: "Multilingual marketing assistant",
    titleZh: "多语言营销助手",
    summary: "Completed an English/German end-to-end run for HD-A3L: 47.4s and 41.3s, 12 columns consistent column by column, pending customer acceptance.",
    summaryZh: "完成 HD-A3L 英文/德文端到端闭环：47.4s/41.3s，12 列逐列一致，待客户验收。"
  },
  {
    title: "FDE evaluation package system",
    titleZh: "FDE 评测包体系",
    summary: "Maintained 24 L1/L2 evaluation case files with rubric, human baseline, model failure samples, and review-rework closure; the 2026-09-28 snapshot recorded 6 passed and 16 pending review.",
    summaryZh: "管理 24 个 L1/L2 评测案例档案，固化 Rubric、真人基线、模型失败样本与审核返修闭环；2026-09-28 快照 6 个通过、16 个待审。"
  }
] as const;
