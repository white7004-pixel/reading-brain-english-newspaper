import { put, list, get } from '@vercel/blob';
import { notesHandler } from '../lib/notes.js';

// 비공개 Blob 저장소(BLOB_READ_WRITE_TOKEN). 화면당 선생님 50분까지라 목록 한 쪽(1000개)이면 충분하다.
export default notesHandler({
  put: (path, text) => put(path, text, { access: 'private', allowOverwrite: true, addRandomSuffix: false, contentType: 'application/json' }),
  paths: async (prefix) => (await list({ prefix })).blobs.map((b) => b.pathname),
  read: async (path) => { const r = await get(path, { access: 'private', useCache: false }); return r?.stream ? new Response(r.stream).text() : null; },
});
