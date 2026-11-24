"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { RecordCopy } from "../../content/record";
import type { RecordStory } from "../../content/records";
import styles from "./record.module.css";

export function WorkGallery({
  copy,
  isZh,
  records
}: {
  copy: RecordCopy;
  isZh: boolean;
  records: readonly RecordStory[];
}) {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const pin = pinRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!pin || !stage || !track) return;

    const canPin = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let maxX = 0;
    let stageHeight = 0;

    const setProgress = (value: number) => {
      pin.style.setProperty("--p", Math.max(0, Math.min(value, 1)).toFixed(4));
    };

    const headerHeight = () => {
      const value = getComputedStyle(pin).getPropertyValue("--r-header-h");
      return Number.parseFloat(value) || 64;
    };

    const update = () => {
      frame = 0;
      if (pin.dataset.pinned !== "true" || !stageHeight) return;
      const stickTop = pin.offsetTop - headerHeight();
      const travel = Math.max(pin.offsetHeight - stageHeight, 1);
      setProgress((window.scrollY - stickTop) / travel);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    const updateNativeProgress = () => {
      if (pin.dataset.pinned === "true") return;
      const scrollable = Math.max(track.scrollWidth - track.clientWidth, 1);
      setProgress(track.scrollLeft / scrollable);
    };

    const measure = () => {
      const shouldPin = canPin.matches && !reduced.matches;
      pin.dataset.pinned = shouldPin ? "true" : "false";
      setPinned(shouldPin);

      if (!shouldPin) {
        pin.style.removeProperty("height");
        pin.style.removeProperty("--stage-w");
        stageHeight = 0;
        maxX = 0;
        updateNativeProgress();
        return;
      }

      stageHeight = stage.clientHeight;
      const stageWidth = stage.clientWidth;
      pin.style.setProperty("--stage-w", `${stageWidth}px`);
      maxX = Math.max(track.scrollWidth - stageWidth, 0);
      const dwell = Math.round(window.innerHeight * 0.35);
      pin.style.height = `${stageHeight + maxX + dwell}px`;
      update();
    };

    const onFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>("[data-gallery-card]");
      if (!card) return;
      const behavior = reduced.matches ? "auto" : "smooth";

      if (pin.dataset.pinned === "true" && stageHeight) {
        const position = card.offsetLeft - track.offsetLeft;
        const ratio = maxX > 0 ? Math.min(position / maxX, 1) : 0;
        const stickTop = pin.offsetTop - headerHeight();
        const travel = Math.max(pin.offsetHeight - stageHeight, 1);
        window.scrollTo({ top: stickTop + ratio * travel, behavior });
        return;
      }

      card.scrollIntoView({ block: "nearest", inline: "start", behavior });
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    track.addEventListener("scroll", updateNativeProgress, { passive: true });
    track.addEventListener("focusin", onFocusIn);
    canPin.addEventListener("change", measure);
    reduced.addEventListener("change", measure);

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(measure);
      resizeObserver.observe(stage);
      resizeObserver.observe(track);
    }

    document.fonts?.ready.then(measure).catch(() => undefined);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      track.removeEventListener("scroll", updateNativeProgress);
      track.removeEventListener("focusin", onFocusIn);
      canPin.removeEventListener("change", measure);
      reduced.removeEventListener("change", measure);
      resizeObserver?.disconnect();
      pin.style.removeProperty("height");
      pin.style.removeProperty("--stage-w");
      delete pin.dataset.pinned;
    };
  }, []);

  return (
    <section className={styles.gallery} id="work" aria-labelledby="gallery-title">
      <div className={`${styles.container} ${styles.galleryHead}`}>
        <div className={styles.sectionHeadCopy}>
          <span className={styles.kicker}>{copy.gallery.kicker}</span>
          <h2 className={styles.sectionTitle} id="gallery-title">
            {copy.gallery.title}
          </h2>
        </div>
        <div className={styles.sectionHeadCopy}>
          <p className={styles.sectionIntro}>{copy.gallery.intro}</p>
          <Link prefetch={false} className={styles.textLink} href="/selected/">
            {copy.gallery.cta}
          </Link>
        </div>
      </div>

      <div className={styles.galleryPin} ref={pinRef}>
        <div className={styles.galleryStage} ref={stageRef}>
          <div className={styles.galleryTrack} ref={trackRef}>
            {records.map((record, index) => (
              <Link prefetch={false}
                className={styles.galleryCard}
                href={record.href}
                data-gallery-card
                data-cursor="view"
                key={record.href}
              >
                <div className={styles.cardImage}>
                  {record.image ? (
                    <Image
                      src={record.image}
                      alt={isZh ? record.titleZh : record.title}
                      width={1200}
                      height={900}
                      sizes="(min-width: 1024px) 48vw, 84vw"
                    />
                  ) : null}
                  <span className={styles.cardOpen} aria-hidden="true">
                    {copy.gallery.cardCta}
                    <span>↗</span>
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <span className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</span>
                    <span>{isZh ? record.categoryZh : record.category}</span>
                    <span>{record.period}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{isZh ? record.titleZh : record.title}</h3>
                  {record.metrics ? (
                    <div className={styles.cardMetrics}>
                      {record.metrics.slice(0, 2).map(([value, label]) => (
                        <div className={styles.cardMetric} key={`${value}-${label}`}>
                          <strong>{value}</strong>
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>

          <div className={styles.galleryFoot}>
            <span className={styles.galleryHint}>
              {copy.gallery.hint} · {String(records.length).padStart(2, "0")}
            </span>
            <div className={styles.galleryProgress} aria-hidden="true">
              <span className={styles.progressTrack}>
                <span className={styles.progressFill} />
              </span>
            </div>
            <span className={styles.galleryHint}>{pinned ? "PINNED / SCROLL" : "SWIPE / DRAG"}</span>
            <span className={styles.galleryVerticalHint}>
              {String(records.length).padStart(2, "0")} / {isZh ? "向下查看" : "SCROLL"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
