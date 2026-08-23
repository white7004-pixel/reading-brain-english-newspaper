import type { MonggleDatabase } from '../../core/storage/database'
import { initialPetGameState, type PetGameState, type RewardEvent } from './model'
import { findRoomItem } from './roomCatalog'

const seoulDateFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

function createInitialState(): PetGameState {
  return {
    ...initialPetGameState,
    ownedItemIds: [...initialPetGameState.ownedItemIds],
    equippedItemIds: [...initialPetGameState.equippedItemIds],
  }
}

function seoulCalendarDay(instant: string) {
  const parts = seoulDateFormatter.formatToParts(new Date(instant))
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value
  return `${value('year')}-${value('month')}-${value('day')}`
}

export function createPetRepository(database: MonggleDatabase) {
  const getOrCreateState = async () => {
    const state = await database.petGameStates.get('primary')
    if (state) return state
    const initialState = createInitialState()
    await database.petGameStates.add(initialState)
    return initialState
  }

  return {
    async loadState() {
      return getOrCreateState()
    },

    async record(event: RewardEvent) {
      return database.transaction('rw', database.rewardEvents, async () => {
        const existing = await database.rewardEvents.get(event.id)
        if (existing) return existing
        await database.rewardEvents.add(event)
        return event
      })
    },

    async settle(eventId: string) {
      return database.transaction('rw', database.petGameStates, database.rewardEvents, async () => {
        const event = await database.rewardEvents.get(eventId)
        if (!event) throw new Error(`Unknown reward event: ${eventId}`)

        const existingState = await database.petGameStates.get('primary')
        if (event.settledAt) return existingState ?? createInitialState()
        const state = existingState ?? createInitialState()

        const heartDay = seoulCalendarDay(event.completedAt)
        const xp = state.xp + event.grant.xp
        const nextState: PetGameState = {
          ...state,
          xp,
          level: Math.floor(xp / 100) + 1,
          coins: state.coins + event.grant.coins,
          food: state.food + event.grant.food,
          dailyHearts: (state.heartDay === heartDay ? state.dailyHearts : 0) + event.grant.hearts,
          heartDay,
        }

        await database.petGameStates.put(nextState)
        await database.rewardEvents.put({ ...event, settledAt: new Date().toISOString() })
        return nextState
      })
    },

    async listUnsettled() {
      return (await database.rewardEvents.toArray()).filter((event) => !event.settledAt)
    },

    async feedPet() {
      return database.transaction('rw', database.petGameStates, async () => {
        const state = await getOrCreateState()
        if (state.food === 0) return state

        const nextState: PetGameState = { ...state, food: state.food - 1, affinity: state.affinity + 1 }
        await database.petGameStates.put(nextState)
        return nextState
      })
    },

    async equipItem(itemId: string) {
      return database.transaction('rw', database.petGameStates, async () => {
        const state = await getOrCreateState()
        const item = findRoomItem(itemId)
        if (!item) throw new Error(`Unknown room item: ${itemId}`)
        if (item.premium) throw new Error(`Premium room item is not available: ${itemId}`)
        if (state.equippedItemIds.includes(itemId)) return state

        const isOwned = state.ownedItemIds.includes(itemId)
        if (!isOwned && state.coins < item.price) throw new Error(`Not enough coins for room item: ${itemId}`)

        const nextState: PetGameState = {
          ...state,
          coins: isOwned ? state.coins : state.coins - item.price,
          ownedItemIds: isOwned ? state.ownedItemIds : [...state.ownedItemIds, itemId],
          equippedItemIds: [...state.equippedItemIds, itemId],
        }
        await database.petGameStates.put(nextState)
        return nextState
      })
    },
  }
}

export type PetRepository = ReturnType<typeof createPetRepository>
