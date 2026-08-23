import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Persona } from '../../core/model/persona'
import { PersonaManager, type PersonaManagerRepository } from './PersonaManager'

const director: Persona = {
  id: 'director', name: '원장·경영자', icon: '🏥', color: '#8A9A5B', kind: 'default', status: 'active', order: 0,
  classificationKeywords: ['경영'], masteryLabels: ['시작'],
}

function repository(): PersonaManagerRepository {
  return {
    save: vi.fn().mockResolvedValue(undefined),
    archive: vi.fn().mockResolvedValue(undefined),
    restore: vi.fn().mockResolvedValue(undefined),
    reorder: vi.fn().mockResolvedValue(undefined),
  }
}

describe('PersonaManager', () => {
  it('creates a custom persona with all editable fields and rejects empty or normalized duplicate names', async () => {
    const user = userEvent.setup()
    const repo = repository()
    render(<PersonaManager personas={[director]} repository={repo} />)

    await user.click(screen.getByRole('button', { name: '페르소나 만들기' }))
    expect(screen.getByRole('alert')).toHaveTextContent('이름')
    await user.type(screen.getByLabelText('페르소나 이름'), '  원장·경영자  ')
    await user.click(screen.getByRole('button', { name: '페르소나 만들기' }))
    expect(screen.getByRole('alert')).toHaveTextContent('이미')
    await user.clear(screen.getByLabelText('페르소나 이름'))
    await user.type(screen.getByLabelText('페르소나 이름'), '콘텐츠 책임자')
    await user.type(screen.getByLabelText('아이콘'), '✍️')
    await user.clear(screen.getByLabelText('분류 키워드'))
    await user.type(screen.getByLabelText('분류 키워드'), '콘텐츠, 글쓰기')
    await user.clear(screen.getByLabelText('성취 단계 라벨'))
    await user.type(screen.getByLabelText('성취 단계 라벨'), '시작, 성장')
    await user.click(screen.getByRole('button', { name: '페르소나 만들기' }))

    expect(repo.save).toHaveBeenCalledWith(expect.objectContaining({
      name: '콘텐츠 책임자', kind: 'custom', classificationKeywords: ['콘텐츠', '글쓰기'], masteryLabels: ['시작', '성장'],
    }))
  })

  it('edits, reorders, archives, and restores through repository callbacks', async () => {
    const user = userEvent.setup()
    const repo = repository()
    const marketing = { ...director, id: 'marketing', name: '마케터', icon: '📣', order: 1, classificationKeywords: ['마케팅'] }
    render(<PersonaManager personas={[director, marketing]} repository={repo} />)

    await user.click(screen.getByRole('button', { name: '마케터 수정' }))
    const form = screen.getByRole('region', { name: '마케터 편집' })
    await user.clear(within(form).getByLabelText('페르소나 이름'))
    await user.type(within(form).getByLabelText('페르소나 이름'), '브랜드 마케터')
    await user.click(within(form).getByRole('button', { name: '저장' }))
    expect(repo.save).toHaveBeenCalledWith(expect.objectContaining({ id: 'marketing', name: '브랜드 마케터' }))

    await user.click(screen.getByRole('button', { name: '브랜드 마케터 위로 이동' }))
    expect(repo.reorder).toHaveBeenCalledWith(['marketing', 'director'])
    await user.click(screen.getByRole('button', { name: '브랜드 마케터 보관' }))
    expect(repo.archive).toHaveBeenCalledWith('marketing')
    const archived = screen.getByRole('region', { name: '보관된 페르소나' })
    await user.click(within(archived).getByRole('button', { name: '브랜드 마케터 복원' }))
    expect(repo.restore).toHaveBeenCalledWith('marketing')
  })

  it('assigns a new persona after the highest active order when an earlier persona is archived', async () => {
    const user = userEvent.setup()
    const repo = repository()
    const marketing = { ...director, id: 'marketing', name: '마케터', icon: '📣', order: 1, classificationKeywords: ['마케팅'] }
    render(<PersonaManager personas={[director, marketing]} repository={repo} />)

    await user.click(screen.getByRole('button', { name: '원장·경영자 보관' }))
    await user.type(screen.getByLabelText('페르소나 이름'), '콘텐츠 책임자')
    await user.click(screen.getByRole('button', { name: '페르소나 만들기' }))

    expect(repo.save).toHaveBeenCalledWith(expect.objectContaining({ name: '콘텐츠 책임자', order: 2 }))
  })

  it('keeps its restored order aligned with repository reorder semantics', async () => {
    const user = userEvent.setup()
    const repo = repository()
    const marketing = { ...director, id: 'marketing', name: '마케터', icon: '📣', order: 1, classificationKeywords: ['마케팅'] }
    const education = { ...director, id: 'education', name: '교육 기획자', icon: '📚', order: 2, classificationKeywords: ['교육'] }
    render(<PersonaManager personas={[director, marketing, education]} repository={repo} />)

    await user.click(screen.getByRole('button', { name: '원장·경영자 보관' }))
    await user.click(screen.getByRole('button', { name: '교육 기획자 위로 이동' }))
    expect(repo.reorder).toHaveBeenCalledWith(['education', 'marketing'])
    await user.click(within(screen.getByRole('region', { name: '보관된 페르소나' })).getByRole('button', { name: '원장·경영자 복원' }))

    expect(screen.getAllByRole('button', { name: /수정$/ }).map((button) => button.getAttribute('aria-label'))).toEqual([
      '교육 기획자 수정', '마케터 수정', '원장·경영자 수정',
    ])
  })

  it('synchronizes newly supplied personas while retaining an active edit draft', async () => {
    const user = userEvent.setup()
    const repo = repository()
    const { rerender } = render(<PersonaManager personas={[director]} repository={repo} />)
    await user.click(screen.getByRole('button', { name: '원장·경영자 수정' }))
    const editForm = screen.getByRole('region', { name: '원장·경영자 편집' })
    await user.clear(within(editForm).getByLabelText('페르소나 이름'))
    await user.type(within(editForm).getByLabelText('페르소나 이름'), '운영 책임자')

    rerender(<PersonaManager personas={[
      { ...director, name: '원장·운영자' },
      { ...director, id: 'marketing', name: '마케터', icon: '📣', order: 1, classificationKeywords: ['마케팅'] },
    ]} repository={repo} />)

    expect(screen.getByRole('button', { name: '마케터 수정' })).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: '원장·운영자 편집' })).getByLabelText('페르소나 이름')).toHaveValue('운영 책임자')
  })
})
