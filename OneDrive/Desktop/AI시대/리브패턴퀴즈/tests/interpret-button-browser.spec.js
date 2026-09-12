const { test, expect } = require("@playwright/test");

test("통역 테스트 탭이 진입 화면을 연다", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("http://localhost:4174/");
  await page.locator("#studentNameInput").fill("test01");
  await page.locator("#studentPinInput").fill("1234");
  await page.locator("#loginForm").getByRole("button").click();
  await expect(page.locator("body")).not.toHaveClass(/locked/);
  await page.locator('[data-pmode="interpret"]').click();
  await expect(page.locator("#interpretView")).toHaveClass(/active/);
  await expect(page.locator("#interpretIntro")).toBeVisible();
  await page.locator("#interpretStartBtn").click();
  await expect(page.locator("#interpretRun")).toBeVisible();
  expect(errors).toEqual([]);
});
