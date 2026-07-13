"use client";

import Link from "next/link";
import { LanguageToggle, useLanguage } from "./language-toggle";
import type { CaseStudy } from "../content/cases";

const spineLabels = {
  en: ["Problem", "Product decision", "Interface", "Technical build", "Outcome"],
  zh: ["问题", "产品决策", "界面", "技术实现", "结果"]
} as const;

export function CaseDetail({ caseStudy }: { caseStudy: CaseStudy }) {
  const { language, setLanguage } = useLanguage();
  const isZh = language === "zh";
  const labels = spineLabels[language];
  const spine = [
    isZh ? caseStudy.problemZh : caseStudy.problem,
    isZh ? caseStudy.productDecisionZh : caseStudy.productDecision,
    isZh ? caseStudy.interfaceZh : caseStudy.interface,
    isZh ? caseStudy.technicalBuildZh : caseStudy.technicalBuild,
    isZh ? caseStudy.outcomeZh : caseStudy.outcome
  ];

  return (
    <main className="page-shell">
      <header className="masthead">
        <span>Wenjun You</span>
        <span>{isZh ? "项目案例" : "Project case"}</span>
        <nav className="subpage-actions" aria-label={isZh ? "页面导航" : "Page navigation"}>
          <Link href="/">{isZh ? "返回主页" : "Back Home"}</Link>
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </nav>
      </header>
      <article className="case-page">
        <p className="kicker">{isZh ? `项目案例 / ${caseStudy.roleZh}` : `Project case / ${caseStudy.role}`}</p>
        <h1>{isZh ? caseStudy.titleZh : caseStudy.title}</h1>
        <div className="case-meta">
          <span className="badge">{caseStudy.evidenceStatus}</span>
          {caseStudy.platforms.map((platform) => (
            <span className="badge" key={platform}>
              {platform}
            </span>
          ))}
        </div>

        <section className="case-spine" aria-label={isZh ? "案例结构" : "Case study spine"}>
          {spine.map((body, index) => (
            <article key={labels[index]}>
              <h2>{labels[index]}</h2>
              <p>{body}</p>
            </article>
          ))}
        </section>
      </article>
    </main>
  );
}
