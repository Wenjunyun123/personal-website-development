import { expect, test } from "@playwright/test";

test("简洁首页直接展示当前 FDE 身份，并可进入项目与实践", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "你好，我是游文君。" })).toBeVisible();
  await expect(page.getByText("一名做 AI 应用交付的 FDE。")).toBeVisible();
  await expect(page.getByRole("link", { name: "邮件", exact: true })).toHaveAttribute("href", "mailto:wenjunyou2002@outlook.com");
  await expect(page.getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute("href", "https://github.com/Wenjunyun123");
  await page.getByRole("link", { name: "精选项目", exact: true }).click();
  await expect(page).toHaveURL(/\/selected\//);
  await expect(page.getByRole("heading", { name: "精选项目", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "返回", exact: true }).click();
  await page.getByRole("link", { name: "经历与实践", exact: true }).click();
  await expect(page.getByRole("heading", { name: "经历与实践", exact: true })).toBeVisible();
});

test("首页支持语言切换和键盘入口", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.getByRole("heading", { name: "Hey there, I’m Wenjun You." })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.locator("h1").click();
  await page.keyboard.press("s");
  await expect(page.getByRole("heading", { name: "Selected work", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("heading", { name: "Hey there, I’m Wenjun You." })).toBeVisible();
});

test("公司建筑预览支持悬停，并链接到署名来源", async ({ page }) => {
  await page.goto("/");
  const yichong = page.getByRole("link", { name: "易宠科技", exact: true });
  await yichong.hover();
  await expect(page.locator("#yichong-preview")).toBeVisible();
  await page.locator("#yichong-preview img").evaluate((element: HTMLImageElement) => element.decode());
  await yichong.click();
  await expect(page).toHaveURL(/\/explorations\/#yichong$/);
  await expect(page.locator("#yichong").getByRole("link", { name: /浦东国际人才大厦.*图片/ })).toHaveAttribute("href", "https://www.pdgjrcc.cn/");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("#yichong").getByRole("img")).toHaveAttribute("alt", "Yichong internship office: Pudong International Talent Building");
  await page.getByRole("button", { name: "切换到中文" }).click();
  await page.goto("/");
  const yimu = page.getByRole("link", { name: "怡沐", exact: true });
  await yimu.focus();
  const yimuPreview = page.locator("#yimu-preview");
  await expect(yimuPreview).toBeVisible();
  await expect(yimuPreview).toContainText("公开招聘地址对应园区");
  await yimuPreview.locator("img").evaluate((element: HTMLImageElement) => element.decode());
  await yimu.click();
  await expect(page).toHaveURL(/\/explorations\/#yimu$/);
  await expect(page.locator("#yimu").getByRole("link", { name: "公开招聘地址", exact: true })).toHaveAttribute("href", "https://www.jobui.com/company/15054227/");
  await expect(page.locator("#yimu").getByRole("link", { name: /中环协信天地园区.*图片/ })).toHaveAttribute("href", "https://www.justwork.com.cn/products/中环协信天地/");

  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("#yimu")).toContainText("Public recruitment address");
  await page.getByRole("button", { name: "切换到中文" }).click();
  await page.goto("/");
  const company = page.getByRole("link", { name: "凯淳 K.AI", exact: true });
  await company.hover();
  await expect(page.locator("#kaytune-preview")).toBeVisible();
  const image = page.getByAltText("凯淳股份智慧之岸总部大楼");
  await expect(image).toBeVisible();
  await image.evaluate((element: HTMLImageElement) => element.decode());
  await company.click();
  await expect(page.getByRole("link", { name: /凯淳总部.*摄影/ })).toHaveAttribute("href", "https://www.hetaochina.cn/news/decoration_guide/594.html");
});
