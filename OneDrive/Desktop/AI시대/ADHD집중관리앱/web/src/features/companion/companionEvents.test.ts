import { expect, it, vi } from 'vitest'
import { emitCompanionEvent, subscribeCompanionEvents } from './companionEvents'

it('delivers events until unsubscribed', () => {
  const listener = vi.fn()
  const unsubscribe = subscribeCompanionEvents(listener)
  emitCompanionEvent('focus_started')
  unsubscribe()
  emitCompanionEvent('message_scheduled')
  expect(listener).toHaveBeenCalledTimes(1)
  expect(listener).toHaveBeenCalledWith(expect.objectContaining({ type: 'focus_started' }))
})
