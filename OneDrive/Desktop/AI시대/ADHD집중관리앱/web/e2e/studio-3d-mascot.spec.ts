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

test('all five routes retain the navigation order while the companion stays focused on Today', async ({ page }) => {
  await page.goto('/')
  const labels = ['오늘', '월간', '몽글', '집중', '나']
  await expect(page.getByRole('navigation', { name: '주요 메뉴' }).getByRole('link')).toHaveText(labels)
  await expect(page.getByTestId('monggle-companion')).toBeVisible()
  for (const label of labels.slice(1)) {
    await page.getByRole('link', { name: label }).click()
    await expect(page.getByRole('navigation', { name: '주요 메뉴' })).toBeVisible()
    await expect(page.getByTestId('monggle-companion')).not.toBeVisible()
  }
})
