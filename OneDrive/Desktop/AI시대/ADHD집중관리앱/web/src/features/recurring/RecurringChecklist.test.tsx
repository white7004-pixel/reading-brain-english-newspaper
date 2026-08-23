import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { RecurringTaskInstance, RecurringTaskTemplate } from '../../core/model/recurrence'
import { RecurringChecklist } from './RecurringChecklist'

const templates: RecurringTaskTemplate[] = [
  { id: 'shared', title: '오늘 일정 확인', personaIds: ['director', 'personal'], category: 'operations', cadence: { kind: 'daily' }, targetCount: 2, estimateMinutes: 10, carryForward: false, active: true },
  { id: 'personal', title: '물 마시기', personaIds: ['personal'], category: 'gathering_personal', cadence: { kind: 'daily' }, targetCount: 1, estimateMinutes: 5, carryForward: false, active: true },
]

function instance(overrides: Partial<RecurringTaskInstance> = {}): RecurringTaskInstance {
  return { id: 'shared@2026-08-23', templateId: 'shared', periodKey: '2026-08-23', scheduledDay: '2026-08-23', status: 'open', ...overrides }
}

describe('RecurringChecklist', () => {
  it('joins templates to instances and reports target progress and textual states', () => {
    render(<RecurringChecklist
      day="2026-08-23"
      selectedPersonaId="all"
      templates={templates}
      instances={[
        instance(),
        instance({ id: 'personal@2026-08-22', templateId: 'personal', scheduledDay: '2026-08-22', status: 'missed' }),
      ]}
      onComplete={vi.fn()}
    />)

    const shared = screen.getByRole('listitem', { name: '오늘 일정 확인' })
    expect(within(shared).getByText('진행 중')).toBeVisible()
    expect(within(shared).getByText('0/2')).toBeVisible()
    const missed = screen.getByRole('listitem', { name: '물 마시기' })
    expect(within(missed).getByText('놓침')).toBeVisible()
    expect(within(missed).getByRole('checkbox', { name: '물 마시기 반복 업무 완료' })).toBeDisabled()
  })

  it('passes the recurring instance to completion and marks completed work textually', async () => {
    const onComplete = vi.fn()
    const completed = instance({ status: 'completed', completedAt: '2026-08-23T01:00:00.000Z' })
    const view = render(<RecurringChecklist day="2026-08-23" selectedPersonaId="all" templates={templates} instances={[instance()]} onComplete={onComplete} />)

    await userEvent.click(screen.getByRole('checkbox', { name: '오늘 일정 확인 반복 업무 완료' }))
    expect(onComplete).toHaveBeenCalledWith(instance())

    view.rerender(<RecurringChecklist day="2026-08-23" selectedPersonaId="all" templates={templates} instances={[completed]} onComplete={onComplete} />)
    expect(screen.getByText('완료')).toBeVisible()
    expect(screen.getByText('2/2')).toBeVisible()
    expect(screen.getByRole('checkbox', { name: '오늘 일정 확인 반복 업무 완료' })).toBeChecked()
  })

  it('keeps a multi-persona recurrence visible under every linked persona', () => {
    const view = render(<RecurringChecklist day="2026-08-23" selectedPersonaId="director" templates={templates} instances={[instance()]} onComplete={vi.fn()} />)
    expect(screen.getByText('오늘 일정 확인')).toBeVisible()

    view.rerender(<RecurringChecklist day="2026-08-23" selectedPersonaId="personal" templates={templates} instances={[instance()]} onComplete={vi.fn()} />)
    expect(screen.getByText('오늘 일정 확인')).toBeVisible()
  })
})
