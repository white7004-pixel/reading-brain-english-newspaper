// 이 컴퓨터에서 서버 없이 로그인·서버 저장을 시험하는 가짜 Supabase.
//
//   npm install      (처음 한 번)
//   npm run dev      → http://localhost:8787
//
// supabase/001_readingbrain.sql 을 진짜 Postgres(PGlite)에 그대로 돌리고,
// Supabase 가 쓰는 두 주소만 흉내 낸다: /rest/v1/rpc/<함수>, /auth/v1/token.
// 껐다 켜면 데이터는 사라진다. 시험용 선생님: teacher@test.kr / teacher1234
//
// AI 북토크(/functions/v1/book-talk):
//   ANTHROPIC_API_KEY 가 있으면 진짜 Claude 를 부른다.
//   없고 RB_FAKE_AI=1 이면 화면 흐름만 보는 가짜 AI 가 답한다 (대화 내용은 엉터리다).
// AI 첨삭(/functions/v1/writing-report) 도 같다. 선생님 토큰만 받는다.
import Anthropic from "@anthropic-ai/sdk";
import { talkTurn } from "../supabase/functions/book-talk/talk.mjs";
import { writeReport, tidy } from "../supabase/functions/writing-report/report.mjs";
import { PGlite } from "@electric-sql/pglite";
import { pgcrypto } from "@electric-sql/pglite/contrib/pgcrypto";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
export const ANON = "dev-anon-key";

export async function startDb() {
  const db = new PGlite({ extensions: { pgcrypto } });
  // Supabase 에는 원래 있는 것들
  await db.exec(`
    create role anon nologin; create role authenticated nologin;
    create schema extensions;
    create schema auth;
    create table auth.users (id uuid primary key default gen_random_uuid(), email text unique, password text);
    create function auth.uid() returns uuid language sql stable as
      $$ select nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'sub', '')::uuid $$;
    grant usage on schema auth to anon, authenticated;
    grant execute on function auth.uid() to anon, authenticated;
    grant usage on schema public to anon, authenticated;
  `);
  for (const f of ["001_readingbrain.sql", "002_book_talk.sql"])
    await db.exec(await readFile(join(ROOT, "supabase", f), "utf8"));

  const tokens = new Map();   // access_token → user id
  async function addTeacher(email, password, name) {
    const { rows } = await db.query(
      "insert into auth.users (email, password) values ($1, $2) returning id", [email, password]);
    await db.query("insert into public.teachers (id, name) values ($1, $2)", [rows[0].id, name]);
    return rows[0].id;
  }
  function signIn(uid) {
    const t = randomUUID();
    tokens.set(t, uid);
    return { access_token: t, refresh_token: "r-" + t, expires_in: 3600, token_type: "bearer" };
  }

  // PostgREST 처럼: 토큰으로 역할을 정하고 그 역할로 함수를 부른다
  async function rpc(bearer, fn, args = {}) {
    if (!/^[a-z_]+$/.test(fn)) throw Object.assign(new Error("bad function"), { status: 404 });
    const uid = tokens.get(bearer);
    const role = uid ? "authenticated" : bearer === ANON ? "anon" : null;
    if (!role) throw Object.assign(new Error("bad token"), { status: 401 });
    const keys = Object.keys(args).filter(k => /^p_[a-z_]+$/.test(k));
    const sql = `select public.${fn}(${keys.map((k, i) => `${k} => $${i + 1}`).join(", ")}) as r`;
    const vals = keys.map(k => (args[k] !== null && typeof args[k] === "object") ? JSON.stringify(args[k]) : args[k]);
    return db.transaction(async tx => {
      await tx.exec(`set local role ${role}`);
      await tx.query("select set_config('request.jwt.claims', $1, true)", [JSON.stringify(uid ? { sub: uid } : {})]);
      const { rows } = await tx.query(sql, vals);
      return rows[0].r;
    });
  }
  return { db, rpc, addTeacher, signIn, tokens };
}

