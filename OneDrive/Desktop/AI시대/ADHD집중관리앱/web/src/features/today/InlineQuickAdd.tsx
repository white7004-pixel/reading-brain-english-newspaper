import { useState } from 'react'

export function InlineQuickAdd({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState('')
  const trimmedTitle = title.trim()

  return <form className="inline-quick-add" onSubmit={(event) => {
    event.preventDefault()
    if (!trimmedTitle) return
    onAdd(trimmedTitle)
    setTitle('')
  }}>
    <span aria-hidden="true">＋</span>
    <input
      aria-label="빠른 할 일 추가"
      enterKeyHint="done"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      placeholder="할 일을 입력하고 Enter"
    />
    <button className="primary" type="submit" disabled={!trimmedTitle}>추가</button>
  </form>
}
