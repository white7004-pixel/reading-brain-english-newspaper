import { useState } from 'react'

type Month = {
  year: number
  month: number
}

function monthInSeoul(date: Date): Month {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(date)

  return {
    year: Number(parts.find((part) => part.type === 'year')!.value),
    month: Number(parts.find((part) => part.type === 'month')!.value),
  }
}

function moveMonth(current: Month, offset: -1 | 1): Month {
  const monthIndex = current.year * 12 + current.month - 1 + offset
  return {
    year: Math.floor(monthIndex / 12),
    month: (monthIndex % 12 + 12) % 12 + 1,
  }
}

export function MonthlyScreen({ initialDate = new Date() }: { initialDate?: Date }) {
  const [currentMonth, setCurrentMonth] = useState(() => monthInSeoul(initialDate))
  const monthLabel = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
  }).format(new Date(Date.UTC(currentMonth.year, currentMonth.month - 1, 15)))

  return (
    <section className="feature-screen monthly-screen">
      <span>월별 운영 보드</span>
      <h2>월간 운영</h2>
      <div className="monthly-screen__toolbar">
        <button type="button" aria-label="이전 달" onClick={() => setCurrentMonth((month) => moveMonth(month, -1))}>
          <span aria-hidden="true">‹</span>
        </button>
        <strong aria-live="polite">{monthLabel}</strong>
        <button type="button" aria-label="다음 달" onClick={() => setCurrentMonth((month) => moveMonth(month, 1))}>
          <span aria-hidden="true">›</span>
        </button>
      </div>
      <section className="monthly-screen__calendar" aria-label="월간 달력">
        <strong>월간 작업을 준비하고 있어요</strong>
        <p>이 달의 일과 회고가 여기에 차례로 표시될 예정이에요.</p>
      </section>
    </section>
  )
}
