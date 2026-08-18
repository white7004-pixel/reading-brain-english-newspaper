/** 슬랙: Incoming Webhook 또는 봇 토큰(chat.postMessage). */

import { request, requireConfig, ChannelError } from './http.js';

export const meta = {
  key: 'slack',
  label: '슬랙',
  icon: 'S',
  docs: 'https://api.slack.com/messaging/sending',
  help: 'Incoming Webhook URL만 있으면 바로 쓸 수 있습니다. 여러 채널에 보내려면 봇 토큰(xoxb-, chat:write 권한) 방식을 쓰세요.',
  fields: [
    { key: 'mode', label: '전송 방식', type: 'select', options: ['webhook', 'bot'], default: 'webhook' },
    { key: 'webhookUrl', label: 'Incoming Webhook URL', type: 'text', secret: true, placeholder: 'https://hooks.slack.com/services/...' },
    { key: 'botToken', label: '봇 토큰 (xoxb-)', type: 'text', secret: true },
    { key: 'defaultChannel', label: '기본 채널 (봇 모드)', type: 'text', placeholder: '#general 또는 C0123ABCD' },
  ],
  targetFields: [
    { key: 'channel', label: '채널 (비우면 기본값)', placeholder: '#공지 또는 C0123ABCD' },
  ],
};

export async function send({ config, target = {}, message }) {
  const mode = config.mode || (config.botToken ? 'bot' : 'webhook');

  if (mode === 'bot') {
    requireConfig(config, ['botToken'], '슬랙(봇)');
    const channel = target.channel || config.defaultChannel;
    if (!channel) throw new ChannelError('슬랙 봇 모드에서는 채널이 필요합니다.');
    const { json, status, text } = await request('https://slack.com/api/chat.postMessage', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${config.botToken}`,
      },
      body: JSON.stringify({ channel, text: message }),
    });
    if (!json?.ok) {
      throw new ChannelError(`슬랙 전송 실패: ${json?.error || `HTTP ${status} ${text.slice(0, 200)}`}`);
    }
    return { detail: `채널 ${channel} 전송 완료 (ts=${json.ts})` };
  }

  requireConfig(config, ['webhookUrl'], '슬랙(웹훅)');
  const payload = { text: message };
  if (target.channel) payload.channel = target.channel;
  const { ok, status, text } = await request(config.webhookUrl, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  if (!ok) throw new ChannelError(`슬랙 웹훅 실패: HTTP ${status} ${text.slice(0, 200)}`);
  return { detail: '웹훅 전송 완료' };
}
