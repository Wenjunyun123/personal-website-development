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
import type { IconType } from "react-icons";
import { FaGithub } from "react-icons/fa";
import { FiBriefcase, FiFileText, FiGrid, FiLayers, FiRepeat, FiTarget, FiUser, FiUsers } from "react-icons/fi";
import { portfolioWork } from "../../content/portfolio";
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
  | "fde"
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

const metricLabelEn: Record<string, string> = {
  "平均响应": "avg response",
  "去长尾平均": "trimmed avg",
  "中位响应": "median",
  "隔日复测中位差": "rerun median delta",
  "A/B 中位耗时": "A/B median",
  "A/B P90": "A/B P90",
  "每题候选文件": "candidate files / question",
  "查询台平均响应": "query desk avg",
  "项未解释差异": "unexplained diffs",
  "迁移规模": "migration scale",
  "证书查询": "certificate query",
  "工具调用": "tool calls"
};

const terminalScript = [
  { text: "$ whoami", kind: "command" },
  { text: "> 游文君 Wenjun You", kind: "output" },
  { text: "$ cat about.md", kind: "command" },
  { text: "> AI 应用交付工程师（FDE）", kind: "output" },
  { text: "  驻场负熵云，做企业智能客服、产品知识与数据迁移", kind: "output" },
  { text: "  把模糊需求变成可运行、可评测、可交接的 AI 应用", kind: "output" },
  { text: '$ echo "1 person + AI = one delivery team"', kind: "command" },
  { text: "> 1 person + AI = one delivery team", kind: "gold" },
  { text: "$ open wenjun-os.app", kind: "command" }
] as const;

const deliverySignalPath = "M 60 580 C 170 580 150 380 250 380 C 360 380 430 580 620 580 C 770 580 790 250 900 250 C 1000 250 1050 220 1120 220";
const deliverySignalNodes = [
  { x: 60, y: 580, label: "BRIEF", anchor: "start", dx: 18, dy: 24 },
  { x: 250, y: 380, label: "BUILD", anchor: "end", dx: -18, dy: -16 },
  { x: 620, y: 580, label: "EVAL", anchor: "start", dx: 18, dy: 24 },
  { x: 1120, y: 220, label: "HANDOFF", anchor: "end", dx: -18, dy: -16 }
] as const;

function DeliverySignal({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      className={`${styles.deliverySignal} ${animated ? styles.deliverySignalAnimated : ""} ${className}`}
      viewBox="0 0 1200 720"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path className={styles.signalHalo} d={deliverySignalPath} />
      <path className={styles.signalLine} d={deliverySignalPath} />
      {deliverySignalNodes.map((node, index) => (
        <g className={styles.signalNode} key={node.label} style={{ "--node-delay": `${index * 0.55}s` } as CSSProperties}>
          <circle className={styles.signalNodeHalo} cx={node.x} cy={node.y} r="17" />
          <circle className={styles.signalNodeDot} cx={node.x} cy={node.y} r="4.5" />
          <text className={styles.signalNodeLabel} x={node.x + node.dx} y={node.y + node.dy} textAnchor={node.anchor}>{node.label}</text>
        </g>
      ))}
    </svg>
  );
}

