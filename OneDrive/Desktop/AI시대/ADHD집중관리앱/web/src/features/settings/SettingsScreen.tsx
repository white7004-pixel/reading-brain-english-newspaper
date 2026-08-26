import { useState } from 'react'
import type { AppearanceTarget } from '../../core/model/appearance'
import type { MonggleSettings, NudgeIntervalMinutes, ProfileType, ThemeMode, WellnessMinutes } from '../../core/model/settings'
import { applyTheme } from '../../core/theme/theme'
import { AppearanceScreen } from '../appearance/AppearanceScreen'
import { CalendarSettings } from '../calendar/CalendarSettings'
import { PremiumPreview } from '../premium/PremiumPreview'
import { nativeWidgetBridge } from '../widgets/nativeWidgetBridge'
import { CategoryManager } from './CategoryManager'
import { settingsRepository } from './settingsRepository'
import { SettingsRow } from './SettingsRow'
import { SettingsSection } from './SettingsSection'
import { ConnectorSettings } from '../inbox/ConnectorSettings'

export function SettingsScreen() {
  const [settings, setSettings] = useState<MonggleSettings>(() => settingsRepository.load())
  const [appearanceTarget, setAppearanceTarget] = useState<AppearanceTarget | null>(null)
  const [expandedConnection, setExpandedConnection] = useState<'category' | 'calendar' | 'sources' | null>(null)
  const update = (patch: Partial<MonggleSettings>) => {
    const next = { ...settings, ...patch }
    setSettings(next)
    settingsRepository.save(next)
    applyTheme(next.theme)
    window.dispatchEvent(new Event('monggle:settings-changed'))
    void nativeWidgetBridge.scheduleNudges({ intervalMinutes: next.nudgeIntervalMinutes, quietHoursStart: next.quietHoursStart, quietHoursEnd: next.quietHoursEnd })
  }

  return <section className="feature-screen settings-screen">
    <span>나</span><h2>내 방식에 맞게 조절해요</h2>
    <p className="screen-intro">필요한 항목만 간결하게 정리했어요. 변경 내용은 이 기기에 바로 저장됩니다.</p>

    <SettingsSection title="프로필">
      <SettingsRow title="사용자 유형" description="일정과 안내 문구를 내 생활에 맞춰요">
        <label className="control-only">사용자 유형<select value={settings.profile} onChange={(event) => update({ profile: event.target.value as ProfileType })}><option value="middle_school">중학생</option><option value="high_school">고등학생</option><option value="university">대학생</option><option value="worker">성인·직장인</option></select></label>
      </SettingsRow>
    </SettingsSection>

    <SettingsSection title="집중 환경">
      <SettingsRow title="몽글이 확인 간격" description="쌓이지 않는 한 번의 부드러운 확인">
        <label className="control-only">몽글이 확인 간격<select value={settings.nudgeIntervalMinutes} onChange={(event) => update({ nudgeIntervalMinutes: Number(event.target.value) as NudgeIntervalMinutes })}><option value="0">끄기</option><option value="30">30분마다</option><option value="60">1시간마다</option><option value="120">2시간마다</option></select></label>
      </SettingsRow>
      <SettingsRow title="방해 금지" description={`${settings.quietHoursStart}–${settings.quietHoursEnd}`}>
        <div className="time-pair"><label>시작<input type="time" value={settings.quietHoursStart} onChange={(event) => update({ quietHoursStart: event.target.value })} /></label><label>종료<input type="time" value={settings.quietHoursEnd} onChange={(event) => update({ quietHoursEnd: event.target.value })} /></label></div>
      </SettingsRow>
      <SettingsRow title="단호한 코칭" description="필요할 때 더 분명하게 안내해요"><label className="switch"><input type="checkbox" checked={settings.determinedMonggle} onChange={(event) => update({ determinedMonggle: event.target.checked })} /><span>단호한 몽글이</span></label></SettingsRow>
      <SettingsRow title="오늘의 명언" description="하루 한 번만, 부담 없는 문장을 보여줘요"><label className="switch"><input type="checkbox" checked={settings.motivationEnabled} onChange={(event) => update({ motivationEnabled: event.target.checked })} /><span>오늘의 명언 사용</span></label></SettingsRow>
      <SettingsRow title="독서 루틴" description="작게 시작하고 못 해도 이월하지 않아요"><div className="wellness-setting"><label className="switch"><input type="checkbox" checked={settings.readingEnabled} onChange={(event) => update({ readingEnabled: event.target.checked })} /><span>독서 루틴 사용</span></label><label className="control-only">독서 시간<select disabled={!settings.readingEnabled} value={settings.readingMinutes} onChange={(event) => update({ readingMinutes: Number(event.target.value) as WellnessMinutes })}><option value="3">3분</option><option value="5">5분</option><option value="10">10분</option><option value="20">20분</option><option value="30">30분</option></select></label></div></SettingsRow>
      <SettingsRow title="운동 루틴" description="가벼운 스트레칭도 충분한 시작이에요"><div className="wellness-setting"><label className="switch"><input type="checkbox" checked={settings.exerciseEnabled} onChange={(event) => update({ exerciseEnabled: event.target.checked })} /><span>운동 루틴 사용</span></label><label className="control-only">운동 시간<select disabled={!settings.exerciseEnabled} value={settings.exerciseMinutes} onChange={(event) => update({ exerciseMinutes: Number(event.target.value) as WellnessMinutes })}><option value="3">3분</option><option value="5">5분</option><option value="10">10분</option><option value="20">20분</option><option value="30">30분</option></select></label></div></SettingsRow>
    </SettingsSection>

    <SettingsSection title="화면">
      <SettingsRow title="화면 테마"><label className="control-only">화면 테마<select value={settings.theme} onChange={(event) => update({ theme: event.target.value as ThemeMode })}><option value="system">기기 설정</option><option value="light">밝게</option><option value="dark">어둡게</option></select></label></SettingsRow>
      <SettingsRow title="움직임 줄이기" description="애니메이션과 전환을 최소화해요"><label className="switch"><input type="checkbox" checked={settings.reducedMotion} onChange={(event) => update({ reducedMotion: event.target.checked })} /><span>움직임 줄이기</span></label></SettingsRow>
      <SettingsRow title="몽글 캐릭터" description="집중과 완료 순간에만 함께해요"><label className="switch"><input type="checkbox" checked={settings.mascotVisible} onChange={(event) => update({ mascotVisible: event.target.checked })} /><span>몽글 캐릭터 표시</span></label></SettingsRow>
      <SettingsRow title="배경과 캐릭터" description="사진은 이 기기 안에서만 처리해요"><div className="row-actions"><button type="button" onClick={() => setAppearanceTarget('background')}>배경 꾸미기</button><button type="button" onClick={() => setAppearanceTarget('both')}>내 캐릭터 만들기</button></div></SettingsRow>
    </SettingsSection>
    {appearanceTarget && <AppearanceScreen initialTarget={appearanceTarget} onClose={() => setAppearanceTarget(null)} />}

    <SettingsSection title="연결">
      <SettingsRow title="카테고리 관리" description="할 일 분류의 이름과 색상을 관리해요"><button type="button" aria-expanded={expandedConnection === 'category'} onClick={() => setExpandedConnection((current) => current === 'category' ? null : 'category')}>카테고리 관리 ›</button></SettingsRow>
      {expandedConnection === 'category' && <div aria-label="카테고리 관리"><CategoryManager /></div>}
      <SettingsRow title="Google Calendar" description="일정 내용이 아닌 바쁜 시간만 확인해요"><button type="button" aria-expanded={expandedConnection === 'calendar'} onClick={() => setExpandedConnection((current) => current === 'calendar' ? null : 'calendar')}>연결 설정 ›</button></SettingsRow>
      {expandedConnection === 'calendar' && <CalendarSettings state={{ kind: 'disconnected' }} onConnect={() => { window.location.href = '/oauth/google/start' }} onRefresh={() => undefined} onDisconnect={() => undefined} />}
      <SettingsRow title="메시지 연결" description="Slack · Telegram · KakaoWork"><a className="settings-link" href="/messages">관리 ›</a></SettingsRow>
      <SettingsRow title="외부 입력 연결" description="카카오 공유·카카오워크·Google 일정"><button type="button" aria-expanded={expandedConnection === 'sources'} onClick={() => setExpandedConnection((current) => current === 'sources' ? null : 'sources')}>연결 관리 ›</button></SettingsRow>
      {expandedConnection === 'sources' && <ConnectorSettings states={{
        kakaotalk: { kind: 'disconnected' }, kakaowork: { kind: 'disconnected' }, google: { kind: 'disconnected' },
      }} onConnect={() => undefined} onRetry={() => undefined} onDisconnect={() => undefined} />}
    </SettingsSection>
    <SettingsSection title="몽글 플러스">
      <PremiumPreview features={['새로운 펫', '별빛 방', '특별한 방 꾸미기']} />
    </SettingsSection>
  </section>
}
