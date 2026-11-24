export type RecordLanguage = "zh" | "en";

export type RecordProof = {
  display: string;
  label: string;
  note: string;
  to?: number;
  formatComma?: boolean;
};

export type RecordLadderStep = {
  label: string;
  range: string;
  display: string;
  width: number;
  note: string;
};

export type RecordMethodStep = {
  index: string;
  code: string;
  short: string;
  title: string;
  body: string;
  artifact: string;
};

export type RecordNote = {
  quote: string;
  body: string;
  href: string;
  linkLabel: string;
};

export type RecordCopy = {
  meta: {
    role: string;
    location: string;
    issue: string;
    availability: string;
  };
  nav: {
    work: string;
    method: string;
    evidence: string;
    about: string;
    resume: string;
    menu: string;
    close: string;
  };
  hero: {
    kicker: string;
    titleLines: readonly string[];
    titleAccent: string;
    lede: string;
    intro: string;
    primary: string;
    secondary: string;
    portraitAlt: string;
    portraitCaption: string;
    portraitNote: string;
    scroll: string;
  };
  ticker: readonly string[];
  proof: {
    kicker: string;
    title: string;
    note: string;
    items: readonly RecordProof[];
  };
  gallery: {
    kicker: string;
    title: string;
    intro: string;
    cta: string;
    cardCta: string;
    hint: string;
    progress: string;
  };
  flagship: {
    kicker: string;
    title: string;
    lede: string;
    bigTop: string;
    bigBottom: string;
    bigLabel: string;
    scope: string;
    ladderLabel: string;
    ladder: readonly RecordLadderStep[];
    traceTitle: string;
    traces: readonly { value: string; label: string }[];
    resultLabel: string;
    resultValue: string;
    resultNote: string;
  };
  method: {
    kicker: string;
    title: string;
    intro: string;
    artifactLabel: string;
    steps: readonly RecordMethodStep[];
  };
  ecosystem: {
    kicker: string;
    title: string;
    intro: string;
    rowA: readonly string[];
    rowB: readonly string[];
    layersTitle: string;
    layersIntro: string;
    proofLabel: string;
    productsLabel: string;
  };
  evidence: {
    kicker: string;
    title: string;
    intro: string;
    mergedTitle: string;
    bugsTitle: string;
    snapshot: string;
    cta: string;
    mergedMeta: string;
    bugMeta: string;
    reposLabel: string;
    contributionsLabel: string;
  };
  notes: {
    kicker: string;
    title: string;
    intro: string;
    items: readonly RecordNote[];
  };
  about: {
    kicker: string;
    title: string;
    body: string;
    body2: string;
    portraitAlt: string;
    facts: readonly { label: string; value: string }[];
    closing: string;
  };
  contact: {
    kicker: string;
    title: string;
    intro: string;
    email: string;
    links: readonly { label: string; href: string; external?: boolean }[];
    marquee: string;
    backToTop: string;
  };
  footer: {
    note: string;
    rights: string;
  };
  index: {
    selectedTitle: string;
    selectedIntro: string;
    filterAll: string;
    filterClient: string;
    filterPractice: string;
    empty: string;
    previewHint: string;
    explorationsTitle: string;
    explorationsIntro: string;
    notesTitle: string;
    otherTitle: string;
    contributionsTitle: string;
    experienceTitle: string;
    resumeTitle: string;
    resumeBody: string;
    resumeCta: string;
    githubCta: string;
    contactCta: string;
  };
  casePage: {
    back: string;
    contents: string;
    evidence: string;
    sources: string;
    next: string;
    contact: string;
    statusLabel: string;
    platformsLabel: string;
    scope: string;
    archiveNote: string;
  };
  notFound: {
    kicker: string;
    title: string;
    body: string;
    cta: string;
  };
};

