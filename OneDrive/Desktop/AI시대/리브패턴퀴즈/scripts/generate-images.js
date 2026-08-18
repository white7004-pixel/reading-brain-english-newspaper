/**
 * 패턴 영어 / 동사 카드 이미지 생성 스크립트
 *
 * 사용법:
 *   node scripts/generate-images.js                         # 영어표현 전체
 *   node scripts/generate-images.js --verbs                 # 동사 3단변화 전체 (158장)
 *   node scripts/generate-images.js --category "01. 인사와 소개 패턴"
 *   node scripts/generate-images.js --limit 20
 *   node scripts/generate-images.js --start 101 --end 200
 *   node scripts/generate-images.js --dry-run
 *
 * 환경변수:
 *   OPENAI_API_KEY=sk-...  (필수)
 *
 * 비용 안내 (DALL-E 3 standard, 1024x1024):
 *   이미지 1장 = $0.04
 *   영어표현 1189장 ≈ $47.56  /  동사 158장 ≈ $6.32
 */

"use strict";

const fs = require("fs");
const path = require("path");
const https = require("https");
const vm = require("vm");

// ── 설정 ─────────────────────────────────────────
const API_KEY = process.env.OPENAI_API_KEY;
const OUTPUT_DIR = path.join(__dirname, "..", "assets", "images");
const EXPRESSIONS_FILE = path.join(__dirname, "..", "data", "expressions.js");
const DELAY_MS = 1200; // API 속도 제한 방지용 딜레이 (ms)
const MODEL = "dall-e-3";
const IMAGE_SIZE = "1024x1024";
const IMAGE_QUALITY = "standard";

// ── CLI 파라미터 파싱 ────────────────────────────
const args = process.argv.slice(2);
const getArg = (name) => {
  const i = args.indexOf(name);
  return i !== -1 ? args[i + 1] : null;
};
const hasFlag = (name) => args.includes(name);

const filterCategory = getArg("--category");
const limitCount = getArg("--limit") ? parseInt(getArg("--limit"), 10) : null;
const startId = getArg("--start") ? parseInt(getArg("--start"), 10) : null;
const endId = getArg("--end") ? parseInt(getArg("--end"), 10) : null;
const dryRun = hasFlag("--dry-run");
const verbMode = hasFlag("--verbs");

// ── 검증 ─────────────────────────────────────────
if (!dryRun && !API_KEY) {
  console.error("❌ OPENAI_API_KEY 환경변수가 설정되지 않았습니다.");
  console.error("   예: set OPENAI_API_KEY=sk-...  (Windows)");
  console.error("       export OPENAI_API_KEY=sk-...  (Mac/Linux)");
  process.exit(1);
}

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── 데이터 로드 ──────────────────────────────────
const VERBS_FILE = path.join(__dirname, "..", "data", "verbs.js");
const exprCode = fs.readFileSync(EXPRESSIONS_FILE, "utf8");
const exprCtx = { window: {} };
vm.runInNewContext(exprCode, exprCtx);
const allExpressions = exprCtx.window.EXPRESSIONS || [];

const verbCode = fs.readFileSync(VERBS_FILE, "utf8");
const verbCtx = { window: {} };
vm.runInNewContext(verbCode, verbCtx);
const allVerbs = verbCtx.window.VERBS || [];

// ── 필터 적용 ────────────────────────────────────
let items;
if (verbMode) {
  items = allVerbs;
  if (startId) items = items.filter((v) => v.id >= startId);
  if (endId) items = items.filter((v) => v.id <= endId);
} else {
  items = allExpressions;
  if (filterCategory) items = items.filter((e) => e.category === filterCategory);
  if (startId) items = items.filter((e) => e.id >= startId);
  if (endId) items = items.filter((e) => e.id <= endId);
}

// 이미 생성된 파일 건너뛰기
const pending = items.filter((e) => {
  const p = path.join(OUTPUT_DIR, `${e.id}.jpg`);
  return !fs.existsSync(p);
});

let expressions = limitCount ? pending.slice(0, limitCount) : pending;

