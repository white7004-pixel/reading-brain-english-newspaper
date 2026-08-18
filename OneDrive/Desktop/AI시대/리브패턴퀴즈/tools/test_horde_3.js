const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");
const { URL } = require("url");

const ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "assets", "images");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const API_KEY = "0000000000";
const API_BASE = "stablehorde.net";

const exprCode = fs.readFileSync(path.join(ROOT, "data", "expressions.js"), "utf8")
  .replace("window.EXPRESSIONS", "global.__EXPR");
eval(exprCode);
const expressions = global.__EXPR.slice(0, 3);

function localPath(id) {
  return path.join(OUTPUT_DIR, String(id).padStart(4, "0") + ".jpg");
}

function buildPrompt(item) {
  const eng = item.english.replace(/["]/g, "");
  return `photorealistic scene showing: ${eng}. natural lighting, children educational, no text`;
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
        "Client-Agent": "rb-quiz:1.0:anon"
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
          reject(new Error("POST " + res.statusCode + ": " + text.slice(0, 150)));
        }
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
    req.write(data);
    req.end();
  });
}

function hordeGet(p) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: API_BASE, path: p, method: "GET",
      headers: { "apikey": API_KEY, "Client-Agent": "rb-quiz:1.0:anon" },
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
          reject(new Error("GET " + res.statusCode + ": " + text.slice(0, 150)));
        }
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.on("timeout", () => { req.destroy(); reject(new Error("timeout")); });
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
        return reject(new Error("Fetch " + res.statusCode));
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

async function processOne(item) {
  console.log(`[${item.id}] 제출: ${item.english}`);
  const job = await hordePost("/api/v2/generate/async", {
    prompt: buildPrompt(item),
    params: { width: 512, height: 320, steps: 20, n: 1, sampler_name: "k_euler_a", cfg_scale: 7.5 },
    models: ["stable_diffusion"],
    r2: true
  });
  console.log(`[${item.id}] 작업 ID: ${job.id}`);

  for (let i = 0; i < 80; i++) {
    await new Promise(r => setTimeout(r, 8000));
    const check = await hordeGet("/api/v2/generate/check/" + job.id);
    if (check.done) {
      const result = await hordeGet("/api/v2/generate/status/" + job.id);
      const gen = result.generations && result.generations[0];
      if (!gen) throw new Error("No generation in result");
      let buf;
      if (gen.img && gen.img.startsWith("data:")) {
        buf = Buffer.from(gen.img.split(",")[1], "base64");
      } else if (gen.img) {
        buf = await fetchUrl(gen.img);
      } else {
        throw new Error("No image data");
      }
      fs.writeFileSync(localPath(item.id), buf);
      console.log(`[${item.id}] 완료! ${buf.length} bytes`);
      return;
    }
    if (check.faulted) throw new Error("Job faulted");
    if (i % 3 === 0) {
      process.stdout.write(`[${item.id}] 대기 ${i * 8}s  queue=${check.queue_position}  wait=${check.wait_time}s\n`);
    }
  }
  throw new Error("Timeout");
}

(async () => {
  await Promise.all(
    expressions.map(item =>
      processOne(item).catch(e => console.error(`[${item.id}] 실패:`, e.message))
    )
  );
  console.log("\n테스트 완료 (3개)");
})();
