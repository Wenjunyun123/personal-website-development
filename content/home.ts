export type CommandKey = "package" | "risk" | "handoff";
export type SystemLayer = "profile" | "timeline" | "practice" | "stack" | "principles";

export const commandStates = {
  en: {
    package: {
      label: "Package Check",
      title: "Manifest and package drift, made visible.",
      copy: "A release queue for Adobe and Canva plugin work: manifest parity, zip roots, version consistency, checks, build, and source handoff readiness.",
      metrics: [["60", "public add-ons read"], ["56", "Base rows matched"], ["16", "Office manifests"]],
      queue: [["adobe-ai-vector-generator", "manifest ok"], ["canva-colorize-image", "zip root check"], ["office manifest batch", "xml ready"]]
    },
    risk: {
      label: "Risk Queue",
      title: "Subscription and credit risks are triaged before release.",
      copy: "A risk-first view for subscription cancellation, credit drift, deduction logic, and cache behavior across plugin packages.",
      metrics: [["62", "packages audited"], ["P0/P1", "priority bands"], ["7", "submission times fixed"]],
      queue: [["subscription-cancel", "P0"], ["credit drift cache", "P1"], ["deduction evidence", "P1"]]
    },
    handoff: {
      label: "Handoff Evidence",
      title: "Every release path ends with evidence someone else can trust.",
      copy: "Handoff packages collect summaries, check results, missing items, manifest evidence, and review-state notes for the next owner.",
      metrics: [["78", "Base summaries rewritten"], ["3", "handoff layers"], ["1", "source of truth"]],
      queue: [["review closure", "evidence attached"], ["source zip", "ready"], ["handoff summary", "generated"]]
    }
  },
  zh: {
    package: {
      label: "包体检查",
      title: "让 manifest 与包体漂移变得可见。",
      copy: "面向 Adobe 与 Canva 插件交付的发布队列：manifest 一致性、zip 根目录、版本、检查、构建和源码交接准备度。",
      metrics: [["60", "已读取公开插件"], ["56", "已匹配 Base 记录"], ["16", "Office manifests"]],
      queue: [["adobe-ai-vector-generator", "manifest 正常"], ["canva-colorize-image", "检查 zip 根目录"], ["office manifest batch", "xml 就绪"]]
    },
    risk: {
      label: "风险队列",
      title: "订阅与积分风险在发布前先分级。",
      copy: "围绕 subscription-cancel、credit drift、扣减逻辑和缓存行为建立风险优先视图。",
      metrics: [["62", "已审计包体"], ["P0/P1", "优先级分层"], ["7", "修复提交时间"]],
      queue: [["subscription-cancel", "P0"], ["credit drift cache", "P1"], ["deduction evidence", "P1"]]
    },
    handoff: {
      label: "交接证据",
      title: "每条发布路径都以可验证证据收尾。",
      copy: "交接包收集摘要、检查结果、缺失项、manifest 证据和审核状态，方便下一位负责人直接接手。",
      metrics: [["78", "已重写 Base 摘要"], ["3", "交接层"], ["1", "事实源"]],
      queue: [["review closure", "已附证据"], ["source zip", "就绪"], ["handoff summary", "已生成"]]
    }
  }
} as const;

