export type ConnectorId = 'kakaotalk' | 'kakaowork' | 'google'
export type ConnectorState =
  | { kind: 'disconnected' | 'connecting' }
  | { kind: 'connected' | 'stale'; account: string; lastSuccessfulSync: string }
  | { kind: 'error'; message: string; account?: string; lastSuccessfulSync?: string }

const LABELS: Record<ConnectorId, string> = { kakaotalk: '카카오톡', kakaowork: '카카오워크', google: 'Google Calendar' }

export function ConnectorSettings({ states, onConnect, onRetry, onDisconnect }: {
  states: Record<ConnectorId, ConnectorState>
  onConnect(id: ConnectorId): void
  onRetry(id: ConnectorId): void
  onDisconnect(id: ConnectorId): void
}) {
  return <section aria-label="외부 서비스 연결" className="connector-settings">
    <p>가져온 메시지는 검토 전에는 퀘스트가 되지 않아요. 연결 해제 후에도 이미 확인한 로컬 항목은 남습니다.</p>
    {(Object.keys(states) as ConnectorId[]).map((id) => {
      const state = states[id]
      const connected = state.kind === 'connected' || state.kind === 'stale'
      return <article key={id}>
        <h3>{LABELS[id]}</h3>
        {id === 'kakaotalk' && <p>운영체제 공유 또는 직접 붙여넣기로 가져옵니다.</p>}
        {id === 'kakaowork' && <p>안정적인 메시지 식별자를 제공하는 연결 주소가 필요합니다.</p>}
        {id === 'google' && <p>확정 일정은 일정으로 저장되며 직접 변환하기 전에는 퀘스트가 아닙니다.</p>}
        {'account' in state && state.account && <p>계정 · {state.account}</p>}
        {'lastSuccessfulSync' in state && state.lastSuccessfulSync && <p>마지막 동기화 · {new Date(state.lastSuccessfulSync).toLocaleString('ko-KR')}</p>}
        {state.kind === 'stale' && <p role="status">연결이 오래됐어요. 저장된 항목은 계속 볼 수 있어요.</p>}
        {state.kind === 'error' && <p role="alert">{state.message}</p>}
        {state.kind === 'disconnected' && <button type="button" onClick={() => onConnect(id)}>{LABELS[id]} 연결</button>}
        {state.kind === 'connecting' && <button type="button" disabled>연결 중…</button>}
        {(state.kind === 'stale' || state.kind === 'error') && <button type="button" onClick={() => onRetry(id)}>{LABELS[id]} 다시 시도</button>}
        {connected && <button type="button" onClick={() => onDisconnect(id)}>{LABELS[id]} 연결 해제</button>}
      </article>
    })}
  </section>
}
