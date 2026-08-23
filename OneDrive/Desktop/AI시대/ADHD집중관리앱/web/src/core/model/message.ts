export type MessagePlatform = 'kakaotalk' | 'kakaowork' | 'slack' | 'telegram'
export type MessageStatus =
  | 'draft'
  | 'scheduled'
  | 'sending'
  | 'sent'
  | 'failed'
  | 'canceled'
  | 'manual_action_required'

export interface ScheduledMessage {
  id: string
  platform: MessagePlatform
  recipientLabel: string
  body: string
  scheduledAt: string
  timeZone: string
  status: MessageStatus
  deliveryMode: 'automatic' | 'manual'
  createdAt: string
  updatedAt: string
}
