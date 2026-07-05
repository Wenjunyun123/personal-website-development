import { describe, expect, test } from "vitest";
import { cases, evidenceStatuses } from "../../content/cases";

const requiredSpine = ["problem", "productDecision", "interface", "technicalBuild", "outcome"] as const;

describe("selected case set", () => {
  test("contains the three source-backed case records for the first version", () => {
    expect(cases.map((caseStudy) => caseStudy.slug)).toEqual([
      "adobe-canva-release-command-center",
      "lark-base-agent-operations",
      "hermes-lark-cli-automation"
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

  test("labels unfinished Lark and Hermes evidence honestly", () => {
    expect(cases.find((caseStudy) => caseStudy.slug === "lark-base-agent-operations")?.evidenceStatus).toBe(
      "user-provided-pending-transcript"
    );
    expect(cases.find((caseStudy) => caseStudy.slug === "hermes-lark-cli-automation")?.evidenceStatus).toBe(
      "draft-internal"
    );
  });
});
