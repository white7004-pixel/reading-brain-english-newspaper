import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { Persona } from '../../core/model/persona'
import { PersonaTabs } from './PersonaTabs'

const personas: Persona[] = [
  { id: 'director', name: '원장·경영자', icon: '🏥', color: '#8A9A5B', kind: 'default', status: 'active', order: 0, classificationKeywords: ['경영'] },
  { id: 'marketing', name: '마케터', icon: '📣', color: '#B78B7A', kind: 'default', status: 'active', order: 1, classificationKeywords: ['마케팅'] },
]

describe('PersonaTabs', () => {
  it('selects a persona through its compact marketing label and opens the add form', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onAdd = vi.fn()
    render(<PersonaTabs personas={personas} selectedId="all" onChange={onChange} onAdd={onAdd} />)

    await user.click(screen.getByRole('button', { name: /마케팅/ }))
    expect(onChange).toHaveBeenCalledWith('marketing')
    await user.click(screen.getByRole('button', { name: '페르소나 추가' }))
    expect(onAdd).toHaveBeenCalledOnce()
  })

  it('marks selection with text as well as aria-pressed', () => {
    render(<PersonaTabs personas={personas} selectedId="director" onChange={vi.fn()} onAdd={vi.fn()} />)

    expect(screen.getByRole('button', { name: /원장·경영자/ })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /원장·경영자/ })).toHaveTextContent('선택됨')
  })
})
