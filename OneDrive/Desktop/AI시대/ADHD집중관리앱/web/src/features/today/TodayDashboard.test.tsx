import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import type { Persona } from '../../core/model/persona'
import type { QuestCandidate } from '../../core/model/questCandidate'
import type { RecurringTaskInstance, RecurringTaskTemplate } from '../../core/model/recurrence'
import type { Task } from '../../core/model/task'
import { initialPetGameState } from '../pet/model'
import { TodayDashboard } from './TodayDashboard'

const personas: Persona[] = [
  { id: 'director', name: '원장·경영자', icon: '🏢', color: '#849A8C', kind: 'default', status: 'active', order: 0, classificationKeywords: [] },
  { id: 'personal', name: '개인', icon: '🌿', color: '#9A9A82', kind: 'default', status: 'active', order: 1, classificationKeywords: [] },
]
const tasks: Task[] = [
  { id: 'shared', title: '공동 계획 세우기', day: '2026-08-23', status: 'open', priority: 3, estimateMinutes: 20, category: 'work', personaIds: ['director', 'personal'], firstAction: '계획서 열기', source: 'manual', createdAt: '2026-08-23T00:00:00.000Z', updatedAt: '2026-08-23T00:00:00.000Z' },
  { id: 'personal-only', title: '산책하기', day: '2026-08-23', status: 'open', priority: 1, estimateMinutes: 10, category: 'life', personaIds: ['personal'], source: 'manual', createdAt: '2026-08-23T00:00:00.000Z', updatedAt: '2026-08-23T00:00:00.000Z' },
]
const templates: RecurringTaskTemplate[] = [
  { id: 'shared-daily', title: '오늘 일정 확인', personaIds: ['director', 'personal'], category: 'operations', cadence: { kind: 'daily' }, targetCount: 1, estimateMinutes: 5, carryForward: false, active: true },
]
const instances: RecurringTaskInstance[] = [
  { id: 'shared-daily@2026-08-23', templateId: 'shared-daily', periodKey: '2026-08-23', scheduledDay: '2026-08-23', status: 'open' },
]
const candidates: QuestCandidate[] = [
  { id: 'kakaotalk:1', source: 'kakaotalk', sourceRef: '1', title: '상담 일정 확인', personaIds: ['director'], category: 'counseling', estimateMinutes: 15, status: 'pending_review' },
]

function props() {
  return {
    date: new Date('2026-08-23T01:00:00.000Z'), energy: 'medium' as const, total: 2, completed: 0,
    personas, selectedPersonaId: 'all' as const, tasks, recurringTemplates: templates, recurringInstances: instances,
    pendingCandidates: candidates, petState: initialPetGameState, coachLine: '가장 작은 첫 행동부터 시작해 봐요.',
    onEnergyChange: vi.fn(), onSelectPersona: vi.fn(), onCompleteRecurring: vi.fn(), onStartQuest: vi.fn(), onCompleteQuest: vi.fn(),
    onAcceptCandidate: vi.fn(), onDismissCandidate: vi.fn(), onAddTask: vi.fn().mockResolvedValue(undefined), onOpenTools: vi.fn(),
  }
}

it('renders the approved labeled regions in order', () => {
  render(<TodayDashboard {...props()} />)
  const expected = ['오늘 요약', '페르소나 선택', '몽글 코치', '메인 퀘스트', '매일 반복 업무', '남은 퀘스트', '외부에서 가져온 할 일']
  const positions = expected.map((name) => screen.getByRole('region', { name }))
  positions.slice(1).forEach((current, index) => {
    expect(positions[index].compareDocumentPosition(current) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })
})

it('filters tasks by persona while retaining a task linked to multiple personas', async () => {
  const dashboardProps = props()
  const view = render(<TodayDashboard {...dashboardProps} selectedPersonaId="director" />)
  expect(screen.getByText('공동 계획 세우기')).toBeVisible()
  expect(screen.queryByText('산책하기')).not.toBeInTheDocument()

  view.rerender(<TodayDashboard {...dashboardProps} selectedPersonaId="personal" />)
  expect(screen.getByText('공동 계획 세우기')).toBeVisible()
  expect(screen.getByText('산책하기')).toBeVisible()
  await userEvent.click(screen.getByRole('button', { name: /원장·경영자/ }))
  expect(dashboardProps.onSelectPersona).toHaveBeenCalledWith('director')
})
