# E북 형광펜 싱크 만들기:  python scripts/make-sync.py <slug> "<내지 PDF 경로>"
# 낱말 시각을 얻는 길이 둘이다:
#   ① <mp3>.words.json 이 있으면 그것을 쓴다 — scripts/make-read-audio-edge.mjs 가 소리를 만들 때 받아 둔 정확한 시각이다.
#   ② 없으면 faster-whisper 로 받아쓴다 (출판사 음원처럼 우리가 만들지 않은 소리).
# 그다음 PDF 에서 같은 낱말의 자리(좌표)를 찾아 짝을 짓는다. 결과는 assets/ebook/<slug>/sync.json.
# 저장하는 것은 시각과 자리뿐이다. 책 글자는 저장하지 않는다.
# 한 줄 = [시작초, 끝초, 그림번호(item.pages 안에서 몇 번째), x, y, w, h, 문장번호]  (x·y·w·h 는 그림 크기에 대한 비율)
import sys, re, io, os, json
import pdfplumber
from faster_whisper import WhisperModel

slug, pdf_path = sys.argv[1], sys.argv[2]
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
TRIM_W, TRIM_H = 419.8, 596.5          # TrimBox 가 없는 PDF 일 때 쓰는 크기(pt) — 가운데를 잘랐다고 본다
norm = lambda s: re.sub(r"[^a-z0-9]", "", s.lower().replace("’", "'"))

def trim(pg):
    """잘라낸 자리와 크기 (ox, oy, w, h). scripts/make-ebook.py 와 똑같이 TrimBox 를 쓴다."""
    box = pg.page_obj.attrs.get("TrimBox")
    if not box:
        return (float(pg.width) - TRIM_W) / 2, (float(pg.height) - TRIM_H) / 2, TRIM_W, TRIM_H
    x0, y0, x1, y1 = [float(v) for v in box]
    return x0, float(pg.height) - y1, x1 - x0, y1 - y0     # pdfplumber 는 위에서 아래로 센다

def page_words(pg):
    ox, oy, TRIM_W, TRIM_H = trim(pg)
    out = []
    for w in pg.dedupe_chars(tolerance=1).extract_words(x_tolerance=2):
        # 잘라낸 그림 밖의 글자는 화면에 없다 — 인쇄소 꼬리말(L1_1_..._.indd, 날짜)이 여기서 걸러진다
        if not (ox <= w["x0"] and w["x1"] <= ox + TRIM_W and oy <= w["top"] and w["bottom"] <= oy + TRIM_H):
            continue
        parts = [p for p in re.split(r"[-–—/]", w["text"]) if norm(p)]   # 15th-century → 두 낱말, 자리는 글자 수로 나눈다
        total, x = sum(len(p) for p in parts) or 1, w["x0"]
        for p in parts:
            ww = (w["x1"] - w["x0"]) * len(p) / total
            out.append({"n": norm(p), "box": [(x - ox) / TRIM_W, (w["top"] - oy) / TRIM_H, ww / TRIM_W, (w["bottom"] - w["top"]) / TRIM_H]})
            x += ww
    return out

def align(heard, words):
    """heard: [(norm, t0, t1, 문장번호)], words: [{n, box, img}] → sync 줄들. 다음 낱말이 맞으면 그대로, 아니면 뒤 세 낱말까지 맞는 곳으로 뛴다."""
    used, last, rows = set(), -1, []
    for i, (n, t0, t1, s) in enumerate(heard):
        if not n: continue
        cand = [k for k, w in enumerate(words) if w["n"] == n and k not in used]
        if not cand: continue
        def score(k):
            run = sum(1 for d in range(1, 4) if i + d < len(heard) and k + d < len(words) and words[k + d]["n"] == heard[i + d][0])
            return (k == last + 1) * 10 + run * 2 - (0.001 * abs(k - last))
        k = max(cand, key=score)
        used.add(k); last = k
        b = words[k]["box"]
        rows.append([round(t0, 2), round(t1, 2), words[k]["img"]] + [round(v, 4) for v in b] + [s])
    return rows

def listen(src):
    """낱말과 시각 [(norm, t0, t1, 문장번호)]. words.json 이 있으면 그것을, 없으면 받아쓰기를 쓴다."""
    wj = os.path.join(root, src).rsplit(".", 1)[0] + ".words.json"
    heard, s = [], 0
    if os.path.exists(wj):
        for t, t0, t1, s in json.load(io.open(wj, encoding="utf8")):   # 문장 번호는 만들 때 이미 매겨 둔다
            heard.append((norm(t), t0, t1, s))
        return heard, "낱말표"
    global model
    if model is None: model = WhisperModel("base.en", device="cpu", compute_type="int8")
    segs, _ = model.transcribe(os.path.join(root, src), word_timestamps=True)
    for seg in segs:
        for w in seg.words:
            heard.append((norm(w.word), w.start, w.end, s))
            if re.search(r"[.!?]$", w.word.strip()): s += 1
    return heard, "받아쓰기"

exec_src = io.open(os.path.join(root, "books", slug + ".js"), encoding="utf8").read()
items = re.findall(r'src: "([^"]+\.mp3)", pages: \[([\d,]*)\]', exec_src)
model = None
out = {}
with pdfplumber.open(pdf_path) as pdf:
    cache = {}
    for src, pg in items:
        pages = [int(x) for x in pg.split(",")]
        words = []
        for img, n in enumerate(pages):
            if n == 0: continue                                  # 0쪽은 표지 그림이라 글자 자리가 없다
            if n not in cache: cache[n] = page_words(pdf.pages[n - 1])
            words += [dict(w, img=img) for w in cache[n]]
        heard, how = listen(src)
        rows = align(heard, words)
        out[os.path.basename(src)] = rows
        pct = 100 * len(rows) // max(1, len(heard))
        print("%-10s %s · 낱말 %3d · 자리 찾음 %3d (%d%%) · 쪽 낱말 %3d %s"
              % (os.path.basename(src), how, len(heard), len(rows), pct, len(words), "" if pct >= 90 else "← 낮다"))

dst = os.path.join(root, "assets", "ebook", slug, "sync.json")
io.open(dst, "w", encoding="utf8").write(json.dumps(out, separators=(",", ":")))
print("saved", dst, os.path.getsize(dst), "bytes")