// 화면 시험용. 독해 문항을 차례로 묻고, 모범답과 핵심 낱말이 겹치면 맞다고 한다.
let AI = null;
function fakeTalk({ book, history = [], finish }) {
  const qs = book.comprehension || [];
  const asked = history.filter(h => h.role === "assistant").length;
  const last = [...history].reverse().find(h => h.role === "user");
  const prevQ = qs[asked - 1];
  const ans = prevQ ? prevQ.frame.replace(/\{\{(.*?)\}\}/g, "$1") : "";
  const hit = last && prevQ && ans.toLowerCase().split(/\W+/).filter(w => w.length > 3)
    .some(w => last.text.toLowerCase().includes(w));
  if (finish) return { reply: "Great talk today! You remembered a lot. Try saying: I think ___ because ___.", fix: "", hint: "",
    check: "none", done: true, summary_ko: "(가짜 AI) 책 내용을 잘 기억했어요. 이유를 붙여 말하는 연습이 더 필요해요." };
  const next = qs[asked % Math.max(qs.length, 1)];
  const pre = !last ? `Hi! Let's talk about ${book.title}.` : hit ? "Yes, that's right!" : `Good try! In the book, ${ans}`;
  return { reply: `${pre} ${next ? next.q : "What did you like?"}`, fix: last && /\bi is\b/i.test(last.text) ? last.text.replace(/\bi is\b/i, "I am") : "",
    hint: next ? next.frame.replace(/\{\{.*?\}\}/g, "___") : "", check: !last ? "none" : hit ? "right" : "wrong", done: false, summary_ko: "" };
}

