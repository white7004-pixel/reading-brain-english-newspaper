import { expect, it } from 'vitest'
import { extendTimer, remainingSeconds, startTimer } from './focusTimer'

const start = new Date('2026-08-20T00:00:00Z')

it('restores remaining time from an absolute end time', () => {
  const timer = startTimer('task-1', 15, start)
  expect(remainingSeconds(timer, new Date('2026-08-20T00:05:00Z'))).toBe(600)
})

it('rejects a second active timer', () => {
  const active = startTimer('task-1', 15, start)
  expect(() => startTimer('task-2', 10, start, active)).toThrow('FOCUS_TIMER_ACTIVE')
})

it('extends the absolute end time by five minutes', () => {
  const timer = extendTimer(startTimer('task-1', 15, start), 5)
  expect(timer.endsAt).toBe('2026-08-20T00:20:00.000Z')
})
