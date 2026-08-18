/**
 * 문자(SMS/LMS).
 *
 * 국내는 솔라피(CoolSMS), 해외는 트윌리오를 지원한다.
 * 90바이트(한글 45자)를 넘으면 자동으로 LMS로 보낸다.
 */

import crypto from 'node:crypto';
import { request, requireConfig, ChannelError, smsByteLength } from './http.js';

export const meta = {
  key: 'sms',
  label: '문자(SMS)',
  icon: 'M',
  docs: 'https://developers.solapi.com/references/messages',
  help:
    '솔라피(구 쿨에스엠에스)는 발신번호 사전등록이 필요합니다. API Key/Secret과 등록된 발신번호를 입력하세요. ' +
    '해외 발송은 트윌리오를 선택하면 됩니다.',
  fields: [
    { key: 'provider', label: '문자 제공사', type: 'select', options: ['solapi', 'twilio'], default: 'solapi' },
    { key: 'apiKey', label: 'API Key / Twilio Account SID', type: 'text', secret: true },
    { key: 'apiSecret', label: 'API Secret / Twilio Auth Token', type: 'text', secret: true },
    { key: 'from', label: '발신번호', type: 'text', placeholder: '025551234' },
    { key: 'defaultTo', label: '기본 수신번호', type: 'text', placeholder: '01012345678' },
  ],
  targetFields: [
    { key: 'to', label: '받는 번호 (콤마로 여러 명)', placeholder: '01012345678, 01087654321' },
    { key: 'subject', label: 'LMS 제목 (선택)', placeholder: '리딩브레인 안내' },
  ],
};

export async function send({ config, target = {}, message }) {
  const provider = config.provider || 'solapi';
  const recipients = String(target.to || config.defaultTo || '')
    .split(',')
    .map((s) => s.replace(/[^\d+]/g, ''))
    .filter(Boolean);
  if (!recipients.length) throw new ChannelError('문자 수신번호가 없습니다.');

  const results = [];
  for (const to of recipients) {
    results.push(
      provider === 'twilio'
        ? await sendTwilio({ config, to, message })
        : await sendSolapi({ config, to, message, subject: target.subject }),
    );
  }
  return { detail: `${recipients.length}명 발송 완료 (${results.join(' / ')})` };
}

async function sendSolapi({ config, to, message, subject }) {
  requireConfig(config, ['apiKey', 'apiSecret', 'from'], '문자(솔라피)');
  const isLms = smsByteLength(message) > 90;
  const payload = {
    message: {
      to,
      from: config.from.replace(/[^\d]/g, ''),
      text: message,
      type: isLms ? 'LMS' : 'SMS',
      ...(isLms ? { subject: subject || '알림' } : {}),
    },
  };

  const { json, ok, status, text } = await request('https://api.solapi.com/messages/v4/send', {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: solapiAuthHeader(config),
    },
    body: JSON.stringify(payload),
  });

  if (!ok || json?.errorCode) {
    const reason = json?.errorMessage || json?.errorCode || `HTTP ${status} ${text.slice(0, 200)}`;
    throw new ChannelError(`문자 전송 실패(${to}): ${reason}`);
  }
  return `${to}:${isLms ? 'LMS' : 'SMS'}`;
}

function solapiAuthHeader(config) {
  const date = new Date().toISOString();
  const salt = crypto.randomBytes(32).toString('hex');
  const signature = crypto.createHmac('sha256', config.apiSecret).update(date + salt).digest('hex');
  return `HMAC-SHA256 apiKey=${config.apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

async function sendTwilio({ config, to, message }) {
  requireConfig(config, ['apiKey', 'apiSecret', 'from'], '문자(트윌리오)');
  const auth = Buffer.from(`${config.apiKey}:${config.apiSecret}`).toString('base64');
  const body = new URLSearchParams({ To: to, From: config.from, Body: message }).toString();
  const { json, ok, status, text } = await request(
    `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(config.apiKey)}/Messages.json`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
      body,
    },
  );
  if (!ok) {
    throw new ChannelError(`문자 전송 실패(${to}): ${json?.message || `HTTP ${status} ${text.slice(0, 200)}`}`);
  }
  return `${to}:${json?.sid || 'sent'}`;
}
