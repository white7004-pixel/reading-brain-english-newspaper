const https = require("https");

function apiPost(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const opts = {
      hostname: "stablehorde.net",
      path: path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": "0000000000",
        "Client-Agent": "readingbrain-quiz:1.0"
      }
    };
    const req = https.request(opts, res => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => {
        const text = Buffer.concat(chunks).toString();
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(text)); } catch { resolve(text); }
        } else {
          reject(new Error("HTTP " + res.statusCode + ": " + text.slice(0,150)));
        }
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

function apiGet(path) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: "stablehorde.net",
      path: path,
      method: "GET",
      headers: { "Client-Agent": "readingbrain-quiz:1.0" }
    };
    const req = https.request(opts, res => {
      const chunks = [];
      res.on("data", c => chunks.push(c));
      res.on("end", () => {
        const text = Buffer.concat(chunks).toString();
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(text)); } catch { resolve(text); }
        } else {
          reject(new Error("HTTP " + res.statusCode + ": " + text.slice(0,150)));
        }
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    req.end();
  });
}

async function testStableHorde() {
  console.log("1. Stable Horde API 테스트 시작...");
  const job = await apiPost("/api/v2/generate/async", {
    prompt: "photo of a child waving hello, realistic, natural lighting, no text",
    params: { width: 512, height: 320, steps: 20, n: 1, sampler_name: "k_euler" },
    models: ["stable_diffusion"]
  });
  console.log("2. 작업 생성:", job.id);
  
  // 완료 대기 (최대 2분)
  let status;
  for (let i = 0; i < 24; i++) {
    await new Promise(r => setTimeout(r, 5000));
    status = await apiGet("/api/v2/generate/check/" + job.id);
    console.log("   대기중... done=" + status.done + " queue_position=" + status.queue_position + " wait_time=" + status.wait_time + "s");
    if (status.done) break;
  }
  
  if (!status.done) { console.log("Timeout - 큐가 길어 대기 중"); return; }
  
  const result = await apiGet("/api/v2/generate/status/" + job.id);
  console.log("3. 완료! 이미지 개수:", result.generations ? result.generations.length : 0);
  if (result.generations && result.generations[0]) {
    const gen = result.generations[0];
    console.log("   이미지 URL (앞부분):", (gen.img || "없음").slice(0, 60));
    if (gen.img && gen.img.startsWith("data:image")) {
      const base64 = gen.img.split(",")[1];
      require("fs").writeFileSync("assets/images/test_horde.jpg", Buffer.from(base64, "base64"));
      console.log("   저장 완료: test_horde.jpg");
    } else if (gen.img) {
      console.log("   URL 형식 - 별도 다운로드 필요");
    }
  }
}

testStableHorde().catch(e => console.error("오류:", e.message));
