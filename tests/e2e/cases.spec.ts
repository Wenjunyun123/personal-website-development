import { expect, test } from "@playwright/test";

test("项目说明保留培训与实习证据边界，流程演示可走完", async ({ page }) => {
  await page.goto("/explorations/");
  await expect(page.getByText("培训实践 · 已做闭环验证")).toBeVisible();
  await page.getByRole("link", { name: /飞书 IT 服务工单系统/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "飞书 IT 服务工单系统" })).toBeVisible();
  await expect(page.getByText(/不代表客户生产运营指标/)).toBeVisible();
  const demo = page.getByRole("region", { name: "工单流程交互演示" });
  await demo.getByRole("button", { name: "分派并开始处理" }).click();
  await expect(demo.getByText("处理中", { exact: true })).toBeVisible();
  await demo.getByRole("button", { name: "完成处理", exact: true }).click();
  await expect(demo.getByRole("status")).toContainText("流程闭环");
  await demo.getByRole("button", { name: "运行日志", exact: true }).click();
  await expect(demo.getByText("完成处理，回写结束时间")).toBeVisible();
  await demo.getByRole("button", { name: "工单处理", exact: true }).click();
  await demo.getByRole("button", { name: "重新体验" }).click();
  await expect(demo.getByRole("button", { name: "分派并开始处理" })).toBeVisible();
});

test("精选项目优先展示当前交付，案例区分真实记录与示意", async ({ page }) => {
  await page.goto("/selected/");
  await page.getByRole("link", { name: /企业级智能客服：评测、诊断与稳定性治理/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "企业级智能客服：评测、诊断与稳定性治理" })).toBeVisible();
  await expect(page.getByText("客户交付 · 脱敏展示", { exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: "智能客服接入结构示意" })).toBeVisible();
  await page.getByRole("link", { name: "返回", exact: true }).click();
  await expect(page).toHaveURL(/\/selected\//);
  await page.getByRole("link", { name: /产品知识工程与 AI 资料查询台/ }).click();
  await expect(page.getByRole("region", { name: "产品知识工程结构示意" })).toBeVisible();
  await page.getByRole("link", { name: "返回", exact: true }).click();
  await page.getByRole("link", { name: /企业数据迁移与业务看板/ }).click();
  await expect(page.getByRole("region", { name: "企业数据迁移与业务看板结构示意" })).toBeVisible();
  await page.goto("/explorations/");
  await page.getByRole("link", { name: /先修测评工具，再判断智能体/ }).click();
  await expect(page.getByText(/不据此宣称生产环境整体提速或准确率提升/)).toBeVisible();
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Fixing the evaluator before judging the agent" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Evaluation measurement diagram" })).toBeVisible();
});

test("旧案例链接继续有效，并诚实标注模拟业务状态", async ({ page }) => {
  await page.goto("/cases/lark-base-team-agent-commerce-ops/");
  await expect(page.getByRole("heading", { name: "飞书多维表格 Team Agent 电商经营实践" })).toBeVisible();
  await expect(page.getByText("draft-internal")).toBeVisible();
  await expect(page.getByText(/这是实现目标，不是生产上线声明/)).toBeVisible();
});
