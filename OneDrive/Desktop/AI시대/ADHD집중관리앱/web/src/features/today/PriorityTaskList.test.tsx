import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { DEFAULT_CATEGORIES } from '../../core/model/category'
import type { Task } from '../../core/model/task'
import { PriorityTaskList } from './PriorityTaskList'

const tasks: Task[] = [
  { id: 'work', title: '보고서 작성', day: '2026-08-20', status: 'active', priority: 3, estimateMinutes: 30, category: 'work', categoryId: 'work', dueAt: '2026-08-20T18:00:00+09:00', source: 'manual', createdAt: '2026-08-20T08:00:00Z', updatedAt: '2026-08-20T08:00:00Z' },
  { id: 'run', title: '저녁 달리기', day: '2026-08-20', status: 'open', priority: 2, estimateMinutes: 20, category: 'exercise', categoryId: 'exercise', source: 'manual', createdAt: '2026-08-20T09:00:00Z', updatedAt: '2026-08-20T09:00:00Z' },
  { id: 'done', title: '메일 답장', day: '2026-08-20', status: 'completed', priority: 1, estimateMinutes: 5, category: 'work', categoryId: 'work', source: 'manual', createdAt: '2026-08-20T07:00:00Z', updatedAt: '2026-08-20T10:00:00Z' },
]

function Harness() {
  const [selected, setSelected] = useState('all')
  return <PriorityTaskList tasks={tasks} categories={DEFAULT_CATEGORIES} activeTaskId="work" selectedCategoryId={selected} onSelectCategory={setSelected} />
}

describe('PriorityTaskList', () => {
  it('shows task rank, category, priority, time and accessible states', () => {
    render(<Harness />)
    expect(screen.getByRole('heading', { name: '오늘의 우선순위' })).toBeInTheDocument()
    expect(screen.getByText('보고서 작성')).toBeInTheDocument()
    expect(screen.getByText('지금 집중')).toBeInTheDocument()
    expect(screen.getByText('높음')).toBeInTheDocument()
    expect(screen.getByText('30분')).toBeInTheDocument()
    expect(screen.getByText('완료')).toBeInTheDocument()
  })

  it('filters the list with category tabs', async () => {
    render(<Harness />)
    await userEvent.click(screen.getByRole('button', { name: '운동' }))
    expect(screen.getByText('저녁 달리기')).toBeInTheDocument()
    expect(screen.queryByText('보고서 작성')).not.toBeInTheDocument()
  })
})
