import { expect, test } from '@playwright/test'

test('keeps the unfinished required mission current through midnight', async ({ page }) => {
  const beforeMidnight = '2026-08-21T21:00:00+09:00'
  const afterMidnight = '2026-08-22T00:10:00+09:00'
  await page.goto(`/?now=${encodeURIComponent(beforeMidnight)}`)

  await page.getByLabel('오늘 할 일 한 번에 적기').fill('독서, 글쓰기')
  await page.getByRole('button', { name: '정리하기' }).click()
  await page.getByRole('button', { name: '모두 저장' }).click()

  await page.getByRole('checkbox', { name: '독서 선택' }).check()
  await page.getByRole('checkbox', { name: '글쓰기 선택' }).check()
  const review = page.getByRole('region', { name: '필수 미션 검토' })
  await review.getByText('독서', { exact: true }).locator('..').getByLabel('첫 행동').fill('책 펼치기')
  await review.getByText('글쓰기', { exact: true }).locator('..').getByLabel('첫 행동').fill('문서 열기')
  await page.getByRole('button', { name: '필수 미션 확정' }).click()

  const currentMission = page.getByRole('region', { name: '현재 필수 미션' })
  await expect(currentMission).toContainText('독서')
  await currentMission.getByRole('button', { name: '완료했어요' }).click()
  await expect(currentMission).toContainText('글쓰기')

  await page.reload()
  await expect(currentMission).toContainText('글쓰기')
  await page.goto(`/?now=${encodeURIComponent(afterMidnight)}`)

  const extendedMode = page.getByRole('region', { name: '오늘 연장 완료 모드' })
  await expect(extendedMode).toContainText('글쓰기')
  await expect(currentMission).toContainText('글쓰기')
  await expect(currentMission).not.toContainText('독서')
})
