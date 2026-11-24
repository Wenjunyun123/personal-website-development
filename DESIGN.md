---
name: Wenjun OS
description: Editorial dossier for an AI application delivery engineer
colors:
  oat-paper: "oklch(96.5% 0.014 82)"
  warm-paper: "oklch(93.5% 0.018 80)"
  deep-paper: "oklch(89% 0.022 78)"
  ink: "oklch(18% 0.012 60)"
  ink-soft: "oklch(29% 0.012 60)"
  muted-ink: "oklch(47% 0.014 65)"
  hairline: "oklch(81% 0.016 75)"
  hairline-strong: "oklch(62% 0.018 72)"
  signal-blue: "oklch(44% 0.16 262)"
  focus-blue: "oklch(50% 0.16 262)"
  paper-on-ink: "oklch(97% 0.012 82)"
  ledger-red: "oklch(45% 0.16 28)"
typography:
  display:
    fontFamily: "DM Serif Display, Noto Serif SC, Songti SC, STSong, serif"
    fontSize: "clamp(44px, 4.6vw, 70px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "DM Serif Display, Noto Serif SC, Songti SC, STSong, serif"
    fontSize: "clamp(28px, 3.2vw, 40px)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.02em"
  title:
    fontFamily: "DM Serif Display, Noto Serif SC, Songti SC, STSong, serif"
    fontSize: "21px"
    fontWeight: 400
    lineHeight: 1.18
    letterSpacing: "-0.01em"
  file:
    fontFamily: "DM Serif Display, Noto Serif SC, Songti SC, STSong, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  stat:
    fontFamily: "DM Serif Display, Noto Serif SC, Songti SC, STSong, serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "Geist, PingFang SC, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Geist, PingFang SC, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
  mono:
    fontFamily: "Geist Mono, SFMono-Regular, Consolas, monospace"
    fontSize: "10.5px"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  control: "0"
  card: "0"
  avatar: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
  gutter: "clamp(20px, 4.5vw, 64px)"
  section: "clamp(72px, 9vw, 144px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.oat-paper}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.signal-blue}"
  button-text:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
  nav-tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted-ink}"
    rounded: "{rounded.control}"
    padding: "0 14px"
    height: "64px"
    typography: "{typography.label}"
  file-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "15px 10px"
    typography: "{typography.file}"
  dossier-window:
    backgroundColor: "{colors.oat-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "30px 34px 40px"
    size: "min(760px, calc(100% - 48px))"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.control}"
    padding: "5px 8px"
    typography: "{typography.label}"
  exit-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.oat-paper}"
    padding: "clamp(80px, 10vw, 150px) var(--gutter)"
---

# Design System: Wenjun OS

## Overview

**Creative North Star: "The Editorial Dossier"**

Wenjun OS is a personal delivery record set as an editorial case file. It treats a career as evidence: projects arrive as numbered dossiers, metrics sit beside the claim they support, and the interface borrows the grammar of a printed index — warm paper, razor serif, hairline rules, one ink-blue signal. The person is present, but never as decoration: a portrait, a margin note, a motto, and a working terminal are enough.

The system is deliberately flat. There are no floating cards, shadows, glows, glass, or gradient type. Depth comes from overlap: fixed dossier windows stack over the paper desktop, the dark exit band closes the record, and a single blue accent marks the live path. The older detective costume — navy board, red string, stamps, a fake laptop — is the explicit anti-reference; the current site keeps the case-file idea but sets it as an editorial system rather than a prop.

Chinese and English share one voice. Display lines use DM Serif Display for Latin and Noto Serif SC for Chinese; body text uses Geist with PingFang SC / Noto Sans SC fallbacks; data, terminal output, and file names use Geist Mono. The mix should read as one publication, not two translations.

