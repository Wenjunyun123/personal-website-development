# Personal Website Design

Date: 2026-07-05

## Objective

Build an English-first personal website for Wenjun You that attracts high-quality hiring opportunities by proving AI frontend engineering, productized AI workflow design, and end-to-end delivery.

The site should feel like a minimal technical magazine rather than a generic portfolio. It should make recruiters, interviewers, hiring managers, and headhunters quickly understand why Wenjun is worth interviewing.

## Source Material

- Resume: `C:\Users\Y.Daria\Desktop\resume_v5\03_FDE.pdf`
- GitHub profile: `https://github.com/Wenjunyun123`
- Organization repositories: `https://github.com/orgs/YiChongmimi/repositories`
- Douyin candidate source: `https://www.douyin.com/video/7657756936452017458`
- Design reference catalog: `https://getdesign.md/`

Evidence boundary:

- The resume supports the AI FDE positioning, Adobe/Canva/Office/Safari plugin delivery, Feishu Base automation, n8n automation, and quantified business outcomes.
- GitHub supports the existence of many Adobe/Canva TypeScript private repositories under `YiChongmimi`, plus public AI/tooling interests under `Wenjunyun123`.
- The Douyin video is a user-provided candidate source for Feishu Base agent usage, but it was not readable from the current browsing environment. It needs a screenshot, transcript, or key-step summary before being used as verified case evidence.
- Hermes + Lark CLI automation is accepted as a target case, but needs supporting artifacts before the case detail page is treated as final.

## Positioning

Primary identity:

> Wenjun You, AI Frontend Engineer for productized AI workflows.

Core promise:

> I turn messy AI workflows into shippable product interfaces.

The site is not a pure resume, a blog, or a visual experiment. Its purpose is hiring conversion: view or download the resume, then contact Wenjun by email. The public page should show email and GitHub, but omit phone number from page copy for privacy.

## Visual Direction

Chosen direction: editorial engineering blend.

References from getdesign.md:

- WIRED: paper-white broadsheet density, serif display, mono kickers, ink-blue links. This is the primary visual structure.
- Vercel: black-and-white precision, engineering confidence, crisp boundaries. This is a supporting engineering influence.
- Claude: warm editorial AI product tone. This is a supporting warmth and clarity influence.

Avoid:

- Generic AI startup gradients.
- Cyberpunk or neon hacker styling.
- Portfolio template cards.
- Decorative AI spectacle that does not prove product skill.

The page should feel high-density, readable, and sharp: editorial typography, precise spacing, strong hierarchy, thin rules, proof-oriented labels, and case-study density.

## Site Map

First version:

- Home page
- Three case detail pages
- Resume page or downloadable resume file

Home page reading path:

1. Hero with Release Command Center interface slice.
2. Capability Index: AI Product Interfaces, Plugin & Platform Delivery, Agent Workflow Operations.
3. Selected Case Set: three source-backed cases.
4. Technical Notes: two or three short notes, not a full blog system.
5. Resume Strip: education, internship history, skills, awards.
6. Contact CTA: View Resume, Email Wenjun, GitHub.

## Hero

The first screen should lead with a visual hook, not just name and title. The hook is a compact interactive interface slice called Release Command Center.

Release Command Center shows the flagship case as a productized workflow:

- plugin release queue
- manifest/package checks
- status verification
- risk priority
- handoff evidence generation

The user can switch between three states:

- Package Check
- Risk Queue
- Handoff Evidence

Each state should map to real resume evidence from the Adobe/Canva plugin release governance work. The interface should not pretend to be a live production dashboard unless backed by real data; it is a magazine-style product slice.

## Selected Cases

### 1. Adobe/Canva Plugin Release Command Center

Role: flagship case.

Source support:

- Resume: multi-platform AI plugin frontend delivery across Adobe Express add-ons, Canva Apps, Office Add-ins, and Safari WebExtension.
- Resume: Adobe publishing state verification, package checks, 62-package subscription/credit risk audit, 16 Office XML manifests, source handoff packages.
- GitHub: many Adobe/Canva TypeScript private repositories under `YiChongmimi`.

Case story:

