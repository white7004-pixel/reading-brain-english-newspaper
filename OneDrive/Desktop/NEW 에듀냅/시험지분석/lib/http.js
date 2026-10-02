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
    // 이 앱은 리딩브레인영어학원 것이다. 에듀냅과 묶지 않는다 (2026-10-01 원장 결정).
    // 암호는 두지 않는다 (2026-10-02 원장 결정).
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
