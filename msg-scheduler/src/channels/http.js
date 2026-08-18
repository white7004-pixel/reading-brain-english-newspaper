/** 채널 어댑터들이 공유하는 HTTP 도우미. */

const DEFAULT_TIMEOUT_MS = 15_000;

export class ChannelError extends Error {
  constructor(message, { status, body } = {}) {
    super(message);
    this.name = 'ChannelError';
    this.status = status;
    this.body = body;
  }
}

export async function request(url, { method = 'POST', headers = {}, body, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  let res;
  try {
    res = await fetch(url, { method, headers, body, signal: AbortSignal.timeout(timeoutMs) });
  } catch (err) {
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      throw new ChannelError(`요청 시간 초과(${timeoutMs / 1000}초): ${url}`);
    }
    throw new ChannelError(`네트워크 오류: ${err.message}`);
  }

  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // JSON이 아닌 응답(슬랙 웹훅의 "ok" 등)도 정상 경로다.
  }
  return { res, text, json, ok: res.ok, status: res.status };
}

export function formEncode(obj) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;
    params.append(key, typeof value === 'string' ? value : JSON.stringify(value));
  }
  return params.toString();
}

export function requireConfig(config, keys, channelLabel) {
  const missing = keys.filter((k) => !config[k]);
  if (missing.length) {
    throw new ChannelError(`${channelLabel} 설정이 비어 있습니다: ${missing.join(', ')}`);
  }
}

/** 한글은 2바이트로 세는 SMS 기준 길이. */
export function smsByteLength(text) {
  let bytes = 0;
  for (const ch of text) bytes += ch.codePointAt(0) < 128 ? 1 : 2;
  return bytes;
}

/** 길이 제한이 있는 채널을 위해 문단 경계를 최대한 지키며 자른다. */
export function chunkText(text, limit) {
  if (text.length <= limit) return [text];
  const chunks = [];
  let rest = text;
  while (rest.length > limit) {
    let cut = rest.lastIndexOf('\n', limit);
    if (cut < limit * 0.5) cut = rest.lastIndexOf(' ', limit);
    if (cut < limit * 0.5) cut = limit;
    chunks.push(rest.slice(0, cut).trimEnd());
    rest = rest.slice(cut).trimStart();
  }
  if (rest) chunks.push(rest);
  return chunks;
}
