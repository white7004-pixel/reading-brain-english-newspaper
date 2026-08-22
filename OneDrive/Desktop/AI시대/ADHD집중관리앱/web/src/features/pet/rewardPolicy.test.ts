import { expect, it } from 'vitest'
import { calculateReward } from './rewardPolicy'

it('grants the fixed base reward for a completed quest', () => {
  expect(calculateReward({ taskId: 'task-1', focusMinutes: 0 }, () => 0.99)).toEqual({ xp: 10, coins: 5, food: 0, hearts: 1 })
})

it('adds the three-minute focus bonus and supports deterministic food drops', () => {
  expect(calculateReward({ taskId: 'task-1', focusMinutes: 3 }, () => 0.1)).toEqual({ xp: 15, coins: 7, food: 1, hearts: 1 })
})

it('caps long-session bonuses', () => {
  expect(calculateReward({ taskId: 'task-1', focusMinutes: 300 }, () => 0.99)).toEqual({ xp: 25, coins: 12, food: 0, hearts: 1 })
})

it('activates the capped long-session bonus at exactly thirty minutes', () => {
  expect(calculateReward({ taskId: 'task-1', focusMinutes: 29 }, () => 0.99)).toEqual({ xp: 15, coins: 7, food: 0, hearts: 1 })
  expect(calculateReward({ taskId: 'task-1', focusMinutes: 30 }, () => 0.99)).toEqual({ xp: 25, coins: 12, food: 0, hearts: 1 })
})

it('drops food just below but not at the random threshold', () => {
  expect(calculateReward({ taskId: 'task-1', focusMinutes: 0 }, () => 0.199999)).toEqual({ xp: 10, coins: 5, food: 1, hearts: 1 })
  expect(calculateReward({ taskId: 'task-1', focusMinutes: 0 }, () => 0.2)).toEqual({ xp: 10, coins: 5, food: 0, hearts: 1 })
})
