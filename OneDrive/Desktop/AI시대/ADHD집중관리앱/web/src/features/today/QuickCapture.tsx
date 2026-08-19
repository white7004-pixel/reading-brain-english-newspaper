import { useState } from 'react'

export function QuickCapture({ onOrganize, onSingleTask }: { onOrganize: (input: string) => void; onSingleTask: (title: string) => void }) {
  const [value, setValue] = useState('')
  const useValue = (action: (value: string) => void) => {
    const input = value.trim()
    if (!input) return
    action(input)
  }
  return <section className="capture-card">
    <label htmlFor="quick-capture">오늘 할 일 한 번에 적기</label>
    <textarea id="quick-capture" aria-label="오늘 할 일 한 번에 적기" value={value} onChange={(event) => setValue(event.target.value)} placeholder="예: 수학 숙제하고 3시에 병원, 저녁에 엄마에게 문자" />
    <div className="capture-actions">
      <button className="primary" type="button" onClick={() => useValue(onOrganize)}>정리하기</button>
      <button type="button" onClick={() => useValue(onSingleTask)}>한 개로 저장</button>
    </div>
    <small>외부 AI로 보내지 않고 이 기기 안에서 정리해요.</small>
  </section>
}
