/**
 * loremflickr.com 기반 카드 이미지 일괄 다운로드
 * 사용법: node tools/download_images_flickr.js
 *
 * loremflickr = 영어 키워드로 Flickr에서 실제 사진 무료 제공
 * 즉시 응답, API 키 불필요, 이미 앱의 브라우저 폴백으로 사용 중
 *
 * 예상 소요: 1189개 × ~0.5초 / 20 동시 ≈ 30초
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const { URL } = require("url");

const ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "assets", "images");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const CONCURRENCY = 20;
const DELAY_MS = 100;    // 요청 간 최소 간격 (ms)
const RETRY = 3;
const PROGRESS_LOG = path.join(__dirname, "flickr_progress.log");

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19);
  const line = `[${ts}] ${msg}\n`;
  fs.appendFileSync(PROGRESS_LOG, line, "utf8");
  process.stdout.write(line);
}

// expressions.js 로드
const exprCode = fs.readFileSync(path.join(ROOT, "data", "expressions.js"), "utf8")
  .replace("window.EXPRESSIONS", "global.__EXPR");
eval(exprCode);
const expressions = global.__EXPR;

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
  "very","just","too","so","like","well","back","time","here","there","up","down","out"
]);

function buildKeywords(item) {
  const words = item.english
    .replace(/[^a-zA-Z\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 2 && !STOP_WORDS.has(w.toLowerCase()));
  if (words.length === 0) {
    // 한국어 뜻 첫 단어를 영어처럼 활용 불가하므로 기본 키워드 사용
    return "children,school,learning";
  }
  return words.slice(0, 3).join(",");
}

function flickrUrl(item) {
  const kw = encodeURIComponent(buildKeywords(item));
  return `https://loremflickr.com/480/300/${kw}?lock=${item.id}`;
}

function localPath(id) {
  return path.join(OUTPUT_DIR, `${String(id).padStart(4, "0")}.jpg`);
}

function fetchBinary(rawUrl, attempt = 0) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(rawUrl);
    const lib = parsed.protocol === "https:" ? https : http;
    const req = lib.get(rawUrl, { timeout: 15000 }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const loc = res.headers.location;
        // 상대 URL을 절대 URL로 변환
        const abs = loc.startsWith("http") ? loc : `${parsed.protocol}//${parsed.hostname}${loc}`;
        return fetchBinary(abs, attempt).then(resolve).catch(reject);
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

async function downloadOne(item) {
  const dest = localPath(item.id);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 3000) {
    return "skip";
  }

  for (let attempt = 1; attempt <= RETRY; attempt++) {
    try {
      const buf = await fetchBinary(flickrUrl(item));
      if (buf.length < 3000) throw new Error(`too small (${buf.length}b)`);
      fs.writeFileSync(dest, buf);
      return buf.length;
    } catch (err) {
      if (attempt < RETRY) {
        await new Promise(r => setTimeout(r, DELAY_MS * attempt * 3));
      } else {
        throw err;
      }
    }
  }
}

async function runPool(items) {
  let idx = 0;
  let done = 0, skipped = 0;
  const failed = [];
  const total = items.length;
  const startTime = Date.now();

  async function worker() {
    while (idx < total) {
      const item = items[idx++];
      const num = done + skipped + failed.length + 1;
      try {
        const result = await downloadOne(item);
        if (result === "skip") {
          skipped++;
        } else {
          done++;
          const fname = `${String(item.id).padStart(4, "0")}.jpg`;
          if (done % 50 === 0 || done <= 10) {
            const elapsed = Math.round((Date.now() - startTime) / 1000);
            const rate = done / elapsed;
            const eta = rate > 0 ? Math.round((total - done - skipped) / rate) : "?";
            log(`[${String(num).padStart(4)}/${total}] ✓ ${fname}  ${result}b  ETA≈${eta}초`);
          }
        }
      } catch (err) {
        failed.push({ id: item.id, err: err.message });
        const fname = `${String(item.id).padStart(4, "0")}.jpg`;
        log(`[${String(num).padStart(4)}/${total}] ✗ ${fname}  ${err.message.slice(0, 60)}`);
      }

      const processed = done + skipped + failed.length;
      if (processed % 100 === 0) {
        const pct = Math.round(processed / total * 100);
        log(`  ===== 진행 ${processed}/${total} (${pct}%) | 완료 ${done} | 실패 ${failed.length} =====`);
      }

      // 과도한 요청 방지 (loremflickr 서버 부하)
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return { done, skipped, failed };
}

(async () => {
  const pending = expressions.filter(item => {
    const p = localPath(item.id);
    return !(fs.existsSync(p) && fs.statSync(p).size > 3000);
  });
  const alreadyDone = expressions.length - pending.length;

  log(`===== Reading Brain loremflickr 이미지 다운로드 시작 =====`);
  log(`전체: ${expressions.length}개 | 이미 완료: ${alreadyDone}개 | 남은 것: ${pending.length}개`);
  log(`동시 처리: ${CONCURRENCY}개 | 저장 위치: ${OUTPUT_DIR}`);

  if (pending.length === 0) {
    log("모든 이미지가 이미 완료되어 있습니다!");
    return;
  }

  const startTime = Date.now();
  const { done, skipped, failed } = await runPool(pending);
  const elapsed = Math.round((Date.now() - startTime) / 1000);

  log(`\n===== 최종 결과 =====`);
  log(`완료: ${done}개 | 스킵: ${skipped}개 | 실패: ${failed.length}개 | 소요: ${elapsed}초`);
  if (failed.length > 0) {
    log("실패 목록:");
    failed.slice(0, 20).forEach(({ id, err }) =>
      log(`  ${String(id).padStart(4, "0")}.jpg: ${err}`)
    );
    if (failed.length > 20) log(`  ... 외 ${failed.length - 20}개`);
  }
})();
