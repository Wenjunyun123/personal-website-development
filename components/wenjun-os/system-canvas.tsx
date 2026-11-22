"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  deliveryStageOrder,
  deliveryStages,
  experienceTimeline,
  githubMergedContributions,
  githubSnapshot,
  githubVerifiedBugs,
  profileCopy,
  skillGroups,
  teamAgentEvents
} from "../../content/profile";
import { useLanguage } from "../language-toggle";
import styles from "./system-canvas.module.css";

const SPACE_WIDTH = 2300;
const SPACE_HEIGHT = 1500;
const MIN_SCALE = 0.35;
const MAX_SCALE = 1.8;

type Point = { x: number; y: number };
type Transform = Point & { scale: number };
type Tone = "profile" | "blue" | "yellow" | "paper" | "principle" | "note";
type TemplateKey = "project" | "note" | "system";
type CardContent = "default" | "profile" | "timeline" | "github";

type CanvasCard = {
  id: string;
  kickerEn: string;
  kickerZh: string;
  titleEn: string;
  titleZh: string;
  bodyEn: string;
  bodyZh: string;
  itemsEn: string[];
  itemsZh: string[];
  content?: CardContent;
  tone: Tone;
  x: number;
  y: number;
  width: number;
  height: number;
};

type HistoryAction =
  | { type: "create"; cardId: string }
  | { type: "move"; cardId: string; from: Point };

