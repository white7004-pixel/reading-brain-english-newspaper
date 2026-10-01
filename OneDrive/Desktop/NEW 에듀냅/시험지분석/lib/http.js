import { timingSafeEqual } from 'node:crypto';
// 원장님께 그대로 보여 줄 수 있는 오류. 그 밖의 오류는 "잠시 후 다시 시도" 로 바꾼다.
export class UserError extends Error {}

// 암호 맞춰 보기. 길이로 눈치채지 못하게 같은 시간을 쓴다.
const same = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

// Vercel 함수와 로컬 서버가 함께 쓰는 처리기. 사진·학생 내용은 로그에 남기지 않는다.
export function makeHandler(run) {
  return async (req, res) => {
    const send = (status, body) => {
      res.statusCode = status;
      res.setHeader('content-type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(body));
    };
    if (req.method !== 'POST') return send(405, { error: 'POST 로 보내 주세요' });
    // 이 앱은 리딩브레인영어학원 것이다. 에듀냅과 묶지 않는다 (2026-10-01 원장 결정).
    // 원장님이 정한 암호 하나로 연다. 이 PC(npm run local)에서는 암호가 없으니 그냥 열린다.
    const password = process.env.APP_PASSWORD;
    if (!password && process.env.VERCEL) return send(500, { error: '서버에 암호가 설정되지 않았습니다' });
    if (password && !same(String(req.headers.authorization || '').replace(/^Bearer /i, ''), password)) {
      return send(401, { error: '암호가 맞지 않습니다' });
    }
    let body;
    try { body = req.body || {}; } catch { return send(400, { error: '요청을 읽지 못했습니다' }); } // Vercel 은 깨진 JSON 이면 여기서 던진다
    try {
      send(200, await run(body));
    } catch (e) {
      if (e instanceof UserError) return send(400, { error: e.message });
      console.error('실패', e?.status ?? '', e?.name ?? '', e?.message ?? '');
      send(502, { error: '잠시 후 다시 시도해 주세요' });
    }
  };
}
