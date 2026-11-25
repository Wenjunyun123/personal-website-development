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

test("首屏可跳转到飞书生态认证，证书可查看原图", async ({ page }) => {
  await page.goto("/");

  const heroLink = page.getByRole("link", { name: "飞书生态认证" });
  await expect(heroLink).toBeVisible();
  await heroLink.click();
  await expect(page).toHaveURL(/#credentials$/);

  const section = page.locator("#credentials");
  await expect(
    section.getByRole("heading", { level: 2, name: "证书，也是证据。" })
  ).toBeVisible();

  const csm = section.getByRole("link", { name: /飞书生态 CSM/ });
  await expect(csm).toHaveAttribute("href", "/credentials/feishu-csm-2026.png");
  const fde = section.getByRole("link", { name: /飞书生态 FDE/ });
  await expect(fde).toHaveAttribute("href", "/credentials/feishu-fde-2026.jpg");

  const images = section.locator("img");
  await expect(images).toHaveCount(2);
  await expect(images.nth(0)).toHaveAttribute("width", "556");
  await expect(images.nth(0)).toHaveAttribute("height", "798");
  await expect(images.nth(1)).toHaveAttribute("width", "704");
  await expect(images.nth(1)).toHaveAttribute("height", "1024");

  await expect(
    section.getByText("证书编号与验真二维码保留在原图；点击证书查看完整文件。")
  ).toBeVisible();
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

test("移动端精选案例纵向排列，不需要横向滑动", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const track = page.locator("#work").locator('[class*="galleryTrack"]');
  await expect(track).toBeVisible();
  const metrics = await track.evaluate((element) => ({
    display: getComputedStyle(element).display,
    overflowX: getComputedStyle(element).overflowX,
    scrollWidth: element.scrollWidth,
    clientWidth: element.clientWidth,
    columns: getComputedStyle(element).gridTemplateColumns.split(" ").length
  }));
  expect(metrics.display).toBe("grid");
  expect(metrics.overflowX).toBe("visible");
  expect(metrics.columns).toBe(1);
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);

  const cards = page.locator("[data-gallery-card]");
  expect(await cards.count()).toBe(3);
  const tops = await cards.evaluateAll((elements) =>
    elements.map((element) => Math.round(element.getBoundingClientRect().top + window.scrollY))
  );
  expect(new Set(tops).size).toBe(tops.length);
});

test("桌面端精选案例仍保持横向钉住", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  await expect(page.locator("#work [data-pinned]")).toHaveAttribute("data-pinned", "true");
});
