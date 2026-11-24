"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { useLanguage } from "../language-toggle";
import { recordCopy } from "../../content/record";
import styles from "./record.module.css";

const navHash = ["work", "method", "evidence", "about"] as const;

function CursorRing() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    if (!node) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let frame = 0;

    const tick = () => {
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      node.dataset.visible = "true";
      const target = event.target as Element | null;
      node.dataset.active = target?.closest("a, button, [data-cursor]")
        ? "true"
        : "false";
    };

    const onPointerLeave = () => {
      node.dataset.visible = "false";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={styles.cursorRing}
      aria-hidden="true"
      data-visible="false"
      data-active="false"
    />
  );
}

export function RecordShell({ children }: { children: ReactNode }) {
  const { language, setLanguage } = useLanguage();
  const isZh = language === "zh";
  const copy = recordCopy[language];
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtml = html.style.backgroundColor;
    const previousBody = body.style.backgroundColor;
    html.style.backgroundColor = "#f7f6f2";
    body.style.backgroundColor = "#f7f6f2";

    return () => {
      html.style.backgroundColor = previousHtml;
      body.style.backgroundColor = previousBody;
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      progressRef.current?.style.setProperty("--scroll-progress", progress.toFixed(4));
      setScrolled(window.scrollY > 8);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const navLabels: Record<(typeof navHash)[number], string> = {
    work: copy.nav.work,
    method: copy.nav.method,
    evidence: copy.nav.evidence,
    about: copy.nav.about
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={`${styles.record} record-root`} id="top">
        <CursorRing />
        <a className={styles.skipLink} href="#main">
          {isZh ? "跳到正文" : "Skip to content"}
        </a>
        <div className={styles.progress} ref={progressRef} aria-hidden="true" />

        <header className={styles.header} data-scrolled={scrolled ? "true" : "false"}>
          <div className={`${styles.container} ${styles.headerInner}`}>
            <Link prefetch={false} className={styles.wordmark} href="/" aria-label="游文君 Wenjun You · 交付记录">
              <span className={styles.wordmarkZh}>游文君</span>
              <span className={styles.wordmarkEn}>Wenjun You</span>
            </Link>

            <nav className={styles.nav} aria-label={isZh ? "主导航" : "Main navigation"}>
              {navHash.map((key) => (
                <Link prefetch={false} className={styles.navLink} href={`/#${key}`} key={key}>
                  {navLabels[key]}
                </Link>
              ))}
              <Link prefetch={false} className={styles.navLink} href="/resume/">
                {copy.nav.resume}
              </Link>
            </nav>

            <div className={styles.headerActions}>
              <button
                className={styles.langButton}
                type="button"
                aria-label={isZh ? "Switch to English" : "切换到中文"}
                onClick={() => setLanguage(isZh ? "en" : "zh")}
              >
                {isZh ? "EN" : "中文"}
              </button>
              <button
                className={styles.menuButton}
                type="button"
                aria-expanded={menuOpen}
                aria-controls="record-mobile-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? copy.nav.close : copy.nav.menu}
              </button>
            </div>
          </div>
        </header>

        {menuOpen ? (
          <div className={styles.mobileMenu} id="record-mobile-menu">
            <nav className={styles.mobileMenuLinks} aria-label={isZh ? "移动端目录" : "Mobile menu"}>
              {navHash.map((key) => (
                <Link prefetch={false}
                  className={styles.mobileMenuLink}
                  href={`/#${key}`}
                  key={key}
                  onClick={() => setMenuOpen(false)}
                >
                  {navLabels[key]}
                </Link>
              ))}
              <Link prefetch={false} className={styles.mobileMenuLink} href="/selected/" onClick={() => setMenuOpen(false)}>
                {isZh ? "全部项目" : "All work"}
              </Link>
              <Link prefetch={false} className={styles.mobileMenuLink} href="/resume/" onClick={() => setMenuOpen(false)}>
                {copy.nav.resume}
              </Link>
            </nav>
            <div className={styles.mobileMenuMeta}>
              <span>{copy.meta.role}</span>
              <span>{copy.meta.location}</span>
              <span>{copy.meta.availability}</span>
            </div>
          </div>
        ) : null}

        <main className={styles.main} id="main">
          {children}
        </main>

        <footer className={styles.footer}>
          <div className={`${styles.container} ${styles.footerInner}`}>
            <div className={styles.footerBrand}>
              <span className={styles.footerName}>游文君 / Wenjun You</span>
              <span className={styles.footerNote}>{copy.footer.note}</span>
            </div>
            <nav className={styles.footerNav} aria-label={isZh ? "页脚导航" : "Footer navigation"}>
              <Link prefetch={false} className={styles.footerLink} href="/selected/">
                {isZh ? "项目" : "Work"}
              </Link>
              <Link prefetch={false} className={styles.footerLink} href="/explorations/">
                {isZh ? "探索" : "Explorations"}
              </Link>
              <Link prefetch={false} className={styles.footerLink} href="/resume/">
                {copy.nav.resume}
              </Link>
              <Link prefetch={false} className={styles.footerLink} href="/os/">
                Wenjun OS
              </Link>
              <a
                className={styles.footerLink}
                href="https://github.com/Wenjunyun123"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </nav>
            <span className={styles.footerRights}>{copy.footer.rights}</span>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}
