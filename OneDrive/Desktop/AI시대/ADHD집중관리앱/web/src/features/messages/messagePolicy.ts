import type { MessagePlatform } from '../../core/model/message'

export type DeliveryMode = 'automatic' | 'manual'

export function deliveryModeFor(_platform: MessagePlatform, hasAutomaticDelivery: boolean): DeliveryMode {
  return hasAutomaticDelivery ? 'automatic' : 'manual'
}