**Key Characteristics:**
- Warm paper and dark ink carry the page; blue is a signal, never a surface.
- Display serif at one weight, with tight, controlled tracking.
- Square geometry, one-pixel rules, and no shadows.
- Evidence is edited like content: numbers, screenshots, and case rows, not dashboard cards.
- The human margin — portrait, off-duty note, mottos — keeps the record personal.

## Colors

The palette is a warm paper stock printed in dark ink, with a single cool blue used as a proof mark. It should feel closer to an archive folder than to a SaaS dashboard.

### Primary
- **Signal Blue** (`signal-blue`): links, active marks, the one accented word in the opening, key numbers, and the hover state of the primary button. Its rarity is the signal.
- **Focus Blue** (`focus-blue`): the keyboard focus ring, always visible and never animated.

### Neutral
- **Oat Paper** (`oat-paper`): the page and window surface; the default background.
- **Warm Paper** (`warm-paper`): window headers, selected rows, and quiet tonal separation.
- **Deep Paper** (`deep-paper`): large watermark numerals and the ∞ mark in the exit band.
- **Ink** (`ink`): primary text, structural borders, and the dark exit band.
- **Soft Ink** (`ink-soft`): body copy and secondary labels.
- **Muted Ink** (`muted-ink`): captions, metadata, and inactive navigation.
- **Hairline** (`hairline`): internal dividers and the quieter window controls.
- **Strong Hairline** (`hairline-strong`): secondary rules and underline decoration.
- **Paper on Ink** (`paper-on-ink`): text and rules on the dark exit band.
- **Ledger Red** (`ledger-red`): a rare error/status color; it should not become a second accent.

**The One Blue Rule.** Signal Blue occupies roughly a tenth of any screen at most. It appears as a link, an active mark, one word, or a key number. A page with two competing blues is a page with no signal.

**The Paper Surface Rule.** Backgrounds are warm paper, not pure white. Pure white belongs to the printable resume and to image highlights; using it for the site surface breaks the archive metaphor.

## Typography

**Display Font:** DM Serif Display, with Noto Serif SC / Songti SC / STSong for Chinese.
**Body Font:** Geist, with PingFang SC / Noto Sans SC / Microsoft YaHei.
**Label / Mono Font:** Geist Mono for data, terminal output, file names, and timestamps.

**Character:** The pairing is editorial and unsentimental. The serif supplies authority and a little warmth; Geist keeps the interface legible and modern; the mono face is reserved for evidence, so it never becomes a "technical" costume.

### Hierarchy
- **Display** (400, `clamp(44px, 4.6vw, 70px)`, 1.02, -0.028em): hero statements, case names, and the exit line. The intro and exit may scale larger (`clamp(56px, 8.4vw, 124px)` and `clamp(48px, 6.4vw, 96px)`).
- **Headline** (400, `clamp(28px, 3.2vw, 40px)`, 1.06, -0.02em): dossier window titles and section openers.
- **Title** (400, 21px, 1.18, -0.01em): case rows, list entries, and subheads.
- **File** (400, 18px, 1.2, -0.01em): desktop file names and icon labels.
- **Stat** (400, 30px, 1): case-cover numbers and compact evidence figures.
- **Body** (400, 16px, 1.7): reading copy and interface text. Hero copy stays near 44–54ch; long prose can reach 65–75ch.
- **Label** (500, 11px, 1.4): captions, status, and navigation. Sentence case in Chinese; English uppercase only for literal status/ledger tokens.
- **Mono** (400, 10.5px, 1.55): terminal, metrics, dates, file names, and tabular numbers.

**Scale in practice.** The OS surface tops out in fluid clamps and still carries a band of intermediate sizes: 8.5–9.5px micro labels, 12.5–13.5px interface text, 14.5px reading copy, 17px and 19px titles, and 38px case numerals. Treat these as convergence debt, not as new tokens. The next visual pass should snap them to the eight roles above, or promote a value into the frontmatter only when it repeats across surfaces.

