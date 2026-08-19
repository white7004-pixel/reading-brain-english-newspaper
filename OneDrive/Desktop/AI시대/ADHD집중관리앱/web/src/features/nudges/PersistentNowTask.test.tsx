import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import type { Task } from '../../core/model/task'
import { PersistentNowTask } from './PersistentNowTask'

const task: Task = { id: 'task-1', title: '수학 숙제', day: '2026-08-20', status: 'open', priority: 2, estimateMinutes: 15, category: 'study', source: 'manual', createdAt: '2026-08-20T00:00:00Z', updatedAt: '2026-08-20T00:00:00Z' }

it('shows one task with the three approved answers', () => {
  render(<PersistentNowTask task={task} line="수학 숙제 했어?" onRespond={vi.fn()} />)
  expect(screen.getByTestId('persistent-now-task')).toHaveTextContent('수학 숙제 했어?')
  expect(screen.getAllByRole('button').map((button) => button.textContent)).toEqual(['했어', '하는 중', '나중에'])
})

it('offers defer times only after 나중에', async () => {
  const onRespond = vi.fn()
  render(<PersistentNowTask task={task} line="수학 숙제 했어?" onRespond={onRespond} />)
  await userEvent.click(screen.getByRole('button', { name: '나중에' }))
  await userEvent.click(screen.getByRole('button', { name: '30분 뒤' }))
  expect(onRespond).toHaveBeenCalledWith('later', 30)
})
