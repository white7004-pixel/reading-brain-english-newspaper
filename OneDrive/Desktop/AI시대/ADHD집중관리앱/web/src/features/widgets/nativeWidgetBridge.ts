import type { NudgeIntervalMinutes } from '../../core/model/settings'
import type { WidgetSnapshot } from './widgetSnapshot'

export interface NativeNudgeConfig {
  intervalMinutes: NudgeIntervalMinutes
  quietHoursStart: string
  quietHoursEnd: string
}

export interface MonggleWidgetPlugin {
  updateWidget(options: { snapshot: WidgetSnapshot }): Promise<void>
  scheduleNudges(options: NativeNudgeConfig): Promise<void>
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
  }
}

export const nativeWidgetBridge = createNativeWidgetBridge()
