import { verifyAcademyToken } from './edunap.js';
// 원장님께 그대로 보여 줄 수 있는 오류. 그 밖의 오류는 "잠시 후 다시 시도" 로 바꾼다.
export class UserError extends Error {}

// Vercel 함수와 로컬 서버가 함께 쓰는 처리기. 사진·학생 내용은 로그에 남기지 않는다.
export function makeHandler(run) {
  return async (req, res) => {
    const send = (status, body) => {
      res.statusCode = status;
      res.setHeader('content-type', 'application/json; charset=utf-8');
      res.end(JSON.stringify(body));
    };
    if (req.method !== 'POST') return send(405, { error: 'POST 로 보내 주세요' });
    // 이 앱은 에듀냅 안의 한 기능이다. 로그인을 따로 두지 않고 에듀냅이 서명해 준 학원 토큰을 본다.
    // 이 PC(npm run local)에서는 비밀이 없으니 그냥 열린다. 인터넷에 올리면 비밀 없이는 열지 않는다.
    const secret = process.env.EDUNAP_SHARED_SECRET;
    if (!secret && process.env.VERCEL) return send(500, { error: '서버에 에듀냅 연결 비밀이 설정되지 않았습니다' });
    if (secret) {
      const auth = req.headers.authorization || '';
      const academy = /^Edunap /i.test(auth) ? verifyAcademyToken(auth.replace(/^Edunap /i, ''), secret) : null;
      if (!academy) return send(401, { error: '에듀냅에서 다시 들어와 주세요' });
      req.academy = academy; // 학원 id·이름. 화면이 바꿀 수 없다 (서명 안에 있다)
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
