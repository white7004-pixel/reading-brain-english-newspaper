import { useState } from 'react'

const EXAMPLES = [
  '예: 오늘 꼭 끝낼 일',
  '예: 10분 안에 할 수 있는 일',
  '예: 연락하거나 예약할 일',
  '예: 건강을 위해 할 일',
  '예: 미뤄둔 작은 일',
]

export function InlineQuickAdd({ onAdd }: { onAdd: (title: string) => void }) {
  const [titles, setTitles] = useState(() => EXAMPLES.map(() => ''))

  return <section className="inline-quick-add" aria-label="빠른 할 일 입력">
    {EXAMPLES.map((example, index) => {
      const trimmedTitle = titles[index].trim()
      return <form key={example} onSubmit={(event) => {
        event.preventDefault()
        if (!trimmedTitle) return
        onAdd(trimmedTitle)
        setTitles((current) => current.map((title, slot) => slot === index ? '' : title))
      }}>
        <span aria-hidden="true">{index + 1}</span>
        <input
          aria-label={`빠른 할 일 추가 ${index + 1}`}
          enterKeyHint="done"
          value={titles[index]}
          onChange={(event) => setTitles((current) => current.map((title, slot) => slot === index ? event.target.value : title))}
          placeholder={example}
        />
        <button className="primary" type="submit" disabled={!trimmedTitle} aria-label={`${index + 1}번 할 일 추가`}>추가</button>
      </form>
    })}
  </section>
}
