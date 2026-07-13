"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { LanguageToggle, useLanguage } from "./language-toggle";
import { cases } from "../content/cases";
import {
  capabilityItems,
  commandStates,
  homeCopy,
  resumeItems,
  technicalNotes,
  type CommandKey,
  type SystemLayer
} from "../content/home";

type Scene = "home" | "work" | "system";

const layerOrder: SystemLayer[] = ["profile", "timeline", "practice", "stack", "principles"];

export function PersonalExperience() {
  const { language, setLanguage } = useLanguage();
  const [scene, setScene] = useState<Scene>("home");
  const [command, setCommand] = useState<CommandKey>("package");
  const [layer, setLayer] = useState<SystemLayer>("profile");
  const [zoom, setZoom] = useState(1);
  const t = homeCopy[language];
  const currentCommand = commandStates[language][command];

  const selectScene = useCallback((nextScene: Scene) => {
    setScene(nextScene);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter" && scene === "home") {
        document.querySelector("#release-desk")?.scrollIntoView({ behavior: "smooth" });
      }
      if (event.key === "1") selectScene("home");
      if (event.key === "2") selectScene("work");
      if (event.key === "3") selectScene("system");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [scene, selectScene]);

  return (
    <main className={`experience-shell experience-${scene}`}>
      <header className="experience-brandbar">
        <a className="experience-wordmark" href="#top" onClick={() => selectScene("home")}>
          WENJUN / YOU
        </a>
        <span className="experience-status">{t.status}</span>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </header>

      {scene === "home" && (
        <>
          <section className="terminal-hero" id="top" aria-labelledby="terminal-title">
            <div className="terminal-window">
              <div className="terminal-titlebar">
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span>wenjun@portfolio — zsh</span>
              </div>
              <div className="terminal-body">
                <p className="terminal-line"><span>wenjun@portfolio</span> % whoami</p>
                <h1 id="terminal-title">{t.identity}</h1>
                <p className="terminal-role">{t.role}</p>
                <p className="terminal-promise">{t.promise}</p>
                <p className="terminal-line"><span>status</span> — {t.status}</p>
                <nav className="terminal-actions" aria-label="Primary hiring actions">
                  <a href="/resume" aria-label={t.viewResume}>./{t.viewResume.toLowerCase().replaceAll(" ", "-")}</a>
                  <a href="mailto:wenjunyou2002@outlook.com" aria-label={t.email}>./{t.email.toLowerCase().replaceAll(" ", "-")}</a>
                  <a href="https://github.com/Wenjunyun123" aria-label="GitHub" target="_blank" rel="noreferrer">./github</a>
                </nav>
              </div>
            </div>
            <button className="launch-cue" type="button" onClick={() => document.querySelector("#release-desk")?.scrollIntoView({ behavior: "smooth" })}>
              <span>{t.launch}</span>
              <span aria-hidden="true">↓</span>
            </button>
          </section>

          <section className="release-desk" id="release-desk" aria-label={t.commandTitle}>
            <div className="release-menubar">
              <span>WENJUN OS</span>
              <span>React · TypeScript · Agent Delivery</span>
            </div>
            <div className="release-desk-inner">
              <p className="command-kicker">{t.commandKicker}</p>
              <h2>{t.commandTitle}</h2>
              <p className="command-subtitle">{t.commandSubtitle}</p>

              <section className="command-console">
                <div className="command-tabs" role="group" aria-label={`${t.commandTitle} states`}>
                  {(Object.keys(commandStates.en) as CommandKey[]).map((key) => (
                    <button key={key} type="button" aria-pressed={command === key} onClick={() => setCommand(key)}>
                      {commandStates[language][key].label}
                    </button>
                  ))}
                </div>
                <div className="command-console-body">
                  <article>
                    <span className="console-prompt">$ release inspect --{command}</span>
                    <h3>{currentCommand.title}</h3>
                    <p>{currentCommand.copy}</p>
                    <div className="command-metrics">
                      {currentCommand.metrics.map(([value, label]) => (
                        <div key={label}><strong>{value}</strong><span>{label}</span></div>
                      ))}
                    </div>
                  </article>
                  <aside>
                    <h3>{t.queueTitle}</h3>
                    <ul>
                      {currentCommand.queue.map(([item, status]) => (
                        <li key={item}><span>{item}</span><strong>{status}</strong></li>
                      ))}
                    </ul>
                  </aside>
                </div>
              </section>

              <nav className="release-shortcuts" aria-label="Portfolio shortcuts">
                <button type="button" onClick={() => selectScene("work")}><span>02</span>{t.nav.work}</button>
                <button type="button" onClick={() => selectScene("system")}><span>03</span>{t.nav.system}</button>
                <a href="/resume"><span>CV</span>{t.viewResume}</a>
              </nav>
            </div>
          </section>

          <section className="terminal-outro" aria-label="End of home scene">
            <div><span>$</span> cd /work</div>
            <p>{language === "zh" ? "继续查看我如何把复杂系统变成可交付界面。" : "Continue to see how I turn complex systems into shippable interfaces."}</p>
            <button type="button" onClick={() => selectScene("work")}>{t.nav.work} →</button>
          </section>
        </>
      )}

      {scene === "work" && (
        <WorkScene language={language} onOpenSystem={() => selectScene("system")} />
      )}

      {scene === "system" && (
        <SystemScene language={language} layer={layer} zoom={zoom} onLayer={setLayer} onZoom={setZoom} />
      )}

      <nav className="experience-pill-nav" aria-label="Experience scenes">
        {(["home", "work", "system"] as Scene[]).map((item, index) => (
          <button key={item} type="button" aria-pressed={scene === item} onClick={() => selectScene(item)}>
            <span>0{index + 1}</span>{t.nav[item]}
          </button>
        ))}
      </nav>
    </main>
  );
}

