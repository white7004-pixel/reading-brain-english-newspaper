import { useState } from 'react'
import type { Task } from '../../core/model/task'
import type { TaskCheckInAction } from './taskCheckIn'
import type { MasteryTone } from './taskMastery'

export function PersistentNowTask({ task, line, onRespond, tone = 'supportive' }: {
  task: Task
  line: string
  tone?: MasteryTone
  onRespond: (action: TaskCheckInAction, delayMinutes?: number) => void
}) {
  const [choosingDelay, setChoosingDelay] = useState(false)
  return <aside className="persistent-now-task" data-testid="persistent-now-task" data-tone={tone} aria-label="몽글이의 지금 할 일 확인">
    <img src="/assets/mascot/monggle-3d-approved-v1.png" alt="" />
    <div><span>몽글이가 물어봐요</span><strong>{line}</strong>
      {!choosingDelay ? <div className="persistent-now-task__actions">
        <button type="button" onClick={() => onRespond('done')}>했어</button>
        <button type="button" onClick={() => onRespond('in_progress')}>하는 중</button>
        <button type="button" onClick={() => setChoosingDelay(true)}>나중에</button>
      </div> : <div className="persistent-now-task__actions" aria-label="다시 물을 시간">
        <button type="button" onClick={() => onRespond('later', 30)}>30분 뒤</button>
        <button type="button" onClick={() => onRespond('later', 60)}>1시간 뒤</button>
        <button type="button" onClick={() => onRespond('later', 480)}>오늘 저녁</button>
      </div>}
    </div>
  </aside>
}
