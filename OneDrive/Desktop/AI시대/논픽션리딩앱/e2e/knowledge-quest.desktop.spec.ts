import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 1000 },
];

test("keeps the four learner destinations within phone, tablet, and desktop widths", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "가장 쉬운 단계부터" }).click();

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const destination of ["오늘", "지식지도", "탐험", "나"]) {
      await page.getByRole("button", { name: destination, exact: true }).click();
      await expectNoHorizontalOverflow(page);
    }
  }
});

async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const sizes = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }));
  expect(sizes.document).toBeLessThanOrEqual(sizes.viewport);
}
