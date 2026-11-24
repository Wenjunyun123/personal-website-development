"use client";

import Image from "next/image";
import Link from "next/link";
import type { RecordCopy } from "../../content/record";
import { SignalField } from "./signal-field";
import styles from "./record.module.css";

export function Hero({ copy, isZh }: { copy: RecordCopy; isZh: boolean }) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <SignalField />
      <span className={styles.heroGhost} aria-hidden="true">
        RECORD
      </span>

      <div className={`${styles.container} ${styles.heroInner}`}>
        <div className={styles.heroMeta}>
          <div className={styles.heroMetaGroup}>
            <span>{copy.hero.kicker}</span>
            <span>{copy.meta.role}</span>
          </div>
          <div className={`${styles.heroMetaGroup} ${styles.heroMetaRight}`}>
            <span>{copy.meta.location}</span>
            <span>{copy.meta.issue}</span>
          </div>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <h1
              className={styles.heroTitle}
              id="hero-title"
              aria-label={copy.hero.titleLines.join(isZh ? "" : " ")}
            >
              {copy.hero.titleLines.map((line) => (
                <span className={styles.heroTitleLine} key={line}>
                  <span>{line}</span>
                </span>
              ))}
            </h1>

            <div className={styles.heroRule} aria-hidden="true" />

            <div className={styles.heroLower}>
              <p className={styles.heroLede}>{copy.hero.lede}</p>
              <div className={styles.heroActions}>
                <Link prefetch={false}
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  href="/#work"
                >
                  {copy.hero.primary}
                  <span aria-hidden="true">↓</span>
                </Link>
                <Link prefetch={false} className={`${styles.button} ${styles.buttonGhost}`} href="/resume/">
                  {copy.hero.secondary}
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.heroSide}>
            <figure className={styles.portraitFrame}>
              <span className={styles.heroChipTop} aria-hidden="true">
                FDE / SHANGHAI
              </span>
              <span className={styles.heroChipMetric} aria-hidden="true">
                70+ → 9.96s
              </span>
              <Image
                className={styles.portraitImage}
                src="/profile/wenjun.png"
                alt={copy.hero.portraitAlt}
                width={420}
                height={560}
                priority
              />
              <span className={styles.portraitCornerA} aria-hidden="true" />
              <span className={styles.portraitCornerB} aria-hidden="true" />
              <figcaption className={styles.portraitMeta}>
                <span>{copy.hero.portraitCaption}</span>
                <span>{copy.hero.portraitNote}</span>
              </figcaption>
            </figure>

            <span className={styles.heroScroll} aria-hidden="true">
              {copy.hero.scroll}
            </span>
          </div>
        </div>

        <div className={styles.heroFoot}>
          <span>{copy.hero.intro}</span>
          <span className={styles.heroFootLine} aria-hidden="true" />
          <span>{isZh ? "企业 AI / 驻场交付" : "ENTERPRISE AI / ONSITE"}</span>
        </div>
      </div>
    </section>
  );
}
