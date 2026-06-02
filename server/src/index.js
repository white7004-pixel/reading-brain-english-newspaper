import 'dotenv/config';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const PORT = process.env.PORT || 3001;

/** LLM 프로바이더 선택: openai | anthropic (기본 openai) */
function getProvider() {
  const v = (process.env.LLM_PROVIDER || 'openai').toLowerCase();
  return v === 'anthropic' || v === 'claude' ? 'anthropic' : 'openai';
}
function getModel() {
  if (getProvider() === 'anthropic') {
    return process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022';
  }
  return process.env.OPENAI_MODEL || 'gpt-4o-mini';
}
function getActiveKey() {
  return getProvider() === 'anthropic'
    ? process.env.ANTHROPIC_API_KEY
    : process.env.OPENAI_API_KEY;
}
function getKeyName() {
  return getProvider() === 'anthropic' ? 'ANTHROPIC_API_KEY' : 'OPENAI_API_KEY';
}

if (!getActiveKey()) {
  console.warn(`[warn] ${getKeyName()}가 설정되지 않았습니다. server/.env 파일을 확인하세요. (provider: ${getProvider()})`);
}

/** 매 요청마다 .env를 다시 읽어 반영 (재시작 없이 키 변경 가능). PowerShell의 UTF-8 BOM도 처리. */
function reloadEnv() {
  try {
    dotenv.config({ override: true });
    // PowerShell `Set-Content -Encoding UTF8` 가 BOM을 추가해 첫 변수가 깨지는 경우 대응
    for (const k of Object.keys(process.env)) {
      if (k.charCodeAt(0) === 0xFEFF) {
        const cleanKey = k.slice(1);
        process.env[cleanKey] = process.env[k];
        delete process.env[k];
      }
    }
  } catch {}
}

function ensureKey(res) {
  reloadEnv();
  if (!getActiveKey()) {
    res.status(400).json({ error: `${getKeyName()}가 설정되지 않았습니다. server/.env 파일을 확인하세요. (provider: ${getProvider()})` });
    return false;
  }
  return true;
}

