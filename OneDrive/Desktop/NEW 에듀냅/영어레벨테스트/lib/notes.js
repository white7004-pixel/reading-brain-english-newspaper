// 선생님 검수 의견: 선생님 한 분이 화면(문제지 forms / 문항 은행 bank)마다 파일 하나. 보낸 문항만 그 파일에 합친다(빈 의견은 지우기).
import { UserError } from './http.js';

const PAGES = ['forms', 'bank'];
const MAX = 1000;
const TEACHERS = 50; // ponytail: 로그인 없는 공유 링크라 파일이 끝없이 늘지 않게 화면당 상한

export function cleanNotes(body) {
  const page = body?.page;
  if (!PAGES.includes(page)) throw new UserError('어느 검수 화면인지 모릅니다');
  const teacher = String(body?.teacher ?? '').normalize('NFC').trim();
  if (!teacher || teacher.length > 20) throw new UserError('이름을 20자 안으로 적어 주세요');
  const entries = Object.entries(body?.notes && typeof body.notes === 'object' ? body.notes : {});
  if (entries.length > MAX) throw new UserError('의견이 너무 많습니다');
  const notes = {};
  for (const [id, n] of entries) {
    if (!/^[\w-]{1,60}$/.test(id)) continue;
    const v = ['ok', 'fix'].includes(n?.v) ? n.v : '';
    const memo = String(n?.memo ?? '').trim().slice(0, 500);
    notes[id] = { v, memo };
  }
  return { page, teacher, notes };
}

// store: { put(path, text), paths(prefix) → [path], read(path) → text|null } — Vercel 에서는 Blob, 테스트에서는 메모리
export function notesHandler(store) {
  return async (req, res) => {
    const send = (status, body) => {
      res.statusCode = status;
      res.setHeader('content-type', 'application/json; charset=utf-8');
      res.setHeader('cache-control', 'no-store');
      res.end(JSON.stringify(body));
    };
    try {
      if (req.method === 'GET') {
        const page = new URL(req.url, 'http://x').searchParams.get('page');
        if (!PAGES.includes(page)) throw new UserError('어느 검수 화면인지 모릅니다');
        const texts = await Promise.all((await store.paths(`notes/${page}/`)).slice(0, TEACHERS + 5).map((p) => store.read(p).catch(() => null)));
        const teachers = texts.flatMap((t) => { try { const j = JSON.parse(t); return j?.notes ? [j] : []; } catch { return []; } });
        return send(200, { teachers });
      }
      if (req.method === 'POST') {
        const { page, teacher, notes } = cleanNotes(req.body);
        const at = new Date().toISOString();
        const path = `notes/${page}/${Buffer.from(teacher).toString('hex')}.json`;
        const paths = await store.paths(`notes/${page}/`);
        let old = {};
        if (paths.includes(path)) { try { old = JSON.parse(await store.read(path)).notes || {}; } catch { /* 망가졌으면 새로 */ } }
        else if (paths.length >= TEACHERS) throw new UserError(`검토하시는 분이 ${TEACHERS}분을 넘었습니다. 원장님께 알려 주세요`);
        const merged = { ...old };
        for (const [id, n] of Object.entries(notes)) { if (n.v || n.memo) merged[id] = n; else delete merged[id]; }
        if (Object.keys(merged).length > MAX) throw new UserError('의견이 너무 많습니다');
        await store.put(path, JSON.stringify({ teacher, notes: merged, at }));
        return send(200, { saved: Object.keys(merged).length, at });
      }
      send(405, { error: 'GET 이나 POST 로 보내 주세요' });
    } catch (e) {
      if (e instanceof UserError) return send(400, { error: e.message });
      console.error('의견 저장 실패', e?.name ?? '', e?.message ?? '');
      send(502, { error: '잠시 후 다시 시도해 주세요' });
    }
  };
}
