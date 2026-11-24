"use client";

import type { RecordCopy } from "../../content/record";
import { CountUp, Reveal } from "./primitives";
import styles from "./record.module.css";

export function ProofBand({ copy }: { copy: RecordCopy }) {
  return (
    <section className={styles.proof} id="proof" aria-labelledby="proof-title">
      <div className={styles.container}>
        <Reveal className={styles.proofHead}>
          <div className={styles.sectionHeadCopy}>
            <span className={styles.kicker}>{copy.proof.kicker}</span>
            <h2 className={styles.proofTitle} id="proof-title">
              {copy.proof.title}
            </h2>
          </div>
          <span className={styles.proofIndex} aria-hidden="true">
            04 / METRICS
          </span>
        </Reveal>

        <div className={styles.proofGrid}>
          {copy.proof.items.map((item, index) => (
            <Reveal className={styles.proofItem} delay={index * 70} key={item.label}>
              <span className={styles.proofValue}>
                {item.to === undefined ? (
                  item.display
                ) : (
                  <CountUp value={item.to} display={item.display} formatComma={item.formatComma} />
                )}
              </span>
              <span className={styles.proofLabel}>{item.label}</span>
              <span className={styles.proofNoteItem}>{item.note}</span>
            </Reveal>
          ))}
        </div>

        <div className={styles.proofFoot}>
          <span>{copy.proof.note}</span>
        </div>
      </div>
    </section>
  );
}
