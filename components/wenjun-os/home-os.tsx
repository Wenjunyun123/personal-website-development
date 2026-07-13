"use client";

import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import Image from "next/image";
import {
  deliveryStageOrder,
  deliveryStages,
  experienceItems,
  experienceTimeline,
  featuredProjects,
  githubMergedContributions,
  githubSnapshot,
  githubVerifiedBugs,
  profileCopy,
  skillGroups,
  teamAgentEvents,
  type SiteLanguage
} from "../../content/profile";
import styles from "./home-os.module.css";

type HomeOSProps = {
  onLaunchedChange?: (launched: boolean) => void;
  onIntroReadyChange?: (ready: boolean) => void;
};

type WindowId =
  | "about"
  | "experience"
  | "delivery-loop"
  | "team-agent"
  | "release-matrix"
  | "skills"
  | "resume"
  | "github";

type DesktopWindow = {
  id: WindowId;
  x: number;
  y: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

type DesktopProps = {
  desktopName?: never;
};

type Point = { x: number; y: number };

const VISITED_KEY = "wenjun-os-visited";

const terminalScript = [
  { text: "$ whoami", kind: "command" },
  { text: "> 游文君 Wenjun You", kind: "output" },
  { text: "$ cat about.md", kind: "command" },
  { text: "> AI 交付工程师（FDE）", kind: "output" },
  { text: "  把业务需求变成可运行、可验证、可交接的 AI 系统", kind: "output" },
  { text: "  Frontend × Agent × Delivery", kind: "output" },
  { text: '$ echo "1 person + AI = one delivery team"', kind: "command" },
  { text: "> 1 person + AI = one delivery team", kind: "gold" },
  { text: "$ open wenjun-os.app", kind: "command" }
] as const;

const iconDefinitions: ReadonlyArray<{ id: WindowId; label: string; labelZh: string }> = [
  { id: "about", label: "about.md", labelZh: "about.md" },
  { id: "experience", label: "timeline", labelZh: "经历时间轴" },
  { id: "delivery-loop", label: "lark-github-loop", labelZh: "飞书-GitHub闭环" },
  { id: "team-agent", label: "team-agent", labelZh: "Team Agent" },
  { id: "release-matrix", label: "release-matrix", labelZh: "发布矩阵" },
  { id: "skills", label: "skills", labelZh: "能力栈" },
  { id: "resume", label: "resume", labelZh: "简历" },
  { id: "github", label: "open-source", labelZh: "开源贡献" }
];

const initialIconPositions: Record<WindowId, Point> = {
  about: { x: 24, y: 54 },
  experience: { x: 24, y: 154 },
  "delivery-loop": { x: 24, y: 254 },
  "team-agent": { x: 24, y: 354 },
  "release-matrix": { x: 124, y: 54 },
  skills: { x: 124, y: 154 },
  resume: { x: 124, y: 254 },
  github: { x: 124, y: 354 }
};

export function HomeOS({ onLaunchedChange, onIntroReadyChange }: HomeOSProps) {
  const reducedMotion = useReducedMotion();
  const [introReady, setIntroReady] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [launching, setLaunching] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [launched, setLaunched] = useState(false);
  const desktopRef = useRef<HTMLElement>(null);

  const markIntroReady = useCallback(() => {
    setLineIndex(terminalScript.length);
    setCharacterIndex(0);
    setIntroReady(true);
  }, []);

  const beginLaunch = useCallback(() => {
    setIntroReady(true);
    setLineIndex(terminalScript.length);
    setCharacterIndex(0);
    setLaunching((current) => current || true);
  }, []);

  useEffect(() => {
    onLaunchedChange?.(launched);
  }, [launched, onLaunchedChange]);

  useEffect(() => {
    if (introReady) {
      onIntroReadyChange?.(true);
    }
  }, [introReady, onIntroReadyChange]);

  useEffect(() => {
    if (reducedMotion) {
      const timer = window.setTimeout(markIntroReady, 0);
      return () => window.clearTimeout(timer);
    }
  }, [markIntroReady, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || introReady || launching || lineIndex >= terminalScript.length) {
      return;
    }

    const line = terminalScript[lineIndex].text;
    const atLineEnd = characterIndex >= line.length;
    const timer = window.setTimeout(
      () => {
        if (atLineEnd) {
          if (lineIndex === terminalScript.length - 1) {
            markIntroReady();
            return;
          }
          setLineIndex((value) => value + 1);
          setCharacterIndex(0);
          return;
        }
        setCharacterIndex((value) => value + 1);
      },
      atLineEnd ? 150 : 22
    );

    return () => window.clearTimeout(timer);
  }, [characterIndex, introReady, launching, lineIndex, markIntroReady, reducedMotion]);

  useEffect(() => {
    let returning = false;
    try {
      returning = window.localStorage.getItem(VISITED_KEY) === "1";
    } catch {
      returning = false;
    }

    if (!returning) {
      return;
    }

    const readyTimer = window.setTimeout(markIntroReady, 0);
    const timer = window.setTimeout(beginLaunch, reducedMotion ? 60 : 700);
    return () => {
      window.clearTimeout(readyTimer);
      window.clearTimeout(timer);
    };
  }, [beginLaunch, markIntroReady, reducedMotion]);

  useEffect(() => {
    if (!launching) {
      return;
    }

    let completionTimer = 0;
    let settleTimer = 0;
    if (reducedMotion) {
      settleTimer = window.setTimeout(() => setLaunchProgress(12), 0);
      completionTimer = window.setTimeout(() => setLaunched(true), 60);
      return () => {
        window.clearTimeout(settleTimer);
        window.clearTimeout(completionTimer);
      };
    }

    let progress = 0;
    const interval = window.setInterval(() => {
      progress += 1;
      setLaunchProgress(progress);
      if (progress >= 12) {
        window.clearInterval(interval);
        setZooming(true);
        completionTimer = window.setTimeout(() => setLaunched(true), 1800);
      }
    }, 80);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(completionTimer);
    };
  }, [launching, reducedMotion]);

  useEffect(() => {
    if (!launched) {
      return;
    }
    try {
      window.localStorage.setItem(VISITED_KEY, "1");
    } catch {
      // The experience still works when storage is unavailable.
    }
  }, [launched]);

  useEffect(() => {
    if (launched) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter") {
        return;
      }
      event.preventDefault();
      if (introReady) {
        beginLaunch();
      } else {
        markIntroReady();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [beginLaunch, introReady, launched, markIntroReady]);

  const activateIntro = () => {
    if (launching) {
      return;
    }
    if (!introReady) {
      markIntroReady();
      return;
    }
    beginLaunch();
  };

  const returnToDesktop = useCallback(() => {
    desktopRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }, [reducedMotion]);

  if (!launched) {
    return (
      <section className={styles.intro} aria-label="Wenjun OS 启动终端">
        <div
          className={`${styles.introDevice} ${zooming ? styles.introDeviceLaunching : ""}`}
          role="button"
          tabIndex={0}
          aria-label={introReady ? "启动 Wenjun OS" : "跳过终端输入动画"}
          onClick={activateIntro}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              activateIntro();
            }
          }}
        >
          <LaptopShell>
            <TerminalIntro
              lineIndex={lineIndex}
              characterIndex={characterIndex}
              ready={introReady}
              launching={launching}
              progress={launchProgress}
            />
          </LaptopShell>
          <div className={`${styles.launchWash} ${zooming ? styles.launchWashActive : ""}`} aria-hidden="true" />
        </div>
        <button className={styles.launchCta} type="button" onClick={activateIntro} aria-live="polite">
          {launching ? `loading wenjun-os · ${Math.round((launchProgress / 12) * 100)}%` : introReady ? "Press Enter to Launch" : "Click to skip typing"}
        </button>
        <p className={styles.introHint} aria-hidden="true">{introReady ? "↓" : ""}</p>
      </section>
    );
  }

  return (
    <div className={styles.osDocument}>
      <Desktop ref={desktopRef} />
      <ExitSequence reducedMotion={reducedMotion} onReturnDesktop={returnToDesktop} />
    </div>
  );
}

