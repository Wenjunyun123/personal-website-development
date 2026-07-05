import { expect, test } from "@playwright/test";

test("hiring audience can understand the homepage and use primary conversion paths", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Wenjun You/i })).toBeVisible();
  await expect(page.getByText("AI Frontend Engineer for productized AI workflows.")).toBeVisible();
  await expect(page.getByText(/I turn messy AI workflows into shippable product interfaces/i)).toBeVisible();

  const releaseCommandCenter = page.getByRole("region", { name: /Release Command Center/i });
  await expect(releaseCommandCenter).toBeVisible();

  await expect(page.getByRole("button", { name: /Package Check/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Risk Queue/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Handoff Evidence/i })).toBeVisible();

  await page.getByRole("button", { name: /Risk Queue/i }).click();
  await expect(releaseCommandCenter).toContainText(/subscription/i);
  await expect(releaseCommandCenter).toContainText(/credit/i);

  await page.getByRole("button", { name: /Handoff Evidence/i }).click();
  await expect(releaseCommandCenter).toContainText(/handoff/i);
  await expect(releaseCommandCenter).toContainText(/evidence/i);

  const primaryActions = page.getByLabel("Primary hiring actions");
  await expect(primaryActions.getByRole("link", { name: /View Resume/i })).toBeVisible();
  await expect(primaryActions.getByRole("link", { name: /Email Wenjun/i })).toHaveAttribute("href", /^mailto:/);
  await expect(primaryActions.getByRole("link", { name: "GitHub", exact: true })).toHaveAttribute(
    "href",
    /github\.com\/Wenjunyun123/
  );
});
