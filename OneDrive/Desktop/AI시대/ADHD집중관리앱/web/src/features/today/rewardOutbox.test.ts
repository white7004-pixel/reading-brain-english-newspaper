import { afterEach, expect, it } from 'vitest'
import type { RewardEvent } from '../pet/model'
import { rewardOutbox } from './rewardOutbox'

const event: RewardEvent = {
  id: 'task-1@2026-08-23T01:00:00.000Z',
  taskId: 'task-1',
  completedAt: '2026-08-23T01:00:00.000Z',
  focusMinutes: 3,
  grant: { xp: 10, coins: 5, food: 0, hearts: 1 },
}

afterEach(() => localStorage.clear())

it('persists pending completion rewards idempotently until removal', () => {
  rewardOutbox.put(event)
  rewardOutbox.put(event)

  expect(rewardOutbox.list()).toEqual([event])

  rewardOutbox.remove(event.id)
  expect(rewardOutbox.list()).toEqual([])
})
