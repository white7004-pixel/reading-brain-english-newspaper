import { useState } from 'react'
import type { MonggleSettings, ProfileType, ThemeMode } from '../../core/model/settings'
import { applyTheme } from '../../core/theme/theme'
import { settingsRepository } from './settingsRepository'

export function SettingsScreen() {
  const [settings, setSettings] = useState<MonggleSettings>(() => settingsRepository.load())
  const update = (patch: Partial<MonggleSettings>) => { const next = { ...settings, ...patch }; setSettings(next); settingsRepository.save(next); applyTheme(next.theme) }
  return <section className="feature-screen"><span>설정</span><h2>화면 구조는 그대로, 표현만 편하게</h2><div className="settings-card">
    <label>사용자 유형<select value={settings.profile} onChange={(e) => update({ profile: e.target.value as ProfileType })}><option value="middle_school">중학생</option><option value="high_school">고등학생</option><option value="university">대학생</option><option value="worker">성인·직장인</option></select></label>
    <label>화면 테마<select value={settings.theme} onChange={(e) => update({ theme: e.target.value as ThemeMode })}><option value="system">기기 설정</option><option value="light">밝게</option><option value="dark">어둡게</option></select></label>
    <label className="check-row"><input type="checkbox" checked={settings.reducedMotion} onChange={(e) => update({ reducedMotion: e.target.checked })} /> 움직임 줄이기</label>
    <label>방해 금지 시작<input type="time" value={settings.quietHoursStart} onChange={(e) => update({ quietHoursStart: e.target.value })} /></label><label>종료<input type="time" value={settings.quietHoursEnd} onChange={(e) => update({ quietHoursEnd: e.target.value })} /></label>
  </div><div className="connector-card"><strong>메시지 연동</strong><p>Slack · Telegram · KakaoWork 연결 준비됨</p><p>카카오톡은 알림 후 직접 전송</p></div></section>
}