/** 마크다운 코드펜스/preamble 제거 후 JSON 파싱 (객체·배열 모두 지원) */
function parseJsonLoose(text) {
  let t = (text || '').trim();
  // 1) 본문 어디에 있든 모든 ```/```json 펜스 제거
  t = t.replace(/```(?:json)?/gi, '').trim();
  // 2) 객체와 배열 중 가장 바깥쪽 컨테이너 추출 (preamble/잡설이 앞에 와도 안전)
  const firstBrace = t.indexOf('{');
  const lastBrace = t.lastIndexOf('}');
  const firstBracket = t.indexOf('[');
  const lastBracket = t.lastIndexOf(']');
  const candidates = [];
  if (firstBrace >= 0 && lastBrace > firstBrace) candidates.push({ s: firstBrace, e: lastBrace });
  if (firstBracket >= 0 && lastBracket > firstBracket) candidates.push({ s: firstBracket, e: lastBracket });
  if (candidates.length > 0) {
    // 가장 먼저 시작하는 컨테이너 선택 (전체를 감싸고 있을 가능성)
    candidates.sort((a, b) => a.s - b.s);
    const pick = candidates[0];
    t = t.slice(pick.s, pick.e + 1);
  }
  return JSON.parse(t);
}

/** 통합 chat → JSON 결과 반환 (프로바이더 자동 분기) */
async function chatJson({ system, user, temperature = 0.8 }) {
  const provider = getProvider();
  const model = getModel();
  if (provider === 'anthropic') {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const resp = await client.messages.create({
      model,
      max_tokens: 4096,
      temperature,
      system: system + '\n\nIMPORTANT: Output strictly a single valid JSON object. No markdown code fences, no commentary, no preamble.',
      messages: [{ role: 'user', content: user }]
    });
    const block = resp.content.find(b => b.type === 'text');
    return parseJsonLoose(block ? block.text : '{}');
  }
  // openai
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const resp = await client.chat.completions.create({
    model,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ],
    temperature
  });
  return parseJsonLoose(resp.choices[0].message.content || '{}');
}

/**
 * AR(ATOS) 지수 기준으로 어휘/문법 가이드 추정
 */
function arGuide(ar) {
  const a = Number(ar);
  if (a < 2) return { sentLen: '4~7 words', vocab: 'CEFR Pre-A1, only the most common picture-book words (Dolch/Fry first 200)', grammar: 'simple present, "is/are/have", basic conjunctions (and, but)' };
  if (a < 3) return { sentLen: '6~10 words', vocab: 'CEFR A1, very common high-frequency words', grammar: 'simple present, simple past, basic conjunctions' };
  if (a < 4) return { sentLen: '8~12 words', vocab: 'CEFR A2, common everyday vocabulary', grammar: 'past/present/future simple, comparatives, modals (can/should)' };
  if (a < 5) return { sentLen: '10~14 words', vocab: 'CEFR A2-B1, light academic words', grammar: 'present perfect, basic relative clauses, gerunds/infinitives' };
  if (a < 6) return { sentLen: '12~16 words', vocab: 'CEFR B1, AWL beginner academic words', grammar: 'passive voice, conditionals (1st/2nd), reported speech basics' };
  if (a < 7) return { sentLen: '14~18 words', vocab: 'CEFR B1-B2, AWL intermediate', grammar: 'all conditionals, relative clauses, participles, perfect tenses' };
  if (a < 8) return { sentLen: '16~22 words', vocab: 'CEFR B2, AWL advanced + journalistic vocab', grammar: 'inversion, complex passives, noun clauses, advanced participles' };
  if (a < 10) return { sentLen: '18~26 words', vocab: 'CEFR B2-C1, sophisticated journalistic vocabulary', grammar: 'subjunctive, cleft sentences, advanced cohesive devices' };
  return { sentLen: '20~30 words', vocab: 'CEFR C1+, broad academic and journalistic register', grammar: 'all advanced structures including stylistic inversions and ellipsis' };
}

const CATEGORIES = [
  { id: 'science_tech', label: 'Science & Technology', ko: '과학·기술' },
  { id: 'environment', label: 'Environment & Nature', ko: '환경·자연' },
  { id: 'culture_arts', label: 'Culture & Arts', ko: '문화·예술' },
  { id: 'sports_health', label: 'Sports & Health', ko: '스포츠·건강' },
  { id: 'business_economy', label: 'Business & Economy', ko: '경제·비즈니스' },
  { id: 'world_society', label: 'World & Society', ko: '세계·사회' },
  { id: 'history_humanities', label: 'History & Humanities', ko: '역사·인문' },
  { id: 'education_youth', label: 'Education & Youth', ko: '교육·청소년' }
];

app.get('/api/categories', (req, res) => {
  res.json({ categories: CATEGORIES });
});

/**
 * 카테고리/AR/학년 입력 → 주제 후보 6개 제안
 */
app.post('/api/topics', async (req, res) => {
  try {
    if (!ensureKey(res)) return;
    const { category, ar, grade, count = 6 } = req.body;
    const cat = CATEGORIES.find(c => c.id === category);
    if (!cat) return res.status(400).json({ error: 'invalid category' });

    const topics = await suggestTopics({ category: cat, ar, grade, count });
    res.json({ topics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * 8개 카테고리 모두에 대해 주제 후보를 한 번에 생성 (책/월간 합본용)
 * body: { ar, grade, perCategory?: number = 3 }
 * → { results: [{ categoryId, categoryLabel, topics: [...] }, ...] }
 */
app.post('/api/topics/all', async (req, res) => {
  try {
    if (!ensureKey(res)) return;
    const { ar, grade, perCategory = 3 } = req.body;
    const results = await Promise.all(
      CATEGORIES.map(async cat => {
        try {
          const topics = await suggestTopics({ category: cat, ar, grade, count: perCategory });
          return { categoryId: cat.id, categoryLabel: cat.label, categoryKo: cat.ko, topics };
        } catch (e) {
          return { categoryId: cat.id, categoryLabel: cat.label, categoryKo: cat.ko, topics: [], error: e.message };
        }
      })
    );
    res.json({ results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

async function suggestTopics({ category, ar, grade, count }) {
  const guide = arGuide(ar);
  const sys = `You are a curriculum designer for an English newspaper class at a Korean private academy.
Generate ${count} fresh, classroom-appropriate newspaper topic ideas suitable for grade ${grade} students at AR (ATOS) level ${ar}.
Vocabulary target: ${guide.vocab}. Grammar level: ${guide.grammar}.
Topics must be safe, age-appropriate, factual or evergreen, and suitable for a school newspaper.
Avoid graphic violence, explicit politics, adult content. Vary subtopics.
Return STRICT JSON: {"topics":[{"title":"...","angle":"one sentence English description","ko":"한국어 한 줄 설명"}]}`;

  const user = `Category: ${category.label} (${category.ko})
AR level: ${ar}
Grade: ${grade}
Generate ${count} distinct topic ideas.`;

  const data = await chatJson({ system: sys, user, temperature: 0.9 });
  return Array.isArray(data.topics) ? data.topics : [];
}

/**
 * 선택된 주제 + AR/학년/길이 → 본문 + 워크북 일괄 생성
 */
app.post('/api/generate', async (req, res) => {
  try {
    if (!ensureKey(res)) return;
    const { topic, angle, category, ar, grade, length = 'medium' } = req.body;
    const cat = CATEGORIES.find(c => c.id === category);
    if (!topic) return res.status(400).json({ error: 'topic required' });

    const guide = arGuide(ar);
    const wordTarget = length === 'short' ? '220~280' : length === 'long' ? '520~620' : '350~430';
    const numQuestions = length === 'short' ? 4 : length === 'long' ? 7 : 5;

    const sys = `You are an expert ESL/EFL materials writer creating an English newspaper textbook for "Reading Brain English Academy" in Korea.
Write at AR (ATOS) ${ar} for grade ${grade} students.
Target sentence length: ${guide.sentLen}. Vocabulary band: ${guide.vocab}. Grammar band: ${guide.grammar}.
Produce ORIGINAL content (do not copy real articles). Use a journalistic style with title, dateline, lede, body, and a closing quote or takeaway.
The article must contain ${wordTarget} words. Be factually accurate; if uncertain, keep claims general and evergreen.
Workbook must be teaching-grade quality: precise definitions, unambiguous answers, and answer keys.
Return STRICT JSON exactly matching the schema below.`;

    const schema = `{
  "article": {
    "headline": "string (catchy newspaper headline, Title Case)",
    "subheadline": "string (one-line deck/standfirst)",
    "byline": "string (e.g., 'By Reading Brain Newsroom')",
    "dateline": "string (e.g., 'SEOUL — ')",
    "body_paragraphs": ["paragraph 1", "paragraph 2", "..."],
    "word_count": number
  },
  "vocabulary": [
    {"word":"...","pos":"n./v./adj./adv.","definition":"learner-friendly English definition","ko":"간결한 한국어 뜻","example":"sentence using the word","from_article": true}
  ],
  "comprehension_mc": [
    {"q":"question","choices":["A","B","C","D"],"answer":"A","explanation":"why"}
  ],
  "comprehension_short": [
    {"q":"question","answer":"model answer"}
  ],
  "summary_task": {
    "instruction":"Write a 3-sentence summary capturing the main idea and two supporting details.",
    "main_idea_hint":"one-sentence guidance for teachers",
    "model_summary":"3-sentence model answer"
  },
  "discussion": [
    "question 1", "question 2", "question 3", "question 4"
  ],
  "writing_prompt": {
    "prompt":"writing task tied to the article (80~120 words for students)",
    "checklist":["thesis present","2+ examples","topic vocabulary used"]
  },
  "grammar_focus": {
    "point":"name of the grammar point (e.g., Present Perfect for ongoing relevance)",
    "explanation":"clear English explanation in 2~4 sentences",
    "examples_from_article":["exact sentence(s) from the article that use this point"],
    "practice":[
      {"q":"fill-in-the-blank or rewrite task","answer":"answer"}
    ]
  }
}`;

    const user = `Topic: ${topic}
Angle: ${angle || ''}
Category: ${cat ? cat.label : category}
Provide ${numQuestions} multiple-choice questions and ${Math.max(2, Math.floor(numQuestions/2))} short-answer questions.
Provide 10 vocabulary items drawn FROM the article.
Provide 4 discussion questions.
Provide 4 grammar practice items.
JSON schema:
${schema}`;

    const data = await chatJson({ system: sys, user, temperature: 0.75 });
    data.meta = {
      ar, grade, length,
      category: cat ? cat.label : category,
      category_ko: cat ? cat.ko : '',
      generated_at: new Date().toISOString()
    };
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', (req, res) => {
  reloadEnv();
  res.json({
    ok: true,
    provider: getProvider(),
    model: getModel(),
    keyConfigured: !!getActiveKey()
  });
});

app.listen(PORT, () => {
  console.log(`[server] http://localhost:${PORT} (provider: ${getProvider()}, model: ${getModel()})`);
});
