"use client";

import Link from "next/link";
import { useLanguage } from "../language-toggle";
import { recordCopy } from "../../content/record";
import {
  caseRecords,
  getNextIndexRecord,
  indexRecords,
  type RecordStory
} from "../../content/records";
import {
  ArchitecturePreview,
  DataMigrationPreview,
  EvaluationPreview,
  GatewayPreview,
  ReleasePreview,
  ServiceDemo
} from "../portfolio/service-demo";
import styles from "./record.module.css";

const kindLabel = {
  zh: { work: "项目记录", note: "实践笔记", case: "案例档案" },
  en: { work: "Work record", note: "Practice note", case: "Case file" }
} as const;

export function RecordCase({ record }: { record: RecordStory }) {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const copy = recordCopy[language];
  const title = isZh ? record.titleZh : record.title;
  const next =
    record.kind === "case"
      ? nextIn(caseRecords, record.slug)
      : getNextIndexRecord(record.slug);

  return (
    <article className={styles.casePage}>
      <div className={styles.container}>
        <header className={styles.caseHead}>
          <Link prefetch={false} className={styles.caseBack} href={record.backHref}>
            <span aria-hidden="true">←</span> {copy.casePage.back}
          </Link>

          <div className={styles.caseMeta}>
            <span>{record.period}</span>
            <span>{isZh ? record.categoryZh : record.category}</span>
            <span>{kindLabel[language][record.kind]}</span>
          </div>

          <span className={`${styles.kicker} ${styles.caseKicker}`}>
            {record.kind === "case" ? "CASE FILE" : "DELIVERY RECORD"}
          </span>
          <h1 className={styles.caseTitle}>{title}</h1>
          <p className={styles.caseLede}>{isZh ? record.summaryZh : record.summary}</p>

          <div className={styles.caseTags}>
            {record.evidenceStatus ? (
              <span className={styles.caseTag}>{record.evidenceStatus}</span>
            ) : null}
            {record.tags.map((tag) => (
              <span className={styles.caseTag} key={tag}>
                {tag}
              </span>
            ))}
          </div>

          {record.metrics ? (
            <div className={styles.caseMetrics}>
              {record.metrics.map(([value, label]) => (
                <div className={styles.caseMetric} key={`${value}-${label}`}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          ) : null}
        </header>

        <div className={styles.caseBody}>
          <aside className={styles.caseNav}>
            <span className={styles.caseNavTitle}>{copy.casePage.contents}</span>
            <nav className={styles.caseNavList} aria-label={copy.casePage.contents}>
              {record.sections.map((section, index) => (
                <a className={styles.caseNavLink} href={`#section-${index + 1}`} key={section.title}>
                  {String(index + 1).padStart(2, "0")}{" "}
                  {isZh ? section.titleZh : section.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className={styles.caseContent}>
            <div className={styles.casePreview}>
              <CasePreview record={record} isZh={isZh} />
            </div>

            {record.sections.map((section, index) => (
              <section
                className={styles.caseSection}
                id={`section-${index + 1}`}
                key={section.title}
              >
                <div className={styles.caseSectionHead}>
                  <span className={styles.caseSectionIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className={styles.caseSectionTitle}>
                    {isZh ? section.titleZh : section.title}
                  </h2>
                </div>
                <p className={styles.caseSectionText}>
                  {isZh ? section.textZh : section.text}
                </p>
              </section>
            ))}

            <div className={styles.caseBoundary}>
              <span className={styles.caseBoundaryLabel}>{copy.casePage.scope}</span>
              <p className={styles.caseBoundaryText}>{copy.casePage.archiveNote}</p>
              {record.platforms?.length ? (
                <p className={styles.caseBoundaryText}>
                  {copy.casePage.platformsLabel}: {record.platforms.join(" / ")}
                </p>
              ) : null}
              {record.sources?.length ? (
                <div className={styles.caseSources}>
                  <span className={styles.caseBoundaryLabel}>{copy.casePage.sources}</span>
                  <div>
                    {record.sources.map((source) => (
                      <a
                        className={styles.caseSourceLink}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        key={source.url}
                      >
                        {source.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className={styles.caseNext}>
              <span className={styles.caseNextLabel}>{copy.casePage.next}</span>
              <Link prefetch={false} className={styles.caseNextLink} href={next.href}>
                {isZh ? next.titleZh : next.title}
              </Link>
            </div>

            <p className={styles.caseContact}>
              {copy.casePage.contact}{" "}
              <a href={`mailto:${copy.contact.email}`}>{copy.contact.email}</a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function nextIn(records: readonly RecordStory[], slug: string) {
  const index = records.findIndex((item) => item.slug === slug);
  return records[index < 0 ? 0 : (index + 1) % records.length];
}

function CasePreview({ record, isZh }: { record: RecordStory; isZh: boolean }) {
  switch (record.preview) {
    case "gateway":
      return <GatewayPreview zh={isZh} />;
    case "migration":
      return <DataMigrationPreview zh={isZh} />;
    case "evaluation":
      return <EvaluationPreview zh={isZh} />;
    case "service":
      return <ServiceDemo />;
    case "release":
      return <ReleasePreview />;
    case "architecture":
      return <ArchitecturePreview />;
    case "case":
      return record.slug === "adobe-canva-release-command-center" ? <ReleasePreview /> : null;
    default:
      return null;
  }
}

export function getCaseNeighbours() {
  return { indexCount: indexRecords.length, caseCount: caseRecords.length };
}
