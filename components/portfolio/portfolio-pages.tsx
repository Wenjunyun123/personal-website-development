"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { experienceItems } from "../../content/profile";
import { portfolioNotes, portfolioWork, publicContributions, otherDeliveries, type PortfolioStory } from "../../content/portfolio";
import { useLanguage } from "../language-toggle";
import { ArchitecturePreview, DataMigrationPreview, EvaluationPreview, GatewayPreview, KnowledgePreview, ReleasePreview, ServiceDemo } from "./service-demo";
import { OfficeFigure } from "./company-reference";
import styles from "./portfolio.module.css";

export function PortfolioNav({ back = "/" }: { back?: string }) {
  const { language, setLanguage } = useLanguage();
  const zh = language === "zh";
  const router = useRouter();
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) router.push(back);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [back, router]);
  return <nav className={styles.pageNav} aria-label={zh ? "页面导航" : "Page navigation"}>
    <Link href={back}>{zh ? "返回" : "Back"}</Link>
    <button className={styles.language} type="button" onClick={() => setLanguage(zh ? "en" : "zh")} aria-label={zh ? "Switch to English" : "切换到中文"}>{zh ? "EN" : "中文"}</button>
  </nav>;
}

function WorkItem({ story, zh }: { story: PortfolioStory; zh: boolean }) {
  return <Link className={styles.workItem} href={`/work/${story.slug}/`}>
    <div className={styles.workImage}><Image src={story.image} alt={zh ? story.titleZh : story.title} width={1200} height={675} /></div>
    <div className={styles.workHeading}><h2>{zh ? story.titleZh : story.title}</h2><span>{story.period}</span></div>
    <p>{zh ? story.summaryZh : story.summary}</p>
    {"metrics" in story && story.metrics ? <ul className={styles.metrics}>{story.metrics.map(([value, label]) => <li key={label}><strong>{value}</strong><span>{label}</span></li>)}</ul> : null}
    <span className={styles.status}>{zh ? story.categoryZh : story.category}</span>
  </Link>;
}

export function SelectedWork() {
  const { language } = useLanguage();
  const zh = language === "zh";
  return <div className={styles.surface}><main className={styles.page}>
    <PortfolioNav />
    <h1 className={styles.pageTitle}>{zh ? "精选项目" : "Selected work"}</h1>
    <p className={styles.pageIntro}>{zh ? "三条 FDE 交付主线：企业智能客服、产品知识工程、数据迁移与业务看板。每一项都从问题、接口走到验收和交接。" : "Three FDE delivery threads: enterprise customer service, product knowledge engineering, and data migration with business dashboards. Each runs from problem and integration through acceptance and handoff."}</p>
    <div className={styles.workList}>{portfolioWork.map(story => <WorkItem key={story.slug} story={story} zh={zh} />)}</div>
    <p className={styles.articleFooter}><Link href="/explorations/">{zh ? "更多实践与经历" : "More explorations & experience"}</Link></p>
  </main></div>;
}

export function Explorations() {
  const { language } = useLanguage();
  const zh = language === "zh";
  return <div className={styles.surface}><main className={styles.page}>
    <PortfolioNav />
    <h1 className={styles.pageTitle}>{zh ? "经历与实践" : "Explorations"}</h1>
    <p className={styles.pageIntro}>{zh ? "技术判断、架构笔记，以及走到现在的经历。" : "Technical decisions, architecture notes, and the experiences behind my work."}</p>
    <div className={styles.workList}>{portfolioNotes.map(story => <WorkItem key={story.slug} story={story} zh={zh} />)}</div>
    <h2 className={styles.sectionLabel}>{zh ? "其他交付" : "Other deliveries"}</h2>
    <ul className={styles.otherDeliveries}>{otherDeliveries.map(item => <li key={item.title}><strong>{zh ? item.titleZh : item.title}</strong><p>{zh ? item.summaryZh : item.summary}</p></li>)}</ul>
    <h2 className={styles.sectionLabel}>{zh ? "公开代码贡献" : "Open-source contributions"}</h2>
    {publicContributions.map(item => <article className={styles.contribution} key={item.url}><a href={item.url} target="_blank" rel="noreferrer"><h3>{zh ? item.titleZh : item.title}</h3><span>{item.project} · {zh ? "已合并" : "Merged"} · {item.date}</span></a><p>{zh ? item.summaryZh : item.summary}</p></article>)}
    <p className={styles.articleFooter}><a href="https://github.com/Wenjunyun123" target="_blank" rel="noreferrer">{zh ? "在 GitHub 查看全部贡献" : "All contributions on GitHub"}</a></p>
    <h2 className={styles.sectionLabel} id="experience">{zh ? "工作经历" : "Experience"}</h2>
    {experienceItems.map(item => <article key={item.company} className={styles.experienceRow} id={"officeKey" in item ? item.officeKey : undefined}><time>{item.period}</time><div><h2>{zh ? item.companyZh : item.company}</h2><p>{zh ? item.roleZh : item.role}</p><p>{zh ? item.summaryZh : item.summary}</p>{"officeKey" in item ? <OfficeFigure officeKey={item.officeKey} zh={zh} /> : null}</div></article>)}
    <p className={styles.articleFooter}><a href="mailto:wenjunyou2002@outlook.com">{zh ? "聊聊你的业务问题" : "Tell me about your business problem"}</a></p>
  </main></div>;
}

export function PortfolioArticle({ story }: { story: PortfolioStory }) {
  const { language } = useLanguage();
  const zh = language === "zh";
  const back = portfolioNotes.some(note => note.slug === story.slug) ? "/explorations/" : "/selected/";
  return <div className={styles.surface}><main className={`${styles.page} ${styles.article}`}>
    <PortfolioNav back={back} />
    <h1 className={styles.pageTitle}>{zh ? story.titleZh : story.title}</h1>
    <div className={styles.articleMeta}><span>{story.period}</span><span>{zh ? story.categoryZh : story.category}</span></div>
    {"metrics" in story && story.metrics ? <ul className={styles.articleMetrics}>{story.metrics.map(([value, label]) => <li key={label}><strong>{value}</strong><span>{label}</span></li>)}</ul> : null}
    {story.slug === "feishu-customer-service-gateway" ? <GatewayPreview zh={zh} /> : story.slug === "product-knowledge-ai-query" ? <KnowledgePreview zh={zh} /> : story.slug === "enterprise-data-migration-dashboards" ? <DataMigrationPreview zh={zh} /> : story.slug === "customer-service-evaluation" ? <EvaluationPreview zh={zh} /> : story.slug === "feishu-service-desk" ? <ServiceDemo /> : story.slug === "aily-knowledge-and-actions" ? <ArchitecturePreview /> : <ReleasePreview />}
    {story.sections.map(section => <section className={styles.articleSection} key={section.title}><h2>{zh ? section.titleZh : section.title}</h2><p>{zh ? section.textZh : section.text}</p></section>)}
    {"sources" in story ? <section className={styles.articleSection}><h2>{zh ? "公开实现" : "Public implementation"}</h2><ul className={styles.evidenceList}>{story.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul></section> : null}
    <div className={styles.articleMeta}>{story.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    <p className={styles.articleFooter}>{zh ? "想了解实现细节？" : "Want to talk through the implementation? "}<a href="mailto:wenjunyou2002@outlook.com">{zh ? "邮件联系我" : "Send me an email"}</a>{zh ? "。" : "."}</p>
  </main></div>;
}
