import { beforeEach, expect, it } from 'vitest'
import { settingsRepository } from './settingsRepository'

beforeEach(() => localStorage.clear())

it('persists profile, theme, and reduced motion', () => {
  settingsRepository.save({ profile: 'high_school', theme: 'dark', reducedMotion: true })
  expect(settingsRepository.load()).toMatchObject({ profile: 'high_school', theme: 'dark', reducedMotion: true })
})

it('migrates old settings with the mascot visible by default', () => {
  localStorage.setItem('monggle.settings.v1', JSON.stringify({ profile: 'worker', theme: 'light' }))
  expect(settingsRepository.load().mascotVisible).toBe(true)
})
