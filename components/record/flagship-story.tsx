"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { RecordCopy } from "../../content/record";
import styles from "./record.module.css";

export function FlagshipStory({ copy }: { copy: RecordCopy }) {
  const story = copy.flagship;
  const pinRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const stage = stageRef.current;
    const value = valueRef.current;
    if (!pin || !stage || !value) return;

    const canPin = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let current = -1;

    const showStage = (index: number, animate: boolean) => {
      const step = story.ladder[index];
      if (!step || index === current) return;
      current = index;
      pin.dataset.stage = String(index + 1);
      value.textContent = step.display;

      if (animate && !reduced.matches && typeof value.animate === "function") {
        value.animate(
          [
            { opacity: 0, transform: "translateY(14px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 380, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
        );
      }
    };

    const headerHeight = () => {
      const raw = getComputedStyle(pin).getPropertyValue("--r-header-h");
      return Number.parseFloat(raw) || 64;
    };

    const update = () => {
      frame = 0;
      const shouldPin = canPin.matches && !reduced.matches;
      pin.dataset.pinned = shouldPin ? "true" : "false";

      if (!shouldPin) {
        pin.style.setProperty("--p", "1");
        pin.style.setProperty("--scan", "92%");
        showStage(story.ladder.length - 1, false);
        return;
      }

      const stickTop = pin.offsetTop - headerHeight();
      const travel = Math.max(pin.offsetHeight - stage.offsetHeight, 1);
      const progress = Math.max(
        0,
        Math.min((window.scrollY - stickTop) / travel, 1)
      );
      pin.style.setProperty("--p", progress.toFixed(4));
      pin.style.setProperty("--scan", `${(8 + progress * 84).toFixed(2)}%`);

      const index =
        progress < 0.24 ? 0 : progress < 0.5 ? 1 : progress < 0.78 ? 2 : 3;
      showStage(index, true);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      pin.style.removeProperty("--p");
      pin.style.removeProperty("--scan");
      current = -1;
      update();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    canPin.addEventListener("change", onResize);
    reduced.addEventListener("change", onResize);

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(onResize);
      observer.observe(stage);
    }
    document.fonts?.ready.then(onResize).catch(() => undefined);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      canPin.removeEventListener("change", onResize);
      reduced.removeEventListener("change", onResize);
      observer?.disconnect();
      delete pin.dataset.pinned;
    };
  }, [story.ladder]);

  return (
    <section
      className={`${styles.flagship} ${styles.dark} ${styles.scene}`}
      id="flagship"
      aria-labelledby="flagship-title"
    >
      <div className={styles.scenePin} ref={pinRef} data-stage="4">
        <div className={styles.sceneStage} ref={stageRef}>
          <div className={`${styles.container} ${styles.sceneInner}`}>
            <div className={styles.sceneHead}>
              <div>
                <span className={`${styles.kicker} ${styles.flagshipKicker}`}>
                  {story.kicker}
                </span>
                <h2 className={styles.sceneTitle} id="flagship-title">
                  {story.title}
                </h2>
              </div>
              <div className={styles.sceneHeadMeta}>
                <p className={styles.sceneLede}>{story.lede}</p>
                <span className={styles.sceneHint}>{story.ladderLabel}</span>
              </div>
            </div>

            <div className={styles.sceneBody}>
              <div className={styles.sceneMetric}>
                <span className={styles.sceneMetricLabel}>{story.resultLabel}</span>
                <span className={styles.sceneNumberWrap} aria-hidden="true">
                  <span className={styles.sceneNumber} ref={valueRef}>
                    {story.ladder[story.ladder.length - 1].display}
                  </span>
                  <span className={styles.sceneUnit}>s</span>
                </span>
                <span className={styles.sceneMetricNote}>
                  {story.ladder[0].note} → {story.ladder[story.ladder.length - 1].note}
                </span>
                <span className={styles.srOnly}>
                  {story.bigTop} → {story.bigBottom}
                </span>
              </div>

              <div className={styles.sceneChart}>
                <svg
                  className={styles.sceneChartSvg}
                  viewBox="0 0 720 300"
                  aria-hidden="true"
                >
                  <g className={styles.sceneGrid}>
                    {[40, 110, 180, 250].map((y) => (
                      <line x1="40" x2="690" y1={y} y2={y} key={`h-${y}`} />
                    ))}
                    {[60, 270, 470, 660].map((x) => (
                      <line x1={x} x2={x} y1="28" y2="268" key={`v-${x}`} />
                    ))}
                  </g>
                  <path
                    className={styles.scenePathGhost}
                    d="M60 40 L270 112 L470 176 L660 250"
                  />
                  <path
                    className={styles.scenePath}
                    d="M60 40 L270 112 L470 176 L660 250"
                    pathLength={1}
                  />
                  {[
                    [60, 40],
                    [270, 112],
                    [470, 176],
                    [660, 250]
                  ].map(([cx, cy], index) => (
                    <circle
                      className={styles.scenePoint}
                      cx={cx}
                      cy={cy}
                      r="5"
                      key={`point-${cx}`}
                      data-index={index + 1}
                    />
                  ))}
                </svg>
                <span className={styles.sceneScan} aria-hidden="true" />

                <div className={styles.sceneStages}>
                  {story.ladder.map((step) => (
                    <div className={styles.sceneStageItem} key={step.label}>
                      <span className={styles.sceneStageRange}>{step.range}</span>
                      <span className={styles.sceneStageLabel}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.sceneFoot}>
              <div className={styles.sceneTraces}>
                <span className={styles.sceneTraceTitle}>{story.traceTitle}</span>
                <div className={styles.sceneTraceItems}>
                  {story.traces.map((trace) => (
                    <span className={styles.sceneTrace} key={trace.label}>
                      <strong>{trace.value}</strong>
                      <span>{trace.label}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.sceneResult}>
                <span className={styles.sceneResultValue}>{story.resultValue}</span>
                <Link prefetch={false}
                  className={styles.sceneLink}
                  href="/work/feishu-customer-service-gateway/"
                >
                  {copy.gallery.cardCta}
                  <span aria-hidden="true"> ↗</span>
                </Link>
              </div>

              <p className={styles.sceneScope}>{story.scope}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
