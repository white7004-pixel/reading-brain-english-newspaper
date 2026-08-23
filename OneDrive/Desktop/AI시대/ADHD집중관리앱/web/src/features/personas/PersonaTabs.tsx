import type { Persona } from '../../core/model/persona'

export function PersonaTabs({ personas, selectedId, onChange, onAdd }: {
  personas: Persona[]
  selectedId: 'all' | string
  onChange: (id: 'all' | string) => void
  onAdd: () => void
}) {
  const active = personas.filter((persona) => persona.status === 'active').sort((a, b) => a.order - b.order)
  const label = (persona: Persona) => persona.id === 'marketing' ? '마케팅' : persona.name

  return <nav aria-label="페르소나 선택" className="persona-tabs">
    <button type="button" aria-pressed={selectedId === 'all'} onClick={() => onChange('all')}>
      전체 {selectedId === 'all' && <span>선택됨</span>}
    </button>
    {active.map((persona) => <button key={persona.id} type="button" aria-pressed={selectedId === persona.id} onClick={() => onChange(persona.id)}>
      <span aria-hidden="true">{persona.icon}</span> {label(persona)}<span className="sr-only"> {persona.name}</span>{selectedId === persona.id && <span> 선택됨</span>}
    </button>)}
    <button type="button" aria-label="페르소나 추가" onClick={onAdd}>+ 추가</button>
  </nav>
}
