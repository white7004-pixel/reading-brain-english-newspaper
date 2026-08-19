import { useState } from 'react'

export function QuickCapture({ onTask }: { onTask: (title: string) => void }) {
  const [value, setValue] = useState('')
  const save = () => {
    const title = value.trim()
    if (!title) return
    onTask(title)
    setValue('')
  }
  return <section className="capture-card">
    <label htmlFor="quick-capture">머릿속에 있는 걸 바로 적어보세요</label>
    <textarea id="quick-capture" aria-label="빠른 캡처" value={value} onChange={(e) => setValue(e.target.value)} placeholder="과제, 업무, 답장할 메시지…" />
    <div className="capture-actions">
      <button className="primary" onClick={save}>할 일로 저장</button>
      <button>메시지 분석</button><button>답장 예약</button>
    </div>
  </section>
}
