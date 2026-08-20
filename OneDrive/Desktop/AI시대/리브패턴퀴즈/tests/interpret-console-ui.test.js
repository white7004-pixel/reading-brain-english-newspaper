const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const readGitIndex = process.env.RB_TEST_GIT_INDEX === "1";

function readSource(name) {
  const sourcePath = path.join(root, name);
  if (!readGitIndex) return fs.readFileSync(sourcePath, "utf8");
  const gitRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
  const gitPath = path.relative(gitRoot, sourcePath).split(path.sep).join("/");
  return execFileSync("git", ["show", `:${gitPath}`], { encoding: "utf8" });
}

const html = readSource("index.html");
const app = readSource("app.js");
const css = readSource("mint-galaxy.css");

function functionSlice(start, end) {
  const startIndex = app.indexOf(start);
  const endIndex = app.indexOf(end, startIndex);
  assert.ok(startIndex >= 0 && endIndex > startIndex, `cannot isolate ${start}`);
  return app.slice(startIndex, endIndex);
}

assert.match(
  html,
  /id="interpretView"[\s\S]*?class="[^"]*communication-console[^"]*"/,
  "interpretation must be presented as a communication console",
);

assert.match(
  html,
  /class="[^"]*communication-mic[^"]*"[^>]*id="interpretStatus"[^>]*role="status"[^>]*aria-live="polite"[^>]*aria-label="통역 마이크 상태"/,
  "the existing microphone status ID needs an accessible live name",
);

for (const [phase, text] of [
  ["idle", "한글을 보고 영어로 바로 말하면 됩니다."],
  ["countdown", "준비하세요"],
  ["listening", "듣고 있어요"],
  ["verdict", "정답을 보고 스스로 채점하세요"],
  ["pass", "좋아요!"],
  ["fail", "정답을 확인하세요"],
]) {
  const phaseHook = ["pass", "fail"].includes(phase)
    ? app.includes("setInterpretConsoleState(verdict)") && app.includes(`"${phase}"`)
    : app.includes(`setInterpretConsoleState("${phase}")`) || html.includes(`is-${phase}`);
  assert.ok(phaseHook, `${phase} needs a visible state class`);
  assert.ok(app.includes(text) || html.includes(text), `${phase} needs visible state text`);
}

for (const id of ["interpretSelf", "interpretSelfPass", "interpretSelfFail"]) {
  assert.ok(html.includes(`id="${id}"`), `self-score fallback must retain ${id}`);
}
assert.match(html, /id="interpretSelfPass"[\s\S]*?>[\s\S]*?말했어요[\s\S]*?<\/button>/, "self-pass needs a text label");
assert.match(html, /id="interpretSelfFail"[\s\S]*?>[\s\S]*?못 했어요[\s\S]*?<\/button>/, "self-fail needs a text label");

const listen = functionSlice("function listenInterpretAnswer()", "function revealSelfScoring()");
assert.ok(listen.indexOf('run.phase = "listening";') < listen.indexOf('setInterpretConsoleState("listening")'), "listening presentation must follow its state update");

const finishQuestion = functionSlice("function finishInterpretQuestion(verdict, item)", "function advanceInterpret()");
assert.ok(finishQuestion.indexOf("run.results.push") < finishQuestion.indexOf("setInterpretConsoleState(verdict)"), "verdict presentation must follow result state");

const finishRun = functionSlice("function finishInterpretRun()", "function renderStudyContext");
assert.ok(finishRun.indexOf("state.interpret = null;") < finishRun.indexOf('setInterpretConsoleState("complete")'), "completion feedback must follow genuine run completion");

assert.match(app, /listening:\s*"listening"/, "listening must map to the listening mascot");
assert.match(app, /pass:\s*"correct"/, "pass must map to the correct mascot");
assert.match(app, /fail:\s*"wrong"/, "fail must map to the wrong mascot");
assert.match(app, /complete:\s*"complete"/, "run completion must map to the complete mascot");

for (const [state, color] of [
  ["idle", "--mg-line"],
  ["countdown", "--mg-star"],
  ["listening", "--mg-sky"],
  ["pass", "--mg-mint"],
  ["fail", "--mg-coral"],
]) {
  assert.match(css, new RegExp(`\\.communication-console\\.is-${state}\\s*\\{[\\s\\S]*?${color}`), `${state} needs its prescribed console color`);
}

assert.match(css, /#interpretStartBtn[\s\S]*?min-height:\s*56px/, "the primary start action needs a 56px target");
assert.match(css, /#interpretStopBtn[\s\S]*?min-height:\s*48px/, "the secondary stop action needs a 48px target");
assert.match(css, /#interpretView button:focus-visible/, "interpretation controls need a visible keyboard focus");
assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.communication-mic/, "the microphone animation must honor reduced motion");

console.log("interpret communication console UI tests passed");
