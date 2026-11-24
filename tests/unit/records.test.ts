import { describe, expect, test } from "vitest";
import {
  caseRecords,
  featuredRecords,
  getIndexRecord,
  indexRecords
} from "../../content/records";

describe("unified record index", () => {
  test("keeps every work and note route unique", () => {
    const hrefs = indexRecords.map((record) => record.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(new Set(indexRecords.map((record) => record.slug)).size).toBe(indexRecords.length);
  });

  test("canonicalizes the duplicate Adobe case to the work route", () => {
    const legacyCase = caseRecords.find(
      (record) => record.slug === "adobe-canva-release-command-center"
    );
    expect(legacyCase?.canonicalHref).toBe("/work/adobe-canva-release-command-center/");
    expect(getIndexRecord("adobe-canva-release-command-center")?.href).toBe(
      "/work/adobe-canva-release-command-center/"
    );
  });

  test("does not expose local resume paths as public case sources", () => {
    for (const record of caseRecords) {
      for (const source of record.sources ?? []) {
        expect(source.url.startsWith("http")).toBe(true);
        expect(source.url).not.toMatch(/[A-Z]:\\/);
      }
    }
  });

  test("features exactly three delivery records for the home gallery", () => {
    expect(featuredRecords.map((record) => record.slug)).toEqual([
      "feishu-customer-service-gateway",
      "enterprise-data-migration-dashboards",
      "customer-service-evaluation"
    ]);
    expect(featuredRecords.filter((record) => record.kind === "work")).toHaveLength(2);
  });

  test("keeps the duplicate Adobe slug titles distinct by route", () => {
    const work = getIndexRecord("adobe-canva-release-command-center");
    const legacy = caseRecords.find(
      (record) => record.slug === "adobe-canva-release-command-center"
    );
    expect(work?.titleZh).toBe("多平台插件交付与发布治理");
    expect(legacy?.titleZh).toBe("Adobe / Canva 插件发布治理");
  });
});
