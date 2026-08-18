/**
 * 텔레그램: 봇 API로 개인/그룹/채널에 메시지 전송.
 *
 * 연동이 가장 쉬운 축에 든다. @BotFather 로 봇을 만들어 토큰만 받으면 되고,
 * 받는 쪽은 봇에게 먼저 말을 걸어두기만 하면 된다(그룹은 봇 초대).
 * chat_id 는 [대화방 찾기] 버튼이 getUpdates 로 찾아준다.
 */

import { request, requireConfig, ChannelError, chunkText } from './http.js';

const DEFAULT_API = 'https://api.telegram.org';
const TEXT_LIMIT = 4000; // 공식 한도 4096에서 "(1/3)" 표기 여유를 뺀 값

export const meta = {
  key: 'telegram',
  label: '텔레그램',
  icon: 'T',
  docs: 'https://core.telegram.org/bots/api#sendmessage',
  help:
    '텔레그램에서 @BotFather 에게 /newbot 을 보내 봇을 만들고 토큰을 받으세요. ' +
    '받을 사람이 봇에게 아무 메시지나 한 번 보내면(그룹은 봇을 초대), [대화방 찾기]로 chat_id를 확인할 수 있습니다.',
  fields: [
    { key: 'botToken', label: '봇 토큰', type: 'text', secret: true, placeholder: '123456:ABC-DEF...' },
    { key: 'defaultChatId', label: '기본 대화방 chat_id', type: 'text', placeholder: '123456789 또는 -100...' },
  ],
  targetFields: [
    { key: 'chatId', label: '대화방 chat_id (비우면 기본값)', placeholder: '123456789' },
  ],
};

function apiBase(config) {
  return (config.apiBase || DEFAULT_API).replace(/\/$/, '');
}

export async function send({ config, target = {}, message }) {
  requireConfig(config, ['botToken'], '텔레그램');
  const chatId = target.chatId || config.defaultChatId;
  if (!chatId) throw new ChannelError('텔레그램 chat_id가 필요합니다. [대화방 찾기]로 확인하세요.');

  const chunks = chunkText(message, TEXT_LIMIT);
  let lastId = null;
  for (const [i, chunk] of chunks.entries()) {
    const text = chunks.length > 1 ? `${chunk}\n(${i + 1}/${chunks.length})` : chunk;
    const { json, status, text: raw } = await request(`${apiBase(config)}/bot${config.botToken}/sendMessage`, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ chat_id: String(chatId), text }),
    });
    if (!json?.ok) {
      throw new ChannelError(`텔레그램 전송 실패: ${json?.description || `HTTP ${status} ${raw.slice(0, 200)}`}`);
    }
    lastId = json.result?.message_id;
  }
  return { detail: `대화방 ${chatId} 전송 완료 (${chunks.length}건, message_id=${lastId})` };
}

/**
 * 봇이 최근에 받은 메시지에서 대화방 목록을 뽑아준다.
 * 사용자가 chat_id 를 직접 알아내야 하는 번거로움을 없애는 용도.
 */
export async function listChats({ config }) {
  requireConfig(config, ['botToken'], '텔레그램');
  const { json, status, text } = await request(`${apiBase(config)}/bot${config.botToken}/getUpdates?limit=100`, {
    method: 'GET',
  });
  if (!json?.ok) {
    throw new ChannelError(`대화방 조회 실패: ${json?.description || `HTTP ${status} ${text.slice(0, 200)}`}`);
  }
  const chats = new Map();
  for (const update of json.result || []) {
    const chat = update.message?.chat || update.channel_post?.chat || update.my_chat_member?.chat;
    if (!chat) continue;
    const name = chat.title || [chat.first_name, chat.last_name].filter(Boolean).join(' ') || chat.username || '(이름 없음)';
    chats.set(chat.id, { id: chat.id, name, type: chat.type });
  }
  return [...chats.values()];
}
