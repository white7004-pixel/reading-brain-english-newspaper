/**
 * 애니메이션 스타일 SVG 카드 이미지 생성기
 * 사용법: node tools/generate_svg_cards.js
 *
 * - 1189개 SVG 파일 생성 (6:4 비율, 360×240)
 * - 표현의 핵심 키워드에 맞는 이모지 자동 선택
 * - 파스텔 그라데이션 + 별/반짝임 데코 (애니메이션 느낌)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "assets", "images");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// expressions.js 로드
const exprCode = fs.readFileSync(path.join(ROOT, "data", "expressions.js"), "utf8")
  .replace("window.EXPRESSIONS", "global.__EXPR");
eval(exprCode);
const expressions = global.__EXPR;

// ─── 이모지 키워드 맵 (우선순위 순서: 복합어 먼저) ───────────────
const KEYWORD_EMOJI = [
  // 복합 표현 (더 구체적이라 우선순위 높음)
  ["good morning","🌅"], ["good night","🌙"], ["good afternoon","☀️"], ["good evening","🌆"],
  ["nice to meet","🤝"], ["ice cream","🍦"], ["hot dog","🌭"], ["how many","🔢"],
  ["how much","💰"], ["what time","🕐"], ["let me","💡"], ["come on","🏃"],
  ["look at","👀"], ["take care","🤗"], ["get up","🛏️"], ["go to","🚶"],
  ["wake up","⏰"], ["slow down","🐢"], ["hurry up","⏩"], ["sit down","🪑"],
  ["stand up","🧍"], ["lie down","🛏️"], ["turn off","💡"], ["turn on","🔆"],
  ["put on","👕"], ["take off","✈️"], ["pick up","🤲"],

  // 동물
  ["dog","🐶"], ["cat","🐱"], ["bird","🐦"], ["fish","🐟"], ["rabbit","🐰"],
  ["horse","🐴"], ["cow","🐄"], ["pig","🐷"], ["chicken","🐔"], ["duck","🦆"],
  ["bear","🐻"], ["elephant","🐘"], ["lion","🦁"], ["tiger","🐯"], ["monkey","🐒"],
  ["frog","🐸"], ["snake","🐍"], ["turtle","🐢"], ["hamster","🐹"], ["panda","🐼"],
  ["parrot","🦜"], ["penguin","🐧"], ["whale","🐳"], ["dolphin","🐬"],
  ["butterfly","🦋"], ["bee","🐝"], ["ant","🐜"], ["ladybug","🐞"],
  ["dinosaur","🦕"], ["dragon","🐲"], ["unicorn","🦄"], ["wolf","🐺"],
  ["fox","🦊"], ["deer","🦌"], ["koala","🐨"], ["kangaroo","🦘"],
  ["zebra","🦓"], ["giraffe","🦒"], ["hippo","🦛"], ["camel","🐪"],

  // 음식/음료
  ["apple","🍎"], ["banana","🍌"], ["orange","🍊"], ["grape","🍇"], ["strawberry","🍓"],
  ["watermelon","🍉"], ["peach","🍑"], ["cherry","🍒"], ["mango","🥭"],
  ["pizza","🍕"], ["hamburger","🍔"], ["sandwich","🥪"], ["cake","🎂"], ["cookie","🍪"],
  ["milk","🥛"], ["juice","🍹"], ["water","💧"], ["rice","🍚"],
  ["bread","🍞"], ["soup","🍜"], ["salad","🥗"], ["potato","🥔"],
  ["carrot","🥕"], ["tomato","🍅"], ["egg","🥚"], ["cheese","🧀"],
  ["chocolate","🍫"], ["candy","🍬"], ["popcorn","🍿"], ["taco","🌮"],
  ["spaghetti","🍝"], ["ramen","🍜"], ["sushi","🍣"], ["donut","🍩"],
  ["breakfast","🥞"], ["lunch","🥗"], ["dinner","🍽️"], ["meal","🍽️"],
  ["hungry","😋"], ["thirsty","🥤"], ["eat","🍽️"], ["drink","🥤"], ["cook","👨‍🍳"],

  // 학교/학습
  ["school","🏫"], ["teacher","👩‍🏫"], ["student","🎓"], ["homework","📝"],
  ["pencil","✏️"], ["book","📚"], ["library","📚"], ["classroom","🏫"],
  ["exam","📝"], ["test","📋"], ["class","🏫"], ["lesson","📖"],
  ["read","📖"], ["write","✍️"], ["learn","📖"], ["study","📚"],
  ["blackboard","🖊️"], ["notebook","📓"], ["ruler","📏"], ["scissors","✂️"],

  // 가족
  ["mother","👩"], ["father","👨"], ["mom","👩"], ["dad","👨"],
  ["brother","👦"], ["sister","👧"], ["family","👨‍👩‍👧‍👦"], ["baby","👶"],
  ["grandma","👵"], ["grandpa","👴"], ["grandmother","👵"], ["grandfather","👴"],
  ["aunt","👩"], ["uncle","👨"], ["cousin","👫"], ["friend","👫"],
  ["son","👦"], ["daughter","👧"], ["child","🧒"], ["children","🧒"],
  ["husband","👨"], ["wife","👩"], ["parent","👨‍👩‍👧"], ["relative","👪"],

  // 색깔
  ["red","🔴"], ["blue","🔵"], ["green","💚"], ["yellow","💛"],
  ["orange","🟠"], ["purple","💜"], ["pink","🩷"], ["black","⚫"],
  ["white","⚪"], ["brown","🟤"], ["gray","🩶"], ["color","🎨"], ["paint","🎨"],

  // 날씨
  ["sunny","☀️"], ["rainy","🌧️"], ["snowy","❄️"], ["cloudy","☁️"],
  ["windy","💨"], ["stormy","⛈️"], ["rainbow","🌈"], ["foggy","🌫️"],
  ["sun","☀️"], ["rain","🌧️"], ["snow","❄️"], ["cloud","☁️"],
  ["thunder","⚡"], ["lightning","⚡"], ["hot","🌡️"], ["cold","🥶"],
  ["warm","🌤️"], ["cool","🌬️"], ["umbrella","☂️"], ["weather","🌤️"],

  // 스포츠/활동
  ["soccer","⚽"], ["football","🏈"], ["basketball","🏀"], ["baseball","⚾"],
  ["tennis","🎾"], ["swim","🏊"], ["swimming","🏊"], ["golf","⛳"],
  ["run","🏃"], ["running","🏃"], ["jump","🦘"], ["jumping","🦘"],
  ["dance","💃"], ["dancing","💃"], ["sing","🎤"], ["singing","🎤"],
  ["cycling","🚴"], ["exercise","💪"], ["sport","⚽"], ["play","🎮"],
  ["volleyball","🏐"], ["badminton","🏸"], ["gym","💪"],

  // 교통수단
  ["car","🚗"], ["bus","🚌"], ["train","🚂"], ["airplane","✈️"],
  ["plane","✈️"], ["boat","⛵"], ["ship","🚢"], ["taxi","🚕"],
  ["truck","🚛"], ["bicycle","🚲"], ["helicopter","🚁"],
  ["subway","🚇"], ["motorcycle","🏍️"], ["ambulance","🚑"],
  ["fire truck","🚒"], ["police car","🚓"], ["scooter","🛵"],

  // 장소
  ["home","🏠"], ["house","🏠"], ["park","🌳"], ["store","🏪"],
  ["shop","🛍️"], ["hospital","🏥"], ["restaurant","🍽️"],
  ["market","🛒"], ["bank","🏦"], ["airport","✈️"], ["station","🚉"],
  ["zoo","🦁"], ["museum","🏛️"], ["church","⛪"], ["hotel","🏨"],
  ["beach","🏖️"], ["mountain","⛰️"], ["forest","🌲"], ["river","🌊"],
  ["ocean","🌊"], ["sea","🌊"], ["lake","💧"], ["farm","🌾"],
  ["castle","🏰"], ["stadium","🏟️"], ["theater","🎭"],

  // 신체
  ["head","🗣️"], ["hand","✋"], ["eye","👁️"], ["nose","👃"],
  ["mouth","👄"], ["ear","👂"], ["foot","🦶"], ["leg","🦵"],
  ["arm","💪"], ["heart","❤️"], ["finger","☝️"], ["tooth","🦷"],
  ["hair","💇"], ["face","😊"], ["back","🔙"], ["stomach","🫃"],

  // 의류
  ["shirt","👕"], ["dress","👗"], ["shoes","👟"], ["hat","🎩"],
  ["pants","👖"], ["coat","🧥"], ["socks","🧦"], ["glasses","👓"],
  ["bag","👜"], ["jacket","🧥"], ["skirt","👗"], ["gloves","🧤"],
  ["scarf","🧣"], ["boots","👢"], ["sneakers","👟"], ["tie","👔"],

  // 자연
  ["flower","🌸"], ["tree","🌳"], ["grass","🌿"], ["leaf","🍃"],
  ["rose","🌹"], ["tulip","🌷"], ["sunflower","🌻"], ["cherry blossom","🌸"],
  ["mountain","⛰️"], ["river","🏞️"], ["star","⭐"], ["moon","🌙"],
  ["earth","🌍"], ["sky","🌤️"], ["fire","🔥"], ["wind","💨"],

  // 취미/여가
  ["music","🎵"], ["song","🎵"], ["movie","🎬"], ["game","🎮"],
  ["draw","🎨"], ["drawing","🎨"], ["painting","🎨"], ["piano","🎹"],
  ["guitar","🎸"], ["drum","🥁"], ["cooking","👨‍🍳"], ["baking","🍞"],
  ["gardening","🌱"], ["travel","✈️"], ["camping","⛺"], ["hiking","🥾"],
  ["fishing","🎣"], ["photography","📷"], ["shopping","🛍️"],

  // 인사/감정
  ["hello","👋"], ["hi","👋"], ["bye","👋"], ["goodbye","👋"],
  ["thank","🙏"], ["sorry","😔"], ["please","🙏"], ["help","🤝"],
  ["love","❤️"], ["like","👍"], ["happy","😄"], ["sad","😢"],
  ["angry","😠"], ["scared","😱"], ["excited","🤩"], ["tired","😴"],
  ["sick","🤒"], ["sleepy","😴"], ["smile","😊"], ["laugh","😂"],
  ["cry","😢"], ["worry","😟"], ["surprised","😲"], ["bored","😑"],
  ["proud","🤩"], ["nervous","😰"], ["confused","😕"],

  // 숫자/쇼핑
  ["money","💵"], ["buy","🛒"], ["sell","💰"], ["price","💰"],
  ["birthday","🎂"], ["party","🎉"], ["holiday","🎊"], ["christmas","🎄"],
  ["new year","🎆"], ["halloween","🎃"],

  // 시간
  ["morning","🌅"], ["afternoon","☀️"], ["evening","🌆"], ["night","🌙"],
  ["today","📅"], ["yesterday","📅"], ["tomorrow","📅"],
  ["spring","🌸"], ["summer","☀️"], ["autumn","🍂"], ["winter","❄️"],
  ["season","🌸"],

  // 크기/묘사
  ["big","🐘"], ["small","🐭"], ["tall","🏀"], ["short","👶"],
  ["fast","🏃"], ["slow","🐢"], ["long","📏"], ["heavy","⚖️"],
  ["light","🪶"], ["strong","💪"], ["weak","😔"], ["beautiful","🌸"],
  ["cute","🥰"], ["funny","😂"], ["strange","🤔"], ["wonderful","🌟"],

  // 특수/기타
  ["dream","💭"], ["wish","⭐"], ["magic","✨"], ["hope","🌈"],
  ["safe","🛡️"], ["danger","⚠️"], ["lost","😰"], ["found","🔍"],
  ["treasure","💎"], ["adventure","🗺️"], ["hero","🦸"], ["princess","👸"],
  ["prince","🤴"], ["robot","🤖"], ["alien","👽"], ["ghost","👻"],
];

const STOP_WORDS = new Set([
  "a","an","the","is","are","am","was","were","be","been","being",
  "i","you","he","she","it","we","they","my","your","his","her","its","our","their",
  "this","that","these","those","to","of","in","on","at","for","with","by","from",
  "and","or","but","not","do","did","does","have","has","had","will","would","can",
  "could","should","may","might","shall","very","just","too","so","like","well",
  "back","here","there","up","down","out","don","doesn","didn","won","can't","it's",
  "i'm","we're","you're","they're","he's","she's","isn","aren","wasn","weren",
]);

// 8가지 파스텔 애니메이션 팔레트
const PALETTES = [
  { bg1: "#FFF0F5", bg2: "#E8F4FF", accent: "#FF6B9D", star: "#FFE0EC" },  // 로즈+스카이
  { bg1: "#F0F8FF", bg2: "#E8FFF4", accent: "#4FC3F7", star: "#D0EFFF" },  // 스카이+민트
  { bg1: "#FFF8E8", bg2: "#FFE8F8", accent: "#FFA726", star: "#FFEFD0" },  // 선셋+핑크
  { bg1: "#E8FFF0", bg2: "#F0E8FF", accent: "#66BB6A", star: "#D0FFE0" },  // 민트+라벤더
  { bg1: "#F5E8FF", bg2: "#FFE8E8", accent: "#AB47BC", star: "#EDD0FF" },  // 라벤더+로즈
  { bg1: "#E8F8FF", bg2: "#FFFDE8", accent: "#26C6DA", star: "#C8F0FF" },  // 아쿠아+골드
  { bg1: "#FFF0E8", bg2: "#E8F0FF", accent: "#FF7043", star: "#FFE0D0" },  // 피치+블루
  { bg1: "#F0FFE8", bg2: "#FFE8F8", accent: "#9CCC65", star: "#D8FFD0" },  // 라임+핑크
];

function pickEmoji(english) {
  const text = english.toLowerCase().replace(/['''""]/g, "").replace(/\s+/g, " ");

  // 복합어(공백 포함) 먼저 탐색
  for (const [kw, em] of KEYWORD_EMOJI) {
    if (kw.includes(" ") && text.includes(kw)) return em;
  }

  // 단일 단어 탐색 (단어 경계 기준)
  const words = new Set(text.split(/\W+/).filter(Boolean));
  for (const [kw, em] of KEYWORD_EMOJI) {
    if (!kw.includes(" ") && words.has(kw)) return em;
  }

  // 기본 패턴
  if (text.includes("?")) return "❓";
  if (text.includes("!")) return "⭐";
  return "📚";
}

function getLabel(english) {
  // 처음 5단어 사용 (원문 유지, 구두점만 제거)
  const words = english.trim().split(/\s+/).slice(0, 5);
  const label = words.join(" ").replace(/[.,!?;:]$/, "").trim();
  if (label.length > 38) return label.slice(0, 35) + "…";
  return label;
}

function esc(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 데코 별 모양 path
function starPath(cx, cy, r, ir, pts = 5) {
  const parts = [];
  for (let i = 0; i < pts * 2; i++) {
    const angle = (Math.PI / pts) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : ir;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    parts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return parts.join(" ") + " Z";
}

function generateSVG(item) {
  const p = PALETTES[(item.id - 1) % PALETTES.length];
  const emoji = pickEmoji(item.english);
  const label = esc(getLabel(item.english));
  const id = item.id;

  // 별 장식 (고정된 패턴, ID 기반 변형)
  const starOffset = ((id - 1) % 4) * 8;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 240" width="360" height="240">
  <defs>
    <linearGradient id="g${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bg1}"/>
      <stop offset="100%" stop-color="${p.bg2}"/>
    </linearGradient>
    <linearGradient id="b${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${p.accent}"/>
      <stop offset="100%" stop-color="${p.accent}CC"/>
    </linearGradient>
    <clipPath id="c${id}">
      <rect width="360" height="240" rx="18"/>
    </clipPath>
  </defs>
  <g clip-path="url(#c${id})">
    <!-- 배경 그라데이션 -->
    <rect width="360" height="240" fill="url(#g${id})"/>
    <!-- 배경 동그라미 장식 -->
    <circle cx="310" cy="35" r="55" fill="white" fill-opacity="0.22"/>
    <circle cx="48" cy="210" r="45" fill="white" fill-opacity="0.18"/>
    <circle cx="350" cy="185" r="30" fill="${p.accent}" fill-opacity="0.1"/>
    <circle cx="18" cy="65" r="24" fill="${p.accent}" fill-opacity="0.1"/>
    <!-- 별 장식 (애니 느낌) -->
    <path d="${starPath(308, 30, 14, 6)}" fill="${p.accent}" fill-opacity="0.55"/>
    <path d="${starPath(330 + starOffset, 52, 8, 3.5)}" fill="${p.star}" fill-opacity="0.9"/>
    <path d="${starPath(286, 54, 7, 3)}" fill="${p.star}" fill-opacity="0.85"/>
    <path d="${starPath(28, 32, 11, 4.5)}" fill="${p.accent}" fill-opacity="0.45"/>
    <path d="${starPath(46, 52, 6, 2.5)}" fill="${p.star}" fill-opacity="0.8"/>
    <!-- 반짝임 (직선 십자 형태) -->
    <line x1="55" y1="195" x2="55" y2="205" stroke="${p.accent}" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
    <line x1="50" y1="200" x2="60" y2="200" stroke="${p.accent}" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>
    <line x1="340" y1="170" x2="340" y2="178" stroke="${p.accent}" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
    <line x1="336" y1="174" x2="344" y2="174" stroke="${p.accent}" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
    <!-- 메인 이모지 -->
    <text x="180" y="128" font-size="90" text-anchor="middle" dominant-baseline="middle"
          font-family="'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji','Twemoji Mozilla',sans-serif">${emoji}</text>
    <!-- 하단 배너 -->
    <rect x="0" y="196" width="360" height="44" fill="url(#b${id})"/>
    <!-- 배너 텍스트 -->
    <text x="180" y="222" font-size="13.5" font-weight="700" text-anchor="middle" fill="white"
          font-family="'Segoe UI','Helvetica Neue','Arial',sans-serif">${label}</text>
  </g>
</svg>`;
}

// ─── 생성 실행 ───────────────────────────────────────────────────
console.log(`SVG 카드 이미지 생성 시작: ${expressions.length}개`);
const start = Date.now();
let count = 0;

for (const item of expressions) {
  const filename = String(item.id).padStart(4, "0") + ".svg";
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, generateSVG(item), "utf8");
  count++;
  if (count % 200 === 0) {
    process.stdout.write(`  [${count}/${expressions.length}] 생성 중...\n`);
  }
}

const elapsed = ((Date.now() - start) / 1000).toFixed(1);
console.log(`\n✅ 완료: ${count}개 SVG 생성 (${elapsed}초)`);
console.log(`저장 위치: ${OUTPUT_DIR}`);
