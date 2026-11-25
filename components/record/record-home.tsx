"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../language-toggle";
import { recordCopy, type RecordCopy } from "../../content/record";
import { featuredRecords, indexRecords } from "../../content/records";
import {
  githubMergedContributions,
  githubSnapshot,
  githubVerifiedBugs
} from "../../content/profile";
import { Hero } from "./hero";
import { WorkReel } from "./work-reel";
import { ProofBand } from "./proof-band";
import { CredentialsBand } from "./credentials";
import { WorkGallery } from "./work-gallery";
import { FlagshipStory } from "./flagship-story";
import { SystemField } from "./system-field";
import { CountUp, Reveal, usePrefersReducedMotion } from "./primitives";
import styles from "./record.module.css";

export function RecordHome() {
  const { language } = useLanguage();
  const isZh = language === "zh";
  const copy = recordCopy[language];

  return (
    <>
      <Hero copy={copy} isZh={isZh} />
      <WorkReel records={indexRecords} isZh={isZh} />
      <ProofBand copy={copy} />
      <CredentialsBand copy={copy} />
      <WorkGallery copy={copy} isZh={isZh} records={featuredRecords} />
      <FlagshipStory copy={copy} />
      <MethodLoop copy={copy} />
      <EcosystemBand copy={copy} />
      <EvidenceBand copy={copy} />
      <StatementBand copy={copy} isZh={isZh} />
      <AboutBand copy={copy} />
      <ContactBand copy={copy} isZh={isZh} />
    </>
  );
}

