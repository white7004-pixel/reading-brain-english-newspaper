import { act, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { FocusScreen } from './FocusScreen'

afterEach(() => vi.useRealTimers())

it('shows one task, timer, steps, and focus controls', () => {
  render(<FocusScreen title="과학 보고서 작성" minutes={25} />)
  expect(screen.getByRole('heading', { name: '과학 보고서 작성' })).toBeVisible()
  expect(screen.getByText('25:00')).toBeVisible()
  expect(screen.getByRole('button', { name: '시작' })).toBeVisible()
  expect(screen.getByRole('button', { name: '5분 추가' })).toBeVisible()
})

it('reports elapsed focus minutes exactly once when the session completes', async () => {
  vi.useFakeTimers()
  const onComplete = vi.fn()
  render(<FocusScreen title="메일 답장" minutes={3} autoStart onComplete={onComplete} />)

  await act(async () => { await vi.advanceTimersByTimeAsync(180_000) })

  expect(onComplete).toHaveBeenCalledOnce()
  expect(onComplete).toHaveBeenCalledWith({ elapsedMinutes: 3 })
})
