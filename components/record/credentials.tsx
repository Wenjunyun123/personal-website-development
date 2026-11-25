"use client";

import Image from "next/image";
import type { RecordCopy } from "../../content/record";
import { Reveal } from "./primitives";
import styles from "./record.module.css";

export function CredentialsBand({ copy }: { copy: RecordCopy }) {
  return (
    <section
      className={styles.credentials}
      id="credentials"
      aria-labelledby="credentials-title"
    >
      <div className={styles.container}>
        <div className={styles.credentialsHead}>
          <div className={styles.sectionHeadCopy}>
            <span className={styles.kicker}>{copy.credentials.kicker}</span>
            <h2 className={styles.credentialsTitle} id="credentials-title">
              {copy.credentials.title}
            </h2>
          </div>
          <div className={styles.credentialsAside}>
            <p className={styles.credentialsIntro}>{copy.credentials.intro}</p>
            <span className={styles.credentialsIndex} aria-hidden="true">
              {copy.credentials.indexLabel}
            </span>
          </div>
        </div>

        <div className={styles.credentialGrid}>
          {copy.credentials.items.map((item, index) => (
            <Reveal
              as="article"
              className={styles.credentialCard}
              delay={index * 90}
              key={item.image}
            >
              <a
                className={styles.credentialLink}
                href={item.image}
                target="_blank"
                rel="noreferrer"
                aria-label={`${item.title} ${item.role} — ${copy.credentials.cta}`}
              >
                <span className={styles.credentialFrame}>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 560px) 320px, (max-width: 860px) 42vw, 360px"
                  />
                </span>
                <span className={styles.credentialInfo}>
                  <span className={styles.credentialNo} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.credentialName}>{item.title}</span>
                  <span className={styles.credentialRole}>{item.role}</span>
                  <span className={styles.credentialDates}>
                    <span className={styles.credentialDate}>
                      <span>{copy.credentials.issuedLabel}</span>
                      <span>{item.issued}</span>
                    </span>
                    <span className={styles.credentialDate}>
                      <span>{copy.credentials.validLabel}</span>
                      <span>{item.validUntil}</span>
                    </span>
                  </span>
                  <span className={styles.credentialCta}>
                    {copy.credentials.cta}
                    <span aria-hidden="true">↗</span>
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <p className={styles.credentialsNote}>{copy.credentials.note}</p>
      </div>
    </section>
  );
}