function MethodLoop({ copy }: { copy: RecordCopy }) {
  const positions = [
    styles.loopNodeTop,
    styles.loopNodeRight,
    styles.loopNodeBottom,
    styles.loopNodeLeft
  ];

  return (
    <section className={styles.method} id="method" aria-labelledby="method-title">
      <div className={styles.container}>
        <div className={styles.methodHead}>
          <div className={styles.sectionHeadCopy}>
            <span className={styles.kicker}>{copy.method.kicker}</span>
            <h2 className={styles.sectionTitle} id="method-title">
              {copy.method.title}
            </h2>
          </div>
          <p className={styles.sectionIntro}>{copy.method.intro}</p>
        </div>

        <div className={styles.loop}>
          <div className={styles.loopRing} aria-hidden="true">
            <svg viewBox="0 0 600 600" className={styles.loopSvg}>
              <defs>
                <path
                  id="loop-text-path"
                  d="M300,74 A226,226 0 1,1 299.9,74"
                  fill="none"
                />
              </defs>
              <circle className={styles.loopOrbit} cx="300" cy="300" r="226" />
              <circle className={styles.loopArc} cx="300" cy="300" r="226" />
              <text className={styles.loopRingText}>
                <textPath href="#loop-text-path" startOffset="0%">
                  BRIEF / BUILD / EVAL / HANDOFF / BRIEF / BUILD / EVAL / HANDOFF /
                </textPath>
              </text>
            </svg>
            <div className={styles.loopCenter}>
              <span className={styles.loopCenterLabel}>DELIVERY LOOP</span>
              <span className={styles.loopInfinity}>∞</span>
            </div>
          </div>

          {copy.method.steps.map((step, index) => (
            <div className={`${styles.loopNode} ${positions[index]}`} key={step.code}>
              <span className={styles.loopNodeIndex}>{step.index}</span>
              <span className={styles.loopCode}>{step.code}</span>
              <span className={styles.loopShort}>{step.short}</span>
              <span className={styles.loopArtifact}>{step.artifact}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemBand({ copy }: { copy: RecordCopy }) {
  const labels = useMemo(
    () =>
      Array.from(
        new Set([...copy.ecosystem.rowA, ...copy.ecosystem.rowB])
      ),
    [copy.ecosystem.rowA, copy.ecosystem.rowB]
  );

  const marquee = (items: readonly string[], reverse = false) => (
    <div className={`${styles.marquee} ${reverse ? styles.marqueeRowB : ""}`} aria-hidden="true">
      <div className={`${styles.marqueeTrack} ${reverse ? styles.marqueeTrackReverse : ""}`}>
        <div className={styles.marqueeGroup}>
          {items.map((item) => (
            <span className={styles.marqueeItem} key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className={styles.marqueeGroup}>
          {items.map((item) => (
            <span className={styles.marqueeItem} key={`${item}-echo`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section
      className={`${styles.ecosystem} ${styles.dark} ${styles.ecosystemDark}`}
      id="ecosystem"
      aria-labelledby="ecosystem-title"
    >
      <div className={styles.container}>
        <div className={styles.ecoHead}>
          <div className={styles.sectionHeadCopy}>
            <span className={`${styles.kicker} ${styles.flagshipKicker}`}>
              {copy.ecosystem.kicker}
            </span>
            <h2 className={styles.sectionTitle} id="ecosystem-title">
              {copy.ecosystem.title}
            </h2>
          </div>
          <p className={styles.ecoIntro}>{copy.ecosystem.intro}</p>
        </div>

        <div className={styles.systemField}>
          <SystemField labels={labels} />
          <div className={styles.systemCenter} aria-hidden="true">
            <span>FEISHU × ENGINEERING</span>
            <strong>∞</strong>
          </div>
        </div>

        <ul className={styles.srOnly}>
          {labels.map((label) => (
            <li key={`sr-${label}`}>{label}</li>
          ))}
        </ul>
      </div>

      {marquee(copy.ecosystem.rowA)}
      {marquee(copy.ecosystem.rowB, true)}
    </section>
  );
}

function EvidenceBand({ copy }: { copy: RecordCopy }) {
  const stats = [
    { value: githubSnapshot.publicRepositories, label: copy.evidence.reposLabel },
    { value: githubSnapshot.contributionsLastYear, label: copy.evidence.contributionsLabel },
    { value: githubMergedContributions.length, label: copy.evidence.mergedTitle },
    { value: githubVerifiedBugs.length, label: copy.evidence.bugsTitle }
  ];

  return (
    <section className={styles.evidence} id="evidence" aria-labelledby="evidence-title">
      <div className={styles.container}>
        <div className={styles.evidenceHead}>
          <div className={styles.sectionHeadCopy}>
            <span className={styles.kicker}>{copy.evidence.kicker}</span>
            <h2 className={styles.sectionTitle} id="evidence-title">
              {copy.evidence.title}
            </h2>
          </div>
          <p className={styles.sectionIntro}>{copy.evidence.intro}</p>
        </div>

        <div className={styles.statStrip}>
          {stats.map((stat, index) => (
            <Reveal className={styles.statItem} delay={index * 60} key={stat.label}>
              <span className={styles.statValue}>
                <CountUp value={stat.value} display={String(stat.value)} />
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </Reveal>
          ))}
        </div>

        <div className={styles.ledgerFoot}>
          <span>{copy.evidence.snapshot}</span>
          <a
            className={styles.textLink}
            href="https://github.com/Wenjunyun123"
            target="_blank"
            rel="noreferrer"
          >
            {copy.evidence.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

function StatementBand({ copy, isZh }: { copy: RecordCopy; isZh: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = copy.notes.items;
  const note = items[active] ?? items[0];

  useEffect(() => {
    if (reduced || paused || items.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % items.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [items.length, paused, reduced]);

  return (
    <section className={styles.statement} id="notes" aria-labelledby="statement-title">
      <div className={styles.container}>
        <div className={styles.statementHead}>
          <div className={styles.sectionHeadCopy}>
            <span className={styles.kicker}>{copy.notes.kicker}</span>
            <h2 className={styles.sectionTitle} id="statement-title">
              {copy.notes.title}
            </h2>
          </div>
          <span className={styles.statementIndex} aria-hidden="true">
            {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>

        <div
          className={styles.statementStage}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <span className={styles.statementGhost} aria-hidden="true">
            {String(active + 1).padStart(2, "0")}
          </span>
          <div className={styles.statementCopy}>
            <p className={styles.statementQuote} key={note.quote}>
              {note.quote}
            </p>
            <Link prefetch={false} className={styles.statementLink} href={note.href}>
              {note.linkLabel}
              <span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        </div>

        <div className={styles.statementTabs}>
          {items.map((item, index) => (
            <button
              className={styles.statementTab}
              type="button"
              aria-label={isZh ? `查看判断 ${index + 1}` : `View judgment ${index + 1}`}
              aria-pressed={index === active}
              key={item.quote}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutBand({ copy }: { copy: RecordCopy }) {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <div className={`${styles.container} ${styles.aboutGrid}`}>
        <div className={styles.aboutPortrait}>
          <Image
            src="/profile/wenjun.png"
            alt={copy.about.portraitAlt}
            width={420}
            height={560}
          />
          <span className={styles.aboutPortraitTag} aria-hidden="true">
            OFF-DUTY / 2026
          </span>
        </div>

        <div className={styles.aboutCopy}>
          <span className={styles.kicker}>{copy.about.kicker}</span>
          <h2 className={styles.aboutTitle} id="about-title">
            {copy.about.title}
          </h2>
          <p className={styles.aboutBody}>{copy.about.body}</p>

          <div className={styles.aboutFacts}>
            {copy.about.facts.map((fact) => (
              <div className={styles.aboutFact} key={fact.label}>
                <span className={styles.aboutFactLabel}>{fact.label}</span>
                <span className={styles.aboutFactValue}>{fact.value}</span>
              </div>
            ))}
          </div>

          <p className={styles.aboutClosing}>
            <span className={styles.infinity} aria-hidden="true">
              ∞
            </span>
            <span>{copy.about.closing}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactBand({ copy, isZh }: { copy: RecordCopy; isZh: boolean }) {
  const marqueeItems = copy.contact.marquee.split(" · ");

  return (
    <section
      className={`${styles.contact} ${styles.dark}`}
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className={`${styles.container} ${styles.contactInner}`}>
        <span className={`${styles.kicker} ${styles.contactKicker}`}>{copy.contact.kicker}</span>
        <h2 className={styles.contactTitle} id="contact-title">
          {copy.contact.title}
        </h2>
        <p className={styles.contactIntro}>{copy.contact.intro}</p>

        <a className={styles.contactEmail} href={`mailto:${copy.contact.email}`}>
          {copy.contact.email}
        </a>

        <div className={styles.contactLinks}>
          {copy.contact.links.map((link) =>
            link.external ? (
              <a
                className={styles.contactLink}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                data-external="true"
                key={link.href}
              >
                {link.label}
              </a>
            ) : (
              <Link prefetch={false} className={styles.contactLink} href={link.href} key={link.href}>
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className={styles.contactMarquee} aria-hidden="true">
          <div className={styles.contactMarqueeTrack}>
            {[0, 1].map((group) => (
              <div className={styles.contactMarqueeGroup} key={group}>
                {marqueeItems.map((item) => (
                  <span className={styles.contactMarqueeItem} key={`${group}-${item}`}>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <a className={styles.backToTop} href="#top">
          {copy.contact.backToTop} ↑
        </a>
        <span className={styles.srOnly}>
          {isZh ? "联系与社交链接" : "Contact and social links"}
        </span>
      </div>
    </section>
  );
}
