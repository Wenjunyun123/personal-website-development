import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  educationSignals,
  experienceItems,
  featuredProjects,
  profileStats,
  skillGroups
} from "../../content/profile";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "公开简历 | 游文君 Wenjun You",
  description: "游文君的 AI 交付工程师（FDE）公开简历。"
};

export default function ResumePage() {
  return (
    <main className={styles.page}>
      <nav className={styles.topbar} aria-label="简历页面导航">
        <Link href="/#works">← 返回个人网站</Link>
        <span>PUBLIC RESUME / 2026</span>
      </nav>

      <header className={styles.hero}>
        <Image
          className={styles.portrait}
          src="/profile/wenjun.png"
          alt="游文君证件照"
          width={210}
          height={280}
          priority
        />
        <div>
          <p className={styles.eyebrow}>AI DELIVERY ENGINEER · FDE</p>
          <h1>游文君 <span>Wenjun You</span></h1>
          <p className={styles.lead}>
            我把模糊业务需求拆成界面、Agent、自动化、发布检查和带证据的交接闭环。
            实践横跨插件交付、飞书 Base、CLI 工作流、数据管道与发布治理。
          </p>
          <div className={styles.actions}>
            <a href="mailto:wenjunyou2002@outlook.com">wenjunyou2002@outlook.com</a>
            <a href="https://github.com/Wenjunyun123" target="_blank" rel="noreferrer">GitHub / Wenjunyun123</a>
          </div>
        </div>
      </header>

      <section className={styles.stats} aria-label="交付数据">
        {profileStats.map(([value, , label]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>01</span>
          <h2>工作经历</h2>
        </div>
        <div className={styles.timeline}>
          {experienceItems.map((item) => (
            <article key={item.company}>
              <div className={styles.meta}>
                <time>{item.period}</time>
                <span>{item.companyZh}</span>
              </div>
              <div>
                <h3>{item.roleZh}</h3>
                <p>{item.summaryZh}</p>
                <ul>{item.evidence.map((signal) => <li key={signal}>{signal}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>02</span>
          <h2>旗舰项目</h2>
        </div>
        <div className={styles.projects}>
          {featuredProjects.map((project) => (
            <Link href={`/cases/${project.slug}`} key={project.slug} prefetch={false}>
              <span>{project.number} / {project.labelZh}</span>
              <h3>{project.titleZh}</h3>
              <p>{project.summaryZh}</p>
              <ul>{project.proofZh.map((proof) => <li key={proof}>{proof}</li>)}</ul>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>03</span>
          <h2>能力栈</h2>
        </div>
        <div className={styles.skills}>
          {skillGroups.map(([, , title, body]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>04</span>
          <h2>教育与荣誉</h2>
        </div>
        <div className={styles.education}>
          <article>
            <h3>{educationSignals.education.titleZh}</h3>
            <p>{educationSignals.education.copyZh}</p>
          </article>
          <ul>
            {educationSignals.honors.map(([, honor]) => <li key={honor}>{honor}</li>)}
          </ul>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>Open to AI 应用、FDE、Agent 工作流与插件交付机会。</p>
        <a href="mailto:wenjunyou2002@outlook.com">发送问题描述 →</a>
      </footer>
    </main>
  );
}
