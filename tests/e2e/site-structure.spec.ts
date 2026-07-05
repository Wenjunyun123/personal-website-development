import { expect, test } from "@playwright/test";

test("homepage exposes the agreed hiring reading path and resume entry point", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Capability Index/i })).toBeVisible();
  await expect(page.getByText(/AI Product Interfaces/i)).toBeVisible();
  await expect(page.getByText(/Plugin & Platform Delivery/i)).toBeVisible();
  await expect(page.getByText(/Agent Workflow Operations/i)).toBeVisible();

  await expect(page.getByRole("heading", { name: /Technical Notes/i })).toBeVisible();
  await expect(page.getByText(/release evidence matters/i)).toBeVisible();

  await expect(page.getByRole("heading", { name: /Resume Strip/i })).toBeVisible();
  await expect(page.getByText(/Shanghai Yichong Technology/i)).toBeVisible();
  await expect(page.getByText(/Shanghai Sanda University/i)).toBeVisible();

  await expect(page.getByRole("heading", { name: /Contact/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Email Wenjun/i }).last()).toHaveAttribute("href", /^mailto:/);

  await page.getByRole("link", { name: /View Resume/i }).first().click();
  await expect(page.getByRole("heading", { name: /Resume/i })).toBeVisible();
  await expect(page.getByText(/AI Delivery Engineer/i)).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/19985280970/);
});
