import { expect, test } from '@playwright/test'

test('Today uses one in-flow 3D coach and no floating companion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await expect(page.locator('.monggle-coach-panel')).toBeVisible()
  await expect(page.locator('.monggle-coach-panel .pet-hero')).toHaveCount(1)
  await expect(page.getByTestId('monggle-companion')).toHaveCount(0)
})

test('reduced motion keeps the single coach available without a second mascot', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.monggle-coach-panel .pet-hero')).toBeVisible()
  await expect(page.getByTestId('monggle-companion')).toHaveCount(0)
})

test('all five routes retain the navigation order while the 3D coach stays on Today', async ({ page }) => {
  await page.goto('/')
  const labels = ['오늘', '월간', '몽글', '집중', '나']
  await expect(page.getByRole('navigation', { name: '주요 메뉴' }).getByRole('link')).toHaveText(labels)
  await expect(page.locator('.monggle-coach-panel .pet-hero')).toBeVisible()
  await expect(page.getByTestId('monggle-companion')).toHaveCount(0)
  for (const label of labels.slice(1)) {
    await page.getByRole('link', { name: label }).click()
    await expect(page.getByRole('navigation', { name: '주요 메뉴' })).toBeVisible()
    await expect(page.getByTestId('monggle-companion')).toHaveCount(0)
  }
})
