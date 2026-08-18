/**
 * 카카오톡: 카카오 REST API의 "나에게 보내기(메모)" 와 "친구에게 보내기".
 *
 * 알아둘 제약 (카카오 정책):
 *  - 임의의 상대에게 자유롭게 보내는 API는 없다. 나에게 보내기는 즉시 가능하고,
 *    친구에게 보내기는 카카오싱크/앱 심사와 friends 동의항목이 필요하다.
 *  - 텍스트 템플릿은 200자 제한이라 길면 여러 건으로 나눠 보낸다.
 *  - access_token은 보통 6시간이라 refresh_token으로 자동 갱신한다.
 */

import { request, formEncode, requireConfig, ChannelError, chunkText } from './http.js';

const KAPI = 'https://kapi.kakao.com';
const KAUTH = 'https://kauth.kakao.com';
const TEXT_LIMIT = 190; // 200자 제한에서 "(1/3)" 표기 여유를 뺀 값

export const meta = {
  key: 'kakaotalk',
  label: '카카오톡',
  icon: 'K',
  docs: 'https://developers.kakao.com/docs/latest/ko/kakaotalk-message/rest-api',
  help:
    '카카오 개발자센터에서 앱을 만들고 카카오 로그인 + 카카오톡 메시지(talk_message) 동의항목을 켜세요. ' +
    '설정 저장 후 [카카오 인증] 버튼으로 한 번 로그인하면 토큰이 자동 저장·갱신됩니다. ' +
    '친구에게 보내기는 friends 동의항목과 앱 심사가 추가로 필요합니다.',
  fields: [
    { key: 'restApiKey', label: 'REST API 키', type: 'text', secret: true },
    { key: 'clientSecret', label: 'Client Secret (설정한 경우)', type: 'text', secret: true },
    { key: 'redirectUri', label: 'Redirect URI', type: 'text', placeholder: 'http://localhost:3000/oauth/kakao/callback' },
    { key: 'accessToken', label: 'Access Token (자동 저장)', type: 'text', secret: true },
    { key: 'refreshToken', label: 'Refresh Token (자동 저장)', type: 'text', secret: true },
  ],
  targetFields: [
    { key: 'mode', label: '대상', type: 'select', options: ['memo', 'friends'], default: 'memo' },
    { key: 'receiverUuids', label: '친구 UUID (콤마 구분, friends 모드)', placeholder: 'uuid1, uuid2' },
    { key: 'linkUrl', label: '함께 보낼 링크 (선택)', placeholder: 'https://...' },
  ],
};

export function authorizeUrl(config, scope = 'talk_message') {
  requireConfig(config, ['restApiKey', 'redirectUri'], '카카오톡');
  const params = new URLSearchParams({
    client_id: config.restApiKey,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope,
  });
  return `${KAUTH}/oauth/authorize?${params}`;
}

export async function exchangeCode({ config, code }) {
  requireConfig(config, ['restApiKey', 'redirectUri'], '카카오톡');
  const { json, status, text } = await request(`${KAUTH}/oauth/token`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    body: formEncode({
      grant_type: 'authorization_code',
      client_id: config.restApiKey,
      client_secret: config.clientSecret || undefined,
      redirect_uri: config.redirectUri,
      code,
    }),
  });
  if (!json?.access_token) {
    throw new ChannelError(`카카오 토큰 발급 실패: HTTP ${status} ${text.slice(0, 300)}`);
  }
  return tokenPatch(json);
}

async function refreshAccessToken({ config, saveConfig }) {
  requireConfig(config, ['restApiKey', 'refreshToken'], '카카오톡');
  const { json, status, text } = await request(`${KAUTH}/oauth/token`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    body: formEncode({
      grant_type: 'refresh_token',
      client_id: config.restApiKey,
      client_secret: config.clientSecret || undefined,
      refresh_token: config.refreshToken,
    }),
  });
  if (!json?.access_token) {
    throw new ChannelError(
      `카카오 토큰 갱신 실패: HTTP ${status} ${text.slice(0, 300)} — [카카오 인증]을 다시 진행하세요.`,
    );
  }
  const patch = tokenPatch(json, config);
  Object.assign(config, patch);
  await saveConfig?.(patch);
  return config.accessToken;
}

function tokenPatch(json, previous = {}) {
  const patch = {
    accessToken: json.access_token,
    accessTokenExpiresAt: Date.now() + (json.expires_in ?? 21600) * 1000,
  };
  // 갱신 응답에는 refresh_token이 없을 수 있다. 그때는 기존 값을 유지한다.
  if (json.refresh_token) patch.refreshToken = json.refresh_token;
  else if (previous.refreshToken) patch.refreshToken = previous.refreshToken;
  return patch;
}

async function ensureToken({ config, saveConfig }) {
  const expiresAt = Number(config.accessTokenExpiresAt || 0);
  const expiringSoon = !expiresAt || expiresAt - Date.now() < 5 * 60 * 1000;
  if (config.accessToken && !expiringSoon) return config.accessToken;
  if (config.refreshToken) return refreshAccessToken({ config, saveConfig });
  if (config.accessToken) return config.accessToken;
  throw new ChannelError('카카오톡 토큰이 없습니다. 설정에서 [카카오 인증]을 먼저 진행하세요.');
}

export async function send({ config, target = {}, message, saveConfig }) {
  const token = await ensureToken({ config, saveConfig });
  const mode = target.mode || 'memo';
  const chunks = chunkText(message, TEXT_LIMIT);
  const results = [];

  for (const [i, chunk] of chunks.entries()) {
    const body = chunks.length > 1 ? `${chunk}\n(${i + 1}/${chunks.length})` : chunk;
    const templateObject = {
      object_type: 'text',
      text: body,
      link: target.linkUrl ? { web_url: target.linkUrl, mobile_web_url: target.linkUrl } : {},
    };

    if (mode === 'friends') {
      const uuids = String(target.receiverUuids || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      if (!uuids.length) throw new ChannelError('친구 UUID가 필요합니다 (friends 모드).');
      results.push(await postTemplate(`${KAPI}/v1/api/talk/friends/message/default/send`, token, {
        receiver_uuids: uuids,
        template_object: templateObject,
      }));
    } else {
      results.push(await postTemplate(`${KAPI}/v2/api/talk/memo/default/send`, token, {
        template_object: templateObject,
      }));
    }
  }

  const label = mode === 'friends' ? '친구에게 보내기' : '나에게 보내기';
  const failures = results.flatMap((r) => r.failureInfo || []);
  const suffix = failures.length ? ` (일부 실패: ${JSON.stringify(failures).slice(0, 200)})` : '';
  return { detail: `${label} ${chunks.length}건 전송 완료${suffix}` };
}

async function postTemplate(url, token, payload) {
  const { json, ok, status, text } = await request(url, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
    body: formEncode(payload),
  });
  if (!ok || (json && json.code !== undefined && json.code !== 0 && json.result_code === undefined)) {
    const msg = json?.msg || text.slice(0, 300);
    throw new ChannelError(`카카오톡 전송 실패: HTTP ${status} ${msg}`);
  }
  return { failureInfo: json?.failure_info };
}
