"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type MouseEvent } from "react";
import { useLanguage } from "../language-toggle";
import { recordCopy, type RecordCopy } from "../../content/record";
import { indexRecords, type RecordStory } from "../../content/records";
import { githubSnapshot } from "../../content/profile";
import { otherDeliveries, publicContributions } from "../../content/portfolio";
import styles from "./record.module.css";

type IndexVariant = "selected" | "explorations";
type Filter = "all" | "client" | "practice";

export function RecordIndex({ variant }: { variant: IndexVariant }) {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const copy = recordCopy[language];

  return (
    <article className={styles.page}>
      <style>{`
        .record-root a:focus-visible,
        .record-root button:focus-visible,
        .record-root [tabindex]:focus-visible {
          outline: 3px solid #1f4bff;
          outline-offset: 4px;
        }
      `}</style>
      <div className={styles.container}>
        <header className={styles.pageHead}>
          <span className={styles.kicker}>
            {variant === "selected" ? "INDEX / 01" : "INDEX / 02"}
          </span>
          <h1 className={styles.pageTitle}>
            {variant === "selected" ? copy.index.selectedTitle : copy.index.explorationsTitle}
          </h1>
          <p className={styles.pageIntro}>
            {variant === "selected" ? copy.index.selectedIntro : copy.index.explorationsIntro}
          </p>
        </header>

        {variant === "selected" ? (
          <SelectedWork copy={copy} isZh={isZh} />
        ) : (
          <Explorations copy={copy} isZh={isZh} />
        )}
      </div>
    </article>
  );
}

