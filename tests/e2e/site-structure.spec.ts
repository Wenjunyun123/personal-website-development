import { expect, test } from "@playwright/test";

test("作品页遵循主张、三列能力、项目归档的独立报告逻辑", async ({ page }) => {
  await page.goto("/#works");
  await expect(page.getByRole("heading", { name: "1 Person + AI = One Delivery Team" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "BUSINESS MODELING" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "ENGINEERING DELIVERY" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "TEAM AGENTS" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "作品集" })).toBeVisible();
});

test("系统页首次进入后挂载真实可操作无限画布", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByLabel("Wenjun 无限系统画布")).toHaveCount(0);
  await page.evaluate(() => { window.location.hash = "system"; });
  const system = page.getByLabel("Wenjun 无限系统画布");
  await expect(system).toBeVisible();
  await expect(system.getByLabel("图层")).toBeVisible();
  await expect(system.getByLabel("点击小地图导航画布")).toBeVisible();
  await expect(system.getByLabel("可拖拽与缩放的卡片画布")).toBeVisible();
  await expect(system.getByRole("heading", { name: "多维表格 Team Agent" })).toBeVisible();
  await expect(system.getByText("模拟验证模型")).toBeVisible();
  await expect(system.getByAltText("游文君证件照")).toBeVisible();

  const timelineLayer = system.getByRole("button", { name: /从大一到 AI 交付现场/ });
  await timelineLayer.click();
  await expect(timelineLayer).toHaveAttribute("aria-pressed", "true");
  await expect(system.getByRole("heading", { name: "从大一到 AI 交付现场" })).toBeVisible();
  await expect(system.getByText("2025.07 — 10", { exact: true })).toBeVisible();

  const githubLayer = system.getByRole("button", { name: /GitHub 贡献证据/ });
  await githubLayer.click();
  await expect(githubLayer).toHaveAttribute("aria-pressed", "true");
  await expect(system.getByRole("heading", { name: "GitHub 贡献证据" })).toBeVisible();
  await expect(system.getByRole("link", { name: /usewhale\/Whale#266/ })).toHaveAttribute("href", "https://github.com/usewhale/Whale/pull/266");
  await expect(system.getByRole("link", { name: /freestylefly\/wesight#20/ })).toHaveAttribute("href", "https://github.com/freestylefly/wesight/issues/20");

  const deliveryLayer = system.getByRole("button", { name: /飞书 CLI × GitHub CLI/ });
  await deliveryLayer.click();
  await expect(deliveryLayer).toHaveAttribute("aria-pressed", "true");

  const zoom = page.getByLabel("当前缩放比例");
  const before = await zoom.textContent();
  await page.getByRole("button", { name: "放大画布" }).click();
  await expect(zoom).not.toHaveText(before ?? "");

  await system.getByRole("button", { name: "新建卡片" }).first().click();
  await expect(system.getByText("选择卡片模板")).toBeVisible();
  await system.getByRole("button", { name: "便签" }).click();
  await expect(system.getByRole("button", { name: /新便签/ })).toBeVisible();
  await system.getByRole("button", { name: "撤销" }).click();
  await expect(system.getByRole("button", { name: /新便签/ })).toHaveCount(0);
});

test("系统页在移动端仍保留 Layers 与画布坐标系", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#system");
  const system = page.getByLabel("Wenjun 无限系统画布");
  const layers = system.getByLabel("图层");
  const canvas = system.getByLabel("可拖拽与缩放的卡片画布");
  await expect(layers).toBeVisible();
  await expect(canvas).toBeVisible();
  await expect(layers).toHaveCSS("width", "220px");
  const [layersBox, canvasBox] = await Promise.all([layers.boundingBox(), canvas.boundingBox()]);
  expect(layersBox?.x).toBe(0);
  expect(canvasBox?.x).toBeGreaterThanOrEqual(220);
});

test("公开简历包含丰富履历且不公开敏感字段", async ({ page }) => {
  await page.goto("/resume/");
  await expect(page.getByRole("heading", { name: /游文君/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: "工作经历" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "旗舰项目" })).toBeVisible();
  await expect(page.getByText("上海易宠科技有限公司")).toBeVisible();
  await expect(page.getByText("上海杉达学院 · 电子商务本科")).toBeVisible();
  await expect(page.getByText("2025 全国英语作文大赛本科组省二等奖")).toBeVisible();
  await expect(page.getByText("AI 公益海报创意设计大赛二等奖")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/19985280970/);
});
