import { useEffect, useState, type ReactNode } from 'react'
import type { ProfileType } from '../core/model/settings'
import { BottomNav } from './BottomNav'
import { MonggleCompanion } from '../features/companion/MonggleCompanion'
import { settingsRepository } from '../features/settings/settingsRepository'
import { subscribeCompanionEvents, type CompanionEvent } from '../features/companion/companionEvents'
import { AppBackground } from '../features/appearance/AppBackground'
import { createAppearanceRepository, defaultAppearanceSettings } from '../features/appearance/appearanceRepository'
import { createDatabase } from '../core/storage/database'
import type { AppearanceSettings } from '../core/model/appearance'

const appearanceRepository = createAppearanceRepository(createDatabase())

export function AppShell({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileType>('high_school')
  const [settings] = useState(() => settingsRepository.load())
  const [companionEvent, setCompanionEvent] = useState<CompanionEvent | null>(null)
  const [appearance, setAppearance] = useState<AppearanceSettings>(defaultAppearanceSettings)
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null)
  const [profileUrl, setProfileUrl] = useState<string | null>(null)
  useEffect(() => {
    let expiry: number | undefined
    const unsubscribe = subscribeCompanionEvents((event) => {
      window.clearTimeout(expiry)
      setCompanionEvent(event)
      expiry = window.setTimeout(() => setCompanionEvent(null), 1_800)
    })
    return () => { unsubscribe(); window.clearTimeout(expiry) }
  }, [])
  useEffect(() => {
    let disposed = false
    let activeUrls: string[] = []
    const refreshAppearance = async () => {
      const loaded = await appearanceRepository.loadSettings()
      let nextBackgroundUrl: string | null = null
      let nextProfileUrl: string | null = null
      if (loaded.background.kind !== 'preset') {
        const asset = loaded.background.kind === 'photo'
          ? await appearanceRepository.getPhoto(loaded.background.assetId)
          : await appearanceRepository.getRender(loaded.background.assetId)
        if (asset) nextBackgroundUrl = URL.createObjectURL(asset.blob)
      }
      if (loaded.profile.kind !== 'default_monggle') {
        const asset = loaded.profile.kind === 'photo'
          ? await appearanceRepository.getPhoto(loaded.profile.assetId)
          : await appearanceRepository.getRender(loaded.profile.assetId)
        if (asset) nextProfileUrl = URL.createObjectURL(asset.blob)
      }
      if (disposed) {
        ;[nextBackgroundUrl, nextProfileUrl].forEach((url) => { if (url) URL.revokeObjectURL(url) })
        return
      }
      activeUrls.forEach((url) => URL.revokeObjectURL(url))
      activeUrls = [nextBackgroundUrl, nextProfileUrl].filter((url): url is string => Boolean(url))
      setAppearance(loaded.background.kind !== 'preset' && !nextBackgroundUrl ? { ...loaded, background: defaultAppearanceSettings.background } : loaded)
      setBackgroundUrl(nextBackgroundUrl)
      setProfileUrl(nextProfileUrl)
    }
    void refreshAppearance()
    window.addEventListener('monggle:appearance-changed', refreshAppearance)
    return () => {
      disposed = true
      window.removeEventListener('monggle:appearance-changed', refreshAppearance)
      activeUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])
  return (
    <div className="app-shell studio-surface">
      <AppBackground settings={appearance} assetUrl={backgroundUrl} />
      <header className="app-header">
        <h1>몽글</h1>
        <label className="profile-select">
          사용자 유형
          <select value={profile} onChange={(event) => setProfile(event.target.value as ProfileType)}>
            <option value="middle_school">중학생</option>
            <option value="high_school">고등학생</option>
            <option value="university">대학생</option>
            <option value="worker">성인·직장인</option>
          </select>
        </label>
      </header>
      <main>{children}</main>
      <MonggleCompanion reducedMotion={settings.reducedMotion} mascotVisible={settings.mascotVisible} event={companionEvent} sourceUrl={profileUrl} />
      <BottomNav />
    </div>
  )
}
