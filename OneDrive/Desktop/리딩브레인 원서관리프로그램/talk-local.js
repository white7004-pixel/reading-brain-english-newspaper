/* 리딩브레인 — AI 북토크 연습 모드 (서버·AI 없이)
   로그인하지 않았거나 서버가 없을 때 쓴다. 영어회화 선생님처럼 이끈다:
   ① 일상 인사·기분·오늘 한 일로 말문을 열고 → ② 책 이야기로 넘어가
   ③ 책 속 질문(comprehension)은 책 답과 맞춰 보고 → ④ 좋아하는 인물·이유로 마무리.
   한국어로 대답하면 영어 말하기 틀을 알려 주고 같은 질문을 다시 묻는다.
   ponytail: 책 답은 {{ }} 칸 낱말이 겹치는지로만 본다. 진짜 대화·교정은 로그인 후 AI(book-talk)가 한다.

   확인:  node talk-local.js  */
(function (root) {
  const STOP = new Set("the and was were his her him she they them for with that this there then from into".split(" "));
  const words = s => String(s).toLowerCase().split(/[^a-z']+/).filter(w => w.length > 2 && !STOP.has(w));
  const BOOK_QS = 4;                                   // 3분 대화에 책 질문은 네 개면 알맞다

  // 대화 순서. kind: chat(정답 없음) · book(책 답과 맞춰 봄)
  function steps(book) {
    const t = book.title;
    return [
      { kind: "chat", q: "How are you today?", hint: "I am ___ today.", react: "Thanks for telling me!" },
      { kind: "chat", q: "What did you do today?", hint: "Today I ___.", react: "Sounds good!" },
      { kind: "chat", q: `Today, let's talk about ${t}. Did you like the story?`, hint: "Yes, I liked it. / It was ___.", react: "I see!" },
      ...(book.comprehension || []).slice(0, BOOK_QS).map(c => ({ kind: "book", q: c.q, frame: c.frame,
        hint: c.frame.replace(/\{\{.*?\}\}/g, "___") })),
      { kind: "chat", q: "Who is your favorite character? Why?", hint: "My favorite character is ___ because ___.", react: "That's a great reason!" },
    ];
  }

  // 기분 말에는 한마디 맞장구
  function feel(text) {
    const t = text.toLowerCase();
    if (/\b(happy|good|great|fine|excited|awesome)\b/.test(t)) return "That's great!";
    if (/\b(tired|sleepy)\b/.test(t)) return "Oh, you're tired. Let's have fun talking!";
    if (/\b(sad|bad|angry|sick)\b/.test(t)) return "Oh no. I hope you feel better soon.";
    return "";
  }

  function localTalk({ book, history = [], finish }) {
    const S = steps(book);
    const users = history.filter(h => h.role === "user");
    const last = users[users.length - 1];
    const korean = !!last && /[가-힣]/.test(last.text);
    const step = users.filter(u => !/[가-힣]/.test(u.text)).length;   // 영어로 대답한 수만큼 나아간다
    const fix = last && /\bi is\b/i.test(last.text) ? last.text.replace(/\bi is\b/i, "I am") : "";

    // 한국어로 말했으면 영어 틀을 주고 같은 질문을 다시
    if (korean && !finish) {
      const cur = S[step] || S[S.length - 1];
      return { reply: `Let's try it in English! Look at the sentence below and fill in the blank. ${cur.q}`,
        fix: "", hint: cur.hint, check: "none", done: false, summary_ko: "" };
    }

    // 방금 대답한 질문에 반응
    let pre = "", check = "none";
    const prev = S[step - 1];
    if (last && prev) {
      if (prev.kind === "book") {
        const ans = prev.frame.replace(/\{\{(.*?)\}\}/g, "$1");
        const key = words((prev.frame.match(/\{\{(.*?)\}\}/) || ["", ans])[1]);
        const hit = key.some(w => words(last.text).includes(w));
        check = hit ? "right" : "wrong";
        pre = hit ? "Yes, that's right!" : `${/don'?t know|no idea/i.test(last.text) ? "That's okay!" : "Good try!"} In the book, ${ans}`;
      } else {
        check = "opinion";
        pre = feel(last.text) || prev.react;
      }
    }

    if (finish || step >= S.length)
      return { reply: `${pre} Great talk today! You spoke a lot of English. Next time, try: I think ___ because ___.`.trim(),
        fix, hint: "", check, done: true,
        summary_ko: "연습 모드로 일상 영어 대화와 책 이야기를 했어요. 이유를 붙여 말하는 연습을 더 해 봐요." };

    const next = S[step];
    const hello = !last ? "Hi! I'm your English talk partner." : "";
    return { reply: [hello, pre, next.q].filter(Boolean).join(" "), fix, hint: next.hint, check, done: false, summary_ko: "" };
  }

  // 연습 모드가 소리 내는 문장 전부 — 미리 만들 음성 파일 목록(scripts/make-tts.mjs)이 이것을 읽는다.
  function lines(book) {
    const out = ["Hi! I'm your English talk partner.", "Yes, that's right!", "Good try!", "That's okay!",
      "Great talk today!", "You spoke a lot of English.", "Next time, try: I think ___ because ___.", "Let's try it in English!", "Look at the sentence below and fill in the blank.",
      "That's great!", "Oh, you're tired.", "Let's have fun talking!", "Oh no.", "I hope you feel better soon."];
    for (const s of steps(book)) {
      out.push(s.q);
      if (s.react) out.push(s.react);
      if (s.frame) out.push(`In the book, ${s.frame.replace(/\{\{(.*?)\}\}/g, "$1")}`);
    }
    return out;
  }

  root.RBTalkLocal = { localTalk, lines };
  if (typeof module !== "undefined") module.exports = { localTalk, lines };
})(this);

if (typeof require !== "undefined" && require.main === module) {
  const { localTalk, lines } = module.exports, eq = require("assert").strictEqual;
  const book = { title: "Hi! Fly Guy", comprehension: [
    { q: "What did Buzz want to find?", frame: "Buzz wanted to find {{a pet}} for the pet show." },
    { q: "Where did Buzz put the fly?", frame: "Buzz put the fly {{in a jar}}." }] };
  const h = [];
  const turn = text => { if (text != null) h.push({ role: "user", text }); const r = localTalk({ book, history: h }); h.push({ role: "assistant", text: r.reply }); return r; };

  let r = turn();
  eq(r.reply, "Hi! I'm your English talk partner. How are you today?"); eq(r.check, "none");
  r = turn("I am happy");
  eq(r.check, "opinion"); eq(r.reply, "That's great! What did you do today?");
  r = turn("학교에 갔어요");                                 // 한국어 → 같은 질문 다시
  eq(r.reply.startsWith("Let's try it in English!"), true); eq(r.reply.endsWith("What did you do today?"), true);
  r = turn("Today I went to school");
  eq(r.reply.endsWith("Did you like the story?"), true);
  r = turn("yes");
  eq(r.reply, "I see! What did Buzz want to find?");
  r = turn("He wanted a pet.");
  eq(r.check, "right"); eq(r.reply, "Yes, that's right! Where did Buzz put the fly?");
  r = turn("i don't know");
  eq(r.check, "wrong"); eq(r.reply, "That's okay! In the book, Buzz put the fly in a jar. Who is your favorite character? Why?");
  r = turn("i is like Fly Guy because he is smart");
  eq(r.done, true); eq(r.fix, "I am like Fly Guy because he is smart");
  eq(localTalk({ book, history: [], finish: true }).done, true);
  eq(lines(book).includes("In the book, Buzz put the fly in a jar."), true);
  console.log("talk-local.js ok");
}
