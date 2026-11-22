# Minimal FDE portfolio

Date: 2026-10-15; updated 2026-11-22
Status: accepted

## Decision

Use Nick Pyl’s live site as a structural reference: a narrow introductory column, small portrait, inline colored links, restrained typography, and two visual entrances. Keep the existing Next.js project and static export rather than introduce another stack. Preserve legacy case URLs.

The home page presents the owner as an **AI 应用交付工程师（FDE）** at 广州市负熵云信息科技有限公司, working onsite with a client. Feishu, Aily, and Base are tools in the delivery stack, not the public identity. Selected work uses a broader reading column and carries three delivery threads: enterprise customer service, product knowledge engineering, and data migration with business dashboards. Explorations carries plugin delivery, the IT service desk training project, the evaluator repair, the Aily architecture note, open-source contributions, and the full experience timeline.

## Deployment

- Production: GitHub Pages at `https://darioyou.cc/` through `.github/workflows/deploy-pages.yml`.
- Temporary preview: the existing Vercel project `personal-website-development`.
- The static export remains deployable to other static hosts; `vercel.json` only fixes the Vercel framework preset.

## Content boundaries

- Client work is anonymized on the public site: no client names, raw records, private research, or credentials.
- Case copy distinguishes training work, architecture proposals, internship records, and verified delivery.
- The frontend-only ticket example is explicitly marked as example data and has no external side effects.
- The public resume omits phone, birthday, gender, and hometown.

## Maintenance

Project stories live in one typed content file, `content/portfolio.ts`; experience and skill data live in `content/profile.ts`. No database, authentication, CMS, or live Feishu credentials are needed by the public website. Internal research, design evidence, and local agent folders stay outside the deploy bundle via `.vercelignore` and selective git staging.