// ── 요약 출력 ────────────────────────────────────
console.log("══════════════════════════════════════════");
console.log(verbMode ? "  동사 카드 이미지 생성기" : "  패턴 영어 이미지 생성기");
console.log("══════════════════════════════════════════");
console.log(`  전체 항목 수 : ${items.length}`);
console.log(`  생성 대상    : ${expressions.length}장`);
console.log(`  이미 완료    : ${items.length - pending.length}장`);
if (filterCategory) console.log(`  카테고리 필터: ${filterCategory}`);
if (dryRun) console.log("  ⚡ 드라이런 모드 (실제 API 호출 없음)");
else {
  const costEst = (expressions.length * 0.04).toFixed(2);
  console.log(`  예상 비용    : ~$${costEst} USD (DALL-E 3 standard)`);
}
console.log("══════════════════════════════════════════");

if (expressions.length === 0) {
  console.log("\n✅ 생성할 이미지가 없습니다. 모두 완료되었거나 필터 조건에 해당하는 항목이 없습니다.");
  process.exit(0);
}

console.log("\n계속하려면 Enter를 누르세요... (Ctrl+C로 취소)\n");

// ── 진행 대기 ────────────────────────────────────
process.stdin.setRawMode && process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.once("data", async () => {
  process.stdin.setRawMode && process.stdin.setRawMode(false);
  process.stdin.pause();
  await runGeneration();
});

// ── 이미지 생성 프롬프트 ─────────────────────────
function buildPrompt(item) {
  if (verbMode) {
    const base = item.base.replace(/\s*\[.*?\]/g, "").trim();
    const meaning = item.meaning.replace(/★.*/, "").trim();
    return (
      `Create a simple, bright, colorful cartoon illustration for Korean elementary school English learners. ` +
      `The image should clearly show the action or concept of the English verb "${base}" ` +
      `(Korean meaning: "${meaning}"). ` +
      `Style: friendly cartoon, vivid colors, clean composition, no text or letters in the image, ` +
      `suitable for children ages 7-13. Show a character clearly performing or expressing this verb.`
    );
  }
  return (
    `Create a photorealistic image for Korean elementary school English learners. ` +
    `The image should clearly and visually represent this English sentence: "${item.english}" ` +
    `(Korean meaning: "${item.korean}"). ` +
    `Style: realistic photo, natural lighting, sharp focus, warm and clear setting, no text or letters in the image, ` +
    `suitable for young learners. Focus on the core action or situation in the sentence.`
  );
}

// ── DALL-E API 호출 ──────────────────────────────
async function callDallE(prompt) {
  const body = JSON.stringify({
    model: MODEL,
    prompt,
    n: 1,
    size: IMAGE_SIZE,
    quality: IMAGE_QUALITY,
    response_format: "url",
  });

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || `HTTP ${res.status}`);
  return data.data[0].url;
}

// ── 이미지 다운로드 ──────────────────────────────
function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Download failed: HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

// ── 메인 실행 ────────────────────────────────────
async function runGeneration() {
  let success = 0;
  let failed = 0;

  for (let i = 0; i < expressions.length; i++) {
    const expr = expressions[i];
    const filename = `${expr.id}.jpg`;
    const destPath = path.join(OUTPUT_DIR, filename);
    const progress = `[${i + 1}/${expressions.length}]`;

    process.stdout.write(`${progress} ID ${expr.id}: "${expr.english.slice(0, 40)}"... `);

    if (dryRun) {
      console.log("(드라이런 - 건너뜀)");
      success++;
      continue;
    }

    try {
      const imageUrl = await callDallE(buildPrompt(expr));
      await downloadImage(imageUrl, destPath);
      console.log(`✅ 저장: ${filename}`);
      success++;
    } catch (err) {
      console.log(`❌ 실패: ${err.message}`);
      failed++;
    }

    // 마지막 항목이 아니면 딜레이
    if (i < expressions.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  console.log("\n══════════════════════════════════════════");
  console.log(`  완료: ${success}장 성공, ${failed}장 실패`);
  console.log(`  저장 위치: ${OUTPUT_DIR}`);
  console.log("══════════════════════════════════════════");
  process.exit(failed > 0 ? 1 : 0);
}
