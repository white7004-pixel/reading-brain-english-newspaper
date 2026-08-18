/** 카카오워크: 봇 앱 키로 대화방/이메일 대상 메시지 전송. */

import { request, requireConfig, ChannelError } from './http.js';

const BASE = 'https://api.kakaowork.com/v1';

export const meta = {
  key: 'kakaowork',
  label: '카카오워크',
  icon: 'W',
  docs: 'https://docs.kakaoi.ai/kakao_work/',
  help: '카카오워크 개발자센터에서 봇을 만들고 App Key를 발급받으세요. 받는 사람은 이메일 또는 대화방 ID로 지정합니다.',
  fields: [
    { key: 'appKey', label: '봇 App Key', type: 'text', secret: true, placeholder: '앱 키 (Bearer 토큰)' },
    { key: 'defaultEmail', label: '기본 받는 사람 이메일', type: 'text' },
    { key: 'defaultConversationId', label: '기본 대화방 ID', type: 'text' },
  ],
  targetFields: [
    { key: 'email', label: '받는 사람 이메일', placeholder: 'user@company.com' },
    { key: 'conversationId', label: '대화방 ID (이메일 대신)', placeholder: '12345' },
  ],
};

export async function send({ config, target = {}, message }) {
  requireConfig(config, ['appKey'], '카카오워크');
  const conversationId = target.conversationId || config.defaultConversationId;
  const email = target.email || config.defaultEmail;

  if (!conversationId && !email) {
    throw new ChannelError('카카오워크는 대화방 ID 또는 받는 사람 이메일이 필요합니다.');
  }

  const useEmail = !conversationId;
  const url = useEmail ? `${BASE}/messages.send_by_email` : `${BASE}/messages.send`;
  const body = useEmail
    ? { email, text: message }
    : { conversation_id: String(conversationId), text: message };

  const { json, status, text } = await request(url, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${config.appKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!json?.success) {
    const reason = json?.error ? `${json.error.code}: ${json.error.message}` : `HTTP ${status} ${text.slice(0, 200)}`;
    throw new ChannelError(`카카오워크 전송 실패: ${reason}`);
  }
  return { detail: useEmail ? `${email} 전송 완료` : `대화방 ${conversationId} 전송 완료` };
}

/** 사용자 이메일로 1:1 대화방을 열어 conversation_id를 얻는다. */
export async function openConversation({ config, userId }) {
  requireConfig(config, ['appKey'], '카카오워크');
  const { json, status, text } = await request(`${BASE}/conversations.open`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${config.appKey}`,
    },
    body: JSON.stringify({ user_id: String(userId) }),
  });
  if (!json?.success) {
    throw new ChannelError(`대화방 열기 실패: ${json?.error?.message || `HTTP ${status} ${text.slice(0, 200)}`}`);
  }
  return json.conversation;
}
