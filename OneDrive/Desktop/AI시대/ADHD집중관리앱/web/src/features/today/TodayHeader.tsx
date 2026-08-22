import type { Energy } from './selectNowTask'

export function TodayHeader({ date, energy, onEnergyChange }: { date: Date; energy: Energy; onEnergyChange: (energy: Energy) => void }) {
  return <header className="today-header">
    <div><span>오늘도 무리하지 말고</span><h2>한 가지씩 시작해요</h2></div>
    <time dateTime={date.toISOString()}>{new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', month: 'long', day: 'numeric', weekday: 'long' }).format(date)}</time>
    <div className="energy" role="group" aria-label="현재 에너지">
      <span>에너지</span>
      {(['low', 'medium', 'high'] as const).map((value, index) => <button type="button" aria-pressed={energy === value} key={value} onClick={() => onEnergyChange(value)}>{['낮음', '보통', '높음'][index]}</button>)}
    </div>
  </header>
}
