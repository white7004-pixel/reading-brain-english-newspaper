/**
 * AI 카드 이미지 일괄 다운로드
 * node tools/download_images.js
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const { URL } = require("url");

const ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "assets", "images");
const CONCURRENCY = 1;
const DELAY_MS = 3000;   // 요청 사이 3초 대기 (rate limit 회피)
const TIMEOUT_MS = 90_000;
const RETRY = 3;

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// expressions.js를 window 없이 로드
const exprCode = fs.readFileSync(path.join(ROOT, "data", "expressions.js"), "utf8")
  .replace("window.EXPRESSIONS", "global.__EXPR");
eval(exprCode);
const expressions = global.__EXPR;

function localPath(id) {
  return path.join(OUTPUT_DIR, `${String(id).padStart(4, "0")}.jpg`);
}

function buildUrl(item) {
  const prompt = encodeURIComponent(
    `photorealistic image showing: "${item.english}" ` +
    `(Korean: "${item.korean}"). ` +
    `realistic photo, natural lighting, no text, suitable for children.`
  );
  // flux (무료) 사용 - flux-realism은 유료 전용
  return `https://image.pollinations.ai/prompt/${prompt}?width=480&height=300&seed=${item.id}&nologo=true&model=flux`;
}

function fetchBinary(rawUrl) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(rawUrl);
    const lib = parsed.protocol === "https:" ? https : http;
    const req = lib.get(rawUrl, { timeout: TIMEOUT_MS }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBinary(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode === 402) {
        res.resume();
        return reject(new Error(`HTTP 402 rate-limit`));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
  });
}

async function downloadOne(item, attempt = 1) {
  const dest = localPath(item.id);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
    return "skip";
  }
  try {
    const buf = await fetchBinary(buildUrl(item));
    if (buf.length < 5000) throw new Error(`too small (${buf.length}b)`);
    fs.writeFileSync(dest, buf);
    return "ok";
  } catch (err) {
    if (attempt < RETRY) {
      const wait = err.message.includes("402") ? 10000 * attempt : 3000 * attempt;
      await new Promise((r) => setTimeout(r, wait));
      return downloadOne(item, attempt + 1);
    }
    return `fail:${err.message}`;
  }
}

async function runPool(items, concurrency) {
  let idx = 0;
  let done = 0;
  let skipped = 0;
  const failed = [];
  const total = items.length;

  async function worker() {
    while (idx < items.length) {
      const item = items[idx++];
      const status = await downloadOne(item);
      done++;
      if (status === "skip") {
        skipped++;
      } else if (status === "ok") {
        process.stdout.write(`[${String(done).padStart(4)}/${total}] ✓ ${String(item.id).padStart(4,"0")}.jpg  "${item.english.slice(0,40)}"\n`);
      } else {
        failed.push({ id: item.id, status });
        process.stdout.write(`[${String(done).padStart(4)}/${total}] ✗ ${String(item.id).padStart(4,"0")}.jpg  ${status}\n`);
      }
      if (done % 50 === 0) {
        process.stdout.write(`  === ${done}/${total} 완료 (건너뜀 ${skipped}, 실패 ${failed.length}) ===\n`);
      }
      if (status !== "skip") {
        await new Promise((r) => setTimeout(r, DELAY_MS));
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  return { done, skipped, failed };
}

(async () => {
  console.log(`총 ${expressions.length}개 표현 이미지 다운로드 시작`);
  console.log(`동시 다운로드: ${CONCURRENCY}개 / 저장: ${OUTPUT_DIR}\n`);

  const { done, skipped, failed } = await runPool(expressions, CONCURRENCY);

  console.log(`\n완료: ${done}개 / 건너뜀: ${skipped} / 실패: ${failed.length}`);
  if (failed.length > 0) {
    console.log("실패 목록:");
    failed.forEach(({ id, status }) => console.log(`  ${String(id).padStart(4,"0")}.jpg: ${status}`));
  }
})();
