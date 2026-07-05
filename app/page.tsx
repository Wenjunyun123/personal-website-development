"use client";

import { useState } from "react";
import { cases } from "../content/cases";

const states = {
  package: {
    label: "Package Check",
    title: "Manifest and package drift, made visible.",
    copy: "A release queue for Adobe and Canva plugin work: manifest parity, zip roots, version consistency, lint/types/tests/build, and source handoff readiness.",
    metrics: [
      ["60", "public add-ons read"],
      ["56", "Base rows matched"],
      ["16", "Office manifests"]
    ],
    queue: [
      ["adobe-ai-vector-generator", "manifest ok"],
      ["canva-colorize-image", "zip root check"],
      ["office manifest batch", "xml ready"]
    ]
  },
  risk: {
    label: "Risk Queue",
    title: "Subscription and credit risks are triaged before release.",
    copy: "A risk-first view for subscription cancellation, credit drift, deduction logic, and cache behavior across plugin packages.",
    metrics: [
      ["62", "packages audited"],
      ["P0/P1", "priority bands"],
      ["7", "submission times fixed"]
    ],
    queue: [
      ["subscription-cancel", "P0"],
      ["credit drift cache", "P1"],
      ["deduction evidence", "P1"]
    ]
  },
  handoff: {
    label: "Handoff Evidence",
    title: "Every release path ends with evidence someone else can trust.",
    copy: "Handoff packages collect summaries, check results, missing items, manifest evidence, and review-state notes for the next owner.",
    metrics: [
      ["78", "Base summaries rewritten"],
      ["3", "handoff layers"],
      ["1", "source of truth"]
    ],
    queue: [
      ["review closure", "evidence attached"],
      ["source zip", "ready"],
      ["handoff summary", "generated"]
    ]
  }
};

type StateKey = keyof typeof states;

export default function Home() {
  const [active, setActive] = useState<StateKey>("package");
  const current = states[active];

  return (
    <main className="page-shell">
      <header className="masthead">
        <span>Wenjun You</span>
        <span>AI Frontend Engineer</span>
      </header>

      <section className="hero">
        <div>
          <p className="kicker">English-first portfolio / source-backed cases</p>
          <h1>Wenjun You</h1>
          <p className="positioning">AI Frontend Engineer for productized AI workflows.</p>
          <p className="promise">I turn messy AI workflows into shippable product interfaces.</p>
          <nav className="cta-row" aria-label="Primary hiring actions">
            <a href="/resume">View Resume</a>
            <a href="mailto:wenjunyou2002@outlook.com">Email Wenjun</a>
            <a href="https://github.com/Wenjunyun123">GitHub</a>
          </nav>
        </div>

        <section className="command-center" aria-label="Release Command Center">
          <div className="command-topline">
            <span>Release Command Center</span>
            <span>Adobe / Canva / Lark</span>
          </div>

          <div className="command-tabs" role="group" aria-label="Release Command Center states">
            {(Object.keys(states) as StateKey[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={active === key}
                onClick={() => setActive(key)}
              >
                {states[key].label}
              </button>
            ))}
          </div>

          <div className="command-body">
            <article className="command-panel">
              <h2>{current.title}</h2>
              <p>{current.copy}</p>
              <div className="metric-grid">
                {current.metrics.map(([value, label]) => (
                  <div className="metric" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </article>

            <aside className="command-panel">
              <h3>Queue Evidence</h3>
              <ul className="queue">
                {current.queue.map(([item, status]) => (
                  <li key={item}>
                    <span>{item}</span>
                    <span className="risk">{status}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </section>

      <section className="content-band" aria-labelledby="selected-case-set-title">
        <h2 className="section-title" id="selected-case-set-title">
          Selected Case Set
        </h2>
        <div className="case-grid">
          {cases.map((caseStudy) => (
            <a className="case-card" href={`/cases/${caseStudy.slug}`} key={caseStudy.slug}>
              <div>
                <span className="badge">{formatEvidenceStatus(caseStudy.evidenceStatus)}</span>
                <h3>{caseStudy.title}</h3>
                <p>{caseStudy.problem}</p>
              </div>
              <span className="badge">{caseStudy.role}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="content-band" aria-labelledby="capability-index-title">
        <h2 className="section-title" id="capability-index-title">
          Capability Index
        </h2>
        <div className="index-grid">
          <article className="index-card">
            <span className="badge">01</span>
            <h3>AI Product Interfaces</h3>
            <p>Turns AI capability into clear inputs, system states, outputs, and user-facing feedback loops.</p>
          </article>
          <article className="index-card">
            <span className="badge">02</span>
            <h3>Plugin & Platform Delivery</h3>
            <p>Ships across Adobe Express add-ons, Canva Apps, Office Add-ins, and Safari WebExtension surfaces.</p>
          </article>
          <article className="index-card">
            <span className="badge">03</span>
            <h3>Agent Workflow Operations</h3>
            <p>Connects agents, Feishu/Lark surfaces, CLI execution, SOPs, and handoff evidence into repeatable work.</p>
          </article>
        </div>
      </section>

      <section className="content-band" aria-labelledby="technical-notes-title">
        <h2 className="section-title" id="technical-notes-title">
          Technical Notes
        </h2>
        <div className="notes-grid">
          <article className="note-card">
            <h3>Why release evidence matters more than launch screenshots</h3>
            <p>Shipping AI plugin work needs package truth, review state, and handoff proof, not only polished UI captures.</p>
          </article>
          <article className="note-card">
            <h3>Base agents need table discipline before autonomy</h3>
            <p>Feishu/Lark automation becomes useful when records, states, exceptions, and ownership are shaped first.</p>
          </article>
          <article className="note-card">
            <h3>Agent workflows should end with verifiable artifacts</h3>
            <p>Every automation run should leave a trail: action cards, status checks, logs, and a concise handoff.</p>
          </article>
        </div>
      </section>

      <section className="content-band" aria-labelledby="resume-strip-title">
        <h2 className="section-title" id="resume-strip-title">
          Resume Strip
        </h2>
        <div className="resume-grid">
          <article className="resume-card">
            <span className="badge">2026</span>
            <h3>Shanghai Yichong Technology</h3>
            <p>AI application frontend engineering across plugin delivery, release governance, and Agent workflow reliability.</p>
          </article>
          <article className="resume-card">
            <span className="badge">2025</span>
            <h3>AI operations internships</h3>
            <p>Feishu Base automation, AI product-image workflow, ETL/data automation, SOP training, and quality loops.</p>
          </article>
          <article className="resume-card">
            <span className="badge">Education</span>
            <h3>Shanghai Sanda University</h3>
            <p>E-commerce undergraduate with AI, data, UX, machine learning, and integrated circuit minor coursework.</p>
          </article>
        </div>
      </section>

      <section className="content-band" aria-labelledby="contact-title">
        <div className="contact-panel">
          <div>
            <h2 className="section-title" id="contact-title">
              Contact
            </h2>
            <p>For AI frontend, FDE, plugin delivery, and agent workflow opportunities, start with the resume or email.</p>
          </div>
          <nav className="cta-row" aria-label="Contact actions">
            <a href="/resume">View Resume</a>
            <a href="mailto:wenjunyou2002@outlook.com">Email Wenjun</a>
            <a href="https://github.com/Wenjunyun123">GitHub</a>
          </nav>
        </div>
      </section>
    </main>
  );
}

function formatEvidenceStatus(status: string) {
  return status.replaceAll("-", " ");
}
