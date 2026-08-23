import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, expect, it } from 'vitest'
import { App } from './App'
import { AppShell } from './AppShell'
import { TodayScreen } from '../features/today/TodayScreen'
import { createDatabase } from '../core/storage/database'
import { createTaskRepository } from '../core/storage/taskRepository'
import { taskCheckInRepository } from '../features/nudges/taskCheckIn'
import { MemoryRouter } from 'react-router-dom'
import { settingsRepository } from '../features/settings/settingsRepository'
import { GOOGLE_FREE_BUSY_SCOPE } from '../core/model/calendarAvailability'
import { taskMasteryRepository } from '../features/nudges/taskMastery'

const database = createDatabase()
const taskRepository = createTaskRepository(database)

beforeEach(async () => {
  await database.tasks.clear()
  await database.calendarConnections.clear()
  await database.availabilitySnapshots.clear()
  localStorage.clear()
  window.history.replaceState({}, '', '/')
})

afterEach(async () => {
  taskCheckInRepository.clear()
  await database.tasks.clear()
  await database.calendarConnections.clear()
  await database.availabilitySnapshots.clear()
  window.history.replaceState({}, '', '/')
})

it('exposes exactly five icon-and-label primary destinations in dashboard order', () => {
  render(<App />)
  const nav = screen.getByRole('navigation', { name: '주요 메뉴' })
  const links = within(nav).getAllByRole('link')
  expect(links.map((link) => link.textContent)).toEqual(['오늘', '월간', '몽글', '집중', '나'])
  expect(links.map((link) => link.getAttribute('href'))).toEqual(['/', '/monthly', '/pet', '/focus', '/me'])
  links.forEach((link) => expect(link.querySelector('svg')).not.toBeNull())
})

it('does not render the profile selector in the global header', () => {
  render(<App />)
  expect(screen.queryByLabelText('사용자 유형')).not.toBeInTheDocument()
})

it('keeps the companion off utility screens so controls stay unobstructed', () => {
  render(<MemoryRouter initialEntries={['/me']}><AppShell><div>설정 내용</div></AppShell></MemoryRouter>)
  expect(screen.queryByTestId('monggle-companion')).not.toBeInTheDocument()
})

it('keeps a prior-day required mission delayed through quiet time and returns that same mission after the delay', async () => {
  await taskRepository.put({
    id: 'prior-required', title: '지난 미션', day: '2020-01-01', status: 'open', priority: 1,
    estimateMinutes: 20, category: 'study', source: 'manual', required: true, firstAction: '책 펼치기',
    createdAt: '2020-01-01T09:00:00+09:00', updatedAt: '2020-01-01T09:00:00+09:00',
  })
  settingsRepository.save({ quietHoursStart: '00:00', quietHoursEnd: '00:00', determinedMonggle: false })
  const user = userEvent.setup()
  render(<MemoryRouter><AppShell><TodayScreen /></AppShell></MemoryRouter>)

  await user.click(screen.getByText('계획 도구'))
  const mission = await screen.findByRole('region', { name: '현재 필수 미션' })
  await waitFor(() => expect(screen.getByTestId('persistent-now-task')).toHaveTextContent('지난 미션'))

  await user.click(within(mission).getByRole('button', { name: '5분 후 다시 알림' }))
  await waitFor(() => expect(screen.queryByTestId('persistent-now-task')).not.toBeInTheDocument())

  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now)
  const hour = Number(parts.find((part) => part.type === 'hour')!.value)
  const minute = Number(parts.find((part) => part.type === 'minute')!.value)
  const quietStart = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
  const quietEnd = `${String((hour + (minute === 59 ? 1 : 0)) % 24).padStart(2, '0')}:${String((minute + 1) % 60).padStart(2, '0')}`
  settingsRepository.save({ quietHoursStart: quietStart, quietHoursEnd: quietEnd })
  window.dispatchEvent(new Event('monggle:settings-changed'))
  const delayed = taskCheckInRepository.load()!
  taskCheckInRepository.save({ ...delayed, remindAt: new Date(now.getTime() - 1_000).toISOString() })
  await waitFor(() => expect(screen.getByTestId('persistent-now-task')).toHaveTextContent('지난 미션'))
  expect(within(screen.getByTestId('persistent-now-task')).queryByRole('status')).not.toBeInTheDocument()

  settingsRepository.save({ quietHoursStart: '00:00', quietHoursEnd: '00:00' })
  window.dispatchEvent(new Event('monggle:settings-changed'))
  await waitFor(() => expect(screen.getByTestId('persistent-now-task')).toHaveTextContent('지난 미션'))
})

it('prioritizes the same unfinished mission on app entry after midnight', async () => {
  await taskRepository.put({
    id: 'extended-required', title: '독서', day: '2026-08-21', status: 'open', priority: 1,
    estimateMinutes: 20, category: 'study', source: 'manual', required: true,
    commitmentDay: '2026-08-21', firstAction: '책 펼치기',
    createdAt: '2026-08-21T09:00:00+09:00', updatedAt: '2026-08-21T09:00:00+09:00',
  })
  settingsRepository.save({ quietHoursStart: '00:00', quietHoursEnd: '00:00', determinedMonggle: false })
  window.history.replaceState({}, '', '/?now=2026-08-22T00%3A10%3A00%2B09%3A00')

  render(<MemoryRouter><AppShell><TodayScreen /></AppShell></MemoryRouter>)

  const mode = await screen.findByRole('region', { name: '오늘 연장 완료 모드' })
  expect(mode).toHaveAttribute('data-escalation-level', 'app-entry')
  expect(mode).toHaveTextContent('독서')
  await waitFor(() => expect(screen.getByTestId('persistent-now-task')).toHaveTextContent('독서'))
})

