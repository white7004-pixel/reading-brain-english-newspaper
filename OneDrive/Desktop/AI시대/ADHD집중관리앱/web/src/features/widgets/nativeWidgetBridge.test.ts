import { afterEach, expect, it, vi } from 'vitest'
import type { WidgetSnapshot } from './widgetSnapshot'
import { createNativeWidgetBridge } from './nativeWidgetBridge'

const snapshot: WidgetSnapshot = { generatedAt: '2026-08-20T01:00:00.000Z', remainingCount: 0, tasks: [], nudgeLine: '', escalationLevel: 'push' }

afterEach(() => vi.restoreAllMocks())

it('keeps web behavior successful when native widgets are unavailable', async () => {
  const bridge = createNativeWidgetBridge(() => undefined)
  await expect(bridge.update(snapshot)).resolves.toEqual({ available: false })
})

it('passes the exact snapshot and nudge config to the native boundary', async () => {
  const plugin = {
    updateWidget: vi.fn().mockResolvedValue(undefined),
    scheduleNudges: vi.fn().mockResolvedValue(undefined),
    getCompletionEvents: vi.fn().mockResolvedValue({ events: [] }),
    clearCompletionEvents: vi.fn().mockResolvedValue(undefined),
  }
  const bridge = createNativeWidgetBridge(() => plugin)
  await expect(bridge.update(snapshot)).resolves.toEqual({ available: true })
  await bridge.scheduleNudges({ intervalMinutes: 60, quietHoursStart: '23:00', quietHoursEnd: '07:00' })
  expect(plugin.updateWidget).toHaveBeenCalledWith({ snapshot })
  expect(plugin.scheduleNudges).toHaveBeenCalledWith({ intervalMinutes: 60, quietHoursStart: '23:00', quietHoursEnd: '07:00' })
})

it('reads and clears widget completion events through the native boundary', async () => {
  const events = [{ taskId: 'task-1', response: 'done' as const, completedAt: '2026-08-20T01:10:00.000Z' }]
  const plugin = {
    updateWidget: vi.fn().mockResolvedValue(undefined),
    scheduleNudges: vi.fn().mockResolvedValue(undefined),
    getCompletionEvents: vi.fn().mockResolvedValue({ events }),
    clearCompletionEvents: vi.fn().mockResolvedValue(undefined),
  }
  const bridge = createNativeWidgetBridge(() => plugin)

  await expect(bridge.getCompletionEvents()).resolves.toEqual({ available: true, events })
  await expect(bridge.clearCompletionEvents()).resolves.toEqual({ available: true })
  expect(plugin.clearCompletionEvents).toHaveBeenCalledOnce()
})
