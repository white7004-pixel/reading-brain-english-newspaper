# -*- coding: utf-8 -*-
"""오픈라이브러리에서 책 표지 '번호'를 모은다 (그림은 내려받지 않는다).
    python scripts/fetch-covers.py [몇권까지] [테스트할 Book No,콤마로,나열]
결과: scripts/catalog-covers.json  {Book No.: 표지번호}  (0 = 못 찾음)
중간에 끊겨도 다시 돌리면 아직 안 물어본 책부터 이어서 한다."""
import io, os, re, sys, json, time, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "scripts", "catalog-covers.json")
PAUSE = 1.0                      # 공용 서버를 두드리지 않는다
UA = "ReadingBrain-Library/1.0 (academy internal catalog; cover ids only; +https://readingbrain-books.vercel.app)"   # 헤더에 한글을 넣으면 안 된다 — HTTP 헤더는 latin-1 만 담는다

def books():
    """catalog.js 에서 [Book No., 제목, 저자] 를 뽑는다 (node 없이 읽는다)."""
    s = io.open(os.path.join(ROOT, "catalog.js"), encoding="utf-8").read()
    body = s[s.index("var CATALOG = ") + len("var CATALOG = "): s.index(";\n//")]
    d = json.loads(body)
    return [(b[0], b[1], b[3]) for b in d["books"]]

def ask(title, author):
    # 제목의 (?) 같은 자리표시는 검색에 방해가 된다
    t = re.sub(r"[(\[].*?[)\]]", " ", title)
    t = re.sub(r"^#?\d+[.\s]+", "", t).strip()
    if not t: return 0
    q = "https://openlibrary.org/search.json?limit=3&fields=title,author_name,cover_i&title=" + urllib.parse.quote(t)
    last = (author or "").split()[-1] if author else ""
    if last: q += "&author=" + urllib.parse.quote(last)
    req = urllib.request.Request(q, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=10) as r:
        docs = json.load(r).get("docs", [])
    for d in docs:
        if d.get("cover_i"): return int(d["cover_i"])
    return 0

def save(got):
    io.open(OUT, "w", encoding="utf-8", newline="\n").write(json.dumps(got, ensure_ascii=False))

def main():
    limit = 10 ** 9
    pick = None  # 시험 삼아 특정 Book No 를 먼저 물어보고 싶을 때 (예: "S1624,S4154")
    for a in sys.argv[1:]:
        if a.isdigit(): limit = int(a)
        else: pick = set(a.split(","))

    got = {}
    if os.path.exists(OUT): got = json.load(io.open(OUT, encoding="utf-8"))

    all_books = books()
    if pick:  # 고른 책을 앞으로 당긴다 (나머지 순서는 그대로)
        chosen = [b for b in all_books if b[0] in pick]
        rest = [b for b in all_books if b[0] not in pick]
        all_books = chosen + rest

    todo = [b for b in all_books if b[0] not in got]
    print("남은 책 %d권 (이미 %d권 마침)" % (len(todo), len(got)))
    n = 0
    for no, title, author in todo:
        if n >= limit: break
        try:
            got[no] = ask(title, author)
        except Exception as e:
            print("%-7s 못 물어봄(%s) — 다음에 다시" % (no, type(e).__name__))
            time.sleep(2); continue
        n += 1
        if got[no]: print("%-7s %-46s → %d" % (no, title[:46], got[no]))
        if n % 20 == 0:
            save(got)
            print("  … %d권 저장 (표지 찾은 것 %d권)" % (len(got), sum(1 for v in got.values() if v)))
        time.sleep(PAUSE)
    save(got)
    print("끝. %d권 물어봄 · 표지 찾은 것 %d권 (%.0f%%)"
          % (len(got), sum(1 for v in got.values() if v), 100.0 * sum(1 for v in got.values() if v) / max(1, len(got))))

if __name__ == "__main__":
    main()
