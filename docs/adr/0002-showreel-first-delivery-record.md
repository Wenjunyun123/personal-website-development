# Showreel-first Delivery Record

Date: 2026-11-24
Status: accepted

## Context

The previous public site was an editorial dossier behind a terminal/OS metaphor. It was credible for peers but text-heavy, static, and slow to signal craft to non-specialist visitors. The owner's goal changed: the site should first make an unfamiliar visitor feel that the work and the person are high-craft, then let interested readers verify the claims. Resume detail was also over-represented on the homepage.

## Decision

Rebuild the public site as a motion-first black-and-white magazine, **"交付记录 / THE DELIVERY RECORD"**:

- One scrolling homepage with visual set pieces: canvas contour hero, image reel, proof numbers, pinned case gallery, scroll-scrubbed 70s→9.96s story, delivery loop, dark tool constellation, evidence stats, rotating judgments, about, and contact.
- Keep the existing editorial convictions: warm paper `#F7F6F2`, ink `#0B0B0B`, one signal blue `#1F4BFF`, DM Serif Display / Noto Serif SC, square geometry, real screenshots, color portrait.
- Demote resume content: `/explorations` gets one product-like resume tile; detailed experience lives in `/resume` and case pages. The homepage does not carry a full experience timeline.
- Preserve the Wenjun OS desktop at `/os` as a `noindex` easter egg, outside the new shell.
- Keep the static export, existing routes, case content, evidence boundaries, bilingual toggle, and print resume.

## Consequences

- The site now depends on client-side enhancement for its full effect, so every effect must have a static/reduced-motion/no-JS equivalent; tests cover these paths.
- The design system is scoped under `.record`; `/os` and `/resume` keep their own styles. New public surfaces must use the tokens in `DESIGN.md`, not the legacy dossier skin.
- The homepage intentionally contains less prose. Depth moves to case pages and the resume, which raises the importance of clear links from the showreel to that evidence.
- Pinned scrolling is limited to fine pointers at ≥1024px and disabled under reduced motion; mobile uses a native horizontal rail.
- Client work remains anonymized; no client names, raw records, testimonials, logos, or invented metrics are introduced by the redesign.

## Related

- `docs/adr/0001-minimal-fde-portfolio.md` — earlier structural decision; still valid for content boundaries and deployment.
- `DESIGN.md` — current visual system.
- `PRODUCT.md` — current product positioning and principles.
