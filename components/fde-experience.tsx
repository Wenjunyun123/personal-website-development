"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LanguageToggle, useLanguage } from "./language-toggle";
import {
  deliveryStageOrder,
  deliveryStages,
  educationSignals,
  experienceItems,
  featuredProjects,
  operatingLayerOrder,
  otherProjects,
  profileCopy,
  profileStats,
  skillGroups,
  teamAgentEvents,
  type DeliveryStageKey,
  type OperatingLayer,
  type SiteLanguage
} from "../content/profile";

type Scene = "home" | "work" | "system";

export function FdeExperience() {
  const { language, setLanguage } = useLanguage();
  const [scene, setScene] = useState<Scene>("home");
  const [stage, setStage] = useState<DeliveryStageKey>("intake");
  const [layer, setLayer] = useState<OperatingLayer>("business");
  const [zoom, setZoom] = useState(1);
  const copy = profileCopy[language];

  const selectScene = useCallback((nextScene: Scene) => {
    setScene(nextScene);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter" && scene === "home" && document.activeElement === document.body) {
        document.querySelector("#delivery-loop")?.scrollIntoView({ behavior: "smooth" });
      }
      if (event.key === "1") selectScene("home");
      if (event.key === "2") selectScene("work");
      if (event.key === "3") selectScene("system");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scene, selectScene]);

  return (
    <main className={`fde-shell fde-${scene}`}>
      <header className="fde-brandbar">
        <a className="fde-wordmark" href="#top" onClick={() => selectScene("home")}>WENJUN / FDE</a>
        <span className="fde-status">{copy.status}</span>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </header>

      {scene === "home" && (
        <ProfileScene
          language={language}
          stage={stage}
          onStage={setStage}
          onOpenProjects={() => selectScene("work")}
          onOpenSystem={() => selectScene("system")}
        />
      )}

      {scene === "work" && <ProjectsScene language={language} onOpenSystem={() => selectScene("system")} />}

      {scene === "system" && (
        <OperatingMap language={language} layer={layer} zoom={zoom} onLayer={setLayer} onZoom={setZoom} />
      )}

      <nav className="fde-pill-nav" aria-label="Experience scenes">
        {(["home", "work", "system"] as Scene[]).map((item, index) => (
          <button key={item} type="button" aria-pressed={scene === item} onClick={() => selectScene(item)}>
            <span>0{index + 1}</span>{copy.nav[item]}
          </button>
        ))}
      </nav>
    </main>
  );
}