// 화면 시험용 첨삭: 문장마다 첫 글자 대문자·마침표, "i " → "I " 만 고친다. 나머지 칸은 틀에 맞춘 문구.
function fakeReport({ name, text }) {
  const sents = text.replace(/([.!?])\s+/g, "$1\n").split(/\n+/).map(x => x.trim()).filter(Boolean);
  const corrections = sents.map(o => {
    let c = o.replace(/(^|\s)i(?=\s|')/g, "$1I").replace(/^./, m => m.toUpperCase());
    if (!/[.!?]$/.test(c)) c += ".";
    return { original: o, corrected: c, type: "CAPITALS", why_ko: "(가짜 AI) 문장은 대문자로 시작하고 마침표로 끝나요.",
      tip_ko: "문장 첫 글자와 'I' 는 늘 대문자예요.", meaning_ko: "(가짜 AI) 이 문장의 뜻" };
  }).filter(c => c.original !== c.corrected);
  return tidy({
    overall_ko: [`(가짜 AI) ${name} 학생, 책 내용을 넣어 자기 생각을 잘 썼어요.`, "문장 첫 글자와 마침표를 한 번 더 확인해 봐요."],
    advice_ko: ["(가짜 AI) 생각 → 까닭 → 책 속 근거 순서가 잘 보여요.", "책 속 장면을 한 가지 더 넣으면 더 풍성해져요."],
    scores: { grammar: 70, vocabulary: 75, coherence: 80, development: 72 },
    corrections, deep_dive_ko: "(가짜 AI) 문장 첫 글자를 대문자로 쓰는 연습을 해요.",
    vocab: [{ word: "amazing", meaning_ko: "놀라운", instead_of: "good" }, { word: "smart", meaning_ko: "똑똑한", instead_of: "" }, { word: "shout", meaning_ko: "외치다", instead_of: "say" }],
    native: sents[0] ? [{ awkward: sents[0], casual: sents[0], formal: sents[0] }] : [],
    missions_ko: ["문장 첫 글자는 대문자로 (예: 'i think' → 'I think')", "문장 끝에 마침표 찍기", "because 로 까닭 한 번 더 쓰기"],
    questions: [{ en: "What else can a pet do?", ko: "애완동물은 또 무엇을 할 수 있나요?", tip_ko: "A pet can ___ 로 시작해 보세요." },
      { en: "Would you like a fly as a pet?", ko: "파리를 애완동물로 키우고 싶나요?", tip_ko: "I would / would not like ___ because ___." },
      { en: "What is the best pet for you?", ko: "나에게 가장 좋은 애완동물은?", tip_ko: "The best pet for me is ___." }],
  });
}

const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".wav": "audio/wav", ".json": "application/json" };

async function serve(port) {
  const S = await startDb();
  await S.addTeacher("teacher@test.kr", "teacher1234", "시험 선생님");
  const body = req => new Promise(ok => { let s = ""; req.on("data", c => s += c); req.on("end", () => ok(s ? JSON.parse(s) : {})); });
  const send = (res, code, obj) => { res.writeHead(code, { "content-type": "application/json" }); res.end(JSON.stringify(obj)); };

  createServer(async (req, res) => {
    const url = new URL(req.url, "http://x");
    try {
      if (req.method === "POST" && url.pathname.startsWith("/rest/v1/rpc/")) {
        const bearer = (req.headers.authorization || "").replace(/^Bearer /, "");
        return send(res, 200, await S.rpc(bearer, url.pathname.slice(13), await body(req)));
      }
      if (req.method === "POST" && url.pathname === "/functions/v1/book-talk") {
        const b = await body(req);
        const g = await S.rpc(ANON, "student_talk_turn", { p_token: b.token != null ? b.token : "" }).catch(() => null);
        if (!g) return send(res, 401, { error: "not_logged_in" });
        if (g.error) return send(res, 429, { error: g.error });
        if (process.env.ANTHROPIC_API_KEY) {
          if (AI == null) AI = new Anthropic();
          return send(res, 200, await talkTurn(AI, b));
        }
        if (process.env.RB_FAKE_AI) return send(res, 200, fakeTalk(b));
        return send(res, 503, { error: "no_ai_key" });
      }
      if (req.method === "POST" && url.pathname === "/functions/v1/writing-report") {
        const bearer = (req.headers.authorization || "").replace(/^Bearer /, "");
        if (!S.tokens.has(bearer) || !(await S.rpc(bearer, "teacher_me").catch(() => null)))
          return send(res, 401, { error: "not_teacher" });
        const b = await body(req);
        if (process.env.ANTHROPIC_API_KEY) {
          if (AI == null) AI = new Anthropic();
          return send(res, 200, await writeReport(AI, b));
        }
        if (process.env.RB_FAKE_AI) return send(res, 200, fakeReport(b));
        return send(res, 503, { error: "no_ai_key" });
      }
      if (req.method === "POST" && url.pathname === "/auth/v1/token") {
        const b = await body(req);
        if (url.searchParams.get("grant_type") === "refresh_token") {
          const uid = S.tokens.get(String(b.refresh_token).slice(2));
          return uid ? send(res, 200, S.signIn(uid)) : send(res, 400, { error_description: "Invalid Refresh Token" });
        }
        const { rows } = await S.db.query("select id from auth.users where email = $1 and password = $2", [b.email, b.password]);
        return rows.length ? send(res, 200, S.signIn(rows[0].id))
                           : send(res, 400, { error_description: "Invalid login credentials" });
      }
      if (url.pathname === "/config.js")      // 이 가짜 서버를 가리키게 한다
        { res.writeHead(200, { "content-type": TYPES[".js"] });
          return res.end(`window.RB_CONFIG = { url: "http://localhost:${port}", anonKey: "${ANON}" };`); }
      const p = normalize(join(ROOT, decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname)));
      if (!p.startsWith(normalize(ROOT))) return send(res, 403, {});
      const data = await readFile(p);
      res.writeHead(200, { "content-type": TYPES[extname(p)] || "application/octet-stream", "cache-control": "no-store" });
      res.end(data);
    } catch (e) {
      if (e.code === "ENOENT") return send(res, 404, { message: "not found" });
      send(res, e.status || 400, { code: e.code, message: e.message });
    }
  }).listen(port, () => console.log(`리딩브레인 시험 서버 http://localhost:${port}  (선생님 teacher@test.kr / teacher1234)`));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === normalize(process.argv[1])) {
  serve(+process.env.PORT || 8787);
}
