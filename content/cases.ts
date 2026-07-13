export const evidenceStatuses = [
  "resume-supported",
  "github-supported",
  "user-confirmed-practice",
  "user-provided-transcript",
  "draft-internal"
] as const;

export type EvidenceStatus = (typeof evidenceStatuses)[number];

export type CaseStudy = {
  title: string;
  titleZh: string;
  slug: string;
  role: string;
  roleZh: string;
  platforms: string[];
  evidenceStatus: EvidenceStatus;
  problem: string;
  problemZh: string;
  productDecision: string;
  productDecisionZh: string;
  interface: string;
  interfaceZh: string;
  technicalBuild: string;
  technicalBuildZh: string;
  outcome: string;
  outcomeZh: string;
  sources: string[];
};

export const cases: CaseStudy[] = [
  {
    title: "Lark CLI × GitHub CLI Delivery Loop",
    titleZh: "飞书 CLI × GitHub CLI 交付闭环",
    slug: "lark-github-cli-delivery-loop",
    role: "Flagship FDE system",
    roleZh: "旗舰 FDE 系统",
    platforms: ["Lark CLI", "GitHub CLI", "Codex", "GitHub Actions"],
    evidenceStatus: "user-confirmed-practice",
    problem:
      "A business request can enter engineering quickly, but status, ownership, CI proof, and acceptance evidence often fail to return to the original business record.",
    problemZh:
      "业务需求可以很快进入工程系统，但任务状态、负责人、CI 证明和验收证据经常无法回到最初的飞书记录。",
    productDecision:
      "Use the source Lark record as the stable business anchor and GitHub as the engineering truth, with CLI commands carrying a traceable task ID in both directions.",
    productDecisionZh:
      "把来源飞书记录作为稳定的业务锚点、把 GitHub 作为工程真源，通过 CLI 在两个系统间双向携带可追踪任务 ID。",
    interface:
      "The visible loop is Lark request → GitHub Issue → focused Agent branch → PR and CI → GitHub CLI summary → Lark status, links, blockers, and acceptance evidence.",
    interfaceZh:
      "可见链路为：飞书需求 → GitHub Issue → Agent 聚焦分支 → PR 与 CI → GitHub CLI 摘要 → 飞书状态、链接、阻塞项与验收证据。",
    technicalBuild:
      "Lark CLI validates intake fields and writes back delivery state; GitHub CLI creates and inspects Issues and PRs; Codex implements repository-native slices; CI output and acceptance artifacts close the loop.",
    technicalBuildZh:
      "飞书 CLI 校验受理字段并回写交付状态；GitHub CLI 创建和检查 Issue/PR；Codex 按仓库规则实现聚焦切片；CI 输出与验收产物负责关闭闭环。",
    outcome:
      "The practice defines a stronger done condition: work is incomplete until repository evidence returns to the business surface where the request began.",
    outcomeZh:
      "这套实践给出更严格的完成标准：仓库证据没有回到需求开始的业务界面，任务就不算完成。",
    sources: [
      "User-confirmed project practice supplied for this portfolio",
      "Implementation model documented in content/profile.ts"
    ]
  },
  {
    title: "Lark Base Team Agent for Commerce Operations",
    titleZh: "飞书多维表格 Team Agent 电商经营实践",
    slug: "lark-base-team-agent-commerce-ops",
    role: "Simulated business practice · implementation in progress",
    roleZh: "模拟业务实践 · 实现中",
    platforms: ["Lark Base", "Team Agent", "Role permissions", "Action cards"],
    evidenceStatus: "draft-internal",
    problem:
      "General assistants sit outside business data and permissions. Teams still need a safe way to detect operating events, find the accountable owner, and preserve every decision as evidence.",
    problemZh:
      "通用助手位于业务数据和权限体系之外。团队仍需要一种安全方式来发现经营事件、找到责任人，并把每次判断留成证据。",
    productDecision:
      "Model a synthetic commerce operation inside Lark Base, then test event-driven Agent behavior under the intersection of requester permissions, Agent configuration, and action permissions.",
    productDecisionZh:
      "在飞书多维表格中构造合成电商业务，再在“请求人权限 ∩ Agent 配置权限 ∩ 动作权限”的约束下验证事件驱动智能体。",
    interface:
      "Three trigger paths are designed: ROI below 2 alerts campaign ownership, sellable inventory below 7 days alerts supply chain, and a high-value customer inactive for 30 days creates an operations follow-up.",
    interfaceZh:
      "设计三条触发链：ROI 跌破 2 通知投放负责人、可售天数低于 7 天通知供应链、高价值客户 30 天未复购则创建运营跟进。",
    technicalBuild:
      "The verification model includes synthetic tables, four user roles, permission-denial tests, evidence-linked answers, human approval for risky writes, deduplication, cool-down, and an audit trail.",
    technicalBuildZh:
      "验证模型包含合成数据表、四类角色、越权拒绝测试、带依据的回答、高风险写操作人工审批、去重冷却与审计日志。",
    outcome:
      "This is an implementation target, not a production claim. Success will be measured through trigger accuracy, notification delay, adoption, overrides, and permission-block evidence.",
    outcomeZh:
      "这是实现目标，不是生产上线声明。后续以触发准确率、通知延迟、采用率、人工覆盖率和权限拦截证据进行验证。",
    sources: [
      "User-provided video transcript and requested one-to-one practice conversion",
      "Resume supports adjacent Lark Base automation experience, not production deployment of this Team Agent"
    ]
  },
  {
    title: "Adobe / Canva Release Governance",
    titleZh: "Adobe / Canva 插件发布治理",
    slug: "adobe-canva-release-command-center",
    role: "Resume-backed delivery system",
    roleZh: "简历支撑的交付系统",
    platforms: ["Adobe Express", "Canva Apps", "Office Add-ins", "Safari WebExtension"],
    evidenceStatus: "resume-supported",
    problem:
      "A multi-platform plugin matrix created package drift, review risk, unclear submission truth, and source-handoff gaps across dozens of deliverables.",
    problemZh:
      "多平台插件矩阵在数十个交付物之间造成包体漂移、审核风险、提交状态不清和源码交接缺口。",
    productDecision:
      "Treat manifests, packages, release rows, review state, and handoff notes as one governed delivery surface rather than independent checklists.",
    productDecisionZh:
      "把 manifest、包体、发布记录、审核状态和交接说明作为一个受治理的交付面，而不是相互独立的清单。",
    interface:
      "A compact command surface groups package validation, risk priority, review follow-up, queue status, and evidence for the next owner.",
    interfaceZh:
      "紧凑的操作面集中呈现包体校验、风险优先级、审核跟进、队列状态和下一负责人的交接证据。",
    technicalBuild:
      "The work covered TypeScript/React plugin delivery, manifest/package/zip checks, lint/types/tests/build verification, Base reconciliation, and structured handoff across Adobe, Canva, Office, and Safari.",
    technicalBuildZh:
      "工作覆盖 TypeScript/React 插件交付、manifest/package/zip 检查、lint/types/tests/build 验证、飞书 Base 对账，以及 Adobe、Canva、Office 和 Safari 的结构化交接。",
    outcome:
      "Resume evidence records 60 public add-ons checked, 62 Adobe packages audited, 16 Office manifests generated, 7 submission times corrected, and 78 summaries rewritten.",
    outcomeZh:
      "简历证据记录了：核验 60 个公开 add-ons、审计 62 个 Adobe 包体、生成 16 个 Office manifests、修正 7 条提交时间、重写 78 条摘要。",
    sources: [
      "Resume HTML: C:\\Users\\Y.Daria\\Desktop\\resume_v5\\03_gray_ats.html",
      "GitHub: https://github.com/Wenjunyun123"
    ]
  }
];
