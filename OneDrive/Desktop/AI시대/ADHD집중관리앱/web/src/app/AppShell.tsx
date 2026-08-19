import { useState, type ReactNode } from 'react'
import type { ProfileType } from '../core/model/settings'
import { BottomNav } from './BottomNav'
import { MonggleCompanion } from '../features/companion/MonggleCompanion'
import { settingsRepository } from '../features/settings/settingsRepository'

export function AppShell({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileType>('high_school')
  const [settings] = useState(() => settingsRepository.load())
  return (
    <div className="app-shell studio-surface">
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
      <MonggleCompanion reducedMotion={settings.reducedMotion} mascotVisible={settings.mascotVisible} event={null} />
      <BottomNav />
    </div>
  )
}
