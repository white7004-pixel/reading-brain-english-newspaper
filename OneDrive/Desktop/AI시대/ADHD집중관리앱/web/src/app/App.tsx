import '../core/theme/global.css'
import { AppShell } from './AppShell'

export function App() {
  return (
    <AppShell>
      <section className="welcome-card">
        <p>오늘은</p>
        <h2>지금 하나부터 시작해요</h2>
        <p>할 일과 예약 메시지를 한 흐름에서 관리할 수 있어요.</p>
      </section>
    </AppShell>
  )
}
