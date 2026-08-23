import { PetAvatar } from './PetAvatar'
import { ROOM_ITEMS } from './roomCatalog'

export function PetRoom({ equippedItemIds }: { equippedItemIds: string[] }) {
  const equippedItems = ROOM_ITEMS.filter((item) => equippedItemIds.includes(item.id))
  return <div className="pet-room" aria-label="몽글이의 방">
    <div className="pet-room__window" aria-hidden="true" />
    {equippedItems.map((item) => <span key={item.id} className={`pet-room__item pet-room__item--${item.kind}`} aria-label={item.name} />)}
    <div className="pet-room__pet"><PetAvatar level={1} mood="happy" label="방에서 쉬는 몽글이" /></div>
  </div>
}
