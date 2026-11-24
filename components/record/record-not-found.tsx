"use client";

import Link from "next/link";
import { useLanguage } from "../language-toggle";
import { recordCopy } from "../../content/record";
import styles from "./record.module.css";

export function RecordNotFound() {
  const { language } = useLanguage();
  const copy = recordCopy[language];

  return (
    <article className={`${styles.container} ${styles.notFound}`}>
      <span className={`${styles.kicker} ${styles.notFoundKicker}`}>{copy.notFound.kicker}</span>
      <h1 className={styles.notFoundTitle}>{copy.notFound.title}</h1>
      <p className={styles.notFoundBody}>{copy.notFound.body}</p>
      <div className={styles.notFoundCta}>
        <Link prefetch={false} className={`${styles.button} ${styles.buttonPrimary}`} href="/">
          {copy.notFound.cta}
        </Link>
      </div>
    </article>
  );
}