function ProfileScene({
  language,
  stage,
  onStage,
  onOpenProjects,
  onOpenSystem
}: {
  language: SiteLanguage;
  stage: DeliveryStageKey;
  onStage: (stage: DeliveryStageKey) => void;
  onOpenProjects: () => void;
  onOpenSystem: () => void;
}) {
  const copy = profileCopy[language];
  const isZh = language === "zh";
  const currentStage = deliveryStages[language][stage];

  return (
    <>
      <section className="fde-hero" id="top" aria-labelledby="profile-title">
        <div className="fde-terminal">
          <div className="fde-terminal-bar">
            <span className="fde-dot fde-dot-red" />
            <span className="fde-dot fde-dot-yellow" />
            <span className="fde-dot fde-dot-green" />
            <span>wenjun@delivery-system — profile.yaml</span>
          </div>
          <div className="fde-terminal-body">
            <p className="fde-prompt"><span>$</span> cat identity.yaml</p>
            <div className="fde-identity-row">
              <div>
                <h1 id="profile-title">{copy.identity}</h1>
                <p className="fde-alias">{copy.chineseName}</p>
              </div>
              <span className="fde-role-stamp">{copy.role}</span>
            </div>
            <p className="fde-thesis">{copy.thesis}</p>
            <ul className="fde-signal-list" aria-label={isZh ? "核心方向" : "Core directions"}>
              {copy.heroSignals.map((signal) => <li key={signal}>{signal}</li>)}
            </ul>
            <p className="fde-availability"><span>status:</span> {copy.availability}</p>
            <nav className="fde-terminal-actions" aria-label="Primary hiring actions">
              <a href="/resume">{copy.viewResume}</a>
              <a href="mailto:wenjunyou2002@outlook.com">{copy.email}</a>
              <a href="https://github.com/Wenjunyun123" target="_blank" rel="noreferrer">GitHub</a>
            </nav>
          </div>
        </div>
        <button className="fde-launch" type="button" onClick={() => document.querySelector("#delivery-loop")?.scrollIntoView({ behavior: "smooth" })}>
          <span>{copy.launch}</span><span aria-hidden="true">↓</span>
        </button>
      </section>

      <section className="delivery-loop" id="delivery-loop" aria-labelledby="delivery-loop-title">
        <div className="delivery-loop-menubar"><span>DELIVERY LOOP / 01</span><span>Lark CLI ↔ GitHub CLI</span></div>
        <div className="delivery-loop-inner">
          <p className="delivery-kicker">{copy.loopKicker}</p>
          <h2 id="delivery-loop-title">{copy.loopTitle}</h2>
          <p className="delivery-intro">{copy.loopIntro}</p>

          <div className="delivery-stage-strip" role="group" aria-label="Delivery loop stages">
            {deliveryStageOrder.map((key) => {
              const item = deliveryStages[language][key];
              return (
                <button key={key} type="button" aria-pressed={stage === key} onClick={() => onStage(key)}>
                  <span>{item.index}</span><strong>{item.short}</strong><small>{item.tool}</small>
                </button>
              );
            })}
          </div>

          <section className="delivery-stage-panel" aria-live="polite">
            <header>
              <span>{currentStage.index} / {currentStage.tool}</span>
              <h3>{currentStage.title}</h3>
            </header>
            <div className="delivery-stage-columns">
              <article><span>{copy.inputLabel}</span><p>{currentStage.input}</p></article>
              <article><span>{copy.actionLabel}</span><p>{currentStage.action}</p></article>
              <article><span>{copy.proofLabel}</span><p>{currentStage.proof}</p></article>
            </div>
          </section>

          <p className="delivery-loop-note">{copy.loopNote}</p>

          <div className="fde-stat-ribbon" aria-label={isZh ? "量化成果" : "Measured outcomes"}>
            {profileStats.map(([value, enLabel, zhLabel]) => (
              <div key={enLabel}><strong>{value}</strong><span>{isZh ? zhLabel : enLabel}</span></div>
            ))}
          </div>

          <nav className="delivery-shortcuts" aria-label="Portfolio shortcuts">
            <button type="button" onClick={onOpenProjects}><span>02</span>{copy.projectCta}</button>
            <button type="button" onClick={onOpenSystem}><span>03</span>{copy.mapTitle}</button>
            <a href="/resume"><span>CV</span>{copy.viewResume}</a>
          </nav>
        </div>
      </section>

      <section className="fde-home-summary" aria-label={isZh ? "个人经历摘要" : "Profile summary"}>
        <div className="fde-home-summary-intro">
          <p>{copy.profileKicker}</p>
          <h2>{copy.profileTitle}</h2>
          <p>{copy.profileIntro}</p>
        </div>
        <div className="fde-home-ledger">
          {experienceItems.map((item) => (
            <article key={item.period}>
              <time>{item.period}</time>
              <div><h3>{isZh ? item.companyZh : item.company}</h3><p>{isZh ? item.roleZh : item.role}</p></div>
              <strong>{item.evidence[0]}</strong>
            </article>
          ))}
        </div>
        <button type="button" onClick={onOpenProjects}>{copy.nav.work} →</button>
      </section>
    </>
  );
}

