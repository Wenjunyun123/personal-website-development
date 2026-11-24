import { expect, test } from "@playwright/test";

test("交付记录首页展示封面、导航、数字带与精选项目", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: /交付记录/ })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "主导航" })).toBeVisible();
  await expect(page.locator("#proof").getByText("70+ → 9.96s", { exact: true })).toBeVisible();
  await expect(page.locator("#proof").getByText("2,041", { exact: true })).toBeVisible();
  await expect(
    page.locator("#proof").getByText("未解释差异", { exact: true })
  ).toBeVisible();
  await expect(page.locator("#proof").getByText("225", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /企业智能客服与 AI 资料查询：从 70\+ 秒到 10 秒/ })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /全部项目/ })).toBeVisible();
});

test("交付记录首页可在中英文之间切换", async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem("site-language"));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");

  await page.getByRole("button", { name: "English" }).click();
  await expect(page.getByRole("heading", { level: 1, name: /THE RECORD/ })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
});

test("移动端首页无横向溢出，标题和主 CTA 可见", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: /交付记录/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /看交付记录/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "打开目录" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
