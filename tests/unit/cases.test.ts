import { describe, expect, test } from "vitest";
import { cases, evidenceStatuses } from "../../content/cases";

const requiredSpine = ["problem", "productDecision", "interface", "technicalBuild", "outcome"] as const;

describe("selected case set", () => {
  test("contains the three source-backed case records for the first version", () => {
    expect(cases.map((caseStudy) => caseStudy.slug)).toEqual([
      "lark-github-cli-delivery-loop",
      "lark-base-team-agent-commerce-ops",
      "adobe-canva-release-command-center"
    ]);
  });

  test("keeps every case on the agreed case study spine", () => {
    for (const caseStudy of cases) {
      expect(caseStudy.title).toBeTruthy();
      expect(caseStudy.role).toBeTruthy();
      expect(caseStudy.platforms.length).toBeGreaterThan(0);
      expect(evidenceStatuses).toContain(caseStudy.evidenceStatus);

      for (const field of requiredSpine) {
        expect(caseStudy[field].length).toBeGreaterThan(20);
      }
    }
  });

  test("labels practice evidence honestly", () => {
    expect(cases.find((caseStudy) => caseStudy.slug === "lark-github-cli-delivery-loop")?.evidenceStatus).toBe(
      "user-confirmed-practice"
    );
    expect(cases.find((caseStudy) => caseStudy.slug === "lark-base-team-agent-commerce-ops")?.evidenceStatus).toBe(
      "draft-internal"
    );
    expect(cases.find((caseStudy) => caseStudy.slug === "adobe-canva-release-command-center")?.evidenceStatus).toBe(
      "resume-supported"
    );
  });
});
