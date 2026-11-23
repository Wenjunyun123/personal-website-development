import Image from "next/image";
import Link from "next/link";
import { portfolioWork } from "../../content/portfolio";
import {
  experienceItems,
  featuredProjects,
  feishuLayers,
  otherProjects,
  profileStats
} from "../../content/profile";
import styles from "./work-report.module.css";

const fdeProof = [
  ["70+→10s", "客服与资料查询"],
  ["74–78→52–55s", "首轮优化后平均"],
  ["9.96s", "妙搭查询台平均"],
  ["0", "迁移未解释差异"]
] as const;

const capabilityColumns = [
  {
    number: "01",
    title: "Business modeling",
    summary: "需求拆解 / 数据模型 / 权限 / 验收",
    items: [
      `${featuredProjects[1].titleZh}：把经营事件拆成可观测条件`,
      `${otherProjects[0][2]}：用状态字段承接业务真源`,
      "把角色权限、人工审批与验收证据写入流程"
    ]
  },
  {
    number: "02",
    title: "Engineering delivery",
    summary: "插件 / Agent / CLI / PR-CI / 发布验证",
    items: [
      `${featuredProjects[0].titleZh}：连接业务记录与工程交付`,
      `${featuredProjects[2].titleZh}：治理包体、审核与发布队列`,
      `${otherProjects[1][2]}：组合 Bot、API 与自动化节点`
    ]
  },
  {
    number: "03",
    title: "Team agents",
    summary: "经验 → 规则 / 触发器 / 审计资产",
    items: [
      "把个人判断写成团队可复用的事件规则",
      "让关键变化触发通知、调查与人工确认",
      "保留来源、权限、动作和结果的审计链"
    ]
  }
] as const;

const experienceEvidenceZh: Record<string, string> = {
  "70+→10s service & query": "客服与资料查询 70+→10s",
  "74–78→52–55s service avg": "首轮优化后平均 74–78→52–55s",
  "9.96s Miaoda query desk": "妙搭查询台平均响应 9.96s",
  "0 migration differences": "迁移 0 项未解释差异",
  "60 public add-ons": "60 个公开 add-ons 核验",
  "62 packages audited": "62 个包体审计",
  "16 Office manifests": "16 个 Office manifests",
  "3× throughput": "3× 商品图生成效率",
  "40% lower manual cost": "-40% 人工处理成本",
  "≥70% usable rate": "≥70% 商品图可用率",
  "~30% processing efficiency gain": "~30% 数据处理效率提升",
  "multi-source ETL": "多源 ETL",
  "alerting design": "异常告警设计"
};

