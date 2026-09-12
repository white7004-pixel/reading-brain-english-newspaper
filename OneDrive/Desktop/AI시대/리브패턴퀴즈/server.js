const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const crypto = require("node:crypto");
const os = require("node:os");
const { execFile } = require("node:child_process");
const { promisify } = require("node:util");

const root = __dirname;
const dataDir = path.join(root, "data");
const studentsPath = process.env.STUDENTS_PATH || path.join(dataDir, "students.json");
const port = Number(process.env.PORT || 4174);
const adminPin = String(process.env.ADMIN_PIN || "0000");
const sessions = new Map();
const ttsCache = new Map();
const execFileAsync = promisify(execFile);
const edgeTtsBin = process.env.EDGE_TTS_BIN || "edge-tts.exe";
const edgeTtsVoice = process.env.EDGE_TTS_VOICE || "en-US-AvaNeural";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".mp3": "audio/mpeg",
  ".svg": "image/svg+xml",
};

function ensureStore() {
  fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(studentsPath)) {
    fs.writeFileSync(studentsPath, JSON.stringify({ students: {} }, null, 2), "utf8");
  }
}

function readStore() {
  ensureStore();
  return JSON.parse(fs.readFileSync(studentsPath, "utf8"));
}

function writeStore(store) {
  fs.writeFileSync(studentsPath, JSON.stringify(store, null, 2), "utf8");
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

async function createNeuralEnglishAudio(text) {
  const cacheKey = `${edgeTtsVoice}:${text}`;
  const cached = ttsCache.get(cacheKey);
  if (cached) return cached;

  const digest = crypto.createHash("sha256").update(cacheKey).digest("hex").slice(0, 20);
  const outputPath = path.join(os.tmpdir(), `reading-brain-tts-${digest}.mp3`);
  try {
    await execFileAsync(
      edgeTtsBin,
      [
        "--voice", edgeTtsVoice,
        "--rate=-8%",
        "--text", text,
        "--write-media", outputPath,
      ],
      { windowsHide: true, timeout: 20_000, maxBuffer: 1024 * 1024 },
    );
    const audio = fs.readFileSync(outputPath);
    if (!audio.length) throw new Error("Neural English audio was empty.");
    ttsCache.set(cacheKey, audio);
    if (ttsCache.size > 300) ttsCache.delete(ttsCache.keys().next().value);
    return audio;
  } finally {
    fs.rmSync(outputPath, { force: true });
  }
}

function normalizeName(name) {
  return String(name || "").trim().replace(/\s+/g, " ");
}

function safeStudent(student) {
  return {
    name: student.name,
    displayName: student.displayName || student.name,
    score: student.score || 0,
    streak: student.streak || 0,
    mastered: student.mastered || [],
    review: student.review || [],
    log: student.log || [],
    updatedAt: student.updatedAt,
  };
}

function adminStudent(key, student) {
  return {
    id: key,
    name: student.name,
    displayName: student.displayName || "",
    schoolGrade: student.schoolGrade || "",
    pin: student.pin,
    score: Number(student.score || 0),
    streak: Number(student.streak || 0),
    masteredCount: Array.isArray(student.mastered) ? student.mastered.length : 0,
    reviewCount: Array.isArray(student.review) ? student.review.length : 0,
    log: Array.isArray(student.log) ? student.log : [],
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
  };
}

function auth(req) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");
  return token ? sessions.get(token) : null;
}

function requireAdmin(req, res) {
  const pin = String(req.headers["x-admin-pin"] || "").trim();
  if (!pin || pin !== adminPin) {
    sendJson(res, 401, { error: "관리자 PIN을 확인해 주세요." });
    return false;
  }
  return true;
}