type CardDrag = {
  pointerId: number;
  cardId: string;
  startX: number;
  startY: number;
  origin: Point;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function getInitialCards(): CanvasCard[] {
  const deliveryEn = deliveryStageOrder.map((key) => deliveryStages.en[key].short);
  const deliveryZh = deliveryStageOrder.map((key) => deliveryStages.zh[key].short);
  const eventsEn = teamAgentEvents.map(([name, rule]) => `${name} ${rule}`);
  const eventsZh = teamAgentEvents.map(([, , , name, rule]) => `${name} ${rule}`);
  const skillsEn = skillGroups.map(([title, stack]) => `${title}: ${stack.split(" · ").slice(0, 3).join(" · ")}`);
  const skillsZh = skillGroups.map(([, , title, stack]) => `${title}：${stack.split(" · ").slice(0, 3).join(" · ")}`);
  const timelineEn = experienceTimeline.map((item) => `${item.period} · ${item.title}`);
  const timelineZh = experienceTimeline.map((item) => `${"periodZh" in item ? item.periodZh : item.period} · ${item.titleZh}`);

  return [
    {
      id: "profile",
      kickerEn: "PROFILE / FDE",
      kickerZh: "个人信息 / FDE",
      titleEn: "Wenjun You",
      titleZh: "游文君",
      bodyEn: profileCopy.en.thesis,
      bodyZh: profileCopy.zh.thesis,
      itemsEn: ["AI application delivery", "Agent workflows", "Business automation"],
      itemsZh: ["AI 应用交付", "Agent 工作流", "业务自动化"],
      content: "profile",
      tone: "profile",
      x: 70,
      y: 185,
      width: 330,
      height: 272
    },
    {
      id: "experience-timeline",
      kickerEn: "PERSONAL SYSTEM / TIMELINE",
      kickerZh: "个人系统 / 经历时间轴",
      titleEn: "From freshman year to AI delivery",
      titleZh: "从大一到 AI 交付现场",
      bodyEn: "A source-backed timeline combining education, dated awards, undated undergraduate honors, and three internships.",
      bodyZh: "把教育、明确年份的获奖、未注明年份的本科荣誉与三段实习放入同一条可核对时间线。",
      itemsEn: timelineEn,
      itemsZh: timelineZh,
      content: "timeline",
      tone: "principle",
      x: 1530,
      y: 100,
      width: 650,
      height: 620
    },
    {
      id: "github-evidence",
      kickerEn: "PUBLIC EVIDENCE / 2026-07-13",
      kickerZh: "公开证据 / 2026-07-13",
      titleEn: "GitHub contribution evidence",
      titleZh: "GitHub 贡献证据",
      bodyEn: "Separate accepted upstream changes from profile activity counts, and keep validated bug reports linked to their original issues.",
      bodyZh: "把真正进入上游的改动与贡献图活动数分开，并让有效 Bug 报告回链原始 Issue。",
      itemsEn: [`${githubSnapshot.mergedPullRequests} merged upstream PRs`, `${githubSnapshot.verifiedBugReports}/${githubSnapshot.authoredIssues} validated bug reports`, `${githubSnapshot.publicRepositories} public repositories`],
      itemsZh: [`${githubSnapshot.mergedPullRequests} 个外部仓库已合并 PR`, `${githubSnapshot.verifiedBugReports}/${githubSnapshot.authoredIssues} 个有效 Bug / 公开 Issue`, `${githubSnapshot.publicRepositories} 个公开仓库`],
      content: "github",
      tone: "blue",
      x: 1500,
      y: 790,
      width: 680,
      height: 620
    },
    {
      id: "delivery-loop",
      kickerEn: "SYSTEM 01 / CONFIRMED PRACTICE",
      kickerZh: "系统 01 / 已确认实践",
      titleEn: "Lark CLI × GitHub CLI",
      titleZh: "飞书 CLI × GitHub CLI",
      bodyEn: "A request-to-evidence loop that carries business context into engineering and returns verified delivery state.",
      bodyZh: "让业务请求进入工程系统，并把 PR、CI 与验收证据回写来源记录的交付闭环。",
      itemsEn: deliveryEn,
      itemsZh: deliveryZh,
      tone: "blue",
      x: 500,
      y: 200,
      width: 450,
      height: 340
    },
    {
      id: "team-agent",
      kickerEn: "SYSTEM 02 / SIMULATED MODEL",
      kickerZh: "系统 02 / 模拟验证模型",
      titleEn: "Lark Base Team Agent",
      titleZh: "多维表格 Team Agent",
      bodyEn: "Business events move through permission intersection, channel mentions, human approval, and an auditable write-back.",
      bodyZh: "业务事件经过权限求交、群内 @、人工审批，再把处置结果与审计证据回写。",
      itemsEn: eventsEn,
      itemsZh: eventsZh,
      tone: "yellow",
      x: 1020,
      y: 180,
      width: 430,
      height: 326
    },
    {
      id: "capability-stack",
      kickerEn: "CAPABILITY STACK",
      kickerZh: "能力栈",
      titleEn: "Build across the boundary",
      titleZh: "跨越系统边界完成交付",
      bodyEn: "Frontend, agents, data, and delivery engineering belong to one operating surface.",
      bodyZh: "前端、Agent、数据自动化与交付工程在同一套操作面上协同。",
      itemsEn: skillsEn,
      itemsZh: skillsZh,
      tone: "paper",
      x: 500,
      y: 700,
      width: 430,
      height: 330
    },
    {
      id: "practice-principle",
      kickerEn: "OPERATING PRINCIPLE",
      kickerZh: "实践原则",
      titleEn: "Experience should become an asset.",
      titleZh: "让经验成为可运行的资产。",
      bodyEn: "Make know-how executable, measurable, attributable, and reviewable — not trapped in one person's memory.",
      bodyZh: "不要让经验只停留在脑中；把它变成可运行、可统计、可署名、可审核的 Agent 资产。",
      itemsEn: ["Executable", "Measurable", "Attributable", "Reviewable"],
      itemsZh: ["可运行", "可统计", "可署名", "可审核"],
      tone: "principle",
      x: 1020,
      y: 720,
      width: 380,
      height: 270
    },
    {
      id: "status-note",
      kickerEn: "STATUS NOTE",
      kickerZh: "状态便签",
      titleEn: "Building in public",
      titleZh: "正在建设",
      bodyEn: "The commerce Team Agent is a simulated business practice under implementation and validation. No production outcome is claimed.",
      bodyZh: "多维表格 Team Agent 是正在实现与验证的模拟业务实践，不虚构线上成效。",
      itemsEn: ["Model: drafted", "Interactions: building", "Evidence: pending"],
      itemsZh: ["模型：已整理", "交互：建设中", "证据：待验证"],
      tone: "note",
      x: 70,
      y: 720,
      width: 310,
      height: 246
    }
  ];
}

const CONNECTIONS = [
  ["profile", "experience-timeline"],
  ["experience-timeline", "github-evidence"],
  ["github-evidence", "delivery-loop"],
  ["profile", "delivery-loop"],
  ["profile", "capability-stack"],
  ["delivery-loop", "team-agent"],
  ["delivery-loop", "practice-principle"],
  ["team-agent", "status-note"],
  ["capability-stack", "practice-principle"]
] as const;

const TEMPLATES: Array<{ key: TemplateKey; tone: Tone }> = [
  { key: "project", tone: "blue" },
  { key: "note", tone: "note" },
  { key: "system", tone: "yellow" }
];

function CanvasCardContent({ card, isZh }: { card: CanvasCard; isZh: boolean }) {
  if (card.content === "profile") {
    return (
      <div className={styles.profileContent}>
        <div className={styles.profilePortrait}>
          <Image src="/profile/wenjun.png" alt={isZh ? "游文君个人照片" : "Portrait of Wenjun You"} width={106} height={142} draggable={false} priority />
          <i aria-hidden="true">✦</i>
        </div>
        <div>
          <p>{isZh ? card.bodyZh : card.bodyEn}</p>
          <ul>{(isZh ? card.itemsZh : card.itemsEn).map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    );
  }

  if (card.content === "timeline") {
    return (
      <div className={styles.timelineContent}>
        <p>{isZh ? card.bodyZh : card.bodyEn}</p>
        <ol>
          {experienceTimeline.map((item) => (
            <li key={`${item.period}-${item.title}`} data-kind={item.kind}>
              <time>{isZh && "periodZh" in item ? item.periodZh : item.period}</time>
              <i aria-hidden="true" />
              <div>
                <span>{isZh ? item.kindLabelZh : item.kindLabel}</span>
                <strong>{isZh ? item.titleZh : item.title}</strong>
                <small>{isZh ? item.organizationZh : item.organization}</small>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (card.content === "github") {
    return (
      <div className={styles.githubContent}>
        <p>{isZh ? card.bodyZh : card.bodyEn}</p>
        <div className={styles.githubMetrics}>
          <span><strong>{githubSnapshot.mergedPullRequests}</strong>{isZh ? "已合并 PR" : "merged PRs"}</span>
          <span><strong>{githubSnapshot.verifiedBugReports}/{githubSnapshot.authoredIssues}</strong>{isZh ? "有效 Bug" : "valid bugs"}</span>
          <span><strong>{githubSnapshot.publicRepositories}</strong>{isZh ? "公开仓库" : "public repos"}</span>
        </div>
        <section>
          <h3>{isZh ? "已进入上游" : "ACCEPTED UPSTREAM"}</h3>
          <div className={styles.githubEvidenceList}>
            {githubMergedContributions.map((item) => (
              <a key={`${item.repo}-${item.number}`} href={item.url} target="_blank" rel="noreferrer">
                <span>{item.kind === "code" ? (isZh ? "代码" : "CODE") : (isZh ? "文档" : "DOCS")}</span>
                <strong>{item.repo}#{item.number}</strong>
                <small>{isZh ? item.titleZh : item.title}</small>
                <b>↗</b>
              </a>
            ))}
          </div>
        </section>
        <section>
          <h3>{isZh ? "有效 Bug 报告" : "VALIDATED BUG REPORTS"}</h3>
          <div className={styles.githubBugList}>
            {githubVerifiedBugs.map((item) => (
              <a key={`${item.repo}-${item.number}`} href={item.url} target="_blank" rel="noreferrer">
                <span>{item.grade}</span>
                <strong>{item.repo}#{item.number}</strong>
                <small>{isZh ? item.statusZh : item.status}</small>
                <b>↗</b>
              </a>
            ))}
          </div>
        </section>
        <footer>
          {isZh
            ? `${githubSnapshot.contributionsLastYear} 是 GitHub 贡献图活动数，混含私有贡献与 Issue / PR / Review，不等同公开代码提交。`
            : `${githubSnapshot.contributionsLastYear} is a mixed profile-activity count, not a public-code total.`}
        </footer>
      </div>
    );
  }

  return (
    <>
      <p>{isZh ? card.bodyZh : card.bodyEn}</p>
      <ul>{(isZh ? card.itemsZh : card.itemsEn).map((item) => <li key={item}>{item}</li>)}</ul>
    </>
  );
}

export function SystemCanvas() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const viewportRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    origin: Point;
  } | null>(null);
  const dragRef = useRef<CardDrag | null>(null);
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextCardId = useRef(1);
  const didInitialFrame = useRef(false);
  const [cards, setCards] = useState<CanvasCard[]>(getInitialCards);
  const [transform, setTransform] = useState<Transform>({ x: 60, y: 20, scale: 0.85 });
  const [viewportSize, setViewportSize] = useState({ width: 1, height: 1 });
  const [selectedId, setSelectedId] = useState("profile");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [templateOpen, setTemplateOpen] = useState(false);
  const [connectionMode, setConnectionMode] = useState(false);
  const [connectionAnchor, setConnectionAnchor] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryAction[]>([]);

  const copy = useMemo(() => ({
    canvas: isZh ? "WENJUN 画布" : "WENJUN Canvas",
    hint: isZh ? "滚轮缩放 · 拖拽移动画布" : "Scroll to zoom · Drag to move canvas",
    newCard: isZh ? "新建卡片" : "New card",
    connect: isZh ? "连接" : "Connect",
    undo: isZh ? "撤销" : "Undo",
    layers: isZh ? "图层" : "Layers",
    cards: isZh ? `${cards.length} 张卡片` : `${cards.length} cards`,
    minimap: isZh ? "小地图" : "Minimap",
    minimapNav: isZh ? "点击小地图导航画布" : "Click minimap to navigate the canvas",
    zoomOut: isZh ? "缩小画布" : "Zoom out",
    zoomIn: isZh ? "放大画布" : "Zoom in",
    fit: isZh ? "适应全部卡片" : "Fit all cards",
    templateTitle: isZh ? "选择卡片模板" : "Choose a card template",
    templateHelp: isZh ? "新卡片将出现在当前视口中央" : "The new card appears at the center of the current viewport",
    closeTemplates: isZh ? "关闭模板面板" : "Close template panel",
    connectionHelp: isZh ? "连接模式已开启：点击卡片可标记连接起点；再次点击工具栏按钮退出。" : "Connect mode is on: select a card as an anchor, then toggle the toolbar button to exit.",
    help: isZh ? "空白处拖动 · 卡片可移动 · Ctrl/⌘ + Z 撤销" : "Drag empty space · Move cards · Ctrl/⌘ + Z to undo",
    templateNames: {
      project: isZh ? "项目卡" : "Project card",
      note: isZh ? "便签" : "Note",
      system: isZh ? "系统节点" : "System node"
    }
  }), [cards.length, isZh]);

  const cardMap = useMemo(() => new Map(cards.map((card) => [card.id, card])), [cards]);

  const fitBounds = useCallback((bounds: { x: number; y: number; width: number; height: number }, padding = 58) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const scale = clamp(
      Math.min(
        (viewport.clientWidth - padding * 2) / bounds.width,
        (viewport.clientHeight - padding * 2) / bounds.height
      ),
      MIN_SCALE,
      MAX_SCALE
    );
    setTransform({
      x: (viewport.clientWidth - bounds.width * scale) / 2 - bounds.x * scale,
      y: (viewport.clientHeight - bounds.height * scale) / 2 - bounds.y * scale,
      scale
    });
  }, []);

  const fitCanvas = useCallback(() => {
    fitBounds({ x: 40, y: 70, width: 2180, height: 1360 });
  }, [fitBounds]);

  const frameOpening = useCallback(() => {
    setTransform({ x: 60, y: 20, scale: 0.85 });
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setViewportSize({ width, height });
      if (!didInitialFrame.current && width > 0 && height > 0) {
        didInitialFrame.current = true;
        requestAnimationFrame(frameOpening);
      }
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [frameOpening]);

  useEffect(() => () => {
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
  }, []);

  const zoomAt = useCallback((nextScale: number, screenPoint?: Point) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setTransform((current) => {
      const scale = clamp(nextScale, MIN_SCALE, MAX_SCALE);
      const point = screenPoint ?? { x: viewport.clientWidth / 2, y: viewport.clientHeight / 2 };
      const worldX = (point.x - current.x) / current.scale;
      const worldY = (point.y - current.y) / current.scale;
      return {
        x: point.x - worldX * scale,
        y: point.y - worldY * scale,
        scale
      };
    });
  }, []);

  const focusCard = useCallback((card: CanvasCard) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const scale = clamp(Math.max(transform.scale, 0.78), MIN_SCALE, 1.15);
    setSelectedId(card.id);
    setHighlightedId(card.id);
    setTransform({
      x: viewport.clientWidth / 2 - (card.x + card.width / 2) * scale,
      y: viewport.clientHeight / 2 - (card.y + card.height / 2) * scale,
      scale
    });
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    highlightTimerRef.current = setTimeout(() => setHighlightedId(null), 900);
  }, [transform.scale]);

  const handleCanvasPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    panRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origin: { x: transform.x, y: transform.y }
    };
    setIsPanning(true);
  }, [transform.x, transform.y]);

  const handleCanvasPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const pan = panRef.current;
    if (!pan || pan.pointerId !== event.pointerId) return;
    setTransform((current) => ({
      ...current,
      x: pan.origin.x + event.clientX - pan.startX,
      y: pan.origin.y + event.clientY - pan.startY
    }));
  }, []);

  const endCanvasPan = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (panRef.current?.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    panRef.current = null;
    setIsPanning(false);
  }, []);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const screenPoint = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    zoomAt(transform.scale * Math.exp(-event.deltaY * 0.0014), screenPoint);
  }, [transform.scale, zoomAt]);

  const startCardDrag = useCallback((event: React.PointerEvent<HTMLElement>, card: CanvasCard) => {
    event.stopPropagation();
    setSelectedId(card.id);
    if ((event.target as HTMLElement).closest("a")) {
      return;
    }
    if (connectionMode) {
      setConnectionAnchor(card.id);
      return;
    }
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      cardId: card.id,
      startX: event.clientX,
      startY: event.clientY,
      origin: { x: card.x, y: card.y }
    };
    setDraggingId(card.id);
  }, [connectionMode]);

  const moveCard = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const card = cardMap.get(drag.cardId);
    if (!card) return;
    const x = clamp(drag.origin.x + (event.clientX - drag.startX) / transform.scale, 0, SPACE_WIDTH - card.width);
    const y = clamp(drag.origin.y + (event.clientY - drag.startY) / transform.scale, 0, SPACE_HEIGHT - card.height);
    setCards((current) => current.map((item) => item.id === drag.cardId ? { ...item, x, y } : item));
  }, [cardMap, transform.scale]);

  const endCardDrag = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    const moved = cards.find((card) => card.id === drag.cardId);
    if (moved && (Math.abs(moved.x - drag.origin.x) > 0.5 || Math.abs(moved.y - drag.origin.y) > 0.5)) {
      setHistory((current) => [...current, { type: "move", cardId: drag.cardId, from: drag.origin }]);
    }
    dragRef.current = null;
    setDraggingId(null);
  }, [cards]);

  const createCard = useCallback((template: TemplateKey) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const width = template === "note" ? 300 : 350;
    const height = template === "note" ? 230 : 270;
    const centerX = (viewport.clientWidth / 2 - transform.x) / transform.scale;
    const centerY = (viewport.clientHeight / 2 - transform.y) / transform.scale;
    const id = `local-${nextCardId.current++}`;
    const index = cards.length + 1;
    const card: CanvasCard = {
      id,
      kickerEn: `LOCAL CARD / ${String(index).padStart(2, "0")}`,
      kickerZh: `本地卡片 / ${String(index).padStart(2, "0")}`,
      titleEn: template === "project" ? "New project" : template === "system" ? "New system node" : "New note",
      titleZh: template === "project" ? "新项目" : template === "system" ? "新系统节点" : "新便签",
      bodyEn: "Local draft created in the current canvas view. Move it to shape the map.",
      bodyZh: "在当前画布视口创建的本地草稿，可直接拖动整理位置。",
      itemsEn: template === "project" ? ["Problem", "System", "Evidence"] : template === "system" ? ["Input", "Action", "Proof"] : ["Draft", "Local only"],
      itemsZh: template === "project" ? ["问题", "系统", "证据"] : template === "system" ? ["输入", "动作", "证明"] : ["草稿", "仅本地"],
      tone: TEMPLATES.find((item) => item.key === template)?.tone ?? "paper",
      x: clamp(centerX - width / 2, 0, SPACE_WIDTH - width),
      y: clamp(centerY - height / 2, 0, SPACE_HEIGHT - height),
      width,
      height
    };
    setCards((current) => [...current, card]);
    setHistory((current) => [...current, { type: "create", cardId: id }]);
    setSelectedId(id);
    setHighlightedId(id);
    setTemplateOpen(false);
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    highlightTimerRef.current = setTimeout(() => setHighlightedId(null), 900);
  }, [cards.length, transform]);

  const undo = useCallback(() => {
    const action = history.at(-1);
    if (!action) return;
    if (action.type === "create") {
      setCards((current) => current.filter((card) => card.id !== action.cardId));
      if (selectedId === action.cardId) setSelectedId("profile");
    } else {
      setCards((current) => current.map((card) => card.id === action.cardId ? { ...card, ...action.from } : card));
      setSelectedId(action.cardId);
    }
    setHistory((current) => current.slice(0, -1));
  }, [history, selectedId]);

  const handleMinimapClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const worldX = clamp((event.clientX - rect.left) / rect.width, 0, 1) * SPACE_WIDTH;
    const worldY = clamp((event.clientY - rect.top) / rect.height, 0, 1) * SPACE_HEIGHT;
    setTransform((current) => ({
      ...current,
      x: viewport.clientWidth / 2 - worldX * current.scale,
      y: viewport.clientHeight / 2 - worldY * current.scale
    }));
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
      event.preventDefault();
      undo();
      return;
    }
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoomAt(transform.scale + 0.1);
    } else if (event.key === "-") {
      event.preventDefault();
      zoomAt(transform.scale - 0.1);
    } else if (event.key === "0") {
      event.preventDefault();
      fitCanvas();
    }
  }, [fitCanvas, transform.scale, undo, zoomAt]);

  const viewportRect = useMemo(() => {
    const x = -transform.x / transform.scale;
    const y = -transform.y / transform.scale;
    const width = viewportSize.width / transform.scale;
    const height = viewportSize.height / transform.scale;
    const left = clamp(x / SPACE_WIDTH * 100, 0, 100);
    const top = clamp(y / SPACE_HEIGHT * 100, 0, 100);
    return {
      left,
      top,
      width: Math.min(width / SPACE_WIDTH * 100, 100 - left),
      height: Math.min(height / SPACE_HEIGHT * 100, 100 - top)
    };
  }, [transform, viewportSize]);

  return (
    <section className={styles.shell} aria-label={isZh ? "Wenjun 无限系统画布" : "Wenjun infinite system canvas"} tabIndex={0} onKeyDown={handleKeyDown}>
      <header className={styles.toolbar}>
        <div className={styles.brand}><i aria-hidden="true" /><strong>{copy.canvas}</strong></div>
        <p>{copy.hint}</p>
        <div className={styles.toolbarActions}>
          <button type="button" aria-label={copy.newCard} aria-expanded={templateOpen} onClick={() => setTemplateOpen((open) => !open)}><span aria-hidden="true">＋</span>{copy.newCard}</button>
          <button type="button" aria-label={copy.connect} aria-pressed={connectionMode} onClick={() => { setConnectionMode((active) => !active); setConnectionAnchor(null); }}><span aria-hidden="true">⌁</span>{copy.connect}</button>
          <button type="button" aria-label={copy.undo} aria-keyshortcuts="Control+Z Meta+Z" disabled={history.length === 0} onClick={undo}><span aria-hidden="true">↶</span>{copy.undo}</button>
        </div>
      </header>

      <aside className={styles.sidebar} aria-label={copy.layers}>
        <div className={styles.layersHeading}><div><strong>{copy.layers}</strong><span>{copy.cards}</span></div><button type="button" aria-label={copy.newCard} aria-expanded={templateOpen} onClick={() => setTemplateOpen((open) => !open)}>＋</button></div>
        <div className={styles.layerList}>
          {cards.map((card, index) => (
            <button key={card.id} type="button" aria-pressed={selectedId === card.id} onClick={() => focusCard(card)}>
              <i className={styles[`tone_${card.tone}`]} aria-hidden="true" />
              <span><small>{String(index + 1).padStart(2, "0")}</small>{isZh ? card.titleZh : card.titleEn}</span>
            </button>
          ))}
        </div>
        <button type="button" className={styles.sidebarNew} aria-label={copy.newCard} aria-expanded={templateOpen} onClick={() => setTemplateOpen((open) => !open)}>＋ {copy.newCard}</button>
        <div className={styles.minimapBlock}>
          <strong>{copy.minimap}</strong>
          <button type="button" className={styles.minimap} aria-label={copy.minimapNav} onClick={handleMinimapClick}>
            {cards.map((card) => (
              <span key={card.id} className={`${styles.minimapCard} ${styles[`tone_${card.tone}`]}`} style={{ left: `${card.x / SPACE_WIDTH * 100}%`, top: `${card.y / SPACE_HEIGHT * 100}%`, width: `${card.width / SPACE_WIDTH * 100}%`, height: `${card.height / SPACE_HEIGHT * 100}%` }} />
            ))}
            <span className={styles.minimapViewport} style={{ left: `${viewportRect.left}%`, top: `${viewportRect.top}%`, width: `${viewportRect.width}%`, height: `${viewportRect.height}%` }} />
          </button>
        </div>
      </aside>

      <div className={`${styles.canvasStage} ${connectionMode ? styles.connectionMode : ""}`}>
        <div
          ref={viewportRef}
          className={`${styles.viewport} ${isPanning ? styles.isPanning : ""}`}
          aria-label={isZh ? "可拖拽与缩放的卡片画布" : "Pannable and zoomable card canvas"}
          onPointerDown={handleCanvasPointerDown}
          onPointerMove={handleCanvasPointerMove}
          onPointerUp={endCanvasPan}
          onPointerCancel={endCanvasPan}
          onWheel={handleWheel}
        >
          <div className={styles.world} style={{ transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})` }}>
            <svg className={styles.connections} viewBox={`0 0 ${SPACE_WIDTH} ${SPACE_HEIGHT}`} aria-hidden="true">
              <defs><marker id="wenjun-canvas-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" /></marker></defs>
              {CONNECTIONS.map(([fromId, toId]) => {
                const from = cardMap.get(fromId);
                const to = cardMap.get(toId);
                if (!from || !to) return null;
                const start = { x: from.x + from.width / 2, y: from.y + from.height / 2 };
                const end = { x: to.x + to.width / 2, y: to.y + to.height / 2 };
                const bend = (start.x + end.x) / 2;
                return <path key={`${fromId}-${toId}`} d={`M${start.x} ${start.y} C${bend} ${start.y},${bend} ${end.y},${end.x} ${end.y}`} />;
              })}
            </svg>

            {cards.map((card) => (
              <article
                key={card.id}
                className={`${styles.card} ${styles[`tone_${card.tone}`]} ${card.content === "timeline" ? styles.cardTimeline : ""} ${card.content === "github" ? styles.cardGithub : ""} ${selectedId === card.id ? styles.isSelected : ""} ${highlightedId === card.id ? styles.isHighlighted : ""} ${draggingId === card.id ? styles.isDragging : ""} ${connectionAnchor === card.id ? styles.isAnchor : ""}`}
                style={{ width: card.width, height: card.height, transform: `translate3d(${card.x}px, ${card.y}px, 0)` }}
                aria-label={`${isZh ? card.titleZh : card.titleEn}，${isZh ? "可拖动卡片" : "draggable card"}`}
                onPointerDown={(event) => startCardDrag(event, card)}
                onPointerMove={moveCard}
                onPointerUp={endCardDrag}
                onPointerCancel={endCardDrag}
              >
                <div className={styles.cardSurface}>
                  <header><span>{isZh ? card.kickerZh : card.kickerEn}</span><i aria-hidden="true" /></header>
                  <h2>{isZh ? card.titleZh : card.titleEn}</h2>
                  <CanvasCardContent card={card} isZh={isZh} />
                </div>
              </article>
            ))}
          </div>
        </div>

        {templateOpen && (
          <section className={styles.templatePanel} aria-labelledby="canvas-template-title">
            <header><div><strong id="canvas-template-title">{copy.templateTitle}</strong><p>{copy.templateHelp}</p></div><button type="button" aria-label={copy.closeTemplates} onClick={() => setTemplateOpen(false)}>×</button></header>
            <div>{TEMPLATES.map((template) => <button key={template.key} type="button" onClick={() => createCard(template.key)}><i className={styles[`tone_${template.tone}`]} aria-hidden="true" /><span>{copy.templateNames[template.key]}</span></button>)}</div>
          </section>
        )}

        {connectionMode && <div className={styles.connectionNotice} role="status"><i aria-hidden="true" />{copy.connectionHelp}</div>}
        <p className={styles.helpHint}>{copy.help}</p>
        <div className={styles.zoomControls} aria-label={isZh ? "画布缩放工具" : "Canvas zoom tools"}>
          <button type="button" aria-label={copy.zoomOut} aria-keyshortcuts="-" onClick={() => zoomAt(transform.scale - 0.1)}>−</button>
          <output aria-label={isZh ? "当前缩放比例" : "Current zoom level"} aria-live="polite">{Math.round(transform.scale * 100)}%</output>
          <button type="button" aria-label={copy.zoomIn} aria-keyshortcuts="+" onClick={() => zoomAt(transform.scale + 0.1)}>+</button>
          <button type="button" aria-label={copy.fit} aria-keyshortcuts="0" onClick={fitCanvas}>Fit</button>
        </div>
      </div>
    </section>
  );
}
