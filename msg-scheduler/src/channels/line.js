/**
 * LINE: Messaging API로 공식계정(OA) 친구에게 푸시/전체 발송.
 *
 * 알아둘 점:
 *  - LINE Developers 에서 Messaging API 채널을 만들고 Channel Access Token 을 발급받는다.
 *  - 개별 발송(push)은 상대의 userId/groupId 가 필요한데, LINE 은 이를 웹훅으로만 알려준다.
 *    이 앱의 /webhooks/line 주소를 콘솔에 등록해두면 봇에게 말을 건 사람이 자동 수집된다.
 *    서버가 외부에서 접속 불가능하면 콘솔 Basic settings 의 "Your user ID"를 직접 넣으면 된다.
 *  - broadcast 는 OA 를 친구 추가한 전원에게 발송된다 (무료 플랜 월 발송량 제한 주의).
 *  - 텍스트는 메시지당 5000자, 요청당 5개까지라 길면 자동 분할한다.
 */

import crypto from 'node:crypto';
import { request, requireConfig, ChannelError, chunkText } from './http.js';

const DEFAULT_API = 'https://api.line.me';
const TEXT_LIMIT = 4900; // 한도 5000에서 "(1/3)" 표기 여유를 뺀 값
const MESSAGES_PER_REQUEST = 5;
const MAX_SOURCES = 20;

export const meta = {
  key: 'line',
  label: 'LINE',
  icon: 'L',
  docs: 'https://developers.line.biz/en/reference/messaging-api/#send-push-message',
  help:
    'LINE Developers에서 Messaging API 채널을 만들고 Channel Access Token(long-lived)을 발급받으세요. ' +
    '받는 사람 ID는 웹훅 URL(이 서버의 /webhooks/line)을 콘솔에 등록해두면 [보낸 사람 찾기]로 수집되고, ' +
    '서버가 외부 공개가 아니면 콘솔의 "Your user ID"를 직접 입력하면 됩니다. ' +
    'broadcast 모드는 공식계정을 친구 추가한 전원에게 보냅니다.',
  fields: [
    { key: 'channelAccessToken', label: 'Channel Access Token', type: 'text', secret: true },
    { key: 'channelSecret', label: 'Channel Secret (웹훅 검증용)', type: 'text', secret: true },
    { key: 'defaultTo', label: '기본 받는 사람 (userId/groupId)', type: 'text', placeholder: 'U4af4980629... 또는 C...' },
  ],
  targetFields: [
    { key: 'mode', label: '발송 방식', type: 'select', options: ['push', 'broadcast'], default: 'push' },
    { key: 'to', label: '받는 사람 (push, 비우면 기본값)', placeholder: 'U... / C... / R...' },
  ],
};

function apiBase(config) {
  return (config.apiBase || DEFAULT_API).replace(/\/$/, '');
}

export async function send({ config, target = {}, message }) {
  requireConfig(config, ['channelAccessToken'], 'LINE');
  const mode = target.mode || 'push';
  const chunks = chunkText(message, TEXT_LIMIT);
  const texts = chunks.map((chunk, i) => (chunks.length > 1 ? `${chunk}\n(${i + 1}/${chunks.length})` : chunk));

  let to = null;
  if (mode !== 'broadcast') {
    to = target.to || config.defaultTo;
    if (!to) throw new ChannelError('LINE 받는 사람(userId/groupId)이 필요합니다. [보낸 사람 찾기]로 수집하거나 직접 입력하세요.');
  }

  // 요청당 5개 제한에 맞춰 나눠 보낸다.
  for (let i = 0; i < texts.length; i += MESSAGES_PER_REQUEST) {
    const messages = texts.slice(i, i + MESSAGES_PER_REQUEST).map((text) => ({ type: 'text', text }));
    const url = mode === 'broadcast' ? `${apiBase(config)}/v2/bot/message/broadcast` : `${apiBase(config)}/v2/bot/message/push`;
    const body = mode === 'broadcast' ? { messages } : { to: String(to), messages };
    const { json, ok, status, text: raw } = await request(url, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${config.channelAccessToken}`,
      },
      body: JSON.stringify(body),
    });
    if (!ok) {
      const detail = json?.message || raw.slice(0, 200);
      throw new ChannelError(`LINE 전송 실패: HTTP ${status} ${detail}`);
    }
  }

  return {
    detail: mode === 'broadcast' ? `전체 발송(broadcast) ${texts.length}건 완료` : `${to} 전송 완료 (${texts.length}건)`,
  };
}

/** 웹훅 서명 검증: X-Line-Signature = HMAC-SHA256(body, channelSecret) base64 */
export function verifySignature(rawBody, signature, channelSecret) {
  if (!channelSecret || !signature) return false;
  const expected = crypto.createHmac('sha256', channelSecret).update(rawBody).digest('base64');
  const a = Buffer.from(expected);
  const b = Buffer.from(String(signature));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** 웹훅 이벤트에서 발신원(user/group/room) 목록을 뽑는다. */
export function extractSources(events = []) {
  const sources = [];
  for (const event of events) {
    const src = event?.source;
    if (!src?.type) continue;
    const id = src.groupId || src.roomId || src.userId;
    if (!id) continue;
    sources.push({ id, type: src.type, userId: src.userId || null });
  }
  return sources;
}

/** userId의 프로필 이름을 가져온다. 실패해도 발송에는 지장 없으니 null로 넘긴다. */
export async function fetchDisplayName({ config, userId }) {
  try {
    const { json, ok } = await request(`${apiBase(config)}/v2/bot/profile/${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${config.channelAccessToken}` },
    });
    return ok ? json?.displayName || null : null;
  } catch {
    return null;
  }
}

/** 수집된 발신원 목록에 새 발신원을 합친다(중복 제거, 최신 우선, 상한 유지). */
export function mergeSources(existing = [], incoming = []) {
  const map = new Map();
  for (const item of [...incoming, ...existing]) {
    if (!map.has(item.id)) map.set(item.id, item);
  }
  return [...map.values()].slice(0, MAX_SOURCES);
}
