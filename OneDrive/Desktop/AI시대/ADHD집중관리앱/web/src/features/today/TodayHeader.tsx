import type { Energy } from './selectNowTask'

export function TodayHeader({ date, energy, total, completed, onEnergyChange, onAdd }: { date: Date; energy: Energy; total: number; completed: number; onEnergyChange: (energy: Energy) => void; onAdd: () => void }) {
  const progress = total === 0 ? 0 : Math.round(completed / total * 100)
  return <header className="today-header">
    <div><time dateTime={date.toISOString()}>{new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', month: 'long', day: 'numeric', weekday: 'long' }).format(date)}</time><h2>오늘</h2></div>
    <button className="today-add" type="button" onClick={onAdd}>+ 추가</button>
    <div className="today-progress-copy"><strong>{completed}개 완료 · {total}개 중</strong><label>에너지<select aria-label="현재 에너지" value={energy} onChange={(event) => onEnergyChange(event.target.value as Energy)}><option value="low">낮음</option><option value="medium">보통</option><option value="high">높음</option></select></label></div>
    <div className="today-progress" role="progressbar" aria-label="오늘 진행률" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div>
  </header>
}
