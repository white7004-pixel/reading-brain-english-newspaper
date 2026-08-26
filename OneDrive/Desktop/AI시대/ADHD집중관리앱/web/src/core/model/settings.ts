export type ProfileType = 'middle_school' | 'high_school' | 'university' | 'worker'
export type ThemeMode = 'light' | 'dark' | 'system'
export type NudgeIntervalMinutes = 0 | 30 | 60 | 120
export type WellnessMinutes = 3 | 5 | 10 | 20 | 30

export interface MonggleSettings {
  key: 'main'
  profile: ProfileType
  theme: ThemeMode
  reducedMotion: boolean
  mascotVisible: boolean
  determinedMonggle: boolean
  quietHoursStart: string
  quietHoursEnd: string
  nudgeIntervalMinutes: NudgeIntervalMinutes
  motivationEnabled: boolean
  readingEnabled: boolean
  exerciseEnabled: boolean
  readingMinutes: WellnessMinutes
  exerciseMinutes: WellnessMinutes
}
