/**
 * 어린이 교육용 실사 사진 다운로드 (loremflickr 기반)
 * - 모든 이미지에 "children" 키워드 강제 포함 → 밝고 사랑스러운 아이 사진
 * - 기존 이미지 전부 덮어씀
 *
 * 사용법: node tools/download_images_kids.js
 * 예상 시간: 약 2~4분 (20개 동시 처리)
 */

const fs   = require("fs");
const path = require("path");
const https = require("https");
const http  = require("http");
const { URL } = require("url");

const ROOT       = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "assets", "images");
const CONCURRENCY = 15;
const DELAY_MS    = 200;
const RETRY       = 3;

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// expressions.js 로드
const exprCode = fs.readFileSync(path.join(ROOT, "data", "expressions.js"), "utf8")
  .replace("window.EXPRESSIONS", "global.__EXPR");
eval(exprCode);
const expressions = global.__EXPR;

// ----- 키워드 전략 -----
// 카테고리별 보조 키워드 (children 다음에 붙음)
const CATEGORY_KEYWORDS = {
  "인사": "greeting,hello,friends",
  "소개": "greeting,school,friends",
  "I am": "child,smiling,happy",
  "You are": "children,friends,school",
  "This is": "children,classroom,show",
  "He is": "boy,school,happy",
  "She is": "girl,school,happy",
  "like": "children,fun,happy",
  "want": "children,wish,cute",
  "have": "children,holding,happy",
  "Can": "children,activity,school",
  "May I": "child,polite,school",
  "Do you": "children,talking,friends",
  "What": "children,curious,question",
  "Where": "children,exploring,outdoor",
  "When": "children,calendar,school",
  "Why": "children,thinking,curious",
  "How": "children,learning,school",
  "날씨": "child,weather,outdoor",
  "감정": "children,emotion,happy",
  "시간": "child,clock,school",
  "장소": "children,place,outdoor",
  "음식": "child,food,eating,lunch",
  "동물": "child,animal,nature",
  "스포츠": "children,sports,play",
  "학교": "children,school,classroom",
  "가족": "family,children,home,happy",
  "몸": "child,health,care",
  "여행": "children,travel,outdoor",
  "Training": "children,learning,school",
};

const STOP_WORDS = new Set([
  "a","an","the","is","are","am","was","were","be","been","being",
  "i","you","he","she","it","we","they","my","your","his","her","its","our","their",
  "this","that","these","those","to","of","in","on","at","for","with","by","from",
  "and","or","but","not","do","did","does","have","has","had","will","would","can",
  "could","should","may","might","shall","what","how","when","where","who","which",
  "get","got","let","put","set","go","come","give","take","make","know","think",
  "see","look","want","use","feel","try","tell","seem","turn","ask","show","call",
  "keep","move","live","work","help","play","run","walk","talk","sit","stand","eat",
  "all","some","any","each","every","more","most","other","such","same","than","then",
  "very","just","too","so","like","well","back","time","here","there","up","down","out",
  "hello","nice","glad","meet","please","sorry","thank","thanks","excuse","name","yes","no"
]);

// 표현의 핵심 명사/동사 단어 추출
function extractContentWord(item) {
  const words = item.english
    .replace(/[^a-zA-Z\s]/g, " ")
    .split(/\s+/)
    .map(w => w.toLowerCase())
    .filter(w => w.length > 3 && !STOP_WORDS.has(w));

  if (words.length === 0) return null;

  // 더 구체적인 명사 우선 (school, swim, soccer, birthday 등)
  const concrete = words.find(w => w.length > 4);
  return concrete || words[0];
}

// 카테고리에서 보조 키워드 찾기
function getCategoryExtra(item) {
  const cat = (item.category || "") + " " + (item.pattern || "");
  for (const [key, kw] of Object.entries(CATEGORY_KEYWORDS)) {
    if (cat.includes(key)) return kw;
  }
  return "school,happy";
}

function buildUrl(item) {
  const contentWord = extractContentWord(item);
  const catExtra    = getCategoryExtra(item);

  let keywords;
  if (contentWord) {
    keywords = `children,${contentWord},${catExtra.split(",")[0]}`;
  } else {
    keywords = `children,${catExtra}`;
  }

  return `https://loremflickr.com/480/300/${encodeURIComponent(keywords)}?lock=${item.id + 10000}`;
}

function localPath(id) {
  return path.join(OUTPUT_DIR, `${String(id).padStart(4, "0")}.jpg`);
}

function fetchBinary(rawUrl) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(rawUrl);
    const lib = parsed.protocol === "https:" ? https : http;
    const req = lib.get(rawUrl, { timeout: 20000 }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const loc = res.headers.location;
        const abs = loc.startsWith("http") ? loc : `${parsed.protocol}//${parsed.hostname}${loc}`;
        return fetchBinary(abs).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
  });
}

async function downloadOne(item, attempt = 1) {
  const dest = localPath(item.id);
  try {
    const buf = await fetchBinary(buildUrl(item));
    if (buf.length < 3000) throw new Error(`too small (${buf.length}b)`);
    fs.writeFileSync(dest, buf);
    return buf.length;
  } catch (err) {
    if (attempt < RETRY) {
      await new Promise(r => setTimeout(r, DELAY_MS * attempt * 2));
      return downloadOne(item, attempt + 1);
    }
    throw err;
  }
}

async function runPool(items) {
  let idx = 0, done = 0, failed = 0;
  const total = items.length;
  const startTime = Date.now();

  async function worker() {
    while (idx < total) {
      const item = items[idx++];
      const num  = done + failed + 1;
      try {
        await downloadOne(item);
        done++;
        if (done % 50 === 0 || done <= 5) {
          const elapsed = Math.round((Date.now() - startTime) / 1000);
          const rate = done / elapsed;
          const eta  = rate > 0 ? Math.round((total - done) / rate) : "?";
          const url  = buildUrl(item);
          process.stdout.write(`[${String(done).padStart(4)}/${total}] ✓  "${item.english.slice(0, 35)}"  ETA≈${eta}초\n`);
        }
      } catch (err) {
        failed++;
        process.stdout.write(`[${String(num).padStart(4)}/${total}] ✗  "${item.english.slice(0, 35)}"  ${err.message.slice(0, 40)}\n`);
      }
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return { done, failed };
}

(async () => {
  console.log("========================================");
  console.log(" Reading Brain 어린이 교육용 사진 다운로드");
  console.log("========================================");
  console.log(`전체 표현: ${expressions.length}개  |  동시 처리: ${CONCURRENCY}개`);
  console.log(`저장 위치: ${OUTPUT_DIR}`);
  console.log("기존 이미지를 어린이 친화적 사진으로 전부 교체합니다.\n");

  const { done, failed } = await runPool(expressions);

  const total = expressions.length;
  console.log("\n========================================");
  console.log(`완료: ${done}개  |  실패: ${failed}개  |  전체: ${total}개`);
  console.log("========================================");
})();
