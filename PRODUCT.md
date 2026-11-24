# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters, hiring managers, and interviewers evaluating Wenjun You for FDE / AI application delivery roles. They usually arrive from the resume or a shared link, have limited time, and need to judge delivery capability and credibility quickly.

Secondary at this stage: peers in AI application delivery and the Feishu ecosystem, who may remember the work and refer it onward.

Future: readers of published cases, personal SOP, and notes on using AI in delivery. This is a stated future direction, not a current requirement.

## Product Purpose

A personal website that works as an extended resume and proof layer for Wenjun You's delivery work. It should let a recruiter or peer see, within the first minute, what he delivers, how he works, and what evidence backs it. The immediate goal is to be remembered and treated as credible evidence alongside the resume, not to replace the resume.

The site is intended to grow into a long-term personal record with more cases, personal SOP, and AI usage experience. Those additions are future scope; publish them only when real.

## Positioning

A forward-deployed engineer who works onsite with the Feishu ecosystem and carries an enterprise AI project from ambiguous brief through build, evaluation, and handoff, leaving verifiable evidence rather than a list of tools. The site's distinctive mechanism is the delivery record: real cases, measurable before/after results, and a visible working method (Brief → Build → Eval → Handoff).

## Operating Context

- Bilingual Chinese/English; the same person and evidence should read naturally in both.
- The main site is statically exported and deployed at darioyou.cc; a separate resume site is deployed on Vercel and must not be overwritten by the main site.
- Recruiters may read on mobile, often from a resume link or a shared message; first-screen clarity and fast scanning matter.
- The homepage is organized as an OS-like dossier with three tabs (home, works, my OS); cases and resume are separate routes.
- The site is maintained as a personal project; content updates should be easy to add without rewriting the visual system.

## Capabilities and Constraints

- Current: homepage desktop/dossier, project cases, resume page, selected/explorations pages, GitHub evidence, contact, Chinese/English toggle.
- Future: more case studies, personal SOP, and AI usage notes. No publication schedule or format is confirmed yet.
- Do not publish client names, raw client data, or private research.
- The public resume must not contain the phone number.
- Do not commit docs/research, .design-evidence, .agents, .claude, output/, vue-site/, domestic-static-site.zip, .hallmark/, .tmp/, or local env files.
- Push via SSH only (`git@github.com:Wenjunyun123/personal-website-development.git`); HTTPS auth is not available.
- E2E must run against the static export, not the Turbopack dev server.
- Do not kill the unrelated `node server/main.js` process listening on port 3000.
- No server runtime assumptions: the site is a static export.
- Open decision: the exact success metric is not fixed. Current direction is "remembered by recruiters/peers and treated as credible evidence"; contact and interview paths exist but are not measured.

## Brand Commitments

- Name: 游文君 / Wenjun You.
- The "Wenjun OS" frame and the case-dossier reading are part of the personal identity; the incumbent Hallmark Specimen visual system is binding until the user approves a replacement.
- Bilingual Chinese/English.
- Personal signatures: "Token is oxygen!", "∞ 无限进步", and Detective Conan as a personal favorite. They may appear as human margin, not as invented biography.
- All person photos stay in color.
- Voice: direct, specific, evidence-first, calm; no invented metrics, testimonials, client names, or hobbies.

## Evidence on Hand

- Real delivery cases: enterprise customer service and product query (70+ seconds → 9.96s average; 74–78s → 52–55s first pass; 30+s later chain; 9.96s / 14.46s Miaoda average/P95), enterprise data migration (2,041 records, 9 tables, 0 unexplained diffs), Feishu ecosystem layers, GitHub merged PRs and validated bug reports.
- Assets: portrait, avatar, portfolio screenshots, wallpaper; resume page.
- Personal facts: based in Shanghai; onsite at Negative Entropy Cloud (Sep–Dec 2026); open to FDE; favorite anime Detective Conan; mottos above.
- Absent: client logos/names, testimonials, travel/hobby photos, and published writing beyond the site copy. Do not fabricate them.

## Product Principles

1. Evidence over assertion: every claim should trace to a case, metric, link, or real artifact.
2. Recruiter-first clarity: the first screen and first minute answer who this is, what he delivers, and how to verify it.
3. The person stays visible: delivery is the main line; the human margin is what makes him memorable.
4. Extend the resume, do not duplicate it: the site adds proof, context, and personality a one-page resume cannot hold.
5. Grow without inventing: future cases, SOP, and AI notes are added only when real.

## Accessibility & Inclusion

Web and responsive; bilingual; the incumbent site supports keyboard focus and reduced motion. No additional product-specific accessibility standard has been confirmed.
