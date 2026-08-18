const https = require("https");

function fetchBinary(rawUrl, depth) {
  depth = depth || 0;
  return new Promise((resolve, reject) => {
    const req = https.get(rawUrl, { timeout: 30000 }, (res) => {
      console.log("Status:", res.statusCode, "(depth=" + depth + ")");
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location;
        res.resume();
        console.log("Redirect to:", loc.slice(0,80));
        return fetchBinary(loc, depth+1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        const chunks = [];
        res.on("data", c => chunks.push(c));
        res.on("end", () => { reject(new Error("HTTP " + res.statusCode + ": " + Buffer.concat(chunks).toString().slice(0,100))); });
        return;
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

// model 파라미터 없이 기본 모델 테스트
const eng = "Hello, I am Jack.";
const prompt = encodeURIComponent("photo of child saying hello");
const url = "https://image.pollinations.ai/prompt/" + prompt + "?width=480&height=300&seed=1&nologo=true";
console.log("Testing without model param...");
fetchBinary(url).then(buf => {
  const fs = require("fs");
  fs.writeFileSync("assets/images/test_nomodel.jpg", buf);
  console.log("Success! Size:", buf.length, "bytes");
}).catch(err => {
  console.log("Error:", err.message);
});
