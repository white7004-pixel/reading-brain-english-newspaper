import { useState, type Ref } from 'react'

const EXAMPLES = [
  '예: 오늘 꼭 끝낼 일',
  '예: 10분 안에 할 수 있는 일',
  '예: 연락하거나 예약할 일',
  '예: 건강을 위해 할 일',
  '예: 미뤄둔 작은 일',
]

export function InlineQuickAdd({ onAdd, inputRef }: {
  onAdd: (title: string) => Promise<void>
  inputRef?: Ref<HTMLInputElement>
}) {
  const [title, setTitle] = useState('')
  const [exampleIndex, setExampleIndex] = useState(0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const trimmedTitle = title.trim()

  return <section className="inline-quick-add" aria-label="빠른 할 일 입력">
    <form onSubmit={async (event) => {
      event.preventDefault()
      if (!trimmedTitle || saving) return
      setSaving(true)
      setError('')
      try {
        await onAdd(trimmedTitle)
        setTitle('')
        setExampleIndex((current) => (current + 1) % EXAMPLES.length)
      } catch {
        setError('할 일을 저장하지 못했어요. 내용을 유지했으니 다시 시도해 주세요.')
      } finally {
        setSaving(false)
      }
    }}>
      <span aria-hidden="true">+</span>
      <input
        ref={inputRef}
        aria-label="빠른 할 일 추가"
        enterKeyHint="done"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={EXAMPLES[exampleIndex]}
        disabled={saving}
      />
      <button className="primary" type="submit" disabled={!trimmedTitle || saving} aria-label="할 일 추가">{saving ? '저장 중' : '추가'}</button>
    </form>
    {error && <p className="inline-quick-add__error" role="status">{error}</p>}
  </section>
}
