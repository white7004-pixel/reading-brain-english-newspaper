import { beforeEach, expect, it } from 'vitest'
import { settingsRepository } from './settingsRepository'

beforeEach(() => localStorage.clear())

it('persists profile, theme, and reduced motion', () => {
  settingsRepository.save({ profile: 'high_school', theme: 'dark', reducedMotion: true })
  expect(settingsRepository.load()).toMatchObject({ profile: 'high_school', theme: 'dark', reducedMotion: true })
})
