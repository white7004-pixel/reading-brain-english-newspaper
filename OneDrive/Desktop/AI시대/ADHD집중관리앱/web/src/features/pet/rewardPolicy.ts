import type { RewardGrant } from './model'

export interface RewardInput {
  taskId: string
  focusMinutes: number
}

export function calculateReward(input: RewardInput, random: () => number): RewardGrant {
  const focusBonus = input.focusMinutes >= 3 ? { xp: 5, coins: 2 } : { xp: 0, coins: 0 }
  const longSessionBonus = input.focusMinutes >= 30 ? { xp: 10, coins: 5 } : { xp: 0, coins: 0 }

  return {
    xp: 10 + focusBonus.xp + longSessionBonus.xp,
    coins: 5 + focusBonus.coins + longSessionBonus.coins,
    food: random() < 0.2 ? 1 : 0,
    hearts: 1,
  }
}
