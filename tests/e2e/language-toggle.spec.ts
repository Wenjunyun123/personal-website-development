import { expect, test } from "@playwright/test";

test("案例详情可在中文与英文之间切换", async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem("site-language"));
  await page.goto("/cases/adobe-canva-release-command-center/");
  await expect(page.getByRole("heading", { name: "Adobe / Canva 插件发布治理" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
  await page.getByRole("button", { name: "English" }).click();
  await expect(page.getByRole("heading", { name: "Adobe / Canva Release Governance" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
