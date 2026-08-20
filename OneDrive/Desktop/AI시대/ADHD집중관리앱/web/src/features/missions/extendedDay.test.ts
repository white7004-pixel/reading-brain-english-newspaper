import { describe, expect, it } from 'vitest'
import type { Task } from '../../core/model/task'
import { missionMode } from './extendedDay'

function requiredTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 'required', title: '독서', day: '2026-08-21', status: 'open', priority: 2,
    estimateMinutes: 20, category: 'study', source: 'manual', required: true,
    commitmentDay: '2026-08-21', firstAction: '책 펼치기',
    createdAt: '2026-08-21T09:00:00+09:00', updatedAt: '2026-08-21T09:00:00+09:00',
    ...overrides,
  }
}

describe('required mission day extension', () => {
  it('enters extended mode after midnight without changing commitmentDay', () => {
    const mission = requiredTask()

    expect(missionMode([mission], new Date('2026-08-22T00:10:00+09:00'))).toBe('extended')
    expect(mission.commitmentDay).toBe('2026-08-21')
  })

  it('stays normal on the commitment day and after explicit completion', () => {
    expect(missionMode([requiredTask()], new Date('2026-08-21T23:59:00+09:00'))).toBe('normal')
    expect(missionMode([requiredTask({ status: 'completed' })], new Date('2026-08-22T00:10:00+09:00'))).toBe('normal')
  })
})
