export interface RewardGrant {
  xp: number
  coins: number
  food: number
  hearts: number
}

export interface RewardEvent {
  id: string
  taskId: string
  completedAt: string
  focusMinutes: number
  grant: RewardGrant
  settledAt?: string
}

export interface PetGameState {
  key: 'primary'
  petName: string
  level: number
  xp: number
  coins: number
  food: number
  affinity: number
  dailyHearts: number
  heartDay: string
  ownedItemIds: string[]
  equippedItemIds: string[]
}

export const initialPetGameState: PetGameState = {
  key: 'primary',
  petName: '紐쎄???',
  level: 1,
  xp: 0,
  coins: 0,
  food: 0,
  affinity: 0,
  dailyHearts: 0,
  heartDay: '',
  ownedItemIds: [],
  equippedItemIds: [],
}
