"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../language-toggle";
import { CompanyReference } from "./company-reference";
import styles from "./portfolio.module.css";

export function PortfolioHome() {
  const { language, setLanguage } = useLanguage();
  const zh = language === "zh";
  const router = useRouter();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
      if (event.target instanceof HTMLElement && (event.target.isContentEditable || /INPUT|TEXTAREA|SELECT|BUTTON|A/.test(event.target.tagName))) return;
      if (event.key.toLowerCase() === "s") router.push("/selected/");
      if (event.key.toLowerCase() === "e") router.push("/explorations/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div className={styles.surface}>
      <main className={styles.home} id="main">
        <Link href="/resume/" className={styles.avatarLink} aria-label={zh ? "查看游文君的简历" : "View Wenjun’s resume"}>
          <Image className={styles.avatar} src="/profile/wenjun-avatar.png" alt={zh ? "游文君" : "Wenjun You"} width={32} height={32} priority />
        </Link>
        <h1>{zh ? "你好，我是游文君。" : "Hey there, I’m Wenjun You."}</h1>
        <p className={styles.subtitle}>{zh ? "一名做 AI 应用交付的 FDE。" : "a forward deployed engineer for AI applications."}</p>

        <div className={styles.introduction}>
          <p>{zh ? <>
            我在业务现场把模糊需求落成可运行、可评测、可交接的<Link href="/selected/" className={styles.inlineLink}>AI 应用</Link>。最近在负熵云驻场：用飞书生态把<Link href="/work/feishu-customer-service-gateway/" className={styles.inlineLink} style={{ "--link-color": "#198348" } as React.CSSProperties}>企业智能客服与产品资料查询</Link>作为同一条项目线，从 70 多秒一路降到 9.96 秒；并把 2,041 条生产订单迁进多维表格、全量回读 0 项未解释差异。
          </> : <>
            I turn ambiguous business needs into <Link href="/selected/" className={styles.inlineLink}>AI applications</Link> that run, can be evaluated, and can be handed over. Lately I’ve been onsite at Negative Entropy Cloud, using the Feishu ecosystem to move one <Link href="/work/feishu-customer-service-gateway/" className={styles.inlineLink} style={{ "--link-color": "#198348" } as React.CSSProperties}>enterprise service and product-query</Link> project from 70+ seconds down to a 9.96s average, and migrating 2,041 production-order records into Base with zero unexplained differences.
          </>}</p>
          <p>{zh ? <>
            此前在<CompanyReference officeKey="yichong" zh={zh} />、<CompanyReference officeKey="yimu" zh={zh} />和<CompanyReference officeKey="kaytune" zh={zh} />实习，做过插件开发、AI 商品图工作流与数据管道。喜欢把复杂问题变成简单、可靠的工具。
          </> : <>
            Previously at <CompanyReference officeKey="yichong" zh={zh} />, <CompanyReference officeKey="yimu" zh={zh} />, and <CompanyReference officeKey="kaytune" zh={zh} />, working on plugins, AI image workflows, and data pipelines. I like making complex things feel simple and dependable.
          </>}</p>
        </div>

        <dl className={styles.proofStrip}>
          <div><dt>70+→9.96s</dt><dd>{zh ? "客服与资料查询整体" : "service & query"}</dd></div>
          <div><dt>9.96s</dt><dd>{zh ? "妙搭查询台平均" : "Miaoda query desk"}</dd></div>
          <div><dt>0</dt><dd>{zh ? "迁移未解释差异" : "migration diffs"}</dd></div>
        </dl>

        <p className={styles.nowLine}>
          <span className={styles.nowDot} aria-hidden="true" />
          {zh ? "现在：负熵云 · AI 应用交付工程师（FDE）· 驻场客户现场" : "Now: Negative Entropy Cloud · AI Application Delivery Engineer (FDE) · client onsite"}
        </p>

        <div className={styles.contact}>
          <p><span className={styles.muted}>{zh ? "聊聊，" : "Say hi via "}</span><a href="mailto:wenjunyou2002@outlook.com">{zh ? "邮件" : "email"}</a><span className={styles.muted}>{zh ? "、" : ", "}</span><a href="https://github.com/Wenjunyun123" target="_blank" rel="noreferrer">GitHub</a><span className={styles.muted}>{zh ? "，或看" : ", or my "}</span><Link href="/resume/">{zh ? "简历" : "resume"}</Link>{zh ? "。" : "."}</p>
          <button type="button" className={styles.language} onClick={() => setLanguage(zh ? "en" : "zh")} aria-label={zh ? "Switch to English" : "切换到中文"}>{zh ? "EN" : "中文"}</button>
        </div>

        <nav className={styles.entrances} aria-label={zh ? "作品与实践" : "Work and explorations"}>
          <Link href="/selected/" className={styles.entrance} aria-label={zh ? "精选项目" : "Selected work"}>
            <Image src="/portfolio/selected-cover.png" alt="" width={400} height={400} priority />
            <span className={styles.entranceLabel}><span>{zh ? "精选项目" : "Selected work"}</span><span>S</span></span>
          </Link>
          <Link href="/explorations/" className={styles.entrance} aria-label={zh ? "经历与实践" : "Explorations"}>
            <Image src="/portfolio/explorations-cover.png" alt="" width={400} height={400} priority />
            <span className={styles.entranceLabel}><span>{zh ? "经历与实践" : "Explorations"}</span><span>E</span></span>
          </Link>
        </nav>

        <p className={styles.homeFooter}>{zh ? "最近更新 2026.11" : "Last updated 2026.11"}</p>
      </main>
    </div>
  );
}