const iconDefinitions: ReadonlyArray<{ id: WindowId; label: string; labelZh: string; action: string }> = [
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
  about: { x: 22, y: 52 },
  fde: { x: 142, y: 52 },
  experience: { x: 262, y: 52 },
  "delivery-loop": { x: 22, y: 158 },
  "team-agent": { x: 142, y: 158 },
  "release-matrix": { x: 262, y: 158 },
  skills: { x: 22, y: 264 },
  resume: { x: 142, y: 264 },
  github: { x: 262, y: 264 }
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
        <DeliverySignal className={styles.introSignal} animated />
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
          <ConsoleShell>
            <TerminalIntro
              lineIndex={lineIndex}
              characterIndex={characterIndex}
              ready={introReady}
              launching={launching}
              progress={launchProgress}
            />
          </ConsoleShell>
          <div className={`${styles.launchWash} ${zooming ? styles.launchWashActive : ""}`} aria-hidden="true" />
        </div>
        <button className={styles.launchCta} type="button" onClick={activateIntro} aria-live="polite">
          {launching ? (
            `loading wenjun-os · ${Math.round((launchProgress / 12) * 100)}%`
          ) : (
            <>
              <span className={styles.launchCtaDesktop}>{introReady ? "Press Enter to Launch" : "Click to skip typing"}</span>
              <span className={styles.launchCtaMobile}>{introReady ? "Tap to Enter" : "Tap to skip typing"}</span>
            </>
          )}
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
        <span className={styles.terminalBrand}><i aria-hidden="true" /> WENJUN / DELIVERY OS</span>
        <span className={styles.terminalMode}>{launching ? "LAUNCH" : ready ? "READY" : "BOOT"}</span>
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
            <div className={styles.terminal_output}>&gt; routing brief → build → eval → handoff...</div>
            <div className={styles.bootProgress} aria-label={`启动进度 ${progress} / 12`}>
              <div className={styles.bootTrack} aria-hidden="true"><i style={{ width: `${Math.round((progress / 12) * 100)}%` }} /></div>
              <div className={styles.bootStages}>
                {["BRIEF", "BUILD", "EVAL", "HANDOFF"].map((stage, index) => (
                  <span
                    key={stage}
                    data-state={progress >= (index + 1) * 3 ? "done" : progress > index * 3 ? "active" : "pending"}
                  >
                    {stage}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : ready ? (
          <div className={styles.bootProgress} aria-label="交付流程：BRIEF、BUILD、EVAL、HANDOFF">
            <div className={styles.bootTrack} aria-hidden="true"><i style={{ width: "100%" }} /></div>
            <div className={styles.bootStages}>
              {["BRIEF", "BUILD", "EVAL", "HANDOFF"].map((stage) => (
                <span key={stage} data-state="done">{stage}</span>
              ))}
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
      <span className={styles.consolePort} data-side="in" aria-hidden="true">IN</span>
      <span className={styles.consolePort} data-side="out" aria-hidden="true">OUT</span>
      <div className={styles.consoleScreen}>{children}</div>
      <div className={styles.consoleFooter} aria-hidden="true">
        <span><i /> SIGNAL LOCKED</span>
        <span>DELIVERY CONSOLE · CH 01—04</span>
        <span>UTC+8</span>
      </div>
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

  const labels = useMemo(() => Object.fromEntries(iconDefinitions.map((item) => [item.id, language === "zh" ? item.labelZh : item.label])) as Record<WindowId, string>, [language]);

  return (
    <section className={styles.desktop} ref={forwardedRef} aria-label="Wenjun OS desktop">
      <header className={styles.menuBar}>
        <div className={styles.menuIdentity}>
          <Image src="/profile/wenjun-avatar.png" alt="游文君 Wenjun You" width={22} height={22} />
          <strong>Wenjun OS</strong>
          <button className={`${styles.desktopMenuText} ${styles.menuNav}`} type="button" onClick={() => openWindow("about")}>Profile</button>
          <button className={`${styles.desktopMenuText} ${styles.menuNav}`} type="button" onClick={() => { window.location.hash = "#works"; }}>Projects</button>
          <button className={`${styles.desktopMenuText} ${styles.menuNav}`} type="button" onClick={() => openWindow("fde")}>Delivery</button>
        </div>
        <div className={styles.menuStatus}>
          <span className={styles.onlineDot} aria-label="Available" />
          <button type="button" onClick={() => setLanguage((value) => value === "zh" ? "en" : "zh")} aria-label="Switch desktop language">{language === "zh" ? "中 / EN" : "EN / 中"}</button>
          <time dateTime={time.toISOString()}>{formatClock(time, language)}</time>
        </div>
      </header>
      <div
        className={styles.wallpaper}
        onClick={() => setSelectedIcon(null)}
      >
        <DeliverySignal className={styles.desktopSignal} />
        <div className={styles.iconLayer}>
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
          <Image src="/profile/wenjun-avatar.png" alt="" width={92} height={92} />
          <div><span className={styles.eyebrow}>{copy.status}</span><h2>{copy.identity}</h2><p>{copy.chineseName}</p></div>
        </div>
        <h3>{copy.role}</h3>
        <p className={styles.largeCopy}>{copy.thesis}</p>
        <div className={styles.signalRow}>{copy.heroSignals.map((signal) => <span key={signal}>{signal}</span>)}</div>
      </div>
    );
  }

  if (id === "fde") {
    return (
      <div>
        <WindowHeading
          kicker="fde.delivery · 2026.09—12"
          title={isZh ? "三条企业 AI 交付主线" : "Three enterprise AI delivery threads"}
        />
        <p>
          {isZh
            ? "驻场负熵云客户现场：先把客服链路从“能回答”做到“稳定送达”，再把 889 份产品资料变成可检索、可交付的知识库，最后把 2,041 条生产订单和会议/证书数据搬进可运营的 Base。三条线都从需求拆解走到验收与交接。"
            : "Onsite at Negative Entropy Cloud, I first moved customer service from “can answer” to “reliably delivered,” then turned 889 product documents into a queryable, handover-ready knowledge base, and finally moved 2,041 production-order records plus meeting and certificate data into an operating Base. Each thread runs from scoping through acceptance and handoff."}
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
                {isZh ? "阅读完整案例" : "Read the case"} ↗
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
          kicker="timeline.app · 2022 → now"
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
  const iconMap: Record<WindowId, IconType> = {
    about: FiUser,
    fde: FiTarget,
    experience: FiBriefcase,
    "delivery-loop": FiRepeat,
    "team-agent": FiUsers,
    "release-matrix": FiGrid,
    skills: FiLayers,
    resume: FiFileText,
    github: FaGithub
  };
  const Icon = iconMap[id];
  return <Icon className={styles.iconGraphic} aria-hidden="true" focusable="false" />;
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
        <ConsoleShell className={styles.exitLaptop}>
          <div className={styles.exitDesktopPreview}>
            <DeliverySignal className={styles.exitSignal} />
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
        </ConsoleShell>
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
