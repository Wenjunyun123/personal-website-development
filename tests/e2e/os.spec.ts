import { expect, test } from "@playwright/test";

test("OS 彩蛋按终端启动、个人桌面、FDE 交付窗口的逻辑工作", async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem("wenjun-os-visited"));
  await page.goto("/os/");

  const terminal = page.getByLabel("Wenjun OS 启动终端");
  await expect(terminal).toBeVisible();
  await page.getByRole("button", { name: /跳过终端输入动画/ }).click();
  await expect(terminal.getByText(/游文君 Wenjun You/)).toBeVisible();
  await expect(terminal.getByText(/AI 应用交付工程师（FDE）/)).toBeVisible();
  await expect(page.getByRole("navigation", { name: "个人网站场景" })).toBeVisible();
  await expect(page.getByRole("link", { name: "返回交付记录" })).toBeVisible();

  await page.keyboard.press("Enter");
  const desktop = page.getByLabel("Wenjun OS desktop");
  await expect(desktop).toBeVisible({ timeout: 5_000 });
  await expect(page.getByRole("button", { name: /FDE 交付/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /飞书-GitHub闭环/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Team Agent/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "拖动游文君的个人卡片" })).toHaveCount(0);

  await page.getByRole("button", { name: /FDE 交付/ }).dblclick();
  const fdeWindow = page.getByLabel("FDE 交付 window");
  await expect(fdeWindow.getByRole("heading", { name: "两条企业 AI 交付主线" })).toBeVisible();
  await expect(fdeWindow.getByText(/74–78s 降到 52–55s/)).toBeVisible();
  await expect(fdeWindow.getByText("70+→9.96s 整体响应", { exact: true })).toBeVisible();
  await expect(fdeWindow.getByText("0 项未解释差异", { exact: true })).toBeVisible();
  await expect(fdeWindow.getByRole("link", { name: /阅读完整案例/ })).toHaveCount(2);
  await fdeWindow.getByRole("button", { name: "关闭窗口：FDE 交付" }).click();
  await expect(fdeWindow).toHaveCount(0);

  await page.getByRole("button", { name: /about\.md/ }).dblclick();
  await expect(page.getByRole("heading", { name: "游文君" })).toBeVisible();
  await expect(page.getByText(/把模糊业务需求拆成数据与知识模型/)).toBeVisible();
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
  await expect(timelineWindow.getByText("广州市负熵云信息科技有限公司")).toBeVisible();
  await timelineWindow.getByRole("button", { name: "关闭窗口：经历时间轴" }).click();

  await page.getByRole("button", { name: /开源贡献/ }).dblclick();
  const githubWindow = page.getByLabel("开源贡献 window");
  await expect(githubWindow.getByRole("heading", { name: "开源贡献账本" })).toBeVisible();
  await expect(githubWindow.getByText("外部仓库已合并 PR")).toBeVisible();
  await expect(githubWindow.getByRole("link", { name: /usewhale\/Whale#266/ })).toHaveAttribute("href", "https://github.com/usewhale/Whale/pull/266");
  await expect(githubWindow.getByRole("link", { name: /freestylefly\/wesight#20/ })).toHaveAttribute("href", "https://github.com/freestylefly/wesight/issues/20");
});

test("OS 桌面支持语言切换，FDE 窗口可切换为英文", async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem("wenjun-os-visited"));
  await page.goto("/os/");
  await page.getByRole("button", { name: /跳过终端输入动画/ }).click();
  await page.keyboard.press("Enter");
  await expect(page.getByLabel("Wenjun OS desktop")).toBeVisible({ timeout: 5_000 });

  await page.getByRole("button", { name: /FDE 交付/ }).dblclick();
  const fdeWindow = page.getByLabel("FDE 交付 window");
  await expect(fdeWindow.getByRole("heading", { name: "两条企业 AI 交付主线" })).toBeVisible();

  await page.getByRole("button", { name: "Switch desktop language" }).click();
  await expect(page.getByRole("heading", { name: "Two enterprise AI delivery threads" })).toBeVisible();
  await expect(page.getByLabel("fde-delivery window").getByText(/74–78s to 52–55s/)).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("OS 飞书生态窗口与作品集章节展示平台组合", async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem("wenjun-os-visited"));
  await page.goto("/os/");
  await page.getByRole("button", { name: /跳过终端输入动画/ }).click();
  await page.keyboard.press("Enter");
  await expect(page.getByLabel("Wenjun OS desktop")).toBeVisible({ timeout: 5_000 });

  await page.getByRole("button", { name: /飞书生态/ }).dblclick();
  const feishuWindow = page.getByLabel("飞书生态 window");
  await expect(feishuWindow.getByRole("heading", { name: "把飞书组合成企业提效方案" })).toBeVisible();
  await expect(feishuWindow.getByText("Base / 表单 / 仪表盘", { exact: true })).toBeVisible();
  await expect(feishuWindow.getByText(/2,041 条记录/)).toBeVisible();
  await page.getByRole("button", { name: "关闭窗口：飞书生态" }).click();

  await page.goto("/os/#works");
  await expect(page.getByRole("heading", { name: "飞书生态" })).toBeVisible();
  await expect(page.getByText("9 表 / 2,041 条记录 / 0 项未解释差异", { exact: true })).toBeVisible();
  await expect(page.getByText("Aily / 妙搭 / 云文档 / 知识库", { exact: true })).toBeVisible();
});

test("OS 封面页边的工作之外窗口保存个人一侧", async ({ page }) => {
  await page.addInitScript(() => localStorage.removeItem("wenjun-os-visited"));
  await page.goto("/os/");
  await page.getByRole("button", { name: /跳过终端输入动画/ }).click();
  await page.keyboard.press("Enter");
  await expect(page.getByLabel("Wenjun OS desktop")).toBeVisible({ timeout: 5_000 });

  await page.getByRole("button", { name: /打开 off-duty\.md/ }).click();
  const offDutyWindow = page.getByLabel("工作之外 window");
  await expect(offDutyWindow.getByRole("heading", { name: "工作之外" })).toBeVisible();
  await expect(offDutyWindow.getByText("最爱《名侦探柯南》。")).toBeVisible();
  await expect(offDutyWindow.getByText("Token is oxygen!")).toBeVisible();
  await expect(offDutyWindow.getByText("真相只有一个。")).toBeVisible();
});
