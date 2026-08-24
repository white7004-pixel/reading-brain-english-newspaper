import type { MonthlyDaySummary } from './monthlySummary'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

export function MonthlyCalendar({ month, days }: { month: string; days: MonthlyDaySummary[] }) {
  const [year, monthNumber] = month.split('-').map(Number)
  const leadingBlanks = new Date(Date.UTC(year, monthNumber - 1, 1)).getUTCDay()
  return <section className="monthly-screen__calendar" aria-label="월간 달력">
    <div className="monthly-calendar__weekdays" aria-hidden="true">{WEEKDAYS.map((weekday) => <span key={weekday}>{weekday}</span>)}</div>
    <div className="monthly-calendar__grid">
      {Array.from({ length: leadingBlanks }, (_, index) => <span key={`blank-${index}`} aria-hidden="true" />)}
      {days.map((item) => {
        const date = Number(item.day.slice(-2))
        return <a key={item.day} href={`/?day=${item.day}`} className="monthly-calendar__day" aria-label={`${date}일 ${item.completed}개 완료 · ${item.total}개 중`}>
          <strong>{date}</strong><span>{item.completed}/{item.total} 완료</span>{item.missed > 0 && <span>{item.missed}개 놓침</span>}
        </a>
      })}
    </div>
  </section>
}