function SelectedWork({ copy, isZh }: { copy: RecordCopy; isZh: boolean }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: copy.index.filterAll },
    { key: "client", label: copy.index.filterClient },
    { key: "practice", label: copy.index.filterPractice }
  ];

  const records = indexRecords.filter((record) => {
    if (filter === "all") return true;
    if (filter === "client") return record.kind === "work";
    return record.kind === "note";
  });

  const showPreview = (record: RecordStory) => {
    if (!record.image) return;
    setPreview({ src: record.image, alt: isZh ? record.titleZh : record.title });
  };

  const movePreview = (event: MouseEvent<HTMLAnchorElement>) => {
    previewRef.current?.style.setProperty("--mx", `${event.clientX}px`);
    previewRef.current?.style.setProperty("--my", `${event.clientY}px`);
  };

  return (
    <>
      <div className={styles.pageRule} />
      <div className={styles.filterBar} role="group" aria-label={isZh ? "项目筛选" : "Work filter"}>
        {filters.map((item) => (
          <button
            className={`${styles.filterButton} ${
              filter === item.key ? styles.filterButtonActive : ""
            }`}
            type="button"
            aria-pressed={filter === item.key}
            onClick={() => setFilter(item.key)}
            key={item.key}
          >
            {item.label}
          </button>
        ))}
        <span className={`${styles.mono} ${styles.muted}`}>{copy.index.previewHint}</span>
      </div>

      <div className={styles.indexSection}>
        {records.length ? (
          <div className={styles.indexList}>
            {records.map((record, index) => (
              <div
                className={styles.indexRow}
                key={record.href}
                onMouseEnter={() => showPreview(record)}
                onMouseLeave={() => setPreview(null)}
              >
                <Link prefetch={false}
                  className={styles.indexRowLink}
                  href={record.href}
                  onMouseMove={movePreview}
                >
                  <span className={styles.indexIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.indexMain}>
                    <span className={styles.indexTitle}>
                      {isZh ? record.titleZh : record.title}
                    </span>
                    <span className={styles.indexMeta}>
                      <span>{isZh ? record.categoryZh : record.category}</span>
                      <span>{record.period}</span>
                    </span>
                    <span className={styles.indexTags}>
                      {record.tags.slice(0, 3).map((tag) => (
                        <span className={styles.indexTag} key={tag}>
                          {tag}
                        </span>
                      ))}
                    </span>
                    {record.image ? (
                      <span className={styles.indexThumb}>
                        <Image
                          src={record.image}
                          alt={isZh ? record.titleZh : record.title}
                          width={640}
                          height={360}
                        />
                      </span>
                    ) : null}
                  </span>
                  <span className={styles.indexSummary}>
                    {isZh ? record.summaryZh : record.summary}
                  </span>
                  <span className={styles.indexCta}>{copy.gallery.cardCta}</span>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.sectionIntro}>{copy.index.empty}</p>
        )}
      </div>

      <div
        className={styles.indexPreview}
        ref={previewRef}
        data-visible={preview ? "true" : "false"}
        aria-hidden="true"
      >
        {preview ? (
          <Image src={preview.src} alt="" width={640} height={480} />
        ) : null}
      </div>
    </>
  );
}

function Explorations({ copy, isZh }: { copy: RecordCopy; isZh: boolean }) {
  const notes = indexRecords.filter((record) => record.kind === "note");

  return (
    <>
      <div className={styles.pageRule} />

      <section className={styles.contentSection} aria-labelledby="explorations-notes">
        <div className={styles.contentSectionHead}>
          <h2 className={styles.contentTitle} id="explorations-notes">
            {copy.index.notesTitle}
          </h2>
          <span className={`${styles.mono} ${styles.muted}`}>
            {String(notes.length).padStart(2, "0")}
          </span>
        </div>
        <div className={styles.contentList}>
          {notes.map((record) => (
            <div className={styles.contentRow} key={record.href}>
              <Link prefetch={false} className={styles.contentRowLink} href={record.href}>
                <span className={styles.contentRowTitle}>
                  {isZh ? record.titleZh : record.title}
                </span>
                <span className={styles.contentRowMeta}>
                  {isZh ? record.categoryZh : record.category} · {record.period}
                </span>
              </Link>
              <p className={styles.contentRowSummary}>
                {isZh ? record.summaryZh : record.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.contentSection} aria-labelledby="explorations-other">
        <div className={styles.contentSectionHead}>
          <h2 className={styles.contentTitle} id="explorations-other">
            {copy.index.otherTitle}
          </h2>
          <span className={`${styles.mono} ${styles.muted}`}>
            {String(otherDeliveries.length).padStart(2, "0")}
          </span>
        </div>
        <div className={styles.contentList}>
          {otherDeliveries.map((item) => (
            <div className={styles.contentRow} key={item.title}>
              <div className={styles.contentRowMain}>
                <span className={styles.contentRowTitle}>
                  {isZh ? item.titleZh : item.title}
                </span>
                <span className={styles.contentRowMeta}>DELIVERY TRACK</span>
              </div>
              <p className={styles.contentRowSummary}>
                {isZh ? item.summaryZh : item.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.contentSection} aria-labelledby="explorations-contributions">
        <div className={styles.contentSectionHead}>
          <h2 className={styles.contentTitle} id="explorations-contributions">
            {copy.index.contributionsTitle}
          </h2>
          <a
            className={styles.textLink}
            href={githubSnapshot.profileUrl}
            target="_blank"
            rel="noreferrer"
          >
            {copy.index.githubCta}
          </a>
        </div>
        <div className={styles.contributionsList}>
          {publicContributions.map((item) => (
            <div className={styles.contributionRow} key={item.url}>
              <a
                className={styles.contributionLink}
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.contributionTitle}>
                  {isZh ? item.titleZh : item.title}
                </span>
                <span className={styles.contributionMeta}>
                  {item.project} · {item.date}
                </span>
                <span className={styles.contributionSummary}>
                  {isZh ? item.summaryZh : item.summary}
                </span>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.contentSection} aria-labelledby="explorations-resume">
        <div className={styles.contentSectionHead}>
          <h2 className={styles.contentTitle} id="explorations-resume">
            {copy.index.resumeTitle}
          </h2>
          <Link prefetch={false} className={styles.textLink} href="/resume/">
            {copy.index.resumeCta}
          </Link>
        </div>
        <Link prefetch={false} className={styles.resumeBanner} href="/resume/">
          <span className={styles.resumeBannerCopy}>
            <span className={styles.resumeBannerKicker}>PDF / PRINT READY</span>
            <span className={styles.resumeBannerTitle}>
              {isZh ? "游文君 · AI 应用交付工程师" : "Wenjun You · AI Delivery Engineer"}
            </span>
            <span className={styles.resumeBannerBody}>{copy.index.resumeBody}</span>
          </span>
          <span className={styles.resumeBannerArrow} aria-hidden="true">
            ↗
          </span>
        </Link>
      </section>

      <div className={styles.ledgerFoot}>
        <span>
          GitHub / {githubSnapshot.publicRepositories} public repos /{" "}
          {githubSnapshot.contributionsLastYear} contributions
        </span>
        <Link prefetch={false} className={styles.textLink} href="/#contact">
          {copy.index.contactCta}
        </Link>
      </div>
    </>
  );
}
