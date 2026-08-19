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