async function handleApi(req, res) {
  const parsedUrl = new URL(req.url, `http://localhost:${port}`);
  const pathname = parsedUrl.pathname;

  if (req.method === "GET" && pathname === "/api/tts") {
    const text = String(parsedUrl.searchParams.get("text") || "").trim().slice(0, 200);
    if (!text) {
      sendJson(res, 400, { error: "English text is required." });
      return;
    }

    const audio = await createNeuralEnglishAudio(text);

    res.writeHead(200, {
      "Content-Type": "audio/mpeg",
      "Content-Length": audio.length,
      "Cache-Control": "public, max-age=86400",
    });
    res.end(audio);
    return;
  }

  if (pathname.startsWith("/api/admin/") && !requireAdmin(req, res)) {
    return;
  }

  if (req.method === "GET" && pathname === "/api/admin/students") {
    const store = readStore();
    const students = Object.entries(store.students)
      .map(([key, student]) => adminStudent(key, student))
      .sort((a, b) => a.name.localeCompare(b.name));
    sendJson(res, 200, { students });
    return;
  }

  if (req.method === "POST" && pathname === "/api/admin/students") {
    const body = await readBody(req);
    const name = normalizeName(body.name);
    const displayName = normalizeName(body.displayName);
    const schoolGrade = normalizeName(body.schoolGrade);
    const pin = String(body.pin || "").trim();
    if (!name || !displayName || !schoolGrade || !pin) {
      sendJson(res, 400, { error: "학생 아이디, 학생 이름, 학교/학년, PIN을 모두 입력해 주세요." });
      return;
    }

    const store = readStore();
    const key = name.toLowerCase();
    if (store.students[key]) {
      sendJson(res, 409, { error: "이미 등록된 학생 아이디입니다." });
      return;
    }

    const now = new Date().toISOString();
    store.students[key] = {
      name,
      displayName,
      schoolGrade,
      pin,
      score: 0,
      streak: 0,
      mastered: [],
      review: [],
      log: [],
      createdAt: now,
      updatedAt: now,
    };
    writeStore(store);
    sendJson(res, 201, { student: adminStudent(key, store.students[key]) });
    return;
  }

  const studentMatch = pathname.match(/^\/api\/admin\/students\/([^/]+)$/);
  if (studentMatch) {
    const key = decodeURIComponent(studentMatch[1]).toLowerCase();
    const store = readStore();
    const student = store.students[key];
    if (!student) {
      sendJson(res, 404, { error: "학생을 찾을 수 없습니다." });
      return;
    }

    if (req.method === "PATCH") {
      const body = await readBody(req);
      const now = new Date().toISOString();
      if (body.displayName !== undefined) {
        const displayName = normalizeName(body.displayName);
        if (!displayName) {
          sendJson(res, 400, { error: "학생 이름을 입력해 주세요." });
          return;
        }
        student.displayName = displayName;
      }
      if (body.schoolGrade !== undefined) {
        const schoolGrade = normalizeName(body.schoolGrade);
        if (!schoolGrade) {
          sendJson(res, 400, { error: "학교/학년을 입력해 주세요." });
          return;
        }
        student.schoolGrade = schoolGrade;
      }
      if (body.pin !== undefined) {
        const pin = String(body.pin || "").trim();
        if (!pin) {
          sendJson(res, 400, { error: "PIN을 입력해 주세요." });
          return;
        }
        student.pin = pin;
      }
      if (body.resetProgress) {
        student.score = 0;
        student.streak = 0;
        student.mastered = [];
        student.review = [];
        student.log = [];
      }
      student.updatedAt = now;
      writeStore(store);
      sendJson(res, 200, { student: adminStudent(key, student) });
      return;
    }

    if (req.method === "DELETE") {
      delete store.students[key];
      sessions.forEach((sessionKey, token) => {
        if (sessionKey === key) sessions.delete(token);
      });
      writeStore(store);
      sendJson(res, 200, { ok: true });
      return;
    }
  }

  if (req.method === "POST" && req.url === "/api/login") {
    const body = await readBody(req);
    const name = normalizeName(body.name);
    const pin = String(body.pin || "").trim();
    if (!name || !pin) {
      sendJson(res, 400, { error: "학생 이름과 PIN을 입력해 주세요." });
      return;
    }

    const store = readStore();
    let key = name.toLowerCase();
    const now = new Date().toISOString();
    if (!store.students[key]) {
      const found = Object.entries(store.students).find(
        ([, s]) => normalizeName(s.displayName).toLowerCase() === name.toLowerCase()
      );
      if (found) key = found[0];
    }
    if (!store.students[key]) {
      sendJson(res, 404, { error: "등록되지 않은 학생 아이디입니다. 관리자에게 등록을 요청해 주세요." });
      return;
    }
    if (store.students[key].pin !== pin) {
      sendJson(res, 403, { error: "PIN이 맞지 않습니다." });
      return;
    }
    store.students[key].updatedAt = now;
    writeStore(store);

    const token = crypto.randomBytes(24).toString("hex");
    sessions.set(token, key);
    sendJson(res, 200, { token, student: safeStudent(store.students[key]) });
    return;
  }

  if (req.method === "GET" && req.url === "/api/progress") {
    const key = auth(req);
    if (!key) {
      sendJson(res, 401, { error: "로그인이 필요합니다." });
      return;
    }
    const store = readStore();
    sendJson(res, 200, { student: safeStudent(store.students[key]) });
    return;
  }

  if (req.method === "POST" && req.url === "/api/progress") {
    const key = auth(req);
    if (!key) {
      sendJson(res, 401, { error: "로그인이 필요합니다." });
      return;
    }
    const body = await readBody(req);
    const store = readStore();
    const student = store.students[key];
    const now = new Date().toISOString();
    const eventId = typeof body.eventId === "string" ? body.eventId.trim().slice(0, 160) : "";
    student.processedEventIds = Array.isArray(student.processedEventIds) ? student.processedEventIds : [];
    if (eventId && student.processedEventIds.includes(eventId)) {
      sendJson(res, 200, {
        ok: true,
        duplicate: true,
        acknowledgedEventIds: [eventId],
        student: safeStudent(student),
      });
      return;
    }
    student.score = Number(body.score || 0);
    student.streak = Number(body.streak || 0);
    student.mastered = Array.isArray(body.mastered) ? body.mastered.map(Number) : [];
    student.review = Array.isArray(body.review) ? body.review.map(Number) : [];
    student.log = [
      ...(student.log || []),
      {
        at: now,
        mode: body.mode || "study",
        score: student.score,
        masteredCount: student.mastered.length,
        reviewCount: student.review.length,
        ...(eventId ? { eventId } : {}),
      },
    ].slice(-500);
    if (eventId) student.processedEventIds = [...student.processedEventIds, eventId].slice(-500);
    student.updatedAt = now;
    writeStore(store);
    sendJson(res, 200, {
      ok: true,
      acknowledgedEventIds: eventId ? [eventId] : [],
      student: safeStudent(student),
    });
    return;
  }

  if (req.method === "GET" && req.url === "/api/leaderboard") {
    const key = auth(req);
    if (!key) {
      sendJson(res, 401, { error: "로그인이 필요합니다." });
      return;
    }
    const store = readStore();
    const leaders = Object.values(store.students)
      .map((student) => ({
        name: student.name,
        displayName: student.displayName || student.name,
        points: Number(student.score || 0),
        masteredCount: Array.isArray(student.mastered) ? student.mastered.length : 0,
        reviewCount: Array.isArray(student.review) ? student.review.length : 0,
        updatedAt: student.updatedAt,
      }))
      .sort((a, b) => b.points - a.points || b.masteredCount - a.masteredCount || a.name.localeCompare(b.name))
      .slice(0, 10);
    sendJson(res, 200, { leaders });
    return;
  }

  sendJson(res, 404, { error: "API를 찾을 수 없습니다." });
}

function serveStatic(req, res) {
  const urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${port}`).pathname);
  const requestedPath = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = path.normalize(path.join(root, requestedPath));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    res.end(content);
  });
}

ensureStore();
http
  .createServer((req, res) => {
    if (req.url.startsWith("/api/")) {
      handleApi(req, res).catch((error) => sendJson(res, 500, { error: error.message }));
      return;
    }
    serveStatic(req, res);
  })
  .listen(port, () => {
    console.log(`Reading Brain server running at http://localhost:${port}`);
  });
