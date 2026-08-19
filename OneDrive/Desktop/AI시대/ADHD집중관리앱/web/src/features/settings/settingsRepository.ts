import type { MonggleSettings } from '../../core/model/settings'

const key = 'monggle.settings.v1'
export const defaultSettings: MonggleSettings = {
  key: 'main', profile: 'high_school', theme: 'system', reducedMotion: false,
  mascotVisible: true,
  quietHoursStart: '23:00', quietHoursEnd: '07:00',
  nudgeIntervalMinutes: 60,
}

export const settingsRepository = {
  load(): MonggleSettings {
    const saved = localStorage.getItem(key)
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
  },
  save(settings: Partial<Omit<MonggleSettings, 'key'>>) {
    localStorage.setItem(key, JSON.stringify({ ...this.load(), ...settings, key: 'main' }))
  },
}
