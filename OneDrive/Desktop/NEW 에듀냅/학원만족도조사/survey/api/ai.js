// 설문 글(제목·인사말·안내·끝 인사) AI 초안 — 대시보드 비밀번호가 맞을 때만.
// Claude 키는 Vercel 환경변수 ANTHROPIC_API_KEY (원장이 직접 넣는다. 브라우저에는 나가지 않음)
const SB_URL = 'https://vvrkatfnymhqjzxggvhb.supabase.co'; // config.js 와 같은 공개 값
const SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2cmthdGZueW1ocWp6eGdndmhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNTgyMjUsImV4cCI6MjA5NjczNDIyNX0.L_VAQXx6zG8aACZmBEOCnRHuAp6GlQpIWIJT9Mc1vRs';

const SYSTEM = `너는 리딩브레인영어학원의 설문지 글을 쓰는 사람이다.
설문 이름과 문항을 보고, 설문 첫 화면과 끝 화면에 들어갈 글을 쓴다.
- 차분하고 정중한 학원 말투. 과장·자랑·다른 학원과의 비교는 쓰지 않는다.
- 학부모 대상이면 "부모님", 학생 대상이면 학생 눈높이의 쉬운 존댓말("~해 주세요", "~요").
- 무기명이라는 점과 의견을 수업·운영에 반영한다는 점을 담는다. 걸리는 시간은 지어내지 않는다.
- greeting 은 짧은 영어 인사 (학부모 "Dear parents,", 학생 "Dear friends," 처럼).
JSON 하나만 답한다: {"title":"첫 화면 제목","greeting":"...","intro":["인사말 문단",...2~3개],"notice":"안내 상자 한두 문장","thanks":"제출 뒤 감사 인사 한두 문장"}`;

function parse(text) {
  const j = JSON.parse(String(text).slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
  const s = v => String(v || '').trim().slice(0, 300);
  return {
    title: s(j.title), greeting: s(j.greeting), notice: s(j.notice), thanks: s(j.thanks),
    intro: (Array.isArray(j.intro) ? j.intro : [j.intro]).map(s).filter(Boolean).slice(0, 4)
  };
}

async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  if (!process.env.ANTHROPIC_API_KEY) return res.status(503).json({ error: 'nokey' });

  // 비밀번호 확인: 없는 설문 이름으로 결과를 물으면 맞을 때 [] , 틀릴 때 null
  const pw = await fetch(SB_URL + '/rest/v1/rpc/survey_results', {
    method: 'POST',
    headers: { apikey: SB_ANON, Authorization: 'Bearer ' + SB_ANON, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_password: String(b.password || ''), p_survey: '_' })
  }).then(r => r.json()).catch(() => null);
  if (!Array.isArray(pw)) return res.status(401).json({ error: 'password' });

  const labels = (Array.isArray(b.items) ? b.items : []).slice(0, 40).map(x => '- ' + String(x).slice(0, 200)).join('\n');
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-5-5', max_tokens: 1000, system: SYSTEM,
      messages: [{ role: 'user', content: '설문 이름: ' + String(b.kicker || '').slice(0, 100) + '\n문항:\n' + (labels || '(아직 없음)') }]
    })
  });
  if (!r.ok) return res.status(502).json({ error: 'ai' });
  const out = await r.json();
  try { return res.status(200).json(parse(out.content.map(c => c.text || '').join(''))); }
  catch (e) { return res.status(502).json({ error: 'ai' }); }
}
module.exports = handler;
module.exports.parse = parse;
