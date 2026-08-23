import { useEffect, useState } from 'react'
import { createDatabase } from '../../core/storage/database'
import type { PetGameState } from './model'
import { createPetRepository } from './petRepository'
import { PetRoom } from './PetRoom'
import { ROOM_ITEMS } from './roomCatalog'

export interface PetScreenDependencies {
  loadState(): Promise<PetGameState>
  feedPet(): Promise<PetGameState>
  equipItem(itemId: string): Promise<PetGameState>
}

const repository = createPetRepository(createDatabase())
const defaultDependencies: PetScreenDependencies = repository

function itemActionName(item: (typeof ROOM_ITEMS)[number], state: PetGameState) {
  if (item.premium) return `${item.name} 출시 준비 중`
  if (state.equippedItemIds.includes(item.id)) return `${item.name} 배치됨`
  if (state.ownedItemIds.includes(item.id)) return `${item.name} 배치하기`
  return item.price === 0 ? `${item.name} 무료로 배치하기` : `${item.name} ${item.price}코인`
}

export function PetScreen({ dependencies = defaultDependencies }: { dependencies?: PetScreenDependencies }) {
  const [state, setState] = useState<PetGameState | null>(null)
  const [status, setStatus] = useState('')

  useEffect(() => { void dependencies.loadState().then(setState) }, [dependencies])
  if (!state) return <section className="feature-screen pet-screen" aria-busy="true">몽글이의 방을 준비하고 있어요.</section>

  const feed = async () => {
    setState(await dependencies.feedPet())
    setStatus('')
  }
  const equip = async (itemId: string) => {
    try {
      setState(await dependencies.equipItem(itemId))
      setStatus('')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : '방 꾸미기를 완료하지 못했어요')
    }
  }

  return <section className="feature-screen pet-screen">
    <span>펫</span><h2>몽글이의 방</h2>
    <p className="screen-intro">할 일을 완료하면 몽글이와 방이 천천히 자라요.</p>
    <PetRoom equippedItemIds={state.equippedItemIds} />
    <div className="pet-screen__stats" aria-label="몽글이 상태">
      <strong>친밀도 {state.affinity}</strong><span>먹이 {state.food}개</span><span>코인 {state.coins}개</span>
    </div>
    <button className="pet-screen__feed" type="button" disabled={state.food === 0} onClick={() => void feed()}>몽글이에게 먹이 주기</button>
    <h3>방 꾸미기</h3>
    {status && <p className="pet-screen__status" role="status">{status}</p>}
    <div className="room-catalog">
      {ROOM_ITEMS.map((item) => <article key={item.id} className="room-item">
        <span className={`room-item__preview room-item__preview--${item.kind}`} aria-hidden="true" />
        <div><strong>{item.name}</strong><small>{item.premium ? '출시 준비 중' : item.price === 0 ? '무료' : `${item.price}코인`}</small></div>
        <button type="button" disabled={Boolean(item.premium) || state.equippedItemIds.includes(item.id)} onClick={() => void equip(item.id)}>{itemActionName(item, state)}</button>
      </article>)}
    </div>
  </section>
}