function TerminalIntro({
  lineIndex,
  characterIndex,
  ready,
  launching,
  progress
}: {
  lineIndex: number;
  characterIndex: number;
  ready: boolean;
  launching: boolean;
  progress: number;
}) {
  return (
    <div className={styles.terminal} aria-live="polite" aria-label="Wenjun OS terminal output">
      <div className={styles.terminalBar}>
        <div className={styles.trafficLights} aria-hidden="true"><i /><i /><i /></div>
        <span>wenjun@delivery-os — zsh</span>
        <span>UTF-8</span>
      </div>
      <div className={styles.terminalBody}>
        {terminalScript.map((line, index) => {
          const visible = index < lineIndex ? line.text : index === lineIndex ? line.text.slice(0, characterIndex) : "";
          if (!visible && index > lineIndex) {
            return null;
          }
          return (
            <div className={styles[`terminal_${line.kind}`]} key={`${line.text}-${index}`}>
              {visible}{index === terminalScript.length - 1 && ready ? <span className={styles.cursor}>▋</span> : null}
            </div>
          );
        })}
        {launching ? (
          <>
            <div className={styles.terminal_output}>&gt; launching...</div>
            <div className={styles.bootProgress} aria-label={`启动进度 ${progress} / 12`}>
              [{"█".repeat(progress)}{"░".repeat(12 - progress)}] {Math.round((progress / 12) * 100)}%
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function LaptopShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.laptop} ${className}`}>
      <div className={styles.laptopLid}>
        <div className={styles.camera} aria-hidden="true" />
        <div className={styles.laptopScreen}>{children}</div>
      </div>
      <div className={styles.laptopBase}><span aria-hidden="true" /></div>
    </div>
  );
}

const Desktop = forwardRef<HTMLElement, DesktopProps>(function DesktopComponent(
  _props: DesktopProps,
  forwardedRef: React.ForwardedRef<HTMLElement>
) {
  const [language, setLanguage] = useState<SiteLanguage>("zh");
  const [time, setTime] = useState(() => new Date());
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);
  const [iconPositions, setIconPositions] = useState(initialIconPositions);
  const [windows, setWindows] = useState<DesktopWindow[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const nextZ = useRef(20);
  const iconDrag = useRef<{ id: WindowId; startX: number; startY: number; origin: Point; moved: boolean } | null>(null);
  const suppressIconClick = useRef<WindowId | null>(null);
  const windowDrag = useRef<{ id: WindowId; startX: number; startY: number; origin: Point } | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 720px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const bringToFront = useCallback((id: WindowId) => {
    const z = ++nextZ.current;
    setWindows((current) => current.map((item) => item.id === id ? { ...item, z } : item));
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    const z = ++nextZ.current;
    setWindows((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return current.map((item) => item.id === id ? { ...item, z } : item);
      }
      const cascade = current.length % 7;
      const x = isMobile ? 10 : Math.min(110 + cascade * 30, Math.max(10, window.innerWidth - 760));
      const y = isMobile ? 48 : 58 + cascade * 30;
      return [...current, { id, x, y, z, minimized: false, maximized: false }];
    });
    setSelectedIcon(id);
  }, [isMobile]);

  const closeWindow = (id: WindowId) => {
    setWindows((current) => current.filter((item) => item.id !== id));
  };

  const toggleMinimizeWindow = (id: WindowId) => {
    setWindows((current) => current.map((item) => item.id === id ? { ...item, minimized: !item.minimized } : item));
  };

  const toggleMaximizeWindow = (id: WindowId) => {
    setWindows((current) => current.map((item) => item.id === id ? {
      ...item,
      minimized: false,
      maximized: !item.maximized
    } : item));
  };

  const startIconDrag = (event: ReactPointerEvent<HTMLButtonElement>, id: WindowId) => {
    if (isMobile || event.button !== 0) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    iconDrag.current = {
      id,
      startX: event.clientX,
      startY: event.clientY,
      origin: iconPositions[id],
      moved: false
    };
  };

  const moveIcon = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = iconDrag.current;
    if (!drag) {
      return;
    }
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    drag.moved ||= Math.abs(dx) + Math.abs(dy) > 5;
    setIconPositions((current) => ({
      ...current,
      [drag.id]: {
        x: clamp(drag.origin.x + dx, 8, Math.max(8, window.innerWidth - 92)),
        y: clamp(drag.origin.y + dy, 38, Math.max(38, window.innerHeight - 104))
      }
    }));
  };

  const endIconDrag = () => {
    if (iconDrag.current?.moved) {
      suppressIconClick.current = iconDrag.current.id;
    }
    iconDrag.current = null;
  };

  const startWindowDrag = (event: ReactPointerEvent<HTMLDivElement>, item: DesktopWindow) => {
    if (item.maximized || event.button !== 0 || (event.target as HTMLElement).closest("button, a")) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    windowDrag.current = { id: item.id, startX: event.clientX, startY: event.clientY, origin: { x: item.x, y: item.y } };
    bringToFront(item.id);
  };

  const moveDesktopWindow = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = windowDrag.current;
    if (!drag) {
      return;
    }
    const x = clamp(drag.origin.x + event.clientX - drag.startX, 0, Math.max(0, window.innerWidth - 160));
    const y = clamp(drag.origin.y + event.clientY - drag.startY, 30, Math.max(30, window.innerHeight - 90));
    setWindows((current) => current.map((item) => item.id === drag.id ? { ...item, x, y } : item));
  };

  const labels = useMemo(() => Object.fromEntries(iconDefinitions.map((item) => [item.id, language === "zh" ? item.labelZh : item.label])) as Record<WindowId, string>, [language]);

  return (
    <section className={styles.desktop} ref={forwardedRef} aria-label="Wenjun OS desktop">
      <header className={styles.menuBar}>
        <div className={styles.menuIdentity}>
          <Image src="/profile/wenjun.png" alt="游文君 Wenjun You" width={22} height={22} />
          <strong>Wenjun OS</strong>
          <span className={styles.desktopMenuText}>Profile</span>
          <span className={styles.desktopMenuText}>Projects</span>
          <span className={styles.desktopMenuText}>Delivery</span>
        </div>
        <div className={styles.menuStatus}>
          <span className={styles.onlineDot} aria-label="Available" />
          <button type="button" onClick={() => setLanguage((value) => value === "zh" ? "en" : "zh")} aria-label="Switch desktop language">{language === "zh" ? "中 / EN" : "EN / 中"}</button>
          <time dateTime={time.toISOString()}>{formatClock(time, language)}</time>
        </div>
      </header>
      <div className={styles.wallpaper} onClick={() => setSelectedIcon(null)}>
        <div className={styles.iconLayer}>
          {iconDefinitions.map((icon) => {
            const position = iconPositions[icon.id];
            return (
              <button
                className={`${styles.desktopIcon} ${selectedIcon === icon.id ? styles.desktopIconSelected : ""}`}
                style={{ left: position.x, top: position.y }}
                type="button"
                key={icon.id}
                aria-label={`${labels[icon.id]} — ${isMobile ? "open" : "double click or press Enter to open"}`}
                onPointerDown={(event) => startIconDrag(event, icon.id)}
                onPointerMove={moveIcon}
                onPointerUp={endIconDrag}
                onPointerCancel={endIconDrag}
                onClick={(event) => {
                  event.stopPropagation();
                  if (suppressIconClick.current === icon.id) {
                    suppressIconClick.current = null;
                    return;
                  }
                  if (isMobile) {
                    openWindow(icon.id);
                  } else {
                    setSelectedIcon(icon.id);
                  }
                }}
                onDoubleClick={() => !isMobile && openWindow(icon.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    openWindow(icon.id);
                  }
                }}
              >
                <IconGlyph id={icon.id} />
                <span>{labels[icon.id]}</span>
              </button>
            );
          })}
        </div>
      </div>
      {windows.map((item) => (
          <article
            className={`${styles.osWindow} ${item.minimized ? styles.windowMinimized : ""} ${item.maximized ? styles.windowMaximized : ""}`}
            style={{ left: item.x, top: item.y, zIndex: item.z }}
            key={item.id}
            onPointerDown={() => bringToFront(item.id)}
            aria-label={`${labels[item.id]} window`}
            data-window-state={item.minimized ? "minimized" : item.maximized ? "maximized" : "normal"}
          >
            <div
              className={styles.windowTitleBar}
              onPointerDown={(event) => startWindowDrag(event, item)}
              onPointerMove={moveDesktopWindow}
              onPointerUp={() => { windowDrag.current = null; }}
              onPointerCancel={() => { windowDrag.current = null; }}
              onDoubleClick={(event) => {
                if ((event.target as HTMLElement).closest("button")) {
                  return;
                }
                toggleMaximizeWindow(item.id);
              }}
            >
              <div className={styles.windowControls} role="group" aria-label={`窗口控制：${labels[item.id]}`}>
                <button
                  className={styles.windowClose}
                  type="button"
                  aria-label={`关闭窗口：${labels[item.id]}`}
                  onPointerDown={(event) => event.stopPropagation()}
                  onDoubleClick={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    closeWindow(item.id);
                  }}
                ><span aria-hidden="true">×</span></button>
                <button
                  className={styles.windowMinimize}
                  type="button"
                  aria-label={`${item.minimized ? "恢复" : "最小化"}窗口：${labels[item.id]}`}
                  onPointerDown={(event) => event.stopPropagation()}
                  onDoubleClick={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleMinimizeWindow(item.id);
                  }}
                ><span aria-hidden="true">−</span></button>
                <button
                  className={styles.windowMaximize}
                  type="button"
                  aria-label={`${item.maximized ? "恢复" : "最大化"}窗口：${labels[item.id]}`}
                  onPointerDown={(event) => event.stopPropagation()}
                  onDoubleClick={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleMaximizeWindow(item.id);
                  }}
                ><span aria-hidden="true">+</span></button>
              </div>
              <strong>{labels[item.id]}</strong>
            </div>
            <div className={styles.windowBody}>
              <WindowContent id={item.id} language={language} />
            </div>
          </article>
        ))}
    </section>
  );
});

function WindowContent({ id, language }: { id: WindowId; language: SiteLanguage }) {
  const copy = profileCopy[language];
  const isZh = language === "zh";

  if (id === "about") {
    return (
      <div className={styles.aboutWindow}>
        <div className={styles.profileLead}>
          <Image src="/profile/wenjun.png" alt="" width={92} height={92} />
          <div><span className={styles.eyebrow}>{copy.status}</span><h2>{copy.identity}</h2><p>{copy.chineseName}</p></div>
        </div>
        <h3>{copy.role}</h3>
        <p className={styles.largeCopy}>{copy.thesis}</p>
        <div className={styles.signalRow}>{copy.heroSignals.map((signal) => <span key={signal}>{signal}</span>)}</div>
      </div>
    );
  }

  if (id === "experience") {
    return (
      <div>
        <WindowHeading
          kicker="timeline.app · 2022 → now"
          title={isZh ? "从大一到 AI 交付现场" : "From freshman year to AI delivery"}
        />
        <div className={styles.timelineLegend} aria-label={isZh ? "时间轴类型" : "Timeline categories"}>
          <span data-kind="education">{isZh ? "教育" : "Education"}</span>
          <span data-kind="award">{isZh ? "获奖" : "Awards"}</span>
          <span data-kind="internship">{isZh ? "实习" : "Internships"}</span>
        </div>
        <div className={styles.experienceTimeline}>
          {experienceTimeline.map((item) => (
            <article key={`${item.period}-${item.title}`} data-kind={item.kind}>
              <time>{isZh && "periodZh" in item ? item.periodZh : item.period}</time>
              <i className={styles.timelineDot} aria-hidden="true" />
              <div className={styles.timelineCard}>
                <span className={styles.timelineKind}>{isZh ? item.kindLabelZh : item.kindLabel}</span>
                <h3>{isZh ? item.titleZh : item.title}</h3>
                <strong>{isZh ? item.organizationZh : item.organization}</strong>
                <p>{isZh ? item.summaryZh : item.summary}</p>
                <div className={styles.evidenceList}>
                  {item.evidence.map(([en, zh]) => <small key={en}>{isZh ? zh : en}</small>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (id === "resume") {
    return (
      <div>
        <WindowHeading kicker="resume.pdf" title={copy.role} />
        <div className={styles.timeline}>
          {experienceItems.map((item) => (
            <article key={item.period}>
              <span>{item.period}</span>
              <h3>{isZh ? item.companyZh : item.company}</h3>
              <strong>{isZh ? item.roleZh : item.role}</strong>
              <p>{isZh ? item.summaryZh : item.summary}</p>
              <div className={styles.evidenceList}>{item.evidence.map((proof) => <small key={proof}>{proof}</small>)}</div>
            </article>
          ))}
        </div>
        <a className={styles.windowLink} href="/resume">{copy.viewResume} ↗</a>
      </div>
    );
  }

  if (id === "delivery-loop") {
    const project = featuredProjects[0];
    return (
      <div>
        <WindowHeading kicker={isZh ? project.labelZh : project.label} title={isZh ? project.titleZh : project.title} />
        <p>{isZh ? project.summaryZh : project.summary}</p>
        <div className={styles.deliveryFlow}>
          {deliveryStageOrder.map((key) => {
            const stage = deliveryStages[language][key];
            return <article key={key}><b>{stage.index}</b><span>{stage.short}</span><small>{stage.tool}</small><p>{stage.proof}</p></article>;
          })}
        </div>
      </div>
    );
  }

  if (id === "team-agent") {
    const project = featuredProjects[1];
    return (
      <div>
        <span className={styles.practiceFlag}>模拟业务实践 · 实现中</span>
        <WindowHeading kicker={isZh ? project.labelZh : project.label} title={isZh ? project.titleZh : project.title} />
        <p>{isZh ? project.summaryZh : project.summary}</p>
        <div className={styles.eventGrid}>
          {teamAgentEvents.map(([enName, enRule, enAction, zhName, zhRule, zhAction]) => (
            <article key={enName}><span>{isZh ? zhName : enName}</span><strong>{isZh ? zhRule : enRule}</strong><p>{isZh ? zhAction : enAction}</p></article>
          ))}
        </div>
      </div>
    );
  }

  if (id === "release-matrix") {
    const project = featuredProjects[2];
    return (
      <div>
        <WindowHeading kicker={isZh ? project.labelZh : project.label} title={isZh ? project.titleZh : project.title} />
        <p>{isZh ? project.summaryZh : project.summary}</p>
        <div className={styles.releaseMatrix}>
          {["Adobe Express", "Canva Apps", "Office Add-ins", "Safari WebExtension"].map((platform, index) => <article key={platform}><span>0{index + 1}</span><strong>{platform}</strong><small>{index === 0 ? "60 add-ons checked" : index === 1 ? "package truth" : index === 2 ? "16 manifests" : "handoff verified"}</small><i /></article>)}
        </div>
        <div className={styles.evidenceList}>{(isZh ? project.proofZh : project.proof).map((proof) => <small key={proof}>{proof}</small>)}</div>
      </div>
    );
  }

  if (id === "skills") {
    return (
      <div>
        <WindowHeading kicker="skills.index" title={copy.skillsTitle} />
        <div className={styles.skillsGrid}>
          {skillGroups.map(([enTitle, enSkills, zhTitle, zhSkills], index) => <article key={enTitle}><b>0{index + 1}</b><h3>{isZh ? zhTitle : enTitle}</h3><p>{isZh ? zhSkills : enSkills}</p></article>)}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.githubWindow}>
      <div className={styles.githubIdentity}>
        <IconGlyph id="github" />
        <WindowHeading kicker="github.com/Wenjunyun123" title={isZh ? "开源贡献账本" : "Open-source ledger"} />
      </div>
      <p className={styles.snapshotNote}>
        {isZh
          ? `GitHub 核验快照 · ${githubSnapshot.verifiedAt} · 只展示可追溯公开记录`
          : `Verified GitHub snapshot · ${githubSnapshot.verifiedAt} · public evidence only`}
      </p>
      <div className={styles.githubStats}>
        <article><strong>{githubSnapshot.mergedPullRequests}</strong><span>{isZh ? "外部仓库已合并 PR" : "merged upstream PRs"}</span></article>
        <article><strong>{githubSnapshot.verifiedBugReports} / {githubSnapshot.authoredIssues}</strong><span>{isZh ? "有效 Bug / 公开 Issue" : "validated bugs / issues"}</span></article>
        <article><strong>{githubSnapshot.publicRepositories}</strong><span>{isZh ? "公开仓库" : "public repositories"}</span></article>
      </div>
      <p className={styles.contributionCaveat}>
        {isZh
          ? `GitHub 近一年贡献图为 ${githubSnapshot.contributionsLastYear}，其中混合提交、Issue、PR、Review 与匿名私有贡献，因此不作为“公开代码提交数”。`
          : `GitHub shows ${githubSnapshot.contributionsLastYear} contributions in the last year, but that mixes commits, issues, PRs, reviews, and anonymous private activity; it is not presented as a public-code count.`}
      </p>
      <div className={styles.githubSectionHeading}>
        <span>{isZh ? "已合并贡献" : "VERIFIED MERGES"}</span>
        <h3>{isZh ? "不是提交数，是已经进入上游的改动" : "Changes accepted upstream"}</h3>
      </div>
      <div className={styles.contributionList}>
        {githubMergedContributions.map((item) => (
          <a key={`${item.repo}-${item.number}`} href={item.url} target="_blank" rel="noreferrer">
            <div className={styles.contributionMeta}>
              <span data-kind={item.kind}>{item.kind === "code" ? (isZh ? "代码" : "CODE") : (isZh ? "文档" : "DOCS")}</span>
              <strong>{item.repo}#{item.number}</strong>
              <time>{item.mergedAt}</time>
            </div>
            <h4>{isZh ? item.titleZh : item.title}</h4>
            <p>{isZh ? item.impactZh : item.impact}</p>
            <small>{isZh ? item.proofZh : item.proof}<b>{isZh ? "已合并 ↗" : "MERGED ↗"}</b></small>
          </a>
        ))}
      </div>
      <div className={styles.githubSectionHeading}>
        <span>{isZh ? "有效 Bug" : "VALIDATED BUGS"}</span>
        <h3>{isZh ? "有确认、修复或独立复现证据的报告" : "Reports backed by confirmation or reproduction"}</h3>
      </div>
      <div className={styles.bugList}>
        {githubVerifiedBugs.map((item) => (
          <a key={`${item.repo}-${item.number}`} href={item.url} target="_blank" rel="noreferrer">
            <div>
              <span>{item.grade}</span>
              <strong>{item.repo}#{item.number}</strong>
              <time>{item.reportedAt}</time>
            </div>
            <h4>{isZh ? item.titleZh : item.title}</h4>
            <p>{isZh ? item.outcomeZh : item.outcome}</p>
            <small>{isZh ? item.statusZh : item.status}<b>ISSUE ↗</b></small>
          </a>
        ))}
      </div>
      <a className={styles.windowLink} href={githubSnapshot.profileUrl} target="_blank" rel="noreferrer">
        {isZh ? "查看完整 GitHub" : "Open GitHub profile"} →
      </a>
    </div>
  );
}

function WindowHeading({ kicker, title }: { kicker: string; title: string }) {
  return <div className={styles.windowHeading}><span>{kicker}</span><h2>{title}</h2></div>;
}

function IconGlyph({ id }: { id: WindowId }) {
  const common = { width: 48, height: 48, viewBox: "0 0 48 48", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": true } as const;
  if (id === "github") {
    return <svg {...common} className={styles.iconGraphic}><circle cx="24" cy="24" r="21" fill="#1a1a2e"/><path d="M16 37c0-4 2-6 5-7-5-.6-8-3-8-9 0-2 .7-4 2-5-1-3 0-5 0-5s3-1 6 2c2-.5 5-.5 7 0 3-3 6-2 6-2s1 2 0 5c1.3 1 2 3 2 5 0 6-3 8.4-8 9 2 1 3 3 3 6v1" stroke="#fefcf6" strokeWidth="2" strokeLinecap="round"/></svg>;
  }
  if (id === "team-agent") {
    return <svg {...common} className={styles.iconGraphic}><path d="M8 10h32v27H8z" fill="#f4d758" stroke="#1a1a2e" strokeWidth="2"/><circle cx="18" cy="22" r="5" fill="#2b7fd8"/><circle cx="30" cy="22" r="5" fill="#2b7fd8"/><path d="M16 32c4-3 12-3 16 0" stroke="#1a1a2e" strokeWidth="2"/></svg>;
  }
  if (id === "delivery-loop") {
    return <svg {...common} className={styles.iconGraphic}><circle cx="24" cy="24" r="18" stroke="#f4d758" strokeWidth="5" strokeDasharray="18 7"/><path d="m31 8 8 1-3 7" fill="#f4d758"/><path d="m17 40-8-1 3-7" fill="#f4d758"/></svg>;
  }
  if (id === "release-matrix") {
    return <svg {...common} className={styles.iconGraphic}><rect x="5" y="5" width="38" height="38" rx="4" fill="#fefcf6" stroke="#1a1a2e" strokeWidth="2"/><path d="M17 5v38M31 5v38M5 17h38M5 31h38" stroke="#2b7fd8" strokeWidth="2"/><path d="m20 24 3 3 7-8" stroke="#1a1a2e" strokeWidth="3"/></svg>;
  }
  if (id === "skills") {
    return <svg {...common} className={styles.iconGraphic}><path d="m24 3 6 12 13 2-10 10 2 14-11-6-12 6 3-14L5 17l13-2z" fill="#f4d758" stroke="#1a1a2e" strokeWidth="2"/></svg>;
  }
  if (id === "experience") {
    return <svg {...common} className={styles.iconGraphic}><path d="M5 15h38v27H5z" fill="#f4d758" stroke="#1a1a2e" strokeWidth="2"/><path d="M17 15V9h14v6M5 25h38" stroke="#1a1a2e" strokeWidth="2"/><path d="M20 23h8v5h-8z" fill="#2b7fd8"/></svg>;
  }
  const isResume = id === "resume";
  return <svg {...common} className={styles.iconGraphic}><path d="M9 4h23l7 7v33H9z" fill={isResume ? "#f4d758" : "#fefcf6"} stroke="#1a1a2e" strokeWidth="2"/><path d="M32 4v8h7M15 21h18M15 27h18M15 33h12" stroke="#2b7fd8" strokeWidth="2"/><path d="M15 14h9" stroke="#1a1a2e" strokeWidth="3"/></svg>;
}

function ExitSequence({ reducedMotion, onReturnDesktop }: { reducedMotion: boolean; onReturnDesktop: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(reducedMotion ? 0.65 : 0);
  const [fillScale, setFillScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }
      const rect = section.getBoundingClientRect();
      const maxScroll = Math.max(1, rect.height - window.innerHeight);
      const raw = clamp(-rect.top / maxScroll, 0, 1);
      setProgress(reducedMotion ? (raw > 0 ? 0.65 : 0.65) : raw);
      const deviceWidth = Math.min(760, window.innerWidth * 0.92);
      const deviceHeight = deviceWidth * (520 / 760);
      setFillScale(Math.max(1, window.innerWidth / deviceWidth, window.innerHeight / deviceHeight));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (progress < 0.6) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !(event.target as HTMLElement)?.closest("a, button, input, textarea")) {
        event.preventDefault();
        onReturnDesktop();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onReturnDesktop, progress]);

  const normalizedScale = reducedMotion ? 1 : fillScale - (fillScale - 1) * clamp(progress / 0.5, 0, 1);
  const goodbyeOpacity = reducedMotion ? 1 : clamp((progress - 0.3) / 0.3, 0, 1);
  const style = {
    "--exit-scale": normalizedScale,
    "--goodbye-opacity": goodbyeOpacity,
    "--preview-opacity": 1 - goodbyeOpacity
  } as CSSProperties;

  return (
    <section className={styles.exitSection} ref={sectionRef} aria-label="Wenjun OS exit sequence">
      <div className={styles.exitSticky} style={style}>
        <div className={styles.exitCounter} aria-hidden="true">EXIT / {String(Math.round(progress * 100)).padStart(3, "0")}</div>
        <LaptopShell className={styles.exitLaptop}>
          <div className={styles.exitDesktopPreview}>
            <div className={styles.exitPreviewBar}><span>Wenjun OS</span><span>Frontend × Agent × Delivery</span></div>
            <span className={styles.exitPreviewStar}>✦</span>
          </div>
          <div className={styles.goodbyeTerminal}>
            <div className={styles.goodbyeCommand}>$ contact --open-to-fde</div>
            <h2>Let&apos;s ship the loop.</h2>
            <dl>
              <div><dt>EMAIL</dt><dd><a href="mailto:wenjunyou2002@outlook.com">wenjunyou2002@outlook.com</a></dd></div>
              <div><dt>GITHUB</dt><dd><a href="https://github.com/Wenjunyun123" target="_blank" rel="noreferrer">github.com/Wenjunyun123</a></dd></div>
              <div><dt>STATUS</dt><dd>Open to FDE</dd></div>
            </dl>
            <button type="button" onClick={onReturnDesktop}>重新启动 / Return to desktop ↵</button>
            <p>Press Enter to return</p>
          </div>
        </LaptopShell>
      </div>
    </section>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

function formatClock(value: Date, language: SiteLanguage) {
  return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-US", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(value);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