**The One Serif Voice Rule.** Display serif is always weight 400. Do not bold it, italicise one word inside a roman heading, or mix a second display face. Emphasis comes from size, space, and the single blue word.

**The Sentence-Case Label Rule.** Labels are set in the body face at 10.5–11px, sentence case, untracked. Uppercase is reserved for literal status or ledger tokens, never for decorative eyebrows.

## Layout

The site is a capped editorial page, not a full-bleed app. The container is `1440px`; gutters grow from `20px` to `64px` so the measure stays fixed at wide screens. The desktop home is a `7fr / 5fr` grid: the delivery thesis and evidence index on the left, the portrait and personal cover on the right. Facts and case metadata use two-column definition grids; the file index uses three columns, dropping to two at `1100px` and `640px`.

The page rhythm is `clamp(72px, 9vw, 144px)` between major sections. Hero spacing is tighter: the headline, one sentence, and primary action are all visible at `1280 × 800`; the case index begins below them. On mobile, the portrait cover follows the hero as a single column, dossier windows become `calc(100% - 24px)` wide, and the masthead tightens to one row.

The three-tab shell (home / works / my OS) is a fixed 64px masthead; the home desktop adds its own 64px menu bar below it. Dossier windows are fixed overlays at `760px` (`880px` for FDE), capped at `78vh`; they never resize the page behind them. The exit band is full-bleed ink, `clamp(80px, 10vw, 150px)` tall, and closes the document.

## Elevation & Depth

The system is flat by default. There is no `box-shadow` vocabulary, no glass, no blur, and no rounded floating card. Depth is conveyed by overlap and tone: dossier windows stack over the paper desktop with a 12% ink scrim, header bars use Warm Paper against the Oat Paper body, and the final section switches to an ink field with paper text.

**The Flat Dossier Rule.** Surfaces are flat at rest and in every state. If an element needs separation, use a 1px rule, a paper tone, or a change of ink — never a shadow, halo, or backdrop blur.

## Shapes

The form language is the right angle. Controls, tags, windows, images, and focus rings are square (`0` radius). The only circle in the system is the small avatar in the masthead (`50%`). Portraits are rectangles with a 1px hairline outline, not rounded cards. The recurring accents are a 2px blue left edge on a hovered file row, a 2px ink underline under the active nav tab, and a full 1px rule above a section.

**The Right Angle Rule.** Do not round a control, card, image, or window. If a shape feels too hard, reduce its weight with a hairline or more space, not with a radius.

## Components

### Buttons
- **Shape:** square (`0` radius).
- **Primary:** Ink fill, Oat Paper text, 44px minimum height, 20px horizontal padding, label-size text. Hover shifts the fill to Signal Blue.
- **Text button:** no fill or border; Soft Ink label with a Strong Hairline underline that turns Signal Blue on hover. Used for secondary actions such as "看交付记录".
- **Focus:** a 2px Focus Blue outline, offset 3px, visible on keyboard focus.

### Navigation
- **Masthead tabs:** 64px tall, fixed, Oat Paper background, a 1px Hairline bottom rule. Inactive tabs use Muted Ink; the active tab uses Ink plus a 2px Ink underline. Focus uses an inset 2px Focus Blue ring.
- **Desktop menu:** small sentence-case text links (Profile / Projects / Delivery / Off-duty), 12px, transparent underline that turns Signal Blue on hover.

### File Row
- **Shape:** a 20px icon column plus a text column, 15px vertical padding, a 1px Hairline bottom rule, and a 2px transparent left edge.
- **Typography:** File serif 18px for the name; a 10.5px Muted Ink action line below.
- **State:** hover turns the left edge Signal Blue and tints the row with Warm Paper at 52%.

### Dossier Window
- **Shape:** square, 1px Ink border, Oat Paper body, no shadow.
- **Header:** 48px, Warm Paper, 1px Ink bottom rule, three 26px square controls on the left and a mono file label.
- **Body:** 30px / 34px / 40px padding; 14.5px body copy; display serif headings. Maximum width 760px, 880px for the FDE dossier; maximum height 78vh.
- **Depth:** a fixed 12% Ink scrim behind the window; the window itself stays flat.