it('keeps companion and persistent coaching visible but silent during a fresh calendar conflict', async () => {
  const now = '2026-08-23T10:30:00+09:00'
  await taskRepository.put({
    id: 'calendar-task', title: '상담 준비', day: '2026-08-23', status: 'open', priority: 2,
    estimateMinutes: 20, category: 'work', source: 'manual', firstAction: '자료 열기',
    createdAt: now, updatedAt: now,
  })
  await database.calendarConnections.put({
    accountId: 'account-1', displayName: '업무', connectedAt: '2026-08-23T08:00:00+09:00', scope: GOOGLE_FREE_BUSY_SCOPE,
  })
  await database.availabilitySnapshots.put({
    accountId: 'account-1', timeZone: 'Asia/Seoul', rangeStart: '2026-08-23T09:00:00+09:00', rangeEnd: '2026-08-23T18:00:00+09:00',
    fetchedAt: '2026-08-23T10:25:00+09:00', expiresAt: '2026-08-23T10:45:00+09:00',
    busy: [{ start: '2026-08-23T10:00:00+09:00', end: '2026-08-23T11:00:00+09:00' }],
  })
  taskMasteryRepository.save({ taskId: 'calendar-task', misses: 1, lastPromptAt: '2026-08-23T09:30:00+09:00' })
  settingsRepository.save({ quietHoursStart: '00:00', quietHoursEnd: '00:00', determinedMonggle: false })
  window.history.replaceState({}, '', `/?now=${encodeURIComponent(now)}`)

  render(<MemoryRouter><AppShell><TodayScreen /></AppShell></MemoryRouter>)

  const prompt = await screen.findByTestId('persistent-now-task')
  expect(prompt).toHaveTextContent('상담 준비')
  expect(within(prompt).queryByRole('status')).not.toBeInTheDocument()
  await waitFor(() => expect(document.querySelector('.monggle-companion__message')).toHaveAttribute('aria-live', 'off'))
  expect(taskMasteryRepository.load('calendar-task').misses).toBe(1)
})

it('wires the current coach decision and actions into the shipped Today dashboard', async () => {
  const now = '2026-08-23T10:30:00+09:00'
  await taskRepository.put({
    id: 'dashboard-task', title: '독서', day: '2026-08-23', status: 'open', priority: 2,
    estimateMinutes: 20, category: 'study', source: 'manual', firstAction: '책 펼치기',
    createdAt: now, updatedAt: now,
  })
  taskMasteryRepository.save({ taskId: 'dashboard-task', misses: 1, lastPromptAt: '2026-08-23T10:00:00+09:00' })
  settingsRepository.save({ quietHoursStart: '00:00', quietHoursEnd: '00:00', determinedMonggle: false })
  window.history.replaceState({}, '', `/?now=${encodeURIComponent(now)}`)

  render(<MemoryRouter><AppShell><TodayScreen /></AppShell></MemoryRouter>)

  const coach = await screen.findByRole('region', { name: '몽글 코치' })
  await waitFor(() => expect(within(coach).getByRole('status')).toHaveTextContent('약속 다시 보기'))
  expect(within(coach).getByRole('button', { name: '지금 시작' })).toBeVisible()
  expect(within(coach).getByRole('button', { name: '5분 뒤 알림' })).toBeVisible()
  expect(within(coach).getByRole('button', { name: '일정 다시 잡기' })).toBeVisible()
})

it('labels the app from the selected active mission when commitment days are mixed', async () => {
  await taskRepository.putMany([
    {
      id: 'prior-required', title: 'prior', day: '2026-08-20', status: 'open', priority: 1,
      estimateMinutes: 20, category: 'study', source: 'manual', required: true,
      commitmentDay: '2026-08-20', firstAction: 'continue prior',
      createdAt: '2026-08-20T09:00:00+09:00', updatedAt: '2026-08-20T09:00:00+09:00',
    },
    {
      id: 'current-active', title: 'active', day: '2026-08-21', status: 'active', priority: 2,
      estimateMinutes: 20, category: 'study', source: 'manual', required: true,
      commitmentDay: '2026-08-21', firstAction: 'keep working',
      createdAt: '2026-08-21T09:00:00+09:00', updatedAt: '2026-08-21T09:00:00+09:00',
    },
  ])
  settingsRepository.save({ quietHoursStart: '00:00', quietHoursEnd: '00:00', determinedMonggle: false })
  window.history.replaceState({}, '', '/?now=2026-08-21T10%3A00%3A00%2B09%3A00')

  render(<MemoryRouter><AppShell><TodayScreen /></AppShell></MemoryRouter>)

  await waitFor(() => expect(screen.getByRole('region', { name: '추천 퀘스트' })).toHaveTextContent('active'))
  expect(screen.queryByRole('region', { name: '오늘 연장 완료 모드' })).not.toBeInTheDocument()
  expect(screen.getByTestId('persistent-now-task')).toHaveTextContent('active')
})
