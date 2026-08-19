import { expect, test } from '@playwright/test'

test('mascot never covers the primary action or bottom navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const mascot = await page.getByTestId('monggle-companion').boundingBox()
  const nav = await page.getByRole('navigation', { name: '주요 메뉴' }).boundingBox()
  expect(mascot && nav && mascot.y + mascot.height <= nav.y).toBeTruthy()
})

test('reduced motion leaves the mascot resting', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByTestId('monggle-companion')).toHaveAttribute('data-mode', 'resting')
})

test('all five routes retain the companion and navigation order', async ({ page }) => {
  await page.goto('/')
  const labels = ['오늘', '집중', '메시지', '루틴', '설정']
  await expect(page.getByRole('navigation', { name: '주요 메뉴' }).getByRole('link')).toHaveText(labels)
  for (const label of labels.slice(1)) {
    await page.getByRole('link', { name: label }).click()
    await expect(page.getByTestId('monggle-companion')).toBeVisible()
  }
})
