import { useState } from 'react'
import type { TaskDraft } from './taskDraft'
import { DEFAULT_CATEGORIES, type Category } from '../../core/model/category'
import { CategoryPicker } from './CategoryPicker'
import type { Persona } from '../../core/model/persona'
import { DEFAULT_PERSONAS } from '../../core/storage/personaRepository'

export function TaskDraftReview({ drafts, categories = DEFAULT_CATEGORIES, personas = DEFAULT_PERSONAS, onCreateCategory = async () => { throw new Error('분류를 추가할 수 없어요.') }, onChange, onSave, onCancel }: {
  drafts: TaskDraft[]
  categories?: Category[]
  personas?: Persona[]
  onCreateCategory?: (input: { name: string; color: string }) => Promise<Category>
  onChange: (drafts: TaskDraft[]) => void
  onSave: (drafts: TaskDraft[]) => void
  onCancel: () => void
}) {
  const [current, setCurrent] = useState(drafts)
  const update = (id: string, patch: Partial<TaskDraft>) => {
    const next = current.map((draft) => draft.id === id ? { ...draft, ...patch } : draft)
    setCurrent(next)
    onChange(next)
  }
  const activePersonas = personas
    .filter((persona) => persona.status === 'active')
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
  const togglePersona = (draft: TaskDraft, personaId: string) => {
    const selected = draft.personaIds ?? []
    update(draft.id, {
      personaIds: selected.includes(personaId)
        ? selected.filter((id) => id !== personaId)
        : [...selected, personaId],
    })
  }
  return <section className="task-draft-review" aria-label="정리된 할 일 확인">
    <div className="section-heading"><div><span>저장 전 확인</span><h2>이렇게 나눠봤어요</h2></div></div>
    <p>제목과 시간을 고친 뒤 저장해 주세요. 아직 일정에는 들어가지 않았어요.</p>
    <div className="task-draft-list">{current.map((draft, index) => <article key={draft.id}>
      <strong>{index + 1}</strong>
      <label>할 일 제목<input value={draft.title} onChange={(event) => update(draft.id, { title: event.target.value })} /></label>
      <label>날짜<input type="date" value={draft.day} onChange={(event) => update(draft.id, { day: event.target.value })} /></label>
      <label>시간<input type="time" value={draft.dueAt?.slice(11, 16) ?? ''} onChange={(event) => update(draft.id, { dueAt: event.target.value ? `${draft.day}T${event.target.value}:00+09:00` : undefined })} /></label>
      <CategoryPicker categories={categories} value={draft.categoryId} onSelect={(categoryId) => update(draft.id, { categoryId })} onCreate={onCreateCategory} />
      <label>중요도<select value={draft.priority} onChange={(event) => update(draft.id, { priority: Number(event.target.value) as TaskDraft['priority'] })}><option value="1">낮음</option><option value="2">보통</option><option value="3">높음</option></select></label>
      <label>예상 시간<input type="number" min="5" max="240" step="5" value={draft.estimateMinutes} onChange={(event) => update(draft.id, { estimateMinutes: Number(event.target.value) })} /></label>
      <fieldset className="task-draft-personas"><legend>역할</legend>{activePersonas.map((persona) => <label key={persona.id} className="check-row">
        <input type="checkbox" aria-label={`역할 ${persona.name}`} checked={(draft.personaIds ?? []).includes(persona.id)} onChange={() => togglePersona(draft, persona.id)} />
        <span aria-hidden="true">{persona.icon}</span>{persona.name}
      </label>)}</fieldset>
      {draft.needsReview && <small>시간 표현을 한 번 확인해 주세요.</small>}
    </article>)}</div>
    <div className="capture-actions"><button className="primary" type="button" onClick={() => onSave(current)}>모두 저장</button><button type="button" onClick={onCancel}>취소</button></div>
  </section>
}
