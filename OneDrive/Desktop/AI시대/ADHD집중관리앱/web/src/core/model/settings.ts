export type ProfileType = 'middle_school' | 'high_school' | 'university' | 'worker'
export type ThemeMode = 'light' | 'dark' | 'system'

export interface MonggleSettings {
  key: 'main'
  profile: ProfileType
  theme: ThemeMode
  reducedMotion: boolean
  mascotVisible: boolean
  quietHoursStart: string
  quietHoursEnd: string
}
