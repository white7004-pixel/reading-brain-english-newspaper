import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it } from 'vitest'
import { SettingsScreen } from './SettingsScreen'
import { settingsRepository } from './settingsRepository'

beforeEach(() => localStorage.clear())

it('persists the mascot visibility preference', async () => {
  render(<SettingsScreen />)
  await userEvent.click(screen.getByRole('checkbox', { name: '몽글 캐릭터 표시' }))
  expect(settingsRepository.load().mascotVisible).toBe(false)
})

it('opens one shared appearance wizard from both entry points', async () => {
  render(<SettingsScreen />)
  await userEvent.click(screen.getByRole('button', { name: '배경 꾸미기' }))
  expect(screen.getByRole('region', { name: '배경과 캐릭터 꾸미기' })).toBeVisible()
})

it('saves the selected Monggle check-in interval', async () => {
  render(<SettingsScreen />)
  await userEvent.selectOptions(screen.getByLabelText('몽글이 확인 간격'), '30')
  expect(settingsRepository.load().nudgeIntervalMinutes).toBe(30)
})

it('organizes settings into stable groups including an honest Monggle Plus preview', () => {
  render(<SettingsScreen />)
  expect(screen.getAllByRole('group').map((group) => group.getAttribute('aria-label'))).toEqual([
    '프로필', '집중 환경', '화면', '연결', '몽글 플러스',
  ])
  expect(screen.getByText('출시 준비 중')).toBeVisible()
  expect(screen.queryByRole('button', { name: /구매|구독|결제/ })).not.toBeInTheDocument()
})

it('keeps advanced category editing collapsed initially', () => {
  render(<SettingsScreen />)
  expect(screen.queryByLabelText('카테고리 관리')).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: /카테고리 관리/ })).toBeVisible()
})
