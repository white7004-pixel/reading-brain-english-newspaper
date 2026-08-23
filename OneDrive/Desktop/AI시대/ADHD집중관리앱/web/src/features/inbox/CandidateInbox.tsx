import { useMemo, useState } from 'react'
import type { Persona } from '../../core/model/persona'
import type { QuestCandidate } from '../../core/model/questCandidate'
import type { QuestCategory } from '../../core/model/recurrence'

const CATEGORY_OPTIONS: ReadonlyArray<readonly [QuestCategory, string]> = [
  ['counseling', '상담'],
  ['operations', '학원 운영'],
  ['curriculum', '커리큘럼'],
  ['marketing', '마케팅'],
  ['reading', '독서'],
  ['exercise', '운동'],
  ['gathering_personal', '모임·개인'],
  ['other', '기타'],
]

const SOURCE_LABELS: Record<QuestCandidate['source'], string> = {
  kakaotalk: '카카오톡',
  kakaowork: '카카오워크',
  google_calendar: '구글 캘린더',
}

function seoulInputValue(value?: string) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value.slice(0, 16)
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const fields = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${fields.year}-${fields.month}-${fields.day}T${fields.hour}:${fields.minute}`
}

function CandidateRow({ candidate, personas, accepting, onAccept, onDismiss }: {
  candidate: QuestCandidate
  personas: Persona[]
  accepting: boolean
  onAccept: (candidate: QuestCandidate) => void | Promise<void>
  onDismiss: (id: string) => void | Promise<void>
}) {
  const [edited, setEdited] = useState(candidate)
  const [error, setError] = useState('')
  const update = (patch: Partial<QuestCandidate>) => {
    setEdited((current) => ({ ...current, ...patch }))
    setError('')
  }
  const togglePersona = (personaId: string) => {
    update({
      personaIds: edited.personaIds.includes(personaId)
        ? edited.personaIds.filter((id) => id !== personaId)
        : [...edited.personaIds, personaId],
    })
  }
  const accept = () => {
    if (accepting) return
    if (!edited.title.trim()) {
      setError('제목을 입력해 주세요.')
      return
    }
    if (!Number.isFinite(edited.estimateMinutes) || edited.estimateMinutes < 5 || edited.estimateMinutes > 240) {
      setError('예상 시간은 5분에서 240분 사이로 입력해 주세요.')
      return
    }
    void onAccept(edited)
  }

  return <article className="candidate-inbox__row">
    <p>{SOURCE_LABELS[edited.source]} · 검토 대기</p>
    <label>후보 제목<input value={edited.title} onChange={(event) => update({ title: event.target.value })} /></label>
    <label>마감<input type="datetime-local" value={seoulInputValue(edited.dueAt)} onChange={(event) => update({ dueAt: event.target.value ? `${event.target.value}:00+09:00` : undefined })} /></label>
    <label>예상 시간(분)<input type="number" min="5" max="240" step="5" value={edited.estimateMinutes} onChange={(event) => update({ estimateMinutes: Number(event.target.value) })} /></label>
    <label>첫 행동<input value={edited.firstAction ?? ''} onChange={(event) => update({ firstAction: event.target.value || undefined })} /></label>
    <label>분류<select value={edited.category} onChange={(event) => update({ category: event.target.value as QuestCategory })}>
      {CATEGORY_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
    </select></label>
    <fieldset className="candidate-inbox__personas">
      <legend>역할</legend>
      {personas.map((persona) => <label key={persona.id} className="check-row candidate-inbox__tap-target">
        <input
          type="checkbox"
          aria-label={`역할 ${persona.name}`}
          checked={edited.personaIds.includes(persona.id)}
          onChange={() => togglePersona(persona.id)}
        />
        <span aria-hidden="true">{persona.icon}</span>{persona.name}
      </label>)}
    </fieldset>
    {error && <p role="alert">{error}</p>}
    <div className="capture-actions">
      <button className="primary candidate-inbox__tap-target" type="button" disabled={accepting} onClick={accept}>{accepting ? '수락 중' : '수락'}</button>
      <button className="candidate-inbox__tap-target" type="button" disabled={accepting} onClick={() => { void onDismiss(edited.id) }}>닫기</button>
    </div>
  </article>
}

export function CandidateInbox({ candidates, personas, acceptingCandidateIds = new Set(), onAccept, onDismiss }: {
  candidates: QuestCandidate[]
  personas: Persona[]
  acceptingCandidateIds?: ReadonlySet<string>
  onAccept: (candidate: QuestCandidate) => void | Promise<void>
  onDismiss: (id: string) => void | Promise<void>
}) {
  const activePersonas = useMemo(() => personas
    .filter((persona) => persona.status === 'active')
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id)), [personas])
  const pending = candidates.filter((candidate) => candidate.status === 'pending_review')
  if (pending.length === 0) return null

  return <section className="candidate-inbox" aria-label="검토할 후보">
    <div className="section-heading"><div><span>외부 입력</span><h2>검토할 퀘스트</h2></div></div>
    <p>수락하기 전까지 오늘의 퀘스트에는 들어가지 않아요.</p>
    {pending.map((candidate) => <CandidateRow
      key={candidate.id}
      candidate={candidate}
      personas={activePersonas}
      accepting={acceptingCandidateIds.has(candidate.id)}
      onAccept={onAccept}
      onDismiss={onDismiss}
    />)}
  </section>
}
