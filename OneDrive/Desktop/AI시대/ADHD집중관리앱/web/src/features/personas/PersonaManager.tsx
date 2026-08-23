import { useEffect, useState } from 'react'
import type { Persona } from '../../core/model/persona'

export interface PersonaManagerRepository {
  save(persona: Persona): Promise<void>
  archive(id: string): Promise<void>
  restore(id: string): Promise<void>
  reorder(ids: string[]): Promise<void>
}

type Draft = Pick<Persona, 'name' | 'icon' | 'color'> & { keywords: string; labels: string }

const emptyDraft: Draft = { name: '', icon: '✨', color: '#849A8C', keywords: '', labels: '' }

function normalizeName(value: string) {
  return value.trim().toLocaleLowerCase('ko-KR')
}

function splitList(value: string) {
  return value.split(',').map((item) => item.trim()).filter(Boolean)
}

function draftFor(persona: Persona): Draft {
  return {
    name: persona.name, icon: persona.icon, color: persona.color,
    keywords: persona.classificationKeywords.join(', '), labels: persona.masteryLabels?.join(', ') ?? '',
  }
}

function PersonaForm({ draft, onChange, onSubmit, submitLabel }: {
  draft: Draft
  onChange: (draft: Draft) => void
  onSubmit: () => void
  submitLabel: string
}) {
  const update = (key: keyof Draft, value: string) => onChange({ ...draft, [key]: value })
  return <>
    <label>페르소나 이름<input value={draft.name} onChange={(event) => update('name', event.target.value)} /></label>
    <label>아이콘<input value={draft.icon} onChange={(event) => update('icon', event.target.value)} /></label>
    <label>색상<input type="color" value={draft.color} onChange={(event) => update('color', event.target.value)} /></label>
    <label>분류 키워드<input value={draft.keywords} onChange={(event) => update('keywords', event.target.value)} /></label>
    <label>성취 단계 라벨<input value={draft.labels} onChange={(event) => update('labels', event.target.value)} /></label>
    <button type="button" onClick={onSubmit}>{submitLabel}</button>
  </>
}

export function PersonaManager({ personas, repository }: { personas: Persona[]; repository: PersonaManagerRepository }) {
  const [items, setItems] = useState(() => [...personas].sort((a, b) => a.order - b.order))
  const [newDraft, setNewDraft] = useState<Draft>(emptyDraft)
  const [editing, setEditing] = useState<{ id: string; draft: Draft } | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setItems([...personas].sort((a, b) => a.order - b.order))
  }, [personas])

  const rejectDuplicate = (name: string, exceptId?: string) => {
    const normalized = normalizeName(name)
    if (!normalized) return '페르소나 이름을 입력해 주세요.'
    if (items.some((persona) => persona.id !== exceptId && normalizeName(persona.name) === normalized)) return '이미 같은 이름의 페르소나가 있습니다.'
    return ''
  }
  const apply = async (action: () => Promise<void>) => {
    setError('')
    try { await action() } catch (cause) { setError(cause instanceof Error ? cause.message : '저장하지 못했어요.') }
  }
  const create = () => void apply(async () => {
    const message = rejectDuplicate(newDraft.name)
    if (message) { setError(message); return }
    const persona: Persona = {
      id: crypto.randomUUID(), name: newDraft.name.trim(), icon: newDraft.icon.trim() || '✨', color: newDraft.color,
      kind: 'custom', status: 'active', order: Math.max(-1, ...items.filter((item) => item.status === 'active').map((item) => item.order)) + 1,
      classificationKeywords: splitList(newDraft.keywords), masteryLabels: splitList(newDraft.labels),
    }
    await repository.save(persona)
    setItems((current) => [...current, persona])
    setNewDraft(emptyDraft)
  })
  const saveEdit = () => void apply(async () => {
    if (!editing) return
    const message = rejectDuplicate(editing.draft.name, editing.id)
    if (message) { setError(message); return }
    const current = items.find((item) => item.id === editing.id)
    if (!current) return
    const next: Persona = {
      ...current, name: editing.draft.name.trim(), icon: editing.draft.icon.trim() || current.icon, color: editing.draft.color,
      classificationKeywords: splitList(editing.draft.keywords), masteryLabels: splitList(editing.draft.labels),
    }
    await repository.save(next)
    setItems((all) => all.map((item) => item.id === next.id ? next : item))
    setEditing(null)
  })
  const move = (id: string, direction: -1 | 1) => void apply(async () => {
    const current = [...items].sort((a, b) => a.order - b.order)
    const active = current.filter((item) => item.status === 'active')
    const index = active.findIndex((item) => item.id === id)
    const target = index + direction
    if (index < 0 || target < 0 || target >= active.length) return
    ;[active[index], active[target]] = [active[target], active[index]]
    const ids = active.map((item) => item.id)
    await repository.reorder(ids)
    const unlisted = current.filter((item) => !ids.includes(item.id))
    const order = new Map([...active, ...unlisted].map((item, position) => [item.id, position]))
    setItems((all) => all.map((item) => ({ ...item, order: order.get(item.id) ?? item.order })))
  })
  const archive = (id: string) => void apply(async () => {
    await repository.archive(id)
    setItems((all) => all.map((item) => item.id === id ? { ...item, status: 'archived' } : item))
  })
  const restore = (id: string) => void apply(async () => {
    await repository.restore(id)
    setItems((all) => all.map((item) => item.id === id ? { ...item, status: 'active' } : item))
  })
  const active = items.filter((item) => item.status === 'active').sort((a, b) => a.order - b.order)
  const archived = items.filter((item) => item.status === 'archived').sort((a, b) => a.order - b.order)

  return <section aria-labelledby="persona-manager-heading" className="persona-manager">
    <h3 id="persona-manager-heading">페르소나 관리</h3>
    <div aria-label="새 페르소나"><PersonaForm draft={newDraft} onChange={setNewDraft} onSubmit={create} submitLabel="페르소나 만들기" /></div>
    {error && <p role="alert">{error}</p>}
    <div aria-label="활성 페르소나">
      {active.map((persona, index) => <article key={persona.id}>
        <span aria-hidden="true">{persona.icon}</span> <strong>{persona.name}</strong>
        <button type="button" aria-label={`${persona.name} 수정`} onClick={() => setEditing({ id: persona.id, draft: draftFor(persona) })}>수정</button>
        <button type="button" aria-label={`${persona.name} 위로 이동`} disabled={index === 0} onClick={() => move(persona.id, -1)}>위로</button>
        <button type="button" aria-label={`${persona.name} 아래로 이동`} disabled={index === active.length - 1} onClick={() => move(persona.id, 1)}>아래로</button>
        <button type="button" aria-label={`${persona.name} 보관`} onClick={() => archive(persona.id)}>보관</button>
        {editing?.id === persona.id && <div role="region" aria-label={`${persona.name} 편집`}><PersonaForm draft={editing.draft} onChange={(draft) => setEditing({ id: persona.id, draft })} onSubmit={saveEdit} submitLabel="저장" /></div>}
      </article>)}
    </div>
    <section role="region" aria-label="보관된 페르소나">
      <h4>보관된 페르소나</h4>
      {archived.map((persona) => <article key={persona.id}><span aria-hidden="true">{persona.icon}</span> {persona.name}<button type="button" aria-label={`${persona.name} 복원`} onClick={() => restore(persona.id)}>복원</button></article>)}
    </section>
  </section>
}
