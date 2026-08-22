import { useState } from 'react'
import type { AppearanceTarget } from '../../core/model/appearance'
import type { MonggleSettings, NudgeIntervalMinutes, ProfileType, ThemeMode } from '../../core/model/settings'
import { applyTheme } from '../../core/theme/theme'
import { AppearanceScreen } from '../appearance/AppearanceScreen'
import { settingsRepository } from './settingsRepository'
import { nativeWidgetBridge } from '../widgets/nativeWidgetBridge'
import { CategoryManager } from './CategoryManager'
import { CalendarSettings } from '../calendar/CalendarSettings'

export function SettingsScreen() {
  const [settings, setSettings] = useState<MonggleSettings>(() => settingsRepository.load())
  const [appearanceTarget, setAppearanceTarget] = useState<AppearanceTarget | null>(null)
  const update = (patch: Partial<MonggleSettings>) => {
    const next = { ...settings, ...patch }
    setSettings(next)
    settingsRepository.save(next)
    applyTheme(next.theme)
    window.dispatchEvent(new Event('monggle:settings-changed'))
    void nativeWidgetBridge.scheduleNudges({ intervalMinutes: next.nudgeIntervalMinutes, quietHoursStart: next.quietHoursStart, quietHoursEnd: next.quietHoursEnd })
  }
  return <section className="feature-screen">
    <span>설정</span><h2>나에게 편안한 방식으로 맞춰요</h2>
    <div className="settings-card">
      <label>사용자 유형<select value={settings.profile} onChange={(event) => update({ profile: event.target.value as ProfileType })}><option value="middle_school">중학생</option><option value="high_school">고등학생</option><option value="university">대학생</option><option value="worker">성인·직장인</option></select></label>
      <label>화면 테마<select value={settings.theme} onChange={(event) => update({ theme: event.target.value as ThemeMode })}><option value="system">기기 설정</option><option value="light">밝게</option><option value="dark">어둡게</option></select></label>
      <label className="check-row"><input type="checkbox" checked={settings.reducedMotion} onChange={(event) => update({ reducedMotion: event.target.checked })} /> 움직임 줄이기</label>
      <label className="check-row"><input type="checkbox" checked={settings.mascotVisible} onChange={(event) => update({ mascotVisible: event.target.checked })} /> 몽글 캐릭터 표시</label>
      <label className="check-row"><input type="checkbox" checked={settings.determinedMonggle} onChange={(event) => update({ determinedMonggle: event.target.checked })} /> 단호한 몽글이</label>
      <label>방해 금지 시작<input type="time" value={settings.quietHoursStart} onChange={(event) => update({ quietHoursStart: event.target.value })} /></label>
      <label>종료<input type="time" value={settings.quietHoursEnd} onChange={(event) => update({ quietHoursEnd: event.target.value })} /></label>
      <label>몽글이 확인 간격<select value={settings.nudgeIntervalMinutes} onChange={(event) => update({ nudgeIntervalMinutes: Number(event.target.value) as NudgeIntervalMinutes })}><option value="0">끄기</option><option value="30">30분마다</option><option value="60">1시간마다</option><option value="120">2시간마다</option></select></label>
      <p className="full-width delivery-note">몽글이가 할 일을 하나씩 물어봐요. 방해 금지 시간에는 쉬고, 답하지 않은 알림은 쌓지 않아요.</p>
    </div>
    <div className="connector-card appearance-entry"><strong>배경과 캐릭터</strong><p>사진은 이 기기 안에서만 처리하고 저장해요.</p><div><button type="button" onClick={() => setAppearanceTarget('background')}>배경 꾸미기</button><button type="button" onClick={() => setAppearanceTarget('both')}>내 캐릭터 만들기</button></div></div>
    {appearanceTarget && <AppearanceScreen initialTarget={appearanceTarget} onClose={() => setAppearanceTarget(null)} />}
    <CategoryManager />
    <CalendarSettings state={{ kind: 'disconnected' }} onConnect={() => { window.location.href = '/oauth/google/start' }} onRefresh={() => undefined} onDisconnect={() => undefined} />
    <div className="connector-card"><strong>메시지 연동</strong><p>Slack · Telegram · KakaoWork 연결 준비됨</p><p>카카오톡은 알림 후 직접 전송</p></div>
  </section>
}
