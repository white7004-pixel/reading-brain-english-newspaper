import type { RescheduleProposal } from '../../core/model/calendarAvailability'
import type { Task } from '../../core/model/task'

const time = (value?: string) => value ? new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', hour: 'numeric', minute: '2-digit' }).format(new Date(value)) : '미정'

interface Props { proposal: RescheduleProposal; tasks: Task[]; onApply(): void; onDismiss(): void }

export function RescheduleProposalCard({ proposal, tasks, onApply, onDismiss }: Props) {
  if (proposal.kind !== 'fresh' || proposal.moves.length === 0) return null
  return <section className="calendar-proposal" aria-label="Google 일정 재배치 제안">
    <span>빈 시간 발견</span><h2>Google 일정에 맞춘 새 배치안</h2>
    <p>Google 일정은 그대로 두고, 몽글의 미션 시간만 옮겨요.</p>
    <ul>{proposal.moves.map((move) => <li key={move.taskId}><strong>{tasks.find((task) => task.id === move.taskId)?.title ?? '필수 미션'}</strong><span>{time(move.from)} → {time(move.to)}</span></li>)}</ul>
    <div className="capture-actions"><button className="primary" type="button" onClick={onApply}>이 배치 적용</button><button type="button" onClick={onDismiss}>나중에</button></div>
  </section>
}
