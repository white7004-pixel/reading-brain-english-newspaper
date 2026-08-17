import { expect, test } from "@playwright/test";

test("keeps all studio tools visible on desktop and switches to tabs at the mobile breakpoint", async ({ page }) => {
  await page.goto("/studio");
  await page
    .getByRole("list", { name: "콘텐츠 목록" })
    .getByRole("button", { name: / 열기$/ })
    .first()
    .click();

  const editor = page.getByRole("form", { name: "콘텐츠 편집기" });
  const review = page.getByRole("heading", { name: "단계별 검수" });
  const preview = page.getByRole("heading", { name: "모바일 미리보기" });

  await expect(page.getByRole("tablist", { name: "스튜디오 작업 보기" })).toHaveCount(0);
  await expect(editor).toBeVisible();
  await expect(review).toBeVisible();
  await expect(preview).toBeVisible();

  await page.setViewportSize({ width: 740, height: 900 });

  const tabs = page.getByRole("tablist", { name: "스튜디오 작업 보기" });
  await expect(tabs).toBeVisible();
  await expect(tabs.getByRole("tab")).toHaveCount(3);
  await expect(tabs.getByRole("tab", { name: "편집" })).toHaveAttribute("aria-selected", "true");
  await expect(editor).toBeVisible();
  await expect(review).toBeHidden();
  await expect(preview).toBeHidden();

  await tabs.getByRole("tab", { name: "검수" }).click();
  await expect(editor).toBeHidden();
  await expect(review).toBeVisible();
  await expect(preview).toBeHidden();
  const reviewBounds = await page.locator(".studio-review").boundingBox();
  expect(reviewBounds?.width ?? 0).toBeGreaterThan(600);

  await tabs.getByRole("tab", { name: "미리보기" }).click();
  await expect(editor).toBeHidden();
  await expect(review).toBeHidden();
  await expect(preview).toBeVisible();
});
