/**
 * Stable Horde AI 카드 이미지 일괄 생성/다운로드
 * 사용법: node tools/download_images_horde.js
 *
 * Stable Horde = 커뮤니티 GPU 기반 무료 AI 이미지 생성
 * 익명 API 키 사용 (등록 불필요). 동시 처리로 전체 시간 단축.
 *
 * 예상 소요: 1189개 × ~90초 / 10 동시 ≈ 3~4시간 (큐 상황에 따라 변동)
 */
const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const { URL } = require("url");

const ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "assets", "images");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const PROGRESS_LOG = path.join(__dirname, "horde_progress.log");
function log(msg) {
  const ts = new Date().toISOString().slice(11, 19);
  const line = `[${ts}] ${msg}\n`;
  fs.appendFileSync(PROGRESS_LOG, line, "utf8");
  process.stdout.write(line);
}

const API_KEY = "0000000000";  // 익명 무료 키
const API_BASE = "stablehorde.net";
const CONCURRENCY = 8;         // 동시 진행 작업 수
const SUBMIT_DELAY_MS = 700;   // 제출 간격 (rate limit: 2/second)
const POLL_INTERVAL_MS = 8000; // 폴링 간격
const MAX_WAIT_MS = 900_000;   // 작업당 최대 대기 15분
const IMAGE_WIDTH = 512;
const IMAGE_HEIGHT = 320;

// expressions.js 로드
const exprCode = fs.readFileSync(path.join(ROOT, "data", "expressions.js"), "utf8")
  .replace("window.EXPRESSIONS", "global.__EXPR");
eval(exprCode);
const expressions = global.__EXPR;

// 제출 속도 제어: 프로미스 체인으로 순서 보장 (초당 최대 1.4회)
let _submitChain = Promise.resolve();
function rateLimitedSubmit(fn) {
  const slot = _submitChain.then(() => new Promise(r => setTimeout(r, SUBMIT_DELAY_MS)));
  _submitChain = slot.catch(() => {});
  return slot.then(() => fn());
}

function localPath(id) {
  return path.join(OUTPUT_DIR, `${String(id).padStart(4, "0")}.jpg`);
}

function buildPrompt(item) {
  const eng = item.english.replace(/[""]/g, "");
  return (
    `photorealistic scene showing: ${eng}. ` +
    `natural lighting, children educational illustration, no text overlay, clear focus`
  );
}

function hordePost(p, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const opts = {
      hostname: API_BASE, path: p, method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
        "apikey": API_KEY,
        "Client-Agent": "readingbrain-quiz:1.0:anonymous"
      },
      timeout: 30000
    };
    const req = https.request(opts, res => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => {
        const text = Buffer.concat(chunks).toString();
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(text)); } catch { resolve(text); }
        } else {
          reject(new Error(`Horde ${res.statusCode}: ${text.slice(0, 200)}`));
        }
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("POST timeout")); });
    req.write(data);
    req.end();
  });
}

function hordeGet(p) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: API_BASE, path: p, method: "GET",
      headers: { "apikey": API_KEY, "Client-Agent": "readingbrain-quiz:1.0:anonymous" },
      timeout: 30000
    };
    const req = https.request(opts, res => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => {
        const text = Buffer.concat(chunks).toString();
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(text)); } catch { resolve(text); }
        } else {
          reject(new Error(`GET ${res.statusCode}: ${text.slice(0, 200)}`));
        }
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("GET timeout")); });
    req.end();
  });
}

function fetchUrl(rawUrl) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(rawUrl);
    const lib = parsed.protocol === "https:" ? https : http;
    const req = lib.get(rawUrl, { timeout: 60000 }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`Fetch ${res.statusCode}`));
      }
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("fetch timeout")); });
  });
}

async function submitJob(item) {
  return rateLimitedSubmit(() =>
    hordePost("/api/v2/generate/async", {
      prompt: buildPrompt(item),
      params: {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        steps: 20,
        n: 1,
        sampler_name: "k_euler_a",
        cfg_scale: 7.5
      },
      models: ["majicMIX realistic"],
      r2: true
    })
  );
}

