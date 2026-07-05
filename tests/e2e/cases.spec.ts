import { expect, test } from "@playwright/test";

test("selected cases are navigable and honest about evidence status", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Selected Case Set/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Adobe\/Canva Plugin Release Command Center/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Lark Base Agent Operations/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Hermes \+ Lark CLI Automation System/i })).toBeVisible();
  await expect(page.getByText(/pending transcript/i)).toBeVisible();
  await expect(page.getByText(/draft internal/i)).toBeVisible();

  await expect(page.locator("body")).not.toContainText(/19985280970/);

  await page.getByRole("link", { name: /Lark Base Agent Operations/i }).click();
  await expect(page.getByRole("heading", { name: /Lark Base Agent Operations/i })).toBeVisible();
  await expect(page.getByText(/Problem/i)).toBeVisible();
  await expect(page.getByText(/Product decision/i)).toBeVisible();
  await expect(page.getByText(/user-provided-pending-transcript/i)).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/19985280970/);
});
