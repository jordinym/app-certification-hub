import { expect, test } from "@playwright/test";

test("local catalog is rendered from D1 without invented progress", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Certification Hub", exact: true })).toBeVisible();
  await expect(page.getByRole("region", { name: "Microsoft" })).toContainText("AZ-900");
  await expect(page.getByRole("region", { name: "GitHub" })).toBeVisible();
  await page.setViewportSize({ width: 375, height: 812 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(await page.content()).not.toMatch(/LOCAL_API_TOKEN|answer_key_snapshot|is_correct/);
});

test("anonymous diagnostic writes are rejected", async ({ request }) => {
  const result = await request.post("/api/local/catalog", { data: { providerId: "github", code: "UNAUTHORIZED", title: "Rejected" } });
  expect(result.status()).toBe(403);
});
