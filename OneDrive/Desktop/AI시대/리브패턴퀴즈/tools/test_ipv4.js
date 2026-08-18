const https = require("https");
const dns = require("dns");

// IPv4 강제
function fetchIPv4(rawUrl, depth) {
  depth = depth || 0;
  return new Promise((resolve, reject) => {
    const req = https.get(rawUrl, { family: 4, timeout: 30000 }, (res) => {
      console.log("Status:", res.statusCode, "(depth=" + depth + ")");
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location;
        res.resume();
        return fetchIPv4(loc, depth+1).then(resolve).catch(reject);
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

const prompt = encodeURIComponent("photo of child saying hello");
const url = "https://image.pollinations.ai/prompt/" + prompt + "?width=480&height=300&seed=1&nologo=true";
console.log("Testing with IPv4 forced...");
fetchIPv4(url).then(buf => {
  const fs = require("fs");
  fs.writeFileSync("assets/images/test_ipv4.jpg", buf);
  console.log("Success! Size:", buf.length, "bytes");
}).catch(err => {
  console.log("Error:", err.message);
});
