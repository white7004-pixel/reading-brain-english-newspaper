import { afterEach, expect, it, vi } from 'vitest'
import type { WidgetSnapshot } from './widgetSnapshot'
import { createNativeWidgetBridge } from './nativeWidgetBridge'

const snapshot: WidgetSnapshot = { generatedAt: '2026-08-20T01:00:00.000Z', remainingCount: 0, tasks: [], nudgeLine: '' }

afterEach(() => vi.restoreAllMocks())

it('keeps web behavior successful when native widgets are unavailable', async () => {
  const bridge = createNativeWidgetBridge(() => undefined)
  await expect(bridge.update(snapshot)).resolves.toEqual({ available: false })
})

it('passes the exact snapshot and nudge config to the native boundary', async () => {
  const plugin = { updateWidget: vi.fn().mockResolvedValue(undefined), scheduleNudges: vi.fn().mockResolvedValue(undefined) }
  const bridge = createNativeWidgetBridge(() => plugin)
  await expect(bridge.update(snapshot)).resolves.toEqual({ available: true })
  await bridge.scheduleNudges({ intervalMinutes: 60, quietHoursStart: '23:00', quietHoursEnd: '07:00' })
  expect(plugin.updateWidget).toHaveBeenCalledWith({ snapshot })
  expect(plugin.scheduleNudges).toHaveBeenCalledWith({ intervalMinutes: 60, quietHoursStart: '23:00', quietHoursEnd: '07:00' })
})
