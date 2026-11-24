---
name: The Delivery Record
description: Motion-first black-and-white magazine for an AI delivery engineer
colors:
  paper: "#F7F6F2"
  paper-2: "#F1EFE9"
  paper-3: "#E9E6DE"
  ink: "#0B0B0B"
  ink-soft: "#2A2A2A"
  muted: "#6B6B6B"
  rule: "#D8D5CF"
  rule-dark: "#2C2C2C"
  signal-blue: "#1F4BFF"
  signal-blue-on-dark: "#7C90FF"
typography:
  display:
    fontFamily: "DM Serif Display, Noto Serif SC, Songti SC, STSong, serif"
    fontSize: "clamp(78px, 13.2vw, 218px)"
    fontWeight: 400
    lineHeight: 0.84
    letterSpacing: "-0.06em"
  section:
    fontFamily: "DM Serif Display, Noto Serif SC, Songti SC, STSong, serif"
    fontSize: "clamp(40px, 6vw, 88px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  statement:
    fontFamily: "DM Serif Display, Noto Serif SC, Songti SC, STSong, serif"
    fontSize: "clamp(32px, 4.4vw, 64px)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  lede:
    fontFamily: "Geist, PingFang SC, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(20px, 2.5vw, 40px)"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Geist, PingFang SC, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist Mono, SFMono-Regular, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  control: "0"
  card: "0"
  cursor-ring: "50%"
spacing:
  gutter: "clamp(20px, 4vw, 64px)"
  section: "clamp(96px, 12vw, 200px)"
  header: "64px"
  container: "1600px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.signal-blue}"
  text-link:
    textColor: "{colors.ink-soft}"
    borderBottom: "1px solid {colors.rule}"
    typography: "{typography.label}"
  gallery-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    imageRatio: "4 / 3"
  scene-stage:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "clamp(40px, 6vw, 96px)"
  resume-banner:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    border: "1px solid {colors.ink}"
    rounded: "{rounded.card}"
    padding: "clamp(20px, 3vw, 34px)"
---

# Design System: The Delivery Record

## Overview

**Creative North Star: "The Live Record"**

The public site is a showreel first and an archive second. A visitor who has never heard of forward-deployed engineering should understand within one screen that this person builds careful, high-craft systems; the proof and the resume follow for anyone who wants to check the work. The surface is a monochrome editorial magazine that moves: a contour field behind a giant masthead, a strip of project frames, a pinned gallery, and one scroll-driven data story. Evidence is not decoration; the motion is how the evidence is performed.

The system keeps the older editorial conviction — warm paper, razor serif, hairline rules, one ink-blue signal — but raises the scale and lowers the word count. The homepage is a sequence of visual set pieces, not a list of paragraphs. Detailed experience is deliberately demoted to one product-like resume tile on `/explorations` and to the printable `/resume`; it never competes with the opening impression.

The showreel logic stops where reading starts. Case pages return to a calmer editorial rhythm: big titles, real screenshots, metrics, and evidence boundaries. The old Wenjun OS desktop is preserved as an easter egg at `/os` and is outside this system.

**Key Characteristics:**
- Black-and-white magazine surfaces with a single signal blue; photographs and the portrait stay in color.
- Display serif at one weight, set very large and very tight; Geist for reading; Geist Mono for data and labels.
- Full-bleed paper and ink bands alternate like spreads; no cards, shadows, glass, gradients, or rounded panels.
- Motion is evidence: contour fields, image reels, pinned horizontal work, a drawn performance curve, a rotating constellation.
- Every animation has a still version; content is in the SSR HTML and remains readable without JavaScript.

## Colors

The palette is a printed record: warm paper, black ink, and one proof-mark blue.

### Primary
- **Signal Blue** (`#1F4BFF`): links, active marks, the scroll progress line, key numbers, the hero accent, and the only saturated color in the UI. Used sparingly.
- **Blue on Ink** (`#7C90FF`): the same signal on dark bands, lightened just enough to hold contrast.

### Neutral
- **Paper** (`#F7F6F2`): the default page and light bands. Never pure white.
- **Paper 2** (`#F1EFE9`): quiet tonal separation inside paper sections.
- **Paper 3** (`#E9E6DE`): ghost numerals, image mats, and the lightest structural fields.
- **Ink** (`#0B0B0B`): primary text, structural rules, and full-bleed dark bands.
- **Ink Soft** (`#2A2A2A`): body copy and secondary headings.
- **Muted** (`#6B6B6B`): captions, metadata, and inactive navigation.
- **Rule** (`#D8D5CF`): internal hairlines on paper.
- **Rule Dark** (`#2C2C2C`): hairlines and dividers on ink.

