export interface RoomItem {
  id: string
  name: string
  kind: 'rug' | 'cushion' | 'plant' | 'bed' | 'lamp'
  price: number
  premium?: boolean
}

export const ROOM_ITEMS: readonly RoomItem[] = [
  { id: 'sunny-rug', name: '햇살 러그', kind: 'rug', price: 0 },
  { id: 'cloud-cushion', name: '구름 방석', kind: 'cushion', price: 20 },
  { id: 'sprout-pot', name: '새싹 화분', kind: 'plant', price: 40 },
  { id: 'starlight-bed', name: '별빛 침대', kind: 'bed', price: 0, premium: true },
  { id: 'moon-lamp', name: '달빛 조명', kind: 'lamp', price: 0, premium: true },
]

export function findRoomItem(itemId: string) {
  return ROOM_ITEMS.find((item) => item.id === itemId)
}
