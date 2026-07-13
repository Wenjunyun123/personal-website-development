import { expect, test } from "@playwright/test";

test("首页按终端启动、个人桌面、滚动退出的逻辑工作", async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem("wenjun-os-visited"));
  await page.goto("/");

  const terminal = page.getByLabel("Wenjun OS 启动终端");
  await expect(terminal).toBeVisible();
  await page.getByRole("button", { name: /跳过终端输入动画/ }).click();
  await expect(terminal.getByText(/游文君 Wenjun You/)).toBeVisible();
  await expect(terminal.getByText(/AI 交付工程师（FDE）/)).toBeVisible();
  await expect(page.getByRole("navigation", { name: "个人网站场景" })).toBeVisible();

  await page.keyboard.press("Enter");
  const desktop = page.getByLabel("Wenjun OS desktop");
  await expect(desktop).toBeVisible({ timeout: 5_000 });
  await expect(page.getByRole("button", { name: /飞书-GitHub闭环/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Team Agent/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "拖动游文君的个人卡片" })).toHaveCount(0);

  await page.getByRole("button", { name: /about\.md/ }).dblclick();
  await expect(page.getByRole("heading", { name: "游文君" })).toBeVisible();
  await expect(page.getByText(/把模糊业务需求拆成界面、智能体、自动化/)).toBeVisible();
  await expect(page.getByRole("link", { name: "wenjunyou2002@outlook.com" })).toHaveAttribute("href", /^mailto:/);

  const aboutWindow = page.getByLabel("about.md window");
  await expect(aboutWindow).toHaveAttribute("data-window-state", "normal");
  await expect(aboutWindow.getByRole("button", { name: "关闭窗口：about.md" })).toBeVisible();
  await expect(aboutWindow.getByText("×")).toHaveCount(1);

  await aboutWindow.getByRole("button", { name: "最小化窗口：about.md" }).click();
  await expect(aboutWindow).toHaveAttribute("data-window-state", "minimized");
  await expect(page.getByRole("heading", { name: "游文君" })).toBeHidden();

  await aboutWindow.getByRole("button", { name: "恢复窗口：about.md" }).click();
  await expect(aboutWindow).toHaveAttribute("data-window-state", "normal");
  await aboutWindow.getByRole("button", { name: "最大化窗口：about.md" }).click();
  await expect(aboutWindow).toHaveAttribute("data-window-state", "maximized");
  await expect(aboutWindow).toHaveCSS("top", "30px");

  await aboutWindow.getByRole("button", { name: "恢复窗口：about.md" }).click();
  await expect(aboutWindow).toHaveAttribute("data-window-state", "normal");
  await aboutWindow.getByRole("button", { name: "关闭窗口：about.md" }).click();
  await expect(aboutWindow).toHaveCount(0);

  await page.getByRole("button", { name: /经历时间轴/ }).dblclick();
  const timelineWindow = page.getByLabel("经历时间轴 window");
  await expect(timelineWindow.getByRole("heading", { name: "从大一到 AI 交付现场" })).toBeVisible();
  await expect(timelineWindow.getByText("大一 · 本科阶段从这里开始")).toBeVisible();
  await expect(timelineWindow.getByText("集成电路创新大赛 · 龙芯杯")).toBeVisible();
  await expect(timelineWindow.getByText("上海凯淳实业股份有限公司 · K.AI 智能实验室")).toBeVisible();
  await timelineWindow.getByRole("button", { name: "关闭窗口：经历时间轴" }).click();

  await page.getByRole("button", { name: /开源贡献/ }).dblclick();
  const githubWindow = page.getByLabel("开源贡献 window");
  await expect(githubWindow.getByRole("heading", { name: "开源贡献账本" })).toBeVisible();
  await expect(githubWindow.getByText("外部仓库已合并 PR")).toBeVisible();
  await expect(githubWindow.getByText(/933.*不作为“公开代码提交数”/)).toBeVisible();
  await expect(githubWindow.getByRole("link", { name: /usewhale\/Whale#266/ })).toHaveAttribute("href", "https://github.com/usewhale/Whale/pull/266");
  await expect(githubWindow.getByRole("link", { name: /freestylefly\/wesight#20/ })).toHaveAttribute("href", "https://github.com/freestylefly/wesight/issues/20");
});
