import { cases, type CaseStudy } from "./cases";
import {
  portfolioNotes,
  portfolioWork,
  type PortfolioStory
} from "./portfolio";

export type RecordSection = {
  title: string;
  titleZh: string;
  text: string;
  textZh: string;
};

export type RecordMetric = readonly [string, string];
export type RecordSource = { label: string; url: string };
export type RecordPreview =
  | "gateway"
  | "migration"
  | "evaluation"
  | "service"
  | "architecture"
  | "release"
  | "case";

export type RecordStory = {
  slug: string;
  href: string;
  canonicalHref: string;
  title: string;
  titleZh: string;
  period: string;
  category: string;
  categoryZh: string;
  summary: string;
  summaryZh: string;
  tags: readonly string[];
  image?: string;
  metrics?: readonly RecordMetric[];
  sections: readonly RecordSection[];
  sources?: readonly RecordSource[];
  backHref: string;
  backLabel: string;
  backLabelZh: string;
  preview: RecordPreview;
  kind: "work" | "note" | "case";
  evidenceStatus?: string;
  platforms?: readonly string[];
  featured?: boolean;
};

const previewBySlug: Record<string, RecordPreview> = {
  "feishu-customer-service-gateway": "gateway",
  "enterprise-data-migration-dashboards": "migration",
  "customer-service-evaluation": "evaluation",
  "feishu-service-desk": "service",
  "aily-knowledge-and-actions": "architecture",
  "adobe-canva-release-command-center": "release"
};

function portfolioToRecord(
  story: PortfolioStory,
  kind: "work" | "note"
): RecordStory {
  return {
    slug: story.slug,
    href: `/work/${story.slug}/`,
    canonicalHref: `/work/${story.slug}/`,
    title: story.title,
    titleZh: story.titleZh,
    period: story.period,
    category: story.category,
    categoryZh: story.categoryZh,
    summary: story.summary,
    summaryZh: story.summaryZh,
    tags: story.tags,
    image: story.image,
    metrics: "metrics" in story ? story.metrics : undefined,
    sections: story.sections,
    sources: "sources" in story ? story.sources : undefined,
    backHref: kind === "work" ? "/selected/" : "/explorations/",
    backLabel: "Back",
    backLabelZh: "返回",
    preview: previewBySlug[story.slug] ?? "release",
    kind,
    featured: kind === "work"
  };
}

function caseToRecord(caseStudy: CaseStudy): RecordStory {
  const sources = caseStudy.sources
    .filter((source) => source.startsWith("http"))
    .map((source) => ({ label: source, url: source }));

  return {
    slug: caseStudy.slug,
    href: `/cases/${caseStudy.slug}/`,
    canonicalHref:
      caseStudy.slug === "adobe-canva-release-command-center"
        ? "/work/adobe-canva-release-command-center/"
        : `/cases/${caseStudy.slug}/`,
    title: caseStudy.title,
    titleZh: caseStudy.titleZh,
    period: "2026",
    category: caseStudy.role,
    categoryZh: caseStudy.roleZh,
    summary: caseStudy.productDecision,
    summaryZh: caseStudy.productDecisionZh,
    tags: caseStudy.platforms,
    sections: [
      {
        title: "Problem",
        titleZh: "问题",
        text: caseStudy.problem,
        textZh: caseStudy.problemZh
      },
      {
        title: "Product decision",
        titleZh: "产品决策",
        text: caseStudy.productDecision,
        textZh: caseStudy.productDecisionZh
      },
      {
        title: "Interface",
        titleZh: "界面",
        text: caseStudy.interface,
        textZh: caseStudy.interfaceZh
      },
      {
        title: "Technical build",
        titleZh: "技术实现",
        text: caseStudy.technicalBuild,
        textZh: caseStudy.technicalBuildZh
      },
      {
        title: "Outcome and scope",
        titleZh: "结果与边界",
        text: caseStudy.outcome,
        textZh: caseStudy.outcomeZh
      }
    ],
    sources,
    backHref: "/selected/",
    backLabel: "Back",
    backLabelZh: "返回",
    preview: "case",
    kind: "case",
    evidenceStatus: caseStudy.evidenceStatus,
    platforms: caseStudy.platforms
  };
}

export const indexRecords: readonly RecordStory[] = [
  ...portfolioWork.map((story) => portfolioToRecord(story, "work")),
  ...portfolioNotes.map((story) => portfolioToRecord(story, "note"))
];

const featuredSlugs = [
  "feishu-customer-service-gateway",
  "enterprise-data-migration-dashboards",
  "customer-service-evaluation"
];

export const featuredRecords: readonly RecordStory[] = featuredSlugs
  .map((slug) => indexRecords.find((record) => record.slug === slug))
  .filter((record): record is RecordStory => Boolean(record));

export const caseRecords: readonly RecordStory[] = cases.map(caseToRecord);

export function getIndexRecord(slug: string): RecordStory | undefined {
  return indexRecords.find((record) => record.slug === slug);
}

export function getCaseRecord(slug: string): RecordStory | undefined {
  return caseRecords.find((record) => record.slug === slug);
}

export function getNextIndexRecord(slug: string): RecordStory {
  const current = indexRecords.findIndex((record) => record.slug === slug);
  const next = current < 0 ? 0 : (current + 1) % indexRecords.length;
  return indexRecords[next];
}
