import type { NudgeIntervalMinutes } from '../../core/model/settings'
import type { WidgetSnapshot } from './widgetSnapshot'

export interface NativeNudgeConfig {
  intervalMinutes: NudgeIntervalMinutes
  quietHoursStart: string
  quietHoursEnd: string
}

export interface WidgetCompletionEvent {
  taskId: string
  completedAt: string
}

export interface MonggleWidgetPlugin {
  updateWidget(options: { snapshot: WidgetSnapshot }): Promise<void>
  scheduleNudges(options: NativeNudgeConfig): Promise<void>
  getCompletionEvents(): Promise<{ events: WidgetCompletionEvent[] }>
  clearCompletionEvents(): Promise<void>
}

type PluginResolver = () => MonggleWidgetPlugin | undefined

function defaultResolver() {
  const value = globalThis as typeof globalThis & {
    Capacitor?: { Plugins?: { MonggleWidget?: MonggleWidgetPlugin } }
  }
  return value.Capacitor?.Plugins?.MonggleWidget
}

export function createNativeWidgetBridge(resolvePlugin: PluginResolver = defaultResolver) {
  return {
    isAvailable: () => Boolean(resolvePlugin()),
    async update(snapshot: WidgetSnapshot) {
      const plugin = resolvePlugin()
      if (!plugin) return { available: false as const }
      await plugin.updateWidget({ snapshot })
      return { available: true as const }
    },
    async scheduleNudges(config: NativeNudgeConfig) {
      const plugin = resolvePlugin()
      if (!plugin) return { available: false as const }
      await plugin.scheduleNudges(config)
      return { available: true as const }
    },
    async getCompletionEvents() {
      const plugin = resolvePlugin()
      if (!plugin) return { available: false as const, events: [] as WidgetCompletionEvent[] }
      const { events } = await plugin.getCompletionEvents()
      return { available: true as const, events }
    },
    async clearCompletionEvents() {
      const plugin = resolvePlugin()
      if (!plugin) return { available: false as const }
      await plugin.clearCompletionEvents()
      return { available: true as const }
    },
  }
}

export const nativeWidgetBridge = createNativeWidgetBridge()