function WorkScene({ language, onOpenSystem }: { language: "en" | "zh"; onOpenSystem: () => void }) {
  const t = homeCopy[language];
  const isZh = language === "zh";

  return (
    <div className="work-scene" id="top">
      <section className="work-hero">
        <p>{t.workEyebrow}</p>
        <h1>{t.workTitle}</h1>
        <div className="work-intro-row">
          <p>{t.workIntro}</p>
          <button type="button" onClick={onOpenSystem}>{t.canvasTitle} →</button>
        </div>
      </section>

      <WorkHeading index="01" title={t.capabilityTitle} />
      <section className="capability-grid" aria-labelledby="capability-heading">
        {capabilityItems.map(([index, enTitle, enCopy, zhTitle, zhCopy]) => (
          <article key={index}><span>{index}</span><h3>{isZh ? zhTitle : enTitle}</h3><p>{isZh ? zhCopy : enCopy}</p></article>
        ))}
      </section>

      <WorkHeading index="02" title={t.caseTitle} />
      <section className="experience-case-grid" aria-labelledby="cases-heading">
        {cases.map((caseStudy, index) => (
          <a href={`/cases/${caseStudy.slug}`} key={caseStudy.slug}>
            <span className="case-index">0{index + 1}</span>
            <span className="case-evidence">{formatEvidenceStatus(caseStudy.evidenceStatus, language)}</span>
            <h3>{isZh ? caseStudy.titleZh : caseStudy.title}</h3>
            <p>{isZh ? caseStudy.problemZh : caseStudy.problem}</p>
            <strong>{isZh ? caseStudy.roleZh : caseStudy.role} →</strong>
          </a>
        ))}
      </section>

      <WorkHeading index="03" title={t.notesTitle} />
      <section className="note-stack" aria-labelledby="notes-heading">
        {technicalNotes.map(([enTitle, enCopy, zhTitle, zhCopy], index) => (
          <article key={enTitle}><span>NOTE / 0{index + 1}</span><h3>{isZh ? zhTitle : enTitle}</h3><p>{isZh ? zhCopy : enCopy}</p></article>
        ))}
      </section>

      <WorkHeading index="04" title={t.resumeTitle} />
      <section className="resume-timeline" aria-labelledby="resume-heading">
        {resumeItems.map(([date, enTitle, enCopy, zhTitle, zhCopy]) => (
          <article key={date}><time>{date}</time><div><h3>{isZh ? zhTitle : enTitle}</h3><p>{isZh ? zhCopy : enCopy}</p></div></article>
        ))}
      </section>

      <section className="work-contact" aria-labelledby="contact-heading">
        <p>05 / {t.contactTitle}</p>
        <h2 id="contact-heading">{t.contactCopy}</h2>
        <nav aria-label="Contact actions">
          <a href="/resume">{t.viewResume}</a>
          <a href="mailto:wenjunyou2002@outlook.com">{t.email}</a>
          <a href="https://github.com/Wenjunyun123" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </section>
    </div>
  );
}

