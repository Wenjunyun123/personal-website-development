import { expect, test } from "@playwright/test";

test("移动端主要页面无横向溢出且可见图片均成功加载", async ({ page }) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/selected/", "/explorations/", "/work/feishu-customer-service-gateway/", "/work/product-knowledge-ai-query/", "/work/enterprise-data-migration-dashboards/", "/work/customer-service-evaluation/", "/work/feishu-service-desk/", "/work/aily-knowledge-and-actions/"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      window.scrollTo(0, 0);
    });
    await page.locator("img:visible").evaluateAll(async images => {
      const rendered = images.filter(image => {
        const rect = image.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
      await Promise.all(rendered.map(image => {
        const img = image as HTMLImageElement;
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise<void>(resolve => {
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
          setTimeout(done, 4_000);
        });
      }));
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator("img:visible").evaluateAll(images => images.filter(image => {
      const rect = image.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }).every(image => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  }
});

test("公开简历显示当前 FDE 工作，不公开手机号", async ({ page }) => {
  await page.goto("/resume/");
  await expect(page.getByRole("heading", { name: /游文君/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /AI 应用交付工程师/ })).toBeVisible();
  await expect(page.getByText("广州市负熵云信息科技有限公司", { exact: true })).toBeVisible();
  await expect(page.getByText("上海易宠科技有限公司")).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/19985280970/);
});