function ProjectsScene({ language, onOpenSystem }: { language: SiteLanguage; onOpenSystem: () => void }) {
  const copy = profileCopy[language];
  const isZh = language === "zh";

  return (
    <div className="fde-projects" id="top">
      <section className="fde-projects-hero">
        <p>{copy.profileKicker}</p>
        <h1>{copy.profileTitle}</h1>
        <div><p>{copy.profileIntro}</p><button type="button" onClick={onOpenSystem}>{copy.mapTitle} →</button></div>
      </section>

      <SectionHeading index="01" title={copy.featuredTitle} id="featured-systems" />
      <section className="flagship-stack" aria-labelledby="featured-systems">
        <FlagshipProject project={featuredProjects[0]} language={language} tone="blue">
          <div className="mini-delivery-loop" aria-label={isZh ? "六阶段闭环" : "Six-stage loop"}>
            {deliveryStageOrder.map((key) => {
              const item = deliveryStages[language][key];
              return <div key={key}><span>{item.index}</span><strong>{item.short}</strong><small>{item.tool}</small></div>;
            })}
          </div>
        </FlagshipProject>

        <FlagshipProject project={featuredProjects[1]} language={language} tone="yellow">
          <div className="team-agent-model">
            <div className="team-agent-events">
              {teamAgentEvents.map(([enName, enRule, enAction, zhName, zhRule, zhAction]) => (
                <article key={enName}>
                  <header><span>{isZh ? zhName : enName}</span><strong>{isZh ? zhRule : enRule}</strong></header>
                  <p>{isZh ? zhAction : enAction}</p>
                </article>
              ))}
            </div>
            <aside>
              <span>{isZh ? "权限边界" : "Permission boundary"}</span>
              <h3>{isZh ? "请求人权限 ∩ Agent 配置 ∩ 动作权限" : "Requester access ∩ Agent scope ∩ Action permission"}</h3>
              <ul>
                <li>{isZh ? "越权查询明确拒绝并留痕" : "Denied queries are explicit and logged"}</li>
                <li>{isZh ? "预算、库存、客户触达需要审批" : "Budget, inventory, and outreach require approval"}</li>
                <li>{isZh ? "动作卡保留依据、负责人和结果" : "Action cards retain evidence, owner, and result"}</li>
              </ul>
            </aside>
          </div>
        </FlagshipProject>

        <FlagshipProject project={featuredProjects[2]} language={language} tone="paper">
          <div className="release-proof-grid">
            {profileStats.slice(0, 3).map(([value, enLabel, zhLabel]) => (
              <div key={enLabel}><strong>{value}</strong><span>{isZh ? zhLabel : enLabel}</span></div>
            ))}
          </div>
        </FlagshipProject>
      </section>

      <SectionHeading index="02" title={copy.otherProjectsTitle} id="additional-projects" />
      <section className="additional-projects" aria-labelledby="additional-projects">
        {otherProjects.map(([enTitle, enStack, zhTitle, zhStack], index) => (
          <article key={enTitle}><span>0{index + 1}</span><h3>{isZh ? zhTitle : enTitle}</h3><p>{isZh ? zhStack : enStack}</p></article>
        ))}
      </section>

      <SectionHeading index="03" title={copy.experienceTitle} id="experience-ledger" />
      <section className="experience-ledger" aria-labelledby="experience-ledger">
        {experienceItems.map((item) => (
          <article key={item.period}>
            <time>{item.period}</time>
            <div className="experience-ledger-main">
              <p>{isZh ? item.roleZh : item.role}</p>
              <h3>{isZh ? item.companyZh : item.company}</h3>
              <span>{isZh ? item.summaryZh : item.summary}</span>
            </div>
            <ul>{item.evidence.map((evidence) => <li key={evidence}>{evidence}</li>)}</ul>
          </article>
        ))}
      </section>

      <SectionHeading index="04" title={copy.skillsTitle} id="capability-stack" />
      <section className="skill-matrix" aria-labelledby="capability-stack">
        {skillGroups.map(([enTitle, enSkills, zhTitle, zhSkills], index) => (
          <article key={enTitle}><span>0{index + 1}</span><h3>{isZh ? zhTitle : enTitle}</h3><p>{isZh ? zhSkills : enSkills}</p></article>
        ))}
      </section>

      <SectionHeading index="05" title={copy.honorsTitle} id="education-signals" />
      <section className="education-signals" aria-labelledby="education-signals">
        <article className="education-card">
          <span>{isZh ? "教育" : "Education"}</span>
          <h3>{isZh ? educationSignals.education.titleZh : educationSignals.education.title}</h3>
          <p>{isZh ? educationSignals.education.copyZh : educationSignals.education.copy}</p>
        </article>
        <article className="honors-card">
          <span>{isZh ? "荣誉" : "Honors"}</span>
          <ul>{educationSignals.honors.map(([en, zh]) => <li key={en}>{isZh ? zh : en}</li>)}</ul>
        </article>
      </section>

      <section className="fde-contact" aria-labelledby="fde-contact-title">
        <p>06 / {isZh ? "联系" : "Contact"}</p>
        <h2 id="fde-contact-title">{copy.contactTitle}</h2>
        <span>{copy.contactCopy}</span>
        <nav aria-label="Contact actions">
          <a href="/resume">{copy.viewResume}</a>
          <a href="mailto:wenjunyou2002@outlook.com">{copy.email}</a>
          <a href="https://github.com/Wenjunyun123" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </section>
    </div>
  );
}

