// 이 PC 에서 화면과 API 를 함께 띄웁니다.   npm run local   (.env.local 에 ANTHROPIC_API_KEY, TRIAL_CODE)
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import extract from '../api/extract.js';
import report from '../api/report.js';

const ROOT = path.join(import.meta.dirname, '..', 'public');
const API = { '/api/extract': extract, '/api/report': report };
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8' };
const PORT = Number(process.env.PORT) || 4310;
process.env.TRIAL_CODE ||= 'local';

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const api = API[url.pathname];
  if (api) {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    try { req.body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch { req.body = {}; }
    return api(req, res);
  }
  let file;
  try {
    file = path.join(ROOT, url.pathname === '/' ? 'index.html' : path.normalize(decodeURIComponent(url.pathname)));
  } catch {
    res.statusCode = 400; return res.end(); // %E0 같은 깨진 주소
  }
  if (!file.startsWith(ROOT)) { res.statusCode = 403; return res.end(); }
  try {
    const data = await readFile(file);
    res.setHeader('content-type', TYPES[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  } catch {
    res.statusCode = 404;
    res.end('없음');
  }
}).listen(PORT, '127.0.0.1', () => console.log(`http://localhost:${PORT}  (접속 코드: ${process.env.TRIAL_CODE})`));