async function waitAndSave(item, jobId) {
  const dest = localPath(item.id);
  const deadline = Date.now() + MAX_WAIT_MS;

  while (Date.now() < deadline) {
    await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
    const check = await hordeGet(`/api/v2/generate/check/${jobId}`);

    if (check.faulted) throw new Error("Job faulted by horde");

    if (check.done) {
      const result = await hordeGet(`/api/v2/generate/status/${jobId}`);
      const gen = result.generations && result.generations[0];
      if (!gen || !gen.img) throw new Error("No image in result");

      let buf;
      if (gen.img.startsWith("data:")) {
        buf = Buffer.from(gen.img.split(",")[1], "base64");
      } else {
        buf = await fetchUrl(gen.img);
      }

      if (buf.length < 3000) throw new Error(`Image too small: ${buf.length}b`);
      fs.writeFileSync(dest, buf);
      return buf.length;
    }
  }
  throw new Error("Timeout (15분)");
}

async function processOne(item, counter) {
  const dest = localPath(item.id);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 3000) {
    return "skip";
  }

  const job = await submitJob(item);
  const bytes = await waitAndSave(item, job.id);
  return bytes;
}

async function runPool(items) {
  let idx = 0;
  let done = 0, skipped = 0;
  const failed = [];
  const total = items.length;
  const startTime = Date.now();

  async function worker(workerId) {
    while (idx < total) {
      const item = items[idx++];
      const num = done + skipped + failed.length + 1;
      try {
        const result = await processOne(item, num);
        if (result === "skip") {
          skipped++;
        } else {
          done++;
          const elapsed = Math.round((Date.now() - startTime) / 1000);
          const rate = done / elapsed;
          const eta = rate > 0 ? Math.round((total - done - skipped) / rate / 60) : "?";
          const fname = `${String(item.id).padStart(4, "0")}.jpg`;
          log(`[${String(num).padStart(4)}/${total}] ✓ ${fname}  ${result}b  ETA≈${eta}분`);
        }
      } catch (err) {
        failed.push({ id: item.id, err: err.message });
        const fname = `${String(item.id).padStart(4, "0")}.jpg`;
        log(`[${String(num).padStart(4)}/${total}] ✗ ${fname}  ${err.message.slice(0, 60)}`);
      }

      const processed = done + skipped + failed.length;
      if (processed % 10 === 0) {
        const pct = Math.round(processed / total * 100);
        log(`  ===== 진행 ${processed}/${total} (${pct}%) | 완료 ${done} | 실패 ${failed.length} =====`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)));
  return { done, skipped, failed };
}

(async () => {
  const pending = expressions.filter(item => {
    const p = localPath(item.id);
    return !(fs.existsSync(p) && fs.statSync(p).size > 3000);
  });
  const alreadyDone = expressions.length - pending.length;

  log(`===== Reading Brain 카드 이미지 생성 시작 =====`);
  log(`전체: ${expressions.length}개 | 이미 완료: ${alreadyDone}개 | 남은 것: ${pending.length}개`);
  log(`동시 처리: ${CONCURRENCY}개 | 저장 위치: ${OUTPUT_DIR}`);

  if (pending.length === 0) {
    log("모든 이미지가 이미 완료되어 있습니다!");
    return;
  }

  // 이전 실행과 rate limit 충돌 방지
  await new Promise(r => setTimeout(r, 1500));

  const { done, skipped, failed } = await runPool(pending);
  log(`\n===== 최종 결과 =====`);
  log(`완료: ${done}개 | 스킵: ${skipped}개 | 실패: ${failed.length}개`);
  if (failed.length > 0) {
    log("실패 목록:");
    failed.slice(0, 20).forEach(({ id, err }) =>
      log(`  ${String(id).padStart(4, "0")}.jpg: ${err}`)
    );
    if (failed.length > 20) log(`  ... 외 ${failed.length - 20}개`);
  }
})();
