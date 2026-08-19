import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { DEFAULT_CATEGORIES } from '../../core/model/category'
import { CategoryManager, type CategoryManagerRepository } from './CategoryManager'

const custom = { ...DEFAULT_CATEGORIES[0], id: 'custom', name: '프로젝트', isDefault: false }

function repository(overrides: Partial<CategoryManagerRepository> = {}): CategoryManagerRepository {
  return {
    list: vi.fn().mockResolvedValue([...DEFAULT_CATEGORIES, custom]),
    update: vi.fn().mockResolvedValue(custom),
    remove: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  }
}

describe('CategoryManager', () => {
  it('protects defaults and lets a custom category be renamed', async () => {
    const repo = repository()
    render(<CategoryManager repository={repo} />)
    expect(await screen.findByLabelText('프로젝트 이름')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '일 삭제' })).not.toBeInTheDocument()
    const nameInput = screen.getByLabelText('프로젝트 이름')
    const saveButton = screen.getByRole('button', { name: '프로젝트 저장' })
    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, '중요 프로젝트')
    await userEvent.click(saveButton)
    expect(repo.update).toHaveBeenCalledWith('custom', expect.objectContaining({ name: '중요 프로젝트' }))
  })

  it('confirms deletion and keeps repository failures visible', async () => {
    const repo = repository({ remove: vi.fn().mockRejectedValue(new Error('삭제 실패')) })
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    render(<CategoryManager repository={repo} />)
    await screen.findByLabelText('프로젝트 이름')
    await userEvent.click(screen.getByRole('button', { name: '프로젝트 삭제' }))
    expect(repo.remove).toHaveBeenCalledWith('custom')
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('삭제 실패'))
  })
})
