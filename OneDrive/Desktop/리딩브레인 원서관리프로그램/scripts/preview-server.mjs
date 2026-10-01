// 화면만 보는 서버 — 로그인 없이 연다.
//
//   node scripts/preview-server.mjs      → http://localhost:8778
//
// config.js 만 빈 것으로 바꿔 내보낸다. 그래서 서버(Supabase)에 연결하지 않고,
// 쓴 것은 이 브라우저에만 남는다. 진짜 config.js 파일은 건드리지 않는다.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { loadStore, ready, make } from "./tts.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PORT = +process.env.PORT || 8778;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".wav": "audio/wav", ".json": "application/json" };

createServer(async (req, res) => {
  let path;
  try { path = decodeURIComponent(new URL(req.url, "http://x").pathname); }
  catch { res.writeHead(400); return res.end("bad url"); }   // 잘못된 주소 하나에 서버가 죽지 않게
  // 원어민 목소리 즉석 만들기: /tts?text=한 문장 → mp3.
  // 마이크로소프트 엣지의 무료 목소리라 키도 크레딧도 없다. 한 번 만든 문장은 assets/tts 에 저장돼 다음엔 그걸 쓴다.
  if (path === "/tts") {
    const text = String(new URL(req.url, "http://x").searchParams.get("text") || "").trim().slice(0, 300);
    if (!text) { res.writeHead(400, { "content-type": TYPES[".json"] }); return res.end(JSON.stringify({ error: "no_text" })); }
    try {
      const st = await loadStore();
      const file = ready(st, text) ? st.map[text] : await make(st, text);
      res.writeHead(200, { "content-type": "audio/mpeg", "cache-control": "no-store" });
      return res.end(await readFile(join(ROOT, "assets", "tts", file)));
    } catch (e) {
      console.log("tts 실패:", e.message.slice(0, 120));
      res.writeHead(502, { "content-type": TYPES[".json"] });
      return res.end(JSON.stringify({ error: "tts" }));
    }
  }
  if (path === "/config.js") {
    res.writeHead(200, { "content-type": TYPES[".js"], "cache-control": "no-store" });
    return res.end(`window.RB_CONFIG = { url: "", anonKey: "" };  // 미리보기 — 로그인 없이`);
  }
  const p = normalize(join(ROOT, path === "/" ? "/index.html" : path));
  if (!p.startsWith(normalize(ROOT))) { res.writeHead(403); return res.end(); }
  try {
    const data = await readFile(p);
    res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream", "cache-control": "no-store" });
    res.end(data);
  } catch { res.writeHead(404); res.end("not found"); }
}).listen(PORT, () => console.log(`미리보기 http://localhost:${PORT}  (로그인 없음)`));