### Case Cover
- **Shape:** a portrait rectangle with a 1px Hairline outline, a 10.5px caption row, and a meta block separated by a 1px Ink top rule.
- **Typography:** Display name (`clamp(30px, 3vw, 42px)`), 11px Chinese name, 12px role, and 30px Stat numbers with 10.5px labels.
- **Personal margin:** the off-duty note sits below the stats, separated by a Hairline; it is a button with a 22px File line and a 10.5px action cue.

### Dossier Row
- **Shape:** 18px vertical padding, a 1px Hairline top rule, no card.
- **Content:** a mono index (`01`), a Title serif name, a 10.5px muted category, a body paragraph, and a mono evidence list.

### Tag
- **Shape:** 1px Hairline border, square, transparent background, 5px × 8px padding.
- **Typography:** 10.5px label in Soft Ink. Used for skills and evidence signals, never as a filter chip.

### Signature: Delivery Terminal
- **Shape:** a paper console with a 1px Ink border, a 32px header strip (brand, mode, year), and a mono body. A progress track and four stages (Brief / Build / Eval / Handoff) carry the launch state; `∞` is the completion mark.
- **Voice:** command lines in Soft Ink, outputs in muted text, the motto reversed out of an Ink chip in Oat Paper. The terminal is a working status device, not a decorative fake window.

### Exit Band
- **Shape:** full-bleed Ink with a 1px Paper-on-Ink top rule, a large `∞` watermark in Deep Paper at low opacity, and a paper-on-ink colophon.
- **Typography:** Display 48–96px for "Let's ship the loop.", 30px serif email, 13px links, 10px labels.

### Scope Note
The printable resume is a separate artifact: white paper, Arial, compact 14px body. It should remain print-friendly and should not import the dossier surface. The older `selected` / `explorations` portfolio skin is legacy; new brand surfaces use this system, not that skin.

Three live surfaces sit outside this system by design, and their out-of-system colors, sizes, and radii are not drift to normalize:

- `app/globals.css` and `components/portfolio/portfolio.module.css`: the legacy portfolio shell and its company-reference colors. They are imported globally but are superseded by `app/hallmark.css` on the OS surface.
- `components/portfolio/service-demo.module.css`: a simulated service-desk product UI, deliberately styled as a separate product rather than as Wenjun OS.
- `app/resume/resume.module.css`: the printable white-paper resume.

Anything new outside those three surfaces belongs to Wenjun OS and should use the tokens in this file.

## Do's and Don'ts

### Do:
- **Do** use the declared tokens for every new color, font, spacing step, and radius; no literal values in new components.
- **Do** keep structural borders at 1px Ink and internal divisions at 1px Hairline.
- **Do** set display copy at 400 weight with tracking between -0.02em and -0.03em.
- **Do** keep Signal Blue rare: links, active marks, one opening word, key numbers.
- **Do** show real screenshots, real metrics, and the portrait in color.
- **Do** let the dossier metaphor live in structure (case rows, evidence, terminal), not in decorative props.
- **Do** keep the first screen at 1280 × 800 to a headline, one sentence, and one primary action.

### Don't:
- **Don't** add shadows, rounded cards, pills, glass, blur, glow, or gradient text.
- **Don't** set labels in tracked uppercase; use sentence case at 10.5–11px.
- **Don't** use mono for headings or body copy; it is for data, terminal, file names, and timestamps.
- **Don't** invent metrics, testimonials, client names, logos, or personal hobbies.
- **Don't** use grayscale portraits.
- **Don't** let the legacy portfolio skin or the printable resume define a new brand surface.
- **Don't** join unrelated metadata with middle dots in new copy; use slashes, commas, or separate rows.
