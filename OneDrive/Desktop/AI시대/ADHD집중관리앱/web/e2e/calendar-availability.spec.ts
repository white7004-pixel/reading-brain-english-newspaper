import { expect, test } from '@playwright/test'

test('shows minimum-access Google Calendar connection on settings', async ({ page }) => {
  await page.goto('/settings')
  await expect(page.getByRole('region', { name: 'Google Calendar 연결' })).toBeVisible()
  await expect(page.getByText('일정 내용은 읽지 않고 바쁜 시간만 확인해요')).toBeVisible()
  await expect(page.getByText('Google 일정은 변경하지 않아요')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Google Calendar 연결' })).toBeEnabled()
})
