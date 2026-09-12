const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn } = require("node:child_process");

async function waitForServer(url) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("test server did not start");
}

(async () => {
  const root = path.join(__dirname, "..");
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "rb-offline-progress-"));
  const studentsPath = path.join(tempDir, "students.json");
  fs.writeFileSync(studentsPath, JSON.stringify({
    students: {
      test01: {
        name: "test01",
        displayName: "테스트학생",
        schoolGrade: "초등 3",
        pin: "1234",
        score: 0,
        streak: 0,
        mastered: [],
        review: [],
        log: [],
      },
    },
  }), "utf8");

  const port = 4185;
  const server = spawn(process.execPath, ["server.js"], {
    cwd: root,
    env: { ...process.env, PORT: String(port), STUDENTS_PATH: studentsPath },
    stdio: "ignore",
  });

  try {
    await waitForServer(`http://localhost:${port}/`);
    const loginResponse = await fetch(`http://localhost:${port}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "test01", pin: "1234" }),
    });
    assert.equal(loginResponse.status, 200);
    const { token } = await loginResponse.json();

    async function postProgress() {
      const response = await fetch(`http://localhost:${port}/api/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          eventId: "device:test:1",
          mode: "quiz",
          score: 10,
          streak: 1,
          mastered: [1],
          review: [],
        }),
      });
      return { status: response.status, body: await response.json() };
    }

    const first = await postProgress();
    const second = await postProgress();
    assert.equal(first.status, 200);
    assert.deepEqual(first.body.acknowledgedEventIds, ["device:test:1"]);
    assert.equal(second.body.duplicate, true);
    assert.deepEqual(second.body.acknowledgedEventIds, ["device:test:1"]);

    const saved = JSON.parse(fs.readFileSync(studentsPath, "utf8"));
    assert.equal(saved.students.test01.log.filter((entry) => entry.eventId === "device:test:1").length, 1);
    console.log("offline progress server tests passed");
  } finally {
    server.kill();
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