- Problem: plugin matrix state drift, review risk, package/version inconsistency, unclear handoff evidence.
- Product decision: turn release follow-up into a command-center workflow with status, risk, package evidence, and queue control.
- Interface: Release Command Center.
- Technical build: TypeScript/React plugin frontends, manifest/package/zip validation, lint/types/tests/build checks, GitHub/Codeup collaboration, evidence handoff.
- Outcome: lower release ambiguity, clearer handoff, stronger auditability.

### 2. Lark Base Agent Operations

Role: operations automation case.

Source support:

- Resume: Feishu Base status governance, AI image workflow, quality checks, SOP, automation, and measurable efficiency outcomes.
- User-provided candidate source: Douyin video about Feishu Base intelligent agent usage.

Evidence still needed:

- screenshot, transcript, or summary from the Douyin video
- one or more examples of Base agent tasks, table schema, or automation results

Case story:

- Problem: repeated operational updates and status coordination are slow and error-prone when managed manually.
- Product decision: make Feishu/Lark Base the structured source of truth, then use Base agents and automation to update records, execute tasks, and surface next actions.
- Interface: Base table views, task states, agent action log, exception queue.
- Technical build: Feishu/Lark Base, CLI/API-driven task execution, automation rules, evidence capture.
- Outcome: faster operational loop and clearer task ownership.

### 3. Hermes + Lark CLI Automation System

Role: agent orchestration case.

Source support:

- User statement in design session.
- Resume supports broader Agent workflow, MCP, automation, Feishu ecosystem, and SOP experience.

Evidence still needed:

- Hermes workflow description
- representative commands or scripts
- before/after task examples
- screenshots, logs, or handoff output

Case story:

- Problem: repeated operational tasks need both agent planning and reliable execution in Feishu/Lark.
- Product decision: combine Hermes-style orchestration with Lark CLI execution so the agent plans, executes, verifies, and reports.
- Interface: agent run timeline, Lark CLI action cards, verification status, handoff summary.
- Technical build: Hermes workflow, Lark CLI, command execution, status verification, structured handoff.
- Outcome: repeatable automation for operational task execution.

## Case Page Template

Each case detail page follows the same spine:

1. Problem
2. Product decision
3. Interface
4. Technical build
5. Outcome

Metadata fields:

- `title`
- `slug`
- `role`
- `platforms`
- `evidenceStatus`
- `problem`
- `productDecision`
- `interface`
- `technicalBuild`
- `outcome`
- `sources`

Evidence status values:

- `resume-supported`
- `github-supported`
- `user-provided-pending-transcript`
- `draft-internal`

## Content Rules

- Do not fabricate metrics.
- Do not imply private repository contents are public.
- Mark draft/internal cases clearly until screenshots, transcripts, scripts, or logs are provided.
- Use English for the main interface and positioning.
- Use Chinese only as support for local context, resume material, or optional bilingual notes.
- Keep the phone number out of public page copy.

## Technical Approach

Stack:

- Next.js
- Tailwind CSS
- MDX

Rationale:

- Next.js supports polished routing, metadata, image handling, and deployment.
- Tailwind supports the precise editorial layout without creating a large design system early.
- MDX lets case studies read like technical magazine features while still embedding interactive interface slices.

Initial implementation modules:

- `app/page.tsx` for the homepage.
- `app/cases/[slug]/page.tsx` for case details.
- `content/cases/*.mdx` for case bodies.
- `content/cases.ts` or frontmatter for structured metadata.
- `components/release-command-center.tsx` for the hero interface slice.
- `components/case-card.tsx`, `components/capability-index.tsx`, `components/resume-strip.tsx`, `components/contact-cta.tsx`.

## Verification Plan

Before considering the first implementation complete:

- Run lint/type/build checks.
- Verify desktop and mobile screenshots.
- Check that hero content is visible and not text-overlapped on mobile.
- Check that the Release Command Center is visibly interactive.
- Check that all unverified case material is labelled as draft/internal or pending evidence.
- Check that public page copy omits the phone number.
- Check links to resume, email, GitHub, and case pages.

## Open Inputs

Needed before final content polish:

- Resume PDF path to publish or converted public resume copy.
- Email address confirmation for public CTA.
- Screenshot/transcript/key steps from the Douyin video.
- Hermes + Lark CLI workflow artifacts.
- Case screenshots or redacted visuals from Adobe/Canva/Lark work.
- Decision on deployment target.
