import { useState } from 'react'

const EXAMPLES = [
  '예: 오늘 꼭 끝낼 일',
  '예: 10분 안에 할 수 있는 일',
  '예: 연락하거나 예약할 일',
  '예: 건강을 위해 할 일',
  '예: 미뤄둔 작은 일',
]

export function InlineQuickAdd({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState('')
  const [exampleIndex, setExampleIndex] = useState(0)
  const trimmedTitle = title.trim()

  return <section className="inline-quick-add" aria-label="빠른 할 일 입력">
    <form onSubmit={(event) => {
      event.preventDefault()
      if (!trimmedTitle) return
      onAdd(trimmedTitle)
      setTitle('')
      setExampleIndex((current) => (current + 1) % EXAMPLES.length)
    }}>
      <span aria-hidden="true">+</span>
      <input
        aria-label="빠른 할 일 추가"
        enterKeyHint="done"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={EXAMPLES[exampleIndex]}
      />
      <button className="primary" type="submit" disabled={!trimmedTitle} aria-label="할 일 추가">추가</button>
    </form>
  </section>
}
