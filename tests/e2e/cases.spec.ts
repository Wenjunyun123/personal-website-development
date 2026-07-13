import { expect, test } from "@playwright/test";

test("作品报告展示三个真实分层的旗舰案例", async ({ page }) => {
  await page.goto("/#works");
  await expect(page.getByRole("heading", { name: "作品集" })).toBeVisible();
  await expect(page.getByRole("link", { name: /飞书 CLI × GitHub CLI 交付闭环/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /飞书多维表格 Team Agent 电商经营实践/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Adobe \/ Canva 插件发布治理/ })).toBeVisible();
  await expect(page.getByText("模拟业务实践 · 实现中")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/19985280970/);

  await page.getByRole("link", { name: /飞书多维表格 Team Agent 电商经营实践/ }).click();
  await expect(page.getByRole("heading", { name: "飞书多维表格 Team Agent 电商经营实践" })).toBeVisible();
  await expect(page.getByText("draft-internal")).toBeVisible();
  await expect(page.getByText(/这是实现目标，不是生产上线声明/)).toBeVisible();
});

test("飞书与 GitHub CLI 闭环拥有独立案例路径", async ({ page }) => {
  await page.goto("/cases/lark-github-cli-delivery-loop/");
  await expect(page.getByRole("heading", { name: "飞书 CLI × GitHub CLI 交付闭环" })).toBeVisible();
  await expect(page.getByText("user-confirmed-practice")).toBeVisible();
  await expect(page.getByText(/仓库证据没有回到需求开始的业务界面/)).toBeVisible();
});
