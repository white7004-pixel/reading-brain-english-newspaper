import { expect, test } from '@playwright/test'

test('adds, completes, and rewards a quest on Pixel 7', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 915 })
  await page.goto('/')

  await page.getByRole('textbox', { name: '빠른 할 일 추가' }).fill('컵 치우기')
  await page.getByRole('button', { name: '할 일 추가' }).click()
  await expect(page.getByRole('heading', { name: '컵 치우기' })).toBeVisible()
  await page.getByRole('button', { name: '컵 치우기 완료' }).click()

  await expect(page.getByRole('dialog', { name: '퀘스트 완료 보상' })).toBeVisible()
  await expect(page.getByRole('dialog', { name: '퀘스트 완료 보상' })).toContainText('경험치 +10')
})

test('keeps primary mobile content and controls within the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 915 })
  await page.goto('/')

  const layout = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }))
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth)

  for (const link of await page.getByRole('navigation', { name: '주요 메뉴' }).getByRole('link').all()) {
    const box = await link.boundingBox()
    expect(box?.height).toBeGreaterThanOrEqual(48)
  }
})

test('stacks the featured quest action on narrow phones', async ({ page }) => {
  await page.setViewportSize({ width: 350, height: 800 })
  await page.goto('/')
  await page.getByRole('textbox', { name: '빠른 할 일 추가' }).fill('물 한 잔 마시기')
  await page.getByRole('button', { name: '할 일 추가' }).click()

  const quest = page.getByRole('region', { name: '추천 퀘스트' })
  const headingBox = await quest.getByRole('heading').boundingBox()
  const buttonBox = await quest.getByRole('button', { name: '3분만 시작' }).boundingBox()
  const questBox = await quest.boundingBox()

  expect(buttonBox!.y).toBeGreaterThanOrEqual(headingBox!.y + headingBox!.height)
  expect(buttonBox!.width).toBeGreaterThanOrEqual(questBox!.width - 40)
})
