/** 범용 웹훅: 디스코드, MS Teams, 사내 시스템 등 URL 하나로 받는 곳 전부. */

import { request, requireConfig, ChannelError } from './http.js';

export const meta = {
  key: 'webhook',
  label: '기타 웹훅',
  icon: 'H',
  docs: '',
  help:
    '디스코드·팀즈·사내 알림 서버처럼 URL로 받는 곳에 씁니다. ' +
    '본문 템플릿의 {{message}} 자리에 메시지가 들어갑니다. (디스코드: {"content":"{{message}}"}, 팀즈: {"text":"{{message}}"})',
  fields: [
    { key: 'url', label: '웹훅 URL', type: 'text', secret: true },
    { key: 'bodyTemplate', label: '본문 템플릿(JSON)', type: 'textarea', default: '{"text":"{{message}}"}' },
    { key: 'headers', label: '추가 헤더(JSON, 선택)', type: 'textarea', placeholder: '{"X-Token":"..."}' },
  ],
  targetFields: [
    { key: 'url', label: '이 예약만 다른 URL 사용 (선택)', placeholder: 'https://...' },
  ],
};

export async function send({ config, target = {}, message }) {
  const url = target.url || config.url;
  if (!url) throw new ChannelError('웹훅 URL이 없습니다.');
  requireConfig({ url }, ['url'], '웹훅');

  const template = config.bodyTemplate || '{"text":"{{message}}"}';
  // JSON 문자열 안에 안전하게 넣기 위해 따옴표째 만든 뒤 감싸는 따옴표를 벗긴다.
  const escaped = JSON.stringify(message).slice(1, -1);
  const body = template.replaceAll('{{message}}', escaped);

  let extraHeaders = {};
  if (config.headers) {
    try {
      extraHeaders = JSON.parse(config.headers);
    } catch {
      throw new ChannelError('추가 헤더가 올바른 JSON이 아닙니다.');
    }
  }

  const { ok, status, text } = await request(url, {
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extraHeaders },
    body,
  });
  if (!ok) throw new ChannelError(`웹훅 전송 실패: HTTP ${status} ${text.slice(0, 200)}`);
  return { detail: '웹훅 전송 완료' };
}
