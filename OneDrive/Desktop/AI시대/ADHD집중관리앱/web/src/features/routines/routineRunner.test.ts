import { expect, it } from 'vitest'
import { advanceRoutine, type RoutineRunState } from './routineRunner'

it('adds time without skipping the current routine step', () => {
  const state: RoutineRunState = { currentStepIndex: 0, endsAt: '2026-08-20T09:30:00+09:00', status: 'running' }
  const next = advanceRoutine(state, { type: 'ADD_MINUTES', minutes: 5 })
  expect(next.currentStepIndex).toBe(0)
  expect(next.endsAt).toBe('2026-08-20T09:35:00+09:00')
})