**The One Blue Rule.** Blue is a proof mark, not a brand wash. It may underline a link, fill the progress bar, color one hero word, mark a chart node, or highlight one result. If two blues compete on a screen, remove one.

**The Color-in-Monochrome Rule.** Interface remains monochrome; human and product photography stays in color. The portrait is never grayscale.

## Typography

**Display Font:** DM Serif Display, with Noto Serif SC / Songti SC / STSong for Chinese.
**Body Font:** Geist, with PingFang SC / Noto Sans SC / Microsoft YaHei.
**Mono Font:** Geist Mono for labels, indices, dates, metrics, and terminal traces.

**Character:** One serif voice gives the record authority; the sans face keeps long reading calm; mono is evidence, never costume. Chinese and English share the same hierarchy, tracking, and line rhythm.

### Hierarchy
- **Display / hero** (400, `clamp(78px, 13.2vw, 218px)`, 0.84, -0.06em): the `交付记录` cover, the `70 秒，去了哪里？` data story, the contact line. It may exceed the container visually via clipped line boxes.
- **Section** (400, `clamp(40px, 6vw, 88px)`, 1.02, -0.04em): major section titles; max width about 18 characters.
- **Statement** (400, `clamp(32px, 4.4vw, 64px)`, 1.12, -0.03em): rotating judgments on the dark band.
- **Lede** (400, `clamp(20px, 2.5vw, 40px)`, 1.1): the one-sentence positioning line; balanced, max ~16em.
- **Body** (400, 16px, 1.6): reading copy; long prose stays near 46–65ch.
- **Label** (400 mono, 11px, 0.08em, uppercase): kickers, indices, metadata, button labels. Chinese metadata may use the body face at 11–12px when needed for legibility.
- **Metric** (400 serif or mono, `clamp(48px, 7vw, 112px)`): proof values; tabular figures in mono where values align.

**The One Serif Weight Rule.** Display serif is always 400. No bold, no italic accent inside a roman line, no second display face. Emphasis comes from scale, space, color, and motion.

## Layout

- Container: `min(calc(100% - 2 * gutter), 1600px)`; gutter `clamp(20px, 4vw, 64px)`.
- Section rhythm: `clamp(96px, 12vw, 200px)`; the hero deliberately breaks it with a full-viewport stage.
- Fixed header height: 64px; the hero uses `100svh - 64px`.
- Grid: asymmetric editorial columns, never centered card stacks. Hero is text-left / portrait-right; the data story is sticky title-left / chart-right; the method is a circular diagram with four nodes; about is portrait-left / copy-right.
- Full-bleed ink bands (`#0B0B0B`) close the page: flagship story, ecosystem constellation, statement, contact.
- Hairlines are 1px, square geometry is mandatory. Images use square frames and 1px borders.
- At `1024px` and below the layout becomes a single column; at `640px` labels tighten, the portrait takes full width, and the resume tile scales down to keep its title on one line.

## Elevation & Depth

Flat by default. There are no shadows, glows, blurs, or translucent cards. Depth comes from:
- **Overlap:** the outlined `RECORD` ghost behind the hero, the giant ghost index number behind the rotating statement, the portrait overlapping the contour field.
- **Inversion:** a paper section followed by an ink section; hover inverts a row or tile.
- **Motion:** the pinned gallery and the scroll-scrubbed chart create temporal depth without adding visual chrome.
- **Grain:** a fixed 3.2% procedural grain overlay unifies paper, photography, and dark bands. It must stay below text and never intercept pointer events.

## Shapes

Everything is a right angle except two circles: the custom cursor ring and the delivery-loop orbit. Controls, tags, image frames, and banners are square with 0 radius. The signature marks are:
- a 1px ink rule above section heads;
- two blue corner brackets on the portrait;
- a blue scroll-progress line at the top edge;
- a dashed center ellipse and neighbor links in the tool constellation;
- a single blue arc in the delivery loop.

## Motion

Motion is part of the identity and follows one rule: **the page performs evidence, then gets out of the way.**

