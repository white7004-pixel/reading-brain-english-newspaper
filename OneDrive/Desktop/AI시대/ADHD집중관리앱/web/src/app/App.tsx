import '../core/theme/global.css'
import { TodayScreen } from '../features/today/TodayScreen'
import { AppShell } from './AppShell'

export function App() {
  return (
    <AppShell>
      <TodayScreen />
    </AppShell>
  )
}