function FlagshipProject({
  project,
  language,
  tone,
  children
}: {
  project: (typeof featuredProjects)[number];
  language: SiteLanguage;
  tone: "blue" | "yellow" | "paper";
  children: React.ReactNode;
}) {
  const isZh = language === "zh";

  return (
    <article className={`flagship-project flagship-${tone}`}>
      <header>
        <span>{project.number}</span>
        <strong>{isZh ? project.labelZh : project.label}</strong>
      </header>
      <h2>{isZh ? project.titleZh : project.title}</h2>
      <p>{isZh ? project.summaryZh : project.summary}</p>
      <ul className="flagship-proof-list">
        {(isZh ? project.proofZh : project.proof).map((proof) => <li key={proof}>{proof}</li>)}
      </ul>
      {children}
      <a href={`/cases/${project.slug}`}>{isZh ? "阅读项目案例" : "Read project case"} →</a>
    </article>
  );
}

function SectionHeading({ index, title, id }: { index: string; title: string; id: string }) {
  return <div className="fde-section-heading"><span>{index}</span><h2 id={id}>{title}</h2></div>;
}

function OperatingMap({
  language,
  layer,
  zoom,
  onLayer,
  onZoom
}: {
  language: SiteLanguage;
  layer: OperatingLayer;
  zoom: number;
  onLayer: (layer: OperatingLayer) => void;
  onZoom: (zoom: number) => void;
}) {
  const copy = profileCopy[language];
  const cards = useMemo(() => operatingLayerOrder.map((key) => ({ key, copy: copy.systemLayers[key] })), [copy]);

  return (
    <section className="fde-map" id="top" aria-labelledby="fde-map-title">
      <header className="fde-map-toolbar">
        <div><span>FDE</span><h1 id="fde-map-title">{copy.mapTitle}</h1></div>
        <p>{copy.mapHint}</p>
      </header>
      <div className="fde-map-layout">
        <aside className="fde-map-layers" aria-label={copy.layers}>
          <h2>{copy.layers}</h2>
          {cards.map(({ key, copy: layerCopy }, index) => (
            <button key={key} type="button" aria-pressed={layer === key} onClick={() => onLayer(key)}>
              <span>0{index + 1}</span>{layerCopy[0]}
            </button>
          ))}
        </aside>
        <div className="fde-map-canvas">
          <div className="fde-map-grid" style={{ transform: `scale(${zoom})` }}>
            {cards.map(({ key, copy: layerCopy }, index) => (
              <article className={`fde-map-card fde-map-card-${key} ${layer === key ? "is-active" : ""}`} key={key}>
                <span>0{index + 1} / {layerCopy[0]}</span>
                <h2>{layerCopy[1]}</h2>
                <p>{layerCopy[2]}</p>
              </article>
            ))}
          </div>
          <div className="fde-map-zoom" aria-label="Canvas zoom controls">
            <button type="button" aria-label={copy.zoomOut} onClick={() => onZoom(Math.max(.7, zoom - .1))}>−</button>
            <button type="button" onClick={() => onZoom(1)}>{Math.round(zoom * 100)}%</button>
            <button type="button" aria-label={copy.zoomIn} onClick={() => onZoom(Math.min(1.3, zoom + .1))}>+</button>
          </div>
        </div>
      </div>
    </section>
  );
}
