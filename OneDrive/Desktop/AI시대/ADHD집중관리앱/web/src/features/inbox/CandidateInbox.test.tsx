import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Persona } from '../../core/model/persona'
import type { QuestCandidate } from '../../core/model/questCandidate'
import { CandidateInbox } from './CandidateInbox'

const personas: Persona[] = [
  { id: 'director', name: '원장·경영자', icon: '🏥', color: '#849A8C', kind: 'default', status: 'active', order: 0, classificationKeywords: ['운영'] },
  { id: 'counseling', name: '상담 관리자', icon: '💬', color: '#9B8FA8', kind: 'default', status: 'active', order: 1, classificationKeywords: ['상담'] },
  { id: 'marketing', name: '마케터', icon: '📣', color: '#B48C78', kind: 'default', status: 'active', order: 2, classificationKeywords: ['마케팅'] },
]

function candidate(overrides: Partial<QuestCandidate> = {}): QuestCandidate {
  return {
    id: 'kakaotalk:room-1/message-4',
    source: 'kakaotalk',
    sourceRef: 'room-1/message-4',
    title: '상담 일정 확인',
    personaIds: ['counseling'],
    category: 'counseling',
    dueAt: '2026-08-24T09:00:00+09:00',
    estimateMinutes: 20,
    firstAction: '일정표 열기',
    status: 'pending_review',
    ...overrides,
  }
}

describe('candidate review inbox', () => {
  it('passes every explicit edit and multiple persona selections to acceptance', async () => {
    const onAccept = vi.fn()
    render(<CandidateInbox candidates={[candidate()]} personas={personas} onAccept={onAccept} onDismiss={vi.fn()} />)

    const title = screen.getByLabelText('후보 제목')
    await userEvent.clear(title)
    await userEvent.type(title, '신입생 상담 준비')
    fireEvent.change(screen.getByLabelText('마감'), { target: { value: '2026-08-25T10:30' } })
    const estimate = screen.getByLabelText('예상 시간(분)')
    await userEvent.clear(estimate)
    await userEvent.type(estimate, '35')
    const firstAction = screen.getByLabelText('첫 행동')
    await userEvent.clear(firstAction)
    await userEvent.type(firstAction, '학생 명단 열기')
    await userEvent.selectOptions(screen.getByLabelText('분류'), 'curriculum')
    await userEvent.click(screen.getByLabelText('역할 마케터'))
    await userEvent.click(screen.getByRole('button', { name: '수락' }))

    expect(onAccept).toHaveBeenCalledWith(expect.objectContaining({
      id: 'kakaotalk:room-1/message-4',
      title: '신입생 상담 준비',
      dueAt: '2026-08-25T10:30:00+09:00',
      estimateMinutes: 35,
      firstAction: '학생 명단 열기',
      category: 'curriculum',
      personaIds: ['counseling', 'marketing'],
    }))
  })

  it('dismisses by stable candidate identity without accepting', async () => {
    const onAccept = vi.fn()
    const onDismiss = vi.fn()
    render(<CandidateInbox candidates={[candidate()]} personas={personas} onAccept={onAccept} onDismiss={onDismiss} />)

    await userEvent.click(screen.getByRole('button', { name: '닫기' }))

    expect(onDismiss).toHaveBeenCalledWith('kakaotalk:room-1/message-4')
    expect(onAccept).not.toHaveBeenCalled()
  })

  it('requires a title and an estimate from 5 to 240 minutes', async () => {
    const onAccept = vi.fn()
    render(<CandidateInbox candidates={[candidate()]} personas={personas} onAccept={onAccept} onDismiss={vi.fn()} />)

    await userEvent.clear(screen.getByLabelText('후보 제목'))
    await userEvent.click(screen.getByRole('button', { name: '수락' }))
    expect(screen.getByRole('alert')).toHaveTextContent('제목을 입력해 주세요.')
    expect(onAccept).not.toHaveBeenCalled()

    await userEvent.type(screen.getByLabelText('후보 제목'), '상담 준비')
    fireEvent.change(screen.getByLabelText('예상 시간(분)'), { target: { value: '0' } })
    await userEvent.click(screen.getByRole('button', { name: '수락' }))
    expect(screen.getByRole('alert')).toHaveTextContent('예상 시간은 5분에서 240분 사이로 입력해 주세요.')
    expect(onAccept).not.toHaveBeenCalled()
  })

  it('shows only pending reviews with Korean labels and the 48px target class', () => {
    render(<CandidateInbox
      candidates={[candidate(), candidate({ id: 'kakaowork:accepted', source: 'kakaowork', sourceRef: 'accepted', title: '이미 수락됨', status: 'accepted' })]}
      personas={personas}
      onAccept={vi.fn()}
      onDismiss={vi.fn()}
    />)

    expect(screen.getByText('카카오톡 · 검토 대기')).toBeInTheDocument()
    expect(screen.queryByDisplayValue('이미 수락됨')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: '수락' })).toHaveClass('candidate-inbox__tap-target')
    expect(screen.getByRole('button', { name: '닫기' })).toHaveClass('candidate-inbox__tap-target')
    expect(screen.getByLabelText('역할 상담 관리자').closest('label')).toHaveClass('candidate-inbox__tap-target')
  })
})
