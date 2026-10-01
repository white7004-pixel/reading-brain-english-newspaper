// 에듀냅이 서명해 넘기는 학원 토큰을 읽는다.
// 이 앱은 에듀냅 안의 한 기능이므로 따로 로그인을 두지 않는다 — 에듀냅이 이미 원장님을 안다.
//
// ⚠ 서명 방식은 에듀냅(`에듀냅/packages/blog-cloud/lib/auth.js` 의 signAcademyToken)과
//    **글자 하나까지 같아야 한다.** 저쪽은 CommonJS 라 그대로 가져다 쓸 수 없어 옮겨 적었다.
//    저쪽이 바뀌면 여기도 바꾼다. test/edunap.test.js 가 저쪽 코드를 베껴 토큰을 만들어 확인한다.
import crypto from 'node:crypto';

const mac = (data, secret) => crypto.createHmac('sha256', secret).update(data).digest('base64url');

/**
 * @returns {{id: string, name: string|null, reg: {blogUrl?: string, placeUrls?: string[]}|null} | null}
 *   토큰이 성하지 않거나 시간이 지났으면 null.
 */
export function verifyAcademyToken(token, secret, now = Date.now()) {
  const parts = String(token || '').split('.');
  const sig = parts.pop();
  const [id, exp, name, reg] = parts;
  if (!id || !exp || !sig || !secret || parts.length > 4) return null;
  const want = Buffer.from(mac(parts.join('.'), secret));
  const got = Buffer.from(sig);
  // 길이가 다르면 timingSafeEqual 이 던지므로 먼저 본다. 길이 자체는 비밀이 아니다
  if (want.length !== got.length || !crypto.timingSafeEqual(want, got)) return null;
  if (Number(exp) * 1000 < now) return null;
  const text = (s) => Buffer.from(s, 'base64url').toString();
  let reg2 = null;
  if (reg) { try { reg2 = JSON.parse(text(reg)); } catch { reg2 = null; } }
  return { id: text(id), name: name ? text(name) : null, reg: reg2 };
}
