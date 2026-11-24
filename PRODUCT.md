# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters, hiring managers, and interviewers evaluating Wenjun You for FDE / AI application delivery roles. They often arrive from the resume or a shared link, have limited time, and include non-specialists who cannot judge implementation details — they judge craft, clarity, and credibility from the page itself.

Secondary at this stage: peers in AI application delivery and the Feishu ecosystem, who may remember the work and refer it onward.

Future: readers of published cases, personal SOP, and notes on using AI in delivery. This is a stated future direction, not a current requirement.

## Product Purpose

A personal website that works as a showreel and proof layer for Wenjun You. The first job is to make an unfamiliar visitor feel, within one screen, that this is a high-craft, high-standard engineer; the second is to let a serious reader verify that impression with real cases, metrics, and process. It extends the resume rather than duplicating it: detailed experience is a small product-like tile on `/explorations` and a printable `/resume`, while the homepage stays visual, sparse, and memorable.

The site is intended to grow into a long-term personal record with more cases, personal SOP, and AI usage experience. Those additions are future scope; publish them only when real.

## Positioning

A forward-deployed engineer who works onsite with the Feishu ecosystem and carries an enterprise AI project from ambiguous brief through build, evaluation, and handoff, leaving verifiable evidence rather than a list of tools. The site's distinctive mechanism is the delivery record: real cases, measurable before/after results, and a visible working method (Brief → Build → Eval → Handoff).

## Operating Context

- Bilingual Chinese/English; the same person and evidence should read naturally in both.
- The homepage is a single scrolling showreel: animated hero, image reel, proof numbers, pinned case gallery, a scroll-driven performance story, method loop, ecosystem constellation, evidence stats, statements, about, and contact.
- `/selected/` is the work index; `/explorations/` holds notes, other deliveries, open-source contributions, and one compact resume tile; `/resume/` is the printable resume; `/os/` preserves the earlier Wenjun OS desktop as an easter egg with `noindex`.
- The main site is statically exported and deployed at darioyou.cc; a separate resume site is deployed on Vercel and must not be overwritten by the main site.
- Recruiters may read on mobile, often from a resume link or a shared message; first-screen clarity and visual confidence matter more than text volume.
- The site is maintained as a personal project; content updates should be easy to add without rewriting the visual system.
- Motion must degrade cleanly: reduced-motion, keyboard, and no-JS visitors get the same content without the showreel effects.

## Capabilities and Constraints

- Current: motion-first homepage (canvas signal field, image reel, pinned gallery, scroll-scrubbed flagship story, method loop, tool constellation, rotating statements), project cases, selected/explorations indexes, printable resume, GitHub evidence, contact, Chinese/English toggle, `/os` easter egg.
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
- The public frame is "交付记录 / THE DELIVERY RECORD": a motion-first black-and-white magazine. The earlier Wenjun OS dossier survives at `/os` as a personal easter egg and must not be deleted or used to define new public surfaces.
- Bilingual Chinese/English.
- Personal signatures: "Token is oxygen!", "∞ 无限进步", and Detective Conan as a personal favorite. They may appear as human margin, not as invented biography.
- All person photos stay in color.
- Voice: direct, specific, evidence-first, calm; no invented metrics, testimonials, client names, or hobbies.
- Visual direction is binding: warm paper and ink, one signal blue, serif display, square geometry, real photography, no template-like cards or decorative chrome.

## Evidence on Hand

- Real delivery cases: enterprise customer service and product query (70+ seconds → 9.96s average; 74–78s → 52–55s first pass; 30+s later chain; 9.96s / 14.46s Miaoda average/P95), enterprise data migration (2,041 records, 9 tables, 0 unexplained diffs), Feishu ecosystem layers, GitHub merged PRs and validated bug reports.
- Assets: portrait, avatar, portfolio screenshots, wallpaper; resume page.
- Personal facts: based in Shanghai; onsite at Negative Entropy Cloud (Sep–Dec 2026); open to FDE; favorite anime Detective Conan; mottos above.
- Absent: client logos/names, testimonials, travel/hobby photos, and published writing beyond the site copy. Do not fabricate them.

## Product Principles

1. Spectacle with substance: the first screen should make a non-expert think "this person is good"; every later claim must still trace to real evidence.
2. Evidence over assertion: every metric, case, and link must be verifiable; no invented numbers, testimonials, or clients.
3. Showreel first, resume second: the homepage sells the person and the craft; detailed experience stays in one compact tile, the printable resume, and the case pages.
4. The person stays visible: delivery is the main line; the portrait and human margin make him memorable.
5. Motion is part of the message: animate evidence, not decoration; always provide a still, reduced-motion, and no-JS equivalent.
6. Grow without inventing: future cases, SOP, and AI notes are added only when real.

## Accessibility & Inclusion

Web and responsive; bilingual; keyboard focus is visible throughout; custom cursor, pinned scrolling, marquees, canvas fields, and scroll-scrubbed scenes all disable under `prefers-reduced-motion`; the static export keeps all titles, numbers, and links readable without JavaScript.
