const https = require("https");
const { URL } = require("url");

function fetchBinary(rawUrl) {
  return new Promise((resolve, reject) => {
    const req = https.get(rawUrl, { timeout: 30000 }, (res) => {
      console.log("Status:", res.statusCode);
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBinary(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        const chunks = [];
        res.on("data", c => chunks.push(c));
        res.on("end", () => { reject(new Error("HTTP " + res.statusCode + " " + Buffer.concat(chunks).toString().slice(0,100))); });
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

const eng = "Hello, I am Jack.";
const kor = "안녕, 나는 잭이야.";
const prompt = encodeURIComponent("photorealistic image showing: " + JSON.stringify(eng) + " realistic photo, natural lighting, no text, suitable for children.");
const url = "https://image.pollinations.ai/prompt/" + prompt + "?width=480&height=300&seed=1&nologo=true&model=flux";
console.log("Testing...");
fetchBinary(url).then(buf => {
  const fs = require("fs");
  fs.writeFileSync("assets/images/test_0001.jpg", buf);
  console.log("Success! Size:", buf.length, "bytes -> saved as assets/images/test_0001.jpg");
}).catch(err => {
  console.log("Error:", err.message);
});
