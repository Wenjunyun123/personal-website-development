import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  educationSignals,
  experienceItems,
  skillGroups
} from "../../content/profile";
import { portfolioWork } from "../../content/portfolio";
import styles from "./resume.module.css";

export const metadata: Metadata = {
  title: "公开简历 | 游文君 Wenjun You",
  description: "游文君的 AI 应用交付工程师（FDE）公开简历。"
};

export default function ResumePage() {
  return (
    <main className={styles.page}>
      <nav className={styles.topbar} aria-label="简历页面导航">
        <Link href="/">← 返回个人网站</Link>
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
            AI 应用交付工程师（FDE），在广州市负熵云信息科技有限公司驻场客户现场。
            从业务调研、需求拆解和方案设计出发，完成知识/数据建模、接口集成、评测验收与交接文档，
            把模糊需求推进到可运行、可验收的 AI 应用。
          </p>
          <div className={styles.actions}>
            <a href="mailto:wenjunyou2002@outlook.com">wenjunyou2002@outlook.com</a>
            <a href="https://github.com/Wenjunyun123" target="_blank" rel="noreferrer">GitHub / Wenjunyun123</a>
          </div>
        </div>
      </header>

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
                {"bullets" in item ? (
                  <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                ) : (
                  <ul>{item.evidence.map((signal) => <li key={signal}>{signal}</li>)}</ul>
                )}
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
          {portfolioWork.map((project) => (
            <Link href={`/work/${project.slug}/`} key={project.slug} prefetch={false}>
              <span>{project.categoryZh}</span>
              <h3>{project.titleZh}</h3>
              <p>{project.summaryZh}</p>
              <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
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
        <p>围绕真实业务问题，构建可用、可验证、可交接的系统。最近更新：2026.11。</p>
        <a href="mailto:wenjunyou2002@outlook.com">发送问题描述 →</a>
      </footer>
    </main>
  );
}
