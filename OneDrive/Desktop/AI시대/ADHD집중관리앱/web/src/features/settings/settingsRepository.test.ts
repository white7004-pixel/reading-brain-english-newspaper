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

it('migrates old settings to a one-hour nudge interval', () => {
  localStorage.setItem('monggle.settings.v1', JSON.stringify({ key: 'main', theme: 'system' }))
  expect(settingsRepository.load().nudgeIntervalMinutes).toBe(60)
})

it('enables determined Monggle by default and persists an opt-out', () => {
  expect(settingsRepository.load().determinedMonggle).toBe(true)
  settingsRepository.save({ determinedMonggle: false })
  expect(settingsRepository.load().determinedMonggle).toBe(false)
})

it('defaults to gentle reading, exercise, and motivation controls and persists customization', () => {
  expect(settingsRepository.load()).toMatchObject({
    motivationEnabled: true, readingEnabled: true, exerciseEnabled: true,
    readingMinutes: 10, exerciseMinutes: 10,
  })
  settingsRepository.save({ motivationEnabled: false, exerciseEnabled: false, readingMinutes: 5 })
  expect(settingsRepository.load()).toMatchObject({ motivationEnabled: false, exerciseEnabled: false, readingMinutes: 5 })
})
