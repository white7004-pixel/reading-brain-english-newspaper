export type CompanionEventType = 'focus_started' | 'task_completed' | 'message_scheduled' | 'routine_completed'

export interface CompanionEvent {
  id: string
  type: CompanionEventType
}

const bus = new EventTarget()
const eventName = 'monggle:companion'

export function emitCompanionEvent(type: CompanionEventType) {
  bus.dispatchEvent(new CustomEvent<CompanionEvent>(eventName, { detail: { id: crypto.randomUUID(), type } }))
}

export function subscribeCompanionEvents(listener: (event: CompanionEvent) => void) {
  const handler = (event: Event) => listener((event as CustomEvent<CompanionEvent>).detail)
  bus.addEventListener(eventName, handler)
  return () => bus.removeEventListener(eventName, handler)
}
