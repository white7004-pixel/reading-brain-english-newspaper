import '../core/theme/global.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FocusScreen } from '../features/focus/FocusScreen'
import { MessagesScreen } from '../features/messages/MessagesScreen'
import { MonthlyScreen } from '../features/monthly/MonthlyScreen'
import { PetScreen } from '../features/pet/PetScreen'
import { RoutinesScreen } from '../features/routines/RoutinesScreen'
import { SettingsScreen } from '../features/settings/SettingsScreen'
import { TodayScreen } from '../features/today/TodayScreen'
import { AppShell } from './AppShell'

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<TodayScreen />} />
          <Route path="/monthly" element={<MonthlyScreen />} />
          <Route path="/pet" element={<PetScreen />} />
          <Route path="/focus" element={<FocusScreen title="지금 가장 중요한 일" minutes={25} />} />
          <Route path="/messages" element={<MessagesScreen />} />
          <Route path="/routines" element={<RoutinesScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/plan" element={<RoutinesScreen />} />
          <Route path="/me" element={<SettingsScreen />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
