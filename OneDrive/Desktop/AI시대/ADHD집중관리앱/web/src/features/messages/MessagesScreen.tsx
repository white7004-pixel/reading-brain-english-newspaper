import { useState, type FormEvent } from 'react'
import type { MessagePlatform } from '../../core/model/message'
import { deliveryModeFor } from './messagePolicy'
import { transformDraft, type MessageTone } from './transformTone'
import { emitCompanionEvent } from '../companion/companionEvents'

const platformLabels: Record<MessagePlatform, string> = {
  kakaotalk: '카카오톡', kakaowork: '카카오워크', slack: 'Slack', telegram: 'Telegram',
}

const automaticCapability: Record<MessagePlatform, boolean> = {
  kakaotalk: false, kakaowork: true, slack: true, telegram: true,
}

interface LocalSchedule {
  id: string
  platform: MessagePlatform
  recipient: string
  body: string
  scheduledAt: string
  deliveryMode: 'automatic' | 'manual'
}

export function MessagesScreen() {
  const [isComposing, setIsComposing] = useState(false)
  const [platform, setPlatform] = useState<MessagePlatform>('kakaotalk')
  const [recipient, setRecipient] = useState('')
  const [body, setBody] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [schedules, setSchedules] = useState<LocalSchedule[]>([])
  const mode = deliveryModeFor(platform, automaticCapability[platform])

  const applyTone = (tone: MessageTone) => setBody(transformDraft({ body, status: 'draft' }, tone).body)
  const save = (event: FormEvent) => {
    event.preventDefault()
    if (!recipient.trim() || !body.trim() || !scheduledAt) return
    setSchedules((current) => [{
      id: crypto.randomUUID?.() ?? String(Date.now()), platform, recipient: recipient.trim(),
      body: body.trim(), scheduledAt, deliveryMode: mode,
    }, ...current])
    setIsComposing(false); setRecipient(''); setBody(''); setScheduledAt('')
    emitCompanionEvent('message_scheduled')
  }

  return (
    <section className="messages-screen">
      <div className="section-heading">
        <div><span>메시지 예약</span><h2>잊기 전에 적어두세요</h2></div>
        <button className="primary" type="button" onClick={() => setIsComposing(true)}>새 예약</button>
      </div>
      {isComposing && (
        <form className="message-composer" onSubmit={save}>
          <label>플랫폼<select value={platform} onChange={(event) => setPlatform(event.target.value as MessagePlatform)}>
            {Object.entries(platformLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select></label>
          <label>받는 곳<input value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder="이름, 채널 또는 채팅방" /></label>
          <label className="full-width">메시지<textarea value={body} onChange={(event) => setBody(event.target.value)} /></label>
          <div className="tone-actions full-width" aria-label="문구 다듬기">
            <button type="button" onClick={() => applyTone('polite')}>정중하게</button>
            <button type="button" onClick={() => applyTone('business')}>업무용</button>
            <button type="button" onClick={() => applyTone('friendly')}>짧고 친근하게</button>
          </div>
          <label className="full-width">예약 시각<input type="datetime-local" value={scheduledAt} onChange={(event) => setScheduledAt(event.target.value)} /></label>
          <p className="delivery-note full-width">{mode === 'automatic' ? '연동 후 자동 발송할 수 있어요.' : '카카오톡 정책상 예약 시간에 알림을 받고 직접 전송해요.'}</p>
          <button className="primary full-width" type="submit">예약 저장</button>
        </form>
      )}
      <div className="message-list">
        {schedules.length === 0 && <p className="empty-state">예약한 메시지가 아직 없어요.</p>}
        {schedules.map((schedule) => <article key={schedule.id}>
          <div><span className="status-chip">예약됨</span><strong>{schedule.recipient}</strong></div>
          <p>{schedule.body}</p>
          <small>{platformLabels[schedule.platform]} · {schedule.scheduledAt.replace('T', ' ')} · {schedule.deliveryMode === 'manual' ? '직접 전송' : '자동 발송'}</small>
        </article>)}
      </div>
    </section>
  )
}
