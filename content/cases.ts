export const evidenceStatuses = [
  "resume-supported",
  "github-supported",
  "user-provided-pending-transcript",
  "draft-internal"
] as const;

export type EvidenceStatus = (typeof evidenceStatuses)[number];

export type CaseStudy = {
  title: string;
  slug: string;
  role: string;
  platforms: string[];
  evidenceStatus: EvidenceStatus;
  problem: string;
  productDecision: string;
  interface: string;
  technicalBuild: string;
  outcome: string;
  sources: string[];
};

export const cases: CaseStudy[] = [
  {
    title: "Adobe/Canva Plugin Release Command Center",
    slug: "adobe-canva-release-command-center",
    role: "Flagship case",
    platforms: ["Adobe Express add-ons", "Canva Apps", "Office Add-ins", "Safari WebExtension"],
    evidenceStatus: "github-supported",
    problem:
      "A multi-platform plugin matrix created review risk, package/version drift, unclear release state, and handoff evidence gaps.",
    productDecision:
      "Turn release follow-up into a Release Command Center with status checks, package evidence, risk priority, and queue control.",
    interface:
      "A compact command-center view of package checks, risk queue status, and handoff evidence for plugin release governance.",
    technicalBuild:
      "TypeScript and React plugin frontends, manifest/package/zip validation, lint/types/tests/build checks, GitHub and Codeup collaboration, and structured evidence handoff.",
    outcome:
      "Release ambiguity is reduced through visible status, clearer handoff, stronger auditability, and source-backed release decisions.",
    sources: [
      "Resume: C:\\Users\\Y.Daria\\Desktop\\resume_v5\\03_FDE.pdf",
      "GitHub organization: https://github.com/orgs/YiChongmimi/repositories"
    ]
  },
  {
    title: "Lark Base Agent Operations",
    slug: "lark-base-agent-operations",
    role: "Operations automation case",
    platforms: ["Feishu/Lark Base", "Base intelligent agents", "Lark CLI/API"],
    evidenceStatus: "user-provided-pending-transcript",
    problem:
      "Repeated operational updates and status coordination become slow and error-prone when table records are maintained manually.",
    productDecision:
      "Make Feishu/Lark Base the structured source of truth, then use Base agents and automation to execute tasks and surface next actions.",
    interface:
      "Base table views, task states, agent action logs, and exception queues that make automation progress visible to operators.",
    technicalBuild:
      "Feishu/Lark Base workflows, CLI or API-driven task execution, automation rules, status updates, and evidence capture.",
    outcome:
      "The intended result is a faster operational loop with clearer ownership, but the public case needs transcript or screenshot evidence before final publication.",
    sources: [
      "Resume: C:\\Users\\Y.Daria\\Desktop\\resume_v5\\03_FDE.pdf",
      "User-provided Douyin source pending transcript: https://www.douyin.com/video/7657756936452017458"
    ]
  },
  {
    title: "Hermes + Lark CLI Automation System",
    slug: "hermes-lark-cli-automation",
    role: "Agent orchestration case",
    platforms: ["Hermes", "Feishu/Lark CLI", "Agent workflow operations"],
    evidenceStatus: "draft-internal",
    problem:
      "Repeated operational tasks need both agent planning and reliable execution inside Feishu/Lark surfaces.",
    productDecision:
      "Combine Hermes-style orchestration with Lark CLI execution so the agent can plan, execute, verify, and report repeated work.",
    interface:
      "An agent run timeline with Lark CLI action cards, verification status, and a structured handoff summary.",
    technicalBuild:
      "Hermes workflow orchestration, Lark CLI command execution, status verification, operational logs, and handoff generation.",
    outcome:
      "The target outcome is repeatable operational automation, but the case remains draft/internal until workflow artifacts are provided.",
    sources: ["User-confirmed design direction", "Resume supports broader Agent workflow and Feishu ecosystem experience"]
  }
];
