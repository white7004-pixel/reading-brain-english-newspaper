export type CalendarSettingsState =
  | { kind: 'disconnected' }
  | { kind: 'connecting' }
  | { kind: 'connected'; displayName: string; lastFetchedAt?: string }
  | { kind: 'stale'; displayName: string; lastFetchedAt: string }
  | { kind: 'error'; message: string }

interface Props {
  state: CalendarSettingsState
  onConnect(): void
  onRefresh(): void
  onDisconnect(): void
}

export function CalendarSettings({ state, onConnect, onRefresh, onDisconnect }: Props) {
  const connected = state.kind === 'connected' || state.kind === 'stale'
  return <section className="calendar-settings" aria-label="Google Calendar 연결">
    <div className="calendar-settings__icon" aria-hidden="true">31</div>
    <div className="calendar-settings__body">
      <span className="calendar-settings__eyebrow">READ-ONLY CALENDAR</span>
      <h3>Google Calendar로 빈 시간을 찾아요</h3>
      <p>일정 내용은 읽지 않고 바쁜 시간만 확인해요</p>
      <p className="calendar-settings__privacy">Google 일정은 변경하지 않아요</p>
      {connected && <p className="calendar-settings__account">연결됨 · {state.displayName}</p>}
      {state.kind === 'stale' && <p role="status">마지막 정보가 오래됐어요 · 새로고침해 주세요</p>}
      {state.kind === 'error' && <p role="alert">{state.message}</p>}
      <div className="calendar-settings__actions">
        {!connected && <button className="primary" type="button" disabled={state.kind === 'connecting'} onClick={onConnect}>{state.kind === 'connecting' ? '연결 중…' : 'Google Calendar 연결'}</button>}
        {connected && <><button className="primary" type="button" onClick={onRefresh}>바쁜 시간 새로고침</button><button type="button" onClick={onDisconnect}>연결 해제</button></>}
      </div>
    </div>
  </section>
}