export function WorkReport() {
  const flagshipProjects = featuredProjects.slice(0, 3);

  return (
    <section className={styles.report} aria-labelledby="work-report-title">
      <div className={styles.inner}>
        <header className={styles.hero}>
          <div className={styles.heroMeta}>
            <span>游文君 / Wenjun You</span>
            <span>AI 应用交付工程师（FDE）</span>
            <span>上海，2026</span>
          </div>
          <div className={styles.heroTitleRow}>
            <h1 id="work-report-title">Token is oxygen!</h1>
            <div className={styles.heroNote} aria-hidden="true">
              <span>∞</span>
              <p>无限进步<br />Keep shipping.</p>
            </div>
          </div>
          <div className={styles.heroLower}>
            <p className={styles.positioning}>
              我是一名 AI 应用交付工程师（FDE）。我在客户现场把模糊需求做成可运行、可评测、可交接的 AI 应用，
              用响应时间、交付质量与业务产出证明效果，而不是只停留在功能演示。
            </p>
            <ol className={styles.deliveryRail} aria-label="交付流程">
              {["Brief", "Build", "Eval", "Handoff"].map((stage, index) => (
                <li key={stage}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {stage}
                </li>
              ))}
              <li className={styles.railInfinity}>
                <span aria-hidden="true">∞</span>
                Progress
              </li>
            </ol>
          </div>
        </header>

        <section className={styles.capabilities} aria-labelledby="capability-title">
          <h2 className={styles.visuallyHidden} id="capability-title">三类交付能力</h2>
          {capabilityColumns.map((column) => (
            <article className={styles.capability} key={column.number}>
              <div className={styles.capabilityHeading}>
                <span>{column.number}</span>
                <h3>{column.title}</h3>
              </div>
              <p>{column.summary}</p>
              <ul>
                {column.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </section>

        <section className={styles.feishu} aria-labelledby="feishu-title">
          <div className={styles.sectionHeading}>
            <h2 id="feishu-title">飞书生态</h2>
            <p>不是工具清单，而是把飞书组合成企业提效方案的能力。</p>
          </div>
          <p className={styles.feishuThesis}>
            我熟悉飞书生态里的产品边界，也知道怎么把它们组合成企业提效链路：先在 Base 里把业务数据变成真源，再用 Aily/妙搭做知识与问答，用机器人、Webhook、开放平台连接外部系统，最后用权限、审批和评测把交付闭环。
          </p>
          <div className={styles.feishuLedger}>
            {feishuLayers.map((layer) => (
              <article className={styles.feishuRow} key={layer.number}>
                <b>{layer.number}</b>
                <div className={styles.feishuLayer}>
                  <h3>{layer.titleZh}</h3>
                  <span>{layer.productsZh}</span>
                </div>
                <p>{layer.methodZh}</p>
                <small>{layer.proofZh}</small>
              </article>
            ))}
          </div>
          <p className={styles.feishuNote}>
            从 Base 的业务数据，到 Aily/妙搭的智能能力，再到机器人、开放平台与审批的连接和治理——每一层都走到验收与交接，而不是停在功能演示。
          </p>
        </section>

        <section className={styles.portfolio} aria-labelledby="fde-title">
          <div className={styles.sectionHeading}>
            <h2 id="fde-title">企业 AI 交付主线</h2>
            <p>两条线都从需求拆解走到验收与交接。数字来自客户现场记录，已脱敏。</p>
          </div>

          <div className={`${styles.stats} ${styles.fdeStats}`} aria-label="FDE 交付效果">
            {fdeProof.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className={styles.projectGrid}>
            {portfolioWork.map((project, index) => (
              <article className={styles.projectCard} key={project.slug}>
                <Link className={styles.projectLink} href={`/work/${project.slug}/`} prefetch={false}>
                  <figure className={styles.projectFigure}>
                    <Image
                      src={project.image}
                      alt={`${project.titleZh} 的界面记录`}
                      width={1200}
                      height={675}
                      sizes="(max-width: 900px) 100vw, 56vw"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </figure>
                  <div className={styles.projectBody}>
                    <div className={styles.projectMeta}>
                      <span>{project.period}</span>
                      <strong>{project.categoryZh}</strong>
                    </div>
                    <h3>{project.titleZh}</h3>
                    <p className={styles.projectSummary}>{project.summaryZh}</p>
                    <ul className={styles.proofList}>
                      {project.metrics.map(([value, label]) => <li key={label}><b>{value}</b>{label}</li>)}
                    </ul>
                    <span className={styles.caseCta}>阅读完整案例</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.portfolio} aria-labelledby="portfolio-title">
          <div className={styles.sectionHeading}>
            <h2 id="portfolio-title">更多交付证据</h2>
            <p>产品界面、发布治理与模拟业务系统，来自实习与个人实践。</p>
          </div>

          <div className={styles.stats} aria-label="简历支撑的量化成果">
            {profileStats.map(([value, , labelZh]) => (
              <div key={labelZh}>
                <strong>{value.replace("−", "-")}</strong>
                <span>{labelZh}</span>
              </div>
            ))}
          </div>

          <div className={styles.projectGrid}>
            {flagshipProjects.map((project) => {
              const isTeamAgent = project.slug === "lark-base-team-agent-commerce-ops";

              return (
                <article
                  className={`${styles.projectCard} ${styles.projectCardCompact} ${isTeamAgent ? styles.teamAgentCard : ""}`}
                  key={project.slug}
                >
                  <Link className={`${styles.projectLink} ${styles.projectLinkCompact}`} href={`/cases/${project.slug}`} prefetch={false}>
                    <div className={styles.projectBody}>
                      <div className={styles.projectMeta}>
                        <span>{project.number}</span>
                        <strong>{isTeamAgent ? "模拟业务实践，实现中" : project.labelZh}</strong>
                      </div>
                      <h3>{project.titleZh}</h3>
                      <p className={styles.projectSummary}>
                        {isTeamAgent ? `拟验证：${project.summaryZh}` : project.summaryZh}
                      </p>
                      <ul className={styles.proofList}>
                        {project.proofZh.map((proof) => (
                          <li key={proof}><span>{isTeamAgent ? `观测目标 / ${proof}` : proof}</span></li>
                        ))}
                      </ul>
                      <span className={styles.caseCta}>阅读完整案例</span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.additional} aria-labelledby="additional-title">
          <div className={styles.sectionHeading}>
            <h2 id="additional-title">其他交付轨道</h2>
          </div>
          <div className={styles.additionalGrid}>
            {otherProjects.map(([, , titleZh, stackZh], index) => (
              <article key={titleZh}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{titleZh}</h3>
                <p>{stackZh}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.experience} aria-labelledby="experience-title">
          <div className={styles.sectionHeading}>
            <h2 id="experience-title">实践履历</h2>
          </div>
          <div className={styles.experienceList}>
            {experienceItems.map((item) => (
              <article key={`${item.company}-${item.period}`}>
                <time>{item.period}</time>
                <div className={styles.experienceMain}>
                  <p>{item.roleZh}</p>
                  <h3>{item.companyZh}</h3>
                  <span>{item.summaryZh}</span>
                </div>
                <ul>
                  {item.evidence.map((evidence) => (
                    <li key={evidence}>{experienceEvidenceZh[evidence] ?? evidence}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <footer className={styles.caseFooter} aria-label="工作信条">
          <p className={styles.footerMotto}><span>∞</span> 无限进步</p>
          <p className={styles.footerLine}>每份案卷都从一口氧气开始，以一条证据结束。</p>
          <small>Wenjun You，Shanghai<br />真相只有一个</small>
        </footer>
      </div>
    </section>
  );
}
