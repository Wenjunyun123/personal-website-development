"use client";

import Image from "next/image";
import Link from "next/link";
import type { RecordStory } from "../../content/records";
import styles from "./record.module.css";

/**
 * A visual strip under the hero. It is deliberately decorative: the same
 * records are reachable from the gallery below, so the duplicate links are
 * removed from the tab order and accessibility tree.
 */
export function WorkReel({
  records,
  isZh
}: {
  records: readonly RecordStory[];
  isZh: boolean;
}) {
  const items = records.filter((record) => record.image).slice(0, 6);
  if (!items.length) return null;

  const group = (copy: number) => (
    <div className={styles.reelGroup}>
      {items.map((record, index) => {
        const title = isZh ? record.titleZh : record.title;
        return (
          <Link prefetch={false}
            className={styles.reelItem}
            href={record.href}
            key={`${copy}-${record.href}`}
            tabIndex={-1}
            aria-label={title}
          >
            <span className={styles.reelFrame}>
              <Image
                src={record.image as string}
                alt=""
                width={640}
                height={400}
                sizes="(min-width: 1024px) 260px, 200px"
              />
              <span className={styles.reelIndex} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </span>
            <span className={styles.reelMeta} aria-hidden="true">
              <span>{isZh ? record.categoryZh : record.category}</span>
              <span>{record.period}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div
      className={styles.reel}
      aria-hidden="true"
      aria-label={isZh ? "项目画面" : "Project frames"}
    >
      <div className={styles.reelTrack}>
        {group(0)}
        {group(1)}
      </div>
    </div>
  );
}
