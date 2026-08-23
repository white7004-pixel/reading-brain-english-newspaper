import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DEFAULT_CATEGORIES } from '../../core/model/category'
import { CategoryPicker } from './CategoryPicker'

describe('CategoryPicker', () => {
  it('selects an existing category', async () => {
    const onSelect = vi.fn()
    render(<CategoryPicker categories={DEFAULT_CATEGORIES} value="personal" onSelect={onSelect} onCreate={vi.fn()} />)
    await userEvent.selectOptions(screen.getByLabelText('분류'), 'exercise')
    expect(onSelect).toHaveBeenCalledWith('exercise')
  })

  it('creates a trimmed custom category and selects it', async () => {
    const onCreate = vi.fn().mockResolvedValue({ ...DEFAULT_CATEGORIES[0], id: 'custom', name: '프로젝트', isDefault: false })
    const onSelect = vi.fn()
    render(<CategoryPicker categories={DEFAULT_CATEGORIES} value="personal" onSelect={onSelect} onCreate={onCreate} />)
    await userEvent.click(screen.getByRole('button', { name: '분류 추가' }))
    await userEvent.type(screen.getByLabelText('새 분류 이름'), ' 프로젝트 ')
    await userEvent.click(screen.getByRole('button', { name: '새 분류 저장' }))
    expect(onCreate).toHaveBeenCalledWith({ name: '프로젝트', color: '#6558D9' })
    expect(onSelect).toHaveBeenCalledWith('custom')
  })

  it('keeps a blank custom category from submitting', async () => {
    const onCreate = vi.fn()
    render(<CategoryPicker categories={DEFAULT_CATEGORIES} value="personal" onSelect={vi.fn()} onCreate={onCreate} />)
    await userEvent.click(screen.getByRole('button', { name: '분류 추가' }))
    await userEvent.click(screen.getByRole('button', { name: '새 분류 저장' }))
    expect(screen.getByRole('alert')).toHaveTextContent('분류 이름')
    expect(onCreate).not.toHaveBeenCalled()
  })
})
