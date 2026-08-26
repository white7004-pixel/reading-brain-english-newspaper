import { useState } from 'react'
import type { RecurringTaskInstance, RecurringTaskTemplate } from '../../core/model/recurrence'
import { settingsRepository } from '../settings/settingsRepository'

const QUOTES = [
  '완벽하게 끝내는 것보다 작게 시작하는 편이 오늘을 바꿔요.',
  '집중이 흐트러진 건 실패가 아니라, 다시 돌아올 신호예요.',
  '오늘의 10분은 내일의 부담을 조금 줄여줘요.',
  '아주 작은 움직임도 멈춰 있는 것보다 충분히 소중해요.',
]

function quoteIndex(day: string) {
  return [...day].reduce((sum, value) => sum + value.charCodeAt(0), 0) % QUOTES.length
}

export function DailyCareCard({ day, templates, instances, onComplete }: {
  day: string
  templates: RecurringTaskTemplate[]
  instances: RecurringTaskInstance[]
  onComplete: (instance: RecurringTaskInstance) => void
}) {
  const [shortened, setShortened] = useState<ReadonlySet<string>>(() => new Set())
  const [quoteOffset, setQuoteOffset] = useState(0)
  const [quoteHidden, setQuoteHidden] = useState(() => localStorage.getItem('monggle.quote.hidden-day') === day)
  const settings = settingsRepository.load()
  const templateById = new Map(templates.map((template) => [template.id, template]))
  const routines = instances.flatMap((instance) => {
    const template = templateById.get(instance.templateId)
    const enabled = template?.category === 'reading' ? settings.readingEnabled : template?.category === 'exercise' ? settings.exerciseEnabled : false
    return template && template.active && enabled
      ? [{ instance, template }]
      : []
  })
  if (routines.length === 0) return null

  const hideQuote = () => {
    localStorage.setItem('monggle.quote.hidden-day', day)
    setQuoteHidden(true)
  }

  return <section className="daily-care-card" aria-label="나를 챙기는 루틴">
    <div className="today-section-heading">
      <div><span>잘 해내기 전에, 나부터</span><h2>나를 챙기는 루틴</h2></div>
      <strong>{routines.filter(({ instance }) => instance.status === 'completed').length}/{routines.length}</strong>
    </div>
    {settings.motivationEnabled && !quoteHidden && <div className="daily-care-card__quote">
      <blockquote>{QUOTES[(quoteIndex(day) + quoteOffset) % QUOTES.length]}</blockquote>
      <div><button type="button" onClick={() => setQuoteOffset((value) => value + 1)}>다른 문장</button><button type="button" onClick={hideQuote}>오늘은 명언 숨기기</button></div>
    </div>}
    <ul>{routines.map(({ instance, template }) => {
      const completed = instance.status === 'completed'
      const configuredMinutes = template.category === 'reading' ? settings.readingMinutes : settings.exerciseMinutes
      const minutes = shortened.has(instance.id) ? 3 : configuredMinutes
      return <li key={instance.id} aria-label={`${template.title} 루틴`} className={completed ? 'is-completed' : ''}>
        <button type="button" className="daily-care-card__check" disabled={completed} onClick={() => onComplete(instance)} aria-label={`${template.title} 완료`}>{completed ? '✓' : '○'}</button>
        <div><strong>{template.category === 'reading' ? '📖' : '🧘'} {template.title}</strong><small>{minutes}분 · {template.firstAction}</small></div>
        {!completed && minutes !== 3 && <button type="button" className="daily-care-card__shrink" onClick={() => setShortened((current) => new Set(current).add(instance.id))} aria-label={`${template.title} 3분으로 줄이기`}>바쁜 날엔 3분</button>}
      </li>
    })}</ul>
    <p className="daily-care-card__reassurance">못 해도 괜찮아요. 내일 다시, 더 작게 시작하면 돼요.</p>
  </section>
}