- **Hero:** contour field canvas with pointer ripple; line-by-line serif rise; portrait clip reveal; small meta fades. 30fps canvas, DPR capped at 2, paused when offscreen.
- **Work reel:** duplicated image strip with CSS marquee; decorative and hidden from the accessibility tree and tab order.
- **Pinned gallery:** desktop fine-pointer only; sticky stage plus a scroll-mapped `--p`; native horizontal rail elsewhere; focus moves the rail to the card.
- **Flagship story:** sticky stage with a scroll-scrubbed performance curve, point reveal, scan line, and three stage labels; direct DOM updates, no per-frame React renders.
- **Ecosystem:** canvas constellation of real tool names; pointer pull; labels omitted on small screens; static draw under reduced motion.
- **Statement:** serif judgments rotate every 6.5s; pause on hover/focus; manual tabs with `aria-pressed`.
- **Cursor:** a difference-blend ring that grows over links; only on fine pointers and not under reduced motion.
- **Reduced motion:** all marquees stop, reveal animations are disabled, the gallery unpins to a native rail, the scene shows its final result, and the cursor does not render. No content depends on animation.
- **No JS:** all copy, metrics, cards, and the final chart state are present in the static export.

## Homepage Sequence

1. **Hero** — `交付记录`, one positioning sentence, two actions, color portrait, contour field, and a ghost `RECORD`.
2. **Reel** — a moving strip of real case images.
3. **Proof band** — four numbers with count-up: `70+ → 9.96s`, `2,041`, `0`, `225`.
4. **Pinned gallery** — three featured cases; image-led cards with index, category, period, and at most two metrics.
5. **Flagship story (ink)** — `70 秒，去了哪里？`, the four-step performance ladder, three trace findings, final `9.96s / P95 14.46s`, and the scope note.
6. **Method loop** — Brief / Build / Eval / Handoff as a circular delivery diagram with artifacts.
7. **Ecosystem (ink)** — tool constellation plus two counter-rotating marquees.
8. **Evidence** — giant GitHub/PR/bug stats and a ledger foot.
9. **Statement** — three working judgments in large serif.
10. **About** — color portrait, short off-duty note, facts, spinning `∞`.
11. **Contact (ink)** — giant title, email, links, marquee, back to top.

## Components

### Buttons and Links
Square, 1px ink border or ink fill, mono label, 48px height. Hover shifts the primary fill to signal blue; text links carry a 1px rule that turns blue. Focus uses a 3px blue outline with 4px offset.

### Gallery Card
Image at 4:3 inside a square 1px frame, meta row above the title, serif title, at most two metrics. Hover: image scales slightly, a blue `打开案例 ↗` cue appears. On touch, the cue is always visible.

### Resume Tile
A single bordered product tile on `/explorations`: blue mono kicker, large serif name and role, one-line description, and a blue arrow. It is the only resume entry point on the site body; the full resume lives at `/resume` and is print-optimized.

### Dark Bands
Full-bleed ink with paper text, `--r-rule-dark` hairlines, and blue-on-dark accents. No nested cards.

### Custom Cursor
30px difference-blend ring, 46px over interactive elements, fixed and pointer-events none. Hidden for coarse pointers and reduced motion.

### Scope Notes
- `/os` preserves the earlier Wenjun OS dossier skin. It is an easter egg, not a source of new brand decisions.
- `/resume` is a white-paper printable artifact with its own stylesheet; do not import the record skin into it.
- `components/portfolio/service-demo.module.css` is a deliberately separate simulated product UI used as case evidence.
- The old portfolio skin is legacy and must not define new surfaces.

## Do's and Don'ts

### Do:
- Show the craft before explaining the career: motion, scale, and composition carry the first impression.
- Keep the page visually driven; if a section is mostly paragraphs, convert it to numbers, images, or a diagram.
- Use real screenshots, real metrics, the color portrait, and explicit evidence boundaries.
- Keep blue rare and meaningful.
- Preserve SSR content and reduced-motion/no-JS parity for every effect.
- Keep the printable resume and `/os` working as separate surfaces.

### Don't:
- Don't turn the homepage into a long resume or a text dossier.
- Don't add shadows, rounded cards, pills, glass, gradients, logo walls, or invented client marks.
- Don't grayscale the portrait or human photography.
- Don't animate width/height/top/left; animate transform, opacity, clip-path, and custom properties.
- Don't let the custom cursor, grain, or canvas block selection, scrolling, or keyboard focus.
- Don't invent metrics, testimonials, client names, hobbies, or experience.
- Don't join unrelated metadata with middle dots in new copy; use slashes, commas, or separate rows.
