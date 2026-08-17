import { expect, test } from "@playwright/test";

test("is installable and retains a completed lesson after reload", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "/manifest.webmanifest");
  await page.getByRole("button", { name: "가장 쉬운 단계부터" }).click();
  await page.getByRole("button", { name: "오늘의 지식 시작하기" }).click();
  await page.getByRole("button", { name: "다음 페이지" }).click();
  await page.getByRole("button", { name: "다음 페이지" }).click();
  await page.getByRole("button", { name: "이해 퀴즈 시작" }).click();
  await page.locator(".quiz-options button").nth(0).click();
  await page.getByRole("button", { name: "다음 문제" }).click();
  await page.locator(".quiz-options button").nth(1).click();
  await page.getByRole("button", { name: "다음 문제" }).click();
  await page.locator(".quiz-options button").nth(0).click();
  await page.getByRole("button", { name: "결과 보기" }).click();
  await expect(page.getByText("새로운 지식 발견!")).toBeVisible();
  await page.getByRole("button", { name: "다음 지식 탐험하기" }).click();
  await expect(page.getByRole("heading", { name: "How Did the Great Wave Travel?" })).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "나" }).click();
  await expect(page.getByText("1개")).toBeVisible();
});
