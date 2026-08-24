import { describe, expect, it } from 'vitest'
import { importKakaoShare, importKakaoWork, syncGoogleEventsResponse } from './connectorAdapters'

describe('connector boundaries', () => {
  it('turns pasted KakaoTalk lines into review candidates', () => {
    const items = importKakaoShare('내일 학부모 상담 확인\n교재 주문', 'share-1')
    expect(items).toHaveLength(2)
    expect(items[0]).toMatchObject({ source: 'kakaotalk', sourceRef: 'share-1:1', status: 'pending_review' })
  })

  it('accepts only KakaoWork results with stable source ids', () => {
    expect(importKakaoWork([{ sourceId: 'message-1', text: '상담 회신' }, { text: '식별자 없음' }]))
      .toEqual([expect.objectContaining({ id: 'kakaowork:message-1', status: 'pending_review' })])
  })

  it('projects confirmed Google events without converting them to tasks', () => {
    const [event] = syncGoogleEventsResponse([{ id: 'event-1', summary: '교사 미팅', start: '2026-08-24T01:00:00Z', end: '2026-08-24T02:00:00Z', status: 'confirmed' }])
    expect(event).toMatchObject({ id: 'google:event-1', sourceRef: 'event-1', title: '교사 미팅', status: 'confirmed' })
    expect(event).not.toHaveProperty('taskId')
  })
})
