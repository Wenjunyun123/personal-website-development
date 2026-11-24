"use client";

import {
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
import type { IconType } from "react-icons";
import { FaGithub } from "react-icons/fa";
import { FiBriefcase, FiFileText, FiGrid, FiLayers, FiRepeat, FiSearch, FiShare2, FiTarget, FiUser, FiUsers } from "react-icons/fi";
import { portfolioWork } from "../../content/portfolio";
import { DetectiveMark } from "./detective-mark";
import {
  deliveryStageOrder,
  deliveryStages,
  experienceItems,
  experienceTimeline,
  featuredProjects,
  feishuLayers,
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
  | "feishu"
  | "fde"
  | "experience"
  | "delivery-loop"
  | "team-agent"
  | "release-matrix"
  | "skills"
  | "resume"
  | "github"
  | "off-duty";

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

const metricLabelEn: Record<string, string> = {
  "整体响应": "overall response",
  "首轮优化平均": "first-pass average",
  "后续整链中位": "later chain median",
  "妙搭平均 / P95": "Miaoda avg / P95",
  "项未解释差异": "unexplained diffs",
  "迁移规模": "migration scale",
  "证书查询": "certificate query",
  "工具调用": "tool calls"
};

const terminalScript = [
  { text: "$ whoami", kind: "command" },
  { text: "> 游文君 Wenjun You", kind: "output" },
  { text: "$ cat about.md", kind: "command" },
  { text: "> AI 应用交付工程师 / FDE", kind: "output" },
  { text: "  驻场负熵云，做企业智能客服与资料查询、数据迁移", kind: "output" },
  { text: "  把模糊需求变成可运行、可评测、可交接的 AI 应用", kind: "output" },
  { text: "$ cat motto.txt", kind: "command" },
  { text: "> TOKEN IS OXYGEN!", kind: "gold" },
  { text: "$ tail -f progress.log", kind: "command" },
  { text: "> ∞ 无限进步 — keep shipping", kind: "output" },
  { text: "$ open case-001.app", kind: "command" }
] as const;

const iconDefinitions: ReadonlyArray<{ id: WindowId; label: string; labelZh: string; action: string }> = [
  { id: "feishu", label: "feishu-ecosystem", labelZh: "飞书生态", action: "Open Ecosystem" },
  { id: "about", label: "about.md", labelZh: "about.md", action: "Open Profile" },
  { id: "fde", label: "fde-delivery", labelZh: "FDE 交付", action: "Open Delivery Threads" },
  { id: "experience", label: "timeline", labelZh: "经历时间轴", action: "View Timeline" },
  { id: "delivery-loop", label: "lark-github-loop", labelZh: "飞书-GitHub闭环", action: "Open Workflow" },
  { id: "team-agent", label: "team-agent", labelZh: "Team Agent", action: "Open Agent" },
  { id: "release-matrix", label: "release-matrix", labelZh: "发布矩阵", action: "Open Matrix" },
  { id: "skills", label: "skills", labelZh: "能力栈", action: "View Stack" },
  { id: "resume", label: "resume", labelZh: "简历", action: "View Resume" },
  { id: "github", label: "open-source", labelZh: "开源贡献", action: "See the Repo" }
];

const initialIconPositions: Record<WindowId, Point> = {
  feishu: { x: 22, y: 370 },
  about: { x: 22, y: 52 },
  fde: { x: 142, y: 52 },
  experience: { x: 262, y: 52 },
  "delivery-loop": { x: 22, y: 158 },
  "team-agent": { x: 142, y: 158 },
  "release-matrix": { x: 262, y: 158 },
  skills: { x: 22, y: 264 },
  resume: { x: 142, y: 264 },
  github: { x: 262, y: 264 },
  "off-duty": { x: 142, y: 370 }
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
        <div className={`${styles.introDevice} ${zooming ? styles.introDeviceLaunching : ""}`}>
          <div className={styles.introCover}>
            <p className={styles.introKicker}>Forward-deployed engineer, Shanghai</p>
            <h1 className={styles.introTitle}>Token is <span>oxygen!</span></h1>
            <p className={styles.introLead}>
              游文君，AI 应用交付工程师（FDE）。驻场负熵云，把模糊需求交付成可运行、可评测、可交接的 AI 应用。
            </p>
            <dl className={styles.introFacts}>
              <div><dt>现在</dt><dd>负熵云，驻场交付</dd></div>
              <div><dt>方法</dt><dd>Brief → Build → Eval → Handoff</dd></div>
            </dl>
            <div className={styles.introActions}>
              <button
                className={styles.launchCta}
                type="button"
                onClick={activateIntro}
                aria-live="polite"
                aria-label={introReady ? "启动 Wenjun OS" : "跳过终端输入动画"}
              >
                {launching ? (
                  <span className={styles.launchProgress}>opening the record ({Math.round((launchProgress / 12) * 100)}%)</span>
                ) : (
                  <span>
                    {introReady ? (
                      <>
                        <span className={styles.launchCtaDesktop}>Press Enter to open the case</span>
                        <span className={styles.launchCtaMobile}>Tap to open the case</span>
                      </>
                    ) : (
                      <>
                        <span className={styles.launchCtaDesktop}>跳过输入动画，查看案卷</span>
                        <span className={styles.launchCtaMobile}>跳过输入动画</span>
                      </>
                    )}
                  </span>
                )}
              </button>
              <span className={styles.introAlt}>或按 Enter</span>
            </div>
          </div>
          <div className={styles.introLog}>
            <p className={styles.introLogLabel}>delivery.log</p>
            <ConsoleShell>
              <TerminalIntro
                lineIndex={lineIndex}
                characterIndex={characterIndex}
                ready={introReady}
                launching={launching}
                progress={launchProgress}
              />
            </ConsoleShell>
          </div>
          <div className={`${styles.launchWash} ${zooming ? styles.launchWashActive : ""}`} aria-hidden="true" />
        </div>
        <p className={styles.introHint} aria-hidden="true">∞</p>
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
        <span className={styles.terminalBrand}><DetectiveMark className={styles.terminalMark} size={12} /> 游文君 / delivery log</span>
        <span className={styles.terminalMode}>{launching ? "Opening" : ready ? "Ready" : "Boot"}</span>
        <span>2026</span>
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
            <div className={styles.terminal_output}>&gt; routing brief → build → eval → handoff...</div>
            <div className={styles.bootProgress} aria-label={`启动进度 ${progress} / 12`}>
              <div className={styles.bootTrack} aria-hidden="true"><i style={{ transform: `scaleX(${(progress / 12).toFixed(3)})` }} /></div>
              <div className={styles.bootStages}>
                {["Brief", "Build", "Eval", "Handoff"].map((stage, index) => (
                  <span
                    key={stage}
                    data-state={progress >= (index + 1) * 3 ? "done" : progress > index * 3 ? "active" : "pending"}
                  >
                    {stage}
                  </span>
                ))}
                <span className={styles.bootInfinity} data-state={progress >= 12 ? "done" : "pending"} aria-hidden="true">∞</span>
              </div>
            </div>
          </>
        ) : ready ? (
          <div className={styles.bootProgress} aria-label="交付流程：Brief、Build、Eval、Handoff">
            <div className={styles.bootTrack} aria-hidden="true"><i style={{ transform: "scaleX(1)" }} /></div>
            <div className={styles.bootStages}>
              {["Brief", "Build", "Eval", "Handoff"].map((stage) => (
                <span key={stage} data-state="done">{stage}</span>
              ))}
              <span className={styles.bootInfinity} data-state="done" aria-hidden="true">∞</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ConsoleShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.console} ${className}`}>
      <div className={styles.consoleScreen}>{children}</div>
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
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    return () => {
      document.documentElement.lang = "zh-CN";
    };
  }, [language]);

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
      const cascade = current.length % 5;
      const width = id === "fde" ? 880 : 760;
      const x = isMobile ? 12 : Math.max(12, Math.round((window.innerWidth - width) / 2) + cascade * 24);
      const y = isMobile ? 80 : 124 + cascade * 24;
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
        x: clamp(drag.origin.x + dx, 8, Math.max(8, window.innerWidth - 116)),
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

  const labels = useMemo(() => {
    const map = Object.fromEntries(iconDefinitions.map((item) => [item.id, language === "zh" ? item.labelZh : item.label])) as Record<string, string>;
    map["off-duty"] = language === "zh" ? "工作之外" : "Off the clock";
    return map as Record<WindowId, string>;
  }, [language]);
  const cover = profileCopy[language];

  return (
    <section className={styles.desktop} ref={forwardedRef} aria-label="Wenjun OS desktop">
      <header className={styles.menuBar}>
        <div className={styles.menuIdentity}>
          <Image src="/profile/wenjun-avatar.png" alt="" width={24} height={24} />
          <span className={styles.menuCase}>{language === "zh" ? "交付记录，2026" : "Delivery record, 2026"}</span>
          <button className={`${styles.desktopMenuText} ${styles.menuNav}`} type="button" onClick={() => openWindow("about")}>Profile</button>
          <button className={`${styles.desktopMenuText} ${styles.menuNav}`} type="button" onClick={() => { window.location.hash = "#works"; }}>Projects</button>
          <button className={`${styles.desktopMenuText} ${styles.menuNav}`} type="button" onClick={() => openWindow("fde")}>Delivery</button>
          <button className={`${styles.desktopMenuText} ${styles.menuNav}`} type="button" onClick={() => openWindow("off-duty")}>Off-duty</button>
        </div>
        <div className={styles.menuStatus}>
          <button type="button" onClick={() => setLanguage((value) => value === "zh" ? "en" : "zh")} aria-label="Switch desktop language">{language === "zh" ? "中 / EN" : "EN / 中"}</button>
          <time dateTime={time.toISOString()}>{formatClock(time, language)}</time>
        </div>
      </header>
      <div
        className={styles.wallpaper}
        onClick={() => setSelectedIcon(null)}
      >
        <div className={styles.desktopMain}>
        <div className={styles.desktopIntro}>
          <p className={styles.desktopKicker}>{language === "zh" ? "AI 应用交付工程师，上海" : "AI application delivery, Shanghai"}</p>
          <h1 className={styles.desktopTitle}>
            {language === "zh" ? <>把模糊需求，<br />交付成可运行的系统。</> : <>Ambiguous needs,<br />delivered as working systems.</>}
          </h1>
          <p className={styles.desktopLead}>
            {language === "zh"
              ? "我是游文君，驻场负熵云。用飞书生态做企业智能客服与资料查询、数据迁移；从需求拆解一直走到验收和交接。"
              : "I am Wenjun You, onsite at Negative Entropy Cloud: using the Feishu ecosystem for enterprise service and product query, plus data migration, from scoping through acceptance and handoff."}
          </p>
          <div className={styles.desktopActions}>
            <a className={styles.desktopPrimary} href="#works">{language === "zh" ? "查看作品" : "See the work"}</a>
            <button className={styles.desktopSecondary} type="button" onClick={() => openWindow("fde")}>{language === "zh" ? "看交付记录" : "Read the delivery record"}</button>
          </div>
          <dl className={styles.desktopFacts}>
            <div><dt>{language === "zh" ? "两条交付主线" : "Two delivery threads"}</dt><dd>{language === "zh" ? "企业客服与资料查询 / 数据迁移" : "Service & query / Migration"}</dd></div>
            <div><dt>{language === "zh" ? "工作方式" : "Working method"}</dt><dd>Brief → Build → Eval → Handoff</dd></div>
            <div className={styles.desktopFactWide}><dt>{language === "zh" ? "飞书生态" : "Feishu ecosystem"}</dt><dd>{language === "zh" ? "Base / Aily / 妙搭 / 机器人 / 开放平台 / 审批" : "Base / Aily / Miaoda / Bots / Open Platform / Approval"}</dd></div>
          </dl>
        </div>
        <div className={styles.iconLayer}>
          <p className={styles.indexHeading}>{language === "zh" ? "打开一份证据" : "Open one piece of evidence"}</p>
          {iconDefinitions.map((icon) => {
            const position = iconPositions[icon.id];
            return (
              <button
                className={`${styles.desktopIcon} ${selectedIcon === icon.id ? styles.desktopIconSelected : ""}`}
                style={{ left: position.x, top: position.y }}
                data-hover-label={icon.action}
                data-icon-id={icon.id}
                type="button"
                key={icon.id}
                aria-label={`${labels[icon.id]} — open`}
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
                  setSelectedIcon(icon.id);
                  openWindow(icon.id);
                }}
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
        <aside className={styles.caseCover} aria-label={language === "zh" ? "个人肖像与联系方式" : "Portrait and contact"}>
          <figure className={styles.coverFigure}>
            <Image
              src="/profile/wenjun.png"
              alt="游文君 Wenjun You"
              width={420}
              height={560}
              sizes="(max-width: 900px) 86vw, 440px"
              priority
            />
            <figcaption>{language === "zh" ? "游文君，上海，2026" : "Wenjun You, Shanghai, 2026"}</figcaption>
          </figure>
          <div className={styles.caseCoverMeta}>
            <span className={styles.caseCoverKicker}>Open to FDE</span>
            <strong className={styles.caseCoverName}>
              {cover.identity}
              <em>{cover.chineseName}</em>
            </strong>
            <p className={styles.caseCoverRole}>{cover.role}</p>
            <div className={styles.caseCoverStats}>
              <span><b>2</b>{language === "zh" ? "条企业交付主线" : "delivery threads"}</span>
              <span><b>0</b>{language === "zh" ? "项未解释差异" : "unexplained diffs"}</span>
            </div>
            <button className={styles.coverOffDuty} type="button" onClick={() => openWindow("off-duty")}>
              <span className={styles.coverOffDutyLabel}>{language === "zh" ? "工作之外" : "Off the clock"}</span>
              <span className={styles.coverOffDutyLine}>{language === "zh" ? "最爱《名侦探柯南》。" : "My favorite anime is Detective Conan."}</span>
              <span className={styles.coverOffDutyCue}>{language === "zh" ? "打开 off-duty.md" : "Open off-duty.md"}</span>
            </button>
          </div>
        </aside>
      </div>
      {windows.map((item) => (
          <article
            className={`${styles.osWindow} ${item.id === "fde" ? styles.fdeWindow : ""} ${item.minimized ? styles.windowMinimized : ""} ${item.maximized ? styles.windowMaximized : ""}`}
            style={{ left: item.x, top: item.y, zIndex: item.z }}
            key={item.id}
            onPointerDown={() => bringToFront(item.id)}
            aria-label={`${labels[item.id]} window`}
            data-window-state={item.minimized ? "minimized" : item.maximized ? "maximized" : "normal"}
          >
            <div
              className={styles.panelHead}
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
              <div className={styles.panelActions} role="group" aria-label={`窗口控制：${labels[item.id]}`}>
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
          <Image src="/profile/wenjun-avatar.png" alt="" width={92} height={92} />
          <div><span className={styles.eyebrow}>{copy.status}</span><h2>{copy.identity}</h2><p>{copy.chineseName}</p></div>
        </div>
        <h3>{copy.role}</h3>
        <p className={styles.largeCopy}>{copy.thesis}</p>
        <div className={styles.signalRow}>{copy.heroSignals.map((signal) => <span key={signal}>{signal}</span>)}</div>
      </div>
    );
  }

  if (id === "feishu") {
    return (
      <div>
        <WindowHeading
          kicker="Feishu ecosystem"
          title={isZh ? "把飞书组合成企业提效方案" : "Composing Feishu into enterprise efficiency"}
        />
        <p>
          {isZh
            ? "我熟悉飞书生态里的产品边界，也知道怎么把它们组合成企业提效链路：先在 Base 里把业务数据变成真源，再用 Aily/妙搭做知识与问答，用机器人、Webhook、开放平台连接外部系统，最后用权限、审批和评测把交付闭环。"
            : "I know the product boundaries inside the Feishu ecosystem, and how to compose them into an enterprise efficiency chain: make Base the source of truth, use Aily and Miaoda for knowledge and Q&A, connect external systems through bots, Webhooks, and OpenAPI, then close the loop with permissions, approvals, and evaluation."}
        </p>
        <div className={styles.deliveryFlow}>
          {feishuLayers.map((layer) => (
            <article key={layer.number}>
              <b>{layer.number}</b>
              <span>{isZh ? layer.titleZh : layer.title}</span>
              <small>{isZh ? layer.productsZh : layer.products}</small>
              <p>{isZh ? layer.methodZh : layer.method}</p>
              <div className={styles.evidenceList}>
                <small>{isZh ? layer.proofZh : layer.proof}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (id === "fde") {
    return (
      <div>
        <WindowHeading
          kicker="FDE delivery, Sep–Dec 2026"
          title={isZh ? "两条企业 AI 交付主线" : "Two enterprise AI delivery threads"}
        />
        <p>
          {isZh
            ? "驻场负熵云客户现场：把企业智能客服与资料查询作为同一条项目线，从 70 多秒一路做到平均 9.96 秒；再把 2,041 条生产订单和会议/证书数据搬进可运营的 Base。两条线都从需求拆解走到验收与交接。"
            : "Onsite at Negative Entropy Cloud, I treated enterprise service and product query as one project line, moving it from 70+ seconds to a 9.96s average, then moved 2,041 production-order records plus meeting and certificate data into an operating Base. Both threads run from scoping through acceptance and handoff."}
        </p>
        <div className={styles.deliveryFlow}>
          {portfolioWork.map((project, index) => (
            <article key={project.slug}>
              <b>0{index + 1}</b>
              <span>{isZh ? project.titleZh : project.title}</span>
              <small>{isZh ? project.categoryZh : project.category}</small>
              <p>{isZh ? project.summaryZh : project.summary}</p>
              <div className={styles.evidenceList}>
                {project.metrics.map(([value, label]) => (
                  <small key={label}>{value} {isZh ? label : metricLabelEn[label] ?? label}</small>
                ))}
              </div>
              <a className={styles.threadLink} href={`/work/${project.slug}/`}>
                {isZh ? "阅读完整案例" : "Read the case"}
              </a>
            </article>
          ))}
        </div>
      </div>
    );
  }

  if (id === "experience") {
    return (
      <div>
        <WindowHeading
          kicker="Timeline, 2022 to now"
          title={isZh ? "从大一到 AI 交付现场" : "From freshman year to AI delivery"}
        />
        <div className={styles.timelineLegend} aria-label={isZh ? "时间轴类型" : "Timeline categories"}>
          <span data-kind="education">{isZh ? "教育" : "Education"}</span>
          <span data-kind="award">{isZh ? "获奖" : "Awards"}</span>
          <span data-kind="internship">{isZh ? "实习" : "Internships"}</span>
          <span data-kind="work">{isZh ? "工作" : "Work"}</span>
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
        <a className={styles.windowLink} href="/resume">{copy.viewResume}</a>
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
        <span className={styles.practiceFlag}>模拟业务实践，实现中</span>
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

  if (id === "off-duty") {
    return (
      <div className={styles.offDutyWindow}>
        <WindowHeading kicker="off-duty.md" title={isZh ? "工作之外" : "Off the clock"} />
        <p className={styles.offDutyLead}>{isZh ? "最爱《名侦探柯南》。" : "My favorite anime is Detective Conan."}</p>
        <p>
          {isZh
            ? "做交付也像办案：先把事实收齐，再让证据说话。"
            : "Delivery works like a case: gather the facts first, then let the evidence speak."}
        </p>
        <dl className={styles.offDutyFacts}>
          <div><dt>{isZh ? "位置" : "Based"}</dt><dd>{isZh ? "上海" : "Shanghai"}</dd></div>
          <div><dt>{isZh ? "现在" : "Now"}</dt><dd>{isZh ? "驻场交付收尾，开放 FDE 机会（2026.11）" : "Wrapping an onsite delivery, open to FDE (Nov 2026)"}</dd></div>
          <div>
            <dt>{isZh ? "信条" : "Mottoes"}</dt>
            <dd className={styles.offDutyCreed}>
              <span>Token is oxygen!</span>
              <span>∞ {isZh ? "无限进步" : "keep improving"}</span>
            </dd>
          </div>
        </dl>
        <blockquote className={styles.offDutyQuote}>
          <DetectiveMark className={styles.offDutyQuoteMark} size={16} />
          <p>{isZh ? "真相只有一个。" : "There is only one truth."}</p>
          <cite>{isZh ? "《名侦探柯南》" : "Detective Conan"}</cite>
        </blockquote>
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
          ? `GitHub 核验快照，${githubSnapshot.verifiedAt}，只展示可追溯公开记录`
          : `Verified GitHub snapshot, ${githubSnapshot.verifiedAt}, public evidence only`}
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
            <small>{isZh ? item.proofZh : item.proof}<b>{isZh ? "已合并" : "MERGED"}</b></small>
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
            <small>{isZh ? item.statusZh : item.status}<b>ISSUE</b></small>
          </a>
        ))}
      </div>
      <a className={styles.windowLink} href={githubSnapshot.profileUrl} target="_blank" rel="noreferrer">
        {isZh ? "查看完整 GitHub" : "Open GitHub profile"}
      </a>
    </div>
  );
}

function WindowHeading({ kicker, title }: { kicker: string; title: string }) {
  return <div className={styles.windowHeading}><span>{kicker}</span><h2>{title}</h2></div>;
}

function IconGlyph({ id }: { id: WindowId }) {
  const iconMap: Record<WindowId, IconType> = {
    about: FiUser,
    fde: FiTarget,
    experience: FiBriefcase,
    feishu: FiShare2,
    "delivery-loop": FiRepeat,
    "team-agent": FiUsers,
    "release-matrix": FiGrid,
    skills: FiLayers,
    resume: FiFileText,
    github: FaGithub,
    "off-duty": FiSearch
  };
  const Icon = iconMap[id];
  return <Icon className={styles.iconGraphic} aria-hidden="true" focusable="false" />;
}

function ExitSequence({ reducedMotion, onReturnDesktop }: { reducedMotion: boolean; onReturnDesktop: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && !(event.target as HTMLElement)?.closest("a, button, input, textarea")) {
        event.preventDefault();
        onReturnDesktop();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onReturnDesktop]);

  return (
    <section className={styles.exitSection} data-reduced-motion={reducedMotion ? "true" : "false"} aria-label="Wenjun OS exit sequence">
      <div className={styles.exitSticky}>
        <div className={styles.goodbyeTerminal}>
          <p className={styles.goodbyeCommand}>Contact / open to FDE</p>
          <h2>Let&apos;s ship the loop.</h2>
          <div className={styles.goodbyeGrid}>
            <div className={styles.goodbyePrimary}>
              <a className={styles.goodbyeEmail} href="mailto:wenjunyou2002@outlook.com">
                wenjunyou2002@outlook.com
              </a>
              <button className={styles.goodbyeRestart} type="button" onClick={onReturnDesktop}>重新启动 / Return to desktop</button>
            </div>
            <dl>
              <div><dt>GitHub</dt><dd><a href="https://github.com/Wenjunyun123" target="_blank" rel="noreferrer">github.com/Wenjunyun123</a></dd></div>
              <div><dt>Status</dt><dd>Open to FDE</dd></div>
            </dl>
            <p className={styles.goodbyeMotto}><span>∞</span> 无限进步</p>
          </div>
        </div>
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