export const recordCopy: Record<RecordLanguage, RecordCopy> = {
  zh: {
    meta: {
      role: "AI 应用交付工程师（FDE）",
      location: "上海 · 驻场交付中",
      issue: "交付记录 / 2026",
      availability: "关注 FDE、Agent 工作流与企业 AI 应用机会"
    },
    nav: {
      work: "项目",
      method: "方法",
      evidence: "证据",
      about: "工作之外",
      resume: "简历",
      menu: "打开目录",
      close: "关闭目录"
    },
    hero: {
      kicker: "游文君 / WENJUN YOU",
      titleLines: ["交付", "记录"],
      titleAccent: "记录",
      lede: "把模糊需求，交付成可运行的系统。",
      intro: "企业 AI 应用 / 驻场 FDE / 上海",
      primary: "看交付记录",
      secondary: "查看简历",
      portraitAlt: "游文君的个人照片",
      portraitCaption: "上海 · 2026",
      portraitNote: "驻场交付 / FDE",
      scroll: "向下滚动 / SCROLL"
    },
    ticker: [
      "70+ → 9.96s 整体响应",
      "2,041 条迁移记录",
      "0 项未解释差异",
      "225 题 UI 验收",
      "889 份文档 → 235 QA + 184 知识卡",
      "Brief → Build → Eval → Handoff",
      "Token is oxygen!",
      "∞ 无限进步"
    ],
    proof: {
      kicker: "证据先于形容词",
      title: "数字先说话。",
      note: "同一项目不同阶段、不同题集的测量，不作为生产 SLA。",
      items: [
        {
          display: "70+ → 9.96s",
          label: "整体响应",
          note: "客服链路 → 妙搭查询台"
        },
        {
          display: "2,041",
          label: "迁移记录",
          note: "9 表 / 38,819 单元格",
          to: 2041,
          formatComma: true
        },
        {
          display: "0",
          label: "未解释差异",
          note: "全量回读",
          to: 0
        },
        {
          display: "225",
          label: "题 UI 验收",
          note: "平均 9.96s / P95 14.46s",
          to: 225
        }
      ]
    },
    gallery: {
      kicker: "01 / 精选项目",
      title: "把结果做出来。",
      intro:
        "三个项目，三种交付判断。点开看证据。",
      cta: "全部项目",
      cardCta: "打开案例",
      hint: "横向滚动 / 拖动查看",
      progress: "项目进度"
    },
    flagship: {
      kicker: "02 / 旗舰数据故事",
      title: "70 秒，\n去了哪里？",
      lede:
        "把链路拆开，再逐项修。",
      bigTop: "70+",
      bigBottom: "9.96s",
      bigLabel: "从项目起点到妙搭查询台 225 题 UI 验收平均",
      scope: "同一项目不同阶段，不是同一题集 A/B；不作为生产 SLA。",
      ladderLabel: "测量阶梯 / 秒",
      ladder: [
        {
          label: "原始客服链路",
          range: "70+ s",
          display: "70+",
          width: 100,
          note: "项目起点"
        },
        {
          label: "首轮优化",
          range: "74–78 → 52–55 s",
          display: "52–55",
          width: 74,
          note: "平均响应"
        },
        {
          label: "后续整链中位",
          range: "30+ s",
          display: "30+",
          width: 43,
          note: "继续优化"
        },
        {
          label: "妙搭查询台",
          range: "9.96 s",
          display: "9.96",
          width: 14,
          note: "225 题 UI 验收平均"
        }
      ],
      traceTitle: "238 条 trace 定位到的三件事",
      traces: [
        { value: "12.7–13.0s", label: "入口排队" },
        { value: "46.5KB", label: "上下文截断" },
        { value: "2 次", label: "二次回读" }
      ],
      resultLabel: "最后落到",
      resultValue: "9.96s / P95 14.46s",
      resultNote:
        "225 题真实 UI 验收；不同阶段测量，不作为生产 SLA。"
    },
    method: {
      kicker: "03 / 方法",
      title: "一条闭环，四个动作。",
      intro:
        "需求、实现、评测、交接，共用同一条证据链。",
      artifactLabel: "真实产物",
      steps: [
        {
          index: "01",
          code: "BRIEF",
          short: "受理",
          title: "先把问题变成可验收的记录。",
          body:
            "对齐负责人、紧急程度、验收标准、仓库与业务上下文；把来源任务 ID 固定下来，避免“做着做着换了问题”。",
          artifact: "来源记录 / 验收标准 / 责任人"
        },
        {
          index: "02",
          code: "BUILD",
          short: "构建",
          title: "在聚焦分支里完成最小完整切片。",
          body:
            "Issue 进入工程系统，分支只改必要范围；PR 带上上下文、范围、标签和验收检查，CI 决定工作是否真的完成。",
          artifact: "Issue / 聚焦 diff / PR + CI"
        },
        {
          index: "03",
          code: "EVAL",
          short: "评测",
          title: "先修测量，再判断智能体。",
          body:
            "逐题 JSONL、断点续跑、统一判定；把能力水位、真实可用率和平台瓶颈分开，不用一个数字讲完所有问题。",
          artifact: "225 题 UI 验收 / 29 题 A/B / trace 诊断"
        },
        {
          index: "04",
          code: "HANDOFF",
          short: "交接",
          title: "用证据关闭闭环，而不是口头宣布。",
          body:
            "状态、链接、阻塞项、回滚 SQL、验收结果和下一责任人一起交付；原始业务记录必须能看见工程真源。",
          artifact: "回写记录 / 回滚方案 / 交接文档"
        }
      ]
    },
    ecosystem: {
      kicker: "04 / 生态与工具",
      title: "飞书是底座，工程是证据。",
      intro:
        "Base、Aily、妙搭、OpenAPI 与 CLI 把业务界面接到真实系统；React、NestJS、PostgreSQL 和 CI 负责让它们可运行、可回归。",
      rowA: [
        "飞书 Base",
        "Aily",
        "妙搭",
        "OpenAPI",
        "Webhook",
        "CLI",
        "Udesk",
        "GitHub",
        "Adobe Express",
        "Canva Apps",
        "Office Add-ins",
        "Safari WebExtension"
      ],
      rowB: [
        "React",
        "TypeScript",
        "NestJS",
        "PostgreSQL",
        "Python",
        "FastAPI",
        "Docker",
        "n8n",
        "Playwright",
        "Drizzle",
        "SSE",
        "CI"
      ],
      layersTitle: "四层飞书能力模型",
      layersIntro: "从业务界面到治理交接，每一层都要有可核查的产物。",
      proofLabel: "证据",
      productsLabel: "产品"
    },
    evidence: {
      kicker: "05 / 公开证据",
      title: "代码是公开的。",
      intro:
        "可点开的 PR、Issue 与仓库；这里只放数字，细节在 GitHub。",
      mergedTitle: "已合并 PR",
      bugsTitle: "已验证 Bug",
      snapshot: "GitHub 快照 · 2026-07-13 · 37 个公开仓库 / 933 次年度贡献",
      cta: "在 GitHub 查看全部",
      mergedMeta: "合并",
      bugMeta: "报告",
      reposLabel: "公开仓库",
      contributionsLabel: "年度贡献"
    },
    notes: {
      kicker: "06 / 工作判断",
      title: "三条判断。",
      intro: "各自对应一条可打开的案例。",
      items: [
        {
          quote: "平台问题，不是模型问题。",
          body:
            "238 条 trace 把慢点拆到入口排队、索引切片、上下文截断和二次回读；先修链路，再谈模型。",
          href: "/work/feishu-customer-service-gateway/",
          linkLabel: "看这条交付"
        },
        {
          quote: "先修测评工具，再判断智能体。",
          body:
            "采集器把已回复记成无回复，后续又让每题跑满等待上限；不先修测量，任何结论都不可信。",
          href: "/work/customer-service-evaluation/",
          linkLabel: "看这次修复"
        },
        {
          quote: "知识库，不等于实时业务状态。",
          body:
            "规范留在知识层，当前状态用精确记录查询读取；权限和动作边界要在工具层限定。",
          href: "/work/aily-knowledge-and-actions/",
          linkLabel: "看这份架构评审"
        }
      ]
    },
    about: {
      kicker: "07 / 工作之外",
      title: "做交付也像办案。",
      body:
        "最爱《名侦探柯南》。先把事实收齐，再让证据说话。",
      body2:
        "一句信条、一个∞、一张彩色照片。",
      portraitAlt: "游文君的彩色人像",
      facts: [
        { label: "最爱", value: "名侦探柯南" },
        { label: "信条", value: "Token is oxygen!" },
        { label: "进度", value: "∞ 无限进步" },
        { label: "坐标", value: "上海" }
      ],
      closing: "真相只有一个。交付也是。"
    },
    contact: {
      kicker: "08 / 联系",
      title: "Let's ship the loop.",
      intro:
        "找 FDE / AI 应用交付 / Agent 工作流？发来问题描述即可。",
      email: "wenjunyou2002@outlook.com",
      links: [
        { label: "GitHub", href: "https://github.com/Wenjunyun123", external: true },
        { label: "简历", href: "/resume/" },
        { label: "Wenjun OS", href: "/os/" }
      ],
      marquee: "∞ 无限进步 · Token is oxygen! · 把证据带回来",
      backToTop: "回到顶部"
    },
    footer: {
      note: "游文君 / Wenjun You · AI 应用交付工程师（FDE）",
      rights: "© 2026 · 上海"
    },
    index: {
      selectedTitle: "精选项目",
      selectedIntro:
        "两条客户交付主线，加上实践与笔记。点开看证据。",
      filterAll: "全部",
      filterClient: "客户交付",
      filterPractice: "实践与笔记",
      empty: "这个筛选下暂时没有条目。",
      previewHint: "悬停查看 / HOVER TO PREVIEW",
      explorationsTitle: "经历与实践",
      explorationsIntro:
        "技术判断、架构笔记与公开代码贡献。完整经历放在简历里。",
      notesTitle: "实践与笔记",
      otherTitle: "其他交付",
      contributionsTitle: "公开代码贡献",
      experienceTitle: "工作经历",
      resumeTitle: "公开简历",
      resumeBody: "完整工作经历、项目证据与技能栈，以可打印简历形式提供。",
      resumeCta: "打开公开简历",
      githubCta: "在 GitHub 查看全部贡献",
      contactCta: "聊聊你的业务问题"
    },
    casePage: {
      back: "返回",
      contents: "本页目录",
      evidence: "证据面板",
      sources: "公开来源",
      next: "下一个案例",
      contact: "想了解实现细节？邮件联系我。",
      statusLabel: "证据状态",
      platformsLabel: "平台",
      scope: "证据边界",
      archiveNote: "案例内容来自已公开的材料与项目记录；客户名称与原始数据已脱敏。"
    },
    notFound: {
      kicker: "404 / 页面未找到",
      title: "这个页面还没到这里。",
      body: "地址可能变了，或者这条记录还没公开。回到交付记录继续看。",
      cta: "返回交付记录"
    }
  },
  en: {
    meta: {
      role: "AI Application Delivery Engineer (FDE)",
      location: "Shanghai · onsite delivery",
      issue: "THE DELIVERY RECORD / 2026",
      availability: "Open to FDE, agent workflow, and enterprise AI application roles"
    },
    nav: {
      work: "Work",
      method: "Method",
      evidence: "Evidence",
      about: "Off-duty",
      resume: "Resume",
      menu: "Open menu",
      close: "Close menu"
    },
    hero: {
      kicker: "WENJUN YOU / 游文君",
      titleLines: ["THE", "RECORD"],
      titleAccent: "RECORD",
      lede: "Turn ambiguous needs into systems that run.",
      intro: "Enterprise AI / onsite FDE / Shanghai",
      primary: "See the record",
      secondary: "View resume",
      portraitAlt: "Portrait of Wenjun You",
      portraitCaption: "Shanghai · 2026",
      portraitNote: "Onsite delivery / FDE",
      scroll: "Scroll / 向下滚动"
    },
    ticker: [
      "70+ → 9.96s overall",
      "2,041 migrated records",
      "0 unexplained differences",
      "225 UI questions",
      "889 docs → 235 QA + 184 cards",
      "Brief → Build → Eval → Handoff",
      "Token is oxygen!",
      "∞ Keep improving"
    ],
    proof: {
      kicker: "Evidence before adjectives",
      title: "Let the numbers speak.",
      note: "Measurements from different stages and question sets; not a production SLA.",
      items: [
        {
          display: "70+ → 9.96s",
          label: "Overall response",
          note: "Service chain → Miaoda desk"
        },
        {
          display: "2,041",
          label: "Migrated records",
          note: "9 tables / 38,819 cells",
          to: 2041,
          formatComma: true
        },
        {
          display: "0",
          label: "Unexplained diffs",
          note: "Full read-back",
          to: 0
        },
        {
          display: "225",
          label: "UI questions",
          note: "9.96s avg / 14.46s P95",
          to: 225
        }
      ]
    },
    gallery: {
      kicker: "01 / Selected work",
      title: "Make it work.",
      intro:
        "Three projects, three delivery judgments. Open a card for the evidence.",
      cta: "All work",
      cardCta: "Open the case",
      hint: "Scroll / drag sideways",
      progress: "Project progress"
    },
    flagship: {
      kicker: "02 / Flagship data story",
      title: "Where did the\n70 seconds go?",
      lede:
        "Split the chain, then fix each layer.",
      bigTop: "70+",
      bigBottom: "9.96s",
      bigLabel: "From the project baseline to the 225-question UI acceptance average on the Miaoda desk",
      scope: "Different stages of one project, not an A/B on one question set; not a production SLA.",
      ladderLabel: "Measurement ladder / seconds",
      ladder: [
        {
          label: "Original service chain",
          range: "70+ s",
          display: "70+",
          width: 100,
          note: "Project baseline"
        },
        {
          label: "First optimization",
          range: "74–78 → 52–55 s",
          display: "52–55",
          width: 74,
          note: "Average response"
        },
        {
          label: "Later chain median",
          range: "30+ s",
          display: "30+",
          width: 43,
          note: "Continued optimization"
        },
        {
          label: "Miaoda query desk",
          range: "9.96 s",
          display: "9.96",
          width: 14,
          note: "225-question UI average"
        }
      ],
      traceTitle: "Three findings from 238 traces",
      traces: [
        { value: "12.7–13.0s", label: "Entrance queue" },
        { value: "46.5KB", label: "Context truncation" },
        { value: "2×", label: "Second read-back" }
      ],
      resultLabel: "Landed at",
      resultValue: "9.96s / P95 14.46s",
      resultNote:
        "225 real UI questions; measurements from different stages, not a production SLA."
    },
    method: {
      kicker: "03 / Method",
      title: "One loop. Four moves.",
      intro:
        "Request, build, evaluation, and handoff share one evidence chain.",
      artifactLabel: "Real artifacts",
      steps: [
        {
          index: "01",
          code: "BRIEF",
          short: "Brief",
          title: "Turn the problem into an acceptable record.",
          body:
            "Align owner, urgency, acceptance criteria, repository, and business context; freeze the source task ID so the problem cannot quietly change mid-build.",
          artifact: "Source record / acceptance criteria / owner"
        },
        {
          index: "02",
          code: "BUILD",
          short: "Build",
          title: "Build the smallest complete slice on a focused branch.",
          body:
            "The Issue enters engineering; the branch touches only what is needed. The PR carries context, scope, labels, and acceptance checks; CI decides whether the work is done.",
          artifact: "Issue / focused diff / PR + CI"
        },
        {
          index: "03",
          code: "EVAL",
          short: "Evaluate",
          title: "Fix the measurement before judging the agent.",
          body:
            "Per-question JSONL, resumable runs, unified grading. Keep capability, real usability, and platform limits separate instead of collapsing them into one number.",
          artifact: "225-question UI run / 29-question A/B / traces"
        },
        {
          index: "04",
          code: "HANDOFF",
          short: "Handoff",
          title: "Close with evidence, not a verbal claim.",
          body:
            "Ship status, links, blockers, rollback SQL, acceptance results, and the next owner together. The source business record must see the engineering truth.",
          artifact: "Write-back / rollback plan / handoff notes"
        }
      ]
    },
    ecosystem: {
      kicker: "04 / Ecosystem & tools",
      title: "Lark is the base. Engineering is the evidence.",
      intro:
        "Base, Aily, Miaoda, OpenAPI, and CLI connect the business surface to real systems; React, NestJS, PostgreSQL, and CI keep them runnable and testable.",
      rowA: [
        "Lark Base",
        "Aily",
        "Miaoda",
        "OpenAPI",
        "Webhook",
        "CLI",
        "Udesk",
        "GitHub",
        "Adobe Express",
        "Canva Apps",
        "Office Add-ins",
        "Safari WebExtension"
      ],
      rowB: [
        "React",
        "TypeScript",
        "NestJS",
        "PostgreSQL",
        "Python",
        "FastAPI",
        "Docker",
        "n8n",
        "Playwright",
        "Drizzle",
        "SSE",
        "CI"
      ],
      layersTitle: "Four layers of the Lark capability model",
      layersIntro: "From business surface to governance and handoff, every layer leaves a checkable artifact.",
      proofLabel: "Evidence",
      productsLabel: "Products"
    },
    evidence: {
      kicker: "05 / Public evidence",
      title: "The code is public.",
      intro:
        "PRs, issues, and repositories you can open. Numbers here; details on GitHub.",
      mergedTitle: "Merged PRs",
      bugsTitle: "Verified bugs",
      snapshot: "GitHub snapshot · 2026-07-13 · 37 public repos / 933 contributions last year",
      cta: "See everything on GitHub",
      mergedMeta: "Merged",
      bugMeta: "Reported",
      reposLabel: "Public repos",
      contributionsLabel: "Contributions / yr"
    },
    notes: {
      kicker: "06 / Field notes",
      title: "Three judgments.",
      intro: "Each one maps to a case you can open.",
      items: [
        {
          quote: "A platform problem, not a model problem.",
          body:
            "238 traces split the delay into entrance queue, index slicing, context truncation, and a second read-back. Fix the chain before blaming the model.",
          href: "/work/feishu-customer-service-gateway/",
          linkLabel: "Read the delivery"
        },
        {
          quote: "Fix the evaluator before judging the agent.",
          body:
            "The collector marked replies as missing, then made every question hit the timeout. Without fixing measurement, no conclusion is trustworthy.",
          href: "/work/customer-service-evaluation/",
          linkLabel: "Read the fix"
        },
        {
          quote: "A knowledge base is not live business state.",
          body:
            "Keep policies in the knowledge layer; read current state with exact record queries. Bound permissions and actions at the tool layer.",
          href: "/work/aily-knowledge-and-actions/",
          linkLabel: "Read the review"
        }
      ]
    },
    about: {
      kicker: "07 / Off-duty",
      title: "Delivery is a bit like detective work.",
      body:
        "My favorite is Detective Conan. Collect the facts first, then let the evidence speak.",
      body2:
        "A motto, an infinity, a color portrait.",
      portraitAlt: "Color portrait of Wenjun You",
      facts: [
        { label: "Favorite", value: "Detective Conan" },
        { label: "Motto", value: "Token is oxygen!" },
        { label: "Progress", value: "∞ Keep improving" },
        { label: "Based in", value: "Shanghai" }
      ],
      closing: "There is only one truth. Delivery is the same."
    },
    contact: {
      kicker: "08 / Contact",
      title: "Let's ship the loop.",
      intro:
        "Hiring for FDE, AI delivery, or agent workflows? Send a problem statement.",
      email: "wenjunyou2002@outlook.com",
      links: [
        { label: "GitHub", href: "https://github.com/Wenjunyun123", external: true },
        { label: "Resume", href: "/resume/" },
        { label: "Wenjun OS", href: "/os/" }
      ],
      marquee: "∞ Keep improving · Token is oxygen! · Bring back the evidence",
      backToTop: "Back to top"
    },
    footer: {
      note: "Wenjun You / 游文君 · AI Application Delivery Engineer (FDE)",
      rights: "© 2026 · Shanghai"
    },
    index: {
      selectedTitle: "Selected work",
      selectedIntro:
        "Two client delivery threads, plus practice notes. Open one for the evidence.",
      filterAll: "All",
      filterClient: "Client delivery",
      filterPractice: "Practice & notes",
      empty: "No entries under this filter yet.",
      previewHint: "Hover to preview",
      explorationsTitle: "Explorations",
      explorationsIntro:
        "Technical judgments, architecture notes, and public code contributions. The full history lives in the resume.",
      notesTitle: "Practice & notes",
      otherTitle: "Other deliveries",
      contributionsTitle: "Open-source contributions",
      experienceTitle: "Experience",
      resumeTitle: "Public resume",
      resumeBody: "Full work history, project evidence, and capability stack in a printable resume.",
      resumeCta: "Open the resume",
      githubCta: "All contributions on GitHub",
      contactCta: "Tell me about your business problem"
    },
    casePage: {
      back: "Back",
      contents: "On this page",
      evidence: "Evidence panel",
      sources: "Public sources",
      next: "Next case",
      contact: "Want to talk through the implementation? Send me an email.",
      statusLabel: "Evidence status",
      platformsLabel: "Platforms",
      scope: "Evidence boundary",
      archiveNote: "Case material comes from published materials and project records; client names and raw data are anonymized."
    },
    notFound: {
      kicker: "404 / Not found",
      title: "This page hasn't arrived yet.",
      body: "The address may have changed, or this record is not public yet. Head back to the delivery record.",
      cta: "Back to the record"
    }
  }
};