function WorkHeading({ index, title }: { index: string; title: string }) {
  const idMap: Record<string, string> = { "01": "capability-heading", "02": "cases-heading", "03": "notes-heading", "04": "resume-heading" };
  return <div className="work-section-heading"><span>{index}</span><h2 id={idMap[index]}>{title}</h2></div>;
}

function SystemScene({
  language,
  layer,
  zoom,
  onLayer,
  onZoom
}: {
  language: "en" | "zh";
  layer: SystemLayer;
  zoom: number;
  onLayer: (layer: SystemLayer) => void;
  onZoom: (zoom: number) => void;
}) {
  const t = homeCopy[language];
  const cards = useMemo(() => layerOrder.map((key) => ({ key, copy: t.systemLayers[key] })), [t]);

  return (
    <section className="system-scene" id="top" aria-labelledby="system-title">
      <header className="system-toolbar">
        <div><span>W / Y</span><h1 id="system-title">{t.canvasTitle}</h1></div>
        <p>{t.canvasHint}</p>
      </header>
      <div className="system-layout">
        <aside className="system-layers" aria-label={t.layers}>
          <h2>{t.layers}</h2>
          {cards.map(({ key, copy }, index) => (
            <button key={key} type="button" aria-pressed={layer === key} onClick={() => onLayer(key)}>
              <span>0{index + 1}</span>{copy[0]}
            </button>
          ))}
        </aside>
        <div className="system-canvas">
          <div className="system-canvas-grid" style={{ transform: `scale(${zoom})` }}>
            {cards.map(({ key, copy }, index) => (
              <article className={`system-card system-card-${key} ${layer === key ? "is-active" : ""}`} key={key}>
                <span>0{index + 1} / {copy[0]}</span>
                <h2>{copy[1]}</h2>
                <p>{copy[2]}</p>
              </article>
            ))}
          </div>
          <div className="system-zoom" aria-label="Canvas zoom controls">
            <button type="button" aria-label={t.zoomOut} onClick={() => onZoom(Math.max(0.7, zoom - 0.1))}>−</button>
            <button type="button" onClick={() => onZoom(1)}>{Math.round(zoom * 100)}%</button>
            <button type="button" aria-label={t.zoomIn} onClick={() => onZoom(Math.min(1.3, zoom + 0.1))}>+</button>
          </div>
          <div className="system-minimap" aria-hidden="true"><span /></div>
        </div>
      </div>
    </section>
  );
}

function formatEvidenceStatus(status: string, language: "en" | "zh") {
  if (language === "en") return status.replaceAll("-", " ");
  const labels: Record<string, string> = {
    "resume-supported": "简历支撑",
    "github-supported": "GitHub 支撑",
    "user-provided-transcript": "用户提供内容",
    "draft-internal": "内部草稿"
  };
  return labels[status] ?? status;
}