export const homeCopy = {
  en: {
    nav: { home: "Home", work: "Work", system: "System" },
    status: "Shanghai · Open to AI product and FDE opportunities",
    identity: "Wenjun You",
    role: "AI Frontend Engineer for productized AI workflows.",
    promise: "I turn messy AI workflows into shippable product interfaces.",
    launch: "Press Enter to explore",
    commandKicker: "A living release desk",
    commandTitle: "Release Command Center",
    commandSubtitle: "Adobe / Canva / Lark / Agent workflows",
    queueTitle: "Queue Evidence",
    viewResume: "View Resume",
    email: "Email Wenjun",
    workEyebrow: "$ open work.md",
    workTitle: "One builder. Many reliable systems.",
    workIntro: "I combine product thinking, frontend craft, automation, and release evidence so AI capability becomes something a team can actually use.",
    capabilityTitle: "Capability Index",
    caseTitle: "Selected Case Set",
    notesTitle: "Technical Notes",
    resumeTitle: "Resume Strip",
    contactTitle: "Contact",
    contactCopy: "For AI frontend, FDE, plugin delivery, and agent workflow opportunities, start with the resume or send an email.",
    canvasTitle: "Wenjun Canvas",
    canvasHint: "Select a layer · Zoom the map · Follow the evidence",
    layers: "Layers",
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    reset: "Reset zoom",
    systemLayers: {
      profile: ["Profile", "AI delivery engineer", "Turns ambiguous workflows into visible, testable product surfaces."],
      timeline: ["Timeline", "Architecture of delivery", "From requirements and prototypes to packaging, review, and handoff."],
      practice: ["Practice", "Build with evidence", "Real interfaces, repeatable checks, and artifacts the next owner can trust."],
      stack: ["Stack", "TypeScript · React · Agents", "Plugin platforms, Lark automation, Python services, and release tooling."],
      principles: ["Principles", "Useful beats impressive", "Clear states, honest evidence labels, and the shortest path to working software."]
    }
  },
  zh: {
    nav: { home: "主页", work: "作品", system: "我的系统" },
    status: "上海 · 关注 AI 产品与 FDE 机会",
    identity: "游文君",
    role: "AI 前端工程师，专注产品化 AI 工作流。",
    promise: "我把混乱的 AI 工作流变成可交付的产品界面。",
    launch: "按 Enter 开始探索",
    commandKicker: "持续运行的发布工作台",
    commandTitle: "发布治理控制台",
    commandSubtitle: "Adobe / Canva / 飞书 / Agent 工作流",
    queueTitle: "队列证据",
    viewResume: "查看简历",
    email: "邮件联系",
    workEyebrow: "$ open work.md",
    workTitle: "一个人，也能构建可靠的系统。",
    workIntro: "我把产品判断、前端实现、自动化和发布证据连起来，让 AI 能力真正进入团队工作。",
    capabilityTitle: "能力索引",
    caseTitle: "案例精选",
    notesTitle: "技术札记",
    resumeTitle: "简历速览",
    contactTitle: "联系",
    contactCopy: "如果你在寻找 AI 前端、FDE、插件交付或 Agent 工作流方向的人选，可以先看简历或直接邮件联系。",
    canvasTitle: "Wenjun Canvas",
    canvasHint: "选择图层 · 缩放地图 · 沿证据继续探索",
    layers: "图层",
    zoomOut: "缩小",
    zoomIn: "放大",
    reset: "重置缩放",
    systemLayers: {
      profile: ["个人信息", "AI 交付工程师", "把模糊工作流变成可见、可测试的产品界面。"],
      timeline: ["交付路径", "交付架构", "从需求、原型到包体、审核与交接。"],
      practice: ["工作方式", "用证据构建", "真实界面、可重复检查，以及下一位负责人可以信任的产物。"],
      stack: ["技术栈", "TypeScript · React · Agents", "插件平台、飞书自动化、Python 服务与发布工具。"],
      principles: ["原则", "有用胜过炫技", "清晰状态、诚实证据标签，以及通往可用软件的最短路径。"]
    }
  }
} as const;

export const capabilityItems = [
  ["01", "AI Product Interfaces", "Turns AI capability into clear inputs, system states, outputs, and user-facing feedback loops.", "AI 产品界面", "把 AI 能力转化为清晰的输入、系统状态、输出和用户反馈闭环。"],
  ["02", "Plugin & Platform Delivery", "Ships across Adobe Express add-ons, Canva Apps, Office Add-ins, and Safari WebExtension surfaces.", "插件与平台交付", "覆盖 Adobe Express、Canva、Office Add-ins 和 Safari WebExtension 等平台。"],
  ["03", "Agent Workflow Operations", "Connects agents, Lark surfaces, CLI execution, SOPs, and handoff evidence into repeatable work.", "Agent 工作流运营", "把智能体、飞书界面、CLI 执行、SOP 和交接证据连成可重复的工作。"]
] as const;

export const technicalNotes = [
  ["Why release evidence matters more than launch screenshots", "Shipping AI plugin work needs package truth, review state, and handoff proof, not only polished UI captures.", "为什么发布证据比上线截图更重要", "AI 插件交付需要包体真源、审核状态和交接证据，而不只是漂亮截图。"],
  ["Base agents need table discipline before autonomy", "Lark automation becomes useful when records, states, exceptions, and ownership are shaped first.", "多维表格智能体需要先有表格纪律", "记录、状态、异常和责任人先成型，飞书自动化才真正有用。"],
  ["Agent workflows should end with verifiable artifacts", "Every automation run should leave action cards, status checks, logs, and a concise handoff.", "Agent 工作流应以可验证产物收尾", "每次自动化运行都应该留下动作卡、状态检查、日志和简洁交接。"]
] as const;

export const resumeItems = [
  ["2026", "Shanghai Yichong Technology", "AI application frontend engineering across plugin delivery, release governance, and Agent workflow reliability.", "上海易宠科技", "AI 应用前端工程，覆盖插件交付、发布治理和 Agent 工作流可靠性。"],
  ["2025", "AI operations internships", "Lark Base automation, AI product-image workflows, ETL, SOP training, and quality loops.", "AI 运营实习经历", "飞书多维表格自动化、AI 商品图工作流、ETL、SOP 培训和质量闭环。"],
  ["EDU", "Shanghai Sanda University", "E-commerce undergraduate with AI, data, UX, machine learning, and integrated circuit coursework.", "上海杉达学院", "电子商务本科，课程覆盖 AI、数据、UX、机器学习与集成电路。"]
] as const;
