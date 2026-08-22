import { render, screen, within } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import type { Task } from '../../core/model/task'
import { QuestList } from './QuestList'

function task(id: string, title: string, priority: Task['priority']): Task {
  return {
    id,
    title,
    priority,
    day: '2026-08-23',
    status: 'open',
    estimateMinutes: 15,
    category: 'life',
    source: 'manual',
    createdAt: '2026-08-23T00:00:00.000Z',
    updatedAt: '2026-08-23T00:00:00.000Z',
  }
}

it('orders open quests from highest to lowest priority', () => {
  render(<QuestList
    tasks={[
      task('low', '낮은 우선순위', 1),
      task('high', '높은 우선순위', 3),
      task('medium', '중간 우선순위', 2),
    ]}
    onStart={vi.fn()}
    onComplete={vi.fn()}
  />)

  const items = within(screen.getByRole('region', { name: '오늘 할 일' })).getAllByRole('listitem')
  expect(items.map((item) => within(item).getByRole('strong').textContent)).toEqual([
    '높은 우선순위',
    '중간 우선순위',
    '낮은 우선순위',
  ])
})
