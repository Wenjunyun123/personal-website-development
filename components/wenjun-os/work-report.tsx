import Link from "next/link";
import {
  experienceItems,
  featuredProjects,
  otherProjects,
  profileStats
} from "../../content/profile";
import styles from "./work-report.module.css";

const capabilityColumns = [
  {
    number: "01",
    title: "BUSINESS MODELING",
    summary: "需求拆解 / 数据模型 / 权限 / 验收",
    items: [
      `${featuredProjects[1].titleZh}：把经营事件拆成可观测条件`,
      `${otherProjects[0][2]}：用状态字段承接业务真源`,
      "把角色权限、人工审批与验收证据写入流程"
    ]
  },
  {
    number: "02",
    title: "ENGINEERING DELIVERY",
    summary: "插件 / Agent / CLI / PR-CI / 发布验证",
    items: [
      `${featuredProjects[0].titleZh}：连接业务记录与工程交付`,
      `${featuredProjects[2].titleZh}：治理包体、审核与发布队列`,
      `${otherProjects[1][2]}：组合 Bot、API 与自动化节点`
    ]
  },
  {
    number: "03",
    title: "TEAM AGENTS",
    summary: "经验 → 规则 / 触发器 / 审计资产",
    items: [
      "把个人判断写成团队可复用的事件规则",
      "让关键变化触发通知、调查与人工确认",
      "保留来源、权限、动作和结果的审计链"
    ]
  }
] as const;

const experienceEvidenceZh: Record<string, string> = {
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
          <p className={styles.eyebrow}>WENJUN YOU / SELECTED WORK 2025—2026</p>
          <h1 id="work-report-title">1 Person + AI = One Delivery Team</h1>
          <p className={styles.positioning}>
            我是一名 AI 交付工程师（FDE）。我把模糊的业务需求拆成数据模型、界面、Agent、自动化与发布检查，
            再用 PR、CI、运行记录和验收证据把工作闭环到真实业务中。
          </p>
        </header>

        <section className={styles.capabilities} aria-labelledby="capability-title">
          <h2 className={styles.visuallyHidden} id="capability-title">三类交付能力</h2>
          {capabilityColumns.map((column) => (
            <article className={styles.capability} key={column.number}>
              <div className={styles.capabilityHeading}>
                <span>{column.number}</span>
                <h3>{column.title}</h3>
              </div>
              <div className={styles.yellowRule} aria-hidden="true" />
              <p>{column.summary}</p>
              <ul>
                {column.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </section>

        <section className={styles.portfolio} aria-labelledby="portfolio-title">
          <div className={styles.sectionHeading}>
            <p>DELIVERY EVIDENCE / 01</p>
            <h2 id="portfolio-title">作品集</h2>
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
                  className={`${styles.projectCard} ${isTeamAgent ? styles.teamAgentCard : ""}`}
                  key={project.slug}
                >
                  <Link className={styles.projectLink} href={`/cases/${project.slug}`} prefetch={false}>
                    <div className={styles.projectMeta}>
                      <span>{project.number}</span>
                      <strong>{isTeamAgent ? "模拟业务实践 · 实现中" : project.labelZh}</strong>
                    </div>
                    <h3>{project.titleZh}</h3>
                    <p className={styles.projectSummary}>
                      {isTeamAgent ? `拟验证：${project.summaryZh}` : project.summaryZh}
                    </p>
                    <ul className={styles.proofList}>
                      {project.proofZh.map((proof) => (
                        <li key={proof}>{isTeamAgent ? `观测目标 / ${proof}` : proof}</li>
                      ))}
                    </ul>
                    <span className={styles.caseCta}>阅读完整案例 <span aria-hidden="true">↗</span></span>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className={styles.additional} aria-labelledby="additional-title">
          <div className={styles.sectionHeadingCompact}>
            <p>DELIVERY TRACKS / 02</p>
            <h2 id="additional-title">其他交付轨道</h2>
          </div>
          <div className={styles.additionalGrid}>
            {otherProjects.map(([, , titleZh, stackZh], index) => (
              <article key={titleZh}>
                <span>0{index + 1}</span>
                <h3>{titleZh}</h3>
                <p>{stackZh}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.experience} aria-labelledby="experience-title">
          <div className={styles.sectionHeadingCompact}>
            <p>EXPERIENCE LEDGER / 03</p>
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
      </div>
    </section>
  );
}
